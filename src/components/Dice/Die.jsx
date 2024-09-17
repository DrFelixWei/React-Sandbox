import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'


const Die = ({ 
  value, 
  isRolling,
  dieSize = 60,
  animate = true,
  animationDuration = 500,
}) => {

  const dieStyles = {
    base: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${dieSize}px`,
      height: `${dieSize}px`,
      border: '1px solid black',
      borderRadius: '8px',
      margin: '5px',
      color: 'black',
      backgroundColor: 'white',
      fontSize: `${dieSize*0.5}px`,
      fontWeight: 'bold',
      transition: 'transform 0.3s ease-in-out',
    },
    roll: {
      animation: 'rollAnimation 1s ease-in-out',
    },
  }
  const [style, setStyle] = useState(dieStyles.base)


  const faces = './images/faces/chess/white/light'
  const diceFaces = import.meta.glob('./images/faces/chess/white/light/*.{png,jpeg,jpg,svg}', { eager: true })
  const dieFaces = Object.values(diceFaces)

  useEffect(() => {
    if (isRolling) {
      setStyle((prev) => ({
        ...prev,
        ...dieStyles.roll,
      }))

      const timer = setTimeout(() => {
        setStyle(dieStyles.base)
      }, animationDuration) 

      return () => clearTimeout(timer)
    }
  }, [isRolling])

  return (
    <Box style={style}>
      <Typography>{value}</Typography>
    </Box>
  )
}

export default Die
