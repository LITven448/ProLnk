import { useState } from 'react';

const txTypes = [
  { label: 'Buying a home', value: 'buy' },
  { label: 'Selling a home', value: 'sell' },
  { label: 'Investment property purchase', value: 'invest' },
];

const prices = [250000, 400000, 600000, 900000, 1200000];

function formatMoney(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function calcTaxes(type: string, price: number) {
  const titleInsurance = type === 'sell' ? price * 0.007 : price * 0.005;
  const propertyTaxProration = price * 0.022 * (5 / 12);
  const recordingFees = 75;
  const transferTax = 0;
  const totalEstimate = titleInsurance + propertyTaxProration + recordingFees;
  return { titleInsurance, propertyTaxProration, recordingFees, transferTax, totalEstimate };
}

export default function DFWRealEstateTaxGuide() {
  const [txType, setTxType] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const taxes = txType && price ? calcTaxes(txType, price) : null;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🤑📊🏡</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700 }}>DFW Real Estate Transaction Tax Guide</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 16 }}>
            Texas has no state income tax and no transfer tax. Here is what you DO pay at closing.
          </p>
        </div>

        <div style={{ background: '#e8f5e9', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 20, color: '#2e7d32′ }}>🌟 Texas Tax Advantages</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { label: 'State Income Tax', value: '/bin/zsh', note: 'Texas has NO state income tax on capital gains from home sales' },
              { label: 'Documentary Stamp Tax', value: '/bin/zsh', note: 'Texas does NOT impose a transfer or documentary stamp tax' },
              { label: 'Real Estate Transfer Tax', value: '/bin/zsh', note: 'No deed transfer tax — unlike CA, NY, FL which charge 0.1–2%' },
            ].map(item => (
              <div key={item.label} style={{ background: '#fff', borderRadius: 8, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#333′ }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{item.note}</div>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#2e7d32′ }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, color: '#1a3a5c' }}>What You DO Pay at Closing</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { name: 'Title Insurance (Owner Policy)', detail: '~0.5–0.7% of price — one-time, required, protects your ownership forever' },
              { name: 'Property Tax Proration', detail: 'DFW effective rate: ~2.2%/yr. Seller pays their share, buyer credits remainder' },
              { name: 'Recording Fees', detail: '– per document — deed and deed of trust recorded with county clerk' },
              { name: 'Lender Fees', detail: 'Origination, appraisal, and underwriting — separate from taxes/title' },
              { name: 'Capital Gains (Federal)', detail: 'Sellers: K exclusion (single) / K (married) if primary residence 2+ yrs' },
            ].map(item => (
              <div key={item.name} style={{ background: '#f8f9fa', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, color: '#1a3a5c', marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 14, color: '#555′ }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#1a3a5c' }}>🧮 Estimate Your Transaction Costs</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333′ }}>Transaction Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {txTypes.map(t => (
                <button key={t.value} onClick={() => setTxType(t.value)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: txType === t.value ? '2px solid #1a3a5c' : '2px solid #e0e0e0', background: txType === t.value ? '#e8f0fb' : '#fff', cursor: 'pointer', fontSize: 13, fontWeight: txType === t.value ? 700 : 400, color: '#333′ }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#333′ }}>Sale / Purchase Price</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
              {prices.map(p => (
                <button key={p} onClick={() => setPrice(p)}
                  style={{ padding: '10px 4px', borderRadius: 8, border: price === p ? '2px solid #1a3a5c' : '2px solid #e0e0e0', background: price === p ? '#e8f0fb' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: price === p ? 700 : 400, color: '#333′ }}>
                  {formatMoney(p)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {taxes && (
          <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: 28 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 20 }}>📊 Estimated Transaction Costs</h2>
            {[
              { label: 'Title Insurance (Owner Policy)', value: taxes.titleInsurance },
              { label: 'Property Tax Proration (5 months avg)', value: taxes.propertyTaxProration },
              { label: 'Recording Fees', value: taxes.recordingFees },
              { label: 'Transfer / Stamp Tax', value: taxes.transferTax },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                <span>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.value === 0 ? '#4caf50′ : '#F5E642' }}>{item.value === 0 ? '✅ /bin/zsh' : formatMoney(item.value)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', marginTop: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>Estimated Total (excl. lender fees)</span>
              <span style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>{formatMoney(taxes.totalEstimate)}</span>
            </div>
            <p style={{ margin: '12px 0 0', fontSize: 12, opacity: 0.7 }}>Estimates only. Actual costs vary by lender, title company, and contract terms. Does not include agent commissions or lender origination fees.</p>
          </div>
        )}
      </div>
    </div>
  );
}
