import { useState } from 'react';

const systemTypes = ['Central Split', 'Heat Pump', 'Package Unit', 'Mini-Split'];

const checklistMap: Record<string, string[]> = {
  'Central Split': [
    '🌡️ Thermostat calibration and scheduling test',
    '❄️ Refrigerant charge check (superheat/subcooling)',
    '🧹 Evaporator and condenser coil cleaning',
    '💨 Blower wheel inspection and cleaning',
    '🚿 Condensate drain flush and pan inspection',
    '⚡ Electrical connections torque check',
    '🔌 Capacitor and contactor inspection',
    '🔧 Blower belt tension and motor lubrication',
    '📦 Filter replacement (MERV 8+ recommended)',
    '📊 Static pressure measurement',
  ],
  'Heat Pump': [
    '🌡️ Thermostat calibration and emergency heat test',
    '❄️ Refrigerant charge check (both modes)',
    '🔁 Reversing valve operation test',
    '🧹 Evaporator and condenser coil cleaning',
    '💨 Blower wheel inspection and cleaning',
    '🚿 Condensate drain flush',
    '⚡ Defrost board and cycle verification',
    '🔌 Capacitor and contactor inspection',
    '📦 Filter replacement (MERV 8+ recommended)',
    '🌡️ Auxiliary heat verification and lockout temp check',
  ],
  'Package Unit': [
    '🌡️ Thermostat calibration',
    '❄️ Refrigerant charge check',
    '🧹 Full coil cleaning (combined unit)',
    '💨 Blower wheel and belt inspection',
    '🚿 Condensate drain and pan inspection',
    '⚡ Electrical connections and disconnect check',
    '🔌 Capacitor and contactor inspection',
    '📦 Filter replacement',
    '🔧 Economizer damper operation (if equipped)',
    '📊 Ductwork connection inspection at unit',
  ],
  'Mini-Split': [
    '🌡️ Thermostat/remote calibration',
    '❄️ Refrigerant charge check',
    '🧹 Indoor air handler coil and filter cleaning',
    '🧹 Outdoor condenser coil cleaning',
    '💨 Blower wheel inspection',
    '🚿 Condensate drain line inspection',
    '⚡ Electrical connections at indoor and outdoor unit',
    '🔌 Capacitor inspection (outdoor unit)',
    '📱 Wi-Fi/smart controller sync test',
    '🔧 Refrigerant line set inspection',
  ],
};

const techQuestions = [
  '❓ What was the refrigerant charge reading (superheat/subcooling)?',
  '❓ What is the static pressure and is it within spec?',
  '❓ Did you find any microbial growth on the coil or drain pan?',
  '❓ What is the estimated remaining life on the blower motor?',
  '❓ Were any electrical components showing signs of failure?',
  '❓ What filter rating do you recommend for my system and home?',
  '❓ Is the equipment sized correctly for my DFW square footage?',
];

export default function DFWAnnualHVACInspection2026() {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (item: string) =>
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));

  const items = selected ? checklistMap[selected] : [];
  const done = items.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#E8F4FD' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Annual HVAC Inspection Checklist 2026</h1>
          <p style={{ color: '#8BA3BC', fontSize: 14 }}>What a proper DFW HVAC inspection covers — select your system type below</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 10 }}>Select Your System Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {systemTypes.map(t => (
              <button key={t} onClick={() => { setSelected(t); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === t ? '#F5E642' : '#1E3A5F', background: selected === t ? '#F5E642' : 'transparent', color: selected === t ? '#0A1628' : '#E8F4FD', fontWeight: 600, cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: 0 }}>{selected} Inspection Checklist</h2>
              <span style={{ color: done === items.length ? '#4ADE80' : '#8BA3BC', fontWeight: 600 }}>{done}/{items.length} ✓</span>
            </div>
            {items.map(item => (
              <div key={item} onClick={() => toggle(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#1E3A5F', background: checked[item] ? '#F5E642' : 'transparent', flexShrink: 0 }} />
                <span style={{ color: checked[item] ? '#8BA3BC' : '#E8F4FD', textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>💬 What to Ask Your Tech</h2>
          {techQuestions.map((q, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < techQuestions.length - 1 ? '1px solid #1E3A5F' : 'none', color: '#E8F4FD', fontSize: 14 }}>{q}</div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#3D5A80', fontSize: 12, marginTop: 24 }}>ProLnk · DFW HVAC Inspection Guide 2026</p>
      </div>
    </div>
  );
}