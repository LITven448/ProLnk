import { useState } from 'react';

const techniques = [
  { size: 'Nail Pop', label: '🔩 Nail Pop', steps: ['Drive nail deeper with hammer', 'Drive new nail 2" above/below', 'Apply two coats spackle over both', 'Sand smooth when dry', 'Prime + paint to match'], difficulty: 'Easy', time: '30 min + dry time' },
  { size: 'Small Hole', label: '🕳️ Small Hole (< 1")', steps: ['Clean edges of hole', 'Fill with lightweight spackle', 'Smooth with putty knife', 'Let dry 2-4 hours', 'Sand with 120-grit', 'Prime + paint'], difficulty: 'Easy', time: '1-2 hours' },
  { size: 'Medium Hole', label: 🔲 Medium Hole (1-6")', steps: ['Apply self-adhesive mesh patch', 'Cover with joint compound', 'Feather edges 6-8" out', ’Let dry 24 hours', 'Apply second coat', 'Sand, prime, texture, paint'], difficulty: 'Moderate', time: '2-3 days' },
  { size: 'Large Hole', label: '🪚 Large Hole (6"+)', steps: ['Cut to nearest studs (California patch or backing board)', 'Install backing board if no studs', 'Cut drywall patch to fit', 'Tape all seams with paper tape', 'Apply 3 coats compound', 'Sand, prime, texture, paint'], difficulty: 'Advanced', time: '3-5 days' },
];

export default function DFWDrywallRepairTechniques2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const tech = techniques.find(t => t.size === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧱</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Drywall Repair Techniques 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Step-by-step repair guide for DFW homeowners — select your hole size below.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {techniques.map(t => (
            <button key={t.size} onClick={() => setSelected(t.size)}
              style={{ background: selected === t.size ? '#F5E642' : '#1e293b', color: selected === t.size ? '#0A1628' : '#fff', border: '2px solid ' + (selected === t.size ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {t.label}
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, color: selected === t.size ? '#0A1628' : '#94a3b8' }}>Difficulty: {t.difficulty}</div>
            </button>
          ))}
        </div>

        {tech && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: '1px solid #334155' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 6px' }}>{tech.label}</h2>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <span style={{ background: '#0f172a', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#94a3b8' }}>⏱️ {tech.time}</span>
              <span style={{ background: '#0f172a', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#94a3b8' }}>📊 {tech.difficulty}</span>
            </div>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {tech.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: 10, color: '#e2e8f0', lineHeight: 1.5 }}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {!tech && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
            <p>Select a repair type above to see the step-by-step guide.</p>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#1e293b', borderRadius: 14, padding: 20, border: '1px solid #334155' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 12px', fontSize: 16 }}>🌡️ DFW Climate Tips</h3>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#94a3b8', fontSize: 14 }}>
            <li style={{ marginBottom: 6 }}>Apply joint compound between 55–80°F — DFW summers require early morning work</li>
            <li style={{ marginBottom: 6 }}>DFW humidity slows drying — run A/C or dehumidifier during repairs</li>
            <li style={{ marginBottom: 6 }}>Texture matching is the hardest part — always test on cardboard first</li>
            <li>Need a pro? ProLnk connects you with vetted DFW drywall contractors.</li>
          </ul>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>© 2026 ProLnk — DFW Home Services</p>
      </div>
    </div>
  );
}