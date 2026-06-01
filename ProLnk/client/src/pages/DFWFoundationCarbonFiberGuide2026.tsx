import { useState } from 'react';

export default function DFWFoundationCarbonFiberGuide2026() {
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState('');

  const issues = [
    { id: 'bowing-basement', label: '🏠 Bowing basement wall (horizontal crack)' },
    { id: 'slab-heave', label: '🪨 Slab heaving or lifting in DFW home' },
    { id: 'vertical-crack', label: '↕️ Vertical crack in interior wall' },
    { id: 'stair-step', label: '📐 Stair-step crack in brick exterior' },
    { id: 'horizontal-crack', label: '↔️ Horizontal crack in concrete block wall' },
    { id: 'door-sticking', label: '🚪 Doors and windows sticking after recent drought' },
  ];

  const recommendations: Record<string, string> = {
    'bowing-basement': '✅ CARBON FIBER APPLICABLE — Carbon fiber straps are specifically designed for bowing basement walls with horizontal cracks. Straps anchor to floor joist above and footing below, preventing further inward movement. Note: extremely rare in DFW — most DFW homes are slab-on-grade with no basement.',
    'slab-heave': '🚫 NOT APPLICABLE — Carbon fiber straps do not address DFW slab heave caused by expansive clay. The fix is moisture management (soaker hose system), soil stabilization, or pier underpinning. Carbon fiber is a wall reinforcement product, not a slab repair solution.',
    'vertical-crack': '⚠️ ASSESSMENT NEEDED — Vertical cracks may indicate differential settlement. Carbon fiber is not the right tool. An engineer will assess whether epoxy injection (cosmetic/minor), pier underpinning (settlement), or other intervention is needed.',
    'stair-step': '⚠️ FOUNDATION MOVEMENT — Stair-step cracks in brick indicate differential movement in the foundation. This requires a structural engineer evaluation. Carbon fiber does not address this pattern. Pier underpinning or soil moisture management is the typical DFW solution.',
    'horizontal-crack': '✅ CARBON FIBER APPLICABLE — Horizontal cracks in concrete block or CMU walls indicate lateral soil pressure. Carbon fiber straps are the industry standard repair for this condition, preventing further bowing. More common in DFW commercial or older construction than modern residential.',
    'door-sticking': '⏳ MONITOR FIRST — DFW clay shrinks during drought causing foundation settling and door/window binding. This often self-corrects when moisture returns. Begin a soaker hose program around the perimeter. Reassess after a full wet season before any structural repair.',
  };

  const handleCheck = () => {
    if (issue) setResult(recommendations[issue] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Home Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>DFW Foundation Carbon Fiber Repair Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem', fontSize: '1.05rem' }}>Carbon fiber straps are powerful for bowing walls — but DFW's slab-on-grade construction rarely needs them. Know when it applies and when it does not.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏗️', label: 'DFW Construction', value: 'Mostly slab-on-grade' },
            { icon: '✅', label: 'Best Use Case', value: 'Bowing basement walls' },
            { icon: '🚫', label: 'Not a Fix For', value: 'DFW slab heave (clay)' },
            { icon: '💰', label: 'Typical Cost', value: '$350–$700 per strap' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Foundation Issue → Carbon Fiber Applicability</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {issues.map(i => (
              <button key={i.id} onClick={() => setIssue(i.id)}
                style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: issue === i.id ? '2px solid #F5E642' : '1px solid #1e3a5f', backgroundColor: issue === i.id ? '#1a3060' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
                {i.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck} disabled={!issue}
            style={{ backgroundColor: issue ? '#F5E642' : '#2a3a50', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: issue ? 'pointer' : 'not-allowed', fontSize: '0.95rem', width: '100%' }}>
            Check Carbon Fiber Fit →
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>📌 DFW Reality Check</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: 1.7 }}>Most DFW foundation companies that offer carbon fiber are marketing toward a market better served by pier underpinning or moisture management. If a contractor recommends carbon fiber on a slab home with heaving clay, get a second opinion from a licensed structural engineer before proceeding.</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#0f2040', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>Need a DFW foundation specialist? <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> connects you with vetted structural pros.</p>
        </div>
      </div>
    </div>
  );
}