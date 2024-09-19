import { useEffect, useRef } from 'react'
import './HorizontalCarousel.css'

const DEBOUNCER_INTERVAL = 500 // used to delay the carousel rotation when key is held down

function HorizontalCarousel({
  carouselItems,
  arrowKeyNavigationType,
  sfx,
}) {
  const containerRef = useRef(null)
  const containerCarouselRef = useRef(null)
  const carouselRef = useRef(null)
  const isMouseDown = useRef(false)
  const currentMousePos = useRef(0)
  const lastMousePos = useRef(0)
  const lastMoveTo = useRef(0)
  const moveTo = useRef(0)
  const rotationSpeed = 2

  const tapDisabled = useRef(false)

  const createCarousel = () => {
    const carouselProps = onResize()
    const carouselItems = carouselRef.current.querySelectorAll('.horizontal-carousel-item')
    const length = carouselItems.length
    const degress = 360 / length
    const gap = 20
    const tz = distanceZ(carouselProps.w, length, gap)

    const fov = calculateFov(carouselProps)
    const height = calculateHeight(tz)

    containerRef.current.style.width = `${tz * 2 + gap * length}px`
    containerRef.current.style.height = `${height}px`

    carouselItems.forEach((item, i) => {
      const degressByItem = `${degress * i}deg`
      item.style.setProperty('--rotatey', degressByItem)
      item.style.setProperty('--tz', `${tz}px`)
    })
  }

  const linearInterpolate = (a, b, n) => n * (a - b) + b

  const distanceZ = (widthElement, length, gap) => {
    return widthElement / 2 / Math.tan(Math.PI / length) + gap
  }

  const calculateHeight = (z) => {
    const t = Math.atan((90 * Math.PI) / 180 / 2)
    return t * 2 * z
  }

  const calculateFov = (carouselProps) => {
    const perspective = window
      .getComputedStyle(containerCarouselRef.current)
      .perspective.split('px')[0]

    const length =
      Math.sqrt(carouselProps.w * carouselProps.w) +
      Math.sqrt(carouselProps.h * carouselProps.h)
    return 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI)
  }

  const getPosX = (x) => {
    currentMousePos.current = x
    moveTo.current = currentMousePos.current < lastMousePos.current ? moveTo.current - 2 : moveTo.current + 2

    // Attempted to make carousel rotation bidirectional but it becomes too sensitive to mouse movement
    // moveTo.current += currentMousePos.current - lastMousePos.current 

    lastMousePos.current = currentMousePos.current
  }

  const update = () => {
    lastMoveTo.current = linearInterpolate(moveTo.current, lastMoveTo.current, 0.05)
    carouselRef.current.style.setProperty('--rotatey', `${lastMoveTo.current}deg`)
    requestAnimationFrame(update)
  }

  const onResize = () => {
    const boundingCarousel = containerCarouselRef.current.getBoundingClientRect()
    return {
      w: boundingCarousel.width,
      h: boundingCarousel.height,
    }
  }

  const initEvents = () => {
    const carousel = carouselRef.current

    carousel.addEventListener('mousedown', () => {
      isMouseDown.current = true
      carousel.style.cursor = 'grabbing'
    })
    carousel.addEventListener('mouseup', () => {
      isMouseDown.current = false
      carousel.style.cursor = 'grab'
    })
    containerRef.current.addEventListener('mouseleave', () => (isMouseDown.current = false))

    carousel.addEventListener('mousemove', (e) => isMouseDown.current && getPosX(e.clientX))

    carousel.addEventListener('touchstart', () => {
      isMouseDown.current = true
      carousel.style.cursor = 'grabbing'
    })
    carousel.addEventListener('touchend', () => {
      isMouseDown.current = false
      carousel.style.cursor = 'grab'
    })
    containerRef.current.addEventListener('touchmove', (e) => isMouseDown.current && getPosX(e.touches[0].clientX))

    // allow navigation with keyboard arrows
    if (arrowKeyNavigationType === 'tap' || arrowKeyNavigationType === 'hold') {
      window.addEventListener('keydown', handleKeyPress) 
      window.addEventListener('keyup', handleKeyRelease)
    }

    window.addEventListener('resize', createCarousel)

    update()
    createCarousel()
  }

  const handleKeyPress = (e) => {
    if (arrowKeyNavigationType === 'tap') { 
      if (tapDisabled.current) return
      handleKeyPressTap(e)
    } else {
      handleKeyPressHold(e)
    }
  }

  const handleKeyRelease = () => {
    tapDisabled.current = false
  }

  const handleKeyPressHold = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        moveTo.current -= rotationSpeed
        break
      case 'ArrowRight':
        moveTo.current += rotationSpeed
        break
      default:
        break
    }
    // Update the carousel rotation immediately
    carouselRef.current.style.setProperty('--rotatey', `${moveTo.current}deg`)
  }

  const handleKeyPressTap = (e) => {
    tapDisabled.current = true
    setTimeout(() => {
      tapDisabled.current = false
    }, DEBOUNCER_INTERVAL)

    const key = e.key

    const itemPortion = 360 / carouselItems.length
    let fullRotations = Math.floor(moveTo.current / 360)
    if (moveTo.current < 0 && moveTo.current % 360 !== 0) fullRotations += 1

    let remainder = moveTo.current % 360
    let partialRotations = Math.floor(remainder / itemPortion)
    if (remainder < 0 && remainder % itemPortion !== 0) partialRotations += 1

    let currentItemPos = fullRotations * 360 + partialRotations * itemPortion

    if (key === 'ArrowLeft') {
      moveTo.current = currentItemPos + itemPortion
      sfx?.play()
    } else if (key === 'ArrowRight') {
      moveTo.current = currentItemPos - itemPortion
      sfx?.play()
    }

    carouselRef.current.style.setProperty('--rotatex', `${moveTo.current}deg`)
  }


  useEffect(() => {
    initEvents()
    return () => {
      window.removeEventListener('resize', createCarousel)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [arrowKeyNavigationType, sfx])
  

  const handleCarouselItemDoubleClick = (id) => {
    let newMoveTo = 360 / carouselItems.length * (carouselItems.length - id + 1)
    moveTo.current = newMoveTo
    lastMousePos.current = currentMousePos.current
    sfx?.play()
  }

  useEffect(() => {
    if (arrowKeyNavigationType === 'automatic') {
      const interval = setInterval(() => {
        moveTo.current -= rotationSpeed * 0.5
        carouselRef.current.style.setProperty('--rotatey', `${moveTo.current}deg`)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [arrowKeyNavigationType])

  return (
    <>
      <div className="content">
        <div className="container" ref={containerRef}>
          <div className="container-horizontal-carousel" ref={containerCarouselRef}>
            <div className="horizontal-carousel" ref={carouselRef}>

              {carouselItems.map((item) => (
                <div key={item.id} className="horizontal-carousel-item" onDoubleClick={() => handleCarouselItemDoubleClick(item.id)}>
                  {item.content}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HorizontalCarousel
