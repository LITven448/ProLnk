import { useState } from 'react';

export default function DFWHVACSEERCalculator2026() {
  const [currentSEER, setCurrentSEER] = useState(14);
  const [newSEER, setNewSEER] = useState(18);
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [hvacPct, setHvacPct] = useState(50);

  const hvacCost = (monthlyBill * hvacPct) / 100;
  const annualHvac = hvacCost * 12;
  const savings = annualHvac * (1 - currentSEER / newSEER);
  const upgradeCost = newSEER === 22 ? 5000 : newSEER === 18 ? 2500 : 1000;
  const payback = savings > 0 ? (upgradeCost / savings).toFixed(1) : 'N/A';

  const seerOptions = [{ v: 15, l: '15 SEER2', desc: 'Minimum efficiency' }, { v: 18, l: '18 SEER2', desc: 'Good efficiency' }, { v: 22, l: '22 SEER2', desc: 'High efficiency' }];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📊 SEER vs Cost Calculator</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW runs AC 2,500+ hours per year — far more than northern states. Higher SEER pays back faster here than almost anywhere in the US.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ seer: '15 SEER2', cost: '$3,500-$5,000', hours: '2,500 hrs/yr', payback: 'Baseline' }, { seer: '18 SEER2', cost: '$5,500-$7,500', hours: '2,500 hrs/yr', payback: '~4-6 yrs' }, { seer: '22 SEER2', cost: '$8,000-$12,000', hours: '2,500 hrs/yr', payback: '~6-9 yrs' }].map(s => (
            <div key={s.seer} style={{ background: '#132035', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{s.seer}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Install cost</div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 8 }}>DFW Payback</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#F5E642' }}>{s.payback}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#F5E642' }}>🧮 My SEER Upgrade ROI</div>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Monthly Electric Bill: ${monthlyBill}</label>
              <input type="range" min={100} max={600} step={10} value={monthlyBill} onChange={e => setMonthlyBill(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>HVAC % of Bill: {hvacPct}%</label>
              <input type="range" min={30} max={70} step={5} value={hvacPct} onChange={e => setHvacPct(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current System</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[12, 14, 16].map(s => (
                  <button key={s} onClick={() => setCurrentSEER(s)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', background: currentSEER === s ? '#F5E642' : '#1e3a5f', color: currentSEER === s ? '#0A1628' : '#fff', fontWeight: 600 }}>{s} SEER</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Upgrade To</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {seerOptions.map(o => (
                  <button key={o.v} onClick={() => setNewSEER(o.v)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', background: newSEER === o.v ? '#F5E642' : '#1e3a5f', color: newSEER === o.v ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>{o.l}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 700 }}>${Math.round(savings)}/yr</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Annual Savings</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 700 }}>{payback} yrs</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Simple Payback</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#F5E642' }}>💡 DFW Context: Why SEER Matters More Here</div>
          {['DFW: 2,500+ AC hours/year · Boston: ~800 hours/year', 'Every efficiency point saves proportionally more in extreme Texas heat', 'SEER2 ratings (new standard) are ~5% lower than old SEER numbers', 'Federal tax credit: 30% up to $600 for qualifying high-efficiency units'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>›</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Get SEER Quotes from DFW HVAC Pros</div>
          <div style={{ fontSize: 13 }}>ProLnk matches you with verified contractors who explain SEER differences honestly.</div>
        </div>
      </div>
    </div>
  );
}
