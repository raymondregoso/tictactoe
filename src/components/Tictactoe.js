//Dependencies
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Square from "./Square";
import EndGame from "./EndGame";
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

// Winning pattern and condition
const INITIAL = "";
const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Tictactoe() {
  const navigate = useNavigate();
  const location = useLocation();
  const { player1, player2 } = location.state || { player1: "Player 1", player2: "Player 2" };
  
  const [grid, setGrid] = useState(Array(9).fill(INITIAL));
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [draw, setDraw] = useState(false);
  const [currentGameResults, setCurrentGameResults] = useState({ wins: 0, losses: 0, draws: 0 });
  const [winner, setWinner] = useState(null);

  // Fetch previous scores from MongoDB
  const fetchScores = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/players/scores?player1=${player1}&player2=${player2}`);
      const data = await response.json();
      setCurrentGameResults(data || { wins: 0, losses: 0, draws: 0 });
    } catch (error) {
      console.error('Failed to fetch scores', error);
    }
  };

  // Save the game result to MongoDB
  const saveGameResult = async (player1, player2, wins, losses, draws) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/players/results`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1, player2, wins, losses, draws }),
      });

      const data = await response.json();
      console.log('Game results saved successfully', data);
    } catch (error) {
      console.error('Failed to save game results', error);
    }
  };

  const isGameOver = useCallback(() => {
    if (!gameEnd) {
      for (let combo of winningCombination) {
        const [a, b, c] = combo;

        if (grid[a] === "X" && grid[b] === "X" && grid[c] === "X") {
          setGameEnd(true);
          setWinner(player1);
          setCurrentGameResults((prev) => ({ ...prev, wins: prev.wins + 1 })); // Update wins for player1
          return;
        }

        if (grid[a] === "O" && grid[b] === "O" && grid[c] === "O") {
          setGameEnd(true);
          setWinner(player2);
          setCurrentGameResults((prev) => ({ ...prev, losses: prev.losses + 1 })); // Update losses for player2
          return;
        }
      }

      if (!grid.includes(INITIAL)) {
        setDraw(true);
        setGameEnd(true);
        setCurrentGameResults((prev) => ({ ...prev, draws: prev.draws + 1 })); // Update draws
      }
    }
  }, [gameEnd, grid, player1, player2]);

  const restartGame = () => {
    setGrid(Array(9).fill(INITIAL));
    setGameEnd(false);
    setDraw(false);
    setWinner(null);
  };

  const savedRecord = () => {
    saveGameResult(player1, player2, currentGameResults.wins, currentGameResults.losses, currentGameResults.draws);
    restartGame();
    Swal.fire({
      title: 'THANK YOU',
      icon: 'success',
      text: 'Play Again!',
    });
    navigate('/');
  };

  useEffect(() => {
    fetchScores(); 
    isGameOver();
  }, [grid, isGameOver]);

  const handleClick = (id) => {
    if (grid[id] === INITIAL && !gameEnd) {
      setGrid((prevGrid) => prevGrid.map((item, index) => (index === id ? (isPlayerOneTurn ? "X" : "O") : item)));
      setIsPlayerOneTurn((prev) => !prev);
    } 
  };

  return (
    <div className="game-view">
      <span className="win-history">
        {/* Show and counts the wins of each player */}
        {player1}'s [X] WINS: {currentGameResults.wins}
        <br />
        {player2}'s [O] WINS: {currentGameResults.losses}
        <br />
        DRAWS: {currentGameResults.draws}
      </span>

      {gameEnd && (
        <EndGame
          winCount={{ X: currentGameResults.wins, O: currentGameResults.losses }}
          restartGame={restartGame}
          draw={draw}
          savedRecord={savedRecord}
          player1={player1}
          player2={player2}
          winner={winner}
        />
      )}
      <Square clickedArray={grid} handleClick={handleClick} />
      <button className="btn" onClick={savedRecord}>
        STOP
      </button>
      <Footer />
    </div>
  );
}

export default Tictactoe;





