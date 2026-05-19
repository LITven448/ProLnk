import { useState } from 'react';

const anchorData: Record<string, Record<string, { anchor: string; limit: string; steps: string }>> = {
  'Under 10 lbs': {
    'Standard drywall': { anchor: 'Plastic expansion anchor', limit: '5–15 lbs', steps: '1. Drill pilot hole to anchor size. 2. Tap anchor flush. 3. Drive screw — anchor expands. Good for picture frames and light shelves.' },
    'DFW concrete block': { anchor: 'Concrete plastic anchor', limit: '10–20 lbs', steps: '1. Masonry drill bit required. 2. Blow dust from hole. 3. Tap anchor in. 4. Drive screw firmly.' },
  },
  '10–50 lbs': {
    'Standard drywall': { anchor: 'Self-drilling toggle (E-Z Ancor)', limit: '25–50 lbs', steps: '1. No pre-drill needed. 2. Drive anchor with Phillips bit. 3. Remove and reinsert screw with fixture. Fast and reliable for DFW shelving.' },
    'DFW concrete block': { anchor: 'Sleeve anchor or wedge anchor', limit: '50–200 lbs', steps: '1. Hammer drill required. 2. Drill to depth. 3. Insert anchor. 4. Tighten nut until snug — do not over-torque.' },
  },
  '50–100 lbs': {
    'Standard drywall': { anchor: 'Toggle bolt (spring or strap)', limit: '50–100 lbs per anchor', steps: '1. Drill 1/2" hole. 2. Fold wings, insert. 3. Pull back firmly before tightening. DFW tip: use 2 anchors side by side for TVs.' },
    'DFW concrete block': { anchor: 'Wedge anchor or epoxy anchor', limit: '100–500 lbs', steps: '1. Hammer drill + masonry bit. 2. Clean hole. 3. For epoxy: inject, insert rod, wait full cure (24h in DFW heat). 4. Strongest option available.' },
  },
  '100+ lbs': {
    'Standard drywall': { anchor: 'Find the stud', limit: 'Stud: 200+ lbs', steps: 'For 100+ lbs, anchors alone are not reliable — find the stud with a stud finder. DFW homes: studs at 16" or 24" OC. Lag into stud for TVs, heavy shelving, gym equipment.' },
    'DFW concrete block': { anchor: 'Epoxy anchor system', limit: '500+ lbs', steps: '1. Hammer drill, clean hole. 2. Two-part epoxy injection. 3. Insert all-thread rod. 4. Allow 24h minimum cure in DFW summer heat. Rate drops 30% above 90°F — work early morning.' },
  },
};

export default function DFWAnchorGuide() {
  const [weight, setWeight] = useState('');
  const [wallType, setWallType] = useState('');
  const result = weight && wallType ? anchorData[weight]?.[wallType] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>⚓ DFW HOME GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Wall Anchor Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Toggle bolts, molly bolts, plastic anchors, self-drilling — what holds what in DFW drywall and concrete.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { name: 'Plastic Expansion', emoji: '🔵', range: '5–15 lbs', best: 'Light decor, picture frames' },
            { name: 'Self-Drilling Toggle', emoji: '🟡', range: '25–50 lbs', best: 'Shelves, mirrors, TVs under 50 lbs' },
            { name: 'Spring Toggle Bolt', emoji: '🔴', range: '50–100 lbs', best: 'Heavy shelves, towel bars' },
            { name: 'Epoxy / Wedge Anchor', emoji: '🟤', range: '100–500+ lbs', best: 'Concrete, structural loads' },
          ].map(a => (
            <div key={a.name} style={{ background: '#0f2030', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{a.emoji}</div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{a.name}</div>
              <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{a.range}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{a.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>☀️ DFW Wall Reality</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Older DFW homes (pre-1980) may have plaster over lath — not standard drywall. Test by drilling a small pilot hole: 
            drywall produces white dust, plaster is harder and produces grey-white dust. Plaster requires different anchor sizing. 
            Many DFW garages and exterior walls use concrete block — always use masonry anchors, never drywall anchors in concrete.
          </p>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642' }}>🎯 DFW Anchor Selector</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Weight to Hang</label>
              <select value={weight} onChange={e => setWeight(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select weight range</option>
                <option value="Under 10 lbs">Under 10 lbs</option>
                <option value="10–50 lbs">10–50 lbs</option>
                <option value="50–100 lbs">50–100 lbs</option>
                <option value="100+ lbs">100+ lbs</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW Wall Type</label>
              <select value={wallType} onChange={e => setWallType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select wall type</option>
                <option value="Standard drywall">Standard drywall</option>
                <option value="DFW concrete block">DFW concrete / block</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642' }}>Anchor Type:</span> <span style={{ color: '#fff' }}>{result.anchor}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642' }}>Weight Limit:</span> <span style={{ color: '#fff' }}>{result.limit}</span></div>
              <div><span style={{ color: '#F5E642' }}>Steps:</span> <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.steps}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ DFW Safety Rule</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Never hang a TV, heavy mirror, or gym equipment from a single anchor. Use at least 2 anchor points, 
            or locate studs. DFW homes built after 2000 use engineered lumber — still use studs for 50+ lb loads. 
            When in doubt, call a ProLnk handyman — anchor failures cause serious injury.
          </p>
        </div>
      </div>
    </div>
  );
}
