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

export async function runMorningAgentCycle(): Promise<void> {
  console.log('[AgentOrchestrator] Starting morning agent cycle');

  const [compliance, tierStatus] = await Promise.allSettled([
    runComplianceCheckAgent(),
    runTierPromotionAgent(),
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
  jobId: string;
  completingProEmail: string;
  jobValue: number;
  platformFeeRate: number;
  propertyAddress: string;
  photoUrls?: string[];
}): Promise<void> {
  const { jobId, completingProEmail, jobValue, platformFeeRate, propertyAddress, photoUrls = [] } = jobData;
  console.log('[AgentOrchestrator] Running job-complete agents for job:', jobId);

  const [distribution, origination] = await Promise.allSettled([
    runCommissionDistributionAgent({ jobId, completingProEmail, jobValue, platformFeeRate, propertyAddress }),
    runOriginationLockAgent({ proEmail: completingProEmail, propertyAddress, photos: photoUrls }),
  ]);

  if (distribution.status === 'fulfilled') {
    const r = distribution.value;
    console.log('[AgentOrchestrator] Commission distributed — fee:', r.platformFee, '| network payouts:', r.networkPayouts.length, '| ProLnk retained:', r.prolnkRetained);
  } else {
    console.log('[AgentOrchestrator] Commission distribution failed:', distribution.reason);
  }

  if (origination.status === 'fulfilled') {
    const r = origination.value;
    if (r.isNewClaim) {
      console.log('[AgentOrchestrator] Origination lock claimed for:', completingProEmail, 'at:', propertyAddress);
    } else if (!r.locked) {
      console.log('[AgentOrchestrator] Origination already exists:', r.existingOriginatorEmail ?? 'unknown');
    }
  } else {
    console.log('[AgentOrchestrator] Origination lock failed:', origination.reason);
  }

  if (photoUrls.length) {
    for (const photoUrl of photoUrls) {
      await runPhotoAttributionAgent({ photoUrl, uploaderEmail: completingProEmail, propertyAddress, jobId }).catch((err) => {
        console.log('[AgentOrchestrator] Photo attribution error (non-fatal):', err);
      });
    }
  }

  console.log('[AgentOrchestrator] Job-complete agents finished for job:', jobId);
}
