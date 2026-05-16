import { useState } from 'react';

const locations = ['Garage', 'Interior Closet', 'Attic', 'Utility Room', 'Basement'];
const concerns = ['Energy Efficiency', 'Freeze Protection', 'Noise', 'Space Savings', 'Code Compliance'];

export default function DFWWaterHeaterLocationGuide() {
  const [location, setLocation] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | { assessment: string; alternatives: string; action: string }>(null);

  function calculate() {
    if (!location || !concern) return;
    const assessments: Record<string, string> = {
      Garage: '✅ Most common in DFW — protected from weather, easy access, ideal for larger units and HPWHs',
      'Interior Closet': '✅ Popular in DFW townhomes — no freeze risk, quieter, but limits unit size to ~50 gal',
      Attic: '⚠️ Found in older DFW homes — extreme summer heat (140°F+) stresses tank; leak risk to ceiling',
      'Utility Room': '✅ Solid choice — centrally located reduces hot water wait time in large DFW homes',
      Basement: '🚫 Extremely rare in DFW — North Texas soil and climate make basements uncommon',
    };
    const alternatives: Record<string, string> = {
      Garage: concern === 'Freeze Protection' ? '🧊 Insulate pipes and add a freeze alarm — DFW freezes are rare but real (Feb 2021)' : '🔄 Ideal as-is for most DFW homes',
      'Interior Closet': '🔄 Consider power vent unit to allow horizontal venting through wall',
      Attic: '⚠️ Consider moving to garage — DFW attic temps shorten tank life by 3–5 years',
      'Utility Room': '🔄 Great location — ensure proper venting for gas units',
      Basement: '🔄 No basements in DFW — consider garage or utility room instead',
    };
    const actions: Record<string, string> = {
      'Energy Efficiency': '💡 Garage or utility room + heat pump water heater = maximum efficiency in DFW',
      'Freeze Protection': '🧊 Garage with pipe insulation covers 99% of DFW winter scenarios',
      Noise: '🔇 Interior closet minimizes noise transmission; insulated door helps',
      'Space Savings': '📐 Tankless unit in any closet or utility room frees up floor space',
      'Code Compliance': '📋 DFW requires seismic straps, drip pans, and pressure relief valve regardless of location',
    };
    setResult({
      assessment: assessments[location] || '',
      alternatives: alternatives[location] || '',
      action: actions[concern] || '',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>📍 DFW WATER HEATER GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Water Heater Location Guide for DFW</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Where DFW homes put water heaters — and what it means for efficiency, lifespan, and safety.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', pct: '68%', label: 'Garage', sub: 'most common in DFW' },
            { icon: '🚪', pct: '22%', label: 'Closet/Utility', sub: 'especially townhomes' },
            { icon: '🏗️', pct: '10%', label: 'Attic', sub: 'older DFW homes' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0D1F3C', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.5rem' }}>{c.pct}</div>
              <div style={{ fontWeight: 600 }}>{c.label}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>DFW Climate Considerations by Location</h2>
          {[
            '🌡️ Garage: Summer temps 95–105°F outside but unit stays cooler indoors; Feb freeze risk to exposed pipes',
            '🚪 Closet: Conditioned space = no freeze risk, consistent temps, ideal for electric units',
            '🔥 Attic: DFW attic temps hit 140°F+ in summer — dramatically reduces electric element life',
            '💧 All locations: DFW hard water (17+ grains/gallon) requires annual flushing regardless of placement',
          ].map(item => (
            <div key={item} style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Location Assessment Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Current Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>DFW Climate Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {concerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Assess My Location →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your Location Assessment</h3>
            <div style={{ color: '#ccc', marginBottom: '0.6rem' }}>{result.assessment}</div>
            <div style={{ color: '#ccc', marginBottom: '0.6rem' }}>{result.alternatives}</div>
            <div style={{ color: '#ccc', marginBottom: '1rem' }}>{result.action}</div>
            <div style={{ padding: '0.75rem', background: '#0A1628', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem', textAlign: 'center' }}>
              Get a free quote from a licensed DFW plumber on ProLnk.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
