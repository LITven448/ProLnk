import { useState } from 'react';

const improvements = [
  { id: 'seal', label: 'Air Sealing', level: 1, icon: '🏠', cost: '$500–$2,000', savings: '10–20%', why: 'DFW homes lose 30–40% of conditioned air through leaks. Fix this first or your HVAC fights a losing battle year-round.' },
  { id: 'insulate', label: 'Insulation', level: 2, icon: '🧱', cost: '$1,500–$4,000', savings: '15–25%', why: 'Attic insulation is critical in DFW — summer radiant heat overwhelms everything below if the thermal barrier is weak.' },
  { id: 'hvac', label: 'Efficient HVAC', level: 3, icon: '❄️', cost: '$5,000–$12,000', savings: '20–35%', why: 'A new 18-SEER unit in a sealed, insulated DFW home pays back fast. Without steps 1-2 first, oversizing is common and wastes money.' },
  { id: 'solar', label: 'Solar / Renewables', level: 4, icon: '☀️', cost: '$15,000–$30,000', savings: '50–90% on electric', why: 'DFW solar ROI is strong but only after reducing the load. Right-sizing the solar array requires lower consumption first.' },
];

export default function DFWEnergyEfficiencyPyramid() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setShowPlan(false);
  }

  const orderedSelected = improvements.filter(i => selected.includes(i.id));
  const outOfOrder = orderedSelected.some((item, idx) => idx > 0 && item.level < orderedSelected[idx - 1].level);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 8 }}>DFW Energy Efficiency Pyramid</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            Order matters. DFW homeowners who skip the pyramid spend 40% more and get 40% less. Select your planned improvements.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {improvements.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  background: isSelected ? 'rgba(245,230,66,0.12)' : 'rgba(255,255,255,0.05)',
                  border: isSelected ? '1px solid #F5E642' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: '1rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: 28, minWidth: 36, textAlign: 'center' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: isSelected ? '#F5E642' : '#fff' }}>
                      Step {item.level}: {item.label}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.cost}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Energy savings: {item.savings}</div>
                </div>
                <div style={{ fontSize: 20 }}>{isSelected ? '✅' : '⬜'}</div>
              </div>
            );
          })}
        </div>

        {selected.length > 0 && (
          <button
            onClick={() => setShowPlan(true)}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '0.85rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.5rem' }}
          >
            Get My Sequencing Recommendation →
          </button>
        )}

        {showPlan && (
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>
              {outOfOrder ? '⚠️ Reorder Recommended' : '✅ Good Sequencing'}
            </h3>
            {outOfOrder && (
              <p style={{ color: '#f97316', marginBottom: '1rem', fontSize: '0.9rem' }}>
                You have selected improvements out of pyramid order. In DFW, doing HVAC before sealing/insulation leads to oversized systems and wasted spend.
              </p>
            )}
            {orderedSelected.map(item => (
              <div key={item.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.icon} {item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.why}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
