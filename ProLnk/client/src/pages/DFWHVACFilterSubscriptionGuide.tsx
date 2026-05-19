import { useState } from 'react';

const filterData = {
  small: {
    low: { service: 'FilterBuy Basic', freq: 'Every 3 months', monthly: 8, annual: 96, hardware: 140 },
    medium: { service: 'FilterEasy Standard', freq: 'Every 2 months May-Oct, every 3 months otherwise', monthly: 12, annual: 144, hardware: 168 },
    high: { service: 'Amazon Subscribe & Save MERV-13', freq: 'Monthly May-Oct, every 2 months otherwise', monthly: 16, annual: 192, hardware: 240 },
  },
  medium: {
    low: { service: 'FilterBuy Standard', freq: 'Every 2-3 months', monthly: 14, annual: 168, hardware: 210 },
    medium: { service: 'FilterEasy Premium', freq: 'Monthly May-Oct, every 2 months otherwise', monthly: 20, annual: 240, hardware: 300 },
    high: { service: 'Amazon Subscribe & Save MERV-16', freq: 'Monthly year-round', monthly: 28, annual: 336, hardware: 420 },
  },
  large: {
    low: { service: 'FilterBuy Premium', freq: 'Every 2 months', monthly: 22, annual: 264, hardware: 330 },
    medium: { service: 'FilterEasy Elite', freq: 'Monthly May-Oct, every 2 months otherwise', monthly: 32, annual: 384, hardware: 480 },
    high: { service: 'Amazon Subscribe & Save MERV-16 XL', freq: 'Monthly year-round', monthly: 42, annual: 504, hardware: 630 },
  },
};

export default function DFWHVACFilterSubscriptionGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [allergyLevel, setAllergyLevel] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    if (!homeSize || !allergyLevel) return;
    const rec = filterData[homeSize][allergyLevel];
    setResult(rec);
  }

  const savings = result ? result.hardware - result.annual : 0;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>HVAC Filter Subscription Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>DFW summers are brutal on your HVAC. Subscriptions ensure you never forget a change when it matters most.</p>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 DFW Filter Change Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { months: 'May – October', label: 'Peak Season', note: 'Monthly changes recommended', color: '#ef4444′ },
              { months: 'November – April', label: 'Off Season', note: 'Every 2–3 months is fine', color: '#22c55e' },
            ].map(item => (
              <div key={item.months} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${item.color}` }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.months}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏪 Top Subscription Services</h2>
          {[
            { name: 'Amazon Subscribe & Save', pros: 'Widest MERV range, easiest setup, Prime savings', cons: 'No DFW-specific scheduling', best: 'Tech-savvy homeowners' },
            { name: 'FilterEasy', pros: 'Auto-adjusts delivery schedule, DFW-aware timing', cons: 'Slightly higher cost', best: 'Set-it-and-forget-it households' },
            { name: 'FilterBuy', pros: 'Custom sizes, bulk discounts, US-made filters', cons: 'Manual schedule management', best: 'Budget-focused homeowners' },
          ].map(svc => (
            <div key={svc.name} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔧 {svc.name}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>✅ {svc.pros}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>⚠️ {svc.cons}</div>
              <div style={{ fontSize: 13, color: '#F5E642′ }}>Best for: {svc.best}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>HOME SIZE</label>
              {[{ val: 'small', label: 'Under 1,500 sq ft' }, { val: 'medium', label: '1,500–3,000 sq ft' }, { val: 'large', label: 'Over 3,000 sq ft' }].map(opt => (
                <button key={opt.val} onClick={() => setHomeSize(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${homeSize === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: homeSize === opt.val ? '#F5E642′ : ’transparent', color: homeSize === opt.val ? '#0A1628′ : '#fff', cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>ALLERGY LEVEL</label>
              {[{ val: 'low', label: 'No allergies' }, { val: 'medium', label: 'Mild allergies / pets' }, { val: 'high', label: 'Severe allergies / asthma' }].map(opt => (
                <button key={opt.val} onClick={() => setAllergyLevel(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${allergyLevel === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: allergyLevel === opt.val ? '#F5E642′ : ’transparent', color: allergyLevel === opt.val ? '#0A1628′ : '#fff', cursor: ’pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Get My Recommendation →</button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>📦 {result.service}</div>
              <div style={{ color: '#94a3b8', marginBottom: 8 }}>📅 Delivery: {result.freq}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 16 }}>
                <div style={{ textAlign: 'center' }}><div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>${result.monthly}/mo</div><div style={{ color: '#94a3b8', fontSize: 12 }}>Subscription</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>${result.annual}/yr</div><div style={{ color: '#94a3b8', fontSize: 12 }}>Annual Total</div></div>
                <div style={{ textAlign: 'center' }}><div style={{ color: '#22c55e', fontSize: 24, fontWeight: 800 }}>${savings} saved</div><div style={{ color: '#94a3b8', fontSize: 12 }}>vs hardware store</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Estimates based on DFW average filter costs · Always check MERV rating compatibility with your HVAC unit</div>
      </div>
    </div>
  );
}
