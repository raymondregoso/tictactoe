import React from 'react';
import { useNavigate } from 'react-router-dom';

const HowToPlay = () => {
  const navigate = useNavigate(); 

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="how-to-play">
      <h2>How to Play Tic Tac Toe</h2>
      <p>
        Tic Tac Toe is a simple two-player game where players take turns marking a square in a 3x3 grid. 
        One player uses "X" and the other uses "O". The objective is to be the first to get three of your marks in a row.
      </p>
      <h3>Game Rules:</h3>
      <ul>
        <li>Players take turns placing their marks (X or O) on the grid.</li>
        <li>A player wins by placing three of their marks in a horizontal, vertical, or diagonal line.</li>
        <li>If all squares are filled and no player has three in a row, the game is a draw.</li>
        <li>The game can be played in multiple rounds, and scores can be tracked.</li>
      </ul>
      <h3>Instructions:</h3>
      <ol>
        <li>Start a new game by selecting player names.</li>
        <li>Take turns clicking on the squares to place your mark.</li>
        <li>Watch for three in a row to win or wait for a draw.</li>
        <li>After the game ends, you can restart or view your scores.</li>
      </ol>
      <button onClick={handleClose} className="btn">Close</button>
    </div>
  );
};

export default HowToPlay;
