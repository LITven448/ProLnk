import { useState } from 'react';

type TestResult = { testSteps: string[]; readings: { value: string; meaning: string }[]; safety: string[]; dfwNote: string };

const testMap: Record<string, TestResult> = {
  'dead-outlet': {
    testSteps: [
      'Set multimeter to AC Voltage — 200V range (or AUTO)',
      'Insert RED probe into small slot (hot/live), BLACK into large slot (neutral)',
      'Read voltage — should show 110-120V in a working DFW outlet',
      'If 0V: check if GFCI outlet upstream has tripped (reset it first)',
      'If still 0V: check breaker panel for tripped breaker',
      'If breaker looks OK but not 0V: use a wiggle test — bad connection in the outlet itself',
    ],
    readings: [
      { value: '110-120V', meaning: 'Normal — outlet is live. Problem is your device, not the outlet.' },
      { value: '50-90V', meaning: 'Partial power — likely loose connection at outlet or in junction box. Call electrician.' },
      { value: '0V', meaning: 'No power — tripped GFCI, tripped breaker, or open circuit. Check those first.' },
    ],
    safety: ['Never touch probe metal tips together while both inserted', 'One hand in pocket while testing (prevents current path through chest)', 'Don\’t test with wet hands — DFW summer sweating counts as wet'],
    dfwNote: 'DFW summer AC load causes breaker and GFCI trips more than any other season. Most "dead outlets" in DFW are just tripped GFCIs in bathroom, kitchen, or garage that protect multiple outlets.',
  },
  'gfci-test': {
    testSteps: [
      'Find GFCI outlet (has TEST and RESET buttons) — usually in bathroom, kitchen, garage',
      'Set multimeter to AC Voltage 200V range',
      'Test outlet before pressing TEST: should read 120V',
      'Press TEST button: multimeter should drop to 0V (GFCI tripped correctly)',
      'Press RESET: multimeter should return to 120V',
      'If GFCI doesn\’t trip or won\’t reset: GFCI outlet is failed and needs replacement ($15-25)',
    ],
    readings: [
      { value: '120V → 0V on TEST', meaning: 'GFCI is working correctly — protects you from ground faults.' },
      { value: '120V → 120V on TEST', meaning: 'GFCI is failed — will not protect you. Replace immediately.' },
      { value: '0V before test', meaning: 'GFCI already tripped or upstream power issue.' },
    ],
    safety: ['DFW GFCI outlets have shorter lifespan due to heat cycling — test every 6 months', 'Outdoors and pool-adjacent GFCIs degrade faster in DFW UV and heat', 'If GFCI is hot to the touch: cut power and call electrician immediately'],
    dfwNote: 'DFW code requires GFCI protection in bathrooms, kitchens within 6 feet of sink, garages, outdoors, and near pools. DFW heat degrades GFCI internals — they fail silently, showing power but no protection. Test frequency matters.',
  },
  'breaker-find': {
    testSteps: [
      'Plug a lamp or phone charger (with indicator light) into the outlet you want to identify',
      'Set multimeter to AC Voltage at the outlet to confirm it\’s live (120V)',
      'Go to breaker panel — flip breakers one at a time to OFF',
      'After each flip, check multimeter or lamp: when it reads 0V / goes dark, you found the breaker',
      'Label the breaker with permanent marker before turning back ON',
      'Pro method: use a non-contact voltage tester ($20) — faster than multimeter for this task',
    ],
    readings: [
      { value: '120V at outlet', meaning: 'Breaker is ON and feeding this outlet.' },
      { value: '0V at outlet', meaning: 'Breaker controlling this outlet is now OFF — label it.' },
    ],
    safety: ['DFW panel heat: panels in garages or on exterior walls run hot in summer — let panel cool before extended work inside it', 'Old Federal Pacific and Zinsco panels are common in 1970-1990 DFW homes — they\’re fire hazards, do not rely on breakers as protection', 'Never flip main breaker without warning family — DFW summer AC loss in 100°F+ weather is a safety issue'],
    dfwNote: 'DFW homes built 1970-1990 frequently have Federal Pacific Stab-Lok or Zinsco panels. These breakers don\’t trip reliably. If your panel brand is either of these, use this exercise to map circuits but prioritize panel replacement. Many DFW home inspectors flag these.',
  },
  'voltage-check': {
    testSteps: [
      'Set multimeter to AC Voltage — 600V range for service panel testing',
      'For standard outlets: 200V range',
      'Test hot-to-neutral: should read 120V (single phase) or 240V (240V circuits like AC unit, dryer)',
      'Test hot-to-ground: should match hot-to-neutral within 5V',
      'Test neutral-to-ground: should read 0-3V maximum',
      'High neutral-to-ground voltage (5V+) indicates a wiring problem — call electrician',
    ],
    readings: [
      { value: '114-126V (hot-neutral)', meaning: 'Normal range for DFW residential. Within ANSI standard.' },
      { value: '105-113V', meaning: 'Low voltage — can damage motors, AC compressors. Call Oncor (DFW utility).' },
      { value: '127-135V', meaning: 'High voltage — can burn out electronics. Call Oncor immediately.' },
      { value: '5V+ (neutral-ground)', meaning: 'Wiring fault or overloaded neutral. Electrician required.' },
    ],
    safety: ['NEVER probe inside a breaker panel if you don\’t know what you\’re doing — 240V service is lethal', 'DFW summer: HVAC units pulling heavy load can cause momentary voltage sags — test at different times of day', 'If you see burn marks, smell burning, or hear buzzing: don\’t test, call electrician or fire department'],
    dfwNote: 'Oncor (DFW\’s electric utility) maintains voltage within ±5% of 120V. If you measure consistently low (under 110V) or high (over 127V), call Oncor\’s voltage complaint line — it\’s free and they\’ll send a tech. DFW summer peak demand (July-August 2-6pm) causes the most voltage issues.',
  },
};

export default function DFWMultimeterGuide() {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);

  function calculate() {
    if (!problem) return;
    setResult(testMap[problem] || null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Multimeter Guide</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Test outlets, check voltage, and find circuit breakers safely. DFW-specific electrical facts included.
        </p>

        <div style={{ backgroundColor: '#1a0a0a', borderRadius: 12, padding: 16, marginBottom: 24, borderLeft: '4px solid #FF6B6B' }}>
          <div style={{ fontWeight: 700, color: '#FF6B6B', marginBottom: 8 }}>⚡ ELECTRICAL SAFETY — READ FIRST</div>
          <div style={{ color: '#FFD0D0', fontSize: 13, lineHeight: 1.6 }}>
            120V household current can kill. Never work inside a breaker panel without proper training. This guide covers safe outlet-level testing only. One hand in pocket while testing. Never touch probe tips together while both are in a live outlet. If you smell burning or see arcing: stop and call an electrician.
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 What Multimeter Should DFW Homeowners Own?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'Klein MM300 or Fluke 107: $25-50, covers all homeowner needs',
              'AUTO-ranging saves time — no need to guess voltage range',
              'Non-contact voltage tester ($15-20) is safer for quick checks',
              'Get a tester with CAT III rating minimum for DFW residential work',
            ].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, fontSize: 13, color: '#CBD5E1', borderLeft: '3px solid #F5E642′ }}>
                {f}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 What Are You Testing?</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Electrical Problem</label>
            <select value={problem} onChange={e => setProblem(e.target.value)}
              style={{ width: '100%', backgroundColor: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '12px 14px', fontSize: 14 }}>
              <option value="">Select your problem...</option>
              <option value="dead-outlet">Outlet has no power / device won't work</option>
              <option value="gfci-test">Testing if a GFCI outlet actually works</option>
              <option value="breaker-find">Finding which breaker controls which outlet</option>
              <option value="voltage-check">Checking voltage / suspecting power quality issue</option>
            </select>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Test Steps →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📋 Test Steps</h3>
            {result.testSteps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{s}</span>
              </div>
            ))}

            <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12, marginTop: 20 }}>📊 Reading Meanings</h3>
            {result.readings.map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 8, display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{r.value}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13 }}>{r.meaning}</div>
              </div>
            ))}

            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginTop: 16, borderLeft: '3px solid #4FC3F7′ }}>
              <div style={{ color: '#4FC3F7', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>🏙️ DFW-SPECIFIC NOTE</div>
              <div style={{ color: '#CBD5E1', fontSize: 13 }}>{result.dfwNote}</div>
            </div>

            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 8, padding: 14, marginTop: 12, borderLeft: '3px solid #FF6B6B' }}>
              <div style={{ color: '#FF6B6B', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>⚡ SAFETY REMINDERS</div>
              {result.safety.map((s, i) => (
                <div key={i} style={{ color: '#FFD0D0', fontSize: 13, marginBottom: 6 }}>• {s}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
