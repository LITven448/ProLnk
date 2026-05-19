import { useState } from 'react';
import HomeownerLayout from '../../components/layouts/HomeownerLayout';

const checklist = [
  {
    id: 'thermostat',
    label: 'Programmable / Smart Thermostat',
    savings: 180,
    detail: 'Set 68°F while home, 62°F while away/sleeping. Smart thermostats learn your schedule automatically.',
  },
  {
    id: 'insulation',
    label: 'Attic Insulation R-38+',
    savings: 420,
    detail: 'The #1 DFW energy issue. Most 1980s–2000s homes have R-19 or less. Adding blown-in insulation costs $1,200–$2,500 and pays back in 3–4 years.',
  },
  {
    id: 'ducts',
    label: 'Duct Sealing',
    savings: 280,
    detail: 'DFW homes lose 20–30% of heated/cooled air through duct leaks in attics. Mastic sealant applied by an HVAC pro costs $300–$800.',
  },
  {
    id: 'weatherstrip',
    label: 'Window Weatherstripping',
    savings: 120,
    detail: 'Check by holding a lighter near window edges on a cold day. Visible flicker = heat loss. Self-adhesive foam strip costs $20 per window.',
  },
  {
    id: 'pipes',
    label: 'Pipe Insulation (Prevent Freezes)',
    savings: 0,
    burst: 5000,
    detail: 'Foam pipe insulation on exposed pipes in garage, attic, and crawlspace costs $40 total. Prevents $5,000–$15,000 in burst-pipe damage. Non-negotiable after Uri.',
  },
  {
    id: 'fans',
    label: 'Ceiling Fans Reversed (Clockwise / Winter Mode)',
    savings: 60,
    detail: 'Warm air rises. Running fans clockwise at low speed pushes warm air down. Works best in rooms with high ceilings. Free to do — find the switch on the fan motor.',
  },
];

const generatorSizes = [
  { sqft: '1,000–1,500', size: '5,000–7,500W', fuel: 'Dual-fuel recommended', cost: '$600–$900′ },
  { sqft: '1,500–2,500', size: '7,500–10,000W', fuel: 'Propane standby ideal', cost: '$900–$2,500′ },
  { sqft: '2,500–4,000', size: '10,000–14,000W', fuel: 'Natural gas or propane standby', cost: '$2,500–$5,000′ },
  { sqft: '4,000+', size: '14,000–22,000W', fuel: 'Automatic standby generator', cost: '$5,000–$12,000′ },
];

function calcHeatingCost(sqft: number, insulationGood: boolean): number {
  const base = sqft * 0.18;
  return insulationGood ? Math.round(base * 0.65) : Math.round(base);
}

export default function WinterEnergyGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [sqft, setSqft] = useState(2000);
  const [goodInsulation, setGoodInsulation] = useState(false);

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalSavings = checklist
    .filter((item) => checked[item.id])
    .reduce((acc, item) => acc + item.savings, 0);

  const estimatedBill = calcHeatingCost(sqft, goodInsulation);

  return (
    <HomeownerLayout>
      <div className="min-h-screen" style={{ background: '#0A1628', color: '#F8FAFC' }}>
        <div className="max-w-4xl mx-auto px-4 py-12″>

          {/* Header */}
          <div className="mb-10″>
            <div className="inline-block bg-blue-900 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Homeowner Guide
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              DFW Winter Energy Guide
            </h1>
            <p className="text-lg text-blue-200″>
              Stay Warm Without the $800 Bill — and Survive the Next Freeze
            </p>
          </div>

          {/* Uri Warning */}
          <div
            className="rounded-2xl p-5 mb-10″
            style={{ background: '#1E1020', border: '1px solid #7C3AED' }}
          >
            <div className="flex items-start gap-4″>
              <div className="text-3xl">⚠️</div>
              <div>
                <h2 className="text-lg font-bold text-purple-300 mb-2″>
                  The Uri 2021 Lesson — 246 Texans Died
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  February 2021: temperatures dropped to 0°F across DFW. The grid failed for 4 days.
                  246 Texans died — from hypothermia, carbon monoxide poisoning, house fires.
                  Most of those deaths were preventable with basic preparation: insulated pipes,
                  a backup heat source, and enough stored water. DFW winters are mild 95% of the time.
                  But you must be prepared for the other 5%.
                </p>
              </div>
            </div>
          </div>

          {/* Energy Cost Calculator */}
          <div className="rounded-2xl p-6 mb-8″ style={{ background: '#0F2340' }}>
            <h2 className="text-xl font-bold text-white mb-4″>Monthly Heating Cost Estimator</h2>
            <div className="grid md:grid-cols-2 gap-6″>
              <div>
                <label className="block text-sm text-blue-300 mb-2″>
                  Home Size: {sqft.toLocaleString()} sq ft
                </label>
                <input
                  type="range"
                  min={800}
                  max={5000}
                  step={100}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1″>
                  <span>800 sqft</span>
                  <span>5,000 sqft</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-blue-300 mb-3″>Attic Insulation</label>
                <div className="flex gap-3″>
                  <button
                    onClick={() => setGoodInsulation(false)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: !goodInsulation ? '#DC2626′ : '#1E3A5F',
                      color: '#fff',
                    }}
                  >
                    Under R-30
                  </button>
                  <button
                    onClick={() => setGoodInsulation(true)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: goodInsulation ? '#059669′ : '#1E3A5F',
                      color: '#fff',
                    }}
                  >
                    R-38 or Better
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <div className="text-5xl font-bold text-white">${estimatedBill}</div>
              <div className="text-blue-300 mt-1″>Estimated monthly heating cost</div>
              {!goodInsulation && (
                <div className="text-yellow-400 text-sm mt-2″>
                  Upgrading to R-38+ insulation could save you ~${Math.round(estimatedBill * 0.35)}/month
                </div>
              )}
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="mb-8″>
            <div className="flex items-center justify-between mb-4″>
              <h2 className="text-xl font-bold text-white">Energy-Saving Checklist</h2>
              {totalSavings > 0 && (
                <div className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                  ${totalSavings}/yr in selected savings
                </div>
              )}
            </div>
            <div className="space-y-3″>
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="rounded-xl p-4 cursor-pointer transition-all"
                  style={{
                    background: checked[item.id] ? '#0A2E1A' : '#0F2340',
                    border: `1px solid ${checked[item.id] ? '#059669' : '#1E3A5F'}`,
                  }}
                >
                  <div className="flex items-start gap-3″>
                    <div
                      className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center mt-0.5 transition-all"
                      style={{
                        background: checked[item.id] ? '#059669′ : ’transparent',
                        border: `2px solid ${checked[item.id] ? '#059669' : '#4B6A8A'}`,
                      }}
                    >
                      {checked[item.id] && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1″>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{item.label}</span>
                        <div className="text-right">
                          {item.savings > 0 && (
                            <span className="text-green-400 text-sm font-medium">${item.savings}/yr saved</span>
                          )}
                          {item.burst && (
                            <span className="text-yellow-400 text-sm font-medium">
                              Prevents ${item.burst.toLocaleString()}+ damage
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1″>{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generator Guide */}
          <div className="rounded-2xl p-6 mb-8″ style={{ background: '#0F2340' }}>
            <h2 className="text-xl font-bold text-white mb-2″>Generator Planning for DFW Homes</h2>
            <p className="text-sm text-blue-300 mb-4″>
              Portable generators kept 12,000+ DFW families warm during Uri. Know what size you need before the next freeze.
            </p>
            <div className="space-y-2″>
              {generatorSizes.map((g, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 text-sm py-2 border-b border-blue-900 last:border-0″>
                  <span className="text-gray-400″>{g.sqft} sqft</span>
                  <span className="text-white font-medium">{g.size}</span>
                  <span className="text-blue-300″>{g.fuel}</span>
                  <span className="text-yellow-400 text-right">{g.cost}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3″>
              Never run a generator indoors or in attached garage. Carbon monoxide kills within minutes.
              Always operate 20+ feet from windows and doors.
            </p>
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0F2340 100%)', border: '1px solid #2D5F8A' }}
          >
            <h3 className="text-xl font-bold text-white mb-2″>Schedule Your Winter Prep Service</h3>
            <p className="text-blue-200 text-sm mb-4″>
              Get quotes for insulation upgrades, duct sealing, HVAC service, and pipe insulation from
              vetted DFW pros. Most complete within 1–2 days.
            </p>
            <a
              href="/homeowner/book"
              className="inline-block font-semibold px-6 py-3 rounded-xl transition-all"
              style={{ background: '#F59E0B', color: '#1E3A5F' }}
            >
              Schedule Winter Prep Service →
            </a>
          </div>

        </div>
      </div>
    </HomeownerLayout>
  );
}
