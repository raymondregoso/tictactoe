import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Players() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const savePlayers = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player1, player2 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Players saved successfully!') {
          Swal.fire({
            title: 'Tic Tac Toe',
            icon: 'success',
            text: 'Click OK to Start the Game!',
          });
          navigate('/Tictactoe', { state: { player1, player2 } }); // Pass player names to the Tictactoe page
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Failed to save player names. Please try again.',
          });
        }
      });

    setPlayer1('');
    setPlayer2('');
  };

  // Effect to enable/disable the "Start" button based on input
  useEffect(() => {
    setIsActive(player1 !== '' && player2 !== '');
  }, [player1, player2]);

  return (
    <Row className="my-5 justify-content-center">
      <Col md={4}>
        <div className="players-form-container" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <Form onSubmit={savePlayers}>
            <h1 className="text-center mb-4">Start New Game</h1>
            <Form.Group controlId="player1Name">
              <Form.Control
                type="text"
                placeholder="Enter player 1 name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                style={{ marginBottom: '15px', height: '40px' }}
                required
              />
            </Form.Group>

            <Form.Group controlId="player2Name">
              <Form.Control
                type="text"
                placeholder="Enter player 2 name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                style={{ marginBottom: '15px', height: '40px' }}
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
          </Form>
          <Footer />
        </div>
      </Col>
    </Row>
    
  );
}
