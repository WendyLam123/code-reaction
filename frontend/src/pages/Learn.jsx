import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import "../styles/Levels.css";

const doorClosed_N = "/assets/objects/doorClosed_N.png";
const arrow_S = "/assets/objects/arrow_S.png";
import Nav from "../components/Nav";

export default function Levels(){
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //fetch courses/levels data from database
    useEffect(()=>{
        const getData = async()=>{
            try{
                const res = await fetch("/api/courses");
                //error handler
                if (!res.ok){
                    throw new Error("courses data not loaded")
                }
                //if success
                const coursesData = await res.json();
                setCourses(coursesData);
            } catch(err){
                setError(err);
            } finally{
                setLoading(false);
            };
        };
        getData();

    }, [])

    if (loading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>{error.message}</p>;
    }

    return (

        <main id="levelsPageContainer">
           <Nav />

            <div className="levelBox">
                <p className = "levelReminder levelReminder1">
                    Click images to explore lessons and games!
                </p>

                {courses.map((course, index)=>{
                    return(
                        <section id ={`course${index}`} className="levelContainer" key={course.id}>
                            <header className="levelTitles">{course.title}</header>
                            <div className = "level">
                                {course.levels.map((level, index) => {
                                    const isDoor = index % 2 === 0;

                                    return (
                                        <Link
                                            to={`/Learn/${course.id}/${level.page_order}`}
                                            key={level.id}
                                        >
                                            <button className="levelButtons">
                                                <div
                                                    className={
                                                        isDoor
                                                            ? "imageWrapper_Door"
                                                            : "imageWrapper_Arrow"
                                                    }
                                                >
                                                    <img
                                                        className={
                                                            isDoor
                                                                ? "levelDoor"
                                                                : "levelArrow"
                                                        }
                                                        src={isDoor ? doorClosed_N : arrow_S}
                                                        alt={level.title}
                                                    />
                                                </div>

                                                <span className="stageName">
                                                    {level.title}
                                                </span>
                                            </button>
                                        </Link>
                                    );
                            })}
                            <p className="levelReminder levelReminder2"> Scroll to right or click the arrow to see next level!</p>
                            <i className="fa-solid fa-down-long levelReminderPointDown levelReminderPointDown2"></i>

                            {/* check if there is next course, if so, go to that section, if no, stay in the current section */}
                            <a href={`#course${index<courses.length-1? index+1: index}`} className="levelMoveRight">
                                <i className="fa-solid fa-caret-right levelGoToRightArrow"></i>
                                <p>Go to Next Level!</p>
                            </a>
                            </div>
                        </section>
                    )
                })}

                
            </div>
        </main>
    )
}

