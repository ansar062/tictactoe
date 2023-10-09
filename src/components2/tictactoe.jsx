import { useState, useEffect } from "react";
import React from "react";

const INITIAL_STATE = {
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onClick }) {
  return (
    <button className="square text-6xl" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

export default function TicTacToe2() {
  const [state, setState] = useState(INITIAL_STATE);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  useEffect(() => {
    if (isSinglePlayer && !state.xIsNext) {
      // Computer's turn
      const emptySquares = state.squares
        .map((value, index) => (!value ? index : null))
        .filter((value) => value !== null);
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const randomMove = emptySquares[randomIndex];
      handleSquareClick(randomMove);
    }
  }, [state, isSinglePlayer]);

  const handleSquareClick = (i) => {
    const squares = state.squares.slice();
    if (state.winner || squares[i]) {
      return;
    }

    squares[i] = state.xIsNext ? "X" : "O";
    const winner = calculateWinner(squares);

    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
      winner: winner,
    });
  };

  const handleTogglePlayers = () => {
    setState(INITIAL_STATE);
    setIsSinglePlayer(!isSinglePlayer);
  };

  const reset = () => {
    setState(INITIAL_STATE);
  };

  const status = state.winner
    ? `Winner: ${state.winner}`
    : `Next player: ${state.xIsNext ? "X" : "O"}`;

  return (
    <div>
      <h1 className="font-fuggles text-6xl font-bold px-[50x] text-white">
        Tic Tac Toe
      </h1>
      <div className="space-y-[30px]">
        <div className="flex justify-center text-black sm:text-white font-fuggles font-extrabold text-4xl">
          {status}
        </div>
        <div className="flex justify-center font-fuggles text-white font-extrabold">
          <Board squares={state.squares} onClick={handleSquareClick} />
        </div>
        <div className="grid sm:flex sm:justify-center sm:items-center">
          <button
            className="grandient_btn text-sm"
            onClick={handleTogglePlayers}
          >
            {isSinglePlayer
              ? "Play against a friend"
              : "Play against compputer"}
          </button>
          <button className="delete_btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
