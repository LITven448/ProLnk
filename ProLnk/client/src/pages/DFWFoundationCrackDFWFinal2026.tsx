import { useState } from 'react';

const assessments = [
  {
    id: 'hairline',
    label: '🔍 Hairline crack, under 1/16 inch wide',
    severity: 'MONITOR',
    color: '#22c55e',
    detail: 'Hairline cracks in DFW are extremely common due to clay soil expansion and contraction. Width under 1/16" with no stair-step pattern typically indicates normal settling. Not a structural concern.',
    action: 'Mark crack ends with pencil and date. Re-check in 30 days. Log in ProLnk Home Health Vault for permanent tracking. Call ProLnk if width exceeds 1/8" or if multiple new cracks appear.'
  },
  {
    id: 'stair-step',
    label: '🧱 Stair-step crack in brick/block',
    severity: 'ASSESS SOON',
    color: '#f59e0b',
    detail: 'Stair-step cracks follow mortar joints in a diagonal pattern. In DFW, this is often seasonal clay movement. Concerning if new, widening, or paired with door/window sticking. More serious if horizontal.',
    action: 'Book ProLnk foundation assessment within 2 weeks. Bring photos showing crack pattern. Document if any doors or windows have started sticking recently — that changes the assessment.'
  },
  {
    id: 'horizontal',
    label: '⚠️ Horizontal crack in foundation wall',
    severity: 'CALL TODAY',
    color: '#ef4444',
    detail: 'Horizontal cracks indicate lateral soil pressure pushing against foundation wall. This is a structural emergency in DFW — heavy clay soils can exert enormous pressure after rain events. Do not wait.',
    action: 'Call ProLnk emergency line today. Do not wait for a "get quotes" process — horizontal foundation cracks can progress to wall failure. Get a structural engineer, not just a contractor.'
  },
  {
    id: 'wide',
    label: '📏 Wide crack, 1/4 inch or more',
    severity: 'ACT IMMEDIATELY',
    color: '#ef4444',
    detail: 'Cracks 1/4" or wider indicate significant foundation movement. In DFW, this often means pier settlement or major differential clay movement. Structural integrity may be compromised. Do not ignore.',
    action: 'Get ProLnk foundation pro on-site within 48 hours. Measure and photograph today. Check if crack is wider at top or bottom — that matters. Document in Vault for insurance purposes.'
  },
  {
    id: 'multiple-new',
    label: '🚨 Multiple new cracks appeared recently',
    severity: 'EMERGENCY',
    color: '#dc2626',
    detail: 'Multiple new cracks appearing in a short timeframe — especially after heavy DFW rain — signal rapid foundation movement. This is an emergency. Combined with sloping floors or door/frame gaps: evacuate and call.',
    action: 'Stop. Call ProLnk emergency line AND a structural engineer. Do not wait. If floors slope or walls separate from ceiling, leave the home and call 911. Document everything now.'
  },
  {
    id: 'stable',
    label: '📊 Old crack, no change in years',
    severity: 'LOG AND MONITOR',
    color: '#3b82f6',
    detail: 'Stable, old cracks that have not changed in size, direction, or quantity for 2+ years are low-risk. Common in DFW homes 20+ years old. The key word is stable — confirmed by monitoring over time.',
    action: 'Add to ProLnk Vault with current photos and measurements. Mark as stable with date. Recheck annually. This record protects your home value and provides proof of stability for future buyers.'
  }
];

export default function DFWFoundationCrackDFWFinal2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = assessments.find(a => a.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: '26px', fontWeight: '800', margin: '0 0 8px' }}>
            DFW Foundation Crack Final Assessment
          </h1>
          <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>
            FINAL GUIDE 2026 — DEFINITIVE DFW RESOURCE
          </p>
          <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0' }}>
            DFW expansive clay soil causes more foundation cracks than almost anywhere in the US. Width + pattern + location + movement = complete picture.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '14px', fontWeight: '700', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Describe Your Crack →
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {assessments.map(a => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                style={{
                  background: selected === a.id ? '#F5E642' : '#1e3a5f',
                  color: selected === a.id ? '#0A1628' : '#e2e8f0',
                  border: 'none', borderRadius: '8px', padding: '14px 16px',
                  textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ display: 'inline-block', background: active.color, color: '#fff', fontSize: '12px', fontWeight: '800', padding: '4px 12px', borderRadius: '4px', marginBottom: '16px' }}>
              {active.severity}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>{active.detail}</p>
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>⚡ ACTION</div>
              <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6', margin: '0' }}>{active.action}</p>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#112240', borderRadius: '12px', padding: '24px' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 16px' }}>
            Track your DFW foundation cracks permanently in ProLnk Home Health Vault — free for homeowners
          </p>
          <a href="https://prolnk.io" style={{
            background: '#F5E642', color: '#0A1628', padding: '14px 32px',
            borderRadius: '8px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', display: 'inline-block'
          }}>
            Add Your Home to Vault → prolnk.io
          </a>
        </div>
      </div>
    </div>
  );
}
