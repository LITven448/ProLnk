import { useState } from 'react';

const alerts = [
  { level: 'Conservation Appeal', icon: '🟡', color: '#F5E642', desc: 'ERCOT asks Texans to voluntarily reduce usage. No mandatory cuts yet.' },
  { level: 'Watch', icon: '🟠', color: '#f97316', desc: 'Reserves are tightening. Reduce non-essential usage immediately.' },
  { level: 'Warning', icon: '🔴', color: '#ef4444', desc: 'Grid under stress. Rotating outages possible. Prepare backup power.' },
  { level: 'Emergency', icon: '🆘', color: '#dc2626', desc: 'Grid emergency. Outages happening. Conserve everything immediately.' },
];

const features = [
  { label: 'Generator (gas/propane)', value: 'gen', points: 40 },
  { label: 'Battery backup (Powerwall etc)', value: 'batt', points: 35 },
  { label: 'Gas heat (not electric)', value: 'gas', points: 25 },
  { label: 'Smart thermostat', value: 'smart', points: 15 },
  { label: 'LED lighting throughout', value: 'led', points: 10 },
  { label: 'Extra insulation / weatherization', value: 'insul', points: 20 },
];

export default function DFWERCOTGuide2026() {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (v: string) => setChecked(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const score = checked.reduce((sum, v) => sum + (features.find(f => f.value === v)?.points || 0), 0);
  const scoreLabel = score >= 80 ? '🟢 Grid-Resilient' : score >= 40 ? '🟡 Moderate Risk' : '🔴 Vulnerable';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW ERCOT Grid Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Texas runs its own grid — no interstate backup. Here's what that means for you.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 4 }}>Why ERCOT Is Different</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Unlike the rest of the US, Texas operates the ERCOT grid independently — it cannot import power from neighboring states during emergencies.
            The 2021 winter storm (Uri) caused 10 million+ Texans to lose power for days. ERCOT has added reserves since then, but the risk remains real.
            DFW homeowners should prepare for grid stress events, especially in extreme winter cold or record summer heat.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚡ Grid Alert Levels</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {alerts.map(a => (
              <div key={a.level} style={{ background: '#112240', borderRadius: 12, padding: 16, border: `1px solid ${a.color}30`, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{a.icon}</span>
                <div>
                  <div style={{ color: a.color, fontWeight: 700, fontSize: 15 }}>{a.level}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 4 }}>🏠 Your Grid Resilience Score</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Select features your home has:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {features.map(f => (
              <label key={f.value} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={checked.includes(f.value)} onChange={() => toggle(f.value)}
                  style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{f.label}</span>
                <span style={{ color: '#F5E642', fontSize: 12, marginLeft: 'auto' }}>+{f.points}pts</span>
              </label>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 16, textAlign: 'center', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 900 }}>{score}/145</div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginTop: 4 }}>{scoreLabel}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>
              {score < 40 ? 'Add a gas heat source and consider a generator for winter storms.' :
               score < 80 ? 'Good progress. Battery backup or generator would significantly improve safety.' :
               'Your home can weather most ERCOT grid events. Well prepared!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}