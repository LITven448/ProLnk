import { useState } from 'react';

const disputes = [
  { id: 'fines', label: 'Fines & Violations', icon: '💰', steps: ['Request written notice with specific rule citation (Ch. 209.006 TX Prop Code)', 'Submit written response within 30 days of notice', 'Attend your scheduled hearing before the HOA board', 'Appeal in writing within 10 days if ruling is unfavorable', 'File for mediation with Texas Dept of Housing if unresolved'] },
  { id: 'maintenance', label: 'Maintenance Disputes', icon: '🔧', steps: ['Document all defects with timestamped photos and written log', 'Send certified letter to HOA board demanding inspection', 'Request copy of reserve fund study (legally required in TX)', 'File with TX Real Estate Commission if HOA is unresponsive', 'Small claims court for damages under $20K — no attorney needed'] },
  { id: 'rules', label: 'Rule Changes', icon: '📋', steps: ['Texas law requires 30-day notice before rule changes take effect', 'Attend the meeting and speak during public comment period', 'Gather signatures — 20% of homeowners can force a special meeting', 'Petition for a membership vote to reverse the rule change', 'Consult TX HOA attorney if change violates governing documents'] },
  { id: 'board', label: 'Board Misconduct', icon: '⚖️', steps: ['Request all HOA financial records (right guaranteed under Ch. 209)', 'File complaint with TX Office of Attorney General if fraud suspected', 'Initiate board recall: 10% of voters sign petition for recall election', 'Hire a licensed TX HOA attorney for fiduciary breach claims', 'File lawsuit in district court for breach of fiduciary duty'] },
  { id: 'mediation', label: 'Mediation Process', icon: '🕊️', steps: ['Texas requires mediation before most HOA lawsuits can proceed', 'Use TDHR (TX Dept of Housing) free mediation service', 'Choose a neutral mediator from the TX Mediator Credentialing Assoc.', 'Document all agreements in writing and have both parties sign', 'Mediation agreements are binding contracts under Texas law'] },
];

export default function DFWHOADisputeGuide2026() {
  const [selected, setSelected] = useState('fines');
  const active = disputes.find(d => d.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚖️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW HOA Dispute Resolution Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Your legal rights under Texas Chapter 209 — step-by-step pathways to resolve HOA disputes without losing your mind (or your money).
          </p>
        </div>

        <div style={{ background: '#1a1200', border: '1px solid #854d0e', borderRadius: 12, padding: 20, marginBottom: 36, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>📜</span>
          <div>
            <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>Texas Chapter 209 — Your Core Rights</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Written notice required before fines. Right to a hearing. Right to inspect all financial records. Mediation required before lawsuits. Board must hold elections if petitioned by 10%+ of homeowners.</div>
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select Your Dispute Type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {disputes.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              style={{ background: selected === d.id ? '#F5E642' : '#111e35', color: selected === d.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {d.icon} {d.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>{active.icon} Resolution Pathway: {active.label}</h3>
          {active.steps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
              <span style={{ background: idx === active.steps.length - 1 ? '#dc2626' : '#F5E642', color: '#0A1628', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15, paddingTop: 2 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>🔧</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>Many HOA disputes stem from poor maintenance. ProLnk connects you with verified DFW pros who meet HOA aesthetic standards — preventing violations before they start.</p>
        </div>
      </div>
    </div>
  );
}
