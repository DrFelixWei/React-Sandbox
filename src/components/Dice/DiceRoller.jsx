import React from 'react';
import Dice  from 'react-dice-roll';

const DiceRoller = () => {
  return (
    <Dice
      size={100}
      rollingTime={1000}
      onRoll={(value) => console.log(value)}
    />
  );
};

export default DiceRoller;
