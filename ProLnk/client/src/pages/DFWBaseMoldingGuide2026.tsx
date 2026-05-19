import { useState } from 'react';

const homeStyles = [
  { label: 'Builder Grade / Starter', value: 'builder' },
  { label: 'Mid-Range (2000s DFW)', value: 'mid' },
  { label: 'Updated / Transitional', value: 'updated' },
  { label: 'Luxury / Custom', value: 'luxury' },
];

const recs = {
  builder: { size: '3.5 inch', profile: 'Colonial or Clamshell', material: 'MDF', note: 'Standard DFW production builder spec. Affordable and paintable. Common in homes built 1990–2015 throughout Garland, Mesquite, Rowlett, and Grand Prairie.' },
  mid: { size: '4.25 inch', profile: 'Colonial with slight bead', material: 'MDF Primed', note: 'Step up common in DFW homes priced $300K–$450K. Adds visual weight without custom price. Pairs well with 3.5″ door casing.' },
  updated: { size: '5.25 inch', profile: 'Flat or Craftsman', material: 'MDF Primed', note: 'Popular DFW remodel upgrade. Craftsman-style flat baseboard with a small cap adds modern-traditional look. Common in Frisco and McKinney remodels 2020+.' },
  luxury: { size: '7.25 inch+', profile: 'Multi-piece or Built-Up', material: 'MDF or Paint-Grade Poplar', note: 'DFW luxury standard in Southlake, Westlake, Trophy Club. Often a 3-piece built-up profile: base cap + baseboard + plinth blocks at door casings.' },
};

const facts = [
  { icon: '💧', label: 'MDF vs Wood in DFW', text: 'MDF expands and contracts significantly less than wood in DFW humidity cycles. For painted baseboard, MDF is the clear choice recommended by most DFW finish carpenters.' },
  { icon: '🪵', label: 'LVP Installation Sequence', text: 'With LVP (luxury vinyl plank) — now the dominant DFW floor choice — baseboard installs AFTER flooring. LVP floats, so baseboard must not pin it down. Leave 1/4″ gap at wall before baseboard.' },
  { icon: '🎨', label: 'Caulk and Paint', text: 'DFW pros caulk all baseboard joints and top edges before painting. Sherwin-Williams Extra White or Alabaster are the two most common DFW baseboard paint colors.' },
  { icon: '📐', label: 'Outside Corners', text: '45° miter at outside corners. Inside corners: coped joint (not mitered) for durability as DFW seasonal movement causes miter gaps over time.' },
  { icon: '💰', label: 'Upgrade ROI', text: 'Upgrading from 3.5″ to 5.25″ baseboard throughout a DFW home typically costs $800–$2,500 in materials. Perceived value add: $3,000–$8,000 in buyer perception at resale.' },
];

export default function DFWBaseMoldingGuide2026() {
  const [selected, setSelected] = useState(null);
  const result = selected ? recs[selected] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Baseboard & Base Molding Guide 2026</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>Size, material, profiles, and LVP sequence — for every DFW home tier</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Select Your Home Style / Tier</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {homeStyles.map((s) => (
              <button key={s.value} onClick={() => setSelected(s.value)}
                style={{ background: selected === s.value ? '#F5E642′ : '#162035', color: selected === s.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '14px 20px', cursor: ’pointer', fontWeight: 600, textAlign: 'left', fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {result ? (
          <div style={{ background: '#162035', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>Recommended Baseboard Spec</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#aaa', fontSize: 11, marginBottom: 4 }}>SIZE</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.size}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#aaa', fontSize: 11, marginBottom: 4 }}>PROFILE</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>{result.profile}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#aaa', fontSize: 11, marginBottom: 4 }}>MATERIAL</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.material}</div>
              </div>
            </div>
            <p style={{ color: '#ddd', lineHeight: 1.7, marginTop: 0, fontSize: 14 }}>{result.note}</p>
          </div>
        ) : (
          <div style={{ background: '#162035', borderRadius: 12, padding: 24, textAlign: 'center', color: '#888', marginBottom: 24 }}>
            Select your home style to get a DFW baseboard recommendation.
          </div>
        )}

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>DFW Baseboard Intel</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {facts.map((f) => (
            <div key={f.label} style={{ background: '#162035', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.icon} {f.label}</div>
              <div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>{f.text}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>ProLnk DFW Home Intelligence • prolnk.io</p>
      </div>
    </div>
  );
}
