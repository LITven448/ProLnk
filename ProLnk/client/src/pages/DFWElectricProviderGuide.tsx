import { useState } from 'react';

const dfwCities = ['Dallas','Fort Worth','Plano','Frisco','McKinney','Arlington','Irving','Garland','Mesquite','Richardson','Allen','Lewisville','Carrollton','Denton','Flower Mound','Grapevine','Southlake','Colleyville','Keller','Bedford'];
const usageOptions = ['Under 1000 kWh','1000–1500 kWh','1500–2000 kWh','Over 2000 kWh'];
const lifestyles = ['Home all day (WFH)','Gone most of day','Night owl / home evenings','Weekend warrior'];

function getRecommendation(city: string, usage: string, lifestyle: string) {
  const highUsage = usage.includes('2000') || usage.includes('1500');
  const nightOwl = lifestyle.includes('Night');
  const wfh = lifestyle.includes('WFH');
  if (nightOwl) return { type: 'Free Nights Plan', tip: 'Run dishwasher, laundry, AC at night to maximize free-hour savings. Look for plans with free 9pm–6am or 8pm–5am windows.', rate: '~9–11¢/kWh on-peak, $0 off-peak' };
  if (wfh && highUsage) return { type: 'Fixed-Rate Low-per-kWh Plan', tip: 'With high daytime usage, a fixed rate under 10¢/kWh with no minimum usage fee is your best bet. Avoid tiered or variable plans.', rate: '~8.5–10.5¢/kWh fixed' };
  if (!highUsage) return { type: 'Fixed-Rate with Low Base Fee', tip: 'Low users often pay more per kWh but save on base fees. Watch for plans with $0 base fee and no minimum usage penalty.', rate: '~11–13¢/kWh, $0 base' };
  return { type: 'Indexed Fixed-Rate Plan', tip: 'Standard DFW summer usage benefits from a 12-month fixed rate. Lock in before June when rates spike with heat demand.', rate: '~9–11¢/kWh fixed 12mo' };
}

export default function DFWElectricProviderGuide() {
  const [city, setCity] = useState('');
  const [usage, setUsage] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const rec = city && usage && lifestyle ? getRecommendation(city, usage, lifestyle) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Electric Provider Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Navigate Texas's deregulated electricity market and find your best plan</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>📋 How Texas Electricity Works</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Texas has a <strong style={{ color: '#F5E642' }}>deregulated electricity market</strong> — you choose your Retail Electric Provider (REP) but Oncor delivers the power. Shop at <strong style={{ color: '#F5E642' }}>PowerToChoose.org</strong> (the official state comparison tool). Look past the headline rate: compare <em>price per kWh at your actual usage level</em>, monthly base fees, and minimum usage penalties (common gotcha: a plan that's cheap at 2000 kWh but expensive at 1000).</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '📌', title: 'Fixed Rate', desc: 'Same rate all year. Best for budgeting. Lock in before summer.' },
            { icon: '📊', title: 'Variable Rate', desc: 'Follows market. Can be cheap in winter, brutal in summer.' },
            { icon: '🌙', title: 'Free Nights/Weekends', desc: 'Great for night owls and weekend warriors. Higher on-peak rate.' },
            { icon: '☀️', title: 'Time-of-Use', desc: 'Tiered by time. Works if you shift usage off peak hours.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🌡️ DFW Summer Reality</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 0.75rem' }}>DFW summers run 95–105°F for weeks. July–August bills are 2–3× winter bills. A 2,000 sq ft home averages <strong style={{ color: '#F5E642' }}>1,800–2,500 kWh/month</strong> in summer. Always compare plan prices at <em>your summer usage level</em>, not the lowest usage tier shown.</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🔍 Find Your Best Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Your DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select city</option>
                {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Monthly Usage</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select usage</option>
                {usageOptions.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Lifestyle</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select lifestyle</option>
                {lifestyles.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>✅ Recommended: {rec.type}</div>
              <div style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>{rec.tip}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Typical rate: <strong style={{ color: '#F5E642' }}>{rec.rate}</strong></div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>→ Search on <strong style={{ color: '#F5E642' }}>PowerToChoose.org</strong> filtering by {city} zip code at your usage level.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
