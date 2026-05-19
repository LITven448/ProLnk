import { useState } from 'react';

type Project = {
  label: string;
  permit: string;
  inspection: string;
  license: string;
  recommendation: string;
  note: string;
};

const projects: Project[] = [
  {
    label: 'Electrical Work',
    permit: 'Required',
    inspection: 'Required',
    license: 'Not required for own home',
    recommendation: 'DIY possible — but get the permit.',
    note: 'You cannot do electrical work on someone else’s home without a license. For your own home, pull the permit and pass inspection. Unpermitted electrical work will surface in a buyer’s inspection and can kill a sale.',
  },
  {
    label: 'Plumbing',
    permit: 'Required',
    inspection: 'Required',
    license: 'Not required for own home',
    recommendation: 'DIY possible — no gas lines without a license.',
    note: 'Standard plumbing you can DIY with a permit. Gas line work requires a licensed plumber regardless of who owns the home. No exceptions in Texas.',
  },
  {
    label: 'HVAC',
    permit: 'Required',
    inspection: 'Required',
    license: 'EPA 608 cert required for refrigerant',
    recommendation: 'Hire a pro for anything involving refrigerant.',
    note: 'Refrigerant handling is federally regulated. EPA 608 certification is required regardless of whether it’s your home. Ductwork, filter changes, and coil cleaning are fair DIY game.',
  },
  {
    label: 'Roofing',
    permit: 'Varies by city',
    inspection: 'Sometimes required',
    license: 'Not required in most TX cities',
    recommendation: 'Hire a licensed roofer for insurance coverage.',
    note: 'No TX state license for roofing. But your homeowner’s insurance may deny claims for damage traced to unlicensed or DIY work. This is the catch most homeowners miss.',
  },
  {
    label: 'Painting / Flooring / Landscaping',
    permit: 'Not required',
    inspection: 'Not required',
    license: 'Not required',
    recommendation: 'Full DIY — no restrictions.',
    note: 'Cosmetic work is fully open to DIY. Just make sure prep is solid — failed prep is why most DIY paint jobs look bad within 2 years.',
  },
];

const costMoreItems = [
  'You need multiple service calls to fix your own mistake — the "DIY tax".',
  'You void a manufacturer or contractor warranty by working on the system yourself.',
  'You can’t get a permit signed off and must pay a contractor to redo the work legally.',
  'The project takes 10x longer than expected and you lose income from your own work.',
  'A buyer’s inspector flags unpermitted work and you negotiate a price reduction at closing.',
];

export default function DIYVsProGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#F0F4FF' }}>
      {/* Hero */}
      <div style={{ padding: '72px 24px 56px', textAlign: 'center', borderBottom: '1px solid #1E3A5F' }}>
        <div style={{ fontSize: 13, color: '#60A5FA', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Texas Homeowner Guide · 2026</div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,50px)', fontWeight: 800, color: '#FFFFFF', margin: '0 auto 20px', maxWidth: 720, lineHeight: 1.15 }}>
          DIY vs. Pro 2026
        </h1>
        <p style={{ fontSize: 18, color: '#93C5FD', maxWidth: 580, margin: '0 auto' }}>
          Updated Texas rules — and the honest math on when hiring a pro saves you money.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px' }}>

        {/* Texas law breakdown */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0F4FF', marginBottom: 8 }}>Texas DIY Laws — What's Actually Legal</h2>
        <p style={{ color: '#93C5FD', marginBottom: 28 }}>Select a project type to see permit requirements and recommendations.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {projects.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#3B82F6′ : '#0F2A4A',
                border: `1px solid ${selected === i ? '#3B82F6' : '#1E3A5F'}`,
                color: selected === i ? '#FFFFFF' : '#93C5FD',
                padding: '10px 18px',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all .15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0F2A4A', border: '1px solid #1E3A5F', borderRadius: 14, padding: '28px 32px', marginBottom: 40 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>{projects[selected].label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 20 }}>
              {[
                { label: 'Permit', value: projects[selected].permit },
                { label: 'Inspection', value: projects[selected].inspection },
                { label: 'License', value: projects[selected].license },
              ].map((item, j) => (
                <div key={j} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: '#F0F4FF', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#163455', borderRadius: 8, padding: '16px 20px', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, color: '#34D399′ }}>Recommendation: </span>
              <span style={{ color: '#D1FAE5′ }}>{projects[selected].recommendation}</span>
            </div>
            <p style={{ color: '#93C5FD', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{projects[selected].note}</p>
          </div>
        )}

        {/* When DIY costs more */}
        <div style={{ background: '#12213A', border: '1px solid #1E3A5F', borderRadius: 14, padding: '32px', marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F0F4FF', marginBottom: 20 }}>When DIY Costs MORE Than Hiring</h2>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {costMoreItems.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>⚠️</span>
                <span style={{ color: '#CBD5E1', fontSize: 15, lineHeight: 1.65 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* TrustyPro angle */}
        <div style={{ background: 'linear-gradient(135deg,#1B3A6B,#0F2A4A)', border: '1px solid #2563EB', borderRadius: 14, padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>Know What Your DIY Work Created</div>
          <p style={{ color: '#93C5FD', fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: '0 auto 24px' }}>
            TrustyPro AI can tell you if the DIY work you've done created new issues. Scan your home after any major project — foundation, electrical, plumbing, HVAC — and get a professional assessment in minutes.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#2563EB', color: '#FFFFFF', fontWeight: 700, fontSize: 15, padding: '13px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Scan My Home →
          </a>
        </div>

      </div>
    </div>
  );
}
