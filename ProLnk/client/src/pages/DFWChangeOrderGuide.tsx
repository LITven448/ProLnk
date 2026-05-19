import { useState } from 'react';

const CHANGE_TYPES = [
  { label: 'Hidden damage discovered (e.g., rot, mold, bad wiring)', legitimate: true, doc: 'Photo evidence + written description before work continues', negotiate: 'Request competing sub-quote if >$500. Confirm scope in writing before approving.' },
  { label: 'Homeowner-requested upgrade or addition', legitimate: true, doc: 'Signed change order with new price and timeline impact', negotiate: 'Negotiate unit pricing — contractor may inflate by 20–30% on mid-project adds.' },
  { label: 'Material price increase since bid', legitimate: false, doc: 'Request supplier invoice showing price difference', negotiate: 'Fixed-price contracts lock material costs. Push back unless market spike is extreme (>15%).' },
  { label: 'Contractor underestimated labor hours', legitimate: false, doc: 'None — this is contractor risk in a fixed-price contract', negotiate: 'Decline unless scope genuinely changed. This is bid risk, not homeowner risk.' },
  { label: 'Code compliance upgrade discovered during permit inspection', legitimate: true, doc: 'Inspector written notice or failed inspection report', negotiate: 'Legitimate but get itemized cost. Compare to city published code fee schedules.' },
  { label: 'Scope misunderstanding between contractor and homeowner', legitimate: true, doc: 'Review original contract scope language together', negotiate: 'If scope was vague, split cost. If scope was specific, contractor absorbs.' },
];

export default function DFWChangeOrderGuide() {
  const [selectedType, setSelectedType] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<null | typeof CHANGE_TYPES[0]>(null);

  function analyze() {
    const found = CHANGE_TYPES.find(c => c.label === selectedType);
    if (found) setResult(found);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Tools</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>🔄 Change Order Guide</h1>
        <p style={{ color: '#9BA3B4', marginBottom: '2rem' }}>Change orders are normal — but some are manufactured. Know the difference before you sign anything.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Analyze This Change Order</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
              style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '0.95rem' }}>
              <option value="">— What type of change order? —</option>
              {CHANGE_TYPES.map(c => <option key={c.label}>{c.label}</option>)}
            </select>
            <input type="number" placeholder="Change order amount ($)" value={amount} onChange={e => setAmount(e.target.value)}
              style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }} />
            <button onClick={analyze}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.85rem', fontSize: '1rem', cursor: 'pointer' }}>
              Analyze This Change Order →
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem' }}>{result.legitimate ? '✅' : '🚩'}</span>
              <div>
                <div style={{ color: result.legitimate ? '#4CAF50' : '#FF6B6B', fontWeight: 700, fontSize: '1.1rem' }}>
                  {result.legitimate ? 'Likely Legitimate' : 'Likely Manufactured / Contractor Risk'}
                </div>
                {amount && <div style={{ color: '#9BA3B4', fontSize: '0.85rem' }}>Change order amount: ${parseFloat(amount).toLocaleString()}</div>}
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>📄 Documentation Required</div>
              <div style={{ color: '#C8D0DC', background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>{result.doc}</div>
            </div>
            <div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>🤝 Negotiation Points</div>
              <div style={{ color: '#C8D0DC', background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>{result.negotiate}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Change Order Rules</h2>
          {[
            '📝 Never verbal — every change order must be in writing before work proceeds',
            '💰 Every CO must include dollar amount AND timeline impact',
            '🖊️ Both parties must sign before contractor proceeds',
            '📷 Photo documentation should accompany all hidden-damage COs',
            '⏸️ Stop work until CO is signed — proceeding without signature waives your rights',
            '🏦 Retain 10% holdback until all COs are resolved and punch list complete',
          ].map(r => <div key={r} style={{ color: '#9BA3B4', padding: '0.4rem 0', borderBottom: '1px solid #1E2E45' }}>{r}</div>)}
        </div>
      </div>
    </div>
  );
}
