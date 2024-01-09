import React, { useState, useEffect } from 'react';
import Rock from './icon/Rock2';
import Paper from './icon/Paper';
import Scissors from './icon/Scissors';
import './App.css';

const choices = [
  { id: 1, name: 'rock', component: Rock, losesTo: 2 },
  { id: 2, name: 'paper', component: Paper, losesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, losesTo: 1 }
];

export default function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameState, setGameState] = useState(null); // win, lose, draw

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  //useEffect run as componet get mounted
  useEffect(() => {
    restartGame();
  }, []);

  function restartGame() {
    setGameState(null);
    setUserChoice(null);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  //get the user's choice and set it to state
  function handleUserChoice(choice){
    const chosenChoice = choices.find(c => c.id === choice);
    setUserChoice(chosenChoice);

    //determin the winer
    if (chosenChoice.losesTo === computerChoice.id) {
      // lose
      /*
          Here, dont using setLooses(losses + 1), instead using function way:  
          setLosses(losses => losses + 1);
          Because we need to track the previous one
      */
      setLosses(losses => losses + 1);
      setGameState('lose');
    } else if (computerChoice.losesTo === chosenChoice.id) {
      // win
      setWins(wins => wins + 1);
      setGameState('win');
    } else if (computerChoice.id === chosenChoice.id) {
      // draw
      setGameState('draw');
    }

  }

  function renderComponent(choice) {
    const Component = choice.component; // Paper, Rock, Scissors
    return <Component />;
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'Losse' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button className="rock" onClick={() => handleUserChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleUserChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div
          className={`game-state ${gameState}`}
          onClick={() => restartGame()}
        >
        <div>
          <div className="game-state-content">
            <p>{renderComponent(userChoice)}</p>
            {/* <p>you {gameState}!</p> */}
            {gameState === 'win' && <p>Congrats! You won!</p>}
            {gameState === 'lose' && <p>Sorry! You lost!</p>}
            {gameState === 'draw' && <p>You drew!</p>}

            <p>{renderComponent(computerChoice)}</p>
          </div>

          <button>Play Again</button>
        </div>
      </div>
      )}
    </div>
  );
}