import { useState } from 'react';

const homeStyles = ['Traditional / Colonial', 'Ranch / Single Story', 'Modern / Contemporary', 'Craftsman / Bungalow', 'Mediterranean / Spanish', 'Two-Story / Colonial'];
const hoaStatuses = ['No HOA', 'HOA - Permissive (any lights OK)', 'HOA - Moderate (white/warm only)', 'HOA - Strict (limited dates/colors)'];

type Strategy = {
  approach: string;
  power: string;
  led: string;
  gfci: string;
  smart: string;
  timing: string;
  hoaNote: string;
};

const strategies: Record<string, Record<string, Strategy>> = {
  'Traditional / Colonial': {
    'No HOA': { approach: 'Classic C7/C9 roofline + wreath accents on every window', power: '4–6 circuits, 15A each (720W per circuit max)', led: 'LED C7/C9 warm white (2700K) — 80% less power than incandescent', gfci: 'All outdoor outlets must be GFCI — add weatherproof covers to existing outlets', smart: 'Kasa or TP-Link outdoor smart plug for each circuit — schedule via app', timing: 'DFW Dec averages 55°F — enjoy outdoor light shows! Standard: 5pm–11pm', hoaNote: 'No restrictions — go full roofline + windows + garland' },
    'HOA - Strict (limited dates/colors)': { approach: 'Warm white only roofline, minimal window accents within HOA window', power: '2–3 circuits (keep under 500W total for modest display)', led: 'Warm white LED only (2700–3000K) — HOA-safe and energy efficient', gfci: 'GFCI required regardless of HOA rules — code requirement in DFW', smart: 'Smart plug with HOA-compliant schedule hard-coded', timing: 'Check HOA CC&Rs — most DFW HOAs allow Dec 1–Jan 5, off by 11pm', hoaNote: 'Document HOA approval dates before purchasing — violators fined in many Collin/Denton HOAs' },
    'HOA - Permissive (any lights OK)': { approach: 'Full roofline, window framing, door garland, and lawn stakes', power: '5–7 circuits — plan 1 circuit per 150 linear feet of lights', led: 'Multi-color LED or warm white — your choice, all energy efficient', gfci: 'GFCI on all outdoor outlets — electrician install if not existing', smart: 'Smart plugs + sunrise/sunset scheduling for hands-free operation', timing: 'DFW warm Dec means comfortable install even on Christmas Eve — schedule freely', hoaNote: 'Permissive HOA — still check for any noise/timing ordinances from city' },
    'HOA - Moderate (white/warm only)': { approach: 'Elegant warm white roofline + window candles', power: '3–4 circuits, focus on quality over quantity', led: 'Warm white 2700K LED throughout — HOA compliant and beautiful', gfci: 'GFCI required — upgrade outlets if needed (~$150/outlet)', smart: 'Smart plug per circuit for automated on/off scheduling', timing: 'Moderate HOAs usually allow Dec 1–Jan 10 in DFW', hoaNote: 'White/warm only HOAs love warm 2700K LED — universally approved' },
  },
};

const fallback: Strategy = {
  approach: 'LED roofline + accent lighting sized to your home’s linear footage',
  power: '1 circuit per 150 linear feet — plan 15A circuits with GFCI protection',
  led: 'LED saves 80% vs incandescent — DFW warm winters make outdoor lighting very enjoyable',
  gfci: 'All outdoor outlets require GFCI protection per NEC code (enforced in DFW)',
  smart: 'Smart outdoor plugs allow phone-controlled scheduling — set once and forget',
  timing: 'DFW December averages 50–70°F — ideal for outdoor holiday lighting enjoyment',
  hoaNote: 'Review CC&Rs before purchasing — many DFW HOAs have specific color/date rules',
};

export default function DFWHolidayStringLightGuide() {
  const [homeStyle, setHomeStyle] = useState('');
  const [hoaStatus, setHoaStatus] = useState('');

  const result = homeStyle && hoaStatus
    ? (strategies[homeStyle]?.[hoaStatus] ?? fallback)
    : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2A40 100%)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🎄</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Holiday String Light Guide</h1>
        <p style={{ color: '#A0B0C8', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>DFW December averages 50–70°F — perfect weather for outdoor holiday lighting. Get the right setup for your home, HOA, and power capacity.</p>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '32px 0 20px' }}>
          {[
            { icon: '🌡️', title: 'DFW Dec Temps', desc: '50–70°F avg — enjoy outdoor lights without freezing' },
            { icon: '⚡', title: 'GFCI Required', desc: 'All outdoor outlets must be GFCI — NEC code in DFW' },
            { icon: '💡', title: 'LED = Smart', desc: 'LED uses 80% less power — run more lights per circuit' },
            { icon: '📱', title: 'Smart Plugs', desc: 'Schedule via phone — no timers to set manually' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: '#112240', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#A0B0C8', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>🏠 Get Your DFW Lighting Strategy</h2>
          {[
            { label: 'Home Style', value: homeStyle, setter: setHomeStyle, options: homeStyles },
            { label: 'HOA Status', value: hoaStatus, setter: setHoaStatus, options: hoaStatuses },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#A0B0C8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8E8E8', border: '1px solid #2A4A6F', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, border: '2px solid #F5E642′ }}>
              {[
                { label: '🎄 Approach', value: result.approach },
                { label: '⚡ Power Planning', value: result.power },
                { label: '💡 LED Recommendation', value: result.led },
                { label: '🔌 GFCI Requirements', value: result.gfci },
                { label: '📱 Smart Controls', value: result.smart },
                { label: '⏰ DFW Timing', value: result.timing },
                { label: '🏘️ HOA Note', value: result.hoaNote },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#C0D0E0', fontSize: 14, lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
