import { useState } from 'react';

export default function DFWFrontDoorGuide2026() {
  const [doorIssue, setDoorIssue] = useState('warping');
  const [showGuide, setShowGuide] = useState(false);

  const issues: Record<string, { label: string; material: string; rValue: string; cost: string; roi: string; notes: string }> = {
    warping: { label: 'Warping / Sticking (Wood)', material: 'Fiberglass — Best Choice', rValue: 'R-5 to R-6', cost: '$1,200–2,500 installed', roi: '72% avg cost recovery', notes: 'Fiberglass will not warp in DFW summer heat. Wood doors expand and warp in 100°F+ summers. Switch to fiberglass.' },
    drafty: { label: 'Drafty / Air Leaks', material: 'Insulated Steel or Fiberglass', rValue: 'R-5 to R-15', cost: '$900–2,000 installed', roi: '68% avg cost recovery', notes: 'New door + door sweep + weatherstripping system. Full seal kit eliminates most air infiltration. Add threshold seal.' },
    security: { label: 'Security Concerns', material: 'Steel Door — Most Secure', rValue: 'R-5 to R-10', cost: '$800–1,800 installed', roi: '65% avg cost recovery', notes: 'Steel doors are most kick-resistant. Pair with Grade 1 deadbolt and reinforced strike plate for DFW home security.' },
    'curb-appeal': { label: 'Curb Appeal / Home Sale', material: 'Fiberglass (wood-grain look)', rValue: 'R-5 to R-6', cost: '$1,500–3,500 installed', roi: '72–75% avg cost recovery', notes: 'Fiberglass doors accept stain and paint like wood. Entry door replacement is one of the top-ROI home improvements in DFW.' },
    energy: { label: 'High Energy Bills', material: 'Insulated Fiberglass', rValue: 'R-10 to R-15 (foam core)', cost: '$1,800–3,000 installed', roi: '70% avg cost recovery', notes: 'Triple-pane glass options + foam-core doors. Add door sweep + continuous seal. Check Oncor rebate eligibility.' },
  };

  const sel = issues[doorIssue];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🚪 DFW FRONT DOOR GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Front Door Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Fiberglass vs steel vs wood in DFW heat, weatherstripping essentials, and 72% ROI on entry door upgrades.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🌡', title: 'Fiberglass Beats Wood in DFW', desc: 'DFW 100°F summers warp and crack wood doors. Fiberglass doors maintain shape, accept stain, and outperform wood on all metrics.' },
            { icon: '🔒', title: 'Steel = Most Secure', desc: 'Steel doors resist kick-in and forced entry better than any other material. Pair with Grade 1 deadbolt.' },
            { icon: '🌬', title: 'Door Sweep Critical in DFW', desc: 'Air infiltration around door perimeter accounts for 15–20% of home energy loss. Door sweep + weatherstripping is low-cost high-impact fix.' },
            { icon: '💰', title: '72% Avg ROI in DFW', desc: 'Entry door replacement consistently ranks in top 5 home improvement ROI. DFW homes recoup 68–75% of cost on resale.' },
          ].map((c) => (
            <div key={c.title} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🚪 Front Door Replacement Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Door Issue</label>
            <select value={doorIssue} onChange={(e) => setDoorIssue(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              {Object.entries(issues).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowGuide(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {showGuide && (
            <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ {sel.material}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.8 }}>
                <div>🌡 R-Value: <span style={{ color: '#fff' }}>{sel.rValue}</span></div>
                <div>💵 DFW Installed Cost: <span style={{ color: '#fff' }}>{sel.cost}</span></div>
                <div>📈 Resale ROI: <span style={{ color: '#F5E642', fontWeight: 700 }}>{sel.roi}</span></div>
                <div style={{ marginTop: 8 }}>📌 {sel.notes}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📞 Get DFW Front Door Quotes</div>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with vetted DFW door contractors. Fiberglass, steel, and wood entry doors — compare 3 quotes free.</p>
        </div>
      </div>
    </div>
  );
}
