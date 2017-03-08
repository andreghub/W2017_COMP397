/**********************************************
 * Home Work - Task2: 
 * Due: March 7th, before class
 *
 * Add graphical representation of the hanged man:
 * . increase the width of the stage to accomodate the drawing of the hanged man
 * . after each loss of live add an additional feature
 * . lives=5 => draw the platform 
 * . lives=4 => draw the rope
 * . lives=3 => draw the head
 * . lives=2 => draw the torso
 * . lives=1 => draw the hands
 * . lives=0 => draw the feet, wait 3 seconds, show game over message
 *********************************************/


var stage, livesTxt, gameOverTxt, win;
var answer = "CREATEJS IS&AWESOME"
var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lives = 5;
var lettersNeeded = 0;


function init() {
    stage = new createjs.Stage("canvas");
    drawBoard();
    drawHangedMan();
    drawLetters();
    drawMessages();
    startGame();
}

function drawBoard() {
    var i, char, box;
    var xPos = 20;
    var yPos = 90;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char != ' ' && char != '&') {
            lettersNeeded++;
            box = new createjs.Shape();
            box.graphics.beginStroke("#000");
            box.graphics.drawRect(0, 0, 20, 24);
            box.regX = 10;
            box.regY = 12;
            box.x = xPos;
            box.y = yPos;
            box.name = 'box_' + i;
            box.key = char;
            stage.addChild(box);
        }
        xPos += 26;
        if (char == '&') {
            yPos += 40;
            xPos = 20;
        }

    }
}

function drawHangedMan(playerLost) {
    // if player lost, draw the hangedman completly again
    // if not, just draw it incrementally
    switch(lives){
        case 0:
            //draw feet
            var shape = new createjs.Shape();
            shape.graphics.beginStroke("#000")
                .moveTo(480,225).lineTo(455,250)
                .moveTo(480,225).lineTo(505,250)
                .closePath();
            stage.addChild(shape);
            
            if(!playerLost)
                break;

        case 1:
            //draw hands
            var shape = new createjs.Shape();
            shape.graphics.beginStroke("#000")
                .moveTo(480,160).lineTo(455,175)
                .moveTo(480,160).lineTo(505,175)
                .closePath();
            stage.addChild(shape);
            
            if(!playerLost)
                break;

        case 2:
            //draw torso
            var shape = new createjs.Shape();
            shape.graphics.beginStroke("#000")
                .moveTo(480,140).lineTo(480,225)
                .closePath();
            stage.addChild(shape);
            
            if(!playerLost)
                break;

        case 3:
            //draw head
            var shape = new createjs.Shape();
            shape.graphics.beginStroke("#000");
            shape.graphics.drawCircle(0, 0, 15);
            shape.x = 480;
            shape.y = 125;
            stage.addChild(shape);
            
            if(!playerLost)
                break;

        case 4:
            //draw rope
            var shape = new createjs.Shape();
            shape.graphics.beginStroke("#f00")
                .moveTo(480,80).lineTo(480,110)
                .closePath();
            stage.addChild(shape);
            
            if(!playerLost)
                break;

        case 5:
            //draw platform
            var shape = new createjs.Shape(); // platform base
            shape.graphics.beginStroke("#000").beginFill("#000");
            shape.graphics.drawRect(0, 0, 100, 15);
            shape.x = 350;
            shape.y = 260;
            stage.addChild(shape);

            shape = new createjs.Shape(); // platform stick
            shape.graphics.beginStroke("#000").beginFill("#000");
            shape.graphics.drawRect(0, 0, 10, -230);
            shape.x = 395;
            shape.y = 260;
            stage.addChild(shape);

            shape = new createjs.Shape(); // platform stick
            shape.graphics.beginStroke("#000").beginFill("#000");
            shape.graphics.drawRect(0, 0, 70, 10);
            shape.x = 405;
            shape.y = 30;
            stage.addChild(shape);

            shape = new createjs.Shape(); // platform stick
            shape.graphics.beginStroke("#000").beginFill("#000");
            shape.graphics.drawRect(0, 0, 10, 50);
            shape.x = 475;
            shape.y = 30;
            stage.addChild(shape);
            console.log(!playerLost);
            if(!playerLost)
                break;

    }
}

function drawLetters() {
    var i, char, txt, btn;
    var cnt = 0;
    var xPos = 20;
    var yPos = 200;
    for (i = 0; i < abc.length; i++) {
        char = abc[i];
        btn = new createjs.Shape();
        btn.graphics.beginFill("#000");
        btn.graphics.beginStroke("#000");
        btn.graphics.drawRect(0, 0, 20, 24);
        btn.regX = 10;
        btn.regY = 12;
        btn.x = xPos;
        btn.y = yPos;
        stage.addChild(btn);
        //create text
        txt = new createjs.Text(char);
        txt.color = "#FFF";
        txt.textAlign = 'center';
        txt.textBaseline = 'middle';
        txt.x = xPos;
        txt.y = yPos;
        stage.addChild(txt);
        btn.txt = txt;
        btn.addEventListener('click', onLetterClick);
        //adjust positions
        xPos += 24;
        cnt++;
        if (cnt == 13) {
            yPos += 30;
            xPos = 20;
        }
    }
}

function drawMessages() {
    var txt = new createjs.Text("WORD GAME", "26px Arial");
    txt.color = '#990000';
    txt.x = txt.y = 10;
    stage.addChild(txt);
    livesTxt = new createjs.Text("LIVES: " + lives, "16px Arial");
    livesTxt.textAlign = 'right';
    livesTxt.y = 16;
    livesTxt.x = stage.canvas.width - 10;
    stage.addChild(livesTxt);
}

function onLetterClick(e) {
    if(lives > 0){
        var btn = e.target;
        var txt = btn.txt;
        btn.removeEventListener('click', onLetterClick);
        checkForMatches(txt);
        drawHangedMan();
        checkGame();
    }
}

function checkForMatches(txt) {
    var letter = txt.text
    var i, char, box, newTxt;
    var match = false;
    for (i = 0; i < answer.length; i++) {
        char = answer[i];
        if (char == ' ' || char == '&') {
            continue;
        }
        box = stage.getChildByName('box_' + i);
        if (box.key == letter) {
            lettersNeeded--;
            match = true;
            newTxt = txt.clone();
            newTxt.color = "#000";
            newTxt.x = box.x;
            newTxt.y = box.y;
            stage.addChild(newTxt);
        }
    }
    stage.removeChild(txt);
    if (!match) {
        lives--;
        livesTxt.text = "LIVES: " + lives;
    }
}

function checkGame() {
    if (lettersNeeded == 0) {
        win = true;
        gameOver();
    } else if (lives == 0) {
        win = false;
        setTimeout(gameOver,3000);
    }
}

function gameOver() {
    stage.removeAllChildren();
    var msg = win ? "YOU WIN!" : "YOU LOSE";
    gameOverTxt = new createjs.Text(msg, "36px Arial");
    gameOverTxt.color = win ? 'blue' : 'red';
    gameOverTxt.textAlign = 'center';
    gameOverTxt.textBaseline = 'middle';
    gameOverTxt.x = stage.canvas.width / 2 - (win ? 0 : 100);
    gameOverTxt.y = stage.canvas.height / 2;
    stage.addChild(gameOverTxt);

    if(!win)
        drawHangedMan(true);
}

function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function(e) {
        stage.update();
    });
}