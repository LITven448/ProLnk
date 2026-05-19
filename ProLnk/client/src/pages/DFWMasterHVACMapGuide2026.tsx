import { useState } from 'react';

const items = [
  { id: 'model', label: '🏷️ Model & Serial', desc: 'Locate model/serial on unit data plate — outdoor unit and air handler. Needed for every service call and warranty claim.' },
  { id: 'filter', label: '🌬️ Filter Size & Location', desc: 'DFW homes often have 1-inch filters at return grilles or 5-inch media filters at air handler. Record size (e.g. 20x25x1) now.' },
  { id: 'thermostat', label: '🌡️ Thermostat', desc: 'Smart (Nest/Ecobee) or conventional? Note model, wire labels, and any C-wire for future upgrades.' },
  { id: 'emergency', label: '🚨 Emergency Shutoff', desc: 'Red switch near air handler — looks like a light switch. Know its location before any service call.' },
  { id: 'condensate', label: '💧 Condensate Drain', desc: 'DFW humidity creates heavy condensate. Locate drain line exit point and secondary pan sensor location.' },
  { id: 'outdoor', label: '📐 Outdoor Unit Clearances', desc: 'Requires 18–24 inches clearance on all sides. Document current clearance. Shrubs reduce efficiency significantly.' },
];

const systemGuides: Record<string, string[]> = {
  single: ['Single system — one set of model/serial numbers', 'One filter location — usually at air handler', 'One thermostat controls all zones', 'Outdoor unit location easy to find — one unit'],
  dual: ['Two systems — document each separately', 'Upstairs and downstairs filters may differ in size', 'Two thermostats — label each with zone (upstairs/downstairs)', 'Two outdoor units — photograph both data plates'],
  zoned: ['Zoned system — multiple dampers in ductwork', 'Control panel location critical — usually utility room', 'Each zone has its own thermostat — map each zone', 'Zone damper locations in attic — photograph for Health Vault'],
};

export default function DFWMasterHVACMapGuide2026() {
  const [activeItem, setActiveItem] = useState('model');
  const [systemType, setSystemType] = useState('');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const guide = systemType ? systemGuides[systemType] : null;
  const active = items.find(s => s.id === activeItem);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Master HVAC Map Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW HVAC systems run 9 months a year. Document yours completely — for emergencies, contractors, and your Home Health Vault.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {items.map(s => (
            <button key={s.id} onClick={() => setActiveItem(s.id)}
              style={{ background: activeItem === s.id ? '#F5E642′ : '#1e2d4a', color: activeItem === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 28 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{active.label}</div>
            <p style={{ color: '#94a3b8', margin: 0 }}>{active.desc}</p>
          </div>
        )}

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>System Type → HVAC Documentation Guide</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {['single', 'dual', 'zoned'].map(t => (
              <button key={t} onClick={() => setSystemType(t)}
                style={{ background: systemType === t ? '#F5E642′ : '#0A1628', color: systemType === t ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 8, padding: '8px 16px', cursor: ’pointer', fontWeight: 600, textTransform: 'capitalize' }}>
                {t === 'single' ? 'Single System' : t === 'dual' ? 'Dual System' : 'Zoned System'}
              </button>
            ))}
          </div>
          {guide && guide.map((tip, i) => (
            <div key={i} onClick={() => toggle(`tip-${i}`)}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', cursor: 'pointer', borderBottom: '1px solid #0A1628′ }}>
              <span style={{ fontSize: 18 }}>{checked.includes(`tip-${i}`) ? '✅' : '⬜'}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Need HVAC service or documentation help?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>ProLnk connects DFW homeowners with certified HVAC techs — free quotes, no obligation.</p>
          <a href="https://prolnk.io" style={{ background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get HVAC Quotes →</a>
        </div>
      </div>
    </div>
  );
}
