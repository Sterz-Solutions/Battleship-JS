

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
const Guess = {
  prevHits: [],
  cpuGuesses: [],
  prevDirection: {
    direction: 0,
    hit: false
  },
  cpuGuessDirection: 0
}

let isBound = Boolean
let playerWinCount = 0
let cpuWinCount = 0
let playerNodes = []
let firstNode = 0
let cpuNodes = []
let currentTurn = 'cpu'
let guess = 0
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
    battleship: {
      pegs: [null, null, null, null, null],
      isSunk: false
    },
    cruiser: {
      pegs: [null, null, null, null],
      isSunk: false
    },
    sub: {
      pegs: [null, null, null],
      isSunk: false
    },
    destroyer: {
      pegs: [null, null],
      isSunk: false
    }
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

// Horizontal bounds check for positive numbers
function boundHorizontalPos(guess) {
  if (Guess.prevHits[0] >= 1 && Guess.prevHits[0] <= 10 && guess >= 1 && guess <= 10) {
    isBound = true
  } else if (Guess.prevHits[0] >= 11 && Guess.prevHits[0] <= 20 && guess >= 11 && guess <= 20) {
    isBound = true
  } else if (Guess.prevHits[0] >= 21 && Guess.prevHits[0] <= 30 && guess >= 21 && guess <= 30) {
    isBound = true
  } else if (Guess.prevHits[0] >= 31 && Guess.prevHits[0] <= 40 && guess >= 21 && guess <= 40) {
    isBound = true
  } else if (Guess.prevHits[0] >= 41 && Guess.prevHits[0] <= 50 && guess >= 31 && guess <= 50) {
    isBound = true
  } else if (Guess.prevHits[0] >= 51 && Guess.prevHits[0] <= 60 && guess >= 41 && guess <= 60) {
    isBound = true
  } else if (Guess.prevHits[0] >= 61 && Guess.prevHits[0] <= 70 && guess >= 51 && guess <= 70) {
    isBound = true
  } else if (Guess.prevHits[0] >= 71 && Guess.prevHits[0] <= 80 && guess >= 61 && guess <= 80) {
    isBound = true
  } else if (Guess.prevHits[0] >= 81 && Guess.prevHits[0] <= 90 && guess >= 71 && guess <= 90) {
    isBound = true
  } else if (Guess.prevHits[0] >= 91 && Guess.prevHits[0] <= 100 && guess >= 81 && guess <= 100) {
    isBound = true
  } else isBound = false
}

// Vertical bounds check for negative numbers
function boundVerticalNeg(nodeToCheck) {
  if (nodeToCheck > -100 && nodeToCheck < -1) isBound = true
  else isBound = false
}

// Vertical bounds check for positive numbers
function boundVerticalPos(nodeToCheck) {
  if (nodeToCheck < 100 && nodeToCheck > 1) isBound = true
  else isBound = false
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
    if (player.ships.battleship.pegs.every(node => node === null)) {
      player.ships.battleship.pegs[0] = selectedNode
      firstNode = selectedNode

      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Battleship in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.battleship.pegs[1] = selectedNode
      if (selectedNode === firstNode + 10) {
        player.ships.battleship.pegs[2] = selectedNode + 10
        player.ships.battleship.pegs[3] = selectedNode + 20
        player.ships.battleship.pegs[4] = selectedNode + 30

      } else if (selectedNode === firstNode - 10) {
        player.ships.battleship.pegs[2] = selectedNode - 10
        player.ships.battleship.pegs[3] = selectedNode - 20
        player.ships.battleship.pegs[4] = selectedNode - 30

      } else if (selectedNode === firstNode + 1) {
        player.ships.battleship.pegs[2] = selectedNode + 1
        player.ships.battleship.pegs[3] = selectedNode + 2
        player.ships.battleship.pegs[4] = selectedNode + 3

      } else if (selectedNode === firstNode - 1) {
        player.ships.battleship.pegs[2] = selectedNode - 1
        player.ships.battleship.pegs[3] = selectedNode - 2
        player.ships.battleship.pegs[4] = selectedNode - 3

      }
      player.ships.battleship.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      console.log(player.ships.battleship.pegs)
      console.log(gameBoard)
    }
  } else if (shipLength === 4) {

    if (player.ships.cruiser.pegs.every(node => node === null)) {
      player.ships.cruiser.pegs[0] = selectedNode
      firstNode = player.ships.cruiser.pegs[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Cruiser in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.cruiser.pegs[1] = selectedNode
      if (selectedNode === firstNode + 10) {
        player.ships.cruiser.pegs[2] = selectedNode + 10
        player.ships.cruiser.pegs[3] = selectedNode + 20
      } else if (selectedNode === firstNode - 10) {
        player.ships.cruiser.pegs[2] = selectedNode - 10
        player.ships.cruiser.pegs[3] = selectedNode - 20
      } else if (selectedNode === firstNode + 1) {
        player.ships.cruiser.pegs[2] = selectedNode + 1
        player.ships.cruiser.pegs[3] = selectedNode + 2
      } else if (selectedNode === firstNode - 1) {
        player.ships.cruiser.pegs[2] = selectedNode - 1
        player.ships.cruiser.pegs[3] = selectedNode - 2
      }
      player.ships.cruiser.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      console.log(player.ships.cruiser.pegs)
    }
  } else if (shipLength === 3) {
    if (player.ships.sub.pegs.every(node => node === null)) {
      player.ships.sub.pegs[0] = selectedNode
      firstNode = player.ships.sub.pegs[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.sub.pegs[1] = selectedNode
      if (selectedNode === firstNode + 10) {
        player.ships.sub.pegs[2] = selectedNode + 10

      } else if (selectedNode === firstNode - 10) {
        player.ships.sub.pegs[2] = selectedNode - 10

      } else if (selectedNode === firstNode + 1) {
        player.ships.sub.pegs[2] = selectedNode + 1

      } else if (selectedNode === firstNode - 1) {
        player.ships.sub.pegs[2] = selectedNode - 1
      }
    }
    player.ships.sub.pegs.forEach(function (node) {
      gameBoard[node - 1] = node;
    })
    console.log(player.ships.sub.pegs)

  } else if (shipLength === 2) {
    if (player.ships.destroyer.pegs.every(node => node === null)) {
      player.ships.destroyer.pegs[0] = selectedNode
      firstNode = player.ships.destroyer.pegs[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.destroyer.pegs[1] = selectedNode
      player.ships.destroyer.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      console.log(player.ships.destroyer.pegs)
      console.log(player.ships.sub.pegs)
      console.log(player.ships.cruiser.pegs)
      console.log(player.ships.battleship.pegs)
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()
      cpuGuess()

    } else if (shipLength === 0) {
      console.log('Please select a ship to palce')
    }
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
    do {
      direction = 0
      cpuFirst = getRandomIntInclusive(-1, -100)
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
          cpu.ships.battleship.every(boundVerticalNeg) ? isBound = true : isBound = false
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
          cpu.ships.battleship.every(boundVerticalNeg) ? isBound = true : isBound = false
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
    } while (!isBound)
  } else if (ship === 4) {
    do {
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
            cpu.ships.cruiser.every(boundVerticalNeg) ? isBound = true : isBound = false
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
            cpu.ships.cruiser.every(boundVerticalNeg) ? isBound = true : isBound = false
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
    } while (!isBound)
  } else if (ship === 3) {
    do {
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
            cpu.ships.sub.every(boundVerticalNeg) ? isBound = true : isBound = false
            break
          case 2:
            cpu.ships.sub[1] = cpuFirst + 1
            cpu.ships.sub[2] = cpuFirst + 2
            break
          case 3:
            cpu.ships.sub[1] = cpuFirst + 10
            cpu.ships.sub[2] = cpuFirst + 20
            cpu.ships.sub.every(boundVerticalNeg) ? isBound = true : isBound = false
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
    } while (!isBound)
  } else if (ship === 2) {
    do {
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
            cpu.ships.destroyer.every(boundVerticalNeg) ? isBound = true : isBound = false
            break
          case 2:
            cpu.ships.destroyer[1] = cpuFirst + 1
            break
          case 3:
            cpu.ships.destroyer[1] = cpuFirst + 10
            cpu.ships.destroyer.every(boundVerticalNeg) ? isBound = true : isBound = false
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
    } while (!isBound)
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
function checkSunk(guess) {
  if (player.ships.battleship.pegs.includes(guess)) {
    if (player.ships.battleship.pegs.every(node => gameBoard[node - 1] === -1)) {
      player.ships.battleship.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.battleship.isSunk = true
      return true
    } else return false
  } else if (player.ships.cruiser.pegs.includes(guess)) {
    if (player.ships.cruiser.pegs.every(node => gameBoard[node - 1] === -1)) {
      player.ships.cruiser.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.cruiser.isSunk = true
      return true
    } else return false

  } else if (player.ships.sub.pegs.includes(guess)) {
    if (player.ships.sub.pegs.every(node => gameBoard[node - 1] === -1)) {
      player.ships.sub.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.sub.isSunk = true
      return true
    } else return false

  } else if (player.ships.destroyer.pegs.includes(guess)) {
    if (player.ships.destroyer.pegs.every(node => gameBoard[node - 1] === -1)) {
      player.ships.destroyer.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.destroyer.isSunk = true
      return true
    } else return false

  }
}

















//--------------------------------------------------------------------------------------------------------------------------------------
// cpuGuess --> randomize cpu guess of a players node
// const Guess = {
//   prevHits: [],
//   cpuGuesses: [],
//   prevDirection: 0,
//   cpuGuessDirection: 0
// }

function cpuGuess() {
  let vertGuess = 0
  let horizGuess = 0
  do {
    if (Guess.prevHits.length < 1) {
      guess = getRandomIntInclusive(1, 100)
      while (Guess.cpuGuesses.includes(guess)) {
        guess = getRandomIntInclusive(1, 100)
      }
      if (checkHit(guess)) {
        // Guess.prevHits.push(guess)
        Guess.cpuGuesses.push(guess)
      } else Guess.cpuGuesses.push(guess)
    } else if (Guess.prevHits.length === 1) {
      Guess.cpuGuessDirection = getRandomIntInclusive(1, 4)
      guess = Guess.prevHits[0]
      switch (Guess.cpuGuessDirection) {
        case 1:
          guess = guess - 10
          boundVerticalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)

          }

          break
        case 2:
          guess = guess + 1
          boundHorizontalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

          break
        case 3:
          guess = guess + 10
          boundVerticalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
            // IF GUESS IS IN cpuGUESSES THEN GO TO OTHER VERT POSITION
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

          break
        case 4:
          guess = guess - 1
          boundHorizontalPos(guess)
          //check sunk if sunk clear prevHits
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

          break
      }
    } else if (Guess.prevHits.length > 1) {
      if (Guess.prevDirection.direction === 1 || Guess.prevDirection.direction === 3) { // We know its Vertical
        vertGuess = getRandomIntInclusive(1, 2)
        if (vertGuess === 1) { // GUESS UP WITHIN BOUNDS AND NOT IN CPUGUESSES
          // if (Guess.prevHits[0] > Guess.prevHits[Guess.prevHits.length - 1]) {
            guess = Math.min(...Guess.prevHits) - 10
          // } else {
            // guess = Guess.prevHits[0] - 10
          // }
          boundVerticalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

        } else if (vertGuess === 2) { // GUESS DOWN WITHIN BOUNDS AND NOT IN CPUGUESSES
          // if (Guess.prevHits[0] < Guess.prevHits[Guess.prevHits.length - 1]) {
            guess = Math.max(...Guess.prevHits) + 10
          // } else {
            // guess = Guess.prevHits[0] + 10
          // }
          boundVerticalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

        } else if (!checkSunk(guess) && isNaN(gameBoard[guess - 1])) {
          (Guess.prevDirection.direction === 1 || Guess.prevDirection.direction === 3) ? Guess.prevDirection.direction = Guess.prevDirection.direction + 1 : Guess.prevDirection.direction = Guess.prevDirection.direction - 1
          for(let i = 0; i < Guess.prevHits.length - 1; i++) {
            Guess.prevHits.pop()
          }
        }
      } else { // We know its horizontal 
        horizGuess = getRandomIntInclusive(1, 2)
        if (horizGuess === 1) { // GUESS RIGHT WITHIN BOUNDS AND NOT IN CPU GUESSES
          // if (Math.min(...Guess.prevHits) < Math.max(Guess.prevHits)) {
            guess = Math.max(Guess.prevHits) + 1
          // } else {
            // guess = Math.min(Guess.prevHits) + 1
          // }
          boundHorizontalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            // Guess.prevHits.push(guess)
            Guess.cpuGuesses.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

        } else if (horizGuess === 2) {  // GUESS LEFT WITHIN BOUNDS AND NOT IN CPU GUESSES
          // if (Guess.prevHits[0] > Guess.prevHits[Guess.prevHits.length - 1]) {
            guess = Math.min(...Guess.prevHits) - 1
          // } else {
            // guess = Guess.prevHits[0] - 1
          // }
          boundHorizontalPos(guess)
          if (checkHit(guess)) {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
            // Guess.prevHits.push(guess)
            checkSunk(guess)
          } else {
            Guess.prevDirection.direction = Guess.cpuGuessDirection
            Guess.cpuGuesses.push(guess)
          }

        } else if (!checkSunk(guess) && isNaN(gameBoard[guess - 1])) {
          (Guess.prevDirection.direction === 1 || Guess.prevDirection.direction === 3) ? Guess.prevDirection.direction = Guess.prevDirection.direction + 1 : Guess.prevDirection.direction = Guess.prevDirection.direction - 1
          for(let i = 0; i < Guess.prevHits.length - 1; i++) {
            Guess.prevHits.pop()
          }
        }
      }
      // if (!checkSunk(guess) && !checkHit(guess) ) {
      //   (Guess.prevDirection.direction === 1 || Guess.prevDirection.direction === 3) ? guess.prevDirection.direction + 1 : guess.prevDirection.direction - 1

      // }
    } else if (gameBoard[guess - 1] === -1 ) {
      if (Guess.prevDirection.direction === 1) {
        guess = guess - 10
        if(checkHit(guess)) {
        // Guess.prevHits.push(guess)
        Guess.cpuGuesses.push(guess)
        checkSunk(guess)
        }
      } else if (Guess.prevDirection.direction === 3) {
        guess = guess + 10
        if(checkHit(guess)) {
        // Guess.prevHits.push(guess)
        Guess.cpuGuesses.push(guess)
        checkSunk(guess)
        }
      } else if (Guess.prevDirection.direction === 2) {
        guess = guess + 1
        if(checkHit(guess)) {
        // Guess.prevHits.push(guess)
        Guess.cpuGuesses.push(guess)
        checkSunk(guess)
        }
      } else if (Guess.prevDirection.direction === 4) {
        guess = guess - 1
        if(checkHit(guess)) {
        // Guess.prevHits.push(guess)
        Guess.cpuGuesses.push(guess)
        checkSunk(guess)
        }
      }
    }


  } while (hasGuessed(guess) && !isBound) // && isBound)
  Guess.prevHits.forEach(hit => console.log(hit));
  console.log(player.ships.battleship.isSunk)
  console.log(player.ships.cruiser.isSunk)
  console.log(player.ships.sub.isSunk)
  console.log(player.ships.destroyer.isSunk)
  console.log(Guess)

}




//--------------------------------------------------------------------------------------------------------------------------------------
// hasGuessed
function hasGuessed(guess) {
  return Guess.cpuGuesses.includes(guess) ? true : false
}


//--------------------------------------------------------------------------------------------------------------------------------------
// checkHit --> check if guess is a hit on a ship

function checkHit(guess) {
  if (currentTurn === 'user') {
    if (computerBoard.includes(guess)) {
      applyHit(guess)
      return true
    } else if (!computerBoard.includes(guess)) {
      applyMiss(guess)
      return false
    }
  } else if (currentTurn === 'cpu') {
    if (gameBoard.includes(guess)) {
      applyHit(guess)
      return true
    } else if (!gameBoard.includes(guess)) {
      applyMiss(guess)
      return false
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// applyHit --> applies a hit to the board if checkHit passes
function applyHit(guess) {
  if (currentTurn === 'user') {
    console.log(`User hit node ${guess}`)
    computerBoard[guess - 1] = -1 // Will eventually apply visual effect and sound to this position 
    playerWinCount += 1
  } else if (currentTurn === 'cpu') {
    console.log(`Cpu hit node ${guess}`)
    Guess.prevHits.push(guess)
    console.log("GUESS PREVIOUS HITS ", Guess.prevHits)
    console.log(gameBoard[guess - 1])
    gameBoard[guess - 1] = -1 // Will eventually apply visual effect and sound to this position 
    console.log(gameBoard[guess - 1])
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
    console.log(`cpu missed at node ${guess}`)
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
// checkShip
function checkShip(guess) {
  if (player.ships.battleship.pegs.includes(guess)) {
    return 'battleship'
  } else if (player.ships.cruiser.pegs.includes(guess)) {
    return 'cruiser'
  } else if (player.ships.sub.pegs.includes(guess)) {
    return 'sub'
  } else if (player.ships.destroyer.pegs.includes(guess)) {
    return 'destroyer'
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
// appendChildren(cpuBoard, cpuNodes)
appendChildren(playerBoard, playerNodes)
// cpuPlace(5)
// cpuPlace(4)
// cpuPlace(3)
// cpuPlace(2)
// console.log(cpu.ships.battleship.length)

// playerSwap();
// playerSwap();

// playerSwap(appendChildren(gameBoard, playerNodes))
// playerSwap();
// console.log('hello2')