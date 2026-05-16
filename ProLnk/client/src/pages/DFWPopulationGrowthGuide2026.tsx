import { useState } from 'react';

const positions = [
  { id: 'homeowner', label: 'I Own a Home', icon: '🏡', headline: 'Growth = Equity + Higher Service Costs', impacts: ['140K new residents/yr drives home appreciation 4–7%/yr', 'Your DFW home: +$19K–$27K in value per year on average', 'Contractor demand outpaces supply → wait times increasing', 'Service costs up ~8% YoY due to labor shortage', 'ProLnk solves this: instant match to vetted, available pros'] },
  { id: 'buyer', label: "I'm Buying", icon: '🔑', headline: 'Buy Now — Appreciation Outpaces Holding Costs', impacts: ['Median price $385K — up $26K since Q1 2024', '140K new residents competing for 42K new homes/yr', 'Construction lag: 8–14 months from permit to close', 'Best value corridors: Fort Worth west, Denton north', 'New construction buyers need ProLnk for punch-list pros'] },
  { id: 'seller', label: "I'm Selling", icon: '📋', headline: 'Sellers Have Leverage — But Pre-List Prep Matters', impacts: ['Median days on market: 28 days (DFW, Q1 2026)', 'Move-in ready homes sell 12% faster and 6% higher', 'Top pre-list upgrades: HVAC ($4.2K ROI), flooring, paint', 'Foundation disclosure required — pre-list inspection is essential', 'ProLnk = fast access to pre-list prep contractors'] },
  { id: 'investor', label: 'Investor', icon: '💼', headline: 'DFW is the #1 US Single-Family Rental Market', impacts: ['Cap rates: 5.2–6.8% in outer suburbs', 'Rent growth: +4.1% YoY, vacancy < 5%', '140K/yr demand growth sustains rent premiums', 'Maintenance costs: biggest profitability variable', 'ProLnk = lower maintenance cost, faster turns'] },
  { id: 'pro', label: "I'm a Pro", icon: '🔧', headline: 'Growth Means More Demand Than You Can Handle', impacts: ['DFW adds 140K residents/yr → 56K+ new housing units needed', 'Each new home needs 8–12 service calls in year 1', 'Contractor shortage: 30% of calls go unanswered', 'Average DFW pro turns away $42K/yr in overflow work', 'ProLnk captures your overflow and fills slow days'] },
];

export default function DFWPopulationGrowthGuide2026() {
  const [active, setActive] = useState('homeowner');
  const selected = positions.find(p => p.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>📈</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Population Growth Impact 2026</h1>
          <p style={{ color: '#8899AA', marginTop: '0.5rem' }}>140,000 new residents per year — how does growth affect your situation?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.6rem', marginBottom: '2rem' }}>
          {positions.map(p => (
            <button key={p.id} onClick={() => setActive(p.id)} style={{ background: active === p.id ? '#F5E642' : '#0F2340', color: active === p.id ? '#0A1628' : '#E8EDF5', border: '2px solid', borderColor: active === p.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '0.8rem 0.3rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
              <div style={{ fontSize: '1.4rem' }}>{p.icon}</div>
              <div>{p.label}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2340', borderRadius: 14, padding: '1.75rem', border: '1px solid #1E3A5F' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ margin: 0, color: '#F5E642', fontSize: '1.3rem' }}>{selected.icon} {selected.headline}</h2>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {selected.impacts.map((item, i) => (
              <div key={i} style={{ background: '#152A4A', borderRadius: 8, padding: '0.7rem 1rem', borderLeft: '3px solid #F5E642', fontSize: '0.9rem' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
          {[['📍','#1 Growth Metro','US by absolute population gain'],['🏗️','42K permits','New homes permitted in DFW 2025'],['⚡','30% shortage','Contractor capacity gap vs. demand']].map(([icon,val,label],i)=>(
            <div key={i} style={{ background: '#0F2340', borderRadius: 10, padding: '1rem', textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642' }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: '#8899AA' }}>{label}</div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: '0.75rem', marginTop: '1.5rem' }}>Sources: U.S. Census Bureau, NCTCOG, Texas Real Estate Research Center — 2026</p>
      </div>
    </div>
  );
}
