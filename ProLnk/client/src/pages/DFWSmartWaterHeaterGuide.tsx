import { useState } from 'react';

const HOUSEHOLD_SIZES = ['1–2 people', '3–4 people', '5–6 people', '7+ people'];
const WH_AGES = ['Under 5 years', '5–10 years', '10–15 years', '15+ years (replace soon)'];

const FEATURES = [
  { icon: '📅', title: 'Smart Scheduling', desc: 'Heat water before morning showers (6am) and evening dishes (7pm). Avoid costly DFW peak hours 3–7pm.' },
  { icon: '✈️', title: 'Vacation Mode', desc: 'One tap drops temp to 50°F when traveling. DFW families save $30–$60 per 2-week trip.' },
  { icon: '💧', title: 'Leak Detection Integration', desc: 'Pair with leak sensors. Auto-shutoff prevents the catastrophic DFW slab flooding that costs $15K+ to remediate.' },
  { icon: '🔔', title: 'Hard Water Alerts', desc: 'DFW water hardness averages 300+ ppm. Smart heaters track sediment buildup and alert when descaling is needed.' },
  { icon: '🌡️', title: 'Remote Temperature Control', desc: 'Boost temp before guests arrive or drop it from your phone. No wasted standby energy in empty DFW homes.' },
  { icon: '📊', title: 'Energy Usage Reports', desc: 'See exactly what your water heater costs monthly — typically $40–$90 for DFW families depending on size.' },
];

type Rec = { type: string; size: string; smartFeature: string; savings: string; dfwNote: string; replace: boolean };

function getRec(household: string, age: string): Rec {
  const replace = age === '15+ years (replace soon)' || age === '10–15 years';
  const large = ['5–6 people', '7+ people'].includes(household);
  const small = household === '1–2 people';

  if (large) {
    return {
      type: replace ? 'Heat Pump Water Heater (80-gal)' : 'Add Smart Controller to Existing',
      size: '80-gallon tank or 2 linked units',
      smartFeature: 'Rheem EcoNet or AO Smith iCOMM',
      savings: '$350–$500/year vs electric tank',
      dfwNote: 'DFW hard water means flush every 6 months. Smart alerts track this automatically.',
      replace,
    };
  }
  if (small) {
    return {
      type: replace ? 'Heat Pump Water Heater (40-gal)' : 'Mysa or Sinopé Smart Controller',
      size: '40-gallon tank',
      smartFeature: 'EcoNet app with peak-hour avoidance',
      savings: '$180–$280/year',
      dfwNote: 'Vacation mode is high-value for DFW couples who travel — saves $25–$40/trip.',
      replace,
    };
  }
  return {
    type: replace ? 'Heat Pump Water Heater (50–65 gal)' : 'Leviton or Rheem Smart Controller',
    size: '50–65 gallon tank',
    smartFeature: 'Schedule + geofencing + leak sensor pairing',
    savings: '$240–$380/year',
    dfwNote: 'Set schedule: heat at 5am, maintain until 9am. Off-peak again until 6pm for DFW families.',
    replace,
  };
}

export default function DFWSmartWaterHeaterGuide() {
  const [household, setHousehold] = useState('');
  const [age, setAge] = useState('');
  const [showRec, setShowRec] = useState(false);

  const ready = household && age;
  const rec = ready ? getRec(household, age) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🚿</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Smart Water Heater Guide</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Vacation mode, hard water alerts, and peak-hour savings for DFW homeowners</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{ background: '#0F2240', borderRadius: 10, padding: '1rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.88rem', marginBottom: '0.3rem' }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>Get Your DFW Water Heater Recommendation</h2>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Household size?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {HOUSEHOLD_SIZES.map(s => (
              <button key={s} onClick={() => setHousehold(s)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: household === s ? '#F5E642' : '#1E3A5F',
                background: household === s ? '#F5E642' : 'transparent',
                color: household === s ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{s}</button>
            ))}
          </div>

          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: '0 0 0.6rem' }}>Current water heater age?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {WH_AGES.map(a => (
              <button key={a} onClick={() => setAge(a)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: age === a ? '#F5E642' : '#1E3A5F',
                background: age === a ? '#F5E642' : 'transparent',
                color: age === a ? '#0A1628' : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{a}</button>
            ))}
          </div>

          <button onClick={() => setShowRec(true)} disabled={!ready} style={{
            background: ready ? '#F5E642' : '#1E3A5F', color: '#0A1628',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem',
            fontWeight: 700, fontSize: '1rem', cursor: ready ? 'pointer' : 'not-allowed',
          }}>Get My Recommendation →</button>
        </div>

        {showRec && rec && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: `4px solid ${rec.replace ? '#F87171' : '#F5E642'}` }}>
            {rec.replace && (
              <div style={{ background: '#F87171', color: '#fff', borderRadius: 6, padding: '0.5rem 1rem', marginBottom: '1rem', fontSize: '0.88rem', fontWeight: 700 }}>
                Replacement Recommended — Your heater is past expected lifespan
              </div>
            )}
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your DFW Water Heater Plan</h3>
            {[
              ['💧 Recommendation', rec.type],
              ['📦 Tank Size', rec.size],
              ['📱 Smart Feature', rec.smartFeature],
              ['💰 Annual Savings', rec.savings],
            ].map(([k, v]) => (
              <div key={String(k)} style={{ display: 'flex', gap: '1rem', marginBottom: '0.65rem' }}>
                <span style={{ minWidth: 170, color: '#94A3B8', fontSize: '0.9rem' }}>{k}</span>
                <span style={{ color: k === '💰 Annual Savings' ? '#34D399' : '#E2E8F0', fontWeight: 600, fontSize: '0.9rem' }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8 }}>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '0.85rem' }}>
                <strong style={{ color: '#F5E642' }}>DFW Note:</strong> {rec.dfwNote}
              </p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', padding: '1rem', background: '#0F2240', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', margin: '0 0 0.75rem' }}>Need a plumber to install your smart water heater in DFW?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>
            🔧 Find a DFW Plumber
          </button>
        </div>
      </div>
    </div>
  );
}
