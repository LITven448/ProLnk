import { useState } from 'react';

const GROUT_TYPES = [
  {
    name: 'Cement Grout',
    costPerSqFt: 0.5,
    durability: 3,
    stainResistance: 2,
    dfwNote: 'DFW hard water leaves heavy mineral deposits on cement grout — requires more frequent sealing',
    lifespan: '5-10 years',
    bestFor: 'Budget projects, floor tiles',
  },
  {
    name: 'Epoxy Grout',
    costPerSqFt: 2.5,
    durability: 5,
    stainResistance: 5,
    dfwNote: 'Ideal for DFW showers — resists hard water stains and mold, no sealing ever required',
    lifespan: '20-30 years',
    bestFor: 'Showers, wet areas, high-traffic',
  },
  {
    name: 'Urethane Grout',
    costPerSqFt: 1.8,
    durability: 4,
    stainResistance: 4,
    dfwNote: 'Good balance for DFW homes — stain resistant, flexible, easier to install than epoxy',
    lifespan: '15-25 years',
    bestFor: 'Mid-range showers, versatile',
  },
];

const SHOWER_SIZES = [
  { label: 'Small (3x3 ft = 9 sq ft)', sqft: 9, linearFt: 24 },
  { label: 'Standard (3x5 ft = 15 sq ft)', sqft: 15, linearFt: 32 },
  { label: 'Large (4x6 ft = 24 sq ft)', sqft: 24, linearFt: 40 },
  { label: 'Walk-in (5x8 ft = 40 sq ft)', sqft: 40, linearFt: 52 },
];

const GROUT_CONDITIONS = [
  { label: 'Good — just discolored', needsRetile: false, action: 'regrout', diy: true },
  { label: 'Cracked but mostly intact', needsRetile: false, action: 'regrout', diy: true },
  { label: 'Missing sections, water damage', needsRetile: false, action: 'regrout', diy: false },
  { label: 'Mold penetration or failing tile', needsRetile: true, action: 'retile', diy: false },
];

const TILE_AGES = [
  { label: 'Under 5 years', retileRisk: false },
  { label: '5-15 years', retileRisk: false },
  { label: '15-25 years', retileRisk: true },
  { label: '25+ years', retileRisk: true },
];

function RatingDots({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < rating ? '#F5E642' : '#1E2D45', display: 'inline-block' }} />
      ))}
    </span>
  );
}

export default function DFWShowerRegroutingGuide() {
  const [selectedGrout, setSelectedGrout] = useState(GROUT_TYPES[1]);
  const [selectedSize, setSelectedSize] = useState(SHOWER_SIZES[1]);
  const [selectedCondition, setSelectedCondition] = useState(GROUT_CONDITIONS[1]);
  const [selectedAge, setSelectedAge] = useState(TILE_AGES[1]);

  const needsRetile = selectedCondition.needsRetile || selectedAge.retileRisk;
  const isDIY = selectedCondition.diy && !needsRetile;
  const groutCost = Math.round(selectedSize.sqft * selectedGrout.costPerSqFt);
  const caulkCost = Math.round(selectedSize.linearFt * 1.5);
  const laborCost = isDIY ? 0 : Math.round(selectedSize.sqft * 12);
  const totalDIY = groutCost + caulkCost + 80;
  const totalPro = groutCost + caulkCost + laborCost + 150;
  const timeHours = isDIY ? Math.round(selectedSize.sqft * 0.8) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚿</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            DFW Shower Regrouting Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            DFW hard water stains grout faster than average — know when to regrout, recaulk, or retile.
          </p>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Should I Regrout, Recaulk, or Retile?</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Grout Condition</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {GROUT_CONDITIONS.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSelectedCondition(c)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: `2px solid ${selectedCondition.label === c.label ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedCondition.label === c.label ? '#1A2E4A' : '#0D1A2E',
                    color: selectedCondition.label === c.label ? '#F5E642' : '#94A3B8',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Tile Age</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {TILE_AGES.map((a) => (
                <button
                  key={a.label}
                  onClick={() => setSelectedAge(a)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: `2px solid ${selectedAge.label === a.label ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedAge.label === a.label ? '#1A2E4A' : '#0D1A2E',
                    color: selectedAge.label === a.label ? '#F5E642' : '#94A3B8',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: 20, borderRadius: 12, background: needsRetile ? '#2A0A0A' : '#0A2A1A', border: `1px solid ${needsRetile ? '#EF4444' : '#22C55E'}` }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{needsRetile ? '🔴' : isDIY ? '🟢' : '🟡'}</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: needsRetile ? '#EF4444' : isDIY ? '#22C55E' : '#EAB308', marginBottom: 8 }}>
              {needsRetile ? 'Recommend Retiling' : isDIY ? 'DIY-Friendly Regrout' : 'Professional Regrout Recommended'}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>
              {needsRetile
                ? 'Your shower has damage or old tile that warrants full retiling. Water may be penetrating behind tiles — a professional assessment is critical before more damage occurs.'
                : isDIY
                ? 'Your grout condition and tile age are suitable for a DIY regrout. Budget a weekend and rent a grout saw for best results.'
                : 'Professional regrouting recommended for the damage level or missing grout. A pro can also inspect for water damage behind tiles.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Grout Type Selector</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {GROUT_TYPES.map((g) => (
              <button
                key={g.name}
                onClick={() => setSelectedGrout(g)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  border: `2px solid ${selectedGrout.name === g.name ? '#F5E642' : '#1E3A5F'}`,
                  background: selectedGrout.name === g.name ? '#1A2E4A' : '#0D1A2E',
                  color: '#E8EDF5',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, color: selectedGrout.name === g.name ? '#F5E642' : '#E8EDF5' }}>{g.name}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>${g.costPerSqFt}/sq ft · {g.lifespan}</div>
                </div>
                <div style={{ display: 'flex', gap: 20, marginBottom: 8, fontSize: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ color: '#64748B' }}>Durability</span>
                    <RatingDots rating={g.durability} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ color: '#64748B' }}>Stain Resist</span>
                    <RatingDots rating={g.stainResistance} />
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8', padding: '6px 10px', background: '#0A1628', borderRadius: 6 }}>
                  DFW: {g.dfwNote}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Cost Calculator</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Shower Size</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {SHOWER_SIZES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: `2px solid ${selectedSize.label === s.label ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedSize.label === s.label ? '#1A2E4A' : '#0D1A2E',
                    color: selectedSize.label === s.label ? '#F5E642' : '#94A3B8',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ padding: 20, background: '#0A2A1A', borderRadius: 12, border: '1px solid #22C55E' }}>
              <div style={{ color: '#22C55E', fontWeight: 700, marginBottom: 8 }}>DIY Cost</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>${totalDIY.toLocaleString()}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>Materials only · {timeHours} hrs labor</div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#64748B' }}>
                Grout: ${groutCost} · Caulk: ${caulkCost} · Tools: $80
              </div>
            </div>
            <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #1E3A5F' }}>
              <div style={{ color: '#94A3B8', fontWeight: 700, marginBottom: 8 }}>Professional Cost</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>${totalPro.toLocaleString()}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>Materials + labor included</div>
              <div style={{ marginTop: 12, fontSize: 12, color: '#64748B' }}>
                Grout: ${groutCost} · Labor: ${laborCost} · Setup: $150
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 24, background: '#0F1F35', borderRadius: 16, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Get DFW Tile & Grout Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with vetted DFW tile contractors through ProLnk — free quotes, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
