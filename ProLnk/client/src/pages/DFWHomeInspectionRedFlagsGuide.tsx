import { useState } from 'react';

const findings = [
  { id: 'foundation_failure', label: 'Foundation failure (stair-step cracks, severe settling)', severity: 'critical', walkAway: true, repairRange: '$15,000–$80,000+', strategy: 'Walk away unless deeply discounted and you have contractor quotes.' },
  { id: 'foundation_minor', label: 'Minor foundation cracking (hairline, cosmetic)', severity: 'low', walkAway: false, repairRange: '$500–$3,000', strategy: 'Negotiate a credit of 1.5x repair estimate. Request engineer letter.' },
  { id: 'active_roof_leak', label: 'Active roof leak (water stains, wet insulation)', severity: 'critical', walkAway: true, repairRange: '$8,000–$25,000', strategy: 'Walk away or require full replacement before close with holdback.' },
  { id: 'old_roof_repair', label: 'Old roof repair (previous patch, aging shingles)', severity: 'medium', walkAway: false, repairRange: '$4,000–$12,000', strategy: 'Negotiate seller credit or replacement. Get roofing bid during option period.' },
  { id: 'polybutylene', label: 'Polybutylene pipes throughout', severity: 'high', walkAway: true, repairRange: '$4,000–$15,000', strategy: 'Walk away or require full repipe before close. Insurance may deny coverage.' },
  { id: 'minor_plumbing', label: 'Minor plumbing leak (single fixture)', severity: 'low', walkAway: false, repairRange: '$150–$800', strategy: 'Negotiate repair credit. Simple fix during option period.' },
  { id: 'panel_60a', label: '60-amp electrical panel (fire hazard)', severity: 'high', walkAway: false, repairRange: '$2,500–$5,000', strategy: 'Require panel upgrade as condition of sale or negotiate credit.' },
  { id: 'panel_100a', label: '100-amp panel (undersized for modern use)', severity: 'medium', walkAway: false, repairRange: '$1,500–$3,000', strategy: 'Negotiate $2,000–$3,500 credit. Upgrade post-close.' },
  { id: 'mold_active', label: 'Active mold (visible colonies, musty smell + moisture)', severity: 'critical', walkAway: true, repairRange: '$5,000–$30,000+', strategy: 'Walk away unless seller provides professional remediation with clearance testing.' },
  { id: 'minor_moisture', label: 'Minor moisture staining (no active source)', severity: 'low', walkAway: false, repairRange: '$200–$1,500', strategy: 'Identify source, negotiate repair. Monitor with inspector during reinspection.' },
];

export default function DFWHomeInspectionRedFlagsGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const selected_findings = findings.filter(f => selected.includes(f.id));
  const hasWalkAway = selected_findings.some(f => f.walkAway);
  const criticalCount = selected_findings.filter(f => f.severity === 'critical').length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠🔍</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Home Inspection Red Flags</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Walk away vs. negotiate — with DFW-specific context and repair estimates.</p>
          <div style={{ background: '#1E3A5F', borderLeft: '4px solid #F5E642', padding: '12px 16px', borderRadius: 6, marginTop: 20, textAlign: 'left' }}>
            <strong style={{ color: '#F5E642' }}>🏗️ DFW Reality Check:</strong>
            <span style={{ color: '#CBD5E1', fontSize: 14 }}> Foundation letters are extremely common in North Texas. Expansive clay soil means over 50% of DFW homes have had some repair. A letter alone is NOT a dealbreaker — what matters is scope, certification, and warranty.</span>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Select findings from your inspection report:</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {findings.map(f => (
            <button key={f.id} onClick={() => toggle(f.id)}
              style={{ background: selected.includes(f.id) ? '#1E3A5F' : '#0F2236', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '12px 16px', color: '#E8F0FE', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>{f.label}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: f.severity === 'critical' ? '#7F1D1D' : f.severity === 'high' ? '#78350F' : f.severity === 'medium' ? '#1E3A5F' : '#14532D', color: '#FFF', marginLeft: 12, whiteSpace: 'nowrap' }}>
                {f.severity.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        {selected_findings.length > 0 && (
          <div>
            <div style={{ background: hasWalkAway ? '#450A0A' : '#052E16', border: `2px solid ${hasWalkAway ? '#DC2626' : '#16A34A'}`, borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{hasWalkAway ? '🚨' : '🤝'}</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: hasWalkAway ? '#FCA5A5' : '#86EFAC', marginBottom: 4 }}>
                {hasWalkAway ? 'CONSIDER WALKING AWAY' : 'NEGOTIATE — DON\’T WALK'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: 14 }}>{criticalCount} critical issue{criticalCount !== 1 ? 's' : ''} detected across {selected_findings.length} finding{selected_findings.length !== 1 ? 's' : ''}</p>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {selected_findings.map(f => (
                <div key={f.id} style={{ background: '#0F2236', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#E8F0FE', flex: 1 }}>{f.label}</span>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 12, background: f.walkAway ? '#7F1D1D' : '#052E16', color: f.walkAway ? '#FCA5A5' : '#86EFAC', marginLeft: 12, whiteSpace: 'nowrap' }}>{f.walkAway ? '🚨 Walk Away' : '🤝 Negotiate'}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
                    <div style={{ background: '#1E3A5F', borderRadius: 6, padding: '8px 12px' }}>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>REPAIR RANGE</div>
                      <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{f.repairRange}</div>
                    </div>
                    <div style={{ background: '#1E3A5F', borderRadius: 6, padding: '8px 12px' }}>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 2 }}>STRATEGY</div>
                      <div style={{ fontSize: 13, color: '#CBD5E1' }}>{f.strategy}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#475569' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>☝️</div>
            <p>Select inspection findings above to get your walk-away vs. negotiate assessment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
