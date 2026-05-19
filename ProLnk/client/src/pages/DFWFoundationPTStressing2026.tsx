import { useState } from 'react';

const concerns = [
  { q: 'What does "stressing day" mean on a new construction schedule', a: 'Stressing day is when PT cables are tensioned — typically 10-14 days after the concrete pour, once the slab reaches 75% of design strength (around 2,500-3,000 PSI). A hydraulic jack is positioned at the cable pocket and pulls each cable to 33,000-35,000 lbs of tension. The cable is then locked and the pocket sealed.' },
  { q: 'I see protruding wires from the edge of my slab — is this normal', a: 'Yes. Before stressing, PT cable "tails" protrude 12-18 inches from the slab edge. These are gripped by the hydraulic jack during stressing. After tensioning, the excess tail is cut and the pocket is filled with non-shrink grout or a plastic cap. If tails remain long after stressing, the contractor may not have completed the process.' },
  { q: 'Can I be on the property during stressing', a: 'No — maintain 50-foot clearance. If a cable or anchor fails during stressing (rare but possible), the energy release is catastrophic. Legitimate contractors will clear the area and may flag it. The process takes 2-4 hours for a typical DFW residential slab.' },
  { q: 'My inspector found an unstressed cable pocket — what now', a: 'Serious structural deficiency. Unstressed cables provide no benefit — the slab is effectively under-reinforced in that zone. The fix is complex: re-access the pocket, confirm cable integrity, and stress. If the concrete has cured too long, the cable may have corroded or lost ductility. Requires a structural engineer, not just a contractor.' },
  { q: 'How long after stressing before framing can begin', a: 'Typically 24-48 hours. Concrete must finish curing, and the PT pocket grout must set. Most DFW tract builders allow framing 2-3 days post-stress. The PT system is fully engaged immediately after stressing — concrete will not "gain more tension" with time.' },
];

export default function DFWFoundationPTStressing2026() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

  const timeline = [
    { day: 'Day 0', event: 'Concrete pour', icon: '🪣' },
    { day: 'Day 7', event: 'Concrete ~75% strength', icon: '📈' },
    { day: 'Day 10-14', event: 'Stressing day — hydraulic jack applied', icon: '⚙️' },
    { day: 'Day 14-16', event: 'Pockets sealed, tails cut', icon: '🔩' },
    { day: 'Day 16+', event: 'Framing begins', icon: '🏗️' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚙️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Post-Tension Stressing Day Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What happens when PT cables are tensioned — a homebuyer's guide</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 PT Stressing Timeline</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '10px 0', borderBottom: i < timeline.length - 1 ? '1px solid #2d5a8e' : 'none' }}>
                <div style={{ fontSize: 24 }}>{t.icon}</div>
                <div>
                  <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{t.day}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🔧 The Stressing Process</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            A hydraulic jack (stressing jack) is placed over each cable pocket on the slab perimeter. The jack grips the cable tail and applies tension — typically 33,000 to 35,000 lbs per cable (about 175-185 kips per square inch on a 0.5-inch diameter strand). Once tension is reached, a chuck locks the anchor. The tail is cut 1 inch from the anchor and the pocket is filled. DFW residential slabs typically have 15-40 cables depending on size.
          </p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 My PT Concern</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>Select your situation for a DFW-specific guide:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c, i) => (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  style={{ width: '100%', textAlign: 'left', background: open[i] ? '#0d2137′ : '#0A1628', border: '1px solid', borderColor: open[i] ? '#F5E642' : '#2d5a8e', borderRadius: 8, padding: '12px 16px', color: open[i] ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 14, fontWeight: open[i] ? 700 : 400, display: 'flex', justifyContent: 'space-between' }}>
                  {c.q} <span>{open[i] ? '▲' : '▼'}</span>
                </button>
                {open[i] && <div style={{ background: '#0d2137', border: '1px solid #F5E642', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 16px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{c.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 12 }}>
          ProLnk DFW Foundation Guide 2026 · prolnk.io
        </div>
      </div>
    </div>
  );
}
