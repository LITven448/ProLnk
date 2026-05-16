import { useState } from 'react';

const SEASON_OPTIONS = ['Spring', 'Summer (Peak Heat)', 'Fall', 'Winter'];
const SYMPTOM_OPTIONS = ['Condensation on Windows', 'Musty Odor', 'Dry Skin/Static', 'Warping Wood', 'Allergy Flare-Ups', 'None'];
const HOME_SIZE = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500–5,000 sqft', '5,000+ sqft'];

export default function DFWHVACHumidityManagementCalc() {
  const [currentRH, setCurrentRH] = useState(55);
  const [targetRH, setTargetRH] = useState(45);
  const [season, setSeason] = useState(1);
  const [symptom, setSymptom] = useState(0);
  const [homeSize, setHomeSize] = useState(1);
  const [result, setResult] = useState<null | { gap: number; plan: string[]; cost: string; urgency: string }>(null);

  function calculate() {
    const gap = currentRH - targetRH;
    const seasonFactor = [1.1, 1.5, 1.2, 0.8][season];
    const urgency = gap > 20 ? '🔴 High Priority' : gap > 10 ? '🟡 Moderate' : gap > 0 ? '🟢 Minor Adjustment' : '✅ On Target';
    const plan: string[] = [];
    const costParts: string[] = [];
    if (gap > 15 || season === 1) {
      plan.push('💧 Whole-home dehumidifier — DFW summers routinely reach 85% RH outdoors');
      costParts.push('Whole-home dehumidifier: $1,200–$2,500 installed');
    }
    if (homeSize >= 2) {
      plan.push('🌬️ Upgrade to properly sized ERV — balances fresh air without humidity spikes');
      if (gap > 5) costParts.push('ERV upgrade: $1,800–$3,500');
    }
    if (currentRH < 35) {
      plan.push('💨 Add whole-home humidifier — DFW winters create dangerously dry indoor air');
      costParts.push('Humidifier: $400–$900 installed');
    }
    if (symptom === 0 || symptom === 1) {
      plan.push('🔧 Check duct insulation — condensation often indicates undersized or leaky ducts');
    }
    if (gap <= 0 && symptom === 5) {
      plan.push('✅ Your humidity is well-managed — schedule annual HVAC check to maintain');
    }
    const baseCost = costParts.length === 0 ? 'No major investment needed' : costParts.join(' | ');
    setResult({ gap, plan, cost: baseCost, urgency });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>💧 DFW HVAC Humidity Management Calculator</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>DFW-specific humidity analysis — find what HVAC changes you need to hit your target comfort level.</p>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 560 }}>
        <label style={{ color: '#F5E642' }}>Current Indoor Humidity: {currentRH}%
          <input type="range" min={20} max={90} value={currentRH} onChange={e => setCurrentRH(+e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, accentColor: '#F5E642' }} />
        </label>
        <label style={{ color: '#F5E642' }}>Target Humidity: {targetRH}%
          <input type="range" min={30} max={60} value={targetRH} onChange={e => setTargetRH(+e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, accentColor: '#F5E642' }} />
        </label>
        <label style={{ color: '#F5E642' }}>DFW Season
          <select value={season} onChange={e => setSeason(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {SEASON_OPTIONS.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>Primary Symptom
          <select value={symptom} onChange={e => setSymptom(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {SYMPTOM_OPTIONS.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>Home Size
          <select value={homeSize} onChange={e => setHomeSize(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {HOME_SIZE.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Generate Humidity Plan</button>
      </div>
      {result && (
        <div style={{ marginTop: '1.5rem', background: '#1e2d45', borderRadius: 10, padding: '1.25rem', maxWidth: 560 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{result.urgency}</div>
          <div style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>Humidity gap: {Math.abs(result.gap)}% {result.gap > 0 ? 'too high' : result.gap < 0 ? 'too low' : '— on target'}</div>
          {result.plan.map((p, i) => <div key={i} style={{ marginBottom: '0.4rem', color: '#e2e8f0' }}>{p}</div>)}
          <div style={{ marginTop: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>💰 {result.cost}</div>
        </div>
      )}
    </div>
  );
}
