import React, { useState, useEffect } from 'react'
import defaultFaces from './faces/default'
import './Die.css'  
// import './Die.scss'  

const Die = ({ 
  value, 
  isRolling,
  dieSize = 60,               // Default size of the die
  animate = true,             // Enable/disable animation
  animationDuration = 1000,   // Animation duration in milliseconds
  enableFaces = true,         // Enable/disable custom faces
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
      // <button disabled={isRolling} style={buttonStyles} className={`_space3d ${valueClassMap[value]} ${rolling && 'rolling'}`}>
      //       <div className="_3dbox">
      //           <div {...faceArray[0]} />
      //           <div {...faceArray[1]} />
      //           <div {...faceArray[2]} />
      //           <div {...faceArray[3]} />
      //           <div {...faceArray[4]} />
      //           <div {...faceArray[5]} />
      //       </div>
      //   </button>
    
    <div className={`die-container ${animate && isRolling && 'rolling'}`} style={baseStyle}>
      <div className="die">
        {
          !enableFaces && (
            <div style={{ fontSize: `${dieSize * 0.5}px` }}>
              {value}
            </div>
          )
        }
      </div>
    </div>




  )
}

export default Die
