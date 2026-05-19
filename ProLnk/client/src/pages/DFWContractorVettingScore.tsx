import { useState } from 'react';

const CRITERIA = [
  { label: 'State License Verified', max: 20, emoji: '📜', tip: 'Check Texas TDLR database or specific board' },
  { label: 'Local DFW Experience (3+ yrs)', max: 15, emoji: '📍', tip: 'DFW soil, climate, and code knowledge matters' },
  { label: 'General Liability Insurance', max: 20, emoji: '🛡️', tip: 'Minimum $1M per occurrence for DFW jobs' },
  { label: 'Reviews (Google/BBB 4.5+)', max: 15, emoji: '⭐', tip: 'Look for 50+ reviews, recent activity' },
  { label: 'Workmanship Warranty Offered', max: 10, emoji: '🔒', tip: 'At least 1 year on labor, 5 on major components' },
  { label: 'Pulls Permits When Required', max: 10, emoji: '📋', tip: 'Ask directly — no permit = your liability' },
  { label: 'References Available', max: 5, emoji: '👥', tip: 'Can they provide 3 DFW references on request?' },
  { label: 'DFW Market Pricing', max: 5, emoji: '💰', tip: 'Within 20% of ProLnk fair-market rate for DFW' },
];

function getRecommendation(score: number) {
  if (score >= 85) return { text: '✅ Strong Hire — meets DFW standards across the board', color: '#22C55E' };
  if (score >= 65) return { text: '⚠️ Conditional Hire — address gaps before proceeding', color: '#F5E642′ };
  return { text: '❌ Do Not Hire — too many unverified criteria', color: '#EF4444′ };
}

export default function DFWContractorVettingScore() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const total = CRITERIA.reduce((sum, c) => sum + (scores[c.label] || 0), 0);
  const maxTotal = CRITERIA.reduce((sum, c) => sum + c.max, 0);
  const rec = getRecommendation(total);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW CONTRACTOR VETTING</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 14px' }}>The 8-Point DFW Contractor <span style={{ color: '#F5E642′ }}>Vetting Scorecard</span></h1>
        <p style={{ color: '#8FA3BF', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>Before you hire any contractor in the Dallas-Fort Worth area, run them through this scorecard. Score each criterion and get an instant hire recommendation.</p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          {CRITERIA.map(c => (
            <div key={c.label} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.emoji} {c.label} <span style={{ color: '#8FA3BF', fontWeight: 400, fontSize: 13 }}>({c.max} pts)</span></div>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{scores[c.label] || 0}</span>
              </div>
              <div style={{ color: '#6B7F99', fontSize: 12, marginBottom: 8 }}>{c.tip}</div>
              <input
                type="range" min={0} max={c.max}
                value={scores[c.label] || 0}
                onChange={e => setScores(s => ({ ...s, [c.label]: parseInt(e.target.value) }))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#4A6280′ }}>
                <span>0</span><span>{c.max}</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 24 }}>
          Get My Hire Recommendation
        </button>

        {showResult && (
          <div style={{ background: '#111E35', borderRadius: 16, padding: 28, borderLeft: `5px solid ${rec.color}` }}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{total} / {maxTotal}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: rec.color, marginBottom: 14 }}>{rec.text}</div>
            <p style={{ color: '#8FA3BF', fontSize: 14, margin: 0 }}>ProLnk pre-scores every contractor on these 8 criteria before they ever appear in your feed — so you skip this step entirely and hire with confidence.</p>
          </div>
        )}
      </div>
    </div>
  );
}
