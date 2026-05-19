import { useState } from 'react';

export default function DFWWineRoomGuide2026() {
  const [collection, setCollection] = useState('small');
  const [budget, setBudget] = useState(5000);

  const solutions: Record<string, { label: string; desc: string; tempControl: string; bottles: string; cost: string }> = {
    small: {
      label: 'Wine Refrigerator(s)',
      desc: 'Freestanding or built-in wine fridge. Best for collections under 200 bottles.',
      tempControl: 'Compressor or thermoelectric unit ($200–$1,500)',
      bottles: '24–200 bottles',
      cost: '$200–$2,000',
    },
    medium: {
      label: 'Wine Cabinet + Cooling Unit',
      desc: 'Dedicated wine cabinet with CellarCool or WhisperKOOL unit — no structural work required.',
      tempControl: 'Self-contained cooling ($800–$2,500)',
      bottles: '200–600 bottles',
      cost: '$2,000–$6,000',
    },
    large: {
      label: 'Climate-Controlled Wine Room',
      desc: 'Dedicated room with mini-split or dedicated wine room cooling system. DFW heat demands proper insulation.',
      tempControl: 'Mini-split or dedicated unit ($1,500–$4,000 installed)',
      bottles: '600–3,000+ bottles',
      cost: '$5,000–$18,000',
    },
  };

  const sol = solutions[collection];

  const getDFWNote = (b: number) => {
    if (b < 3000) return 'Wine refrigerators work well — avoid placing near exterior DFW walls (heat transfer risk).';
    if (b < 8000) return 'A wine cabinet with dedicated cooler is ideal — insulate the space for DFW summer efficiency.';
    return 'Full climate-controlled room recommended. DFW rooms must stay 55–65°F — mini-split handles Texas heat effectively.';
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Wine Room / Wine Cellar Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Wine storage in DFW is a real challenge — 110°F summers demand the right solution for your collection.</p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>🌡️ DFW Wine Storage Challenge</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Wine must stay 55–65°F. DFW summers hit 110°F+. Your storage solution must fight Texas heat year-round.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[{ icon: '🌡️', label: 'Target Temp', val: '55–65°F' }, { icon: '☀️', label: 'DFW Summer Peak', val: '110°F+' }, { icon: '💧', label: 'Ideal Humidity', val: '50–70%' }].map((stat) => (
              <div key={stat.label} style={{ background: '#0f172a', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 24 }}>{stat.icon}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{stat.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🍷 Collection Size</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ id: 'small', label: '🍾 Small (< 200 bottles)' }, { id: 'medium', label: '🍷 Medium (200–600)' }, { id: 'large', label: '🏰 Large (600+)' }].map((opt) => (
              <button key={opt.id} onClick={() => setCollection(opt.id)}
                style={{ padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                  background: collection === opt.id ? '#F5E642′ : '#0f172a', color: collection === opt.id ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>💰 Budget</h2>
          <input type="range" min={500} max={20000} step={500} value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 8, accentColor: '#F5E642′ }} />
          <div style={{ textAlign: 'center', color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>${budget.toLocaleString()}</div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{sol.label}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{sol.desc}</div>
            <div style={{ fontSize: 13, marginBottom: 4 }}>🌡️ <strong>Temp Control:</strong> {sol.tempControl}</div>
            <div style={{ fontSize: 13, marginBottom: 4 }}>🍾 <strong>Capacity:</strong> {sol.bottles}</div>
            <div style={{ fontSize: 13, color: '#F5E642′ }}>💵 <strong>Cost Range:</strong> {sol.cost}</div>
          </div>
          <div style={{ marginTop: 12, background: '#0f172a', borderRadius: 8, padding: 12, fontSize: 13, color: '#94a3b8′ }}>💡 {getDFWNote(budget)}</div>
        </div>
      </div>
    </div>
  );
}
