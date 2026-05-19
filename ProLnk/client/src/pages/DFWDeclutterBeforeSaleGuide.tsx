import { useState } from 'react';

const rooms = [
  { room: 'Kitchen', priority: 1, tasks: ['Clear all countertops', 'Remove excess small appliances', 'Organize pantry for showing', 'Hide pet food and supplies'] },
  { room: 'Living Room', priority: 2, tasks: ['Remove 30% of furniture for openness', 'Pack personal photos and knickknacks', 'Clear out entertainment center clutter', 'Hide cords and technology clutter'] },
  { room: 'Master Bedroom', priority: 3, tasks: ['Clear nightstands to 1-2 items max', 'Pare down closet to 50% capacity', 'Remove personal items from dresser tops', 'Store seasonal clothing off-site'] },
  { room: 'Bathrooms', priority: 4, tasks: ['Clear all counters except 3 items max', 'Remove expired medications and products', 'Organize under-sink storage neatly', 'Replace worn towels with hotel-style sets'] },
  { room: 'Garage', priority: 5, tasks: ['DFW buyers love 3-car garages — show space', 'Move excess items to storage unit', 'Organize tools and equipment visibly', 'Sweep and clean floor for showing'] },
  { room: 'Secondary Rooms', priority: 6, tasks: ['Stage as office or guest room — not storage', 'Remove personal collections', 'Clear closets to 30% capacity', 'Add neutral bedding and minimal decor'] },
];

const storageTips = [
  { tip: '🌡️ Climate-controlled storage is a must in DFW summers', detail: 'Heat damages furniture, electronics, and photos — standard units reach 130°F+ in summer.' },
  { tip: '📦 Pod storage in driveway OK during prep', detail: 'Remove pod before listing — buyers need to see full curb appeal and driveway.' },
  { tip: '👨‍👩‍👧 Family/friend storage for 60–90 days', detail: 'Great for seasonal items, sports equipment, holiday decorations.' },
];

export default function DFWDeclutterBeforeSaleGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [clutterLevel, setClutterLevel] = useState('moderate');

  const hours = homeSize === 'small' ? (clutterLevel === 'light' ? 8 : clutterLevel === 'moderate' ? 18 : 35)
    : homeSize === 'medium' ? (clutterLevel === 'light' ? 15 : clutterLevel === 'moderate' ? 30 : 55)
    : (clutterLevel === 'light' ? 25 : clutterLevel === 'moderate' ? 48 : 80);

  const weeks = Math.ceil(hours / 10);
  const storageNeeded = homeSize === 'large' || clutterLevel === 'heavy' ? '10x20 unit' : clutterLevel === 'moderate' ? '10x10 unit' : 'Small pod or friend\’s garage';

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f9f7f4', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>📦</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: '12px 0 8px' }}>
            DFW Declutter Before You Sell Guide
          </h1>
          <p style={{ color: '#555', fontSize: 16 }}>DFW buyers want open, airy spaces. Less stuff = faster sale and higher offers.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 20 }}>🏠 Tell us about your home</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#333', display: 'block', marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15, background: '#fafafa' }}>
                <option value="small">Under 2,000 sq ft</option>
                <option value="medium">2,000–3,500 sq ft</option>
                <option value="large">3,500+ sq ft</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#333', display: 'block', marginBottom: 8 }}>Clutter Level</label>
              <select value={clutterLevel} onChange={e => setClutterLevel(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15, background: '#fafafa' }}>
                <option value="light">Light — mostly organized</option>
                <option value="moderate">Moderate — typical family home</option>
                <option value="heavy">Heavy — lots of accumulated items</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[{ label: '⏱️ Estimated Hours', value: `${hours} hrs` }, { label: '📅 Timeline', value: `${weeks} week${weeks !== 1 ? 's' : ''}` }, { label: '🏪 Storage Needed', value: storageNeeded }].map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 150, background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ color: '#aaa', fontSize: 12, fontWeight: 600 }}>{s.label}</div>
                <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginTop: 6 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
          {rooms.map((r, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{r.priority}</span>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#0A1628′ }}>{r.room}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {r.tasks.map((t, j) => <li key={j} style={{ fontSize: 14, color: '#444', marginBottom: 5 }}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 20 }}>🌡️ DFW Storage Tips</h2>
          {storageTips.map((s, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: i < storageTips.length - 1 ? '1px solid #f0f0ee' : 'none' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.tip}</div>
              <div style={{ fontSize: 14, color: '#666′ }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: 28, background: '#0A1628', borderRadius: 16 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: 0 }}>Need a professional stager or organizer?</p>
          <p style={{ color: '#aaa', fontSize: 14, margin: '8px 0 0′ }}>Connect with DFW home prep pros who can help you get market-ready faster.</p>
        </div>
      </div>
    </div>
  );
}
