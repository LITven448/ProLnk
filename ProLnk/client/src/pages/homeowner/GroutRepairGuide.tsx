import { useState } from 'react';

interface GroutType {
  name: string;
  best: string;
  cost: string;
  durability: string;
  dfwRating: string;
}

const groutTypes: GroutType[] = [
  { name: 'Epoxy Grout', best: 'Wet areas, kitchens, showers', cost: '$$$', durability: 'Excellent', dfwRating: '⭐⭐⭐⭐⭐' },
  { name: 'Sanded Cement', best: 'Joints wider than 1/8 inch', cost: '$', durability: 'Moderate', dfwRating: '⭐⭐⭐' },
  { name: 'Unsanded Cement', best: 'Narrow joints, polished stone', cost: '$', durability: 'Fair', dfwRating: '⭐⭐' },
];

const diySteps = [
  { step: 1, title: 'Gather tools', detail: 'Grout saw or oscillating tool, grout float, sponge, bucket, shop vac, grout of choice, tile spacers.' },
  { step: 2, title: 'Remove old grout', detail: 'Cut 2/3 of the depth without touching tiles. A Dremel or oscillating multi-tool with a grout blade is fastest. Vacuum debris thoroughly.' },
  { step: 3, title: 'Clean the joints', detail: 'Wipe with a damp cloth and let dry completely — 24 hours if possible. Grout applied to damp joints fails faster.' },
  { step: 4, title: 'Mix and apply', detail: 'Mix to peanut butter consistency. Apply diagonally across joints with a float. Work in 4 sq ft sections to prevent premature hardening.' },
  { step: 5, title: 'Clean excess', detail: 'Wait 15–20 minutes, then wipe with a barely damp sponge. Rinse sponge constantly. Repeat 3 times to remove haze.' },
  { step: 6, title: 'Seal', detail: 'After 72 hours, apply penetrating sealer to cement grout. Epoxy grout does not require sealing.' },
];

export default function GroutRepairGuide() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<number>(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8eaf0′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5C518', color: '#0A1628', fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            DFW Homeowner Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>
            DFW Grout & Tile Repair Guide — Foundation Movement Breaks Grout
          </h1>
          <p style={{ fontSize: 17, color: '#a0aec0', lineHeight: 1.7 }}>
            We replace more grout in DFW than any other major metro because our foundation moves more than anywhere else. Here is everything you need to know.
          </p>
        </div>

        {/* Why DFW grout fails */}
        <div style={{ background: '#132035', borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <h2 style={{ color: '#F5C518', fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Why DFW Grout Fails Faster</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { emoji: '🌍', title: 'Clay soil expansion', body: 'DFW sits on expansive Blackland Prairie clay. Soil swells with rain and shrinks in drought — sometimes moving foundations 2–4 inches seasonally. Tile and grout cannot flex with this movement.' },
              { emoji: '🌡️', title: 'Temperature extremes', body: 'DFW sees 100°F+ summers and freeze events in winter. Thermal expansion and contraction cycles stress grout joints daily over a decade.' },
              { emoji: '💧', title: 'Hard water mineral buildup', body: 'DFW water hardness averages 200–300 ppm. Minerals deposit in grout pores, weakening the binder over time and creating entry points for moisture.' },
            ].map((r) => (
              <div key={r.title} style={{ display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{r.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{r.title}</div>
                  <div style={{ color: '#94a3b8', lineHeight: 1.6 }}>{r.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grout types */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Grout Types</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {groutTypes.map((g, i) => (
              <button
                key={g.name}
                onClick={() => setActiveType(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activeType === i ? '#F5C518′ : '#1e3048', color: activeType === i ? '#0A1628' : '#a0aec0' }}
              >
                {g.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#132035', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
              {[
                { label: 'Best for', value: groutTypes[activeType].best },
                { label: 'Cost', value: groutTypes[activeType].cost },
                { label: 'Durability', value: groutTypes[activeType].durability },
                { label: 'DFW Rating', value: groutTypes[activeType].dfwRating },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIY steps */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>DIY Step-by-Step</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {diySteps.map((s) => (
              <div key={s.step} style={{ background: '#132035', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenStep(openStep === s.step ? null : s.step)}
                  style={{ width: '100%', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5C518', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{s.step}</div>
                  <span style={{ fontWeight: 600, color: '#e2e8f0', flex: 1 }}>{s.title}</span>
                  <span style={{ color: '#64748b', fontSize: 18 }}>{openStep === s.step ? '−' : '+'}</span>
                </button>
                {openStep === s.step && (
                  <div style={{ padding: '0 20px 16px 62px', color: '#94a3b8', lineHeight: 1.7 }}>{s.detail}</div>
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
              { label: 'DIY', cost: '$50–$150', detail: 'Materials only. Grout saw, grout, float, sealer.' },
              { label: 'Professional', cost: '$300–$800', detail: 'Per bathroom. Labor + materials. Includes re-seal.' },
            ].map((c) => (
              <div key={c.label} style={{ background: '#0A1628', borderRadius: 10, padding: '18px 20px' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{c.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#F5C518', marginBottom: 8 }}>{c.cost}</div>
                <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* When to call a pro */}
        <div style={{ background: '#7f1d1d', borderRadius: 14, padding: 24, marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>⚠️</span>
            <div>
              <h3 style={{ color: '#fca5a5', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>When to Call a Pro</h3>
              <p style={{ color: '#fecaca', lineHeight: 1.6, margin: 0 }}>
                If more than 20% of your grout is cracked or missing, you are likely experiencing <strong>foundation settling</strong>, not normal wear. Always verify your foundation is stable before re-grouting — otherwise the new grout will crack again within months.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#132035', borderRadius: 16, padding: '32px 28px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Not Sure If It Is Grout or Foundation?</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            TrustyPro connects you with licensed foundation and tile specialists who can diagnose the root cause before you spend money on the wrong fix.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#F5C518', color: '#0A1628', fontWeight: 800, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Find a DFW Specialist →
          </a>
        </div>
      </div>
    </div>
  );
}
