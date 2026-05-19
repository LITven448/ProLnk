import { useState } from 'react';

const homeTypes = [
  {
    id: 'single',
    label: '🏠 Single Family',
    checklist: [
      { emoji: '❄️', task: 'Replace AC filter — use MERV 8+ for allergy season', urgent: true },
      { emoji: '💧', task: 'Start foundation soaker hose routine — 20 min daily if no rain 7+ days', urgent: true },
      { emoji: '🏠', task: 'Walk your roof visually after any spring storm — check for lifted shingles', urgent: true },
      { emoji: '🚿', task: 'Test irrigation backflow preventer — legally required annual test in most DFW cities', urgent: false },
      { emoji: '🌿', task: 'Clear cottonwood fluff from outdoor AC condenser coils', urgent: false },
      { emoji: '🔦', task: 'Check attic for signs of roof leak damage before summer heat amplifies any moisture', urgent: false },
      { emoji: '⚡', task: 'Test whole-home surge protector — spring storm season peaks now', urgent: false },
      { emoji: '🟡', task: 'ProLnk Charter approaching 500 members — apply before the waitlist closes', urgent: true },
    ],
  },
  {
    id: 'condo',
    label: '🏢 Condo/Townhome',
    checklist: [
      { emoji: '❄️', task: 'Replace your unit HVAC filter — even if HOA handles common areas', urgent: true },
      { emoji: '🚪', task: 'Check balcony drainage — spring rains can cause unit-to-unit water damage', urgent: true },
      { emoji: '💧', task: 'Confirm HOA is servicing common area irrigation systems for May', urgent: false },
      { emoji: '🌿', task: 'Clean cottonwood from any mini-split or window unit condenser', urgent: false },
      { emoji: '📋', task: 'Review HOA maintenance schedule — confirm AC common areas are covered', urgent: false },
      { emoji: '🔦', task: 'Inspect water heater for any sediment buildup — DFW hard water is harsh', urgent: false },
      { emoji: '🟡', task: 'ProLnk Charter approaching 500 members — reserve your spot now', urgent: true },
    ],
  },
  {
    id: 'older',
    label: '🏚️ Older Home (Pre-1990)',
    checklist: [
      { emoji: '❄️', task: 'Replace AC filter AND schedule full tune-up — older systems fail in heat', urgent: true },
      { emoji: '🧱', task: 'Foundation inspection recommended — older homes more susceptible to expansive clay damage', urgent: true },
      { emoji: '🏠', task: 'Roof inspection is critical — May storms before summer = last chance before peak heat', urgent: true },
      { emoji: '⚡', task: 'Check electrical panel for aluminum wiring or Federal Pacific brand — fire risk', urgent: true },
      { emoji: '💧', task: 'Inspect all visible plumbing joints — hard DFW water corrodes older copper faster', urgent: false },
      { emoji: '🌿', task: 'Check crawl space or pier and beam foundation for moisture accumulation', urgent: false },
      { emoji: '🟡', task: 'ProLnk Charter = priority access to vetted pros for older home needs — apply now', urgent: true },
    ],
  },
  {
    id: 'new',
    label: '🏗️ New Construction (Post-2015)',
    checklist: [
      { emoji: '❄️', task: 'Replace AC filter — builder-grade systems need frequent filter changes first 5 years', urgent: true },
      { emoji: '🧱', task: 'Watch for early settling cracks — common in DFW clay soils year 1–3', urgent: true },
      { emoji: '💧', task: 'Start soaker hose routine — new homes need consistent moisture most in first 3 years', urgent: true },
      { emoji: '🌿', task: 'Clean outdoor AC condenser — cottonwood clogs are worst in newer neighborhoods', urgent: false },
      { emoji: '📋', task: 'Confirm builder warranty items before 1-year anniversary — time-limited issues', urgent: false },
      { emoji: '🚿', task: 'Test irrigation system zones and timer for summer programming', urgent: false },
      { emoji: '🟡', task: 'ProLnk Charter approaching 500 — lock in founding rate while available', urgent: true },
    ],
  },
];

export default function DFWHomeownerMayCheck2026() {
  const [active, setActive] = useState('single');
  const current = homeTypes.find(h => h.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>📋✅</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>
            DFW May 2026 Homeowner Check-In Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            May is the single most important month for DFW homeowners. Select your home type for your personalized May checklist.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {homeTypes.map(h => (
            <button
              key={h.id}
              onClick={() => setActive(h.id)}
              style={{
                padding: '10px 18px', borderRadius: 8, border: '2px solid',
                borderColor: active === h.id ? '#F5E642′ : '#1e3a5f',
                background: active === h.id ? '#F5E642′ : '#0f2240',
                color: active === h.id ? '#0A1628′ : '#cbd5e1',
                fontWeight: 700, cursor: 'pointer', fontSize: 13,
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f2240', border: '2px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 18 }}>
            {current.label} — May 2026 Checklist
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {current.checklist.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, padding: '10px 14px', background: item.urgent ? 'rgba(245,230,66,0.06)' : 'transparent', borderRadius: 8, border: item.urgent ? '1px solid rgba(245,230,66,0.2)' : '1px solid transparent' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.emoji}</span>
                <span style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.5 }}>{item.task}</span>
                {item.urgent && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4, flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>NOW</span>}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 22, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>
            🟡 ProLnk Charter membership is closing at 500 applications. Founding rate locked for life.
          </p>
          <a
            href="https://prolnk.io"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 15 }}
          >
            Apply for Charter Membership — prolnk.io
          </a>
        </div>

        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          ProLnk DFW Homeowner May 2026 Guide · prolnk.io
        </p>
      </div>
    </div>
  );
}
