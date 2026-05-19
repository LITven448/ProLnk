import { useState } from 'react';

type TinyCity = 'dallas' | 'fortworth' | 'denton' | 'plano' | 'frisco' | 'arlington' | 'garland' | 'mckinney';
type HomeType = 'wheeled' | 'foundation' | 'adu' | 'container';

const cityRules: Record<TinyCity, { status: string; minSqft: number; adus: boolean; notes: string; color: string }> = {
  dallas: { status: 'Allowed on SF lots', minSqft: 500, adus: true, notes: 'SB 2 ADU allowances apply; must connect to city utilities', color: '#22C55E' },
  fortworth: { status: 'Limited — HOA dependent', minSqft: 800, adus: true, notes: 'ADUs allowed in most zones per SB 2; TWH restricted', color: '#F59E0B' },
  denton: { status: 'Allowed with permit', minSqft: 400, adus: true, notes: 'University town; progressive zoning; active ADU community', color: '#22C55E' },
  plano: { status: 'Restricted', minSqft: 1200, adus: false, notes: 'High minimum sq ft; HOA restrictions common; no TWH in city limits', color: '#EF4444′ },
  frisco: { status: 'Restricted', minSqft: 1400, adus: false, notes: 'Suburban codes restrict very small homes; ADU rules evolving', color: '#EF4444′ },
  arlington: { status: 'Case-by-case', minSqft: 600, adus: true, notes: 'ADUs allowed in some zones; contact planning dept first', color: '#F59E0B' },
  garland: { status: 'Allowed with permit', minSqft: 500, adus: true, notes: 'More permissive; ADU-friendly due to housing pressure', color: '#22C55E' },
  mckinney: { status: 'Restricted in most HOAs', minSqft: 1000, adus: true, notes: 'City allows ADUs but most lots are HOA-restricted', color: '#F59E0B' },
};

const homeTypeInfo: Record<HomeType, { utilityEst: number; foundationEst: number; permittable: string; desc: string }> = {
  wheeled: { utilityEst: 8000, foundationEst: 0, permittable: 'RV park or private land only in most DFW cities', desc: 'THOW (Tiny Home On Wheels) — built on trailer, movable, not permanently installed' },
  foundation: { utilityEst: 5000, foundationEst: 12000, permittable: 'Requires residential permit; must meet IRC minimum codes', desc: 'Permanent tiny home on concrete slab; treated as regular residential construction' },
  adu: { utilityEst: 6000, foundationEst: 14000, permittable: 'Allowed in most DFW cities per Texas SB 2 (2023)', desc: 'Accessory Dwelling Unit — detached or attached secondary unit on existing lot' },
  container: { utilityEst: 7000, foundationEst: 10000, permittable: 'Requires engineering stamp in most DFW cities', desc: 'Shipping container converted to living space; requires insulation + spray foam' },
};

export default function DFWTinyHomeGuide() {
  const [city, setCity] = useState<TinyCity>('dallas');
  const [homeType, setHomeType] = useState<HomeType>('adu');
  const [lotSqft, setLotSqft] = useState(7500);
  const [showResults, setShowResults] = useState(false);

  const rules = cityRules[city];
  const typeInfo = homeTypeInfo[homeType];
  const eligible = rules.adus && homeType === 'adu' || homeType === 'wheeled' || homeType === 'foundation';
  const buildCost = homeType === 'wheeled' ? 85000 : homeType === 'container' ? 95000 : 110000;
  const totalUtility = typeInfo.utilityEst + typeInfo.foundationEst;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Tiny Home & ADU Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>Texas SB 2 opened new ADU doors across DFW in 2023. Know where tiny homes are welcome — and where they're not.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: '20px 24px', margin: '32px 0', borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 16 }}>⚖️ Texas SB 2 (2023) — What It Changed</h3>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>Senate Bill 2 prohibits Texas cities from banning ADUs on single-family lots where they would otherwise be permitted by the zoning code. Cities cannot require owner-occupancy or minimum lot sizes beyond what's standard. This opened significant new opportunities across DFW.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '📜', title: 'Foundation vs Wheels', desc: 'Foundation homes get residential permits. Wheeled homes need RV parks or private land in most DFW cities.' },
            { icon: '🔌', title: 'Utility Connection', desc: 'City connections cost $5–12K. Well + septic on rural land runs $18–30K.' },
            { icon: '🏘️', title: 'HOA Is King', desc: 'Even if the city allows tiny homes, your HOA CC&Rs likely prohibit them. Check both.' },
            { icon: '❄️', title: 'DFW Climate', desc: 'Small structures with poor insulation are unlivable in summer. Spray foam required.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 14 }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px' }}>🗺️ DFW City Quick Reference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {(Object.entries(cityRules) as [TinyCity, typeof cityRules[TinyCity]][]).map(([c, r]) => (
              <div key={c} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: 14, textTransform: 'capitalize' }}>{c === 'fortworth' ? 'Fort Worth' : c === 'mckinney' ? 'McKinney' : c.charAt(0).toUpperCase() + c.slice(1)}</h4>
                <div style={{ fontSize: 11, fontWeight: 700, color: r.color, marginBottom: 6 }}>{r.status}</div>
                <div style={{ color: '#64748B', fontSize: 11 }}>Min: {r.minSqft} sq ft</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 24px' }}>📊 Zoning & Feasibility Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => { setCity(e.target.value as TinyCity); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="dallas">Dallas</option>
                <option value="fortworth">Fort Worth</option>
                <option value="denton">Denton</option>
                <option value="plano">Plano</option>
                <option value="frisco">Frisco</option>
                <option value="arlington">Arlington</option>
                <option value="garland">Garland</option>
                <option value="mckinney">McKinney</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => { setHomeType(e.target.value as HomeType); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="adu">ADU (Accessory Dwelling Unit)</option>
                <option value="foundation">Tiny Home on Foundation</option>
                <option value="wheeled">THOW (On Wheels)</option>
                <option value="container">Container Home</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Lot Size: {lotSqft.toLocaleString()} sq ft</label>
              <input type="range" min={3000} max={20000} step={500} value={lotSqft} onChange={e => { setLotSqft(+e.target.value); setShowResults(false); }} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Check Feasibility →</button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div style={{ background: rules.color + '22', border: `1px solid ${rules.color}`, borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Legal Status</div><div style={{ color: rules.color, fontSize: 14, fontWeight: 700 }}>{rules.status}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Min Sq Ft</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{rules.minSqft}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Build Cost Est.</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>${buildCost.toLocaleString()}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Utility Connection</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>${totalUtility.toLocaleString()}</div></div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>Home Type:</strong> {typeInfo.desc}</p>
                <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>Permits:</strong> {typeInfo.permittable}</p>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>City Notes:</strong> {rules.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
