import { useState, useEffect } from 'react'
import Die from './Die'
import { Box, ToggleButton, ToggleButtonGroup, Slider } from '@mui/material';

import sfxSingle from './sfx/sfx_dice_felt_single_1.mp3'
import sfxThree from './sfx/sfx_dice_felt_three_1.mp3'
import sfxSix from './sfx/sfx_dice_felt_six_1.mp3'

import chessWhiteLightFaces from './faces/chess/white/light'

const MAX_NUMBER_OF_DICE = 6

function Dice({
  numberOfFaces = 6, 
  defaultDieValue = 6,
  dieSize = 100,
  rowWidth = '400px', 
}) {

  const [numberOfDice, setNumberOfDice] = useState(3)
  const handleNumberOfDiceChange = (event, newValue) => {
    setNumberOfDice(newValue)
  }

  const [isRolling, setIsRolling] = useState(false)
  const [diceValues, setDiceValues] = useState(
    Array(numberOfDice).fill(defaultDieValue) 
  )
  const [rollKey, setRollKey] = useState(0)

  useEffect(() => {
    setDiceValues(Array(numberOfDice).fill(defaultDieValue)) 
  }, [numberOfDice, defaultDieValue])

  useEffect(() => {
    if (!isRolling) {
      calculateTotal()
    }
  }, [diceValues, isRolling])

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
    const terms = diceValues.join(' + ')
    console.log(`${terms} = ${total}`)
    return total
  }

  const handleRoll = () => {
    setIsRolling(true)
    playSFX()
    
    setDiceValues(prevDiceValues => {
      const newValues = prevDiceValues.map(() => Math.floor(Math.random() * numberOfFaces) + 1)
      return newValues
    })

    setRollKey(prevKey => prevKey + 1)

    setIsRolling(false)
  }

  const [customDieFaces, setCustomDieFaces] = useState('default')
  const handleToggleCustomDieFaces = (event, newFace) => {
    setCustomDieFaces(newFace)
  }

  return (
    <>
      <div>Dice</div>
      <br/>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>

        <Slider
          value={numberOfDice}
          min={1}
          max={MAX_NUMBER_OF_DICE}
          step={1}
          onChange={handleNumberOfDiceChange}
          aria-labelledby="number-of-dice-slider"
          sx={{ 
            minWidth: '150px',
            height: 12,
           }}
        />

        <ToggleButtonGroup
          size="small"
          color="primary"
          value={customDieFaces}
          exclusive
          onChange={handleToggleCustomDieFaces}
          aria-label="Toggle Custom Die Faces"
          sx={{backgroundColor: 'lightgray'}}
        >
          <ToggleButton size="small" value="default" disabled={customDieFaces==='default'}>Default</ToggleButton>
          <ToggleButton size="small" value="chess" disabled={customDieFaces==='chess'}>Chess</ToggleButton>
        </ToggleButtonGroup>

      </Box>

      <br/>
      
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: rowWidth, 
          gap: '24px', 
        }}
        onClick={handleRoll}
      >
        {diceValues.map((value, index) => (
          <Die 
            key={`${index}-${rollKey}`}
            value={value} 
            dieSize={dieSize} 
            customDieFaces={customDieFaces === 'chess' ? chessWhiteLightFaces : null}
          />
        ))}
      </div>
    </>
  )
}

export default Dice
