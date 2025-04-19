import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2'
  };

  const arrowClasses = {
    top: 'bottom-[-4px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    right: 'left-[-4px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    bottom: 'top-[-4px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-4px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      if (childRef.current) {
        const rect = childRef.current.getBoundingClientRect();
        setCoords({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={childRef}>{children}</div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 max-w-xs ${positionClasses[position]}`}
        >
          <div className="bg-gray-900 text-white text-sm rounded px-2 py-1 shadow-lg">
            <div
              className={`absolute border-4 border-gray-900 ${arrowClasses[position]}`}
            ></div>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;