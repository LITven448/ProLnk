import { useState } from 'react';

const homeTypes = ['Current home, planning to stay 15+ years', 'Investment property / rental', 'Selling within 5 years', 'New build — specifying now', 'Older home, complete renovation underway'];
const futureGoals = ['Add solar panels in next 3–5 years', 'Add EV (electric vehicle) in next 2–3 years', 'Add battery backup / whole-home generator', 'Reduce or eliminate gas dependency', 'Maximize resale value in DFW market', 'All of the above — full future-proofing'];

type FutureRec = { checklist: string[]; add_now: string; cost: string };

const matrix: Record<string, Record<string, FutureRec>> = {
  'Current home, planning to stay 15+ years': {
    'Add solar panels in next 3–5 years': { checklist: ['Install inverter heat pump system (not gas furnace)', 'Specify 200A main panel if not already present', 'Pre-run conduit from panel to future solar connection point', 'Ask HVAC installer about solar-compatible thermostat wiring', 'Verify roof structure can handle panel weight'], add_now: 'Pre-run electrical conduit for solar ($300–$600). Ensure panel capacity. Choose heat pump over gas to maximize solar\’s value.', cost: '$400–$800 in future-proofing additions to a standard HVAC replacement' },
    'Add EV (electric vehicle) in next 2–3 years': { checklist: ['Confirm 200A main panel or plan upgrade ($1,500–$3,000)', 'Pre-run 50A circuit to garage during HVAC work ($400–$900)', 'Choose heat pump system to reduce gas dependency', 'Install smart energy monitor to track load balance', 'Coordinate with HVAC electrician to add EV circuit same trip'], add_now: 'Run 50A garage circuit while electrician is already on-site for HVAC work. Massive labor savings vs. separate trip later.', cost: '$600–$1,200 added to HVAC project for EV circuit' },
    'Add battery backup / whole-home generator': { checklist: ['Verify or upgrade to 200A panel', 'Install transfer switch or smart panel (Span, Lumin, or Leviton)', 'Choose heat pump system sized for battery backup operation', 'Pre-wire battery connection point in garage or utility room', 'Verify heat pump startup load is within planned battery capacity'], add_now: 'Smart sub-panel or transfer switch pre-installation ($800–$2,500) while electrician is already working. Eliminates later disruption.', cost: '$1,000–$3,000 in electrical future-proofing' },
    'Reduce or eliminate gas dependency': { checklist: ['Install all-electric heat pump (no gas furnace)', 'Add whole-home dehumidifier (eliminates gas dryer heat issue)', 'Plan gas appliance replacement timeline (water heater, range, dryer)', 'Size electrical panel for future all-electric load (200A minimum)', 'Consider heat pump water heater simultaneously ($1,200–$2,000)'], add_now: 'All-electric heat pump now. Heat pump water heater if water heater is also aging. Single electrical upgrade covers both.', cost: '$500–$1,500 for panel upgrade to support all-electric load' },
    'Maximize resale value in DFW market': { checklist: ['Choose recognizable brand (Carrier, Trane, Lennox) for appraisal', 'Install smart thermostat with data logging', 'Keep all installation documentation and warranties', 'Install high-efficiency unit (18+ SEER2 for marketing value)', 'Air seal and insulate for energy audit score'], add_now: 'Document everything. Energy efficiency improvements add 3–7% to DFW home values. Get a HERS score if replacing whole system.', cost: '$300–$600 for documentation, HERS rating, and premium brand selection' },
    'All of the above — full future-proofing': { checklist: ['200A panel upgrade if not present', 'All-electric inverter heat pump (18+ SEER2)', 'Pre-run conduit for solar', 'Pre-run 50A EV circuit to garage', 'Smart panel (Span or equivalent) for load management', 'Heat pump water heater if water heater aging', 'Whole-home dehumidifier', 'Air seal and insulate to R-60', 'HERS rating post-completion'], add_now: 'Coordinate all trades during one window: HVAC, electrician, insulation. Shared mobilization saves $1,500–$3,000 vs separate projects.', cost: '$3,000–$6,000 in future-proofing additions to standard HVAC project' },
  },
  'Investment property / rental': {
    'Add solar panels in next 3–5 years': { checklist: ['Install heat pump for solar compatibility', 'Verify roof age and condition before solar commitment', 'Ensure panel capacity for future solar', 'Consider commercial solar lease vs ownership for rental'], add_now: 'Heat pump system now. Roof and panel evaluation before committing to solar on a rental.', cost: '$400–$800 above standard HVAC cost' },
    'Add EV (electric vehicle) in next 2–3 years': { checklist: ['Level 2 charger in garage increases rental appeal significantly in DFW', 'Pre-run 50A circuit during HVAC work', 'Verify panel capacity', 'Market EV charging as amenity'], add_now: '50A garage circuit is a high-ROI rental amenity in DFW. Install during HVAC work for minimum cost.', cost: '$600–$1,200 for EV circuit' },
    'Add battery backup / whole-home generator': { checklist: ['Generator or battery backup increases rental premiums post-2021 DFW freeze', 'Transfer switch or smart panel', 'Document for insurance and listing'], add_now: 'Transfer switch pre-installation during HVAC work. Generac or Kohler generator decision can come later.', cost: '$800–$2,000 for transfer switch' },
    'Reduce or eliminate gas dependency': { checklist: ['All-electric reduces utility coordination for tenants', 'Fewer service calls (no gas appliance issues)', 'Higher electric bill but simpler for tenants'], add_now: 'All-electric heat pump. Consider heat pump water heater if water heater is aging.', cost: '$300–$800 premium over standard system' },
    'Maximize resale value in DFW market': { checklist: ['High-efficiency system documentation for listing', 'Smart thermostat appealing to tenants and buyers', 'Comprehensive warranty transferable to buyer'], add_now: 'Transferable warranty and SEER2 documentation. Name-brand system for appraisal support.', cost: '$400–$700 for premium brand and documentation' },
    'All of the above — full future-proofing': { checklist: ['All-electric heat pump', '50A EV circuit', 'Transfer switch for future generator', 'Smart thermostat', 'High-efficiency documentation'], add_now: 'Coordinate all in one project. Investment properties benefit from future-proofing as much as primary residences.', cost: '$2,000–$4,000 in additions' },
  },
  'Selling within 5 years': {
    'Add solar panels in next 3–5 years': { checklist: ['If selling in 5 years, ROI on solar may not work — evaluate carefully', 'Lease solar if at all — avoids title transfer complications', 'Focus on efficiency documentation over solar installation'], add_now: 'Skip solar if selling in 5 years. Focus on HERS rating and efficiency documentation instead.', cost: '$300–$500 for energy documentation vs $15,000+ for solar' },
    'Add EV (electric vehicle) in next 2–3 years': { checklist: ['Level 2 charger is a selling feature in DFW in 2026', 'Pre-run 50A circuit during HVAC work — low cost, high return', 'Market EV-ready home in listing'], add_now: '50A garage circuit during HVAC project. $600–$1,200 investment that can be marketed in listing.', cost: '$600–$1,200′ },
    'Add battery backup / whole-home generator': { checklist: ['Post-2021 DFW freeze, backup power is a real selling feature', 'Transfer switch pre-install is inexpensive and marketable', 'Whole-home generator adds $8,000–$15,000 to home value in DFW'], add_now: 'Transfer switch pre-install now, generator decision later. Market backup-ready as a feature.', cost: '$800–$1,500 for transfer switch' },
    'Reduce or eliminate gas dependency': { checklist: ['All-electric may not match buyer preferences in DFW market', 'Survey target buyer profile for your neighborhood', 'Dual fuel is often more marketable than all-electric in DFW suburbs'], add_now: 'For resale, dual fuel heat pump is often more universally appealing than all-electric in DFW.', cost: 'Neutral — dual fuel vs all-electric price difference is minimal' },
    'Maximize resale value in DFW market': { checklist: ['Install recognizable brand (Trane, Carrier, Lennox)', 'SEER2 18+ for marketing', 'Smart thermostat included', 'Maintain all documentation', 'Get HERS rating', 'Air seal and insulate for energy score'], add_now: 'Every efficiency documentation item. HERS score. Premium brand. Smart thermostat. These are marketing assets.', cost: '$500–$1,200 for all documentation and premium selection' },
    'All of the above — full future-proofing': { checklist: ['50A EV circuit', 'Transfer switch', 'HERS rating', 'Premium brand with documentation', 'Smart thermostat', 'Dual fuel or all-electric depending on neighborhood profile'], add_now: 'Focus on marketable features: EV circuit, backup-ready, efficiency documentation. Skip solar with 5-year horizon.', cost: '$1,500–$3,500 in additions' },
  },
  'New build — specifying now': {
    'Add solar panels in next 3–5 years': { checklist: ['Specify south/west roof orientation with 4:12+ pitch', 'Run conduit from roof to electrical panel during framing', 'Spec 200A+ panel (400A for large home)', 'Spec inverter heat pump system', 'Coordinate solar conduit with framing crew — free during rough-in'], add_now: 'Solar conduit and roof orientation spec during design. Costs nearly nothing at framing, thousands later.', cost: '$200–$500 during construction vs $2,000–$4,000 retrofit' },
    'Add EV (electric vehicle) in next 2–3 years': { checklist: ['Run 50A circuit to all garage bays during rough-in electrical', 'Spec smart panel for load management', 'Spec 400A service if large home with EV + HVAC + solar planned', 'Install J1772 outlet or pre-wire for it'], add_now: '50A garage circuit is $100–$300 during rough-in vs $600–$1,500 as a retrofit. Always spec this on new builds.', cost: '$100–$300 during construction' },
    'Add battery backup / whole-home generator': { checklist: ['Spec smart panel (Span, Lumin) instead of standard panel', 'Pre-run conduit to battery location (garage wall)', 'Spec dedicated circuit for battery system', 'Plan battery location during design — not an afterthought'], add_now: 'Smart panel specification at construction. $1,500–$3,500 premium pays for itself vs retrofit and gives whole-house load management.', cost: '$1,500–$3,500 panel upgrade during construction' },
    'Reduce or eliminate gas dependency': { checklist: ['Specify all-electric from day one', 'Gas line rough-in optional — evaluate cost vs future flexibility', 'Spec heat pump water heater', 'Spec induction range rough-in (same outlet as electric)', 'Spec heat pump dryer outlet'], add_now: 'Full all-electric specification. Gas line rough-in is cheap ($800–$1,500) even if not used, for future flexibility.', cost: 'All-electric appliance spec: minimal premium on new build' },
    'Maximize resale value in DFW market': { checklist: ['HERS rating is standard on new builds — get sub-60 for marketing', 'Spray foam attic (unvented) for best long-term performance', 'Specify premium HVAC brand with transferable warranty', 'EV circuit, solar conduit — check every future-proofing box'], add_now: 'Spec everything during design. New build future-proofing costs 20–30% of retrofit cost.', cost: '$2,000–$5,000 in specs that save $8,000–$15,000 vs retrofit' },
    'All of the above — full future-proofing': { checklist: ['400A service', 'Smart panel', 'Solar conduit + roof orientation', '50A EV circuits (all garage bays)', 'Battery pre-wire', 'All-electric HVAC + water heater', 'Spray foam unvented attic', 'HERS rating target <55', 'Inverter heat pump 20+ SEER2'], add_now: 'Specify everything at design phase. This is the most cost-effective moment for all future-proofing by a wide margin.', cost: '$4,000–$8,000 in specs vs $15,000–$30,000 in retrofit costs' },
  },
  'Older home, complete renovation underway': {
    'Add solar panels in next 3–5 years': { checklist: ['Panel upgrade to 200A+ during renovation', 'Run solar conduit while walls are open', 'Inspect and address roof before renovation closes up attic access', 'Coordinate with HVAC for heat pump spec'], add_now: 'Solar conduit and panel upgrade while walls are open. This is the low-cost window.', cost: '$600–$1,500 during open renovation vs $3,000–$5,000 retrofit' },
    'Add EV (electric vehicle) in next 2–3 years': { checklist: ['50A garage circuit while walls are open', 'Panel upgrade if needed', 'Coordinate with renovation electrician — one trip'], add_now: '50A circuit during renovation is a fraction of retrofit cost. Do it now.', cost: '$300–$700 during renovation' },
    'Add battery backup / whole-home generator': { checklist: ['Smart panel during renovation panel replacement', 'Battery pre-wire location while garage is accessible', 'Transfer switch if keeping generator option open'], add_now: 'Smart panel or transfer switch during renovation electrical work. Minimal incremental cost.', cost: '$800–$2,500 incremental' },
    'Reduce or eliminate gas dependency': { checklist: ['Replace gas appliances during renovation', 'All-electric HVAC and water heater', 'Panel upgrade for all-electric load', 'Remove gas line if going fully electric (saves $30–$60/mo service fee)'], add_now: 'All-electric specification now, while work is underway. This is the right moment.', cost: '$500–$1,500 incremental for all-electric over gas' },
    'Maximize resale value in DFW market': { checklist: ['Document all renovation improvements', 'Permit all work for resale disclosure', 'HERS rating post-renovation', 'Premium brand selection', 'Spray foam attic if budget allows'], add_now: 'Permit everything. Document everything. HERS rating post-renovation. These are resale assets.', cost: '$500–$1,200 for documentation and ratings' },
    'All of the above — full future-proofing': { checklist: ['200A+ panel (400A if large home)', 'Smart panel', 'Solar conduit', '50A EV circuits', 'All-electric HVAC', 'Battery pre-wire', 'Spray foam attic', 'HERS post-renovation'], add_now: 'Coordinate all trades now. Open renovation is the lowest-cost moment for all future-proofing. Never cheaper than this.', cost: '$3,000–$7,000 in additions during renovation' },
  },
};

export default function DFWHVACFutureproofingGuide() {
  const [homeType, setHomeType] = useState('');
  const [goal, setGoal] = useState('');

  const result = homeType && goal ? matrix[homeType]?.[goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>HVAC Future-Proofing Guide</h1>
        <p style={{ color: '#A0AEC0', marginBottom: '2rem', fontSize: '0.97rem' }}>Replacing DFW HVAC in 2026? What to add now to prepare for the next 15–20 years — solar, EV, battery, and beyond.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🔮 Why Future-Proof During HVAC Replacement?</h2>
          <p style={{ color: '#CBD5E0', fontSize: '0.93rem', lineHeight: 1.7 }}>The electrician is already at your house. The walls may already be accessible. Future-proofing during an HVAC replacement costs 10–20% of what it would cost as a standalone project. Running conduit for solar, adding an EV circuit, specifying a smart panel — these decisions made now save thousands later and eliminate major disruptions to your home.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Your Home + Future Goals → Future-Proofing Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>HOME SITUATION</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select situation...</option>
                {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>FUTURE GOAL</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select goal...</option>
                {futureGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642', display: 'grid', gap: '0.75rem' }}>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>✅ FUTURE-PROOFING CHECKLIST</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gap: '0.3rem' }}>
                  {result.checklist.map((item, i) => <li key={i} style={{ color: '#CBD5E0', fontSize: '0.88rem', lineHeight: 1.5 }}>{item}</li>)}
                </ul>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>⚡ WHAT TO ADD NOW</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem', lineHeight: 1.6 }}>{result.add_now}</p>
              </div>
              <div style={{ borderTop: '1px solid #2D4A6E', paddingTop: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.35rem' }}>💰 INCREMENTAL COST</div>
                <p style={{ color: '#A0AEC0', fontSize: '0.88rem' }}>{result.cost}</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ color: '#4A6080', fontSize: '0.78rem', textAlign: 'center' }}>ProLnk • DFW HVAC Future-Proofing Guide • 2026 DFW market estimates</div>
      </div>
    </div>
  );
}
