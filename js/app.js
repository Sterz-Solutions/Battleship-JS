/*----- constants -----*/
// Ship Locations 
// Player 1 ship locations
//    (Ship 1, ship 2, etc)
// Cpu ship locations
//    (Ship 1, ship 2, etc)
// GuessHit -- Current (guess)
// numGuesses
// Number of total Hits (hits)
// Is the ship sunk (isSunk = true/false)

/*----- app's state (variables) -----*/

let nodeVal = [];

/*----- cached element references -----*/
let gameBoard = document.getElementById('game-board');
/*----- event listeners -----*/

// for (let i = 0; i < cards.length; i++) {
//   let cardElement = document.createElement('img');
//   cardElement.setAttribute('src', "images/back.png");
//   cardElement.setAttribute('data-id', i);
//   cardElement.addEventListener("click", flipCard);
//   document.getElementById('game-board').appendChild(cardElement);
// }

/*----- functions -----*/
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
}

function createBoard() {
  let curNode = ''
  count = 0;
  // for(let i=1; i<=10; i++) {
    while(count < 100) {

    if(curNode === '' || count < 10 ){
      curNode = `a${count+1}`
      count++
    }
    else if(10 <= count && count < 20){
      curNode = `b${count-9}`
      count++
    }
    else if(20 <= count && count < 30){
      curNode = `c${count-19}`
      count++
    }
    else if(30 <= count && count < 40){
      curNode = `d${count-29}`
      count++ 
    }
    else if(40 <= count && count < 50){
      curNode = `e${count-39}`
      count++
    }
    else if(50 <= count && count < 60){
      curNode = `f${count-49}`
      count++
    }
    else if(60 <= count && count < 70){
      curNode = `g${count-59}`
      count++
    }
    else if(70 <= count && count < 80){
      curNode = `h${count-69}`
      count++
    }
    else if(80 <= count && count < 90){
      curNode = `i${count-79}`
      count++
    }
    else if(90 <= count){
      curNode = `j${count-89}`
      count++
    }
    nodeVal.push(addNode(curNode));

    // if(count % 10 === 0) {
    //   i = 0;
    // }
  }

  appendChildren(gameBoard, nodeVal)
}

/*----- GAME START -----*/


// Are all ships sunk? (While loop?) --Player / Cpu
//  Player Guess
//  Is guess valid? -- if no tell user they need to enter a proper board spot
//  If yes -- +1 guesses
//  Did it hit?
//  Yes ---- No
//  Check against CPU ship 1 - Ship X locations
//  If hit check length of ship and add one to hits
//  If hits === ship length
//  isSunk === True
//   SHIP IS SUNK!
//  If no hit CPU Guess
//  CPU Guessing AI -- If hit check nsew nodes -- if 2 hit check in line nodes
//  SAME CHECK AS ABOVE
createBoard();
