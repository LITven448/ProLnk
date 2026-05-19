import { useState } from 'react';

const textures = [
  { id: 'skip', label: '🌊 Skip Trowel', difficulty: 'Very Hard', dfwCommon: true, desc: 'Most common texture in DFW homes. Irregular curved patterns applied by hand.', steps: ['Mix joint compound to peanut butter consistency', 'Apply random patches with trowel at 15–30° angle', 'Skip across surface — do not fill all gaps', 'Let set 10–15 min, lightly knock down high spots', 'Practice 20+ times before attempting a repair', 'Pro tip: Almost impossible to DIY match — hire a pro'], diy: false },
  { id: 'orange', label: '🍊 Orange Peel', difficulty: 'Moderate', dfwCommon: true, desc: 'Spray texture resembling orange skin. Common in DFW from 1990s–2010s.', steps: ['Use hopper gun or spray can texture', 'Thin compound to water consistency', 'Test spray pattern on cardboard first', 'Apply from 18–24 inches away', 'Light coat — build up if needed', 'Let dry, then prime and paint'], diy: true },
  { id: 'knockdown', label: '🔨 Knockdown', difficulty: 'Easier', dfwCommon: false, desc: 'Spray then flatten texture. More forgiving to match than skip trowel.', steps: ['Spray joint compound with hopper gun', 'Let set 10–12 minutes (not fully dry)', 'Flatten peaks with wide knife at low angle', 'Knock down lightly — do not over-work', 'Let dry 24 hours', 'Prime and paint'], diy: true },
  { id: 'smooth', label: '⬜ Smooth / Flat', difficulty: 'Easiest', dfwCommon: false, desc: 'No texture — just smooth drywall. Less common in DFW but easy to match.', steps: ['Apply joint compound in thin coats', 'Sand with 120-grit then 220-grit', 'Skim coat if needed for perfection', 'Prime with high-hide primer', 'Paint with roller for even sheen'], diy: true },
];

export default function DFWDrywallTexturGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const tex = textures.find(t => t.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🎨</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Drywall Texture Matching Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>The hardest part of any drywall repair — identify your texture and get the matching guide.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {textures.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)}
              style={{ background: selected === t.id ? '#F5E642' : '#1e293b', color: selected === t.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === t.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {t.label}
              <div style={{ fontSize: 12, fontWeight: 400, marginTop: 4, color: selected === t.id ? '#0A1628' : '#94a3b8' }}>
                Difficulty: {t.difficulty} {t.dfwCommon ? '· ⭐ Common in DFW' : ''}
              </div>
            </button>
          ))}
        </div>

        {tex && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: '1px solid #334155' }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 6px' }}>{tex.label}</h2>
            <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>{tex.desc}</p>
            {!tex.diy && (
              <div style={{ background: '#450a0a', border: '1px solid #ef4444', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#fca5a5', fontSize: 14 }}>
                ⚠️ <strong>Pro Recommended:</strong> Skip trowel is notoriously difficult to match. Even experienced DIYers often fail. Consider hiring a DFW texture specialist.
              </div>
            )}
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {tex.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: 10, color: '#e2e8f0', lineHeight: 1.5 }}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {!tex && (
          <div style={{ background: '#1e293b', borderRadius: 14, padding: 24, textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>👆</div>
            <p>Select your existing texture type above to see the matching guide.</p>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>© 2026 ProLnk — DFW Home Services</p>
      </div>
    </div>
  );
}