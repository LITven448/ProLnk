import { useState } from 'react';

const homeSizes = [
  { label: 'Under 1,500 sq ft', leakPct: 22, aerosealCost: 1400, manualCost: 600, annualSavings: 340, rebate: 200 },
  { label: '1,500–2,500 sq ft', leakPct: 25, aerosealCost: 1900, manualCost: 900, annualSavings: 520, rebate: 300 },
  { label: '2,500–3,500 sq ft', leakPct: 28, aerosealCost: 2600, manualCost: 1300, annualSavings: 720, rebate: 400 },
  { label: 'Over 3,500 sq ft', leakPct: 30, aerosealCost: 3400, manualCost: 1800, annualSavings: 940, rebate: 500 },
];

const ductAges = [
  { label: 'Under 10 years', multiplier: 0.7, note: 'Likely minor leakage — manual sealing adequate' },
  { label: '10–20 years', multiplier: 1.0, note: 'Typical DFW leakage — Aeroseal delivers strong ROI' },
  { label: '20–30 years', multiplier: 1.25, note: 'High leakage likely — Aeroseal or full duct replacement' },
  { label: 'Over 30 years', multiplier: 1.5, note: 'Consider full duct replacement vs. sealing investment' },
];

export default function DFWHVACDuctSealingROI() {
  const [sizeIdx, setSizeIdx] = useState(1);
  const [ageIdx, setAgeIdx] = useState(1);
  const [method, setMethod] = useState<'aeroseal' | 'manual'>('aeroseal');
  const [showResult, setShowResult] = useState(false);

  const home = homeSizes[sizeIdx];
  const age = ductAges[ageIdx];
  const adjSavings = Math.round(home.annualSavings * age.multiplier);
  const cost = method === 'aeroseal' ? home.aerosealCost : home.manualCost;
  const netCost = Math.max(0, cost - home.rebate);
  const payback = (netCost / adjSavings).toFixed(1);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>💨 DFW HVAC Guide</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Duct Sealing ROI for DFW Homes</h1>
        <p style={{ color: '#9BA4B4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          DFW attics hit 140–160°F in summer. When your ducts leak — and most do — you're paying to cool your attic. Typical DFW homes lose 20–30% of conditioned air before it reaches living spaces.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🌡️ Why DFW Makes This Urgent</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Attic temps', '140–160°F in July/Aug — leaked air heats instantly'],
              ['Usage hours', 'AC runs 2,000–2,800 hrs/yr in DFW vs ~1,200 nationally'],
              ['Duct material', 'Flex duct degrades faster in extreme heat, joints separate'],
              ['Oncor rebates', 'Up to $500 available for certified duct sealing projects'],
            ].map(([k, v]) => (
              <div key={k} style={{ background: '#162035', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 13 }}>{k}</div>
                <div style={{ color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔬 Aeroseal vs Manual Sealing</h2>
          {[
            { name: 'Aeroseal', pros: 'Seals from inside — reaches joints manual can\’t. Computer-verified leakage reduction. Oncor rebate eligible.', cons: 'Higher upfront cost; attic access still needed for major disconnects' },
            { name: 'Manual mastic sealing', pros: 'Lower cost; effective for accessible joints in conditioned crawlspace or mechanical room', cons: 'Can\’t seal interior joints or flex duct collar failures in attic without disassembly' },
          ].map(m => (
            <div key={m.name} style={{ background: '#162035', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: '#E8EAF0', marginBottom: 8 }}>{m.name}</div>
              <div style={{ color: '#9BA4B4', fontSize: 13, marginBottom: 4 }}>✅ {m.pros}</div>
              <div style={{ color: '#9BA4B4', fontSize: 13 }}>⚠️ {m.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>💰 Your DFW ROI Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Home size:</label>
            <select value={sizeIdx} onChange={e => { setSizeIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {homeSizes.map((h, i) => <option key={i} value={i}>{h.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Duct age:</label>
            <select value={ageIdx} onChange={e => { setAgeIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {ductAges.map((a, i) => <option key={i} value={i}>{a.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
            {(['aeroseal', 'manual'] as const).map(m => (
              <button key={m} onClick={() => { setMethod(m); setShowResult(false); }}
                style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: method === m ? '#F5E642′ : '#1E3A5F', background: method === m ? '#F5E642' : ’transparent', color: method === m ? '#0A1628′ : '#9BA4B4', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
                {m === 'aeroseal' ? 'Aeroseal' : 'Manual Mastic'}
              </button>
            ))}
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Calculate My ROI →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12, fontSize: 16 }}>📊 ROI Summary</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Estimated duct leakage:</strong> ~{Math.round(home.leakPct * age.multiplier)}% of conditioned air</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Project cost:</strong> ${cost.toLocaleString()}</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Oncor rebate:</strong> up to ${home.rebate} (Aeroseal certified)</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Net cost after rebate:</strong> ${netCost.toLocaleString()}</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Estimated annual savings:</strong> ${adjSavings}/yr</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 10, fontSize: 16 }}>Payback period: {payback} years</div>
              <div style={{ color: '#9BA4B4', fontSize: 13, marginTop: 8 }}>{age.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
