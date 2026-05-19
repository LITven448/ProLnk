import { useState } from 'react';

const metrics = [
  { label: '💰 Median Home Price', sl: '$900,000', cv: '$750,000', edge: 'colleyville' },
  { label: '🎓 School District', sl: 'Carroll ISD', cv: 'Grapevine-Colleyville ISD', edge: 'southlake' },
  { label: '⭐ ISD TEA Rating', sl: '#1 in Texas (Carroll)', cv: 'A (GCISD)', edge: 'southlake' },
  { label: '📝 Avg SAT Score', sl: '1310', cv: '1240', edge: 'southlake' },
  { label: '🚶 Walkability', sl: 'High (Southlake Town Square)', cv: 'Low-Medium', edge: 'southlake' },
  { label: '🛍️ Retail/Dining', sl: 'Southlake Town Square (Class A)', cv: 'Highway 26 corridor', edge: 'southlake' },
  { label: '🚗 To DFW Airport', sl: '12 min', cv: '8 min', edge: 'colleyville' },
  { label: '🚗 To Fort Worth', sl: '20 min', cv: '15 min', edge: 'colleyville' },
  { label: '🏡 Lot Size Typical', sl: '10,000–30,000 sq ft', cv: '12,000–35,000 sq ft', edge: 'colleyville' },
  { label: '🌳 Mature Trees', sl: 'Excellent', cv: 'Excellent', edge: 'tie' },
  { label: '🏌️ Country Clubs', sl: '3 private clubs', cv: '2 private clubs', edge: 'southlake' },
  { label: '👨‍👩‍👧 Median HH Income', sl: '$215,000', cv: '$175,000', edge: 'southlake' },
];

export default function DFWSouthlakeVsColleyvilleGuide() {
  const [budget, setBudget] = useState(800000);
  const [walkability, setWalkability] = useState('high');
  const [schoolTop, setSchoolTop] = useState('critical');

  const getScores = () => {
    let sl = 50; let cv = 50;
    if (budget >= 900000) sl += 20; else if (budget < 800000) cv += 25; else { sl += 5; cv += 15; }
    if (walkability === 'high') sl += 25;
    else if (walkability === 'low') cv += 20;
    if (schoolTop === 'critical') sl += 25;
    else if (schoolTop === 'moderate') { sl += 10; cv += 10; }
    else cv += 15;
    return { sl, cv };
  };
  const scores = getScores();
  const winner = scores.sl >= scores.cv ? 'Southlake' : 'Colleyville';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💎</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Southlake vs Colleyville TX</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>North Tarrant County's two premier luxury suburbs — a deep comparison</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 36 }}>
          {[
            { key: 'southlake', emoji: '🏛️', name: 'Southlake', price: '$900K', color: '#a855f7', summary: 'The crown jewel of DFW suburbs. Carroll ISD is perennially #1 in Texas. Southlake Town Square creates a walkable village feel rare in DFW. Highest prestige, highest price.', pros: ['Carroll ISD — #1 in Texas', 'Walkable Town Square', 'High social prestige', 'Strong community events'], cons: ['$900K median price', 'Less privacy/quiet', 'Traffic on 114', 'Entry price high even for older homes'] },
            { key: 'colleyville', emoji: '🌲', name: 'Colleyville', price: '$750K', color: '#22c55e', summary: 'Quieter, more private, closer to DFW Airport. GCISD is excellent though below Carroll. Larger lots, more secluded feel. A great value relative to Southlake luxury.', pros: ['$150K lower median', 'Closer to DFW Airport', 'Larger lots / more privacy', 'GCISD still excellent'], cons: ['Less walkable', 'Smaller retail/dining', 'Lower prestige than Southlake', 'Less community events'] },
          ].map(city => (
            <div key={city.key} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${city.color}40`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{city.emoji}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{city.name}</h2>
              <div style={{ fontSize: 30, fontWeight: 800, color: city.color, marginBottom: 12 }}>{city.price} avg</div>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{city.summary}</p>
              <div style={{ marginBottom: 10 }}>
                <div style={{ color: '#22c55e', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✅ Pros</div>
                {city.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>• {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#ef4444', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>❌ Cons</div>
                {city.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>• {c}</div>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F5E642', color: '#0A1628′ }}>
                {['Category', 'Southlake', 'Colleyville', 'Edge'].map(h => (
                  <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <td style={{ padding: '8px 12px', color: '#94a3b8′ }}>{row.label}</td>
                  <td style={{ padding: '8px 12px', fontWeight: row.edge === 'southlake' ? 700 : 400, color: row.edge === 'southlake' ? '#a855f7′ : '#fff' }}>{row.sl}</td>
                  <td style={{ padding: '8px 12px', fontWeight: row.edge === 'colleyville' ? 700 : 400, color: row.edge === 'colleyville' ? '#22c55e' : '#fff' }}>{row.cv}</td>
                  <td style={{ padding: '8px 12px', color: row.edge === 'tie' ? '#64748b' : '#F5E642', fontWeight: 600, fontSize: 12 }}>{row.edge === 'tie' ? '— Tie' : row.edge === 'southlake' ? '→ Southlake' : '→ Colleyville'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Which Luxury Suburb Fits You?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Your Budget</label>
              <input type="range" min={600000} max={2000000} step={25000} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Walkability Preference</label>
              <select value={walkability} onChange={e => setWalkability(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="high">🚶 Want walkable area</option>
                <option value="medium">🌿 Flexible</option>
                <option value="low">🏡 Prefer privacy/quiet</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>School District Priority</label>
              <select value={schoolTop} onChange={e => setSchoolTop(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="critical">🎓 Critical — top 1% only</option>
                <option value="moderate">📚 Important but flexible</option>
                <option value="low">🏡 Less important</option>
              </select>
            </div>
          </div>
          <div style={{ background: 'rgba(245,230,66,0.15)', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>🏆 Your Match: {winner}</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>
              {winner === 'Southlake' ? 'Carroll ISD + Southlake Town Square is hard to beat for families prioritizing education and lifestyle. Look at: Timarron, Stratford Parc, or Stone Lakes.' : 'Colleyville offers exceptional value in the luxury tier. GCISD is excellent, and the privacy/lot sizes are unmatched nearby. Look at: Glade Crossing, Summerplace, or Mill Creek.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
