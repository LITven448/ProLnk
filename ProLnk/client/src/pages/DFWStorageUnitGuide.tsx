import { useState } from 'react';

const ITEM_CATEGORIES = [
  { label: 'Furniture', climate: true, emoji: '🛋️' },
  { label: 'Electronics', climate: true, emoji: '💻' },
  { label: 'Clothing', climate: false, emoji: '👗' },
  { label: 'Documents/Files', climate: true, emoji: '📁' },
  { label: 'Artwork/Photos', climate: true, emoji: '🖼️' },
  { label: 'Wine/Alcohol', climate: true, emoji: '🍷' },
  { label: 'Tools', climate: false, emoji: '🔧' },
  { label: 'Sports Equipment', climate: false, emoji: '⚽' },
  { label: 'Musical Instruments', climate: true, emoji: '🎸' },
  { label: 'Seasonal Décor', climate: false, emoji: '🎄' },
  { label: 'Vehicles/Boats', climate: false, emoji: '🚗' },
  { label: 'Business Inventory', climate: true, emoji: '📦' },
];

const UNIT_SIZES = [
  { size: '5×5', sqft: 25, desc: 'Small closet — boxes, seasonal items', monthly: '$60–$90′ },
  { size: '5×10', sqft: 50, desc: 'Walk-in closet — studio apt contents', monthly: '$90–$140′ },
  { size: '10×10', sqft: 100, desc: '1-car garage — 1–2BR apartment', monthly: '$120–$180′ },
  { size: '10×15', sqft: 150, desc: '2BR apartment or small house', monthly: '$160–$240′ },
  { size: '10×20', sqft: 200, desc: '3–4BR home or full garage', monthly: '$200–$300′ },
  { size: '10×30', sqft: 300, desc: 'Large home or business inventory', monthly: '$280–$420′ },
];

export default function DFWStorageUnitGuide() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggle = (label: string) => setSelectedItems(prev => prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]);

  const needsClimate = selectedItems.some(s => ITEM_CATEGORIES.find(c => c.label === s)?.climate);
  const count = selectedItems.length;
  const recommendedSize = count === 0 ? null : count <= 2 ? UNIT_SIZES[0] : count <= 4 ? UNIT_SIZES[1] : count <= 6 ? UNIT_SIZES[2] : count <= 8 ? UNIT_SIZES[3] : count <= 10 ? UNIT_SIZES[4] : UNIT_SIZES[5];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>DFW Home Services</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>DFW Storage Unit Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 12, fontSize: 16 }}>Climate control isn't optional in Texas — summer heat reaches 110°F+ in storage units without it.</p>

        <div style={{ backgroundColor: '#2A1010', borderRadius: 12, padding: 16, marginBottom: 32, border: '1px solid #EF444440', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🔥</span>
          <div>
            <div style={{ fontWeight: 700, color: '#FCA5A5', marginBottom: 4 }}>DFW Summer Warning</div>
            <div style={{ color: '#9BA3B8', fontSize: 14 }}>Non-climate-controlled units in DFW routinely hit 130–150°F in summer. This warps wood furniture, destroys electronics, melts vinyl records, ruins makeup and candles, and damages instruments. If in doubt — get climate control.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '❄️', label: 'Climate-Controlled', price: '+$20–$60/mo', note: 'Maintains 55–85°F year-round' },
            { emoji: '🔒', label: 'Gated Security', price: 'Standard', note: 'Camera + keypad access most facilities' },
            { emoji: '🚘', label: 'Drive-Up Access', price: 'Standard', note: 'Load directly from your vehicle' },
            { emoji: '📏', label: 'Sizes Available', price: '5×5 to 10×30', note: 'Match to your actual volume' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#131F35', borderRadius: 12, padding: 20, border: '1px solid #1E2D45′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 18, color: '#F5E642', fontWeight: 800, marginBottom: 4 }}>{card.price}</div>
              <div style={{ fontSize: 13, color: '#9BA3B8′ }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>📦 Unit Size Recommender</h2>
          <p style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 20 }}>Select what you're storing — we’ll recommend the right unit size and flag if you need climate control.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {ITEM_CATEGORIES.map(cat => (
              <button key={cat.label} onClick={() => toggle(cat.label)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, backgroundColor: selectedItems.includes(cat.label) ? '#F5E642′ : '#1E2D45', color: selectedItems.includes(cat.label) ? '#0A1628' : '#9BA3B8' }}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {recommendedSize && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642′ }}>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Recommended Size</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{recommendedSize.size}</div>
                <div style={{ color: '#CBD2E0', fontSize: 13, marginTop: 4 }}>{recommendedSize.desc}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #2A3A55′ }}>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Estimated Monthly</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>{recommendedSize.monthly}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginTop: 4 }}>DFW market rate</div>
              </div>
              <div style={{ backgroundColor: needsClimate ? '#2A1010′ : '#0A1628', borderRadius: 12, padding: 20, border: `1px solid ${needsClimate ? '#EF4444' : '#2A3A55'}` }}>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Climate Control</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: needsClimate ? '#EF4444′ : '#22C55E' }}>{needsClimate ? '⚠️ REQUIRED' : '✓ Optional'}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginTop: 4 }}>{needsClimate ? 'You have heat-sensitive items' : 'Your items can handle temperature swings'}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📐 All Unit Sizes & Pricing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {UNIT_SIZES.map(unit => (
              <div key={unit.size} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{unit.size}</div>
                  <div style={{ fontSize: 13, color: '#9BA3B8′ }}>{unit.sqft} sq ft</div>
                </div>
                <div style={{ color: '#CBD2E0', fontSize: 13, marginBottom: 6 }}>{unit.desc}</div>
                <div style={{ color: '#FFFFFF', fontWeight: 700 }}>{unit.monthly}/mo</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏢 Top DFW Storage Providers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[['Public Storage', 'Most locations across DFW metro', '⭐⭐⭐⭐'], ['CubeSmart', 'Climate-control specialists', '⭐⭐⭐⭐'], ['Extra Space Storage', 'Best app and online management', '⭐⭐⭐⭐⭐'], ['Life Storage', 'Good long-term rates', '⭐⭐⭐⭐'], ['StorQuest', 'Competitive pricing in suburbs', '⭐⭐⭐']].map(([name, desc, rating]) => (
              <div key={name} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{name}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 6 }}>{desc}</div>
                <div style={{ fontSize: 13 }}>{rating}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
