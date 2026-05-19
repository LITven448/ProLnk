import { useState } from 'react';

const FLOOR_TYPES: Record<string, { label: string; removeCostSqft: number; refinishCostSqft: number; canRefinish: boolean; haulFeeBase: number }> = {
  carpet: { label: 'Carpet', removeCostSqft: 0.65, refinishCostSqft: 0, canRefinish: false, haulFeeBase: 180 },
  tile: { label: 'Ceramic / Porcelain Tile', removeCostSqft: 2.80, refinishCostSqft: 0, canRefinish: false, haulFeeBase: 320 },
  hardwood: { label: 'Hardwood (solid)', removeCostSqft: 1.20, refinishCostSqft: 3.50, canRefinish: true, haulFeeBase: 220 },
  lvp: { label: 'LVP / Vinyl Plank', removeCostSqft: 0.80, refinishCostSqft: 0, canRefinish: false, haulFeeBase: 150 },
  laminate: { label: 'Laminate', removeCostSqft: 0.75, refinishCostSqft: 0, canRefinish: false, haulFeeBase: 140 },
  glueDown: { label: 'Glue-Down Vinyl / VCT', removeCostSqft: 3.20, refinishCostSqft: 0, canRefinish: false, haulFeeBase: 280 },
};

const CONDITIONS: Record<string, string> = {
  good: 'Good (minor wear)',
  fair: 'Fair (moderate wear, some damage)',
  poor: 'Poor (significant damage / staining)',
};

export default function DFWFlooringRemovalGuide() {
  const [floorType, setFloorType] = useState('carpet');
  const [sqft, setSqft] = useState(1200);
  const [condition, setCondition] = useState('fair');

  const floor = FLOOR_TYPES[floorType];
  const removalCost = sqft * floor.removeCostSqft;
  const haulFee = floor.haulFeeBase + (sqft > 1000 ? (sqft - 1000) * 0.08 : 0);
  const refinishCost = floor.canRefinish ? sqft * floor.refinishCostSqft : 0;
  const totalRemove = removalCost + haulFee;
  const shouldRefinish = floor.canRefinish && condition !== 'poor';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ backgroundColor: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 4 }}>
            🗑️ DFW FLOORING REMOVAL
          </span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
          Flooring Removal & Disposal Guide for DFW
        </h1>
        <p style={{ color: '#8A9BBE', fontSize: 16, marginBottom: 40 }}>
          Old flooring has to go before new flooring goes in. DFW has unique challenges — slab adhesive, tile over tile, and haul-away costs. Know what you're getting into.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '🧹', title: 'Carpet Removal', body: 'Easiest removal in DFW. Carpet + pad typically come up in 20-30 minutes per room. Tack strips add 15 minutes. Average DFW crew removes 1,000 sqft of carpet in 2-3 hours. Many pros include carpet removal free with new floor install.' },
            { icon: '⛏️', title: 'Tile Removal Over Slab', body: 'DFW\’s most labor-intensive removal. Ceramic tile is often glued directly to concrete slab with thin-set mortar. Removal requires jackhammering — generates massive debris volume. Cost: $2-4/sqft. Often leaves slab damaged requiring leveling compound.' },
            { icon: '🪵', title: 'Hardwood: Remove or Refinish?', body: 'Solid hardwood can be sanded and refinished 4-6 times. If ¾" boards have 2+ sands remaining, refinishing at $3-5/sqft beats $8-15/sqft replacement. Check board thickness with a putty knife at a vent. Engineered hardwood has limited sanding capacity.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 16, padding: 32, border: '1px solid #1E2D4A', marginBottom: 40 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Remove vs Refinish Calculator</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Current Flooring Type</label>
              <select value={floorType} onChange={e => setFloorType(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(FLOOR_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Square Footage</label>
              <input
                type="range" min={100} max={4000} step={50} value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }}
              />
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginTop: 4 }}>{sqft.toLocaleString()} sqft</div>
            </div>
            <div>
              <label style={{ color: '#8A9BBE', fontSize: 13, display: 'block', marginBottom: 8 }}>Current Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ backgroundColor: '#1E2D4A', color: '#FFFFFF', border: '1px solid #2A3D5E', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
                {Object.entries(CONDITIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ backgroundColor: floor.canRefinish && shouldRefinish ? '#0D2D1A' : '#2D1010', borderRadius: 10, padding: 16, marginBottom: 20, border: `1px solid ${floor.canRefinish && shouldRefinish ? '#166534' : '#991B1B'}` }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: floor.canRefinish && shouldRefinish ? '#4ADE80′ : '#F87171', marginBottom: 4 }}>
              {floor.canRefinish ? (shouldRefinish ? '✅ Recommendation: Refinish — better ROI than replacement' : '⚠️ Recommendation: Remove and replace — condition too poor to refinish') : '🗑️ Removal required — this material cannot be refinished'}
            </div>
            {floor.canRefinish && shouldRefinish && (
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>Refinish cost: <strong style={{ color: '#F5E642′ }}>${refinishCost.toLocaleString()}</strong> vs full replacement at significantly higher cost</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {[
              { label: 'Removal Labor', value: `$${Math.round(removalCost).toLocaleString()}`, sub: `$${floor.removeCostSqft}/sqft` },
              { label: 'Haul-Away Fees', value: `$${Math.round(haulFee).toLocaleString()}`, sub: 'DFW disposal cost' },
              { label: 'Total Removal', value: `$${Math.round(totalRemove).toLocaleString()}`, sub: 'demo + disposal', highlight: true },
              ...(floor.canRefinish ? [{ label: 'Refinish Option', value: `$${refinishCost.toLocaleString()}`, sub: 'sand + stain + finish' }] : []),
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: stat.highlight ? '#F5E642′ : '#0A1628', borderRadius: 10, padding: 16, textAlign: ’center' }}>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#8A9BBE', fontSize: 12, marginBottom: 4 }}>{stat.label}</div>
                <div style={{ color: stat.highlight ? '#0A1628′ : '#FFFFFF', fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ color: stat.highlight ? '#0A162880′ : '#4A5B7A', fontSize: 11 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🚛 DFW Haul-Away Facts</h3>
          <ul style={{ color: '#8A9BBE', fontSize: 14, lineHeight: 2, paddingLeft: 18 }}>
            <li>DFW landfills charge $45-65 per load for construction debris</li>
            <li>Tile debris is heavy — often requires 2 dumpsters for 1,000+ sqft</li>
            <li>Many DFW flooring companies include haul-away; confirm before signing</li>
            <li>1-800-GOT-JUNK DFW: ~$250-400 for full truckload carpet removal</li>
            <li>Asbestos testing required if tile was installed pre-1980 — add $150-300</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
