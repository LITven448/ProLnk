import { useState } from 'react';

const ROOM_TYPES = ['Bedroom', 'Living Room', 'Playroom', 'Home Office', 'Stairs'];
const LIFESTYLES = ['No Pets / No Kids', 'Pets Only', 'Kids Only', 'Pets + Kids'];
const BUDGETS = ['Budget ($1–2/sqft)', 'Mid-Range ($2–4/sqft)', 'Premium ($4–7/sqft)'];

const recommendations: Record<string, { style: string; padding: string; cost: string; note: string }> = {
  'Bedroom|No Pets / No Kids|Budget ($1–2/sqft)': { style: 'Berber Loop', padding: '7/16" rebond', cost: '$1.50–2.50/sqft installed', note: 'Durable, hides footprints, great for low-traffic bedrooms' },
  'Bedroom|Pets Only|Mid-Range ($2–4/sqft)': { style: 'Triexta Plush w/ Stain Protection', padding: '1/2" memory foam', cost: '$3.00–4.50/sqft installed', note: 'Pet-proof fibers — resist odor and moisture wicking' },
  'Bedroom|Pets + Kids|Premium ($4–7/sqft)': { style: 'SmartStrand Frieze', padding: '1/2" rebond high-density', cost: '$5–7/sqft installed', note: 'Twisted fibers hide dirt, built-in stain resistance — worth every cent' },
  'Living Room|No Pets / No Kids|Mid-Range ($2–4/sqft)': { style: 'Cut Pile Plush', padding: '7/16" rebond', cost: '$2.50–4/sqft installed', note: 'Soft underfoot, pairs well with DFW open-concept homes' },
  'Stairs|Pets + Kids|Premium ($4–7/sqft)': { style: 'Frieze / Textured Cut', padding: '3/8" firm rebond', cost: '$5–8/sqft installed', note: 'Tight twist prevents unraveling on stair noses — critical safety pick' },
};

const DEFAULT_REC = { style: 'Triexta Plush', padding: '7/16" rebond', cost: '$2–4/sqft installed', note: 'Versatile choice for most DFW homes — balances comfort, durability, and stain resistance' };

export default function DFWCarpetInstallationGuide() {
  const [room, setRoom] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [budget, setBudget] = useState('');

  const key = [room, lifestyle, budget].join('|');
  const rec = recommendations[key] || (room && lifestyle && budget ? DEFAULT_REC : null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏠 DFW Carpet Installation Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: '2rem', lineHeight: 1.7 }}>
          Carpet still earns its place in DFW bedrooms — sound dampening between floors, warmer underfoot during DFW's brief but real winters, and a softness LVP simply can't match. The key is choosing the right type for your lifestyle.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{ label: '🏅 Berber Loop', desc: 'Low-profile, hides traffic wear, snags with pet claws — best without pets' },
            { label: '🛋️ Plush Cut Pile', desc: 'Luxuriously soft, shows footprints, ideal for low-traffic bedrooms' },
            { label: '🔀 Frieze / Twisted', desc: 'Tightly twisted fibers resist matting — top pick for families and pets' },
            { label: '🧬 Triexta / SmartStrand', desc: 'Built-in stain resistance — no topical coating to wear off over time' },
          ].map(c => (
            <div key={c.label} style={{ background: '#111E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🐾 DFW Pet Owner Reality Check</h2>
          <p style={{ color: '#9BA3B5', lineHeight: 1.7, marginBottom: '0.75rem' }}>DFW ranks in the top 10 cities for pet ownership. Standard carpet without moisture barrier = permanent odor within 18 months. Triexta fibers resist liquid absorption at the molecular level — not a topical spray that washes away.</p>
          <p style={{ color: '#9BA3B5', lineHeight: 1.7 }}>Pad matters as much as carpet: opt for a moisture-barrier pad in any room where pets sleep. Budget an extra $0.50–1.00/sqft — it prevents subfloor replacement down the line.</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🔍 Carpet Style Recommender</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#9BA3B5', display: 'block', marginBottom: 6 }}>Room Type</label>
              <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3F60', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.95rem' }}>
                <option value=''>Select room...</option>
                {ROOM_TYPES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#9BA3B5', display: 'block', marginBottom: 6 }}>Lifestyle</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3F60', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.95rem' }}>
                <option value=''>Select lifestyle...</option>
                {LIFESTYLES.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#9BA3B5', display: 'block', marginBottom: 6 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3F60', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.95rem' }}>
                <option value=''>Select budget...</option>
                {BUDGETS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Recommended: {rec.style}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 4 }}>Padding: {rec.padding}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem', marginBottom: 8 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ color: '#E8EAF0', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 DFW Installation Checklist</h2>
          {['Get at least 3 in-home estimates — price variance in DFW can be 40%+',
            'Confirm installer removes and disposes of old carpet in quote',
            'Measure all doorways before choosing pile height — thick pads can block doors',
            'Ask installer about acclimation time in DFW summer heat before install',
            'Review manufacturer warranty: most require professional cleaning every 18–24 months',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span><span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
