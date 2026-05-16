import { useState } from 'react';

const metrics = [
  { id: 'units', label: 'Housing Units', icon: '🏠', value: '2.3M', detail: 'Total housing units across DFW metroplex', breakdown: ['Dallas County: 1.05M units', 'Tarrant County: 580K units', 'Collin County: 350K units', 'Denton County: 290K units', 'Remaining counties: 30K units'] },
  { id: 'price', label: 'Median Price', icon: '💰', value: '$385K', detail: 'Median home sale price in DFW (Q1 2026)', breakdown: ['Frisco / Plano: $580K–$620K', 'Dallas core: $310K–$340K', 'Fort Worth: $285K–$315K', 'Arlington: $270K–$290K', 'Garland / Mesquite: $230K–$260K'] },
  { id: 'population', label: 'Population', icon: '👥', value: '6.5M', detail: 'DFW MSA total population (2026 estimate)', breakdown: ['Dallas city proper: 1.35M', 'Fort Worth: 1.0M', 'Suburban ring (Frisco, McKinney, etc.): 2.8M', 'Outer suburbs and exurbs: 1.35M', 'Annual growth rate: 2.1%'] },
  { id: 'growth', label: 'New Residents', icon: '📈', value: '140K/yr', detail: 'New residents arriving in DFW each year', breakdown: ['Domestic migration (CA, NY, IL): 68K/yr', 'International migration: 41K/yr', 'Natural population increase: 31K/yr', 'Net DFW rank: #1 in US for absolute growth', 'Jobs driving growth: tech, finance, logistics'] },
  { id: 'rank', label: 'Metro Rank', icon: '🏆', value: '#5 US', detail: 'DFW is the 5th largest metro in the United States', breakdown: ['#1 NYC: 20.1M', '#2 LA: 13.2M', '#3 Chicago: 9.5M', '#4 Houston: 7.3M', '#5 DFW: 6.5M — fastest growing of top 5'] },
  { id: 'permits', label: 'Permits 2025', icon: '🔨', value: '42K', detail: 'New home permits issued in DFW in 2025', breakdown: ['Single-family permits: 34,200', 'Multi-family units permitted: 7,800', 'Top submarket: Frisco/Prosper corridor', 'Second: Fort Worth west side', 'Builder starts lagging permits by 8–14 months'] },
];

export default function DFWRealEstateStats2026() {
  const [active, setActive] = useState('units');
  const selected = metrics.find(m => m.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>🏙️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Real Estate Statistics 2026</h1>
          <p style={{ color: '#8899AA', marginTop: '0.5rem' }}>Key housing metrics for the Dallas-Fort Worth metroplex</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {metrics.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)} style={{ background: active === m.id ? '#F5E642' : '#0F2340', color: active === m.id ? '#0A1628' : '#E8EDF5', border: '2px solid', borderColor: active === m.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '0.85rem 0.5rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700, fontSize: '0.85rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{m.icon}</div>
              <div>{m.label}</div>
              <div style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>{m.value}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2340', borderRadius: 14, padding: '1.75rem', border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2rem' }}>{selected.icon}</span>
            <div>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: '1.4rem' }}>{selected.value}</h2>
              <p style={{ margin: 0, color: '#8899AA', fontSize: '0.9rem' }}>{selected.detail}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {selected.breakdown.map((b, i) => (
              <div key={i} style={{ background: '#152A4A', borderRadius: 8, padding: '0.7rem 1rem', borderLeft: '3px solid #F5E642', fontSize: '0.9rem' }}>{b}</div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: '0.75rem', marginTop: '1.5rem' }}>Sources: U.S. Census Bureau, Texas Real Estate Research Center, DFW MLS, NCTCOG — 2026</p>
      </div>
    </div>
  );
}