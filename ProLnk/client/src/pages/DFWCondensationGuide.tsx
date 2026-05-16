import { useState } from 'react';

const assessments: Record<string, Record<string, { severity: string; cause: string; fixes: string[]; moldRisk: string }>> = {
  light: {
    low: { severity: 'Normal', cause: 'Slight humidity differential — common in DFW spring and fall when humidity spikes briefly', fixes: ['Ensure vent covers are open and unobstructed', 'Run ceiling fan to keep air moving', 'Set fan to AUTO not ON to avoid blowing humid air when not cooling'], moldRisk: 'Low — wipe vents monthly, inspect quarterly' },
    high: { severity: 'Moderate Concern', cause: 'Elevated interior humidity likely above 55% RH — DFW summer infiltration or undersized AC dehumidification', fixes: ['Check and replace air filter', 'Inspect crawlspace/attic vapor barriers', 'Consider whole-home dehumidifier', 'Have HVAC tech check refrigerant charge'], moldRisk: 'Moderate — inspect behind vent covers for black spotting' },
  },
  heavy: {
    low: { severity: 'Investigate', cause: 'Unusual for your area — may indicate duct leak pulling humid attic air or failing vapor barrier', fixes: ['Inspect attic ductwork for disconnected joints', 'Check for attic air leakage into conditioned space', 'Measure indoor RH — should be 40–55%', 'Schedule HVAC inspection'], moldRisk: 'Elevated — visually check vent covers and surrounding drywall' },
    high: { severity: '⚠️ Act Now', cause: 'Severe humidity problem — DFW summer + infiltration + possibly undersized or failing AC unit', fixes: ['Do not ignore: mold growth starts within 24–48 hours on wet drywall', 'Remove vent covers and inspect interior duct boots', 'Check for standing water near air handler', 'Call HVAC tech same day'], moldRisk: 'High — professional mold inspection recommended if ongoing more than 3 days' },
  },
};

export default function DFWCondensationGuide() {
  const [severity, setSeverity] = useState('light');
  const [humidity, setHumidity] = useState('low');

  const result = assessments[severity]?.[humidity];

  const severityColor: Record<string, string> = { Normal: '#22C55E', 'Moderate Concern': '#F59E0B', Investigate: '#F59E0B', '⚠️ Act Now': '#EF4444' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>AC Vent Condensation in DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Condensation on AC vents is extremely common in DFW summers. When outdoor humidity is 70–80% and your vents are blowing 55°F air, moisture forms on contact — just like a cold glass of water. The question is whether it's normal or a mold risk.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>💧 The DFW Humidity Problem</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            DFW sits at the intersection of Gulf moisture and continental air masses. Summer afternoons regularly hit 65–80% relative humidity, and humid air infiltrates homes through door seals, attic bypasses, and duct gaps. When that air contacts a 55°F supply vent, condensation is physics, not a malfunction.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            The problem starts when condensation is persistent (hours, not minutes) or heavy enough to wet surrounding drywall — that's when black mold can establish within 48 hours in DFW heat.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Assess Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Condensation Severity</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['light', '💧 Light (damp to touch)'], ['heavy', '💦 Heavy (dripping)']].map(([val, label]) => (
                  <button key={val} onClick={() => setSeverity(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${severity === val ? '#F5E642' : '#1E3A5F'}`, background: severity === val ? '#F5E642' : 'transparent', color: severity === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Your DFW Location Humidity</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['low', '🌵 Drier (far North DFW / inland)'], ['high', '💧 Humid (South/East DFW)']].map(([val, label]) => (
                  <button key={val} onClick={() => setHumidity(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${humidity === val ? '#F5E642' : '#1E3A5F'}`, background: humidity === val ? '#F5E642' : 'transparent', color: humidity === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: severityColor[result.severity] || '#E8EAF0' }}>{result.severity}</span>
              </div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 4 }}>Root Cause</div>
              <div style={{ color: '#E8EAF0', marginBottom: 20, lineHeight: 1.6 }}>{result.cause}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>Recommended Actions</div>
              <ul style={{ paddingLeft: 20, color: '#94A3B8', lineHeight: 1.9, marginBottom: 20 }}>
                {result.fixes.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>Mold Risk: </span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{result.moldRisk}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 14, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>Persistent Condensation Needs Professional Eyes</div>
          <div style={{ fontSize: 14, color: '#1E3A5F' }}>A DFW HVAC tech can measure indoor humidity, check refrigerant charge, and inspect duct integrity in under an hour.</div>
        </div>
      </div>
    </div>
  );
}
