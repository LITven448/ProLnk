import { useState } from 'react';

const warrantyTypes = ['Lifetime Transferable', '25-Year Transferable', '10-Year Transferable', '5-Year Limited', '1-Year Builder', 'No Warranty'];
const scopeOptions = ['Full Foundation (piers + drainage + grading)', 'Piers Only', 'Drainage + Grading Only', 'Crack Repair Only', 'Unknown / Not Documented'];

type Assessment = { grade: string; color: string; flag: string; requests: string[]; notes: string };

const assess = (type: string, years: number, scope: string): Assessment => {
  if (type === 'Lifetime Transferable' && !scope.includes('Unknown')) return { grade: 'Gold Standard ✅', color: '#22c55e', flag: '🟢', requests: ['Get signed warranty transfer letter at closing', 'Confirm scope in writing with repair company', 'Request engineer-stamped repair documentation'], notes: 'Lifetime transferable warranties are the gold standard in DFW. Foundation repair companies like Olshan, HD Foundations, and Foundation Recovery Systems offer these.' };
  if (type === '25-Year Transferable') return { grade: 'Excellent ✅', color: '#86efac', flag: '🟢', requests: ['Request warranty assignment document', 'Verify original repair company is still in business', 'Get copy of original repair invoice and permit'], notes: '25-year transferable is excellent coverage. Verify the repair company is still operating — closed companies void transferability.' };
  if (type === '10-Year Transferable') return { grade: 'Acceptable ⚠️', color: '#fbbf24', flag: '🟡', requests: ['Check years remaining vs. transfer cost', 'Confirm coverage scope in original contract', 'Have independent PE review repair methodology'], notes: '10-year is acceptable. Factor remaining years into your negotiation — less than 5 years remaining significantly reduces value.' };
  if (type === '5-Year Limited') return { grade: 'Marginal ⚠️', color: '#f97316', flag: '🟡', requests: ['Negotiate price reduction based on warranty gap', 'Budget $3,000–$8,000 for potential re-repair', 'Get independent structural engineer inspection'], notes: '5-year limited is marginal. DFW expansive clay soil means foundation issues can recur. Negotiate accordingly.' };
  if (type === '1-Year Builder') return { grade: 'Red Flag ❌', color: '#ef4444', flag: '🔴', requests: ['Demand full independent structural engineering report', 'Negotiate $10,000+ price reduction or escrow holdback', 'Consider walking away if scope is unknown', 'Get second foundation company assessment'], notes: '1-year warranty is a red flag in DFW. This is builder minimum — foundation repair companies should offer at least 10 years.' };
  return { grade: 'Critical Red Flag ❌', color: '#dc2626', flag: '🔴', requests: ['Do not proceed without independent PE inspection', 'Demand full price reduction equal to estimated repair cost', 'Request disclosure of all known foundation issues', 'Consider this a potential deal-killer'], notes: 'No warranty on foundation work in DFW is a serious red flag. Any completed foundation work without documentation is unknown quality.' };
};

export default function DFWStructuralWarrantyGuide() {
  const [type, setType] = useState('Lifetime Transferable');
  const [years, setYears] = useState(8);
  const [scope, setScope] = useState('Full Foundation (piers + drainage + grading)');

  const result = assess(type, years, scope);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>🏠 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Structural & Foundation Warranty Guide for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
          DFW's expansive clay soil causes more foundation movement than almost anywhere in the U.S. When buying a home with prior foundation work, the warranty quality is as important as the repair itself.
        </p>

        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1.5px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14, color: '#fca5a5′ }}>
          ⚠️ <strong>DFW Reality:</strong> Over 60% of DFW homes are built on expansive clay. Foundation repair is common — the warranty quality is what separates a smart buy from a money pit.
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Warranty Assessment Tool</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Warranty Type</label>
              <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {warrantyTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Years Remaining on Warranty: {years}</label>
              <input type="range" min={0} max={30} value={years} onChange={e => setYears(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Scope of Original Repair</label>
              <select value={scope} onChange={e => setScope(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {scopeOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 24, borderLeft: `4px solid ${result.color}` }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{result.flag} {result.grade}</div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{result.notes}</p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>WHAT TO REQUEST FROM SELLER:</div>
            {result.requests.map((r, i) => (
              <div key={i} style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8, display: 'flex', gap: 8 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>{r}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 22 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>📋 Warranty Tier Quick Reference</h2>
          {[
            { tier: 'Lifetime Transferable', rating: '🟢 Gold Standard', detail: 'Best DFW companies: Olshan, HD Foundations, Foundation Recovery' },
            { tier: '10–25 Year Transferable', rating: '🟢 Excellent', detail: 'Verify company still in business; get transfer docs at closing' },
            { tier: '5–10 Year Limited', rating: '🟡 Acceptable', detail: 'Negotiate price; budget for re-repair if near expiration' },
            { tier: '1–5 Year Builder', rating: '🔴 Red Flag', detail: 'Demand independent PE inspection + price concession' },
            { tier: 'No Warranty', rating: '🔴 Deal Risk', detail: 'Treat as unknown quality — full engineering review required' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 10, padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.07)' : 'none', fontSize: 13 }}>
              <div style={{ fontWeight: 600 }}>{row.tier}</div>
              <div>{row.rating}</div>
              <div style={{ color: '#64748b' }}>{row.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
