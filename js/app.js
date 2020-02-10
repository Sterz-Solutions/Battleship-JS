

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
let prevHit = Boolean
let nextCpuGuess = [null, null, null, null]
let isBound = Boolean
let playerWinCount = 0
let cpuWinCount = 0
let playerNodes = []
let firstNode = 0
let cpuNodes = []
let currentTurn = 'user'
let guess = ''
let cpuGuesses = []
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

let computerBoard = [null, null, null, null, null, null, null, null, null, null,
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

//--------------------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------------------------------------------------------
// appendChildren --> add nodes to the board in HTML
function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child)
  })
  return
}

//--------------------------------------------------------------------------------------------------------------------------------------
// boundCheck --> Check if ship placement is possible with board bounds
// boundLeft -- boundRight -- boundUp -- boundDown
function boundLeft(nodeToCheck) {
  nodeToCheck + (shipLength - 1)    //IS this values final digit 1 (ex: 1,11,21,31,41,51,61,71,81,91)
}

function boundRight(nodeToCheck) {
  nodeToCheck + (shipLength - 1)    //IS this values final digit 0 (ex: 10,20,30,40,50,60,70,80,90,100)
}

// Vertical bounds check for negative numbers
function boundVerticalNeg(nodeToCheck) {
  if (nodeToCheck > -100 && nodeToCheck < -1) return true
  else return false
}

// Vertical bounds check for positive numbers
function boundVerticalPos(nodeToCheck) {
  if (nodeToCheck < 100 && nodeToCheck > 1) return true
  else return false
}

function boundDown(nodeToCheck) {
  nodeToCheck + (shipLength - 1 * 10)  // IS this value < 91-100 depending on the row
}

function boundCheck(board) {
  boundLeft()
  boundRight()
  boundUp()
  boundDown()
}

//--------------------------------------------------------------------------------------------------------------------------------------
// addNode --> To add board node within createBoard for HTML updating
function addNode(curNode) {
  let nodeEl = document.createElement('div');
  nodeEl.setAttribute('data-id', curNode);
  nodeEl.setAttribute('class', 'node');
  nodeEl.style.border = '1px solid blue';
  nodeEl.innerHTML = curNode;
  return nodeEl
}

//--------------------------------------------------------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------------------------------------
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
      player.ships.battleship.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      console.log(player.ships.battleship)
      console.log(gameBoard)
    }
  } else if (shipLength === 4) {

    if (player.ships.cruiser.every(node => node === null)) {
      player.ships.cruiser[0] = selectedNode
      firstNode = player.ships.cruiser[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Cruiser in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
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
      player.ships.cruiser.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
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
    player.ships.sub.forEach(function (node) {
      gameBoard[node - 1] = node;
    })
    console.log(player.ships.sub)

  } else if (shipLength === 2) {
    if (player.ships.destroyer.every(node => node === null)) {
      player.ships.destroyer[0] = selectedNode
      firstNode = player.ships.destroyer[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.destroyer[1] = selectedNode
      player.ships.destroyer.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      console.log(player.ships.destroyer)
      console.log(player.ships.sub)
      console.log(player.ships.cruiser)
      console.log(player.ships.battleship)
    }
  } else if (shipLength === 0) {
    console.log('Please select a ship to palce')
  }
}









//--------------------------------------------------------------------------------------------------------------------------------------
// cpuPlace --> cpu randomly placing ship on board
// Can also have this place all ships on the board for CPU at once

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}


function cpuPlace(ship) {
  let check = 0
  let cpuFirst = 0
  let direction = 0
  // cpuFirst = getRandomIntInclusive(1, 100)
  // cpu.ships.ship[0] = cpuFirst
  if (ship === 5) {
    // do {
    direction = 0
    cpuFirst = getRandomIntInclusive(-1, -100)
    if (cpu.ships.battleship.every(node => node === null)) {
      cpu.ships.battleship[0] = cpuFirst
      // pick a direction of placement randomly
      // 1 = up   2 = right   3 = down    4 = left
      direction = getRandomIntInclusive(1, 4)
      switch (direction) {
        case 1:
          cpu.ships.battleship[1] = cpuFirst - 10
          cpu.ships.battleship[2] = cpuFirst - 20
          cpu.ships.battleship[3] = cpuFirst - 30
          cpu.ships.battleship[4] = cpuFirst - 40
          cpu.ships.battleship.forEach(function (node) {    // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 2:
          cpu.ships.battleship[1] = cpuFirst + 1
          cpu.ships.battleship[2] = cpuFirst + 2
          cpu.ships.battleship[3] = cpuFirst + 3
          cpu.ships.battleship[4] = cpuFirst + 4
          break
        case 3:
          cpu.ships.battleship[1] = cpuFirst + 10
          cpu.ships.battleship[2] = cpuFirst + 20
          cpu.ships.battleship[3] = cpuFirst + 30
          cpu.ships.battleship[4] = cpuFirst + 40
          cpu.ships.battleship.forEach(function (node) {    // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 4:
          cpu.ships.battleship[1] = cpuFirst - 1
          cpu.ships.battleship[2] = cpuFirst - 2
          cpu.ships.battleship[3] = cpuFirst - 3
          cpu.ships.battleship[4] = cpuFirst - 4
          break
      }

      cpu.ships.battleship.forEach(function (node) {
        computerBoard[Math.abs(node) - 1] = Math.abs(node);
      })
      console.log(cpu.ships.battleship)
      console.log(computerBoard)
    }
    // } while (!isBound)
  } else if (ship === 4) {
    // do {
    direction = 0
    while (check === 0) {
      cpuFirst = getRandomIntInclusive(-1, -100)
      cpu.ships.cruiser[0] = cpuFirst
      // pick a direction of placement randomly
      // 1 = up   2 = right   3 = down    4 = left

      direction = getRandomIntInclusive(1, 4)
      switch (direction) {
        case 1:
          cpu.ships.cruiser[1] = cpuFirst - 10
          cpu.ships.cruiser[2] = cpuFirst - 20
          cpu.ships.cruiser[3] = cpuFirst - 30
          cpu.ships.cruiser.forEach(function (node) {   // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 2:
          cpu.ships.cruiser[1] = cpuFirst + 1
          cpu.ships.cruiser[2] = cpuFirst + 2
          cpu.ships.cruiser[3] = cpuFirst + 3
          break
        case 3:
          cpu.ships.cruiser[1] = cpuFirst + 10
          cpu.ships.cruiser[2] = cpuFirst + 20
          cpu.ships.cruiser[3] = cpuFirst + 30
          cpu.ships.cruiser.forEach(function (node) {  // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 4:
          cpu.ships.cruiser[1] = cpuFirst - 1
          cpu.ships.cruiser[2] = cpuFirst - 2
          cpu.ships.cruiser[3] = cpuFirst - 3
          break
      }
      if (!cpu.ships.cruiser.forEach(function (node) {
        computerBoard.includes(node - 1)
      })) {
        check = 1
        cpu.ships.cruiser.forEach(function (node) {
          computerBoard[Math.abs(node) - 1] = Math.abs(node);
        })
      }
    }
    check = 0
    console.log(cpu.ships.cruiser)
    console.log(computerBoard)
    // } while (!isBound)
  } else if (ship === 3) {
    // do {
    direction = 0
    while (check === 0) {
      cpuFirst = getRandomIntInclusive(-1, -100)
      cpu.ships.sub[0] = cpuFirst
      // pick a direction of placement randomly
      // 1 = up   2 = right   3 = down    4 = left
      direction = getRandomIntInclusive(1, 4)
      switch (direction) {
        case 1:
          cpu.ships.sub[1] = cpuFirst - 10
          cpu.ships.sub[2] = cpuFirst - 20
          cpu.ships.sub.forEach(function (node) {  // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 2:
          cpu.ships.sub[1] = cpuFirst + 1
          cpu.ships.sub[2] = cpuFirst + 2
          break
        case 3:
          cpu.ships.sub[1] = cpuFirst + 10
          cpu.ships.sub[2] = cpuFirst + 20
          cpu.ships.sub.forEach(function (node) {  // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 4:
          cpu.ships.sub[1] = cpuFirst - 1
          cpu.ships.sub[2] = cpuFirst - 2
          break
      }
      if (!cpu.ships.sub.forEach(function (node) {
        computerBoard.includes(node - 1)
      })) {
        check = 1
        cpu.ships.sub.forEach(function (node) {
          computerBoard[Math.abs(node) - 1] = Math.abs(node);
        })
      }
    }
    check = 0
    console.log(cpu.ships.sub)
    console.log(computerBoard)
    // } while (!isBound)
  } else if (ship === 2) {
    // do {
    direction = 0
    while (check == 0) {
      cpuFirst = getRandomIntInclusive(-1, -100)
      cpu.ships.destroyer[0] = cpuFirst
      // pick a direction of placement randomly
      // 1 = up   2 = right   3 = down    4 = left
      direction = getRandomIntInclusive(1, 4)
      switch (direction) {
        case 1:
          cpu.ships.destroyer[1] = cpuFirst - 10
          cpu.ships.destroyer.forEach(function (node) {  // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 2:
          cpu.ships.destroyer[1] = cpuFirst + 1
          break
        case 3:
          cpu.ships.destroyer[1] = cpuFirst + 10
          cpu.ships.destroyer.forEach(function (node) {  // BOUND CHECK EVERY SHIP IF PLACEMENT WAS VERITCAL
            boundVerticalNeg(node)
          }) ? isBound = true : isBound = false
          break
        case 4:
          cpu.ships.destroyer[1] = cpuFirst - 1
          break
      }
      if (!cpu.ships.destroyer.forEach(function (node) {
        computerBoard.includes(node - 1)
      })) {
        check = 1
      }
      cpu.ships.destroyer.forEach(function (node) {
        computerBoard[Math.abs(node) - 1] = Math.abs(node);
      })
    }
    check = 0
    console.log(cpu.ships.destroyer)
    console.log(cpu.ships.sub)
    console.log(cpu.ships.cruiser)
    console.log(cpu.ships.battleship)
    console.log(computerBoard)
    // } while (!isBound)
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// playerGuess --> get users guess for hit with click on a cpu node 
function playerGuess(e) {
  guess = e.target.getAttribute('data-id')
  console.log(guess)
}

//--------------------------------------------------------------------------------------------------------------------------------------
// shipSunk --> check for isSunk for ship


//--------------------------------------------------------------------------------------------------------------------------------------
// cpuGuess --> randomize cpu guess of a players node

function cpuGuess() {
  if (prevHit === false) {
    guess = Math.getRandomIntInclusive(1, 100)
    while (cpuGuesses.includes(guess)) {
      guess = Math.getRandomIntInclusive(1, 100)
    }
    if (checkHit(guess)) {
      prevHit = true
      applyHit(guess)
    } else if (!checkHit(guess)) {
      prevHit = false
      applyMiss(guess)
    }
    cpuGuesses.push(guess)
  } else if(prevHit === true) {
    
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// checkHit --> check if guess is a hit on a ship

function checkHit(guess) {
  if (currentTurn === 'user') {
    if (computerBoard.includes(guess)) {
      return true
    } else if (!computerBoard.includes(guess)) {
      return false
    }
  } else if (currentTurn === 'cpu') {
    if (playerBoard.includes(guess)) {
      return true
    } else if (!playerBoard.includes(guess)) {
      return false
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// applyHit --> applies a hit to the board if checkHit passes
function applyHit(guess) {
  if (currentTurn === 'user') {
    console.log(`User hit node ${guess}`)
    computerBoard[guess - 1] = null // Will eventually apply visual effect and sound to this position 
    playerWinCount += 1
  } else if (currentTurn === 'cpu') {
    console.log(`Cpu hit node ${guess}`)
    computerBoard[guess - 1] = null // Will eventually apply visual effect and sound to this position 
    cpuWinCount += 1
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// applyMiss --> applies a miss to the board if checkHit fails
function applyMiss(guess) {
  if (currentTurn === 'user') {
    //Apply visual and sound effects to this position
    console.log(`User missed at node ${guess}`)
  } else if (currentTurn === 'cpu') {
    //Apply visual and sound effects to this position
    console.log(`User missed at node ${guess}`)
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// winCheck --> check for win to be called within checkHit 
function winCheck() {
  if (playerWinCount === 14) return true
  else if (cpuWinCount === 14) return true
  else return false
}

//--------------------------------------------------------------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------------------------------------------------------
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
appendChildren(cpuBoard, cpuNodes)
cpuPlace(5)
cpuPlace(4)
cpuPlace(3)
cpuPlace(2)

// playerSwap();
// playerSwap();

// playerSwap(appendChildren(gameBoard, playerNodes))
// playerSwap();
// console.log('hello2')