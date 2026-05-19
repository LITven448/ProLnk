import { useState } from 'react';

export default function DFWRoofingPrimer2026() {
  const [level, setLevel] = useState('brand-new');

  const primers: Record<string, { icon: string; title: string; steps: string[] }> = {
    'brand-new': {
      icon: '🏠',
      title: 'Complete Beginner Primer',
      steps: [
        '1. Find your disclosure docs: Look for roof age in the seller disclosure or inspection report.',
        '2. Identify your shingles: Most DFW homes have 3-tab or architectural asphalt shingles. Walk your yard and look at the roof edge.',
        '3. Know DFW hail season: April through June is peak hail season. Storms in this window are the #1 cause of DFW roof claims.',
        '4. Get an inspection: Schedule a professional roof inspection every 2 years — sooner after any hail storm.',
        '5. Save a roofer contact: Find a vetted DFW roofer before you need one. Emergency calls cost 20–40% more.',
      ],
    },
    'some': {
      icon: '🔍',
      title: 'Intermediate Homeowner Primer',
      steps: [
        '1. Check flashing: Flashings around chimneys, vents, and skylights are the most common DFW leak source. Look for rust, cracks, or lifted edges.',
        '2. Inspect gutters: Granules in your gutters mean shingle degradation. More than a handful per year — schedule an inspection.',
        '3. Attic moisture: Check your attic after heavy DFW rain. Staining on decking indicates active leaks. Catch it early — rotten decking adds $1,500–$4,000 to replacement cost.',
        '4. Understand your warranty: Most DFW architectural shingles carry 30-year manufacturer warranties — but installation quality matters. Keep your original contractor invoice.',
        '5. Insurance awareness: File within 1 year of a hail event. DFW insurance carriers increasingly use satellite imagery for claim validation.',
      ],
    },
    'experienced': {
      icon: '⭐',
      title: 'Experienced Homeowner Deep Dive',
      steps: [
        '1. Decking condition matters: When replacing, specify 7/16″ or 1/2″ OSB or plywood decking. Avoid re-covering over old decking unless engineer-approved.',
        '2. Ventilation ratio: DFW code requires 1:150 ventilation ratio (attic sq ft to net free area). Improper ventilation voids many shingle warranties.',
        '3. Class 4 impact shingles: In DFW, Class 4 IR-rated shingles qualify for 20–30% insurance discounts. Calculate payback vs. premium cost.',
        '4. Radiant barrier: If replacing roof, add radiant barrier decking for $0.15–$0.25/sq ft during replacement — the only time it is cost-effective to install.',
        '5. Contractor vetting: Verify RCAT membership, active Texas insurance, and local DFW references. Storm chasers after hail events are the #1 roofing fraud vector in North Texas.',
      ],
    },
  };

  const p = primers[level];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Roofing Primer for New Homeowners 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Everything a DFW homeowner needs to know about their roof</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📚 Your Knowledge Level → Roofing Primer</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>Select Your Experience Level</label>
          <select value={level} onChange={e => setLevel(e.target.value)}
            style={{ background: '#1a2d4a', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '8px 12px', width: '100%', marginBottom: 16 }}>
            <option value="brand-new">Brand new homeowner</option>
            <option value="some">Some roofing knowledge</option>
            <option value="experienced">Experienced homeowner</option>
          </select>
          <div style={{ background: '#122040', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 16 }}>{p.title}</div>
            {p.steps.map((step, i) => (
              <p key={i} style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{step}</p>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {[
            { icon: '🌧️', label: 'DFW Hail Season', value: 'April – June' },
            { icon: '📅', label: 'Inspection Frequency', value: 'Every 2 Years' },
            { icon: '🏠', label: 'Most Common Shingle', value: 'Architectural Asphalt' },
            { icon: '⭐', label: 'Best Upgrade', value: 'Class 4 Impact Rated' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#0D1F38', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{stat.icon}</div>
              <div style={{ color: '#8899AA', fontSize: 11, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0D1F38', borderRadius: 12 }}>
          <p style={{ color: '#8899AA', fontSize: 12, margin: '0 0 12px' }}>Find a vetted DFW roofer before hail season — use ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get a Free Roofing Quote
          </button>
        </div>
      </div>
    </div>
  );
}