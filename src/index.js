// This file starts the react app and links to the HTML file . It does by taking the main app component which is in the App and putting inside the div container of Index.html file where the react the appear on the screen 


import React from 'react' //Loading the React to build the App
import ReactDOM  from 'react-dom' // Loading the React Dom to display the app on the Web
import './index.css'; // loading the CSS file for Styling the web page
import App from './App';


// Show the App Components inside the Root div in Index.html
ReactDOM.render(
    <React.StrictMode>
        <App />
        {
            /*This is the main part of the App */
        }
    </React.StrictMode>,
    document.getElementById('root') // Place it int the 'root' area of index.html file
    );