import { useState } from 'react';

const districts = [
  { name: 'Carroll ISD', cities: 'Southlake / Colleyville', rating: 10, tier: 'excellent', enrollment: '9,800', gradRate: '98%', satAvg: '1290', premium: '18%' },
  { name: 'Highland Park ISD', cities: 'Dallas (Park Cities)', rating: 10, tier: 'excellent', enrollment: '7,200', gradRate: '99%', satAvg: '1310', premium: '22%' },
  { name: 'Frisco ISD', cities: 'Frisco / Prosper', rating: 9, tier: 'excellent', enrollment: '67,000', gradRate: '97%', satAvg: '1220', premium: '16%' },
  { name: 'Allen ISD', cities: 'Allen', rating: 9, tier: 'excellent', enrollment: '22,000', gradRate: '97%', satAvg: '1200', premium: '14%' },
  { name: 'Coppell ISD', cities: 'Coppell', rating: 9, tier: 'excellent', enrollment: '13,500', gradRate: '98%', satAvg: '1240', premium: '15%' },
  { name: 'Prosper ISD', cities: 'Prosper / Celina', rating: 9, tier: 'excellent', enrollment: '26,000', gradRate: '97%', satAvg: '1190', premium: '13%' },
  { name: 'McKinney ISD', cities: 'McKinney', rating: 8, tier: 'good', enrollment: '26,000', gradRate: '95%', satAvg: '1150', premium: '9%' },
  { name: 'Plano ISD', cities: 'Plano / Murphy', rating: 8, tier: 'good', enrollment: '54,000', gradRate: '95%', satAvg: '1170', premium: '10%' },
  { name: 'Keller ISD', cities: 'Keller / North Fort Worth', rating: 8, tier: 'good', enrollment: '36,000', gradRate: '94%', satAvg: '1130', premium: '8%' },
  { name: 'Flower Mound / LISD', cities: 'Flower Mound / Lewisville', rating: 7, tier: 'good', enrollment: '50,000', gradRate: '93%', satAvg: '1120', premium: '7%' },
];

export default function DFWSchoolDistrictGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [filterTier, setFilterTier] = useState<'all' | 'excellent' | 'good'>('all');

  const toggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : prev.length < 3 ? [...prev, name] : prev
    );
  };

  const filtered = districts.filter(d => filterTier === 'all' || d.tier === filterTier);
  const comparisonDistricts = districts.filter(d => selected.includes(d.name));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0D2144 0%, #1A3A6B 100%)', padding: '60px 24px 48px', borderBottom: '1px solid #1E3A5F' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏫 📚</div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2 }}>
            DFW School District Guide 2026
          </h1>
          <p style={{ fontSize: 18, color: '#8FB0D4', margin: 0 }}>How Schools Affect Your Home Value — and Your Family</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Premium Banner */}
        <section style={{ marginTop: 48, background: 'linear-gradient(135deg, #1A3A0D 0%, #0D3321 100%)', border: '1px solid #22C55E', borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#4ADE80', marginBottom: 12 }}>Why School Districts Matter for Home Value</h2>
          <p style={{ color: '#A8C4E0', fontSize: 16, margin: 0, lineHeight: 1.8 }}>
            In DFW, school district quality adds an average <strong style={{ color: '#4ADE80', fontSize: 18 }}>14–18% premium</strong> to home prices. A $500,000 home in a top-rated district like Carroll ISD or Highland Park ISD would sell for $430,000–$440,000 in a comparable location with an average district. That premium tends to hold — and grow — over time.
          </p>
        </section>

        {/* Filter */}
        <section style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#60A5FA', margin: 0 }}>DFW School Districts by Rating</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['all', 'All'], ['excellent', '⭐ Excellent (9-10)'], ['good', '👍 Good (7-8)']] as ['all' | 'excellent' | 'good', string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setFilterTier(val)}
                  style={{
                    padding: '7px 14px',
                    background: filterTier === val ? '#2563EB' : '#0D2144',
                    color: filterTier === val ? '#FFFFFF' : '#8FB0D4',
                    border: `1px solid ${filterTier === val ? '#2563EB' : '#1E3A5F'}`,
                    borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p style={{ color: '#8FB0D4', fontSize: 13, marginBottom: 16 }}>Select up to 3 districts to compare side-by-side.</p>

          <div style={{ display: 'grid', gap: 10 }}>
            {filtered.map(d => {
              const isSelected = selected.includes(d.name);
              return (
                <div
                  key={d.name}
                  onClick={() => toggle(d.name)}
                  style={{
                    background: isSelected ? '#0D2A4A' : '#0D2144',
                    border: `2px solid ${isSelected ? '#3B82F6' : '#1E3A5F'}`,
                    borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 16,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 200 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: d.rating === 10 ? '#1A3A0D' : d.tier === 'excellent' ? '#1A2D0D' : '#1A1A0D',
                      border: `2px solid ${d.rating === 10 ? '#22C55E' : d.tier === 'excellent' ? '#84CC16' : '#EAB308'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 800,
                      color: d.rating === 10 ? '#22C55E' : d.tier === 'excellent' ? '#84CC16′ : '#EAB308',
                    }}>
                      {d.rating}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>{d.name}</div>
                      <div style={{ fontSize: 12, color: '#8FB0D4′ }}>{d.cities}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#4ADE80′ }}>{d.premium}</div>
                      <div style={{ fontSize: 11, color: '#8FB0D4′ }}>Price Premium</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#60A5FA' }}>{d.gradRate}</div>
                      <div style={{ fontSize: 11, color: '#8FB0D4′ }}>Grad Rate</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#A78BFA' }}>{d.satAvg}</div>
                      <div style={{ fontSize: 11, color: '#8FB0D4′ }}>Avg SAT</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#FCD34D' }}>{d.enrollment}</div>
                      <div style={{ fontSize: 11, color: '#8FB0D4′ }}>Enrollment</div>
                    </div>
                  </div>
                  {isSelected && <div style={{ color: '#3B82F6', fontSize: 20, fontWeight: 700 }}>✓</div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Comparison Panel */}
        {comparisonDistricts.length >= 2 && (
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#60A5FA', marginBottom: 20 }}>📊 Side-by-Side Comparison</h2>
            <div style={{ background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#162A4A' }}>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#8FB0D4', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>Metric</th>
                      {comparisonDistricts.map(d => (
                        <th key={d.name} style={{ padding: '14px 20px', textAlign: 'center', color: '#60A5FA', fontWeight: 700, borderBottom: '1px solid #1E3A5F' }}>{d.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Rating', key: 'rating' as const },
                      { label: 'Cities Served', key: 'cities' as const },
                      { label: 'Home Price Premium', key: 'premium' as const },
                      { label: 'Graduation Rate', key: 'gradRate' as const },
                      { label: 'Average SAT Score', key: 'satAvg' as const },
                      { label: 'Enrollment', key: 'enrollment' as const },
                    ].map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? '#0A1628′ : '#0D2144' }}>
                        <td style={{ padding: '12px 20px', color: '#A8C4E0', fontWeight: 600, borderBottom: '1px solid #1E3A5F' }}>{row.label}</td>
                        {comparisonDistricts.map(d => (
                          <td key={d.name} style={{ padding: '12px 20px', textAlign: 'center', color: '#FFFFFF', fontWeight: 500, borderBottom: '1px solid #1E3A5F' }}>
                            {String(d[row.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Practical Guidance */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#60A5FA', marginBottom: 20 }}>💡 Practical Guidance</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '🗺️', title: 'Boundaries ≠ City Limits', desc: 'School district boundaries do not follow city limits. A home in "Frisco" may be in Prosper ISD or Little Elm ISD. Always verify at schooldigger.com or the Texas Education Agency boundary lookup before making an offer.' },
              { icon: '🎓', title: 'Magnet Programs as an Alternative', desc: 'Lower-rated districts often have magnet or specialty programs (STEM, International Baccalaureate, Fine Arts) that rival top-district quality — and eliminate the price premium entirely.' },
              { icon: '🏫', title: 'Private School Option', desc: 'If you plan to use private school, the district rating matters less for your family but still affects resale value — buyers without private school plans will discount for a lower-rated district.' },
              { icon: '🏡', title: 'The Resale Rule', desc: 'Buy in the best school district you can afford. You’ll thank yourself at resale. Even when interest rates are high and the market is slow, homes in top-rated districts hold value better and sell faster than comparable homes outside those boundaries.' },
            ].map(tip => (
              <div key={tip.title} style={{ background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 12, padding: 22 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{tip.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>{tip.title}</div>
                    <p style={{ color: '#8FB0D4', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
