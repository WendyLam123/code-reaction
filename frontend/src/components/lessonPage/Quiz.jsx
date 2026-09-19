function Quiz({ page }) {
    //lessonPage's type: if it's quiz, has 2 cases
    //1: multi-choice
    //2: input answer

    //use dangerouslySetInnerHTML temporary, need to use a more secure way later

    switch (page.question_type) {
        case "multiple_choice":
            return (
                <div className="quiz_multi_container">
                    <div 
                        dangerouslySetInnerHTML={{__html: page.question}}
                    />

                    <div className="quiz_multi_buttons">
                        {page.answers.map((answer) => (
                            <button 
                                className={`quiz_multi_button ${checkMultiAnswer(answer)}`}
                                key={answer.answer_id}
                                onClick={()=>setSelectedAnswer(answer)}
                                >
                                {answer.answer}
                            </button>
                        ))}
                    </div>

                </div>
            );

        case "input":
            return (
                <div className="quiz_input_container">
                    <div className="quiz_input_question"
                        dangerouslySetInnerHTML={{__html: page.question}}
                    />
                    <div className="quiz_input_subContainer">
                        <input 
                            type="text" 
                            name="quiz_input" 
                            value={quizInput}
                            onChange={(e)=>{setQuizInput(e.target.value)}}
                            placeholder="Type your answer here..."/>
                        <button
                            type="submit"
                            onClick={()=>checkInputAnswer(page)}
                        >Submit</button>

                        <div
                            className={
                                selectedAnswer === "correct"
                                    ? "isCorrect"
                                    : selectedAnswer === "wrong"
                                    ? "isWrong"
                                    : ""
                            }
                            >{selectedAnswer === "correct"
                                ? "Correct!"
                                : selectedAnswer === "wrong"
                                ? "Wrong, Try again!"
                                : ""}
                        </div>
                    </div>
                </div>
            );

        default:
            return <p>Unknown question type</p>;
    }
}

export default Quiz;