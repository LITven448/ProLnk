import { useState } from 'react';

const projectTypes = [
  {
    label: 'New System Installation',
    criteria: ['TDLR license required', 'NATE certification strongly preferred', 'Must pull city permit', 'Manufacturer training for brand installed'],
    questions: ['What brand do you install most and why?', 'Who pulls the permit — you or me?', 'What SEER rating do you recommend for DFW summers?'],
    redFlags: ['No permit offered', 'Cash-only upfront demand', 'No load calculation performed'],
  },
  {
    label: 'System Replacement',
    criteria: ['TDLR license required', 'NATE certification preferred', 'Old equipment disposal included', 'Load calc performed before sizing'],
    questions: ['Will you perform a Manual J load calculation?', 'What happens if the new system is undersized?', 'Is disposal of old unit included?'],
    redFlags: ['Same-size replacement without load calc', 'No written warranty on labor', 'Pressure to upgrade same day'],
  },
  {
    label: 'Repair or Tune-Up',
    criteria: ['TDLR license required', 'Ask about diagnostic fee applied to repair', 'Get itemized estimate before work starts'],
    questions: ['Is the diagnostic fee waived if I approve the repair?', 'What is your standard hourly rate?', 'Do you carry parts on the truck?'],
    redFlags: ['Flat refusal to itemize', 'Recommends full replacement after minor diagnostic', 'No written estimate'],
  },
  {
    label: 'Ductwork or Zoning',
    criteria: ['TDLR license required', 'Ask if they do Manual D duct design', 'Zoning systems require equipment compatibility check'],
    questions: ['Will you design the duct system or just replace in-kind?', 'What zoning brands do you work with?', 'How do you handle attic heat in DFW summers?'],
    redFlags: ['No design process, just replace existing', 'Cannot explain static pressure', 'No building permit offered'],
  },
];

export default function DFWHVACContractorGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Contractor Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            How to choose the right HVAC contractor in the Dallas-Fort Worth area before signing anything.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔎 What to Verify Before Hiring</h2>
          {[
            ['TDLR License', 'All HVAC contractors in Texas must hold a license from the Texas Department of Licensing and Regulation. Verify at tdlr.texas.gov — takes 30 seconds.'],
            ['NATE Certification', 'North American Technician Excellence is the industry leading certification. Not required by law but separates trained techs from unqualified operators.'],
            ['Local Address', 'DFW has been flooded by out-of-state storm chasers post-hail events. A local address means someone to call back if something goes wrong.'],
            ['Insurance', 'General liability plus workers comp. Ask for a certificate of insurance naming you as additional insured.'],
            ['Permit History', 'A contractor who consistently pulls permits is one who does work that passes inspection. Call your city permit office to verify their history.'],
          ].map(([title, desc]) => (
            <div key={title} style={{ borderBottom: '1px solid #2d3f6b', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>✅ {title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>💡 Why Cheap HVAC in DFW Costs More</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>
            DFW summers push HVAC systems harder than almost anywhere in the country. An undersized or incorrectly installed system will run constantly, spike your electric bill, and fail early. The lowest bid almost always means a shortcut on load calculations, refrigerant charge, or ductwork. A properly installed system pays for itself in energy savings within 3 to 5 years.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ Project Type — Criteria and Questions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {projectTypes.map((p, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  borderColor: selected === i ? '#F5E642' : '#2d3f6b',
                  backgroundColor: selected === i ? '#F5E642' : 'transparent',
                  color: selected === i ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e3a', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14 }}>{projectTypes[selected].label}</h3>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 8 }}>Contractor Criteria</div>
                {projectTypes[selected].criteria.map((c, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 8 }}>Interview Questions</div>
                {projectTypes[selected].questions.map((q, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>? {q}</div>)}
              </div>
              <div>
                <div style={{ color: '#f87171', fontWeight: 600, marginBottom: 8 }}>Red Flags</div>
                {projectTypes[selected].redFlags.map((r, i) => <div key={i} style={{ color: '#fca5a5', fontSize: 14, marginBottom: 4 }}>🚩 {r}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
