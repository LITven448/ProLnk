import { useState } from 'react';

const soilFacts = [
  { icon: '🧱', title: 'DFW Clay Composition', desc: 'North Texas is dominated by expansive Blackland Prairie clay (Vertisols). Extreme shrink-swell causes foundation movement and drainage issues.' },
  { icon: '⚗️', title: 'Alkaline pH', desc: 'DFW soils typically run pH 7.5–8.5. Most plants prefer 6.0–7.0. Without amendment, nutrient lockout is common.' },
  { icon: '☠️', title: 'Heavy Metals Near Older Structures', desc: 'Homes built pre-1978 may have lead paint chips in soil perimeter. Industrial lots may have elevated arsenic, cadmium.' },
  { icon: '🌱', title: 'Nutrient Deficiencies', desc: 'High pH locks out iron, manganese, zinc. DFW gardens frequently show yellowing (chlorosis) without soil amendments.' },
  { icon: '💧', title: 'Drainage Issues', desc: 'Clay soils drain poorly. Compaction from construction is common in new DFW neighborhoods. Affects plant survival and foundation health.' },
];

const labs = [
  { name: 'Texas A&M AgriLife (Dallas Lab)', cost: '$12–$25', turnaround: '2–3 weeks', tests: 'pH, nutrients, organic matter, lime recommendation', bestFor: 'Gardens, lawn, landscape' },
  { name: 'Texas Plant & Soil Lab (Edinburg)', cost: '$20–$60', turnaround: '5–10 days', tests: 'Full nutrient panel + heavy metals optional', bestFor: 'Comprehensive analysis' },
  { name: 'Ward Laboratories (Mail-in)', cost: '$25–$80', turnaround: '5–7 days', tests: 'pH, macros, micros, organic matter', bestFor: 'Fast results, nationally recognized' },
  { name: 'Private Certified Lab', cost: '$150–$400', turnaround: '5–14 days', tests: 'Full panel including heavy metals, TCLP', bestFor: 'Pre-purchase, legal, children play areas' },
];

const useCases = [
  { id: 'garden', label: '🥕 Vegetable Garden' },
  { id: 'lawn', label: '🌿 Lawn / Grass' },
  { id: 'play', label: '🧒 Children\’s Play Area' },
  { id: 'landscape', label: '🌳 Trees & Landscape' },
  { id: 'foundation', label: '🏠 Foundation Concern' },
];

export default function DFWSoilTestingGuide() {
  const [intendedUse, setIntendedUse] = useState<string[]>([]);
  const [lotHistory, setLotHistory] = useState('');
  const [showResults, setShowResults] = useState(false);

  const toggleUse = (id: string) => {
    setIntendedUse(prev => prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]);
  };

  const getRecommendation = () => {
    const recs: string[] = [];
    if (intendedUse.includes('play')) recs.push('🔴 URGENT: Heavy metals panel required for children\’s play areas. Lead, arsenic, cadmium testing mandatory.');
    if (intendedUse.includes('garden')) recs.push('🟡 Full nutrient panel + pH. Texas A&M AgriLife lab is the most cost-effective option at $12–$25.');
    if (intendedUse.includes('foundation')) recs.push('🟡 Expansive clay index test helps predict foundation movement risk. Consider geotechnical engineer.');
    if (lotHistory === 'industrial') recs.push('🔴 Certified heavy metals panel required. Prior industrial use is a significant contamination risk.');
    if (lotHistory === 'demolition') recs.push('🟡 Lead paint chip contamination possible in soil perimeter. Heavy metals screening recommended.');
    if (recs.length === 0) recs.push('🟢 Standard AgriLife soil panel covers your needs. Expect pH 7.5–8.5 and amendment recommendations for DFW clay.');
    recs.push('Amendment tip: DFW clay responds well to expanded shale, compost, and sulfur to lower pH.');
    return recs;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Health</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.2 }}>🌍 Soil Testing Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>DFW's expansive Blackland Prairie clay is unlike most US soils. Know what you're working with before landscaping, gardening, or assessing foundation risk.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {soilFacts.map((f, i) => (
            <div key={i} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🔬 Texas Soil Testing Labs</h2>
        <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#0f2340' }}>
                {['Lab', 'Cost', 'Turnaround', 'Tests', 'Best For'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labs.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{l.name}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4ade80' }}>{l.cost}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{l.turnaround}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{l.tests}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{l.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f2340', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1.25rem' }}>🏡 Get Your Soil Test Recommendation</h2>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 8 }}>INTENDED USE (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {useCases.map(u => (
                <button key={u.id} onClick={() => toggleUse(u.id)} style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: '1px solid', borderColor: intendedUse.includes(u.id) ? '#F5E642' : '#1e3a5f', background: intendedUse.includes(u.id) ? '#F5E642' : 'transparent', color: intendedUse.includes(u.id) ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  {u.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>LOT HISTORY</label>
            <select value={lotHistory} onChange={e => setLotHistory(e.target.value)} style={{ width: 260, background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select...</option>
              <option value='residential'>Always residential</option>
              <option value='demolition'>Previous structure demolished</option>
              <option value='industrial'>Former commercial/industrial</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
            Get Recommendation →
          </button>
          {showResults && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Your Soil Testing Plan:</div>
              {getRecommendation().map((r, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: 6, fontSize: '0.95rem' }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f', color: '#94a3b8', fontSize: '0.875rem' }}>
          💡 Texas A&M AgriLife Extension County Offices in Dallas, Tarrant, Denton, and Collin counties offer free soil testing consultations and subsidized lab fees.
        </div>
      </div>
    </div>
  );
}
