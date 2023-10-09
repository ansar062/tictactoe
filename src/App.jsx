
import React, { useState, useEffect } from 'react';
import './App.css';
import TicTacToe2 from './components2/tictactoe';

function App() {
  return (
    <div className="bg-gradient-to-r from-purple-500 via-violet-600 to-purple-900 min-h-screen p-[30px]">
      <TicTacToe2 />
    </div>
  );
}

export default App;
