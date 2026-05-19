import { useState } from 'react';

export default function DFWRoofingHipCapGuide2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    const map: Record<string, string> = {
      hail: '⛈️ Hail Damage on Hip Caps: DFW hail strikes hip caps at a steeper angle than flat field shingles. Bruising, cracking, and granule loss occur at lower hail sizes (0.75″+). Manufacturer hip caps (GAF TimberTex, OC Hip and Ridge) are thicker and resist impact better than cut-from-shingle caps.',
      wind: '💨 Wind Resistance: DFW requires minimum 130 mph rated hip caps per IBC. Use 6-nail installation pattern on all hip cap courses. GAF TimberTex with StainGuard Plus is rated for 130 mph. Never use 4-nail pattern in DFW.',
      precut: '✂️ Pre-Cut vs Cut-From-Shingle: Manufacturer-made hip caps have consistent thickness and factory sealant strips. Cut-from-shingle caps vary in thickness, lack factory sealant, and void manufacturer warranties in DFW wind zones.',
      install: '🔨 Installation Technique: Start at the eave and work toward the ridge. 5-inch exposure on hip caps in DFW (reduces wind uplift). Nail 1″ from each edge, 5.5″ from bottom. Each cap must cover nails of the cap below.',
    };
    setResult(map[concern] || 'Select your hip cap concern above.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#F5E642', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏠 DFW Hip Cap Shingle Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Hip cap shingles in DFW — manufacturer caps vs cut caps, hail impact patterns, wind resistance ratings, and proper installation for DFW storm conditions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏷️', title: 'GAF TimberTex', desc: 'The DFW roofer standard. Double-thick with StainGuard Plus algae protection. 130 mph wind rating. Required for most DFW HOA roofing specs.' },
            { icon: '🔶', title: 'OC Hip and Ridge', desc: 'Owens Corning pre-cut hip cap with SureNail technology. Matches Duration shingle lines common in DFW new construction.' },
            { icon: '⛈️', title: 'Hail Impact Pattern', desc: 'DFW hail hits hip caps at steeper angles. Bruising and granule loss visible at 0.75″+ hail. Thicker manufacturer caps outperform cut caps in DFW storms.' },
            { icon: '💨', title: 'DFW Wind Zone Nailing', desc: '6-nail pattern required in DFW. 5-inch exposure (not 6-inch) reduces uplift surface. Improper nailing is the #1 hip cap failure after DFW storms.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: '16px', padding: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🎯 Hip Cap Issue Guide</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.85rem' }}>What is your hip cap concern?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
              <option value="">Select your concern...</option>
              <option value="hail">Hail damage assessment on hip caps</option>
              <option value="wind">Wind resistance and nailing pattern</option>
              <option value="precut">Pre-cut vs cut-from-shingle caps</option>
              <option value="install">Proper DFW installation technique</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Hip Cap Guide
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: '8px', color: '#F5E642', fontSize: '0.95rem' }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}