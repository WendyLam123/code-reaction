import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";

function MultipleChoice({page}){
    const navigate = useNavigate();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [completed, setCompleted] = useState(false);
    const { isLoggedIn, token, logout } = useAuth();

    useEffect(()=>{
        //initialize button status after going to next page
        setSelectedAnswer(null);
        setCompleted(false);
    }, [page.id])

    const submitAnswer = async(answer) =>{
        setSelectedAnswer(answer);

        if (!isLoggedIn){
            navigate("/Login");
            return;
        }
        //update attempt and if the question is complete in database
        try{
            const updateAttempt = await fetch(`/api/courses/${page.id}/tryQuiz`, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
                });

            if (updateAttempt.status === 401){
                logout();
                navigate("/Login");
                return;
            };
            if (!updateAttempt.ok){
                throw new Error("Failed to update attempt");
            };

            if (answer.is_correct){
                setCompleted(true);

                const updateCompleted = await fetch(`/api/courses/${page.id}/completedQuiz`, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
                if (updateCompleted.status === 401){
                    logout();
                    navigate("/Login");
                    return;
                };
                if (!updateCompleted.ok){
                    throw new Error("Failed to update completed");
                }
            }

        }catch(err){
            console.log(err)
        }
    };

return (
    <div className="quiz_multi_container">
        <div 
            dangerouslySetInnerHTML={{__html: page.quiz.question}}
        />

        <div className="quiz_multi_buttons">
            {page.quiz.answers.map((answer) => (
                <button 
                    disabled={completed}
                    className={`quiz_multi_button ${
                        selectedAnswer?.id === answer.id
                            ? answer.is_correct
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    key={answer.id}
                    onClick={()=>{
                        submitAnswer(answer);
                    }}
                    >
                    {answer.answer}
                </button>
            ))}
        </div>

    </div>
)
}

export default MultipleChoice;