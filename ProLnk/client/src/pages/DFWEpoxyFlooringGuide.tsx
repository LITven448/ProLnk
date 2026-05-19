import { useState } from 'react';

const SPACE_TYPES = ['Residential Garage', 'Laundry Room', 'Workshop / Hobby Space', 'Commercial Kitchen', 'Retail / Showroom'];
const VEHICLE_TYPES = ['No Vehicles', 'Passenger Cars Only', 'Trucks / SUVs', 'High-Performance / Sports Cars'];
const STYLE_PREFS = ['Solid Color (Classic)', 'Flake / Chip Broadcast', 'Metallic / 3D Effect', 'Full Quartz Broadcast'];

type RecKey = string;
const RECS: Record<RecKey, { coating: string; cost: string; heat: string; note: string }> = {
  'Residential Garage|Passenger Cars Only|Solid Color (Classic)': { coating: 'Polyurea (Single Layer)', cost: '$3–5/sqft installed', heat: '⭐⭐⭐⭐⭐ Excellent', note: 'DFW heat kills standard epoxy — polyurea cures harder and won’t hot-tire-pick off in July. Standard for DFW garages.' },
  'Residential Garage|High-Performance / Sports Cars|Metallic / 3D Effect': { coating: 'Polyaspartic Metallic System', cost: '$6–10/sqft installed', heat: '⭐⭐⭐⭐⭐ Excellent', note: 'Polyaspartic sets in hours (critical in DFW heat — epoxy needs 72°F+ to cure properly). Stunning metallic finish with maximum durability.' },
  'Residential Garage|Trucks / SUVs|Flake / Chip Broadcast': { coating: 'Polyurea Base + Chip Flake + Polyaspartic Top', cost: '$4–7/sqft installed', heat: '⭐⭐⭐⭐⭐ Excellent', note: 'The DFW gold standard — hides dirt and oil, anti-slip texture, handles truck weight. Get the full-broadcast chip, not partial.' },
  'Commercial Kitchen|No Vehicles|Solid Color (Classic)': { coating: 'Commercial-Grade Epoxy Mortar System', cost: '$8–14/sqft installed', heat: '⭐⭐⭐ Moderate — kitchen stays climate-controlled', note: 'Food-safe, non-porous, withstands cleaning chemicals. Commercial epoxy mortar is 3x thicker than residential — mandatory for DFW health code compliance.' },
  'Retail / Showroom|No Vehicles|Metallic / 3D Effect': { coating: 'Metallic Epoxy (Climate-Controlled Only)', cost: '$7–12/sqft installed', heat: '⭐⭐ Not suitable for non-AC spaces in DFW', note: 'Stunning visual, but standard epoxy requires stable temps during install — only viable in AC’d DFW retail. Ask for polyaspartic metallic if temp is a concern.' },
  'Laundry Room|No Vehicles|Solid Color (Classic)': { coating: 'Residential Epoxy (Standard)', cost: '$2–4/sqft installed', heat: '⭐⭐⭐⭐ Good — interior space', note: 'Laundry rooms stay climate-controlled in DFW — standard epoxy performs well here. Focus on slip resistance additive for wet-floor safety.' },
};

const DEFAULT_REC = { coating: 'Polyurea or Polyaspartic', cost: '$4–8/sqft installed', heat: '⭐⭐⭐⭐⭐ DFW-Ready', note: 'For any DFW garage, avoid standard water-based epoxy. Polyurea and polyaspartic are the only coatings that reliably survive DFW summer heat cycles without hot-tire pickup.' };

export default function DFWEpoxyFlooringGuide() {
  const [space, setSpace] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [style, setStyle] = useState('');

  const key = [space, vehicle, style].join('|');
  const rec = RECS[key] || (space && vehicle && style ? DEFAULT_REC : null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏎️ DFW Epoxy Flooring Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW's 100°F+ summers create a problem most contractors won't tell you about: standard epoxy gets soft in heat, and hot tires literally peel it off your garage floor. Polyurea and polyaspartic coatings solve this — and they're now the DFW standard.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '1.25rem', marginBottom: '2rem', color: '#0A1628' }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 6 }}>⚠️ The DFW Hot Tire Warning</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Standard water-based epoxy is rated to ~85°F. Your black asphalt driveway in DFW reaches 150°F+ in July. Hot tires parked on softened epoxy literally pull chunks off the floor when you drive away. Always specify polyurea or polyaspartic for DFW garages.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{ label: '🛡️ Polyurea', desc: 'Hard cure, DFW heat-proof, 4x faster install than epoxy. The new DFW standard.' },
            { label: '⚡ Polyaspartic', desc: 'Fastest cure (2–4 hrs), UV stable, sets in DFW heat — premium option.' },
            { label: '🎨 Metallic Epoxy', desc: 'Stunning 3D effect — DFW garage conversion trend, but requires AC during install.' },
            { label: '🔵 Chip/Flake Broadcast', desc: 'Most popular DFW residential — hides dirt, anti-slip, durable under trucks.' },
          ].map(c => (
            <div key={c.label} style={{ background: '#111E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🔍 Coating Recommender</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
            {[['Space Type', SPACE_TYPES, space, setSpace], ['Vehicle Type', VEHICLE_TYPES, vehicle, setVehicle], ['Style Preference', STYLE_PREFS, style, setStyle]].map(([label, opts, val, setter]: any) => (
              <div key={label}>
                <label style={{ fontSize: '0.85rem', color: '#9BA3B5', display: 'block', marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3F60', borderRadius: 8, padding: '0.6rem 0.9rem', fontSize: '0.95rem' }}>
                  <option value=''>Select...</option>
                  {opts.map((o: string) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Recommended: {rec.coating}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 4 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem', marginBottom: 8 }}>DFW Heat Suitability: {rec.heat}</div>
              <div style={{ color: '#E8EAF0', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 Hiring a DFW Epoxy Contractor</h2>
          {['Ask specifically: "Is this polyurea or polyaspartic?" — if they say standard epoxy, walk away for garages',
            'Confirm surface prep: diamond grinding required for proper adhesion (not just acid etching)',
            'Check for moisture testing — DFW slab moisture causes delamination within 6 months if skipped',
            'Get warranty in writing — reputable DFW contractors offer 5–15 year warranties on polyurea systems',
            'Schedule install in spring or fall if possible — extreme summer heat challenges install windows',
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
