import { useState } from 'react';

const requiredInDFW = [
  { item: '📋 Foundation documentation', reason: 'Texas law and DFW buyers always require this — cannot skip' },
  { item: '⚡ Electrical panel condition disclosure', reason: 'Required on seller disclosure; major issues must be addressed or disclosed' },
  { item: '💧 Active water leaks or damage', reason: 'Any active issue must be disclosed; buyers will find it in inspection' },
  { item: '🌡️ HVAC functionality', reason: 'DFW summer — non-functional AC is a deal-killer, not negotiating chip' },
];

const repairMatrix = [
  { repair: 'Foundation crack documentation', fix: 'Always required', asIs: '❌ Cannot skip', cost: '$300–$800 report' },
  { repair: 'Roof over 15 years old', fix: 'Helps significantly', asIs: 'Price $8–15K lower', cost: '$9,000–$18,000' },
  { repair: 'HVAC non-functional', fix: 'Essential in DFW', asIs: 'Price $6–10K lower', cost: '$4,000–$12,000' },
  { repair: 'Outdated kitchen', fix: 'Optional', asIs: 'Minimal discount', cost: '$15,000–$40,000+' },
  { repair: 'Old carpet throughout', fix: 'Low cost, high impact', asIs: 'Price $3–5K lower', cost: '$2,000–$6,000' },
  { repair: 'Pool equipment issues', fix: 'Helpful', asIs: 'Price $2–5K lower', cost: '$1,500–$8,000' },
];

export default function DFWRepairOrSellAsIsGuide() {
  const [condition, setCondition] = useState('fair');
  const [repairs, setRepairs] = useState('minor');
  const [timeline, setTimeline] = useState('flexible');

  const recommend = () => {
    if (condition === 'poor' && repairs === 'major' && timeline === 'urgent') return { action: 'Sell As-Is to Investor', color: '#e74c3c', detail: 'DFW has active iBuyer and cash investor market. Price 10–20% below ARV and close in 14–21 days. Skip the headache.' };
    if (timeline === 'urgent') return { action: 'Price Low, Sell Fast', color: '#e67e22', detail: 'List 5–10% below market. DFW investors and bargain buyers move fast. Expect multiple offers within days.' };
    if (repairs === 'minor' || condition === 'good') return { action: 'Fix and List for Top Dollar', color: '#27ae60', detail: 'Your repairs are manageable. Spend $5–15K on targeted fixes and list at full market value. Strong DFW demand will reward prep.' };
    return { action: 'Selective Repairs + Hybrid Pricing', color: '#2980b9', detail: 'Fix the required items (foundation docs, HVAC, roof) and price reflecting remaining condition. Attract both retail and investor buyers.' };
  };

  const rec = recommend();

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0A1628', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>⚖️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '12px 0 8px' }}>
            Repair vs Sell As-Is Guide — DFW
          </h1>
          <p style={{ color: '#aaa', fontSize: 16 }}>DFW has both strong retail buyers and active cash investors. Know your best path before you decide.</p>
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📊 Your Situation</h2>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Property Condition', key: 'condition', val: condition, set: setCondition, options: [['good', 'Good — minor cosmetic only'], ['fair', 'Fair — needs work but livable'], ['poor', 'Poor — significant issues']] },
              { label: 'Repair Scope', key: 'repairs', val: repairs, set: setRepairs, options: [['minor', 'Minor — under $10K'], ['moderate', 'Moderate — $10–30K'], ['major', 'Major — $30K+']] },
              { label: 'Timeline', key: 'timeline', val: timeline, set: setTimeline, options: [['urgent', 'Urgent — need out fast'], ['normal', 'Normal — 60–90 days'], ['flexible', 'Flexible — take my time']] },
            ].map((f, i) => (
              <div key={i} style={{ flex: 1, minWidth: 200 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#aaa', display: 'block', marginBottom: 8 }}>{f.label}</label>
                <select value={f.val} onChange={e => f.set(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #2a3a54', fontSize: 14, background: '#0A1628', color: '#fff' }}>
                  {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, background: rec.color + '22', border: `2px solid ${rec.color}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: rec.color, marginBottom: 8 }}>Recommendation: {rec.action}</div>
            <div style={{ fontSize: 15, color: '#ccc', lineHeight: 1.6 }}>{rec.detail}</div>
          </div>
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚠️ DFW Non-Negotiables</h2>
          {requiredInDFW.map((r, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: i < requiredInDFW.length - 1 ? '1px solid #1e3050' : 'none' }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{r.item}</div>
              <div style={{ fontSize: 14, color: '#aaa' }}>{r.reason}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132036', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>💡 Fix vs As-Is Financial Analysis</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr>
                  {['Issue', 'If You Fix', 'If As-Is', 'Fix Cost'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, color: '#888', fontWeight: 600, borderBottom: '1px solid #1e3050' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {repairMatrix.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e3050' }}>
                    <td style={{ padding: '12px 14px', fontSize: 14, color: '#fff', fontWeight: 600 }}>{r.repair}</td>
                    <td style={{ padding: '12px 14px', fontSize: 14, color: '#4ade80' }}>{r.fix}</td>
                    <td style={{ padding: '12px 14px', fontSize: 14, color: '#f87171' }}>{r.asIs}</td>
                    <td style={{ padding: '12px 14px', fontSize: 14, color: '#F5E642' }}>{r.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
