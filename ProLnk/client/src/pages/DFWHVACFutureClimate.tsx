import { useState } from 'react';

const situations = [
  'Replacing an aging furnace',
  'Adding a second AC unit',
  'Building a new home in DFW',
  'Upgrading from window units',
  'Planning a major renovation',
  'Buying a home in DFW',
];

const timelines = ['Right now', 'Within 1 year', 'Within 5 years', 'Within 10 years'];

const decisions: Record<string, Record<string, string>> = {
  'Replacing an aging furnace': {
    'Right now': '🔥 Buy a dual-fuel heat pump system rated for 115°F+ outdoor temps. DFW heating loads are modest — you may never need a gas furnace again. 16+ SEER2 rated equipment qualifies for $2,000 federal tax credit.',
    'Within 1 year': '🔥 Same recommendation applies. Get a Manual J load calc today — DFW heating seasons are getting 2-3 weeks shorter each decade. Size for cooling, not heating.',
    'Within 5 years': '⚡ By 2031, DFW average summer will extend 2+ weeks longer. Invest in a variable-speed heat pump with 20+ SEER rating. Future summers will demand more from your system.',
    'Within 10 years': '🌡️ By 2036, plan for 50+ days per year above 100°F in DFW. Buy the highest SEER-rated variable-speed system available. Gas furnace replacements may face carbon pricing incentives.',
  },
  'Adding a second AC unit': {
    'Right now': '❄️ Choose a heat pump — even in DFW winters, a heat pump with auxiliary strips covers you to 15°F. Cooling efficiency matters more here. Target 18+ SEER2.',
    'Within 1 year': '❄️ Same. Prices on variable-speed systems drop 5-8% each year as efficiency standards rise. Still better to buy now if existing system is failing.',
    'Within 5 years': '🌬️ Climate projections show DFW cooling degree days increasing 8% by 2031. A bigger-capacity unit installed now will be undersized in 10 years. Size up by one ton.',
    'Within 10 years': '🌬️ By 2036, DFW may see 110°F days as a regular summer occurrence. Invest in a 2-stage or inverter system rated to 125°F outdoor coil temperature.',
  },
  'Building a new home in DFW': {
    'Right now': '🏗️ Specify all-electric heat pump HVAC with 20+ SEER2, spray foam insulation, and a solar-ready electrical panel. DFW utility rates incentivize heat pumps, and gas infrastructure costs are rising.',
    'Within 1 year': '🏗️ Same recommendation. Incorporate solar-ready conduit runs and a 200A panel. Solar + heat pump + battery storage will be the dominant DFW system by 2030.',
    'Within 5 years': '☀️ By 2031, DFW home buyers increasingly expect solar+HVAC integration. Build in conduit runs and oversized electrical service now — retrofitting costs 3x more.',
    'Within 10 years': '☀️ Net-zero-ready construction will be the standard in North Texas by 2036. Build to that spec now. Heat pump water heater + HVAC + solar = 80% energy cost reduction.',
  },
  'Upgrading from window units': {
    'Right now': '🌬️ Install a multi-zone mini-split system (no ductwork needed). For DFW, choose a system rated to 115°F outdoor temp with a 21+ SEER2 rating. Best ROI for non-ducted homes.',
    'Within 1 year': '🌬️ Same. Mini-split prices have dropped 30% in 3 years. A 3-zone system for a 1,500 sq ft home costs $8,000-12,000 installed — pays back in 5-7 years via energy savings.',
    'Within 5 years': '🔋 By 2031, mini-split systems with integrated battery storage will be common. Plan for that upgrade path — buy systems with smart thermostat and grid-response capability now.',
    'Within 10 years': '🔋 DFW grid stress events like 2021 will recur. By 2036, homes with battery-backed HVAC will have huge advantage. Start planning the solar+battery ecosystem now.',
  },
  'Planning a major renovation': {
    'Right now': '🏠 Add spray foam insulation to all exterior walls and attic floor — reduces HVAC load 20-30%. Then right-size HVAC down. A better-insulated DFW home may need 20% less cooling capacity.',
    'Within 1 year': '🏠 Same. Renovation is the perfect time to install dedicated HVAC zones for additions. Zoned systems cost 15% more but reduce runtime by 25%+ in DFW multi-story homes.',
    'Within 5 years': '🏡 DFW summers through 2031 will test any HVAC system installed today. Use renovation to seal every duct penetration and add attic radiant barrier — reduces attic temps 20°F.',
    'Within 10 years': '🏡 Climate-smart renovations include deep-energy upgrades: triple-pane windows, R-60 attic insulation, and heat pump systems rated for extreme heat. DFW will need all of these by 2036.',
  },
  'Buying a home in DFW': {
    'Right now': '🏘️ Ask for HVAC age and last service date. Anything over 12 years old in DFW is nearing end of life. A $200 inspection by a ProLnk pro can uncover $8,000+ in deferred maintenance.',
    'Within 1 year': '🏘️ Same inspection advice. Factor HVAC condition into your offer. A failing 15-year-old system in DFW is a $10,000-18,000 liability. Use it as a negotiation point.',
    'Within 5 years': '🌡️ Buy a home where HVAC was replaced after 2020 — newer systems are designed for SEER2 efficiency standards and handle DFW heat better. Older systems will struggle by 2031.',
    'Within 10 years': '🌡️ By 2036, DFW homes with solar + heat pump combinations will command premium valuations. Prioritize homes with solar-ready panels and modern electrical service.',
  },
};

export default function DFWHVACFutureClimate() {
  const [situation, setSituation] = useState('Replacing an aging furnace');
  const [timeline, setTimeline] = useState('Right now');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Future Climate & HVAC Decisions</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Climate projections through 2040 show DFW getting hotter, with longer cooling seasons and more extreme events. Here is how to buy and plan smart today.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Extra Cooling Days by 2031', value: '+12 days', sub: 'Above 95°F annually' },
            { label: 'Warming Trend', value: '+2.4°F', sub: 'By 2040 vs 1990 baseline' },
            { label: '110°F+ Days (2036)', value: '8/yr', sub: 'Up from 2 days historically' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0f2040', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔮 Get Your Climate-Smart HVAC Decision</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Your Situation</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSituation(s)}
                  style={{ padding: '7px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
                    background: situation === s ? '#F5E642' : '#162035', color: situation === s ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Your Timeline</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {timelines.map(t => (
                <button key={t} onClick={() => setTimeline(t)}
                  style={{ padding: '7px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                    background: timeline === t ? '#F5E642' : '#162035', color: timeline === t ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#1a2a4a', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 8, fontWeight: 700 }}>CLIMATE-SMART RECOMMENDATION</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.8, fontSize: 15 }}>
              {decisions[situation]?.[timeline] ?? 'Select a situation and timeline to see your personalized HVAC decision.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>Future-Ready HVAC Starts with the Right Pro</div>
          <div style={{ color: '#162035', marginTop: 4, fontSize: 14 }}>ProLnk matches you with DFW HVAC pros who understand heat pump systems and efficiency upgrades.</div>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
