import { useState } from 'react';

const tonData = [
  { ton: '2-ton', sqft: '800-1,100 sq ft', base: '$3,800', high: '$6,200', seer: 'SEER2 14.3+', note: 'Common in older DFW condos and townhomes.' },
  { ton: '2.5-ton', sqft: '1,100-1,400 sq ft', base: '$4,200', high: '$7,000', seer: 'SEER2 14.3+', note: 'Popular for smaller DFW ranch-style homes.' },
  { ton: '3-ton', sqft: '1,400-1,800 sq ft', base: '$4,800', high: '$8,200', seer: 'SEER2 14.3+', note: 'Most common DFW residential system size.' },
  { ton: '3.5-ton', sqft: '1,800-2,200 sq ft', base: '$5,400', high: '$9,000', seer: 'SEER2 15+', note: 'Frequently needed for two-story DFW homes.' },
  { ton: '4-ton', sqft: '2,200-2,800 sq ft', base: '$6,200', high: '$10,500', seer: 'SEER2 15+', note: 'Larger DFW homes; ductwork often needs inspection.' },
  { ton: '5-ton', sqft: '2,800-3,500+ sq ft', base: '$7,500', high: '$13,000', seer: 'SEER2 16+', note: 'Larger estates; may require zoning or dual units.' },
];

const homeSizes = ['Under 1,100 sq ft', '1,100-1,400 sq ft', '1,400-1,800 sq ft', '1,800-2,200 sq ft', '2,200-2,800 sq ft', 'Over 2,800 sq ft'];
const situations = ['Standard replacement', 'Old ductwork needs work', 'High-efficiency upgrade (SEER2 18+)', 'Budget replacement only'];

function getCostEstimate(size: string, situation: string) {
  const map: Record<string, { ton: string; low: string; high: string }> = {
    'Under 1,100 sq ft': { ton: '2-ton', low: '$3,800', high: '$6,200' },
    '1,100-1,400 sq ft': { ton: '2.5-ton', low: '$4,200', high: '$7,000' },
    '1,400-1,800 sq ft': { ton: '3-ton', low: '$4,800', high: '$8,200' },
    '1,800-2,200 sq ft': { ton: '3.5-ton', low: '$5,400', high: '$9,000' },
    '2,200-2,800 sq ft': { ton: '4-ton', low: '$6,200', high: '$10,500' },
    'Over 2,800 sq ft': { ton: '5-ton', low: '$7,500', high: '$13,000' },
  };
  const base = map[size];
  if (!base) return null;
  let note = 'Includes equipment, labor, and standard DFW installation. Get 3 quotes.';
  let adjustment = '';
  if (situation === 'Old ductwork needs work') { adjustment = 'Add $1,500-4,000 for ductwork repairs or replacement.'; }
  if (situation === 'High-efficiency upgrade (SEER2 18+)') { adjustment = 'High-efficiency premium adds $1,500-3,500. Federal tax credit may apply.'; }
  if (situation === 'Budget replacement only') { adjustment = 'Budget units available at low end — verify 10-year warranty is still included.'; }
  return { ...base, note, adjustment };
}

export default function DFWHVACCostByTon2026() {
  const [homeSize, setHomeSize] = useState('');
  const [situation, setSituation] = useState('');
  const estimate = homeSize && situation ? getCostEstimate(homeSize, situation) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE — 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW HVAC Cost by Tonnage — 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Updated 2026 installation cost data for DFW. Prices reflect new SEER2 efficiency standards, current labor rates in the metroplex, and typical DFW installation requirements.</p>

        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {tonData.map(t => (
            <div key={t.ton} style={{ background: '#0f1f3d', borderRadius: 10, padding: '14px 20px', display: 'grid', gridTemplateColumns: '90px 140px 80px 80px 100px 1fr', gap: 12, alignItems: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#F5E642' }}>{t.ton}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{t.sqft}</div>
              <div style={{ fontSize: 14 }}>{t.base}</div>
              <div style={{ fontSize: 14, color: '#94a3b8' }}>— {t.high}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{t.seer}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{t.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>💰 Get Your DFW Cost Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select size...</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select situation...</option>
                {situations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {estimate && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Recommended: {estimate.ton} system</div>
              <div style={{ fontSize: 18, marginBottom: 8 }}>Estimated cost: <strong>{estimate.low} – {estimate.high}</strong></div>
              {estimate.adjustment && <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>⚠️ {estimate.adjustment}</div>}
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{estimate.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Get 3 DFW HVAC Quotes — Free Through ProLnk</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Compare licensed DFW contractors. No pressure, no markup.</div>
        </div>
      </div>
    </div>
  );
}
