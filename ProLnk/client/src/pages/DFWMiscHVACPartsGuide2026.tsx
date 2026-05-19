import { useState } from 'react';

export default function DFWMiscHVACPartsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const parts = [
    {
      id: 'schrader',
      icon: '🔩',
      name: 'Schrader Valve',
      aka: 'Refrigerant Port',
      desc: 'Entry point for adding or recovering refrigerant. Located on suction and liquid lines.',
      symptoms: ['Refrigerant leaking at port', 'Cap missing or damaged', 'Hissing when cap removed'],
      fix: 'Replace valve core — $5-15 part, 30-min job. Always use cap to prevent debris contamination.',
      cost: '$15–$50 service call add-on',
    },
    {
      id: 'service',
      icon: '🔧',
      name: 'Service Valve',
      aka: 'Isolation Valve',
      desc: 'Allows tech to isolate the system during refrigerant work. Ball valve on suction or liquid line.',
      symptoms: ['Valve won’t fully open or close', 'Refrigerant leak at valve body', 'Frost buildup on valve'],
      fix: 'Tighten packing nut first. Full replacement $80–$200 part + labor.',
      cost: '$150–$350 total',
    },
    {
      id: 'float',
      icon: '💧',
      name: 'Drain Pan Float Switch',
      aka: 'Safety Overflow Switch',
      desc: 'Shuts system off when drain pan fills with water. Critical in DFW humidity — clogs happen fast.',
      symptoms: ['System shuts off randomly in summer', 'Standing water in drain pan', 'Error code on thermostat'],
      fix: 'Clear drain line first (wet vac + vinegar). Replace switch if faulty — $20-40 part.',
      cost: '$75–$150 drain service',
    },
    {
      id: 'crankcase',
      icon: '🌡️',
      name: 'Crankcase Heater',
      aka: 'Compressor Oil Heater',
      desc: 'Prevents refrigerant from mixing with compressor oil during DFW cold snaps. Wraps around base of compressor.',
      symptoms: ['Compressor noisy on startup after cold night', 'Visible heater element cracked', 'System trips breaker in cold weather'],
      fix: 'Leave system on year-round (crankcase heater uses minimal power). Replace failed heater — $40-80 part.',
      cost: '$100–$250 installed',
    },
  ];

  const selected_part = parts.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔩</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW HVAC Miscellaneous Parts Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Lesser-known parts that fail — and what to do about it</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {parts.map(part => (
            <button key={part.id} onClick={() => setSelected(selected === part.id ? null : part.id)}
              style={{ background: selected === part.id ? '#F5E642′ : '#1e293b', color: selected === part.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === part.id ? ' #F5E642′ : ' #334155'), borderRadius: '0.75rem',
                padding: '1.2rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{part.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>{part.name}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.2rem' }}>{part.aka}</div>
            </button>
          ))}
        </div>

        {selected_part && (
          <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>{selected_part.icon} {selected_part.name}</h2>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>{selected_part.desc}</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: '600', marginBottom: '0.5rem' }}>⚠️ Symptoms</div>
              {selected_part.symptoms.map((s, i) => (
                <div key={i} style={{ background: '#0f172a', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', marginBottom: '0.4rem', color: '#e2e8f0', fontSize: '0.9rem' }}>• {s}</div>
              ))}
            </div>
            <div style={{ background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#4ade80', fontWeight: '600', marginBottom: '0.4rem' }}>✅ Fix</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{selected_part.fix}</div>
            </div>
            <div style={{ color: '#F5E642', fontWeight: '700′ }}>💰 Typical Cost: {selected_part.cost}</div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — Connecting DFW Homeowners with Verified HVAC Pros
        </div>
      </div>
    </div>
  );
}
