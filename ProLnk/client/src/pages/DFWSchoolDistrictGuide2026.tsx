import { useState } from 'react';

const districts = [
  { name: 'Frisco ISD', county: 'Collin County', rating: 'A+', premium: 75000, cities: 'Frisco, Prosper area', priority: 'academics' },
  { name: 'Carroll ISD', county: 'Tarrant County', rating: 'A+', premium: 100000, cities: 'Southlake, Westlake', priority: 'prestige' },
  { name: 'Coppell ISD', county: 'Dallas County', rating: 'A+', premium: 80000, cities: 'Coppell', priority: 'academics' },
  { name: 'Highland Park ISD', county: 'Dallas County', rating: 'A+', premium: 150000, cities: 'Highland Park, University Park', priority: 'prestige' },
  { name: 'Allen ISD', county: 'Collin County', rating: 'A', premium: 50000, cities: 'Allen', priority: 'value' },
  { name: 'Prosper ISD', county: 'Collin County', rating: 'A', premium: 45000, cities: 'Prosper, Celina', priority: 'growth' },
  { name: 'Plano ISD', county: 'Collin County', rating: 'A', premium: 40000, cities: 'Plano, parts of Frisco', priority: 'value' },
];

const priorities = ['academics', 'prestige', 'value', 'growth'];

export default function DFWSchoolDistrictGuide2026() {
  const [priority, setPriority] = useState('academics');

  const filtered = districts.filter((d) => d.priority === priority);
  const display = filtered.length > 0 ? filtered : districts.slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 8px' }}>DFW School District Guide 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, margin: '0 0 32px' }}>Top-rated school districts in DFW and how they impact home values by $50K-$150K.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏆', label: '#1 in Collin County', value: 'Frisco ISD', sub: '+$75K home premium avg' },
            { icon: '⭐', label: 'Dallas County Elite', value: 'Highland Park', sub: '+$150K premium' },
            { icon: '📈', label: 'School Rating Impact', value: '+$50-150K', sub: 'A-rated district premium' },
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
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎓 Find Your District Match</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Family Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {display.map((d) => (
              <div key={d.name} style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{d.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{d.county} · {d.cities}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ background: '#22C55E', color: '#fff', borderRadius: 6, padding: '3px 10px', fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{d.rating}</div>
                  <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>+${d.premium.toLocaleString()} premium</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 All Top DFW Districts</h2>
          {districts.map((d) => (
            <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>{d.cities}</div>
              </div>
              <span style={{ background: '#22C55E', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 13, fontWeight: 700 }}>{d.rating}</span>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>+${d.premium.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}