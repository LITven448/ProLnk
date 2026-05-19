import { useState } from 'react';

const rooms = [
  { id: 'living_large', label: 'Living Room — Large (18x20+)', size: 'large', use: 'living' },
  { id: 'living_med', label: 'Living Room — Medium (14x16)', size: 'medium', use: 'living' },
  { id: 'dining_formal', label: 'Dining Room — Formal', size: 'medium', use: 'dining' },
  { id: 'office', label: 'Home Office', size: 'small', use: 'office' },
  { id: 'primary', label: 'Primary Bedroom', size: 'large', use: 'bedroom' },
  { id: 'secondary', label: 'Secondary Bedroom', size: 'small', use: 'bedroom' },
];

const recommendations: Record<string, { arrangement: string; flow: string; keep: string[]; remove: string[] }> = {
  living_large: {
    arrangement: 'Float furniture away from walls — DFW buyers expect conversation zones. Two sofas facing with a coffee table, anchored by a 9x12 rug. TV on one wall, fireplace or art on opposite.',
    flow: 'Maintain 36" walkways on all sides. Create clear sightline to kitchen and outdoor patio — DFW buyers envision entertaining flow.',
    keep: ['Large sectional or sofa pair', 'Oversized coffee table', 'Statement art or TV wall', 'Warm area rug (9x12 minimum)'],
    remove: ['Multiple small accent chairs blocking flow', 'Extra side tables cluttering space', 'Entertainment center if TV mounts better', 'Anything blocking patio door sightline'],
  },
  living_med: {
    arrangement: 'Single sofa + loveseat or two chairs in L-shape facing TV. Keep furniture scaled to room. Avoid oversized sectionals — they overwhelm and signal small space to DFW buyers.',
    flow: 'Clear 30" minimum walkways. Mirror on one wall to open up space. Light curtains to ceiling for height illusion.',
    keep: ['One sofa, one chair or loveseat', 'Appropriately sized coffee table', 'Vertical art or mirrors', 'Light-colored rug to open space'],
    remove: ['Oversized sectional', 'Extra accent furniture', 'Heavy drapes at window height', 'Bulky entertainment center'],
  },
  dining_formal: {
    arrangement: 'Center table in room with 36" clearance on all sides. Round tables show better in DFW smaller dining rooms. Rectangular for larger. Chandelier centered over table.',
    flow: 'DFW buyers often convert formal dining to home office — stage it clearly as dining OR clearly as office, not ambiguous. Pick one story.',
    keep: ['Dining table and 4–6 chairs', 'Chandelier or statement light', 'Buffet or sideboard if room allows', 'Simple centerpiece'],
    remove: ['Extra china cabinet if tight on space', 'Leaf extensions making table too large', 'Bar cart blocking sideboard wall', 'Anything making room purpose unclear'],
  },
  office: {
    arrangement: 'Desk facing door or window — never back to door (buyer instinct negative). Built-ins or credenza behind desk. Ergonomic chair, good task lighting. Plants add life without clutter.',
    flow: 'Keep circulation to desk clear. Cable management matters for showings. Bookshelf organized, not packed. Clean whiteboard or blank wall behind video call position.',
    keep: ['Clean desk with minimal items', 'Quality chair', 'One bookshelf organized', 'Good overhead or task light'],
    remove: ['Stacks of paper or boxes', 'Gaming setup if positioning as office', 'Second monitor if makes space feel cramped', 'Personal photos covering walls'],
  },
  primary: {
    arrangement: 'King bed centered on longest wall with nightstands both sides. 36" on each side minimum. Dresser or armoire if closet is small. Seating area if room allows — DFW buyers love a sitting area.',
    flow: 'Clear path from door to bathroom and closet. Ensure walk-in closet door swings freely and is organized for showing.',
    keep: ['King or queen bed with quality headboard', 'Matching nightstands', 'Dresser if needed', 'One accent chair if space allows'],
    remove: ['Exercise equipment', 'Work desk (defeats primary bedroom purpose)', 'Excess decorative pillows covering bed', 'Oversized armoire blocking natural light'],
  },
  secondary: {
    arrangement: 'Full or queen bed on longest wall. Single dresser. Keep it simple — DFW buyers assess size by how much floor is visible. Less furniture = looks larger.',
    flow: 'Keep closet door operable and organized. Neutral bedding and decor appeals to DFW buyers imagining their own use.',
    keep: ['Full or queen bed', 'One dresser or small desk', 'Simple nightstand', 'Neutral window treatment'],
    remove: ['Bunk beds if targeting non-family buyers', 'Themed decor limiting buyer imagination', 'Extra furniture making room feel tight', 'Large toy storage units'],
  },
};

export default function DFWRoomLayoutGuide() {
  const [selected, setSelected] = useState('');
  const rec = selected ? recommendations[selected] : null;
  const room = rooms.find(r => r.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🛋️ DFW Home Seller Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Room Layout Guide<br />for DFW Buyers</h1>
        <p style={{ color: '#8B9DC3', marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
          Texas homes trend larger than national averages, but DFW buyers still evaluate furniture scale, traffic flow, and room purpose instantly. The right layout tells the right story — and the wrong layout kills deals.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '📐', title: 'Scale to Room', note: 'DFW buyers spot oversized furniture — it signals cramped space even in large rooms' },
            { icon: '🚶', title: '36" Walkways', note: 'Clear traffic paths through open floor plans are non-negotiable for DFW lifestyle' },
            { icon: '🎯', title: 'Purpose Clarity', note: 'Each room should tell one clear story — dining or office, not both' },
            { icon: '🌿', title: 'Visible Floor', note: 'More floor visible = larger feel; DFW buyers are conditioned by model home staging' },
          ].map(tip => (
            <div key={tip.title} style={{ background: '#0F2040', borderRadius: 10, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#F5E642' }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#8B9DC3', lineHeight: 1.5 }}>{tip.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔍 Room Layout Advisor</h2>
          <p style={{ color: '#8B9DC3', marginBottom: 16, fontSize: 14 }}>Select a room to get DFW-specific layout recommendations:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 24 }}>
            {rooms.map(r => (
              <button key={r.id} onClick={() => setSelected(r.id)} style={{ background: selected === r.id ? '#F5E642' : '#0A1628', color: selected === r.id ? '#0A1628' : '#E8EAF0', border: '2px solid', borderColor: selected === r.id ? '#F5E642' : '#1E3A5F', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13 }}>
                {r.label}
              </button>
            ))}
          </div>
          {rec && room && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 24, border: '1px solid #F5E642' }}>
              <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 20, color: '#F5E642' }}>{room.label}</h3>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: '#E8EAF0', fontSize: 15 }}>📐 Furniture Arrangement</div>
                <p style={{ color: '#8B9DC3', fontSize: 14, lineHeight: 1.7 }}>{rec.arrangement}</p>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: '#E8EAF0', fontSize: 15 }}>🚶 Traffic Flow Tips</div>
                <p style={{ color: '#8B9DC3', fontSize: 14, lineHeight: 1.7 }}>{rec.flow}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 10, color: '#4CAF50', fontSize: 14 }}>✅ Keep for DFW Buyers</div>
                  {rec.keep.map((k, i) => <div key={i} style={{ fontSize: 13, color: '#8B9DC3', marginBottom: 6, lineHeight: 1.4 }}>• {k}</div>)}
                </div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 10, color: '#FF6B6B', fontSize: 14 }}>🗑️ Remove Before Showing</div>
                  {rec.remove.map((r, i) => <div key={i} style={{ fontSize: 13, color: '#8B9DC3', marginBottom: 6, lineHeight: 1.4 }}>• {r}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
