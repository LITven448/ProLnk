import { useState } from 'react';

const propertyTypes = [
  { id: 'single', label: '🏠 Single Family' },
  { id: 'townhome', label: '🏘️ Townhome' },
  { id: 'condo', label: '🏢 Condo' },
  { id: 'newbuild', label: '🏗️ New Build' },
];

const guides: Record<string, string[]> = {
  single: [
    'Check crawlspace access or pier-and-beam condition',
    'Test all exterior doors and windows for sticking (foundation movement)',
    'Flush every toilet and run every faucet simultaneously',
    'Check attic hatch — look for daylight, insulation depth, AC ducts',
    'Assess garage door operation and auto-reverse function',
  ],
  townhome: [
    'Ask about shared wall noise — bring a helper to tap walls',
    'Review HOA financials — is reserve fund adequately funded?',
    'Check parking assignment — DFW townhomes often have guest parking shortage',
    'Ask about roof assessment history and upcoming assessments',
    'Verify HVAC is a separate unit per unit, not shared',
  ],
  condo: [
    'Request last 2 years of HOA meeting minutes',
    'Check reserve study — deferred maintenance is your future special assessment',
    'Test elevator reliability and assess stairwell condition',
    'Ask about rental cap — affects future resale value',
    'Verify HVAC system type — window units are a dealbreaker',
  ],
  newbuild: [
    'Hire independent inspector — builders use their own, not yours',
    'Check lot grade relative to neighbors — drainage matters enormously',
    'Verify all appliances are installed and operational',
    'Ask about community completion timeline — years of construction noise?',
    'Get list of all upgrades in writing with model numbers',
  ],
};

export default function DFWOpenHouseGuide2026() {
  const [selected, setSelected] = useState<string>('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🚪 DFW Open House Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 32 }}>Get beneath the staging to evaluate what actually matters in a DFW home.</p>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>❓ Questions to Ask the Agent</h2>
          {[
            ['Days on market', 'If 30+ days, ask why. DFW moves fast — stale listing means a story'],
            ['Offers received', 'How many, when, and why did they fall through?'],
            ['Seller motivation', 'Relocating? Divorce? Estate sale? Shapes negotiation leverage'],
            ['Price history', 'Any reductions? Original list vs current asking?'],
            ['Last inspection', 'Was one done? Any known issues disclosed?'],
          ].map(([q, a]) => (
            <div key={q} style={{ padding: '10px 0', borderBottom: '1px solid #1a2d4a' }}>
              <div style={{ color: '#F5E642', fontSize: 13 }}>Q: {q}</div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 2 }}>→ {a}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏗️ Foundation Visual Assessment</h2>
          {[
            'Diagonal cracks from door corners indicate horizontal movement',
            'Doors that stick or have gaps at top corners',
            'Floors that slope — bring a marble and set it down',
            'Gaps between trim and ceiling or wall',
            'Exterior: cracks wider than 1/4 inch need engineer review',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>🔍 {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>❄️ HVAC Age Check</h2>
          {[
            'Find the data plate on outdoor condenser unit',
            'Decode manufacture date: 2nd and 3rd digits of serial number = year',
            '15+ years old means budget $7,000-12,000 for replacement',
            'Ask last service date — no records is a red flag',
            'Check supply registers: even airflow across all floors?',
          ].map(t => (
            <div key={t} style={{ padding: '8px 0', borderBottom: '1px solid #1a2d4a', color: '#ccc', fontSize: 14 }}>❄️ {t}</div>
          ))}
        </div>

        <div style={{ background: '#0d1e36', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Property Type → Open House Evaluation Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {propertyTypes.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, background: selected === p.id ? '#F5E642′ : '#1a2d4a', color: selected === p.id ? '#0A1628' : '#ccc', fontWeight: selected === p.id ? 700 : 400 }}
              >
                {p.label}
              </button>
            ))}
          </div>
          {selected && guides[selected].map(item => (
            <div key={item} style={{ color: '#ccc', fontSize: 13, padding: '6px 0', borderBottom: '1px solid #1a2d4a' }}>→ {item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: '#F5E642', fontSize: 13 }}>🔗 ProLnk — DFW Home Services Network | prolnk.io</div>
      </div>
    </div>
  );
}
