/**
 * Export Modal Component
 *
 * PR8a.5: Export functionality (Phase 2a)
 *
 * Features:
 * - Export canvas as PNG or SVG
 * - Configurable export options
 * - Preview and download
 */

import type Konva from 'konva';
import { useState } from 'react';
import { exportCanvas } from '../utils/export';

interface ExportModalProps {
  /** Konva stage reference */
  stage: Konva.Stage | null;

  /** Close modal callback */
  onClose: () => void;

  /** Export success callback */
  onSuccess?: () => void;
}

const ExportModal = ({ stage, onClose, onSuccess }: ExportModalProps) => {
  const [format, setFormat] = useState<'png' | 'svg'>('png');
  const [filename, setFilename] = useState('collabcanvas-export');
  const [pngQuality, setPngQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!stage) {
      setError('Canvas not available');
      return;
    }

    setIsExporting(true);
    setError(null);

    try {
      // Convert quality setting to pixel ratio
      const pixelRatio = format === 'png' ? 
        (pngQuality === 'low' ? 1 : pngQuality === 'medium' ? 2 : 3) : 
        2; // SVG doesn't use pixel ratio

      await exportCanvas(stage, {
        format,
        filename,
        pixelRatio,
      });

      // Success!
      if (onSuccess) {
        onSuccess();
      }

      // Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      console.error('Export error:', err);
      setError(err instanceof Error ? err.message : 'Export failed');
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Export Canvas</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFormat('png')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                format === 'png'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-semibold">PNG</span>
                <span className="text-xs">Raster image</span>
              </div>
            </button>

            <button
              onClick={() => setFormat('svg')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                format === 'svg'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="font-semibold">SVG</span>
                <span className="text-xs">Vector graphic</span>
              </div>
            </button>
          </div>
        </div>

        {/* PNG Quality Selection (only show for PNG) */}
        {format === 'png' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PNG Quality
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setPngQuality('low')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  pngQuality === 'low'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold text-sm">Low</span>
                  <span className="text-xs">1x resolution</span>
                  <span className="text-xs text-gray-500">Smaller file</span>
                </div>
              </button>

              <button
                onClick={() => setPngQuality('medium')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  pngQuality === 'medium'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold text-sm">Medium</span>
                  <span className="text-xs">2x resolution</span>
                  <span className="text-xs text-gray-500">Recommended</span>
                </div>
              </button>

              <button
                onClick={() => setPngQuality('high')}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  pngQuality === 'high'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="font-semibold text-sm">High</span>
                  <span className="text-xs">3x resolution</span>
                  <span className="text-xs text-gray-500">Crisp details</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Filename Input */}
        <div className="mb-4">
          <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-2">
            Filename
          </label>
          <div className="flex items-center gap-2">
            <input
              id="filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="my-canvas"
            />
            <span className="text-gray-500 font-mono">.{format}</span>
          </div>
        </div>

        {/* Format Info */}
        <div className="mb-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {format === 'png' && (
              <>
                <strong>PNG:</strong> High-quality raster image. Best for sharing and viewing. Choose quality level: Low (1x), Medium (2x), or High (3x) resolution.
              </>
            )}
            {format === 'svg' && (
              <>
                <strong>SVG:</strong> Scalable vector graphic. Perfect for editing in design tools like Figma or Illustrator.
              </>
            )}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">❌ {error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || !filename.trim()}
            className={`flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
              isExporting || !filename.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg active:scale-95'
            }`}
          >
            {isExporting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Exporting...
              </span>
            ) : (
              `Export ${format.toUpperCase()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
