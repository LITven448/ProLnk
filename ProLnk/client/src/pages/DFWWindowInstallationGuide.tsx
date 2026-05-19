import { useState } from 'react';

const FRAME_MATERIALS = [
  { id: 'vinyl', label: 'Vinyl', costMult: 1.0, note: 'Best value for DFW heat — no warping, no painting' },
  { id: 'fiberglass', label: 'Fiberglass', costMult: 1.45, note: 'Premium choice — strongest, best thermal performance' },
  { id: 'wood', label: 'Wood', costMult: 1.6, note: 'Classic look — requires upkeep in DFW humidity swings' },
];

const GLASS_TIERS = [
  { id: 'double', label: 'Double Pane Low-E', costPerWindow: 380, shgc: 0.25, uFactor: 0.27, annualSavings: 180 },
  { id: 'double_premium', label: 'Double Pane Low-E + Argon', costPerWindow: 470, shgc: 0.20, uFactor: 0.22, annualSavings: 230 },
  { id: 'triple', label: 'Triple Pane Low-E + Argon', costPerWindow: 640, shgc: 0.15, uFactor: 0.15, annualSavings: 260 },
];

const INSTALLATION_TYPES = [
  { id: 'insert', label: 'Insert / Pocket Replacement', laborPerWindow: 120, note: 'Fits into existing frame — faster, lower cost' },
  { id: 'full_frame', label: 'Full-Frame Replacement', laborPerWindow: 220, note: 'Remove everything — required if frame is rotted or damaged' },
];

export default function DFWWindowInstallationGuide() {
  const [windowCount, setWindowCount] = useState(10);
  const [frame, setFrame] = useState('vinyl');
  const [glass, setGlass] = useState('double');
  const [installType, setInstallType] = useState('insert');

  const selectedFrame = FRAME_MATERIALS.find(f => f.id === frame)!;
  const selectedGlass = GLASS_TIERS.find(g => g.id === glass)!;
  const selectedInstall = INSTALLATION_TYPES.find(i => i.id === installType)!;

  const materialCost = selectedGlass.costPerWindow * selectedFrame.costMult * windowCount;
  const laborCost = selectedInstall.laborPerWindow * windowCount;
  const totalCost = Math.round(materialCost + laborCost);
  const annualSavings = Math.round(selectedGlass.annualSavings * windowCount * 0.7);
  const paybackYears = (totalCost / annualSavings).toFixed(1);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF4', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            DFW WINDOW GUIDE
          </span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
          🪟 Window Installation Guide — Dallas–Fort Worth
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36 }}>
          DFW summers hit 100°F+ for weeks at a time. Choosing the wrong window means your AC runs constantly and your energy bill skyrockets. Here's what actually matters for Texas homes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            { icon: '☀️', title: 'SHGC Rating Critical in DFW', body: 'Solar Heat Gain Coefficient below 0.25 is essential. DFW receives intense southwest solar radiation — the wrong glass turns your home into a greenhouse.' },
            { icon: '🔲', title: 'Double Pane is the DFW Sweet Spot', body: 'Triple pane adds marginal benefit in DFW — our winters are mild. Double pane Low-E with argon is the most cost-effective choice for 90% of DFW homes.' },
            { icon: '🏠', title: 'Insert vs Full-Frame', body: 'Insert replacement works when frames are solid. Full-frame is required for rot, major damage, or if you’re changing window size. Full-frame costs 40–60% more in labor.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#1E2D45', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 20, fontSize: 18 }}>🔢 Frame Materials for Texas Heat</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ color: '#94A3B8', borderBottom: '1px solid #2D3F57′ }}>
                  {['Material', 'DFW Performance', 'Maintenance', 'Cost Factor'].map(h => (
                    <th key={h} style={{ textAlign: 'left', paddingBottom: 10, paddingRight: 16 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Vinyl', '⭐⭐⭐⭐ Excellent — no expansion issues', 'None', '1×'],
                  ['Fiberglass', '⭐⭐⭐⭐⭐ Best — matches glass expansion', 'Minimal', '1.45×'],
                  ['Wood', '⭐⭐⭐ Good — needs treatment for humidity', 'Annual sealing', '1.6×'],
                  ['Aluminum', '⭐⭐ Poor — conducts heat into home', 'Low', '0.85×'],
                ].map(row => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #16213A' }}>
                    {row.map((cell, i) => (
                      <td key={i} style={{ padding: '10px 16px 10px 0', color: i === 0 ? '#E8EDF4′ : '#94A3B8' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#131F33', border: '1.5px solid #F5E642', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>💰 Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Number of Windows</label>
              <input type="number" min={1} max={50} value={windowCount}
                onChange={e => setWindowCount(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#F5E642', fontSize: 18, fontWeight: 700, width: '100%' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Installation Type</label>
              <select value={installType} onChange={e => setInstallType(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {INSTALLATION_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedInstall.note}</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Frame Material</label>
              <select value={frame} onChange={e => setFrame(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {FRAME_MATERIALS.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{selectedFrame.note}</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Glass Package</label>
              <select value={glass} onChange={e => setGlass(e.target.value)}
                style={{ background: '#1E2D45', border: '1px solid #2D3F57', borderRadius: 8, padding: '10px 14px', color: '#E8EDF4', fontSize: 14, width: '100%' }}>
                {GLASS_TIERS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>SHGC {selectedGlass.shgc} · U-Factor {selectedGlass.uFactor}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Total Installed Cost', value: `$${totalCost.toLocaleString()}`, sub: `$${Math.round(totalCost / windowCount).toLocaleString()} per window` },
              { label: 'Est. Annual Energy Savings', value: `$${annualSavings.toLocaleString()}`, sub: 'Based on avg DFW utility rates' },
              { label: 'Simple Payback', value: `${paybackYears} yrs`, sub: 'Excludes rebates & tax credits' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>{stat.value}</div>
                <div style={{ color: '#64748B', fontSize: 11, marginTop: 4 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 16 }}>✅ Energy Star Requirements for DFW (North-Central Climate Zone)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { label: 'U-Factor', value: '≤ 0.27′ },
              { label: 'SHGC', value: '≤ 0.25′ },
              { label: 'Air Leakage', value: '≤ 0.3 cfm/ft²′ },
              { label: 'VT (Visible Light)', value: '≥ 0.40 recommended' },
            ].map(req => (
              <div key={req.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{req.label}</div>
                <div style={{ color: '#22C55E', fontWeight: 700, fontSize: 16, marginTop: 4 }}>{req.value}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
