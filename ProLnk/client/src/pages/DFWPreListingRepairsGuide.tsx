import { useState } from 'react';

type RepairType = 'Fresh Interior Paint' | 'Flooring Replacement' | 'HVAC Service/Repair' | 'Landscaping/Curb Appeal' | 'Kitchen Update' | 'Bathroom Refresh' | 'Foundation Repair' | 'Roof Repair';

const repairData: Record<RepairType, { roi: number; impact: string; recommendation: string; creditOk: boolean }> = {
  'Fresh Interior Paint': { roi: 107, impact: '+$3,000–$7,000 perceived value', recommendation: 'Always do it — highest ROI repair in DFW.', creditOk: false },
  'Flooring Replacement': { roi: 90, impact: '+$5,000–$12,000 perceived value', recommendation: 'Replace worn carpet before listing. LVP is DFW buyer favorite.', creditOk: false },
  'HVAC Service/Repair': { roi: 85, impact: 'Non-negotiable for DFW buyers', recommendation: 'Get a tune-up + service report. Buyers will ask for this in inspection.', creditOk: false },
  'Landscaping/Curb Appeal': { roi: 100, impact: '+$2,000–$5,000 first impression', recommendation: 'Mulch, mow, and plant seasonal color — DFW summers require maintenance.', creditOk: false },
  'Kitchen Update': { roi: 60, impact: '+$5,000–$20,000 perceived value', recommendation: 'Minor updates only (hardware, faucet, paint). Skip full remodel.', creditOk: true },
  'Bathroom Refresh': { roi: 70, impact: '+$2,000–$8,000 perceived value', recommendation: 'Regrout, replace fixtures. Skip full tile replacement.', creditOk: true },
  'Foundation Repair': { roi: 50, impact: 'Required disclosure in TX', recommendation: 'Get a structural engineer letter. Buyers expect it — transparency wins.', creditOk: true },
  'Roof Repair': { roi: 65, impact: 'Stops deals from falling through', recommendation: 'Patch obvious issues. Full replacement: negotiate credit if near end of life.', creditOk: true },
};

export default function DFWPreListingRepairsGuide() {
  const [repairType, setRepairType] = useState<RepairType | ''>('');
  const [cost, setCost] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    if (repairType && cost) setShowResult(true);
  };

  const getResult = () => {
    if (!repairType || !cost) return null;
    const data = repairData[repairType];
    const costNum = parseFloat(cost.replace(/[^0-9.]/g, ''));
    const gain = costNum * (data.roi / 100);
    const netBenefit = gain - costNum;
    return { ...data, costNum, gain, netBenefit };
  };

  const result = showResult ? getResult() : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔨</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Pre-Listing Repairs Guide
          </h1>
          <p style={{ fontSize: 18, color: '#9aa5b4', maxWidth: 600, margin: '0 auto' }}>
            Which repairs actually increase your sale price — and which are a waste of money in the DFW market.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, border: '1px solid #2a3a50′ }}>
            <h2 style={{ color: '#4ade80', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Do These First</h2>
            {['Fresh paint (neutral tones)', 'Deep clean + declutter', 'HVAC service + tune-up', 'Landscaping + mulch', 'Fix dripping faucets/leaks', 'Replace burned-out bulbs'].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <span style={{ color: '#4ade80', fontSize: 16 }}>✓</span>
                <span style={{ color: '#ccc', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, border: '1px solid #2a3a50′ }}>
            <h2 style={{ color: '#f87171', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>❌ Skip These</h2>
            {['Full kitchen remodel', 'Pool addition', 'Luxury bathroom upgrade', 'Converting garage to room', 'Adding a sunroom', 'High-end landscaping'].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <span style={{ color: '#f87171', fontSize: 16 }}>✗</span>
                <span style={{ color: '#ccc', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 28, marginBottom: 48, border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏗️ DFW-Specific Buyer Expectations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '❄️', title: 'HVAC is Non-Negotiable', desc: 'DFW summers hit 110°F. Buyers will walk if AC is questionable.' },
              { icon: '🏗️', title: 'Foundation Letters Are Common', desc: 'TX soil moves. A clean engineer letter builds buyer confidence.' },
              { icon: '🌿', title: 'Curb Appeal Drives Offers', desc: 'DFW buyers form opinions in 8 seconds at the curb.' },
              { icon: '🎨', title: 'Neutral Tones Sell Faster', desc: 'Greige, warm white, and soft gray dominate DFW buyer taste.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#9aa5b4′ }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1a2a40', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #2a3a50′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Repair vs Credit Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Repair Type</label>
              <select value={repairType} onChange={e => { setRepairType(e.target.value as RepairType); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #2a3a50', fontSize: 14 }}>
                <option value="">Select repair type</option>
                {Object.keys(repairData).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Estimated Repair Cost ($)</label>
              <input type="number" placeholder="e.g. 3500″ value={cost} onChange={e => { setCost(e.target.value); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #2a3a50', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} disabled={!repairType || !cost}
            style={{ padding: '12px 32px', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: repairType && cost ? 'pointer' : 'not-allowed', opacity: repairType && cost ? 1 : 0.5 }}>
            Get Repair Recommendation
          </button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#9aa5b4', fontSize: 12, marginBottom: 4 }}>YOUR COST</div>
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>${result.costNum.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#9aa5b4', fontSize: 12, marginBottom: 4 }}>SALE PRICE GAIN</div>
                  <div style={{ color: '#4ade80', fontSize: 22, fontWeight: 800 }}>+${Math.round(result.gain).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#9aa5b4', fontSize: 12, marginBottom: 4 }}>ROI</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.roi}%</div>
                </div>
              </div>
              <div style={{ padding: 16, backgroundColor: '#1a2a40', borderRadius: 8, marginBottom: 12 }}>
                <strong style={{ color: '#F5E642′ }}>📋 Impact: </strong>
                <span style={{ color: '#ccc', fontSize: 14 }}>{result.impact}</span>
              </div>
              <div style={{ padding: 16, backgroundColor: '#1a2a40', borderRadius: 8, marginBottom: 12 }}>
                <strong style={{ color: '#4ade80′ }}>💡 Recommendation: </strong>
                <span style={{ color: '#ccc', fontSize: 14 }}>{result.recommendation}</span>
              </div>
              {result.creditOk && (
                <div style={{ padding: 16, backgroundColor: '#1a1a3a', borderRadius: 8, borderLeft: '4px solid #818cf8′ }}>
                  <strong style={{ color: '#818cf8′ }}>💳 Credit to Buyer Option: </strong>
                  <span style={{ color: '#ccc', fontSize: 14 }}>This repair type is commonly offered as a buyer credit in DFW. Some buyers prefer the cash to choose their own contractor.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
