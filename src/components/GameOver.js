import React from 'react';

const GameOver = ({ winner, onNewGame }) => {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      <p>Winner: {winner}</p>
      <button onClick={onNewGame}>New Game</button>
    </div>
  );
};

export default GameOver;
