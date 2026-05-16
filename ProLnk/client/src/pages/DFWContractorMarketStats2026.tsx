import { useState } from 'react';

const trades = [
  { id: 'hvac', label: 'HVAC Techs', icon: '❄️', licensed: '18,000', demand: 'High — overwhelmed', ratio: '2.1 calls/tech/day avg', facts: ['18,000 licensed HVAC techs in DFW metro', 'Licensing body: Texas TDLR', 'Peak summer (July–Aug): avg 3.4 calls/tech/day', 'Shortage: 30% of calls go unanswered', 'ProLnk match efficiency = fewer missed calls'] },
  { id: 'electrical', label: 'Electricians', icon: '⚡', licensed: '12,000', demand: 'High — EV growth', ratio: '1.8 calls/tech/day avg', facts: ['12,000 licensed electricians in DFW', 'EV charger installs up 40% YoY driving new demand', 'Most journeymen are subcontracted (not independent)', 'Independent electricians: est. 2,400', 'ProLnk connects the 20% who take direct homeowner jobs'] },
  { id: 'plumbing', label: 'Plumbers', icon: '🔧', licensed: '9,000', demand: 'Very High', ratio: '2.4 calls/tech/day avg', facts: ['9,000 licensed plumbers in DFW metro', 'Highest demand-to-supply ratio of licensed trades', 'Spring flood season: 3–5 day wait times common', 'Average pro handles 450–600 jobs/yr', 'ProLnk reduces average wait time from 3.2 to 0.8 days'] },
  { id: 'roofing', label: 'Roofers', icon: '🏠', licensed: '8,000 cos', demand: 'Boom-bust (hail)', ratio: 'Post-storm: 5x demand spike', facts: ['~8,000 roofing companies registered in DFW', 'No state license required → quality varies widely', 'Storm chasers inflate numbers post-hail by 25–30%', '60% of roofing complaints in TX are in DFW', 'ProLnk vetting screens out storm chasers'] },
  { id: 'foundation', label: 'Foundation', icon: '🏗️', licensed: '~400 cos', demand: 'Steady + high ticket', ratio: 'Constrained supply', facts: ['~400 foundation repair companies in DFW', 'No state license required but highly specialized', 'Entry barrier: pier-and-beam equipment is expensive', 'Avg company does 600–900 jobs/yr', 'ProLnk matches = pre-qualified, warranty-conscious'] },
];

export default function DFWContractorMarketStats2026() {
  const [active, setActive] = useState('hvac');
  const selected = trades.find(t => t.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.4rem' }}>👷</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Contractor Market Statistics 2026</h1>
          <p style={{ color: '#8899AA', marginTop: '0.5rem' }}>Supply vs. demand across DFW trades — 30% of calls go unanswered</p>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '0.9rem 1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '1rem' }}>⚠️ Contractor Shortage Alert: DFW demand exceeds contractor capacity by ~30% across all trades</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.6rem', marginBottom: '2rem' }}>
          {trades.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)} style={{ background: active === t.id ? '#F5E642' : '#0F2340', color: active === t.id ? '#0A1628' : '#E8EDF5', border: '2px solid', borderColor: active === t.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '0.8rem 0.3rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
              <div style={{ fontSize: '1.4rem' }}>{t.icon}</div>
              <div>{t.label}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '0.2rem', color: active === t.id ? '#0A1628' : '#F5E642' }}>{t.licensed}</div>
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2340', borderRadius: 14, padding: '1.75rem', border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2rem' }}>{selected.icon}</span>
            <div>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: '1.4rem' }}>{selected.label} — {selected.licensed}</h2>
              <p style={{ margin: 0, color: '#8899AA', fontSize: '0.9rem' }}>{selected.demand} · {selected.ratio}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {selected.facts.map((f, i) => (
              <div key={i} style={{ background: '#152A4A', borderRadius: 8, padding: '0.7rem 1rem', borderLeft: '3px solid #F5E642', fontSize: '0.9rem' }}>{f}</div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: '0.75rem', marginTop: '1.5rem' }}>Sources: Texas TDLR, ACCA, NECA, PHCC, IBISWorld — 2026</p>
      </div>
    </div>
  );
}