import { useState } from 'react';

const movements = [
  'One corner lower than others',
  'Two adjacent corners lower',
  'Center higher than edges (doming)',
  'All corners lowering evenly',
  'One side tilting, one side stable',
];

function assess(movement: string) {
  const map: Record<string, { type: string; severity: string; urgency: string; engineer: string; detail: string }> = {
    'One corner lower than others': { type: 'Differential', severity: 'High', urgency: '🔴 Act within 30 days', engineer: 'Structural engineer required before repair', detail: 'Corner drop causes concentrated shear stress — most damaging pattern in DFW clay. Check interior diagonal cracking.' },
    'Two adjacent corners lower': { type: 'Differential', severity: 'Medium-High', urgency: '🟠 Act within 60 days', engineer: 'Structural engineer recommended', detail: 'Side differential creates torsion in the slab. More common after DFW drought seasons on outer zones.' },
    'Center higher than edges (doming)': { type: 'Differential', severity: 'Medium', urgency: '🟡 Monitor quarterly', engineer: 'Engineer consult useful', detail: 'Heaving at center from interior moisture or plumbing leak. Edges dry while center stays wet — DFW common after interior slab leak.' },
    'All corners lowering evenly': { type: 'Uniform', severity: 'Low', urgency: '🟢 Monitor annually', engineer: 'Not required unless >2 inches', detail: 'Uniform settlement is less structurally damaging. May still require cosmetic repairs. DFW clay consolidation over decades.' },
    'One side tilting, one side stable': { type: 'Differential', severity: 'High', urgency: '🔴 Act within 30 days', engineer: 'Structural engineer required', detail: 'Half-slab differential is severe — often caused by DFW drainage failure on one side. Engineer needed to rule out foundation failure.' },
  };
  return map[movement];
}

export default function DFWFoundationDifferentialGuide() {
  const [movement, setMovement] = useState('');
  const result = movement ? assess(movement) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Differential Movement Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          Differential settlement — where one part of your foundation moves more than another — is far more damaging than uniform settlement. DFW clay makes homes especially vulnerable to this pattern.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>⚖️</div>
            <h3 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Differential Settlement</h3>
            <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7 }}>One area moves more than another. Creates shear forces, diagonal cracking, binding doors. Requires more piers, more cost.</p>
          </div>
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📉</div>
            <h3 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Uniform Settlement</h3>
            <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7 }}>Whole slab drops together. Cosmetic impact mainly. Less structural risk. More common in compact DFW subdivisions.</p>
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Movement Assessor</h2>
          <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>DESCRIBE THE MOVEMENT PATTERN</label>
          <select value={movement} onChange={e => setMovement(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14, marginBottom: 20 }}>
            <option value=''>Select movement description</option>
            {movements.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          {result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>TYPE</div>
                  <div style={{ color: result.type === 'Differential' ? '#F87171' : '#34D399', fontWeight: 700, fontSize: 16 }}>{result.type}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SEVERITY</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{result.severity}</div>
                </div>
              </div>
              <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{result.urgency}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{result.engineer}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7 }}>{result.detail}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>📐 DFW Action Thresholds</h2>
          {[['&lt;0.5"', 'Monitor', '#34D399'], ['0.5–1"', 'Annual engineer review', '#F5E642'], ['1–2"', 'Repair planning', '#FB923C'], ['&gt;2"', 'Urgent structural review', '#F87171']].map(([val, label, color]) => (
            <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{ background: color + '22', border: `1px solid ${color}`, borderRadius: 6, padding: '4px 10px', color: color, fontSize: 13, fontWeight: 700, minWidth: 60, textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: val }} />
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
