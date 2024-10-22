// This code will create an interactive grid where we can place walls by clicking on the grid and dragging you mouse . Main goal will be to find the shortest path between the starting and the ending node
import React, { useState, useEffect } from 'react'; // Importing React and hooks for state and effects
import './PathfindingVisualizer.css'; // Importing styles for the visualizer
import Node from './Node/Node'; // Importing the Node component (used to represent each cell in the grid)
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra'; // Importing Dijkstra's algorithm functions

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]); // Initializing the grid state (empty array at the start)
  const [mouseIsPressed, setMouseIsPressed] = useState(false); // Tracking if the mouse is pressed (for adding walls)
  const [speed, setSpeed] = useState(10); // Setting the speed for the animation (default is 10)
  const [isRunning, setIsRunning] = useState(false); // Keeping track of whether the algorithm is running

  useEffect(() => {
    const initialGrid = createGrid(); // Create an initial grid when the component loads
    setGrid(initialGrid); // Set the created grid as the state
  }, []); // Empty array means this effect runs only once when the component mounts

  // Function that runs when the mouse is pressed down on a node (for adding/removing walls)
  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col); // Toggle the wall for the clicked node
    setGrid(newGrid); // Update the grid with the new wall status
    setMouseIsPressed(true); // Set the mouse as being pressed
  };

  // Function that runs when the mouse enters a node (for dragging walls)
  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return; // If the mouse isn't pressed, do nothing
    const newGrid = getNewGridWithWallToggled(grid, row, col); // Toggle the wall as you drag the mouse
    setGrid(newGrid); // Update the grid with the new wall status
  };

  // Function to handle mouse up event (when you release the mouse button)
  const handleMouseUp = () => setMouseIsPressed(false); // Set the mouse as not pressed

  // Function to visualize Dijkstra's Algorithm
  const visualizeDijkstra = () => {
    if (isRunning) return; // If the algorithm is already running, do nothing
    setIsRunning(true); // Set the algorithm as running

    const startNode = grid[0][0]; // Define the start node at position (0,0)
    const finishNode = grid[19][49]; // Define the finish node at position (19,49)
    
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode); // Run Dijkstra's algorithm
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode); // Get the nodes that make up the shortest path

    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder); // Animate the algorithm's exploration and shortest path
  };

  // Function to animate the algorithm as it explores nodes
  const animateAlgorithm = (visitedNodes, shortestPathNodes) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => animateShortestPath(shortestPathNodes), speed * i); // After visiting all nodes, animate the shortest path
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i]; // Get the current node
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited'; // Mark the node as visited
      }, speed * i); // Control the animation speed based on the selected speed
    }
  };

  // Function to animate the shortest path
  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]; // Get the current node in the shortest path
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path'; // Mark the node as part of the shortest path
      }, 50 * i); // Delay the animation to visualize the shortest path slowly
    }
    setIsRunning(false); // Mark the algorithm as done
  };

  // Function to clear the grid (reset it)
  const clearGrid = () => {
    if (isRunning) return; // If the algorithm is running, do nothing
    const newGrid = createGrid(); // Create a new empty grid
    setGrid(newGrid); // Reset the grid state
  };

  // Handle speed change from the dropdown
  const handleSpeedChange = (event) => setSpeed(parseInt(event.target.value)); // Update the speed when the user selects a new one

  // JSX to render the visualizer
  return (
    <div>
      <button onClick={visualizeDijkstra} disabled={isRunning}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={clearGrid} disabled={isRunning}>
        Clear Path
      </button>
      <label>
        Speed:
        <select value={speed} onChange={handleSpeedChange}>
          <option value={100}>Slow</option>
          <option value={50}>Medium</option>
          <option value={10}>Fast</option>
        </select>
      </label>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish } = node; // Get the node details
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  onMouseDown={(row, col) => handleMouseDown(row, col)}
                  onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to create the grid (20 rows, 50 columns)
const createGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row)); // Create a node for each cell
    }
    grid.push(currentRow); // Add the row to the grid
  }
  return grid; // Return the complete grid
};

// Function to create a node (cell) in the grid
const createNode = (col, row) => {
  return {
    col, // Column number of the node
    row, // Row number of the node
    isStart: row === 0 && col === 0, // Define the start node (top-left corner)
    isFinish: row === 19 && col === 49, // Define the finish node (bottom-right corner)
    isWall: false, // No walls initially
  };
};

// Function to toggle walls on the grid
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice(); // Copy the grid
  const node = newGrid[row][col]; // Get the node to be toggled
  const newNode = { ...node, isWall: !node.isWall }; // Toggle the wall status
  newGrid[row][col] = newNode; // Update the grid with the new node
  return newGrid; // Return the updated grid
};

export default PathfindingVisualizer; // Export the visualizer component
