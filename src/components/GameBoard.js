import React from 'react';
import Card from './Card';

const GameBoard = ({ playerDeck, cpuDeck, playerField, cpuField }) => {
  return (
    <div className="game-board">
      <div className="player-zone">
        <h2>Player</h2>
        <div className="deck">Player Deck: {playerDeck.length}</div>
        <div className="field">Player Field: {playerField && <Card {...playerField} />}</div>
      </div>
      <div className="cpu-zone">
        <h2>CPU</h2>
        <div className="deck">CPU Deck: {cpuDeck.length}</div>
        <div className="field">CPU Field: {cpuField && <Card {...cpuField} />}</div>
      </div>
    </div>
  );
};

export default GameBoard;
