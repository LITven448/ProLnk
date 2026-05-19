import { useState } from 'react';

const situations = [
  { id: 'mold', label: 'Visible mold or black spots on coil', solution: 'Professional coil cleaning with EPA-registered biocide + UV light installation', cost: '$300–$600', action: 'Call tech — mold on evaporator requires professional remediation' },
  { id: 'ice', label: 'Ice forming on indoor unit', solution: 'Check airflow first (dirty filter), then inspect coil for freeze-up from low refrigerant or dirty coil', cost: '$150–$500', action: 'Turn system to fan-only until ice melts, then call tech' },
  { id: 'weak', label: 'Weak airflow / warm air from vents', solution: 'Dirty coil reducing heat transfer — needs cleaning or replacement if corroded', cost: '$200–$800', action: 'Schedule cleaning; if 10+ yrs old, get replacement quote' },
  { id: 'none', label: 'No issues — want to understand coil health', solution: 'Annual coil inspection + cleaning keeps efficiency at peak in DFW humidity', cost: '$150–$250/yr', action: 'Schedule annual cleaning before each cooling season (March/April)' },
];

export default function DFWHVACEvaporatorCoilGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>❄️</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Evaporator Coil Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          The evaporator coil sits inside your air handler and absorbs heat from your home's air. In DFW's humid summers, it also removes massive amounts of moisture — which is why it's one of the most mold-prone components in your HVAC system.
        </p>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔬 What the Evaporator Coil Does</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🌬️', title: 'Absorbs Heat', desc: 'Cold refrigerant inside coil tubes absorbs heat from warm air passing over it' },
              { icon: '💧', title: 'Removes Humidity', desc: 'Moisture condenses on cold coil surface — critical in DFW\’s humid summers' },
              { icon: '🦠', title: 'Mold Magnet', desc: 'Constant moisture + organic dust = ideal mold growth conditions' },
              { icon: '📉', title: 'Efficiency Killer', desc: 'Dirty or corroded coil forces longer run times and higher energy bills' },
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
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>📋 DFW Coil Maintenance Schedule</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { freq: 'Monthly', task: 'Check/replace air filter — dirty filters starve the coil of airflow and accelerate freeze-ups' },
              { freq: 'Annually', task: 'Professional coil inspection and no-rinse coil cleaner application before cooling season' },
              { freq: 'Every 3–5 yrs', task: 'Deep coil cleaning with coil pulled from air handler if significant buildup detected' },
              { freq: 'Replace', task: 'Coil replacement when pitted/corroded (formicary corrosion from DFW\’s chemical-heavy tap water) or refrigerant leaking' },
            ].map(item => (
              <div key={item.freq} style={{ display: 'flex', gap: 16, background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 110, fontSize: 14 }}>{item.freq}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.task}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔍 What's Your Coil Situation?</h2>
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
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Assessment</div>
              <div style={{ marginBottom: 8 }}>{match.solution}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 6 }}>Cost range: <strong style={{ color: '#F5E642' }}>{match.cost}</strong></div>
              <div style={{ background: '#1E3A5F', borderRadius: 6, padding: 10, fontSize: 14 }}>
                <strong style={{ color: '#F5E642' }}>Action:</strong> {match.action}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
