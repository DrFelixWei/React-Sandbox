import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

const dieStyles = {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    border: '1px solid black',
    borderRadius: '8px',
    margin: '5px',
    backgroundColor: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease-in-out',
  },
  roll: {
    animation: 'rollAnimation 1s ease-in-out',
  },
}


const Die = ({ value, isRolling }) => {
  const [style, setStyle] = useState(dieStyles.base)

  const faces = './images/faces/chess/white/light'
  const diceFaces = import.meta.glob('./images/faces/chess/white/light/*.{png,jpeg,jpg,svg}', { eager: true })
  const dieFaces = Object.values(diceFaces) // Extract image paths

  useEffect(() => {
    if (isRolling) {
      setStyle((prev) => ({
        ...prev,
        ...dieStyles.roll,
      }))

      const timer = setTimeout(() => {
        setStyle(dieStyles.base)
      }, 1000) // Match this duration with your animation duration

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
