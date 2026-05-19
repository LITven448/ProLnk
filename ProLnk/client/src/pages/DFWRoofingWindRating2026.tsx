import { useState } from 'react';

const concerns = [
  { q: 'What wind speed rating does DFW require for residential shingles', a: 'IRC and Texas residential code requires shingles rated for at least 90 mph 3-second gust (UL 2390 Class D). However, most DFW roofing engineers and insurance carriers now recommend Class H (110 mph) or Class G (130 mph) due to DFW severe weather frequency. Class H is the minimum for Denton/Tarrant/Dallas County homes to qualify for wind mitigation discounts on some policies.' },
  { q: 'What is UL 2390 and how is it different from ASTM D7158', a: 'UL 2390 replaced ASTM D7158 as the wind speed rating standard. UL 2390 tests shingles in a wind tunnel and assigns Class D (90 mph), Class G (130 mph), or Class H (110 mph) ratings. Confusingly, H is lower than G. Most DFW insurance carriers recognize UL 2390 ratings. ASTM D3161 (Class A/B/C) is an older classification still found on product labels — Class F (≥110 mph) is roughly equivalent to UL 2390 Class H.' },
  { q: 'Can DFW tornadoes be survived by rated shingles', a: 'No — residential shingle ratings top out at 130 mph (UL 2390 Class G). EF-0 tornadoes start at 65 mph and EF-1 at 86 mph (survivable range). EF-2 (111-135 mph) and above will remove any shingles regardless of rating. DFW averages 13 tornadoes per year across the metro. Wind rating protects from straight-line wind, hail-driven wind, and borderline EF-0/EF-1 events — not direct tornado strikes.' },
  { q: 'Should I upgrade from Class D to Class H in DFW', a: 'Yes — strongly recommended. Class H (110 mph) shingles typically cost 15-25% more than Class D but last longer in DFW wind and hail cycles. More importantly, some DFW insurers offer 5-15% premium discounts for Class H or better. The payback period is typically 3-5 years through insurance savings alone, before accounting for reduced storm damage claims.' },
  { q: 'What about impact resistance ratings for DFW hail', a: 'Separate from wind rating — impact resistance is Class 1 through Class 4 (UL 2218 or FM 4473). DFW is one of the highest hail-frequency metros in the US (hail alley). Class 4 impact-resistant shingles offer the best protection and qualify for the largest insurance discounts. Pair Class 4 impact resistance with Class H wind rating for optimal DFW performance.' },
];

export default function DFWRoofingWindRating2026() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

  const ratings = [
    { cls: 'Class D', speed: '90 mph', standard: 'UL 2390', dfw: 'Code minimum only', rec: false },
    { cls: 'Class H', speed: '110 mph', standard: 'UL 2390', dfw: 'DFW recommended minimum', rec: true },
    { cls: 'Class G', speed: '130 mph', standard: 'UL 2390', dfw: 'Best available, insurance savings', rec: true },
    { cls: 'Class F', speed: '≥110 mph', standard: 'ASTM D3161', dfw: 'Older label, similar to H', rec: false },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌪️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Roofing Wind Speed Rating Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Understanding UL 2390 wind ratings and what they mean for DFW homeowners</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 UL 2390 Wind Rating Classes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ratings.map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px', border: `1px solid ${r.rec ? '#F5E642' : '#2d5a8e'}`, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 90 }}>
                  <div style={{ color: r.rec ? '#F5E642′ : '#94a3b8', fontWeight: 800, fontSize: 16 }}>{r.cls}</div>
                  <div style={{ color: '#22c55e', fontSize: 13, fontWeight: 700 }}>{r.speed}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{r.standard}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{r.dfw}</div>
                </div>
                {r.rec && <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 800 }}>✓ DFW REC</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🌪️ DFW Design Wind Speed</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: '0 0 12px' }}>
            ASCE 7 maps DFW residential design wind speed at 90-100 mph 3-second gust (Risk Category II). This is the code design speed — not the maximum event speed. DFW straight-line derechoes have recorded 80-100 mph. Mesocyclone-driven tornadoes routinely exceed 130 mph. Wind ratings protect the far-more-common straight-line events; they are not tornado shelters.
          </p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', border: '1px solid #2d5a8e' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>DFW Insurance Tip</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Class H or Class G shingles + Class 4 impact rating = maximum wind & hail credits from most Texas carriers. Ask your adjuster for the wind mitigation credit schedule before purchasing shingles.</div>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 My DFW Wind Rating Question</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map((c, i) => (
              <div key={i}>
                <button onClick={() => toggle(i)} style={{ width: '100%', textAlign: 'left', background: open[i] ? '#0d2137′ : '#0A1628', border: '1px solid', borderColor: open[i] ? '#F5E642' : '#2d5a8e', borderRadius: 8, padding: '12px 16px', color: open[i] ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 14, fontWeight: open[i] ? 700 : 400, display: 'flex', justifyContent: 'space-between' }}>
                  {c.q} <span>{open[i] ? '▲' : '▼'}</span>
                </button>
                {open[i] && <div style={{ background: '#0d2137', border: '1px solid #F5E642', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 16px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{c.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 12 }}>
          ProLnk DFW Roofing Guide 2026 · prolnk.io
        </div>
      </div>
    </div>
  );
}
