import { useState } from 'react';

const greenFlags = [
  { id: 'seer2', label: '⭐ Quoting SEER2 16+ Equipment', category: 'efficiency' },
  { id: 'manualj', label: '📐 Performing Manual J Load Calculation', category: 'sizing' },
  { id: 'permit', label: '📋 Proactively Pulling City Permit', category: 'permit' },
  { id: 'nate', label: '🎓 NATE-Certified Technicians', category: 'certification' },
  { id: 'itemized', label: '📄 Fully Itemized Written Estimate', category: 'pricing' },
  { id: 'warranty', label: '🛡️ Handling Warranty Registration for You', category: 'warranty' },
];

const assessments: Record<string, { rating: string; meaning: string; expect: string; dfwNote: string }> = {
  efficiency: {
    rating: '✅ Excellent — Sets You Up for DFW Summers',
    meaning: 'SEER2 16+ equipment is 25%+ more efficient than minimum-code units. In DFW, where AC runs 5-6 months and electric bills hit $300-500/mo in summer, this efficiency translates directly to savings.',
    expect: 'Ask for the specific model number and verify SEER2 on AHRI directory (ahridirectory.org). Equipment should also carry an ENERGY STAR certification.',
    dfwNote: 'At DFW electricity rates (~$0.14/kWh), upgrading from SEER2 14.3 to SEER2 18 saves ~$400/summer on a 3-ton system.',
  },
  sizing: {
    rating: '✅ Professional Standard — Rare and Valuable',
    meaning: 'Manual J is the ACCA-approved load calculation method. A contractor running Manual J is treating your home as unique — accounting for insulation, windows, orientation, and DFW climate data — not just square footage.',
    expect: 'The calculation takes 30-60 minutes and the contractor should share results with you. Output includes required BTU cooling load per zone.',
    dfwNote: 'DFW homes often need dehumidification, not just cooling. Properly sized systems run longer cycles that remove humidity — comfort beyond just temperature.',
  },
  permit: {
    rating: '✅ Legal, Insurable, and Inspectable',
    meaning: 'A contractor who pulls permits without being asked is confident in their work quality and operates legally. The permit triggers a city inspection — your independent quality check.',
    expect: 'Permit cost ($50-200) should be included in the quote. You\’ll receive a notice of inspection — be present or request the inspection report.',
    dfwNote: 'All DFW municipalities require permits for HVAC replacement. Dallas, Fort Worth, Plano, Frisco, McKinney — all inspect. No exceptions.',
  },
  certification: {
    rating: '✅ Industry Gold Standard for Technicians',
    meaning: 'NATE (North American Technician Excellence) certification requires technicians to pass rigorous exams on HVAC installation and service. It\’s the most respected technician certification in the industry.',
    expect: 'Ask to see NATE certification cards. Contractors with NATE techs typically charge fair rates and stand behind their work.',
    dfwNote: 'In DFW\’s competitive market, top contractors use NATE certification as a differentiator — it\’s a real signal of commitment to quality.',
  },
  pricing: {
    rating: '✅ Transparent and Accountable',
    meaning: 'A fully itemized estimate lists equipment model numbers, refrigerant type and charge, labor costs, permit fees, and warranty terms separately. This prevents surprises and enables apples-to-apples comparison.',
    expect: 'Equipment model number, SEER2 rating, refrigerant type, labor hours estimate, permit included/excluded, and warranty terms all spelled out.',
    dfwNote: 'DFW has 500+ HVAC contractors. The best ones know transparent pricing wins business long-term — and they\’re right.',
  },
  warranty: {
    rating: '✅ Service Above and Beyond',
    meaning: 'Most HVAC equipment warranties (10 years parts, 10 years compressor) require registration within 60-90 days of installation. Many homeowners miss this and drop to 5-year coverage. Contractors who register for you protect your investment.',
    expect: 'Ask: "Will you register the warranty for me?" and "Can I get the registration confirmation?" Great contractors confirm this in writing.',
    dfwNote: 'Extended warranties matter in DFW — compressors and capacitors face extreme stress. A 10-year compressor warranty in DFW is worth protecting.',
  },
};

export default function DFWHVACGreenFlags2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const key = selected ? greenFlags.find(f => f.id === selected)?.category : null;
  const result = key ? assessments[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✅🏆</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW HVAC Green Flags 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Great DFW HVAC service has clear signals. When a contractor does these things without being asked, you're working
          with a professional. Select any green flag to understand what it means and what to expect.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>✅ Select a Green Flag</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {greenFlags.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id)}
              style={{ background: selected === f.id ? '#F5E642' : '#112240', color: selected === f.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === f.id ? '#F5E642' : '#1e3a5f'), borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
              {f.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, borderLeft: '4px solid #22c55e', marginBottom: 24 }}>
            <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{result.rating}</div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Why It Matters:</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12, fontSize: 14 }}>{result.meaning}</p>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>What to Expect:</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12, fontSize: 14 }}>{result.expect}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>🌡️ DFW Note</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{result.dfwNote}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏆 Get Matched with Green-Flag DFW HVAC Pros</div>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>ProLnk only works with HVAC contractors who meet our green-flag standards. Free quotes, vetted pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Match Me with a Top DFW Pro
          </button>
        </div>
      </div>
    </div>
  );
}
