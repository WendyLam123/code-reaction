import { useState } from "react";
import Matter from "matter-js";
import MiniGame from "./MiniGame";
import "./variable_3.css";

const { Engine, Bodies, Composite } = Matter;

function Hint({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hint">
      <button
        type="button"
        className="collapsible"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <i className="fa-solid fa-lightbulb" aria-hidden="true" />
        {isOpen ? " Hide hint" : " Need a hint? Click here"}
      </button>

      {isOpen && <div className="collapsibleContent">{children}</div>}
      
    </div>
  );
}

function variableSketch(p) {
  let boxImage;
  let woodBrownImage;
  let woodWhiteImage;
  let woodGreenImage;

  let engine;
  let platform = null;
  let wood = null;
  let debugMode = true; 

  p.preload = () => {
    boxImage = p.loadImage("/assets/objects/box.png");
    woodBrownImage = p.loadImage("/assets/objects/wood-brown.png");
    woodWhiteImage = p.loadImage("/assets/objects/wood-white.png");
    woodGreenImage = p.loadImage("/assets/objects/wood-green.png");
  };

  p.setup = () => {
    p.createCanvas(600, 400);
    p.imageMode(p.CENTER);

    engine = Engine.create();
    engine.gravity.y = 1;

    const floor = Bodies.rectangle(300, 410, 600, 20, {
      isStatic: true,
    });
    Composite.add(engine.world, floor);

    const boxMessage = document.getElementById("callBox");
    const boxButton = document.getElementById("submitBoxName");
    const boxInput = document.getElementById("inputBox");

    const valueMessage = document.getElementById("callValue");
    const valueButton = document.getElementById("submitVariableName");
    const valueInput = document.getElementById("inputVariable");

    if (boxButton && boxInput && boxMessage) {
      boxButton.onclick = () => {
        const answer = boxInput.value.trim().replace(/\s+/g, "");

        if (platform) {
          Composite.remove(engine.world, platform);
          platform = null;
        }

        if (answer === "letbox;") {
          platform = Bodies.rectangle(100, 270, 100, 20, {
            isStatic: true,
          });
          Composite.add(engine.world, platform);

          boxMessage.textContent = "Variable 'box' is created!";
          boxMessage.classList.add("correctReminder");
        } else {
          boxMessage.textContent = "";
          boxMessage.classList.remove("correctReminder");
        }
      };
    }

    if (valueButton && valueInput && valueMessage) {
      valueButton.onclick = () => {
        const answer = valueInput.value.trim().replace(/\s+/g, "");

        if (wood) {
          Composite.remove(engine.world, wood);
          wood = null;
        }

        let woodImage = null;
        let message = "";

        if (
          answer === "box='wood_brown';" ||
          answer === 'box="wood_brown";'
        ) {
          woodImage = woodBrownImage;
          message = "Value 'wood_brown' is added!\nValue of the box is wood_brown!";
        } else if (
          answer === "box='wood_white';" ||
          answer === 'box="wood_white";'
        ) {
          woodImage = woodWhiteImage;
          message = "Value 'wood_white' is added!\nValue of the box is wood_white!";
        } else if (
          answer === "box='wood_green';" ||
          answer === 'box="wood_green";'
        ) {
          woodImage = woodGreenImage;
          message = "Value 'wood_green' is added!\nValue of the box is wood_green!";
        }

        if (woodImage) {
          wood = Bodies.rectangle(100, 70, 100, 100, {
            restitution: 0.2,
          });
          wood.plugin = { ...wood.plugin, image: woodImage };
          Composite.add(engine.world, wood);

          valueMessage.textContent = message;
          valueMessage.classList.add("correctReminder");
        } else {
          valueMessage.textContent = "";
          valueMessage.classList.remove("correctReminder");
        }
      };
    }
  };

  p.draw = () => {
  p.background("white");

  if (!engine) return;

  Engine.update(engine, 1000 / 60);

  if (platform && boxImage) {
    p.image(boxImage, platform.position.x, platform.position.y-10, 100, 100);
  }

  if (wood?.plugin?.image) {
    p.push();
    p.translate(wood.position.x, wood.position.y);
    p.rotate(wood.angle);
    p.image(wood.plugin.image, 0, 0, 100, 100);
    p.pop();
  }

  if (debugMode) {
    p.push();
    p.noFill();
    p.stroke("red");
    p.strokeWeight(2);

    for (const body of [platform, wood]) {
      if (!body) continue;

      p.beginShape();
      for (const vertex of body.vertices) {
        p.vertex(vertex.x, vertex.y);
      }
      p.endShape(p.CLOSE);
    }

    p.pop();
  }
};
}

export default function Variable3() {
  return (
    <div className="activityContainer">
      <section id="box" className="activityText">
        <div className="response" aria-live="polite">
          <p id="callBox" />
          <p id="callValue" />
        </div>

        <div id="variableText">
          <section className="activityStep">
            <p>Make a variable called box!</p>

            <div className="inputContainer">
              <input
                className="inputBoxes"
                type="text"
                id="inputBox"
                placeholder="Enter code"
              />
              <button
                className="submitBoxes"
                id="submitBoxName"
                type="button"
              >
                Submit
              </button>
            </div>

            <Hint>
              <code>let box;</code>
            </Hint>
          </section>

          <section className="activityStep">
            <p>Choose a value and assign it to box:</p>

            <ul>
              <li>wood_white</li>
              <li>wood_brown</li>
              <li>wood_green</li>
            </ul>

            <div className="inputContainer">
              <input
                className="inputBoxes"
                type="text"
                id="inputVariable"
                placeholder="Enter code"
              />
              <button
                className="submitBoxes"
                id="submitVariableName"
                type="button"
              >
                Submit
              </button>
            </div>

            <Hint>
              <code>box = 'wood_white';</code>
            </Hint>
          </section>
        </div>
      </section>

      <MiniGame sketch={variableSketch} />
    </div>
  );
}