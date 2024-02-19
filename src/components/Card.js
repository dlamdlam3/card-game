import React from 'react';

const Card = ({ card, onClick }) => {
  if (!card || !card.classType) {
    return null;
  }

  return (
    <div className="card" onClick={onClick}>
      <div className="card-info">
        <p>Class: {card.classType}</p>
        <p>Attack: {card.attack}</p>
      </div>
    </div>
  );
};

export default Card;
