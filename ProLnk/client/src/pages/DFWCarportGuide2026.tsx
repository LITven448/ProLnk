import { useState } from 'react';

export default function DFWCarportGuide2026() {
  const [carportType, setCarportType] = useState<'freestanding' | 'attached'>('freestanding');
  const [material, setMaterial] = useState<'steel' | 'aluminum' | 'wood'>('steel');

  const costs: Record<string, Record<string, string>> = {
    freestanding: { steel: '$3,500–$6,000', aluminum: '$4,500–$7,500', wood: '$5,000–$9,000' },
    attached: { steel: '$4,500–$7,500', aluminum: '$5,500–$9,000', wood: '$6,500–$11,000' },
  };

  const materialNotes: Record<string, string> = {
    steel: 'Most popular in DFW. Strong, cost-effective, galvanized coating resists rust. Standard hail dents but holds structural integrity.',
    aluminum: 'Lightweight and rust-proof. DFW hail causes less damage than steel due to give in the metal. Higher cost but lower maintenance.',
    wood: 'Attractive and HOA-friendly. Requires paint or stain every 3 years in DFW UV. Higher labor cost than metal.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🏠 DFW HOME GUIDES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Carport Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Protect your vehicles from DFW hail and 105°F heat — carport costs and options for 2026.</p>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, marginBottom: 24, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 24 }}>🌩</div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>DFW Hail: The #1 Reason for Carports</div>
            <div style={{ fontSize: 13, color: '#94a3b8' }}>DFW averages $1B+ in hail damage annually. A carport pays for itself after one significant hail storm. Most DFW insurance agents recommend covered parking for vehicles over $30K in value.</div>
          </div>
        </div>

        <div style={{ background: '#111e33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Estimate Your DFW Carport Cost</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Carport Style</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['freestanding', 'attached'] as const).map(t => (
                <button key={t} onClick={() => setCarportType(t)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: carportType === t ? '#F5E642' : '#1e2d45', color: carportType === t ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {t === 'freestanding' ? 'Free-Standing' : 'Attached to Home'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Frame Material</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['steel', 'aluminum', 'wood'] as const).map(m => (
                <button key={m} onClick={() => setMaterial(m)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: material === m ? '#F5E642' : '#1e2d45', color: material === m ? '#0A1628' : '#fff', fontWeight: 600, textTransform: 'capitalize' }}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated DFW Cost</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642' }}>{costs[carportType][material]}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 8, background: '#111e33', borderRadius: 8, padding: '10px 14px', textAlign: 'left' }}>{materialNotes[material]}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '📋', title: 'Permit Required', desc: 'All DFW cities require permits for permanent carports. Temporary fabric structures often exempt — but blow away in DFW storms.' },
            { icon: '🏘', title: 'HOA Often Prohibits', desc: 'Many DFW HOAs ban freestanding carports or require they be hidden from street view. Check CC&Rs first.' },
            { icon: '🚗', title: '2-Car vs 1-Car', desc: 'Single: subtract 30%. Two-car carport is most common DFW purchase — fits standard 18 ft driveway.' },
            { icon: '🌡', title: 'DFW Sun Protection', desc: 'Interior temps 30–40°F cooler under carport vs open driveway in DFW summer. Worth it for leather interiors.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111e33', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get DFW Carport Quotes</div>
          <div style={{ color: '#1e2d45', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted carport installers — free, same-day estimates.</div>
        </div>
      </div>
    </div>
  );
}
