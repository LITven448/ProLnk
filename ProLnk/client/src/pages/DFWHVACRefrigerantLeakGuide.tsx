import { useState } from 'react';

const symptoms = [
  { id: 'ice', label: '🧊 Ice forming on refrigerant lines or coils', likelihood: 'High', action: 'Turn system off immediately — running it accelerates compressor damage. Call an HVAC tech today.', cost: '$250–$1,500 to locate and fix leak + recharge' },
  { id: 'warm', label: '🌡️ Warm air from vents despite AC running', likelihood: 'Medium–High', action: 'Check filter and coils first. If clean, low refrigerant is likely. Schedule a tech visit within 48 hours.', cost: '$150–$800 recharge-only, more if leak found' },
  { id: 'hissing', label: '🔊 Hissing or bubbling sound from unit', likelihood: 'Very High', action: 'Shut off the system and call immediately. Audible hissing means active refrigerant escape.', cost: '$300–$2,000 depending on leak location' },
  { id: 'humid', label: '💧 Home feels humid even when AC is on', likelihood: 'Medium', action: 'Low refrigerant reduces dehumidification. Verify with a pro — DFW humidity makes this dangerous in summer.', cost: '$100 diagnostic + repair cost' },
];

export default function DFWHVACRefrigerantLeakGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = symptoms.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🌡️ DFW HVAC GUIDE</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Refrigerant Leak Detection Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          In DFW's brutal summers, a refrigerant leak isn't just an inconvenience — it's a health and safety risk. Understand the signs, the dangers, and what "recharging" actually means before you call a tech.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>⚠️ Why Low Refrigerant Is Dangerous</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Forces the compressor to overwork — causes premature failure ($1,500–$3,000 replacement)</li>
            <li>Reduces dehumidification — in DFW's humid summers, this leads to mold growth</li>
            <li>Refrigerant exposure in enclosed spaces is toxic and potentially flammable</li>
            <li>A "recharge" without fixing the leak is a band-aid — refrigerant doesn't deplete on its own</li>
          </ul>
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🔁 R-22 vs R-410A in DFW</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            If your system is pre-2010, it likely uses R-22 (Freon), which is now banned from production. R-22 recharges cost $100–$175/lb vs $20–$50/lb for R-410A. In DFW heat, an old leaking R-22 system is almost always worth replacing rather than recharging.
          </p>
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 What Symptom Do You Have?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select your primary symptom to see leak likelihood and next steps:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1e3a5f',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '12px 16px',
                  textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#1a2e4a', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Leak Likelihood: {result.likelihood}</p>
              <p style={{ color: '#e2e8f0', marginBottom: 8, lineHeight: 1.6 }}><strong>Action:</strong> {result.action}</p>
              <p style={{ color: '#94a3b8' }}><strong>Typical DFW Cost:</strong> {result.cost}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🛠️ What Refrigerant Service Actually Involves</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            A proper DFW HVAC service includes: leak detection (UV dye or electronic detector), leak repair, system evacuation, and recharge to spec. A tech who only recharges without finding the leak is doing you a disservice. Always ask for the leak location in writing.
          </p>
        </div>

        <p style={{ color: '#475569', fontSize: 13, marginTop: 28, textAlign: 'center' }}>
          ProLnk connects DFW homeowners with verified HVAC professionals. Get 3 quotes, fast.
        </p>
      </div>
    </div>
  );
}
