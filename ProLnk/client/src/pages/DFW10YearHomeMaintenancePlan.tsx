import { useState } from 'react';

const DFW_CLIMATE_MULTIPLIER = 1.15;

const YEAR_BANDS = [
  {
    label: 'Years 1–3: Learn Your Home',
    color: '#1E3A5F',
    items: [
      { task: 'HVAC tune-up (critical in DFW heat)', cost: 200 },
      { task: 'Roof inspection post-spring storms', cost: 350 },
      { task: 'Foundation moisture perimeter check', cost: 150 },
      { task: 'Water heater flush & anode check', cost: 100 },
      { task: 'Weatherstripping & caulking', cost: 300 },
    ],
  },
  {
    label: 'Years 4–7: Systems Watch',
    color: '#0D2B4E',
    items: [
      { task: 'HVAC system replacement (15-yr avg in DFW heat)', cost: 8500 },
      { task: 'Roof replacement if 15–20 yrs old', cost: 14000 },
      { task: 'Water heater replacement', cost: 1400 },
      { task: 'Exterior repaint (DFW sun fades fast)', cost: 4500 },
      { task: 'Foundation pier evaluation', cost: 800 },
    ],
  },
  {
    label: 'Years 8–10: Major Renewal',
    color: '#061A35',
    items: [
      { task: 'Kitchen appliance replacement', cost: 6000 },
      { task: 'Master bath refresh', cost: 12000 },
      { task: 'Driveway reseal or replacement', cost: 3500 },
      { task: 'Electrical panel audit', cost: 500 },
      { task: 'Tree trimming & root barrier', cost: 1200 },
    ],
  },
];

const SIZE_FACTORS: Record<string, number> = {
  small: 0.8,
  medium: 1.0,
  large: 1.3,
  xlarge: 1.6,
};

export default function DFW10YearHomeMaintenancePlan() {
  const [purchaseYear, setPurchaseYear] = useState(2024);
  const [homeAge, setHomeAge] = useState(10);
  const [homeSize, setHomeSize] = useState('medium');
  const [showForecast, setShowForecast] = useState(false);

  const sizeFactor = SIZE_FACTORS[homeSize] || 1.0;

  const forecast = Array.from({ length: 10 }, (_, i) => {
    const calYear = purchaseYear + i;
    const ageAtYear = homeAge + i;
    const band = i < 3 ? YEAR_BANDS[0] : i < 7 ? YEAR_BANDS[1] : YEAR_BANDS[2];
    const base = band.items.reduce((s, it) => s + it.cost, 0) / band.items.length;
    const adjusted = Math.round(base * sizeFactor * DFW_CLIMATE_MULTIPLIER);
    return { calYear, ageAtYear, adjusted, band: band.label };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' }}>🏠 10-Year Home Maintenance Plan</h1>
          <p style={{ color: '#8FA3BF', marginTop: 4 }}>DFW climate-adjusted timelines, budgets, and system replacement guides for Dallas-Fort Worth homeowners.</p>
        </div>

        {YEAR_BANDS.map(band => (
          <div key={band.label} style={{ background: band.color, border: '1px solid #1E3A5F', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>{band.label}</h2>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {band.items.map(item => (
                <div key={item.task} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.6rem 1rem' }}>
                  <span style={{ fontSize: 14 }}>{item.task}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', marginLeft: 12 }}>${item.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: '#0D2238', border: '1px solid #F5E642', borderRadius: 10, padding: '1.5rem', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>📊 10-Year Expense Forecast Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Home Purchase Year
              <input type="number" value={purchaseYear} min={2010} max={2030}
                onChange={e => setPurchaseYear(Number(e.target.value))}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Home Age at Purchase (yrs)
              <input type="number" value={homeAge} min={0} max={80}
                onChange={e => setHomeAge(Number(e.target.value))}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF' }}>
              Home Size
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="small">Under 1,500 sqft</option>
                <option value="medium">1,500–2,500 sqft</option>
                <option value="large">2,500–4,000 sqft</option>
                <option value="xlarge">4,000+ sqft</option>
              </select>
            </label>
          </div>
          <button onClick={() => setShowForecast(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Generate Forecast →
          </button>

          {showForecast && (
            <div style={{ marginTop: '1.25rem', display: 'grid', gap: '0.5rem' }}>
              {forecast.map(f => (
                <div key={f.calYear} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.6rem 1rem', gap: '1rem' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{f.calYear}</span>
                  <span style={{ fontSize: 13, color: '#8FA3BF' }}>Home age {f.ageAtYear} · {f.band}</span>
                  <span style={{ textAlign: 'right', fontWeight: 700 }}>${f.adjusted.toLocaleString()}</span>
                </div>
              ))}
              <div style={{ textAlign: 'right', marginTop: 8, color: '#F5E642', fontWeight: 700, fontSize: 15 }}>
                10-Year Total: ${forecast.reduce((s, f) => s + f.adjusted, 0).toLocaleString()}
              </div>
            </div>
          )}
        </div>

        <p style={{ color: '#8FA3BF', fontSize: 12, marginTop: '1.5rem', textAlign: 'center' }}>
          DFW climate multiplier (+15%) applied for extreme heat, hail, clay soil, and storm frequency. Estimates for planning purposes only.
        </p>
      </div>
    </div>
  );
}
