import { useState } from 'react';

const data = {
  frisco: {
    name: 'Frisco',
    emoji: '🌟',
    medianPrice: 620000,
    priceRange: '$420K – $1.2M',
    isd: 'Frisco ISD',
    isdRating: 'A+ (TEA)',
    isdSAT: 1240,
    commuteDAL: 35,
    commutePlano: 20,
    commuteFrisco: 0,
    newDev: 'Massive — PGA Frisco, Universal Studios incoming',
    feel: 'Planned master-community, high energy, family-centric',
    parks: 72,
    restaurants: '500+',
    pros: ['Top-ranked Frisco ISD', 'PGA HQ + entertainment complex', 'Strongest job growth in DFW', 'Universal Studios DFW coming 2026'],
    cons: ['Higher price point', 'Traffic on 380 corridor', 'Less historic character', 'Rapid growth = ongoing construction'],
    neighborhoods: ['Newman Village', 'Starwood', 'The Trails', 'Legacy Hills'],
  },
  allen: {
    name: 'Allen',
    emoji: '🏘️',
    medianPrice: 520000,
    priceRange: '$350K – $950K',
    isd: 'Allen ISD',
    isdRating: 'A+ (TEA)',
    isdSAT: 1220,
    commuteDAL: 32,
    commutePlano: 15,
    commuteFrisco: 18,
    newDev: 'Mature build-out, focused on commercial along 75',
    feel: 'Established suburb, balanced community vibe',
    parks: 55,
    restaurants: '350+',
    pros: ['$100K lower median than Frisco', 'Excellent Allen ISD schools', 'More established community', 'Great highway access on 75'],
    cons: ['Less entertainment destination', 'More limited new construction', 'Smaller job market locally', 'Less buzz than Frisco'],
    neighborhoods: ['Twin Creeks', 'Watters Creek', 'Bethany Hills', 'Forest Creek'],
  },
};

export default function DFWFriscoVsAllenGuide() {
  const [budget, setBudget] = useState(580000);
  const [priority, setPriority] = useState('schools');

  const friscoFit = () => {
    if (budget < 420000) return 0;
    let score = 50;
    if (priority === 'entertainment') score += 30;
    if (priority === 'growth') score += 25;
    if (priority === 'schools') score += 10;
    if (budget >= 620000) score += 10;
    return Math.min(score, 95);
  };
  const allenFit = () => {
    let score = 50;
    if (priority === 'value') score += 30;
    if (priority === 'commute') score += 20;
    if (priority === 'schools') score += 10;
    if (budget < 550000) score += 15;
    return Math.min(score, 95);
  };

  const winner = friscoFit() >= allenFit() ? data.frisco : data.allen;
  const loser = friscoFit() >= allenFit() ? data.allen : data.frisco;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚔️</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Frisco vs Allen TX</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Which North DFW suburb should you call home in 2026?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          {[data.frisco, data.allen].map(city => (
            <div key={city.name} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(245,230,66,0.2)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{city.emoji}</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{city.name}</h2>
              <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>${city.medianPrice.toLocaleString()}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13, marginBottom: 16 }}>
                {[['💰 Range', city.priceRange], ['🎓 ISD', city.isd], ['⭐ Rating', city.isdRating], ['📝 SAT Avg', city.isdSAT], ['🚗 To Dallas', `${city.commuteDAL} min`], ['🌳 Parks', city.parks]].map(([label, val]) => (
                  <div key={label as string} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '8px 10px' }}>
                    <div style={{ color: '#64748b', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontWeight: 600 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#22c55e', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>✅ Pros</div>
                {city.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 3 }}>• {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>❌ Cons</div>
                {city.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 3 }}>• {c}</div>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Which Is Right for You?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Your Budget</label>
              <input type="range" min={350000} max={1000000} step={10000} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="schools">🎓 Schools</option>
                <option value="entertainment">🎡 Entertainment</option>
                <option value="value">💰 Best Value</option>
                <option value="commute">🚗 Commute</option>
                <option value="growth">📈 Future Growth</option>
              </select>
            </div>
          </div>
          <div style={{ background: 'rgba(245,230,66,0.15)', border: '1px solid #F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>We Recommend: {winner.name}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Best neighborhoods: {winner.neighborhoods.join(', ')}</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>Also consider {loser.name} if budget changes or priorities shift</div>
          </div>
        </div>
      </div>
    </div>
  );
}
