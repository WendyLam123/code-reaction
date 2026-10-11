import {React, useState} from "react";
import { useNavigate, useParams } from "react-router";
import Nav from "../../Nav";
import "./Game.css";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";

import {DragDropProvider} from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers'
import Column from "./Column";
import Item from "./Item";
import P5Game from './p5Game/test'

export default function Game({page, changePage, goToNextCourse}) {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const [submittedCode, setSubmittedCode] = useState(null);

    /*const codeBlocks = JSON.parse(page.game.code_blocks);
    const codeBlocksFormatted = codeBlocks.map((block, index) => ({
        id: index,
        content: block
    }));
    */
   const codeBlocksFormatted = [
    {
        "id": 1,
        "type": "variable",
        "value": "block",
        "code": "let block;"
    },
    {
        "id": 2,
        "type": "setup",
        "code": "function setup() {"
    },
    {
        "id": 3,
        "type": "canvas",
        "code": "new Canvas(865,750);"
    },
    {
        "id": 4,
        "type": "createSprite",
        "value": "block",
        "code": "block = new Sprite(100,270,50,50);"
    },
    {
        "id": 5,
        "type": "end",
        "code": "}"
    },
    {
        "id": 6,
        "type": "update",
        "code": "function update() {"
    },
    {
        "id": 7,
        "type": "background",
        "value": "#dbb691ff",
        "code": "background('#dbb691ff');"
    },
    {
        "id": 8,
        "type": "end",
        "code": "}"
    }
    ]

    const [items, setItems] = useState({
        ToolBox: [...codeBlocksFormatted],
        WorkSpace: [],
    });

    function submitCode(){
        setSubmittedCode(items["WorkSpace"])
    }

    /*
    <div id="winNote">
                    <p id = "win"></p>
                    <button 
                        style={{display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            onClick={goToNextCourse}
                        >
                            Go to next level <FaCaretRight size="50px"/>
                        </button>
                </div>
    */
    
    return (

    <DragDropProvider 
        onDragOver={(event)=>{
            setItems((items) => move(items, event));
        }}    
    >

        <div className="mainContainer">
            <div className="leftPanel" id="gameContainer">
                <P5Game submittedCode={submittedCode}/>
            </div>

            <div className="wholerightPanel">
                <div className="toolBox">
                    <p id="toolBoxTitle">ToolBox</p>
                    <Column id="ToolBox" className="toolBoxContainer">
                        {items.ToolBox.map((item, index)=>(
                            <Item
                                key={item.id}
                                id={item.id}
                                index={index}
                                column="ToolBox"
                                content={item.code}
                                className="items"
                            />
                        ))}
                    </Column>
                </div>

                <button 
                    className="check-btn" 
                    id="check"
                    onClick={submitCode}
                >
                    <i className="fa-solid fa-play"></i>
                </button>  

                <div className="rightPanel">

                    <div className="rightPaneltop">

                        <button
                            className="nextButton"
                            onClick={()=>changePage("previous")}
                        >
                            <FaCaretLeft size="30px"/>
                        </button>

                        <h1>{page.game.title}</h1>

                        <button
                            className="nextCourseButton"
                            onClick={goToNextCourse}
                        >
                            <FaCaretRight size="30px"/>
                        </button>
                        <Nav />
                    </div>

                    <div className="rightPanelInstruction">
                        {<div dangerouslySetInnerHTML={{__html: page.game.instructions}}/>}
                                
                        <button type="button" className="collapsible">Click Here To See the Code!</button>   
                        <div className='collapsibleContent'>
                            {<div dangerouslySetInnerHTML={{__html: page.game.tips}}/>}           
                        </div>
                    </div>

                    <Column id = "WorkSpace" className="codingSection">                    
                        {items.WorkSpace.map((item, index)=>(
                            <Item
                                key={item.id}
                                id={item.id}
                                index={index}
                                column="WorkSpace"
                                content={item.code}
                                className="items"
                            />
                        ))}
                    </Column>

                        
                </div>
            </div>
        </div>

    </DragDropProvider>
    );

}
