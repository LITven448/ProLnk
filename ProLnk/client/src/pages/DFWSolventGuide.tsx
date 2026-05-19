import { useState } from 'react';

const solvents = [
  { residue: 'Oil-based paint', app: 'Brush cleanup', solvent: 'Mineral Spirits', warning: 'Flammable — no open flames', ventilation: 'Open windows + fan exhausting out' },
  { residue: 'Adhesive residue', app: 'Tile removal', solvent: 'Acetone', warning: 'Extremely flammable, fumes heavy', ventilation: 'Full cross-ventilation, wear respirator' },
  { residue: 'Grease/oil stains', app: 'Prep before painting', solvent: 'TSP (trisodium phosphate)', warning: 'Skin/eye irritant — wear gloves', ventilation: 'Outdoor or well-ventilated only' },
  { residue: 'Latex paint (wet)', app: 'Brush/roller cleanup', solvent: 'Warm water + soap', warning: 'None significant', ventilation: 'Standard indoor ventilation fine' },
  { residue: 'Caulk residue', app: 'Window/door resealing', solvent: 'Mineral Spirits or Rubbing Alcohol', warning: 'Flammable — keep away from sparks', ventilation: 'Open windows, fan exhausting out' },
  { residue: 'Epoxy drips', app: 'Uncured epoxy cleanup', solvent: 'Isopropyl Alcohol (90%+)', warning: 'Flammable — moderate risk', ventilation: 'Good airflow required' },
  { residue: 'Wood stain', app: 'Prep or spill cleanup', solvent: 'Mineral Spirits', warning: 'Flammable, dispose rags properly', ventilation: 'Outdoor preferred in DFW heat' },
];

const dfwNote = 'DFW summer heat accelerates evaporation — use solvents early morning to maximize working time and reduce fume concentration.';

export default function DFWSolventGuide() {
  const [residue, setResidue] = useState('');
  const [result, setResult] = useState<typeof solvents[0] | null>(null);

  function lookup() {
    const match = solvents.find(s => s.residue.toLowerCase().includes(residue.toLowerCase()));
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🧪 Solvent & Chemical Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, lineHeight: 1.6 }}>Right solvent for every DFW project. Safety warnings and ventilation requirements included.</p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 16, marginBottom: 32, fontSize: 14, color: '#F5E642' }}>
          ⚠️ {dfwNote}
        </div>

        <div style={{ background: '#111C2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Solvent</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Enter residue type (e.g. adhesive, paint...)"
              value={residue}
              onChange={e => setResidue(e.target.value)}
              style={{ flex: 1, minWidth: 220, background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}
            />
            <button onClick={lookup} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Recommend
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{result.solvent}</div>
              <div style={{ color: '#94A3B8', marginBottom: 6 }}>Application: {result.app}</div>
              <div style={{ color: '#F87171', marginBottom: 6 }}>⚠️ {result.warning}</div>
              <div style={{ color: '#34D399' }}>🌬️ Ventilation: {result.ventilation}</div>
            </div>
          )}
          {residue && !result && (
            <div style={{ marginTop: 16, color: '#94A3B8', fontSize: 14 }}>No match found — try terms like "paint", "adhesive", "grease", or "caulk".</div>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Full Solvent Reference</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {solvents.map((s, i) => (
            <div key={i} style={{ background: '#111C2E', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>{s.residue}</span>
                <span style={{ background: '#F5E64220', color: '#F5E642', borderRadius: 6, padding: '2px 10px', fontSize: 13, fontWeight: 600 }}>{s.solvent}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Use: {s.app}</div>
              <div style={{ color: '#F87171', fontSize: 13, marginBottom: 4 }}>⚠️ {s.warning}</div>
              <div style={{ color: '#34D399', fontSize: 13 }}>🌬️ {s.ventilation}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #1E3A5F', textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW Homeowner Resource · Always read product labels before use
        </div>
      </div>
    </div>
  );
}
