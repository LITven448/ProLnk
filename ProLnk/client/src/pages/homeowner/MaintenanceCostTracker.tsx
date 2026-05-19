import { useState, useEffect } from 'react';
import HomeownerLayout from '@/layouts/HomeownerLayout';

interface LineItem {
  label: string;
  key: string;
  default: number;
  auto?: boolean;
}

const lineItems: LineItem[] = [
  { label: 'HVAC Service', key: 'hvac', default: 150 },
  { label: 'Pest Control', key: 'pest', default: 480 },
  { label: 'Lawn / Landscaping', key: 'lawn', default: 1200 },
  { label: 'Gutter Cleaning', key: 'gutters', default: 200 },
  { label: 'Pool Service (if applicable)', key: 'pool', default: 0 },
  { label: 'Roof Inspection', key: 'roof', default: 200 },
  { label: 'Plumbing Inspection', key: 'plumbing', default: 150 },
];

const DFW_AVG = 4200;

const BAR_COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

export default function MaintenanceCostTracker() {
  const [homeValue, setHomeValue] = useState<string>('350000');
  const [costs, setCosts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    lineItems.forEach(li => { init[li.key] = String(li.default); });
    return init;
  });
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const miscRule = Math.round((Number(homeValue.replace(/,/g, '')) || 0) * 0.05);
  const lineTotal = lineItems.reduce((sum, li) => sum + (Number(costs[li.key]) || 0), 0);
  const total = lineTotal + miscRule;
  const onePercent = Math.round((Number(homeValue.replace(/,/g, '')) || 0) * 0.01);

  const fiveYearData = Array.from({ length: 5 }, (_, i) => ({
    year: new Date().getFullYear() + i,
    value: total * (1 + i * 0.03),
  }));
  const maxBar = Math.max(...fiveYearData.map(d => d.value), 1);

  const updateCost = (key: string, val: string) => {
    setCosts(prev => ({ ...prev, [key]: val }));
  };

  const saveNote = () => {
    localStorage.setItem('prolnk_maintenance_note', note);
    localStorage.setItem('prolnk_maintenance_total', String(total));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  useEffect(() => {
    const savedNote = localStorage.getItem('prolnk_maintenance_note');
    if (savedNote) setNote(savedNote);
  }, []);

  const fmt = (n: number) =>
    '$' + Math.round(n).toLocaleString();

  const diff = total - DFW_AVG;
  const diffLabel = diff > 0 ? `$${Math.abs(diff).toLocaleString()} above` : `$${Math.abs(diff).toLocaleString()} below`;
  const diffColor = diff > 200 ? '#EF4444′ : diff < -200 ? '#F59E0B' : '#10B981';

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white px-4 py-12″>
        <div className="max-w-4xl mx-auto">

          <div className="mb-10″>
            <h1 className="text-4xl font-bold text-white mb-2″>Maintenance Cost Tracker</h1>
            <p className="text-[#64B5F6] text-lg">Know exactly what your home costs to maintain</p>
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-8″>
            <label className="block text-sm text-gray-400 mb-2″>Estimated Home Value</label>
            <div className="flex items-center gap-3″>
              <span className="text-gray-400 text-xl">$</span>
              <input
                type="number"
                value={homeValue}
                onChange={e => setHomeValue(e.target.value)}
                className="bg-[#0A1628] border border-[#2D4A6B] rounded-xl px-4 py-2 text-white text-xl font-semibold w-48 focus:outline-none focus:border-[#64B5F6]"
              />
              <span className="text-gray-500 text-sm">
                → 1% rule budget: <span className="text-white font-semibold">{fmt(onePercent)}/yr</span>
              </span>
            </div>
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-8″>
            <h2 className="text-xl font-semibold text-white mb-5″>Annual Maintenance by Category</h2>
            <div className="space-y-4″>
              {lineItems.map(li => (
                <div key={li.key} className="flex items-center justify-between gap-4″>
                  <span className="text-gray-300 text-sm flex-1″>{li.label}</span>
                  <div className="flex items-center gap-2″>
                    <span className="text-gray-500″>$</span>
                    <input
                      type="number"
                      value={costs[li.key]}
                      onChange={e => updateCost(li.key, e.target.value)}
                      className="bg-[#0A1628] border border-[#2D4A6B] rounded-lg px-3 py-1.5 text-white text-sm w-28 text-right focus:outline-none focus:border-[#64B5F6]"
                    />
                    <span className="text-gray-500 text-sm w-6″>/yr</span>
                  </div>
                </div>
              ))}

              <div className="border-t border-[#1E3A5F] pt-4 flex items-center justify-between gap-4″>
                <div>
                  <span className="text-gray-300 text-sm">Misc Repairs (5% of home value)</span>
                  <span className="block text-xs text-gray-500″>Auto-calculated from home value above</span>
                </div>
                <div className="flex items-center gap-2″>
                  <span className="text-gray-500″>$</span>
                  <div className="bg-[#1E3A5F] rounded-lg px-3 py-1.5 text-white text-sm w-28 text-right">
                    {miscRule.toLocaleString()}
                  </div>
                  <span className="text-gray-500 text-sm w-6″>/yr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8″>
            <div className="bg-[#0D1F3C] border border-[#64B5F6]/30 rounded-2xl p-6 text-center">
              <div className="text-[#64B5F6] text-sm uppercase tracking-widest mb-2″>Your Total</div>
              <div className="text-3xl font-bold text-white">{fmt(total)}</div>
              <div className="text-gray-500 text-xs mt-1″>per year</div>
            </div>
            <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 text-center">
              <div className="text-gray-400 text-sm uppercase tracking-widest mb-2″>1% Rule Budget</div>
              <div className="text-3xl font-bold text-white">{fmt(onePercent)}</div>
              <div className="text-gray-500 text-xs mt-1″>recommended</div>
            </div>
            <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 text-center">
              <div className="text-gray-400 text-sm uppercase tracking-widest mb-2″>DFW Average</div>
              <div className="text-3xl font-bold text-white">{fmt(DFW_AVG)}</div>
              <div className="text-xs mt-1″ style={{ color: diffColor }}>
                You are {diffLabel} avg
              </div>
            </div>
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-8″>
            <h2 className="text-xl font-semibold text-white mb-6″>5-Year Projection</h2>
            <div className="flex items-end gap-4 h-40″>
              {fiveYearData.map((d, i) => (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-2″>
                  <span className="text-xs text-gray-400″>{fmt(d.value)}</span>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(d.value / maxBar) * 120}px`,
                      backgroundColor: BAR_COLORS[i],
                    }}
                  />
                  <span className="text-xs text-gray-500″>{d.year}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4″>Assumes 3% annual cost increase.</p>
          </div>

          <div className="bg-[#0D1F3C] border border-[#1E3A5F] rounded-2xl p-6 mb-8″>
            <h2 className="text-lg font-semibold text-white mb-3″>Save a Note</h2>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add notes about your home, planned repairs, warranties..."
              className="w-full bg-[#0A1628] border border-[#2D4A6B] rounded-xl p-3 text-white text-sm resize-none h-24 focus:outline-none focus:border-[#64B5F6]"
            />
            <button
              onClick={saveNote}
              className="mt-3 bg-[#1E3A5F] hover:bg-[#2D4A6B] text-white text-sm px-5 py-2 rounded-lg transition-colors"
            >
              {saved ? '✓ Saved locally' : 'Save to browser'}
            </button>
          </div>

          <div className="bg-gradient-to-r from-[#0D1F3C] to-[#1E3A5F] border border-[#2D6A4F] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3″>Schedule This Year's Maintenance</h3>
            <p className="text-gray-400 mb-6 text-sm max-w-lg mx-auto">
              Connect with verified pros for every item on your list. TrustyPro handles scheduling,
              reminders, and price transparency — so nothing falls through the cracks.
            </p>
            <a
              href="/trustypro/book"
              className="inline-block bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Schedule Maintenance
            </a>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
