import React, { useState, useEffect } from "react";
import { data, Link, useParams} from "react-router";
import "../styles/Level.css";

import Nav from "../components/Nav";

function Level(){
    const {levelId} = useParams();
    const [pages, setPages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);

    //get next level id for the next button
    const [nextLevel, setNextLevel] = useState(null);

    //quiz feature
    const [quizInput, setQuizInput] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);


    useEffect(() => {
        const getPages = async () =>{
            try{
                
                const res = await fetch(`/api/Levels/${levelId}`);

                if (!res.ok){
                    throw new Error("Page data not loaded");
                }
                const data = await res.json();

                //organize data into map, no duplicate values
                //use map to quickly check if the levelPages.id existed
                const dataMap = new Map();

                data.forEach(row=>{
                    if (!dataMap.has(row.id)){
                        dataMap.set(row.id, {
                            id: row.id,
                            course_id: row.course_id,
                            courses_title: row.courses_title,
                            title: row.title,
                            content: row.content,
                            page_type: row.page_type,

                            quiz_id: row.quiz_id,
                            question: row.question,
                            question_type: row.question_type,

                            answers: []
                        });
                    }

                    //check if the levelPage has a quiz content(check if answer_id exist), if so, put the related content to a array
                    //if multichoice: answer is the choice
                    //if input: answer is the correct answer, later check user input with this
                    //[{answer1...}, {answer2...}]
                    if (row.answer_id !== null){
                        dataMap.get(row.id).answers.push({
                            answer_id: row.answer_id, 
                            answer: row.answer,
                            is_correct: row.is_correct
                        })
                    }
                })
                console.log(dataMap);

                const pages = [...dataMap.values()];
                console.log(pages);

                //get the biggest page id, and use it to get the next level id
                const lastPageId = Math.max(...pages.map((page)=> page.id));
                const nextRes = await fetch(`/api/Levels/${lastPageId}/next`);
                if (!nextRes.ok){
                    throw new Error("Next level data not loaded");
                }
                
                const nextId = await nextRes.json();
                console.log(`Next Level ID: ${nextId}`);
                //console.log('answer: ' + pages[10].answers[1].answer)

                setPages(pages);
                //levelId is string, convert to number first
                setCurrentPage(
                    pages.find((page)=> page.id === parseInt(levelId))
                );
                setNextLevel(nextId);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getPages();
    }, [levelId]);


    function Lesson({ page }){
        return (
            <div 
                dangerouslySetInnerHTML={{__html: page.content}}
            />
        )
    }


    function checkMultiAnswer(answer){
        //if it's not selected, return ""
        if (!selectedAnswer){
            return "";
        }

        //if previous selected button, don't add class
        if (selectedAnswer.answer_id !== answer.answer_id){
            return "";
        }

        //if the selected is correct (===1)
        if (answer.is_correct){
            return "correct";
        }
        return "wrong"
    }

    function checkInputAnswer(page){
        const correctAnswer = page.answers[0].answer;
        if (quizInput.trim().toLowerCase() === correctAnswer){
            setSelectedAnswer("correct")
        }else{
            setSelectedAnswer("wrong")
        }
    }


    function Quiz({ page }) {
        console.log(page.answers)

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

    //if the data is not finish loading...
    if (loading){
        return <p>Please wait, page is loading...</p>
    }

    if (error){
        return <p>Error: {error.message}</p>
    }

    if (!currentPage){
    return <p>Page not found</p>
    }

    return (
        <main className="level_main">
            <div className= "lesson">
                <div className="levelPage_header">
                    <h1>{currentPage.courses_title}</h1>
                    <Nav />

                    {/*if nextLevel exist, show the next level button*/}
                    {nextLevel && (
                        <button className="nextLevelButton">
                            <Link to={`/Levels/${nextLevel}`}>Next Level</Link>
                        </button>
                    )}
                </div>

                {/*if the lessonPage is a quiz, fetch quiz content. if not, show regular lesson */}
                <div className = "lessonMiddle">
                    {currentPage?.page_type === "quiz" ? (
                        <Quiz page={currentPage} />
                    ):(
                        <Lesson page={currentPage} />
                    )}
                </div>
            
            
            <div className="buttonRow">
                {pages.map((page, index)=>{
                    //if %3 = 0 --> biege (0, 3, 6)
                    //if %3 = 2 --> brown (2, 5, 8)
                    //if %3 = 1 --> orange (1, 4, 7)

                    let color = "";

                    switch(index % 3) {
                        case 0:
                            color = "biegeButton";
                            break;
                        case 1:
                            color = "orangeButton"
                            break;
                        case 2:
                            color = "brownButton"
                            break;
                    }

                return(
                    <button 
                    //if currentPage exist (not null), check if the currentPage id is the button page id, if so, add the active-button class
                    className={`${color} lessonButton ${currentPage?.id === page.id ? "active-button":""}`}
                    key={page.id}
                    onClick={()=>setCurrentPage(page)}
                >{index+1}</button>
                )
                })}   
            </div>

            </div>
        </main>
    )
}
export default Level;