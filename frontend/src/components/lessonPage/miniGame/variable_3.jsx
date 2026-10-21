import MiniGame from "./MiniGame";

const s2 = (p) => {
    let boximg, woodbimg, woodwimg, woodgimg;
    let currentSprite = null;
    let box = null;

    p.preload = () => {
        boximg = p.loadImage("/assets/box.png");
        woodbimg = p.loadImage("/assets/wood-brown.png");
        woodwimg = p.loadImage("/assets/wood-white.png");
        woodgimg = p.loadImage("/assets/wood-green.png");    
    };

    p.setup = () => {
        p.createCanvas(600, 400);
        p.background("white");
        p.world.gravity.y = 10;

        let correctBox = document.getElementById('callBox');
        let variableButton = document.getElementById('submitBoxName');

        variableButton.addEventListener("click", () =>{
            let userAnswer = document.getElementById('inputBox').value.trim(); 
        userAnswer = userAnswer.replace(/\s+/g, '');
        if (box) {
            box.remove();
            correctBox.innerHTML = "";
        }

        if (userAnswer === 'letbox;') {
            box = new p.Sprite(100,270,100,100);
            box.img = boximg;
            box.image.scale = 2.5;
            box.width = 100;
            box.height = 20;
            box.collider = 'static';
            box.layer = 1;
            correctBox.innerHTML = "Variable 'box' is created!"
            correctBox.classList.add("correctReminder");
        } else{
            correctBox.classList.remove("correctReminder");
        }
        })

        let brownValue = document.getElementById('callValue');
        let boxButton = document.getElementById('submitVariableName');
        
        boxButton.addEventListener("click", () => {
            let answer = document.getElementById('inputVariable').value.trim(); 
            answer = answer.replace(/\s+/g,'');
        if (currentSprite) {
            currentSprite.remove();
            brownValue.innerHTML = "";
        }

        if (answer === "box='wood_brown';" || answer === 'box="wood_brown";') {
            currentSprite = new p.Sprite(100, 70, 100, 100);
            currentSprite.img = woodbimg;
            brownValue.innerHTML = "Value 'wood_brown' is added!<br>Value of the Box is wood_brown!";
            brownValue.classList.add("correctReminder");
            currentSprite.layer = 2;
        } else if (answer === "box='wood_white';" || answer === 'box="wood_white";') {
            currentSprite = new p.Sprite(100, 70, 100, 100);
            currentSprite.img = woodwimg;
            brownValue.innerHTML = "Value 'wood_white' is added! <br>Value of the Box is wood_white!";
            brownValue.classList.add("correctReminder");
        } else if (answer === "box='wood_green';" || answer === 'box="wood_green";') {
            currentSprite = new p.Sprite(100, 70, 100, 100);
            currentSprite.img = woodgimg;
            brownValue.innerHTML = "Value 'wood_green' is added! <br>Value of the Box is wood_green!";
            brownValue.classList.add("correctReminder");
        } else{
            brownValue.classList.remove("correctReminder");
        }

        if (currentSprite) {
            currentSprite.image.scale = 1.5;
            currentSprite.width = 100;
            currentSprite.height = 100;
            currentSprite.collider = 'dynamic';
        }
        })


    };

    p.draw = () => {
        p.background("white");
    };
};

export default function Variable3() {
    return <MiniGame sketch={s2} />;
}