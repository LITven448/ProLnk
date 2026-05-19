import { useState } from 'react';

const roomTypes = [
  { id: 'living', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'primary', label: 'Primary Bedroom' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'outdoor', label: 'Outdoor Living' },
];

const trendData: Record<string, { looks: string[]; cost: string }> = {
  living: {
    looks: [
      'Warm greige walls + white oak media console + textured linen sofa',
      'Limewash accent wall + rattan side chairs + terracotta accessories',
      'Soft ivory + exposed wood beam ceiling + layered jute rugs',
    ],
    cost: '$8,000 – $22,000',
  },
  kitchen: {
    looks: [
      'Matte quartz island in sage green + open wood shelving + unlacquered brass',
      'Bold navy island + white oak uppers + Calacatta matte quartz counters',
      'Warm white shaker + large-format stone floor + waterfall quartz island',
    ],
    cost: '$18,000 – $60,000',
  },
  primary: {
    looks: [
      'Warm taupe + wood-slat headboard wall + linen bedding',
      'Deep moody blue-green + arched window treatments + oak nightstands',
      'Soft terracotta + sculptural pendant lights + plaster-look accent wall',
    ],
    cost: '$4,000 – $14,000',
  },
  bathroom: {
    looks: [
      'Fluted oak vanity + matte black fixtures + warm white large-format tile',
      'Limewash walls + freestanding tub + pebble floor + arched mirror',
      'Zellige tile + unlacquered brass + warm greige grout + open shelving',
    ],
    cost: '$12,000 – $35,000',
  },
  outdoor: {
    looks: [
      'Covered pergola + outdoor kitchen + string lights + concrete pavers',
      'Cedar privacy screen + daybed lounge + ceiling fan + wood-look tile',
      'Dark exterior stucco accent + modern fire pit + native landscaping',
    ],
    cost: '$15,000 – $55,000',
  },
};

export default function DFWDesignTrends2026() {
  const [selected, setSelected] = useState('living');
  const data = trendData[selected];

  return (
    <div style={{ background: '#F9F7F4', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#8B6F47', fontWeight: 700, letterSpacing: 2, fontSize: 12, textTransform: 'uppercase', marginBottom: 8 }}>
          🏡 DFW Design Insider
        </p>
        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          DFW Home Design Trends 2026
        </h1>
        <p style={{ fontSize: 17, color: '#555', lineHeight: 1.7, marginBottom: 40, maxWidth: 680 }}>
          The gray era is over. Warm neutrals, white oak, and matte finishes are dominating DFW interiors — and with 9+ months of outdoor living season, the inside/outside line has never been blurrier.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🪵', label: 'White Oak Flooring', sub: 'Replaced gray LVP as the #1 floor choice' },
            { icon: '🏔️', label: 'Matte Quartz', sub: 'Polished counters now feel dated in DFW kitchens' },
            { icon: '🌿', label: 'Warm Neutrals', sub: 'Greige, taupe, and terracotta replace cool whites' },
          ].map(({ icon, label, sub }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: '#888′ }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🎨 Trending Looks by Room</h2>
          <p style={{ color: '#777', fontSize: 14, marginBottom: 24 }}>Select a room type to see the top 3 trending looks + estimated renovation cost.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
            {roomTypes.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 100,
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  background: selected === r.id ? '#8B6F47′ : '#F0EDE8',
                  color: selected === r.id ? '#fff' : '#555',
                  transition: 'all 0.2s',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.looks.map((look, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ background: '#8B6F47', color: '#fff', borderRadius: 8, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.6, paddingTop: 3 }}>{look}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: '16px 20px', background: '#FDF8F2', borderRadius: 10, borderLeft: '4px solid #8B6F47′ }}>
            <span style={{ fontSize: 13, color: '#8B6F47', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Estimated renovation range</span>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{data.cost}</div>
          </div>
        </div>

        <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: 16, padding: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🌅 The DFW Outdoor Factor</div>
          <p style={{ fontSize: 14, color: '#ccc', lineHeight: 1.7, margin: 0 }}>
            DFW's outdoor living season runs March through November — over 9 months. This fundamentally shapes interior design: covered patios blend into living rooms, dark exterior colors contrast lush landscaping, and indoor materials must be humidity-tolerant. The hottest DFW design move of 2026 is blurring the indoor-outdoor line entirely.
          </p>
        </div>
      </div>
    </div>
  );
}
