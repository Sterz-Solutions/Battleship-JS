

/*----- constants -----*/


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
let count = 0
let playerNodes = []
let firstNode = 0
let cpuNodes = []
let currentTurn = 'user'
let guess = ''
let shipLength = 0
let gameBoard = [null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null]

const player = {
  ships: {
    battleship: [null, null, null, null, null],
    cruiser: [null, null, null, null],
    sub: [null, null, null],
    destroyer: [null, null]
  }

}

const cpu = {
  ships: {
    battleship: [null, null, null, null, null],
    cruiser: [null, null, null, null],
    sub: [null, null, null],
    destroyer: [null, null]
  }
}

/*----- cached element references -----*/

// gameBoard --> for stored gameboard node ids for player
// cpuBoard --> for stored gameboard node ids for cpu
// 
const playerBoard = document.getElementById('game-board')
const cpuBoard = document.getElementById("cpu-board")
const shipButtons = document.getElementById('ships')
const userPrompt = document.getElementById('user-prompt')


/*----- event listeners -----*/

// selectShip listener
shipButtons.addEventListener('click', selectShip)
// placeShip listener
playerBoard.addEventListener('click', placeShip)
// playerGuess listener
cpuBoard.addEventListener('click', playerGuess)




/*----- functions -----*/

// createBoard --> Instantiate the board with nodes 10x10 and store info for node IDs
//  ( a1 --> j10 )

function createBoard() {
  let curNode = 0;
  for (let i = 1; i < 101; i++) {
    curNode = i
    playerNodes.push(addNode(curNode))
  }
  for (let i = -1; i > -101; i--) {
    curNode = i
    cpuNodes.push(addNode(curNode))
  }
  // appendChildren(gameBoard, playerNodes)
  // appendChildren(cpuBoard, cpuNodes)
}

// appendChildren --> add nodes to the board in HTML

function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child)
  })
  return
}

// boundCheck --> Check if ship placement is possible with board bounds

function boundCheck() {
  console.log('check bounds left right up down')
}

// addNode --> To add board node within createBoard for HTML updating

function addNode(curNode) {
  let nodeEl = document.createElement('div');
  nodeEl.setAttribute('data-id', curNode);
  nodeEl.setAttribute('class', 'node');
  nodeEl.style.border = '1px solid blue';
  nodeEl.innerHTML = curNode;
  return nodeEl
}

// selectShip --> function for allowing user to select a choice of ship size for
//                placement on the board with subsequent clicks on nodes using placeShip

function selectShip(e) {
  if (e.target.getAttribute('id') === 'battleship') {
    shipLength = 5

  } else if (e.target.getAttribute('id') === 'cruiser') {
    shipLength = 4

  } else if (e.target.getAttribute('id') === 'sub') {
    shipLength = 3

  } else if (e.target.getAttribute('id') === 'destroyer') {
    shipLength = 2

  }


}
// if (selectedNode)
// placeShip --> function for placing a ship based on user clicking nodes

function placeShip(e) {
  let selectedNode = parseInt(e.target.getAttribute('data-id'))
  console.log(`Selected Node = ${selectedNode}`)
  if (shipLength === 5) {
    if (player.ships.battleship.every(node => node === null)) {
      player.ships.battleship[0] = selectedNode
      firstNode = selectedNode

      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Battleship in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'

    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      boundCheck()
      player.ships.battleship[1] = selectedNode
      if (selectedNode === firstNode + 10) {
        player.ships.battleship[2] = selectedNode + 20
        player.ships.battleship[3] = selectedNode + 30
        player.ships.battleship[4] = selectedNode + 40

      } else if (selectedNode === firstNode - 10) {
        player.ships.battleship[2] = selectedNode - 20
        player.ships.battleship[3] = selectedNode - 30
        player.ships.battleship[4] = selectedNode - 40

      } else if (selectedNode === firstNode + 1) {
        player.ships.battleship[2] = selectedNode + 2
        player.ships.battleship[3] = selectedNode + 3
        player.ships.battleship[4] = selectedNode + 4

      } else if (selectedNode === firstNode - 1) {
        player.ships.battleship[2] = selectedNode - 2
        player.ships.battleship[3] = selectedNode - 3
        player.ships.battleship[4] = selectedNode - 4

      }
      console.log(player.ships.battleship)
    }
  } else if (shipLength === 4) {

    if (player.ships.cruiser.every(node => node === null)) {

      player.ships.cruiser[0] = selectedNode

      firstNode = player.ships.cruiser[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Cruiser in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'

    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      boundCheck()
      player.ships.cruiser[1] = selectedNode
      if (selectedNode === firstNode + 10) {
        player.ships.cruiser[2] = selectedNode + 20
        player.ships.cruiser[3] = selectedNode + 30

      } else if (selectedNode === firstNode - 10) {
        player.ships.cruiser[2] = selectedNode - 20
        player.ships.cruiser[3] = selectedNode - 30

      } else if (selectedNode === firstNode + 1) {
        player.ships.cruiser[2] = selectedNode + 2
        player.ships.cruiser[3] = selectedNode + 3

      } else if (selectedNode === firstNode - 1) {
        player.ships.cruiser[2] = selectedNode - 2
        player.ships.cruiser[3] = selectedNode - 3

      }
      console.log(player.ships.cruiser)
    }
  } else if (shipLength === 3) {
    if (player.ships.sub.every(node => node === null)) {
      player.ships.sub[0] = selectedNode
      firstNode = player.ships.sub[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'

    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      boundCheck()
      player.ships.sub[1] = selectedNode
      if (selectedNode === firstNode + 10) {
        player.ships.sub[2] = selectedNode + 10

      } else if (selectedNode === firstNode - 10) {
        player.ships.sub[2] = selectedNode - 10

      } else if (selectedNode === firstNode + 1) {
        player.ships.sub[2] = selectedNode + 1

      } else if (selectedNode === firstNode - 1) {
        player.ships.sub[2] = selectedNode - 1

      }

    }
    console.log(player.ships.sub)

  } else if (shipLength === 2) {
    console.log('hello')
    if (player.ships.destroyer.every(node => node === null)) {
      player.ships.destroyer[0] = selectedNode
      firstNode = player.ships.destroyer[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'

    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      boundCheck()
      player.ships.destroyer[1] = selectedNode
      console.log(player.ships.destroyer)
      console.log(player.ships.sub)
      console.log(player.ships.cruiser)
      console.log(player.ships.battleship)


    }
  } else if (shipLength === 0) {
    console.log('Please select a ship to palce')
  }


}

// cpuPlace --> cpu randomly placing ship on board
//              Can also have this place all ships on the board for CPU at once



// playerGuess --> get users guess for hit with click on a cpu node 

function playerGuess(e) {
  guess = e.target.getAttribute('data-id')
  console.log(guess)
}

// cpuGuess --> randomize cpu guess of a players node
// checkHit --> check if guess is a hit on a ship
// applyHit --> applies a hit to the board if checkHit passes
// applyMiss --> applies a miss to the board if checkHit fails
// winCheck --> check for win to be called within checkHit 
// turnSwap --> swap the turn from user to cpu or cpu to user swapping currentTurn

function playerSwap() {
  if (currentTurn === 'user') {
    cpuBoard.style.opacity = '0%'
    playerBoard.style.opacity = '100%'
    appendChildren(playerBoard, playerNodes)
    currentTurn = 'cpu'

  }

  else if (currentTurn === 'cpu') {
    playerBoard.style.opacity = '0%'
    cpuBoard.style.opacity = '100%'
    appendChildren(cpuBoard, cpuNodes)
    currentTurn = 'user'
  }
}


// RENDER FUNCTION
function render(cb) {
  cb()
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




createBoard()
// appendChildren(gameBoard, playerNodes)
appendChildren(playerBoard, playerNodes)

// playerSwap();
// playerSwap();

// playerSwap(appendChildren(gameBoard, playerNodes))
// playerSwap();
// console.log('hello2')