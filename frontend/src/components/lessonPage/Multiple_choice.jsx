import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

    function Multiple_choice({page}){
        const navigate = useNavigate();
        const [selectedAnswer, setSelectedAnswer] = useState(null);
        const [completed, setCompleted] = useState(false);

        useEffect(()=>{
            //initialize button status after going to next page
            setSelectedAnswer(null);
            setCompleted(false);
        }, [page.id])

        const submitAnswer = async(answer) =>{
            setSelectedAnswer(answer);

            try{
                const token = localStorage.getItem("token");
                if (!token){
                    navigate("/Login");
                    return;
                }

                const updateAttempt = await fetch(`/api/levels/${page.quiz_id}/tryQuiz`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                    });

                if (!updateAttempt.ok){
                    throw new Error("Failed to update attempt");
                };

                if (answer.is_correct){
                    setCompleted(true);

                    const updateCompleted = await fetch(`/api/levels/${page.quiz_id}/completedQuiz`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token})}`
                    }
                });

                    if (!updateCompleted.ok){
                        throw new Error("Failed to update attempt");
                    }
                }

            }catch(err){
                console.log(err)
            }
        };

    return (
        <div className="quiz_multi_container">
            <div 
                dangerouslySetInnerHTML={{__html: page.question}}
            />

            <div className="quiz_multi_buttons">
                {page.answers.map((answer) => (
                    <button 
                        disabled={completed}
                        className={`quiz_multi_button ${
                            selectedAnswer?.answer_id === answer.answer_id
                                ? answer.is_correct
                                    ? "correct"
                                    : "wrong"
                                : ""
                        }`}
                        key={answer.answer_id}
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

export default Multiple_choice;