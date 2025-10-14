import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';

/**
 * Canvas Component - Main collaborative canvas workspace
 *
 * MVP Specifications:
 * - Canvas size: 2000x2000px (bounded)
 * - Viewport: Full browser window minus toolbar
 * - Rendering: Konva.js for high-performance canvas operations
 *
 * Current Status: Empty Konva Stage (PR1.5.3)
 * Next Steps: Pan/zoom in PR3, real-time sync in PR4
 */
const Canvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Responsive canvas sizing based on container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    // Initial size calculation
    updateDimensions();

    // Update on window resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-50 overflow-hidden relative"
      style={{ cursor: 'default' }}
    >
      {/* Konva Stage - 2000x2000px canvas space */}
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        className="konva-stage"
      >
        <Layer>
          {/* Canvas background - visual indicator that Konva is working */}
          <Rect
            x={0}
            y={0}
            width={dimensions.width}
            height={dimensions.height}
            fill="#f9fafb"
            listening={false}
          />

          {/* Test rectangle to verify rendering */}
          <Rect
            x={dimensions.width / 2 - 50}
            y={dimensions.height / 2 - 50}
            width={100}
            height={100}
            fill="#cccccc"
            cornerRadius={4}
            listening={false}
          />
        </Layer>
      </Stage>

      {/* Canvas info overlay - for development debugging */}
      <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-md shadow-sm text-xs text-gray-600">
        <div>Canvas: 2000×2000px</div>
        <div>Viewport: {dimensions.width}×{dimensions.height}px</div>
        <div className="text-green-600 font-medium mt-1">✓ Konva.js Active</div>
      </div>
    </div>
  );
};

export default Canvas;
