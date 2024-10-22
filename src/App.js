// This is the main starting point of the React app. It will display the PathfindingVisualizer component, which handles the logic of the algorithm.

import React from 'react'; // Loading React to build the app
import './App.css'; // Loading the CSS file for the app
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer'; // Loading the Pathfinding Visualizer component

// Main App component
function App() {
    return (
        <div className="App">
            {/* Display the Pathfinding Visualizer component */}
            <PathfindingVisualizer />
            {/* This renders the Pathfinding Visualizer inside the App */}
        </div>
    );
}

export default App; // Exporting the App component so it can be used elsewhere
