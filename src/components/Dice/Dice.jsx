import { useState } from 'react'
import { Box } from '@mui/material'
import Die from './Die'
import diceSound from './sfx/sfx_dice_felt_single_1.mp3' // Import the MP3 file

function Dice() {
  const NUMBER_OF_DICE = 3 // Example number of dice

  const [diceValues, setDiceValues] = useState(
    Array(NUMBER_OF_DICE).fill(1) // Initial values for dice
  )

  const playSFX = () => {
    const audio = new Audio(diceSound)
    audio.play()
  }

  const handleRoll = () => {
    playSFX()
    // Roll all dice and update their values
    setDiceValues(diceValues.map(() => Math.floor(Math.random() * 6) + 1))
  }

  return (
    <>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        onClick={handleRoll} // Handle roll on click of the container
      >
        {diceValues.map((value, index) => (
          <Die key={index} value={value} />
        ))}
      </Box>



    </>
  )
}

export default Dice
