import { useState } from 'react';

export default function DallasLakewoodHomeownerGuide2026() {
  const [homeEra, setHomeEra] = useState<string>();

  const eras = [
    { id: '1920s', label: '🏚️ 1920s Home', systems: { foundation: 'Pier & beam — inspect annually for settling and moisture', plumbing: 'Original cast iron or galvanized — plan full repipe soon', electrical: 'Likely knob-and-tube — must be replaced before insulation', roof: 'Multiple re-roofs likely — check for layering issues' }, risks: ['Root intrusion from large oaks into sewer lines', 'Settlement cracks from expansive clay soil', 'Asbestos in floor tiles and pipe wrap (pre-1978)'] },
    { id: '1930s-1940s', label: '🏠 1930s–1940s Home', systems: { foundation: 'Pier & beam with some slab additions — mixed materials', plumbing: 'Partial galvanized — check at walls and under slab', electrical: '60-amp service common — upgrade to 200A required', roof: 'Original rafters often undersized — check attic structure' }, risks: ['Lead paint on trim and windows (pre-1940)', 'Undersized electrical for modern loads', 'Cast iron sewer laterals corroding' ] },
    { id: '1950s', label: '🏡 1950s Ranch', systems: { foundation: 'Early slab foundations — plumbing under slab is a concern', plumbing: 'Copper beginning to appear — check solder joints', electrical: '100-amp panels, fuse boxes still present', roof: 'Original rafters may be fine — inspect decking' }, risks: ['Under-slab plumbing leaks costly to repair', 'Post-war materials quality varies widely', 'Asbestos in popcorn ceilings (common)' ] },
  ];

  const lakewoodTips = [
    { icon: '🌳', tip: 'Lakewood’s mature oaks are beautiful but roots invade sewers — camera-inspect lines every 3–5 years' },
    { icon: '🏛️', tip: 'Historic overlay may restrict exterior changes — check with City of Dallas before any facade work' },
    { icon: '💧', tip: 'White Rock Lake proximity raises humidity — check crawlspaces for moisture and mold annually' },
    { icon: '⚡', tip: 'Many Lakewood homes still on 60–100A service — budget $6,000–$12,000 for panel upgrade' },
    { icon: '🔩', tip: 'Pier & beam means easier access to plumbing — leverage this for repairs vs slab homes' },
  ];

  const selected = eras.find(e => e.id === homeEra);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌊</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Dallas Lakewood Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Historic homes near White Rock Lake — age-specific maintenance intelligence</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🗓️ Select Your Home's Era</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {eras.map(e => (
              <button key={e.id} onClick={() => setHomeEra(e.id)}
                style={{ background: homeEra === e.id ? '#F5E642′ : '#0f1f3d', color: homeEra === e.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '14px 18px', textAlign: ’left', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {Object.entries(selected.systems).map(([k, v]) => (
                <div key={k} style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
                  <p style={{ color: '#F5E642', fontWeight: 700, textTransform: 'capitalize', marginBottom: 6, fontSize: 14 }}>{k}</p>
                  <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#ef4444', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>⚠️ Era-Specific Risks</p>
              {selected.risks.map((r, i) => <p key={i} style={{ color: '#fca5a5', fontSize: 13, marginBottom: 6 }}>• {r}</p>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Lakewood Homeowner Insights</h2>
          {lakewoodTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#F5E642', borderRadius: 12 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>🔧 Find Lakewood-experienced contractors on ProLnk — free and instant.</p>
        </div>
      </div>
    </div>
  );
}