import { useState } from 'react';

const situations = ['Customer not paying after completion', 'Partial payment dispute', 'Need to file a lien', 'Net-30 commercial client', 'Homeowner claims work was unsatisfactory', 'Deposit collected, job not started'];

const lienData: Record<string, { approach: string; law: string; escalation: string[] }> = {
  'Customer not paying after completion': { approach: 'Send a formal demand letter via certified mail immediately. Reference the signed contract and completion date. Give 10 days to pay before filing.', law: 'Texas Property Code Chapter 53 — Mechanic\’s lien rights attach upon first furnishing of labor/materials. File within 15th of 3rd month after last work.', escalation: ['Day 1: Certified demand letter', 'Day 10: File mechanic\’s lien ($200-400)', 'Day 30: Refer to collections attorney', 'Day 60: Small claims (under $20K) or district court'] },
  'Partial payment dispute': { approach: 'Document exactly what was completed vs. what is disputed. Send itemized completion report showing work done matches contract scope.', law: 'Texas Business & Commerce Code — Accord and satisfaction rules apply. Do not cash a "paid in full" check without reserving rights.', escalation: ['Send photo documentation of completed work', 'Request written explanation of dispute', 'Offer mediation before legal action', 'File for partial lien on disputed amount'] },
  'Need to file a lien': { approach: 'Texas has strict deadlines. For residential: send pre-lien notice by the 15th of the 2nd month after unpaid work. File lien by 15th of 3rd month.', law: 'Texas Property Code §53.052 — Lien must be filed in county where property is located with County Clerk. Subcontractors have tighter deadlines than GCs.', escalation: ['Send statutory pre-lien notice first', 'File Affidavit of Lien with County Clerk', 'Send copy to owner and GC by certified mail', 'Foreclose lien within 2 years or it expires'] },
  'Net-30 commercial client': { approach: 'Commercial clients in DFW often push Net-30 or Net-60. Counter with Net-15 for amounts under $10K. Require ACH authorization upfront.', law: 'Texas Finance Code — Late payment interest can be contractually set. Texas Prompt Payment Act applies to government contracts only.', escalation: ['Add 1.5%/month late fee in contract', 'Send invoice on day 1, reminder day 25', 'Stop work on active jobs if invoice unpaid', 'File lien on commercial property just like residential'] },
  'Homeowner claims work was unsatisfactory': { approach: 'Get the complaint in writing immediately. Inspect with homeowner present. Document existing conditions with photos before any corrective work.', law: 'Texas Residential Construction Liability Act (RCLA) — Homeowner must give 60-day written notice before filing suit. You have right to inspect and offer repair.', escalation: ['Respond in writing within 5 business days', 'Inspect within 15 days of complaint', 'Provide repair offer within 45 days', 'RCLA limits damages if you respond properly'] },
  'Deposit collected, job not started': { approach: 'Never commingle deposits with operating funds. Keep in separate account. Texas law requires refund within 10 days if you cannot perform.', law: 'Texas Business & Commerce Code §17.46 — Collecting deposit with no intent to perform is a deceptive trade practice. Can trigger triple damages.', escalation: ['Communicate delay reason immediately', 'Offer refund or rescheduled start date', 'Document all communication', 'Refund within 10 days if you cannot perform'] },
};

export default function DFWContractorInvoicingGuide() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<{ approach: string; law: string; escalation: string[] } | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', letterSpacing: '0.1em' }}>PROLNK PRO GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>💵 DFW Contractor Invoicing & Payment Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', lineHeight: 1.7 }}>Cash flow kills more DFW contractor businesses than lack of work. Know your rights under Texas law and build a payment system that keeps money moving.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '📍', title: 'Milestone Billing', desc: 'Bill at project stages: deposit → rough-in → completion. Never wait until the end for full payment.' }, { icon: '⏱️', title: 'DFW Timing Norms', desc: 'Expect payment in 5-10 days from residential. Net-30 is acceptable only for established commercial accounts.' }, { icon: '🔒', title: 'Lien Rights', desc: 'Texas gives contractors powerful lien rights. Use them. A filed lien gets you paid faster than any collection call.' }].map((item) => (
            <div key={item.title} style={{ background: '#111f3a', borderRadius: '8px', padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: '12px', padding: '1.75rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>⚖️ Payment Situation Advisor</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Describe Your Situation</label>
            <select value={situation} onChange={(e) => { setSituation(e.target.value); setResult(lienData[e.target.value] ?? null); }} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '6px', padding: '0.6rem', fontSize: '0.95rem' }}>
              <option value=''>Select a situation...</option>
              {situations.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: '1.25rem' }}>
              <div style={{ marginBottom: '1rem' }}><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>RECOMMENDED APPROACH</div><div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{result.approach}</div></div>
              <div style={{ marginBottom: '1rem', background: '#0d1f3c', borderRadius: '6px', padding: '1rem', border: '1px solid #1e3a5f' }}><div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.3rem' }}>📜 TEXAS LAW THAT APPLIES</div><div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{result.law}</div></div>
              <div><div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>ESCALATION STEPS</div>{result.escalation.map((step, i) => <div key={step} style={{ display: 'flex', gap: '0.75rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}><span style={{ color: '#F5E642', fontWeight: 700, minWidth: '24px' }}>{i + 1}.</span><span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{step}</span></div>)}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '8px', padding: '1.25rem', border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>💡 ProLnk Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>ProLnk leads include homeowner creditworthiness signals. Pros who use milestone invoicing on ProLnk jobs report 94% on-time payment. Set your payment terms in your ProLnk profile so homeowners see them before requesting a quote.</div>
        </div>
      </div>
    </div>
  );
}
