import { useState } from 'react';

export default function DFWIBuyerGuide2026() {
  const [situation, setSituation] = useState('relocation');
  const [timeline, setTimeline] = useState('fast');

  const analysis: Record<string, Record<string, { verdict: string; color: string; reason: string; action: string }>> = {
    relocation: {
      fast: { verdict: 'iBuyer Wins', color: '#22c55e', reason: 'You need to close in 14 days — iBuyer is built for this. Accept 5-8% discount to eliminate logistical chaos.', action: 'Get offers from Opendoor and Offerpad same day.' },
      flexible: { verdict: 'Traditional Wins', color: '#F5E642', reason: 'With time, traditional listing earns 5-8% more. That’s $25K+ on a $400K home.', action: 'List with ProLnk partner agent, price 2-3% above target.' },
    },
    estate: {
      fast: { verdict: 'iBuyer Wins', color: '#22c55e', reason: 'Estate situations benefit from certainty. iBuyer removes inspections, showings, and emotion from the sale.', action: 'Contact Opendoor first — they have the most DFW volume.' },
      flexible: { verdict: 'Consider Both', color: '#f97316', reason: 'Estate sales with more time can net 3-5% more via traditional, but weigh against family carrying costs and stress.', action: 'Get iBuyer offer first as your floor, then list traditionally.' },
    },
    divorce: {
      fast: { verdict: 'iBuyer Wins', color: '#22c55e', reason: 'Clean break matters more than maximum price. iBuyer closes fast with zero negotiation friction between parties.', action: 'Both parties agree to iBuyer offer — fastest path to resolution.' },
      flexible: { verdict: 'Traditional Wins', color: '#F5E642', reason: 'If both parties can cooperate, traditional listing earns more equity to split.', action: 'Use a neutral listing agent agreed upon by both parties.' },
    },
    upgrade: {
      fast: { verdict: 'Traditional Wins', color: '#F5E642', reason: 'Even on a tight timeline, iBuyer discount is hard to swallow for a voluntary sale. Try 30-day close.', action: 'List at market price with a 30-day close requirement.' },
      flexible: { verdict: 'Traditional Wins', color: '#F5E642', reason: 'You’re leaving $20-40K on the table with an iBuyer. No reason to do it with flexibility.', action: 'Spring listing with ProLnk documentation = maximum value.' },
    },
    distressed: {
      fast: { verdict: 'Cash Buyer / iBuyer', color: '#22c55e', reason: 'Distressed properties often don’t qualify for iBuyer. Local cash buyers may be your fastest option.', action: 'Try iBuyer first. If denied, seek local DFW cash investor.' },
      flexible: { verdict: 'Consider Both', color: '#f97316', reason: 'Make repairs first if possible. Every dollar in repairs can return 3x at closing.', action: 'Get a pre-listing repair ROI assessment from ProLnk.' },
    },
  };

  const result = analysis[situation]?.[timeline];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>⚡</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', margin: '0.5rem 0′ }}>DFW iBuyer Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Opendoor, Offerpad, and cash buyers — when it makes sense and when it doesn't</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏃', label: 'iBuyer Close Time', val: '14 days', sub: 'vs 45-60 traditional' },
            { icon: '📉', label: 'iBuyer Discount', val: '5-8% below', sub: 'vs market value' },
            { icon: '🤠', label: 'DFW iBuyer Players', val: 'Opendoor, Offerpad', sub: 'Plus local cash buyers' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '1rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem' }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.72rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🎯 iBuyer vs Traditional Analysis</h2>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Your Situation</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['relocation', 'estate', 'divorce', 'upgrade', 'distressed'].map((s) => (
                  <button key={s} onClick={() => setSituation(s)} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', background: situation === s ? '#F5E642′ : '#1e3a5f', color: situation === s ? '#0A1628' : '#fff' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 4 }}>Timeline</div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {[{ key: 'fast', label: 'Need Speed' }, { key: 'flexible', label: 'Flexible' }].map((t) => (
                  <button key={t.key} onClick={() => setTimeline(t.key)} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: timeline === t.key ? '#F5E642′ : '#1e3a5f', color: timeline === t.key ? '#0A1628' : '#fff' }}>{t.label}</button>
                ))}
              </div>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ color: result.color, fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>✅ {result.verdict}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 0.75rem' }}>{result.reason}</p>
              <div style={{ background: '#112240', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Recommended Action</div>
                <div style={{ color: '#fff', fontSize: '0.85rem' }}>{result.action}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🔐</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>Home Health Vault = Better iBuyer Offers</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>iBuyers discount heavily for unknown property condition. A complete Home Health Vault record gives them confidence — and can reduce their discount by 2-3%.</p>
        </div>
      </div>
    </div>
  );
}

