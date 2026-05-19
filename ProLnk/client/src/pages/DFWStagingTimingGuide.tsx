import { useState } from 'react';

type TimelineKey = 'immediate' | 'four-weeks' | 'eight-weeks' | 'flexible';
type MarketKey = 'hot' | 'balanced' | 'slow';

interface TimingPlan {
  stagingStart: string;
  photographyDate: string;
  listingDate: string;
  dfwMarketNote: string;
  schedule: { week: string; action: string; priority: string }[];
  restageThreshold: string;
  seasonalNote: string;
}

const timingPlans: Record<TimelineKey, Record<MarketKey, TimingPlan>> = {
  immediate: {
    hot: {
      stagingStart: 'Today — start decluttering immediately',
      photographyDate: '5–7 days out',
      listingDate: '7–10 days out',
      dfwMarketNote: 'In a DFW hot market, speed beats perfection. A 90% staged home listed this week beats a 100% staged home listed in 3 weeks.',
      schedule: [
        { week: 'Days 1–2', action: 'Aggressive declutter: fill storage pod or PODS unit', priority: '🔴 Critical' },
        { week: 'Days 3–4', action: 'Deep clean entire home, fix obvious issues (broken hardware, scuffs)', priority: '🔴 Critical' },
        { week: 'Day 5', action: 'Add staging accessories, fresh flowers, final styling', priority: '🟡 High' },
        { week: 'Day 6', action: 'Professional photography (morning if possible)', priority: '🔴 Critical' },
        { week: 'Day 7', action: 'List on MLS, activate Zillow/Realtor.com, go live', priority: '🔴 Critical' },
      ],
      restageThreshold: 'If no offers after 7 days in a hot market, re-evaluate pricing first — not staging. If showings are low, consider adding accessories or virtual staging.',
      seasonalNote: 'Hot DFW markets (Feb–May, Sept–Oct): Days on market average 8–14. Speed to market is the most important factor.',
    },
    balanced: {
      stagingStart: 'Today — you have time but shouldn\’t wait',
      photographyDate: '7–10 days out',
      listingDate: '10–14 days out',
      dfwMarketNote: 'Balanced DFW market means buyers have options — staging quality matters more than speed.',
      schedule: [
        { week: 'Days 1–3', action: 'Declutter and clear storage — rental unit if needed', priority: '🔴 Critical' },
        { week: 'Days 4–5', action: 'Deep clean, repairs, painting if needed', priority: '🔴 Critical' },
        { week: 'Day 6', action: 'Staging accessories and furniture arrangement', priority: '🟡 High' },
        { week: 'Day 7', action: 'Final walkthrough, touch-up cleaning', priority: '🟡 High' },
        { week: 'Day 8–9', action: 'Professional photography (schedule for morning)', priority: '🔴 Critical' },
        { week: 'Day 10–14', action: 'List on MLS', priority: '🔴 Critical' },
      ],
      restageThreshold: 'If no offers after 14–21 days, schedule a restage consultation. Buyers in a balanced market are picky — a fresh look can reset perception.',
      seasonalNote: 'DFW balanced markets: avg 21–35 days. Price and condition win.',
    },
    slow: {
      stagingStart: 'Today — staging matters most in slow markets',
      photographyDate: '7–10 days out',
      listingDate: '10–14 days out',
      dfwMarketNote: 'Slow DFW markets mean your home must be the obvious choice. Staging is the single highest-ROI investment in this environment.',
      schedule: [
        { week: 'Days 1–4', action: 'Maximum declutter — go further than you think necessary', priority: '🔴 Critical' },
        { week: 'Days 5–6', action: 'Deep clean, professional cleaning service if budget allows', priority: '🔴 Critical' },
        { week: 'Day 7', action: 'Staging — consider professional consultation ($200–350)', priority: '🔴 Critical' },
        { week: 'Day 8', action: 'Final accessories and polish', priority: '🟡 High' },
        { week: 'Day 9', action: 'Photography — professional photographer is non-negotiable in slow market', priority: '🔴 Critical' },
        { week: 'Day 11–14', action: 'List — do not rush — home must be fully ready', priority: '🔴 Critical' },
      ],
      restageThreshold: 'In a slow market, restage after 30 days if no offers. Change enough to warrant new photos — buyers track days on market closely in DFW slow periods.',
      seasonalNote: 'DFW slow markets (July–Aug, Dec–Jan): avg 45–75 days. Staging and price must both be right.',
    },
  },
  'four-weeks': {
    hot: {
      stagingStart: 'Week 1 — you have ideal runway in a hot market',
      photographyDate: 'Day 24–26',
      listingDate: 'Day 26–28',
      dfwMarketNote: '4 weeks is ideal preparation time for a DFW hot market. Use every day — don\’t let the timeline slip.',
      schedule: [
        { week: 'Week 1', action: 'Declutter entire home, rent storage unit, first deep clean', priority: '🔴 Critical' },
        { week: 'Week 2', action: 'Repairs, touch-up paint, deep clean kitchen and bathrooms', priority: '🔴 Critical' },
        { week: 'Week 3', action: 'Staging: furniture arrangement, accessories, lighting upgrades', priority: '🟡 High' },
        { week: 'Week 4, Day 1–2', action: 'Final styling, fresh flowers, photograph day prep', priority: '🟡 High' },
        { week: 'Week 4, Day 3', action: 'Professional photography (Tuesday–Thursday ideal for DFW traffic)', priority: '🔴 Critical' },
        { week: 'Week 4, Day 5–7', action: 'Go live on MLS — target Thursday for maximum weekend traffic', priority: '🔴 Critical' },
      ],
      restageThreshold: 'With proper 4-week prep in a hot market, restage should not be necessary. If no offers in 14 days, pricing is the issue.',
      seasonalNote: 'List on Thursday in DFW — buyers browse Zillow Thursday evening, tour Friday/Saturday, offer Sunday. Thursday listing = weekend offer.',
    },
    balanced: {
      stagingStart: 'Week 1 — ideal timeline for balanced market',
      photographyDate: 'Day 22–24',
      listingDate: 'Day 25–28',
      dfwMarketNote: '4 weeks gives you time to do this right in a balanced DFW market. Don\’t compress the schedule.',
      schedule: [
        { week: 'Week 1', action: 'Declutter, storage, pre-inspection if budget allows', priority: '🔴 Critical' },
        { week: 'Week 2', action: 'Repairs from inspection, paint, replace dated hardware', priority: '🔴 Critical' },
        { week: 'Week 3', action: 'Professional staging consultation + implementation', priority: '🟡 High' },
        { week: 'Week 4', action: 'Final prep, photography, list Thursday', priority: '🔴 Critical' },
      ],
      restageThreshold: 'If no offers after 21–28 days, restage the primary living area and get new photos — a listing refresh resets buyer perception in DFW.',
      seasonalNote: 'DFW balanced market: target late Feb–early May or Sept–Oct for listing date if you have flexibility.',
    },
    slow: {
      stagingStart: 'Week 1 — every week of prep adds value in slow market',
      photographyDate: 'Day 22–24',
      listingDate: 'Day 25–28',
      dfwMarketNote: 'In a slow DFW market, 4 weeks of prep means your home can compete at the top of the category. This is how you beat slow market odds.',
      schedule: [
        { week: 'Week 1', action: 'Pre-inspection, declutter, storage, list all repairs needed', priority: '🔴 Critical' },
        { week: 'Week 2', action: 'Complete all repairs, fresh paint throughout if budget allows', priority: '🔴 Critical' },
        { week: 'Week 3', action: 'Professional staging — in slow market, hire a pro stager not DIY', priority: '🔴 Critical' },
        { week: 'Week 4', action: 'Final polish, deep clean, photography, list', priority: '🔴 Critical' },
      ],
      restageThreshold: 'Restage at 30 days in slow market. Change primary bedroom and living room enough to justify new photos. New photos restart the clock psychologically for buyers.',
      seasonalNote: 'Avoid listing in DFW July–August or December. If you must, price aggressively — timing matters more in slow periods.',
    },
  },
  'eight-weeks': {
    hot: {
      stagingStart: 'Week 1–2 — take your time, but keep momentum',
      photographyDate: 'Day 52–54',
      listingDate: 'Day 55–56 (Thursday)',
      dfwMarketNote: 'Eight weeks is more than enough for a hot DFW market. Risk: losing hot-market timing if you wait too long. Track market weekly.',
      schedule: [
        { week: 'Weeks 1–2', action: 'Declutter, storage, pre-inspection', priority: '🟡 High' },
        { week: 'Weeks 3–4', action: 'Repairs, paint, updates', priority: '🔴 Critical' },
        { week: 'Weeks 5–6', action: 'Staging, accessories, lighting', priority: '🟡 High' },
        { week: 'Week 7', action: 'Final prep and practice showings (invite a friend to critique)', priority: '🟡 High' },
        { week: 'Week 8', action: 'Photography and list', priority: '🔴 Critical' },
      ],
      restageThreshold: 'With 8 weeks of prep, home should photograph excellently. No restage needed if process followed.',
      seasonalNote: 'Check DFW market status monthly during prep — a hot market in Feb may be balanced by April. Adjust listing date accordingly.',
    },
    balanced: {
      stagingStart: 'Week 1 — structured approach',
      photographyDate: 'Day 52–54',
      listingDate: 'Day 55 (Thursday)',
      dfwMarketNote: 'Eight weeks in a balanced DFW market allows for renovations that pay back. This is the ideal timeline if budget allows minor updates.',
      schedule: [
        { week: 'Weeks 1–2', action: 'Declutter, storage, pre-inspection', priority: '🟡 High' },
        { week: 'Weeks 3–5', action: 'Repairs, paint, kitchen/bath hardware, light fixtures', priority: '🔴 Critical' },
        { week: 'Weeks 6–7', action: 'Staging and final touches', priority: '🟡 High' },
        { week: 'Week 8', action: 'Photography and list Thursday', priority: '🔴 Critical' },
      ],
      restageThreshold: 'If no offers in 30 days, complete restage and price review simultaneously.',
      seasonalNote: 'Target spring DFW market: list Feb 20–March 15 for maximum buyer pool.',
    },
    slow: {
      stagingStart: 'Week 1 — use all 8 weeks productively',
      photographyDate: 'Day 50–54',
      listingDate: 'Day 55 — time to coincide with spring market if possible',
      dfwMarketNote: 'Eight weeks in a slow market = opportunity to wait for better timing. Consider whether listing in spring changes the calculus.',
      schedule: [
        { week: 'Weeks 1–3', action: 'Declutter, pre-inspection, repairs', priority: '🔴 Critical' },
        { week: 'Weeks 4–6', action: 'Updates, paint, staging', priority: '🟡 High' },
        { week: 'Week 7', action: 'Professional staging and photography prep', priority: '🟡 High' },
        { week: 'Week 8', action: 'Photography, list Thursday of best DFW market week', priority: '🔴 Critical' },
      ],
      restageThreshold: 'In slow market, plan restage at 30 days proactively — have it budgeted before you list.',
      seasonalNote: 'If listing in DFW slow season (Jul, Aug, Dec), consider delaying to Feb–March spring market. The wait typically returns $5,000–20,000 more depending on price point.',
    },
  },
  flexible: {
    hot: {
      stagingStart: 'Target spring DFW market: begin prep January 15–February 1',
      photographyDate: 'February 20–28',
      listingDate: 'March 1–15 (peak DFW spring market)',
      dfwMarketNote: 'If your timeline is flexible, spring is your power move in DFW. March 1–April 15 is historically the highest-demand window.',
      schedule: [
        { week: 'January', action: 'Declutter, deep clean, repairs, storage setup', priority: '🔴 Critical' },
        { week: 'Late January', action: 'Staging, accessories, lighting upgrades', priority: '🟡 High' },
        { week: 'Feb 15–20', action: 'Final prep, deep clean, photography prep', priority: '🟡 High' },
        { week: 'Feb 22–28', action: 'Professional photography', priority: '🔴 Critical' },
        { week: 'March 1–7', action: 'List Thursday — target first Thursday in March', priority: '🔴 Critical' },
      ],
      restageThreshold: 'Spring DFW hot market: no offer in 7–10 days = price issue, not staging. Consult agent immediately.',
      seasonalNote: 'DFW spring market: Late Feb to mid-April is when the most buyers are actively shopping. This is the window to target above all others.',
    },
    balanced: {
      stagingStart: 'January for spring, or August for fall market',
      photographyDate: '2–3 weeks before target list date',
      listingDate: 'March 1–April 15 or September 15–October 31',
      dfwMarketNote: 'DFW has two strong selling seasons: spring (Feb–April) and fall (Sept–Oct). Choose your season based on readiness.',
      schedule: [
        { week: '6 weeks out', action: 'Declutter, storage, pre-inspection', priority: '🔴 Critical' },
        { week: '4 weeks out', action: 'Repairs, updates, paint', priority: '🔴 Critical' },
        { week: '2 weeks out', action: 'Staging and polish', priority: '🟡 High' },
        { week: '1 week out', action: 'Photography', priority: '🔴 Critical' },
        { week: 'Target Thursday', action: 'Go live', priority: '🔴 Critical' },
      ],
      restageThreshold: 'With flexible timeline, if first season fails, restage for second season (spring to fall or vice versa) rather than reducing price.',
      seasonalNote: 'DFW fall market (Sept–Oct) is underrated — less competition, serious buyers only. Spring gets more traffic; fall gets more serious buyers.',
    },
    slow: {
      stagingStart: 'Plan for spring market — do not list in slow season with a flexible timeline',
      photographyDate: 'Late February',
      listingDate: 'March 1–10',
      dfwMarketNote: 'If you have a flexible timeline and DFW is slow, WAIT. The spring market will return $5,000–25,000 more for properly staged homes.',
      schedule: [
        { week: 'Nov–Dec', action: 'Declutter and plan — do not rush into holiday/winter market', priority: '🟡 High' },
        { week: 'January', action: 'Repairs, paint, updates with spring in sight', priority: '🔴 Critical' },
        { week: 'Feb 1–15', action: 'Staging and accessory purchasing', priority: '🟡 High' },
        { week: 'Feb 20–25', action: 'Photography', priority: '🔴 Critical' },
        { week: 'March 1', action: 'List into spring market', priority: '🔴 Critical' },
      ],
      restageThreshold: 'With proper spring timing, restage should not be needed. If still unsold after 30 spring days, pricing is the issue.',
      seasonalNote: 'Never list a DFW home in December or August if you have the option to wait. The timing premium for spring is real and significant.',
    },
  },
};

export default function DFWStagingTimingGuide() {
  const [timeline, setTimeline] = useState<TimelineKey | ''>('');
  const [market, setMarket] = useState<MarketKey | ''>('');
  const result = timeline && market ? timingPlans[timeline]?.[market] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 36 }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Staging Timing Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>When you list matters as much as how you stage. DFW has clear seasonal windows — here's exactly how to time your staging, photography, and listing date for maximum results.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗓️ DFW Seasonal Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['🌸 Spring (Feb–April): Peak season. Most buyers, most competition, highest prices. List by March 15 for best results.', '#F0FDF4'],
              ['☀️ Summer (May–Aug): Slower. Buyers exist but options are down. If you must list, price sharp and stage perfectly.', '#FEFCE8'],
              ['🍂 Fall (Sept–Oct): Second best window. Serious buyers, less competition than spring. Underrated timing.', '#FEF3C7'],
              ['❄️ Winter (Nov–Jan): Avoid if possible. Motivated buyers only. January late-month can catch spring early movers.', '#FEF2F2'],
            ].map(([tip, bg], i) => (
              <div key={i} style={{ backgroundColor: bg, borderRadius: 8, padding: 12, border: '1px solid #E2E8F0' }}>
                <p style={{ color: '#374151', fontSize: 13, margin: 0 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your Timing Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>Listing Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value as TimelineKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="immediate">Immediate (within 2 weeks)</option>
                <option value="four-weeks">4 weeks out</option>
                <option value="eight-weeks">8 weeks out</option>
                <option value="flexible">Flexible timeline</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#374151', fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>DFW Market Conditions</label>
              <select value={market} onChange={e => setMarket(e.target.value as MarketKey)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="hot">Hot (homes selling in 1–2 weeks)</option>
                <option value="balanced">Balanced (homes selling in 3–5 weeks)</option>
                <option value="slow">Slow (homes selling in 6+ weeks)</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {[['🏠 Start Staging', result.stagingStart], ['📸 Photography', result.photographyDate], ['🚀 List Date', result.listingDate]].map(([label, val]) => (
                  <div key={label as string} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: 14, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ color: '#64748B', fontSize: 12, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 13 }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>🤠 DFW Market Note</div>
                <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.dfwMarketNote}</div>
              </div>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#1D4ED8', fontWeight: 700, marginBottom: 12 }}>📋 Your Week-by-Week Schedule</div>
                {result.schedule.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{ backgroundColor: '#DBEAFE', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, color: '#1E40AF', whiteSpace: 'nowrap', minWidth: 90 }}>{s.week}</div>
                    <div style={{ flex: 1, color: '#374151', fontSize: 13 }}>{s.action}</div>
                    <div style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{s.priority}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 14, border: '1px solid #FDE047' }}>
                  <div style={{ color: '#713F12', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔄 When to Re-Stage</div>
                  <div style={{ color: '#374151', fontSize: 12 }}>{result.restageThreshold}</div>
                </div>
                <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#15803D', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🌡️ Seasonal Strategy</div>
                  <div style={{ color: '#374151', fontSize: 12 }}>{result.seasonalNote}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, margin: '0 0 4px' }}>🏆 The DFW Golden Rule</p>
          <p style={{ color: '#CBD5E1', fontSize: 13, margin: 0 }}>List on Thursday. DFW buyers browse Thursday evening, schedule tours Friday–Saturday, and submit offers Sunday. A Thursday listing captures a full first-weekend buying cycle.</p>
        </div>
      </div>
    </div>
  );
}
