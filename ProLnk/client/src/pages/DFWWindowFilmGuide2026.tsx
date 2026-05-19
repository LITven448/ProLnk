import { useState } from 'react';

export default function DFWWindowFilmGuide2026() {
  const [issue, setIssue] = useState('hot-rooms');
  const [showRec, setShowRec] = useState(false);

  const issues: Record<string, { label: string; filmType: string; brand: string; rejection: number; cost: string; notes: string }> = {
    'hot-rooms': { label: 'Hot Rooms (West/South Sun)', filmType: 'High-Performance Ceramic', brand: '3M Prestige or LLumar CTX', rejection: 65, cost: '$8–14/sqft installed', notes: 'Ceramic film rejects heat without dark tint — ideal for DFW west-facing rooms.' },
    'glare': { label: 'Glare on TVs / Screens', filmType: 'Neutral Tone Film', brand: 'Vista V-Series or LLumar ATR', rejection: 55, cost: '$6–10/sqft installed', notes: 'Reduces visible light 45–55%. Best for home offices and media rooms.' },
    'uv-fade': { label: 'UV Fading Floors / Furniture', filmType: 'Clear UV Blocking Film', brand: '3M Prestige 40 or Solar Gard', rejection: 40, cost: '$5–9/sqft installed', notes: '99% UV block on any film. Clear version protects without tinting.' },
    'privacy': { label: 'Privacy (Street-Facing Windows)', filmType: 'Reflective or Frosted Film', brand: 'LLumar Silver 20 or Artscape Frosted', rejection: 60, cost: '$4–8/sqft installed', notes: 'One-way reflective works in daylight only. Frosted works day and night.' },
    'security': { label: 'Security / Shatter Resistance', filmType: 'Safety & Security Film', brand: '3M Safety Series or LLumar Safety', rejection: 35, cost: '$10–18/sqft installed', notes: 'Holds glass together on impact. DFW hail protection benefit on vulnerable windows.' },
  };

  const sel = issues[issue];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🎞 DFW WINDOW FILM GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Window Film Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>3M, LLumar, Vista films for DFW homes — heat rejection, UV blocking, glare control, and safety options.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🔥', title: 'Heat Rejection 50–65%', desc: 'Film stops heat after glass absorbs it. Less effective than exterior solar screens but great for existing windows with no screen option.' },
            { icon: '🌡', title: 'West-Facing Priority in DFW', desc: 'DFW afternoon sun hits west-facing windows hardest. Ceramic film on west/south rooms is highest ROI application.' },
            { icon: '🛡', title: '99% UV Block (All Films)', desc: 'Even basic films block 99% UV. Protects hardwood floors, rugs, and furniture from fading.' },
            { icon: '🔧', title: 'Pro Install Recommended', desc: 'Bubble-free installation requires professional application. DIY kits exist but seams and bubbles show on large panes.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Film Type Finder</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Window Issue</label>
            <select value={issue} onChange={(e) => setIssue(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              {Object.entries(issues).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowRec(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {showRec && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Recommended: {sel.filmType}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>
                <div>🏷 Top Brands: <span style={{ color: '#fff' }}>{sel.brand}</span></div>
                <div>🔥 Heat Rejection: <span style={{ color: '#fff' }}>{sel.rejection}%</span></div>
                <div>💵 Installed Cost: <span style={{ color: '#fff' }}>{sel.cost}</span></div>
                <div style={{ marginTop: 8 }}>📌 {sel.notes}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📞 Get DFW Window Film Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with certified DFW window film installers. 3M, LLumar, Vista dealers — compare quotes instantly.</p>
        </div>
      </div>
    </div>
  );
}
