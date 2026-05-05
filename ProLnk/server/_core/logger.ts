import { z } from "zod";

type LogLevel = "debug" | "info" | "warn" | "error";
type LogContext = Record<string, any>;

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  context?: LogContext;
  duration?: number;
  error?: {
    code: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private service: string;
  private isDev = process.env.NODE_ENV !== "production";

  constructor(service: string) {
    this.service = service;
  }

  private formatEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error, duration?: number) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      message,
      context,
      duration,
    };

    if (error) {
      entry.error = {
        code: error.name || "Error",
        message: error.message,
        stack: this.isDev ? error.stack : undefined,
      };
    }

    const formatted = this.formatEntry(entry);

    if (this.isDev) {
      const color = {
        debug: "\x1b[36m",
        info: "\x1b[32m",
        warn: "\x1b[33m",
        error: "\x1b[31m",
      }[level];
      const reset = "\x1b[0m";
      console.log(`${color}[${level.toUpperCase()}]${reset} ${this.service}: ${message}`, context || "");
    } else {
      if (level === "error" || level === "warn") {
        console.error(formatted);
      } else {
        console.log(formatted);
      }
    }
  }

  debug(message: string, context?: LogContext) {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext) {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log("warn", message, context);
  }

  error(message: string, error?: Error, context?: LogContext) {
    this.log("error", message, context, error);
  }

  async track<T>(name: string, fn: () => Promise<T>, context?: LogContext): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.log("debug", `${name} completed`, { ...context, durationMs: duration }, undefined, duration);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.log("error", `${name} failed`, { ...context, durationMs: duration }, error instanceof Error ? error : new Error(String(error)), duration);
      throw error;
    }
  }
}

export function createLogger(service: string): Logger {
  return new Logger(service);
}
