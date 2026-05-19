import { useState } from 'react';

export default function DFWFoundationWeeklyCheck2026() {
  const [checkResult, setCheckResult] = useState('');
  const [finding, setFinding] = useState('');
  const [guide, setGuide] = useState('');

  const actions: Record<string, string> = {
    doors_fine: 'Doors opening and closing smoothly — foundation stable this week. Log as "nominal" in ProLnk Vault. Continue Friday soil moisture check.',
    doors_stiff: 'Stiff door indicates soil moisture change. Check perimeter soil immediately — likely too dry. Water foundation 30 min per side, recheck doors in 48 hours. If persists 2 weeks, call ProLnk for evaluation.',
    cracks_none: 'No new wall cracks — great sign. Check again Wednesday. Take baseline photos of existing cracks monthly to track if they’re growing.',
    cracks_new: 'New crack found. Photograph with a coin for scale. Measure width with a ruler and record. Hairline (< 1/16 inch) = monitor weekly. Wider or horizontal = call ProLnk today.',
    soil_moist: 'Soil moisture adequate. Confirm 6-inch depth stays moist but not soggy. No watering needed this cycle. Check again Friday.',
    soil_dry: 'Soil is dry more than 6 inches down — foundation at risk of differential settlement. Water each side 20-30 minutes with soaker hose. Recheck in 24 hours. DFW clay shrinks fast in heat.',
  };

  function getGuide() {
    if (!checkResult || !finding) return;
    const key = `${checkResult}_${finding}`;
    setGuide(actions[key] || 'Complete both selections for your personalized action guide.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Foundation Weekly Check 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>5-minute weekly monitoring routine to protect your foundation investment</p>

        {[
          { day: 'Monday', task: 'Open and close all exterior doors', emoji: '🚪', note: 'Sticking = soil moisture change' },
          { day: 'Wednesday', task: 'Look for new wall cracks', emoji: '🔍', note: 'Photograph any new ones with coin for scale' },
          { day: 'Friday', task: 'Check soil perimeter moisture', emoji: '💧', note: 'Dig 6 inches — should feel moist not dry' },
          { day: 'As needed', task: 'Water foundation if soil is dry', emoji: '🌊', note: 'Soaker hose 20-30 min per side' },
          { day: 'Monthly', task: 'Log findings in ProLnk Vault', emoji: '📋', note: 'Track trends over time — patterns matter' },
        ].map((item) => (
          <div key={item.day} style={{ background: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 10, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 22, marginTop: 2 }}>{item.emoji}</span>
            <div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{item.day}</div>
              <div style={{ color: '#e2e8f0', fontSize: 15 }}>{item.task}</div>
              <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{item.note}</div>
            </div>
          </div>
        ))}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 22, marginTop: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📊 Weekly Check Result → Action Guide</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Check type</label>
            <select value={checkResult} onChange={(e) => setCheckResult(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select check</option>
              <option value="doors">Door check</option>
              <option value="cracks">Wall crack check</option>
              <option value="soil">Soil moisture check</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13 }}>Finding</label>
            <select value={finding} onChange={(e) => setFinding(e.target.value)}
              style={{ display: 'block', marginTop: 6, width: '100%', background: '#1e3a5f', color: '#fff', border: '1px solid #2d5a8e', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select finding</option>
              {checkResult === 'doors' && <><option value="fine">Opens/closes fine</option><option value="stiff">Sticking or hard to close</option></>}
              {checkResult === 'cracks' && <><option value="none">No new cracks</option><option value="new">New crack found</option></>}
              {checkResult === 'soil' && <><option value="moist">Moist at 6 inches</option><option value="dry">Dry at 6 inches</option></>}
            </select>
          </div>
          <button onClick={getGuide}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Action Guide
          </button>
          {guide && <div style={{ marginTop: 16, background: '#162d4a', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{guide}</div>}
        </div>
      </div>
    </div>
  );
}