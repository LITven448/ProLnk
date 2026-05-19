import { useState } from 'react';

const HOME_AGE = ['New (0–5 yrs)', 'Modern (6–15 yrs)', 'Mid-Age (16–25 yrs)', 'Older (26–40 yrs)', 'Legacy (40+ yrs)'];
const SYSTEM_AGE = ['0–3 yrs', '4–8 yrs', '9–12 yrs', '13–17 yrs', '18+ yrs'];
const HOME_SIZE_OPT = ['Under 1,500', '1,500–2,500', '2,500–3,500', '3,500–5,000', '5,000+'];

type Opportunity = { label: string; saving: number; cost: number };

export default function DFWHVACEnergyAuditCalc() {
  const [homeAge, setHomeAge] = useState(2);
  const [sysAge, setSysAge] = useState(2);
  const [sqft, setSqft] = useState(2);
  const [atticIns, setAtticIns] = useState(true);
  const [smartThermo, setSmartThermo] = useState(false);
  const [result, setResult] = useState<null | { pct: number; annualCost: number; opps: Opportunity[] }>(null);

  function calculate() {
    const basePct = 52;
    const ageAdder = [0, 3, 8, 14, 22][sysAge];
    const homeAdder = [0, 2, 5, 9, 14][homeAge];
    const pct = Math.min(75, basePct + ageAdder + homeAdder * 0.5);
    const sqftCosts = [1200, 1800, 2600, 3600, 5000];
    const annualCost = Math.round(sqftCosts[sqft] * (pct / 52));
    const opps: Opportunity[] = [];
    if (sysAge >= 3) opps.push({ label: '🔄 Replace aging system (SEER 18+)', saving: Math.round(annualCost * 0.35), cost: 8500 });
    if (!atticIns) opps.push({ label: '🏠 Add attic insulation (R-38 target for DFW)', saving: Math.round(annualCost * 0.2), cost: 2200 });
    opps.push({ label: '🔧 Seal & insulate ductwork (DFW avg 25% loss)', saving: Math.round(annualCost * 0.18), cost: 950 });
    if (!smartThermo) opps.push({ label: '📱 Install smart thermostat (DFW schedule optimization)', saving: Math.round(annualCost * 0.12), cost: 250 });
    opps.push({ label: '🌬️ Annual professional tune-up', saving: Math.round(annualCost * 0.08), cost: 150 });
    opps.sort((a, b) => (b.saving / b.cost) - (a.saving / a.cost));
    setResult({ pct: Math.round(pct), annualCost, opps });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>⚡ DFW HVAC Energy Audit Calculator</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>DFW homes spend 50–65% of energy on HVAC. Find where your money is going and rank your best savings opportunities.</p>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 560 }}>
        <label style={{ color: '#F5E642' }}>Home Age
          <select value={homeAge} onChange={e => setHomeAge(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {HOME_AGE.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>HVAC System Age
          <select value={sysAge} onChange={e => setSysAge(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {SYSTEM_AGE.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>Home Size (sqft)
          <select value={sqft} onChange={e => setSqft(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {HOME_SIZE_OPT.map((o, i) => <option key={i} value={i}>{o} sqft</option>)}
          </select>
        </label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={atticIns} onChange={e => setAtticIns(e.target.checked)} /> 🏠 Has Attic Insulation
          </label>
          <label style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={smartThermo} onChange={e => setSmartThermo(e.target.checked)} /> 📱 Smart Thermostat
          </label>
        </div>
        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Run Energy Audit</button>
      </div>
      {result && (
        <div style={{ marginTop: '1.5rem', background: '#1e2d45', borderRadius: 10, padding: '1.25rem', maxWidth: 560 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>{result.pct}%<span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 400 }}> of energy bill = HVAC</span></div>
          <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>Estimated HVAC annual cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>${result.annualCost.toLocaleString()}</span></div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Top Savings Opportunities (ranked by ROI):</div>
          {result.opps.map((o, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 6, padding: '0.6rem 0.8rem', marginBottom: '0.5rem' }}>
              <div style={{ color: '#e2e8f0' }}>{o.label}</div>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.3rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                <span>💰 Save ${o.saving}/yr</span>
                <span>🔧 Cost ~${o.cost.toLocaleString()}</span>
                <span>📅 Payback ~{(o.cost / o.saving).toFixed(1)} yrs</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
