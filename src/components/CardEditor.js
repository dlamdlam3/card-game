import React, { useState } from 'react';

const CardEditor = ({ card, onSave }) => {
  const [name, setName] = useState(card.name);
  const [classType, setClassType] = useState(card.classType);
  const [attack, setAttack] = useState(card.attack);

  const handleSave = () => {
    onSave({ name, classType, attack });
  };

  return (
    <div className="card-editor">
      <h2>Edit Card</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" value={classType} onChange={(e) => setClassType(e.target.value)} />
      <input type="number" value={attack} onChange={(e) => setAttack(parseInt(e.target.value))} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default CardEditor;
