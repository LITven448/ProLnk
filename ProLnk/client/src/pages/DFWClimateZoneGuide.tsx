import { useState } from 'react';

const improvements = [
  {
    type: 'Insulation',
    icon: '🧱',
    zone3a: { requirement: 'R-38 to R-60 attic; R-13 to R-20 walls', note: 'Zone 3A prioritizes cooling load over heating. Higher attic R-value critical.' },
    national: 'R-30 attic standard in Zone 4 (most of US)',
    difference: 'DFW needs 25–50% more attic insulation than national baseline due to intense solar gain June–September.',
    hvac: 'Under-insulated attics can cause HVAC to run 40% longer in summer — the single biggest energy waste in DFW homes.',
    tips: ['Spray foam attic deck seals air leaks better than batt', 'Radiant barrier on attic deck adds R-value equivalent in DFW', 'Don\’t insulate attic floor if HVAC equipment is in attic'],
  },
  {
    type: 'HVAC Sizing',
    icon: '❄️',
    zone3a: { requirement: 'Manual J required; typically 400–500 sq ft/ton', note: 'Zone 3A cooling load dominates. Oversizing is a major problem in DFW.' },
    national: 'Zone 4: ~500–600 sq ft/ton standard rule of thumb',
    difference: 'DFW homes need more cooling capacity per square foot. Oversized units short-cycle, fail to dehumidify, and wear out faster.',
    hvac: 'A properly sized 3-ton unit outperforms an oversized 4-ton in DFW — better humidity control and longer equipment life.',
    tips: ['Demand Manual J calculation, not square footage guess', 'Two-stage or variable-speed compressors handle DFW humidity better', 'Verify duct sizing matches equipment — often the real bottleneck'],
  },
  {
    type: 'Moisture Barrier',
    icon: '💧',
    zone3a: { requirement: 'Vapor retarder on warm side (exterior); Class II or III acceptable', note: 'Hot-humid climate: vapor drive is outward (outside moisture tries to enter). Different than northern climates.' },
    national: 'Cold climates: vapor barrier on interior (warm in winter). Zone 3 is opposite.',
    difference: 'Many contractors from cold-climate regions install vapor barriers incorrectly in DFW — trapping moisture inside walls.',
    hvac: 'Wrong vapor barrier placement causes mold growth within 2–3 years in DFW walls.',
    tips: ['Never use interior poly sheeting in DFW — blocks drying', 'House wrap (Tyvek) on exterior is correct for Zone 3A', 'Unvented spray foam crawl spaces outperform vented in humid climates'],
  },
  {
    type: 'Windows & Doors',
    icon: '🪟',
    zone3a: { requirement: 'ENERGY STAR: U-factor ≤ 0.30; SHGC ≤ 0.25', note: 'SHGC (solar heat gain) is primary concern in Zone 3A, not U-factor.' },
    national: 'Zone 4: U-factor ≤ 0.27 priority; SHGC less critical',
    difference: 'DFW buyers should prioritize low SHGC for south/west windows. More important than U-factor here.',
    hvac: 'Low-SHGC windows on west exposure can cut HVAC runtime 15–20% in afternoon peak hours.',
    tips: ['West/south windows: Low-E coatings designed for hot climates (not same as northern Low-E)', 'Exterior shading (overhangs, awnings) more effective than window film', 'Double-pane minimum; triple-pane rarely justified in DFW economics'],
  },
  {
    type: 'Air Sealing',
    icon: '🔒',
    zone3a: { requirement: 'ACH50 ≤ 5 (ENERGY STAR); target ≤ 3 for high performance', note: 'Air sealing in Zone 3A prevents hot humid air infiltration — major cooling load.' },
    national: 'Same ACH50 targets but leakage affects heating vs. cooling depending on zone.',
    difference: 'In DFW, every air gap lets in 95°F humid outdoor air that your HVAC must then cool and dehumidify.',
    hvac: 'Blower door test before and after sealing is the only way to verify — don\’t rely on visual inspection.',
    tips: ['Seal top plates, electrical boxes, plumbing penetrations first', 'Attic hatch must be weatherstripped and insulated — often forgotten', 'Recessed lights are major air leakers — use IC-rated airtight fixtures'],
  },
];

export default function DFWClimateZoneGuide() {
  const [impIdx, setImpIdx] = useState(0);
  const imp = improvements[impIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Guide</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0 0.75rem' }}>🗺️ Climate Zone 3A Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
            DFW is IECC Climate Zone 3A — Hot-Humid. This classification drives every building code requirement for insulation,
            HVAC sizing, moisture control, and windows. Zone 3A requirements differ significantly from national standards
            and from what contractors trained in cooler climates may expect.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: 1 }}>🌡️ What Zone 3A Means</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              { icon: '🔥', title: 'Cooling Dominated', detail: '8–9 months of cooling load vs 1–2 months of meaningful heating need' },
              { icon: '💧', title: 'High Humidity', detail: '60–75% relative humidity in summer means dehumidification is as important as cooling' },
              { icon: '☀️', title: 'High Solar Gain', detail: 'DFW receives ~230 sunny days/year — solar load through windows is a major HVAC driver' },
              { icon: '⚡', title: 'Strict Requirements', detail: 'Zone 3A has tighter SHGC, vapor management, and air sealing requirements than most of the US' },
            ].map(f => (
              <div key={f.title} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{f.icon}</span>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: 4, marginBottom: 3 }}>{f.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4 }}>{f.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, margin: '0 0 1.25rem', textTransform: 'uppercase', letterSpacing: 1 }}>🏠 Zone 3A Requirements by Improvement Type</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {improvements.map((imp2, i) => (
              <button key={imp2.type} onClick={() => setImpIdx(i)}
                style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: i === impIdx ? '2px solid #F5E642' : '2px solid #2d4a7a', background: i === impIdx ? '#F5E642' : 'transparent', color: i === impIdx ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                {imp2.icon} {imp2.type}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: '1.25rem' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem' }}>{imp.icon} {imp.type}</div>
            <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: 4 }}>ZONE 3A REQUIREMENT</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{imp.zone3a.requirement}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{imp.zone3a.note}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #475569' }}>
                <div style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.8rem', marginBottom: 4 }}>NATIONAL COMPARISON</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{imp.national}</div>
              </div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.75rem' }}><strong style={{ color: '#fff' }}>Why it differs: </strong>{imp.difference}</div>
            <div style={{ color: '#ff7e00', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>⚡ HVAC Impact: {imp.hvac}</div>
            <div style={{ borderTop: '1px solid #2d4a7a', paddingTop: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>💡 Pro Tips for Zone 3A</div>
              {imp.tips.map(t => <div key={t} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: 4 }}>• {t}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
