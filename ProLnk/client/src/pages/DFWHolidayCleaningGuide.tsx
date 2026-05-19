import { useState } from 'react';

const guestCounts = ['Just immediate family (under 10)', '10–25 guests', '25–50 guests', '50+ guests (big DFW gathering)'];
const homeSizes = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', '4,000+ sq ft'];
const focusAreas = ['Indoor only', 'Indoor + outdoor entertaining', 'Outdoor primary (DFW weather permitting)'];

function getHolidayChecklist(guests: string, size: string, focus: string) {
  const bigGathering = guests === '25–50 guests' || guests === '50+ guests (big DFW gathering)';
  const outdoor = focus !== 'Indoor only';
  const large = size === '4,000+ sq ft' || size === '2,500–4,000 sq ft';

  const priority: string[] = [
    '🚽 Guest bathroom: deep scrub toilet, sink, mirrors — primary focus area',
    '🍳 Kitchen: oven, stovetop, counters — cooking smells linger in DFW humidity',
    '🛏️ Guest room(s): fresh linens, clear closet space, extra towels',
    bigGathering ? '🪑 Living/dining room: move furniture for flow, add folding tables' : '🛋️ Living/dining room: declutter and vacuum upholstery',
    '🪟 Windows and glass: DFW cedar pollen film is visible in sunlight',
  ];

  const outdoor_tasks = outdoor ? [
    '🌿 Power wash patio and driveway — DFW November storms leave debris',
    '💡 Test outdoor string lights and pathway lighting',
    '🪑 Wipe down all patio furniture — cool enough in Nov–Dec to use',
    '🍂 Blow leaves from patio and side yards (DFW oak drop is heavy in fall)',
    bigGathering ? '🔥 Clean fire pit and outdoor grill for outdoor entertaining' : '🌡️ Set up outdoor heaters — DFW nights can dip to 30s in December',
  ] : [];

  const timeline = [
    '⏰ 2 weeks out: Book professional clean if needed (slots fill for holidays)',
    '⏰ 1 week out: Deep clean bathrooms, kitchen, guest rooms',
    '⏰ 3 days out: Outdoor areas, windows, declutter common spaces',
    '⏰ Day before: Fresh linens, restock toiletries, final vacuum/mop',
    '⏰ Day of: Spot clean entry, light candles or diffuse scent, chill beverages',
  ];

  const cost = bigGathering
    ? large ? '$350–$650 professional pre-holiday clean' : '$200–$400 professional pre-holiday clean'
    : large ? '$200–$380 professional clean' : '$120–$250 professional clean';

  return { priority, outdoor_tasks, timeline, cost };
}

export default function DFWHolidayCleaningGuide() {
  const [guests, setGuests] = useState('');
  const [size, setSize] = useState('');
  const [focus, setFocus] = useState('');
  const result = guests && size && focus ? getHolidayChecklist(guests, size, focus) : null;

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 14 }}>
      <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {items.map(item => <li key={item} style={{ color: '#CBD5E1' }}>{item}</li>)}
      </ul>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🎄 DFW HOLIDAY HOSTING</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Holiday Hosting Cleaning Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW family gatherings are a big deal — Thanksgiving and Christmas bring extended family from across Texas. The good news: November and December outdoor temps are perfect for patio entertaining.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🌡️', label: 'Nov–Dec Temps', value: '45–70°F' },
            { icon: '🍂', label: 'Oak Leaf Drop', value: 'Sep–Nov' },
            { icon: '🌬️', label: 'Cedar Fever Starts', value: 'Mid-December' },
            { icon: '🎉', label: 'Avg DFW Gathering', value: '20–40 guests' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F1F3D', borderRadius: 10, padding: 14, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🎅 Build My Holiday Clean Plan</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { label: 'EXPECTED GUEST COUNT', val: guests, setter: setGuests, options: guestCounts },
              { label: 'HOME SIZE', val: size, setter: setSize, options: homeSizes },
              { label: 'ENTERTAINING STYLE', val: focus, setter: setFocus, options: focusAreas },
            ].map(({ label, val, setter, options }) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                  <option value=''>Select...</option>
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 16, border: '1px solid #1E3A5F', marginBottom: 16 }}>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>ESTIMATED PROFESSIONAL COST</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginTop: 4 }}>{result.cost}</div>
            </div>
            <Section title="⭐ Priority Cleaning Areas" items={result.priority} />
            {result.outdoor_tasks.length > 0 && <Section title="🌿 Outdoor Entertaining Areas" items={result.outdoor_tasks} />}
            <Section title="📅 Holiday Prep Timeline" items={result.timeline} />
          </div>
        )}
      </div>
    </div>
  );
}
