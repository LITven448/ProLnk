import { useState } from 'react';

const HOME_TYPES = [
  { label: 'Townhome / Condo (<1,200 sq ft)', coolHrs: 2200, heatHrs: 400 },
  { label: 'Small Home (1,200–1,800 sq ft)', coolHrs: 2500, heatHrs: 500 },
  { label: 'Mid-Size Home (1,800–2,800 sq ft)', coolHrs: 2800, heatHrs: 600 },
  { label: 'Large Home (2,800–4,000 sq ft)', coolHrs: 3100, heatHrs: 700 },
  { label: 'Estate (4,000+ sq ft)', coolHrs: 3400, heatHrs: 850 },
];

const INSULATION = [
  { label: 'Poor (pre-2000, no upgrades)', mult: 1.2 },
  { label: 'Average (2000–2015)', mult: 1.0 },
  { label: 'Good (post-2015 or upgraded)', mult: 0.85 },
  { label: 'Excellent (spray foam, new windows)', mult: 0.7 },
];

export default function DFWHVACSeasonLengthGuide() {
  const [homeIdx, setHomeIdx] = useState(2);
  const [insulIdx, setInsulIdx] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const home = HOME_TYPES[homeIdx];
  const insul = INSULATION[insulIdx];

  const coolHrs = Math.round(home.coolHrs * insul.mult);
  const heatHrs = Math.round(home.heatHrs * insul.mult);
  const totalHrs = coolHrs + heatHrs;

  const northernEquiv = Math.round((coolHrs + heatHrs) / 900);
  const wearRate = totalHrs > 3000 ? 'Very High' : totalHrs > 2500 ? 'High' : 'Moderate';
  const wearColor = totalHrs > 3000 ? '#ef4444′ : totalHrs > 2500 ? '#f97316' : '#eab308';
  const lifespan = totalHrs > 3200 ? '10–13 years' : totalHrs > 2600 ? '13–16 years' : '15–18 years';

  const coolMonths = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const heatMonths = ['Dec', 'Jan', 'Feb'];
  const shoulderMonths = ['Mar', 'Nov'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>📅 DFW HVAC TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Season Length Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW's cooling season runs 7 months — more than double the national average. Here’s what that means for your system.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
          {coolMonths.map(m => (
            <div key={m} style={{ background: '#1a3a5c', borderRadius: 8, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#60a5fa' }}>❄️ {m}</div>
          ))}
          {heatMonths.map(m => (
            <div key={m} style={{ background: '#3a1a1a', borderRadius: 8, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#f87171′ }}>🔥 {m}</div>
          ))}
          {shoulderMonths.map(m => (
            <div key={m} style={{ background: '#2a2a1a', borderRadius: 8, padding: '10px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#fbbf24′ }}>🌤️ {m}</div>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>🏠 Home Type</div>
          {HOME_TYPES.map((h, i) => (
            <button key={i} onClick={() => setHomeIdx(i)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 6,
              borderRadius: 8, border: `2px solid ${homeIdx === i ? '#F5E642' : 'transparent'}`,
              background: homeIdx === i ? '#1e2d4a' : '#0d1829', color: '#fff', cursor: 'pointer', fontSize: 14
            }}>{h.label}</button>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>🏗️ Insulation Quality</div>
          {INSULATION.map((ins, i) => (
            <button key={i} onClick={() => setInsulIdx(i)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 6,
              borderRadius: 8, border: `2px solid ${insulIdx === i ? '#F5E642' : 'transparent'}`,
              background: insulIdx === i ? '#1e2d4a' : '#0d1829', color: '#fff', cursor: 'pointer', fontSize: 14
            }}>{ins.label}</button>
          ))}
        </div>

        <button onClick={() => setSubmitted(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '14px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 24 }}>
          Estimate Annual Runtime 📊
        </button>

        {submitted && (
          <div style={{ background: '#111c35', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: '❄️ Cooling Hours/yr', val: `${coolHrs.toLocaleString()} hrs`, sub: 'April–October' },
                { label: '🔥 Heating Hours/yr', val: `${heatHrs.toLocaleString()} hrs`, sub: 'Dec–February' },
                { label: '⏱️ Total Runtime/yr', val: `${totalHrs.toLocaleString()} hrs`, sub: `${northernEquiv}x northern home` },
                { label: '📉 Expected Lifespan', val: lifespan, sub: 'DFW-adjusted' },
              ].map(({ label, val, sub }) => (
                <div key={label} style={{ background: '#1e2d4a', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a1a2e', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Wear Rate: <span style={{ color: wearColor, fontWeight: 700 }}>{wearRate}</span></div>
              <div style={{ fontSize: 14 }}>
                Your system runs <strong style={{ color: '#F5E642′ }}>{totalHrs.toLocaleString()} hrs/yr</strong> — equivalent to what a northern-state unit runs in {northernEquiv} years. Plan for replacement in {lifespan}.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
