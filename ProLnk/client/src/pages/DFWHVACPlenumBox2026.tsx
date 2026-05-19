import { useState } from 'react';

const symptoms = [
  { id: 'hotrooms', label: 'Some Rooms Always Hot', icon: '🌡️' },
  { id: 'noise', label: 'Loud Air Handler / Ducts', icon: '🔊' },
  { id: 'highbill', label: 'High Utility Bills', icon: '💡' },
  { id: 'humidity', label: 'High Indoor Humidity', icon: '💧' },
];

const diagnoses: Record<string, { title: string; cause: string; fix: string }> = {
  hotrooms: {
    title: 'Supply Plenum May Be Undersized',
    cause: 'A supply plenum that\’s too small creates high static pressure, reducing airflow to distant rooms. DFW homes with add-on zones are especially prone to this.',
    fix: 'Have a DFW HVAC tech measure static pressure at the plenum. If above 0.5″ WC, the plenum or ducts need resizing. Don\’t just add a bigger blower — fix the root cause.',
  },
  noise: {
    title: 'Plenum Leaks at Seams or Transitions',
    cause: 'Sheet metal plenums can separate at joints, especially in DFW\’s temperature extremes. Duct board plenums can delaminate. Air escaping at seams creates whistling or rumbling.',
    fix: 'Inspect all plenum joints for gaps. Use mastic sealant (not duct tape) to seal seams. Re-inspect after one full DFW summer — thermal cycling can re-open gaps.',
  },
  highbill: {
    title: 'Return Plenum May Be Leaking Attic Air',
    cause: 'A leaking return plenum pulls hot attic air (140°F+ in DFW summer) into your system. This forces the air handler to work 2–3x harder and can damage equipment.',
    fix: 'Test for return plenum leaks with a smoke pencil. Seal all penetrations with mastic. Properly sealed DFW systems typically see 15–25% utility bill reductions.',
  },
  humidity: {
    title: 'Short-Cycling Caused by Plenum Restriction',
    cause: 'A restricted or undersized plenum causes the system to reach setpoint too quickly, short-cycling. Short cycles don\’t run long enough to dehumidify DFW\’s humid air.',
    fix: 'Check plenum sizing against ACCA Manual D specs for your DFW home\’s square footage. If the system short-cycles (under 8 min runs), plenum redesign or dehumidifier addition may be needed.',
  },
  default: {
    title: 'Select Your HVAC Symptom',
    cause: '',
    fix: 'Choose the HVAC symptom your DFW home is experiencing to identify the likely plenum issue.',
  },
};

export default function DFWHVACPlenumBox2026() {
  const [selected, setSelected] = useState<string>('');
  const diag = selected ? (diagnoses[selected] || diagnoses['default']) : diagnoses['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔧</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW HVAC Plenum Box Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>
          The supply and return plenums are your HVAC system's lungs. DFW’s extreme heat makes plenum leaks and sizing errors costly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['Supply Plenum', '📤', 'Distributes conditioned air from air handler to duct branches'], ['Return Plenum', '📥', 'Collects room air and feeds it back to air handler']].map(([name, icon, desc]) => (
            <div key={name as string} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 15 }}>🏗️ Sheet Metal vs. Duct Board Plenums in DFW</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Sheet Metal</div>
              <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                <li>Durable, handles DFW heat</li>
                <li>Must seal seams with mastic</li>
                <li>Can rust without vapor barrier</li>
              </ul>
            </div>
            <div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Duct Board (Fiberglass)</div>
              <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                <li>Better insulation value</li>
                <li>Can delaminate in DFW humidity</li>
                <li>Requires careful installation</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 Your HVAC Symptom</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {symptoms.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#1a2f4e', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === s.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: ’pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ marginRight: 8 }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f4e', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 18 }}>{diag.title}</h3>
            <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>CAUSE</div>
            <p style={{ color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6 }}>{diag.cause}</p>
            <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>FIX</div>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{diag.fix}</p>
          </div>
        )}

        <p style={{ color: '#475569', fontSize: 12, marginTop: 28, textAlign: 'center' }}>ProLnk DFW Home Intelligence · 2026</p>
      </div>
    </div>
  );
}