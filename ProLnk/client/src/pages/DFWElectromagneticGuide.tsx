import { useState } from 'react';

const emfSources = [
  { icon: '⚡', source: 'Power Lines', type: 'ELF (Extremely Low Frequency)', level: 'Varies by distance', note: 'Overhead transmission lines create measurable fields 100–300ft. Distribution lines on streets: much lower.' },
  { icon: '📡', source: 'Smart Meters', type: 'RF (Radio Frequency)', level: 'Brief pulses, ~1000x/day', note: 'Utility smart meters transmit short RF bursts. FCC exposure limits are 1,000x below safety threshold.' },
  { icon: '📶', source: 'WiFi Routers', type: 'RF 2.4GHz / 5GHz', level: 'Low at 6+ feet', note: 'Drops rapidly with distance. At 6 feet from router, exposure is negligible by FCC standards.' },
  { icon: '🔌', source: 'Electrical Wiring', type: 'ELF 60Hz', level: 'Background in all homes', note: 'All home wiring emits ELF fields. Code-compliant wiring is well within international safety limits.' },
  { icon: '📺', source: 'Electronics & Appliances', type: 'ELF + RF mixed', level: 'Low at normal use distance', note: 'Drops with distance. Sleeping near devices is the primary concern worth minimizing.' },
  { icon: '🏠', source: 'Smart Home Devices', type: 'RF Zigbee / Z-Wave / BLE', level: 'Very low power', note: 'Smart home protocols use extremely low power RF. Not a concern at normal distances.' },
];

const measuringOptions = [
  { tool: 'Basic ELF Meter (TF2)', cost: '$30–$80', measures: 'Magnetic fields (ELF)', limitation: 'No RF capability' },
  { tool: 'Tri-Field TF2 Meter', cost: '$170–$200', measures: 'ELF electric + magnetic, RF', limitation: 'Consumer grade, best for screening' },
  { tool: 'Cornet ED88TPlus', cost: '$150–$200', measures: 'RF + ELF magnetic', limitation: 'Accurate RF frequency range limited' },
  { tool: 'Professional Building Biologist', cost: '$300–$600/visit', measures: 'Full spectrum, professional analysis', limitation: 'Varies in scientific approach' },
];

export default function DFWElectromagneticGuide() {
  const [powerLineProx, setPowerLineProx] = useState('');
  const [smartHomeLevel, setSmartHomeLevel] = useState('');
  const [showResults, setShowResults] = useState(false);

  const getAssessment = () => {
    const items: { label: string; level: string; action: string }[] = [];

    if (powerLineProx === 'within100') {
      items.push({ label: 'Transmission Line Proximity', level: '🔴 Elevated ELF', action: 'Consider professional ELF measurement. Fields above 2 milligauss (mG) are a common precautionary threshold. Transmission lines within 100ft can reach 5–20 mG.' });
    } else if (powerLineProx === '100to300') {
      items.push({ label: 'Transmission Line Proximity', level: '🟡 Moderate ELF', action: 'Fields at 100–300ft typically 0.5–3 mG. A $170 Tri-Field meter can verify. Most safety guidelines cite no risk below 2 mG.' });
    } else {
      items.push({ label: 'Power Line ELF', level: '🟢 Normal background', action: 'Distribution lines on streets produce <1 mG at typical home setbacks. No action needed.' });
    }

    if (smartHomeLevel === 'heavy') {
      items.push({ label: 'Smart Home RF', level: '🟡 Elevated RF', action: 'Multiple RF devices increase aggregate RF. Keep high-use devices 6+ feet from sleeping areas. Router placement matters most.' });
    } else {
      items.push({ label: 'Smart Home RF', level: '🟢 Low', action: 'RF exposure from smart home devices is well below FCC safety limits. No action required.' });
    }

    items.push({ label: 'FCC Safety Context', level: '✅ Reference', action: 'FCC, WHO, and ICNIRP all conclude that non-ionizing EMFs from power lines, WiFi, and smart meters do not cause harm at typical residential exposures. Testing is for peace of mind, not documented health risk.' });
    return items;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Health</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.2 }}>📡 EMF & Electromagnetic Field Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>DFW's dense electrical infrastructure and rapid smart home adoption raise EMF questions. Here's what the science actually says and when testing is warranted.</p>
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #F5E642', marginBottom: '2rem', fontSize: '0.9rem' }}>
          <strong style={{ color: '#F5E642' }}>Scientific Consensus:</strong> <span style={{ color: '#e2e8f0' }}>The FCC, WHO, EPA, and major health agencies agree that non-ionizing EMFs at residential exposures do not cause cancer or other documented health effects. This guide covers measurement and mitigation for those who want to take precautionary steps.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {emfSources.map((s, i) => (
            <div key={i} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 2 }}>{s.source}</div>
              <div style={{ color: '#60a5fa', fontSize: '0.8rem', marginBottom: 4 }}>{s.type} — {s.level}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{s.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🔭 Measurement Options</h2>
        <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#0f2340' }}>
                {['Tool', 'Cost', 'Measures', 'Limitation'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measuringOptions.map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{m.tool}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4ade80' }}>{m.cost}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{m.measures}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{m.limitation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f2340', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1.25rem' }}>🏠 Is Testing Warranted for Your Home?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>DISTANCE TO POWER LINES</label>
              <select value={powerLineProx} onChange={e => setPowerLineProx(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='within100'>Within 100 feet (transmission)</option>
                <option value='100to300'>100–300 feet</option>
                <option value='300plus'>300+ feet or street-level lines only</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>SMART HOME LEVEL</label>
              <select value={smartHomeLevel} onChange={e => setSmartHomeLevel(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='minimal'>Minimal (1–3 smart devices)</option>
                <option value='moderate'>Moderate (smart locks, thermostat, hub)</option>
                <option value='heavy'>Heavy (10+ devices, whole-home automation)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
            Assess My EMF Exposure →
          </button>
          {showResults && (
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {getAssessment().map((item, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #1e3a5f' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: '#e2e8f0' }}>{item.label}</span>
                    <span style={{ fontSize: '0.85rem' }}>{item.level}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item.action}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f', color: '#94a3b8', fontSize: '0.875rem' }}>
          💡 DFW property values: Proximity to high-voltage transmission lines has a documented 2–9% negative effect on home values regardless of actual health risk. Worth knowing before buying.
        </div>
      </div>
    </div>
  );
}
