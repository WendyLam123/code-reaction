import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Input({page}){
    const [quizInput, setQuizInput] = useState("");
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(null);


    useEffect(()=>{
        setCompleted(null);
        setQuizInput("");
    }, [page.id])

    async function checkInputAnswer(){
        const correctAnswer = page.answers[0].answer;
        const userAnswer = quizInput.trim().toLowerCase();
        const isCorrect = userAnswer === correctAnswer.trim().toLowerCase();

        setCompleted(isCorrect);

        await updateDatabase(isCorrect);
    }

    async function updateDatabase(isCorrect){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                navigate("/Login");
                return;
            }

            //every attempt +1
            const attempt = await fetch(`/api/levels/${page.quiz_id}/tryQuiz`, {
                method: "POST", 
                headers: {Authorization: `Bearer ${token}`}
            })
            if (!attempt.ok){
                    throw new Error("Failed to updated attempt");
                }

            //it answer is correct
            if (isCorrect){
                const completed = await fetch(`/api/levels/${page.quiz_id}/completedQuiz`, {
                    method: "POST", 
                    headers: {Authorization: `Bearer ${token}`}
                })
                if (!completed.ok){
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
                dangerouslySetInnerHTML={{__html: page.question}}
            />
            <div className="quiz_input_subContainer">
                <input 
                    disabled={completed === true}
                    type="text" 
                    name="quiz_input" 
                    value={quizInput}
                    onChange={(e)=>{setQuizInput(e.target.value)}}
                    placeholder="Type your answer here..."/>
                <button
                    type="submit"
                    onClick={checkInputAnswer}
                >Submit</button>

                {completed === true && <div className="isCorrect">Correct!</div>}
                {completed === false && <div className="isWrong">Oops! Try again!</div>}
            </div>
        </div>
    )
}

export default Input;