import { useState } from 'react';

export default function DFWFoundationPierTesting2026() {
  const [pierConcern, setPierConcern] = useState('helical');

  const testGuides: Record<string, { icon: string; test: string; method: string; detail: string }> = {
    helical: { icon: '🔩', test: 'Torque Correlation Testing', method: 'Standard for all helical pier installations', detail: 'Helical pier capacity is calculated in real time during installation using torque correlation. As the pier is screwed into DFW clay and shale, installation torque is logged and converted to estimated capacity using Kt factor. This is the standard acceptance method — no separate load test needed.' },
    concrete: { icon: '🏗️', test: 'Proof Load Testing', method: 'Applied load to 150% of design load', detail: 'Pushed concrete piers in DFW are sometimes proof tested by jacking the foundation to 150% of design load and holding for 1–2 hours. Rarely done on residential projects — primarily for commercial or engineered repair programs.' },
    resistance: { icon: '📊', test: 'Driving Resistance Logging', method: 'Blow count or hydraulic pressure log', detail: 'Driven steel pier resistance is logged via hydraulic pressure during installation. Engineers set a minimum pressure (e.g., 6,000–8,000 lbs) as acceptance. Most DFW residential pier contractors do this automatically but rarely provide written logs to homeowners.' },
    dispute: { icon: '⚖️', test: 'Independent Load Test', method: 'Third-party engineer testing — rare', detail: 'Full load testing for a disputed DFW foundation repair involves an independent engineer setting up a load cell and testing individual piers to failure or 200% design load. Cost: $2,000–$6,000. Justified only in litigation or high-value property disputes.' },
  };

  const g = testGuides[pierConcern];

  const context = [
    { icon: '🌍', title: 'DFW Geology and Pier Depth', body: 'DFW sits on Blackland Prairie clay overlying Austin Chalk and Eagle Ford shale. Helical piers typically reach 20–35 feet to competent bearing. Pushed concrete piers stop when hydraulic resistance is met — often 15–25 feet in DFW.' },
    { icon: '📋', title: 'What to Request from Your Contractor', body: 'Ask for: written installation log (torque or pressure per pier), pier depth record, and design capacity per pier. Reputable DFW foundation contractors provide these. Absence of documentation is a red flag.' },
    { icon: '🔍', title: 'Engineer of Record', body: 'For engineered repairs (structural engineer on project), pier testing acceptance criteria are specified in the repair plan. The engineer reviews installation logs and may require as-built documentation before signing off on the repair.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔩</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Foundation Pier Load Testing 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>How engineers verify pier capacity in North Texas foundations</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 DFW Pier Concern → Testing Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>Select Your Pier Situation</label>
          <select value={pierConcern} onChange={e => setPierConcern(e.target.value)}
            style={{ background: '#1a2d4a', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '8px 12px', width: '100%', marginBottom: 16 }}>
            <option value="helical">Helical piers (new installation)</option>
            <option value="concrete">Pushed concrete piers</option>
            <option value="resistance">Driven steel piers</option>
            <option value="dispute">Disputed repair / litigation</option>
          </select>
          <div style={{ background: '#122040', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{g.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{g.test}</div>
            <div style={{ color: '#8899AA', fontSize: 12, marginBottom: 8 }}>{g.method}</div>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{g.detail}</p>
          </div>
        </div>

        {context.map((c, i) => (
          <div key={i} style={{ background: '#0D1F38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{c.icon} {c.title}</h3>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{c.body}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0D1F38', borderRadius: 12 }}>
          <p style={{ color: '#8899AA', fontSize: 12, margin: '0 0 12px' }}>Connect with a vetted DFW foundation contractor via ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find Foundation Contractor
          </button>
        </div>
      </div>
    </div>
  );
}