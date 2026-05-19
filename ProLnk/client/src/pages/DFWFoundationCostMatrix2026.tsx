import { useState } from 'react';

const repairs = [
  { id: 'monitor', label: 'Hairline Crack Monitoring', icon: '👁️', low: 0, high: 0, displayCost: '$0 — Monitor Only', detail: 'Small hairline cracks under 1/8" with no displacement. Document with photos, recheck every 6 months.' },
  { id: 'epoxy', label: 'Epoxy Injection (per crack)', icon: '💉', low: 200, high: 500, displayCost: '$200–$500 per crack', detail: 'Structural epoxy fills cracks up to 1/4" wide. Stops water intrusion. Best for basement or stem wall cracks.' },
  { id: 'french', label: 'French Drain System', icon: '🌊', low: 3000, high: 8000, displayCost: '$3,000–$8,000', detail: 'Perimeter drainage to redirect water away from foundation. DFW clay soil makes this critical after heavy rains.' },
  { id: 'exterior', label: 'Exterior Piers', icon: '⚓', low: 4000, high: 8000, displayCost: '$4,000–$8,000', detail: 'Steel push piers or helical piers installed outside. Best for corners and perimeter settling. 25-yr warranty typical.' },
  { id: 'perimeter', label: 'Full Perimeter Piers', icon: '🏠', low: 8000, high: 18000, displayCost: '$8,000–$18,000', detail: 'Complete perimeter stabilization. DFW average: 12–20 piers depending on home size. Most common full repair.' },
  { id: 'interior', label: 'Interior Piers (add-on)', icon: '🔩', low: 1000, high: 3000, displayCost: '+$1,000–$3,000', detail: 'Added when center beam or interior areas have settled. Often paired with perimeter pier jobs.' },
  { id: 'engineering', label: 'Engineering Report', icon: '📋', low: 400, high: 700, displayCost: '$400–$700', detail: 'Licensed PE evaluates foundation, provides repair spec. Required by most lenders and insurance claims.' },
];

const symptoms = [
  { label: 'Doors/windows sticking', recs: ['exterior', 'perimeter'] },
  { label: 'Visible crack in slab', recs: ['monitor', 'epoxy', 'engineering'] },
  { label: 'Water pooling near foundation', recs: ['french', 'exterior'] },
  { label: 'Sloping floors', recs: ['perimeter', 'interior', 'engineering'] },
  { label: 'Cracks in brick exterior', recs: ['perimeter', 'engineering'] },
];

export default function DFWFoundationCostMatrix2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [symptom, setSymptom] = useState<number | null>(null);

  const highlighted = symptom !== null ? symptoms[symptom].recs : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏗️ DFW Foundation Repair Cost Matrix 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Every foundation repair cost in DFW — from zero-cost monitoring to full perimeter stabilization. DFW's expansive clay soil is the #1 driver of foundation movement in Texas.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 12 }}>🔍 FILTER BY SYMPTOM</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {symptoms.map((s, i) => (
              <button key={i} onClick={() => setSymptom(symptom === i ? null : i)}
                style={{ padding: '7px 12px', borderRadius: 8, border: `2px solid ${symptom === i ? '#F5E642' : '#1E3A5F'}`, background: symptom === i ? '#F5E642' : 'transparent', color: symptom === i ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {repairs.map(r => {
            const isHighlighted = highlighted ? highlighted.includes(r.id) : true;
            const isSelected = selected === r.id;
            return (
              <div key={r.id} onClick={() => setSelected(isSelected ? null : r.id)}
                style={{ background: '#0F2040', borderRadius: 12, padding: 16, cursor: 'pointer', border: `2px solid ${isSelected ? '#F5E642' : isHighlighted ? '#1E3A5F' : '#0A1628'}`, opacity: isHighlighted ? 1 : 0.4, transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{r.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{r.label}</span>
                  </div>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{r.displayCost}</span>
                </div>
                {isSelected && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F', color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>
                    {r.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🧱 DFW Clay Soil Facts</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
            {[['📏', 'Up to 6"', 'DFW soil expansion per season'],['💧', '40%', 'Homes needing foundation work in DFW lifetime'],['☀️', 'Summer', 'Highest risk — soil contracts dramatically'],['🌧️', 'Spring', '2nd highest risk — rapid soil expansion']].map(([icon, stat, label]) => (
              <div key={label as string} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{icon}</div>
                <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 18 }}>{stat}</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Home Services · prolnk.io
        </div>
      </div>
    </div>
  );
}
