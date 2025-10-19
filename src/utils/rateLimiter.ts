/**
 * Phase 4a Block 3 - Task 3: Client-Side Rate Limiting
 * 
 * Simple rate limiter to prevent abuse and improve UX
 */

interface RateLimitConfig {
  maxRequests: number;  // Maximum requests allowed
  windowMs: number;     // Time window in milliseconds
}

interface RateLimitState {
  requests: number[];   // Timestamps of recent requests
  blocked: boolean;
}

const rateLimitStates = new Map<string, RateLimitState>();

/**
 * Default rate limit configurations
 */
export const RATE_LIMITS = {
  AI_COMMANDS: {
    maxRequests: 10,      // 10 requests
    windowMs: 60 * 1000,  // per minute
  },
  SHAPE_CREATION: {
    maxRequests: 50,      // 50 shapes
    windowMs: 60 * 1000,  // per minute
  },
} as const;

/**
 * Check if an action is rate limited
 * 
 * @param key - Unique identifier for the rate limit (e.g., 'ai-command:{userId}')
 * @param config - Rate limit configuration
 * @returns Object with allowed status and retry time
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig = RATE_LIMITS.AI_COMMANDS
): { allowed: boolean; retryAfter?: number; requestsRemaining?: number } {
  const now = Date.now();
  
  // Get or create rate limit state
  let state = rateLimitStates.get(key);
  if (!state) {
    state = { requests: [], blocked: false };
    rateLimitStates.set(key, state);
  }

  // Remove requests outside the time window
  state.requests = state.requests.filter(timestamp => now - timestamp < config.windowMs);

  // Check if under limit
  if (state.requests.length < config.maxRequests) {
    // Add current request
    state.requests.push(now);
    
    return {
      allowed: true,
      requestsRemaining: config.maxRequests - state.requests.length,
    };
  }

  // Rate limit exceeded
  const oldestRequest = Math.min(...state.requests);
  const retryAfter = Math.ceil((oldestRequest + config.windowMs - now) / 1000); // seconds

  return {
    allowed: false,
    retryAfter,
    requestsRemaining: 0,
  };
}

/**
 * Reset rate limit for a key (useful for testing or admin overrides)
 */
export function resetRateLimit(key: string): void {
  rateLimitStates.delete(key);
}

/**
 * Get current rate limit status without incrementing
 */
export function getRateLimitStatus(
  key: string,
  config: RateLimitConfig = RATE_LIMITS.AI_COMMANDS
): { requestsRemaining: number; resetAt: number } {
  const now = Date.now();
  
  const state = rateLimitStates.get(key);
  if (!state || state.requests.length === 0) {
    return {
      requestsRemaining: config.maxRequests,
      resetAt: now + config.windowMs,
    };
  }

  // Remove expired requests
  const activeRequests = state.requests.filter(timestamp => now - timestamp < config.windowMs);
  const oldestRequest = Math.min(...activeRequests);
  
  return {
    requestsRemaining: Math.max(0, config.maxRequests - activeRequests.length),
    resetAt: oldestRequest + config.windowMs,
  };
}

/**
 * Clean up old rate limit states (call periodically to prevent memory leaks)
 */
export function cleanupRateLimits(): void {
  const now = Date.now();
  
  for (const [key, state] of rateLimitStates.entries()) {
    // Remove states with no recent requests (older than 1 hour)
    const hasRecentRequests = state.requests.some(timestamp => now - timestamp < 60 * 60 * 1000);
    
    if (!hasRecentRequests) {
      rateLimitStates.delete(key);
    }
  }
}

// Auto-cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(cleanupRateLimits, 10 * 60 * 1000);
}

