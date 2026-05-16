import { useState } from 'react';

export default function HomeOfficeDesignGuide() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const factors = [
    { id: 'dedicated', label: 'Dedicated room with door', weight: 3 },
    { id: 'circuit', label: 'Dedicated 20-amp circuit', weight: 3 },
    { id: 'fiber', label: 'Fiber internet connection', weight: 2 },
    { id: 'cooling', label: 'Adequate cooling/climate control', weight: 2 },
    { id: 'sound', label: 'Sound insulation from main house', weight: 2 },
    { id: 'lighting', label: 'Glare-free window treatment', weight: 2 },
    { id: 'ergonomics', label: 'Ergonomic desk/chair setup', weight: 1 },
    { id: 'storage', label: 'Organized storage and cable management', weight: 1 },
  ];

  const getScore = () => {
    const total = factors.reduce((sum, f) => sum + (scores[f.id] || 0) * f.weight, 0);
    const max = factors.reduce((sum, f) => sum + 5 * f.weight, 0);
    return Math.round((total / max) * 100);
  };

  const getPriorities = () => {
    return factors
      .filter(f => (scores[f.id] || 0) < 3)
      .sort((a, b) => b.weight - a.weight)
      .map(f => ({ ...f, score: scores[f.id] || 0 }));
  };

  const score = showResults ? getScore() : 0;
  const priorities = showResults ? getPriorities() : [];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#f1f5f9' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💻</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            DFW Home Office Design Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            Build a space that works — and adds real value. A well-designed home office is now expected by most DFW buyers.
          </p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #3b82f6' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#60a5fa' }}>
            📊 The DFW Remote Work Reality
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 16 }}>
            34% of DFW workers are fully remote or hybrid in 2026. A dedicated, well-designed home office adds <strong style={{ color: '#f1f5f9' }}>$8,000–$15,000 to home value</strong> and is now expected by most buyers in the $400K–$700K range. If you're working from a bedroom corner, you're leaving money on the table.
          </p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🏠 Room Selection Priority
          </h2>
          {[
            { rank: 1, type: 'Dedicated room with door', verdict: 'Best', color: '#22c55e', detail: 'Optimal for focus, noise control, Zoom calls, and IRS home office deduction eligibility ($5/sq ft simplified method).' },
            { rank: 2, type: 'Bonus room conversion', verdict: 'Good', color: '#84cc16', detail: 'Usually already has power, climate control, and sufficient space. Often the best ROI conversion in DFW homes.' },
            { rank: 3, type: 'Garage office conversion', verdict: 'Acceptable', color: '#f59e0b', detail: 'Works in DFW only if properly insulated. Extreme summer heat requires $2,000–$4,000 in insulation and a dedicated mini-split.' },
            { rank: 4, type: 'Closet conversion', verdict: 'Last resort', color: '#ef4444', detail: 'Functional for light work but not advisable for 40+ hour remote weeks. Poor ergonomics, limited power.' },
          ].map(r => (
            <div key={r.rank} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #334155' }}>
              <div style={{ width: 36, height: 36, background: r.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0f172a', flexShrink: 0, fontSize: 16 }}>{r.rank}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{r.type}</span>
                  <span style={{ color: r.color, fontWeight: 600, fontSize: 13 }}>{r.verdict}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            🔌 Must-Have Upgrades for DFW Home Offices
          </h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '⚡', upgrade: 'Dedicated 20-amp circuit', cost: '$200–$400', why: 'DFW storm season causes power fluctuations that damage electronics. A dedicated circuit protects your equipment and prevents breaker trips mid-Zoom.' },
              { icon: '🌐', upgrade: 'Fiber internet (AT&T Fiber)', cost: 'Standard utility', why: 'Available in 85%+ of DFW suburbs. 1 Gbps up/down is the baseline for serious remote work. This is not optional.' },
              { icon: '🔇', upgrade: 'Sound insulation', cost: '$500–$6,000', why: 'Basic ($500–1,500) for open plan homes. Professional ($3,000–6,000) for recording, podcasting, or client calls.' },
              { icon: '🌞', upgrade: 'Window treatments (blackout rollers)', cost: '$150–$400/window', why: 'DFW sun and screen glare are brutal. Blackout roller shades eliminate the single most common complaint from remote workers in DFW.' },
              { icon: '❄️', upgrade: 'Mini-split supplemental cooling', cost: '$1,500–$2,500', why: 'DFW offices overheat even with 5-ton central HVAC. A dedicated mini-split keeps office temperature stable without cooling the whole house.' },
            ].map(u => (
              <div key={u.upgrade} style={{ display: 'flex', gap: 16, padding: 18, background: '#0f172a', borderRadius: 12 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{u.icon}</div>
                <div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{u.upgrade}</span>
                    <span style={{ color: '#60a5fa', fontWeight: 600, fontSize: 14 }}>{u.cost}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{u.why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            📋 Rate Your Home Office
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 15 }}>
            Score each factor 1 (poor) to 5 (excellent):
          </p>
          <div style={{ display: 'grid', gap: 14 }}>
            {factors.map(f => (
              <div key={f.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 15, color: '#e2e8f0' }}>{f.label}</span>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>{scores[f.id] || '—'}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => setScores(prev => ({ ...prev, [f.id]: n }))}
                      style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid #334155', cursor: 'pointer', background: scores[f.id] === n ? '#3b82f6' : '#0f172a', color: scores[f.id] === n ? '#fff' : '#94a3b8', fontWeight: 700, fontSize: 14 }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowResults(true)}
            style={{ marginTop: 24, width: '100%', padding: '14px', background: '#3b82f6', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 16 }}
          >
            Get My Improvement Priority List
          </button>
          {showResults && (
            <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 12, padding: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444' }}>{score}%</div>
                <div style={{ color: '#94a3b8' }}>Office Readiness Score</div>
              </div>
              {priorities.length > 0 ? (
                <>
                  <div style={{ fontWeight: 700, marginBottom: 12, color: '#60a5fa' }}>Top Priority Upgrades:</div>
                  {priorities.slice(0, 4).map((p, i) => (
                    <div key={p.id} style={{ display: 'flex', gap: 12, marginBottom: 10, padding: 12, background: '#1e293b', borderRadius: 8 }}>
                      <div style={{ width: 24, height: 24, background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                      <div style={{ color: '#e2e8f0', fontSize: 15 }}>{p.label}</div>
                    </div>
                  ))}
                </>
              ) : (
                <div style={{ textAlign: 'center', color: '#22c55e', fontWeight: 600 }}>Your home office is well-configured. Minor refinements only.</div>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#1e3a5f', borderRadius: 16, padding: 40, border: '1px solid #3b82f6' }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            Find a Contractor for Your Office Upgrade
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>
            TrustyPro connects you with vetted DFW electricians, HVAC specialists, and remodelers.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', fontWeight: 700, fontSize: 18, padding: '14px 40px', borderRadius: 50, textDecoration: 'none' }}>
            Join the Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
