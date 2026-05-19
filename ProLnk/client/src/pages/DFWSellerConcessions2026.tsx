import { useState } from 'react';

export default function DFWSellerConcessions2026() {
  const [market, setMarket] = useState('balanced');
  const [leverage, setLeverage] = useState('medium');

  const strategies: Record<string, Record<string, { concession: string; typical: string; notes: string }[]>> = {
    balanced: {
      low: [
        { concession: 'Closing cost assist', typical: '2% of price', notes: 'Keeps buyer cash liquid' },
        { concession: 'Home warranty', typical: '$600-900', notes: 'Low cost, high perceived value' },
        { concession: 'Repair credit', typical: 'Inspection findings', notes: 'Avoid doing repairs yourself' },
      ],
      medium: [
        { concession: 'Closing cost assist', typical: '2-3% of price', notes: 'Most common in DFW 2026′ },
        { concession: 'Rate buydown (1/0)', typical: '1% of loan', notes: 'Reduces buyer payment yr 1′ },
        { concession: 'Home warranty', typical: '$600-900', notes: 'Standard expectation now' },
      ],
      high: [
        { concession: 'Closing cost assist', typical: '3% of price', notes: 'Full buyer closing costs' },
        { concession: '2/1 Rate buydown', typical: '2-3% of loan', notes: '2% below rate yr1, 1% yr2′ },
        { concession: 'Repair credits', typical: 'All inspection items', notes: 'Credit vs. doing repairs' },
        { concession: 'Home warranty', typical: '$900', notes: 'Extended coverage' },
      ],
    },
    hot: {
      low: [
        { concession: 'Home warranty only', typical: '$600', notes: 'Minimal concessions needed' },
      ],
      medium: [
        { concession: 'Home warranty', typical: '$600-900', notes: 'Keep it simple in hot market' },
        { concession: 'Minor repair credit', typical: 'Per inspection', notes: 'Only true defects' },
      ],
      high: [
        { concession: 'Closing cost assist', typical: '1-2%', notes: 'Even in hot market, worth it' },
        { concession: 'Home warranty', typical: '$600-900', notes: 'Goodwill gesture' },
      ],
    },
    soft: {
      low: [
        { concession: 'Closing cost assist', typical: '2-3%', notes: 'Essential to move listing' },
        { concession: '2/1 Rate buydown', typical: '2-3% of loan', notes: 'Big buyer affordability help' },
        { concession: 'Repair credits', typical: 'All inspection findings', notes: 'Credits beat doing repairs' },
        { concession: 'Home warranty', typical: '$900', notes: 'Extended 2-yr coverage' },
      ],
      medium: [
        { concession: 'Closing cost assist', typical: '3%', notes: 'Full buyer costs covered' },
        { concession: 'Rate buydown', typical: '1-2% of loan', notes: 'Monthly payment reduction' },
        { concession: 'Repair credit', typical: 'Inspection findings', notes: 'Credit is better than repairs' },
      ],
      high: [
        { concession: 'Price reduction', typical: '3-5%', notes: 'May need to reset price' },
        { concession: 'Full closing costs', typical: '3%', notes: 'Cover everything' },
        { concession: '2/1 Buydown', typical: '3% of loan', notes: 'Max buyer incentive' },
        { concession: 'Home warranty extended', typical: '$900', notes: '2-year coverage' },
      ],
    },
  };

  const rows = strategies[market]?.[leverage] ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🤝</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', margin: '0.5rem 0′ }}>DFW Seller Concessions Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>What DFW sellers are giving up — and how to negotiate strategically</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '💸', label: 'Closing Cost Assist', val: '2-3% common' },
            { icon: '📉', label: 'Rate Buydown', val: '1/0 or 2/1′ },
            { icon: '🛡', label: 'Home Warranty', val: '$600-900′ },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '1rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🎯 Concession Strategy Builder</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Market Condition</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['hot', 'balanced', 'soft'].map((m) => (
                  <button key={m} onClick={() => setMarket(m)} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: market === m ? '#F5E642′ : '#1e3a5f', color: market === m ? '#0A1628' : '#fff' }}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Your Leverage</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {['low', 'medium', 'high'].map((l) => (
                  <button key={l} onClick={() => setLeverage(l)} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: leverage === l ? '#F5E642′ : '#1e3a5f', color: leverage === l ? '#0A1628' : '#fff' }}>{l.charAt(0).toUpperCase() + l.slice(1)}</button>
                ))}
              </div>
            </div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ padding: '0.65rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.concession}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{r.typical}</div>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 2 }}>{r.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>💡</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>Repair Credit vs. Doing Repairs</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Almost always take the credit route. You won't get contractor rates, and buyers often prefer the money to choose their own vendors.</p>
        </div>
      </div>
    </div>
  );
}

