import { useState } from 'react';

const situations = ['New build in DFW suburbs', 'Replacing 15-year-old gas furnace + AC', 'Currently on all-electric (no gas line)', 'High electric rates, low gas rates', 'Low electric rates (solar or TOU plan)', 'Want lowest carbon footprint possible'];
const energyCosts = ['Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)', 'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)', 'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)', 'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)', 'Unknown — skip to general recommendation'];

type DualFuelRec = { recommendation: string; annual_cost: string; note: string };

const matrix: Record<string, Record<string, DualFuelRec>> = {
  'New build in DFW suburbs': {
    'Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)': { recommendation: 'DUAL FUEL — Strong fit', annual_cost: 'Est. $1,400–$1,900/yr for typical 2,500 sq ft DFW home', note: 'Heat pump handles all cooling (8 months in DFW) and mild-weather heating efficiently. Gas kicks in below ~35°F — rare in DFW but critical during freeze events. Low gas price makes backup extremely cheap.' },
    'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)': { recommendation: 'DUAL FUEL — Good fit', annual_cost: 'Est. $1,600–$2,100/yr', note: 'DFW averages fewer than 25 days per year below 35°F. Heat pump efficiency advantage easily justifies the premium system cost. Gas backup rarely needed, but cheap insurance for rare cold snaps.' },
    'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Better fit', annual_cost: 'Est. $1,500–$2,000/yr', note: 'At high gas prices, the economics shift toward all-electric. In DFW\’s mild winters, a cold-climate inverter heat pump can handle nearly all heating loads without gas backup.' },
    'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Clear winner', annual_cost: 'Est. $900–$1,400/yr', note: 'Low electricity cost + high gas cost = all-electric wins decisively. No gas line needed, lower operating cost, single energy source.' },
    'Unknown — skip to general recommendation': { recommendation: 'DUAL FUEL — Default recommendation for new DFW builds', annual_cost: 'Est. $1,500–$2,000/yr', note: 'For new construction in DFW without specific energy cost data, dual fuel is the most flexible and cost-effective choice. Heat pump for 95% of operation, gas for the rare cold snap.' },
  },
  'Replacing 15-year-old gas furnace + AC': {
    'Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)': { recommendation: 'DUAL FUEL — High value upgrade', annual_cost: 'Est. $1,600–$2,200/yr (vs $2,400–$3,000/yr for old system)', note: 'Existing gas line stays, just add heat pump. Old systems run at 80 AFUE or less; dual fuel heat pump system runs at 300%+ efficiency for most of the year.' },
    'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)': { recommendation: 'DUAL FUEL — Good upgrade, 6–9 year payback', annual_cost: 'Est. $1,700–$2,300/yr', note: 'The efficiency gain over a 15-year-old system is substantial. Dual fuel upgrade cost: $9,000–$14,000 installed. Annual savings vs old system: $600–1,000.' },
    'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)': { recommendation: 'CONSIDER ALL-ELECTRIC HEAT PUMP', annual_cost: 'Est. $1,500–$2,100/yr', note: 'At current gas prices, all-electric may beat dual fuel on operating cost. But if you\’re keeping the gas line for other appliances, dual fuel still makes sense.' },
    'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Remove gas dependency', annual_cost: 'Est. $900–$1,500/yr', note: 'If you\’re replacing the furnace anyway and gas is expensive, this is the moment to go all-electric. Eliminate gas bill entirely if you can drop the service.' },
    'Unknown — skip to general recommendation': { recommendation: 'DUAL FUEL — Recommended for most DFW replacement scenarios', annual_cost: 'Est. $1,600–$2,200/yr', note: 'Dual fuel is the most popular HVAC upgrade in DFW for good reason. It maximizes efficiency while eliminating cold-snap vulnerability.' },
  },
  'Currently on all-electric (no gas line)': {
    'Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)': { recommendation: 'DUAL FUEL possible but requires gas line installation ($1,500–$3,000)', annual_cost: 'Est. $1,500–$2,100/yr after gas installation', note: 'If gas is cheap and your electric rates are high, adding a gas line to enable dual fuel may pay off over 10–12 years. Rare scenario for most DFW homeowners.' },
    'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Stay all-electric', annual_cost: 'Est. $1,600–$2,200/yr', note: 'Adding a gas line for moderate savings on a system you\’ll use for heating 2 months per year in DFW doesn\’t pencil out. Stay all-electric with a quality inverter heat pump.' },
    'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Clear choice', annual_cost: 'Est. $1,500–$2,000/yr', note: 'No gas line, no gas bill, modern inverter heat pump handles DFW\’s mild winters with ease. This is your answer.' },
    'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Best possible scenario', annual_cost: 'Est. $800–$1,300/yr', note: 'Cheap electricity + no gas = lowest possible HVAC operating cost in DFW. All-electric wins decisively.' },
    'Unknown — skip to general recommendation': { recommendation: 'ALL-ELECTRIC HEAT PUMP — Stay all-electric', annual_cost: 'Est. $1,600–$2,200/yr', note: 'Without a compelling energy cost case to add gas, the simplicity and performance of an all-electric inverter heat pump is the right choice for DFW.' },
  },
  'High electric rates, low gas rates': {
    'Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)': { recommendation: 'DUAL FUEL — Best fit for this scenario', annual_cost: 'Est. $1,400–$1,900/yr', note: 'This is the exact scenario dual fuel was designed for. Heat pump for DFW\’s long cooling season (highly efficient), gas for winter heating when gas is cheap.' },
    'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)': { recommendation: 'DUAL FUEL — Still strong fit', annual_cost: 'Est. $1,600–$2,100/yr', note: 'Dual fuel advantage diminishes as gas price rises, but in DFW where heating demand is low, it still makes sense.' },
    'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)': { recommendation: 'ALL-ELECTRIC — Rates have shifted the equation', annual_cost: 'Est. $1,500–$2,100/yr', note: 'If gas is now expensive, the premise of your situation has changed. Re-evaluate based on current energy prices.' },
    'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)': { recommendation: 'ALL-ELECTRIC — Switch your thinking entirely', annual_cost: 'Est. $900–$1,400/yr', note: 'This energy cost profile makes all-electric the clear winner. Dual fuel would be a mistake at these rates.' },
    'Unknown — skip to general recommendation': { recommendation: 'DUAL FUEL — Recommended when gas is cheap', annual_cost: 'Est. $1,500–$2,000/yr', note: 'With cheap gas and no other data, dual fuel is the right default choice for DFW homeowners.' },
  },
  'Low electric rates (solar or TOU plan)': {
    'Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)': { recommendation: 'CHECK YOUR ACTUAL RATES — Contradiction in inputs', annual_cost: 'Verify your electric rate structure', note: 'If you have solar or TOU, your effective electric rate may be very low even if the grid rate is high. Confirm your actual all-in cost per kWh before deciding.' },
    'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)': { recommendation: 'ALL-ELECTRIC — Solar/TOU tips the balance', annual_cost: 'Est. $1,200–$1,800/yr', note: 'With low effective electric rates from solar or TOU, all-electric heat pump will be cheaper to operate than dual fuel in DFW\’s climate.' },
    'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)': { recommendation: 'ALL-ELECTRIC — Easy choice', annual_cost: 'Est. $1,100–$1,700/yr', note: 'Solar/TOU + high gas prices = all-electric wins by a wide margin.' },
    'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)': { recommendation: 'ALL-ELECTRIC — Maximum savings', annual_cost: 'Est. $700–$1,200/yr', note: 'This is the best-case scenario for all-electric HVAC. Lowest possible operating cost in DFW.' },
    'Unknown — skip to general recommendation': { recommendation: 'ALL-ELECTRIC — Solar/TOU profile favors all-electric', annual_cost: 'Est. $1,100–$1,700/yr', note: 'Your energy profile strongly suggests all-electric. Dual fuel\’s advantage evaporates when your effective electric rate is low.' },
  },
  'Want lowest carbon footprint possible': {
    'Gas cheap (<$1.20/therm), Electric high (>$0.14/kWh)': { recommendation: 'ALL-ELECTRIC with green energy plan', annual_cost: 'Est. $1,600–$2,200/yr', note: 'If carbon is the priority, all-electric powered by renewable energy is the answer regardless of gas prices. Cheap gas doesn\’t reduce emissions.' },
    'Gas moderate ($1.20–$1.60/therm), Electric moderate ($0.11–$0.14/kWh)': { recommendation: 'ALL-ELECTRIC with renewable electricity', annual_cost: 'Est. $1,500–$2,100/yr', note: 'Electric heat pump on 100% renewable plan = near-zero operational carbon. Dual fuel always burns gas during cold snaps.' },
    'Gas expensive (>$1.60/therm), Electric moderate (<$0.13/kWh)': { recommendation: 'ALL-ELECTRIC — Easiest choice', annual_cost: 'Est. $1,400–$2,000/yr', note: 'All-electric + high gas prices + carbon goal = clear all-electric decision.' },
    'Gas expensive, Electric cheap (<$0.10/kWh — solar/TOU)': { recommendation: 'ALL-ELECTRIC + SOLAR — Best outcome', annual_cost: 'Est. $800–$1,300/yr', note: 'Solar-powered all-electric HVAC is the gold standard for carbon and cost. Optimal DFW setup for environmentally conscious homeowners.' },
    'Unknown — skip to general recommendation': { recommendation: 'ALL-ELECTRIC — Carbon goal drives the decision', annual_cost: 'Est. $1,400–$2,100/yr', note: 'For carbon-conscious DFW homeowners, all-electric heat pump is the answer. Pair with a green energy plan for maximum impact.' },
  },
};

export default function DFWHVACDualFuelGuide() {
  const [situation, setSituation] = useState('');
  const [energyCost, setEnergyCost] = useState('');

  const result = situation && energyCost ? matrix[situation]?.[energyCost] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Dual Fuel (Hybrid) Heat Pump Guide</h1>
        <p style={{ color: '#A0AEC0', marginBottom: '2rem', fontSize: '0.97rem' }}>Heat pump + gas backup — why DFW is an ideal market for this system, and when all-electric wins instead.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🔥❄️ Why Dual Fuel Makes Sense in DFW</h2>
          <p style={{ color: '#CBD5E0', fontSize: '0.93rem', lineHeight: 1.7 }}>DFW has 8+ months of cooling season where heat pumps are highly efficient. The rare DFW winter (averaging fewer than 25 days below 35°F) is where gas backup earns its keep — heat pumps lose efficiency below freezing and gas provides reliable heat during events like the 2021 freeze. The tradeoff: dual fuel systems cost $2,000–$4,000 more than a comparable single-fuel system. The payback comes from running the heat pump (COP 3–4x) instead of a gas furnace for most of the year.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>📊 Your DFW Situation + Energy Costs → Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>YOUR SITUATION</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select situation...</option>
                {situations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>ENERGY COSTS</label>
              <select value={energyCost} onChange={e => setEnergyCost(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select cost profile...</option>
                {energyCosts.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642', display: 'grid', gap: '0.75rem' }}>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>✅ RECOMMENDATION</div>
                <p style={{ color: '#CBD5E0', fontSize: '1rem', fontWeight: 600 }}>{result.recommendation}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>💰 ESTIMATED ANNUAL HVAC COST</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem' }}>{result.annual_cost}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>📋 EXPLANATION</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem', lineHeight: 1.6 }}>{result.note}</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#4A6080', fontSize: '0.78rem', textAlign: 'center' }}>ProLnk • DFW HVAC Dual Fuel Guide • Annual cost estimates based on 2,500 sq ft DFW home, 2026 pricing</div>
      </div>
    </div>
  );
}
