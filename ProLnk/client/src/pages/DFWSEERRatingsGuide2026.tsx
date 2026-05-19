import { useState } from 'react';

export default function DFWSEERRatingsGuide2026() {
  const [currentSEER, setCurrentSEER] = useState(10);
  const [newSEER2, setNewSEER2] = useState(18);
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [savings, setSavings] = useState<number|null>(null);

  const calculate = () => {
    const efficiency = (newSEER2 * 1.07 - currentSEER) / currentSEER;
    const annual = Math.round(monthlyBill * 8 * efficiency);
    setSavings(annual);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>⚡ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>SEER2 Ratings Guide for DFW Homeowners</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>The 2023 efficiency standard change that could save you $400-800/year</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📐', title: 'SEER2 vs Old SEER', body: 'SEER2 uses a more realistic test — M1 method. A 15 SEER2 unit is roughly equivalent to a 14.5 SEER unit. Texas minimum is 15 SEER2 for new installs as of Jan 2023.' },
            { icon: '📊', title: 'DFW Efficiency Reality', body: 'Most DFW homes have 10-13 SEER systems installed 2005-2015. Upgrading to 18 SEER2 cuts cooling costs 25-40%. DFW runs AC ~8 months/year.' },
            { icon: '💰', title: 'Payback Period', body: 'High-efficiency 18-20 SEER2 unit: $1,500-2,500 premium over baseline. Payback period: 5-7 years in DFW climate given high AC usage hours.' },
            { icon: '🎯', title: 'Right Rating for DFW', body: '16-18 SEER2: Best ROI for most DFW homes. 20+ SEER2: Worth it only for 2,500+ sq ft homes with $300+/month summer bills.' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>💡 Annual Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 4 }}>Current SEER: <strong style={{ color: '#F5E642′ }}>{currentSEER}</strong></label>
              <input type="range" min={8} max={18} value={currentSEER} onChange={(e) => setCurrentSEER(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 4 }}>New SEER2: <strong style={{ color: '#F5E642′ }}>{newSEER2}</strong></label>
              <input type="range" min={15} max={24} value={newSEER2} onChange={(e) => setNewSEER2(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 4 }}>Avg summer monthly bill: <strong style={{ color: '#F5E642′ }}>${monthlyBill}</strong></label>
            <input type="range" min={80} max={500} step={10} value={monthlyBill} onChange={(e) => setMonthlyBill(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Calculate Savings
          </button>
          {savings !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0′ }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${savings.toLocaleString()}</span>
              <span style={{ color: '#94a3b8', marginLeft: 8 }}>estimated annual savings</span>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Payback period: ~{savings > 0 ? Math.round(2000/savings) : 'N/A'} years on a $2,000 upgrade premium</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2444', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 ProLnk Tip</div>
          <div style={{ color: '#cbd5e1', fontSize: 14 }}>Always verify the SEER2 rating on the yellow EnergyGuide label before purchase. ProLnk-vetted HVAC pros provide side-by-side efficiency comparisons at no extra charge.</div>
        </div>
      </div>
    </div>
  );
}
