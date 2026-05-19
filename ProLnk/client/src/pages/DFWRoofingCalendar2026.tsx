import { useState } from 'react';

const MONTHS = [
  { name: 'January', short: 'Jan', tasks: [], urgency: 'LOW', context: 'DFW winters are mild but freeze events happen. Roof stress is minimal — good time to plan.' },
  { name: 'February', short: 'Feb', tasks: ['Inspect flashing around chimneys and skylights', 'Clear gutters from winter debris', 'Check for loose or missing shingles before spring storms', 'Trim tree branches overhanging roof'], urgency: 'HIGH', context: 'Pre-storm prep is critical. DFW spring severe weather season begins in March.' },
  { name: 'March', short: 'Mar', tasks: ['Check attic ventilation after winter', 'Inspect ridge cap shingles', 'Look for granule loss in gutters (aging shingles)', 'Document roof condition with photos for insurance baseline'], urgency: 'MEDIUM', context: 'Storm season ramps up. First major hail events often occur in March.' },
  { name: 'April', short: 'Apr', tasks: ['Post-storm inspection after spring hail events', 'Check for bruised or cracked shingles from hail', 'Inspect valleys and flashing for impact damage', 'File insurance claim promptly if damage found (deadlines apply)', 'Schedule licensed roofer for damage assessment'], urgency: 'HIGH', context: 'Spring storm season peak. DFW averages 3-5 significant hail events in April.' },
  { name: 'May', short: 'May', tasks: ['Hail season peak — inspect after every significant storm', 'Check soft metals (gutters, vents, flashing) for hail dents', 'Photograph any new damage for insurance', 'Verify attic has no new water intrusion'], urgency: 'HIGH', context: 'Peak hail season. DFW is in Tornado Alley — wind and hail events are severe.' },
  { name: 'June', short: 'Jun', tasks: ['Check for storm damage after June fronts', 'Inspect gutters — heavy rains stress gutters', 'Ensure downspouts direct water away from foundation'], urgency: 'MEDIUM', context: 'Heavy rains shift from storm damage to drainage issues. Watch for water infiltration.' },
  { name: 'July', short: 'Jul', tasks: ['Check for heat-related shingle cracking (rare but possible on dark roofs)', 'Inspect attic temp — adequate ventilation prevents premature shingle aging'], urgency: 'LOW', context: 'DFW 96°F+ temps accelerate shingle aging on poorly ventilated roofs.' },
  { name: 'August', short: 'Aug', tasks: ['Check attic ventilation — peak UV stress month', 'Inspect any exposed roof cement/caulk for cracking', 'Start planning fall inspection and gutter cleaning'], urgency: 'LOW', context: 'Driest, hottest month. UV and heat degradation highest. Ventilation is key.' },
  { name: 'September', short: 'Sep', tasks: ['Post-summer inspection — check for heat-related deterioration', 'Inspect flashing sealant for cracking after summer heat cycles', 'Assess shingle granule coverage before fall rains'], urgency: 'MEDIUM', context: 'End of summer stress period. Prepare roof for fall rains before winter.' },
  { name: 'October', short: 'Oct', tasks: ['Full gutter cleaning — leaf season in DFW', 'Inspect gutters for sagging or separation', 'Check downspout extensions', 'Look for moss or algae growth in shaded areas'], urgency: 'HIGH', context: 'Fall foliage clogs gutters fast. Clogged gutters cause fascia rot and foundation issues.' },
  { name: 'November', short: 'Nov', tasks: ['Complete fall inspection before winter', 'Check all flashing and sealants', 'Inspect attic insulation for moisture damage', 'Clear any remaining debris from valleys'], urgency: 'HIGH', context: 'Last chance before winter. DFW freeze events start in December.' },
  { name: 'December', short: 'Dec', tasks: ['Check roof after any freeze event for ice damage', 'Monitor attic for condensation issues in cold snaps', 'Keep emergency roofer contact ready for storm damage'], urgency: 'MEDIUM', context: 'DFW freeze events can cause ice dam formation in poorly ventilated roofs.' },
];

const URGENCY_COLOR = { HIGH: '#F5E642', MEDIUM: '#60A5FA', LOW: '#34D399′ };

export default function DFWRoofingCalendar2026() {
  const [selected, setSelected] = useState(1);
  const month = MONTHS[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roofing Seasonal Calendar 2026</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Click a month — DFW hail and storm season makes timing critical</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 32 }}>
          {MONTHS.map((m, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              background: selected === i ? '#F5E642′ : '#1E293B',
              color: selected === i ? '#0A1628′ : '#94A3B8',
              border: 'none', borderRadius: 8, padding: '10px 4px',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s'
            }}>{m.short}</button>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 32, border: '1px solid #334155′ }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>📅 {month.name} Tasks</h2>
            <span style={{
              background: URGENCY_COLOR[month.urgency] + '22',
              color: URGENCY_COLOR[month.urgency],
              border: `1px solid ${URGENCY_COLOR[month.urgency]}`,
              borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 700
            }}>{month.urgency} PRIORITY</span>
          </div>

          <div style={{ background: '#0F172A', borderRadius: 10, padding: '14px 18px', marginBottom: 20, borderLeft: '3px solid #F5E642′ }}>
            <p style={{ margin: 0, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>⛈️ <strong style={{ color: '#F5E642′ }}>DFW Context:</strong> {month.context}</p>
          </div>

          {month.tasks.length === 0 ? (
            <p style={{ color: '#64748B', fontStyle: 'italic', textAlign: 'center', padding: '20px 0′ }}>Low-activity month — review your roof documentation and plan ahead.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {month.tasks.map((task, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < month.tasks.length - 1 ? '1px solid #0F172A' : 'none' }}>
                  <span style={{ color: '#F5E642', fontSize: 16, marginTop: 1 }}>✓</span>
                  <span style={{ color: '#E2E8F0', fontSize: 15 }}>{task}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748B', fontSize: 13 }}>
          🔧 Storm damage? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk connects you with vetted DFW roofers fast.</span>
        </div>
      </div>
    </div>
  );
}
