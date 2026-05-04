/**
 * Rate Limiting Middleware
 * Prevents abuse by limiting requests per IP/user
 */

import type { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitOptions {
  windowMs?: number; // Time window in ms (default: 60s)
  maxRequests?: number; // Max requests per window (default: 100)
  message?: string;
  keyGenerator?: (req: Request) => string;
}

export function rateLimit(options: RateLimitOptions = {}) {
  const {
    windowMs = 60 * 1000, // 1 minute
    maxRequests = 100,
    message = "Too many requests, please try again later.",
    keyGenerator = (req: Request) => req.ip || "unknown",
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();

    if (!store[key]) {
      store[key] = { count: 1, resetTime: now + windowMs };
      return next();
    }

    const entry = store[key];

    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + windowMs;
      return next();
    }

    entry.count++;

    if (entry.count > maxRequests) {
      res.status(429).json({
        error: message,
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      });
      return;
    }

    res.set("X-RateLimit-Limit", String(maxRequests));
    res.set("X-RateLimit-Remaining", String(maxRequests - entry.count));
    res.set("X-RateLimit-Reset", String(entry.resetTime));

    next();
  };
}

// Strict rate limit for auth endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 attempts per 15 minutes
  message: "Too many login attempts. Please try again in 15 minutes.",
});

// Moderate rate limit for API endpoints
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 req/minute = 1 req/second
  message: "Rate limit exceeded. Maximum 60 requests per minute.",
});

// Loose rate limit for public endpoints
export const publicRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  message: "Rate limit exceeded. Maximum 100 requests per minute.",
});

// Per-user rate limit (for authenticated users)
export function perUserRateLimit(options: RateLimitOptions = {}) {
  return rateLimit({
    ...options,
    windowMs: options.windowMs || 60 * 1000,
    maxRequests: options.maxRequests || 100,
    keyGenerator: (req: Request) => {
      const user = (req as any).user;
      return user?.id ? `user:${user.id}` : req.ip || "unknown";
    },
  });
}
