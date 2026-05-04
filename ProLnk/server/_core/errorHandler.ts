/**
 * Centralized Error Handling & Logging
 * Provides consistent error responses across the API
 */

import type { TRPCError as TRPCErrorType } from "@trpc/server";

export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  RATE_LIMITED = "RATE_LIMITED",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",
}

export interface ErrorContext {
  code: ErrorCode;
  message: string;
  details?: Record<string, any>;
  statusCode: number;
  userMessage: string; // What to show to client
}

// Map error codes to HTTP status codes
const STATUS_CODES: Record<ErrorCode, number> = {
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.AUTHENTICATION_ERROR]: 401,
  [ErrorCode.AUTHORIZATION_ERROR]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.RATE_LIMITED]: 429,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: 502,
};

export function createError(
  code: ErrorCode,
  message: string,
  userMessage?: string,
  details?: Record<string, any>
): ErrorContext {
  return {
    code,
    message,
    details,
    statusCode: STATUS_CODES[code],
    userMessage: userMessage || message,
  };
}

export function logError(
  error: any,
  context: string = "Unknown"
): void {
  const timestamp = new Date().toISOString();
  const errorMessage = error?.message || String(error);
  const stack = error?.stack || "";

  console.error(`[${timestamp}] [${context}] ${errorMessage}`);
  if (stack) {
    console.error(stack);
  }
}

export function handleAsyncError(fn: Function) {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      logError(error, "AsyncError");
      throw error;
    }
  };
}

export function wrapTRPCError(error: any): ErrorContext {
  // Handle TRPC errors
  if (error.code) {
    const codeMap: Record<string, ErrorCode> = {
      "UNAUTHORIZED": ErrorCode.AUTHENTICATION_ERROR,
      "FORBIDDEN": ErrorCode.AUTHORIZATION_ERROR,
      "NOT_FOUND": ErrorCode.NOT_FOUND,
      "BAD_REQUEST": ErrorCode.VALIDATION_ERROR,
      "CONFLICT": ErrorCode.CONFLICT,
      "INTERNAL_SERVER_ERROR": ErrorCode.INTERNAL_ERROR,
    };
    const code = codeMap[error.code] || ErrorCode.INTERNAL_ERROR;
    return createError(code, error.message, error.message);
  }

  // Handle standard errors
  if (error instanceof SyntaxError) {
    return createError(ErrorCode.VALIDATION_ERROR, error.message, "Invalid input provided");
  }

  if (error instanceof ReferenceError) {
    return createError(ErrorCode.INTERNAL_ERROR, error.message, "An internal error occurred");
  }

  // Unknown error
  logError(error, "UnknownError");
  return createError(
    ErrorCode.INTERNAL_ERROR,
    String(error),
    "An unexpected error occurred"
  );
}

/**
 * Higher-order function to wrap async operations with error handling
 * Usage: const result = await safeAsync(() => someAsyncOp(), "OperationContext");
 */
export async function safeAsync<T>(
  fn: () => Promise<T>,
  context: string = "AsyncOperation",
  fallback?: T
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    logError(error, context);
    return fallback;
  }
}

/**
 * Validate data against a schema and throw detailed error
 */
export function validateData<T>(
  data: any,
  schema: { parse: (data: any) => T },
  context: string
): T {
  try {
    return schema.parse(data);
  } catch (error: any) {
    throw createError(
      ErrorCode.VALIDATION_ERROR,
      error.message || "Validation failed",
      `Invalid ${context} provided`,
      { details: error.errors }
    );
  }
}
