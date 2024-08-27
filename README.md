# 15 Puzzle

A web-based implementation of the classic 15 Puzzle game, allowing users to play with different grid sizes ranging from 2x2 to 6x6. The game features a move counter, a timer, and a game-over screen upon solving the puzzle.

## Key Features

- **Customizable Grid Size**: The game can be played on a 2x2, 3x3, 4x4, 5x5, or 6x6 grid.
- **Move Counter**: Tracks the number of moves made by the player.
- **Timer**: Displays the elapsed time in minutes, seconds, and milliseconds.
- **Responsive Design**: Adapts to different screen sizes, making it playable on both desktop and mobile devices.

## Algorithms Used

- **Shuffle Algorithm**: Ensures that the puzzle is solvable by counting inversions and checking the position of the empty tile.
- **Inversion Counting**: Used to determine if the shuffled puzzle is solvable based on the number of inversions.
- **Move Validation**: Ensures that tiles that are in the same row or column as the empty cell can be moved.

## How to

1. **Clone the Repository**
   ```bash
   git clone https://github.com/pixelrick420/15puzzle.git
   cd 15puzzle
   
2. **Open the Game**
   - Go to [pixelrick420.github.io/15puzzle](https://pixelrick420.github.io/15puzzle/) in your web browser to start playing the game.

3. **Adjust Grid Size**
   - Use the slider to select the grid size. The puzzle will automatically update to reflect the selected size.

4. **Play the Game**
   - Clicking on a cell that is in the same row or column as the empty cell will move the cells such that the empty cell ends up on the clicked position. The goal is to arrange the tiles in ascending order, with the empty space at the bottom-right corner. There are other end positions too that are left as easter eggs for the player to find.

5. **Win the Game**
   - When the puzzle is solved, a "You won" message will appear on the screen. Clicking on the board again will reset the board for a new game.

## File Structure

- `index.html`: The main HTML file for the game.
- `style.css`: Contains all the styling for the game.
- `script.js`: The JavaScript logic for handling the game mechanics, including shuffling, move handling, and win detection.

## Customization

- **Grid Size Range**: Modify the `min` and `max` values of the range input in `index.html` to change the range of grid sizes.
- **Styling**: Update `style.css` to customize the appearance of the game.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with improvements.
