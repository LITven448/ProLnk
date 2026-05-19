import { useState } from 'react';

const ROOM_OPTIONS = ['1', '2', '3', '4', '5', '6+'];
const SPECIAL_ITEMS = ['Flat-screen TV', 'Artwork/mirrors', 'Piano', 'Gun safe', 'Antiques', 'Vinyl records', 'Candles/wax items', 'Wine collection', 'Aquarium', 'Plants'];

const BOX_PER_ROOM = 15;
const SUPPLY_COSTS: Record<string, number> = { 'Small boxes': 2, 'Medium boxes': 3, 'Large boxes': 4, 'Wardrobe boxes': 15, 'Packing tape (rolls)': 4, 'Bubble wrap (ft)': 0.5, 'Packing paper (lb)': 1 };

const TEXAS_HEAT_WARNINGS: Record<string, string> = {
  'Vinyl records': 'Records warp at 140°F+ — never leave in car or unventilated truck during TX summer',
  'Candles/wax items': 'Candles melt completely in Texas summer heat — pack last, move in AC vehicle',
  'Artwork/mirrors': 'Temperature swings cause canvas expansion/contraction — use specialty art boxes',
  'Wine collection': 'Heat destroys wine — transport in cooler or ship separately with temperature control',
  'Plants': 'Most movers won\’t move plants — transport yourself in AC vehicle',
  'Aquarium': 'Drain completely, transport fish separately, wrap tank in moving blankets',
};

export default function DFWPackingGuide() {
  const [rooms, setRooms] = useState('');
  const [specialItems, setSpecialItems] = useState<string[]>([]);

  const toggle = (item: string) => setSpecialItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

  const roomCount = parseInt(rooms) || 0;
  const baseBoxes = roomCount * BOX_PER_ROOM;
  const specialBoxes = specialItems.length * 3;
  const totalBoxes = baseBoxes + specialBoxes;

  const supplies = roomCount > 0 ? {
    'Small boxes': Math.round(totalBoxes * 0.3),
    'Medium boxes': Math.round(totalBoxes * 0.4),
    'Large boxes': Math.round(totalBoxes * 0.3),
    'Wardrobe boxes': Math.max(1, Math.round(roomCount * 0.5)),
    'Packing tape (rolls)': Math.max(3, Math.round(totalBoxes / 10)),
    'Bubble wrap (ft)': Math.round(totalBoxes * 2),
    'Packing paper (lb)': Math.round(totalBoxes * 1.5),
  } : null;

  const totalCost = supplies ? Object.entries(supplies).reduce((acc, [item, qty]) => acc + SUPPLY_COSTS[item] * qty, 0) : 0;
  const heatWarnings = specialItems.filter(i => TEXAS_HEAT_WARNINGS[i]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>DFW Moving Series</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>DFW Packing Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32, fontSize: 16 }}>Pack smarter for Texas heat, weight limits, and movers who expect labeled boxes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '📦', label: 'Start First', note: 'Off-season clothes, books, collectibles, décor' },
            { emoji: '🔥', label: 'Pack Last', note: 'Anything that melts or warps in TX summer heat' },
            { emoji: '⚖️', label: 'Box Weight Limit', note: 'Under 50 lbs per box — movers can refuse heavier' },
            { emoji: '🏷️', label: 'Label Every Box', note: 'Room + contents + FRAGILE on top AND sides' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#131F35', borderRadius: 12, padding: 20, border: '1px solid #1E2D45′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#9BA3B8′ }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>📋 Packing Supply Calculator</h2>
          <p style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 20 }}>Enter your room count and special items to get a full supply list and cost estimate.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Number of Rooms</label>
              <select value={rooms} onChange={e => setRooms(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
                <option value="">Select rooms</option>
                {ROOM_OPTIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Special Items</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SPECIAL_ITEMS.map(item => (
                  <button key={item} onClick={() => toggle(item)} style={{ padding: '6px 12px', borderRadius: 16, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12, backgroundColor: specialItems.includes(item) ? '#F5E642′ : '#1E2D45', color: specialItems.includes(item) ? '#0A1628' : '#9BA3B8' }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {heatWarnings.length > 0 && (
            <div style={{ backgroundColor: '#2A1010', borderRadius: 12, padding: 16, marginBottom: 20, border: '1px solid #EF444440′ }}>
              <div style={{ fontWeight: 700, color: '#FCA5A5', marginBottom: 10 }}>🔥 Texas Heat Warnings for Your Items</div>
              {heatWarnings.map(item => (
                <div key={item} style={{ marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, color: '#FCA5A5', fontSize: 13 }}>{item}</div>
                  <div style={{ color: '#9BA3B8', fontSize: 13 }}>{TEXAS_HEAT_WARNINGS[item]}</div>
                </div>
              ))}
            </div>
          )}

          {supplies && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 16, border: '2px solid #F5E642', textAlign: 'center' }}>
                  <div style={{ color: '#9BA3B8', fontSize: 12 }}>Total Boxes Needed</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>{totalBoxes}</div>
                </div>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 16, border: '1px solid #2A3A55', textAlign: 'center' }}>
                  <div style={{ color: '#9BA3B8', fontSize: 12 }}>Est. Supply Cost</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF' }}>${Math.round(totalCost)}</div>
                </div>
                <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 16, border: '1px solid #2A3A55', textAlign: 'center' }}>
                  <div style={{ color: '#9BA3B8', fontSize: 12 }}>Packing Days Est.</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF' }}>{Math.max(1, Math.round(roomCount * 0.75))}</div>
                </div>
              </div>
              <div>
                <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 10 }}>Full Supply List:</div>
                {Object.entries(supplies).map(([item, qty]) => (
                  <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D45', fontSize: 14 }}>
                    <span style={{ color: '#CBD2E0′ }}>{item}</span>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>× {qty} (~${Math.round(SUPPLY_COSTS[item] * qty)})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 24, border: '1px solid #1E2D45′ }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏷️ Labeling System</h2>
            {[['Room Name', 'Kitchen, Master BR, Office — in big letters'], ['Contents', 'Quick list of what\’s inside (e.g. "books, cables")'], ['Priority', 'OPEN FIRST for essentials box, LAST for storage'], ['Fragile', 'Mark on top AND all 4 sides — movers stack boxes'], ['Weight', 'Mark HEAVY on anything over 40 lbs']].map(([label, desc]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13 }}>{label}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 24, border: '1px solid #1E2D45′ }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🖼️ Specialty Item Packing</h2>
            {[['Flat-screen TVs', 'Original box is best. Otherwise: TV box kit (~$25) + foam corners'], ['Mirrors & Artwork', 'Mirror boxes, corner protectors, bundle vertically — never flat'], ['Dishes', 'Wrap each plate in paper, pack vertically like records — never flat'], ['Clothes', 'Use wardrobe boxes — saves folding and moving hangers'], ['Mattresses', 'Mattress bag ($10) protects against dirt and moisture']].map(([item, tip]) => (
              <div key={item} style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13 }}>{item}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13 }}>{tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
