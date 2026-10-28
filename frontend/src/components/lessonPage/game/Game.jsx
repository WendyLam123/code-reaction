import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Nav from "../../Nav";
import "./Game.css";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import Column from "./Column";
import Item from "./Item";
import AlienRescue from "../../../GameLogic/lesson2_game";

export default function Game({ page, changePage, goToNextCourse }) {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [submittedCode, setSubmittedCode] = useState([]);
  const [errors, setErrors] = useState(new Map());
  const [win, setWin] = useState(false);
  const [reset, setReset] = useState(false);
  const [showHit, setShowHit] = useState(false);

  /*const codeBlocks = JSON.parse(page.game.code_blocks);
    const codeBlocksFormatted = codeBlocks.map((block, index) => ({
        id: index,
        content: block
    }));
    */
const codeBlocksFormatted = [
  {
    id: 1,
    type: "declaration",
    belong: "global",
    //let block;
    code: "let block;",
    order: 1,
    values: {
      name: "block",
    },
  },
  {
    id: 2,
    type: "create_sprite",
    belong: "setup",
    code: "block = createSprite(100, 200, 100, 100);",
    order: 2,
    values: {
      name: "block",
      x: 100,
      y: 200,
      width: 50,
      height: 160,
    },
  },
  {
    id: 3,
    type: "if",
    belong: "update",
    code: "if (touching(block, crateCollider)) {\nsetVelocity(block, 3, -3);\nsetRotation(block, 0);}",
    order: 3,
    values: {
      condition: [
        {
          type: "detectCollision",
          from: {
            name: "block",
            source: "userBlock",
          },
          to: {
            name: "crateCollider",
            source: "gameBlock",
          },
        },
      ],
      actions: [
        {
          type: "set_velocity",
          values: {
            target: {
              name: "block",
              source: "userBlock",
            },
            vel: { x: 3, y: -3 },
          },
        },
        {
          type: "set_rotation",
          values: {
            target: {
              name: "block",
              source: "userBlock",
            },
            rotation: 0,
          },
        },
      ],
    },
  },
];

  const [items, setItems] = useState({
    ToolBox: [...codeBlocksFormatted],
    WorkSpace: [],
  });

  function updateBlockValues(blockId, placeToChange, value){
    setItems((prev)=>{
      return {
        ...prev, 
        WorkSpace: prev.WorkSpace.map((block)=>{
          if (block.id !== blockId){
            return block;
          }

          const updatedBlock = {
            ...block,
            values: {...block.values, [placeToChange]: value}
          }
          return updatedBlock;
        })
      }
    })
  }

  function updateIfVelocity(blockId, actionIndex, axis, value) {
  setItems((prev) => ({
    ...prev,
    WorkSpace: prev.WorkSpace.map((block) => {
      if (block.id !== blockId) return block;

      const actions = block.values.actions.map((action, index) => {
        if (index !== actionIndex || action.type !== "set_velocity") {
          return action;
        }

        return {
          ...action,
          values: {
            ...action.values,
            vel: {
              ...action.values.vel,
              [axis]: value,
            },
          },
        };
      });

      return {
        ...block,
        values: {
          ...block.values,
          actions,
        },
      };
    }),
  }));
}

  function submitCode() {
    console.log(items["WorkSpace"])
    setSubmittedCode(items["WorkSpace"]);
    setErrors(new Map());
    setWin(false);
  }

  function resetGame() {
    setItems({
      ToolBox: [...codeBlocksFormatted],
      WorkSpace: [],
    });

    setSubmittedCode([]);
    setErrors(new Map());
    setWin(false);

    setReset((prev) => !prev);
  }

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="mainContainer">
        <div className="leftPanel">
          <AlienRescue
            CODE_BLOCKS={submittedCode}
            setErrors={setErrors}
            setWin={setWin}
            reset={reset}
          />
        </div>

        {win && (
          <div id="winNote">
            <p id="win"></p>
            <button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={goToNextCourse}
            >
              Go to next level <FaCaretRight size="50px" />
            </button>
          </div>
        )}

        <div className="wholerightPanel">
          <div className="toolBox">
            <p id="toolBoxTitle">ToolBox</p>
            <Column id="ToolBox" className="toolBoxContainer">
              {items.ToolBox.map((item, index) => (
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

          <button className="check-btn" id="check" onClick={submitCode}>
            <i className="fa-solid fa-play"></i>
          </button>

          <div className="rightPanel">
            <div className="rightPaneltop">
              <button
                className="nextButton"
                onClick={() => changePage("previous")}
              >
                <FaCaretLeft size="30px" />
              </button>

              <h1>{page.game.title}</h1>

              <button className="nextButton" onClick={goToNextCourse}>
                <FaCaretRight size="30px" />
              </button>

              <button className="resetGame" onClick={resetGame}>
                Reset
              </button>

              <Nav />
            </div>

            <div className="rightPanelInstruction">
              {
                <div
                  dangerouslySetInnerHTML={{ __html: page.game.instructions }}
                />
              }

              <div className="collapsible">
                <button
                  className="collapsibleButton"
                  onClick={() => setShowHit((prev) => !prev)}
                >
                  Click Here To See Hint
                </button>
                {showHit && (
                  <div className="collapsibleContent">
                    {
                      <div
                        dangerouslySetInnerHTML={{ __html: page.game.tips }}
                      />
                    }
                  </div>
                )}
              </div>
            </div>

            <Column id="WorkSpace" className="codingSection">
              {items.WorkSpace.map((item, index) => {
                const error = errors.get(item.id);

                return (
                  <div key={item.id} className="workSpaceRow">
                    <div className="errorContainer">
                      <div
                        className={`errorDot ${error ? "hasError" : ""}`}
                        title={error || ""}
                      ></div>
                      {error && <div className="errorMessage">{error}</div>}
                    </div>
                    <Item
                      id={item.id}
                      index={index}
                      column="WorkSpace"
                      content={item.code}
                      item={item}
                      updateBlockValues={updateBlockValues}
                      updateIfVelocity={updateIfVelocity}
                    />
                  </div>
                );
              })}
            </Column>
          </div>
        </div>
      </div>
    </DragDropProvider>
  );
}
