import React from 'react';

function EndGame({ savedRecord, winCount, restartGame, draw, player1, player2 }) {
  return (
    <div className="end-game-view">
      {!draw && (
        <span className="win-message">
          {winCount.X > winCount.O ? `${player1} WON` : `${player2} WON`}
        </span>
      )}
      {draw && <span className="win-message">DRAW GAME</span>}

      <span className="win-history">
        {player1}'s WINS: {winCount.X}
        <br />
        {player2}'s WINS: {winCount.O}
      </span>

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
