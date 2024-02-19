import React from 'react';

const PlayerInfo = ({ name, health }) => {
  return (
    <div className="player-info">
      <h3>Player: {name}</h3>
      <p>Health: {health}</p>
    </div>
  );
};

export default PlayerInfo;
