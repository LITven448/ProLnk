import { useState } from 'react';

const risks = [
  { id: 'foundation', label: 'Trees within 15 feet of foundation' },
  { id: 'dead', label: 'Dead or dying branches' },
  { id: 'mushrooms', label: 'Mushrooms at base of tree' },
  { id: 'cracks', label: 'Cracks or cavities in trunk' },
  { id: 'leaning', label: 'Leaning toward house or structure' },
  { id: 'trimmed', label: 'Not trimmed in the last 3 years' },
];

export default function DFWTreeCareGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const riskCount = Object.values(checked).filter(Boolean).length;

  const riskLevel = riskCount === 0
    ? { label: 'No Risk Flags', color: '#34D399', message: 'No issues identified. Keep up regular trimming and monitoring.' }
    : riskCount <= 2
    ? { label: 'Low Risk', color: '#FACC15', message: 'Schedule an arborist inspection within the next 6 months.' }
    : riskCount <= 4
    ? { label: 'Moderate Risk', color: '#FB923C', message: 'Get a certified arborist evaluation within 30 days.' }
    : { label: 'High Risk', color: '#F87171', message: 'Call an arborist now. Multiple indicators suggest immediate hazard.' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌳</span>
          <span style={{ color: '#FACC15', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</span>
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
          DFW Tree Care Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 17, marginBottom: 40 }}>
          Texas Trees and Your Home — Protect Your Foundation, Avoid Storm Damage
        </p>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>📍 DFW Tree Threats</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            DFW's top tree killers are <strong style={{ color: '#fff' }}>oak wilt</strong> (spreads through root grafts between red oaks), <strong style={{ color: '#fff' }}>emerald ash borer</strong> (devastating ash trees metro-wide), and <strong style={{ color: '#fff' }}>drought stress</strong> from extreme summer heat. Dead or dying trees near structures create foundation risk, storm hazard, and liability.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Tree Risk Assessment</h2>
        <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Check all that apply to trees near your home:</p>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
          {risks.map(risk => (
            <label
              key={risk.id}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #1E3050', cursor: 'pointer' }}
            >
              <div
                onClick={() => toggle(risk.id)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  border: checked[risk.id] ? '2px solid #FACC15' : '2px solid #2A3A52',
                  background: checked[risk.id] ? '#FACC15' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {checked[risk.id] && <span style={{ color: '#0A1628', fontSize: 14, fontWeight: 900 }}>✓</span>}
              </div>
              <span style={{ color: '#CBD5E1', fontSize: 15 }}>{risk.label}</span>
            </label>
          ))}
        </div>

        <div style={{ background: '#1A2C44', borderRadius: 12, padding: '20px 24px', marginBottom: 32, borderLeft: `4px solid ${riskLevel.color}` }}>
          <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>Risk Assessment</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: riskLevel.color, marginBottom: 6 }}>{riskLevel.label}</p>
          <p style={{ color: '#CBD5E1', fontSize: 15 }}>{riskLevel.message}</p>
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>⚠️ DFW-Specific Hazards</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🏠', tip: 'Foundation risk: Large trees within 15 feet draw moisture from DFW clay soil, accelerating foundation movement. This is the #1 tree-related home expense in North Texas.' },
              { icon: '🌲', tip: 'Cedar fever (Mountain cedar) peaks February–March. If a cedar tree is near your home, trimming before January reduces airborne pollen and fire risk.' },
              { icon: '🐜', tip: 'Fire ant mounds at tree bases indicate saturated soil or root decay. Treat mounds and check for root damage.' },
              { icon: '✂️', tip: 'Crape myrtle murder: Never top crape myrtles. Heavy heading ruins the tree’s structure. Correct trimming = remove suckers + cross-branches only.' },
            ].map(({ icon, tip }, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, color: '#CBD5E1', fontSize: 15, lineHeight: 1.6 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '24px 28px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>💰 DFW Cost Guide</h2>
          {[
            { service: 'Tree Trimming', range: '$150 – $500' },
            { service: 'Tree Removal (standard)', range: '$300 – $1,200' },
            { service: 'Emergency Storm Removal', range: '$500 – $2,000+' },
            { service: 'Stump Grinding', range: '$75 – $200' },
            { service: 'Disease Treatment (oak wilt)', range: '$200 – $800' },
          ].map(({ service, range }) => (
            <div key={service} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1E3050' }}>
              <span style={{ color: '#CBD5E1' }}>{service}</span>
              <span style={{ color: '#FACC15', fontWeight: 700 }}>{range}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/homeowner/signup"
            style={{
              display: 'inline-block',
              background: '#FACC15',
              color: '#0A1628',
              fontWeight: 800,
              fontSize: 16,
              padding: '16px 36px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Find a Certified Arborist →
          </a>
          <p style={{ color: '#64748B', fontSize: 13, marginTop: 12 }}>Free. No commitment. DFW-verified contractors only.</p>
        </div>

      </div>
    </div>
  );
}
