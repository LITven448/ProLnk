import { useState } from 'react';

export default function DFWBackflowPreventionGuide2026() {
  const [useType, setUseType] = useState('');
  const [result, setResult] = useState('');

  const check = () => {
    if (!useType) { setResult('Please select your water use type.'); return; }
    const requirements: Record<string, string> = {
      irrigation: '🚨 REQUIRED: Irrigation systems in virtually all DFW cities (Dallas, Plano, Frisco, McKinney, etc.) require annual backflow preventer inspection by a TCEQ-licensed tester. Cost: $50–100/yr. Fine for non-compliance: $500–2,000 + service disconnect.',
      pool: '⚠️ REQUIRED: Pool fill lines require backflow protection. Most DFW cities require inspection at installation. Check with your city water utility for annual requirements.',
      commercial: '🚨 REQUIRED: All commercial properties in DFW must have annual backflow testing. TCEQ-licensed tester required. Failed test = 30-day cure or disconnect.',
      residential: '✅ LOW RISK: Standard residential potable water typically does not require annual testing unless you have irrigation, pool, or other cross-connection hazards.',
    };
    setResult(requirements[useType] || 'Please select a valid water use type.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '0.4rem 1rem', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem' }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🛡️ DFW Backflow Prevention Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Backflow contaminates your drinking water supply. DFW cities strictly enforce annual inspections — especially for irrigation systems. Know your requirements.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔄', title: 'What Is Backflow?', desc: 'Reverse water flow from irrigation, pool, or industrial systems back into the public supply. Can introduce pesticides, fertilizer, or bacteria.' },
            { icon: '📋', title: 'TCEQ Tester Required', desc: 'Texas requires backflow inspections to be performed by a licensed TCEQ backflow tester. DIY inspections are not accepted.' },
            { icon: '💵', title: 'Annual Cost: $50–100', desc: 'Inspection cost is minimal. Skipping costs $500–2,000 in fines plus potential service disconnection by your DFW city utility.' },
            { icon: '📅', title: 'Inspection Timing', desc: 'Most DFW cities require annual inspection. Many mail reminders. Check with Dallas Water Utilities or your municipal water provider.' }
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2035', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>✅ Backflow Requirement Checker</h2>
          <label style={{ display: 'block', marginBottom: '0.6rem', color: '#94a3b8', fontSize: '0.88rem' }}>Select Your Primary Water Use</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
            {[
              { id: 'irrigation', label: '🌱 Irrigation / Sprinkler System' },
              { id: 'pool', label: '🏊 Swimming Pool or Hot Tub' },
              { id: 'commercial', label: '🏢 Commercial Property' },
              { id: 'residential', label: '🏠 Residential Only (no irrigation)' },
            ].map(opt => (
              <button key={opt.id} onClick={() => setUseType(opt.id)} style={{ padding: '0.8rem 1rem', borderRadius: '8px', border: '2px solid', borderColor: useType === opt.id ? '#F5E642' : '#1e3a5f', background: useType === opt.id ? '#1a2f4a' : '#0A1628', color: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>{opt.label}</button>
            ))}
          </div>
          <button onClick={check} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Check My Requirements →</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '10px', padding: '1.2rem', color: '#0A1628' }}>
          <strong>💡 DFW Pro Tip:</strong> If you received a notice from your DFW water utility, you have 30–60 days to complete inspection before disconnection. Schedule a TCEQ-licensed tester immediately.
        </div>
      </div>
    </div>
  );
}
