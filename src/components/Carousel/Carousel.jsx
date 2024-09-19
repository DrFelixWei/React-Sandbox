import { useState } from 'react'
import HorizontalCarousel from './HorizontalCarousel'
import VerticalCarousel from './VerticalCarousel'
import sfxFlip from './sfx_card_flip_1.mp3'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

function Carousel({
  carouselItems = [
    { id: 1, content: <div>1<button onClick={() => alert(`Button 1!`)}>Click Me</button></div> },
    { id: 2, content: <div>2</div> },
    { id: 3, content: <div>3</div> },
    { id: 4, content: <div>4</div> },
    { id: 5, content: <div>5</div> },
    { id: 6, content: <div>6</div> },
  ],
  autospin = false, // future TODO
}) {

  const [carouselType, setCarouselType] = useState('horizontal')
  const handleToggleCarouselType = (event, newType) => {
    if (newType !== null) {
      setCarouselType(newType)
    }
  }

  const possibleArrowKeyNavigationTypes = ['tap', 'continuous']
  const [arrowKeyNavigationType, setArrowKeyNavigationType] = useState('tap') 
  const handleToggleArrowKeyNavigationType = (event, newType) => {
    if (newType !== null) {
      setArrowKeyNavigationType(newType)
    }
  }

  const [enableSfx, setEnableSfx] = useState(true)
  const sfx = enableSfx ? new Audio(sfxFlip) : null
  const handleToggleSfx = () => {
    setEnableSfx((prev) => !prev)
  }

  return (
    <>
      <div>Carousel</div>
      <br/>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>

        <ToggleButtonGroup
          size="small"
          color="primary"
          value={carouselType}
          exclusive
          onChange={handleToggleCarouselType}
          aria-label="Carousel Type"
          sx={{backgroundColor: 'lightgray'}}
        >
          <ToggleButton size="small" value="horizontal">Horizontal</ToggleButton>
          <ToggleButton size="small" value="vertical">Vertical</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          size="small"
          color="primary"
          value={arrowKeyNavigationType}
          exclusive
          onChange={handleToggleArrowKeyNavigationType}
          aria-label="Arrow Key Navigation"
          sx={{backgroundColor: 'lightgray'}}
        >
          <ToggleButton size="small" value="tap">Tap</ToggleButton>
          <ToggleButton size="small" value="continuous">Continuous</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButton
          size="small"
          color="primary"
          value={enableSfx}
          onClick={handleToggleSfx}
          aria-label="Enable Sound"
          sx={{backgroundColor: 'lightgray'}}
        >
          {enableSfx ? 'Disable Sound' : 'Enable Sound'}
        </ToggleButton>

      </Box>

      <br/>

      {carouselType === 'horizontal' && (
        <HorizontalCarousel
          carouselItems={carouselItems}
          arrowKeyNavigationType={arrowKeyNavigationType}
          sfx={sfx}
        />
      )}

      {carouselType === 'vertical' && (
        <VerticalCarousel
          carouselItems={carouselItems}
          arrowKeyNavigationType={arrowKeyNavigationType}
          sfx={sfx}
        />
      )}
     
    </>
  )
}

export default Carousel
