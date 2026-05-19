import { useState } from 'react';

const ISLAND_TYPES = [
  { type: 'Storage', icon: '📦', description: 'Maximize cabinet and drawer space', avgCost: 2500, roiPct: 60 },
  { type: 'Prep', icon: '🔪', description: 'Extra workspace for serious cooks', avgCost: 3500, roiPct: 70 },
  { type: 'Seating', icon: '🪑', description: 'Casual dining and entertaining', avgCost: 4500, roiPct: 75 },
  { type: 'Multi-function', icon: '⭐', description: 'Storage + prep + seating combined', avgCost: 7500, roiPct: 85 },
];

const EDGE_STYLES = [
  { name: 'Waterfall', trend: true, costAdd: 800, description: 'Countertop cascades down the sides — dominant DFW trend 2024-2026' },
  { name: 'Standard Overhang', trend: false, costAdd: 0, description: 'Classic overhang for seating, timeless and practical' },
  { name: 'Flush/Inset', trend: false, costAdd: 200, description: 'Clean modern look, no overhang' },
  { name: 'Live Edge', trend: false, costAdd: 1200, description: 'Natural wood slab edge, rustic-modern aesthetic' },
];

const SIZES = [
  { label: 'Small kitchen (under 150 sq ft)', sqft: 120, canFit: false, maxIsland: null },
  { label: 'Medium kitchen (150-200 sq ft)', sqft: 175, canFit: true, maxIsland: '3x4 ft' },
  { label: 'Large kitchen (200-300 sq ft)', sqft: 250, canFit: true, maxIsland: '4x6 ft' },
  { label: 'Open concept (300+ sq ft)', sqft: 350, canFit: true, maxIsland: '4x8 ft or larger' },
];

export default function DFWKitchenIslandGuide() {
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const [selectedType, setSelectedType] = useState(ISLAND_TYPES[3]);
  const [selectedEdge, setSelectedEdge] = useState(EDGE_STYLES[0]);
  const [hasPlumbing, setHasPlumbing] = useState(false);
  const [hasElectric, setHasElectric] = useState(false);

  const totalCost = selectedType.avgCost + selectedEdge.costAdd + (hasPlumbing ? 2500 : 0) + (hasElectric ? 800 : 0);
  const roiValue = Math.round((totalCost * selectedType.roiPct) / 100);
  const permitRequired = hasPlumbing || hasElectric;
  const homeValue = 450000;
  const roiDollar = Math.round(homeValue * 0.04);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏝️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            DFW Kitchen Island Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>
            Everything DFW homeowners need to know before adding or upgrading a kitchen island — sizing, permits, ROI.
          </p>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 24 }}>Can I Fit an Island?</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Your Kitchen Size</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {SIZES.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 10,
                    border: `2px solid ${selectedSize.label === s.label ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedSize.label === s.label ? '#1A2E4A' : '#0D1A2E',
                    color: selectedSize.label === s.label ? '#F5E642' : '#94A3B8',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: 20, borderRadius: 12, background: selectedSize.canFit ? '#0A2A1A' : '#2A0A0A', border: `1px solid ${selectedSize.canFit ? '#22C55E' : '#EF4444'}` }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{selectedSize.canFit ? '✅' : '❌'}</div>
            <div style={{ color: selectedSize.canFit ? '#22C55E' : '#EF4444', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
              {selectedSize.canFit ? 'Island fits!' : 'Island not recommended'}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>
              {selectedSize.canFit
                ? `Recommended island size: ${selectedSize.maxIsland}. Maintain 40" clearance on all sides per NKBA guidelines.`
                : 'Your kitchen is under 150 sq ft. Adding an island would restrict movement below the required 40" clearance. Consider a rolling cart instead.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>Island Configuration</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 12, fontSize: 14 }}>Island Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {ISLAND_TYPES.map((t) => (
                <button
                  key={t.type}
                  onClick={() => setSelectedType(t)}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: `2px solid ${selectedType.type === t.type ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedType.type === t.type ? '#1A2E4A' : '#0D1A2E',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
                  <div style={{ fontWeight: 700, color: selectedType.type === t.type ? '#F5E642' : '#E8EDF5', marginBottom: 4 }}>{t.type}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>{t.description}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 12, fontSize: 14 }}>Edge Style</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {EDGE_STYLES.map((e) => (
                <button
                  key={e.name}
                  onClick={() => setSelectedEdge(e)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: `2px solid ${selectedEdge.name === e.name ? '#F5E642' : '#1E3A5F'}`,
                    background: selectedEdge.name === e.name ? '#1A2E4A' : '#0D1A2E',
                    color: '#E8EDF5',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 600, color: selectedEdge.name === e.name ? '#F5E642' : '#E8EDF5' }}>{e.name}</span>
                    {e.trend && <span style={{ marginLeft: 8, background: '#F5E642', color: '#0A1628', fontSize: 10, padding: '2px 6px', borderRadius: 8, fontWeight: 700 }}>TRENDING</span>}
                    <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{e.description}</div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, minWidth: 60, textAlign: 'right' }}>
                    {e.costAdd === 0 ? 'Included' : `+$${e.costAdd.toLocaleString()}`}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 12, fontSize: 14 }}>Add-ons (require permit)</label>
            <div style={{ display: 'flex', gap: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#CBD5E1' }}>
                <input type="checkbox" checked={hasPlumbing} onChange={(e) => setHasPlumbing(e.target.checked)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                Plumbing (sink) +$2,500
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#CBD5E1' }}>
                <input type="checkbox" checked={hasElectric} onChange={(e) => setHasElectric(e.target.checked)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
                Electrical (outlets) +$800
              </label>
            </div>
          </div>
          {permitRequired && (
            <div style={{ padding: 12, borderRadius: 8, background: '#1A2A0A', border: '1px solid #EAB308', marginBottom: 16 }}>
              <div style={{ color: '#EAB308', fontWeight: 600, fontSize: 13 }}>⚠️ Permit Required in DFW</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>Adding plumbing or electrical to a kitchen island requires a permit from your city (Dallas, Fort Worth, Plano, etc.). Budget $150-$500 for permits and allow 2-4 weeks for inspection scheduling.</div>
            </div>
          )}
          <div style={{ padding: 20, background: '#0A1628', borderRadius: 12, border: '1px solid #F5E642' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost</div>
                <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>${totalCost.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Value Returned</div>
                <div style={{ color: '#22C55E', fontSize: 28, fontWeight: 800 }}>${roiValue.toLocaleString()}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>{selectedType.roiPct}% ROI at resale</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>DFW Home Value Boost</div>
                <div style={{ color: '#94A3B8', fontSize: 22, fontWeight: 800 }}>+${roiDollar.toLocaleString()}</div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Avg DFW kitchen remodel adds ~4%</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F1F35', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 16 }}>DFW Island Design Notes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { icon: '📏', title: '40" Rule', text: 'NKBA standard requires 40" clearance on all sides of the island — critical in DFW open floor plans' },
              { icon: '🌊', title: 'Waterfall Edge', text: 'White quartz waterfall edges dominate DFW kitchen remodels in 2024-2026. Adds $600-$1,200 but increases resale appeal' },
              { icon: '🏠', title: 'Resale Impact', text: 'Kitchen islands consistently rank as top ROI upgrades in DFW — Frisco, Southlake, and Plano buyers expect them' },
              { icon: '🔧', title: 'Slab Homes', text: 'DFW homes on slab foundations make adding plumbing to island more complex — expect higher plumbing costs vs. pier-and-beam' },
            ].map((tip) => (
              <div key={tip.title} style={{ padding: 16, background: '#0A1628', borderRadius: 12, border: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{tip.icon}</div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{tip.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{tip.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 24, background: '#0F1F35', borderRadius: 16, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏝️</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Get Island Installation Quotes</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Connect with DFW kitchen contractors through ProLnk — free quotes from vetted pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
