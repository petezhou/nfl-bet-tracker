import React, { useState, useEffect } from 'react';
import Game from './Game.js'
import './App.css';

function App() {
  const [currentScores, setCurrentScores] = useState(undefined);

  useEffect(() => {
    getAllScores();
    const interval = setInterval(getAllScores, 30 * 1000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getAllScores = () => {
    fetch('/getAllScores').then(res => res.json()).then(data => {
        setCurrentScores(data);
      });
  }

  if (!currentScores) {
    return null;
  } else {
    const scoresList = Object.values(currentScores);

    return (
    <div className="App">
      <h1 className="App-header">NFL Scores </h1>
      <div>
         { scoresList.map((item, index) => (<Game className="Game" key={index} item={JSON.parse(item)}/>)) }
      </div>
    </div>
  );
  }
}

export default App;

