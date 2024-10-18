// Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Footer from '../components/Footer';
import History from '../components/History';

export default function Home() {
  const navigate = useNavigate(); 

  const handleStartNewGame = () => {
    navigate('/players');
  };

  return (
    <>
      <div className="home-container">
        <h1>Tic-Tac-Toe</h1>

        {/* Flex container for history and image */}
        <div className="content-container">
          <div className="history-section">
            <History />
          </div>
          <div className="image-section">
            <img
              src="https://i.postimg.cc/2yqHxPjr/tictactoe.png"
              alt="Tic Tac Toe Game"
              width="380"
              height="266"
            />
          </div>
        </div>

        <div className="button-container">
          <button className="btn-home" onClick={handleStartNewGame}>
            START NEW GAME
          </button>
        </div>
      </div>  
      <Footer />
    </>
  );
}
