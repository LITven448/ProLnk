import { useState } from 'react';

const HOME_AGES = ['Pre-1980', '1980–1995', '1996–2005', '2006–2015', '2016+'];
const ELECTRICAL = ['Knob-and-tube / fuse box', '100A breaker panel', '150–200A panel', '200A+ updated panel'];
const GOALS = ['Save energy', 'Improve security', 'Convenience & automation', 'Prepare to sell'];

const PROTOCOLS = [
  { name: 'WiFi', icon: '📶', pros: 'No hub needed, works with any router', cons: 'Congests network, not ideal for 50+ devices', bestFor: '2006+ homes with strong WiFi' },
  { name: 'Zigbee', icon: '🔷', pros: 'Low power, 200+ devices, mesh network', cons: 'Requires hub (SmartThings, Hubitat)', bestFor: '1980–2005 homes without neutral wire concerns' },
  { name: 'Z-Wave', icon: '📡', pros: 'Least interference, long range in walls', cons: 'Fewer products, higher cost', bestFor: 'Older DFW homes with limestone walls — better penetration' },
  { name: 'Matter', icon: '🔗', pros: 'Universal standard, future-proof', cons: 'Newer devices only', bestFor: '2016+ or full retrofits' },
];

type Plan = { switches: string; dimmer: string; outlet: string; thermostat: string; hub: string; caution: string; budget: string };

function getPlan(age: string, electrical: string, goal: string): Plan {
  const old = age === 'Pre-1980';
  const noNeutral = ['Pre-1980', '1980–1995'].includes(age);
  const lowPower = ['Knob-and-tube / fuse box', '100A breaker panel'].includes(electrical);
  const selling = goal === 'Prepare to sell';

  return {
    switches: noNeutral
      ? 'Lutron Caseta (no neutral wire needed) — the DFW go-to for pre-2000 homes'
      : 'Leviton Decora Z-Wave or Kasa EP40 WiFi',
    dimmer: noNeutral
      ? 'Lutron Caseta PD-6WCL dimmer — works without neutral wire in 1980s–90s DFW wiring'
      : 'GE Enbrighten Z-Wave dimmer',
    outlet: 'Kasa EP25 smart plug (no wiring) or Leviton DW15S in-wall outlet',
    thermostat: noNeutral
      ? 'Ecobee (includes PEK adapter for no-neutral-wire installs in DFW homes)'
      : 'Google Nest or Honeywell T6 Pro',
    hub: old
      ? 'SmartThings Hub (Zigbee + Z-Wave) — avoid WiFi congestion in older DFW homes'
      : selling
      ? 'No hub — use Matter-compatible WiFi devices for buyer appeal'
      : 'Optional: Hubitat for local processing, no cloud dependency',
    caution: lowPower
      ? 'WARNING: Fuse boxes and 100A panels may not safely support added smart devices. Get an electrician assessment first.'
      : old
      ? 'Pre-1980 wiring may lack ground wires — smart outlets require grounded circuits. Test before installing.'
      : 'Your panel and wiring should support smart retrofits without issues.',
    budget: selling ? '$300–$800 (high-ROI items only: thermostat, locks, doorbell)' : old ? '$800–$2,500 (plan for some electrical updates)' : '$400–$1,200',
  };
}

export default function DFWSmartHomeRetrofitGuide() {
  const [age, setAge] = useState('');
  const [electrical, setElectrical] = useState('');
  const [goal, setGoal] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const ready = age && electrical && goal;
  const plan = ready ? getPlan(age, electrical, goal) : null;
  const warn = electrical === 'Knob-and-tube / fuse box' || electrical === '100A breaker panel';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Smart Home Retrofit Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Adding smart features to existing DFW homes without rewiring</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {PROTOCOLS.map(p => (
            <div key={p.name} style={{ background: '#0F2240', borderRadius: 10, padding: '1rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '1.3rem' }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem', margin: '0.3rem 0' }}>{p.name}</div>
              <div style={{ color: '#34D399', fontSize: '0.78rem', marginBottom: '0.2rem' }}>+ {p.pros}</div>
              <div style={{ color: '#F87171', fontSize: '0.78rem', marginBottom: '0.3rem' }}>- {p.cons}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>Best for: {p.bestFor}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>Get Your DFW Retrofit Plan</h2>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>When was your DFW home built?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {HOME_AGES.map(a => (
              <button key={a} onClick={() => setAge(a)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: age === a ? '#F5E642' : '#1E3A5F',
                background: age === a ? '#F5E642' : 'transparent',
                color: age === a ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{a}</button>
            ))}
          </div>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Electrical panel type?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {ELECTRICAL.map(e => (
              <button key={e} onClick={() => setElectrical(e)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: electrical === e ? '#F5E642' : '#1E3A5F',
                background: electrical === e ? '#F5E642' : 'transparent',
                color: electrical === e ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{e}</button>
            ))}
          </div>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Primary goal?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {GOALS.map(g => (
              <button key={g} onClick={() => setGoal(g)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: goal === g ? '#F5E642' : '#1E3A5F',
                background: goal === g ? '#F5E642' : 'transparent',
                color: goal === g ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{g}</button>
            ))}
          </div>

          <button onClick={() => setShowPlan(true)} disabled={!ready} style={{
            background: ready ? '#F5E642' : '#1E3A5F', color: '#0A1628',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem',
            fontWeight: 700, fontSize: '1rem', cursor: ready ? 'pointer' : 'not-allowed',
          }}>Get My Retrofit Plan →</button>
        </div>

        {showPlan && plan && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            {warn && (
              <div style={{ background: '#92400E', borderRadius: 6, padding: '0.6rem 1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                ⚠️ {plan.caution}
              </div>
            )}
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your DFW Smart Retrofit Plan</h3>
            {[
              ['💡 Smart Switches', plan.switches],
              ['🔆 Dimmers', plan.dimmer],
              ['🔌 Smart Outlets', plan.outlet],
              ['🌡️ Thermostat', plan.thermostat],
              ['🏠 Smart Hub', plan.hub],
              ['💰 Budget Range', plan.budget],
            ].map(([k, v]) => (
              <div key={String(k)} style={{ marginBottom: '0.8rem' }}>
                <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{k}</div>
                <div style={{ color: k === '💰 Budget Range' ? '#34D399' : '#E2E8F0', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem' }}>{v}</div>
              </div>
            ))}
            {!warn && (
              <div style={{ padding: '0.75rem', background: '#0A1628', borderRadius: 8, marginTop: '0.5rem' }}>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.85rem' }}>{plan.caution}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '1rem', background: '#0F2240', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', margin: '0 0 0.75rem' }}>Need an electrician or smart home installer in DFW?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>
            🔧 Find a DFW Smart Home Pro
          </button>
        </div>
      </div>
    </div>
  );
}
