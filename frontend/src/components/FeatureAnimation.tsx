import React, { useEffect, useRef, useState } from 'react';
import pdfImage from '../assets/pdf.png';
import docImage from '../assets/doc.png';
import csvImage from '../assets/csv.png';
import pptImage from '../assets/ppt.png';
import jpgImage from '../assets/jpg.png';
import pngImage from '../assets/png.png';

interface FeatureAnimationProps {
  id: string;
  type: 'document-support' | 'data-extraction' | 'integration';
}

const FeatureAnimation: React.FC<FeatureAnimationProps> = ({ id, type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [animating, setAnimating] = useState(true);
  const [translateX, setTranslateX] = useState(0);

  const documentTypes = [
    { name: 'PDF', imagePath: pdfImage },
    { name: 'DOCX', imagePath: docImage },
    { name: 'CSV', imagePath: csvImage },
    { name: 'PPT', imagePath: pptImage },
    { name: 'JPEG', imagePath: jpgImage },
    { name: 'PNG', imagePath: pngImage }
  ];

  // Handle intersection observer to detect when the animation is in viewport
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const currentRef = containerRef.current; // Store ref in a variable to use in cleanup

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      });
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Handle animation loop
  useEffect(() => {
    if (!isInView || !animating) return;

    let animationFrameId: number;
    let singleSetWidth = 0;
    const speed = 1.5;

    // Measure the width of a single set of icons
    if (containerRef.current) {
      const container = containerRef.current.querySelector('.document-icons-horizontal');
      if (container) {
        const icons = container.querySelectorAll('.document-icon-2d');
        if (icons.length >= documentTypes.length) {
          const gap = parseInt(getComputedStyle(container).gap || '0', 10);
          singleSetWidth = Array.from(icons)
            .slice(0, documentTypes.length)
            .reduce((width, icon) => width + icon.clientWidth + gap, 0) - gap;
        }
      }
    }

    if (singleSetWidth === 0) return;

    const animate = () => {
      setTranslateX(prevTranslate => {
        const newTranslate = prevTranslate - speed;
        // Reset position when a full set has scrolled by
        if (newTranslate < -singleSetWidth) {
          return newTranslate + singleSetWidth;
        }
        return newTranslate;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, animating, documentTypes.length]);

  const handleIconHover = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnimating(false); // Stop animation on hover
    const target = event.currentTarget;
    target.style.zIndex = '10';
  };

  const handleIconLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnimating(true);
    const target = event.currentTarget;
    target.style.zIndex = '';
  };

  // Render document support animation
  if (type === 'document-support') {
    return (
      <div className="feature-animation-container" id={id} ref={containerRef}>
        <div 
          className="document-icons-horizontal" 
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {/* Duplicate sets of icons for seamless looping */}
          {[...Array(3)].map((_, setIndex) => (
            documentTypes.map((docType, i) => (
              <div 
                key={`${setIndex}-${docType.name}`}
                className="document-icon-2d"
                data-name={docType.name}
                onMouseOver={handleIconHover}
                onMouseOut={handleIconLeave}
                style={{ '--animation-order': i % documentTypes.length } as React.CSSProperties}
              >
                <img src={docType.imagePath} alt={docType.name} />
              </div>
            ))
          ))}
        </div>
      </div>
    );
  }

  // For other animation types (to be implemented)
  return (
    <div className="feature-animation-container" id={id} ref={containerRef}>
      {/* Placeholder for other animation types */}
      <div className="feature-placeholder">
        {type === 'data-extraction' && <p>Data Extraction Animation</p>}
        {type === 'integration' && <p>Integration Animation</p>}
      </div>
    </div>
  );
};

export default FeatureAnimation; 