import { useState } from 'react';

const DFW_HARDNESS_LEVELS = [
  { label: 'Moderate (10-15 gpg)', value: 'moderate', multiplier: 1.0 },
  { label: 'Hard (15-20 gpg)', value: 'hard', multiplier: 0.85 },
  { label: 'Very Hard (20-25 gpg)', value: 'very_hard', multiplier: 0.7 },
  { label: 'Extreme (25+ gpg — Plano/Frisco)', value: 'extreme', multiplier: 0.55 },
];

export default function DFWWaterHeaterFlushGuide() {
  const [age, setAge] = useState('');
  const [hardness, setHardness] = useState('');
  const [result, setResult] = useState<null | { freq: string; urgency: string; steps: string[] }>(null);

  function calculate() {
    if (!age || !hardness) return;
    const ageNum = parseInt(age);
    const level = DFW_HARDNESS_LEVELS.find(l => l.value === hardness)!;
    const baseMonths = 12;
    const adjustedMonths = Math.round(baseMonths * level.multiplier);
    let urgency = 'Routine';
    if (ageNum >= 8) urgency = '⚠️ High — tank at risk';
    else if (ageNum >= 5) urgency = 'Elevated — inspect for sediment';
    setResult({
      freq: `Every ${adjustedMonths} months (DFW-adjusted)`,
      urgency,
      steps: [
        '🔴 Set water heater to Vacation or Pilot mode — wait 2 hours',
        '💧 Attach garden hose to drain valve at tank base',
        '🚿 Run hot tap somewhere in house to prevent vacuum lock',
        '🔓 Open drain valve — first flush may look rusty or cloudy (normal in DFW)',
        '👁️ Watch for sediment: white/tan flakes = calcium from DFW water',
        '🔄 Close drain valve, refill tank halfway, drain again until water runs clear',
        '✅ Close valve, remove hose, restore power — allow 1 hour reheat',
        '📅 Tag tank with flush date and schedule next flush',
      ],
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🏠 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💧 Water Heater Flush Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW tap water averages 15–25 grains per gallon hardness — among the highest in Texas. That calcium and magnesium settles as sediment in your tank, cutting efficiency by up to 30% and causing early tank failure. Annual flushing adds 2–3 years of life to your water heater.
        </p>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 Calculate Your Flush Schedule</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Water Heater Age (years)</label>
              <input type="number" min={0} max={30} value={age} onChange={e => setAge(e.target.value)}
                style={{ width: '100%', background: '#1E2D42', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>DFW Water Hardness (your zip code)</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)}
                style={{ width: '100%', background: '#1E2D42', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select hardness level…</option>
                {DFW_HARDNESS_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Generate My Flush Plan →
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Your DFW Flush Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#1E2D42', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>FLUSH FREQUENCY</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642' }}>{result.freq}</div>
              </div>
              <div style={{ background: '#1E2D42', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>URGENCY</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{result.urgency}</div>
              </div>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Step-by-Step Flush Process</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              {result.steps.map((step, i) => (
                <div key={i} style={{ background: '#1E2D42', borderRadius: 8, padding: '10px 14px', fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ color: '#94A3B8', marginRight: 8 }}>{i + 1}.</span>{step}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🔍 What You'll See in DFW</h3>
          <div style={{ display: 'grid', gap: 8, fontSize: 14, color: '#94A3B8' }}>
            <div>🟤 Rusty water early in flush = iron sediment (common in older DFW tanks)</div>
            <div>🟡 White/tan flakes = calcium carbonate from hard water — normal but needs clearing</div>
            <div>⚫ Black flakes = deteriorating anode rod — replace immediately</div>
            <div>💨 Popping/rumbling noise during heating = sediment already severe</div>
          </div>
        </div>
      </div>
    </div>
  );
}
