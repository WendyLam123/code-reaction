import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";
import { API_URL } from "../../../api";

function Input({page}){
    const [quizInput, setQuizInput] = useState("");
    const navigate = useNavigate();
    const [completedQuiz, setCompletedQuiz] = useState(null);
    const { isLoggedIn, token, logout } = useAuth();

    useEffect(()=>{
        setCompletedQuiz(null);
        setQuizInput("");
    }, [page.id])

    async function checkInputAnswer(){
        const correctAnswer = page.quiz.answers[0].answer;
        //remove all space of input 
        //Todo: update database input answer
        const userAnswer = quizInput.trim().toLowerCase().replace(/\s+/g, "");
        const isCorrect = userAnswer === correctAnswer.trim().toLowerCase().replace(/\s+/g, "");

        setCompletedQuiz(isCorrect);

        await updateDatabase(isCorrect);
    }

    async function updateDatabase(isCorrect){
        if (!isLoggedIn){
            navigate("/Login");
            return;
        }

        try{
            //every attempt +1
            const attempt = await fetch(`${API_URL}/api/courses/${page.id}/tryQuiz`, {
                method: "POST", 
                headers: {Authorization: `Bearer ${token}`}
            })
            if (attempt.status === 401){
                logout();
                navigate("/Login");
                return;
            }

            if (!attempt.ok){
                throw new Error("Failed to updated attempt");
            }

            //it answer is correct
            if (isCorrect){
                const updateCompleted = await fetch(`${API_URL}/api/courses/${page.id}/completedQuiz`, {
                    method: "POST", 
                    headers: {Authorization: `Bearer ${token}`}
                })
                if (updateCompleted.status === 401){
                    logout();
                    navigate("/Login");
                    return;
                }

                if (!updateCompleted.ok){
                    throw new Error("Failed to updated completed");
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="quiz_input_container">
            <div className="quiz_input_question"
                dangerouslySetInnerHTML={{__html: page.quiz.question}}
            />
            <div className="quiz_input_subContainer">
                <input 
                    disabled={completedQuiz === true}
                    type="text" 
                    name="quiz_input" 
                    value={quizInput}
                    onChange={(e)=>{setQuizInput(e.target.value)}}
                    placeholder="Type your answer here..."/>
                <button
                    type="submit"
                    onClick={checkInputAnswer}
                >Submit</button>

                {completedQuiz === true && <div className="isCorrect">Correct!</div>}
                {completedQuiz === false && <div className="isWrong">Oops! Try again!</div>}
            </div>
        </div>
    )
}

export default Input;