

/*----- constants -----*/

/*----- app's state (variables) -----*/
const Guess = {
  prevHits: [],
  cpuGuesses: [],
  prevDirection: {
    direction: 0,
    hit: false
  },
  cpuGuessDirection: 0
}

let hitWasGuessed = 0
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
const userPrompt = document.getElementById('prompt')
const playButton = document.getElementById('play-button')
const swapButton = document.getElementById('swap-turn')

/*----- event listeners -----*/

// selectShip listener
shipButtons.addEventListener('click', selectShip)
// placeShip listener
playerBoard.addEventListener('click', placeShip)
// playerGuess listener
cpuBoard.addEventListener('click', playerGuess)
// playGame listener
playButton.addEventListener('click', playGame)
// SwapTurn listener
swapButton.addEventListener('click', swapTurn)

/*----- functions -----*/


//--------------------------------------------------------------------------------------------
function playGame(e) {
  playerBoard.removeEventListener('click', placeShip)
  shipButtons.removeEventListener('click', selectShip)
  document.getElementById('battleship').disabled = true
  document.getElementById('cruiser').disabled = true
  document.getElementById('sub').disabled = true
  document.getElementById('destroyer').disabled = true
  appendChildren(cpuBoard, cpuNodes)
  cpuPlace()
  swapTurn()
  userPrompt.innerHTML = 'Its Your Turn! FIRE AWAY!'

}

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
  if ((Guess.prevHits[0] >= 1 && Guess.prevHits[0] <= 10) && (guess >= 1 && guess <= 10)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 11 && Guess.prevHits[0] <= 20) && (guess >= 11 && guess <= 20)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 21 && Guess.prevHits[0] <= 30) && (guess >= 21 && guess <= 30)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 31 && Guess.prevHits[0] <= 40) && (guess >= 31 && guess <= 40)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 41 && Guess.prevHits[0] <= 50) && (guess >= 41 && guess <= 50)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 51 && Guess.prevHits[0] <= 60) && (guess >= 51 && guess <= 60)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 61 && Guess.prevHits[0] <= 70) && (guess >= 61 && guess <= 70)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 71 && Guess.prevHits[0] <= 80) && (guess >= 71 && guess <= 80)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 81 && Guess.prevHits[0] <= 90) && (guess >= 81 && guess <= 90)) {
    isBound = true
    return true
  } else if ((Guess.prevHits[0] >= 91 && Guess.prevHits[0] <= 100) && (guess >= 891 && guess <= 100)) {
    isBound = true
    return true
  } else isBound = false
  return false
}

// Horizontal Bounds for negative numbers
function boundHorizontalNeg(startIndex, node) {
  if ((startIndex <= -1 && startIndex >= -10) && (node <= -1 && node >= -10)) {
    isBound = true
    return true
  } else if ((startIndex <= -11 && startIndex >= -20) && (node <= -11 && node >= -20)) {
    isBound = true
    return true
  } else if ((startIndex <= -21 && startIndex >= -30) && (node <= -21 && node >= -30)) {
    isBound = true
    return true
  } else if ((startIndex <= -31 && startIndex >= -40) && (node <= -31 && node >= 40)) {
    isBound = true
    return true
  } else if ((startIndex <= -41 && startIndex >= -50) && (node <= -41 && node >= -50)) {
    isBound = true
    return true
  } else if ((startIndex <= -51 && startIndex >= -60) && (node <= -51 && node >= -60)) {
    isBound = true
    return true
  } else if ((startIndex <= -61 && startIndex >= -70) && (node <= -61 && node >= -70)) {
    isBound = true
    return true
  } else if ((startIndex <= -71 && startIndex >= -80) && (node <= -71 && node >= -80)) {
    isBound = true
    return true
  } else if ((startIndex <= -81 && startIndex >= -90) && (node <= -81 && node >= -90)) {
    isBound = true
    return true
  } else if ((startIndex <= -91 && startIndex >= -100) && (node <= -91 && node >= -100)) {
    isBound = true
    return true
  } else isBound = false
  return false
}

// Vertical bounds check for negative numbers
function boundVerticalNeg(startIndex, nodeToCheck) {
  if ((startIndex > -100 && startIndex < -1) && (nodeToCheck > -100 && nodeToCheck < -1)) {
    isBound = true
  }
  else isBound = false
}

// Vertical bounds check for positive numbers
function boundVerticalPos(nodeToCheck) {
  if (nodeToCheck <= 100 && nodeToCheck >= 1 || nodeToCheck === -10) {
    isBound = true
    return true
  }
  else {
    isBound = false
    return false
  }
}


//--------------------------------------------------------------------------------------------------------------------------------------
// addNode --> To add board node within createBoard for HTML updating
function addNode(curNode) {
  let nodeEl = document.createElement('div');
  nodeEl.setAttribute('id', curNode);
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
    userPrompt.innerHTML = 'Select a start space place your Battleship'

  } else if (e.target.getAttribute('id') === 'cruiser') {
    shipLength = 4
    userPrompt.innerHTML = 'Select a start space place your Cruiser'

  } else if (e.target.getAttribute('id') === 'sub') {
    shipLength = 3
    userPrompt.innerHTML = 'Select a start space place your Sub'

  } else if (e.target.getAttribute('id') === 'destroyer') {
    shipLength = 2
    userPrompt.innerHTML = 'Select a start space place your Destroyer'

  }


}
//--------------------------------------------------------------------------------------------------------------------------------------
// if (selectedNode)
// placeShip --> function for placing a ship based on user clicking nodes

function placeShip(e) {
  let selectedNode = parseInt(e.target.id)
  if (shipLength === 5) {
    if (player.ships.battleship.pegs.every(node => node === null)) {
      player.ships.battleship.pegs[0] = selectedNode
      e.target.style = 'background-color: orchid'
      firstNode = selectedNode

      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Battleship in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.battleship.pegs[1] = selectedNode
      e.target.style = 'background-color: orchid'

      if (selectedNode === firstNode + 10) {
        player.ships.battleship.pegs[2] = selectedNode + 10
        document.getElementById(selectedNode + 10).style = 'background-color: orchid'
        player.ships.battleship.pegs[3] = selectedNode + 20
        document.getElementById(selectedNode + 20).style = 'background-color: orchid'
        player.ships.battleship.pegs[4] = selectedNode + 30
        document.getElementById(selectedNode + 30).style = 'background-color: orchid'

      } else if (selectedNode === firstNode - 10) {
        player.ships.battleship.pegs[2] = selectedNode - 10
        document.getElementById(selectedNode - 10).style = 'background-color: orchid'
        player.ships.battleship.pegs[3] = selectedNode - 20
        document.getElementById(selectedNode - 20).style = 'background-color: orchid'
        player.ships.battleship.pegs[4] = selectedNode - 30
        document.getElementById(selectedNode - 30).style = 'background-color: orchid'


      } else if (selectedNode === firstNode + 1) {
        player.ships.battleship.pegs[2] = selectedNode + 1
        document.getElementById(selectedNode + 1).style = 'background-color: orchid'
        player.ships.battleship.pegs[3] = selectedNode + 2
        document.getElementById(selectedNode + 2).style = 'background-color: orchid'
        player.ships.battleship.pegs[4] = selectedNode + 3
        document.getElementById(selectedNode + 3).style = 'background-color: orchid'

      } else if (selectedNode === firstNode - 1) {
        player.ships.battleship.pegs[2] = selectedNode - 1
        document.getElementById(selectedNode - 1).style = 'background-color: orchid'
        player.ships.battleship.pegs[3] = selectedNode - 2
        document.getElementById(selectedNode - 2).style = 'background-color: orchid'
        player.ships.battleship.pegs[4] = selectedNode - 3
        document.getElementById(selectedNode - 3).style = 'background-color: orchid'

      }
      player.ships.battleship.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      userPrompt.innerHTML = 'Select Next Ship To Place'
    }
  } else if (shipLength === 4) {

    if (player.ships.cruiser.pegs.every(node => node === null)) {
      player.ships.cruiser.pegs[0] = selectedNode
      e.target.style = 'background-color: papayawhip'
      firstNode = player.ships.cruiser.pegs[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Cruiser in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.cruiser.pegs[1] = selectedNode
      e.target.style = 'background-color: papayawhip'

      if (selectedNode === firstNode + 10) {
        player.ships.cruiser.pegs[2] = selectedNode + 10
        document.getElementById(selectedNode + 10).style = 'background-color: papayawhip'
        player.ships.cruiser.pegs[3] = selectedNode + 20
        document.getElementById(selectedNode + 20).style = 'background-color: papayawhip'
      } else if (selectedNode === firstNode - 10) {
        player.ships.cruiser.pegs[2] = selectedNode - 10
        document.getElementById(selectedNode - 10).style = 'background-color: papayawhip'
        player.ships.cruiser.pegs[3] = selectedNode - 20
        document.getElementById(selectedNode - 20).style = 'background-color: papayawhip'
      } else if (selectedNode === firstNode + 1) {
        player.ships.cruiser.pegs[2] = selectedNode + 1
        document.getElementById(selectedNode + 1).style = 'background-color: papayawhip'
        player.ships.cruiser.pegs[3] = selectedNode + 2
        document.getElementById(selectedNode + 2).style = 'background-color: papayawhip'
      } else if (selectedNode === firstNode - 1) {
        player.ships.cruiser.pegs[2] = selectedNode - 1
        document.getElementById(selectedNode - 1).style = 'background-color: papayawhip'
        player.ships.cruiser.pegs[3] = selectedNode - 2
        document.getElementById(selectedNode - 2).style = 'background-color: papayawhip'
      }
      player.ships.cruiser.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      userPrompt.innerHTML = 'Select Next Ship To Place'
    }
  } else if (shipLength === 3) {
    if (player.ships.sub.pegs.every(node => node === null)) {
      player.ships.sub.pegs[0] = selectedNode
      e.target.style = 'background-color: skyblue'
      firstNode = player.ships.sub.pegs[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.sub.pegs[1] = selectedNode
      e.target.style = 'background-color: skyblue'

      if (selectedNode === firstNode + 10) {
        player.ships.sub.pegs[2] = selectedNode + 10
        document.getElementById(selectedNode + 10).style = 'background-color: skyblue'

      } else if (selectedNode === firstNode - 10) {
        player.ships.sub.pegs[2] = selectedNode - 10
        document.getElementById(selectedNode - 10).style = 'background-color: skyblue'

      } else if (selectedNode === firstNode + 1) {
        player.ships.sub.pegs[2] = selectedNode + 1
        document.getElementById(selectedNode + 1).style = 'background-color: skyblue'

      } else if (selectedNode === firstNode - 1) {
        player.ships.sub.pegs[2] = selectedNode - 1
        document.getElementById(selectedNode - 1).style = 'background-color: skyblue'
      }
      player.ships.sub.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      userPrompt.innerHTML = 'Select Next Ship To Place'
    }

  } else if (shipLength === 2) {
    if (player.ships.destroyer.pegs.every(node => node === null)) {
      player.ships.destroyer.pegs[0] = selectedNode
      e.target.style = 'background-color: peru'

      firstNode = player.ships.destroyer.pegs[0]
      userPrompt.innerHTML = 'Select an adjacent space left, right, up, or down to place your Sub in selected direction'
    } else if (firstNode + 10 !== selectedNode && firstNode - 10 !== selectedNode && firstNode + 1 !== selectedNode && firstNode - 1 !== selectedNode) {

      userPrompt.innerHTML = 'Not a valid selection'
    } else if (selectedNode === selectedNode + 10 || selectedNode - 10 || selectedNode + 1 || selectedNode - 1) {
      player.ships.destroyer.pegs[1] = selectedNode
      e.target.style = 'background-color: peru'

      player.ships.destroyer.pegs.forEach(function (node) {
        gameBoard[node - 1] = node;
      })
      userPrompt.innerHTML = 'Select Next Ship To Place'
    } else if (shipLength === 0) {
      userPrompt.innerHTML = 'Please select a ship to palce'
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


function cpuPlace() {
  let check = 0
  let cpuFirst = 0

  do { // FIVE SHIP
    let direction5 = 0
    cpuFirst = getRandomIntInclusive(-1, -100)
    cpu.ships.battleship[0] = cpuFirst
    // pick a direction of placement randomly
    // 1 = up   2 = right   3 = down    4 = left
    direction5 = getRandomIntInclusive(1, 4)
    switch (direction5) {
      case 1:
        cpu.ships.battleship[1] = cpuFirst - 10
        cpu.ships.battleship[2] = cpuFirst - 20
        cpu.ships.battleship[3] = cpuFirst - 30
        cpu.ships.battleship[4] = cpuFirst - 40
        for (let i = 1; i < cpu.ships.battleship.length; i++) {
          boundVerticalNeg(cpu.ships.battleship[0], cpu.ships.battleship[i])
        }
        break
      case 2:
        cpu.ships.battleship[1] = cpuFirst + 1
        cpu.ships.battleship[2] = cpuFirst + 2
        cpu.ships.battleship[3] = cpuFirst + 3
        cpu.ships.battleship[4] = cpuFirst + 4
        for (let i = 1; i < cpu.ships.battleship.length; i++) {
          boundHorizontalNeg(cpu.ships.battleship[0], cpu.ships.battleship[i])
        }

        break
      case 3:
        cpu.ships.battleship[1] = cpuFirst + 10
        cpu.ships.battleship[2] = cpuFirst + 20
        cpu.ships.battleship[3] = cpuFirst + 30
        cpu.ships.battleship[4] = cpuFirst + 40
        for (let i = 1; i < cpu.ships.battleship.length; i++) {
          boundVerticalNeg(cpu.ships.battleship[0], cpu.ships.battleship[i])
        }
        break
      case 4:
        cpu.ships.battleship[1] = cpuFirst - 1
        cpu.ships.battleship[2] = cpuFirst - 2
        cpu.ships.battleship[3] = cpuFirst - 3
        cpu.ships.battleship[4] = cpuFirst - 4
        for (let i = 1; i < cpu.ships.battleship.length; i++) {
          boundHorizontalNeg(cpu.ships.battleship[0], cpu.ships.battleship[i])
        }
        break
    }

  } while (!isBound)

  cpu.ships.battleship.forEach(function (node) {
    computerBoard[Math.abs(node) - 1] = Math.abs(node);
  })


  ///////////////////////////////////////
  do { // FOUR SHIP
    let direction4 = 0
    cpuFirst = getRandomIntInclusive(-1, -100)
    cpu.ships.cruiser[0] = cpuFirst
    // pick a direction of placement randomly
    // 1 = up   2 = right   3 = down    4 = left
    direction4 = getRandomIntInclusive(1, 4)
    switch (direction4) {
      case 1:
        cpu.ships.cruiser[1] = cpuFirst - 10
        cpu.ships.cruiser[2] = cpuFirst - 20
        cpu.ships.cruiser[3] = cpuFirst - 30
        for (let i = 1; i < cpu.ships.cruiser.length; i++) {
          boundVerticalNeg(cpu.ships.cruiser[0], cpu.ships.cruiser[i])
        }
        break
      case 2:
        cpu.ships.cruiser[1] = cpuFirst + 1
        cpu.ships.cruiser[2] = cpuFirst + 2
        cpu.ships.cruiser[3] = cpuFirst + 3
        for (let i = 1; i < cpu.ships.cruiser.length; i++) {
          boundHorizontalNeg(cpu.ships.cruiser[0], cpu.ships.cruiser[i])
        }
        break
      case 3:
        cpu.ships.cruiser[1] = cpuFirst + 10
        cpu.ships.cruiser[2] = cpuFirst + 20
        cpu.ships.cruiser[3] = cpuFirst + 30
        for (let i = 1; i < cpu.ships.cruiser.length; i++) {
          boundVerticalNeg(cpu.ships.cruiser[0], cpu.ships.cruiser[i])
        }
        break
      case 4:
        cpu.ships.cruiser[1] = cpuFirst - 1
        cpu.ships.cruiser[2] = cpuFirst - 2
        cpu.ships.cruiser[3] = cpuFirst - 3
        for (let i = 1; i < cpu.ships.cruiser.length; i++) {
          boundHorizontalNeg(cpu.ships.cruiser[0], cpu.ships.cruiser[i])
        }
        break
    }
    if (!cpu.ships.cruiser.every((node) => {
      return computerBoard.includes(node * -1)
    })) {
      check === 1
    }
  } while (!isBound && check === 0)
  cpu.ships.cruiser.forEach(function (node) {
    computerBoard[Math.abs(node) - 1] = Math.abs(node);
  })



  ///////////////////////////////////////
  do { // THREE SHIP
    let direction3 = 0
    cpuFirst = getRandomIntInclusive(-1, -100)
    cpu.ships.sub[0] = cpuFirst
    // pick a direction of placement randomly
    // 1 = up   2 = right   3 = down    4 = left
    direction3 = getRandomIntInclusive(1, 4)
    switch (direction3) {
      case 1:
        cpu.ships.sub[1] = cpuFirst - 10
        cpu.ships.sub[2] = cpuFirst - 20
        for (let i = 1; i < cpu.ships.sub.length; i++) {
          boundVerticalNeg(cpu.ships.sub[0], cpu.ships.sub[i])
        }
        break
      case 2:
        cpu.ships.sub[1] = cpuFirst + 1
        cpu.ships.sub[2] = cpuFirst + 2
        for (let i = 1; i < cpu.ships.sub.length; i++) {
          boundHorizontalNeg(cpu.ships.sub[0], cpu.ships.sub[i])
        }
        break
      case 3:
        cpu.ships.sub[1] = cpuFirst + 10
        cpu.ships.sub[2] = cpuFirst + 20
        for (let i = 1; i < cpu.ships.sub.length; i++) {
          boundVerticalNeg(cpu.ships.sub[0], cpu.ships.sub[i])
        }
        break
      case 4:
        cpu.ships.sub[1] = cpuFirst - 1
        cpu.ships.sub[2] = cpuFirst - 2
        for (let i = 1; i < cpu.ships.sub.length; i++) {
          boundHorizontalNeg(cpu.ships.sub[0], cpu.ships.sub[i])
        }
        break
    }
    if (!cpu.ships.sub.every((node) => {
      return computerBoard.includes(node * -1)
    })) {
      check === 1
    }
  } while (!isBound && check === 0)
  cpu.ships.sub.forEach(function (node) {
    computerBoard[Math.abs(node) - 1] = Math.abs(node);
  })


  ///////////////////////////////////////
  do { // TWO SHIP
    let direction2 = 0
    check === 0
    cpuFirst = getRandomIntInclusive(-1, -100)
    cpu.ships.destroyer[0] = cpuFirst
    // pick a direction of placement randomly
    // 1 = up   2 = right   3 = down    4 = left
    direction2 = getRandomIntInclusive(1, 4)
    switch (direction2) {
      case 1:
        cpu.ships.destroyer[1] = cpuFirst - 10
        for (let i = 1; i < cpu.ships.destroyer.length; i++) {
          boundVerticalNeg(cpu.ships.destroyer[0], cpu.ships.destroyer[i])
        }
        break
      case 2:
        cpu.ships.destroyer[1] = cpuFirst + 1
        for (let i = 1; i < cpu.ships.destroyer.length; i++) {
          boundHorizontalNeg(cpu.ships.destroyer[0], cpu.ships.destroyer[i])
        }
        break
      case 3:
        cpu.ships.destroyer[1] = cpuFirst + 10
        for (let i = 1; i < cpu.ships.destroyer.length; i++) {
          boundVerticalNeg(cpu.ships.destroyer[0], cpu.ships.destroyer[i])
        }
        break
      case 4:
        cpu.ships.destroyer[1] = cpuFirst - 1
        for (let i = 1; i < cpu.ships.destroyer.length; i++) {
          boundHorizontalNeg(cpu.ships.destroyer[0], cpu.ships.destroyer[i])
        }
        break
    }
    if (!cpu.ships.destroyer.every((node) => {
      return computerBoard.includes(node * -1)
    })) {
      check === 1
    }


  } while (!isBound && check === 0)
  cpu.ships.destroyer.forEach(function (node) {
    computerBoard[Math.abs(node) - 1] = Math.abs(node);
  })

}

//--------------------------------------------------------------------------------------------------------------------------------------
// playerGuess --> get users guess for hit with click on a cpu node 
function playerGuess(e) {
  guess = e.target.id
  checkHit(guess * -1)
}

//--------------------------------------------------------------------------------------------------------------------------------------
// shipSunk --> check for isSunk for ship
function checkSunk(guess) {
  if (player.ships.battleship.pegs.includes(guess)) {
    if (player.ships.battleship.pegs.every(node => gameBoard[node - 1] === -10)) {
      player.ships.battleship.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.battleship.isSunk = true
      userPrompt.innerHTML = 'Your Battleship has been sunk!'
      setTimeout(() => winCheck(), 400);

      return true
    } else return false
  } else if (player.ships.cruiser.pegs.includes(guess)) {
    if (player.ships.cruiser.pegs.every(node => gameBoard[node - 1] === -10)) {
      player.ships.cruiser.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.cruiser.isSunk = true
      userPrompt.innerHTML = 'Your Cruiser has been sunk!'
      setTimeout(() => winCheck(), 400);

      return true
    } else return false

  } else if (player.ships.sub.pegs.includes(guess)) {
    if (player.ships.sub.pegs.every(node => gameBoard[node - 1] === -10)) {
      player.ships.sub.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.sub.isSunk = true
      userPrompt.innerHTML = 'Your Sub has been sunk!'
      setTimeout(() => winCheck(), 400);

      return true
    } else return false

  } else if (player.ships.destroyer.pegs.includes(guess)) {
    if (player.ships.destroyer.pegs.every(node => gameBoard[node - 1] === -10)) {
      player.ships.destroyer.pegs.forEach(node => gameBoard[node - 1] === 'sunk')

      Guess.prevHits = []
      player.ships.destroyer.isSunk = true
      userPrompt.innerHTML = 'Your Destroyer has been sunk!'
      setTimeout(() => winCheck(), 400);

      return true
    } else return false

  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// CheckCpuSunk
function checkCpuSunk(guess) {

  if (cpu.ships.battleship.includes(guess * -1)) {
    if (cpu.ships.battleship.every(node => computerBoard[(node * -1) - 1] === 'hit')) {
      userPrompt.innerHTML = 'You sunk the enemy BattleShip!'
      cpu.ships.battleship.forEach((node) => {
        document.getElementById(node).style = 'background-color: orchid'
      })
      return true
    } else return false
  } else if (cpu.ships.cruiser.includes(guess * -1)) {
    cpu.ships.cruiser.forEach((node) => {
    })
    if (cpu.ships.cruiser.every(node => computerBoard[(node * -1) - 1] === 'hit')) {
      userPrompt.innerHTML = 'You sunk the enemy Cruiser!'
      cpu.ships.cruiser.forEach((node) => {
        document.getElementById(node).style = 'background-color: papayawhip'
      })
      return true
    } else return false

  } else if (cpu.ships.sub.includes(guess * -1)) {
    if (cpu.ships.sub.every(node => computerBoard[(node * -1) - 1] === 'hit')) {
      userPrompt.innerHTML = 'You sunk the enemy Sub!'
      cpu.ships.sub.forEach((node) => {
        document.getElementById(node).style = 'background-color: skyblue'
      })
      return true
    } else return false

  } else if (cpu.ships.destroyer.includes(guess * -1)) {
    if (cpu.ships.destroyer.every(node => computerBoard[(node * -1) - 1] === 'hit')) {
      userPrompt.innerHTML = 'You sunk the enemy Destroyer!'
      cpu.ships.destroyer.forEach((node) => {
        document.getElementById(node).style = 'background-color: peru'
      })
      return true
    } else return false

  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// cpuGuess --> randomize cpu guess of a players node

function cpuGuess() {
  hitWasGuessed = 0
  missWasGuessed = 0
  let vertGuess = 0
  let horizGuess = 0
  do {
    if (Guess.prevHits.length < 1) {
      guess = getRandomIntInclusive(1, 100)
      while (Guess.cpuGuesses.includes(guess)) {
        guess = getRandomIntInclusive(1, 100)
      }
      isBound = true
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else Guess.cpuGuesses.push(guess)
    } else if (Guess.prevHits.length === 1 && hitWasGuessed !== 1) {
      Guess.cpuGuessDirection = getRandomIntInclusive(1, 4)
      guess = Guess.prevHits[0]
      if (Guess.cpuGuessDirection === 1) {
        guess = guess - 10
        while (Guess.cpuGuesses.includes(gameBoard[guess - 1]) && hitWasGuessed !== 1) {
          guess = guess - 10
        }
        if (gameBoard[guess - 1] === 'sunk') {
          Guess.cpuGuessDirection += 1
        }
        boundVerticalPos(guess)
        if (checkHit(guess)) {
          applyHit(guess)
          checkSunk(guess)
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        } else {
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)

        }
      } else if (Guess.cpuGuessDirection === 2) {
        guess = guess + 1
        while (Guess.cpuGuesses.includes(gameBoard[guess - 1]) && hitWasGuessed !== 1) {
          guess = guess + 1
        }
        if (gameBoard[guess - 1] === 'sunk') {
          Guess.cpuGuessDirection += 1
        }
        boundHorizontalPos(guess)
        if (checkHit(guess)) {
          applyHit(guess)
          checkSunk(guess)
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        } else {
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        }
      } else if (Guess.cpuGuessDirection === 3) {
        guess = guess + 10
        while (Guess.cpuGuesses.includes(gameBoard[guess - 1]) && hitWasGuessed !== 1) {
          guess = guess + 10
        }
        if (gameBoard[guess - 1] === 'sunk') {
          Guess.cpuGuessDirection += 1
        }
        boundVerticalPos(guess)
        if (checkHit(guess)) {
          applyHit(guess)
          checkSunk(guess)
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        } else {
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        }
      } else if (Guess.cpuGuessDirection === 4) {
        guess = guess - 1
        while (Guess.cpuGuesses.includes(gameBoard[guess - 1]) && hitWasGuessed !== 1) {
          guess = guess - 1
        }
        boundHorizontalPos(guess)
        if (checkHit(guess)) {
          applyHit(guess)
          checkSunk(guess)
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        } else {
          applyMiss(guess)
          Guess.prevDirection.direction = Guess.cpuGuessDirection
          Guess.cpuGuesses.push(guess)
        }
      }

      if (gameBoard[guess - 1] === -10 && hitWasGuessed !== 1) {
        guessInDirection(Guess.prevDirection.direction)
      }

    } else if (Guess.prevHits.length > 1 && hitWasGuessed !== 1) {
      if (Guess.prevDirection.direction === 1 || Guess.prevDirection.direction === 3) { // We know its Vertical ----------------------------------------------------
        vertGuess = getRandomIntInclusive(1, 2)
        if (vertGuess === 1) { // GUESS UP WITHIN BOUNDS AND NOT IN CPUGUESSES
          guess = Guess.prevHits[0] - 10
          while (gameBoard[guess - 1] === -10 && hitWasGuessed !== 1) {
            guess = guess - 10
          }

          if (boundVerticalPos(guess) && !hasGuessed(guess)) {
            if (checkHit(guess)) {
              applyHit(guess)
              Guess.cpuGuesses.push(guess)
              checkSunk(guess)
            } else {
              Guess.cpuGuesses.push(guess)
            }
          } else vertGuess = 2
        } else if (vertGuess === 2) { // GUESS DOWN WITHIN BOUNDS AND NOT IN CPUGUESSES
          guess = Guess.prevHits[0] + 10
          while (gameBoard[guess - 1] === -10 && hitWasGuessed !== 1) {
            guess = guess + 10
          }
          if (boundVerticalPos(guess) && !hasGuessed(guess)) {
            if (checkHit(guess)) {
              applyHit(guess)
              Guess.cpuGuesses.push(guess)
              checkSunk(guess)
            } else {
              Guess.cpuGuesses.push(guess)
            }
          }

        } else if (hitWasGuessed !== 1 && Guess.cpuGuesses.includes(gues)) {
          directionSwap(Guess.prevDirection.direction)
        }
      } else if (Guess.prevDirection.direction === 2 || Guess.prevDirection.direction === 4) { // We know its horizontal ------------------------------------------
        horizGuess = getRandomIntInclusive(1, 2)
        if (horizGuess === 1) { // GUESS RIGHT WITHIN BOUNDS AND NOT IN CPU GUESSES
          guess = Math.max(...Guess.prevHits) + 1
          while (gameBoard[guess - 1] === -10 && hitWasGuessed !== 1) {
            guess = guess + 1
          }
          if (boundHorizontalPos(guess)) {
            if (checkHit(guess)) {
              applyHit(guess)
              Guess.cpuGuesses.push(guess)
              checkSunk(guess)
            } else {
              Guess.cpuGuesses.push(guess)
            }
          } else
            horizGuess = 2
        } else if (horizGuess === 2) {  // GUESS LEFT WITHIN BOUNDS AND NOT IN CPU GUESSES
          guess = Math.min(...Guess.prevHits) - 1
          while (gameBoard[guess - 1] === -10 && hitWasGuessed !== 1) {
            guess = guess - 1
          }
          if (boundHorizontalPos(guess)) {
            if (checkHit(guess)) {
              applyHit(guess)
              Guess.cpuGuesses.push(guess)
              checkSunk(guess)
            } else {
              Guess.cpuGuesses.push(guess)
            }

          }
        }
      }
    }
  } while (hasGuessed(guess) && !isBound && hitWasGuessed === 1)
}


//--------------------------------------------------------------------------------------------------------------------------------------
// hasGuessed
function hasGuessed(guess) {
  if (Guess.cpuGuesses.includes(guess)) {
    return true
  } else return false
}


//--------------------------------------------------------------------------------------------------------------------------------------
// checkHit --> check if guess is a hit on a ship

function checkHit(guess) {
  if (currentTurn === 'user') {
    if (computerBoard.includes(guess) || computerBoard[guess - 1] === 'hit') {
      applyHit(guess)
      return true
    } else if (!computerBoard.includes(guess)) {
      applyMiss(guess)
      return false
    }
  } else if (currentTurn === 'cpu') {
    if (gameBoard.includes(guess)) {
      return true
    } else if (gameBoard[guess - 1] === 'sunk') {
      return false

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
    userPrompt.innerHTML = `User hit node ${guess * -1}`
    document.getElementById(guess * -1).style = 'background-color: red'
    computerBoard[guess - 1] = 'hit'
    checkCpuSunk(guess)
    playerWinCount += 1
    winCheck()
  } else if (currentTurn === 'cpu') {
    document.getElementById(guess).style = 'background-color: red'
    hitWasGuessed = 1
    userPrompt.innerHTML = `Cpu hit node ${guess}`
    Guess.prevHits.push(guess)
    gameBoard[guess - 1] = -10 // Will eventually apply visual effect and sound to this position 

    cpuWinCount += 1
    winCheck()
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// applyMiss --> applies a miss to the board if checkHit fails
function applyMiss(guess) {
  if (currentTurn === 'user') {
    //Apply visual and sound effects to this position
    userPrompt.innerHTML = `You missed at location ${guess * -1}`
    document.getElementById(guess * -1).style = 'background-color: white'
    // PLAY SOUND SPLASH

  } else if (currentTurn === 'cpu') {
    //Apply visual and sound effects to this position
    userPrompt.innerHTML = `CPU missed at location ${guess}`
    if (guess !== -10) {
      document.getElementById(guess).style = 'background-color: white'
    }
    // PLAY SOUND SPLASH

  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// winCheck --> check for win to be called within checkHit 
function winCheck() {
  if (playerWinCount === 14) {
    userPrompt.innerHTML = 'YOU WIN!'
    return true
  }
  else if (cpuWinCount === 14) {
    userPrompt.innerHTML = 'CPU WINS!'
    return true
  }
  else return false
}

//--------------------------------------------------------------------------------------------------------------------------------------
// SwapTurn
function swapTurn() {
  playerSwap()
}




//--------------------------------------------------------------------------------------------------------------------------------------
// turnSwap --> swap the turn from user to cpu or cpu to user swapping currentTurn
function playerSwap() {
  if (currentTurn === 'cpu') {
    document.getElementById('game-board').style = 'display: none'
    document.getElementById('cpu-board').style = 'display: grid'
    currentTurn = 'user'
    userPrompt.innerHTML = "It's Your Turn! FIRE AWAY!"

  }

  else if (currentTurn === 'user') {
    document.getElementById('cpu-board').style = 'display: none'
    document.getElementById('game-board').style = 'display: grid'
    setTimeout(() => cpuGuess(), 400);
    currentTurn = 'cpu'
    userPrompt.innerHTML = "CPU's TURN! PREPARE TO BE FIRED ON IN 3... 2... 1... "


  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// guessInDirection
function guessInDirection(direction) {
  switch (direction) {
    case 1:
      guess = guess - 10
      boundVerticalPos(guess)
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else {
        Guess.cpuGuesses.push(guess)

      }
      break
    case 2:
      guess = guess + 1
      boundHorizontalPos(guess)
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else {
        Guess.cpuGuesses.push(guess)
      }
      break
    case 3:
      guess = guess + 10
      boundVerticalPos(guess)
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else {
        Guess.cpuGuesses.push(guess)
      }
      break
    case 4:
      guess = guess - 1
      boundHorizontalPos(guess)
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else {
        Guess.cpuGuesses.push(guess)
      }
      break
  }
}
//--------------------------------------------------------------------------------------------------------------------------------------------
// VERTICAL GUESS
function verticalGuess(direction, guess) {
  let vertGuess = 0
  if (direction === 1 || direction === 3) { // We know its Vertical ----------------------------------------------------
    vertGuess = getRandomIntInclusive(1, 2)
    if (vertGuess === 1) { // GUESS UP WITHIN BOUNDS AND NOT IN CPUGUESSES
      guess = guess - 10
      boundVerticalPos(guess)
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else {
        Guess.cpuGuesses.push(guess)
      }

    } else if (vertGuess === 2) { // GUESS DOWN WITHIN BOUNDS AND NOT IN CPUGUESSES
      guess = guess + 10
      boundVerticalPos(guess)
      if (checkHit(guess)) {
        applyHit(guess)
        checkSunk(guess)
        Guess.cpuGuesses.push(guess)
      } else {
        Guess.cpuGuesses.push(guess)
      }
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------
// Swap Direction
function directionSwap(direction) {
  if (direction === 1 || direction === 3) { // SWAP VERT TO HORIZ
    Guess.prevDirection.direction = direction + 1
  } else if (direction === 2 || direction === 4) { // SWAP HORIZ TO VERT
    Guess.prevDirection.direction = direction - 1
  }
}




/*----- GAME START -----*/
createBoard()
appendChildren(playerBoard, playerNodes)
