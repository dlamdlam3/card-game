import React from 'react';

const TurnIndicator = ({ currentPlayer }) => {
  return (
    <div className="turn-indicator">
      <h3>Current Turn: {currentPlayer}</h3>
    </div>
  );
};

export default TurnIndicator;
