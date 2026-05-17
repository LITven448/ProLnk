import { useState } from 'react';

export default function DFWHVACDuctlessVsForced2026() {
  const [scenario, setScenario] = useState('');

  const guides: Record<string, string> = {
    replace: 'Replacing a failed DFW system: If your ducts are in good shape (less than 15 years old, tested at <10% leakage), forced air replacement ($5,000-9,000) makes strong economic sense. If ducts are leaky or in unconditioned attic space (common in DFW), duct losses of 20-30% mean you are paying to cool your attic. In that case, ductless is worth the higher upfront cost ($8,000-15,000 for multi-zone) for long-term savings.',
    addition: 'Adding conditioned space in DFW: Ductless wins almost every time. Extending ductwork to an addition is expensive ($3,000-8,000) and often results in the main system being oversized for the original home while undersized for the addition combined. A dedicated mini-split for the addition ($2,800-5,000 installed) gives independent control, better efficiency, and no impact on the main system.',
    older: 'Older DFW home with original ducts: R-value of 1970s-1980s ductwork is often R-4 or less. DFW attic temps hit 140°F in July — you lose massive BTUs before air reaches the room. A hybrid approach works well: keep the central system but add mini-splits for the worst rooms (master bedroom, home office, bonus room). Budget $2,500-4,500 per mini-split zone.',
    new: 'New DFW construction decision: Forced air with high-efficiency variable-speed air handler and sealed/insulated ducts ($8,000-12,000) is still the most common choice and works well when done right. Ductless multi-zone ($15,000-25,000) offers zoned control and no duct losses but requires more interior wall penetrations. Either way: require Manual J load calculation before sizing — oversized systems in DFW cause humidity problems.',
    hybrid: 'Hybrid forced air + mini-split approach: This is the smart DFW move. Keep your central system for whole-home baseline cooling. Add mini-splits for problem areas: garage, bonus room, master suite. Central system runs less, mini-splits handle peak loads. Total cost: central system service/replacement + 1-3 mini-splits ($3,000-12,000 total add-on). Best of both: even temperatures and lower utility bills.',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 4 }}>🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, marginBottom: 4 }}>DFW Ductless vs Forced Air 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 28 }}>The complete DFW comparison — real costs, real duct losses, real outcomes for North Texas homes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Ductless (Mini-Split)', pros: ['Zoned control', 'No duct losses', 'Efficient in DFW heat'], cons: ['Higher upfront cost', 'Multiple wall units', 'More components to service'] },
            { label: 'Forced Air (Central)', pros: ['Lower equipment cost', 'Whole-home distribution', 'Familiar to contractors'], cons: ['20-30% duct losses typical', 'Single thermostat', 'Attic duct degradation'] },
          ].map(sys => (
            <div key={sys.label} style={{ background: '#112240', borderRadius: 10, padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{sys.label}</div>
              {sys.pros.map(p => <div key={p} style={{ color: '#68d391', fontSize: 13, marginBottom: 4 }}>✓ {p}</div>)}
              {sys.cons.map(c => <div key={c} style={{ color: '#fc8181', fontSize: 13, marginBottom: 4 }}>✗ {c}</div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🌡️ DFW Duct Loss Reality</div>
          <div style={{ color: '#a0aec0', fontSize: 14 }}>DFW attic temps reach 130-145°F in summer. Ducts in unconditioned attics lose 20-30% of conditioned air before it reaches living space. On a $300 July electric bill, that is $60-90 lost to duct leakage alone.</div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Your DFW Situation</h2>
          <select value={scenario} onChange={e => setScenario(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, marginBottom: 16 }}>
            <option value="">Select your situation...</option>
            <option value="replace">Replacing a failed system</option>
            <option value="addition">Adding a home addition</option>
            <option value="older">Older home with original ducts</option>
            <option value="new">New construction decision</option>
            <option value="hybrid">Considering hybrid approach</option>
          </select>
          {scenario && guides[scenario] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '16px', color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>{guides[scenario]}</div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#112240', borderRadius: 10, padding: '16px 20px' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 ProLnk</span>
          <span style={{ color: '#a0aec0', marginLeft: 8 }}>connects DFW homeowners with HVAC pros experienced in both ductless and forced air systems.</span>
        </div>
      </div>
    </div>
  );
}
