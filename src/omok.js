import React, { useState } from 'react';

const checkHorizontalWin = (board, row, col) => {
  const currentPlayer = board[row][col];
  let count = 1;

  // 왼쪽으로 탐색
  for (let i = col - 1; i >= 0 && board[row][i] === currentPlayer; i--) {
    count++;
  }

  // 오른쪽으로 탐색
  for (let i = col + 1; i < board[row].length && board[row][i] === currentPlayer; i++) {
    count++;
  }

  return count >= 5;
};

const checkVerticalWin = (board, row, col) => {
  const currentPlayer = board[row][col];
  let count = 1;

  // 위쪽으로 탐색
  for (let i = row - 1; i >= 0 && board[i][col] === currentPlayer; i--) {
    count++;
  }

  // 아래쪽으로 탐색
  for (let i = row + 1; i < board.length && board[i][col] === currentPlayer; i++) {
    count++;
  }

  return count >= 5;
};

const checkDiagonalWin = (board, row, col) => {
  const currentPlayer = board[row][col];
  let count = 1;

  // 좌상단에서 우하단 대각선 탐색
  for (let i = 1; row - i >= 0 && col - i >= 0 && board[row - i][col - i] === currentPlayer; i++) {
    count++;
  }

  for (let i = 1; row + i < board.length && col + i < board[row].length && board[row + i][col + i] === currentPlayer; i++) {
    count++;
  }

  if (count >= 5) {
    return true;
  }

  count = 1;

  // 우상단에서 좌하단 대각선 탐색
  for (let i = 1; row - i >= 0 && col + i < board[row].length && board[row - i][col + i] === currentPlayer; i++) {
    count++;
  }

  for (let i = 1; row + i < board.length && col - i >= 0 && board[row + i][col - i] === currentPlayer; i++) {
    count++;
  }

  return count >= 5;
};


const OmokBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 19 }, () => Array(19).fill(null)));
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row, col) => {
    if (gameOver || board[row][col] !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[row][col] = 'circle';
    setBoard(newBoard);

    if (checkHorizontalWin(newBoard, row, col) || checkVerticalWin(newBoard, row, col) || checkDiagonalWin(newBoard, row, col)) {
      setGameOver(true);
    }
  };

  return (
    <div className="omok-board">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              className="cell"
              key={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === 'circle' && <div className="circle" />}
            </div>
          ))}
        </div>
      ))}
      {gameOver && <div>게임 끝!</div>}
    </div>
  );
};

export default OmokBoard;
