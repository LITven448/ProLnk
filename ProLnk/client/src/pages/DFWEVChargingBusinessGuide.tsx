import { useState } from 'react';

const parkingTypes = ['Attached garage (private)', 'Detached garage (private)', 'Driveway (accessible)', 'Carport (accessible)', 'Covered parking + gated community'];
const dallasZones = ['Dallas (Uptown/Downtown)', 'Dallas (suburbs — Lakewood, Oak Cliff)', 'Fort Worth (near TCU/downtown)', 'Plano / Allen / Frisco', 'Arlington / Irving (DFW Airport area)', 'McKinney / Prosper / Celina'];

type EVIncomeResult = { eligibility: string; platforms: string; setupCost: string; monthlyEarnings: string; setupTime: string; chargerRec: string; notes: string };

const evMap: Record<string, EVIncomeResult> = {
  'Attached garage (private)|Dallas (Uptown/Downtown)':          { eligibility: 'High demand — urban density', platforms: 'ChargePoint Home Flex, PlugShare', setupCost: '$1,200–$2,500', monthlyEarnings: '$150–$400/mo', setupTime: '2–4 weeks', chargerRec: 'ChargePoint Home Flex 50A', notes: 'Uptown/Downtown Dallas has highest public charger demand in DFW. High utilization expected.' },
  'Attached garage (private)|Dallas (suburbs — Lakewood, Oak Cliff)': { eligibility: 'Moderate — residential areas', platforms: 'PlugShare, Blink Network', setupCost: '$1,200–$2,000', monthlyEarnings: '$80–$200/mo', setupTime: '2–4 weeks', chargerRec: 'Enel X JuiceBox 48', notes: 'Suburban demand is growing fast as EV adoption increases in Lakewood, Oak Cliff.' },
  'Attached garage (private)|Fort Worth (near TCU/downtown)':    { eligibility: 'Moderate-high — college + downtown', platforms: 'ChargePoint, PlugShare, Blink', setupCost: '$1,200–$2,200', monthlyEarnings: '$100–$280/mo', setupTime: '2–4 weeks', chargerRec: 'ChargePoint Home Flex 50A', notes: 'TCU and downtown FW create strong weekday demand from commuters and students.' },
  'Attached garage (private)|Plano / Allen / Frisco':            { eligibility: 'High — affluent EV-heavy suburbs', platforms: 'ChargePoint, PlugShare, Greenlots', setupCost: '$1,200–$2,500', monthlyEarnings: '$120–$320/mo', setupTime: '2–4 weeks', chargerRec: 'ChargePoint Home Flex 50A', notes: 'Frisco and Plano have one of the highest EV ownership rates in DFW.' },
  'Attached garage (private)|Arlington / Irving (DFW Airport area)': { eligibility: 'Very high — airport traveler demand', platforms: 'ChargePoint, PlugShare, EVgo partnership', setupCost: '$1,500–$3,000', monthlyEarnings: '$200–$600/mo', setupTime: '3–5 weeks', chargerRec: 'ChargePoint CPF50 (dual)', notes: 'Near DFW Airport is a goldmine — EV renters and overnight parkers need charging.' },
  'Attached garage (private)|McKinney / Prosper / Celina':       { eligibility: 'Moderate — fast-growing suburbs', platforms: 'PlugShare, ChargePoint', setupCost: '$1,000–$2,000', monthlyEarnings: '$60–$180/mo', setupTime: '2–4 weeks', chargerRec: 'Enel X JuiceBox 40', notes: 'Growing EV ownership in north DFW collar counties. Early mover advantage.' },

  'Driveway (accessible)|Dallas (Uptown/Downtown)':              { eligibility: 'Excellent — max visibility', platforms: 'PlugShare, ChargePoint, Open Charge Map', setupCost: '$800–$1,800', monthlyEarnings: '$200–$500/mo', setupTime: '1–3 weeks', chargerRec: 'ChargePoint CPF50 weatherproof', notes: 'Driveway access in urban Dallas creates walk-up demand. Highest visibility of any setup.' },
  'Driveway (accessible)|Plano / Allen / Frisco':                { eligibility: 'High — accessible + affluent area', platforms: 'PlugShare, ChargePoint', setupCost: '$800–$1,500', monthlyEarnings: '$100–$300/mo', setupTime: '1–3 weeks', chargerRec: 'ChargePoint CPF50 weatherproof', notes: 'Accessible driveway charging in Frisco gets used heavily by Tesla and Rivian owners.' },
  'Driveway (accessible)|Arlington / Irving (DFW Airport area)': { eligibility: 'Very high — airport adjacency', platforms: 'ChargePoint, PlugShare, SpotHero EV', setupCost: '$1,000–$2,500', monthlyEarnings: '$300–$800/mo', setupTime: '2–4 weeks', chargerRec: 'ChargePoint CPF50 dual port', notes: 'Highest earning potential in DFW. Airport travelers pay premium for guaranteed charging.' },
  'Covered parking + gated community|Plano / Allen / Frisco':    { eligibility: 'Moderate — HOA approval needed', platforms: 'Blink Network, ChargePoint', setupCost: '$2,000–$4,000', monthlyEarnings: '$150–$350/mo', setupTime: '4–8 weeks (HOA process)', chargerRec: 'Blink IQ 200 (commercial-grade)', notes: 'HOA approval is the main hurdle. TX law (SB 527) gives homeowners right to install EV charging.' },
};

export default function DFWEVChargingBusinessGuide() {
  const [parking, setParking] = useState('');
  const [zone, setZone] = useState('');
  const [showResult, setShowResult] = useState(false);

  const key = `${parking}|${zone}`;
  const result = evMap[key];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚗⚡💰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW EV Charging Business Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Turn Your Parking Space Into Monthly Income — The DFW EV Charging Opportunity</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ The DFW EV Charging Opportunity</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 16 }}>DFW has 1.8M+ EVs projected by 2030, but public charging infrastructure is behind. Homeowners with accessible parking and a Level 2 charger can earn $80–$800/month through platforms like ChargePoint and PlugShare — while helping solve DFW's charging gap.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[['🔌', 'Setup Cost', '$800–$4,000 one-time for charger + install'],
              ['💰', 'Monthly Income', '$80–$800/mo depending on location + usage'],
              ['📅', 'Go Live', '2–6 weeks from decision to first session']].map(([icon, label, desc]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 DFW EV Income Estimator</h2>
          {[{ label: 'Parking Situation', val: parking, opts: parkingTypes, setter: setParking },
            { label: 'DFW Location', val: zone, opts: dallasZones, setter: setZone }].map(({ label, val, opts, setter }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 8 }}>{label}</label>
              <select value={val} onChange={e => { setter(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={() => setShowResult(true)} disabled={!parking || !zone}
            style={{ width: '100%', background: parking && zone ? '#F5E642' : '#1E3A5F', color: parking && zone ? '#0A1628' : '#4A6FA5', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: parking && zone ? 'pointer' : 'default' }}>
            Estimate My DFW EV Charging Income →
          </button>
        </div>

        {showResult && result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>💰 Your DFW EV Charging Business Plan</h3>
            {[
              ['✅', 'Demand Assessment', result.eligibility],
              ['📋', 'Best Platforms', result.platforms],
              ['🔌', 'Recommended Charger', result.chargerRec],
              ['💰', 'Setup Cost', result.setupCost],
              ['📅', 'Monthly Earnings', result.monthlyEarnings],
              ['⏱️', 'Time to Launch', result.setupTime],
              ['💡', 'DFW Location Notes', result.notes],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div><div style={{ fontWeight: 600 }}>{val}</div></div>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642', marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>🏛️ TX Legal Protection</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Texas SB 527 gives homeowners and renters the legal right to install EV charging. HOAs cannot unreasonably prohibit it. You may need to notify your HOA but they cannot block you.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
