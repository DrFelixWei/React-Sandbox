import { useState, useEffect } from 'react'
import Die from './Die'

import sfxSingle from './sfx/sfx_dice_felt_single_1.mp3'
import sfxThree from './sfx/sfx_dice_felt_three_1.mp3'
import sfxSix from './sfx/sfx_dice_felt_six_1.mp3'

import chessWhiteLightFaces from './faces/chess/white/light'

function Dice({
  numberOfDice = 3, 
  numberOfFaces = 6, 
  defaultDieValue = 1,
  dieSize = 100,
  rowWidth = '400px', 
}) {

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

  return (
    <>
      Dice
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
          />
        ))}
      </div>
    </>
  )
}

export default Dice
