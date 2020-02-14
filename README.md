# Battleship-Browser-Game

This is BattleShip using HTML CSS and JavaScript

The game is player vs cpu where the user will place all their ships on the board then make guesses to try and sink the CPU ships and the cpu will attempt to sink all of your ships.

The game boards will be built dynamically and be re-rendered to the screen depending on who's turn it is - CPU / PLAYER
  This will allow the user to see their own board while the CPU takes a guess and see the outcome so they can track how well the CPU is doing and then allow them to see the CPUs board to make their own guess and continue to track their progress.

Here are some screenshots of different post hit/miss/win/loss views!

![picture](/images/UserPlacement.png)

![picture](/images/UserMiss.png)

![picture](/images/CpuHit.png)

![picture](/images/CpuWin.png)





# GETTING STARTED: https://tshuldberg.github.io/Battleship-JS/
# INSTRUCTIONS: The rules are as follows:
# Game begins when the user clicks a ship to place on the board.  Click which ship you'd like to place then click the start point for the ship.  After that click an adjacent square (Left, Right, Up, or Down) and the ship will auto-populate based on its length.  Then select your next ship to place until all ships are placed.  When you are done with ship placement hit PLAY GAME and the game will start.

# To Play -- Click on any square to fire a shot and be informed of a hit, miss, sink, and win.  After you have fired your shot hit CHANGE TURN and after one half second the computer will fire their shot and you will be able to see the result.  When you are satisfied with your view of the computers turn, hit CHANGE TURN again to rotate back to your turn and fire again.  Repeat the process until one of you is the victor!


NEXT STEPS: There are a few bugs left in the game that need some patching up! Occasionally the CPU will autopopulate and overlap its own ships.
I also want to add sounds and more styling to the game to improve the UI design.  The core drive was getting the functionality correct but CPU guess logic turned out to be a doozy.