import { useState } from 'react';

export default function DFWHVACReplacementTimeline2026() {
  const [system, setSystem] = useState('central');

  const timelines: Record<string, { total: string; note: string; phases: { phase: string; duration: string; notes: string }[] }> = {
    central: {
      total: '3–6 weeks',
      note: 'Standard DFW split system (gas furnace + AC)',
      phases: [
        { phase: '🔍 Assessment & Quotes', duration: '1–2 weeks', notes: '3 bids recommended; Manual J load calc' },
        { phase: '📦 Equipment Order', duration: '1–3 weeks', notes: 'Carrier/Trane/Lennox; supply chain improved' },
        { phase: '📋 Permit', duration: '1–3 days', notes: 'Required in all DFW cities' },
        { phase: '🔧 Installation', duration: '1 day', notes: '8–10 hrs for full system swap' },
        { phase: '🔎 City Inspection', duration: '3–7 days', notes: 'Schedule after install; pass rate high' },
      ],
    },
    heatpump: {
      total: '4–8 weeks',
      note: 'Heat pump / dual-fuel system (growing in DFW)',
      phases: [
        { phase: '🔍 Assessment & Quotes', duration: '1–2 weeks', notes: 'Verify electrical panel capacity; 240V req' },
        { phase: '⚡ Panel Upgrade', duration: '1–2 weeks', notes: 'If panel upgrade needed; electrician' },
        { phase: '📦 Equipment Order', duration: '2–4 weeks', notes: 'Heat pump inverter units; longer lead time' },
        { phase: '📋 Permit', duration: '3–5 days', notes: 'HVAC + possible electrical permit' },
        { phase: '🔧 Installation', duration: '1–2 days', notes: 'Includes lineset and electrical connection' },
        { phase: '🔎 Inspection', duration: '1 week', notes: 'HVAC + electrical inspections' },
      ],
    },
    ductless: {
      total: '2–4 weeks',
      note: 'Mini-split / ductless (additions, garages, sunrooms)',
      phases: [
        { phase: '🔍 Assessment & Quotes', duration: '3–5 days', notes: 'Head placement, BTU sizing' },
        { phase: '📦 Equipment Order', duration: '1–2 weeks', notes: 'Mini-splits often in stock locally' },
        { phase: '📋 Permit', duration: '1–2 days', notes: 'Varies by DFW city and BTU size' },
        { phase: '🔧 Installation', duration: '4–8 hours', notes: 'Wall penetration, lineset, 240V circuit' },
        { phase: '🔎 Inspection', duration: '3–5 days', notes: 'Electrical + mechanical sign-off' },
      ],
    },
  };

  const current = timelines[system];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>❄️ DFW HVAC Replacement Timeline 2026</h1>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>From first quote to cool air — realistic DFW HVAC timelines</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#F5E642', marginRight: '1rem' }}>System Type:</label>
        {[{ k: 'central', l: 'Central AC/Gas' }, { k: 'heatpump', l: 'Heat Pump' }, { k: 'ductless', l: 'Mini-Split' }].map(({ k, l }) => (
          <button key={k} onClick={() => setSystem(k)}
            style={{ marginRight: '0.5rem', padding: '0.4rem 1rem', borderRadius: '6px', border: '2px solid #F5E642',
              background: system === k ? '#F5E642' : 'transparent', color: system === k ? '#0A1628' : '#F5E642', cursor: 'pointer', fontWeight: '700' }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ color: '#F5E642', fontWeight: '700' }}>Estimated Total: </span>
        <span style={{ fontSize: '1.2rem' }}>{current.total}</span>
      </div>
      <p style={{ color: '#aaa', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{current.note}</p>

      {current.phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', background: '#0d1e38', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ flex: '1', fontWeight: '600' }}>{p.phase}</div>
          <div style={{ color: '#F5E642', minWidth: '120px', textAlign: 'right' }}>{p.duration}</div>
          <div style={{ color: '#aaa', flex: '2', textAlign: 'right' }}>{p.notes}</div>
        </div>
      ))}

      <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>DFW summers push HVAC contractors to 3–4 week backlogs in June–August. Book spring replacements before the heat wave. Always insist on a permit — unpermitted HVAC voids manufacturer warranties.</p>
    </div>
  );
}
