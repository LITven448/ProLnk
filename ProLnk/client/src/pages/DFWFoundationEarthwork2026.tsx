import { useState } from 'react';

const issues = [
  { issue: 'Water pooling against foundation after rain', emoji: '💧', cause: 'Negative grade — soil slopes toward house. DFW clay holds water and expands directly against foundation.', solution: 'Add soil to create 6-inch drop over first 10 feet away from house. Use non-expansive fill dirt, not DFW clay.', urgency: 'High' },
  { issue: 'Foundation cracks appearing after dry summer', emoji: '🌵', cause: 'Extreme moisture loss in DFW clay causes soil shrinkage and foundation settlement. Grade alone won\’t fix active settlement.', solution: 'Maintain consistent soil moisture with soaker hoses during drought. Regrade after soil stabilizes.', urgency: 'High' },
  { issue: 'Settling visible after landscaping work', emoji: '🌱', cause: 'New soil placed against house compacts over time. DFW annual cycle of wet/dry seasons accelerates settling.', solution: 'Expect annual touchup of grading — especially first 3 years after new landscaping or foundation work.', urgency: 'Medium' },
  { issue: 'Soil added above brick weep holes', emoji: '🧱', cause: 'Weep holes allow moisture to escape brick cavity. Burying them causes moisture to wick into wall, rot framing, and create mold.', solution: 'Never add soil above weep holes. Weep holes must remain exposed. Regrade using gravel or mulch below hole level.', urgency: 'Critical' },
  { issue: 'French drain or swale needed', emoji: '🏞️', cause: 'Some DFW lots have grading challenges that soil alone can\’t fix — neighboring runoff, low-lying yards, or caliche layers below.', solution: 'Hire a grading contractor for French drain installation. Budget $2,000–$6,000 depending on scope and linear feet.', urgency: 'Varies' },
];

export default function DFWFoundationEarthwork2026() {
  const [selected, setSelected] = useState<number | null>(null);

  const urgencyColor = (u: string) => u === 'Critical' ? '#f87171' : u === 'High' ? '#fb923c' : u === 'Medium' ? '#facc15' : '#94a3b8';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK · DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌍 DFW Earthwork & Grading Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 20 }}>Proper grading is the cheapest foundation protection you can buy — and the most overlooked in DFW.</p>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📐 The DFW Standard: 6 Inches in 10 Feet</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Grade should drop a minimum of 6 inches over the first 10 feet away from your foundation. This ensures water flows away — not toward — your slab in DFW rain events.</div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Select Your Grading Issue</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {issues.map((item, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#0f2235', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700 }}>{item.emoji} {item.issue}</div>
                <div style={{ color: urgencyColor(item.urgency), fontSize: 12, fontWeight: 700, background: '#0A1628', padding: '2px 8px', borderRadius: 6 }}>{item.urgency}</div>
              </div>
              {selected === i && (
                <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                  <div style={{ color: '#cbd5e1', fontSize: 13 }}><strong>Cause:</strong> {item.cause}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginTop: 8 }}>✅ {item.solution}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📅 Annual Grading Touchup Schedule for DFW</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Best time to regrade: Late fall after summer shrink-swell cycle. DFW soil settles most dramatically August–October. Add fill and compact before November rains.</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏠 Match with a DFW Grading Contractor</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>ProLnk connects DFW homeowners with vetted grading and foundation drainage pros.</div>
        </div>
      </div>
    </div>
  );
}