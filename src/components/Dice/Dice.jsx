import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import Die from './Die.tsx'

import sfxSingle from './sfx/sfx_dice_felt_single_1.mp3'
import sfxThree from './sfx/sfx_dice_felt_three_1.mp3'
import sfxSix from './sfx/sfx_dice_felt_six_1.mp3'

import defaultFaces from './faces/default'


function Dice({
  numberOfDice = 3, 
  numberOfFaces = 6, 
  defaultDieValue = 1,
  dieSize = 100,
  rowWidth = '400px', 
  customDieFaces = false,
  animationDuration = 1000,
}) {

  const [isRolling, setIsRolling] = useState(false)
  const [diceValues, setDiceValues] = useState(
    Array(numberOfDice).fill(defaultDieValue) 
  )

  useEffect(() => {
    setDiceValues(Array(numberOfDice).fill(defaultDieValue)) 
  }, [numberOfDice, defaultDieValue])

  useEffect(() => {
    if (!isRolling) {
      calculateTotal()
    }
  }, [diceValues, isRolling])

  const faces = customDieFaces || defaultFaces
  // const [faceImage, setFaceImage] = useState(faces[value - 1])
  // useEffect(() => { 
  //   setFaceImage(faces[value - 1])
  // }, [value])

  const playSFX = () => {
    const diceSound = numberOfDice === 1
      ? sfxSingle
      : numberOfDice >= 2 && numberOfDice <= 4
      ? sfxThree
      : sfxSix
    const audio = new Audio(diceSound)
    audio.play()
  }
  
  const calculateTotal = () => {
    const total = diceValues.reduce((acc, curr) => acc + curr, 0)
    console.log('Total:', total)
    return total
  }

  const handleRoll = () => {
    if (isRolling) return
    setIsRolling(true)
    playSFX()
    setDiceValues(prevDiceValues => {
      const newValues = prevDiceValues.map(() => Math.floor(Math.random() * numberOfFaces) + 1)
      return newValues
    })
    setTimeout(() => {
      setIsRolling(false)
    }, animationDuration)
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
          gap: 2, 
        }}
        customDieFaces={customDieFaces}
      >
        {diceValues.map((value, index) => (

          <Die
            size={dieSize}
            rollingTime={animationDuration}
            triggers={['Enter']}

            // onRoll={handleRoll}
            faces={faces}
            // sound={diceSound}
          />

        ))}
      </Box>

      <br/>

    </>
  )
}

export default Dice
