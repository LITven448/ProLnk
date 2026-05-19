import { useState } from 'react';

export default function DFWStormDoorGuide2026() {
  const [doorCondition, setDoorCondition] = useState('drafty');
  const [showGuide, setShowGuide] = useState(false);

  const conditions: Record<string, { label: string; recommendation: string; verdict: string; priority: string; altAction: string }> = {
    drafty: { label: 'Drafty Entry Door', recommendation: 'Skip Storm Door — Fix the Source', verdict: 'Not Recommended', priority: 'Low', altAction: 'Replace door sweep and weatherstripping first. Storm door adds R-1 value but will not fix a poorly sealed primary door.' },
    'old-wood': { label: 'Old Wood Door (Warped/Cracked)', recommendation: 'Replace Primary Door Instead', verdict: 'Not Recommended', priority: 'Low', altAction: 'Fiberglass replacement door outperforms wood+storm door combo in DFW heat. Better ROI on direct replacement.' },
    'good-door': { label: 'Good Insulated Door — Want Screen', recommendation: 'Storm Door Makes Sense', verdict: 'Recommended', priority: 'Moderate', altAction: 'DFW mild fall/spring weather makes screened storm door useful for airflow without bugs. Cost $400–800 installed.' },
    security: { label: 'Security Concern', recommendation: 'Security Storm Door', verdict: 'Recommended', priority: 'High', altAction: 'Full-view security storm doors add a second lock point. Steel full-frame models are hardest to breach.' },
    rental: { label: 'Rental Property — Budget Conscious', recommendation: 'Storm Door May Add Value', verdict: 'Situational', priority: 'Moderate', altAction: 'Entry-level storm doors ($400 installed) protect the primary door from DFW sun UV degradation — extends door life.' },
  };

  const sel = conditions[doorCondition];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🚪 DFW STORM DOOR GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Storm Door Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Honest assessment — storm doors in DFW mild climate. When they help, when to skip, and what to do instead.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🌡', title: 'DFW Climate Reality', desc: 'DFW winters are mild. Storm doors offer less ROI here than in cold climates. Screen function is the primary DFW benefit.' },
            { icon: '🛡', title: 'R-Value Addition', desc: 'Storm doors add R-1 to R-2 insulation value. Only worthwhile if your primary door is already well-sealed.' },
            { icon: '🔒', title: 'Security Benefit', desc: 'Full-frame security storm doors with multi-point locks add measurable security — strongest case for DFW installation.' },
            { icon: '💵', title: 'Cost $400–800 Installed', desc: 'Standard full-view storm door with screen: $400–600. Security models: $600–800. 3–5 hour installation job.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🚪 Storm Door Decision Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Entry Door Situation</label>
            <select value={doorCondition} onChange={(e) => setDoorCondition(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              {Object.entries(conditions).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowGuide(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {showGuide && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: sel.verdict === 'Recommended' ? '#4ade80' : sel.verdict === 'Not Recommended' ? '#f87171' : '#F5E642', fontWeight: 700, marginBottom: 8 }}>
                {sel.verdict === 'Recommended' ? '✅' : sel.verdict === 'Not Recommended' ? '❌' : '⚠️'} {sel.recommendation}
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>
                <div>🎯 Priority: <span style={{ color: '#fff' }}>{sel.priority}</span></div>
                <div style={{ marginTop: 8 }}>📌 {sel.altAction}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📞 Get DFW Door Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with vetted DFW door contractors. Storm doors, entry doors, and security upgrades — compare 3 quotes free.</p>
        </div>
      </div>
    </div>
  );
}
