/**
 * n8n Automation Trigger Stubs
 * When N8N_WEBHOOK_BASE_URL is configured, these fire automation workflows.
 * Silently skips if env var is not set.
 */

const N8N_BASE = process.env.N8N_WEBHOOK_BASE_URL;
const N8N_SECRET = process.env.N8N_WEBHOOK_SECRET || "";

async function triggerN8n(workflow: string, payload: Record<string, unknown>): Promise<void> {
  if (!N8N_BASE) return;
  try {
    await fetch(`${N8N_BASE}/webhook/${workflow}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-N8N-Secret": N8N_SECRET },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
  } catch (e) {
    console.warn(`[n8n] Failed to trigger ${workflow}:`, e);
  }
}

export const automations = {
  partnerWaitlistJoined: (data: { email: string; tier: string; position: number; referralCode: string; trade: string; city: string }) =>
    triggerN8n("partner-waitlist-joined", data),

  homeownerWaitlistJoined: (data: { email: string; city: string; state: string; serviceNeeded: string }) =>
    triggerN8n("homeowner-waitlist-joined", data),

  partnerApproved: (data: { email: string; name: string; tier: string; referralLink: string }) =>
    triggerN8n("partner-approved", data),

  jobCompleted: (data: { jobId: string; proEmail: string; jobValue: number; address: string; platformFee: number }) =>
    triggerN8n("job-completed", data),

  stormDetected: (data: { state: string; zipCodes: string[]; severity: string; affectedCount: number }) =>
    triggerN8n("storm-detected", data),

  weeklyDigest: (data: { week: string; totalSignups: number; newReferrals: number }) =>
    triggerN8n("weekly-digest", data),

  partnerInactive: (data: { email: string; name: string; daysSinceActivity: number }) =>
    triggerN8n("partner-inactive", data),
};
