import { useState } from 'react';

const systems = [
  { name: 'Wyze Home Monitoring', type: 'DIY + Optional Monitoring', monthly: '$0–$10', upfront: '$100–$200', cameras: true, contract: 'None', pros: 'Cheapest entry, solid app, cameras included', cons: 'DIY install, limited pro features, not insurance-rated by all insurers', best: 'Budget-conscious, tech-savvy homeowner' },
  { name: 'Ring Alarm', type: 'DIY + Optional Monitoring', monthly: '$10–$20', upfront: '$200–$350', cameras: true, contract: 'Month-to-month', pros: 'Amazon ecosystem, wide camera lineup, no contract, easy install', cons: 'Cloud storage requires subscription, privacy concerns', best: 'Amazon/Alexa households, DIY preferred' },
  { name: 'ADT', type: 'Professional Install + Monitoring', monthly: '$45–$60', upfront: '$0–$300', cameras: true, contract: '2–3 years', pros: 'Longest history, cellular backup, professional monitoring, 24/7 response', cons: 'Long contracts, higher monthly cost, cancelation fees', best: 'Homeowners wanting full-service, insurance discount priority' },
  { name: 'Vivint', type: 'Professional Install + Monitoring', monthly: '$30–$50', upfront: '$0–$150 (financing)', cameras: true, contract: '3–5 years', pros: 'Premium equipment, smart home integration, great app, professional install', cons: 'Long contracts, aggressive sales, financing tied to contract', best: 'Smart home power users, new construction' },
  { name: 'SimpliSafe', type: 'DIY + Optional Monitoring', monthly: '$20–$30', upfront: '$200–$500', cameras: true, contract: 'None', pros: 'No contract, solid monitoring, cellular backup, good insurance rating', cons: 'Limited smart home integration, cameras add cost', best: 'No-contract priority, solid mid-range' },
];

const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–3,500 sq ft', '3,500+ sq ft'];
const monitoringPrefs = ['Self-monitored (app only)', 'Professional monitoring (24/7 response)', 'No preference'];
const budgets = ['Under $20/mo', '$20–$40/mo', '$40–$60/mo', 'No budget limit'];

function getRecommendation(size: string, monitoring: string, budget: string) {
  const isLarge = size === '3,500+ sq ft' || size === '2,500–3,500 sq ft';
  const wantsPro = monitoring === 'Professional monitoring (24/7 response)';
  const isBudget = budget === 'Under $20/mo';
  const isMid = budget === '$20–$40/mo';

  let recommendation = '';
  let monthly = '';
  let sensors = 0;
  let cameras = 0;

  if (size === 'Under 1,500 sq ft') { sensors = 6; cameras = 2; }
  else if (size === '1,500–2,500 sq ft') { sensors = 10; cameras = 3; }
  else if (size === '2,500–3,500 sq ft') { sensors = 14; cameras = 4; }
  else { sensors = 18; cameras = 5; }

  if (isBudget) { recommendation = 'Wyze Home Monitoring'; monthly = '$10–$15/mo'; }
  else if (wantsPro && !isBudget) { recommendation = 'ADT or SimpliSafe'; monthly = '$30–$55/mo'; }
  else if (isMid) { recommendation = 'Ring Alarm or SimpliSafe'; monthly = '$20–$30/mo'; }
  else { recommendation = 'Vivint (smart home premium)'; monthly = '$35–$55/mo'; }

  const insuranceDiscount = wantsPro ? '15–20%' : '5–10%';
  const insuranceSaving = wantsPro ? '$150–$400/yr' : '$50–$120/yr';

  const permitNote = 'Alarm permit required in most DFW cities. Dallas: $50/yr. Fort Worth: $25/yr. Plano/Frisco/McKinney: $25–$35. False alarm fines: $50–$250 per incident after 2nd false alarm.';

  return { recommendation, monthly, sensors, cameras, insuranceDiscount, insuranceSaving, permitNote, isLarge };
}

export default function DFWAlarmSystemGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [monitoring, setMonitoring] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔒</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Home Alarm & Security Guide
          </h1>
        </div>
        <p style={{ color: '#8A9AB5', fontSize: 16, marginBottom: 40 }}>
          The right security system can reduce break-in risk by 60% and cut your homeowner's insurance by 5–20%.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 40 }}>
          {[
            { icon: '🛡️', stat: '60%', label: 'Break-in deterrence with visible alarm system' },
            { icon: '💰', stat: '5–20%', label: 'Homeowner insurance discount with monitored system' },
            { icon: '📱', stat: '<30 sec', label: 'Professional monitoring response time' },
            { icon: '📋', stat: 'Required', label: 'Alarm permit in most DFW municipalities' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111E35', borderRadius: 10, padding: 18, border: '1px solid #1E2D4A', textAlign: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{s.stat}</div>
              <div style={{ color: '#8A9AB5', fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>🏙️ DFW-Specific: Permit Requirements</h2>
          <p style={{ color: '#8A9AB5', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            Most DFW cities require an annual alarm permit to operate a monitored alarm system. 
            Failure to register leads to fines and may result in police declining to respond to false alarms.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { city: 'Dallas', permit: '$50/yr', falseFine: '$100+ (3rd+)' },
              { city: 'Fort Worth', permit: '$25/yr', falseFine: '$50+ (3rd+)' },
              { city: 'Plano', permit: '$25/yr', falseFine: '$75+ (3rd+)' },
              { city: 'Frisco', permit: '$35/yr', falseFine: '$100+ (3rd+)' },
              { city: 'McKinney', permit: '$30/yr', falseFine: '$75+ (3rd+)' },
              { city: 'Arlington', permit: '$25/yr', falseFine: '$50+ (3rd+)' },
            ].map(c => (
              <div key={c.city} style={{ background: '#0A1628', borderRadius: 8, padding: 12, border: '1px solid #1E2D4A' }}>
                <div style={{ color: '#E8EDF5', fontWeight: 700, marginBottom: 4 }}>{c.city}</div>
                <div style={{ color: '#4ECDC4', fontSize: 12 }}>Permit: {c.permit}</div>
                <div style={{ color: '#FF6B6B', fontSize: 12 }}>False alarm: {c.falseFine}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 40, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📊 System Comparison: Wyze vs Ring vs ADT vs Vivint vs SimpliSafe</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1E2D4A' }}>
                  {['System', 'Type', 'Monthly', 'Upfront', 'Contract', 'Best For'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: '#F5E642', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {systems.map((s, i) => (
                  <tr key={s.name} style={{ borderBottom: '1px solid #1E2D4A', background: i % 2 === 0 ? '#0A1628' : 'transparent' }}>
                    <td style={{ padding: '10px 12px', color: '#E8EDF5', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '10px 12px', color: '#8A9AB5' }}>{s.type}</td>
                    <td style={{ padding: '10px 12px', color: '#4ECDC4', fontWeight: 600 }}>{s.monthly}</td>
                    <td style={{ padding: '10px 12px', color: '#FFB347' }}>{s.upfront}</td>
                    <td style={{ padding: '10px 12px', color: s.contract === 'None' || s.contract === 'Month-to-month' ? '#4ECDC4' : '#FF6B6B' }}>{s.contract}</td>
                    <td style={{ padding: '10px 12px', color: '#8A9AB5' }}>{s.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Get Your System Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select size</option>
                {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Monitoring Preference</label>
              <select value={monitoring} onChange={e => setMonitoring(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select preference</option>
                {monitoringPrefs.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Monthly Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select budget</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => { if (homeSize && monitoring && budget) setResult(getRecommendation(homeSize, monitoring, budget)); }}
            disabled={!homeSize || !monitoring || !budget}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: !homeSize || !monitoring || !budget ? 0.5 : 1 }}>
            Get Recommendation →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E2D4A' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Recommended System</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{result.recommendation}</div>
                </div>
                <div>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Estimated Monthly Cost</div>
                  <div style={{ color: '#4ECDC4', fontWeight: 800, fontSize: 20 }}>{result.monthly}</div>
                </div>
                <div>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Recommended Sensors</div>
                  <div style={{ color: '#E8EDF5', fontWeight: 700, fontSize: 16 }}>{result.sensors} sensors + {result.cameras} cameras</div>
                </div>
                <div>
                  <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 4 }}>Insurance Discount</div>
                  <div style={{ color: '#4ECDC4', fontWeight: 700, fontSize: 16 }}>{result.insuranceDiscount} (~{result.insuranceSaving}/yr)</div>
                </div>
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: 14, border: '1px solid #1E2D4A' }}>
                <div style={{ color: '#FFB347', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>📋 DFW Permit Reminder</div>
                <div style={{ color: '#8A9AB5', fontSize: 12, lineHeight: 1.6 }}>{result.permitNote}</div>
              </div>
              {result.isLarge && (
                <div style={{ marginTop: 12, color: '#8A9AB5', fontSize: 13 }}>
                  → Large home: consider dual base stations or a mesh system to ensure signal coverage throughout.
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#8A9AB5', fontSize: 13 }}>Find vetted DFW security system installers on ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
