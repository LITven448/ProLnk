import { useState } from 'react';

const PROJECT_SIZES = ['Small Patch (<50 sqft)', 'Single Room (50–300 sqft)', 'Multiple Rooms / Floor (300–1000 sqft)', 'Full Home or Addition (1000+ sqft)'];
const TEXTURE_TYPES = ['Skip Trowel', 'Orange Peel', 'Knockdown', 'Smooth / Level 5', 'Popcorn Removal + Retexture'];
const HIRE_MODES = ['All-in-One Contractor', 'Separate Specialists'];

type RecKey = string;
const RECS: Record<RecKey, { cost: string; mode: string; note: string }> = {
  'Small Patch (<50 sqft)|Skip Trowel|All-in-One Contractor': { cost: '$300–600', mode: 'All-in-One', note: 'Texture matching is an art — skip trowel is DFW’s most common texture. For patches, hire someone who specializes in matching, not just hanging.' },
  'Single Room (50–300 sqft)|Orange Peel|All-in-One Contractor': { cost: '$800–1,800', mode: 'All-in-One', note: 'Orange peel is spray-applied — full room is actually easier than patching. One contractor can hang, tape, texture, and prime efficiently.' },
  'Multiple Rooms / Floor (300–1000 sqft)|Smooth / Level 5|Separate Specialists': { cost: '$3,500–7,000', mode: 'Specialists', note: 'Level 5 smooth finish is unforgiving — DFW trend but demands a finish expert. Separate your taper and finish coat pro from your painter.' },
  'Full Home or Addition (1000+ sqft)|Skip Trowel|All-in-One Contractor': { cost: '$8,000–18,000', mode: 'All-in-One', note: 'At this scale, all-in-one GC manages sequencing — taping, texture, prime, and paint on a tight schedule reduces total project time by 2–3 weeks.' },
  'Small Patch (<50 sqft)|Popcorn Removal + Retexture|Separate Specialists': { cost: '$400–900', mode: 'Specialists', note: 'Pre-1980 DFW homes: test popcorn for asbestos before ANY removal. A certified abatement specialist is legally required if positive — budget $1,500–4,000 for abatement first.' },
};

const DEFAULT_REC = { cost: '$1,200–4,500', mode: 'Depends on texture complexity', note: 'DFW has strong specialty drywall contractors — get 3 bids and ask each to show texture match samples on your actual wall before committing.' };

export default function DFWDrywallContractorGuide() {
  const [size, setSize] = useState('');
  const [texture, setTexture] = useState('');
  const [mode, setMode] = useState('');

  const key = [size, texture, mode].join('|');
  const rec = RECS[key] || (size && texture && mode ? DEFAULT_REC : null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🧱 DFW Drywall Contractor Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: '2rem', lineHeight: 1.7 }}>
          Drywall work in DFW often splits across multiple specialists — hangers, tapers, texture crews, and painters each with their own trade. Knowing when to hire an all-in-one vs specialists saves both money and weeks of scheduling coordination.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{ label: '📐 Skip Trowel', desc: 'Most common DFW texture — hand-applied, organic variation. Impossible to machine match.' },
            { label: '🔴 Orange Peel', desc: 'Spray-applied, subtle bump — popular in DFW production homes 1990–2010.' },
            { label: '🪨 Knockdown', desc: 'Heavier splatter then flattened — common in older DFW custom homes.' },
            { label: '⬜ Level 5 Smooth', desc: 'Growing DFW trend — shows all imperfections, demands a true finish expert.' },
          ].map(c => (
            <div key={c.label} style={{ background: '#111E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>⚠️ DFW-Specific Considerations</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[{ title: 'Moisture-Resistant Drywall', body: 'Required in DFW bathrooms and kitchens — standard greenboard or cement board depending on tile application. Never use standard gypsum in wet areas.' },
              { title: 'Garage Fire Rating', body: 'DFW code: 5/8″ Type X drywall required on garage-to-living-space walls and ceilings. Most contractors know this — still verify it’s in the scope before signing.' },
              { title: 'Foundation Crack Repairs', body: 'DFW’s expansive clay soil causes drywall cracks yearly. Address the foundation cause first — drywall repairs without fixing the root issue will repeat within 12 months.' },
            ].map(item => (
              <div key={item.title} style={{ borderLeft: '3px solid #F5E642', paddingLeft: '1rem' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🔍 Project Cost Estimator</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
            {[['Project Size', PROJECT_SIZES, size, setSize], ['Texture Type', TEXTURE_TYPES, texture, setTexture], ['Hiring Approach', HIRE_MODES, mode, setMode]].map(([label, opts, val, setter]: any) => (
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
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Estimated Cost: {rec.cost}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 8 }}>Recommended Approach: {rec.mode}</div>
              <div style={{ color: '#E8EAF0', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', border: '1px solid #1E3050′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 Vetting a DFW Drywall Contractor</h2>
          {['Ask to see texture match samples on your specific wall before signing — not photos, actual samples',
            'Verify dust containment plan — drywall sanding without containment coats HVAC filters and vents',
            'Confirm they supply their own mud, tape, and corner bead — cheap materials show after painting',
            'For repairs over 50 sqft, get a Level 5 finish quote even if you plan to repaint — future sale value',
            'Foundation-related cracks: get a structural engineer report before any drywall repair work begins',
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
