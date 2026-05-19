import { useState } from 'react';

const concerns = ['Floor elevation changes', 'Door/window sticking', 'Visible cracks', 'Soil moisture', 'General check-in'];

const guides: Record<string, { title: string; steps: string[]; frequency: string; icon: string }> = {
  'Floor elevation changes': {
    title: 'Floor Elevation Benchmark Readings',
    steps: [
      'Mark 8-10 points across your home with masking tape labels',
      'Use a digital level or laser level to record elevation',
      'Log readings quarterly in a notebook or spreadsheet',
      'Flag any point that shifts more than 1/4" between readings',
      'Compare corner-to-corner — DFW soil moves most at perimeter',
    ],
    frequency: 'Every 90 days',
    icon: '📐',
  },
  'Door/window sticking': {
    title: 'Door & Window Sticking Log',
    steps: [
      'Test all interior doors — note which stick or have gaps',
      'Check double windows for alignment at locking point',
      'Photograph any new gaps at door frames with a ruler in frame',
      'Log date and weather conditions (dry vs. wet season)',
      'Compare to prior log — seasonal sticking is normal, progressive is not',
    ],
    frequency: 'Monthly during dry/wet transitions',
    icon: '🚪',
  },
  'Visible cracks': {
    title: 'Crack Measurement Guide',
    steps: [
      'Draw pencil lines at each end of every visible crack with date',
      'Measure width with a coin or credit card edge — log in mm',
      'Photograph with a ruler or coin for scale',
      'Stair-step cracks in brick are high priority — call a pro if > 1/4"',
      'Hairline cracks under 1/16" that do not grow are usually cosmetic',
    ],
    frequency: 'Monthly — measure and photo every visible crack',
    icon: '🔍',
  },
  'Soil moisture': {
    title: 'Perimeter Soil Moisture Check',
    steps: [
      'Walk entire foundation perimeter after 2+ weeks without rain',
      'Probe soil 6" deep with a screwdriver — it should resist but not crack',
      'Dry, cracked soil within 12" of foundation = watering needed',
      'Maintain consistent moisture with soaker hoses 18-24" from foundation',
      'Log moisture condition and any watering performed',
    ],
    frequency: 'Weekly during summer dry stretches',
    icon: '💧',
  },
  'General check-in': {
    title: 'Quarterly Foundation Walkthrough',
    steps: [
      'Complete all four checks: elevation, doors/windows, cracks, soil',
      'Review last quarter\’s log for any trends',
      'Check gutters and downspouts — direct water 6+ ft from foundation',
      'Inspect crawl space or pier-and-beam access points if applicable',
      'Schedule a professional inspection if any metric has worsened',
    ],
    frequency: 'Every 90 days — ideally at start of each season',
    icon: '🏠',
  },
};

export default function DFWFoundationMonitoringGuide2026() {
  const [selected, setSelected] = useState<string>('');
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Foundation Monitoring Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            DFW's expansive clay soil shifts constantly. DIY monitoring between professional inspections can catch problems early — before they become expensive.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🔎 What Are You Monitoring?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c) => (
              <button
                key={c}
                onClick={() => setSelected(c)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: selected === c ? '2px solid #F5E642' : '2px solid #2d3f5a',
                  backgroundColor: selected === c ? '#F5E642' : '#0d1f36',
                  color: selected === c ? '#0A1628' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {guide && (
          <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 28 }}>{guide.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{guide.title}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>📅 {guide.frequency}</div>
              </div>
            </div>
            {guide.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #2d3f5a', color: '#e2e8f0', fontSize: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#1e2d47', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>⚠️ When to Call a Pro Immediately</h3>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Stair-step cracks wider than <strong style={{ color: '#e2e8f0' }}>1/4"</strong>, doors that suddenly refuse to close,
            floors that shift more than <strong style={{ color: '#F5E642' }}>1/2" corner-to-corner</strong>, or cracks growing faster than
            1/16" per month warrant a licensed foundation engineer — not just a contractor.
          </div>
        </div>
      </div>
    </div>
  );
}