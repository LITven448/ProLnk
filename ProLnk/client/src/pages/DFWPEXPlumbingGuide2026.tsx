import { useState } from 'react';

export default function DFWPEXPlumbingGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'freeze', label: '❄️ Protecting against DFW freeze events' },
    { id: 'repipe', label: '🔧 Replacing old copper or PB pipes' },
    { id: 'addition', label: '🏗️ Adding a bathroom or kitchen' },
    { id: 'hotside', label: '🔥 Hot water line replacement' },
    { id: 'well', label: '💧 Well water or higher chlorine levels' },
  ];

  const advice: Record<string, string> = {
    freeze: '✅ PEX is ideal for DFW freeze protection. It expands when frozen and returns to shape — copper splits. Use PEX-A (most flexible) for any exterior-adjacent runs. Insulate regardless.',
    repipe: '✅ PEX is the standard DFW repipe material in 2026. PEX-A with expansion fittings (ProPEX) is most reliable. PEX-B with crimp rings is cheaper but slightly less freeze-resistant. Full repipe cost: $4,000–$9,000.',
    addition: '✅ PEX is easiest to add — fish flexible tubing through walls without soldering. Use a manifold system (home run) for best pressure balance. Compatible with all DFW municipal water supplies.',
    hotside: '🟡 For hot water lines, PEX-A or CPVC are both fine in DFW. CPVC handles temps to 200°F (PEX rated to 180°F). If water heater is set >140°F, CPVC may be preferred near the heater connection.',
    well: '🟡 PEX handles chlorine well but check UV exposure risk for any outdoor sections (PEX degrades in direct sunlight — must be sleeved). For aggressive well water chemistry, consult a plumber before selecting grade.',
  };

  const assess = () => {
    setResult(situation && advice[situation] ? advice[situation] : 'Select a situation to get guidance.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🔵 DFW PEX Plumbing Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>PEX has become the dominant residential pipe material in DFW — but not all PEX is the same. Here's what matters for North Texas homes.</p>

        {[
          { icon: '🧬', title: 'PEX-A vs PEX-B vs PEX-C', body: 'PEX-A (Uponor/Rehau): most flexible, best freeze resistance, expandable fittings — highest quality. PEX-B (most common): slightly stiffer, crimp or clamp fittings, lower cost. PEX-C (least common): electron beam crosslinked, used less in residential. In DFW, PEX-A is recommended for freeze-prone areas.' },
          { icon: '❄️', title: 'PEX and DFW Freeze Events', body: 'After Winter Storm Uri (Feb 2021), DFW builders shifted heavily to PEX. Unlike copper, PEX expands when frozen and usually recovers without splitting. Not freeze-proof — insulate pipes in unconditioned spaces — but far more forgiving than copper or CPVC.' },
          { icon: '💧', title: 'DFW Hard Water + PEX', body: 'DFW water at 300+ ppm hardness slowly deposits scale inside all pipe types. PEX does not corrode from hard water, but flow can reduce over decades in high-hardness zones. A water softener extends fixture and appliance life more than pipe life.' },
          { icon: '🌡️', title: 'PEX vs CPVC for Hot Side', body: 'Both are code-approved in most DFW jurisdictions. CPVC handles slightly higher temps and is preferred by some plumbers near water heaters. PEX is easier to route through walls. Most DFW repipes use PEX throughout — it’s the practical standard in 2026.' },
          { icon: '⚠️', title: 'PEX Limitations in DFW', body: 'Cannot be used outdoors unsleeved (UV degrades PEX within months). Not rated for DFW hot water recirculation loops at high temps. Cannot be glued — requires mechanical connections (crimp, clamp, or expansion). Do not use near rodenticides (certain chemicals can permeate PEX).' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#132035', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon} <strong>{c.title}</strong></div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}

        <div style={{ background: '#132035', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🛠️ PEX Suitability Guide</h2>
          <p style={{ color: '#94A3B8', marginBottom: 16 }}>What's your plumbing situation?</p>
          {situations.map(s => (
            <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
              <input type="radio" name="situation" value={s.id} checked={situation === s.id} onChange={() => setSituation(s.id)} style={{ width: 18, height: 18 }} />
              <span style={{ color: '#CBD5E1' }}>{s.label}</span>
            </label>
          ))}
          <button onClick={assess} style={{ marginTop: 12, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}>
            Get Guidance
          </button>
          {result && <div style={{ marginTop: 16, padding: '16px', background: '#0A1628', borderRadius: 8, color: '#F5E642', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}