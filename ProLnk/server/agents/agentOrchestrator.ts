/**
 * Agent Orchestrator
 *
 * Coordinates the Founding Network agents on schedule and in response to events.
 * - Morning cycle: compliance check + tier status audit
 * - Job complete cycle: commission distribution + origination lock
 */

import {
  runComplianceCheckAgent,
  runTierPromotionAgent,
  runCommissionDistributionAgent,
  runOriginationLockAgent,
  runPhotoAttributionAgent,
} from "./foundingNetworkAgents";
import { withAgentRun } from "./agentLogger";

export async function runMorningAgentCycle(): Promise<void> {
  console.log('[AgentOrchestrator] Starting morning agent cycle');

  const [compliance, tierStatus] = await Promise.allSettled([
    withAgentRun({ agentId: "founding-compliance-check", action: "Morning compliance scan" }, () => runComplianceCheckAgent()),
    withAgentRun({ agentId: "founding-tier-promotion", action: "Morning tier-status audit" }, () => runTierPromotionAgent()),
  ]);

  if (compliance.status === 'fulfilled') {
    const r = compliance.value;
    console.log('[AgentOrchestrator] Compliance:', `${r.totalActive} active, ${r.warnings} warnings, ${r.inactive} inactive`);
  } else {
    console.log('[AgentOrchestrator] Compliance agent failed:', compliance.reason);
  }

  if (tierStatus.status === 'fulfilled') {
    const r = tierStatus.value;
    const full = Object.entries({ charter: r.charterFull, founding: r.foundingFull, l3: r.l3Full, l4: r.l4Full })
      .filter(([, v]) => v)
      .map(([k]) => k);
    console.log('[AgentOrchestrator] Tier status: total =', r.counts.total ?? 0, '| Full tiers:', full.length ? full.join(', ') : 'none');
  } else {
    console.log('[AgentOrchestrator] Tier promotion agent failed:', tierStatus.reason);
  }

  console.log('[AgentOrchestrator] Morning cycle complete');
}

export async function runJobCompleteAgents(jobData: {
  jobId?: string;
  completingProEmail?: string;
  proEmail?: string;
  jobValue?: number;
  platformFeeRate?: number;
  propertyAddress?: string;
  photoUrls?: string[];
}): Promise<void> {
  const proEmail = jobData.completingProEmail ?? jobData.proEmail;
  const { jobId, jobValue, platformFeeRate, propertyAddress, photoUrls = [] } = jobData;
  console.log('[AgentOrchestrator] Running job-complete agents for:', jobId);

  const tasks: Promise<any>[] = [];

  if (proEmail && propertyAddress && jobValue && jobId && platformFeeRate) {
    tasks.push(
      withAgentRun(
        { agentId: "founding-commission-distribution", action: `Distribute commissions for job ${jobId}` },
        () => runCommissionDistributionAgent({ jobId, completingProEmail: proEmail, jobValue, platformFeeRate, propertyAddress }),
      )
        .then((r) => console.log('[AgentOrchestrator] Commission distributed — fee:', r.platformFee, '| network payouts:', r.networkPayouts.length, '| ProLnk retained:', r.prolnkRetained))
        .catch((err) => console.log('[AgentOrchestrator] Commission distribution failed:', err))
    );
  }

  if (proEmail && propertyAddress) {
    tasks.push(
      withAgentRun(
        { agentId: "founding-origination-lock", action: `Origination lock for ${propertyAddress}` },
        () => runOriginationLockAgent({ proEmail, propertyAddress, photos: photoUrls }),
      )
        .then((r) => {
          if (r.isNewClaim) {
            console.log('[AgentOrchestrator] Origination lock claimed for:', proEmail, 'at:', propertyAddress);
          } else if (!r.locked) {
            console.log('[AgentOrchestrator] Origination already exists:', r.existingOriginatorEmail ?? 'unknown');
          }
        })
        .catch((err) => console.log('[AgentOrchestrator] Origination lock failed:', err))
    );
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`[AgentOrchestrator] Task ${i} failed:`, r.reason);
  });

  if (proEmail && propertyAddress && photoUrls.length && jobId) {
    for (const photoUrl of photoUrls) {
      await withAgentRun(
        { agentId: "founding-photo-attribution", action: `Attribute photo for job ${jobId}` },
        () => runPhotoAttributionAgent({ photoUrl, uploaderEmail: proEmail, propertyAddress, jobId }),
      ).catch((err) => {
        console.log('[AgentOrchestrator] Photo attribution error (non-fatal):', err);
      });
    }
  }

  console.log('[AgentOrchestrator] Job-complete agents finished for:', jobId);
}
