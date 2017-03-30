var stage, queue;
var IMAGE_WIDTH = 94;
var IMAGE_HEIGHT = 74;

var gameSize; // 2 (2x2) or 4 (4x4) or 6 (6x6)

var faces = ['4Runner', 'Avalon', 'Camry', 'Corolla', 'FJ Cruiser', 'Highlander', 'L. Cruiser',
                'Prius', 'Prius P-In', 'Prius C', 'Prius V', 'RAV4', 'Sequoia', 'Sienna', 'Tacoma',
                'Tundra', 'Venza', 'Yaris'];
var cards = [];
var cardsFlipped = [];
var matches = 0;
var canvas;
var menuContainer;

function preload() {
    queue = new createjs.LoadQueue();
    queue.addEventListener("complete", init);
    queue.loadManifest([
        {id:"spriteImg", src:"img/toyota.png"},
        {id:"shell", src:"img/card.png"},
        {id:"back", src:"img/back.png"}
    ]);
}

function init() {
    canvas = document.getElementById('canvas');
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", function (e) {
        stage.update();
    });

    showInitialScreen();
}

function showInitialScreen(){
    var title, btEasy, btMedium, btHard;

    title = new createjs.Text("CONCENTRATION GAME", "40px Arial", "red");
    title.textAlign = 'center';
    title.x = canvas.width/2;
    title.y = -100;
    stage.addChild(title);
    createjs.Tween.get(title)
        .to({x:title.x, y:30, rotation:0}, 300);

    menuContainer = new createjs.Container();
    menuContainer.x = (canvas.width - 340)/2;
    menuContainer.y = 100;

    menuContainer.addChild(buildButton("EASY", 2, 0, 100));
    menuContainer.addChild(buildButton("MEDIUM", 4, 120, 100));
    menuContainer.addChild(buildButton("HARD", 6, 240, 100));

    stage.addChild(menuContainer);
}

function buildButton(text, level, xPos, yPos){
    var bt = new createjs.Container();
    bt.x = -100;
    bt.y = -100;

    var btShape = new createjs.Shape();
    btShape.graphics.beginFill('black').drawRect(0, 0, 100, 40);
    bt.addChild(btShape);
    btShape.on("mouseover", function(evt) {
        this.graphics.clear().beginFill('red').drawRect(0, 0, 100, 40);
    });
    btShape.on("mouseout", function(evt) {
        this.graphics.clear().beginFill('black').drawRect(0, 0, 100, 40);
    });
    btShape.on("click", function(evt) {
        gameSize = level;
        startGame();
    });
    
    var btTxt = new createjs.Text(text, "20px Arial", "white");
    btTxt.x = 50;
    btTxt.y = 10;
    btTxt.textAlign = 'center';
    bt.addChild(btTxt); 
    
    createjs.Tween.get(bt)
        .to({x:xPos, y:yPos, rotation:0}, 300);

    return bt;
}

function buildCards() {
    var i, card, card2, bmp, label, face;
    var spriteData = {
        "images": ["img/toyota.png"],
        "frames": []
    };

    // generating sprite frames
    for(var i=0; i < (gameSize*gameSize)/2; i++){
        spriteData["frames"].push([(23 + IMAGE_WIDTH) * (i % 5), Math.floor(i/5) * (20 + IMAGE_HEIGHT), IMAGE_WIDTH, IMAGE_HEIGHT]);
    }

    var ss = new createjs.SpriteSheet(spriteData);

    for (i = 0; i < (gameSize*gameSize)/2; i++) {
        card = new createjs.Container();
        bmp = new createjs.Bitmap(queue.getResult('shell'));
        bmp.shadow = new createjs.Shadow("#666", 3, 3, 5);
        card.regX = bmp.image.width / 2;
        card.regY = bmp.image.height / 2;
        card.addChild(bmp);
        
        bmp = new createjs.Container();
        var sprite = new createjs.Sprite(ss);
        sprite.gotoAndStop(i);
        bmp.addChild(sprite);
        bmp.regX = IMAGE_WIDTH / 2;
        bmp.regY = IMAGE_HEIGHT / 2;
        bmp.x = card.regX;
        bmp.y = 70;
        card.addChild(bmp);
        label = new createjs.Text(faces[i].toUpperCase(), "18px Arial", "#009900");
        label.textAlign = 'center';
        label.x = card.regX;
        label.y = 144;
        card.addChild(label);
        bmp = new createjs.Bitmap(queue.getResult('back'));
        bmp.name = 'back';
        card.addChild(bmp);
        card2 = card.clone(true);
        card.key = card2.key = faces[i];
        cards.push(card, card2);
    }
}
function shuffleCards() {
    var i, card, randomIndex;
    var l = cards.length;
    var shuffledCards = [];
    for (i = 0; i < l; i++) {
        randomIndex = Math.floor(Math.random() * cards.length);
        shuffledCards.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
    }
    cards = cards.concat(shuffledCards);
}
function dealCards() {
    var i, card;
    var xPos = initialX = (canvas.width - (gameSize-1)*150)/2;
    var yPos = 200;
    var count = 0;
    for (i = 0; i < cards.length; i++) {
        card = cards[i];
        card.x = -200;
        card.y = 400;
        card.rotation = Math.random() * 600;
        card.addEventListener('click', flipCard);
        stage.addChild(card);
        createjs.Tween.get(card)
            .wait(i * 100)
            .to({x:xPos, y:yPos, rotation:0}, 300);
        xPos += 150;
        count++;
        if (count === gameSize) {
            count = 0;
            xPos = initialX;
            yPos += 220;
        }
    }
}

function flipCard(e) {
    if (cardsFlipped.length === 2) {
        return;
    }
    var card = e.currentTarget;
    card.mouseEnabled = false;
    card.getChildByName('back').visible = false;
    cardsFlipped.push(card);
    if (cardsFlipped.length === 2) {
        evalCardsFlipped();
    }
}
function evalCardsFlipped() {
    if (cardsFlipped[0].key === cardsFlipped[1].key) {
        matches++;
        evalGame();
    }
    else {
        setTimeout(resetFlippedCards, 1000);
    }
}
function resetFlippedCards() {
    cardsFlipped[0].mouseEnabled = cardsFlipped[1].mouseEnabled = true;
    cardsFlipped[0].getChildByName('back').visible = true;
    cardsFlipped[1].getChildByName('back').visible = true;
    cardsFlipped = [];
}
function evalGame() {
    if (matches === (gameSize*gameSize)/2) {
        setTimeout(function () {
            alert('YOU WIN!')
        }, 300)
    }
    else {
        cardsFlipped = [];
    }
}
function startGame() {
    stage.removeChild(menuContainer);

    buildCards();
    shuffleCards();
    dealCards();
}