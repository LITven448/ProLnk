import { useState } from 'react';

type DrillResult = { drillType: string; bitType: string; anchor: string; cost: string; tips: string[] };

const drillMap: Record<string, DrillResult> = {
  'brick-picture': {
    drillType: 'Hammer Drill (corded or 20V brushless cordless)',
    bitType: '3/16″ Carbide-Tipped Masonry Bit',
    anchor: 'Plastic Conical Anchor with #8 screw',
    cost: 'Drill rental $25-40/day | Bit $4-8 | Anchors $5 for 20pk',
    tips: ['DFW brick is hard fired clay — don\’t use standard drill bits (they dull in seconds)', 'Drill perpendicular to mortar joint if possible — easier than brick face', 'Use water or compressed air to clear dust every 30 seconds', 'Stop if you feel the bit walking — re-center with smaller pilot hole', 'DFW summer: drill before 10am — bit overheats faster in hot weather'],
  },
  'brick-heavy': {
    drillType: 'Rotary Hammer (SDS-Plus, 1″ class minimum)',
    bitType: '1/2″ SDS-Plus Carbide Bit',
    anchor: 'Sleeve Anchor or Wedge Anchor (3/8″ x 2-1/2″)',
    cost: 'Rental $45-65/day | Bit $15-25 | Anchors $3-6 each',
    tips: ['TV mounts, shelving over 50lbs, pergola attachments — rotary hammer only', 'DFW brick varies by era: pre-1960 is softer; post-1980 is harder fired clay', 'Drill into brick face not mortar for heavy anchors — mortar crumbles under load', 'Blow out hole with compressed air before setting anchor', 'Torque anchors to spec — over-torquing cracks DFW brick'],
  },
  'concrete-picture': {
    drillType: 'Hammer Drill with Concrete Setting',
    bitType: '1/4″ Carbide Masonry Bit',
    anchor: 'Tapcon 1/4″ x 1-3/4″ Concrete Screw',
    cost: 'Drill rental $25-40/day | Tapcons $10 for 8pk',
    tips: ['Tapcons are the DFW standard for concrete — no separate anchor needed', 'Drill 1/4″ deeper than screw length to avoid bottoming out', 'DFW slab concrete is typically 3000-4000 PSI — standard carbide bits work fine', 'Vacuum hole before screwing — concrete dust prevents proper engagement', 'Crack appears? Stop — could be post-tension slab (common in DFW after 1985)'],
  },
  'concrete-heavy': {
    drillType: 'Rotary Hammer (SDS-Plus, 1″ class)',
    bitType: '5/8″ SDS-Plus Diamond-Tipped Bit (for post-tension slabs)',
    anchor: 'Drop-In Anchor or Wedge Anchor 1/2″ x 3-1/2″',
    cost: 'Rental $45-65/day | Diamond bit $35-60 | Anchors $4-8 each',
    tips: ['⚠️ DFW has extensive post-tension concrete slabs — ALWAYS scan before drilling', 'Call 811 (utility locate) AND rent a post-tension scanner before any deep hole in DFW', 'Post-tension cables run under slabs — hitting one is catastrophic and expensive', 'For carport posts, equipment anchors, heavy mounts: hire a pro or rent SDS hammer', 'Set anchors flush then test load before hanging anything heavy'],
  },
  'block-picture': {
    drillType: 'Hammer Drill',
    bitType: '3/16″ Carbide Masonry Bit',
    anchor: 'Toggle Bolt or Hollow Wall Anchor',
    cost: 'Same as standard hammer drill | Toggle bolts $6-12 for 4pk',
    tips: ['DFW CMU block is hollow — standard anchors fall through', 'Toggle bolts or snap toggles work best in the hollow cells', 'Drill into the solid webs (edges) if possible for heavier items', 'Block mortar joints are softer than brick — avoid mortar for any real load', 'Pre-1970 DFW block can be brittle — go slow, low speed'],
  },
  'block-heavy': {
    drillType: 'Rotary Hammer (SDS-Plus)',
    bitType: '1/2″ SDS Carbide Bit',
    anchor: 'Epoxy Anchor System (Simpson SET-XP or Hilti HIT-HY 200)',
    cost: 'Epoxy kit $35-60 | Threaded rod $5-15 | Rental $45-65/day',
    tips: ['Heavy loads into CMU block require epoxy injection anchors — wedge anchors pull through hollow block', 'Drill into solid section of block or fill hollow cell with non-shrink grout first', 'DFW humidity: wait 24hrs min for epoxy cure before loading (72hrs if below 60°F)', 'Carport beams, steel posts, heavy gates — always use epoxy system in DFW block', 'Load test before final installation: 2x design load for 5 minutes'],
  },
};

export default function DFWMasonryDrillGuide() {
  const [masonryType, setMasonryType] = useState('');
  const [loadType, setLoadType] = useState('');
  const [result, setResult] = useState<DrillResult | null>(null);

  function calculate() {
    if (!masonryType || !loadType) return;
    setResult(drillMap[`${masonryType}-${loadType}`] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔩</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Masonry Drill Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW homes have brick, concrete slabs, and CMU block. Use the wrong drill or anchor and you'll be repairing twice.
        </p>

        <div style={{ backgroundColor: '#FF4444', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#FFF', marginBottom: 6 }}>⚠️ POST-TENSION SLAB WARNING — READ FIRST</div>
          <div style={{ color: '#FFE0E0', fontSize: 14 }}>Most DFW homes built after 1985 have post-tension concrete slabs. Drilling into a post-tension cable can cost $10,000+ to repair and is structurally dangerous. Always call 811 and rent a PT scanner before drilling into DFW slab concrete more than 1" deep.</div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your Drill Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>DFW Masonry Type</label>
              <select value={masonryType} onChange={e => setMasonryType(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select type...</option>
                <option value="brick">Brick (exterior walls, fireplace)</option>
                <option value="concrete">Concrete (slab, driveway, patio)</option>
                <option value="block">CMU Block (garage, fence, retaining wall)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Application Load</label>
              <select value={loadType} onChange={e => setLoadType(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select load...</option>
                <option value="picture">Light (pictures, small shelves, &lt;25 lbs)</option>
                <option value="heavy">Heavy (TV mounts, posts, structural, 25+ lbs)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Drill Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5A623', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>🔧 DRILL TYPE</div>
                <div style={{ color: '#E8EDF5', fontSize: 13 }}>{result.drillType}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5A623', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>🔩 BIT TYPE</div>
                <div style={{ color: '#E8EDF5', fontSize: 13 }}>{result.bitType}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5A623', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>⚓ ANCHOR</div>
                <div style={{ color: '#E8EDF5', fontSize: 13 }}>{result.anchor}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5A623', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>💰 COST ESTIMATE</div>
                <div style={{ color: '#E8EDF5', fontSize: 13 }}>{result.cost}</div>
              </div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>📋 DFW Tips</h3>
            {result.tips.map((t, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 13, color: '#CBD5E1', borderLeft: '3px solid #1E3A5F' }}>
                {t}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
