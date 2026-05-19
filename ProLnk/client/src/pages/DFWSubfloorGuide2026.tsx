import { useState } from 'react';

const problems = [
  { id: 'squeaky', label: '🎵 Squeaky / Bouncy Floors', diagnosis: 'Clay Soil Movement (DFW-specific)', recs: ['Identify exact squeak location by walking slowly — mark with tape', 'From below (pier & beam): drive screws through subfloor into joist to re-secure', 'From above: use snap-off screw kit designed for hardwood floors', 'Bouncy floors indicate joist span issues — add mid-span blocking', 'If squeak is seasonal (worse in summer), humidity expansion is likely cause'] },
  { id: 'slabLeak', label: '💧 Water Damage / Soft Spots', diagnosis: 'Slab Leak (Most Common DFW Cause)', recs: ['DFW has some of the highest slab leak rates in the US — clay soil shifts pipes', 'Soft spots in subfloor above slab often mean water damage from below', 'Call a plumber first — use electronic leak detection before opening anything', 'Water-damaged OSB must be replaced; it does not dry out structurally', 'After plumber fixes leak, let area dry 3-5 days with fans before subfloor repair'] },
  { id: 'rot', label: '🦠 Rot / Mold (Pier & Beam)', diagnosis: 'Moisture Intrusion from Crawl Space', recs: ['Probe soft areas with screwdriver — if it sinks, rot is active', 'Address moisture source first: vapor barrier, drainage, grading', 'Remove rotted sections back to solid wood — do not just sister over rot', 'Treat surrounding joists with borate wood preservative', 'Replace with pressure-treated plywood in moisture-prone areas'] },
  { id: 'material', label: '🪵 OSB vs Plywood Decision', diagnosis: 'Material Selection for DFW Climate', recs: ['DFW humidity cycles cause OSB to swell at edges — plywood holds up better long-term', 'Use 3/4″ tongue-and-groove plywood for 16″ joist spacing (standard DFW spec)', 'OSB is acceptable for slab-on-grade with good moisture barrier but avoid in pier & beam', 'AdvanTech subfloor panels are top pick for DFW — moisture warranty', 'Always stagger seams and leave 1/8″ expansion gap between panels'] },
];

export default function DFWSubfloorGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = problems.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Subfloor Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW subfloors are under constant stress: slab foundations shift with expansive clay soil, pier-and-beam homes have crawl space moisture problems, and slab leaks are among the most common home insurance claims in North Texas.
        </p>

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>⚠️ DFW Slab Leak Context</div>
          <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            DFW sits on highly expansive Blackland Prairie clay. As clay expands and contracts with moisture changes, it stresses copper water lines embedded in slabs, causing pinhole leaks. Signs include: warm spots on the floor, high water bills, the sound of running water with all fixtures off, and soft or discolored subfloor. Address immediately — water under a slab can migrate 10-15 feet from the source.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🔍 Select Your Subfloor Issue</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {problems.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{ background: selected === p.id ? '#F5E642′ : '#111d30', color: selected === p.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left' }}>
              {p.label}
            </button>
          ))}
        </div>

        {current && (
          <div style={{ background: '#111d30', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Most Likely Cause in DFW</div>
            <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 16 }}>{current.diagnosis}</div>
            {current.recs.map((r, idx) => (
              <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 7px', fontWeight: 700, fontSize: 12, minWidth: 22, textAlign: 'center' }}>{idx + 1}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#111d30', borderRadius: 10, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>💰 DFW Subfloor Repair Cost Ranges (2026)</div>
          {[
            { item: 'Squeaky floor repair (from below)', range: '$150 – $400′ },
            { item: 'Subfloor patch (4×8 section)', range: '$300 – $700′ },
            { item: 'Full room subfloor replacement', range: '$1,500 – $4,000′ },
            { item: 'Slab leak detection + repair', range: '$800 – $3,500′ },
          ].map(r => (
            <div key={r.item} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#94a3b8′ }}>{r.item}</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
