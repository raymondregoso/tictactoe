import React from 'react';
import Tictactoe from './components/Tictactoe';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// pages
import Home from './pages/Home';
import Players from './pages/Players';

const App = () => {
   return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} /> 
          <Route path="/Tictactoe" element={<Tictactoe />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
