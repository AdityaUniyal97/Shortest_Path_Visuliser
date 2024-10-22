// This file contains the Node component, which represents each cell in the grid.
import React from 'react'; // Import React
import './Node.css'; // Import the CSS for each node

// Functional component to render each node
const Node = ({ row, col, isStart, isFinish, onMouseDown, onMouseEnter, onMouseUp }) => {
  const extraClassName = isStart
    ? 'node-start'
    : isFinish
    ? 'node-finish'
    : ''; // Determine if the node is start or finish

  return (
    <div
      id={`node-${row}-${col}`} // Assign a unique ID to each node
      className={`node ${extraClassName}`} // Apply appropriate classes based on node type
      onMouseDown={() => onMouseDown(row, col)} // Handle mouse down event
      onMouseEnter={() => onMouseEnter(row, col)} // Handle mouse enter event (for dragging)
      onMouseUp={() => onMouseUp()} // Handle mouse up event
    ></div>
  );
};

export default Node;
