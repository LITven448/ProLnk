import { useState } from 'react';

export default function DFWHVACFinancingGuide2026() {
  const [cost, setCost] = useState<string>('');
  const [creditScore, setCreditScore] = useState<string | null>(null);

  const getRecommendation = () => {
    if (!cost || !creditScore) return null;
    const c = parseFloat(cost);
    if (isNaN(c) || c <= 0) return null;
    if (creditScore === 'excellent') return { option: 'Manufacturer 0% Financing', emoji: '⭐', detail: 'With 720+ credit, you likely qualify for Trane or Carrier 18-24 month 0% APR financing. Pay $0 interest if paid in full.', monthly: `~$${Math.round(c / 18)}/mo for 18 months` };
    if (creditScore === 'good') return { option: 'Personal Loan or HELOC', emoji: '🏦', detail: 'At 650-719 credit, a personal loan at 8-12% APR or HELOC if you have home equity are your best bets. Stack with Oncor rebates.', monthly: `~$${Math.round(c / 24)}/mo for 24 months` };
    return { option: 'Utility Rebate + Payment Plan', emoji: '💡', detail: 'Ask your contractor about in-house payment plans. Oncor rebates ($100-300) and federal ITC (30% for heat pumps) can reduce out-of-pocket significantly.', monthly: `Oncor rebate up to $300 + ITC 30%` };
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💳 DFW HVAC Financing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Every financing option available in DFW — including rebates most homeowners miss.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { emoji: '🏭', label: 'Manufacturer Financing', detail: 'Trane/Carrier 18-24mo 0% APR (720+ credit)', tag: 'Best if credit is strong' },
            { emoji: '🏦', label: 'Personal Loan', detail: '8-15% APR, fast approval, no home equity needed', tag: 'Good for most borrowers' },
            { emoji: '🏠', label: 'HELOC', detail: 'Lowest rate if you have equity. Prime-based, tax deductible', tag: 'Best rate overall' },
            { emoji: '⚡', label: 'Oncor Rebates', detail: 'Up to $300 for qualifying high-efficiency units in DFW', tag: 'Stack with any option' },
          ].map(item => (
            <div key={item.label} style={{ background: '#111f3a', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>{item.detail}</div>
              <div style={{ background: '#1e3a5f', borderRadius: 4, padding: '3px 8px', fontSize: 11, display: 'inline-block', color: '#F5E642′ }}>{item.tag}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🌿 Federal ITC for Heat Pumps</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>The Inflation Reduction Act offers a <strong style={{ color: '#fff' }}>30% federal tax credit</strong> (up to $2,000) for qualifying heat pump installations. In DFW, heat pumps are increasingly popular as a combined heating/cooling solution.</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🧮 Find Your Best Option</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Replacement cost ($):</div>
            <input type="number" placeholder="e.g. 6500″ value={cost} onChange={e => setCost(e.target.value)} style={{ background: '#1e3a5f', border: 'none', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Credit score range:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ v: 'excellent', l: '720+' }, { v: 'good', l: '650–719′ }, { v: ’fair', l: 'Below 650′ }].map(c => (
                <button key={c.v} onClick={() => setCreditScore(c.v)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, background: creditScore === c.v ? '#F5E642′ : '#1e3a5f', color: creditScore === c.v ? '#0A1628' : '#fff' }}>{c.l}</button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ marginTop: 16, background: '#0d2240', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{rec.emoji} {rec.option}</div>
              <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6 }}>{rec.detail}</p>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{rec.monthly}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Contractors on ProLnk offer financing</div>
          <div style={{ color: '#1a2f4e', fontSize: 13 }}>Ask about manufacturer financing when you get your free quotes through ProLnk.</div>
        </div>
      </div>
    </div>
  );
}
