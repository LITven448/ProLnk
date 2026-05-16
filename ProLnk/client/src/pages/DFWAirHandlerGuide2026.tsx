import { useState } from 'react';

const situations = [
  { id: 'attic_heat', label: 'Air handler in attic — is this a problem?', diagnosis: 'Most DFW homes have horizontal air handlers in the attic — standard for this climate. The downside: attic temps hit 140-160°F in summer, forcing the unit to work in extreme heat. Proper attic insulation (R-38+) and sealed ductwork are critical. Attic air handlers do work fine in DFW but demand annual drain pan and duct inspection.' },
  { id: 'drain', label: 'Water dripping from air handler or ceiling stain', diagnosis: 'Clogged condensate drain — the most common DFW summer emergency. Horizontal attic air handlers have a primary drain and an overflow pan. When primary clogs, overflow pan fills and may leak through ceiling. Flush primary drain with diluted bleach monthly in summer. Install a float switch ($30) that shuts off the system before overflow pan overflows.' },
  { id: 'age', label: 'Air handler is older than outdoor unit', diagnosis: 'Mismatched air handler and outdoor unit age is a real issue. DFW contractors sometimes replace only the outdoor unit to save cost. Mismatched systems lose 10-20% efficiency versus matched pairs. Also, R-22 air handlers cannot accept new refrigerants without coil replacement. Get a full system assessment before replacing only one component.' },
  { id: 'orientation', label: 'Horizontal vs vertical air handler — which is better?', diagnosis: 'Horizontal (attic) and vertical (closet/garage) units both work in DFW. Horizontal units require more drain pan vigilance due to orientation. Vertical units in conditioned spaces are easier to service and run in milder temperatures, extending component life. If you have a choice during replacement, vertical in a conditioned closet is preferred.' },
  { id: 'replace', label: 'Air handler replacement — what to know', diagnosis: 'Air handler replacement costs $1,200-2,500 installed in DFW. Match AHRI rating between indoor and outdoor unit — mismatched systems lose efficiency guarantee and may void warranty. In DFW, upgrade to a unit with stainless drain pan (not plastic) and include UV light installation at same time. Bundle with outdoor unit replacement for best pricing.' },
];

export default function DFWAirHandlerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏠 Air Handler Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 15, marginBottom: 28 }}>
          Your DFW air handler (the indoor unit) houses the evaporator coil, blower motor, and drain system. Attic installation in extreme heat makes drain maintenance the #1 priority in North Texas.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔆', title: 'Attic Installation in DFW', body: 'Roughly 85% of DFW homes have horizontal air handlers in the attic. This is climate-appropriate but demands more maintenance than ground-level installs. Attic heat (140-160°F summer) stresses components faster. Annual inspection of drain pan, coil, and blower is essential — not optional — in DFW attic installs.' },
            { icon: '💧', title: 'Drain Pan Critical for DFW Humidity', body: 'DFW humidity generates 15-25 gallons of condensate per day from a typical 4-ton system. Primary drain clogs with algae in weeks during summer without monthly bleach treatment. Secondary pan overflow means ceiling damage. A $30 float switch that kills the system before overflow is the best $30 you will spend on your HVAC.' },
            { icon: '🔗', title: 'Age Matching — Critical', body: 'An older air handler paired with a new outdoor unit creates an efficiency mismatch. The AHRI certified efficiency rating only applies to matched systems. In DFW, if your outdoor unit dies at year 12, replacing only the outdoor unit saves $800-1,000 upfront but costs more in efficiency every month for the next 10 years.' },
            { icon: '🌡️', title: 'Component Life in DFW Attics', body: 'Expected component life in DFW attic conditions: capacitors 6-9 years (vs 12-15 in conditioned space), fan motors 8-12 years (vs 15-20), control boards 8-12 years. Conditioned-space air handlers routinely outlast warranty by 5+ years. If you are building or doing a major renovation, a closet or garage install pays long-term dividends.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '18px 20px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon} <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642' }}>{card.title}</span></div>
              <p style={{ color: '#B0B8CC', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Air Handler Situation Guide</h2>
          <p style={{ color: '#9BA3B4', fontSize: 14, marginBottom: 16 }}>Select your situation for a service recommendation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#162035', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
              <p style={{ color: '#E8EAF0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: '18px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>🏠 Get a DFW Air Handler Quote</div>
          <div style={{ fontSize: 13, color: '#1A2A4A' }}>ProLnk connects you with vetted DFW HVAC pros — free, no commitment.</div>
        </div>
      </div>
    </div>
  );
}