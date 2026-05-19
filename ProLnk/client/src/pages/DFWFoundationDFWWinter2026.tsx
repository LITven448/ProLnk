import { useState } from 'react';

const situations = [
  { id: 'watering', label: '💧 When to reduce watering', guide: ['Begin reducing irrigation in early October — not abruptly, gradually over 3–4 weeks', 'DFW clay swells when wet and shrinks when dry — abrupt stop causes rapid shrinkage', 'Target: reduce by 25% in early Oct, 50% by mid-Oct, minimal by Nov 1', 'Exception: if fall is unusually dry (< 1 inch rain in 2 weeks), maintain moderate watering', 'Post-freeze: resume watering after 48 hours if soil feels dry — clay re-expansion prevents cracking' ]},
  { id: 'drainage', label: '🌧️ Drainage before winter rains', guide: ['DFW winter rains can be heavy — ensure all downspouts discharge 4+ feet from foundation', 'Check that soil slopes away from foundation at 6 inches per 10 feet', 'Clear French drain inlets of leaves before November — clogged drains pool at foundation', 'Inspect window wells for leaf accumulation — water pooling at window wells reaches foundation', 'Any ponding within 3 feet of foundation after rain = drainage problem, call Charter pro' ]},
  { id: 'pier-beam', label: '🏗️ Pier & beam in winter', guide: ['Exposed crawl space perimeters are vulnerable to freeze — inspect all vents and access points', 'Close crawl space vents in winter to protect plumbing and wood framing beneath floors', 'Check for any standing water in crawl space — moisture + freeze = wood damage and mold', 'Insulate water pipes visible in crawl space with foam sleeve before first freeze', 'Post-freeze: inspect for new squeaks or soft spots in floor — signs of pier movement' ]},
  { id: 'post-freeze', label: '🔍 Post-freeze assessment', guide: ['After any freeze below 28°F, walk the perimeter and check for new cracks — photograph them', 'Hairline cracks (< 1/16 inch) in brick are normal seasonal movement — monitor over 30 days', 'Stair-step cracks in brick mortar after freeze = differential settlement, call Charter pro', 'Interior: check for new door sticking, cabinet gaps, or drywall cracks — document with photos', 'A Charter foundation pro can assess within 48 hours of a significant freeze event' ]},
];

export default function DFWFoundationDFWWinter2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.5rem' }}>DFW Foundation Winter Care Guide 2026</h1>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.95rem' }}>DFW Expansive Clay: protecting your foundation through the freeze-thaw cycle.</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>🔍 What is your DFW foundation winter situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1A2A45', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #2A3A55'), borderRadius: 8, padding: '0.75rem', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>🏠 Your Foundation Winter Care Guide</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.guide.map((tip, i) => (
                <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.5, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E2D4A' }}>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.85rem', textAlign: 'center' }}>
            🏠 ProLnk Charter foundation pros in DFW — <span style={{ color: '#F5E642′ }}>join waitlist for priority access</span>
          </p>
        </div>
      </div>
    </div>
  );
}