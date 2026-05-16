import { useState } from 'react';

export default function DFWPatioDoorGuide2026() {
  const [situation, setSituation] = useState('new-install');
  const [showGuide, setShowGuide] = useState(false);

  const situations: Record<string, { label: string; doorType: string; shgcNote: string; cost: string; maintenance: string; security: string }> = {
    'new-install': { label: 'New Patio Door Installation', doorType: 'Sliding — Best for DFW Outdoor Living', shgcNote: 'SHGC ≤0.25 required for south/west-facing in DFW.', cost: '$1,500–3,500 installed', maintenance: 'Clean track quarterly — DFW dust and pollen clog sliding tracks fast.', security: 'Add security bar in track. Pin lock or double-bolt upgrade recommended.' },
    'french-doors': { label: 'French Door Preference', doorType: 'French Doors — Classic Look', shgcNote: 'More glass = higher SHGC exposure. Request Low-E glass with ≤0.25 SHGC in DFW.', cost: '$2,500–5,000 installed', maintenance: 'Weatherstrip seals around hinges and door edges. Inspect annually in DFW heat.', security: 'Multi-point locking systems recommended. French doors can be weak on single-bolt setups.' },
    bifold: { label: 'Open-Concept (Bi-Fold/Folding)', doorType: 'Bi-Fold — Indoor/Outdoor Flow', shgcNote: 'Maximum glass exposure — use best-performing Low-E coating for DFW west-facing walls.', cost: '$5,000–15,000 installed', maintenance: 'Folding door tracks require regular cleaning. DFW pollen and soil accumulate quickly.', security: 'Full lock across all panels when closed. Floor bolt at open position prevents drift.' },
    'screen-issue': { label: 'Existing Screen Problems', doorType: 'Screen Replacement / Upgrade', shgcNote: 'Not applicable — screen replacement only.', cost: '$150–400 for screen replacement', maintenance: 'DFW spring oak pollen and fall allergens clog screens. Rinse with hose monthly during season. Frame corrosion check annually.', security: 'Screens do not provide security. Add secondary door lock.' },
    'track-issue': { label: 'Sliding Door Track / Roller Problems', doorType: 'Track Repair or Roller Replacement', shgcNote: 'Not applicable — track repair only.', cost: '$200–600 for track/roller service', maintenance: 'Vacuum and wipe track monthly. DFW dirt grinds rollers. Silicone spray lubricant (not WD-40) on rollers.', security: 'Replace worn rollers immediately — a stiff door is a security risk if it cannot be fully closed and locked.' },
  };

  const sel = situations[situation];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 DFW PATIO DOOR GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Patio Door Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Sliding, French, and bi-fold doors for DFW outdoor living rooms — SHGC specs, track maintenance, and security tips.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '☀️', title: 'SHGC Critical for Patio Doors', desc: 'Patio doors face backyards — often south or west in DFW. More glass = more heat. Always spec SHGC ≤0.25 Low-E glass.' },
            { icon: '🌿', title: 'DFW Track Maintenance', desc: 'Sliding door tracks collect DFW dust, pollen, and soil. Clean quarterly minimum. Dirty tracks damage rollers and make doors hard to lock.' },
            { icon: '🦟', title: 'Screen Maintenance', desc: 'DFW spring oak pollen and fall allergens clog screens fast. Monthly rinse with garden hose. Inspect frame for rust or corrosion annually.' },
            { icon: '🔒', title: 'Security Bar Recommended', desc: 'Sliding patio doors are a common entry point. Add a cut-down wooden dowel or metal bar in track. Pin locks prevent door lift.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏡 Patio Door Situation Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Patio Door Situation</label>
            <select value={situation} onChange={(e) => setSituation(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              {Object.entries(situations).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowGuide(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Guide →</button>
          {showGuide && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ {sel.doorType}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>
                <div>☀️ SHGC: <span style={{ color: '#fff' }}>{sel.shgcNote}</span></div>
                <div>💵 Cost: <span style={{ color: '#fff' }}>{sel.cost}</span></div>
                <div>🧹 Maintenance: <span style={{ color: '#fff' }}>{sel.maintenance}</span></div>
                <div>🔒 Security: <span style={{ color: '#fff' }}>{sel.security}</span></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📞 Get DFW Patio Door Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with vetted DFW patio door installers. Sliding, French, bi-fold — compare 3 quotes and get Low-E specs that match your home.</p>
        </div>
      </div>
    </div>
  );
}
