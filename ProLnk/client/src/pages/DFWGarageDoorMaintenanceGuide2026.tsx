import { useState } from 'react';

const tasks = [
  { id: 'tracks', label: 'Track Alignment', icon: '🛤️', freq: 'Every 6 months', detail: 'DFW heat expands metal tracks. Check for gaps or bends. Adjust vertical tracks so door has 1/4″ clearance.' },
  { id: 'springs', label: 'Spring Lubrication', icon: '🔧', freq: 'Monthly', detail: 'DFW humidity corrodes springs fast. Use white lithium grease on torsion springs. Never oil cables.' },
  { id: 'balance', label: 'Balance Test', icon: '⚖️', freq: 'Every 3 months', detail: 'Disconnect opener. Lift door to 4ft. Should stay in place. If it drops or rises, springs need adjustment.' },
  { id: 'photoeye', label: 'Photo Eye Cleaning', icon: '👁️', freq: 'Monthly', detail: 'DFW dust and spider webs block sensors constantly. Wipe with dry cloth. Align so LED is solid green.' },
  { id: 'weatherstrip', label: 'Weather Stripping', icon: '🌧️', freq: 'Annually', detail: 'DFW storms and heat crack rubber fast. Check bottom seal and side seals. Replace when light shows through.' },
  { id: 'opener', label: 'Opener Chain/Belt', icon: '⚙️', freq: 'Annually', detail: 'Lubricate chain with garage door lube. Belt drives need no lube. Check tension — should have 1/2″ of play.' },
];

const symptoms = [
  'Door reverses when closing',
  'Door moves slowly or strains',
  'Loud banging or grinding',
  'Door won’t stay closed',
  'Safety sensor light blinking',
];

const getDiag = (sym: string) => {
  if (sym === 'Door reverses when closing') return 'Photo eyes are blocked or misaligned. Clean both sensors and check alignment — LED should be solid, not blinking.';
  if (sym === 'Door moves slowly or strains') return 'Springs likely out of balance or worn. Do the balance test. DFW heat accelerates spring fatigue — check tension.';
  if (sym === 'Loud banging or grinding') return 'Lubricate springs, rollers, and hinges with white lithium grease. Check for broken rollers (crack or flat spot).';
  if (sym === 'Door won’t stay closed') return 'Track misalignment from DFW thermal expansion. Check for gaps in tracks and adjust mounting brackets to re-plumb.';
  return 'Safety sensor fault. Check wiring for pinches or fraying. Clean both lenses. Confirm 6-inch height from floor.';
};

export default function DFWGarageDoorMaintenanceGuide2026() {
  const [sym, setSym] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚪 DFW Garage Door Maintenance Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW heat expands tracks, dust blocks sensors, and humidity kills springs fast. A 30-minute monthly routine prevents most breakdowns.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {tasks.map(t => (
            <div key={t.id} style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6, fontSize: 14 }}>{t.label}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{t.freq}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{t.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Diagnose Your Problem</h2>
          <div style={{ fontSize: 13, marginBottom: 12, color: '#94a3b8′ }}>What is your garage door doing?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {symptoms.map(s => (
              <button key={s} onClick={() => setSym(s)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: sym === s ? '#F5E642′ : '#1e3a5f', color: sym === s ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 14, textAlign: ’left' }}>{s}</button>
            ))}
          </div>
          {sym && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Likely Fix</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{getDiag(sym)}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#112240', borderRadius: 10 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Safety Rules</div>
          <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Never adjust torsion springs yourself — hire a pro, springs are under extreme tension</li>
            <li>Test auto-reverse monthly by placing a 2x4 flat on the ground under the door</li>
            <li>DFW lightning can fry opener circuit boards — consider a surge protector</li>
            <li>Lubricate in the morning before DFW heat peaks for best penetration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
