import { useState } from 'react';

const SITUATION_MAP: Record<string, { priority: string; nextStep: string; proLnkAction: string }> = {
  'My AC is not cooling well': {
    priority: 'Urgent — check refrigerant charge, dirty coil, and restricted airflow first.',
    nextStep: 'Inspect filter, verify thermostat setting, check outdoor unit for debris. Call a pro if no obvious cause.',
    proLnkAction: 'Connect with a verified DFW HVAC tech within 2 hours through ProLnk.',
  },
  'I want to improve air quality': {
    priority: 'High — DFW humidity makes IAQ management essential year-round.',
    nextStep: 'Start with MERV-13 filter + whole-home dehumidifier. Add UV coil lamp for mold prevention.',
    proLnkAction: 'Get 3 competitive quotes from ProLnk IAQ specialists — no pressure, no markup.',
  },
  'I need a new system': {
    priority: 'Plan carefully — wrong sizing is the #1 DFW HVAC mistake.',
    nextStep: 'Require Manual J load calculation from any contractor before accepting a quote.',
    proLnkAction: 'ProLnk vets all contractors for Manual J compliance — we protect you from oversized installs.',
  },
  'I want to reduce my energy bills': {
    priority: 'High ROI — DFW homes spend $2,400–$4,800/yr on HVAC energy on average.',
    nextStep: 'Seal and insulate ducts first (highest ROI), then consider variable-speed equipment and smart thermostat.',
    proLnkAction: 'ProLnk energy audit partners can identify your top 3 efficiency improvements with payback estimates.',
  },
  'Preventive maintenance': {
    priority: 'Foundational — annual tune-ups prevent 80% of DFW mid-summer breakdowns.',
    nextStep: 'Schedule spring tune-up before May. Include coil cleaning, refrigerant check, and capacitor test.',
    proLnkAction: 'ProLnk maintenance partners offer annual contracts — no more scrambling during heat waves.',
  },
};

const KNOWLEDGE_PILLARS = [
  { icon: '🌡️', title: 'DFW Climate Mastery', desc: 'You understand how 105°F heat and 75% humidity uniquely stress HVAC systems in North Texas.' },
  { icon: '🔧', title: 'Equipment Knowledge', desc: 'Heat pumps, compressors, coils, capacitors, hard start kits — you know what they do and when they fail.' },
  { icon: '💧', title: 'Humidity & IAQ', desc: 'Dehumidification, UV systems, filtration, ventilation — you can make informed decisions about indoor air.' },
  { icon: '⚡', title: 'Energy Efficiency', desc: 'SEER2, HSPF2, Manual J, duct sealing — you know how to evaluate real efficiency, not just marketing claims.' },
  { icon: '🏢', title: 'Commercial Systems', desc: 'Chillers, cooling towers, enthalpy wheels, VRF — you understand large-building HVAC at a conceptual level.' },
  { icon: '📋', title: 'Contractor Intelligence', desc: 'You know the right questions, the right certifications, and the red flags that protect you from bad contractors.' },
];

export default function DFWHVACFinalCompletionPage() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { priority: string; nextStep: string; proLnkAction: string }>(null);

  function evaluate() {
    setResult(SITUATION_MAP[situation] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎉</div>
          <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '0.35rem 1.25rem', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
            PAGE 3,000 — PROLNK DFW HVAC LIBRARY COMPLETE
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>You Now Know More About DFW HVAC Than 99% of Homeowners</h1>
          <p style={{ color: '#9BA8BB', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            ProLnk's 3,000+ page DFW HVAC resource library is the most comprehensive free HVAC knowledge base ever built for North Texas homeowners.
            Here's what you've mastered — and how to put it to work.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🧠 Your DFW HVAC Knowledge Foundation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {KNOWLEDGE_PILLARS.map(p => (
              <div key={p.title} style={{ background: '#0A1628', borderRadius: 10, padding: '1rem' }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>{p.icon}</div>
                <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{p.title}</div>
                <div style={{ color: '#9BA8BB', fontSize: '0.8rem', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🤝 The ProLnk HVAC Partner Promise</h2>
          <ul style={{ color: '#9BA8BB', lineHeight: 2.1, paddingLeft: '1.25rem', margin: 0 }}>
            <li><strong style={{ color: '#E8EDF5' }}>Vetted contractors only</strong> — background-checked, licensed, and DFW-experienced</li>
            <li><strong style={{ color: '#E8EDF5' }}>No price markup</strong> — ProLnk earns from contractors, not from homeowners</li>
            <li><strong style={{ color: '#E8EDF5' }}>Competitive quotes</strong> — get 3 bids on every job, always</li>
            <li><strong style={{ color: '#E8EDF5' }}>Knowledge-matched</strong> — you'll never be upsold something you know you don't need</li>
            <li><strong style={{ color: '#E8EDF5' }}>DFW-specific expertise</strong> — every partner understands North Texas climate demands</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ Build Your DFW HVAC Action Plan</h2>
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your Current HVAC Situation</label>
          <select
            value={situation}
            onChange={e => setSituation(e.target.value)}
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          >
            <option value="">Select your situation...</option>
            {Object.keys(SITUATION_MAP).map(k => <option key={k}>{k}</option>)}
          </select>
          <button
            onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Get My Complete Action Plan
          </button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.75rem' }}>🎯 <strong>Priority:</strong> {result.priority}</div>
              <div style={{ marginBottom: '0.75rem' }}>📋 <strong>Your Next Step:</strong> {result.nextStep}</div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '1rem', marginTop: '0.5rem' }}>
                🏠 <strong style={{ color: '#F5E642' }}>ProLnk Can Help:</strong> <span style={{ color: '#9BA8BB' }}>{result.proLnkAction}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: 'linear-gradient(135deg, #0F2040, #1A3055)', borderRadius: 12, padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏠</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ready to Apply Your Knowledge?</div>
          <p style={{ color: '#9BA8BB', fontSize: '0.9rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
            Join thousands of DFW homeowners who use ProLnk to connect with trusted HVAC professionals — armed with the knowledge to make smart decisions.
          </p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, fontSize: '1rem' }}>
            Find a Verified DFW HVAC Pro →
          </div>
        </div>
      </div>
    </div>
  );
}
