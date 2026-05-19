import { useState } from 'react';

const symptoms = [
  {
    symptom: 'Rooms far from air handler barely get airflow',
    cause: 'Undersized duct (most common in DFW flips)',
    detail: 'Flipped DFW homes often have original 1970s–80s duct sizing for smaller systems. New high-SEER units move more air than old ducts can handle.',
    fix: 'Manual J duct sizing calculation + duct upgrade or booster fan installation.',
    cost: '$800–3,500 depending on scope',
  },
  {
    symptom: 'System runs constantly but barely cools in July',
    cause: 'Clogged filter (monthly in DFW summer)',
    detail: 'DFW July: high dust, pollen, and AC running 16+ hours/day. Standard 1-inch filters clog in 3–4 weeks, not 90 days.',
    fix: 'Replace filter immediately. Check system airflow with static pressure gauge if problem persists after fresh filter.',
    cost: 'Filter: $5–30. Static pressure test: $75–150',
  },
  {
    symptom: 'Whistling noise in walls, low airflow to one zone',
    cause: 'Collapsed flex duct',
    detail: 'DFW attic temperatures reach 130–140°F in summer. Flex duct installed without proper support collapses at saddle points, cutting airflow by 50–80%.',
    fix: 'Inspect accessible attic flex duct runs. Re-support with proper hangers every 4 feet. Replace collapsed sections.',
    cost: '$150–600 depending on accessibility',
  },
  {
    symptom: 'One room noticeably warmer, register barely blowing',
    cause: 'Closed supply register',
    detail: 'Closed registers don’t save energy — they increase static pressure and can cause duct leakage or air handler damage.',
    fix: 'Open all supply registers fully. Balance system by partially closing registers in overcooled rooms rather than undercooled.',
    cost: 'Free — homeowner DIY',
  },
  {
    symptom: 'Large area of home has no airflow at all',
    cause: 'Disconnected duct in attic',
    detail: 'DFW attic heat causes flex duct connections to fail at boot and plenum connections. Disconnected duct dumps conditioned air directly into 130°F attic.',
    fix: 'Attic inspection — look for disconnected flex duct, especially at plenum and register boots. Reconnect and seal with mastic.',
    cost: '$150–400 per reconnection',
  },
];

export default function DFWHVACAirflowProblemsGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? symptoms[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Top 5 HVAC Airflow Problems — DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          Poor airflow is the most common HVAC complaint in DFW — and the most misdiagnosed. Before adding refrigerant or replacing equipment, identify the real airflow cause. Select your symptom below.
        </p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🌡️ Why DFW Airflow Problems Are Worse</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
            <div>• Attic temps hit 130–140°F, degrading flex duct connections over time</div>
            <div>• DFW flip homes frequently have undersized 1970s duct systems with modern high-SEER units</div>
            <div>• AC runs 16+ hours/day in July — filters clog in 3 weeks, not 90 days</div>
            <div>• Extreme heat differential (outside 105°F vs inside 72°F) demands perfect duct sealing</div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔍 Identify Your Airflow Problem</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {symptoms.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', textAlign: ’left', cursor: 'pointer', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {s.symptom}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1A2030', borderRadius: 8, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#F5E642′ }}>Likely Cause: {result.cause}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>{result.detail}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Fix</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 10 }}>{result.fix}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔧 DFW Airflow First-Response Checklist</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            <div>1. Check and replace filter (do this first — always)</div>
            <div>2. Confirm all supply registers are open</div>
            <div>3. Inspect accessible attic flex duct for sags or disconnects</div>
            <div>4. Measure static pressure at air handler (target: 0.5 in. wc max)</div>
            <div>5. If static pressure high: duct sizing or major restriction issue</div>
          </div>
        </div>
      </div>
    </div>
  );
}
