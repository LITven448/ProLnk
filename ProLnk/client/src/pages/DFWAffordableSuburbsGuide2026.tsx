import { useState } from 'react';

const suburbs = [
  { name: 'Lancaster', avgPrice: 265000, school: 'Lancaster ISD', commute: '28 min to Dallas', highlight: 'Best value in DFW' },
  { name: 'Mesquite', avgPrice: 285000, school: 'Mesquite ISD', commute: '22 min to Dallas', highlight: 'Growing east suburb' },
  { name: 'Duncanville', avgPrice: 285000, school: 'Duncanville ISD', commute: '20 min to Dallas', highlight: 'SW Dallas access' },
  { name: 'Grand Prairie', avgPrice: 295000, school: 'Grand Prairie ISD', commute: '25 min to Fort Worth', highlight: 'Central DFW location' },
  { name: 'Garland', avgPrice: 310000, school: 'Garland ISD', commute: '18 min to Dallas', highlight: 'Near PGBT tollway' },
  { name: 'Balch Springs', avgPrice: 270000, school: 'Mesquite ISD', commute: '20 min to Dallas', highlight: 'Ultra affordable SE' },
];

const budgets = [200000, 250000, 300000, 350000];

export default function DFWAffordableSuburbsGuide2026() {
  const [budget, setBudget] = useState(300000);

  const eligible = suburbs.filter((s) => s.avgPrice <= budget);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 8px' }}>DFW Most Affordable Suburbs 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, margin: '0 0 32px' }}>Best-value Dallas-Fort Worth suburbs where your dollar stretches furthest in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏡', label: 'Lowest Avg Price', value: '$265K', sub: 'Lancaster, TX' },
            { icon: '📍', label: 'Suburbs Under $310K', value: '6 Options', sub: 'All within 30 min of Dallas' },
            { icon: '🏫', label: 'School Access', value: 'Strong ISDs', sub: 'Multiple A-rated campuses' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: '20px 18px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{card.value}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Suburbs In Your Budget</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Your Budget</label>
            <select value={budget} onChange={(e) => setBudget(Number(e.target.value))} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              {budgets.map((b) => <option key={b} value={b}>Up to ${b.toLocaleString()}</option>)}
            </select>
          </div>
          {eligible.length === 0 ? (
            <div style={{ color: '#F59E0B', padding: 16, textAlign: 'center' }}>Lower your budget filter to see results below $200K — check Irving or Hutchins.</div>
          ) : (
            <div style={{ display: 'grid', gap: 12 }}>
              {eligible.map((s) => (
                <div key={s.name} style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</div>
                    <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{s.school} · {s.commute}</div>
                    <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{s.highlight}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#22C55E', fontSize: 22, fontWeight: 800 }}>${s.avgPrice.toLocaleString()}</div>
                    <div style={{ color: '#64748B', fontSize: 12 }}>avg price</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💡 What You Get for Under $300K in DFW</h2>
          {[
            { item: 'Square Footage', value: '1,800–2,400 sq ft typical' },
            { item: 'Lot Size', value: '6,000–8,500 sq ft avg' },
            { item: 'Bedrooms', value: '3–4 bed / 2 bath standard' },
            { item: 'Age of Home', value: '1990s–2010 construction common' },
            { item: 'Garage', value: '2-car garage typical' },
            { item: 'HOA', value: 'Often none or low ($0–$75/mo)' },
          ].map((row) => (
            <div key={row.item} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1E3A5F' }}>
              <span style={{ color: '#94A3B8', fontSize: 14 }}>{row.item}</span>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}