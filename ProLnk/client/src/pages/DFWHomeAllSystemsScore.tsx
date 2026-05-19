import { useState } from 'react';

const categories = [
  { id: 'electrical', label: 'Electrical', icon: '⚡', hint: 'Panel, wiring, outlets, GFCI' },
  { id: 'plumbing', label: 'Plumbing', icon: '🚿', hint: 'Pipes, water heater, fixtures, pressure' },
  { id: 'roof', label: 'Roof', icon: '🏠', hint: 'Shingles, flashing, gutters, attic' },
  { id: 'foundation', label: 'Foundation', icon: '🪨', hint: 'Cracks, movement, drainage, clay soil' },
  { id: 'hvac', label: 'HVAC', icon: '❄️', hint: 'System age, efficiency, ducts, filter' },
  { id: 'pest', label: 'Pest Control', icon: '🐛', hint: 'Termites, rodents, treatment history' },
];

const costToA: Record<string, string> = {
  electrical: '$2,500–8,000', plumbing: '$1,500–6,000', roof: '$8,000–18,000',
  foundation: '$5,000–25,000', hvac: '$4,000–12,000', pest: '$500–3,000',
};

function getGrade(score: number) {
  if (score >= 90) return { grade: 'A', color: '#22c55e', label: 'Excellent' };
  if (score >= 80) return { grade: 'B', color: '#84cc16', label: 'Good' };
  if (score >= 70) return { grade: 'C', color: '#f59e0b', label: 'Fair' };
  if (score >= 55) return { grade: 'D', color: '#f97316', label: 'Poor' };
  return { grade: 'F', color: '#ef4444', label: 'Critical' };
}

export default function DFWHomeAllSystemsScore() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ overall: number; risk: string; fixes: string[]; cost: string } | null>(null);

  const allEntered = Object.keys(scores).length === categories.length &&
    Object.values(scores).every(v => v >= 0 && v <= 100);

  function calculate() {
    const vals = Object.entries(scores);
    const avg = vals.reduce((a, [, v]) => a + v, 0) / vals.length;
    const overall = Math.round(avg);
    const low = vals.filter(([, v]) => v < 55).map(([k]) => k);
    const mid = vals.filter(([, v]) => v >= 55 && v < 75).map(([k]) => k);
    const risk = low.length >= 3 ? 'Critical DFW Home — Multiple Systems Failing' :
      low.length >= 1 ? 'Elevated Risk — DFW Climate Accelerating Decay' :
      mid.length >= 2 ? 'Moderate Risk — Preventive Action Recommended' : 'Low Risk — Well-Maintained DFW Home';
    const fixes = [...low, ...mid].slice(0, 3).map(id => {
      const cat = categories.find(c => c.id === id);
      return `${cat?.icon} ${cat?.label}: Score ${scores[id]} — immediate attention needed`;
    });
    if (fixes.length === 0) fixes.push('✅ All systems passing — schedule annual reviews to maintain grade');
    const urgentCosts = low.map(id => costToA[id]);
    const maintCosts = mid.slice(0, 2).map(id => costToA[id]);
    const allCosts = [...urgentCosts, ...maintCosts];
    const cost = allCosts.length === 0 ? '$0–2,000 (routine maintenance only)' :
      `${allCosts.slice(0, 3).join(' + ')} estimated to reach Grade A`;
    setResult({ overall, risk, fixes, cost });
  }

  const g = result ? getGrade(result.overall) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 8 }}>🏡 DFW HOME HEALTH</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>All-Systems Home Score</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Enter your 6 inspection scores to get an overall DFW home health grade, risk profile, and cost-to-A estimate.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{cat.icon} {cat.label}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>{cat.hint}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="number" min={0} max={100} placeholder="0-100″
                  value={scores[cat.id] ?? ''}
                  onChange={e => setScores(s => ({ ...s, [cat.id]: parseInt(e.target.value) || 0 }))}
                  style={{ width: 70, padding: '8px 10px', borderRadius: 8, border: '2px solid',
                    borderColor: scores[cat.id] !== undefined ? '#F5E642′ : '#1e3a5f',
                    background: '#0A1628', color: 'white', fontSize: 16, fontWeight: 700, textAlign: 'center' }} />
                <span style={{ fontSize: 13, color: scores[cat.id] !== undefined ? getGrade(scores[cat.id]).color : '#64748b', fontWeight: 700 }}>
                  {scores[cat.id] !== undefined ? `Grade ${getGrade(scores[cat.id]).grade}` : '--'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={calculate} disabled={!allEntered}
          style={{ width: '100%', padding: '16px', background: allEntered ? '#F5E642′ : '#1e3a5f',
            color: allEntered ? '#0A1628′ : '#4a6080', border: ’none', borderRadius: 12,
            fontWeight: 700, fontSize: 16, cursor: allEntered ? 'pointer' : 'not-allowed' }}>
          {allEntered ? 'Generate Home Report →' : `Enter all 6 scores to continue`}
        </button>

        {result && g && (
          <div style={{ marginTop: 24, background: '#0f1f3a', borderRadius: 16, padding: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 96, fontWeight: 800, color: g.color, lineHeight: 1 }}>{g.grade}</div>
              <div style={{ fontSize: 15, color: '#94a3b8', marginBottom: 4 }}>Overall Home Grade — Score {result.overall}/100</div>
              <div style={{ display: 'inline-block', background: 'rgba(245,230,66,0.15)', color: '#F5E642', padding: '6px 16px', borderRadius: 20, fontSize: 13 }}>
                📍 {result.risk}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔧 Top 3 Priority Fixes</div>
              {result.fixes.map((f, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#cbd5e1′ }}>
                  {f}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(245,230,66,0.08)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>💰 Estimated Cost to Reach Grade A</div>
              <div style={{ fontSize: 14, color: '#cbd5e1′ }}>{result.cost}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
