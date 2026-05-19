import { useState } from 'react';

const plans: Record<string, { headline: string; steps: string[]; prolnk: boolean }> = {
  cancelled: {
    headline: '🚫 Contractor Cancelled Last Minute',
    steps: [
      'Don\’t panic — DFW contractor no-show is common, especially in summer peak season',
      'Request a reschedule in writing (text/email) so you have documentation',
      'Contact 2–3 backup contractors immediately while your first contractor is on hold',
      'Post the job on ProLnk — DFW has a bench of licensed pros ready for open slots',
      'For HVAC/water emergencies: call "emergency service" lines — most charge 1.5x but respond within hours',
    ],
    prolnk: true,
  },
  failed: {
    headline: '❌ Job Failed Inspection',
    steps: [
      'Request the failed inspection report in writing from the inspector',
      'Review the exact code violation — most failures are minor correctable items',
      'Contact your contractor immediately with the specific violation in writing',
      'Contractor must correct and schedule reinspection at their cost (if error is theirs)',
      'If contractor refuses, file complaint with Texas Department of Licensing and Regulation (TDLR)',
      'For permit-pulled work: do NOT cover until re-inspection passes',
    ],
    prolnk: false,
  },
  backordered: {
    headline: '📦 Materials Backordered',
    steps: [
      'Get the manufacturer part number and lead time in writing',
      'Ask contractor to source alternative SKU or brand with equivalent specs',
      'Request a price adjustment if alternative material is lower cost',
      'For HVAC units: check local HVAC distributors directly — sometimes faster than contractor supply chain',
      'Negotiate a partial payment hold until materials arrive and work is complete',
      'Consider allowing contractor to start other phases while waiting on materials',
    ],
    prolnk: false,
  },
  overestimate: {
    headline: '💸 Estimate Was Wrong / Scope Creep',
    steps: [
      'Request itemized breakdown of all new costs before authorizing any additional work',
      'Compare line-item costs to HomeAdvisor or Angi benchmarks for DFW market rates',
      'Legitimate scope additions are common — get in writing and sign before work continues',
      'If estimate feels inflated: get a second opinion estimate from ProLnk for the additional scope',
      'For disputes over original scope: reference your original signed estimate and contract',
      'Texas TRCC (Texas Residential Construction Commission) mediates residential disputes',
    ],
    prolnk: true,
  },
  abandoned: {
    headline: '🏃 Contractor Abandoned the Job',
    steps: [
      'Send certified letter demanding return within 5 business days',
      'Document all work completed vs contracted with photos and timestamps',
      'Contact Texas TDLR to file a complaint against the contractor\’s license',
      'Do not make any further payments until work is complete or settled',
      'Hire ProLnk-verified contractor to assess and complete the work',
      'Consider small claims court (up to $20K) or hire attorney for larger amounts',
    ],
    prolnk: true,
  },
};

export default function DFWContingencyPlanGuide() {
  const [situation, setSituation] = useState('cancelled');
  const plan = plans[situation];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>⚡ DFW Contractor Contingency Plan</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 32 }}>DFW's booming construction market means contractor problems happen. Here’s your playbook for the most common situations.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Select Your Situation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {Object.entries(plans).map(([key, val]) => (
              <button key={key} onClick={() => setSituation(key)}
                style={{ padding: '14px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left',
                  background: situation === key ? '#F5E642′ : '#1E2F4A', color: situation === key ? '#0A1628' : '#8A9BB5' }}>
                {val.headline}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>{plan.headline}</h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {plan.steps.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: i < plan.steps.length - 1 ? '1px solid #1E2F4A' : 'none' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: '#C8D8E8', lineHeight: 1.6 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {plan.prolnk && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔗 ProLnk Can Help Right Now</div>
            <div style={{ color: '#8A9BB5', fontSize: 14, marginBottom: 16 }}>Post your job on ProLnk and get matched with a licensed, vetted DFW contractor — often within hours. ProLnk pros know they're competing for the slot, so response times are fast.</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>⏱️ Average Response</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>2–4 hours</div>
              </div>
              <div style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ All Pros Verified</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>Licensed + Insured</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📞 DFW Emergency Resources</h2>
          {[['Texas TDLR (Contractor Licensing)', '512-463-6599 / tdlr.texas.gov'], ['Texas Attorney General Consumer Protection', '800-621-0508'], ['Better Business Bureau DFW', 'bbb.org/local/0714'], ['FEMA Disaster Assistance', 'DisasterAssistance.gov']].map(([name, contact]) => (
            <div key={name} style={{ padding: '10px 0', borderBottom: '1px solid #1E2F4A', display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ color: '#C8D8E8′ }}>{name}</span>
              <span style={{ color: '#F5E642′ }}>{contact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
