import React from 'react';

function EndGame({ savedRecord, winCount, restartGame, draw, player1, player2, winner }) {
  return (
    <div className="end-game-view">
      {/* Display winner or draw message */}
      {!draw && (
        <span className="win-message">
          {winner ? `${winner} WON` : "ERROR: No winner!"} 
        </span>
      )}
      {draw && <span className="win-message">DRAW GAME</span>}

      {/* Display win history */}
      <span className="win-history">
        {player1}'s [X] WINS: {winCount.X}
        <br />
        {player2}'s [O] WINS: {winCount.O}
      </span>

      {/* Buttons to restart or stop the game */}
      <button className="btn" onClick={restartGame}>
        CONTINUE
      </button>
      <button className="btn" onClick={savedRecord}>
        STOP
      </button>
    </div>
  );
}

export default EndGame;
