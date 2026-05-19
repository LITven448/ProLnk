import { useState } from 'react';

const springProjects = [
  { project: '🎨 Exterior Painting', detail: 'Spring temps 60–80°F are ideal for paint adhesion in DFW. ProLnk matches pre-vetted painters within 24 hours. Expect 3 binding quotes from Charter pros. Timeline: 2–4 weeks from match.' },
  { project: '🏠 Roof Inspection', detail: 'Post-winter inspection before spring hail season. ProLnk Charter roofers perform full visual + drone inspections. Report generated same day, stored in Home Health Vault.' },
  { project: '🌿 Landscaping & Sod', detail: 'Spring is the optimal DFW planting window. ProLnk connects you to landscapers who know DFW soil and HOA requirements. Projects matched within 48 hours. Timeline: 1–3 weeks.' },
  { project: '🏗️ Foundation Inspection', detail: 'DFW clay soil shifts every winter. ProLnk connects to certified structural engineers for foundation assessments. Full inspection report for insurance or sale documentation.' },
  { project: '🪟 Window & Door Sealing', detail: 'After winter contraction, frames shift. ProLnk Charter handymen handle re-caulking, weatherstripping, and door adjustment. Same-day availability in most DFW zip codes.' },
];

export default function ProLnkSpringProjectsCampaign2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [vaultOpen, setVaultOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d1e10 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌸</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', margin: '0 0 12px', lineHeight: 1.1 }}>
          ProLnk Spring Projects 2026
        </h1>
        <p style={{ fontSize: '20px', color: '#a0b4cc', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
          Spring is the best time for exterior work in DFW. ProLnk connects you to painters, roofers, landscapers, and foundation inspectors — all pre-vetted.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: '700', fontSize: '13px', padding: '7px 16px', borderRadius: '999px' }}>✅ All Pre-Vetted</div>
          <div style={{ background: '#1e3050', color: '#a0b4cc', fontWeight: '600', fontSize: '13px', padding: '7px 16px', borderRadius: '999px' }}>📅 Timeline Estimates Included</div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>What's your spring project?</h2>
        <p style={{ color: '#7a90a8', marginBottom: '24px', fontSize: '15px' }}>Select a project to see the ProLnk matching process and expected timeline.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {springProjects.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#F5E642′ : '#111f35',
                color: selected === i ? '#0A1628′ : '#ffffff',
                border: '1px solid',
                borderColor: selected === i ? '#F5E642′ : '#1e3050',
                borderRadius: '10px',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: '600',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {p.project}
              {selected === i && (
                <p style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px', lineHeight: 1.6, color: '#0A1628′ }}>
                  {p.detail}
                </p>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setVaultOpen(!vaultOpen)}
          style={{ background: 'none', border: '1px solid #1e3050', color: '#F5E642', width: '100%', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '24px' }}
        >
          🏦 How does Home Health Vault add value? {vaultOpen ? '▲' : '▼'}
        </button>
        {vaultOpen && (
          <div style={{ background: '#111f35', borderRadius: '10px', padding: '20px', marginBottom: '24px', border: '1px solid #1e3050′ }}>
            <p style={{ color: '#a0b4cc', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Every ProLnk project is permanently logged in your Home Health Vault — contractor name, license number, date, scope, and cost. Buyers see a verified service history. Lenders and appraisers recognize documented maintenance. Your home appreciates with every recorded ProLnk visit.
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#111f35', borderRadius: '10px', padding: '18px', border: '1px solid #1e3050', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>🔍</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#F5E642', marginBottom: '4px' }}>Verified Pros Only</div>
            <div style={{ fontSize: '12px', color: '#7a90a8′ }}>License + insurance confirmed before match</div>
          </div>
          <div style={{ background: '#111f35', borderRadius: '10px', padding: '18px', border: '1px solid #1e3050', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>📋</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#F5E642', marginBottom: '4px' }}>Binding Quotes</div>
            <div style={{ fontSize: '12px', color: '#7a90a8′ }}>Charter pros commit to quoted price</div>
          </div>
        </div>

        <div style={{ background: '#111f35', borderRadius: '14px', padding: '28px', textAlign: 'center', border: '1px solid #1e3050′ }}>
          <h3 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Start Your Spring Project with ProLnk</h3>
          <p style={{ color: '#7a90a8', fontSize: '14px', margin: '0 0 20px' }}>Join the ProLnk waitlist — DFW homeowners matched to Charter pros in 24 hours or less.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}>
            Match Me to a Spring Pro →
          </a>
        </div>
      </div>
    </div>
  );
}