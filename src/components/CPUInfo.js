import React from 'react';

const CPUInfo = ({ name, health }) => {
  return (
    <div className="cpu-info">
      <h3>CPU: {name}</h3>
      <p>Health: {health}</p>
    </div>
  );
};

export default CPUInfo;
