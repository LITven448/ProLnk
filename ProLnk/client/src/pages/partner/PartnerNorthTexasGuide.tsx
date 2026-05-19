import { useState } from 'react';

const SUBMARKETS = ['Frisco', 'McKinney', 'Allen', 'Plano', 'Arlington', 'Fort Worth', 'Dallas', 'Garland'];
const TRADES = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Landscaping', 'General Contractor'];

const SEASONAL = {
  HVAC: { Spring: 'High', Summer: 'Peak', Fall: 'Medium', Winter: 'Low' },
  Plumbing: { Spring: 'Medium', Summer: 'Medium', Fall: 'Medium', Winter: 'High' },
  Electrical: { Spring: 'High', Summer: 'High', Fall: 'Medium', Winter: 'Medium' },
  Roofing: { Spring: 'Peak', Summer: 'High', Fall: 'Peak', Winter: 'Low' },
  Landscaping: { Spring: 'Peak', Summer: 'High', Fall: 'Medium', Winter: 'Low' },
  'General Contractor': { Spring: 'High', Summer: 'Peak', Fall: 'High', Winter: 'Medium' },
};

const INCOME = {
  Frisco: 1.4, McKinney: 1.3, Allen: 1.3, Plano: 1.25,
  Arlington: 1.0, 'Fort Worth': 1.0, Dallas: 1.1, Garland: 0.95,
};

const BASE_INCOME: Record<string, number> = {
  HVAC: 8200, Plumbing: 7400, Electrical: 6800, Roofing: 7100,
  Landscaping: 4900, 'General Contractor': 9100,
};

export default function PartnerNorthTexasGuide() {
  const [trade, setTrade] = useState('HVAC');
  const [submarket, setSubmarket] = useState('Frisco');

  const base = BASE_INCOME[trade] || 7000;
  const multiplier = INCOME[submarket as keyof typeof INCOME] || 1.0;
  const monthly = Math.round(base * multiplier);
  const annual = monthly * 12;
  const seasonal = SEASONAL[trade as keyof typeof SEASONAL] || {};

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🤠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>ProLnk in North Texas</h1>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 600, margin: '0 auto' }}>
            Why DFW is the #1 market to launch your ProLnk career — and how to maximize it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🏠', label: 'Homes in DFW', value: '3.2M+' },
            { icon: '📞', label: 'Service Calls/Day', value: '50K+' },
            { icon: '📈', label: 'Population Growth Rank', value: '#1 in US' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', borderRadius: 16, padding: 24, textAlign: 'center', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0A1628′ }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏆 Best Cities to Start</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              { city: 'Frisco', why: 'Highest median income $130K+, fastest permit growth' },
              { city: 'McKinney', why: 'New construction boom, underserved contractor market' },
              { city: 'Allen', why: 'Dense suburbs, high homeownership rate 76%' },
              { city: 'Plano', why: 'Corporate HQ density, high commercial adjacency' },
            ].map(item => (
              <div key={item.city} style={{ background: '#F9FAFB', borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{item.city}</div>
                <div style={{ fontSize: 13, color: '#4B5563′ }}>{item.why}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Income Calculator by Trade + Submarket</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Trade Type</label>
              <select value={trade} onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>DFW Submarket</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {SUBMARKETS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 800 }}>${monthly.toLocaleString()}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Est. Monthly Potential</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 800 }}>${annual.toLocaleString()}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Est. Annual Potential</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Seasonal Demand — {trade}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {Object.entries(seasonal).map(([season, level]) => (
                <div key={season} style={{ background: level === 'Peak' ? '#0A1628′ : level === ’High' ? '#1E3A5F' : '#F3F4F6',
                  color: level === 'Peak' || level === 'High' ? '#fff' : '#374151', borderRadius: 8, padding: '10px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{season}</div>
                  <div style={{ fontSize: 11, marginTop: 2, opacity: 0.8 }}>{level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Ready to dominate DFW?</div>
          <p style={{ color: '#9CA3AF', marginBottom: 20 }}>Join ProLnk as a Charter or Founding partner and lock your territory today.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15,
            padding: '14px 32px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Claim My DFW Territory →
          </button>
        </div>
      </div>
    </div>
  );
}
