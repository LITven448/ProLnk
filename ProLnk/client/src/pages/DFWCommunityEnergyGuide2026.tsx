import { useState } from 'react';

const cities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland'];
const homeTypes = ['Single Family', 'Townhome', 'Condo', 'Apartment'];

const programs: Record<string, { name: string; icon: string; value: string; desc: string; cities?: string[]; types?: string[] }[]> = {
  always: [
    { name: 'Oncor Demand Response', icon: '⚡', value: '$50–200/yr', desc: 'Let Oncor cycle your AC during peak demand events. Free smart thermostat included.' },
    { name: 'Atmos Weatherization Rebates', icon: '🔧', value: 'Up to $500', desc: 'Rebates for insulation, weather stripping, and pipe insulation through Atmos Energy.' },
    { name: 'PowerToChoose Green Plans', icon: '🌱', value: 'Market rate', desc: '100% renewable electricity plans available to all DFW customers on the open market.' },
  ],
  dallas: [
    { name: 'Dallas Green Building Program', icon: '🏗️', value: 'Varies', desc: 'Rebates and expedited permits for energy-efficient construction and renovation in Dallas.' },
    { name: 'Dallas Community Solar', icon: '☀️', value: '5–10% bill credit', desc: 'Subscribe to a shared solar farm. No panels needed. Credit applied to your bill monthly.' },
  ],
  fortworth: [
    { name: 'Fort Worth Conservation Rebates', icon: '💧', value: 'Up to $300', desc: 'Water and energy conservation rebates for Fort Worth residents through Fort Worth Water.' },
    { name: 'FW Solar Co-op', icon: '☀️', value: '15–20% off install', desc: 'Group solar purchasing program — get solar at discounted rates through city-organized co-ops.' },
  ],
  frisco: [
    { name: 'Frisco Energy Efficiency Rebate', icon: '🏠', value: 'Up to $400', desc: 'City of Frisco rebates for HVAC upgrades, insulation, and smart home energy systems.' },
  ],
};

export default function DFWCommunityEnergyGuide2026() {
  const [city, setCity] = useState('');
  const [homeType, setHomeType] = useState('');

  const cityKey = city.toLowerCase().replace(' ', '');
  const cityPrograms = programs[cityKey] || [];
  const allPrograms = [...programs.always, ...cityPrograms];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌍</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Community Energy Programs 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Solar, rebates, demand response — money available you may not know about</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find Your Programs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Your City</label>
              <select value={city} onChange={e => setCity(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: city ? '#fff' : '#64748b', fontSize: 14 }}>
                <option value="">Select city...</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: homeType ? '#fff' : '#64748b', fontSize: 14 }}>
                <option value="">Select type...</option>
                {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allPrograms.map((p, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, border: '1px solid #1e3a5f' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <div>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                    <div style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>{p.value}</div>
                  </div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          {city && cityPrograms.length === 0 && (
            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 14, marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 12 }}>
              No city-specific programs found for {city}. The statewide programs above still apply to you.
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>☀️ Community Solar — No Panels Needed</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Community solar lets you subscribe to a portion of a shared solar farm and receive credits on your electric bill — no rooftop installation required.
            Ideal for renters, condo owners, or homes with shaded or north-facing roofs. Subscriptions typically deliver 5–15% savings vs. standard grid rates.
            Programs are expanding across Dallas and Collin counties in 2026.
          </p>
        </div>
      </div>
    </div>
  );
}