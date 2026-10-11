let blockimg, stairsimg, arrowimg, crateimg, doorwayimg, doorClosedimg, alienimg;

function preload(){
    blockimg = loadImage("/assets/block_E.png");
    stairsimg = loadImage('/assets/stairs_E.png');
    arrowimg = loadImage('/assets/arrow_W.png');
    crateimg = loadImage('/assets/crate_E.png');
    doorwayimg = loadImage('/assets/doorwayMiddle_W.png');
    doorClosedimg = loadImage('/assets/doorClosed_S.png');
    alienimg = loadImage('/assets/shipYellow.png');
}

function setup() {
    const container = document.getElementById('gameContainer');
    createCanvas(container.offsetWidth, container.offsetHeight);
    background('#dbb691ff');
    world.gravity.y = 5;
    block = new Sprite(100,270, 50, 'pentagon');
    block.width = 100;
    block.height = 100;
    block.img = blockimg;
    block.image.scale = 0.8;
    block.rotationSpeed = 0;
    block.friction = 0.5;
    block.collider = 'static';

    stairs = new Sprite(100,400,[-100,30])
    stairs.img = stairsimg;
    stairs.image.scale = 2;
    stairs.collider = 'static';

    arrow = new Sprite(200,490, [-100,30]);
    arrow.offset.y =10;
    arrow.img = arrowimg;
    arrow.collider = 'static';
    arrow.image.scale = 2.5;

    crate = new Sprite(300,600,[0,100]);
    crate.img = crateimg;
    crate.collider = 'static';
    crate.image.scale = 2.5;

    doorway = new Sprite(420,480,[-200,-27]);
    doorway.offset.y = 20;
    doorway.img = doorwayimg;
    doorway.collider = 'static';
    doorway.image.scale = 2;

    doorClosed = new Sprite(485,400);
    doorClosed.width = 0;
    doorClosed.height = 150;
    doorClosed.img = doorClosedimg;
    doorClosed.collider = 'static';
    doorClosed.image.scale = 2;

    alien = new Sprite(620,420);
    alien.img = alienimg;
    alien.collider = 'static';
    alien.image.scale = 2;

    block.layer = 3;
    stairs.layer = 1;
    crate.layer = 2;
    arrow.layer = 1;
    doorway.layer = 1;
    doorClosed.layer = 1;
    alien.layer = 0;

}

function draw(){
    background('#dbb691ff');
}


function update(){
    block.rotationSpeed =0;

    debug = true;

    if(block.colliding(crate)){
        block.vel.x = 8;
        block.vel.y = -1;
        block.rotation = 0;
    }
    if(block.colliding(arrow)){
        block.vel.x = 3;
        block.vel.y = 2;
    }
     if (block.colliding(doorClosed)) {
            doorClosed.image = '/assets/doorOpen_S.png';
            doorClosed.image.scale = 2;
            doorClosed.x = 470;
        if(doorClosed.image = '/assets/doorOpen_S.png'){
        block.vel.x = -10;
        block.vel.y = -10;
        alien.x = width/2;
        alien.y = height-height/3;
        alien.layer = 2;
        }
        if(alien.x === width/2){
            const winmessage = document.getElementById('win').innerHTML = "Mission Accomplished! <br> Go to next level";
            document.getElementById('winNote').style.backgroundColor = "rgba(244, 237, 223, 0.835)";
            const nextButton = document.getElementById('nextButton').innerHTML = '<i class="fa-solid fa-caret-right"></i>';
        }
    }
}

    // Check the order of blocks in the codingSection
function checkOrder() {
        const blocksInCodingSection = Array.from(codingSection.children); // get all added block in the coding Section

        if (blocksInCodingSection.length !== ifFunction.length){
            return;
        }

        let allCorrect = true;

        blocksInCodingSection.forEach((block, index) => {
          const blockName = block.querySelector('.draggable').innerText.trim(); // get the block name
  
          //add correct/wrong effect:
          if (blockName !== ifFunction[index]) {
            block.classList.add('wrong'); 
           block.classList.remove('right'); 
          } else {
            block.classList.remove('wrong');
            block.classList.add('right'); 
          }
        });
        // Check if blocks are in the correct order
        const Correct = allCorrect && blocksInCodingSection.every((block, index) => block.querySelector('.draggable').innerText.trim() === ifFunction[index]);
  
  
        if (Correct) {
          gameStart();
        } else {
          gameFreeze();
        }
      }

function gameStart(){
    block.collider = 'dynamic';
}
function gameFreeze(){
    block.collider = 'static';
}