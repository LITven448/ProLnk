import { useState } from 'react';

const situations = [
  { id: 'overflow', label: 'Water pooling around indoor unit', solution: 'Float switch installation + emergency drain flush', cost: '$150–$300', urgency: 'Immediate' },
  { id: 'algae', label: 'Drain line slow or gurgling', solution: 'Algae treatment with vinegar flush + UV tablet installation', cost: '$75–$150', urgency: 'This week' },
  { id: 'musty', label: 'Musty smell from vents', solution: 'Full drain line inspection + biocide treatment + coil check', cost: '$200–$400', urgency: 'Soon' },
  { id: 'none', label: 'No issues — preventive check', solution: 'Quarterly flush with distilled vinegar, inspect float switch', cost: '$50–$100/yr DIY', urgency: 'Quarterly' },
];

export default function DFWHVACDrainlineSolutions() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>💧</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Drain Line Solutions</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW summers push HVAC systems to produce 10–20 gallons of condensate daily. That moisture, combined with 100°F+ heat, creates the perfect environment for algae and mold growth inside drain lines — making clogged condensate drains the #1 HVAC service call in the Metroplex.
        </p>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>⚠️ Why DFW Is Especially Vulnerable</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🌡️', title: 'Extreme Heat', desc: 'Systems run 8–12 hrs/day in summer, producing massive condensate volume' },
              { icon: '💦', title: 'High Humidity', desc: 'DFW humidity 60–80%+ in summer — more moisture = more algae food' },
              { icon: '🌿', title: 'Algae Growth', desc: 'Warm, wet drain lines are ideal algae habitat; clogs form in weeks' },
              { icon: '🏠', title: 'Older Homes', desc: 'Many DFW homes have PVC drain lines with minimal slope, slowing drainage' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>🛡️ Preventive Solutions</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 1.9, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EDF5' }}>Quarterly vinegar flush</strong> — Pour 1 cup distilled white vinegar into the access port every 3 months</li>
            <li><strong style={{ color: '#E8EDF5' }}>Float switch</strong> — Shuts off the system before the drain pan overflows; essential in DFW</li>
            <li><strong style={{ color: '#E8EDF5' }}>UV tablets</strong> — Slow-dissolve algae inhibitor tablets placed in the drain pan monthly</li>
            <li><strong style={{ color: '#E8EDF5' }}>Annual wet-vac service</strong> — Tech suctions the full drain line from exterior termination point</li>
          </ul>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔍 What's Your Drain Situation?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#1E3A5F' : '#0A1628',
                  border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`,
                  borderRadius: 8, padding: '12px 16px', color: '#E8EDF5',
                  textAlign: 'left', cursor: 'pointer', fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Recommended Solution</div>
              <div style={{ marginBottom: 8 }}>{match.solution}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>Estimated cost: <strong style={{ color: '#F5E642' }}>{match.cost}</strong> &nbsp;|&nbsp; Urgency: <strong style={{ color: '#F5E642' }}>{match.urgency}</strong></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
