import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Die from './Die'

import sfxSingle from './sfx/sfx_dice_felt_single_1.mp3'
import sfxThree from './sfx/sfx_dice_felt_three_1.mp3'
import sfxSix from './sfx/sfx_dice_felt_six_1.mp3'

function Dice({
  numberOfDice = 3, 
  numberOfFaces = 6, 
  defaultDieValue = 1,
  dieSize = 100,
  rowWidth = '400px', 
  customDieFaces = false,
}) {

  const [diceValues, setDiceValues] = useState(
    Array(numberOfDice).fill(defaultDieValue) 
  )
  useEffect(() => {
    setDiceValues(Array(numberOfDice).fill(1)) 
    calculateTotal()
  }, [numberOfDice])

  const playSFX = () => {
    const diceSound = numberOfDice === 1
      ? sfxSingle
      : numberOfDice >= 2 && numberOfDice <= 4
      ? sfxThree
      : sfxSix
    const audio = new Audio(diceSound)
    console.log(audio.volume)
    audio.play()
  }
  

  const calculateTotal = () => {
    const total = diceValues.reduce((acc, curr) => acc + curr)
    console.log('Total:', total)
    return total
  }

  const handleRoll = () => {
    playSFX()
    setDiceValues(diceValues.map(() => Math.floor(Math.random() * numberOfFaces) + 1))
    calculateTotal()
  }

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        width="100%"
        onClick={handleRoll}
        sx={{
          maxWidth: rowWidth, 
          gap: 1, 
        }}
        customDieFaces={customDieFaces}
      >
        {diceValues.map((value, index) => (
          <Die 
            key={index} 
            value={value} 
            dieSize={dieSize} 
          />
        ))}
      </Box>
    </>
  )
}

export default Dice
