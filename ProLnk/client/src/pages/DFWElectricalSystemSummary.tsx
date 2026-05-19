import { useState } from 'react';

const PANEL_ERAS: Record<string, { panel: string; risk: string; action: string }> = {
  'pre-1960': { panel: 'Fuse box or early breaker — likely 60A service', risk: 'Severely undersized for modern DFW loads. Dangerous fuse tampering common. Knob-and-tube wiring possible.', action: 'Full service upgrade to 200A essential — budget $3K–$6K' },
  '1960–1985': { panel: 'Federal Pacific or Zinsco panels common — 100–150A', risk: 'Federal Pacific Stab-Lok breakers fail to trip — #1 fire hazard. Zinsco buses corrode and arc. Both are banned by many insurers.', action: 'Panel replacement immediately if FPE or Zinsco — not optional' },
  '1985–2000': { panel: 'Square D QO or Eaton BR — 150–200A', risk: 'Generally safe but undersized for EV charging + pool + 4-ton HVAC typical of DFW. Double-tapped breakers common.', action: 'Audit for double-taps and add 50A EV circuit if adding charger' },
  '2000–2015': { panel: '200A main panel — Square D or Siemens', risk: 'Adequate for most loads. GFCI in wet areas may be aging. AFCI not required in this era — bedrooms lack arc fault protection.', action: 'Add AFCI breakers to bedrooms, GFCI audit all wet locations' },
  '2015–present': { panel: '200A+ with tandem breakers and AFCI/GFCI combo', risk: 'Lowest risk — meets current NEC. May need 400A service upgrade if adding solar, EV Level 2, pool, and full HVAC simultaneously.', action: 'Plan 400A service upgrade before adding high-load systems' },
};

const DFW_CITIES = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland'];

export default function DFWElectricalSystemSummary() {
  const [vintage, setVintage] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eraKey = Object.keys(PANEL_ERAS).find(k => {
    if (!vintage) return false;
    const yr = parseInt(vintage);
    if (k === 'pre-1960') return yr < 1960;
    if (k === '1960–1985') return yr >= 1960 && yr <= 1985;
    if (k === '1985–2000') return yr > 1985 && yr <= 2000;
    if (k === '2000–2015') return yr > 2000 && yr <= 2015;
    if (k === '2015–present') return yr > 2015;
    return false;
  });

  const era = eraKey ? PANEL_ERAS[eraKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 28 }}>⚡</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Electrical System Summary 2026</h1>
          <p style={{ color: '#8B9BB4', margin: 0 }}>Panel sizing, dangerous brands, GFCI/AFCI requirements, and DFW-specific electrical risks.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔌', title: 'DFW Load Reality 2026', body: 'Avg DFW home now runs: 4-5 ton HVAC, EV charger (48A), pool pump (20A), and smart home loads. Most pre-2000 panels are 100–150A — 30% undersized for modern life.' },
            { icon: '🚨', title: 'Dangerous Panel Brands', body: 'Federal Pacific (Stab-Lok) and Zinsco panels are in ~15% of DFW homes built 1960–1985. Breakers fail to trip under overload. Most homeowner policies now exclude or surcharge these.' },
            { icon: '☀️', title: 'UV Degradation', body: 'DFW averages 234 sunny days. Exterior conduit, weather heads, and meter bases degrade faster than northern climates. NEMA 3R enclosures required; inspect every 10 years.' },
            { icon: '🛡️', title: 'GFCI + AFCI Requirements', body: 'DFW cities require GFCI in kitchens, baths, garage, exterior, and crawl spaces. AFCI required in all bedrooms since 2014 NEC. Most 1985–2014 homes are non-compliant.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2140', borderRadius: 10, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#A8B8CC', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 18 }}>🏠 Personalized Electrical Summary</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <input placeholder="Home build year (e.g. 1972)" value={vintage} onChange={e => setVintage(e.target.value)} style={{ flex: 1, minWidth: 180, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }} />
            <select value={city} onChange={e => setCity(e.target.value)} style={{ flex: 1, minWidth: 160, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Select DFW city</option>
              {DFW_CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={() => setSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Generate</button>
          </div>
          {submitted && era && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>Era: {eraKey} — {era.panel}</div>
              <div style={{ color: '#FF8C69', marginBottom: 6, fontSize: 14 }}>⚠️ {era.risk}</div>
              <div style={{ color: '#6EE7B7', fontSize: 14 }}>✅ {era.action}</div>
              {city && <div style={{ marginTop: 10, color: '#8B9BB4', fontSize: 13 }}>📍 {city} electrical inspections follow NEC 2023. Permits are required for panel upgrades and new circuits. ProLnk electricians carry TDLR licensing and $2M liability.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🤝 ProLnk Electrical Partners</div>
          <p style={{ color: '#8B9BB4', fontSize: 14, margin: 0 }}>All ProLnk electricians are TDLR-licensed master electricians with DFW-specific experience in panel upgrades, EV circuit installation, and whole-home GFCI/AFCI retrofits. No unlicensed handymen — ever.</p>
        </div>
      </div>
    </div>
  );
}
