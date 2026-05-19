import { useState } from 'react';

const LEAD_SOURCES = [
  { icon: '📬', label: 'Direct Mail', detail: 'Absentee owner lists, pre-foreclosure, tax delinquents. Target zip codes 75217, 76119, 75040 for high motivated-seller density in DFW.' },
  { icon: '🚗', label: 'Driving for Dollars', detail: 'Identify distressed properties in older DFW neighborhoods. Apps like DealMachine streamline the process of tracking and mailing leads from your car.' },
  { icon: '⚖️', label: 'Probate Leads', detail: 'Dallas and Tarrant County probate courts publish estate filings weekly. Heirs often want to liquidate inherited property quickly — below market.' },
];

const LEGAL_NOTE = 'Texas wholesaling law requires you to disclose you are not a licensed agent IF you market the equitable interest to buyers. Texas Senate Bill 2212 (effective 2021) set clear assignment-of-contract rules. Always use a real estate attorney to draft compliant purchase agreements and assignment contracts.';

export default function DFWWholesalingGuide() {
  const [estArv, setEstArv] = useState('');
  const [repairCost, setRepairCost] = useState('');
  const [fee, setFee] = useState('');
  const [result, setResult] = useState<{ assignPrice: string; buyerProfit: string; viable: string } | null>(null);

  function calculate() {
    const arv = parseFloat(estArv.replace(/,/g, '')) || 0;
    const repairs = parseFloat(repairCost.replace(/,/g, '')) || 0;
    const targetFee = parseFloat(fee.replace(/,/g, '')) || 10000;
    if (!arv || !repairs) return;
    const buyerMao = arv * 0.70 - repairs;
    const assignPrice = buyerMao - targetFee;
    const buyerProfit = arv - repairs - buyerMao - arv * 0.08;
    const viable = assignPrice > 0 && buyerProfit > 15000 ? 'Strong — deal works for both sides' : assignPrice > 0 ? 'Marginal — buyer profit is thin; negotiate lower' : 'Not viable — ask price too high for 70% MAO formula';
    setResult({
      assignPrice: `$${Math.max(0, assignPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      buyerProfit: `$${Math.max(0, buyerProfit).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      viable,
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8eaf6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📃</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Wholesaling Guide</h1>
          <p style={{ color: '#a0aec0', fontSize: '1.05rem' }}>Find off-market DFW properties, assign contracts, and profit without closing</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>🔍 Finding Off-Market DFW Properties</h2>
          {LEAD_SOURCES.map((s) => (
            <div key={s.label} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>{s.label}</div>
                <div style={{ color: '#a0aec0', fontSize: '0.92rem', lineHeight: 1.6 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>📋 Assignment of Contract 101</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>You put a property under contract with an assignable purchase agreement. You then assign that contract to a cash buyer for your wholesale fee. You never close on the property — you sell your equitable interest. The fee is typically $5K–$30K depending on deal size and market demand in that DFW submarket.</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>👥 Finding DFW Cash Buyers</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>Attend DFW REIA meetups (Dallas REIA, Fort Worth REIA). Network at courthouse auctions on the first Tuesday of each month. Use Facebook groups like "DFW Real Estate Investors" and LinkedIn. Build a buyers list of 20+ verified cash buyers before marketing your first deal — this is your most valuable wholesaling asset.</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>⚖️ Texas Legal Considerations</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>{LEGAL_NOTE}</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>📊 Deal Viability Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            {[
              { label: 'Estimated ARV ($)', val: estArv, set: setEstArv, ph: '300000′ },
              { label: 'Repair Cost ($)', val: repairCost, set: setRepairCost, ph: '45000′ },
              { label: 'Your Wholesale Fee ($)', val: fee, set: setFee, ph: '10000′ },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', color: '#a0aec0′ }}>{f.label}</label>
                <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', padding: '0.55rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Analyze Deal
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>Max Assignment Price: {result.assignPrice}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Buyer Projected Profit: {result.buyerProfit}</div>
              <div style={{ color: result.viable.startsWith('Strong') ? '#4ade80′ : result.viable.startsWith(’Marginal') ? '#facc15′ : '#f87171', fontWeight: 600, fontSize: '0.9rem' }}>
                Viability: {result.viable}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
