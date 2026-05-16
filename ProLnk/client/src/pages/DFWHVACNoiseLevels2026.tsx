import { useState } from 'react';

const CONCERNS = [
  {
    concern: 'Unit sounds like a vacuum cleaner constantly',
    db: '70–78 dB',
    type: 'Single-Stage AC',
    verdict: '🟡 Normal for single-stage. DFW homes often prefer variable speed for quieter constant operation.',
    rec: 'Consider upgrading to variable-speed inverter system (55–65 dB) on next replacement cycle.',
  },
  {
    concern: 'Hear a clicking or rattling when it starts',
    db: '65–75 dB peak',
    type: 'Normal startup sequence',
    verdict: '🟢 Startup clicks are normal — contactor engaging, refrigerant pressurizing.',
    rec: 'If clicking continues after startup, have a tech check the contactor and capacitor.',
  },
  {
    concern: 'Loud bang or thump when unit starts',
    db: '80+ dB',
    type: 'Possible ductwork expansion',
    verdict: '🔴 Duct bang on startup — undersized return or flex duct issue common in DFW builds.',
    rec: 'Have HVAC tech check static pressure and duct sizing. Common fix: larger return grill.',
  },
  {
    concern: 'Grinding or metal scraping sound',
    db: '75–85 dB',
    type: 'Mechanical failure risk',
    verdict: '🔴 Possible blower wheel or fan blade contact. Turn off unit immediately.',
    rec: 'Call ProLnk for emergency HVAC service. Do not run unit — motor or blade damage risk.',
  },
  {
    concern: 'Hissing or bubbling sounds',
    db: '60–70 dB',
    type: 'Refrigerant issue',
    verdict: '🔴 Hissing = refrigerant leak likely. Bubbling = air in refrigerant lines.',
    rec: 'Schedule refrigerant leak test. R-410A systems cannot be DIY-serviced (EPA 608 required).',
  },
  {
    concern: 'Unit runs quietly but constantly all day',
    db: '55–65 dB',
    type: 'Variable-Speed System',
    verdict: '✅ This is ideal for DFW climate. Variable-speed units run at low speed continuously.',
    rec: 'DFW humidity and heat make variable-speed the best choice. Your system is working correctly.',
  },
  {
    concern: 'Loud noise only in heat pump defrost mode',
    db: '70–78 dB peak',
    type: 'Heat Pump Defrost Cycle',
    verdict: '🟡 Normal for heat pump. Defrost cycle reverses refrigerant flow to clear ice.',
    rec: 'Defrost runs 5–15 min typically. Gurgling and hissing during defrost is normal operation.',
  },
];

export default function DFWHVACNoiseLevels2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? CONCERNS[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>PROLNK HVAC GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🔊 DFW HVAC Noise<br />Levels Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>Understanding what your HVAC sounds like — and what it means. DFW homeowners prefer variable-speed systems for quiet constant operation in extreme summer heat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[['🗣️ 50 dB', 'Normal conversation'], ['🌀 65 dB', 'Variable-speed AC'], ['🧹 75 dB', 'Single-stage AC'], ['📺 70 dB', 'Television at home'], ['💨 78 dB', 'Standard AC max'], ['🚨 85 dB', 'Mechanical failure zone']].map(([db, label]) => (
            <div key={db as string} style={{ background: '#0f2040', borderRadius: 8, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{db}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎧 What noise are you hearing?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CONCERNS.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, background: '#0A1628', color: selected === i ? '#F5E642' : '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {c.concern}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>System Type: <span style={{ color: '#94a3b8' }}>{result.type}</span> · Typical: <span style={{ color: '#94a3b8' }}>{result.db}</span></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>{result.verdict}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>RECOMMENDED ACTION</div>
              <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>{result.rec}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🌡️ Why DFW Prefers Variable-Speed</div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>DFW summers require cooling 5–6 months continuously. Variable-speed systems run at 30–60% capacity almost all day, removing more humidity (critical in DFW) and operating at 55–65 dB — far quieter than single-stage units cycling on and off at full blast.</p>
        </div>
      </div>
    </div>
  );
}