import React, { useState } from "react";
import Board from "./Board";

export default function TicTacToe() {
  const [board, setBoard] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null))
  );

  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isNoWinner, setNoWinner] = useState(false)

  const checkWinner = (board) => {
    const lines = [
      // row
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      // col
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      // diagonal
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[0][1], board[2][0]],
    ];
    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      } else{
        return null;
      }
    }
    return null;
  };

  const makeComputerMove = (board) => {
    const emptyCells = [];

    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (!cell) {
          emptyCells.push([rowIndex, cellIndex]);
        }
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  const handleOnClick = (row, column) => {
    if (board[row][column] || winner) {
        return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === column ? player : cell
      )
    );

    setBoard(updatedPlayerBoard);
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);
    setPlayer("X");


    const hasNullValue = updatedPlayerBoard.some((row) => row.some((cell => cell === null)))
    if(!winner && !hasNullValue){
        setNoWinner(true)
        return;
    }

    if (!newWinner) {
      const [componentRow, componentCol] = makeComputerMove(updatedPlayerBoard);
      const updatedComputerBoard = updatedPlayerBoard.map((newRow, rowIndex) =>
        newRow.map( (cell, cellIndex) => rowIndex === componentRow && cellIndex === componentCol
        
          ? "0"
          : cell)
      );

      setTimeout(() =>{
        setBoard(updatedComputerBoard)
      setWinner(checkWinner(updatedComputerBoard));
      }, 200)
      
    }
  };
  return (
    <div>
      Tic Tac Toe
      <Board board={board} handleClick={handleOnClick} />
      <p>{winner && `${winner === 'X' ? "You Win" : "AI Wins"}`}</p>
      {isNoWinner && <p>No one Wins</p>}
    </div>
  );
}
