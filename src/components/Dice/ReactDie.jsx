import React from 'react';
import Dice from 'react-dice-roll';

// Importing images from the faces directory
import face1 from './faces/chess/white/light/bishop.png';
import face2 from './faces/chess/white/light/pawn.png';
import face3 from './faces/chess/white/light/queen.png';
import face4 from './faces/chess/white/light/rook.png';

import diceSound from './sfx/sfx_dice_felt_single_1.mp3' 


const ReactDie = () => {
  const handleRoll = (value) => {
    console.log(value);
  };

  // Array of imported images
  const faces = [face1, face2, face3, face4];

  return (
    <Dice
      size={100}
      rollingTime={500}
      onRoll={handleRoll}
      faces={faces}
      sound={diceSound}
    />
  );
};

export default ReactDie;
