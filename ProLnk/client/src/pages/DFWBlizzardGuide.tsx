import { useState } from 'react';

const insulationLevels = ['Minimal (1970s-1980s construction)', 'Standard (1990s-2000s construction)', 'Modern (post-2010, good insulation)', 'High performance (spray foam, upgraded)'];
const pipeExposures = ['Many exposed pipes in unconditioned spaces', 'Some pipes in garage or exterior walls', 'Mostly interior plumbing', 'All pipes interior / well-insulated'];

type Result = { vulnerability: string; color: string; pipeRisk: string; pipeColor: string; heatIssues: string[]; pipePlan: string[]; backupHeat: string[]; emergencySteps: string[] };

const blizzardMap: Record<string, Record<string, Result>> = {
  'Minimal (1970s-1980s construction)': {
    'Many exposed pipes in unconditioned spaces': { vulnerability: 'CRITICAL', color: '#DC2626', pipeRisk: 'VERY HIGH', pipeColor: '#DC2626', heatIssues: ['Older attic insulation R-11 to R-19 — far below R-38 needed for extreme cold', 'Air infiltration through old wall penetrations drops interior temp 10-15°F overnight', 'Single-pane windows lose heat at 4x rate of modern windows', 'Draft gaps around doors can freeze pipes in adjacent walls'], pipePlan: ['Wrap all exposed pipes with heat tape before winter', 'Insulate crawl space and garage water lines immediately', 'Know location of main water shutoff — practice turning it off', 'Drip all faucets when temps forecast below 20°F', 'Open cabinet doors under sinks on exterior walls'], backupHeat: ['Electric space heaters minimum 1500W per main room', 'Propane buddy heater for backup (never run overnight unventilated)', 'Kerosene heater as last resort — serious CO risk, door cracked required', 'Identify nearby warming center in advance'], emergencySteps: ['If pipes burst: shut main immediately, call plumber, document with photos', 'If heat fails: gather family in one interior room, use sleeping bags', 'At 50°F interior: leave home and go to warming center', 'Call 211 for Texas emergency assistance'] },
    'Mostly interior plumbing': { vulnerability: 'HIGH', color: '#EF4444', pipeRisk: 'MODERATE', pipeColor: '#F97316', heatIssues: ['Poor insulation still means rapid interior temperature drop during power outages', 'Attic pipes remain at risk even in mostly-interior homes', 'Older HVAC system efficiency drops sharply below 30°F'], pipePlan: ['Insulate attic water lines if any pass through attic', 'Drip faucets during sub-25°F forecasts', 'Know shutoff valve location'], backupHeat: ['Space heaters for key rooms', 'Camping gear as backup sleeping system', 'Neighbor network for mutual warming'], emergencySteps: ['At power loss: turn down water heater, drip faucets', 'Check on elderly neighbors', 'Charge devices and portable power banks before storm'] },
  },
  'Standard (1990s-2000s construction)': {
    'Some pipes in garage or exterior walls': { vulnerability: 'HIGH', color: '#EF4444', pipeRisk: 'HIGH', pipeColor: '#EF4444', heatIssues: ['Garage water lines are the single most common pipe freeze failure in DFW', '1990s-2000s homes have moderate insulation but garage is often uninsulated', 'Heat pump efficiency falls to near-zero below 17°F — backup heat essential'], pipePlan: ['Insulate garage water lines — most critical action for this profile', 'Wrap any exterior wall plumbing with heat tape', 'Drip both hot and cold at below-freezing forecasts', 'Know how to switch HVAC to emergency heat mode'], backupHeat: ['Heat pump emergency heat mode must be tested before winter', 'Space heaters as supplement at 20°F and below', 'Generator sized for HVAC emergency heat strip minimum'], emergencySteps: ['Switch HVAC to emergency heat at 17°F outdoor temp', 'Open garage door briefly to check pipe integrity — do not leave open', 'If garage pipes freeze: do NOT use torch, use hair dryer on low'] },
    'Mostly interior plumbing': { vulnerability: 'MODERATE', color: '#F97316', pipeRisk: 'LOW-MODERATE', pipeColor: '#EAB308', heatIssues: ['Standard insulation adequate for normal DFW winters — not February 2021 level cold', 'Expect 3-5°F interior drop per hour during extended power outage', 'Heat pump performance limited below 25°F'], pipePlan: ['Drip faucets for forecasts below 20°F', 'Know shutoff valve location', 'Attic inspection for any overlooked pipe exposure'], backupHeat: ['Space heaters for key rooms', 'Emergency heat mode on heat pump ready to activate'], emergencySteps: ['Standard 2021-type prep: food, water, warmth plan', 'Know your HVAC emergency heat mode toggle'] },
  },
  'Modern (post-2010, good insulation)': {
    'Many exposed pipes in unconditioned spaces': { vulnerability: 'MODERATE', color: '#F97316', pipeRisk: 'MODERATE-HIGH', pipeColor: '#F97316', heatIssues: ['Modern envelope insulation is good — pipe exposure is the remaining weak point', 'Modern homes often have lower infiltration but garage/crawl pipes still freeze'], pipePlan: ['Address exposed pipe vulnerability despite good insulation', 'Insulate and heat-tape all unconditioned space pipes', 'Drip all faucets for any sub-20°F forecast'], backupHeat: ['Modern home retains heat well — focus on maintaining one room at 60°F+', 'Generator or power bank for sump pump if applicable'], emergencySteps: ['Modern home buys time — use it to call for help or arrange shelter', 'Even well-insulated homes lose heat to 50°F within 12-24hr at 0°F outdoor'] },
    'All pipes interior / well-insulated': { vulnerability: 'LOW', color: '#22C55E', pipeRisk: 'LOW', pipeColor: '#22C55E', heatIssues: ['Best-case DFW blizzard scenario — well-equipped for extended cold', 'Still vulnerable to extended power outages beyond 48 hours at extreme cold'], pipePlan: ['Precautionary drip at sub-15°F forecasts', 'Verify main shutoff location annually'], backupHeat: ['Space heaters as supplemental only', 'Focus generator on refrigeration and medical equipment'], emergencySteps: ['Check on neighbors who may be less prepared', 'Report downed lines and utility issues to 911'] },
  },
};

export default function DFWBlizzardGuide() {
  const [insulation, setInsulation] = useState('');
  const [pipes, setPipes] = useState('');
  const result: Result | null = insulation && pipes ? (blizzardMap[insulation]?.[pipes] ?? null) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❄️ DFW Blizzard & Extreme Winter Guide</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>February 2021 Taught DFW a Hard Lesson</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.6 }}>The February 2021 winter storm killed 246 Texans and caused $195 billion in damage. DFW homes are built for 100°F summers, not sustained sub-10°F temperatures. A repeat event is possible — the same weather pattern that caused it can occur again.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ emoji: '🌡️', title: 'The Design Mismatch', desc: 'DFW homes are insulated for summer heat, not winter cold. A Texas home loses heat 2-3x faster than a Minnesota home of the same size during an extreme cold event.' }, { emoji: '🚰', title: 'Why Pipes Burst', desc: "Water pipes in DFW garages, attics, and exterior walls are often uninsulated. At sustained sub-20°F, they freeze within hours. The burst happens when ice melts — pressure release creates the flood." }, { emoji: '⚡', title: 'Heat Pump Limits', desc: 'Most DFW homes use heat pumps that lose efficiency dramatically below 25°F and stop heating entirely near 17°F. Emergency heat strips use 3-5x more electricity — causing grid strain.' }, { emoji: '📦', title: 'Supply Chain Collapse', desc: 'In 2021, plumbers were booked 2 weeks out, pipe repair parts sold out in 48 hours, and hotel rooms were unavailable within 100 miles. Prepare now, not during the event.' }].map(c => (
            <div key={c.title} style={{ background: '#132038', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Your Extreme Cold Vulnerability</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Home Insulation Level</label>
              <select value={insulation} onChange={e => setInsulation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                <option value="">Select insulation level...</option>
                {insulationLevels.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Pipe Exposure Level</label>
              <select value={pipes} onChange={e => setPipes(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                <option value="">Select pipe exposure...</option>
                {pipeExposures.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: result.color + '22', border: `2px solid ${result.color}`, borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#94A3B8′ }}>Overall Vulnerability</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: result.color }}>{result.vulnerability}</div>
                </div>
                <div style={{ background: result.pipeColor + '22', border: `2px solid ${result.pipeColor}`, borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: '#94A3B8′ }}>Pipe Freeze Risk</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: result.pipeColor }}>{result.pipeRisk}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[{ title: '🌡️ Heat System Issues', items: result.heatIssues }, { title: '🚰 Pipe Protection Plan', items: result.pipePlan }, { title: '🔥 Backup Heat Options', items: result.backupHeat }, { title: '🚨 Emergency Steps', items: result.emergencySteps }].map(s => (
                  <div key={s.title} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>{s.title}</div>
                    {s.items.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', border: '1px solid #1E40AF', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#93C5FD', marginBottom: '0.5rem' }}>📋 Build Your Blizzard Kit Now</div>
          <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>72 hours of water (1 gallon per person per day), non-perishable food, battery-powered or hand-crank radio, flashlights and extra batteries, first aid kit, 7-day supply of medications, warm blankets and sleeping bags rated to 0°F, portable phone charger, and cash. Store separately from main pantry so it's ready to grab.</div>
        </div>
      </div>
    </div>
  );
}
