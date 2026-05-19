import { useState } from 'react';

const topServices = [
  { rank: 1, service: 'HVAC Service & Repair', demand: 94, yoy: '+12%' },
  { rank: 2, service: 'Plumbing Repair', demand: 88, yoy: '+8%' },
  { rank: 3, service: 'Electrical Work', demand: 79, yoy: '+15%' },
  { rank: 4, service: 'Roof Repair & Replacement', demand: 72, yoy: '+22%' },
  { rank: 5, service: 'Landscaping & Lawn Care', demand: 68, yoy: '+5%' },
  { rank: 6, service: 'Interior Painting', demand: 61, yoy: '+3%' },
  { rank: 7, service: 'Flooring Installation', demand: 57, yoy: '+18%' },
  { rank: 8, service: 'Fence Repair & Installation', demand: 52, yoy: '+9%' },
  { rank: 9, service: 'Pool Service & Repair', demand: 48, yoy: '+11%' },
  { rank: 10, service: 'Foundation Inspection', demand: 43, yoy: '+31%' },
];

const seasonalData = [
  { month: 'Jan', demand: 42, label: 'Low — heating calls' },
  { month: 'Feb', demand: 45, label: 'Low — plumbing freeze' },
  { month: 'Mar', demand: 63, label: 'Rising — spring prep' },
  { month: 'Apr', demand: 78, label: 'High — landscaping peak' },
  { month: 'May', demand: 85, label: 'Peak — pre-summer HVAC' },
  { month: 'Jun', demand: 95, label: 'Peak — AC surge' },
  { month: 'Jul', demand: 92, label: 'Peak — cooling demand' },
  { month: 'Aug', demand: 88, label: 'High — AC + roofing' },
  { month: 'Sep', demand: 70, label: 'Moderate — fall prep' },
  { month: 'Oct', demand: 65, label: 'Moderate — gutters, ext' },
  { month: 'Nov', demand: 52, label: 'Low — winterizing' },
  { month: 'Dec', demand: 40, label: 'Lowest — holiday slow' },
];

const countyData = [
  { county: 'Dallas County', homes: 1020000, spend: '$3,280', pros: 4200 },
  { county: 'Tarrant County', homes: 780000, spend: '$3,190', pros: 3100 },
  { county: 'Collin County', homes: 460000, spend: '$3,890', pros: 1800 },
  { county: 'Denton County', homes: 410000, spend: '$3,640', pros: 1600 },
  { county: 'Rockwall County', homes: 95000, spend: '$4,100', pros: 320 },
  { county: 'Kaufman County', homes: 78000, spend: '$2,950', pros: 280 },
];

export default function DFWHomeServiceStats() {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const maxDemand = Math.max(...seasonalData.map(d => d.demand));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d1e3a 100%)', padding: '80px 24px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0A1628', background: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 6, marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase' }}>Market Intelligence Report</div>
          <h1 style={{ fontSize: 44, fontWeight: 900, margin: '0 0 16px', lineHeight: 1.1 }}>DFW Home Services<br />Market Stats 2026</h1>
          <p style={{ fontSize: 17, color: '#a0aec0', lineHeight: 1.7, marginBottom: 16 }}>
            The Dallas–Fort Worth Metroplex is one of the fastest-growing home services markets in the United States. Here's what the data shows.
          </p>
          <p style={{ fontSize: 13, color: '#555' }}>Data sourced from U.S. Census Bureau, Texas Real Estate Commission, NAHB, and ProLnk platform analytics · Updated May 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 940, margin: '0 auto', padding: '56px 24px' }}>
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>📊 Market Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { label: 'Total DFW Homes', value: '3.2M', sub: 'residential units', emoji: '🏠' },
              { label: 'Annual Maintenance Spend', value: '$3,400', sub: 'per household avg', emoji: '💸' },
              { label: 'Total Market Size', value: '$10.9B', sub: 'annual home services', emoji: '📈' },
              { label: 'Licensed Contractors', value: '11,300', sub: 'active in DFW', emoji: '🔧' },
              { label: 'Contractor Shortage', value: '23%', sub: 'understaffed vs demand', emoji: '⚠️' },
              { label: 'New Homes Built', value: '47,200', sub: 'in 2025', emoji: '🏗️' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 24, textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.emoji}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>🏆 Top 10 Most Requested Services</h2>
          <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>Ranked by request volume across DFW. YoY = year-over-year demand change.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topServices.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 20px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? '#F5E642' : '#666', minWidth: 28, textAlign: 'center' }}>#{s.rank}</span>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{s.service}</span>
                  <span style={{ fontSize: 13, color: '#4ade80', fontWeight: 700 }}>{s.yoy}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: '#888', minWidth: 28 }}></span>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${s.demand}%`, height: '100%', background: i < 3 ? '#F5E642' : '#4a6fa5', borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                  <span style={{ fontSize: 12, color: '#888', minWidth: 32, textAlign: 'right' }}>{s.demand}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>📅 Seasonal Demand Chart</h2>
          <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: 28, fontSize: 14 }}>Home service request volume by month in DFW. Hover to see details.</p>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '32px 24px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180, marginBottom: 12 }}>
              {seasonalData.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredMonth(i)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  <div style={{ fontSize: 10, color: '#F5E642', fontWeight: 700, visibility: hoveredMonth === i ? 'visible' : 'hidden', whiteSpace: 'nowrap' }}>{d.demand}%</div>
                  <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: hoveredMonth === i ? '#F5E642' : d.demand >= 80 ? '#4a9eff' : 'rgba(255,255,255,0.25)', transition: 'all 0.2s', height: `${(d.demand / maxDemand) * 150}px` }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {seasonalData.map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: hoveredMonth === i ? '#F5E642' : '#888', fontWeight: hoveredMonth === i ? 700 : 400 }}>{d.month}</div>
              ))}
            </div>
            {hoveredMonth !== null && (
              <div style={{ marginTop: 16, padding: '10px 16px', background: 'rgba(245,230,66,0.1)', borderRadius: 8, border: '1px solid rgba(245,230,66,0.3)', fontSize: 14, color: '#e0e6f0' }}>
                <strong style={{ color: '#F5E642' }}>{seasonalData[hoveredMonth].month}:</strong> {seasonalData[hoveredMonth].label}
              </div>
            )}
          </div>
        </section>

        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>🗺️ By County Breakdown</h2>
          <p style={{ color: '#a0aec0', textAlign: 'center', marginBottom: 24, fontSize: 14 }}>Homes, average annual maintenance spend, and active licensed contractors per county.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(245,230,66,0.3)' }}>
                  {['County', 'Residential Homes', 'Avg Annual Spend', 'Active Pros'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 16px', color: '#F5E642', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {countyData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{row.county}</td>
                    <td style={{ padding: '12px 16px', color: '#a0aec0' }}>{row.homes.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: '#4ade80', fontWeight: 700 }}>{row.spend}/yr</td>
                    <td style={{ padding: '12px 16px', color: '#a0aec0' }}>{row.pros.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 36, marginBottom: 48, border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🚨 Contractor Shortage: What It Means</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { stat: '23%', label: 'Demand-supply gap in DFW', desc: 'Contractors cannot fill all incoming service requests.' },
              { stat: '4.1 days', label: 'Average wait time for a plumber', desc: 'Up from 1.8 days in 2022 as demand outpaces supply.' },
              { stat: '38%', label: 'Of pros plan to retire in 5 years', desc: 'Creating an even larger workforce gap by 2030.' },
              { stat: '$2,400', label: 'Average revenue lost per unfilled job', desc: 'By homeowners who couldn\’t find a qualified contractor.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{item.stat}</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#F5E642', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A1628', marginBottom: 10 }}>📰 Media & Press Inquiries</h2>
          <p style={{ color: '#1a1a2e', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>ProLnk has access to real-time DFW home services data. For press kits, data licensing, or research collaboration, reach out to our team.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Contact Press Team</button>
        </section>
      </div>
    </div>
  );
}
