import { useState } from 'react';

const kitItems = [
  { id: 'water', label: '💧 7-Gal Water Jugs', desc: 'Uri showed DFW: pipes freeze, water stops. 7 gallons per person per day. Fill before freezes. Store in garage.' },
  { id: 'generator', label: '⚡ Portable Generator', desc: 'ERCOT cannot guarantee power in extreme cold. 3,500–7,500W generator handles fridge, heater, lights. Propane backup preferred.' },
  { id: 'heater', label: '🔥 Space Heater', desc: 'For isolated room heating when HVAC fails. Ceramic electric heaters safer indoors. Keep 3-foot clearance always.' },
  { id: 'lights', label: '🔦 Battery Lanterns', desc: 'Two per floor minimum. LED lanterns last 100+ hours on D batteries. Better than candles for fire safety.' },
  { id: 'charger', label: '📱 Phone Charger Bank', desc: '20,000 mAh bank charges phone 5–6 times. Keep charged at all times. Your ProLnk contact and emergency numbers live here.' },
  { id: 'shutoff', label: '🔧 Shutoff Wrench', desc: 'One tool for gas meter shutoff, one for main water shutoff. $15 at hardware store. Tape to water heater location.' },
];

const homeGuides: Record<string, string[]> = {
  small: ['Under 1,500 sq ft — 3,000W generator sufficient', '3-day water supply: ~21 gallons solo', 'One space heater covers primary living area', 'Single lantern per room adequate'],
  medium: ['1,500–3,000 sq ft — 5,500W generator recommended', '3-day supply for family of 4: 84 gallons', 'Two space heaters for upstairs/downstairs', 'Shutoff wrenches at both water meter and gas meter'],
  large: ['3,000+ sq ft or with pool/spa — 7,500W+ generator', 'Pool equipment requires protection — know drain valve location', '3 or more space heaters for zone coverage', 'Whole-home standby generator worth evaluating after Uri'],
};

export default function DFWEmergencyHomeKitGuide2026() {
  const [activeItem, setActiveItem] = useState('water');
  const [homeSize, setHomeSize] = useState('');
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const guide = homeSize ? homeGuides[homeSize] : null;
  const active = kitItems.find(s => s.id === activeItem);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Home Emergency Kit Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Uri 2021 changed DFW forever. Every DFW homeowner needs these 7 things ready before the next emergency hits.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {kitItems.map(s => (
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
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Home Size → Emergency Kit Checklist</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {['small', 'medium', 'large'].map(t => (
              <button key={t} onClick={() => setHomeSize(t)}
                style={{ background: homeSize === t ? '#F5E642′ : '#0A1628', color: homeSize === t ? '#0A1628' : '#fff', border: '1px solid #2d4a6e', borderRadius: 8, padding: '8px 16px', cursor: ’pointer', fontWeight: 600, textTransform: 'capitalize' }}>
                {t === 'small' ? 'Small (&lt;1,500 sq ft)' : t === 'medium' ? 'Medium (1,500–3,000)' : 'Large (3,000+)'}
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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Save ProLnk in your phone now</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 12px' }}>When a pipe bursts at 2am during a DFW freeze, ProLnk connects you with emergency plumbers fast.</p>
          <a href="https://prolnk.io" style={{ background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Sign Up for ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
