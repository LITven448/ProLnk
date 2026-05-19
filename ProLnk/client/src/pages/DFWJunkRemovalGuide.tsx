import { useState } from 'react';

const JUNK_TYPES = ['Furniture', 'Appliances', 'Electronics', 'Construction debris', 'Yard waste', 'Clothing/textiles', 'Boxes/paper', 'Mattresses', 'Exercise equipment', 'Hot tubs/pools'];
const VOLUMES = ['Single item', 'Truckload 1/8 (~2 cubic yards)', 'Truckload 1/4 (~4 cubic yards)', 'Truckload 1/2 (~8 cubic yards)', 'Full truckload (~16 cubic yards)'];
const COSTS: Record<string, number> = {
  'Single item': 115,
  'Truckload 1/8 (~2 cubic yards)': 150,
  'Truckload 1/4 (~4 cubic yards)': 250,
  'Truckload 1/2 (~8 cubic yards)': 400,
  'Full truckload (~16 cubic yards)': 600,
};
const RECYCLED = ['Electronics', 'Appliances', 'Clothing/textiles', 'Boxes/paper'];
const DONATED = ['Furniture', 'Clothing/textiles', 'Exercise equipment'];
const LANDFILL = ['Construction debris', 'Mattresses', 'Hot tubs/pools', 'Yard waste'];

export default function DFWJunkRemovalGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [volume, setVolume] = useState('');

  const toggle = (item: string) => setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

  const recycledItems = selected.filter(i => RECYCLED.includes(i));
  const donatedItems = selected.filter(i => DONATED.includes(i));
  const landfillItems = selected.filter(i => LANDFILL.includes(i));
  const estCost = volume ? COSTS[volume] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>DFW Home Services</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>DFW Junk Removal Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32, fontSize: 16 }}>Estate cleanouts, garage purges, post-renovation debris — what it costs and where it all goes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '♻️', label: 'Recyclable', note: 'Electronics, appliances, paper', color: '#22C55E' },
            { emoji: '🎁', label: 'Donatable', note: 'Furniture, clothes, equipment', color: '#3B82F6′ },
            { emoji: '🗑️', label: 'Landfill', note: 'Debris, mattresses, pools', color: '#EF4444′ },
            { emoji: '📅', label: 'Same-Day Available', note: 'Book by 10am in most DFW zones', color: '#F5E642′ },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#131F35', borderRadius: 12, padding: 20, border: `1px solid ${card.color}40` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, color: card.color, marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#9BA3B8′ }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>🛠️ Interactive Cost & Disposal Estimator</h2>
          <p style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 20 }}>Select the types of junk you have and your estimated volume.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 10 }}>What type of junk? (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {JUNK_TYPES.map(item => (
                <button key={item} onClick={() => toggle(item)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, backgroundColor: selected.includes(item) ? '#F5E642′ : '#1E2D45', color: selected.includes(item) ? '#0A1628' : '#9BA3B8' }}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Estimated Volume</label>
            <select value={volume} onChange={e => setVolume(e.target.value)} style={{ width: '100%', maxWidth: 400, padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
              <option value="">Select volume</option>
              {VOLUMES.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          {(estCost || selected.length > 0) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {estCost && (
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642′ }}>
                  <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Estimated Cost</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>${estCost}</div>
                  <div style={{ fontSize: 12, color: '#9BA3B8', marginTop: 4 }}>DFW average pricing</div>
                </div>
              )}
              {recycledItems.length > 0 && (
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #22C55E40′ }}>
                  <div style={{ color: '#22C55E', fontWeight: 700, marginBottom: 8 }}>♻️ Will Be Recycled</div>
                  {recycledItems.map(i => <div key={i} style={{ color: '#CBD2E0', fontSize: 13, marginBottom: 4 }}>• {i}</div>)}
                </div>
              )}
              {donatedItems.length > 0 && (
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #3B82F640′ }}>
                  <div style={{ color: '#3B82F6', fontWeight: 700, marginBottom: 8 }}>🎁 Will Be Donated</div>
                  {donatedItems.map(i => <div key={i} style={{ color: '#CBD2E0', fontSize: 13, marginBottom: 4 }}>• {i}</div>)}
                </div>
              )}
              {landfillItems.length > 0 && (
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #EF444440′ }}>
                  <div style={{ color: '#EF4444', fontWeight: 700, marginBottom: 8 }}>🗑️ Goes to Landfill</div>
                  {landfillItems.map(i => <div key={i} style={{ color: '#CBD2E0', fontSize: 13, marginBottom: 4 }}>• {i}</div>)}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 24, border: '1px solid #1E2D45′ }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📦 DFW Cost by Load Size</h2>
            {Object.entries(COSTS).map(([size, cost]) => (
              <div key={size} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #1E2D45′ }}>
                <span style={{ color: '#CBD2E0', fontSize: 13 }}>{size}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${cost}</span>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 24, border: '1px solid #1E2D45′ }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 Common Use Cases</h2>
            {[['Estate Cleanouts', 'Full-service clearing of a home after a loved one passes'], ['Garage Purge', 'Years of accumulated tools, furniture, boxes'], ['Post-Renovation Debris', 'Drywall, tile, flooring, lumber scraps'], ['Appliance Removal', 'Old fridges, washers, dryers — often includes recycling fee'], ['Hoarder Cleanup', 'Multi-load, phased — requires sensitivity and planning']].map(([title, desc]) => (
              <div key={title} style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13 }}>{title}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 24, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚡ Same-Day vs. Scheduled Pickup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Same-Day Pickup</div>
              <div style={{ color: '#9BA3B8', fontSize: 13, lineHeight: 1.7 }}>Available Mon–Sat, book before 10am • Expect 10–20% premium • Best for urgent clearouts or real estate prep • Confirm availability in your zip code</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Scheduled Pickup</div>
              <div style={{ color: '#9BA3B8', fontSize: 13, lineHeight: 1.7 }}>Book 2–5 days out for best pricing • Ideal for estate cleanouts and large volumes • More predictable arrival windows • Often includes free estimates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
