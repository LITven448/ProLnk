import { useState } from 'react';

const PROJECTS = [
  { label: 'Xeriscape Front Yard (drought-tolerant)', low: 3500, high: 9000 },
  { label: 'Privacy Fence + Landscaping Combo', low: 6000, high: 16000 },
  { label: 'Sod Installation (per 1,000 sq ft)', low: 800, high: 1800 },
  { label: 'Irrigation System (full yard)', low: 2500, high: 6500 },
  { label: 'Retaining Wall (per linear ft)', low: 30, high: 75 },
  { label: 'Seasonal Color / Planting Design', low: 1200, high: 4500 },
  { label: 'Tree Trimming & Removal', low: 400, high: 2500 },
];

export default function DFWLandscaperFlowerMound() {
  const [projectIdx, setProjectIdx] = useState(0);
  const [lotSize, setLotSize] = useState(8000);
  const [wantsIrrigation, setWantsIrrigation] = useState(false);

  const proj = PROJECTS[projectIdx];
  const irrigationAdder = wantsIrrigation && projectIdx !== 3 ? 3500 : 0;
  const scaleFactor = lotSize / 8000;
  const lowEst = Math.round(proj.low * (projectIdx === 2 || projectIdx === 4 ? scaleFactor : 1) + irrigationAdder);
  const highEst = Math.round(proj.high * (projectIdx === 2 || projectIdx === 4 ? scaleFactor : 1) + irrigationAdder);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112244 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🌿</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          Flower Mound TX Landscapers
        </h1>
        <p style={{ fontSize: 20, color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>
          Beautiful Yards in DFW Heat · Xeriscape · Privacy · Irrigation
        </p>
        <p style={{ fontSize: 16, color: '#aac', maxWidth: 620, margin: '0 auto 32px' }}>
          Flower Mound is one of DFW's most affluent communities — with large lots, high HOA curb appeal
          standards, and homeowners who invest heavily in outdoor living. Between the brutal DFW summers,
          Stage 2 water restrictions, and $600K+ home values, landscaping in Flower Mound demands expertise.
          ProLnk connects you to vetted local landscapers who know this market.
        </p>
        <a
          href="/signup"
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Flower Mound Waitlist — Free
        </a>
      </div>

      {/* City Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, padding: '40px 24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { icon: '🏡', label: 'Median Home Value', value: '$615,000′ },
          { icon: '📐', label: 'Avg Lot Size', value: '10,000–20,000 sq ft' },
          { icon: '☀️', label: 'Stage 2 Restrictions', value: 'May–Oct most years' },
          { icon: '💧', label: 'Irrigation Penetration', value: '~68% of homes' },
        ].map(s => (
          <div key={s.label} style={{ background: '#112244', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Cost Calculator */}
      <div style={{ background: '#112244', borderRadius: 14, padding: '32px', maxWidth: 700, margin: '0 auto 40px', width: 'calc(100% - 48px)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 24px' }}>
          🌱 Landscaping Project Estimator
        </h2>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Project Type</label>
        <select
          value={projectIdx}
          onChange={e => setProjectIdx(Number(e.target.value))}
          style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 15, marginBottom: 20 }}
        >
          {PROJECTS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
        </select>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>
          Lot / Project Area: {lotSize.toLocaleString()} sq ft
        </label>
        <input
          type="range" min={2000} max={25000} step={500} value={lotSize}
          onChange={e => setLotSize(Number(e.target.value))}
          style={{ width: '100%', marginBottom: 20, accentColor: '#F5E642′ }}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, marginBottom: 24, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={wantsIrrigation}
            onChange={e => setWantsIrrigation(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: '#F5E642′ }}
          />
          Add Drip / Smart Irrigation System (+$2,500–$4,500)
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { label: 'Project Area', value: `${lotSize.toLocaleString()} sqft` },
            { label: 'Low Estimate', value: `$${lowEst.toLocaleString()}` },
            { label: 'High Estimate', value: `$${highEst.toLocaleString()}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#aac', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 15 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#889', marginTop: 16 }}>
          * Flower Mound permits required for retaining walls over 4 ft, large-scale grading, and irrigation
          systems over 3/4" line. ProLnk landscapers handle permitting as part of the quote.
        </p>
      </div>

      {/* Trending Projects */}
      <div style={{ padding: '0 24px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
          Top Landscaping Projects in Flower Mound
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {[
            { icon: '🌵', title: 'Xeriscape & Water-Wise', desc: "With Stage 2 restrictions hitting May through October, Flower Mound homeowners are replacing thirsty St. Augustine with native grasses, agave, and decomposed granite — cutting water bills 40–60%." },
            { icon: '🌳', title: 'Privacy Fence + Plantings', desc: "Large lots mean long fence lines. Combining cedar or iron privacy fencing with fast-growing privets, arborvitae, or Nellie R. Stevens holly is the most popular combo in Flower Mound." },
            { icon: '💧', title: 'Smart Irrigation Upgrades', desc: "Rachio and Hunter smart controllers let Flower Mound homeowners stay watering-compliant automatically. Many HOAs now require efficient systems — ProLnk landscapers install and program them." },
            { icon: '🪨', title: 'Outdoor Living Spaces', desc: "With $600K+ home values, outdoor kitchen and patio investments have ROI. Stone pavers, built-in grills, pergolas, and fire pits are top requests from Flower Mound homeowners." },
          ].map(c => (
            <div key={c.title} style={{ background: '#112244', borderRadius: 10, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#F5E642′ }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#aac', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#F5E642', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: '0 0 12px' }}>
          Get 3 Flower Mound Landscaper Quotes — Free
        </h2>
        <p style={{ color: '#0A1628', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          ProLnk is launching in Flower Mound. Join the waitlist and get matched to vetted landscapers who know DFW soil, water restrictions, and HOA requirements.
        </p>
        <a
          href="/signup"
          style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Waitlist
        </a>
      </div>

      <div style={{ background: '#071020', padding: '20px', textAlign: 'center', fontSize: 13, color: '#556′ }}>
        © 2026 ProLnk · Serving Flower Mound, TX and all of DFW · <a href="/privacy" style={{ color: '#556′ }}>Privacy</a>
      </div>
    </div>
  );
}
