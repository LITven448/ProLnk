import { useState } from 'react';

const plans: Record<string, Record<string, { issue: string; steps: string[]; placement: string; relocate: boolean }>> = {
  smart: {
    sunExposed: { issue: 'Smart thermostat in sun-affected location reads 2–5°F high — very common in DFW south/west-facing walls', steps: ['Use thermostat app to compare displayed temp to a handheld thermometer placed at same height in same room', 'Check for afternoon sun hitting thermostat directly or through nearby window', 'Confirm no electronics (TV, lamps) within 3 feet generating heat', 'Run calibration offset in thermostat settings (most support ±5°F adjustment)'], placement: 'Interior wall, central hallway, 5 ft height, away from vents and windows', relocate: true },
    interior: { issue: 'Likely accurate — smart thermostats auto-calibrate but verify against a reference thermometer', steps: ['Place a quality digital thermometer at thermostat height and wait 15 min', 'Compare readings — if within 1°F, no action needed', 'If off by 2°F+, use the app calibration offset feature', 'Check that vent is not blowing directly at thermostat location', 'Run diagnostic mode if available (Ecobee, Nest both support this)'], placement: 'Current position is likely fine — confirm no direct vent airflow', relocate: false },
  },
  mechanical: {
    sunExposed: { issue: 'Older mechanical thermostat with sun exposure — reads significantly high; may short-cycle your AC', steps: ['This is a common DFW problem — mechanical bimetal strip thermostats are highly sensitive to radiant heat', 'Tape a piece of paper over thermostat for 2 hours — if temp drops noticeably, sun is the issue', 'Compare to a thermometer held in room center — if difference is 3°F+ consider replacement', 'Recalibration of mechanical units: turn off power, remove face, locate calibration screw (usually behind display), adjust slowly'], placement: 'Must be on interior wall away from direct and indirect sun — DFW west walls are worst', relocate: true },
    interior: { issue: 'Mechanical thermostat on interior wall — check calibration with thermometer comparison', steps: ['Hold digital thermometer at same height as thermostat and wait 15 min', 'If reading differs by more than 2°F, thermostat needs calibration or replacement', 'Mechanical calibration: small screw adjustment on thermostat body (see manual)', 'Consider upgrading — mechanical stats drift 1–3°F over years; a $25 digital programmable is more accurate', 'DFW tip: check that attic heat is not infiltrating through wall where thermostat mounts'], placement: 'Interior wall position is correct — verify no attic heat infiltration through wall', relocate: false },
  },
};

export default function DFWThermostatCalibration() {
  const [thermostatType, setThermostatType] = useState('smart');
  const [location, setLocation] = useState('interior');

  const result = plans[thermostatType]?.[location];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Thermostat Calibration for DFW Homes</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          If your DFW home never feels as cool as the thermostat says, your thermostat may be reading wrong. DFW's intense sun, heat from electronics, and poor thermostat placement are the most common culprits.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>☀️ Why DFW Homes Have This Problem</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            DFW has 230+ sunny days per year. Thermostats on south or west-facing walls receive significant radiant heat — even without direct sunlight. A thermostat reading 78°F on such a wall may be measuring the wall temperature, not the room air temperature. Your AC shuts off because the thermostat is satisfied, but the rest of the house is 81°F.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Electronics (TVs, routers, gaming consoles) add 3–10°F of localized heat. A thermostat near an entertainment center in a DFW home will systematically over-cool the house to compensate for the localized heat source.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🌡️ Check Your Thermostat</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Thermostat Type</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['smart', '📱 Smart (Nest, Ecobee, etc.)'], ['mechanical', '🔩 Older / Mechanical']].map(([val, label]) => (
                  <button key={val} onClick={() => setThermostatType(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${thermostatType === val ? '#F5E642' : '#1E3A5F'}`, background: thermostatType === val ? '#F5E642' : 'transparent', color: thermostatType === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Thermostat Wall Location</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['sunExposed', '☀️ South or West Wall'], ['interior', '🏠 Interior / Hallway Wall']].map(([val, label]) => (
                  <button key={val} onClick={() => setLocation(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${location === val ? '#F5E642' : '#1E3A5F'}`, background: location === val ? '#F5E642' : 'transparent', color: location === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ color: '#E8EAF0', fontWeight: 600, marginBottom: 16, lineHeight: 1.6 }}>{result.issue}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 10 }}>Calibration Steps</div>
              <ol style={{ paddingLeft: 20, color: '#94A3B8', lineHeight: 1.9, marginBottom: 16 }}>
                {result.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
              <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 14, marginBottom: result.relocate ? 12 : 0 }}>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>Ideal Placement: </span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{result.placement}</span>
              </div>
              {result.relocate && (
                <div style={{ background: '#2D1A00', border: '1px solid #F59E0B', borderRadius: 10, padding: 14 }}>
                  <span style={{ color: '#F59E0B', fontWeight: 600, fontSize: 13 }}>⚠️ Relocation Recommended — </span>
                  <span style={{ color: '#94A3B8', fontSize: 13 }}>Moving your thermostat to an interior wall often solves DFW comfort problems without any equipment changes. Cost: $75–$200 for a licensed tech.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 14, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>Get a Thermostat Assessment</div>
          <div style={{ fontSize: 14, color: '#1E3A5F' }}>A DFW HVAC tech can verify calibration, check placement, and relocate your thermostat in a single service call.</div>
        </div>
      </div>
    </div>
  );
}
