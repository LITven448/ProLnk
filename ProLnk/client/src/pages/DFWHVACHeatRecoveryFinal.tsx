import { useState } from 'react';

const tightnessOptions = ['Very tight (new construction 2015+)', 'Moderately tight (2000-2015)', 'Older home (pre-2000)', 'Renovated/weatherized'];
const concernOptions = ['Stuffy air / CO2 buildup', 'Dry air in winter', 'Humid air in summer', 'Allergies / air quality', 'Energy efficiency'];

const getRecommendation = (tightness: string, concern: string) => {
  if (!tightness || !concern) return null;
  const needsVentilation = tightness.includes('tight');
  const isHumidity = concern.includes('Dry') || concern.includes('Humid');
  if (needsVentilation && concern.includes('Dry')) return { type: 'ERV', reason: 'Tight DFW home needs fresh air + ERV retains winter moisture you need', sizing: '70-100 CFM for 2,000 sqft', cost: '$1,800–$3,200 installed' };
  if (needsVentilation && concern.includes('Humid')) return { type: 'HRV', reason: 'Tight home needs ventilation; HRV dumps excess summer humidity', sizing: '80-120 CFM for 2,000 sqft', cost: '$1,600–$2,800 installed' };
  if (needsVentilation) return { type: 'ERV', reason: 'New DFW construction requires mechanical ventilation — ERV is the DFW standard', sizing: '70-100 CFM per 2,000 sqft', cost: '$1,800–$3,200 installed' };
  if (isHumidity && concern.includes('Dry')) return { type: 'ERV (optional)', reason: 'Older homes breathe more naturally but ERV still helps with DFW winter dryness', sizing: '50-70 CFM', cost: '$1,500–$2,500 installed' };
  return { type: 'Improve ventilation first', reason: 'Older DFW homes usually have enough natural infiltration — start with air sealing audit', sizing: 'N/A', cost: '$200–$500 audit' };
};

export default function DFWHVACHeatRecoveryFinal() {
  const [tightness, setTightness] = useState('');
  const [concern, setConcern] = useState('');
  const rec = getRecommendation(tightness, concern);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Heat Recovery Ventilator (HRV/ERV) Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW's tight new construction traps stale air. Learn when your home needs an HRV or ERV — and which one fits DFW’s climate.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌬️ Why DFW Homes Need Mechanical Ventilation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['⚡ Energy codes tightened post-2015', 'New DFW homes are sealed so tight they require mechanical fresh air by code'],['🌵 DFW winters are dry', 'ERVs recover 70% of humidity — critical when DFW drops to 20% RH in January'],['🏭 Indoor air can be 5x worse', 'Off-gassing, cooking, pets — tight homes concentrate pollutants'],['🌊 DFW summers are humid', 'HRVs reject summer humidity while still bringing in fresh air']].map(([title, desc]) => (
              <div key={title} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚖️ HRV vs ERV for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>HRV — Heat Recovery Ventilator</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Transfers heat only, not moisture. Best when you want to dump summer humidity. DFW use: homes with chronic humidity problems. Efficiency: 70-80% heat recovery.</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ERV — Energy Recovery Ventilator</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Transfers heat AND moisture. Best for DFW's dry winters — keeps humidity in when you need it. DFW use: most new construction. Efficiency: 70-80% total energy recovery.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔧 Find Your DFW Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>How tight is your home?</label>
            <select value={tightness} onChange={e => setTightness(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select home age/tightness...</option>
              {tightnessOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Primary concern?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select your concern...</option>
              {concernOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Recommendation: {rec.type}</div>
              <div style={{ color: '#94a3b8', marginBottom: 12 }}>{rec.reason}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div><span style={{ color: '#F5E642′ }}>📐 Sizing:</span> <span style={{ color: '#e2e8f0' }}>{rec.sizing}</span></div>
                <div><span style={{ color: '#F5E642′ }}>💰 Cost:</span> <span style={{ color: '#e2e8f0' }}>{rec.cost}</span></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Get an HRV/ERV Quote from a DFW Pro</div>
          <div style={{ color: '#1a2f4a', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC contractors who specialize in ventilation systems</div>
        </div>
      </div>
    </div>
  );
}
