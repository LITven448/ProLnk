import { useState } from 'react';

const situationOptions = ['High electric bills in summer', 'Fan runs constantly — always on', 'Humidity problems indoors', 'Replacing whole system', 'Motor just failed', 'Upgrading for efficiency'];
const homeSize = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–3,500 sqft', '3,500+ sqft'];

const getMotorRec = (situation: string, size: string) => {
  if (!situation || !size) return null;
  const sqft = size.includes('Under') ? 1200 : size.includes('1,500') ? 2000 : size.includes('2,500') ? 3000 : 4000;
  const pscWatts = sqft * 0.18;
  const ecmWatts = pscWatts * 0.25;
  const annualSavings = Math.round(((pscWatts - ecmWatts) / 1000) * 8760 * 0.12);

  if (situation.includes('Motor just failed')) return {
    type: 'ECM Motor (mandatory upgrade)',
    saving: `$${annualSavings}/year`,
    reason: 'If your motor failed on a system over 10 years old, replacing with ECM now avoids replacing it again in 5 years. ECMs last 15-20 years vs PSC\’s 10-12.',
    dfwNote: 'DFW fans run 7-8 months continuously. PSC motors overheat and fail faster in sustained DFW heat.',
    cost: '$400–$800 motor swap | $150–$350 extra for ECM vs PSC'
  };
  if (situation.includes('Humidity')) return {
    type: 'ECM Motor — essential for humidity control',
    saving: `$${annualSavings}/year + humidity benefit`,
    reason: 'ECM allows variable airflow. Lower airflow across coil = longer contact time = more moisture removed. PSC is all-or-nothing. In DFW, this is the difference between 65% RH and 50% RH.',
    dfwNote: 'DFW summers average 70%+ outdoor humidity. You need every advantage inside.',
    cost: '$150–$350 premium over PSC replacement'
  };
  if (situation.includes('constant') || situation.includes('always on')) return {
    type: 'ECM Motor — designed for continuous operation',
    saving: `$${annualSavings}/year`,
    reason: 'If you run fan continuously for air quality, ECM uses only 50-80W vs PSC\’s 300-500W. For DFW homes running fan 24/7, ECM pays back in under 2 years.',
    dfwNote: 'Running PSC fan continuously in DFW costs $250–$400/year in electricity alone.',
    cost: '$150–$350 premium | Payback: 18–30 months'
  };
  return {
    type: 'ECM Motor — the clear DFW choice',
    saving: `$${annualSavings}/year`,
    reason: 'DFW\’s 7-month cooling season makes ECM\’s energy advantage more valuable than almost any other US market. PSC motors also struggle with sustained heat — ECMs run cooler and last longer.',
    dfwNote: 'ECM efficiency advantage is greatest when run continuously — exactly how DFW operates.',
    cost: '$150–$350 premium over PSC | Payback: 2–4 years'
  };
};

export default function DFWHVACFanMotorFinal() {
  const [situation, setSituation] = useState('');
  const [size, setSize] = useState('');
  const rec = getMotorRec(situation, size);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>PSC vs ECM Fan Motors: The DFW Decision Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW's 7-month cooling season is where ECM motors shine. Understand the real cost difference before your next motor decision.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔌 PSC vs ECM: What DFW Numbers Actually Mean</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚡ PSC Motor (Old Tech)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#94a3b8', fontSize: 14 }}>
                <div>Energy use: 300-500W at single speed</div>
                <div>DFW annual cost: $250–$450/year</div>
                <div>Humidity control: poor (fixed airflow)</div>
                <div>Lifespan: 10-12 years (shorter in DFW heat)</div>
                <div>Cost to replace: $200–$400</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>⚡ ECM Motor (Modern)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#94a3b8', fontSize: 14 }}>
                <div>Energy use: 50-150W variable</div>
                <div>DFW annual cost: $60–$120/year</div>
                <div>Humidity control: excellent (variable CFM)</div>
                <div>Lifespan: 15-20 years</div>
                <div>Cost to replace: $350–$750</div>
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginTop: 12, borderLeft: '3px solid #F5E642′ }}>
            <span style={{ color: '#F5E642′ }}>🌡️ DFW Factor: </span>
            <span style={{ color: '#94a3b8', fontSize: 14 }}>The average DFW home runs its air handler fan 5,000-6,000 hours/year (vs national 2,500-3,000). ECM savings are nearly double vs national averages.</span>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>💡 Calculate Your DFW Savings</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Your situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select situation...</option>
              {situationOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Home size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select size...</option>
              {homeSize.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>✅ {rec.type}</div>
              <div style={{ color: '#22c55e', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>💰 Est. savings: {rec.saving}</div>
              <div style={{ color: '#94a3b8', marginBottom: 12, lineHeight: 1.6 }}>{rec.reason}</div>
              <div style={{ background: '#0f2040', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <span style={{ color: '#F5E642′ }}>🌡️ DFW Note: </span><span style={{ color: '#e2e8f0', fontSize: 14 }}>{rec.dfwNote}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{rec.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Find DFW HVAC Pros Who Spec ECM Motors</div>
          <div style={{ color: '#1a2f4a', fontSize: 14 }}>ProLnk connects you with contractors who won't upsell unnecessary PSC replacements</div>
        </div>
      </div>
    </div>
  );
}
