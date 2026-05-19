import { useState } from 'react';

export default function HomeInspectionCostGuide() {
  const [sqft, setSqft] = useState(2500);
  const [yearBuilt, setYearBuilt] = useState(2000);
  const [hasPool, setHasPool] = useState(false);
  const [wantFoundation, setWantFoundation] = useState(true);
  const [wantSewer, setWantSewer] = useState(false);
  const [wantRoof, setWantRoof] = useState(false);

  const baseInspection = sqft >= 4000 ? 650 : sqft >= 3000 ? 500 : 425;
  const ageSurcharge = yearBuilt < 1960 ? 150 : yearBuilt < 1990 ? 75 : 0;
  const foundationCost = wantFoundation ? 475 : 0;
  const sewerCost = wantSewer ? 325 : 0;
  const poolCost = hasPool ? 225 : 0;
  const roofCost = wantRoof ? 275 : 0;
  const total = baseInspection + ageSurcharge + foundationCost + sewerCost + poolCost + roofCost;

  const preYear = Number(yearBuilt);
  const recommendSewer = preYear < 2000;
  const recommendFoundation = true;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif', paddingBottom: 80 }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a2e1a, #0f172a)', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, color: '#f1f5f9', margin: '0 0 16px' }}>
          DFW Home Inspection Cost Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
          What You'll Pay and What You’ll Get
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* Base Costs */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#4ade80', margin: '0 0 20px' }}>📋 Standard Inspection Costs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Basic general inspection (2,000–3,000 sqft)', cost: '$350–550′ },
              { label: 'Large home (4,000+ sqft)', cost: '$550–750′ },
              { label: 'Older home (pre-1960)', cost: '+$100–200′ },
              { label: 'Condo inspection', cost: '$250–400′ },
              { label: 'New construction', cost: '$350–500′ },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', borderRadius: 10, padding: '14px 20px' }}>
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{item.label}</span>
                <span style={{ color: '#4ade80', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 16 }}>{item.cost}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' }}>➕ Add-On Inspections</h2>
          <p style={{ color: '#64748b', margin: '0 0 20px', fontSize: 14 }}>Recommended additions depending on your home</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '🏗️', label: 'Foundation elevation survey', cost: '$350–600', note: 'Critical in DFW — expansive clay soil' },
              { icon: '🚿', label: 'Sewer camera scope', cost: '$250–400', note: 'Recommended for pre-2000 DFW homes' },
              { icon: '🏊', label: 'Pool / spa inspection', cost: '$150–300', note: 'Separate from general inspection' },
              { icon: '🏠', label: 'Roof specialist', cost: '$150–400', note: 'When inspector won’t walk the roof' },
              { icon: '💧', label: 'Sprinkler system', cost: '$100–200', note: 'Optional but common in DFW' },
              { icon: '🐛', label: 'Wood-destroying insects (termites)', cost: '$75–150', note: 'Often included in general inspection' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0f172a', borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{item.label}</span>
                    <span style={{ color: '#4ade80', fontWeight: 700 }}>{item.cost}</span>
                  </div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Recommended */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 20px' }}>💰 Total Recommended Budget — DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { home: '🆕 Newer home (2010+)', range: '$400–600', detail: 'General inspection only' },
              { home: '🏡 Average DFW home', range: '$700–1,100', detail: 'General + foundation survey' },
              { home: '🏚️ Pre-1990 DFW home', range: '$900–1,500', detail: 'Add sewer scope + roof specialist' },
            ].map(item => (
              <div key={item.home} style={{ background: '#0f172a', borderRadius: 12, padding: '20px 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{item.home}</div>
                  <div style={{ color: '#64748b', fontSize: 14 }}>{item.detail}</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#4ade80′ }}>{item.range}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Finding an Inspector */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', margin: '0 0 14px' }}>✅ What Makes a Good DFW Inspector</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 2, margin: 0, paddingLeft: 20 }}>
            <li>TREC licensed (required in Texas)</li>
            <li>InterNACHI or ASHI certified (voluntary — shows commitment)</li>
            <li>500+ inspections completed</li>
            <li>Provides photo-rich report (not a checklist)</li>
            <li>Takes 2.5–3 hours for an average DFW home — if they're done in 90 min, walk away</li>
          </ul>
        </div>

        {/* Interactive Estimator */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' }}>🧮 Your Inspection Budget Estimator</h2>
          <p style={{ color: '#64748b', margin: '0 0 28px', fontSize: 14 }}>Customize your home details to get a tailored estimate</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
                Home size: <span style={{ color: '#4ade80′ }}>{sqft.toLocaleString()} sqft</span>
              </label>
              <input type="range" min={800} max={6000} step={100} value={sqft} onChange={e => setSqft(Number(e.target.value))} style={{ width: '100%', accentColor: '#4ade80′ }} />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>
                Year built: <span style={{ color: '#4ade80′ }}>{yearBuilt}</span>
              </label>
              <input type="range" min={1920} max={2025} value={yearBuilt} onChange={e => setYearBuilt(Number(e.target.value))} style={{ width: '100%', accentColor: '#4ade80′ }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: '🏊 Has pool or spa', value: hasPool, set: setHasPool },
                { label: '🏗️ Foundation elevation survey', value: wantFoundation, set: setWantFoundation, recommended: recommendFoundation },
                { label: '🚿 Sewer camera scope', value: wantSewer, set: setWantSewer, recommended: recommendSewer },
                { label: '🏠 Dedicated roof specialist', value: wantRoof, set: setWantRoof },
              ].map(item => (
                <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: '#0f172a', borderRadius: 10, padding: '14px 18px' }}>
                  <input type="checkbox" checked={item.value} onChange={e => item.set(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#4ade80', flexShrink: 0 }} />
                  <span style={{ color: '#cbd5e1', fontSize: 15 }}>{item.label}</span>
                  {item.recommended && <span style={{ background: '#166534', color: '#4ade80', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>RECOMMENDED</span>}
                </label>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #166534, #14532d)', borderRadius: 14, padding: '24px 28px', textAlign: 'center', marginTop: 8 }}>
              <div style={{ color: '#86efac', fontSize: 14, marginBottom: 6 }}>Estimated Total</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#4ade80′ }}>${total.toLocaleString()}</div>
              <div style={{ color: '#86efac', fontSize: 13, marginTop: 6 }}>Midpoint estimate — actual bids may vary ±15%</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Need a vetted DFW inspector? We connect you with certified professionals.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#4ade80', color: '#0f172a', fontWeight: 800, padding: '16px 40px', borderRadius: 12, textDecoration: 'none', fontSize: 18 }}>
            Find an Inspector →
          </a>
        </div>
      </div>
    </div>
  );
}
