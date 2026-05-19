import { useState } from 'react';

const MERV_OPTIONS = ['MERV 4 (Basic)', 'MERV 8 (Standard)', 'MERV 11 (Good)', 'MERV 13 (Better)', 'MERV 16 (Best)'];
const VENT_OPTIONS = ['None', 'Basic Exhaust', 'ERV/HRV', 'Fresh Air Intake'];
const SEASON_OPTIONS = ['Spring (High Pollen)', 'Summer (Heat/Ozone)', 'Fall (Mold)', 'Winter (Dry Air)'];
const CONCERN_OPTIONS = ['Allergies', 'Asthma', 'General Health', 'Odor Control', 'Pet Dander'];

export default function DFWHVACAirQualityCalc() {
  const [merv, setMerv] = useState(1);
  const [vent, setVent] = useState(0);
  const [humidity, setHumidity] = useState(false);
  const [uv, setUv] = useState(false);
  const [season, setSeason] = useState(0);
  const [concern, setConcern] = useState(0);
  const [result, setResult] = useState<null | { score: number; grade: string; tips: string[]; cost: string }>(null);

  function calculate() {
    let score = 0;
    score += [10, 25, 40, 55, 70][merv];
    score += [0, 5, 15, 10][vent];
    if (humidity) score += 10;
    if (uv) score += 10;
    const seasonPenalty = [15, 10, 12, 5][season];
    score = Math.max(0, Math.min(100, score - seasonPenalty + 5));
    const grade = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor';
    const tips: string[] = [];
    const costParts: string[] = [];
    if (merv < 3) { tips.push('🔧 Upgrade to MERV 13 filter — traps DFW pollen & allergens'); costParts.push('Filter upgrade: $20–$60/yr'); }
    if (vent < 2) { tips.push('🌬️ Install ERV/HRV for fresh air without losing efficiency'); costParts.push('ERV install: $1,500–$3,000'); }
    if (!humidity) { tips.push('💧 Add whole-home dehumidifier — DFW summers hit 80%+ humidity'); costParts.push('Dehumidifier: $1,200–$2,500'); }
    if (!uv) { tips.push('☀️ UV purification kills mold spores common in DFW ductwork'); costParts.push('UV system: $400–$800'); }
    if (tips.length === 0) tips.push('✅ Your DFW home air quality setup is top tier — maintain annually');
    setResult({ score, grade, tips, cost: costParts.join(' | ') || 'No upgrades needed' });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🌬️ DFW HVAC Air Quality Calculator</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Calculate your DFW home's indoor air quality score and get improvement recommendations.</p>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 560 }}>
        <label style={{ color: '#F5E642' }}>Current Filter Rating
          <select value={merv} onChange={e => setMerv(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {MERV_OPTIONS.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>Ventilation Type
          <select value={vent} onChange={e => setVent(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {VENT_OPTIONS.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>DFW Season
          <select value={season} onChange={e => setSeason(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {SEASON_OPTIONS.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <label style={{ color: '#F5E642' }}>Primary Health Concern
          <select value={concern} onChange={e => setConcern(+e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1e2d45', color: '#fff', border: '1px solid #2d4a6e', borderRadius: 6, padding: '0.5rem' }}>
            {CONCERN_OPTIONS.map((o, i) => <option key={i} value={i}>{o}</option>)}
          </select>
        </label>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <label style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={humidity} onChange={e => setHumidity(e.target.checked)} /> 💧 Humidity Control
          </label>
          <label style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={uv} onChange={e => setUv(e.target.checked)} /> ☀️ UV Purification
          </label>
        </div>
        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Calculate Air Quality Score</button>
      </div>
      {result && (
        <div style={{ marginTop: '1.5rem', background: '#1e2d45', borderRadius: 10, padding: '1.25rem', maxWidth: 560 }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F5E642' }}>{result.score}<span style={{ fontSize: '1rem', color: '#94a3b8' }}>/100</span></div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>{result.grade} Air Quality</div>
          {result.tips.map((t, i) => <div key={i} style={{ marginBottom: '0.4rem', color: '#e2e8f0' }}>{t}</div>)}
          {result.cost !== 'No upgrades needed' && <div style={{ marginTop: '0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>💰 Estimated investment: {result.cost}</div>}
        </div>
      )}
    </div>
  );
}
