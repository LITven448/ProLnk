import { useState } from 'react';

const GOALS = [
  'Buy at the lowest price possible',
  'Sell for the highest price possible',
  'Buy with the best selection of homes',
  'Sell fastest (minimize days on market)',
];

type SeasonResult = {
  bestMonths: string;
  whyItWorks: string;
  tradeoffs: string;
  tips: string[];
};

const goalResults: Record<string, SeasonResult> = {
  'Buy at the lowest price possible': {
    bestMonths: 'August — October',
    whyItWorks: 'DFW\’s slowest season. Sellers who listed in spring and didn\’t sell are motivated. Fewer competing buyers. Back-to-school mindset kills buyer traffic — use it to your advantage.',
    tradeoffs: 'Less inventory to choose from. Best homes sold in spring. You may be shopping second-tier selection but getting first-tier deals.',
    tips: ['Target listings with 30+ DOM in August — sellers are tired', 'Ask for closing cost assistance more freely off-season', 'Rate locks often easier to get in fall (less volume)', 'December closings can mean motivated sellers wanting year-end tax benefits'],
  },
  'Sell for the highest price possible': {
    bestMonths: 'March — May',
    whyItWorks: 'DFW\’s peak buying season aligns with families planning before school year. Relocation buyers from corporate moves arrive Jan-March. Inventory demand spikes before spring listings flood market.',
    tradeoffs: 'More competition from other sellers listing at same time. Homes need to stand out. Buyer pool is large but also more selective.',
    tips: ['List by March 1 to capture first wave before competition floods', 'Stage aggressively — spring buyers have seen more homes', 'New construction competing in Frisco/Prosper means pricing precision matters', 'April-May closings typically net 3-5% more than October-December closings'],
  },
  'Buy with the best selection of homes': {
    bestMonths: 'April — June',
    whyItWorks: 'Peak listing season in DFW. Most homes come to market Feb-June. You\’ll see more variety, more price points, more neighborhoods. Competition is higher but selection is unmatched.',
    tradeoffs: 'Multiple offer situations are common. You\’ll pay closer to or above list price. Fast decisions required.',
    tips: ['Get pre-underwritten (not just pre-approved) to move fast', 'Set Zillow/Realtor.com alerts — new listings move in 48-72 hours', 'View new listings same day they go live in hot corridors', 'Escalation clauses are standard in April-June DFW'],
  },
  'Sell fastest (minimize days on market)': {
    bestMonths: 'February — April',
    whyItWorks: 'Early spring buyers are the most motivated — they\’ve been waiting all winter and are ready to move. List before the spring inventory wave arrives and you\’ll face less competition with maximum demand.',
    tradeoffs: 'Weather can be unpredictable in February. Fewer total buyers than April-May but buyers in market are serious.',
    tips: ['List the first Thursday of February if ready — early mover advantage is real', 'Homes listed Feb 1-15 often see the fastest sales with least contingencies', 'Price to sell in 7 days, not to maximize — fast sale reduces carrying costs', 'Texas school year starts in August — families need to close by July 31 to enroll'],
  },
};

const SEASONAL_DATA = [
  { month: 'Jan', activity: 35, label: 'Slow start', color: '#2D4A6B' },
  { month: 'Feb', activity: 60, label: 'Heating up', color: '#3D6B8A' },
  { month: 'Mar', activity: 85, label: 'Hot', color: '#F5E642′ },
  { month: 'Apr', activity: 100, label: 'Peak', color: '#F5E642′ },
  { month: 'May', activity: 95, label: 'Peak', color: '#F5E642′ },
  { month: 'Jun', activity: 80, label: 'Strong', color: '#4A8A9B' },
  { month: 'Jul', activity: 65, label: 'Fading', color: '#2D4A6B' },
  { month: 'Aug', activity: 45, label: 'Quiet', color: '#1E3A5F' },
  { month: 'Sep', activity: 50, label: 'Some life', color: '#2D4A6B' },
  { month: 'Oct', activity: 55, label: 'Moderate', color: '#2D4A6B' },
  { month: 'Nov', activity: 40, label: 'Slowing', color: '#1E3A5F' },
  { month: 'Dec', activity: 30, label: 'Slow', color: '#1E3A5F' },
];

export default function DFWSeasonalMarketGuide() {
  const [goal, setGoal] = useState('');

  const result = goal ? goalResults[goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          📅 DFW Real Estate Intelligence
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          DFW Seasonal Market Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Timing your move in DFW can save or earn you thousands. The Texas school year, corporate relocation cycles, and migration patterns create predictable seasonal rhythms — different from northern markets.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📊 DFW Market Activity by Month</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120, marginBottom: 8 }}>
            {SEASONAL_DATA.map(({ month, activity, color }) => (
              <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', background: color, borderRadius: '4px 4px 0 0', height: `${activity}%`, transition: 'height 0.3s' }} />
                <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600 }}>{month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, background: '#F5E642', borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: '#94A3B8′ }}>Peak season (Feb-June)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, background: '#1E3A5F', borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: '#94A3B8′ }}>Off-season (Aug-Jan)</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏫 How Texas Schools Differ from Northern Markets</h2>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginBottom: 0 }}>
            Texas schools start in early August — 2-3 weeks earlier than most northern states. This compresses the peak buying window. Families need to close by <strong style={{ color: '#E8EDF5′ }}>late July</strong> to enroll before school starts, which creates a hard deadline that accelerates May-June demand. Unlike Chicago or New York where fall remains active, DFW August is notably quieter as families shift focus to school-year logistics.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🎯 Find Your Best Months</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>What's your primary goal?</label>
            <select value={goal} onChange={e => setGoal(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '12px 14px', fontSize: 14 }}>
              <option value="">Select your goal...</option>
              {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ background: '#F5E642', borderRadius: 8, padding: 14, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#0A1628', fontWeight: 700, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Best Months for Your Goal</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#0A1628′ }}>{result.bestMonths}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Why It Works</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.6 }}>{result.whyItWorks}</div>
              </div>
              <div style={{ marginBottom: 16, padding: 12, background: '#0F2040', borderRadius: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 6 }}>⚖️ Tradeoffs to Know</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{result.tradeoffs}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>✅ Seasonal Action Tips</div>
                {result.tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: '#F5E642', fontSize: 16 }}>→</span>
                    <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
