import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import "https://kit.fontawesome.com/44ae50a47e.js";
import "../styles/Levels.css";

import doorClosed_N from "../assets/objects/doorClosed_N.png";
import doorClosed_S from "../assets/objects/doorClosed_S.png";
import arrow_S from "../assets/objects/arrow_S.png";
import Nav from "../components/Nav";

export default function Levels(){
    const [courses, setCourses] = useState([]);
    const [levels, setLevels] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const sections = [];

    //fetch courses/levels data from database
    useEffect(()=>{
        const getData = async()=>{
            try{
                const resCourse = await fetch("/api/courses");
                const resLevels = await fetch("/api/levels");
                //error handler
                if (!resCourse.ok){
                    throw new Error("Courses data not loaded")
                }else if (!resLevels.ok){
                    throw new Error("Levels data not loaded")
                }
                //if success
                const coursesData = await resCourse.json();
                const levelsData = await resLevels.json();

                setCourses(coursesData);
                setLevels(levelsData);
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
                    //get all levels of the course (e.g.: course1: level1, level2, level3; course2: level4)
                    const courseLevels = levels.filter(
                        (level) => level.course_id === course.id
                    );

                    return(
                        <section id ={`course${index}`} className="levelContainer" key={course.id}>
                            <header className="levelTitles">{course.title}</header>
                            <div className = "level">
                                {courseLevels.map((level, index)=>(
                                    (index % 2 === 0)
                                    ?(
                                        <Link to={`/Levels/${level.id}`} key={level.id}>
                                            <button className="levelButtons">
                                                <div className="imageWrapper_Door">
                                                    <img 
                                                        className="levelDoor" 
                                                        src={doorClosed_N}
                                                        alt={level.title}
                                                    />
                                                </div>
                                                <span className = "stageName">
                                                    {level.title}
                                                </span>
                                            </button>
                                        </Link>
                                    ):
                                        <Link to={`/Levels/${level.id}`} key={level.id}>
                                            <button className="levelButtons">
                                                <div className="imageWrapper_Arrow">
                                                    <img
                                                        className="levelArrow"
                                                        src={arrow_S}
                                                        alt={level.title}
                                                    />
                                                </div>
                                                <span className="stageName">
                                                    {level.title}
                                                </span>
                                            </button>
                                        </Link>
                                ))}
                                <p className="levelReminder levelReminder2"> Scroll to right or click the arrow to see next level!</p>
                                <i className="fa-solid fa-down-long levelReminderPointDown levelReminderPointDown2"></i>

                                {/* check if there is next course, if so, go to that section, if no, stay in the current section */}
                                <a href={`#course${index<courses.length-1? index+1: index}`} className="levelMoveRight">
                                    <i className="fa-solid fa-caret-right levelGoToRightArrow"></i>
                                    <p>Go to Next Level!</p>
                                </a>
                            </div>
                        </section>
                    )})}

                
            </div>
        </main>
    )
}

