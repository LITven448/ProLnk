import { useState } from 'react';

const crackTypes = [
  { id: 'stair-step', emoji: '🧱', label: 'Stair-Step (Brick)', severity: 'Moderate–Serious', detail: 'Follows mortar joints diagonally. Common in DFW clay soil settlement. Width matters — under 1/4" monitor; over 1/4" call engineer.' },
  { id: 'horizontal', emoji: '↔️', label: 'Horizontal Cracks', severity: '🚨 Serious', detail: 'Horizontal cracks in block or poured walls indicate lateral soil pressure. This is the most dangerous pattern — call a structural engineer immediately.' },
  { id: 'diagonal', emoji: '↗️', label: 'Diagonal Cracks', severity: 'Moderate', detail: 'Diagonal cracks in corners often indicate differential settlement — one side sinking faster. DFW clay shrink/swell causes this seasonally.' },
  { id: 'hairline', emoji: '〰️', label: 'Hairline Cracks', severity: 'Low — Usually Normal', detail: 'Hairline cracks under 1/16" wide are extremely common in DFW due to clay soil movement and concrete curing. Monitor but usually not structural.' },
  { id: 'vertical', emoji: '⬆️', label: 'Vertical Cracks', severity: 'Low–Moderate', detail: 'Straight vertical cracks often result from concrete shrinkage. If width is uniform and not growing, typically cosmetic. If widening, monitor closely.' },
];

const dfwContext = [
  { emoji: '☀️', factor: 'Summer Drought', impact: 'DFW clay contracts dramatically in dry summers, causing foundation to settle unevenly — the most common crack trigger.' },
  { emoji: '🌧️', factor: 'Heavy Rain', impact: 'After drought, heavy rain causes rapid clay expansion and uplift, which can crack previously stable foundations.' },
  { emoji: '🌳', factor: 'Tree Roots', impact: 'Mature trees within 20 ft draw moisture from clay, accelerating differential drying and settlement.' },
  { emoji: '💧', factor: 'Drainage Issues', impact: 'Poor drainage directs water toward foundation, causing wet-side expansion vs dry-side contraction — creates diagonal cracking.' },
];

const assessMap: Record<string, Record<string, { severity: string; action: string; urgency: string; cost: string }>> = {
  'stair-step': {
    'hairline': { severity: 'Low', action: 'Monitor with tape markers. Re-check in 30 and 90 days. Caulk for moisture protection.', urgency: 'Monitor', cost: '$0–$50 DIY' },
    'quarter-inch': { severity: 'Moderate', action: 'Get a structural engineer evaluation. Do not wait. May need pier underpinning.', urgency: 'Schedule within 2 weeks', cost: '$500–$8,000' },
    'half-inch': { severity: '🚨 Serious', action: 'Call structural engineer this week. Avoid room if crack is widening rapidly.', urgency: 'This week', cost: '$5,000–$20,000' },
  },
  'horizontal': {
    'hairline': { severity: 'Serious', action: 'Horizontal is always a red flag. Call engineer even if small — lateral pressure pattern.', urgency: 'Within 1 week', cost: '$2,000–$15,000' },
    'quarter-inch': { severity: '🚨 Emergency', action: 'Structural failure risk. Call engineer immediately. Do not store items against this wall.', urgency: 'Immediately', cost: '$8,000–$30,000+' },
    'half-inch': { severity: '🚨 Emergency', action: 'Evacuate that area of home. Call structural engineer today. Wall may be compromised.', urgency: 'Today', cost: '$15,000–$50,000+' },
  },
  'diagonal': {
    'hairline': { severity: 'Low', action: 'Mark both ends of crack with pencil/date. Check again in 90 days for growth.', urgency: 'Monitor', cost: '$0 monitoring' },
    'quarter-inch': { severity: 'Moderate', action: 'Differential settlement likely. Get foundation inspection from licensed engineer.', urgency: 'Schedule within 30 days', cost: '$3,000–$12,000' },
    'half-inch': { severity: 'Serious', action: 'Active settlement. Call structural engineer. Check if doors/windows are sticking — confirms movement.', urgency: 'This week', cost: '$8,000–$20,000' },
  },
  'hairline': {
    'hairline': { severity: 'Very Low', action: 'Normal for DFW homes. Apply hydraulic cement or caulk for moisture. Monitor annually.', urgency: 'No urgency', cost: '$10–$50 DIY' },
    'quarter-inch': { severity: 'Low–Moderate', action: 'Wider than expected for hairline. Mark and monitor monthly. If grows, call engineer.', urgency: 'Monitor', cost: '$0–$200' },
    'half-inch': { severity: 'Moderate', action: 'No longer a hairline — reclassify. Get foundation inspection.', urgency: 'Schedule within 60 days', cost: '$500–$5,000' },
  },
};

export default function DFWFoundationCrackGuide() {
  const [crackType, setCrackType] = useState('');
  const [width, setWidth] = useState('');
  const result = crackType && width ? assessMap[crackType]?.[width] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏚️ Foundation Crack Assessment — DFW Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Not all cracks are equal. DFW expansive clay soil makes foundation movement common — learn to distinguish cosmetic from structural.</p>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🔍 Crack Pattern Reference</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {crackTypes.map(c => (
              <div key={c.id} style={{ background: '#132035', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{c.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.label}</div>
                    <div style={{ fontSize: 11, color: c.severity.includes('🚨') ? '#ef4444' : '#F5E642', fontWeight: 600 }}>{c.severity}</div>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🌍 DFW Climate Factors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {dfwContext.map(d => (
              <div key={d.factor} style={{ background: '#132035', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{d.emoji} {d.factor}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{d.impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 10, padding: 22, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📏 Severity Assessment Tool</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Crack pattern type?</label>
            <select value={crackType} onChange={e => setCrackType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select crack type...</option>
              <option value="stair-step">Stair-step (diagonal brick/block)</option>
              <option value="horizontal">Horizontal</option>
              <option value="diagonal">Diagonal (smooth wall)</option>
              <option value="hairline">Hairline / very thin</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Approximate crack width?</label>
            <select value={width} onChange={e => setWidth(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, fontSize: 14 }}>
              <option value="">Select width...</option>
              <option value="hairline">Hairline (credit card fits? No)</option>
              <option value="quarter-inch">Up to 1/4 inch (pencil fits)</option>
              <option value="half-inch">1/2 inch or wider</option>
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${result.severity.includes('🚨') ? '#ef4444' : '#F5E642'}` }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Severity: </span>{result.severity}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Action: </span>{result.action}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Urgency: </span>{result.urgency}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Est. Repair Cost: </span>{result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 14, fontSize: 13 }}>
          💧 <strong>Preventive Tip:</strong> Maintain consistent soil moisture around your foundation year-round. Soaker hoses during DFW droughts can prevent the dramatic shrink-swell cycles that cause most DFW foundation damage.
        </div>
      </div>
    </div>
  );
}
