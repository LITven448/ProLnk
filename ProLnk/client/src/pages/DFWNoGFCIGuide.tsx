import { useState } from 'react';

const procedures: Record<string, { reset: string; replace: boolean; cost: string }> = {
  wont_reset: { reset: 'Press TEST then RESET firmly. If no click, outlet is failed — replacement needed.', replace: true, cost: '$15–$40 DIY / $75–$150 electrician' },
  trips_fast: { reset: 'Unplug all devices. Press RESET. If trips again immediately, wiring fault — call electrician.', replace: false, cost: 'Electrician: $150–$300 diagnostic' },
  no_power: { reset: 'Find the upstream GFCI (often in garage or bathroom) and reset it first.', replace: false, cost: 'Often free — just reset the right outlet' },
  buzzing: { reset: 'Turn off circuit. Replace GFCI — buzzing indicates internal failure.', replace: true, cost: '$20–$50 DIY / $100–$200 electrician' },
};

export default function DFWNoGFCIGuide() {
  const [issue, setIssue] = useState('');
  const [loc, setLoc] = useState('');
  const [result, setResult] = useState<null | { reset: string; replace: boolean; cost: string }>(null);

  function assess() {
    if (!issue || !loc) return;
    setResult(procedures[issue] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🔌 DFW GFCI Outlet Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's humidity, summer storms, and aging homes make GFCI failures common. Know when to reset and when to replace.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>💧 Why GFCIs Fail in DFW</div>
          {[
            ['🌧️ Moisture & Humidity', 'DFW outdoor outlets see 60–80% humidity in summer. Moisture seeps into receptacles over time.'],
            ['⏳ Age', 'GFCIs have a 10–15 year lifespan. Many DFW homes have originals from the 1990s still installed.'],
            ['⚡ Overloads', 'Plugging high-draw equipment into GFCI circuits causes repeated tripping and internal wear.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🗺️ DFW High-Risk Locations</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {['Outdoor patios (DFW rain exposure)', 'Pool & spa areas', 'Garage outlets', 'Kitchen countertops', 'Bathrooms', 'Laundry rooms'].map(l => (
              <div key={l} style={{ background: '#1e3a5f', borderRadius: 8, padding: '0.5rem 0.75rem', color: '#cbd5e1', fontSize: '0.85rem' }}>📍 {l}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔍 Find Hidden GFCI Outlets</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            One GFCI can protect multiple downstream outlets. Check: <strong style={{ color: '#cbd5e1' }}>garage, master bath, outdoor, kitchen</strong> — these are common upstream sources. Press TEST on each to find the chain.
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Reset vs Replace Tool</div>
          {[
            { label: 'Issue', value: issue, setter: setIssue, options: [['wont_reset', "Won't reset at all"], ['trips_fast', 'Resets then immediately trips'], ['no_power', 'No power, no trip light'], ['buzzing', 'Buzzing or humming']] },
            { label: 'Location', value: loc, setter: setLoc, options: [['outdoor', 'Outdoor / patio'], ['bathroom', 'Bathroom'], ['kitchen', 'Kitchen'], ['garage', 'Garage'], ['other', 'Other']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <select value={value} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 8, background: '#1e3a5f', color: '#fff', border: '1px solid #334155' }}>
                <option value="">Select...</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>Get My Answer</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: result.replace ? '#1a1a00' : '#001a0f', borderLeft: `4px solid ${result.replace ? '#F5E642' : '#4ade80'}` }}>
              <div style={{ fontWeight: 700, color: result.replace ? '#F5E642' : '#4ade80' }}>{result.replace ? '🔧 Replacement Needed' : '🔄 Try Reset First'}</div>
              <div style={{ color: '#cbd5e1', margin: '0.5rem 0' }}>{result.reset}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💰 Typical cost: {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📅 DFW Tip: Test Quarterly</div>
          <div style={{ color: '#94a3b8' }}>Press the TEST button on every GFCI outlet every 3 months. If the RESET button doesn't pop out, the outlet has failed silently and needs immediate replacement.</div>
        </div>
      </div>
    </div>
  );
}
