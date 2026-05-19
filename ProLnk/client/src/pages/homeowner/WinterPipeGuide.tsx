import { useState } from 'react';

const pipeRisks = [
  { pipe: 'Outdoor hose bibs', risk: 'Extreme', action: 'Always drip or shut off and drain' },
  { pipe: 'Pipes in unheated garage', risk: 'High', action: 'Insulate + drip when <28°F' },
  { pipe: 'Pipes in exterior walls', risk: 'High', action: 'Open cabinet doors to let warm air in' },
  { pipe: 'Pipes in crawl space', risk: 'Medium', action: 'Insulate with foam pipe sleeves' },
  { pipe: 'Interior pipes', risk: 'Low', action: 'Keep heat above 55°F if leaving town' },
];

const thawSteps = [
  { icon: '🔍', title: 'Locate frozen pipe', desc: 'Look near exterior walls, under sinks against exterior walls, or in unheated areas.' },
  { icon: '🚰', title: 'Open the faucet', desc: 'Open both hot and cold handles. Running water helps melt ice as it thaws.' },
  { icon: '🔥', title: 'Apply gentle heat', desc: 'Use a hair dryer or heating pad — never open flame. Work from faucet toward frozen section.' },
  { icon: '✅', title: 'Restore pressure slowly', desc: 'Water flow returning means thawing worked. Check for leaks as pressure returns.' },
  { icon: '📞', title: 'Call if no flow in 30 min', desc: 'Stop DIY. A plumber can locate and thaw safely without pipe damage.' },
];

const insulationTypes = [
  { type: 'None', label: 'No insulation', riskMultiplier: 3 },
  { type: 'Partial', label: 'Some foam wrap', riskMultiplier: 2 },
  { type: 'Full', label: 'Fully insulated', riskMultiplier: 1 },
];

export default function WinterPipeGuide() {
  const [homeSqft, setHomeSqft] = useState(2000);
  const [insulation, setInsulation] = useState('Partial');
  const [homeAge, setHomeAge] = useState(1990);

  const insulationType = insulationTypes.find(i => i.type === insulation) || insulationTypes[1];
  const ageFactor = homeAge < 1975 ? 3 : homeAge < 2000 ? 2 : 1;
  const sqftFactor = homeSqft > 3000 ? 3 : homeSqft > 1500 ? 2 : 1;
  const riskScore = insulationType.riskMultiplier * ageFactor * sqftFactor;
  const riskLevel = riskScore >= 9 ? 'High' : riskScore >= 4 ? 'Moderate' : 'Low';
  const riskColor = riskLevel === 'High' ? '#ef4444' : riskLevel === 'Moderate' ? '#f59e0b' : '#22c55e';

  const prepSteps =
    riskLevel === 'High'
      ? ['Install pipe insulation on all exterior-adjacent pipes', 'Know location of main water shutoff', 'Drip all faucets on exterior walls when <28°F', 'Consider whole-home pipe heating tape', 'Pre-save a plumber’s number']
      : riskLevel === 'Moderate'
      ? ['Insulate exposed pipes in garage/crawl space', 'Open cabinet doors under sinks during freezes', 'Drip exterior faucets when sustained <28°F', 'Keep heat at 55°F+ when away']
      : ['Know your shutoff location', 'Disconnect hose bibs before first freeze', 'Keep interior temp above 55°F'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧊</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Pipe Freeze Prevention Guide
          </h1>
          <p style={{ color: '#94a3b8' }}>The February 2021 freeze cost Texas homeowners $4.5B in pipe damage. Don't get caught again.</p>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>📅</span>
          <div>
            <strong>Winter Storm Uri Lesson:</strong> DFW homes weren't built for sustained sub-20°F temps. Most damage happened to pipes in exterior walls, garages, and attics. Prep every October — not when the freeze is 48 hours away.
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
            💧 Pipe Risk by Location
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pipeRisks.map(p => (
              <div key={p.pipe} style={{ background: '#0A1628', borderRadius: 8, padding: '0.875rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{p.pipe}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{p.action}</div>
                </div>
                <span style={{
                  background: p.risk === 'Extreme' ? '#ef4444' : p.risk === 'High' ? '#f59e0b' : p.risk === 'Medium' ? '#3b82f6' : '#22c55e',
                  color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap',
                }}>{p.risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            💧 Drip Rate: Gallons vs. Freeze Prevention
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
            A dripping faucet uses ~1 gallon/hour. At $0.004/gallon (DFW avg), a 48-hour freeze event costs ~$0.38 per faucet.
            A burst pipe repair averages $1,200–$4,000. The math is easy.
          </p>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#22c55e' }}>$0.38</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Cost to drip 48 hrs</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ef4444' }}>$2,800</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Avg burst pipe repair</div>
            </div>
            <div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642' }}>7,368x</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Return on dripping</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
            🏠 Your Freeze Risk Assessment
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Home Size (sq ft)</label>
              <input type="number" value={homeSqft} onChange={e => setHomeSqft(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.5rem', color: '#fff', marginTop: 4, fontSize: '1rem' }} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Year Built</label>
              <input type="number" value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.5rem', color: '#fff', marginTop: 4, fontSize: '1rem' }} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pipe Insulation</label>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: 4, flexWrap: 'wrap' }}>
                {insulationTypes.map(i => (
                  <button key={i.type} onClick={() => setInsulation(i.type)}
                    style={{ background: insulation === i.type ? '#F5E642' : '#1e3a5f', color: insulation === i.type ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.4rem 0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
                    {i.type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: riskColor }}>{riskLevel} Risk</div>
            <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.25rem' }}>Based on size, age, and insulation level</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#F5E642' }}>Recommended Prep Steps:</div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {prepSteps.map(s => <li key={s} style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{s}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
            🔥 Thawing Frozen Pipes Safely
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {thawSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', background: '#0A1628', borderRadius: 8, padding: '0.875rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{step.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔧</div>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>Need a DFW Plumber Before Winter?</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>ProLnk connects you with vetted local plumbers. Get 3 quotes — free, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            Get Free Plumbing Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
