/**
 * Partner Routes — extracted from the monolithic routers.ts
 *
 * This is the beginning of splitting server/routers.ts into domain files.
 * The full split should be done gradually — moving one domain at a time
 * and importing back into the main router.
 *
 * Domains to split:
 *   routes-auth.ts          — login, logout, session
 *   routes-partners.ts      — apply, approve, reject, profile (THIS FILE)
 *   routes-jobs.ts          — logJob, getJobs, analyzePhotos
 *   routes-leads.ts         — opportunities, dispatch, accept/decline
 *   routes-commissions.ts   — commissions, payouts, disputes
 *   routes-homeowner.ts     — homeowner profile, scan, vault, makeover
 *   routes-admin.ts         — admin operations
 *   routes-waitlist.ts      — waitlist signups, progress emails
 *
 * MIGRATION STATUS: Schema being extracted — not yet replacing the monolith.
 * Run the split after the platform is stable and tested.
 */

// This file documents the intended split structure.
// Content will be populated as routes are migrated from routers.ts.

export {};
