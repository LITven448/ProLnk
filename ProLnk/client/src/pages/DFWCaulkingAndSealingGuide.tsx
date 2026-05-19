import { useState } from 'react';

const caulkTypes = [
  { type: 'Silicone', bestFor: 'Bathtubs, showers, glass, metal', lifespan: '20+ years', dfwNote: 'Best for DFW heat — stays flexible, won\’t crack', paintable: false, cost: '$5–$15/tube' },
  { type: 'Latex / Acrylic', bestFor: 'Interior trim, baseboards, drywall gaps', lifespan: '5–10 years', dfwNote: 'Easy to apply, paintable, but fails faster in DFW heat', paintable: true, cost: '$3–$8/tube' },
  { type: 'Polyurethane', bestFor: 'Exterior siding, masonry, foundations', lifespan: '10–20 years', dfwNote: 'Best for exterior DFW applications — handles temp swings', paintable: true, cost: '$8–$20/tube' },
  { type: 'Butyl Rubber', bestFor: 'Gutters, flashing, rooflines', lifespan: '10–15 years', dfwNote: 'Waterproof — ideal for DFW storm season applications', paintable: false, cost: '$6–$12/tube' },
  { type: 'Foam Sealant', bestFor: 'Large gaps, pipe penetrations, attic', lifespan: '10–20 years', dfwNote: 'Stops conditioned air loss in DFW summers — big energy impact', paintable: true, cost: '$5–$12/can' },
];

const locations = [
  { area: 'Windows (exterior frame)', priority: 'High', frequency: 'Every 3–5 years', dfwReason: 'DFW heat degrades caulk around frames fast' },
  { area: 'Exterior doors', priority: 'High', frequency: 'Every 3–5 years', dfwReason: 'Door frames shrink and gap in DFW summers' },
  { area: 'Bathtub / shower surround', priority: 'High', frequency: 'Every 5–7 years', dfwReason: 'Mold risk in DFW humidity — use silicone only' },
  { area: 'Kitchen backsplash / countertop', priority: 'Medium', frequency: 'Every 7–10 years', dfwReason: 'Protects against water intrusion behind tile' },
  { area: 'Exterior siding joints', priority: 'High', frequency: 'Every 5–8 years', dfwReason: 'UV and heat cause siding caulk to crack quickly' },
  { area: 'Foundation-to-siding gap', priority: 'Critical', frequency: 'Every 5 years', dfwReason: 'DFW clay movement widens this gap — pest and water entry' },
  { area: 'HVAC penetrations (exterior)', priority: 'High', frequency: 'Every 5–7 years', dfwReason: 'Conditioned air loss — major DFW energy cost driver' },
  { area: 'Attic hatch / recessed lights', priority: 'Medium', frequency: 'Every 10 years', dfwReason: 'Air sealing reduces DFW summer cooling load' },
];

export default function DFWCaulkingAndSealingGuide() {
  const [windows, setWindows] = useState(15);
  const [homeSqft, setHomeSqft] = useState(2000);

  const laborCost = Math.round((windows * 18) + (homeSqft * 0.04));
  const materialCost = Math.round((windows * 6) + (homeSqft * 0.015));
  const totalLow = Math.round(laborCost * 0.8 + materialCost);
  const totalHigh = Math.round(laborCost * 1.3 + materialCost);
  const annualSavings = Math.round(homeSqft * 0.06 + windows * 4);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOME IMPROVEMENT GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
          Caulking &amp; Weathersealing Cost Guide
        </h1>
        <p style={{ color: '#A0ADBF', fontSize: 16, marginBottom: 36 }}>
          Dallas–Fort Worth 2026 guide to caulking windows, doors, bathtubs, and siding — DFW heat effects, caulk types, re-caulking frequency, and energy savings from proper sealing.
        </p>

        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>🌡️ Why DFW Heat Destroys Caulk Faster</div>
          <p style={{ color: '#C8D4E8', margin: 0, lineHeight: 1.6 }}>
            DFW exterior surfaces can reach 160°F+ in summer. Standard latex caulk becomes brittle and cracks within 3–5 years in DFW conditions — half the lifespan seen in cooler climates. South and west-facing surfaces fail first. Use UV-resistant silicone or polyurethane for all DFW exterior applications.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🗂️ Where to Caulk in a DFW Home</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
          {locations.map((loc, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 16, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: 12, alignItems: 'center' }}>
              <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: 13 }}>{loc.area}</div>
              <div>
                <span style={{ backgroundColor: loc.priority === 'Critical' ? '#EF4444' : loc.priority === 'High' ? '#F59E0B' : '#3B82F6', color: '#FFFFFF', fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>{loc.priority}</span>
              </div>
              <div style={{ color: '#A0ADBF', fontSize: 12 }}>{loc.frequency}</div>
              <div style={{ color: '#C8D4E8', fontSize: 12 }}>{loc.dfwReason}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>🧴 Caulk Type Comparison</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 36 }}>
          {caulkTypes.map((c, i) => (
            <div key={i} style={{ backgroundColor: '#112244', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: 14, marginBottom: 4 }}>{c.type}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>{c.cost}</div>
              <div style={{ color: '#22C55E', fontSize: 11, marginBottom: 4 }}>⏳ {c.lifespan}</div>
              <div style={{ color: c.paintable ? '#22C55E' : '#EF4444', fontSize: 11, marginBottom: 8 }}>{c.paintable ? '✅ Paintable' : '⛔ Not paintable'}</div>
              <div style={{ color: '#A0ADBF', fontSize: 11, lineHeight: 1.5 }}>{c.dfwNote}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>💰 Interactive Cost Estimator</h2>
        <div style={{ backgroundColor: '#112244', borderRadius: 12, padding: 28, marginBottom: 36 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>NUMBER OF WINDOWS</label>
              <input
                type="range" min={5} max={40} value={windows}
                onChange={(e) => setWindows(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }}
              />
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{windows} windows</div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0ADBF', fontSize: 13, marginBottom: 8 }}>HOME SIZE (SQ FT)</label>
              <input
                type="range" min={1000} max={5000} step={500} value={homeSqft}
                onChange={(e) => setHomeSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }}
              />
              <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{homeSqft.toLocaleString()} sq ft</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#A0ADBF', marginBottom: 4 }}>MATERIALS</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#C8D4E8' }}>${materialCost.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#A0ADBF', marginBottom: 4 }}>TOTAL COST (DFW)</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: '#0A2B1A', borderRadius: 10, padding: 16, textAlign: 'center', border: '1px solid #22C55E' }}>
              <div style={{ fontSize: 12, color: '#A0ADBF', marginBottom: 4 }}>EST. ANNUAL ENERGY SAVINGS</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#22C55E' }}>${annualSavings}/yr</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#1A2E50', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>📅 DFW Re-Caulking Schedule</div>
          <ul style={{ color: '#C8D4E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Inspect all exterior caulk every October before DFW's mild winters</li>
            <li>Never caulk below 40°F — DFW winters rarely cause issues but check February forecasts</li>
            <li>Best application temp: 50–90°F — DFW's spring (March–May) is ideal</li>
            <li>DFW pro labor rate: $50–$90/hr for caulking work</li>
            <li>Full exterior caulk job on 2,500 sq ft DFW home: $400–$900 professionally done</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
