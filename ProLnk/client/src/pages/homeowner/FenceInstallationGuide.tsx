import { useState } from 'react';

const NAVY = '#0A1628';
const YELLOW = '#F5E642';
const MUTED = '#7A8BA8';
const BORDER = '#1E2E45';
const CARD = '#0D1F35';

const materials = [
  { type: 'Wood', priceRange: '$15–25/ft', lifespan: '15–20 yrs', maintenance: 'High', hoaOk: true, clayOk: false, icon: '🌲' },
  { type: 'Vinyl', priceRange: '$20–35/ft', lifespan: '20–30 yrs', maintenance: 'Low', hoaOk: true, clayOk: true, icon: '🪟' },
  { type: 'Wrought Iron', priceRange: '$25–45/ft', lifespan: '50+ yrs', maintenance: 'Medium', hoaOk: true, clayOk: true, icon: '⚙️' },
  { type: 'Chain Link', priceRange: '$8–15/ft', lifespan: '15–25 yrs', maintenance: 'Low', hoaOk: false, clayOk: true, icon: '🔗' },
  { type: 'Aluminum', priceRange: '$20–30/ft', lifespan: '30+ yrs', maintenance: 'Low', hoaOk: true, clayOk: true, icon: '✨' },
  { type: 'Cedar', priceRange: '$18–28/ft', lifespan: '20–25 yrs', maintenance: 'Medium', hoaOk: true, clayOk: false, icon: '🌿' },
];

const clayTips = [
  { tip: 'Concrete footings required', detail: 'Clay soil shifts — standard driven posts will lean within 2–3 years.' },
  { tip: 'Set posts 36–42 inches deep', detail: 'DFW frost line is shallow but clay expansion demands extra depth.' },
  { tip: 'Allow expansion gaps', detail: 'Wood panels need ½" gaps. Clay-induced movement will buckle tight installs.' },
  { tip: 'Grade away from fence base', detail: 'Standing water accelerates wood rot and clay heave.' },
];

export default function FenceInstallationGuide() {
  const [feet, setFeet] = useState(150);
  const [material, setMaterial] = useState('Vinyl');
  const [gates, setGates] = useState(2);
  const [demo, setDemo] = useState(false);
  const [hoa, setHoa] = useState(false);

  const mat = materials.find(m => m.type === material) || materials[1];
  const [loPrice, hiPrice] = mat.priceRange.replace('$','').split('–').map(s => parseFloat(s));
  const gateCost = gates * 300;
  const demoCost = demo ? feet * 3 : 0;
  const hoaCost = hoa ? 150 : 0;
  const lo = Math.round((feet * loPrice + gateCost + demoCost + hoaCost) / 100) * 100;
  const hi = Math.round((feet * hiPrice + gateCost + demoCost + hoaCost) / 100) * 100;
  const roiValue = Math.round((lo + hi) / 2 * 0.65);

  return (
    <div style={{ background: NAVY, minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: YELLOW, margin: '0 0 12px' }}>
            DFW Fence Installation Guide
          </h1>
          <p style={{ color: MUTED, fontSize: 18, lineHeight: 1.6 }}>
            Material comparison, DFW clay soil tips, and an interactive cost estimator
          </p>
        </div>

        {/* Materials Table */}
        <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: YELLOW, fontSize: 22, fontWeight: 700, marginTop: 0 }}>📊 Material Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                  {['Material', 'Cost/Linear Ft', 'Lifespan', 'Maintenance', 'HOA-Friendly', 'Clay-OK'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: MUTED }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => (
                  <tr key={m.type} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '12px', color: YELLOW }}>{m.icon} {m.type}</td>
                    <td style={{ padding: '12px' }}>{m.priceRange}</td>
                    <td style={{ padding: '12px' }}>{m.lifespan}</td>
                    <td style={{ padding: '12px' }}>{m.maintenance}</td>
                    <td style={{ padding: '12px' }}>{m.hoaOk ? '✅' : '❌'}</td>
                    <td style={{ padding: '12px' }}>{m.clayOk ? '✅' : '⚠️'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clay Soil Warning */}
        <div style={{ background: '#1a0a00', border: '1px solid #5a2d00', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#FF8C00', fontSize: 22, fontWeight: 700, marginTop: 0 }}>⚠️ DFW Clay Soil — What Every Homeowner Must Know</h2>
          <p style={{ color: MUTED, marginBottom: 20 }}>North Texas expansive clay soil (Blackland Prairie) is the #1 cause of fence failures in DFW. Ignore this and your fence will lean, crack, or heave within years.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {clayTips.map(t => (
              <div key={t.tip} style={{ background: 'rgba(255,140,0,0.08)', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#FF8C00', fontWeight: 700, marginBottom: 6 }}>🔶 {t.tip}</div>
                <div style={{ color: MUTED, fontSize: 14 }}>{t.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HOA Note */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: YELLOW, fontSize: 20, fontWeight: 700, marginTop: 0 }}>📋 HOA Considerations</h2>
          <ul style={{ color: MUTED, lineHeight: 2, paddingLeft: 20 }}>
            <li>Most DFW HOAs require pre-approval before any fence installation</li>
            <li>Common restrictions: max height 6ft, approved materials/colors only</li>
            <li>Chain link is banned in most HOA communities</li>
            <li>Corner lots often have setback requirements (25–30ft from street)</li>
            <li>Get approval in writing before signing any contractor contract</li>
          </ul>
        </div>

        {/* Cost Estimator */}
        <div style={{ background: CARD, borderRadius: 16, border: `1px solid ${BORDER}`, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: YELLOW, fontSize: 22, fontWeight: 700, marginTop: 0 }}>💰 DFW Fence Cost Estimator</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: MUTED, marginBottom: 8, fontSize: 14 }}>Linear Feet: <strong style={{ color: '#fff' }}>{feet}</strong></label>
              <input type="range" min={50} max={600} step={10} value={feet} onChange={e => setFeet(+e.target.value)}
                style={{ width: '100%', accentColor: YELLOW }} />
            </div>
            <div>
              <label style={{ display: 'block', color: MUTED, marginBottom: 8, fontSize: 14 }}>Material</label>
              <select value={material} onChange={e => setMaterial(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: `1px solid ${BORDER}`, color: '#fff', padding: '10px', borderRadius: 8 }}>
                {materials.map(m => <option key={m.type}>{m.type}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: MUTED, marginBottom: 8, fontSize: 14 }}>Number of Gates: <strong style={{ color: '#fff' }}>{gates}</strong></label>
              <input type="range" min={0} max={6} step={1} value={gates} onChange={e => setGates(+e.target.value)}
                style={{ width: '100%', accentColor: YELLOW }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label style={{ color: MUTED, fontSize: 14, display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={demo} onChange={e => setDemo(e.target.checked)} style={{ accentColor: YELLOW }} />
                Remove existing fence (+$3/ft)
              </label>
              <label style={{ color: MUTED, fontSize: 14, display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={hoa} onChange={e => setHoa(e.target.checked)} style={{ accentColor: YELLOW }} />
                HOA permit/review fee (~$150)
              </label>
            </div>
          </div>

          <div style={{ background: NAVY, borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ color: MUTED, marginBottom: 8, fontSize: 14 }}>Estimated Total — {material} fence, {feet} linear ft</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: YELLOW }}>${lo.toLocaleString()} – ${hi.toLocaleString()}</div>
            <div style={{ color: MUTED, fontSize: 13, marginTop: 8 }}>
              {gates > 0 && `${gates} gate${gates > 1 ? 's' : ''} (+$${(gates*300).toLocaleString()}) · `}
              {demo && `Demo (+$${demoCost.toLocaleString()}) · `}
              Avg home value increase: ~${roiValue.toLocaleString()}
            </div>
          </div>
          {!mat.clayOk && (
            <div style={{ marginTop: 12, background: '#1a0a00', borderRadius: 8, padding: 12, color: '#FF8C00', fontSize: 13 }}>
              ⚠️ {material} fencing may not perform well in DFW clay soil without proper footing. Consider vinyl or metal alternatives.
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: CARD, borderRadius: 16, padding: 32, border: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#fff', margin: '0 0 8px' }}>Get quotes from DFW-vetted fence pros</h3>
          <p style={{ color: MUTED, marginBottom: 20 }}>All ProLnk contractors are background-checked and licensed. Get 3 quotes in 24 hours.</p>
          <a href="/" style={{ background: YELLOW, color: NAVY, padding: '14px 32px', borderRadius: 50, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}
