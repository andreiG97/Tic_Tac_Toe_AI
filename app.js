let board = document.querySelector('#board');
let cell = document.querySelectorAll('.cell');
let reset = document.querySelector('#reset');
const playerX = 'X';
const playerO = 'O';
const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];




class Game{
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
    }

    startGame(){
        board = Array.from(Array(9).keys());
        for(let i = 0; i < cell.length; i++){
            cell[i].innerHTML = '';
            cell[i].addEventListener('click', this.turnClick, false);
            cell[i].style.removeProperty('background-color');
        }  
}

    
    
    turnClick(square){
        if(typeof board[square.target.id] == 'number'){
            this.turn(square.target.id, playerX);
            if(!checkTie() && !checkWin(board, playerX)){ 
                this.turn(this.options(), playerO); 
            }    
        }
    }  

    turn(squareId, player){
        board[squareId] = player;
        document.getElementById(squareId).innerHTML = player;
        let win = checkWin(board,player);
        if(win)  gameOver(win);
        
    }

    checkWin(board, player){
        let play = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for(let[j, win] of winCombo.entries()){
            if(win.every(elem => play.indexOf(elem) > -1)) {
                gameWon = {
                    index: j, 
                    player: player
                };
                break;
            }
        }
        
        return gameWon;
    }

    gameOver(gameWon){
        for(let index of winCombo[gameWon.index]){
            document.getElementById(index).style.backgroundColor =
            gameWon.player == playerX ? 'blue' : 'red';
            
        }
        for(let i = 0; i < cell.length; i++){
            cell[i].removeEventListener('click', turnClick, false)
        }
    }

    emptySpot(){
        return board.filter(s => typeof s == 'number');
    }

    options(){
        return miniMax(board, playerO).index;
    }

    checkTie(){
        if(emptySpot().length == 0){
             for(let i = 0; cell.length; i++){
             cell[i].style.backgroundColor = 'white';
             cell[i].removeEventListener('click', turnClick, false);
            }
            return true;
        }  
        return false;
    }

    miniMax(newBoard, player){
        let spots = emptySpot();
    
        if(checkWin(newBoard, playerX)){
            return{
                score: -10
            };
        }else if(checkWin(newBoard, playerO)){
            return {
                score: 10
            };
        }else if(spots.length === 0){
            return {
                score: 0
            };
        }
        let moves = [];
        for(let i = 0; i < spots.length; i++){
            let move = {};
            move.index = newBoard[spots[i]];
            newBoard[spots[i]] = player;
    
            if(player == playerO){
                let result = miniMax(newBoard, playerX);
                move.score = result.score;
            }else{
                let result = miniMax(newBoard, playerO);
                move.score = result.score;
            }
            newBoard[spots[i]] = move.index;
            moves.push(move);
        }
    
        let bestMove;
        if(player === playerO){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else{
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    
        return moves[bestMove];
    }

}

const game = new Game(playerX, playerO);

game.startGame();








