import { useState } from 'react';

const doorProblems = [
  { id: 'sticking', label: '🚪 Door Sticking / Hard to Close', causes: [{ cause: 'Foundation Movement (DFW Clay Soil)', signals: ['Sticking is diagonal — top corner binds or bottom corner drags', 'Other doors in house also sticky, especially in dry summer', 'Visible cracks in drywall near door frame corners'], fixes: ['Do NOT plane the door yet — may correct itself when soil re-moistens', 'Monitor with tape marks on door edge for seasonal movement', 'If permanent, get foundation inspection before any door repair'] }, { cause: 'Humidity Swelling', signals: ['Only sticks during spring rain season', 'Bottom of door (typically exposed wood) swells more than top', 'Single door affected, not multiple'], fixes: ['Seal door edges with primer and paint — stops moisture absorption', 'Plane lightly on hinge side — remove minimal material', 'Install dehumidifier if interior RH exceeds 60% regularly'] }] },
  { id: 'gaps', label: '📐 Door Gaps / Light Showing', causes: [{ cause: 'Foundation / Frame Racking', signals: ['Gap is parallelogram-shaped — wider at top than bottom or vice versa', 'Frame is no longer square when measured corner to corner'], fixes: ['Shimming hinges can buy time but is not a long-term fix', 'Document with photos — useful for foundation contractor assessment', 'Add weatherstripping as temporary air seal until root cause is addressed'] }] },
  { id: 'hinges', label: '🔩 Hinge Problems', causes: [{ cause: 'Worn or Loose Hardware', signals: ['Door sags on hinge side', 'Screws spin but do not tighten', 'Hinge barrel shows wear gap'], fixes: ['Replace short hinge screws with 3″ screws that reach the stud', 'Fill stripped screw holes with wood glue and toothpicks, let dry 24 hours', 'Upgrade to heavy-duty ball-bearing hinges for doors used frequently'] }] },
  { id: 'smartLock', label: '🔐 Smart Lock Installation', causes: [{ cause: 'Interior Smart Lock Considerations', signals: ['Thinking about a connected lock for home office, garage entry, or rental unit'], fixes: ['Interior doors use privacy locks — many smart options like Wyze or August', 'Ensure door is plumb and square before installing — misaligned doors cause motor strain', 'Choose Z-Wave or Zigbee for home automation compatibility over Wi-Fi-only devices'] }] },
];

export default function DFWInteriorDoorsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = doorProblems.find(d => d.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🚪 DFW Interior Doors Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Interior door problems are one of the most common — and most misread — symptoms of DFW foundation movement. Before planing, shimming, or replacing a door, understand whether clay soil is the cause. Seasonal monitoring is often the right first step.
        </p>

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏚️ Foundation vs Humidity: The Key Distinction</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, color: '#f87171', marginBottom: 8, fontSize: 14 }}>🚩 Foundation Warning Signs</div>
              {['Multiple doors stick simultaneously', 'Cracks in drywall at door corners', 'Sticking worsens during drought', 'Diagonal binding (top or bottom corner)'].map((s, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 5 }}>• {s}</div>)}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 8, fontSize: 14 }}>✅ Humidity Swelling Signs</div>
              {['Only one door affected', 'Worse in spring / rainy season', 'No drywall cracks nearby', 'Bottom edge swells most'].map((s, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 5 }}>• {s}</div>)}
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔍 Select Your Door Problem</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {doorProblems.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
              style={{ background: selected === d.id ? '#F5E642′ : '#111d30', color: selected === d.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {d.label}
            </button>
          ))}
        </div>

        {current && current.causes.map((c, ci) => (
          <div key={ci} style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>{c.cause}</div>
            {c.signals && <><div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Signs this is your cause:</div>
            {c.signals.map((s, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 5, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{s}</div>)}</>}
            <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 12, marginBottom: 8 }}>Recommended actions:</div>
            {c.fixes.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12 }}>{i + 1}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
