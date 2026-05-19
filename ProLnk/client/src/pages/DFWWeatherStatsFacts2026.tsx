import { useState } from 'react';

const concerns = [
  { id: 'heat', label: 'Summer Heat', icon: '☀️', stat: '97°F avg July high', detail: 'DFW summer is brutal — HVAC is life-critical infrastructure', impacts: ['229 sunny days/yr — highest UV load in Texas', 'Average high July: 97°F, August: 96°F', 'Heat index regularly hits 105–112°F', 'HVAC failure in July = emergency same-day call', 'AC systems run 7–9 months of the year in DFW'] },
  { id: 'freeze', label: 'Winter Freeze', icon: '🧊', stat: '10–15 freeze days/yr', detail: 'DFW winters are mild but freeze events cause outsized damage', impacts: ['10–15 days below 32°F annually', '2021 freeze event: $3.8B in DFW property damage', 'Pipe bursts: 4–6x more common during freeze events', 'Most DFW homes lack adequate insulation for sub-20°F', 'Emergency plumber calls spike 800% during freeze'] },
  { id: 'hail', label: 'Hail Events', icon: '⛈️', stat: '5–7 hail events/yr', detail: 'DFW is in the Hail Belt — roofing is the most insurance-driven trade', impacts: ['5–7 significant hail events per year in DFW', 'Average hailstone: 1.5 inches (golf ball = 1.75 in)', 'DFW ranks #2 in US for hail insurance claims', 'Average roof replacement from hail: $8,200–$14,000', 'Post-storm roofer demand: 500% spike over 72 hours'] },
  { id: 'rain', label: 'Rain & Flooding', icon: '🌧️', stat: '37 inches/yr', detail: 'DFW rainfall is concentrated in spring and fall — flooding risk is real', impacts: ['37 inches/yr average — most falls April–June and Oct–Nov', 'Urban flooding: DFW has 40+ FEMA flood zones', 'Foundation movement driven by wet/dry clay cycles', 'Drainage and waterproofing service demand: $180M/yr', 'Sump pump installs up 35% over past 5 years'] },
  { id: 'tornado', label: 'Tornado Risk', icon: '🌪️', stat: 'Zone 1 risk', detail: 'DFW sits in Tornado Alley — roofs and structures face wind damage annually', impacts: ['DFW is Zone 1 (moderate-high) tornado risk', 'Average 4–6 tornado touchdowns in DFW per year', 'F0–F1 events cause significant roof and fence damage', 'Post-storm general contractor demand surges 200–300%', 'Safe room installation growing 25% YoY in DFW suburbs'] },
];

export default function DFWWeatherStatsFacts2026() {
  const [active, setActive] = useState('heat');
  const selected = concerns.find(c => c.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>🌤️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Weather Facts for Homeowners 2026</h1>
          <p style={{ color: '#8899AA', marginTop: '0.5rem' }}>Climate data every DFW homeowner needs to protect their property</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.6rem', marginBottom: '2rem' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{ background: active === c.id ? '#F5E642′ : '#0F2340', color: active === c.id ? '#0A1628' : '#E8EDF5', border: '2px solid', borderColor: active === c.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '0.8rem 0.3rem', cursor: ’pointer', fontWeight: 700, fontSize: '0.8rem' }}>
              <div style={{ fontSize: '1.4rem' }}>{c.icon}</div>
              <div>{c.label}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2340', borderRadius: 14, padding: '1.75rem', border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2.2rem' }}>{selected.icon}</span>
            <div>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: '1.5rem' }}>{selected.stat}</h2>
              <p style={{ margin: 0, color: '#8899AA', fontSize: '0.9rem' }}>{selected.detail}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {selected.impacts.map((item, i) => (
              <div key={i} style={{ background: '#152A4A', borderRadius: 8, padding: '0.7rem 1rem', borderLeft: '3px solid #F5E642', fontSize: '0.9rem' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2340', borderRadius: 10, padding: '1rem 1.25rem', marginTop: '1.25rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#8899AA' }}>☀️ 229 sunny days &nbsp;·&nbsp; 🧊 10–15 freeze days &nbsp;·&nbsp; ⛈️ 5–7 hail events &nbsp;·&nbsp; 🌧️ 37 in/yr &nbsp;·&nbsp; 🌡️ 97°F avg July high</p>
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: '0.75rem', marginTop: '1rem' }}>Sources: NOAA, National Weather Service Fort Worth, FEMA — 2026</p>
      </div>
    </div>
  );
}