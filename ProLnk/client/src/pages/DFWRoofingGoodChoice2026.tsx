import { useState } from 'react';

const situations = [
  { label: 'I\'m in Hail Alley (Collin, Denton, Tarrant, Dallas)', icon: '⛈️', rec: 'Class 4 Impact-Resistant Minimum', detail: 'DFW sits in one of the most hail-active corridors in North America. Class 4 (UL 2218) shingles resist golf-ball-size hail and qualify for 20-30% insurance discounts with most TX carriers. Anything less is insuring against damage you\'re inviting.' },
  { label: 'Standard DFW home, no special concerns', icon: '🏠', rec: 'Architectural Shingles (30-Year)', detail: 'Dimensional architectural shingles at 30-year warranty are the baseline for DFW. They handle 130 mph wind ratings, UV resistance for 100°F+ heat, and cost $4–6/sqft installed. Avoid 3-tab shingles — too thin for DFW weather exposure.' },
  { label: 'Long-term stay, want maximum durability', icon: '🏡', rec: 'Metal or Class 4 Shingles', detail: 'Standing seam metal roofs last 40–70 years in DFW and reflect summer heat (10–15% cooling savings). Class 4 shingles are the high-value middle ground: near-metal durability at 40–60% lower cost. Best ROI for homeowners staying 10+ years.' },
  { label: 'Selling in 3–5 years', icon: '🏷️', rec: 'Standard Architectural Shingles', detail: 'For resale, a clean 30-year architectural roof is all the market expects. Don\'t over-invest in metal or premium Class 4 if you won\'t recoup it. Focus on a clean install, proper flashing, and a transferable warranty to pass to the buyer.' },
];

export default function DFWRoofingGoodChoice2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Right Roof for Your DFW Home</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>DFW averages 9 severe hail events per year. Roofing decisions here carry real financial weight. Match your situation to the right roofing choice below.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#111e33', border: `2px solid ${selected === i ? '#F5E642' : '#1e2d45'}`, borderRadius: 12, padding: '18px 22px', textAlign: 'left', cursor: 'pointer', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{s.label}</div>
                  <div style={{ color: '#F5E642', fontSize: 13, marginTop: 2 }}>{s.rec}</div>
                </div>
                <span style={{ color: '#F5E642', fontSize: 20 }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: 15, lineHeight: 1.6 }}>{s.detail}</div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e33', border: '1px solid #1e2d45', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🚫 AVOID: STORM CHASERS</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            After every DFW hail event, out-of-state roofing crews flood neighborhoods. They offer fast installs, take insurance money upfront, and are gone in weeks. ProLnk only works with HAAG-certified, manufacturer-credentialed local DFW roofers who stand behind their work.
          </p>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔗 ProLnk matches you with HAAG-certified local DFW roofers</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>prolnk.io — Charter Pro Network — DFW</div>
        </div>
      </div>
    </div>
  );
}