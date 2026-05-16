import { useState } from 'react';

const homeFeatures = ['Pre-1990 minimal insulation', '1990-2010 standard insulation', 'Post-2010 modern insulation', 'Upgraded / spray foam insulation'];
const tempTargets = ['15-20°F (rare DFW cold snap)', '5-14°F (major event, 2021 range)', '0-4°F (extreme, 2021 worst case)', 'Below 0°F (record territory)'];

type ColdResult = { riskLevel: string; color: string; heatPumpNote: string; pipePriorities: string[]; hvacActions: string[]; emergencyHeat: string[]; diyVsPro: { diy: string[]; pro: string[] } };

const coldMatrix: Record<string, Record<string, ColdResult>> = {
  'Pre-1990 minimal insulation': {
    '0-4°F (extreme, 2021 worst case)': { riskLevel: 'CRITICAL', color: '#DC2626', heatPumpNote: 'Heat pump provides ZERO heat at these temps. Emergency heat strips mandatory — grid may fail under load.', pipePriorities: ['All exposed pipes will freeze within 2-4 hours at 0°F', 'Garage water lines: shut off and drain the garage supply', 'Attic water lines: drain and shut off at branch valve', 'Exterior wall pipes: keep trickle running or drain', 'Water heater: insulate or drain if power lost for 6+ hours'], hvacActions: ['Switch to emergency heat IMMEDIATELY at 17°F', 'Set to 68°F — do not try to maintain higher temps (grid strain)', 'If power out: shut HVAC off, conserve heat in one room', 'Space heater in bathroom to prevent pipe freeze at most vulnerable point'], emergencyHeat: ['1500W electric heater per room you occupy', 'Propane heater with CO detector — open window 1 inch', 'Extra blankets and sleeping bags rated to -10°F or colder', 'Body heat: gather family in one interior room'], diyVsPro: { diy: ['Dripping faucets (both hot and cold)', 'Opening cabinet doors on exterior walls', 'Setting space heaters in critical areas', 'Wrapping pipes with foam insulation tubes'], pro: ['Heat tape installation on any pipe (requires outlet access)', 'Pipe rerouting away from exterior walls', 'Adding attic insulation before winter', 'Emergency HVAC repair during event'] } },
    '5-14°F (major event, 2021 range)': { riskLevel: 'VERY HIGH', color: '#EF4444', heatPumpNote: 'Heat pump efficiency below 25% at 10°F. Emergency heat strips will run near-constantly. Electric bill will spike $400-800 for a week event.', pipePriorities: ['Garage and attic pipes will freeze by night 2 without action', 'Drip all faucets beginning when temp drops below 20°F', 'Open cabinet doors under all exterior wall sinks', 'Know main shutoff location — practice turning it off'], hvacActions: ['Emergency heat mode when outdoor temp drops to 20°F', 'Programmable thermostat to 68°F constant — no setback', 'Check air filters — clogged filters cause emergency heat to overheat'], emergencyHeat: ['Space heaters at critical pipe locations (bathroom, kitchen)', 'Generator backup for heat strips if power interruption occurs'], diyVsPro: { diy: ['Foam pipe insulation on garage lines', 'Faucet dripping protocol', 'Cabinet door opening routine'], pro: ['Heat tape installation', 'Pre-season HVAC emergency heat test', 'Pipe insulation in crawl space or attic'] } },
  },
  '1990-2010 standard insulation': {
    '5-14°F (major event, 2021 range)': { riskLevel: 'HIGH', color: '#EF4444', heatPumpNote: 'Standard DFW heat pump struggles below 20°F. Emergency heat may be needed for 30-50% of a major cold event.', pipePriorities: ['Garage pipes remain highest risk even with good house insulation', 'Drip at 20°F forecast — cheap insurance against major damage', 'Main shutoff practice is critical for this home age'], hvacActions: ['Emergency heat mode at 17°F outdoor temp', 'Do not lower thermostat below 65°F even at night during cold events', 'Check that emergency heat strips are functional before winter'], emergencyHeat: ['Space heaters as supplement in garage and bathrooms', 'Wool blankets and sleeping bags as backup'], diyVsPro: { diy: ['Dripping faucets', 'Foam insulation on garage pipes', 'Weatherstripping door check'], pro: ['Heat pump maintenance and emergency heat test', 'Attic air sealing for improved performance', 'Garage door insulation kit installation'] } },
    '15-20°F (rare DFW cold snap)': { riskLevel: 'MODERATE', color: '#F97316', heatPumpNote: 'Heat pump handles this range with 50-70% efficiency. Expect higher electric bills but should maintain comfort.', pipePriorities: ['Precautionary drip if temps stay below 20°F for more than 12 hours', 'Garage pipes — monitor, insulate if not already done'], hvacActions: ['Heat pump handles this — no emergency heat needed typically', 'Set thermostat to 68°F and leave it'], emergencyHeat: ['Keep space heater on hand for garage or vulnerable areas'], diyVsPro: { diy: ['Precautionary faucet drip', 'Open cabinet doors if nervous'], pro: ['Optional: pre-season tune-up'] } },
  },
  'Post-2010 modern insulation': {
    '5-14°F (major event, 2021 range)': { riskLevel: 'MODERATE', color: '#F97316', heatPumpNote: 'Modern insulation provides significant buffer. Home retains heat longer during power outages, buying time to act.', pipePriorities: ['Check for any garage or attic pipe exposure — address before winter', 'Drip at 15°F or below as precaution', 'Main shutoff location practice still important'], hvacActions: ['Emergency heat at 17°F outdoor temp', 'Modern home may only need emergency heat for coldest 6-12 hours'], emergencyHeat: ['Space heaters available but likely minimal use needed'], diyVsPro: { diy: ['Drip protocol at extreme cold', 'Ensure all penetrations are sealed'], pro: ['Heat pump maintenance and emergency heat verification'] } },
    'Below 0°F (record territory)': { riskLevel: 'HIGH', color: '#EF4444', heatPumpNote: 'No heat pump works below 0°F. Even modern homes need supplemental heat for extended sub-zero events.', pipePriorities: ['Even well-insulated homes will freeze at extended sub-zero temps', 'Full pipe drip protocol plus drain rarely used lines', 'Consider temporary pipe heat tape on known vulnerable points'], hvacActions: ['Emergency heat only — heat pump completely off', 'Generator sized for emergency heat strips mandatory preparation'], emergencyHeat: ['Generator or propane backup essential for sub-zero events', 'Plan for potential 5-7 day power disruption scenario'], diyVsPro: { diy: ['Pipe drip protocol', 'Emergency supply kit preparation'], pro: ['Emergency heat system upgrade (add gas backup)', 'Generator installation before season'] } },
  },
  'Upgraded / spray foam insulation': {
    '5-14°F (major event, 2021 range)': { riskLevel: 'LOW-MODERATE', color: '#EAB308', heatPumpNote: 'Spray foam homes perform dramatically better. Interior temp drops slowly, buying 12-24+ hours during power loss.', pipePriorities: ['Minimal pipe risk if all pipes are interior', 'Verify no exposed pipes were missed during renovation', 'Drip as precaution below 10°F'], hvacActions: ['Emergency heat at coldest hours', 'May be able to maintain 60°F interior for 24+ hours without heat during power loss'], emergencyHeat: ['Minimal supplemental heat needed — focus on others in community'], diyVsPro: { diy: ['Verify no exposed pipe gaps from upgrades', 'Drip protocol as precaution'], pro: ['Annual verification of spray foam integrity at penetrations'] } },
    'Below 0°F (record territory)': { riskLevel: 'MODERATE', color: '#F97316', heatPumpNote: 'Even spray foam homes need heating at sub-zero temps. Advantage is heat retention during outages.', pipePriorities: ['Full precautionary drip protocol at sub-zero', 'Even best-insulated homes freeze at extended sub-zero'], hvacActions: ['Full emergency heat mode', 'Generator backup strongly recommended for extended events'], emergencyHeat: ['Generator or propane backup still needed for 48+ hour outages'], diyVsPro: { diy: ['Standard extreme cold protocol applies'], pro: ['Generator installation provides the last missing piece'] } },
  },
};

export default function DFWExtremeColdGuide() {
  const [homeFeature, setHomeFeature] = useState('');
  const [tempTarget, setTempTarget] = useState('');
  const result: ColdResult | null = homeFeature && tempTarget ? (coldMatrix[homeFeature]?.[tempTarget] ?? null) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🥶 DFW Extreme Cold Guide</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>Below 20°F in DFW: What Your Home Can Handle</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.6 }}>DFW homes are engineered for Texas heat, not northern winters. When temperatures drop below 20°F — especially sustained for 48+ hours — systems designed for mild winters fail in predictable, preventable ways. Know your home's limits before the next event.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ emoji: '🔋', title: 'Heat Pump Physics', desc: 'Heat pumps move heat from outside air into your home. At 17°F, there is not enough heat energy in the air to move efficiently. Below 10°F, they produce almost no heat despite running constantly.' }, { emoji: '🔌', title: 'Emergency Heat Strips', desc: 'Electric heat strips in your air handler work like a giant hair dryer — they work at any temp but use 3-5x more electricity. Every home running strips at once causes grid strain — exactly what happened in 2021.' }, { emoji: '🧊', title: 'Pipe Freeze Timeline', desc: 'At 20°F: exposed pipes freeze in 6+ hours. At 10°F: exposed pipes freeze in 2-3 hours. At 0°F: exposed pipes freeze in 1-2 hours. Interior pipes in unheated spaces are the hidden risk.' }, { emoji: '🏠', title: 'Northern vs. Texas Homes', desc: "A Minneapolis home at -10°F stays warm because its walls are R-21 or higher, pipes run through conditioned space, and mechanical systems are sized for cold. DFW standard is R-13 walls — designed for summer, not survival." }].map(c => (
            <div key={c.title} style={{ background: '#132038', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Your Extreme Cold Risk Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Home Insulation Level</label>
              <select value={homeFeature} onChange={e => setHomeFeature(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                <option value="">Select insulation...</option>
                {homeFeatures.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Expected Low Temperature</label>
              <select value={tempTarget} onChange={e => setTempTarget(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                <option value="">Select temperature range...</option>
                {tempTargets.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div>
              <div style={{ background: result.color + '22', border: `2px solid ${result.color}`, borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: result.color }}>Risk Level: {result.riskLevel}</div>
                </div>
                <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>🔑 Heat Pump: {result.heatPumpNote}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[{ title: '🚰 Pipe Protection Priority', items: result.pipePriorities }, { title: '🌡️ HVAC Actions', items: result.hvacActions }, { title: '🔥 Emergency Heat Options', items: result.emergencyHeat }].map(s => (
                  <div key={s.title} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>{s.title}</div>
                    {s.items.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                  </div>
                ))}
                <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>🔧 DIY vs. Pro Tasks</div>
                  <div style={{ color: '#22C55E', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>Do It Yourself:</div>
                  {result.diyVsPro.diy.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{item}</div>)}
                  <div style={{ color: '#F97316', fontSize: '0.75rem', fontWeight: 600, margin: '0.5rem 0 0.25rem' }}>Call a Pro:</div>
                  {result.diyVsPro.pro.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{item}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>📞 DFW Emergency Resources</div>
          <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>Oncor power outage: 888-313-4747. Atmos Gas emergency: 866-322-8667. 211 Texas for warming centers. 911 for medical emergencies related to cold. ERCOT does not take consumer calls — contact your retail electric provider. Sign up for Wireless Emergency Alerts and county emergency notification systems.</div>
        </div>
      </div>
    </div>
  );
}
