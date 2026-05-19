import { useState } from 'react';

const ZIP_DATA: Record<string, { zone: string; area: string; appreciation: string; forecast: string; color: string }> = {
  '75009': { zone: 'High Growth', area: 'Celina', appreciation: '+45%', forecast: 'Strong — continued growth expected as infrastructure expands', color: '#22c55e' },
  '75409': { zone: 'High Growth', area: 'Anna', appreciation: '+38%', forecast: 'Strong — corporate relocation spillover from Prosper/Celina corridor', color: '#22c55e' },
  '75034': { zone: 'High Growth', area: 'Frisco NW', appreciation: '+28%', forecast: 'Moderate-Strong — newer developments, strong school district demand', color: '#22c55e' },
  '75069': { zone: 'High Growth', area: 'McKinney New Builds', appreciation: '+24%', forecast: 'Moderate — growth corridor with strong employment base', color: '#22c55e' },
  '75126': { zone: 'High Growth', area: 'Forney/Heartland', appreciation: '+31%', forecast: 'Strong — I-20 corridor, affordable entry point driving demand', color: '#22c55e' },
  '75025': { zone: 'Mature Market', area: 'Plano (North)', appreciation: '+10%', forecast: 'Stable — premium prices, plateau reached, steady but not fast', color: '#60a5fa' },
  '75035': { zone: 'Mature Market', area: 'Frisco (East)', appreciation: '+9%', forecast: 'Stable — established neighborhoods, most rapid growth behind it', color: '#60a5fa' },
  '75002': { zone: 'Mature Market', area: 'Allen', appreciation: '+11%', forecast: 'Stable — excellent schools drive consistent demand', color: '#60a5fa' },
  '75150': { zone: 'Watch Zone', area: 'Mesquite', appreciation: '+5%', forecast: 'Slow — stable rental demand but limited appreciation drivers', color: '#f59e0b' },
  '75041': { zone: 'Watch Zone', area: 'Garland', appreciation: '+4%', forecast: 'Slow — established area, limited new development or job growth', color: '#f59e0b' },
};

export default function DFWAppreciationZonesGuide() {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<typeof ZIP_DATA[string] | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    const match = ZIP_DATA[zip.trim()];
    setResult(match || null);
    setSearched(true);
  }

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#60a5fa', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            📈 MARKET INTELLIGENCE
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', color: '#f8fafc' }}>
            DFW Appreciation Zones
          </h1>
          <p style={{ fontSize: 19, color: '#94a3b8', lineHeight: 1.7, maxWidth: 720 }}>
            Where Home Values Are Growing Fastest — 2022–2026 Data
          </p>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.65, maxWidth: 760, marginTop: 12 }}>
            Not all DFW areas appreciate equally. Understanding growth corridors vs. mature markets vs. watch zones is essential for buyers, 
            sellers, and investors making decisions in the current market.
          </p>
        </div>

        {/* High appreciation zones */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🚀 High Appreciation Zones (2022–2026)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { area: 'Celina / Anna / Gunter', pct: '45%+', note: 'Fastest growth in DFW — greenfield development, new schools, I-380 corridor' },
            { area: 'Prosper', pct: '38%', note: 'Premium suburb benefiting directly from corporate relocations to Legacy West area' },
            { area: 'Frisco NW', pct: '28%', note: 'Newer developments, excellent schools, continued commercial investment' },
            { area: 'Allen / McKinney New Builds', pct: '24%', note: 'Growth corridor with strong employment base and highway access' },
            { area: 'Forney / Heartland', pct: '31%', note: 'Affordable I-20 corridor entry point — buyers priced out of Frisco landing here' },
          ].map(z => (
            <div key={z.area} style={{ background: '#1e293b', borderRadius: 12, padding: 24, borderTop: '3px solid #22c55e' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#22c55e', marginBottom: 6 }}>{z.pct}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{z.area}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{z.note}</div>
            </div>
          ))}
        </div>

        {/* Mature markets */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🏡 Mature Markets (8–12% Avg Appreciation)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { area: 'Plano (Established)', pct: '10%', note: 'Stable, premium prices. Rapid growth phase is behind it. Great schools maintain demand.' },
            { area: 'Frisco East', pct: '9%', note: 'Established neighborhoods. Growth plateau reached. Still desirable, slower gains.' },
            { area: 'Allen (Established)', pct: '11%', note: 'Strong school district drives consistent demand. Reliable hold.' },
          ].map(z => (
            <div key={z.area} style={{ background: '#1e293b', borderRadius: 12, padding: 24, borderTop: '3px solid #60a5fa' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#60a5fa', marginBottom: 6 }}>{z.pct}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{z.area}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{z.note}</div>
            </div>
          ))}
        </div>

        {/* Watch zones */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>⚠️ Watch Zones (Slower Growth or Volatility)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { area: 'Inner Dallas (Select Neighborhoods)', pct: 'Mixed', note: 'Volatile — urban dynamics. Some neighborhoods declining, others gentrifying. Research specific block level.' },
            { area: 'Far Southern Suburbs', pct: '3-5%', note: 'Limited job proximity. Longer commutes hurt buyer demand. Harder resale.' },
            { area: 'Mesquite / Garland (Established)', pct: '4-6%', note: 'Stable rental demand. Limited appreciation drivers. Good cash flow, slow equity build.' },
          ].map(z => (
            <div key={z.area} style={{ background: '#1e293b', borderRadius: 12, padding: 24, borderTop: '3px solid #f59e0b' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b', marginBottom: 6 }}>{z.pct}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{z.area}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{z.note}</div>
            </div>
          ))}
        </div>

        {/* Drivers */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 20px' }}>🔑 What Drives Appreciation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🏫', label: 'School District Quality', desc: 'Rated schools add 10-20% premium. Families pay to stay in boundaries.' },
              { icon: '💼', label: 'Job Access', desc: 'Proximity to major employers (Legacy West, Las Colinas, downtown Dallas) drives demand.' },
              { icon: '🛣️', label: 'Infrastructure Investment', desc: 'New highways, toll roads, and light rail = immediate value bump to served areas.' },
              { icon: '🏬', label: 'Commercial Development', desc: 'New retail, HEB, Costco, restaurants signal neighborhood investment and growth.' },
            ].map(d => (
              <div key={d.label} style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{d.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginBottom: 6 }}>{d.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone finder */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>🔍 Appreciation Zone Finder</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 20px' }}>Enter a DFW ZIP code to see its appreciation zone, 4-year average, and forecast.</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input
              value={zip}
              onChange={e => setZip(e.target.value)}
              placeholder="e.g. 75009"
              maxLength={5}
              style={{ flex: 1, padding: '12px 16px', borderRadius: 8, border: '1px solid #334155', background: '#0f172a', color: '#f8fafc', fontSize: 15 }}
            />
            <button
              onClick={handleSearch}
              style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
            >
              Look Up →
            </button>
          </div>
          {searched && result && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 24, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: result.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{result.zone}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc', marginBottom: 4 }}>{result.area}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: result.color, marginBottom: 12 }}>{result.appreciation}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6 }}>4-Year Appreciation (2022–2026)</div>
              <div style={{ marginTop: 16, padding: 16, background: '#1e293b', borderRadius: 8 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Forecast</div>
                <div style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>{result.forecast}</div>
              </div>
            </div>
          )}
          {searched && !result && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748b' }}>
              ZIP code not found in our DFW database. Try a neighboring ZIP or contact us for custom research.
            </div>
          )}
          <p style={{ fontSize: 12, color: '#475569', marginTop: 16 }}>Sample ZIPs to try: 75009, 75034, 75025, 75126, 75150</p>
        </div>

      </div>
    </div>
  );
}
