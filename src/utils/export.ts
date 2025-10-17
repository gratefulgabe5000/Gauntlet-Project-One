/**
 * Canvas Export Utilities
 *
 * PR8a.5: Export functionality (Phase 2a)
 *
 * Features:
 * - Export canvas as PNG image
 * - Export canvas as SVG vector graphic
 * - Configurable quality and dimensions
 */

import type Konva from 'konva';

export interface ExportOptions {
  /** Export format */
  format: 'png' | 'svg';

  /** Export quality (1-10, only for PNG) */
  quality?: number;

  /** Custom filename (without extension) */
  filename?: string;

  /** Include transparent background */
  transparent?: boolean;

  /** Scale multiplier for high-DPI exports */
  pixelRatio?: number;
}

/**
 * Export canvas as PNG image
 */
export async function exportAsPNG(
  stage: Konva.Stage,
  options: Partial<ExportOptions> = {}
): Promise<void> {
  const {
    filename = 'collabcanvas-export',
    transparent = false,
    pixelRatio = 2, // 2x for high quality
  } = options;

  try {
    // Get PNG data URL from stage
    const dataURL = stage.toDataURL({
      pixelRatio,
      mimeType: 'image/png',
    });

    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('✅ PNG export successful:', filename);
  } catch (error) {
    console.error('❌ PNG export failed:', error);
    throw new Error('Failed to export PNG');
  }
}

/**
 * Export canvas as SVG vector graphic
 */
export async function exportAsSVG(
  stage: Konva.Stage,
  options: Partial<ExportOptions> = {}
): Promise<void> {
  const {
    filename = 'collabcanvas-export',
  } = options;

  try {
    // Get all layers and calculate bounding box of all shapes
    const layers = stage.getLayers();
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Calculate bounding box
    layers.forEach((layer) => {
      layer.getChildren().forEach((node) => {
        const x = node.x();
        const y = node.y();
        const width = (node as any).width?.() || 0;
        const height = (node as any).height?.() || 0;
        const radius = (node as any).radius?.() || 0;

        if (node.getClassName() === 'Circle') {
          minX = Math.min(minX, x - radius);
          minY = Math.min(minY, y - radius);
          maxX = Math.max(maxX, x + radius);
          maxY = Math.max(maxY, y + radius);
        } else {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x + width);
          maxY = Math.max(maxY, y + height);
        }
      });
    });

    // Add padding
    const padding = 20;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = maxX + padding;
    maxY = maxY + padding;

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${contentWidth}" height="${contentHeight}" viewBox="${minX} ${minY} ${contentWidth} ${contentHeight}">
  <title>CollabCanvas Export</title>
  <desc>Exported from CollabCanvas</desc>
`;

    // Add a white background group
    svgContent += `  <g id="background">
    <rect x="${minX}" y="${minY}" width="${contentWidth}" height="${contentHeight}" fill="#ffffff"/>
  </g>
`;

    // Add shapes group
    svgContent += `  <g id="shapes">
`;

    // Convert each shape to SVG
    layers.forEach((layer) => {
      layer.getChildren().forEach((node) => {
        const nodeType = node.getClassName();

        if (nodeType === 'Rect') {
          const rect = node as any;
          svgContent += `    <rect x="${rect.x()}" y="${rect.y()}" width="${rect.width()}" height="${rect.height()}" fill="${rect.fill()}" stroke="${rect.stroke() || 'none'}" stroke-width="${rect.strokeWidth() || 0}"/>\n`;
        } else if (nodeType === 'Circle') {
          const circle = node as any;
          const radius = circle.radius();
          const cx = circle.x();
          const cy = circle.y();
          svgContent += `    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${circle.fill()}" stroke="${circle.stroke() || 'none'}" stroke-width="${circle.strokeWidth() || 0}"/>\n`;
        } else if (nodeType === 'Text') {
          const text = node as any;
          svgContent += `    <text x="${text.x()}" y="${text.y() + text.fontSize()}" font-size="${text.fontSize()}" font-family="${text.fontFamily()}" fill="${text.fill()}">${text.text()}</text>\n`;
        } else if (nodeType === 'Line') {
          const line = node as any;
          const points = line.points();
          if (points.length >= 4) {
            svgContent += `    <line x1="${line.x() + points[0]}" y1="${line.y() + points[1]}" x2="${line.x() + points[2]}" y2="${line.y() + points[3]}" stroke="${line.stroke()}" stroke-width="${line.strokeWidth()}" stroke-linecap="round"/>\n`;
          }
        } else if (nodeType === 'Arrow') {
          const arrow = node as any;
          const points = arrow.points();
          if (points.length >= 4) {
            const x1 = arrow.x() + points[0];
            const y1 = arrow.y() + points[1];
            const x2 = arrow.x() + points[2];
            const y2 = arrow.y() + points[3];

            // Draw arrow line
            svgContent += `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${arrow.stroke()}" stroke-width="${arrow.strokeWidth()}" stroke-linecap="round"/>\n`;

            // Draw arrow head (simplified triangle)
            const pointerLength = arrow.pointerLength() || 10;
            const pointerWidth = arrow.pointerWidth() || 10;
            const angle = Math.atan2(y2 - y1, x2 - x1);

            const arrowPoint1X = x2 - pointerLength * Math.cos(angle - Math.PI / 6);
            const arrowPoint1Y = y2 - pointerLength * Math.sin(angle - Math.PI / 6);
            const arrowPoint2X = x2 - pointerLength * Math.cos(angle + Math.PI / 6);
            const arrowPoint2Y = y2 - pointerLength * Math.sin(angle + Math.PI / 6);

            svgContent += `    <polygon points="${x2},${y2} ${arrowPoint1X},${arrowPoint1Y} ${arrowPoint2X},${arrowPoint2Y}" fill="${arrow.fill()}" stroke="${arrow.stroke()}" stroke-width="1"/>\n`;
          }
        }
      });
    });

    svgContent += `  </g>
</svg>`;

    // Create Blob and download
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `${filename}.svg`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    console.log('✅ SVG export successful:', filename);
  } catch (error) {
    console.error('❌ SVG export failed:', error);
    throw new Error('Failed to export SVG');
  }
}

/**
 * Main export function that handles both formats
 */
export async function exportCanvas(
  stage: Konva.Stage,
  options: ExportOptions
): Promise<void> {
  if (options.format === 'png') {
    return exportAsPNG(stage, options);
  } else if (options.format === 'svg') {
    return exportAsSVG(stage, options);
  } else {
    throw new Error(`Unsupported export format: ${options.format}`);
  }
}
