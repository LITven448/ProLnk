import { useState } from 'react';

const DIMENSIONS = [
  { id: 'location', label: 'Location', icon: '📍', desc: 'Neighborhood quality, proximity to amenities, flood/hail risk', dfwAvg: 7 },
  { id: 'condition', label: 'Condition', icon: '🏠', desc: 'Overall structural condition, visible wear, curb appeal impression', dfwAvg: 6 },
  { id: 'systems', label: 'Systems', icon: '⚙️', desc: 'HVAC, plumbing, electrical — age and condition', dfwAvg: 6 },
  { id: 'energy', label: 'Energy Efficiency', icon: '⚡', desc: 'Insulation, windows, HVAC SEER rating, solar', dfwAvg: 5 },
  { id: 'safety', label: 'Safety', icon: '🛡️', desc: 'Smoke detectors, carbon monoxide, security system, lighting', dfwAvg: 7 },
  { id: 'maintenance', label: 'Maintenance History', icon: '🔧', desc: 'Regular upkeep, service records, preventive repairs', dfwAvg: 5 },
  { id: 'curb', label: 'Curb Appeal', icon: '🌿', desc: 'Landscaping, exterior paint, driveway, front door', dfwAvg: 6 },
  { id: 'value', label: 'Value vs Market', icon: '💰', desc: 'How your home compares to DFW comps in your zip code', dfwAvg: 6 },
  { id: 'community', label: 'Community', icon: '🤝', desc: 'HOA quality, neighborhood engagement, school district', dfwAvg: 7 },
  { id: 'resale', label: 'Resale Readiness', icon: '📋', desc: 'How quickly you could sell — updates, staging, disclosures ready', dfwAvg: 5 },
];

export default function DFWHomeScorecard() {
  const [scores, setScores] = useState<Record<string, number>>({});

  const setScore = (id: string, val: number) => setScores(prev => ({ ...prev, [id]: val }));
  const answered = Object.keys(scores).length;
  const totalScore = answered > 0 ? Math.round(Object.values(scores).reduce((s, v) => s + v, 0) / answered * 10) / 10 : null;
  const dfwAvgScore = Math.round(DIMENSIONS.reduce((s, d) => s + d.dfwAvg, 0) / DIMENSIONS.length * 10) / 10;
  const totalRaw = answered === DIMENSIONS.length ? Object.values(scores).reduce((s, v) => s + v, 0) : null;

  const getColor = (score: number) => score >= 8 ? '#22c55e' : score >= 5 ? '#F5E642' : '#ef4444';
  const getLabel = (score: number) => score >= 8 ? 'Excellent' : score >= 6 ? 'Good' : score >= 4 ? 'Average' : 'Needs Work';

  const priorities = DIMENSIONS
    .filter(d => scores[d.id] !== undefined && scores[d.id] <= 5)
    .sort((a, b) => (scores[a.id] || 10) - (scores[b.id] || 10))
    .slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Home Scorecard</h1>
          <p style={{ color: '#94a3b8' }}>Rate your home on 10 key dimensions and compare to DFW averages</p>
        </div>

        {totalRaw !== null && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', marginBottom: 4 }}>Your DFW Home Score</div>
            <div style={{ color: '#F5E642', fontSize: '3.5rem', fontWeight: 700 }}>{totalRaw}<span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>/100</span></div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '0.75rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Your Score</div>
                <div style={{ color: getColor(totalScore!), fontWeight: 700 }}>{totalScore}/10 avg — {getLabel(totalScore!)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>DFW Average</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{dfwAvgScore}/10 avg</div>
              </div>
            </div>
            <div style={{ height: 10, background: '#1e3a5f', borderRadius: 5, margin: '1rem 0 0.5rem' }}>
              <div style={{ height: '100%', width: `${totalRaw}%`, background: '#F5E642', borderRadius: 5 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem' }}>
              <span>0</span><span>DFW Avg ({Math.round(dfwAvgScore * 10)})</span><span>100</span>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>Rate Each Dimension (1 = Poor, 10 = Excellent)</h3>
          {DIMENSIONS.map(d => (
            <div key={d.id} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{d.icon} {d.label}</span>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{d.desc}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  {scores[d.id] !== undefined && (
                    <span style={{ color: getColor(scores[d.id]), fontWeight: 700, fontSize: '1.2rem' }}>{scores[d.id]}</span>
                  )}
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DFW avg: {d.dfwAvg}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button key={n} onClick={() => setScore(d.id, n)}
                    style={{ flex: 1, padding: '0.4rem 0', borderRadius: 6, border: `1px solid ${scores[d.id] === n ? '#F5E642' : '#1e3a5f'}`, background: scores[d.id] === n ? '#F5E642' : scores[d.id] !== undefined && n <= scores[d.id] ? '#1a2d4a' : 'transparent', color: scores[d.id] === n ? '#0A1628' : '#94a3b8', cursor: 'pointer', fontWeight: scores[d.id] === n ? 700 : 400, fontSize: '0.8rem' }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {priorities.length > 0 && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Focus Areas for Improvement</h3>
            {priorities.map((d, i) => (
              <div key={d.id} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0' }}>#{i+1} {d.icon} {d.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{d.desc}</div>
                </div>
                <div style={{ textAlign: 'center', marginLeft: 12 }}>
                  <div style={{ color: '#ef4444', fontSize: '1.4rem', fontWeight: 700 }}>{scores[d.id]}/10</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DFW avg: {d.dfwAvg}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {answered > 0 && answered < DIMENSIONS.length && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>
            Rate {DIMENSIONS.length - answered} more dimension(s) to see your full score
          </div>
        )}
      </div>
    </div>
  );
}
