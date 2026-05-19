import { useState } from 'react';

const homeFeatures = ['No attic insulation / very old home', 'Standard attic insulation (R-19 to R-30)', 'Good attic insulation (R-38 to R-49)', 'High performance (R-49+, radiant barrier)'];
const heatZones = ['Central Dallas / urban core', 'Suburban (Fort Worth, Plano, Frisco)', 'Outer suburban (Mansfield, Weatherford)', 'Rural / open land DFW fringe'];

type HeatResult = { vulnerability: string; color: string; acRisk: string; foundationRisk: string; protections: string[]; acActions: string[]; foundationActions: string[]; emergencyCooling: string[] };

function getHeatResult(feature: string, zone: string): HeatResult {
  const isUrban = zone === 'Central Dallas / urban core';
  const isPoorInsulation = feature === 'No attic insulation / very old home';
  const isStandard = feature === 'Standard attic insulation (R-19 to R-30)';

  if (isPoorInsulation && isUrban) return { vulnerability: 'CRITICAL', color: '#DC2626', acRisk: 'AC Cannot Keep Up', foundationRisk: 'SEVERE Differential Settlement Risk', protections: ['Install radiant barrier in attic immediately — 10-15°F attic temp reduction', 'Add R-38 blown insulation over existing (most cost-effective upgrade)', 'Whole-house fan for night purge when outdoor temp drops below 80°F', 'Blackout cellular shades on all west and south windows', 'Programmable thermostat: 76°F daytime, 72°F evening'], acActions: ['AC system should be serviced every year — not every 3', 'At 100°F+: your AC cannot maintain 72°F — set to 78°F to prevent system failure', 'Replace air filter monthly during heat dome events', 'Check condensate drain weekly — algae grows fast in summer heat', 'If AC fails: call first, then execute emergency cooling plan'], foundationActions: ['Maintain 18-24 inch soil moisture ring around foundation perimeter', 'Drip irrigation on foundation — 2-3 times per week during drought', 'Foundation inspection by structural engineer if you see new cracks', 'Do NOT let soil pull away from foundation — water immediately'], emergencyCooling: ['Public cooling center locations: Dallas city halls, libraries, rec centers', 'Cool car immediately: open all doors for 2 min before entering', 'Freeze water bottles for cooling vest or neck wrap', 'Neighbors check: 65+ adults and children are highest heat risk', 'Know signs of heat stroke: confused speech, no sweating, 103°F+ body temp'] };

  if (isPoorInsulation) return { vulnerability: 'VERY HIGH', color: '#EF4444', acRisk: 'AC Struggles Above 105°F', foundationRisk: 'HIGH Drying Risk', protections: ['Radiant barrier installation is highest-priority upgrade', 'R-38 blown insulation addition', 'Cellular shades on west and south windows', 'Attic ventilation check — ridge and soffit vents must be clear'], acActions: ['Annual AC service mandatory', 'Set to 78°F max during heat dome — lower risks unit failure', 'Check refrigerant charge — low charge means poor performance at extreme heat'], foundationActions: ['Foundation watering protocol during drought', 'Monitor for new diagonal cracks at door and window corners', 'Keep consistent moisture — do not overwater then dry out'], emergencyCooling: ['Cooling centers in your county', 'Fans plus ice water for personal cooling', 'Stay below second floor — heat rises significantly in poorly insulated homes'] };

  if (isStandard && isUrban) return { vulnerability: 'HIGH', color: '#EF4444', acRisk: 'Marginal at 110°F+', foundationRisk: 'MODERATE-HIGH (Urban Heat Island)', protections: ['Radiant barrier recommended — 5-10°F attic reduction', 'Programmable thermostat with 76°F daytime setpoint', 'West and south window film for solar heat gain reduction', 'Attic fan to reduce attic temps 20-30°F on peak days'], acActions: ['AC service every 2 years minimum', 'At 108°F+: limit internal heat generation (oven, dishwasher, dryer)', 'Extra filter changes during heat dome — dust bakes onto coils'], foundationActions: ['Urban soils dry faster due to heat island — water foundation consistently', 'Inspect for cracks after any 7+ day 100°F+ streak'], emergencyCooling: ['Library, mall, or cooling center as backup', 'Portable AC for one room as emergency backup'] };

  return { vulnerability: 'MODERATE', color: '#F97316', acRisk: 'System Should Handle Up to 108°F', foundationRisk: 'LOW-MODERATE', protections: ['Maintain attic insulation integrity — check for gaps at penetrations', 'Programmable thermostat optimization', 'Ceiling fans to improve perceived comfort at higher thermostat setting'], acActions: ['Biennial AC service', 'Filter change every 60 days in summer', 'Know your SEER rating — older units fail faster in extreme heat'], foundationActions: ['Standard watering during drought', 'Monitor for changes after extended dry spells'], emergencyCooling: ['Portable AC available for bedroom cooling during system stress', 'Know nearest cooling center as backup'] };
}

export default function DFWHeatDomeGuide() {
  const [feature, setFeature] = useState('');
  const [zone, setZone] = useState('');
  const result: HeatResult | null = feature && zone ? getHeatResult(feature, zone) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>☀️ DFW Heat Dome Guide</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>Consecutive 100°F+ Days and What They Do to DFW Homes</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.75rem', lineHeight: 1.6 }}>The 2023 DFW heat dome saw 37 consecutive days above 100°F. Attics hit 160°F+. Foundation soil moisture evaporated across entire blocks. AC systems ran 20+ hours daily. Understanding what extreme sustained heat does to your specific home is the difference between a stressful summer and a catastrophic one.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ emoji: '🌡️', title: '160°F Attics', desc: 'During a heat dome, DFW attics regularly reach 150-170°F. Attic-adjacent rooms see 10-15°F higher temps. HVAC ducts in attic lose 20-30% efficiency in these temps — your AC is fighting physics.' }, { emoji: '🏚️', title: 'Foundation Crisis', desc: "DFW's expansive clay soil shrinks dramatically when dry. Foundation differential settlement occurs when one side of a slab dries faster than another — causing doors to stick, windows to crack, and slabs to move." }, { emoji: '❄️', title: 'AC System Stress', desc: 'AC units are rated for 95°F outdoor design temps. At 108°F+, they run continuously without reaching setpoint. Components overheat, refrigerant pressure spikes, and capacitors fail — summer AC emergencies hit their peak during heat domes.' }, { emoji: '🧱', title: 'Material Degradation', desc: 'Asphalt shingles degrade 30% faster during heat dome summers. Deck boards cup and split. Vinyl siding can warp. Paint oxidizes and chalks. Concrete sealer breaks down. All require attention after extreme heat events.' }].map(c => (
            <div key={c.title} style={{ background: '#132038', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.emoji}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🔍 Your Heat Dome Vulnerability Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Home Insulation & Attic</label>
              <select value={feature} onChange={e => setFeature(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                <option value="">Select insulation...</option>
                {homeFeatures.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.875rem' }}>DFW Heat Zone</label>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E2E8F0', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '0.75rem', fontSize: '0.9rem' }}>
                <option value="">Select zone...</option>
                {heatZones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: result.color + '22', border: `2px solid ${result.color}`, borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Overall Vulnerability</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: result.color }}>{result.vulnerability}</div>
                </div>
                <div style={{ background: '#EF444422', border: '2px solid #EF4444', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>AC Risk</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FCA5A5' }}>{result.acRisk}</div>
                </div>
                <div style={{ background: '#D9770622', border: '2px solid #D97706', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Foundation Risk</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FCD34D' }}>{result.foundationRisk}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[{ title: '🛡️ Protection Strategies', items: result.protections }, { title: '❄️ AC System Actions', items: result.acActions }, { title: '🏚️ Foundation Actions', items: result.foundationActions }, { title: '🆘 Emergency Cooling Plan', items: result.emergencyCooling }].map(s => (
                  <div key={s.title} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem', fontSize: '0.875rem' }}>{s.title}</div>
                    {s.items.map((item, i) => <div key={i} style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{item}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1a0a00', border: '1px solid #B45309', borderRadius: '8px', padding: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#FDE68A', marginBottom: '0.5rem' }}>🌞 Post-Heat Dome Home Inspection Checklist</div>
          <div style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.7 }}>After any 7+ consecutive days above 100°F: inspect roof shingles for granule loss and blistering, check all caulking and sealants (reapply if cracked), inspect deck boards for cupping and splitting, look for new cracks at door and window corners (foundation indicator), service AC system before next summer, and test all weatherstripping for heat degradation.</div>
        </div>
      </div>
    </div>
  );
}
