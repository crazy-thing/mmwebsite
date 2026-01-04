import React, { useEffect, useState, useRef } from 'react';
import '../styles/ScreenshotViewer.css';
import arrow from '../assets/arrow.svg';

interface ScreenshotViewerProps {
  apiUrl: string;
  uploadsUrl?: string;
  intervalMs?: number;
}

const ScreenshotViewer: React.FC<ScreenshotViewerProps> = ({ apiUrl, uploadsUrl = '', intervalMs = 5000 }) => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setImages(data.screenshots || []);
      } catch (err) {
        console.error('Failed to load screenshots:', err);
      }
    };
    fetchImages();
  }, [apiUrl]);

  useEffect(() => {
    if (images.length > 1) {
      startAutoSlide();
      return stopAutoSlide;
    }
  }, [images, currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      goTo((currentIndex + 1) % images.length);
    }, intervalMs);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goTo = (index: number) => {
    if (index === currentIndex) return;
    stopAutoSlide();
    setPrevIndex(currentIndex);
    setCurrentIndex(index);
  };

  const getImageClass = (index: number): string => {
    if (index === currentIndex) return 'center';
    if (index === prevIndex) {
      return currentIndex > prevIndex ? 'exit-left' : 'exit-right';
    }
    return currentIndex > index ? 'off-left' : 'off-right';
  };

  if (!images.length) return <p>Loading screenshots...</p>;

  return (
    <div className="screenshot-viewer">
      {images.map((img, i) => (
        <img
          key={i}
          src={`${uploadsUrl}/${img}`}
          alt={`Screenshot ${i}`}
          className={`screenshot-viewer-image ${getImageClass(i)}`}
        />
      ))}

      <button
        className="nav-arrow left"
        onClick={() => goTo((currentIndex - 1 + images.length) % images.length)}
      >
        <img src={arrow} alt="Previous" className='nav-arrow-icon' />
      </button>
      <button
        className="nav-arrow right"
        onClick={() => goTo((currentIndex + 1) % images.length)}
      >
        <img src={arrow} alt="Next" className='nav-arrow-icon' style={{ transform: 'rotate(180deg)' }} />
      </button>

      <div className="dots-container">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreenshotViewer;
