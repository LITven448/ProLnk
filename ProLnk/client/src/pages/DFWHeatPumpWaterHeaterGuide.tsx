import { useState } from 'react';

const homeTypes = ['Single Family', 'Townhome', 'Condo', 'Mobile Home'];
const dfwLocations = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland'];

export default function DFWHeatPumpWaterHeaterGuide() {
  const [homeType, setHomeType] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | {
    feasibility: string;
    sizing: string;
    cost: string;
    rebate: string;
    payback: string;
  }>(null);

  function calculate() {
    if (!homeType || !location) return;
    const isCondo = homeType === 'Condo';
    const isMobile = homeType === 'Mobile Home';
    const feasibility = isCondo
      ? '⚠️ Challenging — condos often lack space for HPWH clearance (1,000 cu ft minimum)'
      : isMobile
      ? '⚠️ Limited — check local codes; smaller models may work in utility rooms'
      : '✅ Excellent — DFW warm ambient air year-round maximizes HPWH efficiency';
    const sizing = isCondo || isMobile ? '50-gallon hybrid model' : '65–80 gallon HPWH for typical 3–4 bed DFW home';
    const cost = '💰 Unit: $1,100–$1,800 | Install: $400–$700 | Total: ~$1,500–$2,500';
    const rebate = '🏷️ Oncor rebate: up to $400 | Federal IRA tax credit: 30% (up to $600) | Total savings: up to $1,000';
    const payback = '📅 Payback period: 3–5 years in DFW (3× more efficient than electric resistance)';
    setResult({ feasibility, sizing, cost, rebate, payback });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>♨️ DFW WATER HEATER GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Heat Pump Water Heaters in DFW</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Why HPWHs outperform traditional electric heaters — and why DFW's climate makes them especially effective.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⚡', label: '3× More Efficient', sub: 'vs electric resistance' },
            { icon: '🌡️', label: 'DFW Climate Advantage', sub: 'warm air = max performance' },
            { icon: '❄️', label: 'Free A/C Bonus', sub: 'cools space as it heats water' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0D1F3C', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.5rem' }}>{c.label}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Why DFW is Ideal for HPWHs</h2>
          {[
            '🌞 DFW averages 234 sunny days/year — HPWHs pull heat from ambient air and perform best above 40°F',
            '❄️ The cooling effect (HPWH exhausts cool, dehumidified air) is a bonus 8+ months per year in DFW',
            '💧 Oncor electric rates average $0.13/kWh — HPWH COP of 3.5 means effective cost of ~$0.037/kWh',
            '🏗️ Most DFW homes have garages with 1,000+ cu ft — perfect for HPWH placement',
          ].map(item => (
            <div key={item} style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 HPWH Feasibility Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {dfwLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Calculate My HPWH Fit →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your HPWH Assessment</h3>
            {Object.values(result).map((v, i) => (
              <div key={i} style={{ color: '#ccc', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{v}</div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem', textAlign: 'center' }}>
              Ready to upgrade? Get 3 quotes from DFW pros on ProLnk — free.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
