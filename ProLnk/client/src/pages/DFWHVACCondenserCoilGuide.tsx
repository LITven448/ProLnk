import { useState } from 'react';

const situations = [
  { id: 'cottonwood', label: 'White fluff/cottonwood packed around fins', solution: 'Rinse with garden hose from inside out — never pressure wash. Clean fins gently with fin comb', cost: '$75–$200 pro / DIY free', impact: 'Cottonwood can reduce airflow 20–40%, spiking energy bills overnight' },
  { id: 'bent', label: 'Bent or crushed condenser fins', solution: 'Fin comb restoration for minor bending; severe damage may require coil replacement', cost: '$50–$150 pro service', impact: '20% fin damage = ~10% efficiency loss; affects cooling capacity in peak DFW heat' },
  { id: 'dirty', label: 'Visibly dirty / grimy coil surface', solution: 'Professional coil cleaning with no-rinse foaming cleaner + rinse — annual minimum in DFW', cost: '$150–$300', impact: 'Dirty coil forces compressor to work harder — raises electricity bill 15–25%' },
  { id: 'none', label: 'Looks okay — checking DFW maintenance needs', solution: 'Annual cleaning in March/April before DFW cooling season begins is the DFW standard', cost: '$150–$250/yr', impact: 'Preventive cleaning keeps SEER rating at factory spec through DFW summers' },
];

export default function DFWHVACCondenserCoilGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🌬️</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Condenser Coil Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Your outdoor condenser coil releases the heat pulled from inside your home. In DFW, it faces a unique threat: cottonwood trees shed massive amounts of white fluff every spring — and it packs directly into condenser fins, choking airflow and spiking your energy bill overnight.
        </p>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🌳 DFW-Specific Condenser Threats</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '🌿', title: 'Cottonwood Season', desc: 'April–June: eastern cottonwood trees shed dense white fluff that packs condenser fins in days' },
              { icon: '☀️', title: 'Extreme Heat Load', desc: '100°F+ ambient temps make heat rejection much harder — a dirty coil tips into shutdown' },
              { icon: '💨', title: 'DFW Dust Storms', desc: 'Spring & fall dust storms coat condenser coil with fine particles that bond to fins' },
              { icon: '🏡', title: 'Landscaping Risk', desc: 'Mulch, grass clippings, and nearby shrubs restrict airflow around the outdoor unit' },
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
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>🛠️ How to Clean a Condenser Coil</h2>
          <ol style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Turn off power at the disconnect box next to the unit</li>
            <li>Remove any debris from top of unit and around base</li>
            <li>Use garden hose — spray from <strong style={{ color: '#E8EDF5' }}>inside out</strong> to push debris out, not deeper in</li>
            <li>Never use a pressure washer — it bends the delicate aluminum fins</li>
            <li>For cottonwood: vacuum fins gently before rinsing, then rinse</li>
            <li>Let dry 15 minutes before restoring power</li>
          </ol>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginTop: 16 }}>
            <strong style={{ color: '#F5E642' }}>DFW Frequency:</strong>
            <span style={{ color: '#94A3B8' }}> Minimum once annually (March/April). If cottonwood trees are nearby, inspect monthly April–June.</span>
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔍 What's Your Condenser Situation?</h2>
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
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Cleaning Approach</div>
              <div style={{ marginBottom: 8 }}>{match.solution}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 6 }}>Cost: <strong style={{ color: '#F5E642' }}>{match.cost}</strong></div>
              <div style={{ background: '#1E3A5F', borderRadius: 6, padding: 10, fontSize: 14 }}>
                <strong style={{ color: '#F5E642' }}>Efficiency Impact:</strong> {match.impact}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
