import { useState } from 'react';

const compareRows = [
  { category: '💰 Median Home Price', mckinney: '$460,000', prosper: '$580,000', edge: 'mckinney' },
  { category: '📅 City Character', mckinney: 'Historic downtown + modern growth', prosper: 'Master-planned residential', edge: 'mckinney' },
  { category: '🎓 School District', mckinney: 'McKinney ISD (A)', prosper: 'Prosper ISD (A+)', edge: 'prosper' },
  { category: '📝 Avg SAT Score', mckinney: '1190', prosper: '1260', edge: 'prosper' },
  { category: '🚶 Walkability', mckinney: 'Moderate (Historic Downtown)', prosper: 'Low (car-dependent)', edge: 'mckinney' },
  { category: '🛍️ Dining & Retail', mckinney: 'Historic Square + major retail', prosper: 'Limited (growing)', edge: 'mckinney' },
  { category: '🚗 To Dallas', mckinney: '40 min', prosper: '45 min', edge: 'mckinney' },
  { category: '🏗️ New Construction', mckinney: 'Moderate', prosper: 'Abundant', edge: 'prosper' },
  { category: '🌳 Parks & Trails', mckinney: '72 parks, 100+ miles trails', prosper: '40+ parks', edge: 'mckinney' },
  { category: '🏡 Established Feel', mckinney: 'High (city since 1848)', prosper: 'Low (mostly 2005+)', edge: 'mckinney' },
  { category: '📈 Price Appreciation', mckinney: '+12% yr/yr', prosper: '+18% yr/yr', edge: 'prosper' },
  { category: '🎉 Community Events', mckinney: 'Robust (Oktoberfest, festivals)', prosper: 'Growing', edge: 'mckinney' },
];

const mckinneyHoods = ['Historic Downtown', 'Adriatica', 'Trinity Falls', 'Craig Ranch'];
const prosperHoods = ['Windsong Ranch', 'Star Trail', 'Gentle Creek', 'Lakes of La Cima'];

export default function DFWMcKinneyVsProsperGuide() {
  const [budget, setBudget] = useState(520000);
  const [lifestyle, setLifestyle] = useState('walkable');
  const [newHome, setNewHome] = useState('flex');

  const getScores = () => {
    let mc = 50; let pr = 50;
    if (budget < 500000) mc += 30; else if (budget >= 580000) pr += 20; else mc += 10;
    if (lifestyle === 'walkable') mc += 30;
    else if (lifestyle === 'planned') pr += 30;
    else { mc += 10; pr += 10; }
    if (newHome === 'new') pr += 20;
    else if (newHome === 'established') mc += 20;
    return { mc, pr };
  };
  const scores = getScores();
  const winner = scores.mc >= scores.pr ? 'McKinney' : 'Prosper';
  const winnerHoods = winner === 'McKinney' ? mckinneyHoods : prosperHoods;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏙️</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>McKinney vs Prosper TX</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Two of North DFW's hottest addresses — very different vibes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 36 }}>
          {[
            { name: 'McKinney', emoji: '🏛️', price: '$460K', color: '#3b82f6', desc: 'Texas\’ most livable city (multiple rankings). Historic downtown square, eclectic dining, 100+ miles of trails. A real city with soul — not just suburbs. Massive Stonebridge/Eldorado corridor for modern homes too.', pros: ['Historic Downtown character', 'More affordable than Prosper', '72 parks + trail system', 'Established community events'], cons: ['McKinney ISD slightly below Prosper ISD', 'More traffic (larger city)', 'Older housing stock in some areas', 'Less new-home selection'] },
            { name: 'Prosper', emoji: '🌟', price: '$580K', color: '#f59e0b', desc: 'Pure master-planned perfection. Prosper ISD is one of Texas\’ best. Windsong Ranch is a landmark community. Newer everything — schools, roads, homes. Quieter and more residential-only feel.', pros: ['Prosper ISD (top-ranked)', 'Newest construction available', 'Quieter residential feel', 'Strong appreciation trajectory'], cons: ['No real downtown or character', '$120K higher than McKinney', 'Car-dependent for everything', 'Limited dining/retail nearby'] },
          ].map(city => (
            <div key={city.name} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${city.color}40`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{city.emoji}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{city.name}</h2>
              <div style={{ fontSize: 30, fontWeight: 800, color: city.color, marginBottom: 12 }}>{city.price} median</div>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{city.desc}</p>
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
              <tr style={{ background: '#F5E642', color: '#0A1628' }}>
                {['Category', 'McKinney', 'Prosper', 'Edge'].map(h => (
                  <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={row.category} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{row.category}</td>
                  <td style={{ padding: '8px 12px', fontWeight: row.edge === 'mckinney' ? 700 : 400, color: row.edge === 'mckinney' ? '#3b82f6' : '#fff' }}>{row.mckinney}</td>
                  <td style={{ padding: '8px 12px', fontWeight: row.edge === 'prosper' ? 700 : 400, color: row.edge === 'prosper' ? '#f59e0b' : '#fff' }}>{row.prosper}</td>
                  <td style={{ padding: '8px 12px', color: '#F5E642', fontWeight: 600, fontSize: 12 }}>{row.edge === 'mckinney' ? '→ McKinney' : '→ Prosper'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Find Your North DFW Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Budget</label>
              <input type="range" min={350000} max={900000} step={10000} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Lifestyle Style</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="walkable">🚶 Walkable / Historic feel</option>
                <option value="planned">🏘️ Master-planned / Quiet</option>
                <option value="flex">🌿 Flexible</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Home Preference</label>
              <select value={newHome} onChange={e => setNewHome(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="new">🏗️ Brand new construction</option>
                <option value="established">🏡 Established neighborhood</option>
                <option value="flex">⚖️ Either works</option>
              </select>
            </div>
          </div>
          <div style={{ background: 'rgba(245,230,66,0.15)', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>🏆 Best Fit: {winner}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>
              {winner === 'McKinney' ? 'McKinney gives you city character, great value, and strong community — without sacrificing the suburban safety and schools you want.' : 'Prosper\’s master-planned excellence and Prosper ISD make it the right call when schools and new construction matter most.'}
            </div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Top neighborhoods: {winnerHoods.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
