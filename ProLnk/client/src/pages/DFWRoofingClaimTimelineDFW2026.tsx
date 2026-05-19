import { useState } from 'react';

const STAGES = [
  { day: 'Day 0', label: 'Storm Hits', icon: '⛈️', detail: 'Document everything immediately. Photograph all visible damage from ground level. Do not go on the roof. Note the storm date — it anchors your entire claim timeline.' },
  { day: 'Day 1', label: 'Document Damage', icon: '📸', detail: 'Take 50+ photos. Capture gutters, ridge line, vents, and any interior water intrusion. Use free NOAA weather logs to confirm the storm event date for your insurer.' },
  { day: 'Days 2–3', label: 'Call Insurance + Get Estimate', icon: '📞', detail: 'File your claim by phone or app. Simultaneously request a ProLnk Charter roofer estimate — you want an independent scope before the adjuster arrives.' },
  { day: 'Days 7–14', label: 'Adjuster Visit', icon: '🔍', detail: 'Have your ProLnk roofer present during the adjuster inspection if possible. Adjusters often miss satellite dish mounts, flashing, and A/C curb damage. Your contractor can point these out.' },
  { day: 'Days 30–45', label: 'ACV Check Received', icon: '💰', detail: 'Actual Cash Value (depreciated) check arrives. Do NOT deposit and close the claim. This is a partial payment. Endorse and deposit — repairs can begin. Recoverable depreciation comes later.' },
  { day: 'Days 45–60', label: 'Repairs Complete + Supplement', icon: '🔨', detail: 'Roof replacement complete. Your contractor submits supplement for items missed in original adjuster scope. Common supplements: O&D (overlap and detail), dumpster, permit, upgraded code items.' },
  { day: 'Days 60–75', label: 'RCV Check Received', icon: '✅', detail: 'Replacement Cost Value check arrives releasing held-back depreciation. Claim is now closed. Total payout = ACV + depreciation + any approved supplements.' },
];

export default function DFWRoofingClaimTimelineDFW2026() {
  const [stage, setStage] = useState(0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Roofing Insurance Claim Timeline</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>Step-by-step storm claim timeline for DFW homeowners — from storm day to final RCV check.</p>

        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 20 }}>
          {STAGES.map((s, i) => (
            <button key={i} onClick={() => setStage(i)} style={{ flexShrink: 0, padding: '8px 12px', borderRadius: 8, border: 'none', background: stage === i ? '#F5E642′ : '#0f1f3d', color: stage === i ? '#0A1628' : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 12 }}>
              {s.icon} {s.day}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>{STAGES[stage].day}</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{STAGES[stage].icon} {STAGES[stage].label}</div>
          <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>{STAGES[stage].detail}</div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚡ Full Timeline Overview</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {STAGES.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 80, flexShrink: 0, color: '#F5E642', fontWeight: 700, fontSize: 12, paddingTop: 2 }}>{s.day}</div>
                <div style={{ width: 2, background: i <= stage ? '#F5E642′ : '#1e3a5f', borderRadius: 2, flexShrink: 0, minHeight: 20 }}></div>
                <div style={{ color: i <= stage ? '#fff' : '#475569', fontSize: 13 }}>{s.icon} {s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🔑 ProLnk Advantage</div>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            ProLnk Charter roofers in DFW are trained in insurance claim documentation and supplement writing. Get your free estimate within 24 hours of the storm.
          </p>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1e3a5f' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>ProLnk © 2026 · DFW Home Services Platform</span>
        </div>
      </div>
    </div>
  );
}
