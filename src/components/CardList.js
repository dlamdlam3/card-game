import React from 'react';
import Card from './Card';

const CardList = ({ cards }) => {
  return (
    <div className="card-list">
      <h2>All Cards</h2>
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default CardList;
