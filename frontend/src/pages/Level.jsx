import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router";
import "../styles/Level.css";

import Nav from "../components/Nav";

function Level(){
    const {levelId} = useParams();
    const [pages, setPages] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);



    useEffect(() => {
        const getPages = async () =>{
            try{
                const res = await fetch(`/api/level/${levelId}`);
                if (!res.ok){
                    throw new Error("Page data not loaded");
                }

                const data = await res.json();
                setPages(data);
                setCurrentPage(data[0])
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getPages();
    }, [levelId]);

    //if the data is not finish loading...
    if (!currentPage){
        return <p>Please wait, page is loading...</p>
    }

    return (
        <main>
            <div className= "lesson">
                <h1>{currentPage.courses_title}</h1>
                <Nav />
                
                <div className = "lessonMiddle">
                    <h2>{currentPage.title}</h2>
                    <br/>
                    <div 
                        dangerouslySetInnerHTML={{__html: currentPage.body}}
                    />
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
                >{page.page}</button>
                )
                })}   
            </div>

            </div>
        </main>
    )
}
export default Level;