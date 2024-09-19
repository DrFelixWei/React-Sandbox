import { useState } from 'react'
import HorizontalCarousel from './HorizontalCarousel'
import VerticalCarousel from './VerticalCarousel'
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
}) {

  const [carouselType, setCarouselType] = useState('horizontal')
  const handleToggleCarouselType = () => {
    setCarouselType((prevType) => (prevType === 'horizontal' ? 'vertical' : 'horizontal'))
  }

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
        />
      )}

      {carouselType === 'vertical' && (
        <VerticalCarousel
          carouselItems={carouselItems}
          enableArrowKeyNavigation={enableArrowKeyNavigation}
        />
      )}
     
    </>
  )
}

export default Carousel
