import { useState } from 'react';

const GAP_LOCATIONS = [
  { id: 'door_bottom', label: 'Door Bottom (exterior doors)' },
  { id: 'door_sides', label: 'Door Sides and Top' },
  { id: 'window_tracks', label: 'Window Tracks / Sash' },
  { id: 'sliding_door', label: 'Sliding Glass Door' },
  { id: 'attic_hatch', label: 'Attic Hatch' },
  { id: 'garage_door', label: 'Garage Door Bottom' },
];

const HOME_SIZES = [
  { label: 'Under 1,500 sq ft', doors: 2, windows: 6 },
  { label: '1,500-2,500 sq ft', doors: 3, windows: 10 },
  { label: '2,500-4,000 sq ft', doors: 4, windows: 14 },
  { label: '4,000+ sq ft', doors: 6, windows: 20 },
];

const WEATHERSTRIP_TYPES: Record<string, { type: string; product: string; install: string; lifespan: string }> = {
  door_bottom: { type: 'Door sweep (rubber + aluminum)', product: 'Pemko 018CR or M-D 43981', install: 'Screw to door bottom -- DFW heat warps wood doors; check gap seasonally', lifespan: '2-3 years in DFW heat' },
  door_sides: { type: 'Foam tape with V-strip backer', product: 'Duck Brand Self-Stick Foam or Frost King V25', install: 'Cut to length; stick inside door stop channel -- DFW heat causes foam compression faster', lifespan: '2-3 years' },
  window_tracks: { type: 'Pile weatherstrip (brush seal)', product: 'Pemko 270D or equivalent pile strip', install: 'Press into track channel -- compatible with DFW vinyl window expansion', lifespan: '3-5 years' },
  sliding_door: { type: 'Pile strip + foam block for corners', product: 'Frost King WS22H + foam corner kit', install: 'Replace pile in track; foam blocks corners -- DFW slab movement shifts door frames', lifespan: '2-3 years' },
  attic_hatch: { type: 'Adhesive foam tape (1 inch thick)', product: 'Frost King EPDM Foam 1x1 roll', install: 'Apply to hatch frame perimeter -- attic heat pushes up 150 F air; sealing saves significantly', lifespan: '5+ years (protected location)' },
  garage_door: { type: 'Rubber threshold seal + T-seal bottom', product: 'Garadry 3/4 inch height seal kit', install: 'Stick threshold to floor; T-seal attaches to door -- DFW storms drive rain under gaps', lifespan: '3-4 years' },
};

function getEstimate(locationIds: string[], homeSizeIdx: number) {
  const size = HOME_SIZES[homeSizeIdx];
  const hasWindowTrack = locationIds.includes('window_tracks');
  const hasDoorBottom = locationIds.includes('door_bottom');
  const doorCount = locationIds.filter(id => ['door_bottom', 'door_sides', 'sliding_door'].includes(id)).length;

  const linearFt = (hasDoorBottom ? size.doors * 3 : 0) + (hasWindowTrack ? size.windows * 4 : 0) + doorCount * 14;
  const cost = locationIds.length * 18 + linearFt * 0.4;
  const hours = locationIds.length * 0.75 + 0.5;
  const annualSavings = Math.round(size.doors * 12 + (hasWindowTrack ? size.windows * 8 : 0));
  return { cost: Math.round(cost), hours: hours.toFixed(1), annualSavings, linearFt };
}

export default function DFWDIYWeatherstrippingGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sizeIdx, setSizeIdx] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const ready = selected.length > 0 && sizeIdx >= 0;
  const est = ready ? getEstimate(selected, sizeIdx) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{'wind'}</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>DFW DIY Weatherstripping Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>DFW heat warps weatherstripping every 2-3 years -- the right type by location cuts cooling costs and keeps storms out.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>DFW Weatherstripping Lifespan Warning</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Standard foam weatherstripping rated for 5+ years in mild climates lasts only 2-3 years in DFW. UV and 110 F heat causes foam to compress permanently, rubber to crack, and pile strips to mat flat. Check every fall before heating season -- press a dollar bill in each closed door; if it slides out easily, the seal is gone.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>Where DFW Homes Lose the Most Air</h2>
          {[
            ['Door bottoms (biggest loss)', '30-40% of air leakage in DFW homes -- DFW slab movement creates uneven gaps over time'],
            ['Window tracks', '20-25% -- vinyl windows expand in DFW heat; pile weatherstrip compresses or gaps appear at corners'],
            ['Door sides/tops', '15-20% -- wood door frames expand and gap seasonally with DFW humidity swings'],
            ['Attic hatch', '10-15% -- direct path for 150 F attic air; most overlooked gap in DFW homes'],
            ['Garage door', '5-10% -- especially in DFW storms; wind-driven rain gets under doors with worn seals'],
          ].map(([loc, impact]) => (
            <div key={loc} style={{ display: 'flex', gap: 12, marginBottom: 10, padding: '10px 14px', background: '#0A1628', borderRadius: 8 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 200, fontSize: 14 }}>{loc}</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{impact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>DFW-Specific Installation Tips</h2>
          {[
            ['Install in the morning', 'DFW heat makes adhesive weatherstripping fail in afternoon -- bond is strongest applied at 70-80 F'],
            ['Clean with alcohol first', 'DFW dust and pollen coat door frames; adhesive won\’t bond to dirty surfaces'],
            ['Account for slab movement', 'DFW clay soil shifts slabs -- install adjustable door sweeps so you can re-set as doors drop over time'],
            ['Skip cheap foam tape', 'Big box store generic foam tape compresses flat in one DFW summer -- spend more on EPDM rubber or pile strip'],
          ].map(([tip, detail]) => (
            <div key={tip} style={{ marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{tip}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, margin: '0 0 20px' }}>Weatherstrip Type and Cost Estimator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select gap locations and home size for product recommendations and savings estimate:</p>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Gap Locations to Fix</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {GAP_LOCATIONS.map(loc => (
                <button key={loc.id} onClick={() => toggle(loc.id)} style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid', borderColor: selected.includes(loc.id) ? '#F5E642′ : '#334155', background: selected.includes(loc.id) ? '#F5E64215' : ’transparent', color: selected.includes(loc.id) ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Home Size</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {HOME_SIZES.map((s, i) => (
                <button key={s.label} onClick={() => setSizeIdx(i)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: sizeIdx === i ? '#F5E642′ : '#334155', background: sizeIdx === i ? '#F5E64215' : ’transparent', color: sizeIdx === i ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!ready} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: !ready ? 0.4 : 1 }}>
            Get My Plan
          </button>

          {showResults && est && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  ['Material cost', '$' + est.cost],
                  ['Time', est.hours + ' hrs'],
                  ['Annual savings', '$' + est.annualSavings],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={{ color: '#cbd5e1', fontWeight: 700, marginBottom: 12 }}>Product Recommendations by Location:</div>
              {selected.map(id => {
                const info = WEATHERSTRIP_TYPES[id as keyof typeof WEATHERSTRIP_TYPES];
                const loc = GAP_LOCATIONS.find(l => l.id === id);
                return (
                  <div key={id} style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{loc?.label}</div>
                    <div style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Type: <span style={{ color: '#F5E642′ }}>{info.type}</span></div>
                    <div style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>Product: {info.product}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Install: {info.install}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>DFW lifespan: {info.lifespan}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
