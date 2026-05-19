import { useState } from 'react';

const stages = [
  {
    stage: 'Planning',
    label: '📋 Planning Your DFW HVAC Replacement',
    actions: [
      'Get at least 3 quotes from licensed DFW HVAC contractors',
      'Ask each contractor for a Manual J load calculation — reject any who skip it',
      'Verify each contractor holds a Texas HVAC license (check TDLR.texas.gov)',
      'Confirm proposed system size matches your home square footage and DFW climate zone',
      'Ask about current Oncor or TXU rebates for high-efficiency equipment',
    ],
    next: 'Once you have 3 quotes with Manual J, compare and select your contractor.',
  },
  {
    stage: 'Before Install',
    label: '📝 Before Installation Day',
    actions: [
      'Confirm permit has been pulled (ask for permit number — never skip this in DFW)',
      'Verify electrical is up to code for new system size (see electrical requirements guide)',
      'Ask about lineset: reuse vs. new — 15-year-old copper linesets should be replaced',
      'Confirm flue and venting plan is included in scope and price',
      'Check gas line adequacy if upgrading furnace size',
      'Ask about old equipment disposal — many DFW counties require proper refrigerant recovery',
    ],
    next: 'With permit confirmed and scope locked, schedule your installation date.',
  },
  {
    stage: 'Installation Day',
    label: '🔧 Installation Day Checklist',
    actions: [
      'Verify crew pulls permit card and posts it (required by DFW municipal code)',
      'Ask tech to walk you through what they\’re installing before they start',
      'Confirm new disconnect box is installed at condenser',
      'Ensure new air handler drain pan and condensate line are properly routed',
      'Take photos of all equipment model/serial numbers before covers go on',
    ],
    next: 'After install, schedule city inspection — do not skip this step in DFW.',
  },
  {
    stage: 'Post-Installation',
    label: '✅ After Installation',
    actions: [
      'Schedule city inspection — inspector will check refrigerant charge, electrical, and venting',
      'Register equipment warranty directly with manufacturer (contractor registration often voids extended warranty)',
      'Test all zones and thermostat modes before contractor leaves',
      'Ask for as-built documentation: refrigerant charge weight, superheat, subcooling measurements',
      'Set calendar reminder for first-year filter check (90 days) and annual tune-up',
    ],
    next: 'Your DFW HVAC replacement is complete. File permit card with your home records.',
  },
];

export default function DFWHVACFinalProjectPlan() {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0F172A', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 6 }}>DFW HVAC Guide</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12, lineHeight: 1.2, marginTop: 20 }}>
          📋 DFW HVAC Replacement Project Plan
        </h1>
        <p style={{ color: '#475569', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          A complete step-by-step checklist for DFW homeowners replacing their HVAC system. Most mistakes happen in planning or post-install — this keeps you covered at every stage.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {stages.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              style={{
                background: activeStage === i ? '#0A1628′ : '#E2E8F0',
                color: activeStage === i ? '#F5E642′ : '#334155',
                border: 'none',
                borderRadius: 8,
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s.stage}
            </button>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px rgba(10,22,40,0.08)', marginBottom: 28 }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{stages[activeStage].label}</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
            {stages[activeStage].actions.map((action, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  background: '#F1F5F9',
                  borderRadius: 10,
                  padding: '14px 18px',
                }}
              >
                <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ color: '#1E293B', fontSize: 15, lineHeight: 1.6 }}>{action}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#EFF6FF', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #0A1628′ }}>
            <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>WHAT'S NEXT</div>
            <div style={{ color: '#1E3A5F', fontSize: 14, lineHeight: 1.6 }}>{stages[activeStage].next}</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h3 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚠️ DFW Top 5 Replacement Mistakes</h3>
          {[
            'Accepting a quote without Manual J — guaranteed wrong size',
            'Skipping the permit — resale, insurance, and inspection issues',
            'Reusing a 15+ year old lineset — refrigerant leaks within 2 years',
            'Skipping warranty registration — manufacturer voids coverage',
            'Not getting post-install refrigerant charge documentation',
          ].map((mistake, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ color: '#F87171', fontWeight: 800, flexShrink: 0 }}>✗</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{mistake}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Ready to Start Your DFW HVAC Project?</h3>
          <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 0 }}>ProLnk connects DFW homeowners with vetted HVAC contractors who pull permits, do Manual J, and stand behind their work.</p>
        </div>
      </div>
    </div>
  );
}
