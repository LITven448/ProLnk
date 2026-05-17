import { useState } from 'react';

const stages = [
  { id: 'just-looking', label: 'Just Browsing', icon: '👀' },
  { id: 'serious', label: 'Seriously Shopping', icon: '🏠' },
  { id: 'offer', label: 'Making an Offer', icon: '✍️' },
  { id: 'under-contract', label: 'Under Contract', icon: '📋' },
];

const guides: Record<string, { title: string; items: { icon: string; check: string; detail: string; flag: string }[] }> = {
  'just-looking': {
    title: 'Quick Street-Level Scan',
    items: [
      { icon: '🧱', check: 'Brick Step Cracks', detail: 'Diagonal stair-step cracks in brick veneer follow mortar joints — classic DFW clay movement', flag: 'Wide cracks (>1/4 inch) or recurring cracks signal active foundation movement' },
      { icon: '🏠', check: 'Chimney Separation', detail: 'Look for gap between chimney and main roofline — leaning chimney is serious', flag: 'Separated chimneys in DFW often cost $8K–$25K to repair or rebuild' },
      { icon: '🌿', check: 'Vegetation Against Foundation', detail: 'Shrubs and trees touching foundation push moisture into slab', flag: 'Root intrusion into DFW post-tension slabs is non-repairable — remove trees early' },
    ],
  },
  'serious': {
    title: 'Focused Foundation Inspection',
    items: [
      { icon: '🪟', check: 'Window and Door Alignment', detail: 'Stand back and sight along windows — out-of-plumb frames mean structural movement', flag: 'Sticking doors inside DFW homes = classic early foundation signal' },
      { icon: '🛣️', check: 'Driveway Slope Direction', detail: 'Driveway sloping toward foundation directs rain water under slab', flag: 'DFW clay swells and shrinks with water — improper drainage accelerates movement' },
      { icon: '🧲', check: 'Corner Bead Cracks', detail: 'Check stucco or EIFS corners — cracking at corners indicates racking', flag: 'Racking means the frame is being pushed out of square by foundation movement' },
    ],
  },
  'offer': {
    title: 'Pre-Offer Foundation Checklist',
    items: [
      { icon: '📏', check: 'Foundation Edge Exposure', detail: 'Slab edge should be visible and consistent height around perimeter', flag: 'Buried slab edge = soil buildup, moisture risk, wood contact (termites)' },
      { icon: '💧', check: 'Downspout Termination', detail: 'Gutters should drain 6+ feet from foundation — check at the street', flag: 'Short downspouts are top cause of DFW foundation movement per engineers' },
      { icon: '📐', check: 'Garage Door Gap', detail: 'Uneven gap at garage door bottom = floor movement', flag: 'Wedge-shaped gaps indicate one corner has dropped — often $5K–$40K repair' },
    ],
  },
  'under-contract': {
    title: 'Foundation Engineer Negotiation',
    items: [
      { icon: '🔬', check: 'Hire Structural Engineer (not inspector)', detail: 'PE-stamped foundation report costs $400–$800 and is required for FHA/VA loans', flag: 'General inspectors are not qualified to evaluate DFW post-tension slabs' },
      { icon: '💰', check: 'Repair Cost Ranges', detail: 'Pier-and-beam: $3K–$8K. Slab piers: $8K–$40K. Mudjacking: $1K–$5K', flag: 'Get 3 bids — DFW foundation pricing varies dramatically by company' },
      { icon: '📜', check: 'Transferable Warranty', detail: 'Ask if prior foundation work has a transferable warranty (Perma-Pier, Olshan, etc.)', flag: 'Non-transferable warranties = zero value to you as new buyer' },
    ],
  },
};

export default function DFWFoundationDriveBy2026() {
  const [stage, setStage] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Drive-By Foundation Assessment Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What you can spot from the street before buying a DFW home — no ladder required</p>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>📍 WHERE ARE YOU IN YOUR DFW HOME PURCHASE?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)} style={{ padding: '12px', borderRadius: 8, border: '2px solid', borderColor: stage === s.id ? '#F5E642' : '#334155', backgroundColor: stage === s.id ? '#F5E64220' : '#0f2744', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {stage && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔎 {guides[stage].title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides[stage].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.check}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{item.detail}</div>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#fbbf24' }}>⚠️ {item.flag}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Need a vetted DFW foundation specialist?</p>
              <a href="https://prolnk.io" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none' }}>🔗 Find DFW foundation pros at ProLnk.io →</a>
            </div>
          </div>
        )}

        {!stage && (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 40 }}>
            ☝️ Select your purchase stage above to get your personalized foundation drive-by checklist
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #1e3a5f', paddingTop: 20 }}>
          <p style={{ color: '#475569', fontSize: 12 }}>ProLnk DFW Home Services Platform · prolnk.io · DFW clay soil expertise since 2024</p>
        </div>
      </div>
    </div>
  );
}