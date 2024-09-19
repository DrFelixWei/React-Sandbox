import { useState } from 'react'
import HorizontalCarousel from './HorizontalCarousel'
import VerticalCarousel from './VerticalCarousel'
import sfxFlip from './sfx_card_flip_1.mp3'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Carousel({
  carouselItems = [
    { id: 1, content: <div>1<button onClick={() => alert(`Button 1!`)}>Click Me</button></div> },
    { id: 2, content: <div>2</div> },
    { id: 3, content: <div>3</div> },
    { id: 4, content: <div>4</div> },
    { id: 5, content: <div>5</div> },
    { id: 6, content: <div>6</div> },
  ],
  enableArrowKeyNavigation = true,
  enableSfx = true,
}) {

  const [carouselType, setCarouselType] = useState('horizontal')
  const handleToggleCarouselType = () => {
    setCarouselType((prevType) => (prevType === 'horizontal' ? 'vertical' : 'horizontal'))
  }

  const sfx = enableSfx ? new Audio(sfxFlip) : null

  return (
    <>
      <div>Carousel</div>
      <br/>

      <ToggleButtonGroup
        color="primary"
        value={carouselType}
        exclusive
        onChange={handleToggleCarouselType}
        aria-label="Platform"
        sx={{backgroundColor: 'lightgray'}}
      >
        <ToggleButton value="horizontal">Horizontal</ToggleButton>
        <ToggleButton value="vertical">Vertical</ToggleButton>
      </ToggleButtonGroup>
      

      <br/>

      {carouselType === 'horizontal' && (
        <HorizontalCarousel
          carouselItems={carouselItems}
          enableArrowKeyNavigation={enableArrowKeyNavigation}
          sfx={sfx}
        />
      )}

      {carouselType === 'vertical' && (
        <VerticalCarousel
          carouselItems={carouselItems}
          enableArrowKeyNavigation={enableArrowKeyNavigation}
          sfx={sfx}
        />
      )}
     
    </>
  )
}

export default Carousel
