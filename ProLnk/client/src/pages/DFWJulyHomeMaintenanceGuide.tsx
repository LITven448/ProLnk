import { useState } from 'react';

export default function DFWJulyHomeMaintenanceGuide() {
  const [situation, setSituation] = useState<string>('');

  const tasks: Record<string, { icon: string; title: string; urgency: string }[]> = {
    high_bill: [
      { icon: '⚡', title: 'Set HVAC to 78-80°F — each degree saves 3% on bills', urgency: 'Critical' },
      { icon: '🪟', title: 'Close blinds on south/west windows 9am-7pm', urgency: 'High' },
      { icon: '🔌', title: 'Unplug vampire electronics — they generate heat + waste power', urgency: 'Medium' },
      { icon: '❄️', title: 'Schedule HVAC tune-up — dirty coils cost 10-15% efficiency', urgency: 'High' },
      { icon: '💡', title: 'Shift high-energy tasks to off-peak hours (after 8pm)', urgency: 'Medium' },
    ],
    foundation: [
      { icon: '🌱', title: 'Water foundation perimeter 15-20 min daily — soil at driest', urgency: 'Critical' },
      { icon: '🏠', title: 'Check for new door/window sticking — sign of shift', urgency: 'Critical' },
      { icon: '💧', title: 'Inspect and repair any cracks in brick mortar immediately', urgency: 'High' },
      { icon: '📐', title: 'Note any new floor gaps or wall separation', urgency: 'High' },
    ],
    pipes: [
      { icon: '🚰', title: 'Insulate exposed outdoor pipes — UV + heat degrade PVC', urgency: 'High' },
      { icon: '💧', title: 'Check water pressure monthly — heat expands pipes', urgency: 'Medium' },
      { icon: '🔧', title: 'Inspect hose bib connections for drips', urgency: 'Medium' },
      { icon: '🌡️', title: 'Know your main shut-off valve location — hot months = higher failure', urgency: 'High' },
    ],
  };

  const urgencyColor: Record<string, string> = {
    Critical: '#FF4444',
    High: '#F5E642',
    Medium: '#4CAF50',
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔥</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW July Home Maintenance</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Avg 99°F · Hottest Month · ERCOT Grid Stress · Driest Soil</p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <p style={{ color: '#CBD5E1', marginBottom: 12, fontWeight: 600 }}>What's your biggest July concern?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{ key: 'high_bill', label: '⚡ Sky-High Electric Bill' }, { key: 'foundation', label: '🏠 Foundation Health' }, { key: 'pipes', label: '🚰 Pipe Exposure Risk' }].map(opt => (
              <button key={opt.key} onClick={() => setSituation(opt.key)} style={{ padding: '10px 20px', borderRadius: 8, border: '2px solid', borderColor: situation === opt.key ? '#F5E642' : '#1E3A5F', backgroundColor: situation === opt.key ? '#1a2f4e' : '#0D1F3C', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>{opt.label}</button>
            ))}
          </div>
        </div>

        {situation && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Your July Maintenance Checklist</h2>
            {tasks[situation].map((task, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, backgroundColor: '#0D1F3C', borderRadius: 10, padding: '14px 16px', marginBottom: 10, borderLeft: `4px solid ${urgencyColor[task.urgency]}` }}>
                <span style={{ fontSize: 24 }}>{task.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#E2E8F0' }}>{task.title}</p>
                  <span style={{ fontSize: 12, color: urgencyColor[task.urgency], fontWeight: 700 }}>{task.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, backgroundColor: '#0D1F3C', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', margin: '0 0 12px' }}>Beat the July heat with a DFW-certified pro.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}