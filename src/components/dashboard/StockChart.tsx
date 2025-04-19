import React, { useEffect, useRef, useState } from 'react';

interface StockChartProps {
  data: number[];
  width?: number;
  height?: number;
  lineColor?: string;
  fillColor?: string;
  showTooltip?: boolean;
  showGrid?: boolean;
  showAxis?: boolean;
  animated?: boolean;
}

const StockChart: React.FC<StockChartProps> = ({
  data,
  width = 300,
  height = 100,
  lineColor = '#3b82f6',
  fillColor = 'rgba(59, 130, 246, 0.1)',
  showTooltip = false,
  showGrid = false,
  showAxis = false,
  animated = true
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(width);
  const [tooltipData, setTooltipData] = useState<{ x: number; y: number; value: number } | null>(null);
  const [progress, setProgress] = useState(animated ? 0 : 1);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!animated) return;
    
    let animationFrame: number;
    const startTime = performance.now();
    const duration = 1000; // 1 second animation
    
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [animated, data]);

  // Ensure we have data
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  // Chart dimensions
  const padding = { top: 10, right: 10, bottom: 20, left: 40 };
  const chartWidth = containerWidth - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find min and max values
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const valueRange = maxValue - minValue;

  // Create points
  const points = data.map((value, index) => {
    const x = padding.left + (index / (data.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    return { x, y, value };
  });

  // Create visible points based on animation progress
  const visiblePoints = points.slice(0, Math.floor(points.length * progress));

  // Create path
  const path = visiblePoints.map((point, i) => {
    return i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`;
  }).join(' ');

  // Create area path (for fill)
  const areaPath = visiblePoints.length > 0 
    ? `${path} L ${visiblePoints[visiblePoints.length - 1].x},${padding.top + chartHeight} L ${visiblePoints[0].x},${padding.top + chartHeight} Z`
    : '';

  // Handle mouse movement for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!showTooltip || svgRef.current === null) return;
    
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    
    // Find closest point
    let closestPoint = points[0];
    let minDistance = Math.abs(mouseX - closestPoint.x);
    
    for (let i = 1; i < points.length; i++) {
      const distance = Math.abs(mouseX - points[i].x);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = points[i];
      }
    }
    
    setTooltipData(closestPoint);
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        className="overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid lines */}
        {showGrid && (
          <>
            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding.top + chartHeight * (1 - ratio);
              return (
                <line
                  key={`grid-h-${ratio}`}
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartWidth}
                  y2={y}
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              );
            })}
            
            {/* Vertical grid lines */}
            {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0 || i === data.length - 1).map((_, i) => {
              const x = padding.left + (i / 4) * chartWidth;
              return (
                <line
                  key={`grid-v-${i}`}
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + chartHeight}
                  stroke="#374151"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              );
            })}
          </>
        )}
        
        {/* Axes */}
        {showAxis && (
          <>
            {/* X-axis */}
            <line
              x1={padding.left}
              y1={padding.top + chartHeight}
              x2={padding.left + chartWidth}
              y2={padding.top + chartHeight}
              stroke="#4B5563"
              strokeWidth="1"
            />
            
            {/* Y-axis */}
            <line
              x1={padding.left}
              y1={padding.top}
              x2={padding.left}
              y2={padding.top + chartHeight}
              stroke="#4B5563"
              strokeWidth="1"
            />
            
            {/* Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = padding.top + chartHeight * (1 - ratio);
              const value = minValue + valueRange * ratio;
              return (
                <text
                  key={`y-label-${ratio}`}
                  x={padding.left - 5}
                  y={y + 4}
                  fontSize="10"
                  textAnchor="end"
                  fill="#9CA3AF"
                >
                  {value.toFixed(2)}
                </text>
              );
            })}
          </>
        )}
        
        {/* Area fill */}
        <path
          d={areaPath}
          fill={fillColor}
          opacity="0.8"
        />
        
        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Tooltip indicator */}
        {tooltipData && (
          <>
            <circle
              cx={tooltipData.x}
              cy={tooltipData.y}
              r="4"
              fill={lineColor}
            />
            <line
              x1={tooltipData.x}
              y1={padding.top}
              x2={tooltipData.x}
              y2={padding.top + chartHeight}
              stroke="#4B5563"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            <rect
              x={tooltipData.x - 40}
              y={padding.top - 30}
              width="80"
              height="20"
              rx="4"
              fill="#1F2937"
              opacity="0.9"
            />
            <text
              x={tooltipData.x}
              y={padding.top - 16}
              fontSize="11"
              textAnchor="middle"
              fill="white"
            >
              {tooltipData.value.toFixed(2)}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default StockChart;