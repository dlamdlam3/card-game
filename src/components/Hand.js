import React from 'react';
import CardBack from './CardBack';

const Hand = ({ cards, onSelectCard, disabled, isPlayer }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <div
          key={index}
          className="card"
          onClick={() => !disabled && onSelectCard(index)}
        >
          {isPlayer ? (
            <div className="card-info">
              <div className="name">{card.name}</div>
              <div className="attack">Attack: {card.attack}</div>
            </div>
          ) : (
            <CardBack />
          )}
        </div>
      ))}
    </div>
  );
};

export default Hand;
