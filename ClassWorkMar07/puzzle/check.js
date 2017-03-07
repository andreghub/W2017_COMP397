const NR_COLS = 5;
const NR_ROWS = 3;
const NR_PIECES = NR_COLS * NR_ROWS;
const PIECE_SIZE = 200;

var grid = [];
// grid.prototype.x = 0;
// grid.prototype.y = 0;
// grid.prototype.homePoint = {x: 0, y: 0};
var stage;
var pieces = [];
var selectedPieces = [];

function init() {
    stage = new createjs.Stage(document.getElementById('canvas'));
    createjs.Ticker.addEventListener("tick", function(){
        stage.update();
    });
    createjs.Ticker.setFPS(60);
    setupGrid();
    shutffleGrid();
}

function setupGrid(){
    for(var col = 0; col < NR_COLS; col++){
        grid[col] = [];
        for(var row = 0; row < NR_ROWS; row++){
            var piece = new createjs.Bitmap('img/mam.png');
            piece.homePoint = {x: col * PIECE_SIZE, y: row * PIECE_SIZE};
            grid[col][row] = piece;
            piece.sourceRect = new createjs.Rectangle(grid[col][row].x, grid[col][row].y, PIECE_SIZE, PIECE_SIZE);
            piece.x = grid[col][row].homePoint.x;
            piece.y = grid[col][row].homePoint.y;
            stage.addChild(piece);
        }
    }
}

function shutffleGrid(){
    var tmpx = grid[0][0].x;
    var tmpy = grid[0][0].y;
    grid[0][0].x = grid[0][2].x;
    grid[0][0].y = grid[0][2].y;
    grid[0][2].x = tmpx;
    grid[0][2].y = tmpy;
}

function checkForWin(){
    var won = true;
    for(var col = 0; col < NR_COLS; col++){
        for(var row = 0; row < NR_ROWS; row++){
            
        }
    }
}