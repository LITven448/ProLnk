import { useState } from 'react';

const layouts = [
  { id: 'galley', label: 'Galley (Two Parallel Walls)', size: 'small', hasIsland: false },
  { id: 'l_shape', label: 'L-Shaped', size: 'medium', hasIsland: false },
  { id: 'u_shape', label: 'U-Shaped', size: 'large', hasIsland: false },
  { id: 'island_open', label: 'Open Concept with Island', size: 'large', hasIsland: true },
  { id: 'peninsula', label: 'Peninsula / Semi-Open', size: 'medium', hasIsland: false },
  { id: 'one_wall', label: 'Single Wall / Studio', size: 'small', hasIsland: false },
];

const advice: Record<string, { score: number; islandFeasible: string; optimization: string[]; cost: string; entertaining: string }> = {
  galley: {
    score: 55,
    islandFeasible: 'Not feasible — galley kitchens lack width for safe island clearance (48″ minimum required)',
    optimization: ['Widen the galley opening to adjacent living area', 'Remove upper cabinets on one side for open feel', 'Add peninsula at one end to create eating bar', 'Upgrade hardware, counters, and backsplash — cosmetics matter here'],
    cost: '$8,000–$20,000 to open and improve',
    entertaining: 'Galley kitchens are the lowest-rated DFW kitchen type — single-file cooking limits the Texas entertaining lifestyle buyers expect.',
  },
  l_shape: {
    score: 75,
    islandFeasible: 'Feasible if 9x10 ft minimum floor space — budget $5,000–$12,000 for island addition',
    optimization: ['Add kitchen island with seating (top DFW buyer priority)', 'Extend L into dining area if layout allows', 'Install under-cabinet lighting for visual depth', 'Consider waterfall countertop on island for DFW luxury feel'],
    cost: '$10,000–$25,000 with island addition',
    entertaining: 'L-shape with island converts well for DFW entertaining. Island becomes the gathering point — critical for the Texas hospitality culture buyers expect.',
  },
  u_shape: {
    score: 80,
    islandFeasible: 'Possible if room is 12ft+ wide — consider removing one U leg to create open peninsula instead',
    optimization: ['Open one end of U to adjacent living space', 'Add large farmhouse or undermount sink', 'Install pot filler over range — DFW buyers love this feature', 'Smart storage optimization for tight U corners (lazy Susan or pull-outs)'],
    cost: '$5,000–$15,000 for opening and upgrades',
    entertaining: 'U-shaped kitchens offer maximum counter space but can feel isolated. Opening one end to living area dramatically improves DFW buyer perception.',
  },
  island_open: {
    score: 96,
    islandFeasible: 'Already has island — focus on island size, seating, and function optimization',
    optimization: ['Ensure island seats 3–4 (DFW buyer standard)', 'Add prep sink to island if not present', 'Waterfall edge countertop on island upgrades perceived value', 'Pendant lighting over island is non-negotiable for photos and showings'],
    cost: '$3,000–$10,000 for island upgrades',
    entertaining: 'Open concept with island is the #1 DFW kitchen configuration — buyers recognize it from model homes and new construction. Maximize the island experience.',
  },
  peninsula: {
    score: 78,
    islandFeasible: 'Peninsula serves island function — evaluate if full island conversion improves flow',
    optimization: ['Ensure peninsula has seating on open side', 'Open adjacent wall if partially closed', 'Upgrade peninsula countertop to quartz for DFW buyer standard', 'Add pendant lights over peninsula seating area'],
    cost: '$4,000–$12,000 for opening and upgrades',
    entertaining: 'Peninsula creates natural separation and seating — a strong DFW compromise. Converting to full island can add $8,000–$15,000 in perceived value but verify clearances first.',
  },
  one_wall: {
    score: 40,
    islandFeasible: 'Priority upgrade — add rolling or fixed island immediately; transformative for buyer perception',
    optimization: ['Add freestanding island with wheels for flexibility and showings', 'Build out adjacent wall with shelving and storage to appear larger', 'Install full-height backsplash to draw eye vertically', 'Upgrade appliances — they are more visible in single-wall kitchens'],
    cost: '$3,000–$8,000 for island and cosmetic upgrades',
    entertaining: 'Single-wall kitchens are rare in DFW and signal apartment or older home. An island converts the space dramatically — prioritize this above any other improvement.',
  },
};

export default function DFWKitchenLayoutGuide() {
  const [selected, setSelected] = useState('');
  const adv = selected ? advice[selected] : null;
  const layout = layouts.find(l => l.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🍳 DFW Home Seller Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Kitchen Layout Guide<br />for DFW Buyers</h1>
        <p style={{ color: '#8B9DC3', marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
          The kitchen is the #1 factor in DFW home buying decisions. Texas entertaining culture means buyers evaluate how well the kitchen hosts family gatherings, holiday events, and game-day parties. The island is non-negotiable.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏝️', title: 'Island = Essential', note: 'DFW buyers list kitchen island as top-3 must-have — absence eliminates buyers from consideration' },
            { icon: '🔺', title: 'Work Triangle', note: 'Sink, stove, fridge within 12–25 ft triangle — DFW buyers intuitively sense bad kitchen flow' },
            { icon: '🎉', title: 'Entertaining Focus', note: 'Design for 8–12 people, not 2 — Texas hospitality culture shapes every kitchen evaluation' },
            { icon: '💎', title: 'Quartz Standard', note: 'Quartz countertops are table stakes in DFW 2026 — granite reads dated, laminate kills deals' },
          ].map(tip => (
            <div key={tip.title} style={{ background: '#0F2040', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642′ }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.5 }}>{tip.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Kitchen Layout Optimizer</h2>
          <p style={{ color: '#8B9DC3', marginBottom: 16, fontSize: 14 }}>Select your current kitchen layout:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 24 }}>
            {layouts.map(l => (
              <button key={l.id} onClick={() => setSelected(l.id)} style={{ background: selected === l.id ? '#F5E642′ : '#0A1628', color: selected === l.id ? '#0A1628' : '#E8EAF0', border: '2px solid', borderColor: selected === l.id ? '#F5E642' : '#1E3A5F', borderRadius: 8, padding: '12px 16px', cursor: ’pointer', textAlign: 'left', fontWeight: 600, fontSize: 13 }}>
                {l.label}
              </button>
            ))}
          </div>
          {adv && layout && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4, color: '#F5E642′ }}>{layout.label}</div>
                  <div style={{ color: '#8B9DC3', fontSize: 13 }}>DFW Buyer Appeal Score</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 44, fontWeight: 800, color: adv.score >= 80 ? '#4CAF50′ : adv.score >= 65 ? '#F5E642' : '#FF6B6B' }}>{adv.score}</div>
                  <div style={{ fontSize: 11, color: '#8B9DC3', letterSpacing: 1, textTransform: 'uppercase' }}>out of 100</div>
                </div>
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: 14, marginBottom: 16, border: '1px solid #1E3A5F' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: layout.hasIsland ? '#4CAF50′ : '#FF6B6B' }}>🏝️ Island Feasibility</div>
                <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.6 }}>{adv.islandFeasible}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: '#F5E642′ }}>⚡ Top Optimization Moves</div>
                {adv.optimization.map((opt, i) => (
                  <div key={i} style={{ fontSize: 13, color: '#8B9DC3', marginBottom: 8, paddingLeft: 16, position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#F5E642′ }}>→</span>{opt}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Estimated Cost to Reconfigure</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16 }}>{adv.cost}</div>
                </div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#8B9DC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>DFW Entertaining Rating</div>
                  <div style={{ fontSize: 13, color: '#E8EAF0', lineHeight: 1.5 }}>{adv.entertaining}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
