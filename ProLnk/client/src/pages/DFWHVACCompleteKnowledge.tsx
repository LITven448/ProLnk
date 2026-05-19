import { useState } from 'react';

const stages = [
  'Something is wrong with my HVAC',
  'My system is old and I need to replace it',
  'I want to lower my energy bills',
  'I just moved to DFW',
  'My home is uncomfortable despite running AC',
  'I want to go green / reduce carbon',
  'I am preparing for a DFW summer',
  'I am buying or selling a DFW home',
];

const references: Record<string, { title: string; sections: { heading: string; content: string }[] }> = {
  'Something is wrong with my HVAC': {
    title: '🔧 DFW HVAC Troubleshooting Reference',
    sections: [
      { heading: 'AC Runs But Does Not Cool', content: 'Most common DFW cause: low refrigerant from a slow leak or a failing capacitor. Check if outdoor fan is spinning. If not, capacitor failure likely. If fan spins but no cold air, call ProLnk — refrigerant requires EPA certification to handle.' },
      { heading: 'System Short-Cycles (Turns On and Off Rapidly)', content: 'In DFW summer, short-cycling usually means the system is oversized, the filter is clogged, or the refrigerant is overcharged. Replace filter first — a clogged MERV-13 kills airflow. If problem continues, schedule a ProLnk inspection.' },
      { heading: 'Strange Noises', content: 'Banging or rattling: loose blower wheel or debris in condenser. Squealing: failing blower motor bearings. Clicking on startup only: normal. Continuous clicking: failed relay or control board. All of these need a pro visit.' },
      { heading: 'High Humidity Indoors', content: 'DFW outdoor air hits 80%+ RH in summer. Your AC must run long enough to remove latent heat from the air. If humidity stays above 60% RH inside, your system may be oversized — it cools too fast without dehumidifying. A whole-home dehumidifier or a variable-speed system fixes this.' },
    ],
  },
  'My system is old and I need to replace it': {
    title: '🔄 DFW HVAC Replacement Complete Reference',
    sections: [
      { heading: 'When to Replace vs Repair', content: 'Rule of thumb: if repair cost exceeds 50% of new system cost AND system is over 10 years old, replace. In DFW, systems last 12-15 years due to extreme heat stress. A 15-year-old R-22 system must be replaced — R-22 refrigerant is no longer manufactured.' },
      { heading: 'What Size System Do You Need?', content: 'Do not trust rule-of-thumb square footage sizing. DFW requires Manual J load calculations that account for your home\’s insulation, windows, orientation, and heat island zone. Oversizing is as bad as undersizing — it causes short-cycling and high humidity.' },
      { heading: 'Heat Pump vs Gas Furnace in DFW', content: 'DFW heating loads are modest — average 900 heating degree days vs 3,400 cooling degree days. A heat pump handles DFW heating down to 25°F efficiently. Below that, auxiliary electric strips or a dual-fuel backup covers the rare extreme cold snap.' },
      { heading: 'Efficiency Ratings and Tax Credits', content: 'Federal tax credits (25C): $2,000 for qualifying heat pumps, $600 for qualifying furnaces. Target 16+ SEER2 for AC units in DFW. Variable-speed or inverter systems reduce energy use 30-40% vs single-stage. Worth the $1,500-3,000 premium.' },
    ],
  },
  'I want to lower my energy bills': {
    title: '💡 DFW HVAC Energy Bill Reduction Reference',
    sections: [
      { heading: 'Biggest Impact Actions (by ROI)', content: '1) Seal attic air leaks — $500 cost, 15-20% savings. 2) Add attic radiant barrier — $800-2,000 cost, 10-15% savings. 3) Upgrade thermostat to smart/programmable — $200, 8-12% savings. 4) Replace system with heat pump — $8,000-15,000, 30-45% savings.' },
      { heading: 'DFW Utility Rate Optimization', content: 'Oncor territory: most DFW retail providers offer time-of-use rates. Pre-cool to 72°F before 2pm, set to 78°F during 2pm-8pm peak, resume cooling after 8pm. This strategy saves $40-80/month in DFW summer.' },
      { heading: 'Free Ways to Reduce Runtime', content: 'Run ceiling fans (saves 4°F perceived temperature). Close south and west blinds during 12pm-5pm. Cook outdoors or use microwave instead of oven. Take cooler showers. Each action reduces internal heat load and cuts AC runtime.' },
      { heading: 'ERCOT Grid Events and Your HVAC', content: 'During ERCOT conservation events (usually 3-7pm July-August), reduce thermostat load by pre-cooling 2 hours before. Smart thermostats with demand response enrollment pay you $10-30/month to allow brief setpoint adjustments during grid stress.' },
    ],
  },
  'I just moved to DFW': {
    title: '🏘️ New to DFW HVAC: Complete Orientation',
    sections: [
      { heading: 'What Makes DFW HVAC Different', content: 'DFW has one of the most demanding HVAC climates in the US: 3,400+ cooling degree days, 42 consecutive 100°F+ days in 2011, and humidity that hits 80%+ in summer. Your system works harder here than anywhere else you have lived.' },
      { heading: 'Your First DFW Summer Checklist', content: 'Do all of these before June 1: 1) Replace air filter. 2) Clear debris from outdoor condenser. 3) Schedule a refrigerant pressure check. 4) Know where your circuit breaker is. 5) Set thermostat no lower than 72°F — lower creates ice on coils.' },
      { heading: 'DFW HVAC Maintenance Schedule', content: 'Spring (April): full tune-up before cooling season. Replace filter monthly during June-August. Fall (October): heating check — verify igniter, heat exchanger, and gas valve before first cold snap. Filter monthly during December-February.' },
      { heading: 'Who to Call for DFW HVAC', content: 'ProLnk is a DFW-specific platform connecting homeowners with vetted HVAC professionals. Get competing quotes for any repair or replacement. DFW HVAC rates range from $85-150/hour for labor. Always get at least two quotes for work over $500.' },
    ],
  },
  'My home is uncomfortable despite running AC': {
    title: '🌡️ DFW Comfort Problem Reference',
    sections: [
      { heading: 'Hot and Cold Spots', content: 'Common in DFW two-story homes: heat stratifies, upper floors are 5-8°F warmer. Solutions: add a mini-split zone upstairs, balance dampers in ductwork, or add a return air vent on the upper floor. All require a pro.' },
      { heading: 'Humidity Problems', content: 'If indoor humidity stays above 60% RH even with AC running, your system is oversized. It cools air before removing enough moisture. Solutions: add whole-home dehumidifier to the air handler, or replace with a variable-speed system that can run at low speed for dehumidification.' },
      { heading: 'Air Quality Issues', content: 'DFW outdoor air carries high pollen (oak, cedar, bermuda grass). Use a MERV-13 filter and change monthly during allergy season (March-May, September-November). UV air purifiers in the air handler kill bacteria and reduce VOCs.' },
      { heading: 'Duct Problems', content: 'DFW attic temps hit 140-160°F in summer. Ducts in unconditioned attics lose 20-30% of cooling before it reaches rooms. Signs of duct problems: uneven cooling, high bills, visible flex duct sagging. ProLnk pros can do a duct blaster pressure test.' },
    ],
  },
  'I want to go green / reduce carbon': {
    title: '🌿 DFW Green HVAC Reference',
    sections: [
      { heading: 'Your Biggest Carbon Lever', content: 'Replacing a natural gas furnace with a heat pump is the single highest-impact carbon action a DFW homeowner can take. It eliminates direct methane combustion and reduces HVAC carbon by 45-60%. The $2,000 federal tax credit applies through 2032.' },
      { heading: 'Solar + Heat Pump in DFW', content: 'DFW gets 234 sunny days per year — more than Los Angeles. A 6-8kW solar array covers 80-100% of a heat pump\’s annual electricity use. Combined carbon reduction: 85-95% vs gas furnace + standard AC. Payback: 9-12 years at current ERCOT rates.' },
      { heading: 'ERCOT Green Energy Plans', content: 'Choose a retail electric provider (REP) offering 100% renewable energy certificates. Providers like Green Mountain Energy and TXU offer green plans without premium in DFW. This further reduces the carbon intensity of your electric heat pump.' },
      { heading: 'ProLnk Green HVAC Network', content: 'ProLnk connects DFW homeowners with HVAC pros certified in heat pump installation and solar-ready system design. When requesting quotes, specify you want heat pump options and ask about solar panel readiness.' },
    ],
  },
  'I am preparing for a DFW summer': {
    title: '☀️ DFW Summer HVAC Preparation Guide',
    sections: [
      { heading: 'April Tune-Up Checklist', content: '✅ Replace air filter. ✅ Clean condenser coils (hose down outdoor unit). ✅ Check condensate drain — pour a cup of water to verify drain. ✅ Verify refrigerant pressure (requires a pro). ✅ Test thermostat and change batteries. ✅ Clear 18 inches around outdoor unit.' },
      { heading: 'Hot-Weather Emergency Readiness', content: 'If AC fails during a 100°F+ DFW day: 1) Close blinds immediately. 2) Move to lowest floor. 3) Run ceiling fans counterclockwise. 4) Go to a library or mall if temps exceed 85°F indoors. 5) Call ProLnk — emergency HVAC pros available same-day.' },
      { heading: 'Understanding ERCOT Summer Alerts', content: 'ERCOT issues Conservation Appeals during peak demand (typically 3-7pm). If grid is stressed, reduce thermostat setpoint to 78°F during these hours. DFW homes pre-cooled to 72°F before 3pm can coast through peak without discomfort.' },
      { heading: 'Protecting Your System in Extreme Heat', content: 'During 105°F+ days: run system no colder than 72°F (prevents coil freeze). Check filter weekly. If you hear unusual sounds, call immediately — heat-related failures cascade quickly. Keep condenser shaded if possible.' },
    ],
  },
  'I am buying or selling a DFW home': {
    title: '🏠 DFW Real Estate HVAC Reference',
    sections: [
      { heading: 'Buying: HVAC Due Diligence', content: 'Always get a dedicated HVAC inspection — home inspectors often miss refrigerant and heat exchanger issues. Ask the seller for maintenance records and dates of last service. An aging 14-year-old DFW system has 1-3 years of life — price it into your offer.' },
      { heading: 'HVAC Age and Value Impact', content: 'DFW buyers in 2026 expect HVAC systems under 10 years old. A 2014 system reduces an offer by $6,000-12,000 in buyer minds. A new heat pump installation before listing can increase offer value by more than the installation cost in a hot market.' },
      { heading: 'Selling: HVAC Disclosures', content: 'Texas requires disclosure of known HVAC defects. Disclose any known refrigerant leaks, compressor failures, or heat exchanger cracks. Having a recent service record and fresh filter demonstrates maintenance care — buyers notice.' },
      { heading: 'Negotiating HVAC in Offers', content: 'If inspection reveals HVAC issues, get two ProLnk quotes for repair or replacement. Use the average quote amount as your price concession ask — not the high quote. Sellers often prefer a credit over allowing a repair before closing.' },
    ],
  },
};

export default function DFWHVACCompleteKnowledge() {
  const [stage, setStage] = useState('Something is wrong with my HVAC');
  const ref = references[stage];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Complete Knowledge</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything you need to know about DFW HVAC — organized by where you are in your HVAC journey. Select your situation and get your complete reference.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📍 Where Are You in Your HVAC Journey?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {stages.map(s => (
              <button key={s} onClick={() => setStage(s)}
                style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: stage === s ? '#F5E642' : '#162035', color: stage === s ? '#0A1628' : '#e2e8f0', fontWeight: stage === s ? 700 : 500, fontSize: 14 }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 20, color: '#F5E642' }}>{ref.title}</div>
          {ref.sections.map((section, i) => (
            <div key={i} style={{ background: '#162035', borderRadius: 10, padding: 20, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#e2e8f0' }}>{section.heading}</div>
              <div style={{ color: '#94a3b8', lineHeight: 1.75, fontSize: 14 }}>{section.content}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>📚 Full DFW HVAC Guide Series</div>
          {[
            'In-Home Comfort Standards — ASHRAE targets for DFW',
            'DFW Weather Records & HVAC Impact — extremes explained',
            'Urban Heat Island — which DFW zip codes run hotter',
            'Future Climate & HVAC Decisions — planning for 2030+',
            'Carbon Footprint Guide — reduce your HVAC emissions',
          ].map((title, i) => (
            <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 13, color: '#94a3b8' }}>
              📄 {title}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>Ready to Take Action? ProLnk Has You Covered.</div>
          <div style={{ color: '#162035', marginTop: 4, fontSize: 14 }}>Get competing quotes from vetted DFW HVAC professionals. Fast, transparent, no pressure.</div>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
