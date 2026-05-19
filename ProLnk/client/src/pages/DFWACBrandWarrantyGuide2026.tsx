import { useState } from 'react';

export default function DFWACBrandWarrantyGuide2026() {
  const [brand, setBrand] = useState('trane');
  const [age, setAge] = useState(5);
  const [registered, setRegistered] = useState(true);

  const warranties: Record<string, { parts: number; compressor: number; registered: number }> = {
    trane: { parts: 5, compressor: 5, registered: 12 },
    lennox: { parts: 5, compressor: 5, registered: 10 },
    carrier: { parts: 5, compressor: 5, registered: 10 },
    york: { parts: 5, compressor: 5, registered: 10 },
  };

  const w = warranties[brand];
  const effectiveParts = registered ? 10 : w.parts;
  const effectiveComp = registered ? w.registered : w.compressor;
  const partsOk = age <= effectiveParts;
  const compOk = age <= effectiveComp;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🛡️ ProLnk DFW AC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW AC Brand Warranty Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Know your warranty status before calling for AC repair — DFW heat wears systems fast.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📋', title: 'Registration Required', desc: 'Must register within 60-90 days of install to get full warranty — unregistered units get 5yr parts only' },
            { icon: '❌', title: 'Warranty Voids', desc: 'Wrong refrigerant, improper install, skipped annual maintenance — all void manufacturer warranty' },
            { icon: '🔧', title: 'Labor Not Covered', desc: 'Manufacturer warranty covers parts only — labor coverage requires extended warranty purchase' },
            { icon: '📞', title: 'DFW Dealer Network', desc: 'Warranty claims must go through authorized DFW dealers — check dealer status before calling' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Warranty Status Checker</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>AC Brand</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['trane', 'lennox', 'carrier', 'york'].map(b => (
                <button key={b} onClick={() => setBrand(b)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize',
                    backgroundColor: brand === b ? '#F5E642′ : '#0A1628', color: brand === b ? '#0A1628' : '#fff' }}>
                  {b.charAt(0).toUpperCase() + b.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6 }}>System Age: {age} years</label>
            <input type="range" min={1} max={20} value={age} onChange={e => setAge(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <input type="checkbox" id="reg" checked={registered} onChange={e => setRegistered(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
            <label htmlFor="reg" style={{ color: '#94a3b8', cursor: 'pointer' }}>Unit was registered within 90 days of install</label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ backgroundColor: partsOk ? '#14532d' : '#7f1d1d', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{partsOk ? '✅' : '❌'}</div>
              <div style={{ fontWeight: 600 }}>Parts Warranty</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{partsOk ? `${effectiveParts - age}yr remaining` : 'Expired'}</div>
            </div>
            <div style={{ backgroundColor: compOk ? '#14532d' : '#7f1d1d', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{compOk ? '✅' : '❌'}</div>
              <div style={{ fontWeight: 600 }}>Compressor Warranty</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{compOk ? `${effectiveComp - age}yr remaining` : 'Expired'}</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Need AC Repair or Replacement in DFW?</div>
          <div style={{ color: '#0A1628', marginBottom: 16 }}>Get quotes from authorized warranty dealers across the DFW Metroplex</div>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get Warranty-Approved Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}