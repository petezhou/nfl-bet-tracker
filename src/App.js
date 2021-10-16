import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap/'
import Game from './game/Game.js'
import CreateBetModal from './mybets/CreateBetModal.js'

function App() {
  const [currentScores, setCurrentScores] = useState([]);

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

  if (currentScores.length == 0) {
    return null;
  } else {
    return (
      <div className="App">
        <Container direction="horizontal">
          <h1 className="header">My Bets</h1>
          <CreateBetModal validGames={currentScores.filter(game => game.gameStatus !== "Final")} />
          <hr />
          <h1 className="header">NFL Scores </h1>
          <Row>
            { currentScores.map((item, index) => (<Game className="Game" key={index} item={item}/>)) }
          </Row>
        </Container>
      </div>
  );
  }
}

export default App;

