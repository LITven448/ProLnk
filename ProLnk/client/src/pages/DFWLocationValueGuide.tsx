import { useState } from 'react';

const LOT_FEATURES: Record<string, { label: string; impact: number; note: string }> = {
  cul_de_sac: { label: '🔵 Cul-de-sac Lot', impact: 4.5, note: 'Reduced traffic, kid-friendly — strong buyer preference in DFW family markets' },
  greenbelt: { label: '🌿 Backing to Greenbelt / Open Space', impact: 5.5, note: 'Unobstructed rear view with no future build risk = premium in every DFW market' },
  lake_view: { label: '💧 Lake / Pond View', impact: 7.0, note: 'Water views in DFW command significant premium, especially in master-planned communities' },
  golf_course: { label: '⛳ Golf Course View / Frontage', impact: 6.0, note: 'Golf course lots carry a 5-10% premium — though declining slightly as golf demographics shift' },
  corner_lot: { label: '📐 Corner Lot', impact: -1.5, note: 'Corner lots in DFW are mixed — more yard but more traffic, less privacy, and neighbor sight lines' },
  highway_close: { label: '🚗 Highway Proximity (< 0.25 mi)', impact: -8.0, note: 'Highway noise and odor discounts are real and persistent — buyers ask for $20K–$50K off in DFW' },
  powerline: { label: '⚡ Backing to Power Lines', impact: -6.5, note: 'Power line easement lots struggle — perception of safety risk and ugly views hurt sale price' },
  commercial_back: { label: '🏪 Backing to Commercial Property', impact: -5.5, note: 'Noise, lighting, and delivery traffic concerns drag values down, especially in newer developments' },
  pie_lot: { label: '🥧 Pie-Shaped Lot (Wide Rear)', impact: 3.0, note: 'More usable backyard space than square footage implies — good value perception in DFW' },
  flood_plain: { label: '🌊 FEMA Flood Zone (100-yr)', impact: -9.5, note: 'Mandatory flood insurance ($1,500–$4,000/yr) and buyer fear combine for steep discounts' },
};

export default function DFWLocationValueGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [homeValue, setHomeValue] = useState('450000');
  const [result, setResult] = useState<{ totalPct: number; totalDollars: number; breakdown: { label: string; impact: number; dollars: number; note: string }[] } | null>(null);

  function toggleFeature(key: string) {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  function calculate() {
    const base = parseInt(homeValue.replace(/,/g, '')) || 450000;
    const breakdown = selected.map(k => {
      const f = LOT_FEATURES[k];
      return { label: f.label, impact: f.impact, dollars: Math.round(base * f.impact / 100), note: f.note };
    });
    const totalPct = parseFloat(breakdown.reduce((sum, b) => sum + b.impact, 0).toFixed(1));
    const totalDollars = breakdown.reduce((sum, b) => sum + b.dollars, 0);
    setResult({ totalPct, totalDollars, breakdown });
  }

  const fmt = (n: number) => (n >= 0 ? '+' : '') + '$' + Math.abs(n).toLocaleString();
  const fmtPct = (n: number) => (n >= 0 ? '+' : '') + n.toFixed(1) + '%';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '52px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>DFW LOCATION VALUE GUIDE</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          What Does Your Lot Location Add — or Cost — in DFW?
        </h1>
        <p style={{ fontSize: 17, color: '#b0bdd4', lineHeight: 1.7, marginBottom: 40 }}>
          Location within a neighborhood matters as much as the neighborhood itself. A cul-de-sac backing to
          greenbelt can command 8–12% over an identical home on a through street backing to commercial.
          Select all features that apply to your lot below.
        </p>

        <div style={{ background: '#12213A', borderRadius: 14, padding: 32, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>📍 Lot Feature Selector</h2>
          <p style={{ fontSize: 13, color: '#8a9fc0', marginBottom: 20 }}>Select all features that apply to your lot. Positive features add value; negative features discount.</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Base Home Value (DFW Average)</label>
            <input type="text" value={homeValue} onChange={e => setHomeValue(e.target.value)}
              style={{ width: 220, padding: '10px 14px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 15 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {Object.entries(LOT_FEATURES).map(([k, v]) => {
              const isSelected = selected.includes(k);
              const isPositive = v.impact >= 0;
              return (
                <button key={k} onClick={() => toggleFeature(k)}
                  style={{
                    textAlign: 'left', padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                    border: isSelected ? '2px solid ' + (isPositive ? '#F5E642′ : '#f87171') : '2px solid #1e3a5f',
                    background: isSelected ? (isPositive ? '#1a2d10′ : '#2d1010') : '#0A1628',
                    color: '#fff', transition: 'all 0.15s',
                  }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{v.label}</div>
                  <div style={{ fontSize: 12, color: isPositive ? '#6af26a' : '#f87171', fontWeight: 700 }}>{fmtPct(v.impact)}</div>
                </button>
              );
            })}
          </div>
          <button onClick={calculate} disabled={selected.length === 0}
            style={{ background: selected.length > 0 ? '#F5E642′ : '#2a4a7f', color: selected.length > 0 ? '#0A1628' : '#8a9fc0', border: ’none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: selected.length > 0 ? 'pointer' : 'default', width: '100%' }}>
            {selected.length === 0 ? 'Select at least one lot feature' : 'Calculate Location Impact'}
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <p style={{ fontSize: 13, color: '#8a9fc0', marginBottom: 4 }}>Total Location Adjustment</p>
                <p style={{ fontSize: 40, fontWeight: 800, color: result.totalDollars >= 0 ? '#6af26a' : '#f87171′ }}>
                  {fmt(result.totalDollars)}
                </p>
                <p style={{ fontSize: 16, color: '#b0bdd4′ }}>{fmtPct(result.totalPct)} vs comparable interior lot</p>
              </div>
              <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: 16 }}>
                {result.breakdown.map((b, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{b.label}</div>
                      <div style={{ fontSize: 12, color: '#8a9fc0', marginTop: 2 }}>{b.note}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: b.dollars >= 0 ? '#6af26a' : '#f87171', whiteSpace: 'nowrap' }}>{fmt(b.dollars)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
