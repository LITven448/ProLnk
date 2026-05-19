import { useState } from 'react';

export default function DFWNetProceedsCalculator() {
  const [salePrice, setSalePrice] = useState('');
  const [mortgageBalance, setMortgageBalance] = useState('');
  const [commission, setCommission] = useState('6');
  const [closingDate, setClosingDate] = useState('mid');
  const [hoaTransfer, setHoaTransfer] = useState('');
  const [movingCosts, setMovingCosts] = useState('');
  const [results, setResults] = useState<null | {
    grossProceeds: number;
    agentCommission: number;
    titlePolicy: number;
    proratedTaxes: number;
    hoaFee: number;
    moving: number;
    mortgagePayoff: number;
    netProceeds: number;
    towardNext: number;
  }>(null);

  const taxMults: Record<string, number> = { early: 0.083, mid: 0.5, late: 0.917 };

  function calculate() {
    const sp = parseFloat(salePrice.replace(/,/g, '')) || 0;
    const mb = parseFloat(mortgageBalance.replace(/,/g, '')) || 0;
    const commPct = parseFloat(commission) / 100;
    const agentCommission = sp * commPct;
    const titlePolicy = sp <= 100000 ? 868 : 868 + (sp - 100000) * 0.00619;
    const annualTax = sp * 0.019;
    const proratedTaxes = annualTax * taxMults[closingDate];
    const hoaFee = parseFloat(hoaTransfer) || 350;
    const moving = parseFloat(movingCosts.replace(/,/g, '')) || 3500;
    const grossProceeds = sp;
    const netProceeds = grossProceeds - agentCommission - titlePolicy - proratedTaxes - hoaFee - moving - mb;
    const towardNext = netProceeds * 0.2;
    setResults({ grossProceeds, agentCommission, titlePolicy, proratedTaxes, hoaFee, moving, mortgagePayoff: mb, netProceeds, towardNext });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW Net Proceeds Calculator</h1>
          <p style={{ color: '#4B5563', fontSize: 15 }}>Know exactly what you walk away with after selling in Texas</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          {[
            { label: 'Sale Price ($)', value: salePrice, set: setSalePrice, placeholder: '525,000′ },
            { label: 'Mortgage Payoff Balance ($)', value: mortgageBalance, set: setMortgageBalance, placeholder: '310,000′ },
            { label: 'HOA Transfer / Resale Fee ($)', value: hoaTransfer, set: setHoaTransfer, placeholder: '350′ },
            { label: 'Moving Costs ($)', value: movingCosts, set: setMovingCosts, placeholder: '3,500′ },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
              <input value={value} onChange={e => set(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Agent Commission: {commission}%</label>
            <input type="range" min="3″ max="8" step="0.25" value={commission} onChange={e => setCommission(e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7280′ }}><span>3%</span><span>8%</span></div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Approximate Close Date</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { key: 'early', label: '📅 Early Year (Jan–Apr)' },
                { key: 'mid', label: '☀️ Mid Year (May–Aug)' },
                { key: 'late', label: '🍂 Late Year (Sep–Dec)' },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setClosingDate(key)}
                  style={{ flex: 1, padding: '8px 6px', borderRadius: 8, border: `2px solid ${closingDate === key ? '#F5E642' : '#E5E7EB'}`, background: closingDate === key ? '#FEFCE8′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 11 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#FEF9C3', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#92400E', marginBottom: 16 }}>
            🤠 Texas note: Sellers pay the title policy (owner's policy) — unique to TX. Also no state income tax on proceeds.
          </div>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Calculate Net Proceeds 🔍
          </button>
        </div>

        {results && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📊 Your Sale Proceeds Breakdown</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '2px solid #E5E7EB', marginBottom: 4 }}>
              <span style={{ fontWeight: 700 }}>💰 Gross Sale Price</span>
              <span style={{ fontWeight: 700, fontSize: 18 }}>{fmt(results.grossProceeds)}</span>
            </div>
            {[
              { label: '🏡 Agent Commission', value: -results.agentCommission },
              { label: '📜 TX Title Policy (seller pays)', value: -results.titlePolicy },
              { label: '🏛️ Prorated Property Taxes', value: -results.proratedTaxes },
              { label: '🏘️ HOA Transfer Fee', value: -results.hoaFee },
              { label: '🚚 Moving Costs', value: -results.moving },
              { label: '🏦 Mortgage Payoff', value: -results.mortgagePayoff },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6', color: '#DC2626′ }}>
                <span style={{ fontSize: 14 }}>{label}</span>
                <span style={{ fontWeight: 600 }}>({fmt(Math.abs(value))})</span>
              </div>
            ))}
            <div style={{ background: results.netProceeds > 0 ? '#F5E642′ : '#FEF2F2', borderRadius: 8, padding: '14px 12px', marginTop: 12, display: ’flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>🎯 Net Proceeds</span>
              <span style={{ fontWeight: 800, fontSize: 22 }}>{fmt(results.netProceeds)}</span>
            </div>
            {results.netProceeds > 0 && (
              <div style={{ background: '#F0FDF4', borderRadius: 8, padding: '12px', marginTop: 10, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#065F46', fontWeight: 600 }}>🏠 As 20% down on your next DFW home, this buys you a</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#065F46′ }}>{fmt(results.netProceeds / 0.2)} home</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
