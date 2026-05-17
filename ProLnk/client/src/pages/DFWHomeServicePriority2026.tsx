import { useState } from 'react';

export default function DFWHomeServicePriority2026() {
  const [need1, setNeed1] = useState('');
  const [need2, setNeed2] = useState('');

  const priorities: Record<string, { level: number; label: string; color: string; reason: string }> = {
    co_smoke: { level: 1, label: 'Safety', color: '#fc8181', reason: 'CO and smoke detector failures are life-safety emergencies. Fix today — $30-80 DIY or $75-150 pro. No other need takes priority.' },
    electrical_safety: { level: 1, label: 'Safety', color: '#fc8181', reason: 'Sparking outlets, burning smell, tripping breakers = fire risk. Fix immediately. DFW homes with aluminum wiring (1960s-70s) are especially at risk.' },
    hvac_summer: { level: 2, label: 'Habitability', color: '#f6ad55', reason: 'DFW summers are life-threatening for elderly, children, and pets without HVAC. A failed AC in July is a habitability emergency. Fix within 24-48 hours. Most DFW HVAC companies offer same-day emergency service.' },
    plumbing_active: { level: 2, label: 'Habitability', color: '#f6ad55', reason: 'Active water leak or sewage backup = habitability emergency. Water damage compounds every hour. Turn off water main, call plumber same day. Slab leaks in DFW clay soils cause rapid foundation movement.' },
    foundation: { level: 3, label: 'Structural', color: '#F5E642', reason: 'Foundation movement in DFW is slow (months to years) but cumulative. Address within 30-90 days of diagnosis. Delaying 6-12 months rarely causes catastrophic failure but adds repair cost. Get 3 bids and a soil report before acting.' },
    roof: { level: 3, label: 'Structural', color: '#F5E642', reason: 'Active roof leak = act within days (tarp immediately, repair within 2 weeks). No active leak = schedule within 30-60 days. DFW hail season (March-June) creates backlogs — book early. A compromised roof accelerates foundation problems via soil saturation.' },
    hvac_comfort: { level: 4, label: 'Comfort/Cosmetic', color: '#68d391', reason: 'HVAC running but not optimal (uneven temps, humidity) — schedule within 30-60 days. Not an emergency. Get tune-up and duct inspection first before investing in new equipment.' },
    cosmetic: { level: 4, label: 'Cosmetic', color: '#68d391', reason: 'Paint, flooring, landscaping, kitchen updates — schedule when safety, habitability, and structural needs are met. These add value but do not protect your home or family.' },
  };

  const getPriority = () => {
    if (!need1 || !need2) return null;
    const p1 = priorities[need1];
    const p2 = priorities[need2];
    if (!p1 || !p2) return null;
    const first = p1.level <= p2.level ? p1 : p2;
    const second = p1.level <= p2.level ? p2 : p1;
    const firstName = p1.level <= p2.level ? need1 : need2;
    const secondName = p1.level <= p2.level ? need2 : need1;
    return { first, second, firstName, secondName };
  };

  const result = getPriority();

  const needOptions = [
    { value: 'co_smoke', label: 'CO/Smoke detector issue' },
    { value: 'electrical_safety', label: 'Electrical safety concern' },
    { value: 'hvac_summer', label: 'AC failed (DFW summer)' },
    { value: 'plumbing_active', label: 'Active water leak / sewage' },
    { value: 'foundation', label: 'Foundation movement diagnosed' },
    { value: 'roof', label: 'Roof damage / leak' },
    { value: 'hvac_comfort', label: 'HVAC comfort issue (not failed)' },
    { value: 'cosmetic', label: 'Cosmetic update' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 4 }}>🎯</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Home Service Priority Matrix 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 28 }}>The definitive DFW priority guide when you have competing home service needs and a limited budget.</p>

        {[
          { level: 'Level 1 — Safety First', color: '#fc8181', emoji: '🚨', desc: 'CO/smoke, electrical safety. Fix today. No other need comes first.' },
          { level: 'Level 2 — Habitability', color: '#f6ad55', emoji: '⚡', desc: 'Failed AC in DFW summer, active water leak. Fix within 24-48 hours.' },
          { level: 'Level 3 — Structural', color: '#F5E642', emoji: '🏗️', desc: 'Foundation, roof. Address within 30-90 days. Delays add cost, rarely cause immediate failure.' },
          { level: 'Level 4 — Comfort & Cosmetic', color: '#68d391', emoji: '🎨', desc: 'Non-critical HVAC, updates, aesthetics. Schedule after 1-3 are handled.' },
        ].map(item => (
          <div key={item.level} style={{ background: '#112240', borderRadius: 10, padding: '14px 18px', marginBottom: 10, borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.emoji} {item.level}</div>
            <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.desc}</div>
          </div>
        ))}

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px', marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚖️ Compare Two Competing Needs</h2>
          <label style={{ color: '#a0aec0', fontSize: 14 }}>First Need</label>
          <select value={need1} onChange={e => setNeed1(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, marginBottom: 16, padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
            <option value="">Select first need...</option>
            {needOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <label style={{ color: '#a0aec0', fontSize: 14 }}>Second Need</label>
          <select value={need2} onChange={e => setNeed2(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, marginBottom: 20, padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
            <option value="">Select second need...</option>
            {needOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px', marginBottom: 12, borderLeft: `4px solid ${result.first.color}` }}>
                <div style={{ fontWeight: 700, color: result.first.color, marginBottom: 6 }}>✅ DO THIS FIRST — {result.first.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.first.reason}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px', borderLeft: `4px solid ${result.second.color}` }}>
                <div style={{ fontWeight: 700, color: result.second.color, marginBottom: 6 }}>🔜 THEN ADDRESS — {result.second.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.second.reason}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 10, padding: '16px 20px' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 ProLnk</span>
          <span style={{ color: '#a0aec0', marginLeft: 8 }}>connects DFW homeowners with the right pro for every priority level — from emergency AC repair to cosmetic updates.</span>
        </div>
      </div>
    </div>
  );
}
