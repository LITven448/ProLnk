import { useState } from 'react';

const letterTypes = [
  { id: 'engineer_certified', label: 'Engineer-certified letter (PE stamp, scope, warranty)' },
  { id: 'contractor_only', label: 'Contractor warranty only (no engineer)' },
  { id: 'verbal_disclosure', label: 'Verbal disclosure only (no documentation)' },
  { id: 'no_disclosure', label: 'No disclosure (seller unaware or hiding)' },
];

const repairScopes = [
  { id: 'piers_full', label: 'Full perimeter pier installation (10+ piers)' },
  { id: 'piers_partial', label: 'Partial pier installation (1–6 piers, targeted repair)' },
  { id: 'mudjacking', label: 'Mudjacking / slab leveling only' },
  { id: 'drainage_only', label: 'Drainage correction only (gutters, grading)' },
];

const riskMap: Record<string, Record<string, { risk: string; level: string; steps: string[]; verdict: string }>> = {
  engineer_certified: {
    piers_full: { risk: 'Low-Moderate', level: 'green', steps: ['Verify PE license with Texas Board of Engineers', 'Confirm warranty is transferable', 'Get independent soil report if >15 piers', 'Ask for pre/post elevation survey'], verdict: 'Proceed with due diligence — engineer letter is the gold standard in DFW.' },
    piers_partial: { risk: 'Low', level: 'green', steps: ['Confirm repair addressed root cause', 'Verify warranty transferability', 'Check drainage improvements were included', 'Get post-repair elevation certificate'], verdict: 'Standard DFW situation — proceed with confidence after verification.' },
    mudjacking: { risk: 'Moderate', level: 'yellow', steps: ['Mudjacking is temporary — budget for future piers', 'Get independent assessment of remaining movement risk', 'Check if drainage was corrected alongside'], verdict: 'Acceptable short-term fix — understand it may need follow-up in 5–10 years.' },
    drainage_only: { risk: 'Low', level: 'green', steps: ['Confirm no structural movement occurred', 'Verify grading improvements still intact', 'Monitor seasonally'], verdict: 'Preventive repair — great outcome, proceed normally.' },
  },
  contractor_only: {
    piers_full: { risk: 'Moderate-High', level: 'yellow', steps: ['Hire independent structural engineer ($400–$700)', 'Request all repair documentation', 'Verify contractor is still in business', 'Negotiate price reduction to offset risk'], verdict: 'Negotiate harder — no PE oversight is a gap. Get your own engineer.' },
    piers_partial: { risk: 'Moderate', level: 'yellow', steps: ['Independent engineer evaluation recommended', 'Confirm repair scope was sufficient', 'Ask for elevation survey before and after'], verdict: 'Manageable with verification — budget $500 for independent evaluation.' },
    mudjacking: { risk: 'High', level: 'red', steps: ['Require engineer evaluation before proceeding', 'Mudjacking with no engineer oversight = unknown stability', 'Budget for potential pier work in next 3–5 years'], verdict: 'Risky without engineer. Negotiate significant credit or require independent evaluation.' },
    drainage_only: { risk: 'Low-Moderate', level: 'green', steps: ['Verify drainage solution is still functioning', 'Check for any signs of post-repair movement'], verdict: 'Generally acceptable — verify work is still effective.' },
  },
  verbal_disclosure: {
    piers_full: { risk: 'High', level: 'red', steps: ['Do NOT proceed without full documentation', 'Require seller to produce all records in option period', 'If no records exist, price as-is with engineer report', 'Legal exposure if seller misrepresents'], verdict: 'Red flag — require documentation before proceeding. Walk if seller refuses.' },
    piers_partial: { risk: 'High', level: 'red', steps: ['Same as above — verbal only is unacceptable for pier work', 'Request TREC amendment for documentation requirement'], verdict: 'Do not close without written documentation.' },
    mudjacking: { risk: 'Moderate-High', level: 'yellow', steps: ['Request receipts or any contractor contact info', 'Get independent engineer evaluation'], verdict: 'Proceed only with independent evaluation and price adjustment.' },
    drainage_only: { risk: 'Moderate', level: 'yellow', steps: ['Verify visible drainage improvements', 'Get engineer confirmation of structural integrity'], verdict: 'Lower risk but get it documented before closing.' },
  },
  no_disclosure: {
    piers_full: { risk: 'Very High', level: 'red', steps: ['If cracks are visible — require engineer immediately', 'Seller non-disclosure may be illegal in Texas', 'Consult your agent and possibly attorney', 'Walk unless deeply discounted + full engineer report'], verdict: 'Walk or require full engineer evaluation and major price reduction.' },
    piers_partial: { risk: 'Very High', level: 'red', steps: ['Same — non-disclosure is a serious legal issue in Texas', 'Document all visible findings with photos'], verdict: 'Walk or require independent engineer and price negotiation.' },
    mudjacking: { risk: 'High', level: 'red', steps: ['Seller legally required to disclose in Texas', 'Get engineer evaluation during option period', 'Price adjustment of $3,000–$8,000 minimum'], verdict: 'Proceed only with engineer clearance and significant price concession.' },
    drainage_only: { risk: 'Moderate', level: 'yellow', steps: ['May be innocent omission', 'Verify drainage function during inspection', 'Confirm no structural movement occurred'], verdict: 'Lower risk — but verify thoroughly before proceeding.' },
  },
};

const levelColors: Record<string, string> = { green: '#16A34A', yellow: '#CA8A04', red: '#DC2626′ };

export default function DFWFoundationLetterGuide() {
  const [letterType, setLetterType] = useState('');
  const [repairScope, setRepairScope] = useState('');

  const result = letterType && repairScope ? riskMap[letterType]?.[repairScope] : null;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#0F172A', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>DFW Foundation Letter Guide</h1>
          <p style={{ color: '#64748B', fontSize: 15 }}>What prior repair documentation means — and how to evaluate it before you close.</p>
          <div style={{ background: '#FEF9C3', border: '2px solid #CA8A04', padding: '12px 16px', borderRadius: 8, marginTop: 20, textAlign: 'left' }}>
            <strong style={{ color: '#92400E' }}>🏡 DFW Context:</strong>
            <span style={{ color: '#78350F', fontSize: 14 }}> North Texas expansive clay soil causes seasonal movement. Over 50% of DFW homes have had some foundation work. A letter isn't a dealbreaker — the type of letter and scope is what matters.</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>📄 Letter / Documentation Type</h2>
            {letterTypes.map(lt => (
              <button key={lt.id} onClick={() => setLetterType(lt.id)}
                style={{ width: '100%', background: letterType === lt.id ? '#0A1628′ : '#FFF', border: `2px solid ${letterType === lt.id ? '#F5E642' : '#E2E8F0'}`, borderRadius: 8, padding: '10px 14px', color: letterType === lt.id ? '#F5E642' : '#334155', cursor: ’pointer', textAlign: 'left', fontSize: 13, marginBottom: 8 }}>
                {lt.label}
              </button>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>🔧 Repair Scope Described</h2>
            {repairScopes.map(rs => (
              <button key={rs.id} onClick={() => setRepairScope(rs.id)}
                style={{ width: '100%', background: repairScope === rs.id ? '#0A1628′ : '#FFF', border: `2px solid ${repairScope === rs.id ? '#F5E642' : '#E2E8F0'}`, borderRadius: 8, padding: '10px 14px', color: repairScope === rs.id ? '#F5E642' : '#334155', cursor: ’pointer', textAlign: 'left', fontSize: 13, marginBottom: 8 }}>
                {rs.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#FFF', border: `3px solid ${levelColors[result.level]}`, borderRadius: 14, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 28 }}>{result.level === 'green' ? '✅' : result.level === 'yellow' ? '⚠️' : '🚨'}</div>
              <div>
                <div style={{ fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1 }}>Risk Level</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: levelColors[result.level] }}>{result.risk}</div>
              </div>
            </div>
            <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>Verdict</div>
              <div style={{ fontSize: 14, color: '#0F172A', fontWeight: 500 }}>{result.verdict}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 10 }}>📋 Due Diligence Steps:</div>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: levelColors[result.level], fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: '#334155′ }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', padding: 40, color: '#94A3B8', background: '#F8FAFC', borderRadius: 12, border: '2px dashed #E2E8F0′ }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
            <p>Select both the documentation type and repair scope to get your risk assessment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
