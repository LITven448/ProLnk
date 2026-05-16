import { useState } from 'react';

const problems = [
  {
    id: 'zone', label: '❌ Zone Won't Run', steps: [
      'Check controller: verify zone is programmed and not in rain delay or off mode',
      'Listen at valve box: click when zone activates? If no click, solenoid may be bad',
      'Test solenoid: disconnect wires and apply 24V with a field controller — click = ok',
      'Check valve: manual bleed screw on solenoid can open valve without controller',
      'Check wire: locate wire break with multimeter continuity test (common cause in DFW clay soil)',
      'Controller output: use a rain sensor bypass if sensor is holding zone off',
    ]
  },
  {
    id: 'head', label: '🚿 Head Not Popping Up', steps: [
      'Low pressure: run only this zone and check — other zones running simultaneously drops pressure',
      'Clogged filter: unscrew riser from body, rinse filter screen under water',
      'Stuck riser: debris in head body — remove head, flush, reinstall',
      'Sunken head: soil has settled — raise head with extension or relocate',
      'Broken riser: if head wobbles or leaks at base, body may be cracked — replace full head',
      'DFW note: bermuda grass can grow over heads quickly in summer — trim and clear',
    ]
  },
  {
    id: 'leak', label: '💦 Wet Spot Between Heads', steps: [
      'Turn off zone and observe: if wet area grows, it's a pressurized leak',
      'Probe with screwdriver along line from valve to heads — soft soil indicates leak path',
      'Dig to pipe: DFW laterals are typically 6–8 inches deep',
      'Inspect joint: most leaks at swing joint (elbow at head) or slip-fit connections',
      'Repair: slip-fix coupler for straight runs, barbed repair coupling for poly pipe',
      'If geyser at head base: head body is cracked — replace head assembly',
    ]
  },
  {
    id: 'controller', label: '🔲 Controller Not Responding', steps: [
      'Check power: verify outlet has power, transformer clicks when plugged in',
      'Reset: many controllers have a reset button or remove backup battery for 30 seconds',
      'Display blank: replace backup battery even if wired — powers display and programs',
      'Programs lost: battery died — re-enter all zone times and schedules',
      'Wifi controller: reconnect to wifi, check app permissions, reinstall if needed',
      'Replace test: borrow a neighbor's controller or use a battery-powered field controller to isolate issue',
    ]
  },
];

export default function DFWIrrigationTroubleShoot2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = problems.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
            DFW Irrigation Troubleshooting Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Solve common DFW irrigation problems before calling a pro. Select your problem for a step-by-step diagnosis guide.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: '0', fontSize: '1.1rem' }}>🧰 DFW Irrigation Diagnostic Quick Checks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['🌧 Rain sensor: small disc on fascia or fence — bypass it to test if holding system off', '⚡ Controller power: listen for transformer hum — dead transformers are common', '💧 Water pressure: DFW target is 45–65 PSI — too low or too high causes head problems', '🕳 Clay soil: DFW black clay causes pipes to shift — re-check lines after dry summers', '🌿 Head height: should sit flush to grade — sunken heads are DFW's #1 complaint', '📡 Wifi controllers: AT&T U-verse and 5GHz-only routers can drop irrigation controllers'].map((item, i) => (
              <div key={i} style={{ background: '#1a3a5c', borderRadius: '8px', padding: '0.75rem', fontSize: '0.9rem', lineHeight: '1.5' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Problem → Diagnosis Guide</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {problems.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ background: selected === p.id ? '#F5E642' : '#1a3a5c', color: selected === p.id ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: '8px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: '0' }}>Diagnosis Steps: {match.label}</h3>
            <ol style={{ margin: '0', paddingLeft: '1.25rem' }}>
              {match.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.6' }}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡</div>
          <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.25rem' }}>Problem beyond a DIY fix?</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with TCEQ-licensed DFW irrigation pros. Free quotes, no obligation.</div>
        </div>
      </div>
    </div>
  );
}