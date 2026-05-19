import { useState } from 'react';

const issues = [
  { id: 'warm-air', label: 'Air coming out warm but AC running', guide: 'Classic dirty evaporator coil — ice may be forming on coil, blocking airflow. Turn off AC, run fan only to thaw, then clean coil. DFW humidity makes this common.' },
  { id: 'humid-home', label: 'Home feels humid even with AC running', guide: 'Evaporator coil dehumidifies as it cools. A dirty or undersized coil reduces dehumidification. In DFW summers, a clean full-size coil is critical for comfort.' },
  { id: 'freezing-up', label: 'Ice on indoor unit / lines', guide: 'Frozen evaporator coil. Causes: dirty coil restricting airflow, low refrigerant, or blower motor failure. DFW humidity means ice can form fast — shut down system immediately.' },
  { id: 'musty-smell', label: 'Musty smell from vents', guide: 'Mold on evaporator coil or drain pan — extremely common in DFW due to high humidity. Coil cleaning + UV light installation recommended. Change filter monthly in summer.' },
  { id: 'high-bills', label: 'Electric bills spiking in DFW summer', guide: 'Dirty evaporator coil forces compressor to work harder. A 30% dirty coil increases energy use 20-30%. Annual coil cleaning pays for itself in DFW.' },
];

export default function DFWHVACEvaporatorGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = issues.find(i => i.id === selected);

  const facts = [
    { icon: '❄️', title: 'What the Coil Does', body: 'Refrigerant evaporates inside the coil, absorbing heat from air. This cools the air AND removes moisture (dehumidification).' },
    { icon: '💧', title: 'DFW Dehumidification', body: 'DFW summer dew points hit 70°F+. The evaporator coil is your primary dehumidifier — a dirty coil means a muggy home.' },
    { icon: '📍', title: 'Coil Location', body: 'Located inside the air handler (indoor unit) — typically attic in DFW homes. Sits above the condensate drain pan.' },
    { icon: '📐', title: 'Coil Sizing Matters', body: 'Coil must match tonnage. Undersized coil in DFW = poor dehumidification + system short-cycling. Always replace coil and condenser together.' },
    { icon: '🧹', title: 'Cleaning Schedule', body: 'DFW homeowners should clean evaporator coil annually — spring before cooling season. Dusty attics accelerate buildup.' },
    { icon: '🌡️', title: 'Coil Temperature', body: 'Coil surface should be 35-45°F during operation. Below 32°F = ice risk. DFW high humidity accelerates ice formation on dirty coils.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 4, display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW HVAC 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Evaporator Coil Complete Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Everything DFW homeowners need to know about evaporator coils: cooling, dehumidification, dirty coil effects, and DFW-specific issues.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 HVAC Performance Issue → Evaporator Coil Assessment</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {issues.map(i => (
              <button key={i.id} onClick={() => setSelected(i.id)}
                style={{ background: selected === i.id ? '#F5E642′ : '#0A1628', color: selected === i.id ? '#0A1628' : '#fff', border: '1px solid #2d3f5a', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600 }}>
                {i.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 16, background: '#0d1f2e', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🔧 DFW Assessment</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.guide}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, fontSize: 13, color: '#94a3b8′ }}>
          <strong style={{ color: '#F5E642′ }}>ProLnk Tip:</strong> DFW HVAC coil cleaning is a high-demand service April-May. Homeowners with humidity complaints and running AC are almost always dealing with a dirty evaporator coil — quick diagnostic win for HVAC pros.
        </div>
      </div>
    </div>
  );
}