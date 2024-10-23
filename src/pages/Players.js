// Dependencies
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Players = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // Enable the start button condition
  useEffect(() => {
    setIsActive(player1 !== '' && player2 !== '');
  }, [player1, player2]);

  // Function to start the game
  const handleStartGame = (e) => {
    e.preventDefault();
    // Navigate to the Tictactoe component with player names
    navigate('/Tictactoe', { state: { player1, player2 } });
  };

  // Function to go back to the home page
  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <Row className="my-5 justify-content-center">
      <Col md={4}>
        <div className="players-form-container" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <Form onSubmit={handleStartGame}>
            <h1 className="text-center mb-4">Enter Your Name</h1>
            <Form.Group controlId="player1Name">
              <Form.Control
                type="text"
                placeholder="  Enter player 1 name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                style={{ marginBottom: '15px', height: '40px', borderRadius: '20px', paddingLeft: '10px', }}
                required
              />
            </Form.Group>

            <Form.Group controlId="player2Name">
              <Form.Control
                type="text"
                placeholder="  Enter player 2 name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                style={{ marginBottom: '15px', height: '40px', borderRadius: '20px', paddingLeft: '10px', }}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              id="startBtn"
              disabled={!isActive}
            >
              Start Game
            </Button>
            <Button
              variant="primary"
              type="button" 
              id="backBtn"
              onClick={handleBackToHome} 
            >
              Back to Home
            </Button>
          </Form>
          <Footer />
        </div>
      </Col>
    </Row>
  );
}

export default Players;
