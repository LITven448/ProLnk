import { useState } from 'react';

const seasons = [
  {
    id: 'spring',
    label: 'Spring (Mar–May)',
    emoji: '🌸',
    rating: 5,
    ratingLabel: 'Best Time',
    ratingColor: '#34d399',
    availability: 'High — contractors not yet swamped',
    pricing: 'Standard pricing, room to negotiate',
    leadTime: '1–2 weeks typical',
    dfwContext: 'Before DFW heat arrives. Contractors eager for pre-season work.',
    tips: [
      'Lock in pricing before summer surge',
      'Widest equipment selection in stock',
      'Permits pull faster (city offices less busy)',
      'Ideal for planning ahead before June heat',
    ],
  },
  {
    id: 'summer',
    label: 'Summer (Jun–Aug)',
    emoji: '🔥',
    rating: 1,
    ratingLabel: 'Worst — Emergency Only',
    ratingColor: '#ef4444',
    availability: 'Low — all crews booked weeks out',
    pricing: '15–30% premium on labor common',
    leadTime: '2–4 weeks unless emergency (3–7 days)',
    dfwContext: 'DFW hits 100°F+ for 60+ days. Every HVAC contractor is overwhelmed.',
    tips: [
      'Emergency calls cost $150–300 premium on top of repair',
      'Equipment may be backordered 1–3 weeks',
      'Consider portable AC while waiting',
      'If possible, limp old unit through to fall',
    ],
  },
  {
    id: 'fall',
    label: 'Fall (Sep–Nov)',
    emoji: '🍂',
    rating: 4,
    ratingLabel: 'Good',
    ratingColor: '#F5E642',
    availability: 'High — summer rush is over',
    pricing: 'Normal; some end-of-season deals',
    leadTime: '1–2 weeks',
    dfwContext: 'Contractors breathing again. Good time before holiday disruption.',
    tips: [
      'Good for replacing heat pumps before DFW winter',
      'Manufacturers sometimes offer fall rebates',
      'City permit offices less backlogged',
      'Avoid November — contractor schedules compress near holidays',
    ],
  },
  {
    id: 'winter',
    label: 'Winter (Dec–Feb)',
    emoji: '❄️',
    rating: 3,
    ratingLabel: 'Acceptable',
    ratingColor: '#60a5fa',
    availability: 'Medium — varies by week',
    pricing: 'Sometimes discounted (slow season)',
    leadTime: '1–3 weeks (holiday gaps are real)',
    dfwContext: 'DFW winters are mild but occasional freezes (2021 Uri) spike demand overnight.',
    tips: [
      'Good for heat pump or furnace upgrades',
      'Watch for holiday scheduling gaps',
      'Freeze events can make January as bad as August',
      'Manufacturer rebates sometimes peak in Jan',
    ],
  },
];

export default function DFWHVACUpgradeTiming() {
  const [selected, setSelected] = useState<string | null>(null);

  const s = seasons.find((x) => x.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Best Time to Upgrade HVAC in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Timing your DFW HVAC upgrade can save thousands and weeks of wait. Select your season to see what to expect.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {seasons.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                background: selected === s.id ? '#0f2040′ : '#0f2040',
                border: '2px solid',
                borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f',
                borderRadius: 12,
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#fff',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6, color: s.ratingColor }}>{s.ratingLabel}</div>
              <div style={{ display: 'flex', gap: 3, marginTop: 6 }}>
                {[1,2,3,4,5].map((n) => (
                  <div key={n} style={{ width: 10, height: 10, borderRadius: '50%', background: n <= s.rating ? s.ratingColor : '#1e3a5f' }} />
                ))}
              </div>
            </button>
          ))}
        </div>
        {s && (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 22 }}>{s.emoji} {s.label}</div>
                <div style={{ color: s.ratingColor, fontWeight: 700, marginTop: 4 }}>{s.ratingLabel}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'AVAILABILITY', value: s.availability },
                { label: 'PRICING', value: s.pricing },
                { label: 'LEAD TIME', value: s.leadTime },
              ].map((item) => (
                <div key={item.label} style={{ background: '#0A1628', borderRadius: 10, padding: 12 }}>
                  <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 16, fontStyle: 'italic' }}>📍 {s.dfwContext}</div>
            <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>DFW TIPS</div>
            {s.tips.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#F5E642′ }}>→</span>
                <span>{t}</span>
              </div>
            ))}
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Ready to get quotes from DFW HVAC pros?</div>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Get DFW HVAC Quotes via ProLnk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
