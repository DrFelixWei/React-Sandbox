import { useEffect, useRef } from 'react';
import './Carousel.css';

function Carousel() {
  const containerRef = useRef(null);
  const containerCarouselRef = useRef(null);
  const carouselRef = useRef(null);
  const isMouseDown = useRef(false);
  const currentMousePos = useRef(0);
  const lastMousePos = useRef(0);
  const lastMoveTo = useRef(0);
  const moveTo = useRef(0);

  const createCarousel = () => {
    const carouselProps = onResize();
    const carouselItems = carouselRef.current.querySelectorAll('.carousel-item');
    const length = carouselItems.length;
    const degress = 360 / length;
    const gap = 20;
    const tz = distanceZ(carouselProps.w, length, gap);

    const fov = calculateFov(carouselProps);
    const height = calculateHeight(tz);

    containerRef.current.style.width = `${tz * 2 + gap * length}px`;
    containerRef.current.style.height = `${height}px`;

    carouselItems.forEach((item, i) => {
      const degressByItem = `${degress * i}deg`;
      item.style.setProperty('--rotatey', degressByItem);
      item.style.setProperty('--tz', `${tz}px`);
    });
  };

  const lerp = (a, b, n) => n * (a - b) + b;

  const distanceZ = (widthElement, length, gap) => {
    return widthElement / 2 / Math.tan(Math.PI / length) + gap;
  };

  const calculateHeight = (z) => {
    const t = Math.atan((90 * Math.PI) / 180 / 2);
    return t * 2 * z;
  };

  const calculateFov = (carouselProps) => {
    const perspective = window
      .getComputedStyle(containerCarouselRef.current)
      .perspective.split('px')[0];

    const length =
      Math.sqrt(carouselProps.w * carouselProps.w) +
      Math.sqrt(carouselProps.h * carouselProps.h);
    return 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  };

  const getPosX = (x) => {
    currentMousePos.current = x;
    moveTo.current = currentMousePos.current < lastMousePos.current ? moveTo.current - 2 : moveTo.current + 2;
    lastMousePos.current = currentMousePos.current;
  };

  const update = () => {
    lastMoveTo.current = lerp(moveTo.current, lastMoveTo.current, 0.05);
    carouselRef.current.style.setProperty('--rotatey', `${lastMoveTo.current}deg`);
    requestAnimationFrame(update);
  };

  const onResize = () => {
    const boundingCarousel = containerCarouselRef.current.getBoundingClientRect();
    return {
      w: boundingCarousel.width,
      h: boundingCarousel.height,
    };
  };

  const initEvents = () => {
    const carousel = carouselRef.current;

    carousel.addEventListener('mousedown', () => {
      isMouseDown.current = true;
      carousel.style.cursor = 'grabbing';
    });
    carousel.addEventListener('mouseup', () => {
      isMouseDown.current = false;
      carousel.style.cursor = 'grab';
    });
    containerRef.current.addEventListener('mouseleave', () => (isMouseDown.current = false));

    carousel.addEventListener('mousemove', (e) => isMouseDown.current && getPosX(e.clientX));

    carousel.addEventListener('touchstart', () => {
      isMouseDown.current = true;
      carousel.style.cursor = 'grabbing';
    });
    carousel.addEventListener('touchend', () => {
      isMouseDown.current = false;
      carousel.style.cursor = 'grab';
    });
    containerRef.current.addEventListener('touchmove', (e) => isMouseDown.current && getPosX(e.touches[0].clientX));

    window.addEventListener('resize', createCarousel);

    update();
    createCarousel();
  };

  useEffect(() => {
    initEvents();
    return () => {
      window.removeEventListener('resize', createCarousel);
    };
  }, []);

  return (
    <>
      <div>Carousel</div>
      <br />
      <div className="content">
        <div className="container" ref={containerRef}>
          <div className="container-carousel" ref={containerCarouselRef}>
            <div className="carousel" ref={carouselRef}>
              <div className="carousel-item"></div>
              <div className="carousel-item"></div>
              <div className="carousel-item"></div>
              <div className="carousel-item"></div>
              <div className="carousel-item"></div>
              <div className="carousel-item"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
