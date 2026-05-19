import { useState } from 'react';

export default function DFWCopperLinesetGuide() {
  const [condition, setCondition] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<null | { urgency: string; include: string; cost: string; detail: string }>(null);

  function evaluate() {
    const y = parseInt(years, 10);
    if (!condition || !y) return;
    let urgency = '', include = '', cost = '', detail = '';
    const isBad = condition === 'cracked' || condition === 'bare';
    if (isBad || y >= 15) {
      urgency = '🔴 Replacement Required';
      include = '✅ Must include in HVAC replacement';
      cost = '$800–$2,200 for lineset replacement (varies by run length and attic routing)';
      detail = 'Degraded insulation in DFW\’s 140°F+ attic conditions causes refrigerant-side heat gain that reduces system efficiency by 10–25%. Cracked or bare copper lines also risk refrigerant leaks. Never put a new system on a failed lineset.';
    } else if (condition === 'stiff' || y >= 10) {
      urgency = '🟡 Evaluate Before Deciding';
      include = '⚠️ Strongly consider including — ask your tech to inspect';
      cost = '$800–$2,000 if replaced during system swap';
      detail = 'DFW attic temperatures routinely exceed 140°F in summer. Foam insulation on copper lines becomes brittle and compresses over time, losing R-value. A stiff lineset is a lineset in decline. Replacing during a system swap adds minimal labor cost.';
    } else {
      urgency = '🟢 Likely Acceptable — Inspect Closely';
      include = 'Optional — verify insulation integrity at both ends and mid-run';
      cost = 'No cost if reused; $800–$1,800 if replaced';
      detail = 'Newer linesets in good visible condition can typically be reused, but ask your installer to inspect the full run. DFW attic heat affects even newer insulation if it was improperly installed or used low-grade foam.';
    }
    setResult({ urgency, include, cost, detail });
  }

  const conditions = [
    { value: 'good', label: '✅ Insulation intact, flexible' },
    { value: 'stiff', label: '🟡 Insulation stiff or compressed' },
    { value: 'cracked', label: '🟠 Insulation cracked or peeling' },
    { value: 'bare', label: '🔴 Copper exposed / bare sections' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Copper Lineset Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          The refrigerant lineset connects your indoor air handler to the outdoor condenser. In DFW, lineset insulation
          degrades faster than almost anywhere — attic temps of 140°F+ bake foam insulation into brittle, useless material.
          Most homeowners don't know their lineset is failing until efficiency tanks.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📋 What Is the Lineset?</h2>
          {[
            ['Two copper pipes', 'A smaller suction line and a larger liquid line run between your indoor evaporator coil and your outdoor condenser, carrying refrigerant in a continuous loop.'],
            ['Foam insulation wrap', 'The suction line runs cold and must be insulated to prevent condensation and heat gain. DFW attic heat destroys foam insulation over time.'],
            ['Why it matters in DFW', 'An uninsulated suction line in a 140°F attic absorbs massive heat before refrigerant reaches the coil — your system works harder, your bill goes up, and the compressor wears faster.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Lineset Replacement Calculator</h2>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Current Insulation Condition</label>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {conditions.map(c => (
              <button key={c.value} onClick={() => setCondition(c.value)}
                style={{ background: condition === c.value ? '#F5E642′ : '#1a2f4a', color: condition === c.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {c.label}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Lineset Age (years, or same as system age)</label>
          <input
            type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="e.g. 12″
            style={{ background: '#1a2f4a', border: '1px solid #2a4060', borderRadius: 8, color: '#fff', padding: '10px 14px', width: '100%', marginBottom: 20, fontSize: 15, boxSizing: 'border-box' }}
          />
          <button onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Evaluate My Lineset →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{result.urgency}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{result.include}</div>
            <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 12 }}>{result.cost}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
          </div>
        )}
      </div>
    </div>
  );
}
