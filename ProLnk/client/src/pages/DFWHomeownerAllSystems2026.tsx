import { useState } from 'react';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const systems = [
  { icon: '❄️', name: 'HVAC', checks: ['Replace air filter (1/3/6-month depending on type)', 'Verify thermostat setpoints are seasonal', 'Clear debris from outdoor condenser unit'] },
  { icon: '🏗️', name: 'Foundation', checks: ['Check interior doors for sticking — early shift indicator', 'Check soil moisture level around perimeter', 'Run sprinklers to maintain consistent moisture in clay soil'] },
  { icon: '🏠', name: 'Roof', checks: ['Clear gutters of debris — prevents fascia rot', 'After any storm: request ProLnk drone assessment', 'Check attic for daylight or moisture staining'] },
  { icon: '💧', name: 'Plumbing', checks: ['Check water heater anode rod (annual)', 'Inspect supply lines under sinks for moisture', 'Test pressure relief valve on water heater'] },
  { icon: '⚡', name: 'Electrical', checks: ['Test all GFCI outlets — press test, then reset', 'Test smoke detectors — replace batteries if >1 year', 'Verify panel has no tripped breakers or burn marks'] },
];

const homeTypes = ['Single Family', 'Townhome', 'Older 1970s-1990s', 'New Build'];

export default function DFWHomeownerAllSystems2026() {
  const [month, setMonth] = useState<string | null>(null);
  const [homeType, setHomeType] = useState<string | null>(null);

  const ready = month && homeType;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>🔍</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0 0 .5rem' }}>DFW Homeowner: All Systems Check 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Monthly all-systems check for DFW homes — HVAC, Foundation, Roof, Plumbing, Electrical. ProLnk Vault records everything.</p>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '.75rem' }}>Select your month</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1.5rem' }}>
          {months.map(m => (
            <button key={m} onClick={() => setMonth(m)}
              style={{ background: month === m ? '#F5E642′ : '#1e3a5f', color: month === m ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '.4rem .85rem', cursor: 'pointer', fontWeight: 600, fontSize: '.85rem' }}>
              {m}
            </button>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '.75rem' }}>Your home type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2rem' }}>
          {homeTypes.map(h => (
            <button key={h} onClick={() => setHomeType(h)}
              style={{ background: homeType === h ? '#F5E642′ : '#1e3a5f', color: homeType === h ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '.4rem .85rem', cursor: 'pointer', fontWeight: 600, fontSize: '.85rem' }}>
              {h}
            </button>
          ))}
        </div>

        {ready && (
          <div>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>{month} All-Systems Check — {homeType}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {systems.map(s => (
                <div key={s.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ fontSize: '1.4rem' }}>{s.icon} <strong>{s.name}</strong></div>
                  <ul style={{ margin: '.5rem 0 0 1rem', color: '#94a3b8', fontSize: '.9rem', lineHeight: 1.7 }}>
                    {s.checks.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', background: '#F5E64220', borderRadius: 10, padding: '1rem', color: '#F5E642′ }}>
              🏠 ProLnk Vault records every check you log — building your permanent home health record automatically.
            </div>
          </div>
        )}

        {!ready && (
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.5rem', textAlign: 'center', color: '#94a3b8′ }}>
            Select a month and home type to get your personalized all-systems check guide.
          </div>
        )}
      </div>
    </div>
  );
}