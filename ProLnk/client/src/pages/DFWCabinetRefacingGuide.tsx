import { useState } from 'react';

const serviceLevels = [
  {
    name: 'Cabinet Painting',
    costSmall: 1200,
    costMedium: 2200,
    costLarge: 3500,
    timeline: '3–5 days',
    pros: 'Lowest cost, huge color change, quick turnaround',
    cons: 'Brush marks visible, chips over time, not a true refresh',
    bestFor: 'Tight budgets or selling soon',
  },
  {
    name: 'Cabinet Refacing',
    costSmall: 3500,
    costMedium: 6500,
    costLarge: 10500,
    timeline: '2–4 days',
    pros: 'New doors + drawer fronts, veneer on boxes, 50–70% cheaper than replace',
    cons: 'Box size/layout unchanged, damaged boxes disqualify',
    bestFor: 'Good box condition, want a new look without full remodel',
  },
  {
    name: 'Full Cabinet Replacement',
    costSmall: 8000,
    costMedium: 18000,
    costLarge: 35000,
    timeline: '2–6 weeks',
    pros: 'New layout, new boxes, best long-term value',
    cons: 'Highest cost, longest disruption, requires countertop replacement',
    bestFor: 'Structural damage, layout changes, full kitchen remodel',
  },
];

const kitchenSizes = ['Small (< 150 sq ft)', 'Medium (150–300 sq ft)', 'Large (300+ sq ft)'];

const humidityTips = [
  { issue: 'Swollen drawer fronts', cause: 'DFW summer humidity warps MDF doors', fix: 'Upgrade to solid wood or thermofoil on reface' },
  { issue: 'Peeling veneer', cause: 'Glue bond fails in high-humidity months', fix: 'Use moisture-resistant adhesive, seal all edges' },
  { issue: 'Warped cabinet boxes', cause: 'Particleboard soaks up moisture under sink', fix: 'Replace wet boxes before refacing — don\’t cover damage' },
  { issue: 'Paint bubbling or cracking', cause: 'Humidity + heat cycles stress latex paint', fix: 'Use oil-based primer and cabinet-grade paint' },
];

export default function DFWCabinetRefacingGuide() {
  const [kitchenSize, setKitchenSize] = useState('Medium (150–300 sq ft)');

  const sizeIndex = kitchenSizes.indexOf(kitchenSize);

  const getCost = (service: typeof serviceLevels[0]) => {
    if (sizeIndex === 0) return service.costSmall;
    if (sizeIndex === 2) return service.costLarge;
    return service.costMedium;
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOME IMPROVEMENT GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Cabinet Refacing Cost Guide
        </h1>
        <p style={{ color: '#A0ADBF', fontSize: 16, marginBottom: 36 }}>
          Dallas–Fort Worth 2026 pricing for cabinet painting, refacing, and replacement — DFW humidity effects on wood cabinets, popular finishes, and interactive cost comparison.
        </p>

        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>💧 DFW Humidity &amp; Wood Cabinets</div>
          <p style={{ color: '#C8D4E8', margin: 0, lineHeight: 1.6 }}>
            DFW kitchens experience 40–80% humidity swings year-round. MDF cabinet doors absorb moisture and swell at seams. Particleboard under-sink boxes are especially vulnerable. Before investing in refacing, inspect all boxes for water damage, swelling, and delamination. Refacing a structurally compromised cabinet box is money wasted.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>📐 Interactive: Kitchen Size → Cost Comparison</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 28, marginBottom: 36 }}>
          <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>SELECT KITCHEN SIZE</label>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
            {kitchenSizes.map((s) => (
              <button
                key={s}
                onClick={() => setKitchenSize(s)}
                style={{
                  padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  backgroundColor: kitchenSize === s ? '#F5E642′ : '#0A1628',
                  color: kitchenSize === s ? '#0A1628′ : '#C8D4E8',
                  border: `2px solid ${kitchenSize === s ? '#F5E642' : '#2A3E5C'}`
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {serviceLevels.map((svc, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: i === 1 ? '2px solid #F5E642′ : '1px solid #1A2E50' }}>
                {i === 1 && <div style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 10 }}>MOST POPULAR</div>}
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 15, marginBottom: 4 }}>{svc.name}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${getCost(svc).toLocaleString()}</div>
                <div style={{ color: '#A0ADBF', fontSize: 12, marginBottom: 12 }}>⏱ {svc.timeline}</div>
                <div style={{ color: '#22C55E', fontSize: 12, marginBottom: 4 }}>✅ {svc.pros}</div>
                <div style={{ color: '#EF4444', fontSize: 12, marginBottom: 8 }}>⚠️ {svc.cons}</div>
                <div style={{ color: '#C8D4E8', fontSize: 11, fontStyle: 'italic' }}>Best for: {svc.bestFor}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🌡️ DFW Humidity Damage: Common Issues &amp; Fixes</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {humidityTips.map((tip, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 18, display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: 16 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 13 }}>{tip.issue}</div>
              <div style={{ color: '#A0ADBF', fontSize: 12 }}>Cause: {tip.cause}</div>
              <div style={{ color: '#22C55E', fontSize: 12 }}>Fix: {tip.fix}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🎨 Popular Cabinet Finishes in DFW (2026)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 36 }}>
          {[
            { color: 'Shaker White', trend: 'Evergreen', note: 'Works in every DFW suburb style' },
            { color: 'Navy Blue', trend: 'Trending', note: 'Island + perimeter two-tone is hot in Frisco builds' },
            { color: 'Sage Green', trend: 'Rising', note: 'Earth tones popular in Southlake, Colleyville' },
            { color: 'Warm Gray', trend: 'Steady', note: 'Replaced cool gray — works with wood accents' },
            { color: 'Natural Wood', trend: 'Surging', note: 'White oak and walnut veneer on refaced doors' },
            { color: 'Black / Charcoal', trend: 'Niche', note: 'Modern farmhouse DFW kitchens' },
          ].map((f, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 13 }}>{f.color}</div>
              <div style={{ color: '#F5E642', fontSize: 11, marginTop: 2 }}>{f.trend}</div>
              <div style={{ color: '#A0ADBF', fontSize: 11, marginTop: 6, lineHeight: 1.5 }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1A2E50', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>✅ Is Refacing Right for You?</div>
          <ul style={{ color: '#C8D4E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Cabinet boxes are solid, square, and free of water damage → reface makes sense</li>
            <li>You want a new look but not a new layout → refacing is the right call</li>
            <li>Planning to sell in 1–3 years → paint or reface, skip full replace</li>
            <li>Boxes are swollen, warped, or rotted → must replace before doing anything else</li>
            <li>Get 3 quotes from DFW-local companies — pricing varies 40% between contractors</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
