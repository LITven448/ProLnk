import { useState } from 'react';

export default function DFWPoolServiceProGuide2026() {
  const [weekly, setWeekly] = useState(20);
  const [openings, setOpenings] = useState(5);
  const [repairs, setRepairs] = useState(3);

  const weeklyRevenue = weekly * 150;
  const openingRevenue = openings * 400;
  const repairRevenue = repairs * 600;
  const monthlyTotal = weeklyRevenue + Math.round(openingRevenue / 12) + repairRevenue;
  const annualTotal = weeklyRevenue * 12 + openingRevenue + repairRevenue * 12;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏊</span>
          <div>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Pro Guide — DFW 2026</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Pool Service Pro Guide</h1>
          </div>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW has 650K+ residential pools — one of the largest pool markets in the US.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🪪', label: 'TX License (CPO)', value: 'Required' },
            { icon: '🌊', label: 'DFW Pools', value: '650K+' },
            { icon: '💧', label: 'Weekly Service', value: '$150/mo' },
            { icon: '🔧', label: 'Equipment Repair', value: '$400–900′ },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>💰 Monthly Revenue Projector</h2>
          {[
            { label: 'Weekly service accounts', value: weekly, setter: setWeekly, min: 1, max: 80, unit: 'accounts' },
            { label: 'Pool openings/closings per year', value: openings, setter: setOpenings, min: 0, max: 50, unit: 'per yr' },
            { label: 'Equipment repairs per month', value: repairs, setter: setRepairs, min: 0, max: 20, unit: '/mo' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{item.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{item.value} {item.unit}</span>
              </div>
              <input type="range" min={item.min} max={item.max} value={item.value} onChange={(e) => item.setter(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Monthly Revenue</div>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>${monthlyTotal.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>Annual Revenue</div>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>${annualTotal.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 16, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>📋 DFW Pool Market Intel</h2>
          {['TX requires CPO (Certified Pool Operator) certificate for commercial; residential often exempt but CPO builds trust', 'DFW pool season: March–October peak; year-round mild demand', 'Pool openings (spring) and closings (late fall) are high-margin one-time revenue', 'Equipment upgrades (pumps, heaters, automation) average $1,200–4,000 per job', 'ProLnk connects pool pros to homeowners within 24 hours of water damage or green pool events'].map((n) => (
            <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}