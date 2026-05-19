import { useState } from 'react';

const compareData = [
  { label: '💰 Median Home Price', prosper: '$580,000', celina: '$380,000', winner: 'celina' },
  { label: '📐 Est. Year', prosper: 'City since 1914', celina: 'City since 1876', winner: 'tie' },
  { label: '🎓 School District', prosper: 'Prosper ISD (A+)', celina: 'Celina ISD (A)', winner: 'prosper' },
  { label: '📝 TEA Rating', prosper: 'Exemplary', celina: 'Recognized', winner: 'prosper' },
  { label: '🚗 Drive to Frisco', prosper: '20 min', celina: '30 min', winner: 'prosper' },
  { label: '🚗 Drive to Dallas', prosper: '45 min', celina: '55 min', winner: 'prosper' },
  { label: '📈 Growth Rate', prosper: '+18% yr/yr', celina: '+32% yr/yr', winner: 'celina' },
  { label: '🌾 Rural Feel', prosper: 'Low (suburban)', celina: 'High (still rural pockets)', winner: 'celina' },
  { label: '🏗️ New Construction', prosper: 'Abundant', celina: 'Explosive', winner: 'tie' },
  { label: '🛍️ Retail Access', prosper: 'Good (Shops at Legacy nearby)', celina: 'Limited (growing)', winner: 'prosper' },
  { label: '🏫 Schools Open', prosper: '15+ campuses', celina: '8 campuses (expanding)', winner: 'prosper' },
  { label: '🏡 Lot Sizes', prosper: '7,000–15,000 sq ft typical', celina: '10,000–2+ acre options', winner: 'celina' },
];

export default function DFWProsperVsCelinaGuide() {
  const [budget, setBudget] = useState(480000);
  const [ruralPref, setRuralPref] = useState('suburban');
  const [schoolPriority, setSchoolPriority] = useState('high');

  const getRecommendation = () => {
    let prosperScore = 0;
    let celinaScore = 0;
    if (budget >= 580000) prosperScore += 25;
    else if (budget < 450000) celinaScore += 35;
    else celinaScore += 10;
    if (ruralPref === 'rural') celinaScore += 30;
    else if (ruralPref === 'suburban') prosperScore += 25;
    else { prosperScore += 10; celinaScore += 10; }
    if (schoolPriority === 'high') prosperScore += 20;
    else celinaScore += 10;
    return { prosper: prosperScore, celina: celinaScore };
  };

  const scores = getRecommendation();
  const winner = scores.prosper > scores.celina ? 'Prosper' : 'Celina';
  const reasoning = winner === 'Prosper'
    ? 'Prosper ISD is one of Texas\’s top districts, more established retail, and closer to Frisco employment hub.'
    : 'Celina offers significantly lower prices, larger lots, and rural character with explosive appreciation potential.';

  const prosperNeighborhoods = ['Windsong Ranch', 'Star Trail', 'Gentle Creek', 'Lakes of La Cima'];
  const celinaNeighborhoods = ['Light Farms', 'Sutton Fields', 'Lilyana', 'Cambridge Crossing'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌾</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Prosper vs Celina TX</h1>
          <p style={{ color: '#94a3b8', fontSize: 17 }}>Outer DFW's two fastest-growing suburbs — which fits your life?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { name: 'Prosper', emoji: '🏘️', price: '$580K', desc: 'Established master-planned community with Prosper ISD, closer to Frisco and employment centers. More suburban feel, higher price.', color: '#3b82f6' },
            { name: 'Celina', emoji: '🌅', price: '$380K', desc: 'Texas\’ fastest-growing city. Still rural pockets, massive lots available, Celina ISD growing fast. Best value play in outer DFW.', color: '#22c55e' },
          ].map(city => (
            <div key={city.name} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${city.color}40`, borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{city.emoji}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{city.name}</h2>
              <div style={{ fontSize: 32, fontWeight: 800, color: city.color, marginBottom: 12 }}>{city.price} median</div>
              <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{city.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F5E642', color: '#0A1628' }}>
                {['Category', 'Prosper', 'Celina', 'Edge'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareData.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <td style={{ padding: '9px 14px', color: '#94a3b8' }}>{row.label}</td>
                  <td style={{ padding: '9px 14px', fontWeight: row.winner === 'prosper' ? 700 : 400, color: row.winner === 'prosper' ? '#22c55e' : '#fff' }}>{row.prosper}</td>
                  <td style={{ padding: '9px 14px', fontWeight: row.winner === 'celina' ? 700 : 400, color: row.winner === 'celina' ? '#22c55e' : '#fff' }}>{row.celina}</td>
                  <td style={{ padding: '9px 14px', color: row.winner === 'tie' ? '#64748b' : '#F5E642', fontWeight: 600 }}>{row.winner === 'tie' ? 'Tie' : row.winner === 'prosper' ? '→ Prosper' : '→ Celina'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Which Is Right for You?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Budget</label>
              <input type="range" min={300000} max={900000} step={10000} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Lifestyle Preference</label>
              <select value={ruralPref} onChange={e => setRuralPref(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="rural">🌾 Rural / Country Feel</option>
                <option value="mix">🌿 Mix of Both</option>
                <option value="suburban">🏘️ True Suburban</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>School District Priority</label>
              <select value={schoolPriority} onChange={e => setSchoolPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="high">🎓 Top priority</option>
                <option value="low">🏡 Less important</option>
              </select>
            </div>
          </div>
          <div style={{ background: 'rgba(245,230,66,0.15)', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>🏆 Best Fit: {winner}</div>
            <p style={{ color: '#94a3b8', marginBottom: 12, fontSize: 14 }}>{reasoning}</p>
            <div style={{ fontSize: 13, color: '#64748b' }}>Top neighborhoods: {(winner === 'Prosper' ? prosperNeighborhoods : celinaNeighborhoods).join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
