import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import defaultFaces from './faces/default'
import './Die.scss' 

const Die = ({ 
  value, 
  dieSize = 60, 
  animate = true, 
  animationDuration = 500, 
  enableFaces = true, 
  customDieFaces, 
}) => {
  const faces = customDieFaces || defaultFaces
  const [rolling, setRolling] = useState(false)

  useEffect(() => {
    if (animate) {
      setRolling(true)
      setTimeout(() => {
        setRolling(false)
      }, animationDuration)
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
