import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import defaultFaces from './faces/default'
import './Die.scss' // Add this line to import the SCSS file

const Die = ({ 
  value, 
  dieSize = 60, 
  animate = true, 
  animationDuration = 500, 
  enableFaces = true, 
  customFaces 
}) => {
  const faces = customFaces || defaultFaces
  const [rolling, setRolling] = useState(false)
  const [faceImage, setFaceImage] = useState(faces[value - 1])

  useEffect(() => {
    if (animate) {
      setRolling(true)
      setTimeout(() => {
        setFaceImage(faces[value - 1])
        setRolling(false)
      }, animationDuration)
    } else {
      setFaceImage(faces[value - 1])
    }
  }, [value, animate, animationDuration, faces])

  return (
    <Box
      className={`die-container ${rolling ? 'rolling' : `face-${value}`}`}
      style={{ width: `${dieSize}px`, height: `${dieSize}px` }}
    >
      <div className="cube" style={{ '--dieSize': `${dieSize}px`, '--animationDuration': `${animationDuration}ms` }}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`face face-${index + 1}`}
            style={{
              backgroundImage: `url(${faces[index]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        ))}
      </div>
    </Box>
  )
}

export default Die
