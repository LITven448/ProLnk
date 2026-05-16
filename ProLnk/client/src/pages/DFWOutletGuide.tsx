import { useState } from 'react';

type OutletType = { type: string; permit: boolean; diy: boolean; cost: string; note: string };

const outletMap: Record<string, OutletType> = {
  kitchen_counter: { type: 'GFCI Required', permit: true, diy: false, cost: '$150–$300 electrician', note: 'DFW code requires GFCI on all kitchen countertop outlets within 6 ft of sink.' },
  bathroom: { type: 'GFCI Required', permit: true, diy: false, cost: '$100–$200 electrician', note: 'All bathroom outlets must be GFCI per DFW city codes.' },
  outdoor: { type: 'GFCI + Weatherproof Cover', permit: true, diy: false, cost: '$200–$400 electrician', note: 'Outdoor outlets need in-use weatherproof covers for DFW rain compliance.' },
  bedroom: { type: 'Standard or AFCI', permit: true, diy: true, cost: '$80–$150 electrician / $20 DIY', note: 'New bedroom circuits require AFCI breakers per NEC 2020 (adopted in most DFW cities).' },
  garage: { type: 'GFCI Required', permit: true, diy: false, cost: '$150–$250 electrician', note: 'Garage outlets within 6 ft of garage door or sink require GFCI.' },
  usb: { type: 'USB Outlet (no permit if replacing)', permit: false, diy: true, cost: '$25–$50 DIY', note: 'Direct swap of existing outlet — no permit needed. Adds USB-A + USB-C charging.' },
};

export default function DFWOutletGuide() {
  const [need, setNeed] = useState('');
  const [loc, setLoc] = useState('');
  const [result, setResult] = useState<null | OutletType>(null);

  function assess() {
    if (!need || !loc) return;
    const key = need === 'usb' ? 'usb' : loc;
    setResult(outletMap[key] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🔌 DFW Outlet Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Not all outlets are equal — and DFW city codes specify exactly which type you need, where. Get it wrong and you'll fail inspection.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 Outlet Types Explained</div>
          {[
            ['🔌 Standard', 'For most rooms — bedroom, living room, hallways.'],
            ['💧 GFCI', 'Required near water: kitchen, bath, outdoor, garage. Shuts off instantly if current leaks.'],
            ['🔥 AFCI', 'Arc-fault protection for bedrooms. Required in newer DFW construction.'],
            ['⚡ Combination AFCI/GFCI', 'Required in bathrooms of newer DFW homes — does both.'],
            ['🔋 USB Outlet', 'Drop-in replacement for standard outlet — adds USB-A and USB-C ports. No permit needed.'],
            ['📱 Smart Outlet', 'WiFi-controlled on/off. No permit needed if replacing existing outlet.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Outlet Requirement Tool</div>
          {[
            { label: 'What Do You Need?', value: need, setter: setNeed, options: [['add', 'Add a new outlet'], ['replace', 'Replace existing outlet'], ['usb', 'Upgrade to USB outlet'], ['code', 'Fix a code violation']] },
            { label: 'Location', value: loc, setter: setLoc, options: [['kitchen_counter', 'Kitchen countertop'], ['bathroom', 'Bathroom'], ['outdoor', 'Outdoor'], ['bedroom', 'Bedroom'], ['garage', 'Garage']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <select value={value} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155' }}>
                <option value="">Select...</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>Check Requirements</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: '#001a2e', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>Required: {result.type}</div>
              <div style={{ display: 'flex', gap: '1rem', margin: '0.5rem 0', flexWrap: 'wrap' }}>
                <span style={{ color: result.permit ? '#f87171' : '#4ade80' }}>{result.permit ? '📋 Permit Required' : '✅ No Permit Needed'}</span>
                <span style={{ color: result.diy ? '#4ade80' : '#f87171' }}>{result.diy ? '🔧 DIY Possible' : '👷 Electrician Recommended'}</span>
              </div>
              <div style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>💰 {result.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🏘️ DFW Permit Note</div>
          <div style={{ color: '#94a3b8' }}>Adding any new circuit or outlet in DFW (Dallas, Fort Worth, Plano, Frisco, McKinney) requires a permit and inspection. Replacing an existing outlet in-place typically does not. When in doubt, call your city's building department.</div>
        </div>
      </div>
    </div>
  );
}
