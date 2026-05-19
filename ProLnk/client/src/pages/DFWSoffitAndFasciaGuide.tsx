import { useState } from 'react';

const damageExtents = ['Minor (< 5 ft)', 'Moderate (5–20 ft)', 'Extensive (20+ ft)', 'Full Perimeter'];
const homeStyles = ['Brick Ranch', 'Two-Story Traditional', 'Craftsman', 'Modern Farmhouse'];

function getRecommendation(damage: string, style: string) {
  const replace = damage === 'Extensive (20+ ft)' || damage === 'Full Perimeter';
  const costs: Record<string, number> = {
    'Minor (< 5 ft)': 300,
    'Moderate (5–20 ft)': 900,
    'Extensive (20+ ft)': 2800,
    'Full Perimeter': 5500,
  };
  const materials: Record<string, string> = {
    'Brick Ranch': 'Aluminum (low-maintenance, matches brick)',
    'Two-Story Traditional': 'Vinyl (cost-effective, moisture-resistant)',
    'Craftsman': 'Engineered Wood (maintains character)',
    'Modern Farmhouse': 'Aluminum or Fiber Cement',
  };
  return {
    action: replace ? 'Full Replacement' : 'Repair',
    cost: costs[damage],
    material: materials[style],
    pestRisk: damage !== 'Minor (< 5 ft)',
  };
}

export default function DFWSoffitAndFasciaGuide() {
  const [damage, setDamage] = useState('');
  const [style, setStyle] = useState('');
  const result = damage && style ? getRecommendation(damage, style) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🏡 DFW Soffit & Fascia Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's humidity and summer storms make soffit and fascia one of the most frequently damaged exterior components on local homes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📐</div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>What Is Soffit?</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>The underside of your roof overhang. It covers the rafter tails and typically contains vents that allow attic airflow. When it rots or breaks, pests gain direct access to your attic.</div>
          </div>
          <div style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🪵</div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>What Is Fascia?</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>The vertical board running along the roof edge where gutters attach. It protects the rafter ends from moisture. In DFW, wood fascia is especially vulnerable during heavy rain seasons.</div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🐝 DFW-Specific Issues</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '💧', text: 'Moisture damage from DFW spring storms saturates wood fascia within 2–3 seasons if gutters aren\’t maintained.' },
              { icon: '🐿️', text: 'Squirrels and wasps commonly enter through even small gaps in damaged soffit — common complaint in North Dallas suburbs.' },
              { icon: '🌡️', text: 'Blocked soffit vents from paint or damage cause attic heat buildup, accelerating roof shingle deterioration in DFW summers.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🔨 Material Comparison</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[
              { mat: 'Aluminum', pros: 'No rot, lightweight, low-cost', cons: 'Can dent, limited styles' },
              { mat: 'Vinyl', pros: 'Moisture-proof, affordable', cons: 'Fades in DFW sun' },
              { mat: 'Wood', pros: 'Classic look, paintable', cons: 'Rots without maintenance' },
            ].map(m => (
              <div key={m.mat} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{m.mat}</div>
                <div style={{ color: '#4ade80', fontSize: '0.8rem', marginBottom: 2 }}>✅ {m.pros}</div>
                <div style={{ color: '#f87171', fontSize: '0.8rem' }}>⚠️ {m.cons}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Repair vs. Replace Estimator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Damage Extent</label>
              <select value={damage} onChange={e => setDamage(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select extent</option>
                {damageExtents.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Home Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select style</option>
                {homeStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Recommendation</div>
                  <div style={{ color: result.action === 'Repair' ? '#4ade80′ : '#facc15', fontSize: '1.1rem', fontWeight: 700 }}>{result.action}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Est. Cost</div>
                  <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700 }}>${result.cost.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pest Risk</div>
                  <div style={{ color: result.pestRisk ? '#f87171′ : '#4ade80', fontSize: '1.1rem', fontWeight: 700 }}>{result.pestRisk ? ’High' : 'Low'}</div>
                </div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', borderTop: '1px solid #1e3a5f', paddingTop: '0.75rem' }}>
                💡 <strong style={{ color: '#F5E642′ }}>Best Material:</strong> {result.material}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
