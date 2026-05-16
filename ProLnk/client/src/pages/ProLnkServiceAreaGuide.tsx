import { useState } from 'react';

const homeBases = [
  { city: 'Downtown Dallas', travel: '20 min', rec: 'Set 15-mile radius. Covers Uptown, Oak Cliff, and East Dallas — 40K+ homes, avoid I-35 at rush hour.' },
  { city: 'Plano / Frisco', travel: '25 min', rec: 'Set 20-mile radius. DNT and 380 corridor highly navigable. Avoid 121 westbound 4-6 PM.' },
  { city: 'Fort Worth (West Side)', travel: '20 min', rec: 'Set 18-mile radius. I-30 eastbound and 820 are congestion points — consider limiting to Tarrant County only.' },
  { city: 'Arlington (Central)', travel: '25 min', rec: 'You sit between two major metros. A 20-mile radius covers both with minimal dead zones.' },
  { city: 'McKinney / Allen', travel: '20 min', rec: 'Set 15-mile radius. High-growth zip codes, new construction demand, minimal traffic if staying north of 121.' },
];

const seasonalTips = [
  { icon: '☀️', season: 'Summer', tip: 'HVAC demand peaks. Expand radius by 10-15%. Early AM slots fill fast.' },
  { icon: '🍂', season: 'Fall', tip: 'Roof and gutter season. Shift radius toward older neighborhoods (pre-2000 builds).' },
  { icon: '❄️', season: 'Winter', tip: 'Freeze events spike plumbing and heating calls. Keep radius tight for faster response.' },
  { icon: '🌸', season: 'Spring', tip: 'Landscaping and exterior peak. Broad radius works well — weather is favorable.' },
];

export default function ProLnkServiceAreaGuide() {
  const [base, setBase] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🗺</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Service Area Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Set your area correctly — too small and you miss jobs, too large and you waste drive time.</p>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {['Concentric radius from your home base — simple and accurate for most pros.',
            'Max 30-min commute rule — jobs beyond 30 min cut into your effective hourly rate.',
            'Update your area quarterly — seasonal demand shifts where the work is.',
            'DFW rush hour (7-9 AM, 4-7 PM) can double drive times on I-35, 75, and 121.'].map((fact, i) => (
            <div key={i} style={{ background: '#0F2035', borderRadius: 10, padding: '14px 20px', color: '#B0C4D8', fontSize: 14, lineHeight: 1.6 }}>
              📍 {fact}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏙 DFW Area Recommendations by Home Base</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {homeBases.map(h => (
              <button key={h.city} onClick={() => setBase(h.city)} style={{
                background: base === h.city ? '#F5E642' : '#1A2F4A',
                color: base === h.city ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13
              }}>{h.city}</button>
            ))}
          </div>
          {base && (
            <div style={{ background: '#1A2F4A', borderRadius: 8, padding: 16, color: '#B0C4D8', fontSize: 14, lineHeight: 1.7 }}>
              🚗 Max travel: <strong style={{ color: '#F5E642' }}>{homeBases.find(h => h.city === base)?.travel}</strong> — {homeBases.find(h => h.city === base)?.rec}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🗓 Seasonal Area Adjustments</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {seasonalTips.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.season}</div>
                  <div style={{ color: '#8899AA', fontSize: 13 }}>{s.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}