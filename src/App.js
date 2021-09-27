import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentScores, setCurrentScores] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    })
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Interval triggered");
      fetch('/getAllScores').then(res => res.json()).then(data => {
        setCurrentScores(JSON.parse(data.DAL));
      });
    }, 30 * 1000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  console.log(currentScores);

  return (
    <div className="App">
      <header className="App-header">
        <p>The current time is {currentTime}</p>
      </header>
    </div>
  );
}

export default App;
