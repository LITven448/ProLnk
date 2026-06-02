/**
 * Centralized observability for the client.
 *
 * Everything here is GATED and DEFENSIVE — it no-ops cleanly when the relevant
 * env var is unset, and never throws (a failing SDK must never break the app).
 *
 * Env vars (set these in Render to turn each system ON):
 *   VITE_SENTRY_DSN    — enables client error tracking (Sentry). Unset = off.
 *   SENTRY_DSN         — server-side error tracking (read in server/_core/index.ts).
 *   VITE_POSTHOG_KEY   — enables product analytics (PostHog). Unset = off.
 *   VITE_POSTHOG_HOST  — PostHog ingestion host (default https://us.i.posthog.com).
 *
 * Funnel events instrumented (see track() call sites):
 *   pro_waitlist_submitted, homeowner_request_submitted, offer_accepted,
 *   chat_opened, chat_message_sent, scout_property_onboarded.
 *   pageview is auto-captured by PostHog.
 */
import { initSentry, Sentry } from "@/lib/sentry";
import { initPostHog, identifyUser, trackEvent } from "@/lib/posthog";

export function initObservability() {
  try {
    initSentry();
  } catch {
    // never let observability init crash the app
  }
  try {
    initPostHog();
  } catch {
    // never let observability init crash the app
  }
}

/** Fire a product-analytics event. No-ops without PostHog; never throws. */
export function track(event: string, props?: Record<string, unknown>) {
  try {
    trackEvent(event, props);
  } catch {
    // swallow — analytics must never break a flow
  }
}

/** Associate subsequent events with a user. No-ops without PostHog; never throws. */
export function identify(userId: string, props?: Record<string, unknown>) {
  try {
    identifyUser(userId, props);
  } catch {
    // swallow
  }
}

/** Report a caught error to Sentry. No-ops without a DSN; never throws. */
export function captureError(error: unknown, context?: Record<string, unknown>) {
  try {
    Sentry.captureException(error, context ? { extra: context } : undefined);
  } catch {
    // swallow
  }
}

export { Sentry };
