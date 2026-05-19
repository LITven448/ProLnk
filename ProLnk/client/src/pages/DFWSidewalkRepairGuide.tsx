import { useState } from 'react';

const DAMAGE_TYPES = [
  { id: 'trip', label: 'Trip Hazard (raised section > 1/2″)', repair: 'grinding', urgency: 'high' },
  { id: 'tree_root', label: 'Tree Root Heave', repair: 'removal', urgency: 'high' },
  { id: 'clay_heave', label: 'Clay Soil Heave / Cracking', repair: 'mudjacking', urgency: 'medium' },
  { id: 'surface_crack', label: 'Surface Cracks (cosmetic)', repair: 'patch', urgency: 'low' },
  { id: 'settled', label: 'Settled / Sunken Section', repair: 'mudjacking', urgency: 'medium' },
];

const OWNERSHIP_TYPES = [
  { id: 'city_adjacent', label: 'Adjacent to street / public ROW' },
  { id: 'private', label: 'Private property / backyard path' },
  { id: 'unknown', label: 'Not sure' },
];

const REPAIR_DETAILS = {
  grinding: { label: 'Concrete Grinding', low: 150, high: 400, desc: 'Grind raised edge to eliminate trip hazard. Fast, permanent, most cost-effective for small elevation differences. ADA requires < 1/4″ vertical change after repair.' },
  removal: { label: 'Full Section Replacement', low: 800, high: 2500, desc: 'Remove heaved section, cut roots or install root barrier, pour new concrete. Root barrier is essential — without it, heave recurs in 3–5 years.' },
  mudjacking: { label: 'Mudjacking / Foam Lifting', low: 400, high: 1200, desc: 'Pump slurry or expanding foam under settled slab to re-level. Effective on DFW clay if settled from moisture loss. Does not work on tree root heave.' },
  patch: { label: 'Crack Patching', low: 100, high: 350, desc: 'Fill cracks with concrete patch compound. Cosmetic repair — does not address underlying cause. Monitor for progression.' },
};

export default function DFWSidewalkRepairGuide() {
  const [damage, setDamage] = useState('');
  const [ownership, setOwnership] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    if (!damage || !ownership) return;
    const dt = DAMAGE_TYPES.find(x => x.id === damage);
    const rd = REPAIR_DETAILS[dt.repair];
    const responsibility = ownership === 'city_adjacent'
      ? 'Contact your city first. In DFW: Dallas requires homeowners to repair adjacent sidewalks. Fort Worth repairs its own. Plano, Frisco, and McKinney vary. Check with your city’s public works department before hiring anyone.'
      : ownership === 'private'
      ? 'This is fully your responsibility. Obtain permits if required — DFW municipalities typically require permits for sidewalk replacement over 50 sq ft.'
      : 'Look for a sidewalk easement on your property survey. The plat map at your county appraisal district will show public ROW boundaries.';
    const ada = dt.urgency === 'high' ? 'ADA liability: Unrepaired trip hazards on accessible routes create legal exposure. Document the defect and repair promptly.' : null;
    setResult({ repair: rd, responsibility, ada, urgency: dt.urgency });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW CONCRETE GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🚶 Sidewalk Repair Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW sidewalk repairs involve unique city-vs-homeowner responsibility questions, Blackland Prairie clay heave, and aggressive tree root systems. Understanding who is responsible and the right repair method saves significant money.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🏛️', title: 'City vs Homeowner — DFW Varies', desc: 'Dallas: homeowners responsible for adjacent sidewalks. Fort Worth: city repairs its sidewalks. Plano, McKinney, Frisco: check individually. Always verify before paying — some DFW cities have repair programs or cost-share arrangements.' },
            { icon: '🌍', title: 'Clay Heave — DFW Specific', desc: 'Blackland Prairie clay expands when wet and contracts when dry, lifting sidewalk panels seasonally. Unlike tree root heave, clay heave can sometimes be addressed with mudjacking and drainage improvements.' },
            { icon: '🌳', title: 'Tree Root Responsibility', desc: 'If a city street tree’s roots caused the damage, the city may be responsible. Document root-to-tree connection with photos before repair. DFW cities have settled sidewalk injury claims.' },
            { icon: '♿', title: 'ADA Compliance', desc: 'Sidewalks adjacent to public ways must meet ADA standards: max 1/4″ vertical change at joints, 2% cross-slope max, 5% running slope max. Non-compliant repairs create liability.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', border: '1px solid #1e3a5f', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Repair Method Finder</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Type of Damage</label>
              <select value={damage} onChange={e => setDamage(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select damage type...</option>
                {DAMAGE_TYPES.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Sidewalk Location / Ownership</label>
              <select value={ownership} onChange={e => setOwnership(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select ownership...</option>
                {OWNERSHIP_TYPES.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Get Recommendation</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Recommended: {result.repair.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>${result.repair.low.toLocaleString()} – ${result.repair.high.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{result.repair.desc}</div>
              {result.ada && <div style={{ background: '#7f1d1d', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 13, color: '#fca5a5′ }}>⚠️ {result.ada}</div>}
              <div style={{ background: '#112240', borderRadius: 8, padding: 14, fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>
                <strong style={{ color: '#F5E642′ }}>Responsibility: </strong>{result.responsibility}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>File a 311 service request with your city before hiring a contractor for any sidewalk adjacent to a public street. Some DFW cities have free repair programs or will share costs. Keep a record of the request number.</div>
        </div>
      </div>
    </div>
  );
}
