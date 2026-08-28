import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import "https://kit.fontawesome.com/44ae50a47e.js";
import "../styles/Levels.css";
import doorClosed_N from "../assets/objects/doorClosed_N.png";
import doorClosed_S from "../assets/objects/doorClosed_S.png";
import arrow_S from "../assets/objects/arrow_S.png";


export default function Levels(){
    let params = useParams();
    return (
        <main id="levelsPageContainer">
            <div className="levelBox">
                <section className="levelContainer">
                    <header className="levelTitles">
                        <h1>Level 1: Introduction of JavaScript</h1>
                    </header>
                    
                    <p className = "levelReminder levelReminder1">
                        Click images to explore lessons and games!
                    </p>

                    <div className = "level">
                        <Link to="/">
                            <button className="levelButtons">
                                <img 
                                    className="levelImages levelDoor" 
                                    src={doorClosed_N}
                                    alt="What is Javascript?"
                                />
                                <span className = "stageName">
                                    What is javascript (JS)?
                                </span>
                            </button>
                        </Link>
                        
                        <Link to="/intro">
                            <button className="levelButtons">
                                <img
                                    className="levelImages levelArrow"
                                    src={arrow_S}
                                    alt="HTML and CSS"
                                />
                                <span className="stageName">
                                What is HTML and CSS?
                                </span>
                            </button>
                        </Link>

                        <Link to="/intro">
                            <button className="levelButtons">
                                <img
                                className="levelImages levelDoor"
                                src={doorClosed_N}
                                alt="Summary"
                                />
                                <span className="stageName">
                                    Summary:
                                </span>
                            </button>
                        </Link> 
                        
                        <p className="levelReminder levelReminder2"> Scroll to right or click the arrow to see next level!</p>
                        <i className="fa-solid fa-down-long levelReminderPointDown levelReminderPointDown2"></i>

                        <button className = "levelMoveRight levelMoveRight1">
                            <i className="fa-solid fa-caret-right levelGoToRightArrow"></i>
                            <p>Go to Next Level!</p>
                        </button>
                    </div>
                </section>

                <section>

                </section>

            </div>
        </main>
    )
}

