import { useState } from 'react';

const problems = [
  {
    issue: 'High humidity even when AC is running',
    benefit: 'Variable speed runs at 40% capacity for hours — longer contact with evaporator coil removes 30–50% more moisture than on/off cycling.',
    premium: '+$800–$1,500 over single speed',
    payback: '3–5 years via comfort + lower dehumidifier costs',
    icon: '💧',
  },
  {
    issue: 'AC short-cycling (runs 5 min, stops, repeats)',
    benefit: 'Variable speed matches exact load — eliminates short cycling, prevents humidity spikes between cycles.',
    premium: '+$800–$1,500',
    payback: '4–6 years via equipment longevity + energy savings',
    icon: '🔄',
  },
  {
    issue: 'Loud system, noticeable when AC kicks on',
    benefit: 'Variable speed blower starts slowly, ramps up gradually — 30–50% quieter than single-speed blast starts.',
    premium: '+$800–$1,500',
    payback: '5–7 years (comfort-based, hard to quantify)',
    icon: '🔇',
  },
  {
    issue: 'High electric bills during DFW summer',
    benefit: 'Running at 40% capacity uses far less power than on/off full-blast cycling — 20–30% energy savings during DFW\’s long cooling season.',
    premium: '+$800–$1,500',
    payback: '3–5 years via lower Oncor bills',
    icon: '⚡',
  },
  {
    issue: 'Hot and cold spots in the house',
    benefit: 'Continuous low-speed airflow creates even temperature distribution — eliminates stratification that on/off systems cause.',
    premium: '+$800–$1,500',
    payback: '4–6 years (comfort + reduced supplemental heating/cooling)',
    icon: '🌡️',
  },
  {
    issue: 'Long DFW cooling season (May–Oct)',
    benefit: 'More runtime hours = more energy savings vs single speed. DFW\’s 6-month cooling season amplifies variable speed ROI vs northern climates.',
    premium: '+$800–$1,500',
    payback: '2–4 years in DFW vs 5–8 years in northern markets',
    icon: '📅',
  },
];

const comparison = [
  { label: 'Speeds', single: '1 (on/off)', variable: 'Infinite (40–100%)' },
  { label: 'Humidity control', single: 'Moderate', variable: 'Excellent' },
  { label: 'Noise', single: 'Noticeable', variable: 'Very quiet' },
  { label: 'Energy use', single: 'Baseline', variable: '20–30% less' },
  { label: 'DFW summer performance', single: 'Adequate', variable: 'Optimal' },
  { label: 'Cost premium', single: '$0', variable: '+$800–$1,500' },
];

export default function DFWHVACVariableSpeedGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [tab, setTab] = useState<'problems' | 'compare'>('problems');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Variable Speed HVAC for DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: '2rem' }}>Why DFW's humidity and long cooling season make variable speed worth the premium.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', fontWeight: 700 }}>
          💧 DFW Key Insight: <span style={{ fontWeight: 400 }}>DFW's humidity problem is worse than the heat. Variable speed systems run at 40% capacity for hours — dramatically better moisture removal than single-speed on/off cycles.</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(['problems', 'compare'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '0.5rem 1.25rem', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                background: tab === t ? '#F5E642' : '#111D33', color: tab === t ? '#0A1628' : '#8A9BB5' }}>
              {t === 'problems' ? '🔍 My DFW Problem' : '📊 Side-by-Side'}
            </button>
          ))}
        </div>

        {tab === 'problems' && (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {problems.map((p, i) => (
              <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? '#162035' : '#111D33', border: `1.5px solid ${selected === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                    <span style={{ fontWeight: 700 }}>{p.issue}</span>
                  </div>
                  <span style={{ color: '#F5E642' }}>{selected === i ? '▲' : '▼'}</span>
                </div>
                {selected === i && (
                  <div style={{ marginTop: '0.75rem', borderTop: '1px solid #1E2D45', paddingTop: '0.75rem' }}>
                    <p style={{ marginBottom: '0.75rem', color: '#E8EAF0' }}>{p.benefit}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                        <div style={{ color: '#8A9BB5', fontSize: '0.75rem' }}>COST PREMIUM</div>
                        <div style={{ color: '#F5E642', fontWeight: 700 }}>{p.premium}</div>
                      </div>
                      <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                        <div style={{ color: '#8A9BB5', fontSize: '0.75rem' }}>DFW PAYBACK</div>
                        <div style={{ color: '#7ED321', fontWeight: 700 }}>{p.payback}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'compare' && (
          <div style={{ background: '#111D33', borderRadius: 10, overflow: 'hidden', border: '1.5px solid #1E2D45' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: '#162035', padding: '0.75rem 1rem', fontWeight: 700, color: '#F5E642', fontSize: '0.85rem' }}>
              <span>Feature</span><span>Single Speed</span><span>Variable Speed</span>
            </div>
            {comparison.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '0.75rem 1rem', borderTop: '1px solid #1E2D45', background: i % 2 === 0 ? '#111D33' : '#0D1928' }}>
                <span style={{ color: '#8A9BB5' }}>{row.label}</span>
                <span>{row.single}</span>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>{row.variable}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
