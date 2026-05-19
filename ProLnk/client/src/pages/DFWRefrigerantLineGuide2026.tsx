import { useState } from 'react';

const issues = [
  { id: 'warm_suction', label: 'Suction line (large pipe) is warm, not cold', diagnosis: 'Suction line should be cold and sweating with condensation in DFW summers — that is normal and healthy. If it is warm or dry, refrigerant level is low or there is a restriction. Low refrigerant almost always means a leak. Call a tech to leak check before adding refrigerant — just topping off is a short-term fix.' },
  { id: 'insulation', label: 'Insulation on suction line cracked or missing', diagnosis: 'Suction line insulation (the black foam) degrades in DFW UV and heat, typically within 7-10 years. Exposed suction line absorbs heat from the attic, forcing the system to work harder. Re-insulating costs $100-200 and can recover 5-10% efficiency. Do this when replacing insulation is found cracked during any service.' },
  { id: 'length', label: 'Replacing system — concerned about line set', diagnosis: 'Line set length affects system efficiency. DFW homes often have long runs to attic air handlers. Runs over 50 feet require refrigerant charge adjustment. When replacing outdoor unit only, the existing line set is often reused — but if it is old, kinked, or the wrong diameter for new refrigerant, replacement ($500-900) is necessary.' },
  { id: 'oil', label: 'Oily residue on lines or connections', diagnosis: 'Refrigerant carries compressor oil. Oily residue on fittings or lines indicates a refrigerant leak at that point. The bigger the oil stain, the larger the leak. This requires leak repair + refrigerant recharge. Never ignore oily joints — the leak grows over time and will eventually take out your compressor.' },
  { id: 'replacing', label: 'Replacing system — should I replace line set too?', diagnosis: 'If your system is going from R-22 to R-410A or R-454B (2026 standard), line set replacement is often recommended because old lines may contain R-22 oil that contaminates new refrigerant. If converting to same refrigerant type and lines are clean and undamaged, reuse is acceptable. Get a tech assessment before deciding.' },
];

export default function DFWRefrigerantLineGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = issues.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🔵 Refrigerant Line Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 15, marginBottom: 28 }}>
          The refrigerant lines connecting your DFW split system are often overlooked — but cracked insulation and aging line sets are common efficiency killers in North Texas's harsh UV environment.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🧊', title: 'Suction vs Liquid Line', body: 'Two lines connect your outdoor unit to indoor air handler. The large, insulated line (suction) carries cold low-pressure refrigerant gas — should be cold and slightly sweating. The small, uninsulated line (liquid) carries warm high-pressure liquid. Understanding which is which helps you spot problems instantly.' },
            { icon: '☀️', title: 'DFW Insulation Degradation', body: 'Standard black foam insulation has a 7-10 year lifespan in direct DFW sun. UV destroys foam rapidly on exposed line sets. Degraded insulation lets heat transfer into the suction line, reducing system capacity 5-15%. Armaflex UV-resistant insulation ($30-60 DIY or $100-200 installed) lasts 2-3x longer.' },
            { icon: '📏', title: 'Line Set Length & Efficiency', body: 'DFW attic air handler installs often require 30-60 foot line set runs. Every 10 feet over the manufacturer\’s recommended length requires refrigerant charge adjustment. Long line sets also increase pressure drop. A correctly charged long run performs fine — incorrect charge after long-run install is a common tech mistake.' },
            { icon: '🔄', title: 'When to Replace Line Set', body: 'Replacing outdoor unit only? Inspect the line set first. Kinked lines, corrosion at fittings, or incompatible diameter for new refrigerant (R-454B requires specific line sizing) all warrant replacement ($500-900 for typical DFW run). A bad line set will underperform any new equipment installed on it.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '18px 20px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon} <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642' }}>{card.title}</span></div>
              <p style={{ color: '#B0B8CC', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Refrigerant Line Issue Guide</h2>
          <p style={{ color: '#9BA3B4', fontSize: 14, marginBottom: 16 }}>Select your situation for a service recommendation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {issues.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#162035', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
              <p style={{ color: '#E8EAF0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: '18px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>🏠 Get a DFW Refrigerant Line Quote</div>
          <div style={{ fontSize: 13, color: '#1A2A4A' }}>ProLnk connects you with vetted DFW HVAC pros — free, no commitment.</div>
        </div>
      </div>
    </div>
  );
}