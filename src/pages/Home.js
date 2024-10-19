// Dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Footer from '../components/Footer';
import History from '../components/History';

const Home = () => {
  const navigate = useNavigate(); 

  const handleStartNewGame = () => {
    navigate('/players');
  };
  const handleHowToPlay = () => {
    navigate('/HowToPlay');
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
             
            />
          </div>
        </div>

        <div className="button-container">
          <button className="btn-home" onClick={handleStartNewGame}>
            START NEW GAME
          </button>
          <button className="btn-home-how" onClick={handleHowToPlay}>
            HOW TO PLAY
          </button>
        </div>
      </div>  
      <Footer />
    </>
  );
}


export default Home;