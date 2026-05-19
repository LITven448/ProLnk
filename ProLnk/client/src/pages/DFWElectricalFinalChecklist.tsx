import { useState } from 'react';

const ITEMS = [
  { id: 1, cat: 'Panel & Breakers', crit: true, text: 'Locate electrical panel and confirm all breakers are labeled correctly' },
  { id: 2, cat: 'Panel & Breakers', crit: true, text: 'Identify your panel brand — Zinsco and FPE (Federal Pacific) panels are a fire hazard; replace immediately' },
  { id: 3, cat: 'Panel & Breakers', crit: true, text: 'Confirm main breaker amperage matches your service (100A, 150A, or 200A)' },
  { id: 4, cat: 'Panel & Breakers', crit: false, text: 'Upgrade to 200-amp service if home is pre-1990 and still on 100A' },
  { id: 5, cat: 'Safety Devices', crit: true, text: 'Test all GFCI outlets monthly (kitchen, bath, garage, exterior, garage)' },
  { id: 6, cat: 'Safety Devices', crit: true, text: 'Confirm AFCI breakers on all bedroom circuits (2002+ NEC requirement)' },
  { id: 7, cat: 'Safety Devices', crit: true, text: 'Test smoke detectors monthly; replace batteries annually' },
  { id: 8, cat: 'Safety Devices', crit: true, text: 'Install carbon monoxide detectors on every level (gas appliance homes)' },
  { id: 9, cat: 'Wiring & Outlets', crit: true, text: 'Check for ungrounded 2-prong outlets — replace or update with GFCI' },
  { id: 10, cat: 'Wiring & Outlets', crit: false, text: 'Inspect visible wiring for fraying, scorching, or rodent damage' },
  { id: 11, cat: 'Wiring & Outlets', crit: false, text: 'Replace any aluminum branch wiring connections with CO/ALR devices' },
  { id: 12, cat: 'Wiring & Outlets', crit: false, text: 'Confirm outdoor outlets have in-use weatherproof covers' },
  { id: 13, cat: 'Appliances & Loads', crit: false, text: 'Verify dedicated 240V circuits for dryer, range, and EV charger' },
  { id: 14, cat: 'Appliances & Loads', crit: false, text: 'Avoid daisy-chaining power strips — use surge protectors with joule ratings' },
  { id: 15, cat: 'Appliances & Loads', crit: false, text: 'Never use extension cords as permanent wiring solutions' },
  { id: 16, cat: 'DFW-Specific', crit: true, text: 'Install whole-home surge protector — DFW storms create frequent power spikes' },
  { id: 17, cat: 'DFW-Specific', crit: false, text: 'Check exterior panel for wasp nests — common DFW problem causing breaker failures' },
  { id: 18, cat: 'DFW-Specific', crit: false, text: 'Confirm generator transfer switch if you own a portable generator (code required)' },
  { id: 19, cat: 'Professional Inspection', crit: false, text: 'Get a licensed electrician inspection if home is 25+ years old' },
  { id: 20, cat: 'Professional Inspection', crit: false, text: 'Pull permits for any panel upgrade or new circuit — unpermitted work voids insurance' },
];

export default function DFWElectricalFinalChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const score = Math.round((checked.size / ITEMS.length) * 100);
  const critUnchecked = ITEMS.filter(i => !checked.has(i.id) && i.crit).length;
  const safetyLabel = critUnchecked === 0 ? 'SAFE ✅' : critUnchecked <= 2 ? 'REVIEW NEEDED ⚠️' : 'CRITICAL GAPS 🚨';
  const safetyColor = critUnchecked === 0 ? '#7EE8A2′ : critUnchecked <= 2 ? '#FF9F6B' : '#FF6B6B';
  const cats = [...new Set(ITEMS.map(i => i.cat))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>DFW HOMEOWNER SERIES</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>⚡ DFW Electrical Final Checklist</h1>
        <p style={{ color: '#9BB3CC', marginBottom: 24, fontSize: 14 }}>20 things every DFW homeowner should do, know, or have for electrical safety.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 130 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642′ }}>{score}%</div>
            <div style={{ color: '#9BB3CC', fontSize: 13 }}>{checked.size}/{ITEMS.length} complete</div>
          </div>
          <div style={{ flex: 1, minWidth: 180, background: '#0A1628', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#9BB3CC', letterSpacing: 1, marginBottom: 6 }}>SAFETY STATUS</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: safetyColor }}>{safetyLabel}</div>
            <div style={{ fontSize: 12, color: '#9BB3CC', marginTop: 4 }}>{critUnchecked} critical item{critUnchecked !== 1 ? 's' : ''} outstanding</div>
          </div>
        </div>

        {cats.map(cat => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>⚡ {cat}</div>
            {ITEMS.filter(i => i.cat === cat).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  background: checked.has(item.id) ? '#0F2040′ : '#111E35',
                  border: `1px solid ${checked.has(item.id) ? '#1E3A5F' : item.crit ? '#3A2A10' : '#1A2F4A'}`,
                  opacity: checked.has(item.id) ? 0.55 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#F5E642' : '#2A4060'}`,
                  background: checked.has(item.id) ? '#F5E642′ : ’transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>
                  {checked.has(item.id) ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: checked.has(item.id) ? 'line-through' : 'none', color: checked.has(item.id) ? '#5A7A9A' : '#D4E4F4′ }}>
                    {item.text}
                  </span>
                  {item.crit && !checked.has(item.id) && (
                    <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: '#FF6B6B', background: '#200A0A', padding: '2px 7px', borderRadius: 10 }}>CRITICAL</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
