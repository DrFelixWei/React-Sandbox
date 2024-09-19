import { useEffect, useRef } from 'react';
import './Carousel.css';

function Carousel({
  carouselItems = [
    { id: 1, content: <div>1</div> },
    { id: 2, content: <div>2</div> },
    { id: 3, content: <div>3</div> },
    { id: 4, content: <div>4</div> },
    { id: 5, content: <div>5</div> },
    { id: 6, content: <div>6</div> },
  ],
}) {

  const containerRef = useRef(null);
  const containerCarouselRef = useRef(null);
  const carouselRef = useRef(null);
  const isMouseDown = useRef(false);
  const currentMousePos = useRef(0);
  const lastMousePos = useRef(0);
  const lastMoveTo = useRef(0);
  const moveTo = useRef(0);
  const rotationStep = useRef(0); // To track rotation step for snapping

  const createCarousel = () => {
    const carouselProps = onResize();
    const carouselItems = carouselRef.current.querySelectorAll('.carousel-item');
    const length = carouselItems.length;
    const degrees = 360 / length;
    const gap = 20;
    const tz = distanceZ(carouselProps.w, length, gap);

    const fov = calculateFov(carouselProps);
    const height = calculateHeight(tz);

    containerRef.current.style.width = `${tz * 2 + gap * length}px`;
    containerRef.current.style.height = `${height}px`;

    carouselItems.forEach((item, i) => {
      const degreesByItem = `${degrees * i}deg`;
      item.style.setProperty('--rotatey', degreesByItem);
      item.style.setProperty('--tz', `${tz}px`);
      // Add double-click event listener to each item
      item.addEventListener('dblclick', () => snapToCenter(degrees * i));
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
    moveTo.current += (currentMousePos.current - lastMousePos.current) * 0.2;
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

  const snapToCenter = (targetAngle) => {
    // Calculate the difference between the target angle and the current angle
    const currentAngle = lastMoveTo.current % 360;
    const angleDiff = targetAngle - currentAngle;
    const halfTurn = Math.sign(angleDiff) * 180; // Adjusting to rotate in the shortest direction

    // Update moveTo to snap to the center of the clicked item
    moveTo.current += angleDiff;
    rotationStep.current = angleDiff; // Store the rotation step for smooth snapping
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

  useEffect(() => {
    // Smooth snapping effect
    if (rotationStep.current) {
      const snapUpdate = () => {
        lastMoveTo.current = lerp(lastMoveTo.current, moveTo.current, 0.1);
        carouselRef.current.style.setProperty('--rotatey', `${lastMoveTo.current}deg`);

        if (Math.abs(lastMoveTo.current - moveTo.current) > 0.1) {
          requestAnimationFrame(snapUpdate);
        } else {
          rotationStep.current = 0; // Reset the rotation step when snapping is complete
        }
      };

      snapUpdate();
    }
  }, [moveTo.current]);

  return (
    <>
      <div>Carousel</div>
      <br />
      <div className="content">
        <div className="container" ref={containerRef}>
          <div className="container-carousel" ref={containerCarouselRef}>
            <div className="carousel" ref={carouselRef}>

              {carouselItems.map((panel) => (
                <div key={panel.id} className="carousel-item">
                  {panel.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
