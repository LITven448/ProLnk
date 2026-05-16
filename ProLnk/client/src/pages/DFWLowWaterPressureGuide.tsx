import { useState } from 'react';

type Issue = { label: string; location: string };

const diagnose = (issue: string, location: string) => {
  if (location === 'whole-home') return { cause: 'Pressure Reducing Valve (PRV) failure or city supply issue', fix: 'Test PRV at main shutoff. Normal DFW city pressure: 50-80 PSI. PRV typically located near main shutoff — adjust clockwise to increase pressure.', urgency: 'medium', diy: '$0-15 (adjustment) or $200-400 (PRV replacement)', plumber: '$250-500' };
  if (location === 'one-room' && issue === 'mineral') return { cause: 'Mineral buildup in aerators and shower heads (DFW hard water)', fix: 'Unscrew aerators and shower heads. Soak in white vinegar 4-8 hours. DFW water leaves calcium scale — do this every 6 months.', urgency: 'low', diy: '$0-5', plumber: 'Not needed' };
  if (location === 'one-fixture') return { cause: 'Clogged aerator or cartridge (DFW calcium deposits)', fix: 'Remove and soak aerator in vinegar overnight. If persistent, replace faucet cartridge — DFW minerals score cartridge seats over time.', urgency: 'low', diy: '$5-30', plumber: '$85-150' };
  return { cause: 'Possible slab leak or supply line issue', fix: 'Turn off all fixtures and watch water meter. If meter moves — you have a leak. DFW clay soil shifts cause slab leaks in 10-20 year homes.', urgency: 'high', diy: 'Call plumber immediately', plumber: '$1,200-4,000' };
};

export default function DFWLowWaterPressureGuide() {
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const result = issue && location ? diagnose(issue, location) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>💧 Low Water Pressure<br /><span style={{ color: '#F5E642' }}>Dallas-Fort Worth Guide</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 15 }}>DFW homeowners face unique pressure issues: PRV failures in aging suburbs, heavy mineral buildup in aerators, and clay-soil-related slab leaks. Normal household pressure is <strong style={{ color: '#F5E642' }}>50-80 PSI</strong> — below 40 PSI causes noticeable problems.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>📊 DFW PRESSURE RANGES</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[['< 40 PSI', 'Problem', '#ef4444'], ['40-50 PSI', 'Borderline', '#f97316'], ['50-80 PSI', 'Normal', '#22c55e']].map(([range, label, color]) => (
              <div key={range} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center', borderTop: `3px solid ${color}` }}>
                <div style={{ color, fontWeight: 700 }}>{range}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 1: Describe the issue</div>
          {[{ id: 'mineral', label: '🧂 Gradual decline over months' }, { id: 'sudden', label: '⚡ Sudden pressure drop' }, { id: 'always', label: '🔄 Always been low' }].map(o => (
            <button key={o.id} onClick={() => setIssue(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: issue === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${issue === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>STEP 2: Where is the problem?</div>
          {[{ id: 'whole-home', label: '🏠 Whole home' }, { id: 'one-room', label: '🚿 One bathroom or kitchen' }, { id: 'one-fixture', label: '🚰 Single faucet or fixture' }].map(o => (
            <button key={o.id} onClick={() => setLocation(o.id)}
              style={{ display: 'block', width: '100%', marginBottom: 8, background: location === o.id ? '#1a3a5c' : '#0A1628', border: `2px solid ${location === o.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, border: `2px solid ${result.urgency === 'high' ? '#ef4444' : result.urgency === 'medium' ? '#f97316' : '#F5E642'}` }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔍 {result.cause}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 16 }}>{result.fix}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>DIY COST</div><div style={{ color: '#22c55e', fontWeight: 700, marginTop: 4 }}>{result.diy}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11 }}>PLUMBER COST</div><div style={{ color: '#f97316', fontWeight: 700, marginTop: 4 }}>{result.plumber}</div></div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginTop: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>⚠️ DFW Slab Leak Warning</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>DFW clay soil expands and contracts seasonally, stressing copper pipes under your foundation. Homes built 1970-2000 in Plano, Richardson, and Garland are especially vulnerable. If pressure drops suddenly in one area — check your meter before calling a plumber.</p>
        </div>
      </div>
    </div>
  );
}
