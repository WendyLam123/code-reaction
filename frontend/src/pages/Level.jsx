import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "../styles/Level.css";

import Nav from "../components/Nav";
import Game from "../components/lessonPage/game/Game";
import Quiz from "../components/lessonPage/quiz/Quiz";

function Level() {
    const { courseId, pageOrder } = useParams();
    const navigate = useNavigate();

    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //manage next/previous page within course
    const currentOrder = Number(pageOrder);
    //find next page index within current course pages
    const nextPage = pages.find(
        (page) => page.page_order === currentOrder + 1
    );

    const previousPage = pages.find(
        (page) => page.page_order === currentOrder - 1
    );


    // Get all pages belonging to this course
    useEffect(() => {
        const getPages = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/courses/${courseId}`);

                if (!res.ok) {
                    throw new Error("Page data not loaded");
                }

                const data = await res.json();

                setPages(data);

                // Find the current page using page_order
                const page = data.find(
                    (page) => page.page_order === Number(pageOrder)
                );

                if (!page) {
                    setCurrentPage(null);
                    return;
                }

                setCurrentPage(page);

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getPages();
    }, [courseId, pageOrder]);

    //go to next page within the same course
    function changePage(direction) {
        if (direction === "next") {
            // Same course, next page
            navigate(`/Learn/${courseId}/${nextPage.page_order}`);
        } else if (direction === "previous"){
            navigate(`/Learn/${courseId}/${previousPage.page_order}`);
        }else {
            // No more pages in this course
            // TODO: later replace with actual next course ID
            navigate(`/Learn/${Number(courseId) + 1}/1`);
        }
    }

    //go to next course
    function goToNextCourse() {
        navigate(`/Learn/${Number(courseId) + 1}/1`);
    }

    if (loading) {
        return <p>Please wait, page is loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!currentPage) {
        navigate("/Learn");
    }

    //Render Game Page
    if (currentPage.page_type === "game") {
        return(
            <div className="gamePage">
                <Nav />
                <Game page={currentPage} changePage={changePage} goToNextCourse={goToNextCourse} />
            </div>
        )
    }

    //Render Lesson Page
    return (
        <main className="level_main">
            <div className="lesson">
                <div className="levelPage_header">
                    <h1>{currentPage.course_title}</h1>
                    <Nav />
                    <button
                        className="nextCourseButton"
                        onClick={goToNextCourse}
                    >
                        Next
                    </button>
                </div>

                <div className="lessonMiddle">
                    {
                        (currentPage.page_type === "lesson" || currentPage.page_type === "activity") && 
                        <div dangerouslySetInnerHTML={{__html: currentPage.content}}/>
                    }

                    {
                        (currentPage.page_type === "quiz") && <Quiz page={currentPage} />
                    }
                </div>

                <div className="nextButtonContainer">
                    {previousPage && (
                            <button
                                className="nextButton"
                                onClick={()=>changePage("previous")}
                            >
                                Previous Page
                            </button>
                        )}

                    {nextPage && (
                            <button
                                className="nextButton"
                                onClick={()=>changePage("next")}
                            >
                                Next Page
                            </button>
                        )}
                </div>
                {/* Page navigation buttons */}
                <div className="buttonRow">
                    {pages.map((page, index) => {
                        //if %3 = 0 --> biege (0, 3, 6)
                        //if %3 = 2 --> brown (2, 5, 8)
                        //if %3 = 1 --> orange (1, 4, 7)

                        let color = "";
                        switch (index % 3) {
                            case 0:
                                color = "biegeButton";
                                break;
                            case 1:
                                color = "orangeButton";
                                break;
                            case 2:
                                color = "brownButton";
                                break;
                            default:
                                color = "";
                        }
                        return (
                            <button
                                className={`${color} lessonButton ${
                                    currentPage.id === page.id
                                        ? "active-button"
                                        : ""
                                }`}
                                key={page.id}
                                onClick={() =>
                                    navigate(
                                        `/Learn/${courseId}/${page.page_order}`
                                    )
                                }
                            >
                                {index + 1}
                            </button>
                        );

                    })}

                </div>
            </div>
        </main>
    );
}

export default Level;