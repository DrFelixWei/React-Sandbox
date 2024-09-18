import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import defaultFaces from './faces/default'

const Die = ({ 
  value, 
  dieSize = 60,             // Default size of the die
  animate = true,           // Enable/disable animation
  animationDuration = 500,  // Animation duration in milliseconds
  enableFaces = true,       // Enable/disable custom faces
  customFaces,              
}) => {

  const faces = customFaces || defaultFaces
  const [faceImage, setFaceImage] = useState(faces[value - 1])
  useEffect(() => { 
    setFaceImage(faces[value - 1])
  }, [value])

  // Update baseStyle when faceImage changes
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
    backgroundImage: faceImage ? `url(${faceImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <Box style={baseStyle}>
      {
        !enableFaces && (
          <Typography style={{ fontSize: `${dieSize * 0.5}px` }}>
            {value}
          </Typography>
        )
      }
    </Box>
  )
}

export default Die
