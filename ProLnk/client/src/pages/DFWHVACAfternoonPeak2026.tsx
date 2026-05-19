import { useState } from 'react';

export default function DFWHVACAfternoonPeak2026() {
  const [homeType, setHomeType] = useState('');
  const [strategy, setStrategy] = useState('');
  const [result, setResult] = useState('');

  const tips: Record<string, Record<string, string>> = {
    single: {
      none: 'Pre-cool to 72°F by 3:30pm. Raise setpoint to 78°F at 4pm. Run ceiling fans in occupied rooms. Close west-facing blinds by 2pm. Enroll in ERCOT demand response for bill credits.',
      precool: 'Great start. Confirm setpoint rises to 78°F at 4pm. Add ceiling fans — they let you feel 4°F cooler. Check for west-window blackout curtains to cut solar gain 30%.',
      smart: 'Enable your thermostat’s peak-period schedule: 72°F until 3:30pm, 78°F 4-7pm, resume 74°F at 7pm. Pair with ERCOT demand response enrollment for direct bill credits.',
    },
    duplex: {
      none: 'Shared walls help retain cool air. Pre-cool to 71°F by 3:30pm, hold 77°F during peak. Coordinate with neighbor if shared HVAC. West units feel peak heat more — prioritize blackout curtains.',
      precool: 'Good. Raise to 77°F at 4pm. Ceiling fans help on upper floors where heat pools. Check attic insulation — duplex attics often undersized and major heat source 4-7pm.',
      smart: 'Schedule 71°F pre-cool, 77°F peak window. If two-zone, cool sleeping areas less aggressively during peak. Enroll in ERCOT demand response for both units if separate meters.',
    },
    townhome: {
      none: 'Three-story townhomes trap heat on upper floors during peak. Pre-cool upper floor to 70°F by 3pm. Close stairwell doors during peak to isolate cool lower levels. Fans push cool air upward overnight.',
      precool: 'Smart. Upper floors need earlier pre-cool (3pm, not 3:30). During peak keep upper floor at 79°F — it will feel like 75°F with ceiling fans. West glass is your biggest enemy.',
      smart: 'Multi-zone scheduling: lower 74°F, upper 78°F during peak. Smart vent controllers can redirect airflow. Enroll in ERCOT demand response — townhome portfolio owners get premium credits.',
    },
  };

  function analyze() {
    if (!homeType || !strategy) return;
    setResult(tips[homeType]?.[strategy] || 'Select both options to see your optimization guide.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌡️</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW HVAC Afternoon Peak 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Managing your system during ERCOT's 4–7pm peak demand window</p>

        {[
          { emoji: '🕒', time: 'By 3:30pm', action: 'Pre-cool interior to 72°F' },
          { emoji: '📈', time: '4:00pm sharp', action: 'Raise setpoint to 78°F' },
          { emoji: '💨', time: 'All peak hours', action: 'Run ceiling fans in occupied rooms' },
          { emoji: '🪟', time: 'By 2pm', action: 'Close blackout curtains on west windows' },
          { emoji: '💵', time: 'Anytime', action: 'Enroll in ERCOT demand response for bill credits' },
        ].map((item) => (
          <div key={item.time} style={{ background: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 22 }}>{item.emoji}</span>
            <div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{item.time}</div>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>{item.action}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 22, marginTop: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>⚡ Your Peak Optimization</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Home type</label>
            <select value={homeType} onChange={(e) => setHomeType(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select type</option>
              <option value="single">Single-family</option>
              <option value="duplex">Duplex</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Current strategy</label>
            <select value={strategy} onChange={(e) => setStrategy(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select strategy</option>
              <option value="none">No strategy yet</option>
              <option value="precool">Manual pre-cooling</option>
              <option value="smart">Smart thermostat schedule</option>
            </select>
          </div>
          <button onClick={analyze}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Peak Plan
          </button>
          {result && <div style={{ marginTop: 16, background: '#162d4a', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}