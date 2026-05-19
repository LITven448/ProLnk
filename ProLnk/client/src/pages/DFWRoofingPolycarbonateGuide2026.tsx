import { useState } from 'react';

const situations = [
  { id: 'new-patio', label: 'Building new patio cover — choose panel type', guide: 'Twin-wall polycarbonate with UV coating rated for DFW: minimum 10-year UV warranty. 8mm twin-wall balances light diffusion and insulation for DFW summers.' },
  { id: 'yellowing', label: 'Existing panels yellowing / cloudy', guide: 'UV coating has failed — common in DFW at 5-7 years on budget panels. Replace with UV-stabilized panels. No restoration product fully reverses polycarbonate UV damage.' },
  { id: 'cracking', label: 'Panels cracking or splitting', guide: 'Thermal expansion stress in DFW\’s 0-110°F range without proper fastening gaps causes cracking. Polycarbonate expands 0.065mm per foot per 10°F — always pre-drill oversize holes.' },
  { id: 'leaking', label: 'Water leaking at seams / fasteners', guide: 'Improperly sealed laps or over-tightened fasteners. In DFW heat, fasteners compress seals — use neoprene-backed screws. Seal laps with polycarbonate-compatible sealant.' },
  { id: 'too-hot', label: 'Patio too hot under panels', guide: 'Clear panels transmit 85-90% of heat in DFW sun. Switch to bronze or opal tint (50% light, 40% heat reduction). Twin-wall adds insulation value over solid.' },
];

export default function DFWRoofingPolycarbonateGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  const facts = [
    { icon: '☀️', title: 'DFW UV Challenge', body: 'DFW UV index reaches 11+ in summer. Clear polycarbonate without UV coating yellows in 3-5 years. UV-stabilized panels last 10-15 years.' },
    { icon: '🌡️', title: 'Thermal Expansion', body: 'DFW temperature swings 0-110°F. Polycarbonate expands significantly — must install with movement gaps or panels buckle and crack.' },
    { icon: '💡', title: 'Twin-Wall vs Solid', body: 'Twin-wall (hollow channels) insulates better and diffuses light. Solid sheet is stronger but transmits more heat — less ideal for DFW patio comfort.' },
    { icon: '🔵', title: 'Tint Options for DFW', body: 'Clear (most light, most heat), bronze (balanced), opal/white (most diffused). DFW patios: bronze or opal recommended for summer comfort.' },
    { icon: '🔩', title: 'Fastening in DFW', body: 'Pre-drill holes 3mm larger than screw diameter to allow movement. Use neoprene-backed roofing screws. Overtightening in DFW heat causes cracking.' },
    { icon: '📅', title: 'Lifespan in DFW', body: 'Budget panels: 5-7 years before yellowing. Quality UV-coated panels (10-year warranty): 12-18 years in DFW climate with proper installation.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 4, display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW ROOFING 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Polycarbonate Roof Panel Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Polycarbonate panels for DFW patio covers: UV coating requirements, thermal expansion, twin-wall vs solid, tint selection, and DFW climate performance.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Patio Cover Situation → Polycarbonate Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #2d3f5a', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 16, background: '#0d1f2e', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📋 DFW Recommendation</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.guide}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, fontSize: 13, color: '#94a3b8' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Tip:</strong> DFW outdoor living demand is booming — patio covers are one of the top 5 home improvement projects in North Texas. Roofing and general contractors who spec UV-rated polycarbonate with proper expansion gaps get far fewer warranty callbacks.
        </div>
      </div>
    </div>
  );
}