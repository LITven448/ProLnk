import { useState } from 'react';

const concerns = [
  { id: 'nailZone', label: 'Where exactly is the nailing zone?', guide: 'The nailing zone is the manufacturer-printed strip on each shingle — typically 1 inch above the exposure line. Nails outside this zone (too high or in the tab) void the wind warranty. DFW inspectors check this on reroof permits.' },
  { id: 'highWind', label: 'High-wind nailing pattern', guide: 'DFW standard for 130 mph wind zones: 6 nails per shingle instead of 4. Pattern: two nails each side 1 inch from edge, two nails centered. Adds ~$200–400 per square but required by many DFW municipalities.' },
  { id: 'nailLength', label: 'Nail length requirements', guide: 'Roofing nails must penetrate the deck a minimum of 3/4 inch (or full thickness for decks under 3/4 inch). Standard: 1.25-inch ring-shank on 7/16-inch OSB. Staples are not permitted in DFW under current IRC adoption.' },
  { id: 'driverIssues', label: 'Overdriven or underdriven nails', guide: 'Overdriven (head below shingle surface) = cuts fiberglass mat, loses holding power. Underdriven (head proud) = tears next shingle course, causes leaks. Both are installation defects — a DFW roofing inspector can identify both with a probe.' },
];

export default function DFWRoofingNailZone2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ProLnk DFW Roofing Series</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>DFW Shingle Nailing Zone Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 24 }}>Where and how to nail shingles in the Dallas-Fort Worth wind zone — what DFW contractors get wrong and how to check your roof.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔨 Why Nailing Zone Matters in DFW</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6, marginBottom: 10 }}>DFW sits in a high-wind region subject to severe thunderstorms and straight-line winds exceeding 70 mph. Improper nailing — outside the manufacturer nailing zone — is one of the top causes of shingle blow-off in DFW, and it voids your shingle warranty immediately.</p>
          <ul style={{ color: '#cbd5e0', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>📏 Nailing zone: printed stripe on shingle (1" above exposure line)</li>
            <li>💨 High-wind: 6 nails per shingle required in many DFW cities</li>
            <li>📐 Penetration: minimum 3/4" into deck</li>
            <li>⚠️ Overdriven or underdriven nails are installation defects</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Common DFW Contractor Mistakes</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>Speed-focused crews using pneumatic nailers frequently overdrive nails or nail in the tab area (too low). Both failures reduce wind uplift resistance significantly. After major DFW hailstorms, adjusters and inspectors commonly find improper nailing as a contributing factor in claims.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Interactive: Roofing Concern → Nailing Zone Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642' : '#1a3a5c', color: selected === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {c.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Your Nailing Guide:</p>
              <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Find a Verified DFW Roofer</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted roofers who follow proper nailing specs. Free quotes, no pressure.</p>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}