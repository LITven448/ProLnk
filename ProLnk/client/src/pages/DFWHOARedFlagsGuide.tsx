import { useState } from 'react';

const findings = [
  { id: 'low_reserves', label: 'Reserve fund below 10% of annual budget', weight: 4, detail: 'Means the HOA cannot cover major repairs without a special assessment.' },
  { id: 'special_assessments', label: 'Special assessments in the past 3 years', weight: 3, detail: 'Indicates reserves ran dry — you may pay again if root cause not fixed.' },
  { id: 'pending_litigation', label: 'HOA currently in litigation (sue or being sued)', weight: 5, detail: 'Can block financing. FHA/VA loans typically disqualify homes in HOAs under litigation.' },
  { id: 'high_delinquency', label: 'Delinquency rate above 15% of homeowners', weight: 4, detail: 'High delinquency erodes budget. Lenders may require delinquency below 15% for loan approval.' },
  { id: 'no_financials', label: 'HOA refuses or cannot provide financials', weight: 5, detail: 'A serious red flag — this is your right to review before purchasing in Texas.' },
  { id: 'management_turnover', label: 'Multiple management company changes in 3 years', weight: 3, detail: 'Indicates internal conflict, board dysfunction, or financial mismanagement.' },
  { id: 'large_deferred_maintenance', label: 'Visible deferred maintenance on common areas', weight: 3, detail: 'Pool in disrepair, cracked parking, dead landscaping — all signal underfunded operations.' },
  { id: 'rule_conflicts', label: 'Lots of violations or neighbor complaints on record', weight: 2, detail: 'Active enforcement disputes increase litigation risk and board conflict.' },
  { id: 'no_reserve_study', label: 'No reserve study done in past 5 years', weight: 3, detail: 'Responsible HOAs do reserve studies every 3–5 years to plan for major repairs.' },
  { id: 'assessments_increasing', label: 'Monthly assessments increased 20%+ in past 2 years', weight: 3, detail: 'Rapid increases often mean catching up from previous underfunding.' },
];

const docs = [
  'CC&Rs (Covenants, Conditions & Restrictions)',
  'HOA bylaws and rules/regulations',
  'Last 2 years of meeting minutes',
  'Last 2 years of audited financials or CPA-reviewed statements',
  'Current year operating budget',
  'Reserve fund balance and most recent reserve study',
  'List of pending litigation or legal disputes',
  'Current delinquency report (% of homeowners behind on dues)',
  'List of any approved special assessments',
  'Insurance certificate (at minimum $1M general liability)',
];

const scoreLevels = [
  { min: 0, max: 4, label: 'Healthy HOA', emoji: '✅', color: '#16A34A', verdict: 'This HOA shows signs of good financial health. Proceed with standard document review.', concern: false, additionalDocs: [] },
  { min: 5, max: 9, label: 'Review Carefully', emoji: '⚠️', color: '#CA8A04', verdict: 'Some yellow flags present. Get complete financials and meeting minutes before proceeding. Negotiate accordingly.', concern: true, additionalDocs: ['Full 3-year meeting minute history', 'Delinquency rate report', 'Management company contract and history'] },
  { min: 10, max: 100, label: 'Significant HOA Risk', emoji: '🚨', color: '#DC2626', verdict: 'Multiple red flags. Risk of special assessment, financing issues, or future legal complications. Consider walking away or consult a real estate attorney before proceeding.', concern: true, additionalDocs: ['Litigation documents (case name, status)', 'Insurance claims history (3 years)', 'All special assessment history', 'Reserve fund investment statements', 'Management turnover history with dates'] },
];

export default function DFWHOARedFlagsGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showDocs, setShowDocs] = useState(false);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const score = selected.reduce((sum, id) => {
    const f = findings.find(x => x.id === id);
    return sum + (f?.weight ?? 0);
  }, 0);

  const result = scoreLevels.find(r => score >= r.min && score <= r.max);
  const selectedFindings = findings.filter(f => selected.includes(f.id));

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0F172A', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏘️📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>DFW HOA Red Flag Guide</h1>
          <p style={{ color: '#64748B', fontSize: 15 }}>Identify dysfunctional HOAs before you buy — financials, reserves, litigation, and the right questions to ask.</p>
          <div style={{ background: '#FEF9C3', border: '2px solid #CA8A04', padding: '12px 16px', borderRadius: 8, marginTop: 20, textAlign: 'left' }}>
            <strong style={{ color: '#92400E' }}>📌 Texas Law:</strong>
            <span style={{ color: '#78350F', fontSize: 14 }}> Texas Property Code §207.003 requires HOAs to provide resale certificates and documents within 7 days of request. You have a right to financials, meeting minutes, and reserve studies before closing.</span>
          </div>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 14 }}>Select HOA findings or concerns:</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
          {findings.map(f => (
            <button key={f.id} onClick={() => toggle(f.id)}
              style={{ background: selected.includes(f.id) ? '#0A1628' : '#FFF', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#E2E8F0'}`, borderRadius: 8, padding: '12px 16px', color: selected.includes(f.id) ? '#F5E642' : '#334155', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, flex: 1 }}>{f.label}</span>
                <span style={{ fontSize: 11, background: f.weight >= 5 ? '#FEE2E2' : f.weight >= 3 ? '#FEF9C3' : '#F0FDF4', color: f.weight >= 5 ? '#DC2626' : f.weight >= 3 ? '#92400E' : '#15803D', padding: '2px 8px', borderRadius: 10, marginLeft: 12, whiteSpace: 'nowrap' }}>
                  Weight {f.weight}
                </span>
              </div>
              {selected.includes(f.id) && <p style={{ fontSize: 12, color: '#94A3B8', margin: '6px 0 0', fontStyle: 'italic' }}>{f.detail}</p>}
            </button>
          ))}
        </div>

        {result && selected.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ background: '#FFF', border: `3px solid ${result.color}`, borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 36 }}>{result.emoji}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>HOA Health Score: {score} pts</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: result.color, marginTop: 4 }}>{result.label}</div>
                <p style={{ color: '#475569', fontSize: 13, marginTop: 8 }}>{result.verdict}</p>
              </div>
              {result.additionalDocs.length > 0 && (
                <div style={{ background: '#FFF8F0', border: '1px solid #FED7AA', borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 10 }}>📄 Additional Documents to Request:</div>
                  {result.additionalDocs.map((doc, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: '#CA8A04' }}>→</span>
                      <span style={{ fontSize: 13, color: '#78350F' }}>{doc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ background: '#FFF', border: '2px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
          <button onClick={() => setShowDocs(!showDocs)}
            style={{ width: '100%', background: '#0A1628', border: 'none', padding: '14px 20px', color: '#F5E642', fontWeight: 700, fontSize: 14, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
            <span>📁 HOA Documents to Request Before Closing</span>
            <span>{showDocs ? '▲' : '▼'}</span>
          </button>
          {showDocs && (
            <div style={{ padding: 20 }}>
              {docs.map((doc, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '2px 7px', borderRadius: 10, minWidth: 24, textAlign: 'center' }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: '#334155' }}>{doc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {selected.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#94A3B8', marginTop: 20 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏘️</div>
            <p>Select HOA findings above to get your health assessment and document checklist.</p>
          </div>
        )}
      </div>
    </div>
  );
}
