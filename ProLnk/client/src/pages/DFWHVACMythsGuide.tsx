import { useState } from 'react';

const myths = [
  {
    belief: 'Closing vents in unused rooms saves energy',
    verdict: 'MYTH',
    reality: 'Closing vents increases static pressure in DFW HVAC systems, causing the blower to work harder and potentially damaging the compressor. Modern systems are sized for open duct distribution. Closed vents also cause uneven temperatures and increased energy use.',
    icon: '🌬️',
  },
  {
    belief: 'A bigger HVAC unit will cool my home faster and better',
    verdict: 'MYTH',
    reality: 'Oversized HVAC systems in DFW short-cycle — cooling too fast without completing a full run cycle. This means the system never runs long enough to dehumidify, leaving your home feeling clammy even at 72°F. Proper sizing is critical in DFW\’s humid heat.',
    icon: '📦',
  },
  {
    belief: 'AC just cools the air temperature',
    verdict: 'MYTH',
    reality: 'In DFW, humidity removal is just as important as temperature drop. A well-functioning AC dehumidifies while cooling — removing 20–30 pints of water per day. If your home feels sticky but cool, your system may be oversized or refrigerant may be low.',
    icon: '💧',
  },
  {
    belief: 'You only need to change your air filter once a year',
    verdict: 'MYTH',
    reality: 'In DFW, HVAC professionals recommend monthly filter checks June–September due to high pollen, construction dust, and continuous system runtime. Running on a clogged filter reduces airflow, ices the coil, and can cause compressor failure — a $2,500–$5,000 repair.',
    icon: '🗓️',
  },
  {
    belief: 'If the AC is running, it\’s working fine',
    verdict: 'MYTH',
    reality: 'A running system is not necessarily an efficient one. In DFW summers, a system may run continuously yet barely keep pace — a sign of low refrigerant, dirty coils, or inadequate insulation. Annual tune-ups catch issues before they cascade into failures during peak heat.',
    icon: '⚠️',
  },
];

const verdictColor: Record<string, string> = {
  MYTH: '#EF4444',
  FACT: '#10B981',
};

export default function DFWHVACMythsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW HVAC Myths — Debunked</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>DFW summers are brutal. Know the HVAC facts that protect your system and wallet.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myths.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#0F2040' : '#111D33',
                border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{m.belief}</span>
                </div>
                <span style={{
                  background: verdictColor[m.verdict] || '#EF4444',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  flexShrink: 0,
                  marginLeft: 12,
                }}>{m.verdict}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, padding: '14px', background: '#0A1628', borderRadius: 8, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
                  {m.reality}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, padding: 20, background: '#111D33', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Keep Your DFW Home Cool and Efficient</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk matches DFW homeowners with certified HVAC technicians who specialize in Texas climate systems.</p>
        </div>
      </div>
    </div>
  );
}
