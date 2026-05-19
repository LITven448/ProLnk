import { useState } from 'react';

const districts = [
  { rank: 1, name: 'Carroll ISD', city: 'Southlake', tea: 'Exemplary A+', sat: 1310, ratio: '14:1', sports: 99, arts: 90, academics: 99, diversity: 55, medianHome: 900000, tags: ['academics', 'sports', 'arts'] },
  { rank: 2, name: 'Prosper ISD', city: 'Prosper', tea: 'Exemplary A+', sat: 1260, ratio: '15:1', sports: 88, arts: 82, academics: 96, diversity: 65, medianHome: 580000, tags: ['academics', 'sports'] },
  { rank: 3, name: 'Frisco ISD', city: 'Frisco', tea: 'A+', sat: 1240, ratio: '16:1', sports: 92, arts: 88, academics: 94, diversity: 72, medianHome: 620000, tags: ['academics', 'sports', 'diversity'] },
  { rank: 4, name: 'Coppell ISD', city: 'Coppell', tea: 'Exemplary A+', sat: 1230, ratio: '15:1', sports: 80, arts: 85, academics: 95, diversity: 78, medianHome: 590000, tags: ['academics', 'diversity', 'arts'] },
  { rank: 5, name: 'Allen ISD', city: 'Allen', tea: 'A+', sat: 1220, ratio: '16:1', sports: 97, arts: 85, academics: 92, diversity: 68, medianHome: 520000, tags: ['sports', 'academics'] },
  { rank: 6, name: 'Flower Mound / LISD', city: 'Flower Mound', tea: 'A+', sat: 1210, ratio: '16:1', sports: 90, arts: 82, academics: 91, diversity: 60, medianHome: 560000, tags: ['sports', 'academics'] },
  { rank: 7, name: 'Grapevine-Colleyville ISD', city: 'Colleyville/Grapevine', tea: 'A', sat: 1240, ratio: '15:1', sports: 85, arts: 88, academics: 93, diversity: 62, medianHome: 750000, tags: ['academics', 'arts'] },
  { rank: 8, name: 'Keller ISD', city: 'Keller/N. Richland Hills', tea: 'A', sat: 1180, ratio: '17:1', sports: 90, arts: 80, academics: 88, diversity: 65, medianHome: 480000, tags: ['sports', 'academics'] },
  { rank: 9, name: 'Plano ISD', city: 'Plano', tea: 'A', sat: 1200, ratio: '17:1', sports: 82, arts: 88, academics: 90, diversity: 82, medianHome: 450000, tags: ['academics', 'diversity', 'arts'] },
  { rank: 10, name: 'McKinney ISD', city: 'McKinney', tea: 'A', sat: 1190, ratio: '17:1', sports: 85, arts: 78, academics: 87, diversity: 70, medianHome: 460000, tags: ['sports', 'academics'] },
];

export default function DFWBestSchoolDistrictsGuide() {
  const [priority, setPriority] = useState('academics');
  const [budget, setBudget] = useState(600000);

  const getPriorityScore = (d: typeof districts[0]) => {
    if (priority === 'academics') return d.academics;
    if (priority === 'sports') return d.sports;
    if (priority === 'arts') return d.arts;
    if (priority === 'diversity') return d.diversity;
    return d.academics;
  };

  const filtered = districts.filter(d => d.medianHome <= budget);
  const top3 = [...filtered].sort((a, b) => getPriorityScore(b) - getPriorityScore(a)).slice(0, 3);

  const priorityLabel = { academics: '📚 Academics', sports: '🏈 Sports', arts: '🎭 Arts', diversity: '🌍 Diversity' }[priority];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Best DFW School Districts 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Top 10 ISDs ranked by TEA ratings, SAT scores, sports, arts & diversity</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🏆', label: 'Carroll ISD #1', sub: 'Southlake — #1 in Texas' },
            { icon: '📝', label: '1310 Top SAT', sub: 'Highest avg SAT in DFW' },
            { icon: '🏈', label: 'Texas Football', sub: 'Allen Eagles — 7 state titles' },
            { icon: '💰', label: '$460K–$900K', sub: 'Home price range by ISD' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642′ }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 36 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F5E642', color: '#0A1628′ }}>
                {['#', 'District', 'City', 'TEA', 'SAT Avg', '👨‍🏫 Ratio', '🏈 Sports', '🎭 Arts', '📚 Academic', '🌍 Diversity', '🏡 Median Home'].map(h => (
                  <th key={h} style={{ padding: '9px 10px', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {districts.map((d, i) => (
                <tr key={d.name} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <td style={{ padding: '8px 10px', color: '#F5E642', fontWeight: 700 }}>{d.rank}</td>
                  <td style={{ padding: '8px 10px', fontWeight: 600, whiteSpace: 'nowrap' }}>{d.name}</td>
                  <td style={{ padding: '8px 10px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{d.city}</td>
                  <td style={{ padding: '8px 10px', color: d.tea.includes('Exemplary') ? '#22c55e' : '#94a3b8', whiteSpace: 'nowrap' }}>{d.tea}</td>
                  <td style={{ padding: '8px 10px', color: d.sat >= 1250 ? '#22c55e' : '#fff' }}>{d.sat}</td>
                  <td style={{ padding: '8px 10px' }}>{d.ratio}</td>
                  <td style={{ padding: '8px 10px', color: d.sports >= 90 ? '#f59e0b' : '#94a3b8′ }}>{d.sports}/100</td>
                  <td style={{ padding: '8px 10px' }}>{d.arts}/100</td>
                  <td style={{ padding: '8px 10px', color: d.academics >= 94 ? '#22c55e' : '#94a3b8′ }}>{d.academics}/100</td>
                  <td style={{ padding: '8px 10px' }}>{d.diversity}/100</td>
                  <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>${(d.medianHome / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Find Your Best-Fit ISD</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Max Home Budget</label>
              <input type="range" min={400000} max={1000000} step={10000} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="academics">📚 Academics / SAT Scores</option>
                <option value="sports">🏈 Athletics (Texas takes this seriously)</option>
                <option value="arts">🎭 Fine Arts / Band / Theater</option>
                <option value="diversity">🌍 Diversity & Inclusion</option>
              </select>
            </div>
          </div>
          {top3.length > 0 ? (
            <div>
              <div style={{ marginBottom: 12, fontSize: 14, color: '#94a3b8′ }}>Top 3 ISDs for {priorityLabel} within your budget:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {top3.map((d, i) => (
                  <div key={d.name} style={{ background: i === 0 ? 'rgba(245,230,66,0.15)' : 'rgba(255,255,255,0.05)', border: i === 0 ? '1px solid #F5E642′ : '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16 }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                    <div style={{ fontWeight: 700, color: i === 0 ? '#F5E642′ : '#fff', marginBottom: 2 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{d.city}</div>
                    <div style={{ fontSize: 13, color: '#22c55e' }}>{priorityLabel}: {getPriorityScore(d)}/100</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Homes: ${(d.medianHome / 1000).toFixed(0)}K median</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: 24 }}>Increase budget to see ISD recommendations</div>
          )}
        </div>

        <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 20, fontSize: 13, color: '#64748b' }}>
          <strong style={{ color: '#94a3b8′ }}>Note on Texas School Sports:</strong> In Texas, high school sports — especially football — are a major factor in community identity. Allen ISD’s Eagle Stadium seats 18,000. Southlake Carroll Dragon football has won 7 state titles. When choosing an ISD, factor in the community culture around sports as a real quality-of-life element.
        </div>
      </div>
    </div>
  );
}
