import { useState } from 'react';

const situations = [
  { id: 'gravity', label: 'Unit drains by gravity', guide: 'Install secondary drain line 1″ above primary pan outlet, route to visible location (e.g., over a window or exterior wall). Homeowner sees drip = immediate service call.' },
  { id: 'noDrain', label: 'Unit cannot gravity drain', guide: 'Install a condensate pump rated for your BTU load. Float switch on pump cuts power to unit on pump failure. Check pump monthly in DFW summer.' },
  { id: 'floatSwitch', label: 'Test my float switch', guide: 'Pour water slowly into secondary pan until float rises. Unit should shut off within 30 seconds. If not, check wiring at air handler disconnect and float switch terminals.' },
  { id: 'overflow', label: 'Had overflow already', guide: 'Check: primary line clogged (flush with N2 or wet-vac), secondary line blocked, or float switch failed. DFW humidity = flush primary line every 60 days minimum.' },
];

export default function DFWHVACCondensateGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ProLnk DFW HVAC Series</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>DFW AC Condensate Deep Dive 2026 — Part 2</h1>
        <p style={{ color: '#a0aec0', marginBottom: 24 }}>Secondary drain prevention, pan float switches, and condensate pumps for Dallas-Fort Worth homes.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>💧 Why Secondary Drains Matter in DFW</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6, marginBottom: 10 }}>DFW summers push AC units to run 14–18 hours daily. A clogged primary condensate line can overflow a pan in under an hour, soaking ceilings and drywall. A properly routed secondary line drips outside where you can see it — your early warning system.</p>
          <ul style={{ color: '#cbd5e0', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Secondary line: route to visible exterior location or over a window</li>
            <li>Pan float switch: cuts 24V to contactor on high water</li>
            <li>Condensate pump: required when unit is below drain level</li>
            <li>Flush primary line every 60 days — DFW humidity demands it</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔌 Float Switch Wiring Basics</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>Wire float switch in series with the Y (cooling) terminal at the air handler. When float rises, the circuit opens and the compressor shuts off — preventing overflow damage while still allowing fan to run.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Interactive: Your Situation → Prevention Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Your Guide:</p>
              <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Need a DFW HVAC Pro?</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects you with verified DFW HVAC technicians who know condensate systems. Free quotes, no obligation.</p>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}