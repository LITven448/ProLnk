import { useState } from 'react';

const TRADES = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Landscaping', 'General Contractor'];
const SUBMARKETS = ['Frisco', 'McKinney', 'Allen', 'Plano', 'Arlington', 'Fort Worth', 'Dallas', 'Garland'];

type VenueInfo = { name: string; type: string; tip: string };
type TradeVenues = Record<string, VenueInfo[]>;
type SubmarketStrategy = Record<string, { approach: string; conversion: string; focus: string }>;

const VENUES: TradeVenues = {
  HVAC: [
    { name: 'Johnstone Supply (multiple DFW locations)', type: '🏪 Supply House', tip: 'Go at 7–8am. Techs buying parts before jobs. Have a one-pager ready.' },
    { name: 'Collin College HVAC Program (McKinney)', type: '🎓 Trade School', tip: 'Connect with instructor first. Offer to guest-speak on "income beyond service calls."' },
    { name: 'North Texas HVAC Facebook Group (18K members)', type: '📘 Online Community', tip: 'Post value first for 2 weeks before pitching. Engage on others\’ posts.' },
    { name: 'Ferguson HVAC (Plano & Addison)', type: '🏪 Supply House', tip: 'Counter staff knows regulars. Build a relationship with counter staff to get warm intros.' },
  ],
  Plumbing: [
    { name: 'Barnett & Sons Plumbing Supply (Garland)', type: '🏪 Supply House', tip: 'Large contractor base. Early morning is best — 6:30–8am.' },
    { name: 'North Texas Plumbers Association', type: '🤝 Association', tip: 'Monthly meetings in Dallas. Sponsor a lunch to get speaking time.' },
    { name: 'Lowe\’s Pro desk (multiple locations)', type: '🏗️ Big Box Pro Desk', tip: 'Talk to the Pro desk associates — they\’re a warm intro channel to their regulars.' },
    { name: 'DFW Plumbing Facebook Group', type: '📘 Online Community', tip: 'Engage with technical questions before introducing ProLnk.' },
  ],
  Electrical: [
    { name: 'Graybar Electric (Carrollton)', type: '🏪 Supply House', tip: 'Heavy commercial and residential mix. Industrial suppliers attract the pros who do volume.' },
    { name: 'IBEW Local 20 (Dallas)', type: '🤝 Union', tip: 'Attend open events. Approach as a supplemental income opportunity alongside union work.' },
    { name: 'Electrical Contractors of Texas events', type: '🤝 Association', tip: 'Formal setting — bring business cards and a clean one-page income summary.' },
    { name: 'Nextdoor Pro listings in high-income zip codes', type: '🏘️ Hyperlocal', tip: 'Message electricians listed on Nextdoor as neighbors — warm context.' },
  ],
  Roofing: [
    { name: 'ABC Supply (8 DFW locations)', type: '🏪 Supply House', tip: 'Biggest roofing supply in DFW. Morning truck pickup time is high-traffic.' },
    { name: 'DFW Roofers Facebook Group (22K members)', type: '📘 Online Community', tip: 'Seasonal post after hailstorms: "Are you getting paid on homeowner referrals after a storm?"' },
    { name: 'Texas Roofing Association events', type: '🤝 Association', tip: 'Annual conference is the best networking day of the year for this trade.' },
    { name: 'Storm restoration job sites (after hail)', type: '🏗️ Job Site', tip: 'Post-storm, crews are everywhere. Approach crew leads, not individual labor.' },
  ],
  Landscaping: [
    { name: 'SiteOne Landscape Supply (multiple DFW)', type: '🏪 Supply House', tip: 'Landscape crew leads buying irrigation and plant material early AM. Casual convo opportunity.' },
    { name: 'DFW Lawn Care & Landscaping Group (Facebook)', type: '📘 Online Community', tip: 'Seasonal approach works — spring and fall are peak engagement times.' },
    { name: 'Texas Nursery & Landscape Association', type: '🤝 Association', tip: 'More established businesses. Pitch the homeowner origination rights angle — they have repeat clients.' },
    { name: 'Chamber of Commerce events (Frisco/McKinney)', type: '🤝 Business Network', tip: 'High-end landscapers serving $1M+ homes are exactly who you want. Frisco CoC is gold.' },
  ],
  'General Contractor': [
    { name: 'Home Depot Pro desk (15+ DFW locations)', type: '🏗️ Big Box Pro Desk', tip: 'GCs pull permits and buy materials here. Build rapport with Pro desk staff for warm intros.' },
    { name: 'Texas Association of Builders events', type: '🤝 Association', tip: 'Home builder events attract GCs managing 20–100 subs. One GC = massive network unlock.' },
    { name: 'DFW Contractors Facebook Group', type: '📘 Online Community', tip: 'Engage on permit questions, material shortages — be helpful before pitching.' },
    { name: 'Permit office waiting rooms (Frisco/McKinney)', type: '🏗️ Job Site Adj.', tip: 'Contractors waiting on permits are a captive, receptive audience. Bring coffee.' },
  ],
};

const SUBMARKET_STRATEGY: SubmarketStrategy = {
  Frisco: { approach: 'Professional + income-focused', conversion: '28%', focus: 'High-income homeowner origination rights angle — permanent passive income' },
  McKinney: { approach: 'Growth opportunity framing', conversion: '31%', focus: 'New construction boom — get in early before it\’s saturated' },
  Allen: { approach: 'Community / neighbor angle', conversion: '26%', focus: 'Dense suburban neighborhoods — homeowner referrals flow easily here' },
  Plano: { approach: 'Business-minded / ROI focused', conversion: '24%', focus: 'Emphasize scalability — Plano pros tend to think in systems' },
  Arlington: { approach: 'Volume / hustle framing', conversion: '22%', focus: 'Larger workforce, more competitive — lead with the math' },
  'Fort Worth': { approach: 'Independent / freedom angle', conversion: '25%', focus: 'Owner-operators respond to income diversification pitch' },
  Dallas: { approach: 'Professional network framing', conversion: '21%', focus: 'Emphasize LinkedIn + professional networking — more sophisticated market' },
  Garland: { approach: 'Community trust angle', conversion: '27%', focus: 'Tight-knit contractor community — personal introductions matter most' },
};

export default function PartnerDFWTradeNetwork() {
  const [trade, setTrade] = useState('HVAC');
  const [submarket, setSubmarket] = useState('Frisco');

  const venues = VENUES[trade] || [];
  const strategy = SUBMARKET_STRATEGY[submarket] || SUBMARKET_STRATEGY['Frisco'];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🤝</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Build Your DFW Trade Network</h1>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 600, margin: '0 auto' }}>
            Where to find tradespeople to recruit, how to approach them, and what actually converts.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Find Your Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Trade Type</label>
              <select value={trade} onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>DFW Submarket</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {SUBMARKETS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#78350F' }}>APPROACH STYLE</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>{strategy.approach}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#78350F' }}>EST. CONVERSION RATE</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>{strategy.conversion}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#78350F' }}>KEY FOCUS</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{strategy.focus}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📍 Top Recruiting Venues — {trade} in {submarket}</h2>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>Best places to find and approach {trade.toLowerCase()} professionals</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {venues.map((venue, i) => (
              <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: '#F9FAFB', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{venue.name}</div>
                  <div style={{ fontSize: 12, background: '#0A1628', color: '#F5E642', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>{venue.type}</div>
                </div>
                <div style={{ padding: '12px 16px', background: '#EFF6FF', fontSize: 13, color: '#1E40AF' }}>
                  💡 <strong>Approach tip:</strong> {venue.tip}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ What Works vs ❌ What Doesn't</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#059669', marginBottom: 10 }}>✅ WHAT RESONATES</div>
              {[
                'Leading with the income math — concrete numbers',
                'Showing how ProLnk complements their existing work',
                'Letting them calculate their own network potential',
                'Peer stories from similar tradespeople in DFW',
                'Emphasizing Charter exclusivity and scarcity',
                'The "you already make referrals for free" angle',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ color: '#059669', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#DC2626', marginBottom: 10 }}>❌ WHAT TURNS THEM OFF</div>
              {[
                'Leading with "network" or "team building" language',
                'Vague income promises without specifics',
                'Pitching before establishing any rapport',
                'Comparing to MLM structures unprompted',
                'Pushing the subscription before explaining value',
                'Group pitches before 1:1 trust is built',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ color: '#DC2626', fontWeight: 700, flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Your first recruit is your hardest.</div>
          <p style={{ color: '#9CA3AF', marginBottom: 0 }}>After that, your network starts recruiting for you. Focus all energy on finding your first 3 pros this week.</p>
        </div>
      </div>
    </div>
  );
}
