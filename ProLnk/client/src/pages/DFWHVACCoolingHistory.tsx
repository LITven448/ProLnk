import { useState } from 'react';

const interests = [
  { label: 'Old Home History', key: 'history', context: 'Pre-AC DFW homes used sleeping porches, attic fans, and thick masonry walls to survive summers. Homes before 1960 were often designed around airflow — tall ceilings, cross ventilation, shaded porches.', today: 'These homes often have unusual duct layouts or no ducts at all. A skilled DFW HVAC pro can assess the best modern retrofit.' },
  { label: 'Swamp Coolers', key: 'swamp', context: 'Swamp coolers (evaporative coolers) failed in DFW because humidity averages 65–80% in summer — they only work in dry climates under 50% humidity. DFW tried them briefly in the 1940s–50s and abandoned them fast.', today: 'DFW's humidity makes dehumidification essential. Modern systems with variable-speed blowers manage humidity much better than older single-stage units.' },
  { label: 'Ceiling Fan Role', key: 'fans', context: 'Ceiling fans were essential pre-AC and still matter. In 1920s–50s DFW, fans ran constantly. They don't cool air — they create a wind-chill effect, making 80°F feel like 74°F.', today: 'Running fans with AC lets you raise the thermostat 4°F with the same comfort — saving 10–15% on cooling bills in DFW summers.' },
  { label: 'Sleeping Porches', key: 'porches', context: 'Many 1900–1940s DFW homes had sleeping porches — screened outdoor rooms where families slept in summer. When window AC arrived in the 1950s, sleeping porches were often enclosed, becoming rooms with unusual ventilation.', today: 'Converted sleeping porches often lack proper insulation or ductwork. DFW HVAC pros frequently find these spots are the hardest to condition in older homes.' },
  { label: 'AC Cultural Shift', key: 'culture', context: 'Before AC, DFW had a slower summer pace — midday breaks, evening socializing outdoors, architecture shaped by shade. AC in the 1960s enabled DFW's population explosion: the metro grew from 900K in 1960 to 5M+ today.', today: 'DFW HVAC demand is directly tied to this growth. More homes, more systems, more maintenance needs — and an industry built around keeping it all running.' },
];

export default function DFWHVACCoolingHistory() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = interests.find(i => i.key === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>❄️ DFW COOLING HISTORY</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>How DFW Survived Heat Before Modern AC</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>Swamp coolers flopped, sleeping porches disappeared, and AC transformed DFW culture entirely. Here is the full story.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🌡️ What Are You Curious About?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {interests.map(i => (
              <button key={i.key} onClick={() => setSelected(i.key)} style={{ background: selected === i.key ? '#F5E642' : '#1a3a5c', color: selected === i.key ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>{i.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#e2e8f0', marginBottom: '0.75rem', lineHeight: 1.6 }}>{match.context}</div>
              <div style={{ color: '#F5E642', fontSize: '0.9rem', fontWeight: 600 }}>🏠 Today's Impact: <span style={{ color: '#94a3b8', fontWeight: 400 }}>{match.today}</span></div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {[
            { icon: '🪟', title: 'Window Units Arrived (1950s)', desc: 'First room AC units appeared in DFW. Wealthy homes got them first at $350+ — over $4,000 in today's dollars.' },
            { icon: '🏠', title: 'Central AC Goes Mass Market (1960s–70s)', desc: 'DFW's postwar building boom made central AC standard. Builders bundled it in — and the city's growth exploded.' },
            { icon: '🌀', title: 'Humidity Management Becomes Critical', desc: 'DFW's humid summers mean cooling alone is not enough. Modern systems with dehumidification are designed specifically for this climate.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{card.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{card.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', background: '#0F2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Ready for Modern Cooling?</div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>ProLnk connects DFW homeowners with HVAC pros who understand your home's history and today's best solutions.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
