/*----- constants -----*/
// Battleship (4) --> ship of size 4
// Cruiser (3) --> ship of size 3
// Submarine (3) --> ship of size 3
// Destroyer (2) --> ship of size 2

/*----- app's state (variables) -----*/
// Ship Locations 
// Player 1 ship locations
//    (Ship 1, ship 2, etc)
// Cpu ship locations
//    (Ship 1, ship 2, etc)
// GuessHit -- Current (guess)
// numGuesses -- Total Guesses
// Number of total Hits (hits)
// Is the ship sunk (isSunk = true/false)
// playerNodes --> board nodes
// cpuNodes --> board nodes
// currentTurn --> user/cpu 

let playerNodes = [];
let cpuNodes = [];
let currentTurn = 'user'

/*----- cached element references -----*/
// gameBoard --> for stored gameboard node ids for player
// cpuBoard --> for stored gameboard node ids for cpu
// 


let gameBoard = document.getElementById('game-board');
let cpuBoard = document.getElementById("cpu-board");


/*----- event listeners -----*/
// selectShip listener
// placeShip listener
// playerGuess listener




/*----- functions -----*/
// createBoard --> Instantiate the board with nodes 10x10 and store info for node IDs
//  ( a1 --> j10 )
// appendChildren --> add nodes to the board in HTML
// addNode --> To add board node within createBoard for HTML updating

// selectShip --> function for allowing user to select a choice of ship size for
//                placement on the board with subsequent clicks on nodes using placeShip
// placeShip --> function for placing a ship based on user clicking nodes
// cpuPlace --> cpu randomly placing ship on board
//              Can also have this place all ships on the board for CPU at once



// playerGuess --> get users guess for hit with click on a cpu node 
// cpuGuess --> randomize cpu guess of a players node
// checkHit --> check if guess is a hit on a ship
// applyHit --> applies a hit to the board if checkHit passes
// applyMiss --> applies a miss to the board if checkHit fails
// winCheck --> check for win to be called within checkHit 
// turnSwap --> swap the turn from user to cpu or cpu to user swapping currentTurn
// toggleBoard --> change board to view the opposite of the currentTurn







function addNode(curNode) {
  let nodeEl = document.createElement('div');
  nodeEl.setAttribute('data-id', curNode);
  nodeEl.setAttribute('class', 'node');
  nodeEl.style.border = '1px solid blue';
  nodeEl.innerHTML = curNode;
  return nodeEl
}

function appendChildren(parent, children) {
  children.forEach(function(child){
    parent.appendChild(child)
  })
  return
}


function createBoard() {
  let curNode = 0;
  for(let i = 1; i <101 ; i++) {
    curNode = i
    playerNodes.push(addNode(curNode))
  }
  for(let i = -1; i > -101 ; i--) {
    curNode = i
    cpuNodes.push(addNode(curNode))
  }
    // appendChildren(gameBoard, playerNodes)
    // appendChildren(cpuBoard, cpuNodes)
  }
  


  function render(cb) {
    cb()
  }

  function playerSwap() {
    if(currentTurn === 'user'){
      cpuBoard.style.opacity = '0%'
      gameBoard.style.opacity = '100%'
      appendChildren(gameBoard, playerNodes)
      currentTurn = 'cpu'

    }

    else if(currentTurn === 'cpu') {
      gameBoard.style.opacity = '0%'
      cpuBoard.style.opacity = '100%'
      appendChildren(cpuBoard, cpuNodes)
      currentTurn = 'user'
    }
  }

/*----- GAME START -----*/

// Render Board
// Cpu places ships
// Player selects ship to place
// Player places ship with click on node then click on adjacent node in direction NSEW
// Alternatively... selects each node along a path for ship if auto place is too hard

// Begin game with player turn


// Are all ships sunk? (While loop?) --Player / Cpu
//  Player Guess
//  Check Hit --> Place Hit && Check Sunk && Check Win || Place Miss --> Swap Turn
//  CPU Guess
//  Check Hit --> Place Hit && Check Sunk && Check Win || Place Miss -->  Swap Turn




createBoard();

// playerSwap(appendChildren(gameBoard, playerNodes))
// playerSwap();
// console.log('hello2')



