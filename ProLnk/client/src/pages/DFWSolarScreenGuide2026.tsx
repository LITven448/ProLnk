import { useState } from 'react';

export default function DFWSolarScreenGuide2026() {
  const [exposure, setExposure] = useState('west');
  const [sqft, setSqft] = useState(200);
  const [showROI, setShowROI] = useState(false);

  const exposureData: Record<string, { label: string; heatGain: number; priority: string; savings: number }> = {
    west: { label: 'West-Facing', heatGain: 90, priority: 'Highest — DFW afternoon sun is brutal west-facing.', savings: 35 },
    south: { label: 'South-Facing', heatGain: 80, priority: 'High — full-day sun exposure.', savings: 28 },
    east: { label: 'East-Facing', heatGain: 65, priority: 'Moderate — morning sun, less intense.', savings: 18 },
    north: { label: 'North-Facing', heatGain: 30, priority: 'Low — minimal direct sun in DFW.', savings: 8 },
  };

  const sel = exposureData[exposure];
  const installCost = sqft * 22;
  const annualSavings = sel.savings * 12;
  const payback = Math.round(installCost / annualSavings * 10) / 10;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌞 DFW SOLAR SCREEN GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Solar Screen Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Solar screens block 65–90% of heat gain — outperforming window film. Best ROI energy upgrade in DFW.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🔥', title: 'Heat Rejection 65–90%', desc: 'Exterior solar screens stop heat before it enters glass. Window film stops only 50–65% after glass absorption.' },
            { icon: '🕷', title: 'Fiberglass vs Aluminum Mesh', desc: 'Fiberglass: better visibility, no glare. Aluminum: more durable in DFW hail. Both work well for heat blocking.' },
            { icon: '🏘', title: 'HOA Approval Often Required', desc: 'Many DFW HOAs require approval. Submit mesh color and spec sheet. Charcoal and beige are most approved.' },
            { icon: '💵', title: 'Cost $15–30/sqft Installed', desc: 'Full home average $1,800–4,500. DFW labor adds premium in summer peak season — book spring or fall.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>☀️ Solar Screen ROI Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Sun Exposure Direction</label>
            <select value={exposure} onChange={(e) => setExposure(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              {Object.entries(exposureData).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Total Window Area (sqft): {sqft}</label>
            <input type="range" min={50} max={600} step={10} value={sqft} onChange={(e) => setSqft(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <button onClick={() => setShowROI(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Calculate ROI →</button>
          {showROI && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{sel.label} — {sqft} sqft</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>
                <div>🔥 Heat Block Rate: <span style={{ color: '#fff' }}>{sel.heatGain}%</span></div>
                <div>💵 Est. Install Cost: <span style={{ color: '#fff' }}>${installCost.toLocaleString()}</span></div>
                <div>💰 Est. Annual Savings: <span style={{ color: '#fff' }}>${annualSavings.toLocaleString()}</span></div>
                <div>📅 Payback Period: <span style={{ color: '#F5E642', fontWeight: 700 }}>{payback} years</span></div>
                <div style={{ marginTop: 8 }}>📌 Priority: {sel.priority}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📞 Get DFW Solar Screen Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with DFW-vetted solar screen installers. Compare quotes, verify HOA-approved colors, and get installed fast.</p>
        </div>
      </div>
    </div>
  );
}
