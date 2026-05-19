import { useState } from 'react';

const stages = [
  { id: 'just-looking', label: 'Just Browsing', icon: '👀' },
  { id: 'serious', label: 'Seriously Shopping', icon: '🏠' },
  { id: 'offer', label: 'Making an Offer', icon: '✍️' },
  { id: 'under-contract', label: 'Under Contract', icon: '📋' },
];

const guides: Record<string, { title: string; items: { icon: string; check: string; detail: string; flag: string }[] }> = {
  'just-looking': {
    title: 'Quick Drive-By Scan',
    items: [
      { icon: '📅', check: 'Unit Age', detail: 'Find the data plate on the outdoor unit — look for manufacture date', flag: '15+ years old = budget $8K–$14K replacement soon' },
      { icon: '🏷️', check: 'Brand Recognition', detail: 'Carrier, Trane, Lennox, Rheem = reputable brands with DFW service networks', flag: 'Unknown brands may have limited DFW parts availability' },
      { icon: '🌿', check: 'Vegetation Clearance', detail: 'HVAC needs 24-inch clearance on all sides for airflow', flag: 'Overgrown shrubs reduce efficiency and signal neglect' },
    ],
  },
  'serious': {
    title: 'Detailed Visual Assessment',
    items: [
      { icon: '🦀', check: 'Rust and Corrosion', detail: 'Check coil fins, cabinet, and refrigerant lines for rust spots', flag: 'Surface rust = cosmetic; deep rust on coils = refrigerant leak risk' },
      { icon: '🏠', check: 'Two-Story Coverage', detail: 'DFW two-stories often need two systems — look for a second outdoor unit', flag: 'Single unit for 2,500+ sq ft = likely undersized for DFW summers' },
      { icon: '🔩', check: 'Physical Damage', detail: 'Bent fins, dented cabinet, missing panels signal past storm or neglect', flag: 'DFW hail storms (2021, 2024) caused widespread coil damage' },
      { icon: '📦', check: 'Unit Model', detail: 'Note brand and model — cross-reference SEER rating online', flag: 'SEER < 14 = below current TX code for new installs' },
    ],
  },
  'offer': {
    title: 'Pre-Offer HVAC Checklist',
    items: [
      { icon: '⚡', check: 'Electrical Disconnect', detail: 'Check disconnect box near outdoor unit — should be weatherproof and sealed', flag: 'Open or missing disconnect = code violation, insurance issue' },
      { icon: '📐', check: 'Pad Level', detail: 'Concrete pad should be level — shifting pad stresses refrigerant lines', flag: 'Sinking pad in DFW clay = foundation movement indicator' },
      { icon: '🌡️', check: 'DFW Climate Sizing', detail: 'DFW requires ~1 ton per 400 sq ft — estimate from unit model number', flag: 'Undersized = runs constantly in DFW summers, high bills' },
    ],
  },
  'under-contract': {
    title: 'Inspection Negotiation Guide',
    items: [
      { icon: '🔍', check: 'Get HVAC-Specific Inspector', detail: 'General inspectors miss HVAC issues — request HVAC specialist for $150–$300', flag: 'Worth every dollar on DFW homes 10+ years old' },
      { icon: '💰', check: 'Repair Credit vs Replacement', detail: 'Unit 12+ years: negotiate replacement credit, not repair', flag: 'DFW replacement runs $8K–$14K installed per system' },
      { icon: '📜', check: 'Request Maintenance Records', detail: 'Annual filter changes and coil cleanings extend life significantly', flag: 'No records = unknown condition, price accordingly' },
    ],
  },
};

export default function DFWHVACDriveBy2026() {
  const [stage, setStage] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Drive-By HVAC Assessment Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What you can spot from the street before making an offer on a DFW home</p>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>📍 WHERE ARE YOU IN YOUR DFW HOME PURCHASE?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)} style={{ padding: '12px', borderRadius: 8, border: '2px solid', borderColor: stage === s.id ? '#F5E642′ : '#334155', backgroundColor: stage === s.id ? '#F5E64220' : '#0f2744', color: '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {stage && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔎 {guides[stage].title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides[stage].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.check}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{item.detail}</div>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#fbbf24′ }}>⚠️ {item.flag}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Need a DFW HVAC pro for a full inspection?</p>
              <a href="https://prolnk.io" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none' }}>🔗 Find vetted DFW HVAC pros at ProLnk.io →</a>
            </div>
          </div>
        )}

        {!stage && (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 40 }}>
            ☝️ Select your purchase stage above to get your personalized HVAC drive-by checklist
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #1e3a5f', paddingTop: 20 }}>
          <p style={{ color: '#475569', fontSize: 12 }}>ProLnk DFW Home Services Platform · prolnk.io · Data updated May 2026</p>
        </div>
      </div>
    </div>
  );
}