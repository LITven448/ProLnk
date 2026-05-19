import { useState } from 'react';

const roomSizes = [
  { label: 'Small room (up to 75 sq ft)', fanSize: '29″–36″', examples: 'Bathrooms, small bedrooms' },
  { label: 'Medium room (76–144 sq ft)', fanSize: '36″–48″', examples: 'Bedrooms, offices' },
  { label: 'Large room (145–225 sq ft)', fanSize: '50″–56″', examples: 'Living rooms, master bedrooms' },
  { label: 'Great room (226–400 sq ft)', fanSize: '60″–72″', examples: 'Open living/dining, great rooms' },
  { label: 'Covered patio/outdoor', fanSize: '52″–60″ (outdoor rated)', examples: 'Texas patios, pergolas' },
];

const fanCategories = [
  { type: 'Standard Indoor', brands: 'Hunter, Harbor Breeze, Westinghouse', priceRange: '$60–$180', install: '$80–$150', note: 'Best for bedrooms and living rooms. No light kit needed separately.' },
  { type: 'Smart Fan', brands: 'Big Ass Fans Haiku, Minka-Aire, Hunter Signal', priceRange: '$200–$600', install: '$100–$180', note: 'App + voice control, auto-speed adjustment via thermostat, ideal for DFW schedules.' },
  { type: 'Outdoor Wet-Rated', brands: 'Hunter Cassius, Minka-Aire Bolo, Hunter Weathermax', priceRange: '$150–$400', install: '$120–$200', note: 'Wet-rated required for DFW patios. Texas humidity and rain demand true wet-rated, not damp-rated.' },
  { type: 'DC Motor (Quiet)', brands: 'Monte Carlo, Emerson CF788, Minka-Aire Concept', priceRange: '$180–$450', install: '$100–$160', note: 'Whisper-quiet for bedrooms. DC motors use 70% less energy than AC motors.' },
];

function getFanRecommendation(rooms: number, hasPatio: boolean) {
  const indoorCost = rooms * 130;
  const installCost = rooms * 120;
  const patioFanCost = hasPatio ? 300 : 0;
  const patioInstall = hasPatio ? 160 : 0;
  const totalCost = indoorCost + installCost + patioFanCost + patioInstall;

  const acSavings = (rooms * 35) + (hasPatio ? 20 : 0);

  const fans: string[] = [];
  if (rooms >= 1) fans.push(`${rooms} indoor fan(s) — 52" recommended for standard DFW bedrooms`);
  if (hasPatio) fans.push('1 outdoor wet-rated fan for patio — 52″–60″, wet-rated required');
  if (rooms >= 3) fans.push('Consider smart fans for living areas to auto-adjust with thermostat');

  return { totalCost, acSavings, fans, fanCount: rooms + (hasPatio ? 1 : 0) };
}

export default function DFWCeilingFanGuide() {
  const [roomCount, setRoomCount] = useState(2);
  const [hasPatio, setHasPatio] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof getFanRecommendation> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌀</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Ceiling Fan Guide
          </h1>
        </div>
        <p style={{ color: '#8A9AB5', fontSize: 16, marginBottom: 40 }}>
          In DFW's extreme heat, ceiling fans let you raise the thermostat 4°F without discomfort — saving 10–15% on AC bills.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>☀️ Why Ceiling Fans Matter More in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ color: '#8A9AB5', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                DFW experiences 60–80 days above 100°F annually, and summer nights rarely cool below 80°F. 
                A ceiling fan creates a wind-chill effect, making 80°F feel like 75°F. This means you can 
                set your thermostat higher while maintaining comfort — directly reducing AC runtime and energy bills.
              </p>
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { stat: '4°F', label: 'Thermostat raise possible with fan' },
                { stat: '~$35/yr', label: 'AC savings per room with fan' },
                { stat: '$10–$20/yr', label: 'Fan electricity cost per year' },
                { stat: '10–15%', label: 'Overall cooling cost reduction' },
              ].map(s => (
                <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', border: '1px solid #1E2D4A', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, minWidth: 60 }}>{s.stat}</span>
                  <span style={{ color: '#8A9AB5', fontSize: 13 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📐 Fan Sizing by Room</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {roomSizes.map(r => (
              <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12, padding: '12px 16px', background: '#0A1628', borderRadius: 8, border: '1px solid #1E2D4A', alignItems: 'center' }}>
                <span style={{ color: '#E8EDF5', fontSize: 14 }}>{r.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{r.fanSize}</span>
                <span style={{ color: '#8A9AB5', fontSize: 12 }}>{r.examples}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>🔄 Seasonal Direction: Critical in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 14 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>☀️</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Summer: Counter-Clockwise</div>
              <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                When looking up at the fan, blades should rotate counter-clockwise. This pushes air 
                straight down, creating a cooling breeze. In DFW, run fans from March through October.
              </p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>❄️</div>
              <div style={{ color: '#4ECDC4', fontWeight: 700, marginBottom: 6 }}>Winter: Clockwise (Low Speed)</div>
              <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Clockwise at low speed draws air up and pushes warm air near the ceiling down along walls. 
                In DFW's mild winters, this can reduce heating costs by 5–10%.
              </p>
            </div>
          </div>
          <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, border: '1px solid #1E2D4A' }}>
            <span style={{ color: '#FFB347', fontWeight: 600, fontSize: 13 }}>⚠️ Fan only works when room is occupied — turn it off when you leave. Fans cool people, not rooms.</span>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 40, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🛒 Fan Types for DFW Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {fanCategories.map(f => (
              <div key={f.type} style={{ background: '#0A1628', borderRadius: 10, padding: 18, border: '1px solid #1E2D4A' }}>
                <div style={{ fontWeight: 700, color: '#E8EDF5', fontSize: 15, marginBottom: 6 }}>{f.type}</div>
                <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 8 }}>{f.brands}</div>
                <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
                  <div><span style={{ color: '#8A9AB5', fontSize: 12 }}>Fan: </span><span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.priceRange}</span></div>
                  <div><span style={{ color: '#8A9AB5', fontSize: 12 }}>Install: </span><span style={{ color: '#4ECDC4', fontWeight: 600, fontSize: 13 }}>{f.install}</span></div>
                </div>
                <div style={{ color: '#8A9AB5', fontSize: 12, lineHeight: 1.5 }}>{f.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🧮 Fan Installation Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 8 }}>
                Number of Indoor Rooms: <span style={{ color: '#F5E642', fontWeight: 700 }}>{roomCount}</span>
              </label>
              <input type="range" min={1} max={8} value={roomCount} onChange={e => setRoomCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8A9AB5', fontSize: 11, marginTop: 4 }}>
                <span>1 room</span><span>8 rooms</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <input type="checkbox" id="patio" checked={hasPatio} onChange={e => setHasPatio(e.target.checked)}
                style={{ width: 20, height: 20, accentColor: '#F5E642', cursor: 'pointer' }} />
              <label htmlFor="patio" style={{ color: '#E8EDF5', fontSize: 15, cursor: 'pointer' }}>
                Include covered patio/outdoor fan<br />
                <span style={{ color: '#8A9AB5', fontSize: 12 }}>Wet-rated, Texas patio-ready</span>
              </label>
            </div>
          </div>
          <button onClick={() => setResult(getFanRecommendation(roomCount, hasPatio))}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Get Recommendations + Cost →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E2D4A' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8A9AB5', fontSize: 12 }}>Total Fans</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 28 }}>{result.fanCount}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8A9AB5', fontSize: 12 }}>Estimated Total Cost</div>
                  <div style={{ color: '#4ECDC4', fontWeight: 800, fontSize: 24 }}>${result.totalCost.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#8A9AB5', fontSize: 12 }}>Annual AC Savings</div>
                  <div style={{ color: '#E8EDF5', fontWeight: 800, fontSize: 24 }}>${result.acSavings}/yr</div>
                </div>
              </div>
              {result.fans.map((f, i) => (
                <div key={i} style={{ color: '#8A9AB5', fontSize: 13, padding: '6px 0', borderTop: i > 0 ? '1px solid #1E2D4A' : 'none' }}>
                  → {f}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#8A9AB5', fontSize: 13 }}>Find licensed DFW electricians for ceiling fan installation on ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
