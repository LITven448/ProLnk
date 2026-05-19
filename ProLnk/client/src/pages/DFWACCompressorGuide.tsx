import { useState } from 'react';

const symptoms = ['Warm air blowing', 'Loud grinding/clicking', 'System short cycling', 'Ice on outdoor unit', 'High electric bills'];

export default function DFWACCompressorGuide() {
  const [age, setAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<null | { verdict: string; action: string; cost: string; detail: string }>(null);

  function toggleSymptom(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function assess() {
    const a = parseInt(age, 10);
    const count = selected.length;
    if (!a || count === 0) return;
    let verdict = '', action = '', cost = '', detail = '';
    if (a >= 12 || count >= 3) {
      verdict = '🔴 Full System Replacement Recommended';
      action = 'Replacing only the compressor on an aging DFW system is rarely cost-effective. A new compressor costs $1,500–$2,800 installed, but pairs a new part with old, heat-stressed components.';
      cost = '$5,800–$14,000 for full system replacement';
      detail = 'DFW systems run 3,000–4,000+ hours annually — nearly double national averages. A 12-year-old system has absorbed extreme wear. Replacing the compressor alone typically buys 2–3 years before the next failure.';
    } else if (a >= 8 || count >= 2) {
      verdict = '🟡 Borderline — Get Two Quotes';
      action = 'Have an HVAC tech verify whether the compressor is the only failing component. If refrigerant lines, capacitor, and coils are healthy, compressor-only repair may be viable short-term.';
      cost = 'Repair: $1,500–$2,800 | Replacement: $5,800–$12,000';
      detail = 'DFW heat accelerates refrigerant oil breakdown inside compressors. Even a repaired compressor may fail again within 3–5 years in this climate.';
    } else {
      verdict = '🟢 Repair May Be Viable';
      action = 'If your system is under 8 years old and symptoms are isolated, compressor repair or replacement is likely cost-effective. Confirm warranty status — many compressors carry 5–10 year parts warranties.';
      cost = 'Repair: $1,200–$2,500 installed';
      detail = 'Young DFW systems with single-component failure are good repair candidates. Ask your tech about refrigerant type (R-410A vs R-32) and coil condition before proceeding.';
    }
    setResult({ verdict, action, cost, detail });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW AC Compressor Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          The compressor is the heart of your AC — and the most expensive single component to replace.
          DFW's brutal duty cycle (3,000–4,000+ hours/year) ages compressors faster than almost anywhere in the US.
          Here's what to know before you spend a dime.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚠️ Why DFW Is Hard on Compressors</h2>
          {[
            ['🌡️ Extreme Duty Cycle', 'DFW ACs run May through October almost continuously. That\’s 2x the hours of systems in cooler climates, accelerating oil breakdown and motor wear inside the compressor.'],
            ['☀️ Outdoor Unit Heat Soak', 'Outdoor temperatures regularly hit 100–112°F. Compressors reject heat to ambient air — the hotter it is outside, the harder the compressor works and the shorter its life.'],
            ['💧 Refrigerant Stress', 'High-load conditions increase refrigerant pressure cycles. Over time, this stresses seals and valves inside the compressor scroll or piston assembly.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Compressor Assessment Tool</h2>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>System Age (years)</label>
          <input
            type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 9"
            style={{ background: '#1a2f4a', border: '1px solid #2a4060', borderRadius: 8, color: '#fff', padding: '10px 14px', width: '100%', marginBottom: 20, fontSize: 15, boxSizing: 'border-box' }}
          />
          <div style={{ marginBottom: 8, fontSize: 14, color: '#94a3b8' }}>Symptoms you're experiencing:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {symptoms.map(s => (
              <button key={s} onClick={() => toggleSymptom(s)}
                style={{ background: selected.includes(s) ? '#F5E642' : '#1a2f4a', color: selected.includes(s) ? '#0A1628' : '#fff', border: 'none', borderRadius: 20, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Get Compressor Assessment →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{result.verdict}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Estimated Cost: {result.cost}</div>
            <div style={{ marginBottom: 12, lineHeight: 1.6 }}>{result.action}</div>
            <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
          </div>
        )}
      </div>
    </div>
  );
}
