import { useState } from 'react';

const ROOF_SIZES = [
  { label: '1,200 sq ft roof', sqft: 1200 },
  { label: '1,600 sq ft roof', sqft: 1600 },
  { label: '2,000 sq ft roof', sqft: 2000 },
  { label: '2,500 sq ft roof', sqft: 2500 },
  { label: '3,000 sq ft roof', sqft: 3000 },
  { label: '3,500+ sq ft roof', sqft: 3500 },
];

const SHINGLE_TYPES = [
  { label: 'Standard 3-Tab Asphalt', costPerSqft: 4.5 },
  { label: 'Architectural (GAF Timberline)', costPerSqft: 5.5 },
  { label: 'Owens Corning Duration Storm', costPerSqft: 6.2 },
  { label: 'Impact-Resistant Class 4', costPerSqft: 7.5 },
];

export default function DFWRooferAllen() {
  const [roofIdx, setRoofIdx] = useState(2);
  const [shingleIdx, setShingleIdx] = useState(1);

  const roof = ROOF_SIZES[roofIdx];
  const shingle = SHINGLE_TYPES[shingleIdx];
  const lowEst = Math.round(roof.sqft * shingle.costPerSqft * 0.9);
  const highEst = Math.round(roof.sqft * shingle.costPerSqft * 1.25);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112244 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏠</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 12px', lineHeight: 1.2 }}>
          Allen TX Roofers
        </h1>
        <p style={{ fontSize: 20, color: '#F5E642', fontWeight: 700, margin: '0 0 16px' }}>
          Hail Damage Specialists · Insurance Claim Experts · Fast Estimates
        </p>
        <p style={{ fontSize: 16, color: '#aac', maxWidth: 620, margin: '0 auto 32px' }}>
          Allen sits squarely in "Hail Alley" — one of the most hail-battered corridors in the United States.
          After every major storm, thousands of Allen homeowners need roof inspections, insurance claims filed,
          and quality replacements. ProLnk connects you to vetted local roofers who specialize in hail damage and
          know the insurance process cold.
        </p>
        <a
          href="/signup"
          style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Allen Waitlist — Free
        </a>
      </div>

      {/* Hail Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, padding: '40px 24px', maxWidth: 900, margin: '0 auto' }}>
        {[
          { icon: '🌩️', label: '2024 Hail Events', value: '7 major storms (Apr–Jun)' },
          { icon: '💰', label: 'Avg Claim Value', value: '$11,200 per home' },
          { icon: '🔨', label: 'Roof Replacement', value: '$8,000 – $16,000' },
          { icon: '📋', label: 'Claim Approval Rate', value: '~78% with proper docs' },
        ].map(s => (
          <div key={s.label} style={{ background: '#112244', borderRadius: 10, padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{s.icon}</div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Cost Calculator */}
      <div style={{ background: '#112244', borderRadius: 14, padding: '32px', maxWidth: 700, margin: '0 auto 40px', width: 'calc(100% - 48px)' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 24px' }}>
          🧮 Allen Roof Replacement Estimator
        </h2>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Roof Size</label>
        <select
          value={roofIdx}
          onChange={e => setRoofIdx(Number(e.target.value))}
          style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 15, marginBottom: 20 }}
        >
          {ROOF_SIZES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
        </select>

        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Shingle Type</label>
        <select
          value={shingleIdx}
          onChange={e => setShingleIdx(Number(e.target.value))}
          style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334', fontSize: 15, marginBottom: 24 }}
        >
          {SHINGLE_TYPES.map((s, i) => <option key={i} value={i}>{s.label}</option>)}
        </select>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {[
            { label: 'Roof Area', value: `${roof.sqft.toLocaleString()} sq ft` },
            { label: 'Low Estimate', value: `$${lowEst.toLocaleString()}` },
            { label: 'High Estimate', value: `$${highEst.toLocaleString()}` },
          ].map(s => (
            <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#aac', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 15 }}>{s.value}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#889', marginTop: 16 }}>
          * Class 4 impact-resistant shingles may qualify for a 20–30% insurance discount in Texas.
          Ask your ProLnk roofer about impact-rating discounts before choosing a shingle grade.
        </p>
      </div>

      {/* Insurance Claim Process */}
      <div style={{ padding: '0 24px 48px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 24 }}>
          The Allen Hail Insurance Process
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { step: '1', icon: '🌩️', title: 'Storm Hits', desc: 'Hail event reported. Document damage within 48 hours — photos and date-stamped.' },
            { step: '2', icon: '🔍', title: 'Free Inspection', desc: 'ProLnk roofer performs a thorough damage assessment. Report ready for your insurer.' },
            { step: '3', icon: '📋', title: 'Claim Filed', desc: 'Roofer walks you through the claim. Adjuster meets on-site for scope of loss.' },
            { step: '4', icon: '🔨', title: 'Approved & Built', desc: 'Insurance pays ACV or RCV. Roofer completes work, you pay deductible only.' },
          ].map(c => (
            <div key={c.step} style={{ background: '#112244', borderRadius: 10, padding: '20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: 16, background: '#F5E642', color: '#0A1628', fontWeight: 900, borderRadius: 20, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{c.step}</div>
              <div style={{ fontSize: 28, marginBottom: 8, marginTop: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#F5E642' }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#aac', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#F5E642', padding: '48px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: '0 0 12px' }}>
          Hail Hit Your Allen Home? Get 3 Quotes Free.
        </h2>
        <p style={{ color: '#0A1628', fontSize: 16, maxWidth: 500, margin: '0 auto 28px' }}>
          ProLnk connects Allen homeowners with vetted roofers who know hail damage, know your insurance company, and get jobs done right.
        </p>
        <a
          href="/signup"
          style={{ background: '#0A1628', color: '#F5E642', fontWeight: 800, padding: '16px 40px', borderRadius: 8, fontSize: 18, textDecoration: 'none', display: 'inline-block' }}
        >
          Join the Waitlist
        </a>
      </div>

      <div style={{ background: '#071020', padding: '20px', textAlign: 'center', fontSize: 13, color: '#556' }}>
        © 2026 ProLnk · Serving Allen, TX and all of DFW · <a href="/privacy" style={{ color: '#556' }}>Privacy</a>
      </div>
    </div>
  );
}
