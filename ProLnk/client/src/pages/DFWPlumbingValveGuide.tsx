import { useState } from 'react';

const valves = [
  { id: 'main', label: 'Main Water Shutoff', emoji: '🚰', location: 'Front of home near the street, typically in a ground-level box labeled "water" or in the garage wall near the front', operate: 'Turn clockwise (righty-tighty) until fully closed. Ball valves: 90° turn to closed position.' },
  { id: 'fixture', label: 'Individual Fixture Shutoffs', emoji: '🪠', location: 'Under sinks in cabinet, behind toilet near floor, under dishwasher', operate: 'Turn clockwise until closed. These are small oval or oval-handle valves.' },
  { id: 'hosebib', label: 'Hose Bib Shutoffs', emoji: '🌿', location: 'Indoors behind the exterior wall where the hose bib is, often in a utility closet or under the house', operate: 'Turn clockwise to close. Prevents outdoor freeze damage in DFW cold snaps.' },
  { id: 'irrigation', label: 'Irrigation Main Shutoff', emoji: '💧', location: 'Near the main water meter or in an irrigation control box in the front yard', operate: 'Ball valve or gate valve. Locate before a DFW freeze event — irrigation lines burst easily.' },
  { id: 'wh', label: 'Water Heater Gas Shutoff', emoji: '🔥', location: 'On the gas supply line within 6 inches of the water heater unit itself', operate: 'Turn the handle perpendicular (90°) to the pipe to close. Call gas company if you smell gas first.' },
];

const emergencies = [
  { label: 'Pipe burst — water spraying', valves: ['main'], tip: 'Shut main immediately, then call a plumber. DFW clay soil pressure makes pipe bursts more common in winter.' },
  { label: 'Toilet overflowing', valves: ['fixture'], tip: 'Find the oval valve behind the toilet base. Turn clockwise. Works even if clog is severe.' },
  { label: 'Sink or dishwasher leak', valves: ['fixture'], tip: 'Locate under-sink shutoff valves. Have a towel ready — residual water in lines will drain.' },
  { label: 'Irrigation line break', valves: ['irrigation'], tip: 'DFW freeze events (Feb 2021 style) can burst irrigation lines. Know this valve before winter.' },
  { label: 'Water heater leak or gas smell', valves: ['wh', 'main'], tip: 'For gas smell: leave home, call 800-ONE-CALL. For water leak: shut water heater valve first, then main if needed.' },
  { label: 'Pre-freeze preparation (DFW winter)', valves: ['hosebib', 'irrigation'], tip: 'Before any DFW freeze warning: shut hose bib interiors and irrigation main. Disconnect garden hoses.' },
];

export default function DFWPlumbingValveGuide() {
  const [emergency, setEmergency] = useState<null | typeof emergencies[0]>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>5 Valves Every DFW Homeowner Must Know</h1>
        <p style={{ color: '#8A9BB5', marginBottom: 32 }}>
          In a plumbing emergency, knowing where your shutoff valves are can mean the difference between a $200 repair and $20,000 in water damage. DFW homes have unique locations — here is your complete guide.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Your 5 Critical Valves</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {valves.map(v => (
            <div key={v.id} style={{ background: '#111F3A', borderRadius: 8, padding: '16px 20px' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{v.emoji} {v.label}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>WHERE: </span>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{v.location}</span>
              </div>
              <div>
                <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>HOW: </span>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{v.operate}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🚨 Emergency Lookup — Which Valve Do I Use?</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
            {emergencies.map((e, i) => (
              <button key={i} onClick={() => setEmergency(e)} style={{ background: emergency?.label === e.label ? '#F5E642' : '#0A1628', color: emergency?.label === e.label ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {e.label}
              </button>
            ))}
          </div>
          {emergency && (
            <div style={{ padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                Shut: {emergency.valves.map(vid => valves.find(v => v.id === vid)?.label).join(' + ')}
              </div>
              <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{emergency.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111F3A', borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📋 DFW Homeowner Prep Checklist</div>
          <ul style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Walk your home today and photograph each valve location</li>
            <li>Label valves with waterproof tape so any family member can find them</li>
            <li>Test main shutoff annually — stuck valves are common in DFW older homes</li>
            <li>Before any DFW freeze warning: isolate hose bibs and irrigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
