import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Square from "./Square";
import EndGame from "./EndGame";
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

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
  const [winCount, setWinCount] = useState({ player1Wins: 0, player2Wins: 0, draws: 0 });
  const [winner, setWinner] = useState(null);

  const updatePlayerStats = async (player1, player2, result) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/players/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1, player2, result }),
      });

      const data = await response.json();
      console.log('Player stats updated successfully', data);
      
      
      if (result === 'win') {
        setWinCount((prev) => ({ ...prev, player1Wins: prev.player1Wins + 1 }));
      } else if (result === 'lose') {
        setWinCount((prev) => ({ ...prev, player2Wins: prev.player2Wins + 1 }));
      } else if (result === 'draw') {
        setWinCount((prev) => ({ ...prev, draws: prev.draws + 1 }));
      }
    } catch (error) {
      console.error('Failed to update player stats', error);
    }
  };

  const isGameOver = useCallback(() => {
    if (!gameEnd) {
      for (let combo of winningCombination) {
        const [a, b, c] = combo;

        if (grid[a] === "X" && grid[b] === "X" && grid[c] === "X") {
          setGameEnd(true);
          setWinner(player1);
          updatePlayerStats(player1, player2, 'win');
          return;
        }

        if (grid[a] === "O" && grid[b] === "O" && grid[c] === "O") {
          setGameEnd(true);
          setWinner(player2);
          updatePlayerStats(player1, player2, 'lose');
          return;
        }
      }

      if (!grid.includes(INITIAL)) {
        setDraw(true);
        setGameEnd(true);
        updatePlayerStats(player1, player2, 'draw');
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
    restartGame();
    Swal.fire({
      title: 'THANK YOU',
      icon: 'success',
      text: 'Play Again!',
    });
    navigate('/');
  };

  useEffect(() => {
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
        {player1}'s [X] WINS: {winCount.player1Wins}
        <br />
        {player2}'s [O] WINS: {winCount.player2Wins}
        <br />
        DRAWS: {winCount.draws}
      </span>

      {gameEnd && (
        <EndGame
          winCount={{ X: winCount.player1Wins, O: winCount.player2Wins }}
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
        END
      </button>
      <Footer />
    </div>
  );
}

export default Tictactoe;
