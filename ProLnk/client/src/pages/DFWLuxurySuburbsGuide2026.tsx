import { useState } from 'react';

const suburbs = [
  { name: 'Westlake', avgPrice: 3500000, school: 'Carroll ISD', hoa: '$400/mo', feature: 'Ultra-exclusive acreage estates', priority: 'exclusivity' },
  { name: 'Southlake', avgPrice: 900000, school: 'Carroll ISD #1', hoa: '$200/mo', feature: 'Top-rated schools + walkable town square', priority: 'schools' },
  { name: 'Colleyville', avgPrice: 750000, school: 'Grapevine-Colleyville ISD', hoa: '$175/mo', feature: 'Quiet luxury, large lots', priority: 'space' },
  { name: 'Frisco (premium)', avgPrice: 750000, school: 'Frisco ISD', hoa: '$200/mo', feature: 'Master-planned luxury + growth corridor', priority: 'growth' },
  { name: 'Highland Park', avgPrice: 2200000, school: 'Highland Park ISD', hoa: 'None (city services)', feature: 'Old Dallas money, walkable, elite ISD', priority: 'prestige' },
  { name: 'Prosper', avgPrice: 680000, school: 'Prosper ISD', hoa: '$150/mo', feature: 'New luxury builds, fast-growing north corridor', priority: 'new construction' },
];

const priorities = ['schools', 'exclusivity', 'space', 'growth', 'prestige', 'new construction'];

export default function DFWLuxurySuburbsGuide2026() {
  const [priority, setPriority] = useState('schools');

  const top = suburbs.filter((s) => s.priority === priority);
  const display = top.length > 0 ? top : suburbs.slice(0, 2);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 8px' }}>DFW Luxury Suburbs 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, margin: '0 0 32px' }}>Top luxury submarkets in Dallas-Fort Worth and what each delivers for premium buyers.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏰', label: 'Top Luxury Market', value: 'Westlake', sub: '$3.5M avg — most exclusive' },
            { icon: '🎓', label: 'Best Schools + Luxury', value: 'Southlake', sub: 'Carroll ISD #1, $900K avg' },
            { icon: '📈', label: 'Fastest Growing Luxury', value: 'Frisco', sub: '$750K+ premium corridor' },
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
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Match Your Luxury Priority</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>What matters most to you?</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {display.map((s) => (
              <div key={s.name} style={{ background: '#0A1628', borderRadius: 10, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{s.name}</div>
                    <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{s.school}</div>
                    <div style={{ color: '#F5E642', fontSize: 13, marginTop: 6 }}>{s.feature}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#22C55E', fontSize: 20, fontWeight: 800 }}>${s.avgPrice.toLocaleString()}</div>
                    <div style={{ color: '#64748B', fontSize: 12 }}>avg price</div>
                    <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>HOA: {s.hoa}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏆 Luxury Buyer Comparison</h2>
          {suburbs.map((s) => (
            <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>{s.school}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${s.avgPrice.toLocaleString()}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{s.hoa}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}