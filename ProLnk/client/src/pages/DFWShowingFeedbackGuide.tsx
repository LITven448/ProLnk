import { useState } from 'react';

const feedbackTypes = [
  'Price too high — multiple buyers said it',
  'Price too high — one buyer mentioned it',
  'Condition issues (specific room/feature)',
  'Loved the home, chose another',
  'No feedback at all from agent',
  'Location concerns',
  'Layout doesn\’t work for their needs',
  'Too many showings, no offers',
];

const interpretations: Record<string, { meaning: string; action: string; reduce: boolean }> = {
  'Price too high — multiple buyers said it': {
    meaning: 'Real price signal. When 3+ separate buyers independently cite price, the market is speaking clearly. In DFW, buyers are told by their agents to cite price even if there are other concerns — so multiple independent mentions means it is definitely price.',
    action: 'Initiate a meaningful price reduction within 7 days. Confirm with your agent which active comps have sold since listing and reprice to current market, not original market.',
    reduce: true,
  },
  'Price too high — one buyer mentioned it': {
    meaning: 'Soft signal. One buyer saying price may just be negotiation positioning or may reflect their budget ceiling, not market consensus. In DFW\’s tiered market, one data point is not a trend.',
    action: 'Monitor for 7 more days. If showing volume drops and no offers emerge, treat this as early confirmation. Do not reduce immediately on one comment.',
    reduce: false,
  },
  'Condition issues (specific room/feature)': {
    meaning: 'Condition feedback is often actionable and more reliable than price feedback. If multiple buyers cite the same specific issue (dated kitchen, worn carpet, roof age), that feature is devaluing the property in buyers\’ eyes.',
    action: 'Get a contractor quote on the specific issue. Compare cost to fix vs. price reduction needed. Often a $2,000 carpet replacement beats a $10,000 price cut in buyer psychology.',
    reduce: false,
  },
  'Loved the home, chose another': {
    meaning: 'Healthy signal. Competitive buyers are engaging — this means your home is in the consideration set. In DFW, losing to another home often means you need better offer terms, not lower price.',
    action: 'Ask your agent what the competing home offered (price, condition, terms). Determine if you can match on terms (closing cost assistance, flexible close date) before touching price.',
    reduce: false,
  },
  'No feedback at all from agent': {
    meaning: 'Buyer\’s agents often filter or withhold feedback to avoid tipping their hand. Lack of feedback is not positive — it usually means the buyer passed quickly and the agent didn\’t bother. In DFW, this is especially common in the $300-500K range.',
    action: 'Ask your agent to follow up directly 48 hours after every showing. Pattern of no-feedback showings with no offers after 21 days = price signal.',
    reduce: false,
  },
  'Location concerns': {
    meaning: 'Location feedback is almost always the buyer\’s way of saying they want a different area — it is rarely fixable. In DFW, this often means proximity to traffic corridors, school district lines, or neighborhood perception.',
    action: 'You cannot fix location. The question is whether you\’re pricing to attract buyers who\’ve already accepted the location. If DFW location is truly a drawback, price must compensate.',
    reduce: true,
  },
  'Layout doesn\’t work for their needs': {
    meaning: 'Layout feedback means you\’re attracting the wrong buyer profile. In DFW, this often signals a mismatch between how the home is marketed (photography, description) and the actual layout experience.',
    action: 'Review how the home is being shown and described. Can staging or photography make the layout work better? This is a marketing fix, not necessarily a price fix.',
    reduce: false,
  },
  'Too many showings, no offers': {
    meaning: 'High showing volume + zero offers is the clearest price signal in real estate. Buyers are interested enough to visit but unwilling to make an offer at your price. In DFW, more than 12 showings with no offer is a definitive pricing problem.',
    action: 'Price reduction is required. Calculate: take the highest offer you\’ve received (or the average buyer budget if no offers), and price to that number or just below it.',
    reduce: true,
  },
};

export default function DFWShowingFeedbackGuide() {
  const [selected, setSelected] = useState('');
  const data = selected ? interpretations[selected] : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui,sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>💬</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Showing Feedback Guide for DFW Sellers</h1>
          <p style={{ color: '#CBD5E1', margin: 0 }}>How to decode filtered feedback, what patterns actually mean, and when to act vs. ignore what buyers say.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>⚠️ Why Showing Feedback Is Often Filtered</h2>
          <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6 }}>Buyer's agents in DFW routinely soften or omit real feedback to protect their client's negotiating position. Common filters: "not quite right for them" (means price), "still looking" (means priced out), and "needs updating" (means they'll offer low or skip). Your listing agent should push for specifics — vague feedback is almost always bad news dressed up.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🔍 Decode Your Feedback</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}>Select the feedback pattern you're seeing.</p>
          <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, background: '#fff', color: '#0A1628', marginBottom: 14 }}>
            <option value=''>Select feedback type</option>
            {feedbackTypes.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          {data && (
            <div>
              <div style={{ background: '#F8FAFC', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>🧠 What This Really Means</div>
                <p style={{ fontSize: 13, color: '#334155', margin: 0, lineHeight: 1.6 }}>{data.meaning}</p>
              </div>
              <div style={{ background: '#FFFBEA', border: '1px solid #F5E642', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>✅ Recommended Action</div>
                <p style={{ fontSize: 13, color: '#334155', margin: 0, lineHeight: 1.6 }}>{data.action}</p>
              </div>
              <div style={{ background: data.reduce ? '#FFF1F2' : '#F0FDF4', border: `1px solid ${data.reduce ? '#FECDD3' : '#BBF7D0'}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: data.reduce ? '#BE123C' : '#15803D' }}>
                  {data.reduce ? '📉 Price Reduction Likely Needed' : '⏳ Hold — Monitor Before Reducing Price'}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, color: '#CBD5E1', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Rule of Thumb:</span> In a normal DFW market, 10-15 showings with no offer = price is the problem regardless of what feedback says. Trust volume over individual comments.
        </div>
      </div>
    </div>
  );
}
