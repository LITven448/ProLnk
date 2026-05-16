import { useState } from 'react';

export default function DFWWindowInstallationGuide2026() {
  const [windowType, setWindowType] = useState('double-hung');
  const [windowCount, setWindowCount] = useState(5);
  const [showGuide, setShowGuide] = useState(false);

  const types: Record<string, { label: string; difficulty: string; time: string; notes: string }> = {
    'double-hung': { label: 'Double-Hung', difficulty: 'Moderate', time: '1–2 hrs/window', notes: 'Most common DFW replacement. Insert method works for sound frames.' },
    'casement': { label: 'Casement', difficulty: 'Moderate', time: '1.5–2 hrs/window', notes: 'Full-frame replacement common due to older DFW casement frames.' },
    'picture': { label: 'Picture', difficulty: 'Hard', time: '2–3 hrs/window', notes: 'Large size requires 2-person crew. No DIY.' },
    'sliding': { label: 'Sliding', difficulty: 'Easy', time: '1–1.5 hrs/window', notes: 'Common in DFW ranch homes. Often insert replacement.' },
  };

  const selected = types[windowType];
  const totalHours = windowCount * parseFloat(selected.time.split('–')[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🪟 DFW WINDOW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Window Installation Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Full-frame vs insert replacement, SHGC specs, permits & pro vs DIY guidance for DFW homeowners.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '☀️', title: 'SHGC 0.25 Required', desc: 'DFW sun demands low solar heat gain. ENERGY STAR requires ≤0.25 SHGC for North-Central zone.' },
            { icon: '📋', title: 'Permits Usually Not Required', desc: 'Same-size replacements in DFW typically do not require a permit. Full-frame + structural changes do.' },
            { icon: '👷', title: 'Pro vs DIY', desc: 'Single windows under 3ft wide: experienced DIYer can manage. Larger or higher windows require a 2-person crew minimum.' },
            { icon: '💰', title: 'Cost Range DFW', desc: 'Insert replacement: $300–600/window installed. Full-frame: $600–1,200/window. Volume discounts at 5+ windows.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Installation Guide Builder</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Window Type</label>
            <select value={windowType} onChange={(e) => setWindowType(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              {Object.entries(types).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Number of Windows: {windowCount}</label>
            <input type="range" min={1} max={20} value={windowCount} onChange={(e) => setWindowCount(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <button onClick={() => setShowGuide(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Generate Guide →</button>
          {showGuide && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{selected.label} — {windowCount} Windows</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
                <div>⏱ Estimated Time: <span style={{ color: '#fff' }}>{totalHours}–{totalHours * 1.5} hours total</span></div>
                <div>🔨 Difficulty: <span style={{ color: '#fff' }}>{selected.difficulty}</span></div>
                <div>📌 DFW Notes: <span style={{ color: '#fff' }}>{selected.notes}</span></div>
                <div style={{ marginTop: 8 }}>✅ Request SHGC ≤0.25 from any DFW contractor. Ask about ENERGY STAR rebates via Oncor or TXU.</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📞 Get DFW Window Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with vetted DFW window contractors. Compare 3 quotes, see SHGC specs, and book installation fast.</p>
        </div>
      </div>
    </div>
  );
}
