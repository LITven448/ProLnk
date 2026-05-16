import { useState } from 'react';

const steps = [
  { emoji: '🚰', title: 'Drip Faucets', detail: 'When temps drop below 28°F: drip cold water from faucets on exterior walls. Moving water resists freezing.' },
  { emoji: '🔒', title: 'Outdoor Hose Bibs', detail: 'Disconnect all garden hoses. Install foam covers. If you have a frost-free sillcock, it still needs protection if hose is attached.' },
  { emoji: '🌿', title: 'Irrigation Backflow Preventer', detail: 'The backflow preventer on your irrigation system can crack in a freeze. Wrap with insulation and a foam cover. Ideally, blow out lines before Dec 1.' },
  { emoji: '🏊', title: 'Pool Equipment', detail: 'Run pool pump on freeze protection mode (continuous or scheduled for cold hours). Wrap pump and filter with insulating blankets.' },
  { emoji: '💧', title: 'Well Pump Houses', detail: 'Insulate the pump house and install a small electric heat source. Well pumps freeze quickly and cost $1,500-4,000 to replace.' },
  { emoji: '🌡️', title: 'Water Heater', detail: 'Keep water heater thermostat at 120°F+ and verify the area isn\'t exposed to exterior cold. Garage water heaters are highest risk.' },
];

const checklists: Record<string, { items: string[]; note: string }> = {
  'Single family with sprinklers': {
    items: ['Drain and blow out irrigation system before freeze', 'Wrap backflow preventer in foam insulation', 'Turn off irrigation controller (off — not just "rain mode")', 'Drip all exterior-wall faucets when temp < 28°F', 'Open cabinet doors under kitchen/bath sinks on exterior walls', 'Keep garage door closed to protect water heater'],
    note: 'Most irrigation backflow preventers crack at 28°F if not drained. One burst = $300-800 repair.',
  },
  'Has pool': {
    items: ['Enable freeze protection mode on pool automation system', 'Wrap pump, filter, and heater with insulating blankets', 'Keep pool running on a timer during freeze hours (midnight-9am)', 'Do NOT drain pool — water helps protect pipes', 'Check pool light for water intrusion before freeze', 'Call pool company if freeze protection setting is unclear'],
    note: 'Pool pump freeze protection typically runs when temp drops below 35°F. Verify your automation is set correctly.',
  },
  'Well water system': {
    items: ['Inspect pump house insulation now — add if any gaps', 'Install electric heat tape on exposed well casing', 'Keep a small electric heater running in pump house during freeze', 'Know where your pressure tank shutoff valve is', 'Store 5+ gallons of water indoors before freeze events', 'Have plumber number saved — well pump repairs are urgent'],
    note: 'Well pumps exposed to freeze events can seize within hours. A pump house heater ($40) prevents a $3,000 repair.',
  },
  'Rental / Investment property': {
    items: ['Set thermostat minimum to 55°F — non-negotiable', 'Notify tenants in writing of drip protocol', 'Confirm backflow preventer and irrigation is winterized', 'If vacant: shut off water at main and drain system', 'Pre-schedule emergency plumber access', 'Document pre-freeze condition with photos for insurance'],
    note: 'Vacant properties are highest risk. One pipe burst can cause $30,000-150,000 in interior damage.',
  },
};

export default function DFWFreezeProtectionGuide2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Freeze Protection Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Everything you need to protect your DFW home when temps drop below freezing</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {steps.map((s) => (
            <div key={s.title} style={{ background: '#0f2040', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: 12 }}>✅ Your Freeze Protection Checklist</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your property features:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(checklists).map((k) => (
              <button key={k} onClick={() => setSelected(k)}
                style={{ background: selected === k ? '#F5E642' : '#1e3a5f', color: selected === k ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {k}
              </button>
            ))}
          </div>
          {selected && (
            <div>
              <div style={{ background: '#1a2f4a', borderLeft: '4px solid #F5E642', padding: '10px 14px', borderRadius: 4, marginBottom: 16, color: '#94a3b8', fontSize: 13 }}>
                💡 {checklists[selected].note}
              </div>
              <ul style={{ color: '#e2e8f0', lineHeight: 2.2, paddingLeft: 20 }}>
                {checklists[selected].items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628' }}>Get freeze-ready before the next weather alert.</div>
          <div style={{ color: '#0A1628', marginTop: 6 }}>ProLnk connects you with licensed DFW plumbers and irrigation pros.</div>
        </div>
      </div>
    </div>
  );
}
