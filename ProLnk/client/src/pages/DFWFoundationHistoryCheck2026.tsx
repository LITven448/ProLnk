import { useState } from 'react';

const scenarios = [
  {
    scenario: 'Buying with Recent Repair (Under 5 Years)',
    icon: '🏷️',
    checklist: [
      '✅ Get original contractor name — verify they are still in business',
      '✅ Request engineer report from pre-repair inspection',
      '✅ Confirm warranty is transferable and get written transfer',
      '✅ Pull city permit — verify work matches what seller claims',
      '✅ Hire independent engineer for post-repair elevation survey',
      '⚠️ If contractor is out of business — warranty is likely void',
    ],
  },
  {
    scenario: 'Buying with Older Repair (5–15 Years)',
    icon: '📋',
    checklist: [
      '✅ Identify repair company — check BBB and state contractor license status',
      '✅ Review original permit and engineer report if available',
      '✅ Get current elevation survey — compare to any existing baseline',
      '✅ Check for secondary cracks that developed after repair',
      '✅ Ask if re-leveling was ever needed post-repair (sign of instability)',
      '✅ Budget for potential re-repair — piers settle in expansive DFW clay',
    ],
  },
  {
    scenario: 'No Prior Repair — Signs of Movement',
    icon: '🔍',
    checklist: [
      '✅ Hire structural engineer ($400–$700) before making offer',
      '✅ Look for stair-step cracks in brick (exterior movement indicator)',
      '✅ Test all doors and windows — sticking is a classic DFW sign',
      '✅ Walk slab with flashlight — look for unlevel floors in hallways',
      '✅ Get repair estimate range BEFORE negotiating price',
      '✅ Request seller disclosure — DFW law requires known defect disclosure',
    ],
  },
  {
    scenario: 'Verifying ProLnk Vault History',
    icon: '🏦',
    checklist: [
      '✅ Search address in ProLnk Home Health Vault',
      '✅ Review uploaded permits, engineer reports, and warranties',
      '✅ Check moisture sensor history if available',
      '✅ Verify repair dates match seller’s disclosure',
      '✅ Look for annual inspection records — gap = warranty may be void',
      '✅ Request Vault transfer to your name at closing',
    ],
  },
];

const redFlags = [
  '🚩 Contractor no longer in business — lifetime warranty is worthless',
  '🚩 No city permit pulled — unpermitted work, no code inspection',
  '🚩 Repair done without engineer report — quality unverifiable',
  '🚩 Annual inspections skipped — warranty likely void',
  '🚩 Multiple re-leveling events — ongoing instability',
];

export default function DFWFoundationHistoryCheck2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>🔎</span>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation History Check Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Due diligence before you buy a DFW home with foundation work</p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📂 Select Your Buying Scenario</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ padding: '12px', borderRadius: 8, border: selected === i ? '2px solid #F5E642' : '2px solid #334155',
                  backgroundColor: selected === i ? '#0A1628' : '#0F2340', color: selected === i ? '#F5E642' : '#CBD5E1',
                  cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'left' }}>
                {s.icon} {s.scenario}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
            {scenarios[selected].checklist.map((item, i) => (
              <p key={i} style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>{item}</p>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F87171', fontSize: 16, marginBottom: 12 }}>🚩 DFW Foundation Red Flags</h3>
          {redFlags.map((flag, i) => (
            <p key={i} style={{ color: '#FCA5A5', fontSize: 14, marginBottom: 8 }}>{flag}</p>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🏦 ProLnk Home Health Vault permanently stores foundation history — survives contractor closures, transfers at sale.</p>
        </div>
      </div>
    </div>
  );
}
