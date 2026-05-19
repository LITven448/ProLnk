import { useState } from 'react';

const PROJECT_TYPES = ['Home Cleanout / Estate', 'Kitchen / Bath Remodel Demo', 'Roof Replacement', 'Landscaping / Yard Waste', 'Moving / Junk Removal', 'New Construction'];
const WASTE_VOLUMES = ['Very Light (<1 pickup truck load)', 'Light (1–2 pickup loads)', 'Moderate (half dumpster)', 'Heavy (full 10yd)', 'Large (20yd+ needed)'];
const CITIES = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland', 'Denton', 'Other DFW City'];

type RecKey = string;
const RECS: Record<RecKey, { size: string; cost: string; permit: string; note: string }> = {
  'Home Cleanout / Estate|Heavy (full 10yd)': { size: '10-Yard Dumpster', cost: '$350–500 (7-day rental)', permit: 'Not required if on private property', note: 'Estate cleanouts in DFW average 8–12 cubic yards — a 10yd is usually perfect. Keep driveway placement to avoid permit hassle.' },
  'Kitchen / Bath Remodel Demo|Moderate (half dumpster)': { size: '10-Yard Dumpster (split rental)', cost: '$350–500', permit: 'Not required if on private property', note: 'Drywall, tile, and fixtures from a full kitchen average 6–8 cubic yards. DFW dumpster companies often allow 2-day rentals for remodel debris at lower cost.' },
  'Roof Replacement|Heavy (full 10yd)': { size: '10-Yard or 15-Yard Dumpster', cost: '$400–600', permit: 'Check with your city — Dallas requires permit for street placement', note: 'Asphalt shingles are heavy — a standard DFW roof (2,000 sqft) produces 3–5 tons. Get a dumpster rated for heavy debris, not general waste.' },
  'Moving / Junk Removal|Light (1–2 pickup loads)': { size: 'Junk Removal Service (skip dumpster)', cost: '$150–350 for 2 loads', permit: 'Not required', note: 'For light loads, a junk removal crew in DFW is faster and often cheaper than dumpster rental. Companies like 1-800-GOT-JUNK operate daily across DFW.' },
  'Landscaping / Yard Waste|Large (20yd+ needed)': { size: '20-Yard Dumpster', cost: '$500–750', permit: 'Required if placed in street in most DFW cities', note: 'Yard waste (soil, sod, tree debris) is heavy — weight limits matter. Confirm your rental allows organic yard waste — some DFW providers charge extra for soil.' },
  'New Construction|Large (20yd+ needed)': { size: '30-Yard Dumpster', cost: '$700–1,100', permit: 'GC typically manages permit — confirm in contract', note: 'New construction in DFW produces substantial framing and wrap waste. 30yd is standard for new builds — GC should include dumpster in their scope.' },
};

const DEFAULT_REC = { size: '10-Yard Dumpster', cost: '$350–500', permit: 'Free on private property; $50–150 permit for street placement', note: 'The 10-yard is DFW’s most versatile dumpster — fits in most driveways and handles the majority of residential projects without overage fees.' };

const PERMIT_INFO: Record<string, string> = {
  'Dallas': 'Dallas requires a $65 street use permit for dumpster placement in public right-of-way. Apply at dallascityhall.com/departments/public-works.',
  'Plano': 'Plano requires permit for any dumpster on city streets — $45 fee. Private driveway: no permit needed.',
  'Frisco': 'Frisco does not require permits for driveway placement. Street placement requires city approval — contact Public Works.',
  'Fort Worth': 'Fort Worth requires a right-of-way encroachment permit — $75. DFW dumpster companies often handle this for you.',
  'McKinney': 'McKinney: no permit for private property. Street placement requires a temporary right-of-way permit from Public Works.',
  'Arlington': 'Arlington requires permits for any dumpster in public right-of-way — $50 fee. 48-hour advance notice required.',
};

export default function DFWDumpsterRentalGuide() {
  const [project, setProject] = useState('');
  const [volume, setVolume] = useState('');
  const [city, setCity] = useState('');

  const key = [project, volume].join('|');
  const rec = RECS[key] || (project && volume ? DEFAULT_REC : null);
  const permitInfo = PERMIT_INFO[city] || '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🗑️ DFW Dumpster Rental Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: '2rem', lineHeight: 1.7 }}>
          Dumpster or junk removal crew? The right answer depends on your project type and volume. For light loads, a junk crew is faster. For remodels and cleanouts, a dumpster gives you time to work at your pace — no crew waiting.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>🚫 DFW Prohibited Materials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {['Electronics (TVs, computers)', 'Tires (any quantity)', 'Hazardous materials (paint, solvents)', 'Asbestos-containing materials', 'Freon-containing appliances', 'Medical / biohazard waste', 'Propane tanks', 'Lead batteries'].map(item => (
              <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#9BA3B5', fontSize: '0.88rem' }}>
                <span style={{ color: '#EF4444', flexShrink: 0 }}>✕</span><span>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#9BA3B5', fontSize: '0.85rem', marginTop: '1rem', lineHeight: 1.5 }}>Dallas County Household Hazardous Waste accepts most prohibited items for free at 11234 Platt Rd, Dallas. Collin County offers quarterly HHW events in Plano and McKinney.</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>🔍 Size + Cost Estimator</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
            {[['Project Type', PROJECT_TYPES, project, setProject], ['Estimated Waste Volume', WASTE_VOLUMES, volume, setVolume], ['Your City (Permit Check)', CITIES, city, setCity]].map(([label, opts, val, setter]: any) => (
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
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642', marginBottom: permitInfo ? '1rem' : 0 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Recommended: {rec.size}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 4 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', marginBottom: 8 }}>Permit: {rec.permit}</div>
              <div style={{ color: '#E8EAF0', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.note}</div>
            </div>
          )}
          {permitInfo && city && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #2A3F60' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📍 {city} Permit Info</div>
              <div style={{ color: '#9BA3B5', fontSize: '0.9rem', lineHeight: 1.6 }}>{permitInfo}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.75rem', border: '1px solid #1E3050' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📋 DFW Dumpster Rental Tips</h2>
          {['Get quotes from at least 3 companies — DFW pricing varies up to 40% for same-size dumpsters',
            'Ask about weight limits before signing — overage fees in DFW average $75–100/ton over limit',
            'Confirm rental period — standard is 7 days, extensions typically $15–25/day in DFW',
            'Place boards under dumpster wheels to protect your driveway from cracking',
            'For roof tear-offs, call ahead — many DFW dumpster companies have separate rates for shingle-only loads',
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
