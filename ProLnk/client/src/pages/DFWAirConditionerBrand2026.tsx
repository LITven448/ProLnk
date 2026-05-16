import { useState } from 'react';

export default function DFWAirConditionerBrand2026() {
  const [budget, setBudget] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<null | { brand: string; model: string; seer: string; cost: string; warranty: string; notes: string }>(null);

  function calculate() {
    if (!budget || !homeSize || !priority) return;
    let brand = '', model = '', seer = '', cost = '', warranty = '', notes = '';
    const sq = parseInt(homeSize);
    if (priority === 'reliability') {
      if (budget === 'value') {
        brand = 'Lennox'; model = 'Merit Series ML14XC1'; seer = '14–16 SEER2'; cost = sq < 2000 ? '$4,500–$6,500' : '$6,500–$9,000';
        warranty = '5-year parts, 10-year compressor';
        notes = 'Lennox has the largest DFW dealer network — critical for warranty service. ML14 runs 3,000+ hours/year in DFW, proven track record.';
      } else {
        brand = 'Trane'; model = 'XR15 or XV20i'; seer = '15–22 SEER2'; cost = sq < 2000 ? '$6,000–$9,000' : '$9,000–$14,000';
        warranty = '10-year registered parts + compressor';
        notes = 'Trane "Nothing Stops a Trane" reputation holds in DFW. XV20i variable-speed handles continuous DFW summer operation without cycling stress.';
      }
    } else if (priority === 'efficiency') {
      if (budget === 'value') {
        brand = 'Carrier'; model = 'Performance 16 (24ACC6)'; seer = '16 SEER2'; cost = sq < 2000 ? '$5,000–$7,500' : '$7,500–$10,500';
        warranty = '5-year parts, 10-year compressor';
        notes = 'Carrier offers best efficiency at mid-price. At DFW 100°F+, SEER2 ratings drop — a 16 SEER2 unit performs like 13–14 in peak summer. Still top-tier at this budget.';
      } else {
        brand = 'Daikin'; model = 'DX20VC (variable capacity)'; seer = '21–24.5 SEER2'; cost = sq < 2000 ? '$7,500–$11,000' : '$11,000–$16,000';
        warranty = '12-year parts + labor via Daikin Comfort Pro';
        notes = 'Daikin variable-capacity excels in DFW — modulates 25–100% output so it never short-cycles. Best humidity control in DFW summer. Growing dealer network in Metroplex.';
      }
    } else {
      brand = 'Carrier'; model = 'Infinity 24 with Infinity Control'; seer = '21 SEER2'; cost = sq < 2000 ? '$8,000–$12,000' : '$12,000–$18,000';
      warranty = '10-year parts + compressor (registered)';
      notes = 'Infinity Control is best-in-class smart thermostat integration. Works with Alexa, Google, Apple Home. Predictive scheduling for DFW pre-cooling before peak rate hours (3–7pm).';
    }
    setResult({ brand, model, seer, cost, warranty, notes });
  }

  const brands = [
    { brand: 'Trane', dfwScore: '9.2/10', service: '✅ Excellent', heat: '✅ Proven', note: 'Most DFW techs trained on Trane' },
    { brand: 'Lennox', dfwScore: '9.0/10', service: '✅ Excellent', heat: '✅ Proven', note: 'Largest DFW dealer network' },
    { brand: 'Carrier', dfwScore: '8.8/10', service: '✅ Good', heat: '✅ Proven', note: 'Best mid-range efficiency' },
    { brand: 'Daikin', dfwScore: '8.5/10', service: '⚠️ Growing', heat: '✅ Excellent', note: 'Best variable-speed in heat' },
    { brand: 'Rheem', dfwScore: '7.8/10', service: '✅ Good', heat: '⚠️ Average', note: 'Good value, fewer premium options' },
    { brand: 'Goodman', dfwScore: '7.0/10', service: '⚠️ Variable', heat: '⚠️ Average', note: 'Budget option, higher failure rate' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>❄️</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW AC Brand Comparison 2026</h1>
        </div>
        <p style={{ color: '#9BAEC8', marginBottom: 28 }}>Which AC brands perform best in DFW's extreme operating conditions — 100°F+ for 3+ months/year.</p>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏆 DFW Brand Performance Rankings</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1A3055' }}>
                  {['Brand', 'DFW Score', 'Local Service', 'Heat Rating', 'DFW Notes'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#F5E642' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {brands.map(b => (
                  <tr key={b.brand} style={{ borderBottom: '1px solid #0A1628' }}>
                    <td style={{ padding: '9px 10px', color: '#E8EDF5', fontWeight: 700 }}>{b.brand}</td>
                    <td style={{ padding: '9px 10px', color: '#F5E642', fontWeight: 700 }}>{b.dfwScore}</td>
                    <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{b.service}</td>
                    <td style={{ padding: '9px 10px', color: '#9BAEC8' }}>{b.heat}</td>
                    <td style={{ padding: '9px 10px', color: '#9BAEC8', fontSize: 12 }}>{b.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your DFW Recommendation</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select budget...</option>
                <option value="value">Value ($4,500–$8,000 installed)</option>
                <option value="premium">Premium ($8,000–$18,000 installed)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Home Size (sq ft)</label>
              <input type="number" placeholder="e.g. 2200" value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BAEC8', marginBottom: 8, fontSize: 14 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', background: '#0A1628', border: '1px solid #1A3055', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select priority...</option>
                <option value="reliability">Reliability / Longevity</option>
                <option value="efficiency">Energy Efficiency / Low Bills</option>
                <option value="smart">Smart Features / Automation</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ padding: '14px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>
              Get DFW Recommendation →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Recommended Brand</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20, marginTop: 2 }}>{result.brand}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Model</span><div style={{ color: '#E8EDF5', fontWeight: 600, marginTop: 2 }}>{result.model}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Efficiency Rating</span><div style={{ color: '#E8EDF5', marginTop: 2 }}>{result.seer}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Installed Cost (DFW)</span><div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{result.cost}</div></div>
                <div><span style={{ color: '#9BAEC8', fontSize: 13 }}>Warranty</span><div style={{ color: '#E8EDF5', marginTop: 2 }}>{result.warranty}</div></div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#9BAEC8', fontSize: 12, marginBottom: 4 }}>📍 DFW Notes</div>
                  <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>{result.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p style={{ color: '#4A6080', fontSize: 13, textAlign: 'center' }}>Costs are DFW market estimates for full system replacement. Get 3 licensed HVAC quotes.</p>
      </div>
    </div>
  );
}
