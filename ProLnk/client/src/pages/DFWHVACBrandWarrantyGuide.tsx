import { useState } from 'react';

const brands = [
  { id: 'carrier', name: 'Carrier', icon: '❄️', registeredYears: 10, unregisteredYears: 5, laborYears: 1, notes: 'Carrier Infinity series carries up to 10-yr parts with registration. Labor is typically 1-yr through dealer — extended labor plans available. Missing annual maintenance records can void coil warranty.' },
  { id: 'trane', name: 'Trane', icon: '🏔️', registeredYears: 10, unregisteredYears: 5, laborYears: 1, notes: 'Trane XV and XR lines offer 10-yr registered parts warranties. Trane requires registration within 60 days of installation in Texas. DIY refrigerant addition voids the compressor warranty entirely.' },
  { id: 'lennox', name: 'Lennox', icon: '🌟', registeredYears: 10, unregisteredYears: 5, laborYears: 2, notes: 'Lennox Signature Series offers 10-yr parts and 2-yr labor when registered by a Dave Lennox Premier dealer. Unauthorized refrigerant work immediately voids compressor coverage.' },
  { id: 'york', name: 'York', icon: '🗽', registeredYears: 10, unregisteredYears: 5, laborYears: 1, notes: 'York offers up to 10-yr registered warranty on YXV/YXT series. Labor warranty is 1-yr standard; extended labor contracts available through dealer. Skipping annual tune-ups in DFW heat accelerates void risk.' },
  { id: 'goodman', name: 'Goodman', icon: '💪', registeredYears: 10, unregisteredYears: 5, laborYears: 1, notes: 'Goodman is popular in DFW for value. Lifetime compressor warranty on select models when registered within 60 days. No maintenance records required to file a claim, but DIY refrigerant work still voids compressor.' },
  { id: 'rheem', name: 'Rheem', icon: '🔥', registeredYears: 10, unregisteredYears: 5, laborYears: 1, notes: 'Rheem Prestige series: 10-yr parts registered, 5-yr unregistered. Labor is 1-yr dealer standard. Extended EcoNet protection plans available. Missing refrigerant certification on service records triggers warranty review.' },
];

const ages = [
  { id: 'new', label: '0–1 year old', icon: '🆕' },
  { id: 'mid', label: '2–5 years old', icon: '📅' },
  { id: 'older', label: '6–10 years old', icon: '⏳' },
  { id: 'expired', label: '10+ years old', icon: '⚠️' },
];

function getWarrantyStatus(brandId: string, ageId: string) {
  const brand = brands.find(b => b.id === brandId);
  if (!brand) return null;
  if (ageId === 'new') return { status: '✅ Full Coverage Active', color: '#22c55e', detail: `Register within 60 days for ${brand.registeredYears}-yr parts warranty. Labor warranty active. Keep all service records.` };
  if (ageId === 'mid') return { status: '✅ Registered Coverage Active', color: '#22c55e', detail: `Parts warranty active if registered. Labor warranty may have expired. Maintain annual DFW tune-up records.` };
  if (ageId === 'older') return { status: '🟡 Partial Coverage', color: '#F5E642', detail: `Parts may still be covered if registered. Labor warranty almost certainly expired. Compressor warranty status depends on registration and service history.` };
  return { status: '❌ Warranty Likely Expired', color: '#ef4444', detail: `Most manufacturer warranties expire at 10 years. Consider extended home warranty or set budget aside for replacement within 2–5 years.` };
}

export default function DFWHVACBrandWarrantyGuide() {
  const [brand, setBrand] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);

  const result = brand && age ? getWarrantyStatus(brand, age) : null;
  const selectedBrand = brands.find(b => b.id === brand);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW HVAC Brand Warranty Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          How manufacturer warranties actually work in DFW — what voids them, registered vs unregistered coverage, and labor vs parts differences.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem', fontSize: '0.9rem', letterSpacing: 1 }}>KEY WARRANTY FACTS FOR DFW</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '📝', title: 'Register Within 60 Days', desc: 'Most brands require registration within 60 days of install or warranty drops to 5 years.' },
              { icon: '🔧', title: 'Labor vs Parts', desc: 'Manufacturer covers parts. Labor (the tech visit) is typically 1-yr through your dealer unless extended.' },
              { icon: '💧', title: 'DIY Refrigerant = Void', desc: 'Any unauthorized refrigerant addition by an uncertified person voids the compressor warranty immediately.' },
              { icon: '📋', title: 'Maintenance Records', desc: 'Some brands require annual maintenance proof. Missing records can delay or deny claims.' },
            ].map(f => (
              <div key={f.title} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{f.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>Check your warranty status: Select your brand</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {brands.map(b => (
            <button key={b.id} onClick={() => setBrand(b.id === brand ? null : b.id)}
              style={{ background: brand === b.id ? '#F5E642′ : '#0f2240', color: brand === b.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: brand === b.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '0.75rem', cursor: ’pointer', fontWeight: 700, fontSize: '0.85rem' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{b.icon}</div>
              {b.name}
            </button>
          ))}
        </div>

        {brand && (
          <>
            <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>How old is the system?</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {ages.map(a => (
                <button key={a.id} onClick={() => setAge(a.id === age ? null : a.id)}
                  style={{ background: age === a.id ? '#F5E642′ : '#0f2240', color: age === a.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: age === a.id ? '#F5E642' : '#1e3a5f', borderRadius: 8, padding: '0.6rem 1rem', cursor: ’pointer', fontWeight: 700, fontSize: '0.85rem' }}>
                  {a.icon} {a.label}
                </button>
              ))}
            </div>
          </>
        )}

        {result && selectedBrand && (
          <div style={{ background: '#0f2240', border: `1px solid ${result.color}`, borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ color: result.color, fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>{result.status}</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.7, marginBottom: '1rem' }}>{result.detail}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>{selectedBrand.name.toUpperCase()} BRAND NOTES</div>
              <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0, fontSize: '0.9rem' }}>{selectedBrand.notes}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem' }}>🏠 Find Warranty-Knowledgeable Pros</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>ProLnk DFW HVAC pros know manufacturer warranty requirements and document service records properly to protect your coverage.</p>
        </div>
      </div>
    </div>
  );
}