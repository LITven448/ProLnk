import { useState } from 'react';

const systemTypes = ['Central Split System', 'Heat Pump', 'Package Unit', 'Mini-Split'];

const checklists: Record<string, string[]> = {
  'Central Split System': [
    '🌡️ Thermostat calibration check (±1°F accuracy)',
    '❄️ Refrigerant charge measurement (superheat/subcooling)',
    '🧹 Evaporator coil cleaning (indoor unit)',
    '🧹 Condenser coil cleaning (outdoor unit)',
    '💨 Blower wheel inspection and cleaning',
    '💧 Condensate drain flush and pan check',
    '⚡ Electrical connections tightened and tested',
    '🔧 Capacitor and contactor inspection',
    '🔵 Filter replacement or cleaning',
    '🔩 Fan motor lubrication and amp draw test',
  ],
  'Heat Pump': [
    '🌡️ Thermostat and reversing valve check',
    '❄️ Refrigerant charge (heating AND cooling modes)',
    '🧹 Both evaporator and condenser coil cleaning',
    '💨 Blower wheel inspection',
    '💧 Condensate drain flush',
    '⚡ Defrost board and sensor test',
    '🔧 Capacitor, contactor, and auxiliary heat check',
    '🔵 Filter replacement',
    '📋 Backup heat strip amp draw verification',
  ],
  'Package Unit': [
    '🌡️ Thermostat calibration',
    '❄️ Refrigerant charge check',
    '🧹 Combined coil cleaning (single cabinet)',
    '💨 Blower wheel and duct collar check',
    '💧 Condensate drain and pan inspection',
    '⚡ All electrical connections in single cabinet',
    '🔧 Belt and motor inspection (if applicable)',
    '🔵 Filter replacement',
    '🔩 Vibration isolator check',
  ],
  'Mini-Split': [
    '🌡️ Remote/thermostat calibration per zone',
    '❄️ Refrigerant charge per zone',
    '🧹 Indoor cassette filter and coil cleaning',
    '🧹 Outdoor condenser coil cleaning',
    '💧 Individual condensate line check per head',
    '⚡ Communication wire and electrical connections',
    '🔧 Inverter board inspection',
    '🔵 Washable filter cleaning',
    '📋 Multi-zone operation test in sequence',
  ],
};

const questions = [
  '❓ What is the refrigerant charge reading (superheat/subcooling)?',
  '❓ Did you find any refrigerant loss — if so, where?',
  '❓ What is the static pressure reading across the system?',
  '❓ What is the temperature differential (supply vs return)?',
  '❓ Are there any components showing signs of early failure?',
  '❓ What is the estimated remaining life of this system?',
];

export default function DFWAnnualHVACInspection2026() {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const items = selected ? checklists[selected] : [];
  const doneCount = items.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E2E8F0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Annual HVAC Inspection Checklist 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Texas heat demands a thorough annual inspection — use this to hold your tech accountable.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Select Your System Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {systemTypes.map(s => (
              <button key={s} onClick={() => { setSelected(s); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === s ? '#F5E642′ : '#1E3A5F', background: selected === s ? '#F5E642' : ’transparent', color: selected === s ? '#0A1628′ : '#94A3B8', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <>
            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>{selected} Checklist</h2>
                <span style={{ background: doneCount === items.length ? '#16A34A' : '#1E3A5F', color: doneCount === items.length ? '#fff' : '#94A3B8', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{doneCount}/{items.length}</span>
              </div>
              {items.map(item => (
                <div key={item} onClick={() => toggleItem(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid', borderColor: checked[item] ? '#F5E642′ : '#334155', background: checked[item] ? '#F5E642' : ’transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checked[item] && <span style={{ color: '#0A1628', fontSize: 13, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ color: checked[item] ? '#64748B' : '#E2E8F0', fontSize: 14, textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 14 }}>🗣️ Ask Your Tech These Questions</h2>
              {questions.map(q => (
                <div key={q} style={{ padding: '9px 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', fontSize: 14 }}>{q}</div>
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk connects you with vetted DFW HVAC pros — prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
