import React, { useEffect, useState } from 'react';

const History = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/players`);
        if (!response.ok) {
          throw new Error('Failed to fetch game history');
        }
        const data = await response.json();

        // Sort data from newest to oldest based on the 'date' field
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setGameHistory(sortedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Loading game history...</p>;
  }

  if (error) {
    return <p>Error fetching game history: {error}</p>;
  }

  return (
    <div className="game-history">
      <h2>Game History</h2>
      {gameHistory.length === 0 ? (
        <p>No games have been played yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Draws</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.slice(0, 10).map((game, index) => (
              <tr key={index}>
                <td>{game.player1}</td>
                <td>{game.player2}</td>
                <td>{game.wins}</td>
                <td>{game.losses}</td>
                <td>{game.draws}</td>
                <td>{new Date(game.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
