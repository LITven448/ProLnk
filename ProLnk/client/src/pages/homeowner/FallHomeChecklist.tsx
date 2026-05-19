import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

type ChecklistItem = { id: string; label: string; detail: string };
type Category = { id: string; title: string; icon: string; color: string; items: ChecklistItem[] };

const CATEGORIES: Category[] = [
  {
    id: 'hvac-heat',
    title: 'HVAC — Heating Startup',
    icon: '🔥',
    color: 'from-orange-900/40 to-slate-800/60 border-orange-700/30',
    items: [
      { id: 'heat-1', label: 'Schedule furnace service before first cold front', detail: 'DFW cold fronts can drop 40°F in hours. Most HVAC companies book out 2–3 weeks in October. Schedule by September 15.' },
      { id: 'heat-2', label: 'Replace air filter before running heat', detail: 'Burning a dirty filter creates a burning smell on first use. Replace now to avoid unnecessary emergency calls.' },
      { id: 'heat-3', label: 'Test heat — run for 20 minutes and verify airflow', detail: 'Run a full cycle before you actually need it. Check all registers for airflow. Identify dead zones now, not on a 28°F night.' },
      { id: 'heat-4', label: 'Test carbon monoxide detector — gas furnaces produce CO', detail: 'CO poisoning risk spikes in winter when homes are sealed. Test detector, check expiration date — replace if over 7 years old.' },
      { id: 'heat-5', label: 'Inspect all heating vents and registers', detail: 'Clear furniture from over floor registers. Check that dampers in each room are open. Closed dampers on multiple rooms stress the blower.' },
    ],
  },
  {
    id: 'weatherization',
    title: 'Weatherization',
    icon: '🌬️',
    color: 'from-blue-900/40 to-slate-800/60 border-blue-700/30',
    items: [
      { id: 'weath-1', label: 'Caulk all window and door frames', detail: 'Walk each window in sunlight and look for daylight gaps. A single failed window seal can add $150+/year in heating costs.' },
      { id: 'weath-2', label: 'Install door sweeps on exterior doors', detail: 'Slide a piece of paper under your door. If it moves freely with the door closed, cold air is coming in. Install a door sweep ($12–$30).' },
      { id: 'weath-3', label: 'Insulate water pipes in attic, crawlspace, and garage', detail: 'DFW pipes in unconditioned spaces freeze below 28°F for 4+ hours. Foam pipe insulation costs $0.50/foot — far cheaper than a burst pipe.' },
      { id: 'weath-4', label: 'Check attic insulation before heating season', detail: 'Heat rises. Inadequate attic insulation lets heat escape and drives up gas bills significantly. Add insulation if under 10–12 inches.' },
    ],
  },
  {
    id: 'plumbing',
    title: 'Plumbing Winterization',
    icon: '❄️',
    color: 'from-cyan-900/40 to-slate-800/60 border-cyan-700/30',
    items: [
      { id: 'plumb-1', label: 'Install outdoor faucet covers (freeze caps)', detail: 'Foam faucet covers are $3 each and prevent cracked sillcocks. Install on all exterior hose bibs before first freeze warning.' },
      { id: 'plumb-2', label: 'Winterize irrigation system (blow-out or manual drain)', detail: 'Water left in irrigation lines freezes and cracks pipes and heads. DFW irrigation pros blow out systems for $75–$125.' },
      { id: 'plumb-3', label: 'Set up freeze drip program on all faucets', detail: 'Know now which faucets you will drip during freeze events. Exterior walls, attic runs, and garage lines are highest risk.' },
    ],
  },
  {
    id: 'roof',
    title: 'Roof Check',
    icon: '🏚️',
    color: 'from-red-900/40 to-slate-800/60 border-red-700/30',
    items: [
      { id: 'roof-1', label: 'Inspect roof after summer heat damage', detail: 'DFW summer heat (160°F attic temps) accelerates shingle aging. Look for blistering, curling, or excessive granule loss in gutters.' },
      { id: 'roof-2', label: 'Check shingles for granule loss', detail: 'Check downspouts for significant granule accumulation after rain. Heavy granule loss means shingles are near end of life.' },
      { id: 'roof-3', label: 'Clean gutters of fall leaves before winter rains', detail: 'DFW gets heaviest rainfall in November–December. Clogged gutters cause ice dams in rare freeze events and foundation overflow.' },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    icon: '🏗️',
    color: 'from-amber-900/40 to-slate-800/60 border-amber-700/30',
    items: [
      { id: 'found-1', label: 'Reduce irrigation schedule gradually (October)', detail: 'Abruptly stopping irrigation after a wet summer stresses DFW clay foundations. Reduce 25% per week through October rather than stopping cold.' },
      { id: 'found-2', label: 'Check for gaps and new cracks after summer shrinkage', detail: 'DFW clay shrinks in summer drought. Walk the foundation perimeter in October and document any gaps that opened since spring.' },
      { id: 'found-3', label: 'Verify positive drainage before winter rains', detail: 'November–December are DFW\’s wettest months. Ensure all soil and grading drains water away from the foundation before these rains arrive.' },
    ],
  },
  {
    id: 'emergency',
    title: 'Emergency Preparedness',
    icon: '⚡',
    color: 'from-yellow-900/40 to-slate-800/60 border-yellow-700/30',
    items: [
      { id: 'emer-1', label: 'Test portable generator and store treated fuel', detail: 'Run generator under load for 30 minutes to verify it starts and produces power. Use fuel stabilizer in stored gasoline.' },
      { id: 'emer-2', label: 'Know your main water shutoff location and test valve', detail: 'Every adult in your house needs to know where the main shutoff is and confirm it actually turns. A stuck valve is useless in an emergency.' },
      { id: 'emer-3', label: 'Assemble emergency kit: water, food, batteries, warmth', detail: 'Minimum: 1 gallon water per person per day for 3 days, non-perishable food, flashlights, batteries, blankets, and first aid kit.' },
    ],
  },
  {
    id: 'uri',
    title: 'Uri 2021 Preparedness — 5 Specific Items',
    icon: '🚨',
    color: 'from-red-950/60 to-slate-900/80 border-red-600/40',
    items: [
      { id: 'uri-1', label: 'Know where your gas shutoff valve is and own a shutoff wrench', detail: 'A gas shutoff wrench ($8) attached to your meter allows you to shut off gas if pipes burst. ATMOS Energy recommends homeowners know this location.' },
      { id: 'uri-2', label: 'Have pipe insulation materials staged and ready', detail: 'Keep 20 feet of foam pipe insulation in your garage. During a freeze warning, you can wrap exposed pipes in minutes — not hours spent finding supplies.' },
      { id: 'uri-3', label: 'Know which faucets to drip and have the NWS notification set up', detail: 'Sign up for National Weather Service Dallas/Fort Worth freeze warnings at weather.gov. Set phone alerts. Know your drip protocol BEFORE the warning hits.' },
      { id: 'uri-4', label: 'Have a backup heat source that doesn\’t require electricity', detail: 'Propane or kerosene heater kept in garage with full tank. Do NOT use indoors without proper ventilation. For garage use only during power outage.' },
      { id: 'uri-5', label: 'Know your neighbors — establish a check-in system', detail: 'Uri 2021 killed people who were alone. Exchange numbers with 2 neighbors. Plan to check on each other during extended power outages.' },
    ],
  },
];

export default function FallHomeChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const total = CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const done = checked.size;
  const pct = Math.round((done / total) * 100);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <>
      <Helmet>
        <title>DFW Fall Home Checklist — Preparing for Texas Winter | ProLnk</title>
        <meta name="description" content="DFW fall home maintenance checklist covering HVAC heating startup, weatherization, plumbing winterization, emergency prep, and Uri 2021 preparedness items every DFW homeowner should complete before February." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-orange-950/20 to-slate-900 border-b border-slate-800″>
          <div className="max-w-4xl mx-auto px-6 py-12″>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-4″>
              <span className="text-orange-400 text-sm font-medium">🍂 Fall Edition — October through November</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3″>
              DFW Fall Home Checklist
            </h1>
            <p className="text-slate-400 text-lg mb-2″>
              Preparing for Texas Winter — before Uri 2021 repeats itself.
            </p>
            <p className="text-slate-500 text-sm">
              DFW winters are mild 90% of the time. The other 10% — a freak ice storm, a 4-day freeze, or a February disaster — is when preparation determines whether your family is safe and your home is intact.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8″>
          {/* Progress ring */}
          <div className="flex items-center gap-6 bg-slate-800/60 border border-slate-700 rounded-2xl p-6 mb-8″>
            <div className="relative w-24 h-24 shrink-0″>
              <svg className="w-24 h-24 -rotate-90″ viewBox="0 0 100 100">
                <circle cx="50″ cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="50″ cy="50" r="40" fill="none"
                  stroke={pct === 100 ? '#22c55e' : '#f97316'}
                  strokeWidth="10″
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{pct}%</span>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{done} of {total} items complete</p>
              <p className="text-slate-400 text-sm mt-1″>
                {pct < 25 && 'Start now — the first cold front can arrive with 48 hours notice.'}
                {pct >= 25 && pct < 50 && 'Good progress. Don\’t stop — the Uri items are still ahead.'}
                {pct >= 50 && pct < 75 && 'More than halfway. Finish the emergency section before anything else.'}
                {pct >= 75 && pct < 100 && 'Almost ready. Finish the last few — those remaining items matter.'}
                {pct === 100 && '✅ Your home is winter-ready. Well done.'}
              </p>
              {done < total && (
                <Link href="/request-quote">
                  <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors">
                    Book contractors for unchecked items →
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Warning banner */}
          <div className="bg-red-950/40 border border-red-700/40 rounded-xl px-5 py-4 mb-6″>
            <p className="text-red-300 text-sm font-medium">⚠️ Uri 2021 reminder: 246 Texans died during that freeze event. The Uri section at the bottom of this checklist contains items specific to preventing that outcome.</p>
          </div>

          {/* Categories */}
          <div className="space-y-6″>
            {CATEGORIES.map((cat) => {
              const catDone = cat.items.filter((i) => checked.has(i.id)).length;
              const catPct = Math.round((catDone / cat.items.length) * 100);
              return (
                <div key={cat.id} className={`rounded-2xl border bg-gradient-to-br ${cat.color} overflow-hidden`}>
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3″>
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h2 className="text-white font-bold">{cat.title}</h2>
                        <p className="text-slate-400 text-xs">{catDone}/{cat.items.length} complete</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2″>
                      <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full transition-all"
                          style={{ width: `${catPct}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-xs w-8 text-right">{catPct}%</span>
                    </div>
                  </div>
                  <div className="divide-y divide-white/5″>
                    {cat.items.map((item) => {
                      const isChecked = checked.has(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`flex gap-4 px-5 py-4 cursor-pointer transition-colors ${isChecked ? 'bg-orange-500/10' : 'hover:bg-white/5'}`}
                        >
                          <div className="mt-0.5 shrink-0″>
                            <div
                              onClick={() => toggle(item.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isChecked ? 'bg-orange-500 border-orange-500′ : ’border-slate-600'
                              }`}
                            >
                              {isChecked && (
                                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12″ fill="none">
                                  <path d="M2 6l3 3 5-5″ stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0″>
                            <p className={`text-sm font-medium leading-snug ${isChecked ? 'text-slate-400 line-through' : 'text-white'}`}>
                              {item.label}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.detail}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-br from-orange-900/40 to-slate-800/60 border border-orange-700/30 rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold text-white mb-2″>Need help winterizing your home?</p>
            <p className="text-slate-400 mb-5″>ProLnk connects DFW homeowners with licensed contractors for HVAC, plumbing, insulation, roofing, and more. Get matched in minutes.</p>
            <Link href="/request-quote">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-xl text-white font-semibold transition-colors">
                Find a Winter-Ready Contractor →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
