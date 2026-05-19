import { useState } from 'react';

const BRANDS = ['Copeland', 'ICM Controls', 'Five Star', 'Supco', 'Carrier/Bryant'];
const SYMPTOM_MAP: Record<string, { benefit: string; cost: string; recommend: string }> = {
  'AC struggles on hot days': {
    benefit: 'Hard start kit reduces compressor startup amps by 40–60%, preventing burnout on 100°F+ days.',
    cost: '$150–$350 installed',
    recommend: 'Highly recommended for DFW summers — ROI in 1–2 seasons.',
  },
  'Frequent trips/breaker pops': {
    benefit: 'Reduces inrush current that causes nuisance trips during DFW peak-demand afternoons.',
    cost: '$150–$350 installed',
    recommend: 'Strongly recommended — also check capacitor and breaker sizing.',
  },
  'System is 8+ years old': {
    benefit: 'Aging compressors struggle more at startup — kit extends compressor life 3–5 years.',
    cost: '$150–$300 installed',
    recommend: 'Cost-effective alternative to early replacement.',
  },
  'New system, preventive care': {
    benefit: 'Minimal benefit on new systems — compressors are factory-optimized.',
    cost: '$150–$250 installed',
    recommend: 'Optional. Invest in annual maintenance instead.',
  },
};

export default function DFWHVACCompressorGuardGuide() {
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<null | { benefit: string; cost: string; recommend: string }>(null);

  function evaluate() {
    const key = symptom || 'AC struggles on hot days';
    setResult(SYMPTOM_MAP[key] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>⚡ DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Compressor Hard Start Kits for DFW Homes</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW summers push AC compressors to their limits. Hard start kits give your compressor an extra electrical boost at startup,
          reducing strain and extending equipment life — especially critical when outdoor temps exceed 105°F for weeks at a time.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔧 How Hard Start Kits Work</h2>
          <ul style={{ color: '#9BA8BB', lineHeight: 2, paddingLeft: '1.25rem' }}>
            <li>Provide a high-torque capacitor to assist compressor startup</li>
            <li>Reduce startup amp draw by 40–60% (critical on shared circuits)</li>
            <li>Prevent locked rotor conditions in heat-soaked outdoor units</li>
            <li>Work alongside existing run capacitor — not a replacement</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏷️ Top DFW-Recommended Brands</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {BRANDS.map(b => (
              <span key={b} style={{ background: '#1A3055', color: '#E8EDF5', padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.9rem' }}>{b}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ DFW Hard Start Kit Advisor</h2>
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>System Age</label>
          <input
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="e.g. 10 years"
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          />
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>DFW Symptom</label>
          <select
            value={symptom}
            onChange={e => setSymptom(e.target.value)}
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          >
            <option value="">Select a symptom...</option>
            {Object.keys(SYMPTOM_MAP).map(k => <option key={k}>{k}</option>)}
          </select>
          <button
            onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Get Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}>✅ <strong>Benefit:</strong> {result.benefit}</div>
              <div style={{ marginBottom: '0.5rem' }}>💰 <strong>Cost:</strong> {result.cost}</div>
              <div>📋 <strong>Verdict:</strong> {result.recommend}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ color: '#9BA8BB', fontSize: '0.9rem', margin: 0 }}>
            🏠 <strong style={{ color: '#F5E642′ }}>ProLnk Tip:</strong> Ask your HVAC tech to check run capacitor health when installing a hard start kit — both degrade together in DFW heat.
          </p>
        </div>
      </div>
    </div>
  );
}
