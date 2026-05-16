import { useState } from 'react';

const disputes = [
  {
    id: 'quality',
    icon: '🔨',
    label: 'Poor Workmanship',
    path: [
      { step: 1, action: 'Document Everything', detail: 'Photograph all defects immediately. Date-stamp photos. Note when you first observed each issue.' },
      { step: 2, action: 'Written Notice to Contractor', detail: 'Send a certified letter or email listing each defect and requesting cure within 15 days. Texas requires opportunity to cure before legal action.' },
      { step: 3, action: 'Licensed Trade? File TDLR', detail: 'If the contractor holds a state license (electrical, plumbing, HVAC, A/C), file a complaint with the Texas Department of Licensing and Regulation (TDLR). Free and effective.' },
      { step: 4, action: 'Small Claims or District Court', detail: 'Claims under $20K: Justice of the Peace court (small claims). Claims $20K-$250K: County court. Over $250K: District court. Contractors license can be suspended for unpaid judgments.' },
    ]
  },
  {
    id: 'abandon',
    icon: '🚪',
    label: 'Contractor Abandoned Job',
    path: [
      { step: 1, action: 'Document Abandonment', detail: 'Record the last day work occurred. Note all unanswered calls and texts. Photograph incomplete work.' },
      { step: 2, action: 'Certified Letter Demanding Return', detail: 'Give contractor 10 days written notice to return to work or be considered in breach. Keep certified mail receipt.' },
      { step: 3, action: 'Secure the Property', detail: 'If job is open to weather or unsafe, secure it yourself and document all costs. These become recoverable damages.' },
      { step: 4, action: 'File TDLR + Legal Action', detail: 'File TDLR complaint for licensed trades immediately. Pursue remaining deposit and completion costs in court.' },
    ]
  },
  {
    id: 'overcharge',
    icon: '💸',
    label: 'Billing Dispute / Overcharge',
    path: [
      { step: 1, action: 'Compare Invoice to Contract', detail: 'Line by line, compare every charge against the original contract and signed change orders. Only charges in writing are valid.' },
      { step: 2, action: 'Request Itemized Backup', detail: 'Demand receipts for all materials and time logs for all labor. Contractors must provide backup within 10 days in Texas.' },
      { step: 3, action: 'Written Dispute Letter', detail: 'Dispute specific line items in writing. Do not pay disputed amounts while in dispute — document your position clearly.' },
      { step: 4, action: 'Mediation or Small Claims', detail: 'Many DFW contractor disputes resolve at free mediation. Dallas County has a free mediation program for construction disputes under $50K.' },
    ]
  },
  {
    id: 'lien',
    icon: '🏠',
    label: 'Lien Filed on Property',
    path: [
      { step: 1, action: 'Verify the Lien', detail: 'Pull your property records from the Dallas or Tarrant County Clerk. Verify the lien is valid — it must meet Texas Property Code requirements or it is void.' },
      { step: 2, action: 'Bond Around the Lien', detail: 'You can remove the lien from your property by filing a lien release bond (typically 1.5x the lien amount). This frees your title while the dispute resolves.' },
      { step: 3, action: 'Hire a Construction Attorney', detail: 'Liens affecting your ability to sell or refinance require an attorney. Texas construction law is highly technical — a specialist pays for themselves.' },
      { step: 4, action: 'Dispute the Lien in Court', detail: 'File a lawsuit to discharge an invalid lien. If you win, you may recover attorney fees under Texas law.' },
    ]
  },
];

export default function DFWContractorDisputeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = disputes.find(d => d.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚖️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Contractor Dispute Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>What to do when things go wrong. Select your dispute type for the resolution pathway.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {disputes.map(d => (
            <button key={d.id} onClick={() => setSelected(selected === d.id ? null : d.id)}
              style={{ background: '#0f2340', border: '2px solid', borderColor: selected === d.id ? '#F5E642' : '#1e3a5f', borderRadius: 12, padding: 16, cursor: 'pointer', color: '#fff', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{d.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{d.label}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>{active.icon} {active.label} — Resolution Pathway</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {active.path.map(p => (
                <div key={p.step} style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 12, padding: 18, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ minWidth: 36, height: 36, borderRadius: '50%', background: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 800, fontSize: 16 }}>{p.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.action}</div>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 16, padding: 20 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#F5E642' }}>⭐ ProLnk Rating System</p>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ProLnk's verified rating system surfaces dispute history before you hire. Contractors with unresolved disputes are flagged or removed. All project documentation is in your Health Vault — ready if you ever need it.</p>
        </div>
      </div>
    </div>
  );
}
