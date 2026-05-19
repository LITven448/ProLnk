import { useState } from 'react';

const NOTE_TYPES = [
  { icon: '✅', label: 'Performing Notes', detail: 'Borrower is current on payments. Lower yield (6–10%) but predictable income stream. Like buying a landlord\’s mailbox — the tenant is already paying.' },
  { icon: '⚠️', label: 'Non-Performing Notes (NPNs)', detail: 'Borrower is delinquent. Purchased at steep discounts (40–70 cents on the dollar). Higher yield potential through loan modification, deed-in-lieu, or foreclosure.' },
  { icon: '🏘️', label: 'DFW Market Context', detail: 'DFW mortgage notes are available through note brokers, bank portfolio sales, and private sellers. Courthouse auctions and FDIC asset sales also surface distressed notes tied to DFW properties.' },
];

const SERVICER_NOTE = 'Texas law requires licensed servicers to collect on mortgage notes. FCI Lender Services, Madison Management, and BSI Financial are active DFW-note servicers. Budget $50–100/mo per note for servicing. Never self-service a note — RESPA and state servicing laws apply.';

export default function DFWNoteInvestingGuide() {
  const [noteBalance, setNoteBalance] = useState('');
  const [discount, setDiscount] = useState('25');
  const [interestRate, setInterestRate] = useState('7');
  const [result, setResult] = useState<{ purchasePrice: string; cashReturn: string; yieldOnCost: string; dfw: string; risk: string } | null>(null);

  function calculate() {
    const balance = parseFloat(noteBalance.replace(/,/g, '')) || 0;
    const discPct = parseFloat(discount) / 100;
    const rate = parseFloat(interestRate) / 100;
    if (!balance) return;
    const purchasePrice = balance * (1 - discPct);
    const annualInterest = balance * rate;
    const yieldOnCost = (annualInterest / purchasePrice) * 100;
    const dfwDirectCapRate = 5.5;
    const dfwDirectCash = balance * (dfwDirectCapRate / 100);
    const risk = discPct >= 0.40 ? 'High — likely non-performing; plan for workout scenario' : discPct >= 0.20 ? 'Moderate — verify payment history before closing' : 'Low — performing note at modest discount';
    setResult({
      purchasePrice: `$${purchasePrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      cashReturn: `$${annualInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}/yr`,
      yieldOnCost: `${yieldOnCost.toFixed(2)}%`,
      dfw: `DFW direct ownership comparison (5.5% cap rate): $${dfwDirectCash.toLocaleString('en-US', { maximumFractionDigits: 0 })}/yr on equivalent asset`,
      risk,
    });
  }

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📜</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0A1628′ }}>DFW Mortgage Note Investing Guide</h1>
          <p style={{ color: '#555', fontSize: '1.05rem' }}>Buy existing DFW mortgages at a discount and earn returns without owning property</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0A1628′ }}>💡 What Is Note Investing?</h2>
          <p style={{ lineHeight: 1.7, color: '#444′ }}>When a homeowner takes out a mortgage, that debt becomes an asset that can be sold. As a note investor, you buy that mortgage from the lender at a discount. The homeowner now pays you. You earn the interest rate on the full loan balance but paid a fraction of it — amplifying your yield on invested capital dramatically compared to direct real estate ownership.</p>
        </div>
        {NOTE_TYPES.map((t) => (
          <div key={t.label} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: '0.25rem' }}>{t.label}</div>
                <div style={{ color: '#555', lineHeight: 1.65, fontSize: '0.95rem' }}>{t.detail}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0A1628′ }}>🏦 Servicer Requirements</h2>
          <p style={{ lineHeight: 1.7, color: '#444′ }}>{SERVICER_NOTE}</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: '#0A1628′ }}>📊 Note Return Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.88rem' }}>Note Balance ($)</label>
              <input value={noteBalance} onChange={(e) => setNoteBalance(e.target.value)} placeholder="e.g. 200000″ style={{ width: '100%', padding: '0.55rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.88rem' }}>Purchase Discount (%)</label>
              <select value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}>
                {['10','15','20','25','30','40','50','60'].map((d) => <option key={d} value={d}>{d}% discount</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: '0.88rem' }}>Note Interest Rate (%)</label>
              <select value={interestRate} onChange={(e) => setInterestRate(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: 8, border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}>
                {['4','5','6','7','8','9','10','12'].map((r) => <option key={r} value={r}>{r}%</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Calculate Returns
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f8ff', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: '0.35rem' }}>Purchase Price: {result.purchasePrice}</div>
              <div style={{ color: '#333', marginBottom: '0.25rem' }}>Annual Interest Income: {result.cashReturn}</div>
              <div style={{ color: '#333', marginBottom: '0.25rem' }}>Yield on Cost: <strong>{result.yieldOnCost}</strong></div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{result.dfw}</div>
              <div style={{ color: result.risk.startsWith('Low') ? '#16a34a' : result.risk.startsWith('Moderate') ? '#d97706′ : '#dc2626', fontWeight: 600, fontSize: '0.9rem' }}>
                Risk: {result.risk}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
