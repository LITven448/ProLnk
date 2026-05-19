import { useState } from 'react';

const tips = [
  { type: 'Single Story', items: ['Pre-cool to 72°F before 4pm ERCOT peak', 'Run ceiling fans — raises comfort 4°F allowing higher thermostat', 'Insulate attic hatch door with R-30 cover', 'Seal recessed light gaps with foam backer rod', 'Close vents in unused rooms to redirect airflow'] },
  { type: 'Two Story', items: ['Set downstairs thermostat 2°F warmer than upstairs', 'Pre-cool upper zone by 3pm before 4-7pm peak', 'Ceiling fans on every floor — counterclockwise in summer', 'Seal attic knee wall doors with weatherstripping', 'Insulate attic hatch on upper floor — biggest heat source'] },
  { type: 'Townhouse', items: ['Shared walls help — focus on roof and windows', 'Reflective window film on west-facing glass', 'Pre-cool 1 hour before ERCOT 4-7pm peak daily', 'Run ceiling fans to delay AC cycling', 'Insulate and air-seal any attic access'] },
  { type: 'Older Home (pre-1990)', items: ['Check duct leakage — older homes lose 30%+ in attics', 'Add attic insulation to R-38 minimum', 'Replace weatherstripping on all exterior doors', 'Seal around plumbing and electrical penetrations in ceiling', 'Consider duct mastic sealant before next summer'] },
];

export default function DFWSummerHVACOptimize2026() {
  const [selected, setSelected] = useState(0);
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Summer HVAC Optimization Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Beat the DFW heat — advanced tips for peak performance during ERCOT crunch hours</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ ERCOT Peak Hours: 4–7pm Daily</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ERCOT grid stress peaks every DFW summer afternoon. Pre-cooling your home before 4pm and reducing AC load during peak hours cuts your bill and protects the grid. Set smart thermostat schedules now.</p>
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>Select Your Home Type</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {tips.map((t, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{t.type}</button>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 {tips[selected].type} — Summer Optimization Checklist</h3>
          {tips[selected].items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontSize: 18, minWidth: 24 }}>✓</span>
              <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>🌡️ Pro Tip: Thermostat Strategy</h3>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Set thermostat to 74°F, run ceiling fans, and pre-cool to 71°F at 3pm. You'll stay comfortable through peak hours without heavy AC load. Each degree higher saves ~3% on cooling costs.</p>
        </div>
        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>ProLnk — Connecting DFW Homeowners with Trusted HVAC Pros</p>
      </div>
    </div>
  );
}
