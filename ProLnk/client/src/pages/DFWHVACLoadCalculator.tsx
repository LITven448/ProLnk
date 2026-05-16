import { useState } from 'react';

const insulationLevels = ['Poor (pre-1990, minimal insulation)', 'Average (code minimum, R-13 walls)', 'Good (upgraded, R-19+ walls)', 'Excellent (spray foam, R-25+)'];
const windowCoverage = ['Minimal (few windows, mostly north-facing)', 'Average (standard window layout)', 'High (lots of windows, south/west exposure)', 'Very high (floor-to-ceiling, west-facing)'];
const stories = ['1 story', '2 stories', '3+ stories'];

const insulationFactor: Record<string, number> = {
  'Poor (pre-1990, minimal insulation)': 1.25,
  'Average (code minimum, R-13 walls)': 1.1,
  'Good (upgraded, R-19+ walls)': 1.0,
  'Excellent (spray foam, R-25+)': 0.9,
};

const windowFactor: Record<string, number> = {
  'Minimal (few windows, mostly north-facing)': 0.95,
  'Average (standard window layout)': 1.0,
  'High (lots of windows, south/west exposure)': 1.12,
  'Very high (floor-to-ceiling, west-facing)': 1.22,
};

const storyFactor: Record<string, number> = {
  '1 story': 1.0,
  '2 stories': 0.95,
  '3+ stories': 0.92,
};

export default function DFWHVACLoadCalculator() {
  const [sqft, setSqft] = useState('');
  const [story, setStory] = useState('');
  const [insulation, setInsulation] = useState('');
  const [windows, setWindows] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    const sf = parseInt(sqft);
    if (!sf || !story || !insulation || !windows) return null;
    const baseBTU = sf * 25;
    const dfwClimate = 1.15;
    const adjusted = baseBTU * insulationFactor[insulation] * windowFactor[windows] * storyFactor[story] * dfwClimate;
    const tons = adjusted / 12000;
    const minTons = Math.max(1.5, Math.round((tons - 0.25) * 4) / 4);
    const maxTons = Math.round((tons + 0.25) * 4) / 4;
    return { minTons, maxTons, btu: Math.round(adjusted) };
  };

  const result = showResult ? calculate() : null;

  const tooSmall = result ? result.maxTons < (parseInt(sqft) * 25 * 1.15 / 12000 * 0.85) : false;
  const tooLarge = result ? result.minTons > (parseInt(sqft) * 25 * 1.15 / 12000 * 1.15) : false;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>HVAC Load Calculator</h1>
        <p style={{ color: '#94A3B8', marginBottom: 8 }}>In DFW, oversized HVAC systems are a real problem — they cool fast but don't run long enough to dehumidify, leaving your home cold AND muggy. Right-sizing matters.</p>
        <div style={{ background: '#0F2240', borderRadius: 10, padding: '14px 16px', marginBottom: 28, borderLeft: '3px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⚠️ Why This Matters in DFW</div>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>DFW averages 60+ days above 100°F with 60–80% humidity in summer. Oversized units short-cycle — they cool temp fast but leave moisture. Result: 72°F but feels like 80°F. Undersized units run constantly, fail early, and never reach setpoint on hottest days. A proper Manual J load calculation is the only accurate method — this tool gives you an educated estimate to verify your contractor's recommendation.</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>📐 Home Square Footage</div>
          <input type='number' placeholder='e.g. 2400' value={sqft}
            onChange={e => { setSqft(e.target.value); setShowResult(false); }}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>🏠 Stories</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {stories.map(s => (
              <button key={s} onClick={() => { setStory(s); setShowResult(false); }}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: `1.5px solid ${story === s ? '#F5E642' : '#1E3A5F'}`, background: story === s ? '#F5E642' : 'transparent', color: story === s ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>🧱 Insulation Level</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {insulationLevels.map(l => (
              <button key={l} onClick={() => { setInsulation(l); setShowResult(false); }}
                style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${insulation === l ? '#F5E642' : '#1E3A5F'}`, background: insulation === l ? '#F5E642' : 'transparent', color: insulation === l ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>🪟 Window Coverage & Exposure</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {windowCoverage.map(w => (
              <button key={w} onClick={() => { setWindows(w); setShowResult(false); }}
                style={{ padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${windows === w ? '#F5E642' : '#1E3A5F'}`, background: windows === w ? '#F5E642' : 'transparent', color: windows === w ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
                {w}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setShowResult(true)}
          style={{ width: '100%', padding: '14px', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 28 }}>
          Calculate My DFW HVAC Tonnage →
        </button>

        {result && (
          <div>
            <div style={{ background: '#0F2240', borderRadius: 12, padding: '24px', borderLeft: '4px solid #F5E642', marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 18 }}>Your DFW HVAC Estimate</div>
              <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>{result.minTons}–{result.maxTons} tons</div>
              <div style={{ color: '#94A3B8', marginBottom: 16 }}>Estimated load: {result.btu.toLocaleString()} BTU/hr</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>If a contractor recommends significantly more or less than this range without performing a Manual J calculation, ask why. A proper load calc takes 30–60 minutes and accounts for your specific home's characteristics.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#3A0A0A', borderRadius: 10, padding: '14px' }}>
                <div style={{ color: '#F87171', fontWeight: 700, marginBottom: 8 }}>🔴 Oversized HVAC in DFW</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>Short-cycles — 8–12 min runs. Never removes humidity. Cold but clammy feeling. Mold risk in attic and crawl spaces. Compressor wears out faster from constant starts.</div>
              </div>
              <div style={{ background: '#0A2030', borderRadius: 10, padding: '14px' }}>
                <div style={{ color: '#60A5FA', fontWeight: 700, marginBottom: 8 }}>🔵 Undersized HVAC in DFW</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>Runs continuously on 100°F days. Never reaches setpoint in peak summer. High energy bills. System burns out in 8–10 years vs 15–20 for properly sized units.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
