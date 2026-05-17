import { useState } from 'react';

const impacts = [
  { icon: '🌪️', title: 'West Texas Dust Reaches DFW', detail: 'Haboob-style dust storms from Lubbock and Abilene travel east, hitting Dallas–Fort Worth in spring and early summer. Particulate counts spike 10–20x during events.' },
  { icon: '🧯', title: 'Condenser Coil Clogging', detail: 'Outdoor condenser fins trap fine sand and caliche particles. Reduced airflow raises head pressure, stresses compressor, and can cause premature failure within 1–3 seasons.' },
  { icon: '💨', title: 'Infiltration Into Ductwork', detail: 'DFW homes with leaky duct seams pull grit into return air. Abrasive particles then circulate through evaporator coil and air handler continuously.' },
  { icon: '⚙️', title: 'Bearing and Fan Damage', detail: 'Blower wheel bearings are precision-machined. Fine sand acts as lapping compound — accelerating wear. Grinding or squealing sounds after dust events = bearing damage.' },
  { icon: '🗓️', title: 'Post-Event Filter Protocol', detail: 'Replace filter within 48 hours of any significant dust event. MERV 11–13 filters capture fine DFW particulate without over-restricting airflow for most systems.' },
];

const protections = [
  { event: 'Minor dust (light haze visible)', action: 'Check filter after 24 hours. If visibly gray, replace. Inspect condenser fins for surface buildup.' },
  { event: 'Moderate dust (visibility under 1 mile)', action: 'Replace filter immediately. Rinse condenser coils with gentle hose — never pressure washer. Check air handler cabinet seals.' },
  { event: 'Major haboob (wall of dust)', action: 'Shut HVAC off during event. After clearing, replace filter, rinse condenser, inspect blower wheel, schedule ProLnk coil cleaning.' },
  { event: 'Persistent grit sounds from blower', action: 'Do not run system. Grit in blower wheel causes imbalance and bearing failure. Call ProLnk for cleaning and bearing inspection.' },
  { event: 'After multiple events, no maintenance', action: 'Schedule full system inspection. Compressor overwork from restricted condenser can fail without warning — average $2,400–$4,000 replacement.' },
];

export default function DFWHVACSandNoise2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW HVAC Sand and Grit Protection Guide 2026</h1>
        <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 32 }}>West Texas dust is a real threat to DFW HVAC systems — here's how to protect yours.</p>

        <div style={{ marginBottom: 36 }}>
          {impacts.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#0f1f38', borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f38', borderRadius: 12, padding: '24px 20px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🌫️ Dust Event → HVAC Protection Guide</div>
          <p style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Select your dust event severity:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {protections.map((p, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: selected === i ? '#F5E642' : '#162035', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  {p.event}
                </button>
                {selected === i && (
                  <div style={{ background: '#1a2d4a', borderRadius: '0 0 8px 8px', padding: '12px 16px', color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>
                    {p.action}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🧹 Post-Storm HVAC Cleaning? Get a DFW Pro</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 6 }}>ProLnk connects you with DFW HVAC technicians for coil cleaning and system inspection — fast quotes.</div>
        </div>
      </div>
    </div>
  );
}