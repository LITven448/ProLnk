import { useState } from 'react';

const cityData: Record<string, Record<string, { allowed: boolean; process: string; inspections: string[]; notes: string }>> = {
  dallas: {
    addition: { allowed: true, process: 'Apply at dallas.gov/dsd. Owner-builder affidavit required. Must be primary residence.', inspections: ['Foundation', 'Framing', 'MEP Rough-In', 'Insulation', 'Final'], notes: 'Dallas requires owner-builder affidavit notarized. Cannot hire a GC if you pull as owner-builder.' },
    remodel: { allowed: true, process: 'Apply online at dallas.gov/dsd. Structural work requires engineer-stamped drawings.', inspections: ['Framing (if walls opened)', 'MEP Rough-In', 'Final'], notes: 'Non-structural cosmetic remodels often exempt from permit. Call 214-948-4480 to confirm.' },
    roofing: { allowed: false, process: 'Roofing permits in Dallas require a licensed TDLR contractor to pull the permit.', inspections: [], notes: 'Owner-builders cannot pull roofing permits in Dallas. You must hire a licensed roofing contractor.' },
    electrical: { allowed: false, process: 'Electrical permits require a licensed Texas electrician. Owner-builder exemption does not apply.', inspections: [], notes: 'Texas state law requires a licensed Master Electrician to pull electrical permits in most cases.' },
    plumbing: { allowed: false, process: 'Plumbing permits require a licensed Texas plumber. Owner-builder exemption does not apply.', inspections: [], notes: 'Texas state law requires a licensed plumber for permit pulls.' },
    fence: { allowed: true, process: 'Apply at dallas.gov/dsd. Plot plan showing fence location required.', inspections: ['Final'], notes: 'Fences over 6 feet require a permit. HOA approval may also be required.' },
  },
  plano: {
    addition: { allowed: true, process: 'Apply at plano.gov/permits. Owner-builder form required. Plans review 2–4 weeks.', inspections: ['Foundation', 'Framing', 'MEP Rough-In', 'Insulation', 'Final'], notes: 'Plano is owner-builder friendly. Full plans required for additions over 200 sq ft.' },
    remodel: { allowed: true, process: 'Apply at plano.gov/permits. Permit required if opening walls or changing structure.', inspections: ['Framing', 'MEP Rough-In', 'Final'], notes: 'Cosmetic remodels (paint, flooring, cabinet replacement) do not require permits in Plano.' },
    roofing: { allowed: true, process: 'Apply at plano.gov/permits. Plano allows owner-builder roofing permits for primary residence.', inspections: ['Final — shingle and flashing inspection'], notes: 'One of the few DFW cities allowing owner-builder roofing. Must provide material specs.' },
    electrical: { allowed: false, process: 'Licensed electrician required to pull electrical permits in Plano.', inspections: [], notes: 'No owner-builder exemption for electrical work in Plano.' },
    plumbing: { allowed: false, process: 'Licensed plumber required to pull plumbing permits in Plano.', inspections: [], notes: 'No owner-builder exemption for plumbing work in Plano.' },
    fence: { allowed: true, process: 'Apply at plano.gov/permits. Setback requirements apply.', inspections: ['Final'], notes: 'Plano requires permits for any fence. HOA rules apply separately.' },
  },
  frisco: {
    addition: { allowed: true, process: 'Apply at friscotexas.gov/permits. Owner-builder affidavit and stamped plans required.', inspections: ['Foundation', 'Framing', 'MEP Rough-In', 'Insulation', 'Final'], notes: 'Frisco requires architect or engineer-stamped plans for all additions.' },
    remodel: { allowed: true, process: 'Apply at friscotexas.gov/permits. Interior remodels with structural changes require permit.', inspections: ['Framing', 'MEP Rough-In', 'Final'], notes: 'Frisco is strict about permit compliance. Inspect any recent unpermitted work before buying a home here.' },
    roofing: { allowed: false, process: 'Roofing permits require a licensed contractor in Frisco.', inspections: [], notes: 'Owner-builder roofing not allowed in Frisco.' },
    electrical: { allowed: false, process: 'Licensed electrician required for all electrical permits in Frisco.', inspections: [], notes: 'No exceptions for owner-builders on electrical.' },
    plumbing: { allowed: false, process: 'Licensed plumber required for all plumbing permits in Frisco.', inspections: [], notes: 'No exceptions for owner-builders on plumbing.' },
    fence: { allowed: true, process: 'Apply at friscotexas.gov/permits. Survey required for boundary fences.', inspections: ['Final'], notes: 'Frisco requires survey for fences near property lines.' },
  },
  mckinney: {
    addition: { allowed: true, process: 'Apply at mckinneytexas.org/permits. Owner-builder affidavit required.', inspections: ['Foundation', 'Framing', 'MEP Rough-In', 'Insulation', 'Final'], notes: 'McKinney has a robust online permit portal. Processing time 3–5 business days for simple projects.' },
    remodel: { allowed: true, process: 'Apply at mckinneytexas.org/permits. Permit required if structural or mechanical changes.', inspections: ['MEP Rough-In', 'Final'], notes: 'McKinney is relatively owner-builder friendly for residential remodels.' },
    roofing: { allowed: true, process: 'McKinney allows owner-builder roofing permits for primary residence.', inspections: ['Final shingle and ridge inspection'], notes: 'Owner-builder roofing allowed. Manufacturer spec sheet required with application.' },
    electrical: { allowed: false, process: 'Licensed electrician required for electrical permits in McKinney.', inspections: [], notes: 'Texas electrical licensing law applies.' },
    plumbing: { allowed: false, process: 'Licensed plumber required for plumbing permits in McKinney.', inspections: [], notes: 'Texas plumbing licensing law applies.' },
    fence: { allowed: true, process: 'Apply at mckinneytexas.org/permits. Plot plan required.', inspections: ['Final'], notes: 'Permit required for fences over 4 feet in McKinney.' },
  },
};

const projectOptions = [
  { label: 'Home Addition', value: 'addition' },
  { label: 'Interior Remodel', value: 'remodel' },
  { label: 'Roofing', value: 'roofing' },
  { label: 'Electrical Work', value: 'electrical' },
  { label: 'Plumbing Work', value: 'plumbing' },
  { label: 'Fence', value: 'fence' },
];

const cityOptions = [
  { label: 'Dallas', value: 'dallas' },
  { label: 'Plano', value: 'plano' },
  { label: 'Frisco', value: 'frisco' },
  { label: 'McKinney', value: 'mckinney' },
];

export default function DIYPermitPullingGuide() {
  const [city, setCity] = useState('');
  const [project, setProject] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = city && project ? cityData[city]?.[project] : null;

  const handleCheck = () => {
    if (city && project) setShowResult(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#0F172A', fontFamily: 'sans-serif', padding: '0 0 60px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ padding: '48px 0 32px' }}>
          <div style={{ fontSize: 13, color: '#1D4ED8', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            📋 ProLnk Homeowner Guide
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, color: '#0A1628′ }}>
            Owner-Builder Permit Guide for DFW Homeowners
          </h1>
          <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7 }}>
            Texas allows homeowners to pull their own construction permits — but the rules vary by city, trade, and project type. Here's what you need to know before you start.
          </p>
        </div>

        <section style={{ marginBottom: 40, backgroundColor: '#EFF6FF', borderRadius: 12, padding: '24px', border: '1px solid #BFDBFE' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1D4ED8', marginBottom: 12 }}>📌 Texas Owner-Builder Law — The Basics</h2>
          <p style={{ color: '#334155', lineHeight: 1.8, marginBottom: 12 }}>
            Texas law allows homeowners to act as their own general contractor for construction on their primary residence. When you pull a permit as an owner-builder, you are legally certifying that:
          </p>
          {[
            'This is your primary residence (not a rental or investment property)',
            'You will personally supervise all work',
            'You understand you may lose homeowner exemption if you sell within 12 months',
            'You are liable for ensuring all work meets code',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #BFDBFE' }}>
              <span style={{ color: '#1D4ED8′ }}>✓</span>
              <span style={{ color: '#334155', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>⚠️ Risks of Owner-Builder Permits</h2>
          {[
            ['Insurance implications', 'Your homeowner\’s insurance may not cover damage from unpermitted or improperly inspected work. Verify with your carrier before you start.'],
            ['Resale disclosure', 'In Texas, you must disclose known defects at resale. If an owner-built project later fails inspection, it becomes a disclosure liability.'],
            ['Safety liability', 'If a sub you hire under your owner-builder permit is injured on-site, you may be personally liable in the absence of workers\’ comp coverage.'],
            ['12-month resale rule', 'If you sell within 12 months of owner-builder completion, the Texas AG can presume you were acting as a contractor, which may trigger contractor licensing requirements.'],
          ].map(([risk, detail]) => (
            <div key={risk as string} style={{ backgroundColor: '#FEF9C3', borderRadius: 10, padding: '16px 20px', marginBottom: 10, border: '1px solid #FDE047′ }}>
              <div style={{ color: '#92400E', fontWeight: 700, marginBottom: 6 }}>⚠️ {risk}</div>
              <div style={{ color: '#713F12', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>🔧 Hiring Subs Without a GC</h2>
          <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: 16 }}>
            As an owner-builder, you can hire licensed subcontractors directly. Each trade sub will still need to pull their own sub-permits in most cities. Your role is coordination and accountability.
          </p>
          {[
            'Verify each sub\’s TDLR license independently — don\’t take their word for it',
            'Require proof of liability insurance and workers\’ comp from every sub',
            'Each sub should provide a lien waiver when paid',
            'You are responsible for scheduling inspections after each trade completes their scope',
            'Keep a written log of every payment, inspection result, and communication',
          ].map(item => (
            <div key={item} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #E2E8F0′ }}>
              <span style={{ color: '#1D4ED8′ }}>✓</span>
              <span style={{ color: '#334155′ }}>{item}</span>
            </div>
          ))}
        </section>

        <section style={{ backgroundColor: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏙️ DFW City Permit Checker</h2>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Select your DFW city and project type to see if you can pull your own permit and what the process looks like.</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>SELECT YOUR CITY</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {cityOptions.map(c => (
                <button
                  key={c.value}
                  onClick={() => { setCity(c.value); setShowResult(false); }}
                  style={{
                    padding: '10px 20px', borderRadius: 8, border: '2px solid',
                    borderColor: city === c.value ? '#F5E642′ : '#1E3A5F',
                    backgroundColor: city === c.value ? '#1a1a00′ : ’transparent',
                    color: city === c.value ? '#F5E642′ : '#94A3B8',
                    cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>SELECT YOUR PROJECT</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {projectOptions.map(p => (
                <button
                  key={p.value}
                  onClick={() => { setProject(p.value); setShowResult(false); }}
                  style={{
                    padding: '10px 20px', borderRadius: 8, border: '2px solid',
                    borderColor: project === p.value ? '#F5E642′ : '#1E3A5F',
                    backgroundColor: project === p.value ? '#1a1a00′ : ’transparent',
                    color: project === p.value ? '#F5E642′ : '#94A3B8',
                    cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={!city || !project}
            style={{
              backgroundColor: city && project ? '#F5E642′ : '#1E2D45',
              color: city && project ? '#0A1628′ : '#475569',
              border: 'none', borderRadius: 8, padding: '14px 28px',
              fontWeight: 700, fontSize: 15, cursor: city && project ? 'pointer' : 'not-allowed', marginBottom: 24,
            }}
          >
            Can I Pull My Own Permit? →
          </button>

          {showResult && result && (
            <div style={{ backgroundColor: '#081525', borderRadius: 12, padding: '24px' }}>
              <div style={{
                fontSize: 20, fontWeight: 800, marginBottom: 16,
                color: result.allowed ? '#4ade80′ : '#f87171',
              }}>
                {result.allowed ? '✅ Yes — you can pull this permit as owner-builder' : '❌ No — this permit requires a licensed contractor'}
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ color: '#64748B', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>PROCESS</div>
                <div style={{ color: '#CBD5E1', lineHeight: 1.8 }}>{result.process}</div>
              </div>

              {result.inspections.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ color: '#64748B', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>REQUIRED INSPECTIONS</div>
                  {result.inspections.map((insp, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E2D45′ }}>
                      <span style={{ color: '#F5E642′ }}>{i + 1}.</span>
                      <span style={{ color: '#CBD5E1', fontSize: 14 }}>{insp}</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ backgroundColor: '#132040', borderRadius: 8, padding: '14px 18px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📌 Local Notes</div>
                <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{result.notes}</div>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
