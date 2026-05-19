import { useState } from 'react';

const grassTypes = [
  {
    name: 'Bermuda',
    icon: '☀️',
    heat: 5, drought: 5, shade: 1, traffic: 5, maintenance: 'High',
    season: 'Spring–early summer',
    costPerSqFt: '$0.35–0.60',
    notes: 'Most popular in DFW. Goes dormant (brown) in winter. Ideal for full-sun lawns and high-traffic areas.',
    firstYear: 'Water daily for 3 weeks. Mow at 1–1.5″ once established.',
  },
  {
    name: 'St. Augustine',
    icon: '🌿',
    heat: 4, drought: 3, shade: 4, traffic: 3, maintenance: 'Medium',
    season: 'Late spring',
    costPerSqFt: '$0.45–0.75',
    notes: 'Best shade tolerance of all warm-season grasses. Thick blades, lush appearance. Susceptible to chinch bugs.',
    firstYear: 'Keep moist for 2–3 weeks. Watch for patches — may need fungicide in humid summers.',
  },
  {
    name: 'Zoysia',
    icon: '🏌️',
    heat: 4, drought: 4, shade: 3, traffic: 4, maintenance: 'Low',
    season: 'Spring',
    costPerSqFt: '$0.55–0.90',
    notes: 'Dense, carpet-like texture. Slow-growing but chokes out weeds once established. Premium price, premium result.',
    firstYear: 'Slow to establish (8–12 weeks). Patience pays off — minimal weeding after year 1.',
  },
  {
    name: 'Buffalo Grass',
    icon: '🦬',
    heat: 5, drought: 5, shade: 1, traffic: 2, maintenance: 'Very Low',
    season: 'Spring',
    costPerSqFt: '$0.30–0.55',
    notes: 'Native to North Texas prairies. Extremely drought-tolerant. Thinner appearance, best for naturalistic landscapes.',
    firstYear: 'Minimal irrigation needed after week 3. Nearly maintenance-free in year 2+.',
  },
];

const installationSteps = [
  { step: 'Soil prep', detail: 'Till 4–6 inches, remove old turf/weeds, add compost to DFW clay' },
  { step: 'Grade for drainage', detail: 'Slope away from house — critical for DFW flash rains' },
  { step: 'Soil test (optional)', detail: 'DFW soils often need pH adjustment (target 6.0–7.0)' },
  { step: 'Lay sod same day', detail: 'Order delivery for installation day — sod dies fast in DFW heat' },
  { step: 'Stagger seams', detail: 'Brick-pattern layout prevents erosion channels' },
  { step: 'Roll after installation', detail: 'Ensures good soil contact for rooting' },
  { step: 'Water immediately', detail: 'Sod can dry out in 30 minutes in 100°F DFW summer' },
];

export default function DFWSodInstallationGuide() {
  const [sqft, setSqft] = useState(2500);
  const [grassType, setGrassType] = useState('Bermuda');

  const selected = grassTypes.find(g => g.name === grassType) || grassTypes[0];
  const [minCost, maxCost] = selected.costPerSqFt.replace('$', '').split('–').map(Number);
  const installMin = sqft * (minCost + 0.25);
  const installMax = sqft * (maxCost + 0.55);
  const firstYearCareMin = 200;
  const firstYearCareMax = 600;
  const totalMin = installMin + firstYearCareMin;
  const totalMax = installMax + firstYearCareMax;

  const renderStars = (n: number) => '⭐'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
            DFW Sod Installation Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>
            Choose the right grass for North Texas climate — Bermuda, St. Augustine, Zoysia, and Buffalo
          </p>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>📅 Best Time to Install Sod in DFW</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 0 }}>
            Late March through May is ideal — soil is warm enough for rooting, temps haven't hit extreme heat yet. 
            Installing in July or August risks sod death if you miss even one watering during the critical first 2 weeks.
            Fall installation (Sept–Oct) works well for Bermuda and Zoysia. Avoid planting during DFW winter — warm-season grasses won't root.
          </p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>🌱 Grass Type Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
            {grassTypes.map((g, i) => (
              <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, border: grassType === g.name ? '2px solid #F5E642′ : '2px solid transparent', cursor: ’pointer', transition: 'all 0.2s' }}
                onClick={() => setGrassType(g.name)}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{g.icon}</div>
                <h3 style={{ color: grassType === g.name ? '#F5E642′ : '#E8EDF5', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{g.name}</h3>
                <div style={{ display: 'grid', gap: 6, marginBottom: 12 }}>
                  {[['Heat', g.heat], ['Drought', g.drought], ['Shade', g.shade], ['Traffic', g.traffic]].map(([label, val]) => (
                    <div key={String(label)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: '#64748B' }}>{label}</span>
                      <span style={{ fontSize: 11 }}>{renderStars(Number(val))}</span>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Cost: <strong style={{ color: '#4ADE80′ }}>{g.costPerSqFt}/sqft</strong></div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>Maint: <strong style={{ color: '#F5E642' }}>{g.maintenance}</strong></div>
              </div>
            ))}
          </div>
        </div>

        {grassType && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 20 }}>{selected.icon} {selected.name} — DFW Details</h2>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 12 }}>{selected.notes}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>First-year care tip:</div>
              <div style={{ color: '#E8EDF5′ }}>{selected.firstYear}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 20 }}>⚒️ Installation Process</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {installationSteps.map((s, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{s.step}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 20 }}>🧮 Cost Calculator</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 8, fontSize: 14 }}>Yard Size (sq ft): <strong style={{ color: '#F5E642′ }}>{sqft.toLocaleString()}</strong></label>
            <input type="range" min={500} max={15000} step={250} value={sqft}
              onChange={e => setSqft(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#94A3B8', marginBottom: 10, fontSize: 14 }}>Grass Type</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {grassTypes.map(g => (
                <button key={g.name} onClick={() => setGrassType(g.name)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                    background: grassType === g.name ? '#F5E642′ : '#0A1628',
                    color: grassType === g.name ? '#0A1628′ : '#94A3B8' }}>
                  {g.icon} {g.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
            {[
              { label: 'Sod + Install', value: `$${installMin.toFixed(0)}–$${installMax.toFixed(0)}`, color: '#60A5FA' },
              { label: 'First-Year Care', value: `$${firstYearCareMin}–$${firstYearCareMax}`, color: '#F5E642′ },
              { label: 'Total Budget', value: `$${totalMin.toFixed(0)}–$${totalMax.toFixed(0)}`, color: '#4ADE80′ },
            ].map((stat, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Sod Installation Quotes in DFW</h3>
          <p style={{ color: '#1E3A5F', marginBottom: 16 }}>Connect with local landscapers who know DFW soil and grass</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
