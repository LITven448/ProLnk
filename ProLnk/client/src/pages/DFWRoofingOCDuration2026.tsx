import { useState } from 'react';

const priorities = [
  { label: 'Budget value — want durability without overpaying', product: 'Duration (30-Year Architectural)', why: 'Best cost-per-year in DFW. SureNail technology handles 130 mph winds. StreakGuard algae resistance helps with DFW humidity. Standard for most DFW re-roofs.' },
  { label: 'Hail damage history — want insurance-grade protection', product: 'Duration Storm (Class 4 Impact)', why: 'UL 2218 Class 4 rated. DFW averages 5–8 hail events per year. Many DFW insurers offer 20–30% premium discount for Class 4 roofs. Best ROI for hail-prone neighborhoods.' },
  { label: 'Unique color depth — want a standout DFW curb appeal', product: 'Duration TruDefinition', why: 'Enhanced color contrast via two-layer granule blending. 40+ colors. TruDefinition looks better longer in DFW UV exposure. Same storm protection as standard Duration.' },
  { label: 'Low-slope section on DFW home (under 2:12 pitch)', product: 'Duration Flex (modified asphalt)', why: 'Standard shingles cannot seal properly on low slopes. Duration Flex is a hybrid between shingle and modified bitumen. Handles DFW ponding and thermal expansion.' },
  { label: 'Algae streaking already visible on current roof', product: 'Duration Storm with StreakGuard', why: 'DFW humidity (avg 65%) accelerates algae growth. StreakGuard copper-containing granules prevent streaking for 10+ years. Combine with annual cleaning for best results.' },
];

export default function DFWRoofingOCDuration2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME SERVICES · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>🏠 DFW Owens Corning Duration Series Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.7 }}>
          Owens Corning Duration shingles are among the most-installed products in DFW due to their wind and hail ratings.
          DFW sits in <strong style={{ color: '#F5E642′ }}>Hail Alley</strong> — Class 4 impact resistance can save 20–30% on homeowner’s insurance premiums.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🌪️', label: 'Wind Rating (Duration)', value: '130 mph (SureNail Tech)' },
            { icon: '🧊', label: 'Duration Storm Rating', value: 'Class 4 Impact (UL 2218)' },
            { icon: '🎨', label: 'TruDefinition Colors', value: '40+ DFW-popular shades' },
            { icon: '🌿', label: 'Algae Protection', value: 'StreakGuard (10+ yr warranty)' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🧊 DFW Hail Alley Context</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <div>⚡ DFW averages <strong style={{ color: '#fff' }}>5–8 significant hail events per year</strong></div>
            <div>💰 Class 4 roof = 20–30% insurance premium savings (many DFW carriers)</div>
            <div>📋 Verify with your insurer before selecting shingle — not all qualify</div>
            <div>🔧 Duration Storm costs ~$40–80 more per square than standard Duration</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏘️ Your DFW Priority → Duration Line Recommendation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {priorities.map((p, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#112240', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{p.label}</div>
              {selected === i && (
                <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Recommended: {p.product}</div>
                  <div style={{ color: '#94a3b8′ }}>💡 {p.why}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Owens Corning Duration Series Guide 2026 · Data: OC Product Specs, Texas DOI
        </div>
      </div>
    </div>
  );
}