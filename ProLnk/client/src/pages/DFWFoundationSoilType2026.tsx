import { useState } from 'react';

const soilTypes = [
  { id: 'blackland', label: '🖤 Dark, sticky, cracks when dry — sticks to shoes when wet', type: 'Blackland Prairie Clay', pi: 'Plasticity Index 45–65 (Very High)', location: 'Central/West DFW: Dallas proper, Fort Worth, Arlington, Irving, Mansfield, Grand Prairie', risk: 'Highest', detail: 'This is the most expansive soil in the DFW region. Volume change of 10–15% between wet and dry states is normal. Foundations on Blackland Prairie require the most robust pier-and-beam or post-tension slab design. Foundation watering is not optional — it\’s essential maintenance. Expect seasonal gaps at baseboards, sticking doors, and hairline interior cracks during drought.', action: 'Maintain consistent soil moisture year-round. Soaker hose 18 inches from foundation, 30–45 min/day during drought. Monitor gaps annually. Have foundation evaluated every 5–7 years.' },
  { id: 'postoaks', label: '🟤 Sandy, loose, drains quickly — doesn\’t clump well', type: 'Post Oak Savanna Sandy Loam', pi: 'Plasticity Index 10–25 (Low–Moderate)', location: 'East DFW: Mesquite, Garland, Rowlett, Rockwall, east Plano, Forney', risk: 'Lower', detail: 'Sandy loam soils in east DFW expand and contract far less than Blackland clay. Foundation movement is primarily settlement-related rather than shrink-swell driven. Drainage is better, reducing hydrostatic pressure against foundations. However, sandy soils can allow voids to form under slabs if water channels through consistently.', action: 'Ensure proper drainage away from foundation. Check for erosion channels near foundation edges. Less intensive watering regimen needed — focus on drainage management.' },
  { id: 'rolling', label: '🟫 Medium-brown, somewhat sticky — clumps but not as dark', type: 'Rolling Prairie Clay Loam', pi: 'Plasticity Index 25–44 (Moderate–High)', location: 'North DFW: Plano, Frisco, Allen, McKinney, Prosper, Celina, Denton area', risk: 'Moderate', detail: 'Clay loam soils in north DFW are transitional between Blackland and Post Oak characteristics. Expansion and contraction occur but are less extreme than central DFW. This zone is growing rapidly — newer construction typically uses better engineered slab designs that account for moderate PI. Older homes (pre-1990) may have undersized foundations for the actual soil conditions.', action: 'Foundation watering recommended during extended drought (Texas summers). Monitor door alignment and interior cracks seasonally. Have older foundations (pre-1990) professionally evaluated.' },
];

const fieldTest = [
  { step: '1', title: 'Wet Soil Ribbon Test', body: 'Take a handful of moist soil. Roll into a ball, then push between thumb and forefinger into a ribbon. Blackland clay ribbons 2+ inches without breaking. Post Oak sandy loam crumbles immediately. Clay loam ribbons 1–1.5 inches.' },
  { step: '2', title: 'Dry Crack Observation', body: 'Look at bare soil near your foundation during August drought. Blackland clay cracks visibly — sometimes 1–2 inch wide cracks. Sandy soils don\’t crack. This is the most visible indicator of high-PI soil.' },
  { step: '3', title: 'Color Check', body: 'Blackland Prairie is distinctively dark — almost black when wet, gray-brown when dry. Post Oak savanna is tan to reddish-brown. Rolling Prairie clay loam is medium brown. This is a rough indicator but not definitive.' },
];

export default function DFWFoundationSoilType2026() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EEF7' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🗺️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Foundation Soil Type Assessment Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Identify your North Texas soil type and understand your foundation risk profile</p>
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>Why Soil Type Drives Foundation Risk in DFW</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            The DFW metroplex spans multiple geological soil zones, each with dramatically different foundation implications. The key metric is Plasticity Index (PI) — a measure of how much a soil expands when wet and contracts when dry. High PI clay soils (Blackland Prairie) can move a foundation inches over a seasonal cycle. Understanding your soil type is the foundation of any foundation maintenance plan.
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🔬 What Does Your Soil Look and Feel Like?</h2>
          {soilTypes.map(s => (
            <div key={s.id} style={{ marginBottom: 12 }}>
              <button onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ width: '100%', background: active === s.id ? '#1E3A5F' : '#0F2137', border: `1px solid ${active === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 18px', color: '#E8EEF7', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {s.label}
              </button>
              {active === s.id && (
                <div style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{s.type}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 10 }}>{s.pi} · {s.location}</div>
                  <div style={{ display: 'inline-block', background: s.risk === 'Highest' ? '#450A0A' : s.risk === 'Moderate' ? '#7C2D12' : '#064E3B', color: '#F5E642', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>Foundation Risk: {s.risk}</div>
                  <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{s.detail}</p>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 12 }}>Recommended Action: </span>
                    <span style={{ color: '#94A3B8', fontSize: 13 }}>{s.action}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🧪 Quick Field Soil Tests</h2>
          {fieldTest.map((t, i) => (
            <div key={i} style={{ background: '#0F2137', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 18px', marginBottom: 12, display: 'flex', gap: 14 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{t.step}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{t.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2137', border: '1px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk — DFW Foundation Contractors</div>
          <div style={{ color: '#94A3B8', fontSize: 13 }}>Connect with licensed DFW structural engineers who know your specific soil zone. Get soil-appropriate foundation recommendations.</div>
        </div>
      </div>
    </div>
  );
}