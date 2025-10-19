/**
 * Performance Monitoring Utilities
 * Phase 4a: Block 2 - Performance Monitoring
 * 
 * Provides FPS tracking, render time monitoring, and performance metrics
 */

/**
 * Debounce Utility
 * Phase 4a: Quick Win #4 - Debounced position updates
 * 
 * Delays function execution until after specified wait time has elapsed since last call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * Performance Metrics Interface
 */
export interface PerformanceMetrics {
  fps: number;
  avgRenderTime: number;
  maxRenderTime: number;
  minRenderTime: number;
  frameCount: number;
  droppedFrames: number;
  lastUpdateTime: number;
}

/**
 * Sync Latency Metrics
 */
export interface SyncLatencyMetrics {
  avgLatency: number;
  maxLatency: number;
  minLatency: number;
  sampleCount: number;
  lastSyncTime: number;
}

/**
 * FPS Monitor Class
 * Tracks frame rate and render performance in real-time
 */
export class FPSMonitor {
  private frameCount: number = 0;
  private lastFrameTime: number = performance.now();
  private lastFpsUpdateTime: number = performance.now();
  private fps: number = 0;
  private renderTimes: number[] = [];
  private maxSamples: number = 60; // Keep last 60 frames
  private animationFrameId: number | null = null;
  private onUpdate?: (metrics: PerformanceMetrics) => void;
  private isRunning: boolean = false;

  constructor(onUpdate?: (metrics: PerformanceMetrics) => void) {
    this.onUpdate = onUpdate;
  }

  /**
   * Start monitoring FPS
   */
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    const now = performance.now();
    this.lastFrameTime = now;
    this.lastFpsUpdateTime = now;
    this.frameCount = 0;
    this.renderTimes = [];
    
    this.tick();
  }

  /**
   * Stop monitoring FPS
   */
  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Record a frame render time
   */
  recordFrame(renderTime: number): void {
    this.renderTimes.push(renderTime);
    
    // Keep only last N samples
    if (this.renderTimes.length > this.maxSamples) {
      this.renderTimes.shift();
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const avgRenderTime = this.renderTimes.length > 0
      ? this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length
      : 0;

    const maxRenderTime = this.renderTimes.length > 0
      ? Math.max(...this.renderTimes)
      : 0;

    const minRenderTime = this.renderTimes.length > 0
      ? Math.min(...this.renderTimes)
      : 0;

    // Count dropped frames (> 16.67ms = below 60fps)
    const droppedFrames = this.renderTimes.filter(t => t > 16.67).length;

    return {
      fps: this.fps,
      avgRenderTime,
      maxRenderTime,
      minRenderTime,
      frameCount: this.frameCount,
      droppedFrames,
      lastUpdateTime: this.lastFpsUpdateTime,
    };
  }

  /**
   * Internal tick function for FPS calculation
   */
  private tick = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    
    // Calculate time since last frame
    const frameTime = now - this.lastFrameTime;
    this.lastFrameTime = now;
    
    this.frameCount++;
    this.recordFrame(frameTime);

    // Update FPS every second
    const elapsed = now - this.lastFpsUpdateTime;
    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastFpsUpdateTime = now;

      // Call update callback
      if (this.onUpdate) {
        this.onUpdate(this.getMetrics());
      }
    }

    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  /**
   * Reset all metrics
   */
  reset(): void {
    this.frameCount = 0;
    this.fps = 0;
    this.renderTimes = [];
    const now = performance.now();
    this.lastFrameTime = now;
    this.lastFpsUpdateTime = now;
  }
}

/**
 * Sync Latency Monitor
 * Tracks Firestore sync latency for real-time collaboration
 */
export class SyncLatencyMonitor {
  private latencies: number[] = [];
  private maxSamples: number = 50; // Keep last 50 syncs
  private syncStartTimes: Map<string, number> = new Map();

  /**
   * Mark the start of a sync operation
   */
  startSync(operationId: string): void {
    this.syncStartTimes.set(operationId, performance.now());
  }

  /**
   * Mark the end of a sync operation and record latency
   */
  endSync(operationId: string): number | null {
    const startTime = this.syncStartTimes.get(operationId);
    
    if (!startTime) {
      console.warn(`No start time found for operation: ${operationId}`);
      return null;
    }

    const latency = performance.now() - startTime;
    this.latencies.push(latency);

    // Keep only last N samples
    if (this.latencies.length > this.maxSamples) {
      this.latencies.shift();
    }

    // Clean up
    this.syncStartTimes.delete(operationId);

    return latency;
  }

  /**
   * Get sync latency metrics
   */
  getMetrics(): SyncLatencyMetrics {
    if (this.latencies.length === 0) {
      return {
        avgLatency: 0,
        maxLatency: 0,
        minLatency: 0,
        sampleCount: 0,
        lastSyncTime: 0,
      };
    }

    const avgLatency = this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
    const maxLatency = Math.max(...this.latencies);
    const minLatency = Math.min(...this.latencies);
    const lastSyncTime = this.latencies[this.latencies.length - 1];

    return {
      avgLatency,
      maxLatency,
      minLatency,
      sampleCount: this.latencies.length,
      lastSyncTime,
    };
  }

  /**
   * Reset all metrics
   */
  reset(): void {
    this.latencies = [];
    this.syncStartTimes.clear();
  }

  /**
   * Get current latency status (Good/Warning/Critical)
   */
  getStatus(): 'good' | 'warning' | 'critical' {
    const metrics = this.getMetrics();
    
    if (metrics.avgLatency === 0) return 'good';
    if (metrics.avgLatency < 100) return 'good';      // < 100ms = Good
    if (metrics.avgLatency < 500) return 'warning';   // 100-500ms = Warning
    return 'critical';                                // > 500ms = Critical
  }
}

/**
 * Performance Logger
 * Logs performance metrics to console in development
 */
export class PerformanceLogger {
  private enabled: boolean;
  private logInterval: number = 5000; // Log every 5 seconds
  private lastLogTime: number = 0;

  constructor(enabled: boolean = import.meta.env.DEV) {
    this.enabled = enabled;
  }

  /**
   * Log performance metrics
   */
  log(label: string, metrics: PerformanceMetrics | SyncLatencyMetrics): void {
    if (!this.enabled) return;

    const now = performance.now();
    if (now - this.lastLogTime < this.logInterval) return;

    console.group(`📊 Performance: ${label}`);
    Object.entries(metrics).forEach(([key, value]) => {
      if (typeof value === 'number') {
        console.log(`${key}: ${value.toFixed(2)}`);
      } else {
        console.log(`${key}:`, value);
      }
    });
    console.groupEnd();

    this.lastLogTime = now;
  }

  /**
   * Log a warning if performance threshold is exceeded
   */
  warnIfSlow(operation: string, duration: number, threshold: number = 16.67): void {
    if (!this.enabled) return;
    
    if (duration > threshold) {
      console.warn(`⚠️ Slow ${operation}: ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
    }
  }

  /**
   * Measure and log a function execution time
   */
  async measure<T>(label: string, fn: () => Promise<T> | T): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      
      if (this.enabled) {
        console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      if (this.enabled) {
        console.error(`❌ ${label} failed after ${duration.toFixed(2)}ms:`, error);
      }
      
      throw error;
    }
  }
}

/**
 * Global performance monitors (singleton instances)
 */
export const globalFPSMonitor = new FPSMonitor();
export const globalSyncMonitor = new SyncLatencyMonitor();
export const globalPerfLogger = new PerformanceLogger();

/**
 * Utility function to format milliseconds for display
 */
export function formatMs(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
  if (ms < 1000) return `${ms.toFixed(1)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Utility function to get performance grade
 */
export function getPerformanceGrade(fps: number): { grade: string; color: string } {
  if (fps >= 55) return { grade: 'Excellent', color: '#22c55e' }; // green
  if (fps >= 45) return { grade: 'Good', color: '#3b82f6' };      // blue
  if (fps >= 30) return { grade: 'Fair', color: '#f59e0b' };      // orange
  return { grade: 'Poor', color: '#ef4444' };                     // red
}

