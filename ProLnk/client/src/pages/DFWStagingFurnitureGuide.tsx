import { useState } from 'react';

const recommendations: Record<string, Record<string, { remove: string[]; keep: string[]; add: string[] }>> = {
  living: {
    small: {
      remove: ['Extra accent chairs', 'Oversized sectional', 'Large coffee table', 'Extra side tables', 'Floor plants blocking windows'],
      keep: ['One sofa (max 84″)', 'Single coffee table', 'One accent chair', 'Slim TV stand'],
      add: ['Large mirror to expand space', 'Single statement rug (5x8)', 'Two matching lamps'],
    },
    medium: {
      remove: ['Recliners', 'Extra seating beyond 6 pieces', 'Heavy dark armoires', 'Cluttered bookshelves'],
      keep: ['Sofa + loveseat or 2 chairs', 'Coffee table', 'Media console', 'One bookshelf (styled)'],
      add: ['Area rug (8x10)', 'Matching lamp pair', 'Simple throw + pillow set'],
    },
    large: {
      remove: ['Mismatched furniture sets', 'Children\’s toys or play equipment', 'Extra gaming chairs', 'Dated entertainment centers'],
      keep: ['Full seating arrangement', 'Coffee + end tables', 'Media setup'],
      add: ['Conversation grouping layout', 'Layered rugs', 'Statement art piece'],
    },
  },
  bedroom: {
    small: {
      remove: ['Dressers (use closet)', 'Extra chairs', 'Nightstands if room is tight', 'Exercise equipment'],
      keep: ['Bed with headboard', 'One small nightstand', 'Slim dresser if space allows'],
      add: ['Neutral bedding set', 'Two matching lamps', 'Full-length mirror'],
    },
    medium: {
      remove: ['Extra dressers beyond one', 'Workout equipment', 'Cluttered vanity', 'Kids\’ furniture in adult rooms'],
      keep: ['Bed + two nightstands', 'One dresser or chest', 'Bench at foot of bed'],
      add: ['Coordinated bedding', 'Table lamps', 'Simple artwork above headboard'],
    },
    large: {
      remove: ['Unused furniture pieces', 'Overfilled dressers', 'Excessive decorative pillows'],
      keep: ['Full bedroom suite', 'Seating area if space allows', 'Full-length mirror'],
      add: ['Sitting area with two chairs', 'Layered bedding', 'Cohesive lamp set'],
    },
  },
  dining: {
    small: {
      remove: ['China cabinet or hutch', 'Extra chairs beyond 4', 'Bar cart if space is tight'],
      keep: ['Table for 4', 'Four chairs', 'Simple pendant or chandelier'],
      add: ['Table runner', 'Simple centerpiece (no fruit bowls)', 'Mirror on wall'],
    },
    medium: {
      remove: ['Oversized china cabinet', 'Leaf extensions (store them)', 'Mismatched chairs'],
      keep: ['Table for 6', 'Matching chairs', 'Buffet or sideboard'],
      add: ['Chandelier upgrade if dated', 'Simple table setting for photos', 'Artwork'],
    },
    large: {
      remove: ['Extra furniture beyond dining set', 'Cluttered buffet surfaces', 'Holiday decorations'],
      keep: ['Full dining set', 'Buffet/sideboard', 'Bar area if present'],
      add: ['Statement chandelier', 'Styled buffet', 'Large art piece'],
    },
  },
};

export default function DFWStagingFurnitureGuide() {
  const [room, setRoom] = useState('');
  const [size, setSize] = useState('');

  const result = room && size ? recommendations[room]?.[size] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>🛋️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Furniture Staging Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>DFW buyers want to visualize space — most sellers have too much furniture. Here's exactly what to move, keep, and add.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 DFW Market Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Heavy dark furniture makes DFW homes feel smaller than they are — especially in ranch-style layouts', '⚠️'],
              ['DFW buyers compare your home to new construction — which is always staged minimally', '🏗️'],
              ['Removing 30-40% of furniture is standard — not optional — for competitive listings', '📦'],
              ['Open floor plans dominate DFW — furniture groupings define the space', '🗺️'],
            ].map(([tip, icon], i) => (
              <div key={i} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 12, border: '1px solid #E2E8F0′ }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <p style={{ color: '#475569', fontSize: 13, margin: '6px 0 0′ }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Staging Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Room Type</label>
              <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, backgroundColor: '#fff' }}>
                <option value="">Select room...</option>
                <option value="living">Living Room</option>
                <option value="bedroom">Bedroom</option>
                <option value="dining">Dining Room</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, backgroundColor: '#fff' }}>
                <option value="">Select size...</option>
                <option value="small">Under 1,800 sq ft</option>
                <option value="medium">1,800–2,800 sq ft</option>
                <option value="large">2,800+ sq ft</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {([['🚫 Remove', result.remove, '#FEF2F2', '#DC2626'], ['✅ Keep', result.keep, '#F0FDF4', '#16A34A'], ['➕ Add', result.add, '#EFF6FF', '#2563EB']] as [string, string[], string, string][]).map(([label, items, bg, color]) => (
                <div key={label} style={{ backgroundColor: bg, borderRadius: 8, padding: 16, border: `1px solid ${color}30` }}>
                  <div style={{ color, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{label}</div>
                  {items.map((item, i) => (
                    <div key={i} style={{ color: '#374151', fontSize: 13, marginBottom: 6, paddingLeft: 8, borderLeft: `2px solid ${color}` }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>📦 Storage Tip</p>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>Rent a pod or storage unit for 60–90 days. Cost: $100–200/mo. ROI: typically $3,000–10,000 in additional sale price in DFW.</p>
        </div>
      </div>
    </div>
  );
}
