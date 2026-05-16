import { useState } from 'react';

const situations = [
  { label: 'My home is listed but not under contract', value: 'listed' },
  { label: 'My home is not yet listed', value: 'unlisted' },
  { label: 'I need to close fast', value: 'fast' },
  { label: 'I have equity but no cash for down payment', value: 'equity' },
];

const recommendations: Record<string, { choice: string; risk: string; tips: string[] }> = {
  listed: {
    choice: 'Contingent Offer with Kick-Out Clause',
    risk: 'Medium — seller may accept another offer during your listing period',
    tips: [
      'Ask seller to accept a 48–72 hr kick-out window',
      'Price your home aggressively to sell fast',
      'Have pre-approval letter ready for quick response',
    ],
  },
  unlisted: {
    choice: 'Bridge Loan or Wait',
    risk: 'High — sellers unlikely to accept contingency on unlisted home',
    tips: [
      'Explore bridge loans: short-term financing secured by your current home',
      'List your home first, then shop — stronger negotiating position',
      'Some lenders allow up to 90% LTV on bridge products in DFW market',
    ],
  },
  fast: {
    choice: 'Bridge Loan',
    risk: 'Low-Medium — carry two mortgages briefly but close on your timeline',
    tips: [
      'Bridge loans typically 6–12 month terms in DFW',
      'Costs: 1–2% origination + ~8–10% APR — worth it to secure the home',
      'Close on new home first, sell current home after moving',
    ],
  },
  equity: {
    choice: 'HELOC or Cash-Out Refi First',
    risk: 'Low — tap equity before selling so you have cash at closing',
    tips: [
      'HELOC: access equity while still living in home',
      'Cash-out refi: replaces mortgage and gives lump sum',
      'Both let you make non-contingent offers — far more competitive in DFW',
    ],
  },
};

export default function DFWHomeSaleContingencyGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const result = selected ? recommendations[selected] : null;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏠➡️🏡</div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700 }}>DFW Home Sale Contingency Guide</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: 16 }}>
            Navigate buying a new DFW home before yours sells — without losing the deal.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 18, color: '#1a3a5c' }}>What is a Home Sale Contingency?</h2>
          <p style={{ margin: '0 0 12px', color: '#444', lineHeight: 1.6 }}>
            A contingent offer lets you buy a new home <strong>only if your current home sells first</strong>. Common in slower markets — but DFW is competitive, so strategy matters.
          </p>
          <div style={{ background: '#fff8e1', borderRadius: 8, padding: 16 }}>
            <strong style={{ color: '#b8860b' }}>⚡ Kick-Out Clause:</strong>
            <span style={{ color: '#555', marginLeft: 8 }}>Seller keeps listing while you try to sell. If another buyer appears, you typically have 48–72 hrs to remove your contingency or walk away.</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, color: '#1a3a5c' }}>📋 What is your situation?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {situations.map(s => (
              <button
                key={s.value}
                onClick={() => setSelected(s.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  border: selected === s.value ? '2px solid #1a3a5c' : '2px solid #e0e0e0',
                  background: selected === s.value ? '#e8f0fb' : '#fff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 15,
                  fontWeight: selected === s.value ? 600 : 400,
                  color: '#333',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: 28 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 20 }}>✅ Recommended Strategy</h2>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{result.choice}</div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14 }}>
              <strong>Risk Level:</strong> {result.risk}
            </div>
            <h3 style={{ margin: '0 0 10px', fontSize: 16 }}>💡 Action Steps</h3>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
              {result.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
