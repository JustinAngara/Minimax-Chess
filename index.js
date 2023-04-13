// lichess api lip_pBoRjdi8Lw56uR8ifio2

var board,
  game = new Chess();

let whiteToMove = true;
$('#restartBtn').on('click', () => {
  location.reload();
});


var getKeys = function(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}

function getPieces() {
  return Object.keys(board.position()).length;
}
const minimaxRoot = function(depth, game, isMaximisingPlayer) {
  if (getPieces() <= 15) {
    console.log('depth diff 5');
    depth = 4;
  }
  const newGameMoves = game.ugly_moves();
  let bestMove = -Infinity;
  let bestMoveFound;

  for (let i = 0, len = newGameMoves.length; i < len; i++) {
    const newGameMove = newGameMoves[i];
    game.ugly_move(newGameMove);
    const value = minimax(depth - 1, game, -Infinity, Infinity, !isMaximisingPlayer);
    game.undo();

    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }


  return bestMoveFound;
};


const minimax = function(depth, game, alpha = -Infinity, beta = Infinity, isMaximisingPlayer) {
  positionCount++;

  if (depth === 0) {
    return -evaluateBoard(game.board());
  }

  const newGameMoves = game.ugly_moves();

  if (isMaximisingPlayer) {
    let bestMove = -Infinity;
    for (let i = 0, len = newGameMoves.length; i < len; i++) {
      game.ugly_move(newGameMoves[i]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) break;
    }
    return bestMove;
  } else {
    let bestMove = Infinity;
    for (let i = 0, len = newGameMoves.length; i < len; i++) {
      game.ugly_move(newGameMoves[i]);
      bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, true));
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) break;
    }

    return bestMove;
  }
};


const evaluateBoard = function(board) {
  let totalEvaluation = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      totalEvaluation += getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

const reverseArray = function(array) {
  return [...array].reverse();
};


let pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
];

let pawnEvalBlack = reverseArray(pawnEvalWhite);

let knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

let bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

let bishopEvalBlack = reverseArray(bishopEvalWhite);

let rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
];

let rookEvalBlack = reverseArray(rookEvalWhite);

let evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

let kingEvalWhite = [

  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
];

let kingEvalBlack = reverseArray(kingEvalWhite);


const getPieceValue = function(piece, x, y) {
  if (piece === null) {
    return 0;
  }

  const isWhite = (piece.color === 'w');
  const pieceType = piece.type;

  const getAbsoluteValue = function(pieceType, isWhite, x, y) {
    switch (pieceType) {
      case 'p':
        return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
      case 'r':
        return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
      case 'n':
        return 30 + knightEval[y][x];
      case 'b':
        return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
      case 'q':
        return 90 + evalQueen[y][x];
      case 'k':
        return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
      default:
        throw new Error(`Unknown piece type: ${pieceType}`);
    }
  };

  const absoluteValue = getAbsoluteValue(pieceType, isWhite, x, y);
  return isWhite ? absoluteValue : -absoluteValue;
};


/* board visualization and games state handling */

let onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true ||
    piece.search(/^b/) !== -1) {
    return false;
  }
};

let makeBestMove = function() {
  // this is where computer makes move
  /* runComputerMove(); */



  renderMoveHistory(game.history());
  
  
  
  let fen = game.fen()
  // https://explorer.lichess.ovh/masters?fen=
  let url = 'https://explorer.lichess.ovh/masters?fen='+fen;
  if(getPieces()<=7){
  	url = 'https://tablebase.lichess.ovh/standard?fen='+fen+' b';
  } 
  CrudManager.fetchMove(`${url}`);
  if (game.game_over()) {
    alert('Game over');
  }


};

let runComputerMove = () => {
  let bestMove = getBestMove(game);
  console.log('', bestMove);
  game.ugly_move(bestMove);
  board.position(game.fen());
}

let positionCount;
let getBestMove = function(game) {
  if (game.game_over()) {
    alert('Game over');
  }

  positionCount = 0;
  let depth = parseInt($('#search-depth').find(':selected').text());

  let d = new Date().getTime();
  let bestMove = minimaxRoot(depth, game, true);
  let d2 = new Date().getTime();
  let moveTime = (d2 - d);
  let positionsPerS = (positionCount * 1000 / moveTime);

  $('#position-count').text(positionCount);
  $('#time').text(moveTime / 1000 + 's');
  $('#positions-per-s').text(positionsPerS);


  return bestMove;
};
let zs = 0;
let getPosOpening = (fen) => {
  zs++;
  return fen + " zs:" + zs
}

let renderMoveHistory = function(moves) {


  console.log(whiteToMove ? 'WTP' : 'BTP');
  let historyElement = $('#move-history').empty();
  historyElement.empty();
  for (let i = 0; i < moves.length; i = i + 2) {
    historyElement.append('<span>' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')

  }
  whiteToMove = moves.length % 2 == 0;
  console.log(whiteToMove ? 'WTP' : 'BTP');
  historyElement.scrollTop(historyElement[0].scrollHeight);

};

function manageTimer(player, move) {
  // stop the timer for the current player
  let moves = game.history();
  if (moves.length % 2 == 0) {
    player1Timer.stopTimer();
    player2Timer.startTimer();
  } else {
    player2Timer.stopTimer();
    player1Timer.startTimer();
  }



}

let onDrop = function(source, target) {


  manageTimer();
  let move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  removeGreySquares();
  if (move === null) {
    return 'snapback';
  }

  renderMoveHistory(game.history());
  window.setTimeout(makeBestMove, 250);
};

let onSnapEnd = function() {


  board.position(game.fen());
};

let onMouseoverSquare = function(square, piece) {
  var moves = game.moves({
    square: square,
    verbose: true
  });

  if (moves.length === 0) return;

  greySquare(square);

  for (let i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

let onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};

let removeGreySquares = function() {
  $('#board .square-55d63').css('background', '');
};

let greySquare = function(square) {
  let squareEl = $('#board .square-' + square);

  let background = `#F7EC5A`;
  if (squareEl.hasClass('black-3c85d') === true) {
    background = `#DAC331`;
  }

  squareEl.css('background', background);
};




let player1Timer = {
  time: 600,
  timerId: null,
  isExpired: false,
  startTimer: function() {
    clearInterval(this.timerId); // clear any existing interval
    this.timerId = setInterval(() => {
      this.time--;
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time % 60;
      document.getElementById("player1Time").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      if (this.time <= 0 && !this.isExpired) {
        this.isExpired = true;
        this.stopTimer();
        alert("Time's up!");
        board.draggable = false;
      }
    }, 1000);
  },




  stopTimer: function() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}


let player2Timer = {
  time: 600,
  timerId: null,
  isExpired: false,
  startTimer: function() {
    clearInterval(this.timerId); // clear any existing interval
    this.timerId = setInterval(() => {
      this.time--;
      let minutes = Math.floor(this.time / 60);
      let seconds = this.time % 60;
      document.getElementById("player2Time").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (this.time <= 0 && !this.isExpired) {
        this.isExpired = true;
        this.stopTimer();
        alert("Time's up!");
        board.draggable = false;
      }
    }, 1000);
  },


  stopTimer: function() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}

function checkTimer(timer) {
  if (timer.time <= 0 && !timer.isExpired) {
    // execute the code for when the timer expires
    alert("Time's up!");

    // set the timer as expired and stop it
    timer.isExpired = true;
    timer.stopTimer();
    board.draggable = false;
  }
}



function uciToPieceNumber(uciPos) {
  let files = "abcdefgh";
  let ranks = "12345678";

  let fromSquare = uciPos.slice(0, 2);
  let toSquare = uciPos.slice(2, 4);

  let fromFile = files.indexOf(fromSquare[0]) + 1;
  let fromRank = parseInt(fromSquare[1]);

  let toFile = files.indexOf(toSquare[0]) + 1;
  let toRank = parseInt(toSquare[1]);

  let fromPieceNum = (8 - fromRank) * 8 + (fromFile - 1);
  let toPieceNum = (8 - toRank) * 8 + (toFile - 1);

  return {
    from: fromPieceNum,
    to: toPieceNum,
  };
}



let allotHyphen = (uci) => {
  let str = "";
  for (let i = 0; i < uci.length - 1; i++) {
    str += uci[i];
    if (isCharNumber(uci[i])) {
      str += '-';
    }
  }
  str += uci[uci.length - 1];
  return str;
}

let isCharNumber = (c) => {
  return c >= '0' && c <= '9';
}

class CrudManager {
  // crudcrud url
  static url = "https://63f678039daf59d1ad898b5c.mockapi.io/fens";

  // https://63f678039daf59d1ad898b5c.mockapi.io/fens
  // creates name to fens

  static createFen(name, fen) {
    if (fen == "" || fen == null) {
      fen = board.fen();
    }
    fetch(this.url, {
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        method: 'POST',
        body: JSON.stringify({
          name: name,
          fen: fen
        })
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        this.getTable()
      })
  }
  static getArr() {
    $.ajax({
      url: this.url,
      method: 'GET',
      dataType: "json",
      success: function(data) {
        return data;
      }
    });
  }
  static getMove(data) {
    let x = {
      output: "",
      uci: "",
      san: ""
    }

    try {
      let i = 0;
      if (game.history().length==1) {

        i = Math.floor(Math.random() * data.moves.length)
      }
      if (data.moves[i].san !== undefined) {


        x.output = `${data.moves[i].san} (${data.moves[i].uci})`;
        x.uci = data.moves[i].uci;
        x.san = data.moves[i].san;

        return x;
      }
    } catch (error) {
      x.output = "Couldn't find move from Database-";
      console.log('error from db');
      return x;
    }
  }



  static fetchMove(url) {
    // also implementing table base
    // http://tablebase.lichess.ovh/standard?fen=4k3/6KP/8/8/8/8/7p/8_w_-_-_0_1

    // console.log(`${url}${fen}`);
    $.ajax({
      url: `${url}`,
      method: 'GET',
      dataType: "json",
      success: function(data) {
        let x = CrudManager.getMove(data);
        let fen = board.fen();
				console.log(x);
        if (x.output.indexOf('-')==-1) {
					CrudManager.manageData(x);
        } else{
        	runComputerMove();
        }

        return data;
      },
      error: function(error) {
        console.log(error);
      }
    });

  }
	static endgameMove(){
  	let url = 'http://tablebase.lichess.ovh/standard/mainline?fen=4k3/6KP/8/8/8/8/7p/8_w_-_-_0_1';
    fetch(url).then(response=>response.json()).then((data)=>{
    	let x = {
      	san: data.moves[0].san
      };
      
    	manageData(x);
    });
  }
	static manageData(x){
		try {
    	game.move(x.san);
			board.position(game.fen());
		} catch (e) {
			console.log(e)
		}
  }

  static getTable() {
    // Updates whole table
    $.ajax({
      url: this.url,
      method: 'GET',
      dataType: "json",
      success: function(data) {
        $('#table-body').empty();
        $(data).each(function(index, element) {
          addRows(index, element);
        });
      }
    });
  }
  //
  // deletes fen given the id
  static deleteFen(id) {

    $.ajax({
      url: this.url + '/' + id,
      method: 'DELETE',
      success: function() {
        console.log("DELETED");
        $('#table-body').fadeOut(200);
        CrudManager.getTable();
      },
      error: function(error) {
        // console.log(error);
      }
    })

  }

	
  static updateFen(id, name, fen) {
    // updates fen given the ID

    fetch(
        this.url + '/' + id, {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          method: 'PUT',
          body: JSON.stringify({
            name: name,
            fen: fen
          })
        })
      .then(response => {
        this.getTable();
        // console.log(response);
      })
  }
}

function addRows(a, b) {
  // create rows everytime AJAX retrieves an element
  $('#table-body').fadeIn(1000);
  $('#table-body').html(
    $('#table-body').html() +
    `
<tr id="${a}">
<td class="index" value = ${b.id}>${a}</td>
<td>${b.name}</td>
<td>${b.fen}</td>
<td>
<button value="${b.id}+${b.fen}:${a}" type="button" class="btn btn-success">Play</button>
</td>
<td>
<button value="${b.id}+${b.fen}:${a}" type="button" class="btn btn-secondary">Update</button>
</td>
<td>
<button value="${b.id}+${b.fen}:${a}" type="button" class="btn btn-danger">Delete</button>
</td>

</tr>
`);
}
// Updates Table
CrudManager.getTable();
// wait til all is fetched
$(document).ajaxStop(function() {
  // add button listener
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach(function(currentBtn) {
    currentBtn.addEventListener('click', event => {
      let element = event.target;
      // returns fen given a type of string: [row+fen:id]
      let fen = element.value.slice(element.value.indexOf("+") + 1);
      fen = fen.slice(0, -2);
      // returns id
      let id = element.value.substring(0, element.value.indexOf("+"))
      // return row #
      let row = element.value.slice(element.value.indexOf(":") + 1);
      /*       console.log("ROW:" + row); */
      if (element.innerHTML == "Play") {
        // Edits boards position and adds FEN to searchbar
        $('#searchbar').val(fen);
        board.position($('#searchbar').val());
        game.load(board.fen());
      } else if (element.innerHTML == "Delete") {
        // deletes fen
        CrudManager.deleteFen(id);
      } else {
        // Updates Table
        CrudManager.updateFen(id, $('#enterName').val(), $('#enterFen').val());
        $('#enterName').val("");
        $('#enterFen').val("");
      }
    });
  });
});

// action listener for the addBtn id
$('#addBtn').on('click', function() {

  CrudManager.createFen($('#enterName').val(), $('#enterFen').val());
  $('#enterName').val("");
  $('#enterFen').val("");
});
// add search btn
$('#searchBtn').on('click', function() {
  board.position($('#searchbar').val());
  $('#searchbar').val("");
});
// created a copy btn to get fen
$('#copyBtn').on('click', function() {
  let text = board.fen();
  navigator.clipboard.writeText(text).then(() => {
    console.log("copied");
  });
});



let setupCfg = (pos) => {
  board = null;
  let cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
  };
  board = Chessboard('board', cfg);
}


setInterval(function() {
  checkTimer(player1Timer);
}, 1000)
setInterval(function() {
  checkTimer(player2Timer);
}, 1000)

let initialFen = `r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R`;

setupCfg(initialFen);
/* game.load(initialFen); */
// renders piece values

// https://tablebase.lichess.ovh?fen=4k3/6KP/8/8/8/8/7p/8_w_-_-_0_1
//
let url = 'http://tablebase.lichess.ovh/standard/mainline?fen=4k3/6KP/8/8/8/8/7p/8_w_-_-_0_1';
    fetch(url).then(response=>response.json()).then((data)=>{
    	console.log(data);
    });
