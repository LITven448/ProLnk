import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';

type ChecklistItem = { id: string; label: string; detail: string };
type Category = { id: string; title: string; icon: string; color: string; items: ChecklistItem[] };

const CATEGORIES: Category[] = [
  {
    id: 'hvac',
    title: 'HVAC',
    icon: '❄️',
    color: 'from-blue-900/40 to-slate-800/60 border-blue-700/30',
    items: [
      { id: 'hvac-1', label: 'Schedule spring AC tune-up', detail: 'Before temperatures climb above 85°F. DFW heat hits fast — most HVAC companies are booked 2–3 weeks out by April.' },
      { id: 'hvac-2', label: 'Replace air filter (1″: monthly, 4″: quarterly)', detail: 'A dirty filter during high-pollen DFW spring can spike your energy bill 15% and shorten equipment life.' },
      { id: 'hvac-3', label: 'Check refrigerant level / inspect for leaks', detail: 'Low refrigerant means your AC runs longer and works harder. Have a licensed tech check this annually.' },
      { id: 'hvac-4', label: 'Clean outdoor condenser coils and fins', detail: 'DFW cedar pollen and cotton from cottonwood trees pack condenser fins tight. Turn power off, rinse gently with garden hose.' },
      { id: 'hvac-5', label: 'Test thermostat — switch from heat to cool', detail: 'Run a full cycle to verify the system responds correctly. Listen for unusual noises when it first kicks on.' },
      { id: 'hvac-6', label: 'Inspect ductwork for leaks or disconnects', detail: 'EPA estimates 20–30% of conditioned air is lost to duct leaks in a typical home. Book a duct blaster test if over 10 years old.' },
    ],
  },
  {
    id: 'roof',
    title: 'Roof & Exterior',
    icon: '🏠',
    color: 'from-red-900/40 to-slate-800/60 border-red-700/30',
    items: [
      { id: 'roof-1', label: 'Inspect roof after winter — binoculars or drone', detail: 'Look for missing shingles, lifted edges, granule loss in gutters. DFW hail season starts in March — document condition before storms.' },
      { id: 'roof-2', label: 'Clean gutters and flush downspouts', detail: 'Fall leaves and winter debris clog gutters. Overflowing water during spring storms damages fascia, siding, and foundation.' },
      { id: 'roof-3', label: 'Add downspout extensions (min 4 ft from foundation)', detail: 'Short downspouts are the #1 cause of foundation drainage problems in DFW clay soil. Extenders are $8 at any hardware store.' },
      { id: 'roof-4', label: 'Check and reseal roof flashing', detail: 'Flashing around chimneys, skylights, and vents is where most DFW roof leaks originate. Re-seal with roofing caulk if cracked.' },
      { id: 'roof-5', label: 'Inspect chimney cap and mortar', detail: 'Winter freeze-thaw (even mild DFW winters) cracks mortar joints. A damaged chimney cap lets water in and wasps nest inside.' },
      { id: 'roof-6', label: 'Caulk around windows and doors', detail: 'Failed caulk lets water intrude during severe DFW spring storms. Check for cracks, gaps, or missing sections along all window frames.' },
      { id: 'roof-7', label: 'Inspect siding for damage or rot', detail: 'High spring humidity accelerates rot on wood siding and trim. Probe any soft spots — if your finger goes in, replace before summer.' },
      { id: 'roof-8', label: 'Inspect fascia and soffit boards', detail: 'Damaged fascia allows water entry into attic framing. Check especially on north and west sides that take the most storm exposure.' },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    icon: '🏗️',
    color: 'from-amber-900/40 to-slate-800/60 border-amber-700/30',
    items: [
      { id: 'found-1', label: 'Start foundation watering schedule (March)', detail: 'DFW expansive clay soil requires consistent moisture. Start soaker hose 18″ from foundation, 30–45 min, 3x/week when rainfall is under 1″.' },
      { id: 'found-2', label: 'Walk perimeter — document any new cracks', detail: 'Photograph every crack with a ruler for scale. Cracks wider than 1/4″ or horizontal cracks require immediate structural evaluation.' },
      { id: 'found-3', label: 'Inspect drainage slope away from house', detail: 'Soil settles over time. Grade should slope 6″ down over 10 feet from the foundation. Flat or negative grade = standing water.' },
      { id: 'found-4', label: 'Check trees within 15 feet of foundation', detail: 'Aggressive root species (live oak, red oak, elms) within 15 ft cause significant DFW foundation damage. Consider root barriers.' },
      { id: 'found-5', label: 'Test irrigation system and check spray patterns', detail: 'Irrigation heads that spray onto the foundation instead of away are a common cause of uneven foundation moisture.' },
    ],
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    icon: '🌿',
    color: 'from-green-900/40 to-slate-800/60 border-green-700/30',
    items: [
      { id: 'land-1', label: 'Trim trees away from roofline and power lines', detail: 'Tree limbs within 6 ft of your roof become projectiles in DFW severe thunderstorms. Book an arborist before storm season peaks.' },
      { id: 'land-2', label: 'Fertilize lawn (pre-emergent + starter fertilizer)', detail: 'Apply pre-emergent herbicide before soil temps hit 55°F to prevent crabgrass. Late February to early March for DFW zone 8a.' },
      { id: 'land-3', label: 'Install 2–3″ of fresh mulch in beds', detail: 'Mulch retains soil moisture and moderates temperature. Critical around foundation plantings to maintain even moisture in DFW clay.' },
      { id: 'land-4', label: 'Test and activate irrigation system', detail: 'Run every zone for a full cycle. Replace damaged heads, adjust patterns. Set seasonal timer for 2–3x/week starting April.' },
      { id: 'land-5', label: 'Inspect wood fence for winter damage', detail: 'Post rot at ground level is most common. Probe each post base. Leaning sections need repair before spring storms stress them further.' },
      { id: 'land-6', label: 'Check all outdoor lighting fixtures', detail: 'Replace bulbs and check ground stakes on path lights. Reset timer after DST. Ensure floodlights over entry points are functioning.' },
    ],
  },
  {
    id: 'safety',
    title: 'Safety',
    icon: '🔒',
    color: 'from-orange-900/40 to-slate-800/60 border-orange-700/30',
    items: [
      { id: 'safe-1', label: 'Test all smoke detectors — replace batteries', detail: 'DFW fire departments recommend testing monthly, replacing batteries annually. Use daylight saving time as your reminder.' },
      { id: 'safe-2', label: 'Test all CO detectors', detail: 'Carbon monoxide detectors have a 5–7 year lifespan. Check manufacture date on back — replace if expired. Test the button.' },
      { id: 'safe-3', label: 'Inspect and service fire extinguisher', detail: 'Check pressure gauge (needle in green). Verify pin is intact. Extinguishers older than 12 years should be professionally serviced or replaced.' },
      { id: 'safe-4', label: 'Locate and label gas shutoff valve', detail: 'Every adult in your household should know where the main gas shutoff is and how to use a wrench to close it in an emergency.' },
      { id: 'safe-5', label: 'Review and update homeowners insurance coverage', detail: 'DFW hail and tornado claims spike in spring. Verify your dwelling coverage reflects current replacement cost — not purchase price.' },
    ],
  },
  {
    id: 'summer-prep',
    title: 'Summer HVAC Prep',
    icon: '☀️',
    color: 'from-yellow-900/40 to-slate-800/60 border-yellow-700/30',
    items: [
      { id: 'sum-1', label: 'Install or verify programmable thermostat settings', detail: 'Program 78°F when home, 85°F when away. Proper setback saves $200–$400 in DFW summer electricity bills.' },
      { id: 'sum-2', label: 'Reverse ceiling fans to counterclockwise (summer mode)', detail: 'Counterclockwise rotation creates a wind-chill effect. Can let you raise thermostat 4°F without discomfort — saves ~8% on cooling.' },
      { id: 'sum-3', label: 'Check attic insulation depth', detail: 'DFW attic temps hit 160°F in summer. DOE recommends R-38 (12″) minimum for zone 3. Top up if under 10″ of existing insulation.' },
      { id: 'sum-4', label: 'Apply window film to west-facing windows', detail: 'West-facing windows in DFW homes see 6+ hours of direct afternoon sun. Solar film reduces heat gain 40–70% for about $3/sq ft.' },
      { id: 'sum-5', label: 'Seal ductwork in unconditioned attic', detail: 'Mastic sealant on duct joints in the attic can reduce cooling costs 15–20%. A 2-hour job with major annual payoff.' },
      { id: 'sum-6', label: 'Consider smart thermostat upgrade', detail: 'Nest, Ecobee, or Honeywell T9 can save 10–23% on HVAC costs. Most DFW utilities offer $50–$100 rebates for qualifying smart thermostats.' },
      { id: 'sum-7', label: 'Book HVAC annual service contract for next year', detail: 'Locking in a maintenance contract now avoids premium emergency rates when your AC fails on a 105°F July afternoon.' },
    ],
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    icon: '🔧',
    color: 'from-cyan-900/40 to-slate-800/60 border-cyan-700/30',
    items: [
      { id: 'plumb-1', label: 'Turn on outdoor faucets and check for winter damage', detail: 'Even mild DFW winters can crack outdoor faucets that weren\’t properly drained. Turn on slowly and check connections for drips.' },
      { id: 'plumb-2', label: 'Reactivate irrigation system backflow preventer', detail: 'If you winterized your irrigation, reconnect the backflow preventer and pressurize slowly to avoid water hammer.' },
      { id: 'plumb-3', label: 'Flush water heater sediment', detail: 'DFW hard water (300–400 ppm hardness) causes heavy sediment buildup. Annual flush extends water heater life 3–5 years.' },
      { id: 'plumb-4', label: 'Inspect under sinks for slow leaks', detail: 'Check supply lines, drain connections, and garbage disposal seals. Slow leaks behind cabinet doors cause significant wood damage.' },
      { id: 'plumb-5', label: 'Test sump pump if applicable', detail: 'If your home has a sump pump, pour a bucket of water into the pit to trigger the float. Verify pump activates and drains properly.' },
    ],
  },
  {
    id: 'pest',
    title: 'Pest Control',
    icon: '🐜',
    color: 'from-purple-900/40 to-slate-800/60 border-purple-700/30',
    items: [
      { id: 'pest-1', label: 'Schedule quarterly pest treatment', detail: 'Spring is when fire ants, roaches, and termites become active in DFW. Book your first quarterly treatment by March 1.' },
      { id: 'pest-2', label: 'Check all exterior entry points', detail: 'Walk the exterior and caulk gaps around pipes, utility conduits, and where siding meets foundation. A mouse can squeeze through a dime-sized gap.' },
      { id: 'pest-3', label: 'Seal foundation vents and crawlspace entries', detail: 'Damaged foundation vent screens allow snakes, raccoons, and rodents to nest under your home. Replace any bent or missing screens.' },
      { id: 'pest-4', label: 'Inspect attic for rodent evidence', detail: 'Look for droppings, gnawed insulation, or entry holes at roof line. Spring is when rats and squirrels actively seek nesting sites.' },
      { id: 'pest-5', label: 'Check garage door seal and sweep', detail: 'A worn garage door bottom seal is an open invitation for scorpions, snakes, and roaches. Replace the rubber sweep for $20–$40.' },
    ],
  },
];

export default function SpringHomeChecklist() {
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
        <title>DFW Spring Home Checklist — 47 Items | ProLnk</title>
        <meta name="description" content="DFW spring home maintenance checklist covering HVAC, roof, foundation, landscaping, safety, plumbing, and pest control. Hail season, tornado season, and foundation watering season all start in March." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-green-400 text-sm font-medium">🌱 Spring Edition — March through June</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              DFW Spring Home Checklist
            </h1>
            <p className="text-slate-400 text-lg mb-2">
              47 items for the most dangerous home maintenance season in North Texas.
            </p>
            <p className="text-slate-500 text-sm">
              Spring in DFW means hail season, tornado season, HVAC startup season, and foundation watering season — all at once. This checklist keeps your home protected from March through June.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Progress ring */}
          <div className="flex items-center gap-6 bg-slate-800/60 border border-slate-700 rounded-2xl p-6 mb-8">
            <div className="relative w-24 h-24 shrink-0">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={pct === 100 ? '#22c55e' : '#14b8a6'}
                  strokeWidth="10"
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
              <p className="text-slate-400 text-sm mt-1">
                {pct < 25 && 'Get started — storm season waits for no one.'}
                {pct >= 25 && pct < 50 && 'Good start. Keep going before the first hail storm.'}
                {pct >= 50 && pct < 75 && 'Halfway there. Your home is getting safer every item.'}
                {pct >= 75 && pct < 100 && 'Almost done — finish strong before summer heat arrives.'}
                {pct === 100 && '✅ Your home is spring-ready. Well done.'}
              </p>
              {done < total && (
                <Link href="/get-quotes">
                  <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-medium transition-colors">
                    Book contractors for unchecked items →
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            {CATEGORIES.map((cat) => {
              const catDone = cat.items.filter((i) => checked.has(i.id)).length;
              const catPct = Math.round((catDone / cat.items.length) * 100);
              return (
                <div key={cat.id} className={`rounded-2xl border bg-gradient-to-br ${cat.color} overflow-hidden`}>
                  <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h2 className="text-white font-bold">{cat.title}</h2>
                        <p className="text-slate-400 text-xs">{catDone}/{cat.items.length} complete</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all"
                          style={{ width: `${catPct}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-xs w-8 text-right">{catPct}%</span>
                    </div>
                  </div>
                  <div className="divide-y divide-white/5">
                    {cat.items.map((item) => {
                      const isChecked = checked.has(item.id);
                      return (
                        <label
                          key={item.id}
                          className={`flex gap-4 px-5 py-4 cursor-pointer transition-colors ${isChecked ? 'bg-teal-500/10' : 'hover:bg-white/5'}`}
                        >
                          <div className="mt-0.5 shrink-0">
                            <div
                              onClick={() => toggle(item.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isChecked ? 'bg-teal-500 border-teal-500' : 'border-slate-600'
                              }`}
                            >
                              {isChecked && (
                                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
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
          <div className="mt-10 bg-gradient-to-br from-teal-900/40 to-slate-800/60 border border-teal-700/30 rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold text-white mb-2">Need help with any of these items?</p>
            <p className="text-slate-400 mb-5">ProLnk connects you with licensed, vetted DFW contractors — HVAC, roofing, plumbing, foundation, pest, and more. Free to request, no obligation.</p>
            <Link href="/get-quotes">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-xl text-white font-semibold transition-colors">
                Find a Contractor →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
