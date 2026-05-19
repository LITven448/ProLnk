import { useState } from 'react';

type CheckItem = { id: number; label: string; category: string };

const CATEGORIES = [
  {
    name: 'Plumbing',
    emoji: '🚰',
    items: [
      'Insulate exposed pipes in garage, attic, and under sinks near exterior walls',
      'Install foam covers on all exterior hose bibs',
      'Locate and test your water main shutoff — know it in under 30 seconds',
      'Set up a drip schedule for faucets during freeze events',
      'Disconnect and drain all garden hoses',
    ],
  },
  {
    name: 'HVAC',
    emoji: '🌡️',
    items: [
      'Schedule heating system service before season (October ideal)',
      'Replace HVAC filter (clean filter = more efficient heat)',
      'Test heat mode now — don’t wait for the first cold night',
      'Test all carbon monoxide detectors near sleeping areas',
      'Save your HVAC emergency contact — book now, not during a freeze',
    ],
  },
  {
    name: 'Exterior',
    emoji: '🏠',
    items: [
      'Clean gutters — leaves block meltwater and cause ice dams',
      'Inspect roof for missing shingles (ice worsens existing damage)',
      'Trim branches hanging over roof or power lines',
      'Caulk gaps around windows and doors',
      'Test outdoor lighting — shorter days mean more use',
    ],
  },
  {
    name: 'Emergency Prep',
    emoji: '🆘',
    items: [
      'Store 1 gallon of water per person for 72 hours minimum',
      'Check flashlight batteries — replace if needed',
      'Acquire or test battery-powered weather radio',
      'Charge portable phone backup battery (keep above 80%)',
      'Test generator — fuel it and run it before season',
    ],
  },
  {
    name: 'Pipes During Freeze',
    emoji: '🧊',
    items: [
      'Drip cold side of all faucets on exterior walls during freeze events',
      'Open cabinet doors under sinks on exterior walls',
      'Keep thermostat at 68°F minimum even if you leave home',
      'Know how to shut off water main in under 30 seconds',
      'Have a plumber’s emergency number saved before the freeze',
    ],
  },
];

const ALL_ITEMS: CheckItem[] = CATEGORIES.flatMap((cat, ci) =>
  cat.items.map((label, li) => ({ id: ci * 10 + li, label, category: cat.name }))
);

export default function DFWWinterizationChecklist() {
  const [checked, setChecked] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function toggle(id: number) {
    setChecked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  const total = ALL_ITEMS.length;
  const score = Math.round((checked.length / total) * 100);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  const statusColor = score >= 80 ? '#4ade80′ : score >= 50 ? '#facc15' : '#f87171';
  const statusLabel = score >= 80 ? 'Well Prepared' : score >= 50 ? 'Partially Ready' : 'At Risk';

  const displayItems = activeCategory
    ? ALL_ITEMS.filter(i => i.category === activeCategory)
    : ALL_ITEMS;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TrustyPro — DFW Homeowner Intelligence
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px' }}>
          DFW Winter Prep Checklist
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 620, lineHeight: 1.7, margin: '0 0 48px' }}>
          Everything Before the First Freeze
        </p>

        {/* Freeze history */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32, borderLeft: '4px solid #3b82f6′ }}>
          <div style={{ fontWeight: 700, color: '#93c5fd', marginBottom: 8 }}>🌨️ DFW Freeze History</div>
          <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>
            <strong style={{ color: '#f1f5f9′ }}>February 2021 (Uri):</strong> 11 days below freezing. 246 deaths. Billions in property damage.{' '}
            <strong style={{ color: '#f1f5f9′ }}>February 2023:</strong> Major ice storm.{' '}
            <strong>The pattern:</strong> DFW gets one severe freeze event every 2–3 years on average. It's not if — it’s when.
          </p>
        </div>

        {/* Progress ring + score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <svg width={120} height={120} viewBox="0 0 120 120″>
            <circle cx={60} cy={60} r={54} fill="none" stroke="#1e293b" strokeWidth={10} />
            <circle cx={60} cy={60} r={54} fill="none" stroke="#1e3a5f" strokeWidth={10} />
            <circle
              cx={60} cy={60} r={54}
              fill="none" stroke={statusColor} strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.4s ease' }}
            />
            <text x={60} y={64} textAnchor="middle" fill={statusColor} fontSize={22} fontWeight={800}>{score}%</text>
          </svg>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: statusColor }}>{statusLabel}</div>
            <div style={{ color: '#64748b', marginTop: 4 }}>{checked.length} of {total} items complete</div>
            {score < 100 && (
              <div style={{ color: '#94a3b8', marginTop: 8, fontSize: 14 }}>
                {total - checked.length} items remaining before you're freeze-ready
              </div>
            )}
          </div>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              background: !activeCategory ? '#6366f1′ : '#1e293b',
              color: !activeCategory ? '#fff' : '#94a3b8',
              border: 'none', borderRadius: 99, padding: '8px 18px',
              cursor: 'pointer', fontSize: 14, fontWeight: 600,
            }}
          >All</button>
          {CATEGORIES.map(cat => {
            const catItems = ALL_ITEMS.filter(i => i.category === cat.name);
            const catDone = catItems.filter(i => checked.includes(i.id)).length;
            const active = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(active ? null : cat.name)}
                style={{
                  background: active ? '#312e81′ : '#1e293b',
                  color: active ? '#e0e7ff' : '#94a3b8',
                  border: `1px solid ${active ? '#6366f1' : 'transparent'}`,
                  borderRadius: 99, padding: '8px 18px',
                  cursor: 'pointer', fontSize: 14, fontWeight: 600,
                }}
              >
                {cat.emoji} {cat.name} ({catDone}/{catItems.length})
              </button>
            );
          })}
        </div>

        {/* Checklist */}
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {displayItems.map(item => {
            const done = checked.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  background: done ? '#0f2d1a' : '#1e293b',
                  border: `1px solid ${done ? '#166534' : 'transparent'}`,
                  borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                  background: done ? '#4ade80′ : ’transparent',
                  border: `2px solid ${done ? '#4ade80' : '#334155'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#0f172a', fontWeight: 700,
                }}>{done ? '✓' : ''}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: done ? '#86efac' : '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item.label}</div>
                  {!activeCategory && (
                    <div style={{ color: '#475569', fontSize: 12, marginTop: 3 }}>{item.category}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: 16, padding: 32, textAlign: 'center', border: '1px solid #4338ca' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#e0e7ff', marginBottom: 8 }}>Need Help With Any of These?</div>
          <p style={{ color: '#a5b4fc', margin: '0 0 24px', lineHeight: 1.6 }}>
            TrustyPro connects you with vetted pros for pipe insulation, HVAC service, gutter cleaning, and every item on this list — before the freeze hits.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{
              display: 'inline-block', background: '#6366f1', color: '#fff',
              borderRadius: 10, padding: '14px 32px', fontWeight: 700, fontSize: 16,
              textDecoration: 'none',
            }}
          >
            Get Freeze-Ready Contractors →
          </a>
        </div>

      </div>
    </div>
  );
}
