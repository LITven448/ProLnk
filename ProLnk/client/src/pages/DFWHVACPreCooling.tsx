import { useState } from 'react';

const planData: Record<string, { peakStart: number; peakEnd: number; peakRate: number; offRate: number }> = {
  'Oncor Flat Rate': { peakStart: 0, peakEnd: 0, peakRate: 0.12, offRate: 0.12 },
  'TXU TOU 3–8pm': { peakStart: 15, peakEnd: 20, peakRate: 0.28, offRate: 0.09 },
  'Reliant Free Nights 9pm–6am': { peakStart: 6, peakEnd: 21, peakRate: 0.16, offRate: 0.0 },
  'Green Mountain 4–9pm Peak': { peakStart: 16, peakEnd: 21, peakRate: 0.32, offRate: 0.10 },
};

const homeSizeKwh: Record<string, number> = {
  '< 1,500 sq ft': 2.8,
  '1,500–2,500 sq ft': 4.2,
  '2,500–3,500 sq ft': 5.8,
  '3,500+ sq ft': 7.5,
};

export default function DFWHVACPreCooling() {
  const [plan, setPlan] = useState('TXU TOU 3–8pm');
  const [homeSize, setHomeSize] = useState('1,500–2,500 sq ft');

  const planInfo = planData[plan] ?? planData['TXU TOU 3–8pm'];
  const kwhPerHour = homeSizeKwh[homeSize] ?? 4.2;
  const peakHours = planInfo.peakStart === 0 ? 0 : planInfo.peakEnd - planInfo.peakStart;
  const normalPeakCost = peakHours * kwhPerHour * planInfo.peakRate;
  const preCoolSavings = peakHours === 0 ? 0 : Math.round((normalPeakCost * 0.45) * 30);
  const preCoolTarget = planInfo.peakStart === 0 ? 'N/A — flat rate plan' : `Cool to 72–74°F by ${planInfo.peakStart - 1}:00`;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
          ⚡ ProLnk · DFW HVAC Guide
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW Pre-Cooling Strategy
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Many DFW electricity plans charge peak rates from 3–7pm — exactly when your AC works
          hardest. Pre-cooling lets you store "coldness" in your home before peak pricing hits,
          then coast through the expensive hours with minimal runtime.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>
            🔢 Pre-Cool Strategy Calculator
          </h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>DFW Electric Plan</label>
            <select
              value={plan}
              onChange={e => setPlan(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(planData).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Home Size</label>
            <select
              value={homeSize}
              onChange={e => setHomeSize(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}
            >
              {Object.keys(homeSizeKwh).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Your Pre-Cool Strategy</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', lineHeight: 1.5 }}>{preCoolTarget}</div>
            {peakHours > 0 && (
              <div style={{ fontSize: 14, color: '#CBD5E1', marginTop: 8 }}>
                Let temp drift to 78–80°F during {planInfo.peakStart}:00–{planInfo.peakEnd}:00 peak window
              </div>
            )}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 46, fontWeight: 900, color: '#4ade80′ }}>
              {preCoolSavings === 0 ? '—' : `$${preCoolSavings}`}
            </div>
            <div style={{ fontSize: 14, color: '#94A3B8', marginTop: 4 }}>
              {preCoolSavings === 0 ? 'Switch to a TOU plan to unlock pre-cool savings' : 'Est. monthly savings with pre-cooling'}
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 The DFW Pre-Cool Playbook</h2>
          {[
            ['Step 1: Program by 6am', 'Set your smart thermostat to begin aggressive cooling at 6am — before DFW heat climbs.'],
            ['Step 2: Hit 72–74°F by 1–2pm', 'Your home is "charged" with cold air, acting as a thermal battery for the next 4–6 hours.'],
            ['Step 3: Let It Drift During Peak', 'Set to 78–80°F at 3pm. Your home passively stays comfortable as it slowly warms.'],
            ['Step 4: Resume Normal at 7–8pm', 'Once off-peak pricing resumes, your AC quickly pulls it back to your preferred temp.'],
          ].map(([title, body]) => (
            <div key={title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 17, marginBottom: 6 }}>
            🔧 Smart thermostat install + programming
          </div>
          <div style={{ color: '#1E3A5F', fontSize: 14 }}>
            ProLnk pros can install and program your thermostat for DFW pre-cooling from day one.
          </div>
        </div>
      </div>
    </div>
  );
}
