import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

const Die = ({ 
  value, 
  dieSize = 60,             // Default size of the die
  animate = true,           // Enable/disable animation
  animationDuration = 500,  // Animation duration in milliseconds
}) => {

  const baseStyle = {
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
    fontWeight: 'bold',
    transition: `transform ${animationDuration}ms ease-in-out`,
  }
  const rollStyle = { 

  } 
  // Animation effect
  const [style, setStyle] = useState(baseStyle)
  useEffect(() => {
    if (animate) {
    }
  }, [])

  return (
    <Box style={style}>
      <Typography style={{ fontSize: `${dieSize * 0.5}px` }}>
        {value}
      </Typography>
    </Box>
  )
}

export default Die


 // const faces = './images/faces/chess/white/light'
  // const diceFaces = import.meta.glob('./images/faces/chess/white/light/*.{png,jpeg,jpg,svg}', { eager: true })
  // const dieFaces = Object.values(diceFaces)