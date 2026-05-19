import { useState } from 'react';

const ITEMS = [
  { id: 1, cat: 'Know Your Roof', hail: true, text: 'Know your roof material: asphalt shingle, metal, tile, or flat — each has different hail tolerance' },
  { id: 2, cat: 'Know Your Roof', hail: false, text: 'Document roof installation date and keep contractor warranty paperwork' },
  { id: 3, cat: 'Know Your Roof', hail: false, text: 'Know your shingle class rating — Class 4 impact-resistant shingles = major DFW insurance discounts' },
  { id: 4, cat: 'Know Your Roof', hail: false, text: 'Confirm insurance policy covers hail damage and review your deductible' },
  { id: 5, cat: 'Annual Inspections', hail: true, text: 'Schedule professional roof inspection every spring after DFW hail season' },
  { id: 6, cat: 'Annual Inspections', hail: true, text: 'Inspect attic after every major storm for water stains or wet insulation' },
  { id: 7, cat: 'Annual Inspections', hail: false, text: 'Check all roof penetrations: vents, pipes, skylights, chimneys for cracked sealant' },
  { id: 8, cat: 'Annual Inspections', hail: false, text: 'Inspect gutters and downspouts — clogged gutters cause fascia rot and foundation damage' },
  { id: 9, cat: 'Hail Readiness', hail: true, text: 'After any hail event, photograph your roof from the ground before calling insurance' },
  { id: 10, cat: 'Hail Readiness', hail: true, text: 'Know the hail size threshold that triggers insurance claims in your policy (typically 1 inch)' },
  { id: 11, cat: 'Hail Readiness', hail: true, text: 'Avoid storm chasers — use only licensed DFW roofing contractors with local address' },
  { id: 12, cat: 'Hail Readiness', hail: true, text: 'Never sign an Assignment of Benefits (AOB) with a roofer before filing your own claim' },
  { id: 13, cat: 'Maintenance', hail: false, text: 'Clear all debris (leaves, branches) from valleys and around penetrations' },
  { id: 14, cat: 'Maintenance', hail: false, text: 'Trim tree branches within 6 feet of roofline — limb impact accelerates shingle wear' },
  { id: 15, cat: 'Maintenance', hail: false, text: 'Re-caulk around flashing, chimneys, and skylights every 5 years' },
  { id: 16, cat: 'Maintenance', hail: false, text: 'Remove moss or algae growth with proper treatment — dark streaks = algae in DFW humidity' },
  { id: 17, cat: 'Ventilation', hail: false, text: 'Verify attic has adequate ventilation — heat buildup accelerates shingle aging in DFW summers' },
  { id: 18, cat: 'Ventilation', hail: false, text: 'Ensure ridge vents or turbines are unobstructed and functioning' },
  { id: 19, cat: 'Replacement Planning', hail: false, text: 'Plan roof replacement at 20-25 years for standard asphalt shingles (DFW heat shortens lifespan)' },
  { id: 20, cat: 'Replacement Planning', hail: true, text: 'Upgrade to Class 4 impact-resistant shingles at next replacement for maximum DFW hail protection' },
];

export default function DFWRoofingFinalChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const score = Math.round((checked.size / ITEMS.length) * 100);
  const hailUnchecked = ITEMS.filter(i => !checked.has(i.id) && i.hail).length;
  const hailTotal = ITEMS.filter(i => i.hail).length;
  const hailScore = Math.round(((hailTotal - hailUnchecked) / hailTotal) * 100);
  const readiness = hailScore >= 80 ? 'HAIL READY 🛡️' : hailScore >= 50 ? 'PARTIALLY READY ⚠️' : 'EXPOSED TO HAIL 🚨';
  const readinessColor = hailScore >= 80 ? '#7EE8A2′ : hailScore >= 50 ? '#FF9F6B' : '#FF6B6B';
  const cats = [...new Set(ITEMS.map(i => i.cat))];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>DFW HOMEOWNER SERIES</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🏠 DFW Roofing Final Checklist</h1>
        <p style={{ color: '#9BB3CC', marginBottom: 24, fontSize: 14 }}>20 things every DFW homeowner should do, know, or have for roof protection in hail alley.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 28, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 130 }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642′ }}>{score}%</div>
            <div style={{ color: '#9BB3CC', fontSize: 13 }}>{checked.size}/{ITEMS.length} complete</div>
          </div>
          <div style={{ flex: 1, minWidth: 180, background: '#0A1628', borderRadius: 10, padding: '14px 18px' }}>
            <div style={{ fontSize: 11, color: '#9BB3CC', letterSpacing: 1, marginBottom: 6 }}>HAIL READINESS</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: readinessColor }}>{readiness}</div>
            <div style={{ fontSize: 12, color: '#9BB3CC', marginTop: 4 }}>{hailScore}% of hail-specific items done</div>
          </div>
        </div>

        {cats.map(cat => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, letterSpacing: 2, marginBottom: 12, textTransform: 'uppercase' }}>🏠 {cat}</div>
            {ITEMS.filter(i => i.cat === cat).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, marginBottom: 8, cursor: 'pointer',
                  background: checked.has(item.id) ? '#0F2040′ : '#111E35',
                  border: `1px solid ${checked.has(item.id) ? '#1E3A5F' : item.hail ? '#2A2A10' : '#1A2F4A'}`,
                  opacity: checked.has(item.id) ? 0.55 : 1 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked.has(item.id) ? '#F5E642' : '#2A4060'}`,
                  background: checked.has(item.id) ? '#F5E642′ : ’transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#0A1628', fontWeight: 700 }}>
                  {checked.has(item.id) ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: checked.has(item.id) ? 'line-through' : 'none', color: checked.has(item.id) ? '#5A7A9A' : '#D4E4F4′ }}>
                    {item.text}
                  </span>
                  {item.hail && !checked.has(item.id) && (
                    <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: '#F5E642', background: '#1E1A00', padding: '2px 7px', borderRadius: 10 }}>HAIL KEY</span>
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
