import { useState } from 'react';

export default function DFWShedBuildingGuide2026() {
  const [material, setMaterial] = useState<'wood' | 'metal' | 'vinyl' | 'tuffshed'>('tuffshed');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  const costs: Record<string, Record<string, string>> = {
    wood: { small: '$2,500–$4,000', medium: '$4,000–$7,000', large: '$7,000–$12,000′ },
    metal: { small: '$800–$2,000', medium: '$2,000–$4,000', large: '$4,000–$7,000′ },
    vinyl: { small: '$1,500–$3,000', medium: '$3,000–$5,500', large: '$5,500–$9,000′ },
    tuffshed: { small: '$3,500–$5,500', medium: '$5,500–$9,000', large: '$9,000–$15,000′ },
  };

  const notes: Record<string, string> = {
    wood: 'Needs exterior paint every 3–5 years in DFW UV. Susceptible to termites. Most customizable.',
    metal: 'Cheapest option but dents in DFW hail storms. Rust risk with DFW humidity swings. No insulation.',
    vinyl: 'DFW summer heat (105°F+) can warp and discolor low-grade vinyl panels. Buy commercial-grade only.',
    tuffshed: 'Most popular in DFW. Built on-site, wood frame, custom options, 10-yr warranty. HOA-friendly designs.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🏠 DFW HOME GUIDES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Outdoor Storage Shed Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>The right shed for DFW conditions — hail, heat, HOA, and permit considerations explained.</p>

        <div style={{ background: '#111e33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Find Your DFW Shed Cost</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Shed Material</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['tuffshed', 'wood', 'vinyl', 'metal'] as const).map(m => (
                <button key={m} onClick={() => setMaterial(m)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: material === m ? '#F5E642′ : '#1e2d45', color: material === m ? '#0A1628' : '#fff', fontWeight: 600, textTransform: ’capitalize' }}>
                  {m === 'tuffshed' ? 'Tuff Shed' : m}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Size</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['small', 'medium', 'large'] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: size === s ? '#F5E642′ : '#1e2d45', color: size === s ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {s === 'small' ? '8×10′ : s === ’medium' ? '10×12′ : '12×16'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated DFW Cost</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>{costs[material][size]}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 8, textAlign: 'left', background: '#111e33', borderRadius: 8, padding: '12px 16px' }}>{notes[material]}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌩', title: 'DFW Hail Risk', desc: 'DFW averages 4–6 hail events per year. Metal sheds dent badly. Wood and vinyl handle better.' },
            { icon: '☀️', title: 'DFW UV/Heat', desc: '105°F+ summers degrade low-grade vinyl and dry out untreated wood. Buy quality or it fails in 5 yrs.' },
            { icon: '🏘', title: 'HOA Restrictions', desc: 'Most DFW HOAs restrict shed size, color, and placement. Get written approval before ordering.' },
            { icon: '📋', title: 'Permit Thresholds', desc: 'Dallas: permit required >200 sq ft. Frisco/Plano: >120 sq ft. McKinney: >100 sq ft. Verify your city.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111e33', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get DFW Shed Quotes</div>
          <div style={{ color: '#1e2d45', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted shed builders and installers — free, fast quotes.</div>
        </div>
      </div>
    </div>
  );
}
