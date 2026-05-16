import { useState } from 'react';

const decades = [
  { id: 'early', label: '📅 Early 2000s (2000–2004)', desc: '~20–26 years old — HVAC approaching end of life' },
  { id: 'mid', label: '📅 Mid 2000s (2005–2007)', desc: '~19–21 years old — HVAC and water heater zone' },
  { id: 'late', label: '📅 Late 2000s (2008–2009)', desc: '~17–18 years old — water heater priority' },
];

const guide: Record<string, { hvac: string; waterheater: string; stucco: string; foundation: string; note: string }> = {
  early: {
    hvac: '🔴 Replace Soon — 20+ years, past design life',
    waterheater: '🔴 Replace — 20+ years, risk of failure',
    stucco: '🟡 Inspect if synthetic stucco (EIFS) was used',
    foundation: '🟢 Mostly stable — monitor after drought years',
    note: '2000–2004 homes are entering the same replacement cycle as 1990s homes did 5 years ago. HVAC and water heater are the two systems that will fail without warning.',
  },
  mid: {
    hvac: '🟡 Budget Now — approaching end of life in 3–5 years',
    waterheater: '🔴 Replace — 19–21 years is well past useful life',
    stucco: '🟡 Inspect caulk lines around windows and doors annually',
    foundation: '🟢 Minor movement possible — watch for door sticking',
    note: 'Mid-2000s homes should be budgeting for HVAC replacement in the next planning cycle. Water heaters this age frequently develop sediment issues and anode rod failure.',
  },
  late: {
    hvac: '🟡 Plan in 3–5 Years — still in useful range but watch efficiency',
    waterheater: '🟡 Check Age — 17–18 year units are past recommended replacement',
    stucco: '🟢 Inspect every 2 years for cracks near penetrations',
    foundation: '🟢 Well-settled — no major concerns in most DFW areas',
    note: '2008–2009 homes are in good shape structurally but mechanical systems are aging. Replacing the water heater proactively avoids the disruption of an emergency failure.',
  },
};

export default function DFWHomes2000sGuide2026() {
  const [selected, setSelected] = useState<string>('');
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '24px', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>🏗️</div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 700 }}>DFW 2000s Home Owner Guide 2026</h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Built 2000–2009 · DFW Metro · Updated May 2026</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>📅 When Was Your Home Built?</h2>
          <p style={{ color: '#9EB0CC', fontSize: 14, marginBottom: 16 }}>The exact year matters — select your decade range for a tailored maintenance view.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {decades.map(d => (
              <div key={d.id} onClick={() => { setSelected(d.id); setShowGuide(false); }}
                style={{ background: selected === d.id ? '#1A2E50' : '#0D1E38', border: `2px solid ${selected === d.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{d.label}</div>
                  <div style={{ color: '#9EB0CC', fontSize: 13 }}>{d.desc}</div>
                </div>
                <div style={{ fontSize: 22 }}>{selected === d.id ? '✅' : '⬜'}</div>
              </div>
            ))}
          </div>
          {selected && (
            <button onClick={() => setShowGuide(true)}
              style={{ marginTop: 20, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
              📋 Get My 2000s Maintenance Priorities
            </button>
          )}
        </div>

        {showGuide && selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Your 2000s Home Priority Plan</h2>
            <p style={{ color: '#9EB0CC', fontSize: 13, marginBottom: 16 }}>{guide[selected].note}</p>
            {[
              { label: '❄️ HVAC', val: guide[selected].hvac },
              { label: '🔥 Water Heater', val: guide[selected].waterheater },
              { label: '🧱 Stucco/Exterior', val: guide[selected].stucco },
              { label: '🏗️ Foundation', val: guide[selected].foundation },
            ].map(item => (
              <div key={item.label} style={{ background: '#0D1E38', borderRadius: 10, padding: 14, marginBottom: 10, borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#9EB0CC', fontSize: 13 }}>{item.val}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, background: '#F5E6421A', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 13 }}>
              💡 ProLnk connects you with licensed DFW contractors — free quotes, verified pros, no obligation.
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#4A6080', fontSize: 12, marginTop: 32 }}>
          ProLnk Home Intelligence · DFW Metro · 2026
        </div>
      </div>
    </div>
  );
}
