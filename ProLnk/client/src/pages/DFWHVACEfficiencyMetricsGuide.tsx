import { useState } from 'react';

const metrics = [
  {
    name: 'EER',
    full: 'Energy Efficiency Ratio',
    dfwRelevance: '⭐⭐⭐⭐⭐ Most Important for DFW',
    description: 'Measures efficiency at a fixed 95°F outdoor temp — exactly DFW peak summer conditions.',
    goodValue: 'EER ≥ 12.5 for DFW',
    why: 'DFW routinely hits 95–110°F for months. EER captures real-world DFW performance, not lab averages.',
    color: '#F5E642',
  },
  {
    name: 'SEER2',
    full: 'Seasonal Energy Efficiency Ratio 2',
    dfwRelevance: '⭐⭐⭐⭐ Important but Incomplete',
    description: 'Averages efficiency across a range of temps — understates DFW peak costs.',
    goodValue: 'SEER2 ≥ 16 for DFW',
    why: 'Good baseline comparison metric, but calculated across milder national averages — DFW summers are hotter than the model assumes.',
    color: '#4A9EFF',
  },
  {
    name: 'IEER',
    full: 'Integrated Energy Efficiency Ratio',
    dfwRelevance: '⭐⭐⭐ Useful for Variable Systems',
    description: 'Weighted efficiency across part-load conditions — best for variable-speed or multi-stage units.',
    goodValue: 'IEER ≥ 14 for DFW',
    why: 'Captures efficiency when system runs at reduced capacity on milder DFW days (spring/fall).',
    color: '#7ED321',
  },
  {
    name: 'COP',
    full: 'Coefficient of Performance',
    dfwRelevance: '⭐⭐ Heat Pump / Geothermal Only',
    description: 'Ratio of heat moved to electricity used — primary metric for heat pumps and geothermal.',
    goodValue: 'COP ≥ 3.5 for DFW heat pumps',
    why: 'DFW\’s mild winters make heat pumps viable — COP tells you how efficiently they heat vs a gas furnace.',
    color: '#E87D4A',
  },
];

const concerns = [
  { label: 'High summer electric bills', metric: 'EER', detail: 'EER ≥ 12.5 cuts peak cooling costs the most in DFW\’s 95°F+ summers.' },
  { label: 'Comparing two quotes side-by-side', metric: 'SEER2', detail: 'SEER2 is on every spec sheet — use it for apples-to-apples, then check EER for DFW accuracy.' },
  { label: 'Variable-speed or 2-stage system', metric: 'IEER', detail: 'IEER shows part-load efficiency — critical for variable systems running at 40–70% capacity.' },
  { label: 'Heat pump or geothermal', metric: 'COP', detail: 'COP ≥ 3.5 means the unit moves 3.5x more energy than it consumes — very achievable in DFW.' },
  { label: 'New construction or full replacement', metric: 'EER + IEER', detail: 'Use both: EER for worst-case DFW peak load, IEER for shoulder season savings.' },
];

export default function DFWHVACEfficiencyMetricsGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [concern, setConcern] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>HVAC Efficiency Metrics for DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: '2rem', fontSize: '1rem' }}>EER vs SEER2 vs IEER vs COP — which metric actually matters in Dallas-Fort Worth's brutal summers.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', fontWeight: 700 }}>
          🌡️ DFW Bottom Line: <span style={{ fontWeight: 400 }}>EER is the most important metric for DFW. It measures efficiency at exactly 95°F — the temperature DFW holds for weeks at a time. SEER2 is a national average that undersells DFW's real summer costs.</span>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>The 4 Metrics Explained</h2>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {metrics.map((m, i) => (
            <div key={m.name} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#162035′ : '#111D33', border: `1.5px solid ${selected === i ? m.color : '#1E2D45'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: ’pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: m.color }}>{m.name}</span>
                  <span style={{ color: '#8A9BB5', marginLeft: 8, fontSize: '0.9rem' }}>{m.full}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: m.color }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              <div style={{ color: '#8A9BB5', fontSize: '0.85rem', marginTop: '0.25rem' }}>{m.dfwRelevance}</div>
              {selected === i && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid #1E2D45', paddingTop: '0.75rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>{m.description}</p>
                  <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: m.color, fontWeight: 700 }}>DFW Target: </span>{m.goodValue}
                  </div>
                  <p style={{ color: '#8A9BB5', fontSize: '0.9rem' }}>{m.why}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🔍 My Concern → Which Metric?</h2>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {concerns.map((c, i) => (
            <div key={i} onClick={() => setConcern(concern === i ? null : i)}
              style={{ background: concern === i ? '#162035′ : '#111D33', border: `1.5px solid ${concern === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.75rem 1rem', cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{c.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: '0.9rem' }}>{c.metric}</span>
              </div>
              {concern === i && <p style={{ color: '#8A9BB5', fontSize: '0.9rem', marginTop: '0.5rem' }}>{c.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
