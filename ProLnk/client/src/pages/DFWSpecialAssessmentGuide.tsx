import { useState } from 'react';

const texasLaw = [
  { rule: 'HOA must provide 30-day written notice before levying a special assessment', source: 'TX Prop. Code §209.0041′ },
  { rule: 'Assessments exceeding 10% of annual budget typically require member vote', source: 'TX Prop. Code §209.0041(f)' },
  { rule: 'HOA must hold a members meeting if requested by 10% of homeowners', source: 'TX Prop. Code §209.014′ },
  { rule: 'HOA must make financial records available to members on request', source: 'TX Prop. Code §209.005′ },
  { rule: 'Special assessments do NOT have a state-mandated dollar cap — limits are in the CC&Rs', source: 'HOA Specific' },
];

const buyerChecks = [
  'Request HOA reserve fund study — a healthy HOA has 70%+ funded reserves',
  'Get the last 3 years of HOA meeting minutes — look for deferred maintenance discussions',
  'Ask for current pending litigation involving the HOA',
  'Request capital expenditure (CapEx) plan if available',
  'Check delinquency rate — high delinquency means fewer dues collected, higher risk of assessment',
  'Ask HOA manager directly: "Any special assessments planned or under discussion?"',
  'Review the reserve fund balance against the age and condition of shared amenities',
];

const memberChecks = [
  'Attend HOA annual meetings — assessments are usually discussed before being levied',
  'Join HOA board or finance committee for early visibility',
  'Review reserve fund study annually — gap between funded and required = future assessment risk',
  'Maintain your own $5K–$15K contingency fund if your HOA is underfunded',
  'If assessment is levied, verify it was properly voted on per CC&Rs and TX law',
  'Check if payment plans are available — most HOAs allow 3–12 month installments',
];

const typicalAmounts = [
  { type: 'Parking lot repaving', range: '$500–$2,000 per unit' },
  { type: 'Roof replacement (attached homes)', range: '$3,000–$12,000 per unit' },
  { type: 'Pool/amenity major repair', range: '$300–$1,500 per unit' },
  { type: 'Structural damage (storm, fire)', range: '$5,000–$30,000+ per unit' },
  { type: 'Litigation settlement', range: '$2,000–$20,000+ per unit' },
];

export default function DFWSpecialAssessmentGuide() {
  const [situation, setSituation] = useState('buying');

  return (
    <div style={{ background: '#F8F9FB', minHeight: '100vh', color: '#1A2537', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#1A5FE8', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏘️ DFW HOA Special Assessment Guide</h1>
        <p style={{ color: '#5A6B82', fontSize: 16, marginBottom: 32 }}>Special assessments are one-time charges beyond regular HOA dues — and they can run $500 to $30,000+ per unit. Here's how to protect yourself in DFW’s HOA-heavy market.</p>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💰 Typical DFW Special Assessment Amounts</h2>
          {typicalAmounts.map(item => (
            <div key={item.type} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E8EDF5', fontSize: 14 }}>
              <span style={{ color: '#3A4B62′ }}>{item.type}</span>
              <span style={{ fontWeight: 700, color: '#1A5FE8′ }}>{item.range}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: 12, background: '#FFF9E8', borderRadius: 8, fontSize: 13, color: '#5A4A00′ }}>
            ⚠️ Amounts vary widely based on community size. Larger communities (200+ units) spread costs over more owners. Smaller communities face much higher per-unit amounts.
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚖️ What Texas Law Says</h2>
          {texasLaw.map((item, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #E8EDF5′ }}>
              <div style={{ fontSize: 14, color: '#1A2537', marginBottom: 4 }}>{item.rule}</div>
              <div style={{ fontSize: 12, color: '#1A5FE8', fontWeight: 600 }}>{item.source}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Your Situation</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {[['buying', '🏠 Buying Into an HOA'], ['member', '📋 Current HOA Member']].map(([val, label]) => (
              <button key={val} onClick={() => setSituation(val)}
                style={{ flex: 1, padding: '14px 0', borderRadius: 10, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                  borderColor: situation === val ? '#1A5FE8′ : '#E0E7EF', background: situation === val ? '#EEF3FF' : '#FFF', color: situation === val ? '#1A5FE8' : '#5A6B82' }}>
                {label}
              </button>
            ))}
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {(situation === 'buying' ? buyerChecks : memberChecks).map((item, i) => (
              <li key={i} style={{ padding: '12px 0', borderBottom: '1px solid #E8EDF5', display: 'flex', gap: 12, fontSize: 14 }}>
                <span style={{ color: '#1A5FE8', flexShrink: 0 }}>▸</span>
                <span style={{ color: '#3A4B62′ }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#EEF3FF', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>📌 The Bottom Line for DFW Buyers</div>
          <div style={{ color: '#3A4B62', fontSize: 14, lineHeight: 1.7 }}>
            DFW has over 10,000 active HOAs — one of the highest concentrations in the U.S. Reserve fund health varies dramatically. Before closing, always request the reserve fund study and last 3 years of meeting minutes. A $200/month HOA with a 30% funded reserve is more expensive than a $300/month HOA with 90% funded reserves.
          </div>
        </div>
      </div>
    </div>
  );
}
