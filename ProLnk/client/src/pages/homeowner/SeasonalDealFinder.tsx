import { useState } from 'react';
import HomeownerLayout from '@/layouts/HomeownerLayout';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Tier = 'best' | 'ok' | 'bad';

interface TradeSeason {
  trade: string;
  best: string;
  worst: string;
  grid: Tier[];
}

const tradeSeasons: TradeSeason[] = [
  {
    trade: 'HVAC',
    best: 'Oct – Nov',
    worst: 'May – Aug',
    grid: ['ok','ok','ok','bad','bad','bad','bad','bad','ok','best','best','ok'],
  },
  {
    trade: 'Roofing',
    best: 'Oct – Nov',
    worst: 'Apr – Jun',
    grid: ['ok','ok','ok','bad','bad','bad','ok','ok','ok','best','best','ok'],
  },
  {
    trade: 'Foundation',
    best: 'Jan – Feb',
    worst: 'Apr – Jun',
    grid: ['best','best','ok','bad','bad','bad','ok','ok','ok','ok','ok','ok'],
  },
  {
    trade: 'Landscaping',
    best: 'Nov – Feb',
    worst: 'Apr – Jun',
    grid: ['best','best','ok','bad','bad','bad','ok','ok','ok','ok','best','best'],
  },
  {
    trade: 'Plumbing',
    best: 'Jan – Mar',
    worst: 'Dec (emergency)',
    grid: ['best','best','best','ok','ok','ok','ok','ok','ok','ok','ok','bad'],
  },
  {
    trade: 'Electrical',
    best: 'Feb – Apr',
    worst: 'Nov – Dec',
    grid: ['ok','best','best','best','ok','ok','ok','ok','ok','ok','bad','bad'],
  },
  {
    trade: 'Painting (Interior)',
    best: 'Jan – Mar',
    worst: 'Jun – Aug',
    grid: ['best','best','best','ok','ok','bad','bad','bad','ok','ok','ok','ok'],
  },
  {
    trade: 'Painting (Exterior)',
    best: 'Mar – May',
    worst: 'Jul – Aug & Dec',
    grid: ['ok','ok','best','best','best','ok','bad','bad','ok','ok','ok','bad'],
  },
];

const tierStyle: Record<Tier, { bg: string; label: string }> = {
  best: { bg: '#10B981', label: 'Best' },
  ok:   { bg: '#F59E0B', label: 'OK' },
  bad:  { bg: '#EF4444', label: 'High' },
};

const CURRENT_MONTH = new Date().getMonth();

interface Alert {
  trade: string;
  price: string;
}

export default function SeasonalDealFinder() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertTrade, setAlertTrade] = useState('');
  const [alertPrice, setAlertPrice] = useState('');

  const addAlert = () => {
    if (!alertTrade || !alertPrice) return;
    setAlerts(prev => [...prev, { trade: alertTrade, price: alertPrice }]);
    setAlertTrade('');
    setAlertPrice('');
  };

  const currentHvac = tradeSeasons[0].grid[CURRENT_MONTH];

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-12″>
        <div className="max-w-5xl mx-auto">

          <div className="mb-10″>
            <h1 className="text-4xl font-bold text-white mb-2″>Seasonal Deal Finder</h1>
            <p className="text-[#64B5F6] text-lg">Save $2,000+ by booking at the right time</p>
          </div>

          <div
            className="rounded-2xl p-6 mb-10 border"
            style={{
              background: currentHvac === 'bad' ? '#EF4444'/10 : '#10B981'/10,
              borderColor: currentHvac === 'bad' ? '#EF4444′ : '#10B981',
              backgroundColor: currentHvac === 'bad' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
            }}
          >
            <div className="text-sm uppercase tracking-widest text-gray-400 mb-2″>
              Current Month — {MONTHS[CURRENT_MONTH]}
            </div>
            <p className="text-white font-medium text-base">
              {currentHvac === 'bad'
                ? 'HVAC tune-ups are at peak pricing. Wait until October to save 20–30% on service calls.'
                : currentHvac === 'best'
                ? 'Great time to book HVAC and roofing — off-season pricing means lower rates and faster scheduling.'
                : 'Moderate pricing across most trades. Foundation and landscaping have good deals right now.'}
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-2″>12-Month Pricing Calendar</h2>
          <div className="flex gap-4 text-xs text-gray-400 mb-5″>
            {Object.entries(tierStyle).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1″>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: v.bg }} />
                {v.label} pricing
              </span>
            ))}
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-4 mb-10 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="text-left text-xs text-gray-500 font-normal pb-3 pr-4 w-40″>Trade</th>
                  {MONTHS.map((m, i) => (
                    <th
                      key={m}
                      className="text-center text-xs pb-3 font-normal"
                      style={{ color: i === CURRENT_MONTH ? '#64B5F6′ : '#6B7280' }}
                    >
                      {i === CURRENT_MONTH ? <strong>{m}</strong> : m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tradeSeasons.map(ts => (
                  <tr key={ts.trade} className="border-t border-[#1E3A5F]/50″>
                    <td className="text-sm text-gray-300 py-2 pr-4″>{ts.trade}</td>
                    {ts.grid.map((tier, i) => (
                      <td key={i} className="py-2 text-center">
                        <div
                          className="w-5 h-5 rounded mx-auto"
                          style={{
                            backgroundColor: tierStyle[tier].bg,
                            opacity: i === CURRENT_MONTH ? 1 : 0.7,
                            outline: i === CURRENT_MONTH ? `2px solid ${tierStyle[tier].bg}` : 'none',
                            outlineOffset: 2,
                          }}
                          title={`${ts.trade} in ${MONTHS[i]}: ${tierStyle[tier].label} pricing`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-6″>Best Months to Book by Trade</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10″>
            {tradeSeasons.map(ts => (
              <div key={ts.trade} className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-4″>
                <div className="font-semibold text-white mb-2″>{ts.trade}</div>
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-[#10B981] font-medium">Best: </span>
                    <span className="text-gray-300″>{ts.best}</span>
                  </div>
                  <div>
                    <span className="text-[#EF4444] font-medium">Avoid: </span>
                    <span className="text-gray-300″>{ts.worst}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0D1F3C] border border-[#2D6A4F] rounded-2xl p-6 mb-8″>
            <h2 className="text-xl font-semibold text-white mb-2″>Group Buying</h2>
            <p className="text-gray-400 text-sm mb-4″>
              When <strong className="text-white">5+ neighbors</strong> book the same service, TrustyPro
              negotiates group pricing — average{' '}
              <span className="text-[#10B981] font-semibold">15–25% discount</span> for everyone.
              Share your booking link with your neighbors and let us handle the rest.
            </p>
            <a
              href="/trustypro/book"
              className="inline-block border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Start a Group Booking
            </a>
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-10″>
            <h2 className="text-xl font-semibold text-white mb-4″>Set a Price Alert</h2>
            <p className="text-gray-400 text-sm mb-5″>
              Tell us what you want and your target price — we'll notify you when pros are offering
              those rates in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4″>
              <select
                value={alertTrade}
                onChange={e => setAlertTrade(e.target.value)}
                className="bg-[#0A1628] border border-[#2D4A6B] rounded-xl px-4 py-2 text-white text-sm flex-1 focus:outline-none focus:border-[#64B5F6]"
              >
                <option value="">Select trade...</option>
                {tradeSeasons.map(ts => (
                  <option key={ts.trade} value={ts.trade}>{ts.trade}</option>
                ))}
              </select>
              <div className="flex items-center gap-2″>
                <span className="text-gray-400″>$</span>
                <input
                  type="number"
                  placeholder="Target price"
                  value={alertPrice}
                  onChange={e => setAlertPrice(e.target.value)}
                  className="bg-[#0A1628] border border-[#2D4A6B] rounded-xl px-4 py-2 text-white text-sm w-36 focus:outline-none focus:border-[#64B5F6]"
                />
              </div>
              <button
                onClick={addAlert}
                className="bg-[#1E3A5F] hover:bg-[#2D4A6B] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors whitespace-nowrap"
              >
                Add Alert
              </button>
            </div>
            {alerts.length > 0 && (
              <div className="space-y-2″>
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0A1628] rounded-lg px-4 py-2 text-sm">
                    <span className="text-[#10B981]">✓</span>
                    <span className="text-gray-300″>{a.trade}</span>
                    <span className="text-gray-500″>—</span>
                    <span className="text-white font-medium">${Number(a.price).toLocaleString()} target</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-[#0D1F3C] to-[#1E3A5F] border border-[#2D4A6B] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3″>Find Deals in Your ZIP</h3>
            <p className="text-gray-400 mb-6 text-sm max-w-lg mx-auto">
              Enter your ZIP code and we'll surface the best-priced verified pros in your area
              right now — no haggling, no surprises.
            </p>
            <a
              href="/trustypro/book"
              className="inline-block bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Find Deals Near Me
            </a>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
