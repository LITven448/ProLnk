import { useState } from 'react';

export default function DFWFoundationWaterBalance2026() {
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const conditions = [
    { id: 'bone-dry', label: '🏜️ Soil is bone dry, pulling away from foundation' },
    { id: 'summer-heat', label: '☀️ Mid-summer, no rain in 2+ weeks' },
    { id: 'heavy-rain', label: '🌧️ Heavy rain recently, soil saturated' },
    { id: 'check-balance', label: '🔍 Want to test current soil condition' },
  ];

  const guide: Record<string, string> = {
    'bone-dry': 'Emergency watering needed. Run soaker hoses 18 inches from foundation for 45-60 min daily until soil rebounds. DFW clay shrinks dramatically when dry — gaps at foundation corners mean settlement is starting. Do not delay.',
    'summer-heat': 'Increase foundation watering to 30-45 min daily. DFW summers lose 1-2 inches of moisture weekly through evaporation. Target damp sponge texture at 6 inches depth. Mulch helps retain moisture between waterings.',
    'heavy-rain': 'Pause manual watering for 5-7 days. Check that gutters direct water 6 feet from foundation. DFW clay holds moisture well — overwatering causes heave just like drought causes settlement. Let soil drain naturally.',
    'check-balance': 'Use a $15 moisture meter from hardware store. Insert 6 inches into soil at multiple points around foundation. Target 40-60% moisture reading. Below 30% = add water. Above 70% = reduce water and check drainage grading.',
  };

  function handleSelect(id: string) {
    setCondition(id);
    setResult(guide[id]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 FOUNDATION GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Foundation Water Balance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW expansive clay soil is the primary driver of foundation movement. The goal: keep soil like a damp sponge 6 inches down — consistent year-round. Too wet causes heave. Too dry causes settlement.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🌧️', label: 'Wet = Heave Risk', color: '#3b82f6' },
            { icon: '🏜️', label: 'Dry = Settlement Risk', color: '#f97316' },
            { icon: '💧', label: 'Target: Damp Sponge', color: '#22c55e' },
            { icon: '📏', label: 'Test Depth: 6 Inches', color: '#F5E642' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ color: s.color, fontWeight: 600, fontSize: 13, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#F5E642' }}>🔍 Current Soil Condition → Action Guide</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {conditions.map(c => (
            <button key={c.id} onClick={() => handleSelect(c.id)}
              style={{ background: condition === c.id ? '#F5E642' : '#1e2d45', color: condition === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {c.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#1e2d45', borderLeft: '4px solid #F5E642', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: 32, padding: 16, background: '#1e2d45', borderRadius: 10, fontSize: 13, color: '#94a3b8' }}>
          💡 ProLnk connects DFW homeowners with licensed foundation specialists who understand DFW clay soil.
        </div>
      </div>
    </div>
  );
}
