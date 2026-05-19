import { useState } from 'react';

export default function DFWFederalTaxCredits2026() {
  const [upgradeType, setUpgradeType] = useState('solar');
  const [cost, setCost] = useState('');
  const [result, setResult] = useState<{ credit: number; cap: string; note: string } | null>(null);

  const credits: Record<string, { pct: number; cap: string; note: string }> = {
    solar: { pct: 0.30, cap: 'No cap', note: 'Federal Investment Tax Credit — full 30% through 2032, then phases out' },
    heatpump: { pct: 0.30, cap: '$2,000/yr', note: 'Heat pump HVAC — $2,000 annual cap under IRA Section 25C' },
    battery: { pct: 0.30, cap: 'No cap', note: 'Home battery storage (min 3 kWh) — full 30% credit, no cap' },
    evcharger: { pct: 0.30, cap: '$1,000', note: 'EV charger (Level 2, 240V) — 30% up to $1,000 per property' },
    insulation: { pct: 0.30, cap: '$1,200/yr', note: 'Insulation + air sealing — 30% up to $1,200/yr combined with doors/windows' },
    windows: { pct: 0.30, cap: '$600', note: 'ENERGY STAR windows — 30% up to $600 per year' },
    doors: { pct: 0.30, cap: '$500', note: 'ENERGY STAR exterior doors — 30% up to $500 (up to $250 per door)' },
  };

  const calculate = () => {
    const c = parseFloat(cost.replace(/,/g, ''));
    if (!c || isNaN(c)) return;
    const info = credits[upgradeType];
    const rawCredit = c * info.pct;
    let credit = rawCredit;
    if (upgradeType === 'battery' && credit > 0) credit = rawCredit;
    if (upgradeType === 'heatpump') credit = Math.min(rawCredit, 2000);
    if (upgradeType === 'evcharger') credit = Math.min(rawCredit, 1000);
    if (upgradeType === 'insulation') credit = Math.min(rawCredit, 1200);
    if (upgradeType === 'windows') credit = Math.min(rawCredit, 600);
    if (upgradeType === 'doors') credit = Math.min(rawCredit, 500);
    setResult({ credit, cap: info.cap, note: info.note });
  };

  const upgradeLabels: Record<string, string> = {
    solar: '☀️ Solar Panels', heatpump: '🌡️ Heat Pump HVAC', battery: '🔋 Battery Backup',
    evcharger: '⚡ EV Charger', insulation: '🏠 Insulation / Air Sealing', windows: '🪟 Windows', doors: '🚪 Doors'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡🏛️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: '0.5rem 0′ }}>DFW Federal Home Tax Credits 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>IRA Inflation Reduction Act credits still available through 2032 — up to 30% back on eligible upgrades.</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏆 Credit Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem' }}>
            {[['☀️ Solar Panels','30% — No cap'],['🔋 Battery Storage','30% — No cap'],['🌡️ Heat Pump','30% — $2,000/yr'],['⚡ EV Charger','30% — $1,000'],['🏠 Insulation','30% — $1,200/yr'],['🪟 Windows','30% — $600/yr'],['🚪 Doors','30% — $500/yr'],['🌞 Solar Water Heater','30% — No cap']].map(([name, credit]) => (
              <div key={name} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{name}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{credit}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📋 How to Claim</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[['1️⃣','Complete qualifying upgrade with licensed contractor'],['2️⃣','Save receipts and manufacturer certifications'],['3️⃣','File IRS Form 5695 with your tax return'],['4️⃣','Credit reduces tax owed (non-refundable — unused credit can carry forward for solar)']].map(([step, desc]) => (
              <div key={step} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{step}</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🧮 Tax Credit Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Upgrade Type</label>
              <select value={upgradeType} onChange={e => setUpgradeType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 6, color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }}>
                {Object.entries(upgradeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Project Cost</label>
              <input value={cost} onChange={e => setCost(e.target.value)} placeholder='e.g. 25,000'
                style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 6, color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Calculate My Credit</button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1.25rem', border: '1px solid #F5E642′ }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F5E642′ }}>💰 ${Math.round(result.credit).toLocaleString()} Credit</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.25rem 0′ }}>Annual cap: {result.cap}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.5rem' }}>{result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}