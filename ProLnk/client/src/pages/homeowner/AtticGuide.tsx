import { useState } from 'react';

interface InspectionItem {
  category: string;
  whatToLookFor: string;
  redFlag: string;
}

const inspectionItems: InspectionItem[] = [
  { category: 'Insulation depth', whatToLookFor: 'Measure in multiple spots with a ruler', redFlag: 'Less than 13 inches of blown-in = below R-38' },
  { category: 'Air sealing', whatToLookFor: 'Gaps around light fixtures, plumbing penetrations', redFlag: 'Any visible light from below = major air leak' },
  { category: 'Ventilation', whatToLookFor: 'Soffit vents, ridge vent or gable vents', redFlag: 'No cross-ventilation path = trapped heat' },
  { category: 'Moisture / mold', whatToLookFor: 'Dark staining on decking or rafters', redFlag: 'Any black or green discoloration = active mold risk' },
  { category: 'Ductwork', whatToLookFor: 'Disconnected, crushed, or uninsulated ducts', redFlag: 'Disconnected duct = 30%+ of your AC going into attic' },
  { category: 'Pest signs', whatToLookFor: 'Droppings, nesting material, chewed insulation', redFlag: 'Active infestation before adding new insulation' },
  { category: 'HVAC equipment', whatToLookFor: 'Age tag, visible rust, drain pan condition', redFlag: 'Rust around drain pan = active or past water event' },
];

const oldAtticFinds = [
  { emoji: '🧱', item: 'Degraded blown-in insulation', detail: 'Cellulose and fiberglass both compact and lose R-value over decades. Pre-2000 homes often have R-10 or less.' },
  { emoji: '🔨', item: 'Crushed batt insulation', detail: 'HVAC techs walk on batt insulation during service visits, crushing it to near-zero R-value in paths across your attic.' },
  { emoji: '☣️', item: 'Vermiculite (asbestos risk)', detail: 'Homes built before 1980 may have vermiculite insulation. Do not disturb. Have it tested before any attic work.' },
  { emoji: '⚡', item: 'Knob-and-tube wiring', detail: 'Cannot be buried under insulation per code. Must be addressed by electrician before adding insulation.' },
  { emoji: '🌬️', item: 'Improper venting', detail: 'Bathroom exhaust fans vented into attic (not exterior) create moisture and mold risk over time.' },
];

export default function AtticGuide() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [openFind, setOpenFind] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8eaf0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5C518', color: '#0A1628', fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            DFW Homeowner Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>
            DFW Attic Guide — Your Biggest Energy Loss Is Above Your Head
          </h1>
          <p style={{ fontSize: 17, color: '#a0aec0', lineHeight: 1.7 }}>
            DFW attic temperatures hit 150°F+ in summer. Proper insulation delivers 25–35% cooling savings. Most DFW homes are significantly under-insulated.
          </p>
        </div>

        {/* Key stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 40 }}>
          {[
            { value: '150°F+', label: 'Peak attic temp in DFW summer', color: '#ef4444' },
            { value: 'R-49', label: 'Current recommended standard', color: '#F5C518' },
            { value: 'R-25', label: 'What most pre-2010 homes have', color: '#94a3b8' },
            { value: '30%', label: 'Federal tax credit through 2032', color: '#10b981' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#132035', borderRadius: 12, padding: '18px 16px' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ventilation explainer */}
        <div style={{ background: '#132035', borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5C518', fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Ventilation: The 1:150 Rule</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 16 }}>
            Building code requires 1 square foot of net free ventilation area per 150 square feet of attic floor. Proper DFW attic ventilation requires a balanced combination of soffit intake vents and ridge or gable exhaust vents — not just one or the other.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { title: 'Soffit vents (intake)', desc: 'At the roof’s lowest edge. Cool outside air enters here.' },
              { title: 'Ridge vent (exhaust)', desc: 'At the peak. Hot air escapes. Must be balanced with soffit intake.' },
            ].map((v) => (
              <div key={v.title} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{v.title}</div>
                <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.5 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Inspection checklist */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Attic Inspection Guide</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {inspectionItems.map((item, i) => (
              <div key={item.category} style={{ background: '#132035', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  style={{ width: '100%', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 18 }}>🔦</span>
                  <span style={{ fontWeight: 600, color: '#e2e8f0', flex: 1 }}>{item.category}</span>
                  <span style={{ color: '#64748b', fontSize: 18 }}>{openItem === i ? '−' : '+'}</span>
                </button>
                {openItem === i && (
                  <div style={{ padding: '0 20px 16px 50px' }}>
                    <div style={{ color: '#94a3b8', marginBottom: 10, lineHeight: 1.6 }}><strong style={{ color: '#cbd5e1' }}>What to look for:</strong> {item.whatToLookFor}</div>
                    <div style={{ background: '#7f1d1d', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 14 }}>
                      <strong>Red flag:</strong> {item.redFlag}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What you'll find in older DFW attics */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>What You Will Find in Older DFW Attics</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {oldAtticFinds.map((f, i) => (
              <div key={f.item} style={{ background: '#132035', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFind(openFind === i ? null : i)}
                  style={{ width: '100%', padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{f.emoji}</span>
                  <span style={{ fontWeight: 600, color: '#e2e8f0', flex: 1 }}>{f.item}</span>
                  <span style={{ color: '#64748b', fontSize: 18 }}>{openFind === i ? '−' : '+'}</span>
                </button>
                {openFind === i && (
                  <div style={{ padding: '0 20px 16px 56px', color: '#94a3b8', lineHeight: 1.7 }}>{f.detail}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cost guide */}
        <div style={{ background: '#132035', borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5C518', fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Cost Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Top-off to R-49', cost: '$1,500–$3,500', detail: 'Add blown-in over existing. Most common upgrade.' },
              { label: 'Full replacement', cost: '$3,000–$6,000', detail: 'Remove old, air seal, install new. Best for pre-1990 homes.' },
            ].map((c) => (
              <div key={c.label} style={{ background: '#0A1628', borderRadius: 10, padding: '18px 20px' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{c.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#F5C518', marginBottom: 8 }}>{c.cost}</div>
                <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5 }}>{c.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0d2b1a', border: '1px solid #166534', borderRadius: 10, padding: '14px 18px' }}>
            <span style={{ fontSize: 18 }}>💰</span>
            <strong style={{ color: '#86efac', marginLeft: 8 }}>Federal Tax Credit:</strong>
            <span style={{ color: '#4ade80', marginLeft: 8 }}>30% ITC on insulation upgrades through 2032 (max $1,200/year).</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#132035', borderRadius: 16, padding: '32px 28px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Get an Attic Inspection Before Summer</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            DFW summers start early and hit hard. A $150 attic inspection can identify $4,000+ in cooling waste — and the tax credit covers 30% of the fix.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F5C518', color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Find a DFW Insulation Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
