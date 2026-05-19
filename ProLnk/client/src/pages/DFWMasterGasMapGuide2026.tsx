import { useState } from 'react';

const gasItems = [
  { id: 'meter', label: '⛽ Main Meter Shutoff', desc: 'At Atmos gas meter outside. Quarter-turn valve — parallel to pipe = on, perpendicular = off. Requires wrench. Only Atmos can restore.' },
  { id: 'appliance', label: '🍳 Appliance Shutoffs', desc: 'Behind every gas appliance — range, dryer, water heater, fireplace. Locate and label each. Test that they turn.' },
  { id: 'csst', label: '🔧 CSST vs Black Iron', desc: 'CSST is yellow corrugated flexible tubing. Must be bonded. Black iron is rigid dark pipe. Know what is in your walls and attic.' },
  { id: 'buried', label: '🌍 Buried Gas Lines', desc: 'Map where gas enters home, exterior buried path to meter. Critical before any digging or foundation work.' },
  { id: 'atmos', label: '📞 Atmos Emergency', desc: 'Atmos Energy 24/7 emergency: 1-866-322-8667. Post this number inside your panel door and in your Home Health Vault.' },
];

const applianceGuides: Record<string, string[]> = {
  few: ['1-3 appliances: range or water heater + dryer', 'Simple shutoff map — one page sufficient', 'Verify each shutoff valve turns freely', 'Label each with appliance name and shutoff direction'],
  medium: ['4-6 appliances: add fireplace or generator hookup', 'Create room-by-room shutoff map', 'Check CSST bonding at panel — required by code', 'Photograph each shutoff valve location'],
  many: ['7+ appliances: outdoor kitchen, pool heater, generator, etc.', 'Full gas map drawing recommended — floor plan with gas lines', 'Annual professional inspection suggested', 'CSST bonding inspection priority — multiple runs increase risk'],
};

export default function DFWMasterGasMapGuide2026() {
  const [activeItem, setActiveItem] = useState('meter');
  const [appCount, setAppCount] = useState('');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const guide = appCount ? applianceGuides[appCount] : null;
  const active = gasItems.find(s => s.id === activeItem);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Master Gas Map Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Gas leaks are DFW's most dangerous home emergency. Map your gas system now — before you need it.</p>

        <div style={{ background: '#7f1d1d', borderRadius: 10, padding: 14, marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 22 }}>🚨</span>
          <span style={{ fontSize: 14, color: '#fca5a5′ }}>Smell gas? Leave immediately. Do not flip switches. Call Atmos: <strong>1-866-322-8667</strong> from outside.</span>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {gasItems.map(s => (
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
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Appliance Count → Gas System Map Guide</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {['few', 'medium', 'many'].map(t => (
              <button key={t} onClick={() => setAppCount(t)}
                style={{ background: appCount === t ? '#F5E642′ : '#0A1628', color: appCount === t ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 8, padding: '8px 16px', cursor: ’pointer', fontWeight: 600 }}>
                {t === 'few' ? '1–3 Appliances' : t === 'medium' ? '4–6 Appliances' : '7+ Appliances'}
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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Need a plumber for gas line inspection?</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>ProLnk connects DFW homeowners with licensed plumbers for gas line inspections and mapping.</p>
          <a href="https://prolnk.io" style={{ background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Get Gas Line Quotes →</a>
        </div>
      </div>
    </div>
  );
}
