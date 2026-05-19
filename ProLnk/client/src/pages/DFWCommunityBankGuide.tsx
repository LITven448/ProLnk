import { useState } from 'react';

const institutions = [
  { type: 'Community Bank', name: 'Frost Bank', notes: 'Texas-based, strong portfolio lending, great for self-employed', bestFor: 'Complex income, non-conforming loans', rate: '⭐⭐⭐⭐' },
  { type: 'Community Bank', name: 'Veritex Community Bank', notes: 'DFW-focused, fast decisions, portfolio loans available', bestFor: 'Investors, unique properties', rate: '⭐⭐⭐⭐' },
  { type: 'Community Bank', name: 'Inwood National Bank', notes: 'North Dallas, relationship-based approvals', bestFor: 'Established business owners', rate: '⭐⭐⭐' },
  { type: 'Credit Union', name: 'Navy Federal CU', notes: 'Often lowest rates, military/veteran friendly, member-owned', bestFor: 'Veterans, best rate seekers', rate: '⭐⭐⭐⭐⭐' },
  { type: 'Credit Union', name: 'Texans Credit Union', notes: 'DFW-based, competitive HELOCs and mortgages', bestFor: 'DFW homeowners, HELOC seekers', rate: '⭐⭐⭐⭐' },
  { type: 'Big Bank', name: 'Wells Fargo / Chase', notes: 'Lowest rates on conforming loans, strict qualifying, no flexibility', bestFor: 'W-2 borrowers, strong credit, standard properties', rate: '⭐⭐⭐' },
];

const factors = [
  { factor: 'Self-employed / complex income', winner: 'Community Bank or Credit Union', why: 'Portfolio lenders underwrite manually — they read your full story' },
  { factor: 'Best advertised rate (W-2 borrower)', winner: 'Big Bank or Credit Union', why: 'High volume drives lower margins on conforming loans' },
  { factor: 'Non-warrantable condo / unique property', winner: 'Community Bank', why: 'Portfolio loans can ignore Fannie/Freddie guidelines' },
  { factor: 'First-time buyer, need hand-holding', winner: 'Community Bank or CU', why: 'Loan officer relationships, not call centers' },
  { factor: 'Investment property (5+ units)', winner: 'Community Bank', why: 'Commercial real estate relationships, local market knowledge' },
  { factor: 'Fast closing needed', winner: 'Big Bank (if preapproved) or Community Bank', why: 'Big banks have automation; community banks have decision authority' },
];

function recommend(complexity: string, loanType: string, creditScore: number) {
  if (complexity === 'high') return { rec: 'Community Bank or Credit Union', reason: 'Your profile needs manual underwriting — avoid big bank algorithms.' };
  if (loanType === 'investment') return { rec: 'Community Bank (Frost, Veritex)', reason: 'Investment properties need local portfolio lenders who know DFW market.' };
  if (creditScore >= 740 && complexity === 'low') return { rec: 'Big Bank or Credit Union', reason: 'You\’ll qualify for best conforming rates. Shop Navy Federal and Chase.' };
  return { rec: 'Credit Union (Texans or Navy Federal)', reason: 'Member-owned = aligned incentives. Strong middle ground for your profile.' };
}

export default function DFWCommunityBankGuide() {
  const [complexity, setComplexity] = useState('medium');
  const [loanType, setLoanType] = useState('primary');
  const [score, setScore] = useState(720);
  const res = recommend(complexity, loanType, score);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>🏦 Community Bank vs Big Bank</div>
          <div style={{ color: '#CBD5E1', marginTop: 6 }}>DFW Home Loan — Which Lender Type Wins for You</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Community Banks', icon: '🏘️', pros: ['Manual underwriting', 'Portfolio loans', 'Local decisions', 'Relationship-based'], cons: ['Fewer branches', 'Less technology', 'Smaller loan limits'] },
            { label: 'Credit Unions', icon: '🤝', pros: ['Member-owned (aligned incentives)', 'Often lowest rates', 'Strong HELOC products', 'Less fee-driven'], cons: ['Membership required', 'Slower tech', 'Limited branches'] },
            { label: 'Big Banks', icon: '🏢', pros: ['Lowest rates (conforming)', 'Full digital experience', 'Branch everywhere'], cons: ['Algorithm-driven', 'No flexibility', 'Hard on self-employed', 'Call center support'] },
          ].map(b => (
            <div key={b.label} style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', border: '1px solid #E2E8F0′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{b.icon} {b.label}</div>
              {b.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#16A34A', marginBottom: 2 }}>✓ {p}</div>)}
              <div style={{ marginTop: 6 }}>{b.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#DC2626', marginBottom: 2 }}>✗ {c}</div>)}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🎯 Which Lender Type Wins by Situation</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {factors.map(f => (
              <div key={f.factor} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 3fr', gap: '0.75rem', alignItems: 'center', background: '#F8FAFC', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{f.factor}</div>
                <div style={{ fontSize: 13, color: '#2563EB', fontWeight: 600 }}>→ {f.winner}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{f.why}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🔢 Find Your Best Lender Type</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Income Complexity</div>
              <select value={complexity} onChange={e => setComplexity(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}>
                <option value="low">Simple (W-2, salaried)</option>
                <option value="medium">Medium (some self-employed)</option>
                <option value="high">Complex (1099, multiple sources)</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Loan Purpose</div>
              <select value={loanType} onChange={e => setLoanType(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13 }}>
                <option value="primary">Primary Residence</option>
                <option value="investment">Investment Property</option>
                <option value="heloc">HELOC / Refi</option>
                <option value="construction">Construction</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Credit Score: <span style={{ color: '#6366F1′ }}>{score}</span></div>
              <input type="range" min={580} max={850} step={10} value={score} onChange={e => setScore(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#fff' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#F5E642', marginBottom: 6 }}>✅ Recommendation: {res.rec}</div>
            <div style={{ fontSize: 14, color: '#CBD5E1′ }}>{res.reason}</div>
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>📍 DFW-Specific Institutions to Consider</div>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {institutions.map(i => (
            <div key={i.name} style={{ background: '#fff', borderRadius: 8, padding: '1rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{i.name} <span style={{ fontSize: 11, color: '#64748B', background: '#F1F5F9', borderRadius: 4, padding: '2px 6px', marginLeft: 4 }}>{i.type}</span></div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>{i.notes}</div>
                <div style={{ fontSize: 12, color: '#2563EB', marginTop: 2 }}>Best for: {i.bestFor}</div>
              </div>
              <div style={{ fontSize: 18 }}>{i.rate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
