import { useState } from 'react';

const surfaces = [
  { id: 'driveway', label: 'Driveway', psi: '2500-3000', freq: 'Annually', baseRate: 0.15 },
  { id: 'siding', label: 'Siding', psi: '500-800 (soft wash)', freq: 'Every 1-2 years', baseRate: 0.12 },
  { id: 'deck', label: 'Wood Deck', psi: '500-600', freq: 'Annually', baseRate: 0.20 },
  { id: 'roof', label: 'Roof (soft wash only)', psi: '150-300 soft wash', freq: 'Every 2-3 years', baseRate: 0.25 },
  { id: 'fence', label: 'Fence', psi: '1500-2000', freq: 'Every 1-2 years', baseRate: 0.10 },
  { id: 'pool_deck', label: 'Pool Deck', psi: '2000-2500', freq: 'Twice yearly', baseRate: 0.18 },
];

export default function DFWPressureWashingGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sqft, setSqft] = useState('');

  const toggleSurface = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const selectedData = surfaces.filter(s => selected.includes(s.id));
  const area = parseInt(sqft) || 0;
  const totalCost = selectedData.reduce((sum, s) => sum + s.baseRate * (area || 500), 0);
  const lowCost = Math.round(totalCost * 0.85);
  const highCost = Math.round(totalCost * 1.15);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🚿</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Services Guide</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Pressure Washing Guide for DFW
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            DFW's clay soil, spring pollen, and scorching summers create unique pressure washing challenges. This guide covers every surface, seasonal timing, and true cost ranges across the Metroplex.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🌧️ Why DFW is Different</h2>
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054′ }}>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: '0 0 12px' }}>
              Dallas-Fort Worth's expansive clay soil migrates onto every hard surface after rain, leaving distinctive red-brown staining. Combined with heavy spring pollen (cedar, oak, and elm), surfaces here get dirty 2-3x faster than in drier climates.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#E8EDF5′ }}>Best seasons to wash:</strong> Early March (before peak pollen) and late October (after leaf fall, before freeze risk). Avoid July-August heat — soap dries too fast on hot surfaces.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📋 Surface Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {surfaces.map(s => (
            <div key={s.id} style={{ background: '#111E33', border: '1px solid #1E3054', borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#E8EDF5′ }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>💨 PSI: {s.psi}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>🔄 Frequency: {s.freq}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 14, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🧮 Cost Estimator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20, margin: '0 0 20px' }}>Select surface types and enter your property size for a DFW cost estimate.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {surfaces.map(s => (
              <button
                key={s.id}
                onClick={() => toggleSurface(s.id)}
                style={{
                  padding: '8px 14px', borderRadius: 20, border: '2px solid',
                  borderColor: selected.includes(s.id) ? '#F5E642′ : '#1E3054',
                  background: selected.includes(s.id) ? '#F5E642′ : ’transparent',
                  color: selected.includes(s.id) ? '#0A1628′ : '#94A3B8',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer'
                }}
              >{s.label}</button>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Total square footage of surfaces to wash</label>
            <input
              type="number"
              placeholder="e.g. 800″
              value={sqft}
              onChange={e => setSqft(e.target.value)}
              style={{ background: '#0A1628', border: '1px solid #1E3054', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15, width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          {selected.length > 0 && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3054′ }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Estimated DFW Cost Range</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>${lowCost} – ${highCost}</div>
              {selectedData.map(s => (
                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: 13, padding: '4px 0', borderTop: '1px solid #1E3054′ }}>
                  <span>{s.label}</span>
                  <span style={{ color: '#E8EDF5′ }}>Recommended PSI: {s.psi}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, border: '1px solid #1E3054′ }}>
          <h3 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚠️ DFW-Specific Warnings</h3>
          <ul style={{ color: '#94A3B8', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Never pressure wash roofs above 500 PSI — DFW contractors who do this void your shingle warranty</li>
            <li>Clay stains on concrete often need pre-treatment with alkaline degreaser before washing</li>
            <li>Freeze risk: don't wash decks or wood fences within 48 hrs of forecast freeze (November-February)</li>
            <li>Pool decks: use 2000 PSI max to avoid lifting coping stones common in DFW pools</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
