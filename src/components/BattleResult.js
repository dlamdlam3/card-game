import React from 'react';

const BattleResult = ({ playerCard, cpuCard, winner }) => {
  return (
    <div className="battle-result">
      <h2>Battle Result</h2>
      <p>Player Card: {playerCard.name}</p>
      <p>CPU Card: {cpuCard.name}</p>
      <p>Winner: {winner}</p>
    </div>
  );
};

export default BattleResult;
