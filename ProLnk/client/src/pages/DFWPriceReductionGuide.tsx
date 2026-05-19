import { useState } from 'react';

export default function DFWPriceReductionGuide() {
  const [dom, setDom] = useState('');
  const [showings, setShowings] = useState('');
  const [offers, setOffers] = useState('');

  const domNum = parseInt(dom) || 0;
  const showingsNum = parseInt(showings) || 0;
  const offersNum = parseInt(offers) || 0;

  function getRecommendation() {
    if (!dom || !showings) return null;
    if (domNum < 14) return { action: 'Hold', timing: 'Too early — DFW market standard is 14-21 days before evaluating.', size: 'No reduction yet', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' };
    if (domNum >= 14 && domNum <= 21 && showingsNum >= 8 && offersNum === 0) return { action: 'Consider Reduction', timing: 'You\’re at the DFW decision window. With strong showing traffic and no offers, price is the signal.', size: 'Reduce 2-3% from current list price (meaningful, not token)', color: '#92400E', bg: '#FFFBEA', border: '#F5E642' };
    if (domNum >= 14 && domNum <= 21 && showingsNum < 8 && offersNum === 0) return { action: 'Monitor + Check Marketing', timing: 'Low showing volume may indicate marketing issue, not just price. Verify Zillow/Realtor listing quality before reducing.', size: 'Hold for 7 more days; if showings don\’t increase, reduce 1-2%', color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' };
    if (domNum > 21 && domNum <= 35 && offersNum === 0) return { action: 'Reduce Now', timing: 'Past the DFW critical window. Every day adds DOM stigma. Reduce this week.', size: 'Reduce 3-5% — enough to create new buyer urgency and trigger Zillow price drop alerts', color: '#BE123C', bg: '#FFF1F2', border: '#FECDD3' };
    if (domNum > 35 && offersNum === 0) return { action: 'Significant Reduction Required', timing: 'High DOM stigma is now hurting you. Buyers are asking what\’s wrong with the home. Aggressive reset needed.', size: 'Reduce 5-8% or consider relisting after a 10-day withdrawal to reset DOM counter', color: '#7C2D12', bg: '#FFF7ED', border: '#FED7AA' };
    if (offersNum > 0) return { action: 'Hold — You Have Offers', timing: 'Focus on negotiating your best offer, not reducing price. Reduction now signals desperation.', size: 'No reduction — counter or accept current offers', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' };
    return null;
  }

  const rec = getRecommendation();

  const dfwTimeline = [
    { days: 'Days 1-13', label: 'Launch Window', desc: 'Never reduce here. Let the market respond. DFW buyers who were waiting will come immediately.' },
    { days: 'Days 14-21', label: 'First Decision Point', desc: 'DFW standard evaluation window. 8+ showings and no offers = price reduction conversation begins.' },
    { days: 'Days 22-35', label: 'Urgency Zone', desc: 'Every day adds stigma. Buyers notice. First meaningful reduction should happen before day 35.' },
    { days: 'Days 36-60', label: 'Reset or Relist', desc: 'Consider strategic 10-day withdrawal + relist at market price. DOM clock restarts on new listing.' },
    { days: 'Days 60+', label: 'Distressed Signal', desc: 'Buyers assume something is wrong. Only path forward is aggressive reduction to below-market pricing.' },
  ];

  const sizingRules = [
    ['Token reduction (under 1%)', 'Never — buyers and their agents see this as desperation without substance. It signals you\’re unwilling to be realistic.'],
    ['Small reduction (1-2%)', 'On $400K home = $4-8K. Appropriate for first reduction in early DOM if market is borderline. Keeps you competitive without signaling panic.'],
    ['Meaningful reduction (2-4%)', 'On $400K home = $8-16K. The right size for the 14-35 day window with strong showing/no-offer pattern.'],
    ['Aggressive reduction (4-6%)', 'On $400K home = $16-24K. Required after 35+ DOM or if you need to create new urgency and trigger buyer alerts.'],
    ['Relist at new price', 'When DOM stigma has accumulated to the point that a reduction won\’t overcome buyer skepticism. Pull for 10 days, relist fresh.'],
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui,sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>📉</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Price Reduction Strategy — DFW Sellers</h1>
          <p style={{ color: '#CBD5E1', margin: 0 }}>When to reduce, how much, and how to time it for maximum DFW market impact.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📅 DFW Price Reduction Timeline</h2>
          {dfwTimeline.map(t => (
            <div key={t.days} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '4px 8px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>{t.days}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🎯 Get Your Recommendation</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>Enter your current listing data for a DFW-specific recommendation.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 4 }}>Days on Market</label>
              <input type='number' value={dom} onChange={e => setDom(e.target.value)} placeholder='e.g. 22' style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 4 }}>Total Showings</label>
              <input type='number' value={showings} onChange={e => setShowings(e.target.value)} placeholder='e.g. 11' style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 4 }}>Offers Received</label>
              <input type='number' value={offers} onChange={e => setOffers(e.target.value)} placeholder='e.g. 0' style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
          </div>
          {rec && (
            <div style={{ background: rec.bg, border: `1px solid ${rec.border}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: rec.color, marginBottom: 6 }}>{rec.action}</div>
              <div style={{ fontSize: 13, color: '#334155', marginBottom: 8, lineHeight: 1.6 }}>{rec.timing}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: rec.color }}>Recommended size: {rec.size}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💡 Reduction Size Guide</h2>
          {sizingRules.map(([type, desc]) => (
            <div key={type} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{type}</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
