import React from 'react';

function Raffle({ raffle }) {
  return (
    <div>
      <h2>{raffle.name}</h2>
      <p>{raffle.region}</p>
      <p>{raffle.type}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default Raffle;
