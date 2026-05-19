import { useState } from 'react';

const features = {
  'Gunite/Plaster Pool': ['Plaster condition (staining, cracking, delamination)', 'Shell structural integrity', 'Return jets and skimmer function', 'Main drain anti-vortex cover (Virginia Graeme Baker compliance)', 'Equipment pad: pump, motor, filter, heater'],
  'Vinyl Liner Pool': ['Liner age and condition (typically replaced every 8–12 yrs)', 'Vinyl seams and bead track', 'Steps and ladders condition', 'Equipment pad inspection', 'Leak detection if liner appears aged'],
  'With Spa/Hot Tub': ['Spa shell and tile', 'Blower and jet function test', 'Heater capacity for dual pool/spa', 'Spillway and water features', 'Controls and automation system'],
  'With Water Features': ['Waterfall/sheer descent plumbing', 'Separate pump for features', 'Rock or tile work condition', 'Lighting (LED or incandescent)', 'Timer and automation function'],
};

export default function DFWPoolInspectionGuide2026() {
  const [selected, setSelected] = useState('');
  const totalBase = 275;
  const extras: Record<string, number> = { 'With Spa/Hot Tub': 75, 'With Water Features': 50 };
  const estimatedCost = selected ? `$${totalBase + (extras[selected] || 0)}–${totalBase + (extras[selected] || 0) + 100}` : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏊</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Pool Inspection Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Buying a DFW home with a pool? Don't skip the specialist inspection</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 10px' }}>💡 Pool Inspection = Separate from General Inspection</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>General inspectors are not pool specialists. A pool inspection covers equipment, plaster/shell, electrical bonding, safety compliance, and leak risk. Expect to pay $200–350 separately — worth every dollar on a $40,000+ asset.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🔌 Electrical Bonding — Critical Safety Item</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 10 }}>Electrical bonding prevents electrocution in the water. Many DFW pools have improper or corroded bonding grid — especially pools built pre-2005. This is a safety issue, not cosmetic.</p>
          {['All metal components must be bonded: ladders, handrails, light fixtures, pump motors', 'Equipotential bonding grid connects all elements to equalize voltage', 'Corroded or broken bonding = potential shock hazard in water', 'Cost to repair bonding: $500–2,500 depending on scope'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 13 }}>
              <span>⚡</span><span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🏗️ Select Pool Features → Inspection Checklist + Cost Estimate</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(features).map(f => (
              <button key={f} onClick={() => setSelected(f)}
                style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  borderColor: selected === f ? '#F5E642' : '#334155', background: selected === f ? '#F5E642' : 'transparent',
                  color: selected === f ? '#0A1628' : '#94a3b8', fontWeight: selected === f ? 700 : 400 }}>
                {f}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0d1e36', borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>Checklist: {selected}</span>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 12px', fontWeight: 700, fontSize: 13 }}>Est. {estimatedCost}</span>
              </div>
              {features[selected].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 13 }}>
                  <span style={{ color: '#22c55e' }}>✓</span><span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 10px' }}>💰 Typical Pool Repair Costs (Negotiation Reference)</h2>
          {[
            ['Plaster resurfacing', '$6,000–12,000'],
            ['Pump/motor replacement', '$800–1,500'],
            ['Pool heater replacement', '$2,000–4,500'],
            ['Safety drain covers (VGB)', '$200–500'],
            ['Coping/tile repair', '$1,500–5,000+'],
            ['Full replaster + retile', '$10,000–20,000+'],
          ].map(([item, cost], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#cbd5e1', fontSize: 13 }}>{item}</span>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
