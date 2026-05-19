import { useState } from 'react';

export default function DFWRoofReplacementTimeline2026() {
  const [scenario, setScenario] = useState('insurance');

  const timelines: Record<string, { total: string; phases: { phase: string; duration: string; notes: string }[] }> = {
    insurance: {
      total: '6–12 weeks',
      phases: [
        { phase: '🌩️ Storm Damage Claim', duration: '1–2 weeks', notes: 'File with insurer; adjuster visit scheduled' },
        { phase: '🔍 Adjuster Inspection', duration: '1–2 weeks', notes: 'DFW hail season = backlog; may run 2–4 wks' },
        { phase: '💰 Claim Approval', duration: '1–2 weeks', notes: 'Supplement negotiations common in DFW' },
        { phase: '👷 Contractor Selection', duration: '1–2 weeks', notes: 'Get 3 bids; verify DFW license + insurance' },
        { phase: '📋 Permit', duration: '1–3 days', notes: 'Most DFW cities: same-day to 3-day turnaround' },
        { phase: '🏠 Installation', duration: '1–2 days', notes: '2,500 sf roof: 1 day crew of 6′ },
        { phase: '🔎 Inspection', duration: '3–7 days', notes: 'City inspection required for permit closure' },
      ],
    },
    cash: {
      total: '2–4 weeks',
      phases: [
        { phase: '👷 Contractor Selection', duration: '1–2 weeks', notes: '3 bids; verify DFW license + warranty' },
        { phase: '📋 Permit', duration: '1–3 days', notes: 'Pull permit before work starts' },
        { phase: '📦 Material Order', duration: '1–3 days', notes: 'Shingles typically in stock locally' },
        { phase: '🏠 Installation', duration: '1–2 days', notes: 'Weather window required; no rain 48 hrs' },
        { phase: '🔎 Final Inspection', duration: '3–7 days', notes: 'Schedule with city after completion' },
      ],
    },
    premium: {
      total: '4–8 weeks',
      phases: [
        { phase: '👷 Contractor Selection', duration: '2 weeks', notes: 'Metal/tile roofing specialists; fewer DFW contractors' },
        { phase: '📦 Material Lead Time', duration: '2–4 weeks', notes: 'Metal panels / concrete tile; factory order' },
        { phase: '📋 Permit', duration: '3–5 days', notes: 'Structural review for tile weight' },
        { phase: '🏠 Installation', duration: '3–5 days', notes: 'Metal standing seam; longer than shingle' },
        { phase: '🔎 Final Inspection', duration: '1 week', notes: 'City + possible HOA sign-off' },
      ],
    },
  };

  const current = timelines[scenario];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🏠 DFW Roof Replacement Timeline 2026</h1>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>How long a DFW roof replacement actually takes — insurance vs. cash vs. premium materials</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#F5E642', marginRight: '1rem' }}>Your Scenario:</label>
        {[{ k: 'insurance', l: 'Insurance Claim' }, { k: 'cash', l: 'Cash/Finance' }, { k: 'premium', l: 'Metal/Tile' }].map(({ k, l }) => (
          <button key={k} onClick={() => setScenario(k)}
            style={{ marginRight: '0.5rem', padding: '0.4rem 1rem', borderRadius: '6px', border: '2px solid #F5E642',
              background: scenario === k ? '#F5E642′ : ’transparent', color: scenario === k ? '#0A1628′ : '#F5E642', cursor: ’pointer', fontWeight: '700′ }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ color: '#F5E642', fontWeight: '700′ }}>Estimated Total: </span>
        <span style={{ fontSize: '1.2rem' }}>{current.total}</span>
      </div>

      {current.phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', background: '#0d1e38', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ flex: '1', fontWeight: '600′ }}>{p.phase}</div>
          <div style={{ color: '#F5E642', minWidth: '120px', textAlign: 'right' }}>{p.duration}</div>
          <div style={{ color: '#aaa', flex: '2', textAlign: 'right' }}>{p.notes}</div>
        </div>
      ))}

      <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>DFW hail season (March–June) creates contractor backlogs. Spring claims can add 2–4 weeks across all timelines. Always pull a permit — no-permit roofs cause insurance and resale issues.</p>
    </div>
  );
}
