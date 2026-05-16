import { useState } from 'react';

const thermostats = [
  { name: 'Nest Learning', brand: 'Google', price: '$249', monthly: null, cWire: 'Recommended', pros: 'Auto-learns schedule, integrates with Google Home, sleek design', cons: 'Requires C-wire on many DFW systems, no humidity control', rebate: true },
  { name: 'Ecobee SmartThermostat', brand: 'Ecobee', price: '$219', monthly: null, cWire: 'Included adapter', pros: 'Comes with C-wire adapter, room sensors included, Alexa built-in, best humidity control', cons: 'Larger display footprint, slightly complex setup', rebate: true },
  { name: 'Honeywell T6 Pro', brand: 'Honeywell', price: '$89', monthly: null, cWire: 'Not required', pros: 'No C-wire needed, simple reliable, HVAC contractor favorite', cons: 'No smart features, no app control, basic only', rebate: false },
  { name: 'Sensi Touch', brand: 'Emerson', price: '$129', monthly: null, cWire: 'Not required', pros: 'No C-wire needed, app-controlled, Oncor rebate eligible, easy install', cons: 'Less automation than Nest/Ecobee, simpler learning', rebate: true },
];

const thermostatAges = ['Less than 5 years', '5–10 years', '11–15 years', '16+ years'];
const hvacAges = ['Less than 5 years', '5–10 years', '11–15 years', '16+ years (needs evaluation)'];

function getCompatibility(tAge: string, hAge: string) {
  const oldThermostat = tAge === '16+ years';
  const oldHvac = hAge === '16+ years (needs evaluation)';
  const medOld = hAge === '11–15 years';

  const issues: string[] = [];
  let savings = '15–20%';

  if (oldThermostat) {
    issues.push('Your thermostat is very old — likely 2-wire only. C-wire adapter or new wiring may be required.');
    issues.push('Ecobee or Sensi recommended due to built-in C-wire adapter.');
  }
  if (oldHvac) {
    issues.push('HVAC system 16+ years old: smart thermostat may show compatibility, but HVAC replacement may be more cost-effective.');
    issues.push('Have HVAC tech inspect system before upgrading thermostat.');
    savings = '10–15% (HVAC efficiency limits gains)';
  }
  if (medOld) {
    issues.push('11–15 year HVAC: compatible with all smart thermostats. Consider R-22 refrigerant status if AC unit.');
  }

  return {
    compatible: !oldHvac,
    savings,
    annualSavings: oldHvac ? '$90–$130' : '$150–$280',
    issues: issues.length ? issues : ['Your system should be compatible with any smart thermostat listed below.'],
    recommendation: oldThermostat ? 'Ecobee (C-wire adapter included)' : 'Nest or Ecobee (best automation for DFW heat)',
  };
}

export default function DFWSmartThermostatGuide() {
  const [tAge, setTAge] = useState('');
  const [hAge, setHAge] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getCompatibility> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌡️</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Smart Thermostat Guide
          </h1>
        </div>
        <p style={{ color: '#8A9AB5', fontSize: 16, marginBottom: 12 }}>
          DFW runs AC 10+ months a year. A smart thermostat isn't optional — it's essential.
        </p>
        <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
          <span style={{ background: '#1B2E1B', color: '#4ECDC4', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            💰 Oncor Rebate: $85
          </span>
          <span style={{ background: '#1B2E1B', color: '#4ECDC4', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            📉 15–20% energy savings
          </span>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>☀️ Why DFW Is Different</h2>
          <p style={{ color: '#8A9AB5', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Dallas-Fort Worth averages 240+ days per year above 80°F, with summer highs regularly exceeding 105°F. 
            Unlike most of the US, DFW homeowners run cooling systems from March through October — and often beyond. 
            This makes smart scheduling and remote control especially valuable. A thermostat that auto-adjusts when 
            you leave can save $150–$280/year in DFW, versus $60–$100 in cooler climates.
          </p>
        </div>

        <h2 style={{ color: '#E8EDF5', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Thermostat Comparison</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {thermostats.map(t => (
            <div key={t.name} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E2D4A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#E8EDF5', fontSize: 16 }}>{t.name}</div>
                  <div style={{ color: '#8A9AB5', fontSize: 12 }}>{t.brand}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{t.price}</div>
                  {t.rebate && <div style={{ color: '#4ECDC4', fontSize: 11, fontWeight: 600 }}>Oncor eligible</div>}
                </div>
              </div>
              <div style={{ fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: '#8A9AB5' }}>C-Wire: </span>
                <span style={{ color: t.cWire === 'Not required' ? '#4ECDC4' : '#FFB347', fontWeight: 600 }}>{t.cWire}</span>
              </div>
              <div style={{ color: '#4ECDC4', fontSize: 12, marginBottom: 4 }}>✓ {t.pros}</div>
              <div style={{ color: '#FF6B6B', fontSize: 12 }}>✗ {t.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>⚠️ The C-Wire Problem</h2>
          <p style={{ color: '#8A9AB5', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>
            Older DFW homes (pre-2000) often have 2-wire thermostat wiring — not enough for modern smart thermostats 
            that need continuous power. The C-wire (common wire) provides that power. Without it:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Option 1', detail: 'Use Ecobee or Sensi — both include C-wire adapters in box' },
              { label: 'Option 2', detail: 'Have electrician run new C-wire — typically $75–$200' },
              { label: 'Option 3', detail: 'Install "add-a-wire" kit — $30 DIY or $75 installed' },
              { label: 'Check First', detail: 'Open thermostat cover — often there IS a C-wire, just disconnected' },
            ].map(o => (
              <div key={o.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, border: '1px solid #1E2D4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{o.label}</div>
                <div style={{ color: '#8A9AB5', fontSize: 13 }}>{o.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🧮 Compatibility Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Thermostat Age</label>
              <select value={tAge} onChange={e => setTAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select age</option>
                {thermostatAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>HVAC System Age</label>
              <select value={hAge} onChange={e => setHAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select age</option>
                {hvacAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => { if (tAge && hAge) setResult(getCompatibility(tAge, hAge)); }}
            disabled={!tAge || !hAge}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: !tAge || !hAge ? 0.5 : 1 }}>
            Check Compatibility & Savings →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E2D4A' }}>
              <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Est. Annual Savings</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{result.annualSavings}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Energy Reduction</div>
                  <div style={{ color: '#4ECDC4', fontWeight: 800, fontSize: 22 }}>{result.savings}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Top Recommendation</div>
                  <div style={{ color: '#E8EDF5', fontWeight: 700, fontSize: 14 }}>{result.recommendation}</div>
                </div>
              </div>
              {result.issues.map((issue, i) => (
                <div key={i} style={{ color: '#8A9AB5', fontSize: 13, padding: '6px 0', borderTop: i > 0 ? '1px solid #1E2D4A' : 'none' }}>
                  {result.compatible ? '✓' : '⚠️'} {issue}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#8A9AB5', fontSize: 13 }}>Get quotes from licensed DFW HVAC pros on ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
