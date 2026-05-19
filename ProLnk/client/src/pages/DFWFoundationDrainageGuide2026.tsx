import { useState } from 'react';

const solutions: Record<string, { solution: string; cost: string; diy: boolean; urgency: string; detail: string }> = {
  pooling: { solution: 'Surface Regrading', cost: '$500-2,000', diy: true, urgency: 'Within 30 days', detail: 'Grade soil to slope away from foundation at 1in per foot for first 6ft. Most common fix for water pooling against foundation.' },
  gutters: { solution: 'Downspout Extensions', cost: '$50-200', diy: true, urgency: 'This week', detail: 'Extend downspouts minimum 6ft from foundation. Underground drain pipes to daylight are ideal. This is the easiest foundation win in DFW.' },
  french_drain: { solution: 'French Drain System', cost: '$25-50 per linear ft', diy: false, urgency: 'Within 60 days', detail: 'Perforated pipe in gravel-filled trench redirects subsurface water. Typical DFW yard: $1,500-4,000. Most effective for chronic wet areas.' },
  window_well: { solution: 'Window Well Drain', cost: '$200-600 per well', diy: false, urgency: 'Before next rain season', detail: 'Window well drains connect to French drain or daylight. Essential for below-grade windows that collect water and allow foundation intrusion.' },
  sump: { solution: 'Interior Sump System', cost: '$3,000-8,000', diy: false, urgency: 'Schedule now', detail: 'Perimeter drain channel inside foundation with sump pump. Last resort for chronic water intrusion. Effective but invasive installation.' },
  slope: { solution: 'Swale / Berm', cost: '$300-1,500', diy: true, urgency: 'Within 45 days', detail: 'Graded channel or raised berm redirects surface runoff away from foundation. Cheaper than French drain for surface-only issues.' },
};

export default function DFWFoundationDrainageGuide2026() {
  const [problem, setProblem] = useState('');
  const result = problem ? solutions[problem] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Foundation Drainage Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>Poor drainage is the #1 cause of DFW foundation failure. Water saturation causes clay to expand, then shrink — destroying your foundation over time.</p>
        <div style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: 6, marginBottom: 32, fontSize: 14, fontWeight: 600 }}>
          🚨 If water pools within 6ft of your foundation after rain, you have a drainage emergency.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: '🏔️ Surface Grading', desc: 'Grade should slope 1in/ft away from foundation for first 6ft. Settled soil against foundation is the #1 drainage problem in DFW.' },
            { label: '🌊 French Drains', desc: 'Perforated pipe in gravel trench. $25-50/linear ft installed. Most effective solution for chronic yard drainage problems.' },
            { label: '🏠 Downspout Rules', desc: 'Minimum 6ft extension from foundation. Underground piped to daylight is ideal. Never allow gutters to dump water at the foundation edge.' },
            { label: '🔲 Window Well Drains', desc: 'Any below-grade window well must have a drain connected to a French drain or daylight. Failure here causes direct water intrusion.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🌧️ Drainage Solution Finder</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>My drainage problem is:</label>
          <select value={problem} onChange={(e) => setProblem(e.target.value)}
            style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, marginBottom: 16 }}>
            <option value="">Select your problem...</option>
            <option value="pooling">Water pools against foundation after rain</option>
            <option value="gutters">Downspouts dump too close to house</option>
            <option value="french_drain">Chronic wet area in yard year-round</option>
            <option value="window_well">Water in window wells</option>
            <option value="sump">Water entering foundation / basement area</option>
            <option value="slope">Yard slopes toward house from neighbors</option>
          </select>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Solution: {result.solution}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10 }}>{result.detail}</div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ background: '#112240', padding: '4px 12px', borderRadius: 4, fontSize: 13, color: '#94a3b8' }}>💰 {result.cost}</div>
                <div style={{ background: '#112240', padding: '4px 12px', borderRadius: 4, fontSize: 13, color: '#94a3b8' }}>🔧 {result.diy ? 'DIY Possible' : 'Pro Required'}</div>
                <div style={{ background: '#112240', padding: '4px 12px', borderRadius: 4, fontSize: 13, color: '#94a3b8' }}>⏱️ {result.urgency}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 8, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get Drainage & Foundation Quotes</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with vetted DFW drainage and foundation specialists. 3 quotes, free, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
