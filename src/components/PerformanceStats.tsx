/**
 * Performance Stats Component
 * Phase 4a: Block 2 - Performance Monitoring Display
 * 
 * Shows real-time FPS, render times, and sync latency
 */

import React, { useState, useEffect } from 'react';
import {
  globalFPSMonitor,
  globalSyncMonitor,
  type PerformanceMetrics,
  type SyncLatencyMetrics,
  formatMs,
  getPerformanceGrade,
} from '../utils/performance';

interface PerformanceStatsProps {
  show: boolean;
  onClose: () => void;
}

export function PerformanceStats({ show, onClose }: PerformanceStatsProps) {
  const [fpsMetrics, setFpsMetrics] = useState<PerformanceMetrics | null>(null);
  const [syncMetrics, setSyncMetrics] = useState<SyncLatencyMetrics | null>(null);

  useEffect(() => {
    if (!show) return;

    // Update metrics every second
    const interval = setInterval(() => {
      setFpsMetrics(globalFPSMonitor.getMetrics());
      setSyncMetrics(globalSyncMonitor.getMetrics());
    }, 1000);

    // Start FPS monitoring
    globalFPSMonitor.start();

    return () => {
      clearInterval(interval);
      globalFPSMonitor.stop();
    };
  }, [show]);

  if (!show) return null;

  const fpsGrade = fpsMetrics ? getPerformanceGrade(fpsMetrics.fps) : { grade: 'N/A', color: '#666' };
  const syncStatus = syncMetrics ? globalSyncMonitor.getStatus() : 'good';

  return (
    <div className="performance-stats-panel">
      <div className="performance-stats-header">
        <h3>📊 Performance Stats</h3>
        <button onClick={onClose} className="close-btn" aria-label="Close">
          ×
        </button>
      </div>

      <div className="performance-stats-content">
        {/* FPS Section */}
        <div className="stats-section">
          <div className="section-title">Frame Rate</div>
          <div className="fps-display" style={{ color: fpsGrade.color }}>
            <span className="fps-value">{fpsMetrics?.fps || 0}</span>
            <span className="fps-label">FPS</span>
          </div>
          <div className="fps-grade" style={{ color: fpsGrade.color }}>
            {fpsGrade.grade}
          </div>
        </div>

        {/* Render Time Section */}
        {fpsMetrics && (
          <div className="stats-section">
            <div className="section-title">Render Time</div>
            <div className="stat-row">
              <span className="stat-label">Avg:</span>
              <span className="stat-value">{formatMs(fpsMetrics.avgRenderTime)}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Max:</span>
              <span className="stat-value">{formatMs(fpsMetrics.maxRenderTime)}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Min:</span>
              <span className="stat-value">{formatMs(fpsMetrics.minRenderTime)}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Dropped:</span>
              <span className="stat-value warn">{fpsMetrics.droppedFrames}</span>
            </div>
          </div>
        )}

        {/* Sync Latency Section */}
        {syncMetrics && syncMetrics.sampleCount > 0 && (
          <div className="stats-section">
            <div className="section-title">
              Sync Latency
              <span className={`status-badge status-${syncStatus}`}>
                {syncStatus}
              </span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Avg:</span>
              <span className="stat-value">{formatMs(syncMetrics.avgLatency)}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Max:</span>
              <span className="stat-value">{formatMs(syncMetrics.maxLatency)}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Min:</span>
              <span className="stat-value">{formatMs(syncMetrics.minLatency)}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Samples:</span>
              <span className="stat-value">{syncMetrics.sampleCount}</span>
            </div>
          </div>
        )}

        {/* Target Benchmarks */}
        <div className="stats-section benchmarks">
          <div className="section-title">Target Benchmarks</div>
          <div className="benchmark-row">
            <span>🎯 FPS:</span>
            <span>60 (Excellent: 55+)</span>
          </div>
          <div className="benchmark-row">
            <span>🎯 Render:</span>
            <span>&lt;16.67ms</span>
          </div>
          <div className="benchmark-row">
            <span>🎯 Sync:</span>
            <span>&lt;100ms</span>
          </div>
        </div>
      </div>

      <style>{`
        .performance-stats-panel {
          position: fixed;
          top: 100px;
          right: 440px;
          width: 280px;
          background: rgba(0, 0, 0, 0.95);
          color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 12px;
          z-index: 99;
          backdrop-filter: blur(10px);
        }

        .performance-stats-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .performance-stats-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .close-btn:hover {
          opacity: 1;
        }

        .performance-stats-content {
          padding: 16px;
          max-height: 500px;
          overflow-y: auto;
        }

        .stats-section {
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stats-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .section-title {
          font-size: 11px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fps-display {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin: 8px 0;
        }

        .fps-value {
          font-size: 32px;
          font-weight: bold;
        }

        .fps-label {
          font-size: 12px;
          opacity: 0.7;
        }

        .fps-grade {
          font-size: 11px;
          font-weight: 600;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
        }

        .stat-label {
          color: #999;
        }

        .stat-value {
          color: #fff;
          font-weight: 500;
        }

        .stat-value.warn {
          color: #f59e0b;
        }

        .status-badge {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-good {
          background: #22c55e;
          color: #000;
        }

        .status-warning {
          background: #f59e0b;
          color: #000;
        }

        .status-critical {
          background: #ef4444;
          color: #fff;
        }

        .benchmarks {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 4px;
          border: none;
        }

        .benchmark-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 11px;
          color: #999;
        }

        @media (max-width: 768px) {
          .performance-stats-panel {
            top: 60px;
            right: 10px;
            width: calc(100vw - 20px);
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
}


