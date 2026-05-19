import { useState } from 'react';

export default function DFWMultipleOfferGuide() {
  const [price, setPrice] = useState('');
  const [offers, setOffers] = useState('');
  const [waivable, setWaivable] = useState('');

  const getStrategy = () => {
    const p = parseFloat(price) || 0;
    const o = parseInt(offers) || 0;
    if (!p || !o) return null;
    const hot = o >= 5;
    const moderate = o >= 2 && o < 5;
    if (hot) {
      return {
        label: '🔥 Highly Competitive Situation',
        color: '#e74c3c',
        tactics: [
          { icon: '⬆️', tactic: 'Escalation Clause', detail: `Offer $${p.toLocaleString()} + escalate $1K-$2K over highest offer up to ${(p * 1.05).toLocaleString()} — shows you want it` },
          { icon: '💵', tactic: 'Appraisal Gap Coverage', detail: 'Offer to cover $10K-$25K above appraised value in cash — signals serious buyer' },
          { icon: '⚡', tactic: 'Fast Close (14-21 days)', detail: 'DFW sellers often prefer speed over price — offer 14-day close if you can' },
          { icon: '🔍', tactic: 'Informational Inspection Only', detail: 'Keep inspection right but waive repair demands — reduces seller risk' },
          { icon: '✉️', tactic: 'Personal Letter', detail: 'DFW sellers respond to personal letters — tell your story briefly' },
        ],
        risk: 'HIGH — you may waive protections. Know your walk-away price before submitting.',
        avoid: 'Do NOT waive financing contingency unless you have underwritten approval. Do NOT waive inspection entirely unless property is new construction.',
      };
    }
    if (moderate) {
      return {
        label: '⚡ Competitive — Be Strategic',
        color: '#e67e22',
        tactics: [
          { icon: '📈', tactic: 'Escalation Clause', detail: `Set escalation cap at ${(p * 1.03).toLocaleString()} — shows commitment without overbidding` },
          { icon: '📋', tactic: 'Pre-Underwritten Approval', detail: 'Submit full underwriting approval — DFW sellers treat this near cash' },
          { icon: '🏠', tactic: 'Leaseback Offer', detail: 'Offer seller 2-3 week leaseback if they need time — huge differentiator' },
          { icon: '✅', tactic: 'Keep All Contingencies', detail: 'With only 2-4 offers you have negotiating room — keep your protections' },
        ],
        risk: 'MODERATE — you likely have leverage. Do not panic-waive contingencies.',
        avoid: 'Avoid lowballing — DFW sellers with 2+ offers will simply go to another buyer.',
      };
    }
    return {
      label: '🟢 Manageable — Negotiate Confidently',
      color: '#27ae60',
      tactics: [
        { icon: '💬', tactic: 'Standard Offer + Asks', detail: 'Offer at or slightly below asking. Request closing cost assistance and home warranty.' },
        { icon: '⏰', tactic: 'Short Deadline', detail: 'Give seller 24-hour response window — creates urgency even in calm market' },
        { icon: '📋', tactic: 'Clean Offer', detail: 'Minimal contingencies, clear terms, pre-approval attached — stands out' },
      ],
      risk: 'LOW — you are likely the priority buyer. Use this leverage.',
      avoid: 'Still avoid lowballs — DFW sellers reject insultingly low offers even without competition.',
    };
  };

  const strategy = getStrategy();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>⚔️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Multiple Offer Guide</h1>
          <p style={{ color: '#aaa', fontSize: '1.05rem' }}>Compete smart. Win without overpaying. Protect yourself.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🏆', title: 'Cash Wins', desc: 'DFW sellers prefer cash — no appraisal risk, faster close, fewer conditions' },
            { icon: '📜', title: 'Certainty Beats Price', desc: 'A $5K lower offer with strong approval often beats higher offer with weak financing' },
            { icon: '⏱️', title: 'Speed Signals Seriousness', desc: 'DFW sellers see slow buyers as risky — fast response and close timeline wins trust' },
            { icon: '🎯', title: 'Escalation Clauses Work', desc: 'Most DFW listing agents accept them — set a cap you can actually pay' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '10px', padding: '1rem' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.3rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>📊 Build Your Offer Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Home Price ($)</label>
              <input type='number' value={price} onChange={e => setPrice(e.target.value)} placeholder='e.g. 425000′ style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Competing Offers</label>
              <input type='number' value={offers} onChange={e => setOffers(e.target.value)} placeholder='e.g. 4′ style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.4rem' }}>Can Waive Inspection?</label>
              <select value={waivable} onChange={e => setWaivable(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1.5px solid #333', backgroundColor: '#0A1628', color: '#fff', fontSize: '0.95rem' }}>
                <option value=''>Select...</option>
                <option value='yes'>Yes (new/renovated)</option>
                <option value='info'>Informational only</option>
                <option value='no'>No — keep full rights</option>
              </select>
            </div>
          </div>
          {strategy && (
            <div style={{ borderRadius: '10px', border: `2px solid ${strategy.color}`, padding: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: strategy.color, marginBottom: '1rem' }}>{strategy.label}</div>
              {strategy.tactics.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', backgroundColor: '#0A1628', borderRadius: '8px', padding: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{t.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.2rem' }}>{t.tactic}</div>
                    <div style={{ fontSize: '0.9rem', color: '#ccc' }}>{t.detail}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#2a1010', borderRadius: '8px', fontSize: '0.9rem', color: '#ff9999′ }}>⚠️ {strategy.risk}</div>
              <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#0e1f0e', borderRadius: '8px', fontSize: '0.9rem', color: '#90ee90′ }}>✅ Avoid: {strategy.avoid}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
