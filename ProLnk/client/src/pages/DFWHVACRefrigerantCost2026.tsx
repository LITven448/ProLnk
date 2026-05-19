import { useState } from 'react';

const refrigerants = [
  { type: 'R-22', label: 'R-22 (Freon)', price: '$200–400/lb', note: 'Discontinued — very expensive, stockpile only', color: '#FF4444′ },
  { type: 'R-410A', label: 'R-410A (Puron)', price: '$30–60/lb', note: 'Being phased out — still available but rising', color: '#FF8C00′ },
  { type: 'R-32', label: 'R-32', price: '$25–50/lb', note: 'Current standard — good availability', color: '#22C55E' },
  { type: 'R-454B', label: 'R-454B (Puron Advanced)', price: '$25–50/lb', note: 'Current standard — A2L certified techs only', color: '#22C55E' },
];

const systemAges = [
  { label: 'New (0–5 yrs)', modifier: 0, risk: 'Very Low' },
  { label: 'Moderate (6–12 yrs)', modifier: 1, risk: 'Moderate' },
  { label: 'Older (13–20 yrs)', modifier: 2, risk: 'High' },
  { label: 'Aging (20+ yrs)', modifier: 3, risk: 'Very High' },
];

const dfwContext = [
  { icon: '🌡️', stat: '3,600+', label: 'Cooling hours/yr in DFW' },
  { icon: '⚡', stat: '3×', label: 'More system stress vs northern climates' },
  { icon: '🔧', stat: '15–20%', label: 'Older DFW systems leak refrigerant annually' },
  { icon: '💰', stat: '$150–400', label: 'Typical DFW refrigerant service call' },
];

export default function DFWHVACRefrigerantCost2026() {
  const [selectedRef, setSelectedRef] = useState('R-22');
  const [selectedAge, setSelectedAge] = useState(0);

  const ref = refrigerants.find(r => r.type === selectedRef)!;
  const age = systemAges[selectedAge];

  const riskColors: Record<string, string> = {
    'Very Low': '#22C55E', 'Moderate': '#F5E642', 'High': '#FF8C00', 'Very High': '#FF4444',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>❄️ DFW Refrigerant Cost Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>What refrigerant actually costs in the Dallas-Fort Worth heat. DFW runs AC harder than almost anywhere — that means more wear, more leaks, and higher refrigerant bills.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 32 }}>
          {dfwContext.map(c => (
            <div key={c.label} style={{ background: '#0F2040', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{c.stat}</div>
              <div style={{ fontSize: 12, color: '#94A3B8′ }}>{c.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Cost Explorer</h2>
        <div style={{ background: '#0F2040', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10, fontWeight: 600 }}>SELECT REFRIGERANT TYPE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
              {refrigerants.map(r => (
                <button key={r.type} onClick={() => setSelectedRef(r.type)}
                  style={{ padding: '10px 12px', borderRadius: 8, border: `2px solid ${selectedRef === r.type ? r.color : '#1E3A5F'}`, background: selectedRef === r.type ? '#1E3A5F' : 'transparent', color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                  {r.type}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10, fontWeight: 600 }}>SYSTEM AGE</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {systemAges.map((a, i) => (
                <button key={i} onClick={() => setSelectedAge(i)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${selectedAge === i ? '#F5E642' : '#1E3A5F'}`, background: selectedAge === i ? '#F5E642′ : ’transparent', color: selectedAge === i ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: 12, fontWeight: 600 }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>ESTIMATED COST PER POUND</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: ref.color, marginBottom: 6 }}>{ref.price}</div>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>{ref.note}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, color: '#94A3B8′ }}>Leak Risk:</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: riskColors[age.risk] }}>{age.risk}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>⚠️ DFW Homeowner Warning</div>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>DFW systems run 3,600+ hours per year vs 1,200 hrs in cooler climates. Older R-22 systems can cost $600–1,200+ per recharge. At those prices, replacement often pencils out better. Get quotes before recharging any system 10+ years old.</p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Home Services · prolnk.io
        </div>
      </div>
    </div>
  );
}
