import { useState } from 'react';

const options = [
  {
    key: 'traditional',
    label: 'Traditional Buyer Rep',
    emoji: '🤝',
    description: 'Sign a buyer rep agreement; agent negotiates for comp from seller or you pay the difference.',
    pros: ['Full fiduciary duty — agent works 100% for you', 'Access to all MLS listings including off-market', 'Agent covers negotiation, paperwork, timelines', 'Typically seller-paid (negotiated into deal)'],
    cons: ['Must sign agreement before touring', 'If seller pays $0, you cover the gap', 'Locked in for agreement duration (negotiate short terms)'],
    cost: '2.5–3% of purchase price, typically negotiated from seller side',
    bestFor: 'Most DFW buyers — especially first-timers or relocating buyers',
  },
  {
    key: 'limited',
    label: 'Limited Buyer Rep',
    emoji: '📋',
    description: 'Transaction coordinator only — handles paperwork but no fiduciary advice or negotiation.',
    pros: ['Lower cost (flat fee $1,500–$5,000)', 'Good if you know exactly what you want', 'Faster close — you make all decisions'],
    cons: ['No negotiation support', 'You carry the risk of missing issues', 'No market pricing advice'],
    cost: 'Flat fee $1,500–$5,000 regardless of price',
    bestFor: 'Experienced buyers who\’ve bought in DFW before and know the market',
  },
  {
    key: 'unrepresented',
    label: 'Unrepresented Buyer',
    emoji: '🔓',
    description: 'Go directly to listing agent (dual agency) or negotiate solo with seller.',
    pros: ['No buyer agent cost', 'Listing agent may discount to avoid splitting', 'Direct seller relationship'],
    cons: ['Listing agent represents seller — not you', 'High risk in DFW for foundation/inspection issues', 'Miss standard protections in option period', 'Legal exposure on contract terms'],
    cost: 'No buyer agent fee, but potentially costly mistakes',
    bestFor: 'Experienced investors only — NOT recommended for typical buyers',
  },
];

const situationMap: Record<string, string> = {
  firstTime: 'traditional',
  experienced: 'limited',
  investor: 'unrepresented',
  relocating: 'traditional',
  military: 'traditional',
};

export default function DFWBuyerRepresentationGuide() {
  const [situation, setSituation] = useState('');
  const [selected, setSelected] = useState('');
  const recommended = situationMap[situation] || '';

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>⚖️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Buyer Representation Guide</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15 }}>Post-NAR Settlement 2024 — what changed and what it means for DFW buyers</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#DBEAFE', border: '2px solid #3B82F6', borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 15 }}>📰 What Changed in 2024 (NAR Settlement)</p>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 2 }}>
            <li><strong>Buyers must sign a written buyer rep agreement BEFORE touring homes</strong> (required by most Texas agents)</li>
            <li>Sellers no longer required to offer buyer agent comp in MLS — it\'s now negotiated separately</li>
            <li>Buyers may need to pay their agent directly if seller won\'t cover it</li>
            <li>You can (and should) negotiate the terms: duration, exclusivity, and compensation cap</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🎯 What\'s Your Buyer Situation?</h2>
        <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: 15, background: '#fff', marginBottom: 24 }}>
          <option value="">Select your situation...</option>
          <option value="firstTime">First-time buyer in DFW</option>
          <option value="experienced">Experienced buyer (2+ purchases)</option>
          <option value="investor">Real estate investor</option>
          <option value="relocating">Relocating to DFW from out of state</option>
          <option value="military">Military / VA loan buyer</option>
        </select>

        {recommended && (
          <div style={{ background: '#DCFCE7', border: '2px solid #16A34A', borderRadius: 10, padding: 16, marginBottom: 24 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>✅ Recommended for your situation: <span style={{ color: '#16A34A' }}>{options.find(o => o.key === recommended)?.label}</span></p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#166534' }}>Click below to see full details, costs, and what to watch for.</p>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📌 Compare Your Options</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {options.map(opt => (
            <div key={opt.key} onClick={() => setSelected(opt.key === selected ? '' : opt.key)} style={{ background: '#fff', borderRadius: 12, border: `2px solid ${selected === opt.key ? '#F5E642' : recommended === opt.key ? '#16A34A' : '#E2E8F0'}`, padding: 18, cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{opt.emoji}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>{opt.label}</h3>
              <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>{opt.description}</p>
              {recommended === opt.key && <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: '#16A34A' }}>⭐ RECOMMENDED FOR YOU</div>}
            </div>
          ))}
        </div>

        {selected && (() => {
          const opt = options.find(o => o.key === selected)!;
          return (
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', padding: 24 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>{opt.emoji} {opt.label}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: '#16A34A', marginBottom: 8 }}>✅ Pros</p>
                  {opt.pros.map((p, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>{p}</div>)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: '#DC2626', marginBottom: 8 }}>❌ Cons</p>
                  {opt.cons.map((c, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>{c}</div>)}
                </div>
              </div>
              <div style={{ background: '#F1F5F9', borderRadius: 8, padding: 12 }}>
                <p style={{ margin: '0 0 4px', fontSize: 13 }}>💰 <strong>Typical Cost:</strong> {opt.cost}</p>
                <p style={{ margin: 0, fontSize: 13 }}>🎯 <strong>Best For:</strong> {opt.bestFor}</p>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
