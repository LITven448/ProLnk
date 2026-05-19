import { useState } from 'react';

const concerns = [
  { id: 'pollen', label: '🌿 Pollen / Allergies', solutions: ['MERV-13 or MERV-16 filter (replace every 60 days in DFW)', 'Whole-home HEPA air purifier', 'Keep windows closed April–June (cedar + oak peak)', 'Shower before bed to remove pollen from hair/skin'] },
  { id: 'humidity', label: '💧 Humidity / Mold', solutions: ['Target 45–50% indoor humidity year-round', 'Whole-home dehumidifier on HVAC return', 'Check crawlspace vapor barrier', 'Run exhaust fans 20 min after showers'] },
  { id: 'voc', label: '🏭 VOCs / Chemicals', solutions: ['Low-VOC paint and adhesives for any renovations', 'Air purifier with activated carbon filter', 'Open windows during low-pollen mornings', 'Avoid synthetic air fresheners — use HEPA + ventilation instead'] },
  { id: 'fresh', label: '🌬️ Fresh Air / Ventilation', solutions: ['Energy Recovery Ventilator (ERV) for balanced fresh air', 'Check bathroom and kitchen exhaust duct terminations', 'Set HVAC fan to run 15 min per hour even when not heating/cooling', 'Crack windows on low-allergen days (early morning)'] },
];

export default function DFWIndoorAirQuality2026() {
  const [selected, setSelected] = useState('pollen');
  const item = concerns.find(c => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE — 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Indoor Air Quality</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>DFW ranks among the top 5 worst US cities for allergy sufferers — cedar, oak, and grass pollen dominate spring.</p>
        <div style={{ background: '#0F2040', borderRadius: 10, padding: '0.75rem 1.2rem', marginBottom: 24, color: '#93c5fd', fontSize: 14 }}>
          💡 MERV-13 filters block 90%+ of airborne allergens. Standard fiberglass blocks less than 10%.
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)} style={{ background: selected === c.id ? '#F5E642′ : '#0F2040', color: selected === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}>
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 14, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontWeight: 800, marginBottom: 16, color: '#F5E642′ }}>{item.label} Solutions</h2>
          {item.solutions.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, lineHeight: 1 }}>→</span>
              <span style={{ fontSize: 15, color: '#e2e8f0′ }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1rem 1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🎯 DFW Pollen Calendar</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[['Jan–Feb', 'Cedar 🔴'],['Mar–Apr', 'Oak 🔴'],['May–Jun', 'Grass 🟡'],['Jul–Aug', 'Mold 🟡'],['Sep–Oct', 'Ragweed 🟠'],['Nov–Dec', 'Low 🟢']].map(([m, t]) => (
              <div key={m} style={{ background: '#0a1628', borderRadius: 8, padding: '0.5rem 0.8rem', fontSize: 13 }}>
                <div style={{ color: '#94a3b8′ }}>{m}</div>
                <div style={{ fontWeight: 700 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}