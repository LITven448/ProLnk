import { useState } from 'react';

const knowledgeAreas = [
  {
    stage: 'Sizing',
    icon: '📐',
    knowledge: 'Manual J load calculations, DFW climate zone 3A, square footage, insulation, windows, duct leakage.',
    gaps: 'Most DFW homeowners cannot verify if sizing was done correctly.',
    prolnk: 'ProLnk pros are required to provide Manual J documentation on all DFW new installs.',
  },
  {
    stage: 'Efficiency',
    icon: '⚡',
    knowledge: 'SEER2 ratings, EER2 for DFW heat, two-stage vs variable-speed, heat pump COP.',
    gaps: 'Understanding real-world DFW performance vs spec sheet ratings.',
    prolnk: 'ProLnk quote comparisons include efficiency ratings side-by-side for DFW homeowners.',
  },
  {
    stage: 'Installation',
    icon: '🔧',
    knowledge: 'Permits, load calc, refrigerant charge, duct sealing, commissioning.',
    gaps: 'Knowing if your DFW install was done to code and best practice.',
    prolnk: 'ProLnk tracks permit status and inspection results for DFW jobs.',
  },
  {
    stage: 'Maintenance',
    icon: '🧹',
    knowledge: 'Filter schedules, coil cleaning, drain line, refrigerant checks, DFW dust and allergens.',
    gaps: 'Knowing when to DIY vs call a DFW HVAC tech.',
    prolnk: 'ProLnk sends seasonal DFW maintenance reminders and connects to tune-up pros.',
  },
  {
    stage: 'Repair',
    icon: '🛠️',
    knowledge: 'Diagnosing common DFW failures — capacitors, contactors, refrigerant leaks, drain clogs.',
    gaps: 'Distinguishing minor repairs from signs of system failure in DFW heat.',
    prolnk: 'ProLnk urgent match routes DFW emergency repair requests same-day.',
  },
  {
    stage: 'Replacement',
    icon: '🔄',
    knowledge: 'When to repair vs replace, DFW system lifespan (12–18 years), replacement timing.',
    gaps: 'Avoiding premature replacement pushed by DFW contractors.',
    prolnk: 'ProLnk provides second opinions and neutral replacement guidance.',
  },
  {
    stage: 'Finance',
    icon: '💰',
    knowledge: 'Federal tax credits (up to $2,000), Oncor rebates, DFW utility rebates, PACE financing.',
    gaps: 'Knowing which DFW rebates and credits apply to your project.',
    prolnk: 'ProLnk quotes include applicable DFW rebate and tax credit estimates.',
  },
];

export default function DFWHVACFinalKnowledgeMap() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const active = knowledgeAreas.find(k => k.stage === activeStage);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🗺️ DFW HVAC Final Knowledge Map</h1>
        <p style={{ color: '#94a3b8', marginBottom: 40 }}>Every DFW HVAC knowledge area — sizing, efficiency, installation, maintenance, repair, replacement, and finance — with ProLnk's role at each stage. Click any stage to explore.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12, marginBottom: 40 }}>
          {knowledgeAreas.map(area => (
            <button
              key={area.stage}
              onClick={() => setActiveStage(area.stage === activeStage ? null : area.stage)}
              style={{
                background: activeStage === area.stage ? '#F5E642' : '#0f2035',
                color: activeStage === area.stage ? '#0A1628' : '#fff',
                border: '2px solid ' + (activeStage === area.stage ? '#F5E642' : '#1e3a5f'),
                borderRadius: 12,
                padding: '18px 8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 13,
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{area.icon}</div>
              {area.stage}
            </button>
          ))}
        </div>

        {active ? (
          <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{active.icon}</div>
            <h2 style={{ color: '#F5E642', marginBottom: 20 }}>{active.stage}</h2>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#60a5fa', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>WHAT YOU NEED TO KNOW</div>
              <div style={{ color: '#cbd5e1', fontSize: 15 }}>{active.knowledge}</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#f59e0b', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>COMMON DFW KNOWLEDGE GAPS</div>
              <div style={{ color: '#fcd34d', fontSize: 15 }}>{active.gaps}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>HOW PROLNK HELPS</div>
              <div style={{ color: '#cbd5e1', fontSize: 15 }}>{active.prolnk}</div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0f2035', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
            <div style={{ color: '#94a3b8', fontSize: 16 }}>Select any knowledge area above to explore what DFW homeowners need to know — and how ProLnk bridges the gap.</div>
          </div>
        )}
      </div>
    </div>
  );
}
