import { useState } from 'react';

const sizes = ['Under 800 sq ft', '800-1000 sq ft', '1000-1200 sq ft', '1200-1500 sq ft'];
const situations = ['Standard DFW summer heat', 'High humidity issues', 'Uneven cooling', 'High energy bills'];

const recommendations: Record<string, Record<string, string>> = {
  'Under 800 sq ft': {
    'Standard DFW summer heat': 'A single 1-ton mini-split (12,000 BTU) is ideal. Central systems are almost always oversized for this footprint in DFW.',
    'High humidity issues': 'Mini-split with dehumidification mode. Central 1.5-ton units short-cycle constantly in <800 sq ft, guaranteeing humidity problems.',
    'Uneven cooling': 'Two mini-split heads (bedroom + living area) gives perfect zoned control with zero ductwork losses.',
    'High energy bills': 'Replace oversized central unit with 1-ton mini-split. SEER2 25+ units cut bills 40-60% in small DFW homes.',
  },
  '800-1000 sq ft': {
    'Standard DFW summer heat': '1.5-ton central system or single large mini-split (18,000 BTU). Manual J load calc is non-negotiable.',
    'High humidity issues': 'Verify your existing unit is not oversized. DFW humidity + short-cycling = mold risk. Downsize if needed.',
    'Uneven cooling': 'Check duct sizing — small homes often have oversized ducts creating poor velocity. Mini-split avoids this entirely.',
    'High energy bills': '1.5-ton 18 SEER2+ unit. Avoid going to 2-ton — every 6 months of short-cycling costs you more than you save.',
  },
  '1000-1200 sq ft': {
    'Standard DFW summer heat': '1.5 to 2-ton depending on insulation, windows, and orientation. Get a Manual J — do not guess in DFW.',
    'High humidity issues': 'If current unit is 2.5+ tons, oversizing is your problem. Downsize and add whole-home dehumidifier if needed.',
    'Uneven cooling': 'Zoning with 2-head mini-split system or properly balanced ductwork. DFW afternoon west-sun rooms need attention.',
    'High energy bills': 'Target 16+ SEER2. Seal duct leaks first — DFW homes commonly lose 25-30% through leaky attic ducts.',
  },
  '1200-1500 sq ft': {
    'Standard DFW summer heat': '2-ton central system typically correct. Some well-insulated 1400 sq ft homes work fine with 1.5-ton.',
    'High humidity issues': '2-ton short-cycles less than smaller units but still possible. Verify runtime is 15-20 min cycles minimum.',
    'Uneven cooling': 'Add a mini-split to problem rooms rather than upsizing whole system. Attic ductwork in DFW is always a heat source.',
    'High energy bills': 'At 1200-1500 sq ft, duct sealing and attic insulation (R-38+) will outperform unit upgrade in DFW climate.',
  },
};

export default function DFWHVACSmallHomeGuide() {
  const [size, setSize] = useState('');
  const [situation, setSituation] = useState('');

  const result = size && situation ? recommendations[size]?.[situation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Small Homes Under 1,500 Sq Ft</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 32, lineHeight: 1.7 }}>
          Oversizing is the #1 HVAC mistake in small DFW homes. A system that's too large short-cycles, drives up humidity, and costs more to run. In DFW’s humid subtropical climate, right-sizing is not optional — it’s critical for comfort and home health.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 28, fontSize: 14, fontWeight: 600 }}>
          ⚡ DFW Fact: A 2-ton unit in a 900 sq ft home will short-cycle every 4-6 minutes on mild days, causing relative humidity to climb above 65% — mold territory.
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏠 Get Your Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>HOME SIZE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sizes.map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: size === s ? '#F5E642′ : '#1e3a5f', background: size === s ? '#F5E642' : ’transparent', color: size === s ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>YOUR SITUATION</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSituation(s)} style={{ padding: '8px 16px', borderRadius: 6, border: '2px solid', borderColor: situation === s ? '#F5E642′ : '#1e3a5f', background: situation === s ? '#F5E642' : ’transparent', color: situation === s ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Recommendation</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{result}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[['🌡️', 'Manual J Load Calc', 'Required before any install in DFW. $150-400 and saves thousands.'],['💨', 'Mini-Split Advantage', 'No duct losses, true zoning, better humidity control in small spaces.'],['🔋', 'SEER2 Target', '18+ SEER2 for small DFW homes pays back in 3-4 years.'],['📏', 'Never Guess Size', "Rule of thumb sizing is wrong 70% of the time in DFW's variable climate."]].map(([icon, title, desc]) => (
            <div key={title} style={{ background: '#0f1f3d', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📞 Get a ProLnk Quote</div>
          <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Connect with DFW HVAC pros who specialize in right-sizing small homes. Free quotes, verified contractors.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
