import { useState } from 'react';

const neighborhoodSignals = [
  { signal: '📈 Appreciating fast', label: 'Stay signal', detail: 'Neighborhood outpacing DFW average — equity engine is running' },
  { signal: '📉 Stagnant 3+ years', label: 'Go signal', detail: 'You may be capped on appreciation; adjacent areas offer better trajectory' },
  { signal: '🏫 School district improving', label: 'Stay signal', detail: 'School ratings are a leading indicator of neighborhood appreciation' },
  { signal: '🏗️ New retail/transit nearby', label: 'Stay signal', detail: 'Development signals long-term confidence in the area' },
  { signal: '🏚️ High vacancy / turnover', label: 'Go signal', detail: "Neighbor instability depresses values and quality of life" },
];

const emotionalFactors = [
  '15+ years of memories in this home',
  'Kids are in their last years of school here',
  "Deep community ties — neighbors, church, activities",
  'The home reflects who you are',
];

export default function DFWStayOrGoGuide() {
  const [equity, setEquity] = useState('');
  const [renovationNeed, setRenovationNeed] = useState('');
  const [trajectory, setTrajectory] = useState('');
  const [result, setResult] = useState<null | { verdict: string; detail: string; color: string }>(null);

  function analyze() {
    const eq = parseFloat(equity) || 0;
    const rn = parseFloat(renovationNeed) || 0;
    const t = trajectory;
    if (!eq || !rn || !t) return;
    const score = (eq > 150000 ? 2 : 0) + (rn < 50000 ? 1 : -1) + (t === 'appreciating' ? 2 : t === 'stagnant' ? -1 : -2);
    if (score >= 3) {
      setResult({ verdict: '🏠 Stay & Renovate', detail: `With $${Math.round(eq / 1000)}K in equity and a ${t} neighborhood, your DFW home is a strong asset. Renovation costs of ~$${Math.round(rn / 1000)}K are manageable and protect your equity position. Selling now means paying 6–8% in transaction costs plus moving.`, color: '#22c55e' });
    } else if (score <= 0) {
      setResult({ verdict: '🔑 Time to Go', detail: `A ${t} neighborhood combined with $${Math.round(rn / 1000)}K in deferred maintenance signals diminishing returns. With $${Math.round(eq / 1000)}K in equity available for a down payment, you can move up in DFW's market before conditions shift further.`, color: '#F5E642′ });
    } else {
      setResult({ verdict: '⚖️ It Depends', detail: `Your situation is genuinely balanced. The deciding factor: how long do you plan to stay? If 5+ years, renovate and ride the equity. If you're likely to move in 1–3 years, selling now avoids wasted renovation spend in DFW's transaction-cost-heavy market.`, color: '#60a5fa' });
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '6px 16px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Stay or Go?<br />The DFW Decision Guide</h1>
        <p style={{ fontSize: 18, color: '#aaa', marginBottom: 40, lineHeight: 1.7 }}>The most expensive thing you can do is make the wrong call here. This guide helps DFW homeowners weigh the financial reality against the emotional weight of leaving.</p>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 20 }}>📍 DFW Neighborhood Trajectory Signals</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {neighborhoodSignals.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ fontSize: 22 }}>{s.signal.split(' ')[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, color: s.label.includes('Stay') ? '#22c55e' : '#f97316', marginBottom: 4 }}>{s.label} — {s.signal.split(' ').slice(1).join(' ')}</div>
                  <div style={{ color: '#aaa', fontSize: 14 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 16 }}>❤️ The Emotional Factor</h2>
          <p style={{ color: '#aaa', marginBottom: 16, lineHeight: 1.7 }}>Financial analysis alone won't make this decision. These emotional anchors are real — and worth naming before you commit to either path:</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {emotionalFactors.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, background: '#F5E642', borderRadius: '50%', flexShrink: 0 }} />
                <div style={{ color: '#ccc', fontSize: 15 }}>{f}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, color: '#888', fontSize: 14, lineHeight: 1.7 }}>These factors don't change the math, but they’re part of the decision. Give them a number if you can: "Is staying worth $30K in extra renovation spend?" That’s a fair question.</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '2px solid #F5E642', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 8 }}>🧮 Your Stay or Go Analysis</h2>
          <p style={{ color: '#888', marginBottom: 24 }}>Enter your DFW situation for a personalized recommendation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 6 }}>Available Home Equity ($)</label>
              <input value={equity} onChange={e => setEquity(e.target.value)} placeholder="e.g. 180000″ style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 6 }}>Deferred Renovation Need ($)</label>
              <input value={renovationNeed} onChange={e => setRenovationNeed(e.target.value)} placeholder="e.g. 75000″ style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 6 }}>Neighborhood Trajectory</label>
              <select value={trajectory} onChange={e => setTrajectory(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select...</option>
                <option value="appreciating">📈 Appreciating Fast</option>
                <option value="steady">➡️ Steady / Average</option>
                <option value="stagnant">📉 Stagnant / Declining</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Analyze My Situation</button>
          {result && (
            <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: result.color, marginBottom: 10 }}>{result.verdict}</div>
              <div style={{ lineHeight: 1.7, color: '#ccc' }}>{result.detail}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
