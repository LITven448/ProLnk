import { useState } from 'react';

export default function DFWTitleInsuranceGuide2026() {
  const [price, setPrice] = useState('');
  const parsed = parseFloat(price.replace(/[^0-9.]/g, ''));
  const ownerCost = !isNaN(parsed) && parsed > 0 ? (parsed * 0.002).toFixed(0) : null;
  const lenderCost = !isNaN(parsed) && parsed > 0 ? ((parsed * 0.002) * 0.65).toFixed(0) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 2 }}>DFW Home Buying Guide · 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>📋 DFW Title Insurance Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>Title insurance is a one-time closing cost that protects your ownership rights. In DFW's fast-moving market, it’s one of the most valuable protections you can buy — and most buyers don’t fully understand it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['🏦','Lender Policy','Required by your mortgage lender — protects their loan, not you'],['🏠','Owner Policy','Optional but critical — protects YOUR equity and ownership rights'],['💰','One-Time Cost','Paid at closing, ~$2 per $1,000 of purchase price (TX regulated)'],['⏳','Lifetime Cover','Owner policy protects you as long as you or your heirs own the home']].map(([icon,label,val]) => (
            <div key={label} style={{ background: '#111C30', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.4rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginTop: 4 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111C30', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', borderLeft: '3px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🛡️ What Title Insurance Covers in DFW</div>
          {['Undisclosed liens or mortgages from previous owners','Forged signatures or fraud in the chain of title','Survey errors or boundary discrepancies','Unpaid property taxes from before your purchase','Clerical errors in public records','Undisclosed easements that affect your use','Probate issues — heirs claiming ownership after your purchase'].map((t,i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, color: '#CBD5E1', fontSize: '0.9rem' }}><span style={{ color: '#F5E642′ }}>✓</span>{t}</div>
          ))}
        </div>

        <div style={{ background: '#111C30', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>⚠️ Why It Matters in DFW</div>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>DFW has one of the fastest-moving real estate markets in the US. Quick closes, estate sales, and foreclosure flips all carry elevated title risk. TX title rates are state-regulated — you pay the same regardless of which title company you use, so choose based on service quality.</p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🧮 Estimate Your Title Insurance Cost</h2>
        <input
          type="text"
          placeholder="Enter purchase price (e.g. 450000)"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ width: '100%', background: '#111C30', border: '2px solid #1E3A5F', borderRadius: 10, padding: '0.9rem', color: '#E8EAF6', fontSize: '1rem', boxSizing: 'border-box', marginBottom: '1rem' }}
        />
        {ownerCost && (
          <div style={{ background: '#111C30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Owner Policy (recommended)</div><div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800 }}>${Number(ownerCost).toLocaleString()}</div></div>
              <div><div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Lender Policy (required)</div><div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800 }}>${Number(lenderCost).toLocaleString()}</div></div>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: 12, margin: '1rem 0 0′ }}>Estimate based on ~$2/$1,000 TX regulated rate. Actual cost varies by title company and transaction complexity.</p>
          </div>
        )}
      </div>
    </div>
  );
}