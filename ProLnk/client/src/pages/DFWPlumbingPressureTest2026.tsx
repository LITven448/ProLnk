import { useState } from 'react';

const tests = [
  { id: 'post_work', label: 'After Plumbing Work', icon: '🔧', method: 'Air Pressure Test (Supply)', psi: '80 PSI for 15 min', desc: 'Required after any repair or new installation. Detects leaks before walls close.' },
  { id: 'pre_close', label: 'Before Closing Walls', icon: '🏠', method: 'Static Pressure Hold', psi: '100 PSI for 30 min', desc: 'Final verification before drywall. No drops allowed — fix before concealing.' },
  { id: 'slab_leak', label: 'Suspected Slab Leak', icon: '💧', method: 'Pressure Drop Test', psi: 'Monitor over 1 hour', desc: 'DFW clay soil shifts create slab leaks. Pressure drop confirms active leak location.' },
  { id: 'drain', label: 'Drain Line Inspection', icon: '🚿', method: 'Hydrostatic Test', psi: 'Water fill to floor level', desc: 'Plug drain, fill with water, hold 15 min. Standard in DFW new construction.' },
  { id: 'purchase', label: 'Home Purchase Inspection', icon: '🔑', method: 'Combined Static + Drain', psi: 'Both supply & drain', desc: 'Full system test recommended for all DFW home purchases older than 10 years.' },
];

export default function DFWPlumbingPressureTest2026() {
  const [selected, setSelected] = useState('post_work');
  const active = tests.find(t => t.id === selected) || tests[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Plumbing System Pressure Test Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>When and how to pressure test plumbing in North Texas homes</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔎 Select Your Situation</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {tests.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                  background: selected === t.id ? '#F5E642' : '#1e3a5f',
                  color: selected === t.id ? '#0A1628' : '#fff',
                  border: 'none', fontSize: '0.85rem' }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a3a6e', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: 6 }}>{active.icon} {active.method}</div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: 8 }}>
              <span style={{ background: '#0f2040', padding: '0.3rem 0.8rem', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem' }}>📊 {active.psi}</span>
            </div>
            <p style={{ color: '#cbd5e1', margin: 0 }}>{active.desc}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '⚠️', title: 'DFW Clay Soil Warning', text: 'Expansive clay soil in North Texas moves seasonally. Slab foundations shift, stressing supply lines. Annual pressure monitoring recommended for homes over 15 years old.' },
            { icon: '📋', title: 'City Inspection Requirements', text: 'Dallas, Frisco, Plano and most DFW municipalities require pressure test sign-off before final plumbing inspection. Document with photo evidence.' },
            { icon: '🌡️', title: 'Temperature Considerations', text: 'Test during moderate temps (50–80°F). Texas summer heat can mask slow leaks; winter tests more reliable for accurate readings.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{card.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{card.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#0f2040', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 DFW Licensed Plumbers</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>ProLnk connects you with licensed DFW plumbers certified for pressure testing and slab leak detection</p>
        </div>
      </div>
    </div>
  );
}