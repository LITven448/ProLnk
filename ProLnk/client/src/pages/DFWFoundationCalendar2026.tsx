import { useState } from 'react';

const MONTHS = [
  { name: 'January', short: 'Jan', tasks: ['Walk perimeter — look for new cracks from winter dry spell', 'Check interior walls and door frames for misalignment', 'Document crack widths with photos'], urgency: 'MEDIUM', context: 'DFW January is dry. Expansive clay soil contracts — cracks from last fall may worsen.' },
  { name: 'February', short: 'Feb', tasks: ['Continue monitoring crack widths', 'Ensure downspouts extend 6ft from foundation', 'Check garage door for misalignment (early foundation signal)'], urgency: 'LOW', context: 'Dry conditions persist. Foundation stress is moderate but cumulative.' },
  { name: 'March', short: 'Mar', tasks: ['Install soaker hoses 18″ from foundation if not already in place', 'Begin managed watering schedule after winter dry spell', 'Check drainage grading around home'], urgency: 'HIGH', context: 'Spring rains are irregular in DFW. Manual watering fills the gaps to stabilize clay soil.' },
  { name: 'April', short: 'Apr', tasks: ['Start consistent watering schedule (2-3x week)', 'Inspect for new cracks after spring rain events', 'Check basement/crawlspace for moisture intrusion', 'Verify window and door operation — sticking indicates movement'], urgency: 'HIGH', context: 'Spring rains can cause rapid soil expansion after winter dryness — monitor closely.' },
  { name: 'May', short: 'May', tasks: ['Inspect all interior and exterior cracks after spring rains', 'Look for stair-step cracks in brick — serious signal', 'Check utility penetrations for new gaps', 'Consult structural engineer if new cracks exceed 1/4″'], urgency: 'HIGH', context: 'Spring rain cycle ends. Soil transitions from wet to dry. Differential movement peaks.' },
  { name: 'June', short: 'Jun', tasks: ['Increase watering frequency as heat rises', 'Monitor water bill — leaks can over-saturate soil near foundation', 'Check irrigation system for breaks near foundation'], urgency: 'HIGH', context: 'DFW summer heat begins. Clay soil starts drying rapidly. Watering is now critical.' },
  { name: 'July', short: 'Jul', tasks: ['Maximum watering frequency — daily in extreme heat', 'Check soaker hose coverage — no gaps', 'Inspect cracks weekly during peak drought', 'Keep mulch 2-3″ deep to retain soil moisture'], urgency: 'HIGH', context: 'Peak heat. DFW clay soil loses moisture fastest in July. Foundation at highest risk.' },
  { name: 'August', short: 'Aug', tasks: ['Continue maximum watering', 'Check for doors and windows that have stopped sticking (soil may have re-expanded)', 'Survey all cracks — document changes', 'Do not allow soil to pull away from foundation more than 1″'], urgency: 'HIGH', context: 'Second driest month. Maintain consistent moisture to prevent differential settlement.' },
  { name: 'September', short: 'Sep', tasks: ['Begin reducing watering as temps drop', 'Post-summer full inspection — photograph all cracks', 'Check plumbing under slab for leaks (common after stress cycle)', 'Look for new floor tile cracks'], urgency: 'HIGH', context: 'End of drought stress period. Document cumulative summer damage before winter.' },
  { name: 'October', short: 'Oct', tasks: ['Thorough crack survey after summer stress', 'Have cracks larger than 1/4″ evaluated by engineer', 'Adjust grading if soil has settled away from home', 'Reduce watering but do not stop'], urgency: 'HIGH', context: 'Fall inspection is critical. Foundation damage from summer becomes visible now.' },
  { name: 'November', short: 'Nov', tasks: ['Continue moderate watering until ground freezes', 'Ensure gutters are clear for winter rain drainage', 'Final pre-winter inspection of all exterior cracks'], urgency: 'MEDIUM', context: 'DFW winters are mild. Keep some watering going — clay never fully stops moving.' },
  { name: 'December', short: 'Dec', tasks: ['Reduce but do not stop watering during cold spells', 'Check for freeze damage to plumbing that runs under slab', 'Plan spring inspection with engineer if cracks worsened this year'], urgency: 'MEDIUM', context: 'Mild winters but freeze events can burst slab-level pipes — major foundation risk.' },
];

const URGENCY_COLOR = { HIGH: '#F5E642', MEDIUM: '#60A5FA', LOW: '#34D399′ };

export default function DFWFoundationCalendar2026() {
  const [selected, setSelected] = useState(2);
  const month = MONTHS[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Foundation Seasonal Calendar 2026</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>DFW expansive clay soil requires year-round management — click a month to see what to do</p>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 10, padding: '12px 20px', marginBottom: 24, border: '1px solid #F5E64244′ }}>
          <p style={{ margin: 0, color: '#CBD5E1', fontSize: 14 }}>⚠️ <strong style={{ color: '#F5E642′ }}>DFW Soil Alert:</strong> North Texas expansive clay ("black gumbo") swells when wet and shrinks when dry. This seasonal cycle is the #1 cause of foundation damage in DFW. Consistent moisture is the only long-term fix.</p>
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
            <p style={{ margin: 0, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>🌱 <strong style={{ color: '#F5E642′ }}>DFW Soil Conditions:</strong> {month.context}</p>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {month.tasks.map((task, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < month.tasks.length - 1 ? '1px solid #0F172A' : 'none' }}>
                <span style={{ color: '#F5E642', fontSize: 16, marginTop: 1 }}>✓</span>
                <span style={{ color: '#E2E8F0', fontSize: 15 }}>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748B', fontSize: 13 }}>
          🔧 Foundation concerns? <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk connects you with licensed DFW foundation specialists.</span>
        </div>
      </div>
    </div>
  );
}
