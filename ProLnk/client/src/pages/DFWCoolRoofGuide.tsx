import { useState } from 'react';

const roofOptions = [
  { color: 'Dark Brown/Black', tempReduction: 0, energyStar: false, label: 'Standard — absorbs maximum DFW heat' },
  { color: 'Medium Gray', tempReduction: 15, energyStar: false, label: 'Slight improvement over dark colors' },
  { color: 'Tan / Light Brown', tempReduction: 22, energyStar: true, label: 'HOA-friendly — most DFW HOAs allow' },
  { color: 'Light Gray', tempReduction: 28, energyStar: true, label: 'Good reflectivity — widely HOA-approved' },
  { color: 'White / Cream', tempReduction: 38, energyStar: true, label: 'Maximum cooling — some HOA restrictions' },
  { color: 'Metal Roofing', tempReduction: 40, energyStar: true, label: 'Best reflectivity — premium cost, 40-50yr life' },
];

export default function DFWCoolRoofGuide() {
  const [homeSqft, setHomeSqft] = useState('');
  const [currentColor, setCurrentColor] = useState('Dark Brown/Black');
  const [hoa, setHoa] = useState('yes');
  const [result, setResult] = useState<null | { tempDrop: number; annualSavings: number; options: typeof roofOptions; cost: string }>(null);

  function assess() {
    const sqft = parseFloat(homeSqft);
    if (!sqft) return;
    const current = roofOptions.find(r => r.color === currentColor)!;
    const available = hoa === 'yes'
      ? roofOptions.filter(r => r.color !== 'White / Cream' && r.tempReduction > current.tempReduction)
      : roofOptions.filter(r => r.tempReduction > current.tempReduction);
    const bestOption = available[available.length - 1] || current;
    const tempDrop = bestOption.tempReduction - current.tempReduction;
    const annualSavings = Math.round((sqft * 0.15) * tempDrop * 0.03);
    const roofCost = Math.round(sqft * 3.5);
    const metalRoofCost = Math.round(sqft * 9);
    const cost = bestOption.color === 'Metal Roofing'
      ? `Metal roof: $${metalRoofCost.toLocaleString()}–$${(metalRoofCost * 1.3).toLocaleString()} installed`
      : `Cool-color shingle replacement: $${roofCost.toLocaleString()}–$${(roofCost * 1.4).toLocaleString()} installed`;
    setResult({ tempDrop, annualSavings, options: available, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1F3C', padding: '48px 24px 36px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>☀️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Cool Roof Guide</h1>
          <p style={{ fontSize: 16, color: '#9BA8C0', margin: 0 }}>
            Light-colored and reflective roofing materials can drop DFW attic temperatures 30–40°F — cutting AC load and extending shingle life in our brutal summers.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>🏘️ DFW HOA Color Reality</h2>
          <ul style={{ color: '#9BA8C0', lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: '#E8EAF0′ }}>Most DFW HOAs allow:</strong> Tan, light brown, light gray — all Energy Star rated options</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Some allow:</strong> Light gray, weathered wood, driftwood (near-white tones)</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Often restricted:</strong> Bright white, highly reflective without approval</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Always check:</strong> Submit color sample to HOA architectural committee before purchase</li>
            <li><strong style={{ color: '#E8EAF0′ }}>Metal roofing:</strong> Typically requires HOA variance — but approval rates are increasing in DFW</li>
          </ul>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 16px' }}>📊 Cool Roof Options Comparison</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {roofOptions.map(opt => (
              <div key={opt.color} style={{ background: '#162040', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E8EAF0', fontWeight: 700, fontSize: 14 }}>{opt.color} {opt.energyStar ? '⭐' : ''}</div>
                  <div style={{ color: '#9BA8C0', fontSize: 12, marginTop: 3 }}>{opt.label}</div>
                </div>
                <div style={{ color: opt.tempReduction > 20 ? '#F5E642′ : '#9BA8C0', fontWeight: 700, fontSize: 13, textAlign: ’right', minWidth: 80 }}>
                  {opt.tempReduction > 0 ? `-${opt.tempReduction}°F` : 'Baseline'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔧 Cool Roof Upgrade Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Square Footage</label>
              <input type="number" value={homeSqft} onChange={e => setHomeSqft(e.target.value)} placeholder="e.g. 2400″
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Roof Color</label>
              <select value={currentColor} onChange={e => setCurrentColor(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                {roofOptions.map(o => <option key={o.color}>{o.color}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8C0', fontSize: 13, display: 'block', marginBottom: 6 }}>In a DFW HOA with color restrictions?</label>
              <select value={hoa} onChange={e => setHoa(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#162040', border: '1px solid #2A3F6F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
                <option value="yes">Yes — HOA restricted</option>
                <option value="no">No HOA / No restrictions</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Calculate Cool Roof Savings
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#162040', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>
                Estimated attic temp reduction: {result.tempDrop}°F | Annual energy savings: ~${result.annualSavings}
              </div>
              <div style={{ color: '#E8EAF0', marginBottom: 8 }}>
                {result.options.length > 0
                  ? `Best upgrade options for your situation: ${result.options.map(o => o.color).join(', ')}`
                  : 'You already have an optimal cool roof configuration.'}
              </div>
              <div style={{ color: '#9BA8C0', fontSize: 14 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
