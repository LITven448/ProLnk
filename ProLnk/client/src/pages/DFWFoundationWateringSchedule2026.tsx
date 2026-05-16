import { useState } from 'react';

const monthlyGuide = [
  { months: 'Jan – Mar', emoji: '🌧️', label: 'Minimal', desc: 'DFW rain usually adequate. Water only if 2+ dry weeks and ground pulling away from foundation.', freq: '0–1x/week' },
  { months: 'April – May', emoji: '🌤️', label: 'Moderate', desc: 'Temps rising, rain inconsistent. Monitor soil moisture. Begin slow-soak perimeter watering.', freq: '2–3x/week' },
  { months: 'June – Aug', emoji: '🔥', label: 'Daily Drought Mode', desc: 'Critical period. Black clay shrinks fast. Maintain consistent moisture — not wet, not dry. Gaps at foundation = emergency.', freq: 'Daily or every other day' },
  { months: 'Sep – Oct', emoji: '🍂', label: 'Taper Down', desc: 'Temps falling, rain returns. Reduce frequency. Watch for continued dry spells through October.', freq: '1–2x/week' },
  { months: 'Nov – Dec', emoji: '❄️', label: 'Minimal', desc: 'Cool temps + winter rains handle moisture. Water only during extended dry spells (10+ days no rain).', freq: '0–1x/week' },
];

const soilTypes = ['Black clay (expansive) — most DFW', 'Sandy loam', 'Caliche/rocky', 'Mixed clay-loam'];
const rainfallLevels = ['Normal (40+ in/yr)', 'Below normal (drought year)', 'Above normal (wet year)'];

export default function DFWFoundationWateringSchedule2026() {
  const [soil, setSoil] = useState('Black clay (expansive) — most DFW');
  const [rainfall, setRainfall] = useState('Normal (40+ in/yr)');
  const [expanded, setExpanded] = useState<string | null>(null);

  const isExpansive = soil.includes('Black clay');
  const isDrought = rainfall.includes('Below normal');
  const isWet = rainfall.includes('Above normal');

  const getRec = () => {
    if (isDrought && isExpansive) return '🚨 Drought + clay = highest risk. Add 20% more frequency June–Aug. Consider soaker hose on timer.';
    if (isWet && isExpansive) return '✅ Wet year helps clay stay stable. Still monitor summer gaps and do visual check monthly.';
    if (!isExpansive) return '💡 Non-clay soils drain faster. Water more deeply but less frequently. Foundation risk lower but still monitor.';
    return '📋 Standard DFW clay schedule applies. Follow monthly guide below closely during summer.';
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏗️💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Foundation Watering Schedule 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Black clay soil = the #1 foundation threat in DFW. Moisture consistency is everything.</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔍 Your Soil + Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Soil Type</label>
              <select value={soil} onChange={e => setSoil(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', fontSize: '0.85rem' }}>
                {soilTypes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>2026 Rainfall</label>
              <select value={rainfall} onChange={e => setRainfall(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', fontSize: '0.85rem' }}>
                {rainfallLevels.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{getRec()}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {monthlyGuide.map(m => (
            <div key={m.months} onClick={() => setExpanded(expanded === m.months ? null : m.months)} style={{ background: '#132040', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem' }}>{m.emoji} <strong>{m.months}</strong> — <span style={{ color: '#F5E642' }}>{m.label}</span></span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{m.freq}</span>
              </div>
              {expanded === m.months && <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.6rem', lineHeight: 1.5 }}>{m.desc}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>🏠 <strong style={{ color: '#F5E642' }}>ProLnk Vault</strong> tracks foundation service history, soil reports, and watering logs — all tied to your home's permanent record.</p>
        </div>
      </div>
    </div>
  );
}