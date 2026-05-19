import { useState } from 'react';

type RefrigerantResult = { status: string; color: string; impact: string[]; options: string[]; techQuestions: string[] };

const refrigerantData: Record<string, RefrigerantResult> = {
  'R22-pre2000': { status: 'End of Life — Act Now', color: '#ef4444', impact: ['R-22 production ended January 1, 2020 — only recycled stock exists', 'Recycled R-22 in DFW costs – per pound due to scarcity', 'A typical DFW system holds 5–15 lbs — leak repair can cost more than a new system', 'Parts availability is declining rapidly for pre-2000 R-22 systems'], options: ['Replace entire system with R-410A or R-454B compliant equipment', 'R-22 to R-407C drop-in substitute available but requires system flush (–)', 'Do not invest in R-22 leak repairs on systems over 15 years old'], techQuestions: ['What is the total R-22 recharge cost versus replacement cost?', 'Is the compressor and evaporator coil still viable for 5+ more years?', 'Can you source a Nordyne or Carrier drop-in refrigerant substitute?'] },
  'R22-2000s': { status: 'Urgent Replacement Priority', color: '#ef4444', impact: ['2000s R-22 systems are 20+ years old — near or past rated lifespan', 'DFW peak cooling demand makes running old R-22 systems extremely costly', 'Efficiency of these systems (8–10 SEER) costs 60% more to operate than new 15 SEER2'], options: ['System replacement is almost always more economical than R-22 repairs', 'New systems qualify for 25C tax credits up to  (,000 for heat pumps)', 'Oncor offers rebates for high-efficiency replacements in DFW'], techQuestions: ['What SEER2 rating will the replacement system carry?', 'Is Oncor rebate pre-approval needed before installation?', 'What refrigerant will the replacement unit use — R-410A or R-454B?'] },
  'R410A-pre2020': { status: 'Current but Transitioning', color: '#f59e0b', impact: ['R-410A is the current standard but being phased out under AIM Act by January 2025', 'New R-410A equipment cannot be manufactured after Jan 1, 2025 (production continues for existing systems)', 'DFW summer demand puts R-410A systems under maximum stress — monitor refrigerant levels annually'], options: ['Continue operating — R-410A equipment can be serviced until refrigerant is depleted from market', 'If replacing, choose R-454B or R-32 next-gen refrigerant system now', 'Improve system efficiency with annual tune-up, coil cleaning, and duct sealing'], techQuestions: ['What is current system refrigerant charge level?', 'Are any leaks detected at evaporator coil or Schrader valves?', 'What is the system’s current SEER2 rating for DFW Zone 3 compliance?'] },
  'R410A-post2020': { status: 'In Service — Plan Ahead', color: '#22c55e', impact: ['Post-2020 R-410A systems are modern and efficient', 'R-410A refrigerant will remain available for servicing existing systems for years', 'DFW heat cycles are within design parameters for these systems'], options: ['No immediate action needed — maintain regular service schedule', 'Plan for eventual transition to R-454B or R-32 when system reaches end of life', 'Optimize performance with annual refrigerant level check and coil cleaning'], techQuestions: ['Is system refrigerant charge verified within manufacturer spec?', 'What is the expected service life remaining on compressor and evaporator coil?', 'What next-gen refrigerant will this system transition to?'] },
  'R454B-any': { status: 'Next-Generation Ready', color: '#22c55e', impact: ['R-454B (Opteon XL41) is the primary next-generation refrigerant for residential AC', 'GWP of 467 vs R-410A’s 2088 — 78% lower climate impact', 'DFW systems using R-454B are ahead of regulatory curve'], options: ['Continue regular service — no transition action needed', 'Ensure technicians are certified for A2L refrigerant handling (mildly flammable)', 'Document refrigerant type for all future service records'], techQuestions: ['Is your technician EPA-certified for A2L refrigerant handling?', 'What are the system’s manufacturer-specified service intervals?', 'Is the system’s refrigerant circuit sealed per A2L safety requirements?'] },
  'R32-any': { status: 'Next-Generation Ready', color: '#22c55e', impact: ['R-32 is widely used in mini-split and ductless systems in DFW', 'GWP of 675 — significantly lower than R-410A', 'Excellent efficiency profile for DFW heat conditions'], options: ['No transition needed — R-32 is future-compliant', 'Verify technician is trained for R-32 A2L handling', 'Annual service maintains efficiency and warranty coverage'], techQuestions: ['Is refrigerant charge verified by weight not pressure?', 'Are A2L safety precautions observed during service?', 'What is the manufacturer’s recommended service interval for this unit?'] },
};

export default function DFWHVACRefrigerantTransitionGuide() {
  const [refrigerant, setRefrigerant] = useState('');
  const [age, setAge] = useState('');
  const key = refrigerant && age ? refrigerant + '-' + age : '';
  const result = key && refrigerantData[key] ? refrigerantData[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>DFW HVAC GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>❄️ HVAC Refrigerant Transition Guide — DFW 2026</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            The refrigerant used in your HVAC system determines your repair costs, system longevity, and options when equipment fails.
            The industry is mid-transition from R-22 to R-410A to next-generation R-454B and R-32. Here is what DFW homeowners need to know right now.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🚫', label: 'R-22', note: 'Phased out', desc: 'No longer produced. Recycled stock only. Very expensive to service.' },
            { icon: '⚠️', label: 'R-410A', note: 'Being phased out', desc: 'No new equipment post-Jan 2025. Can still be serviced on existing units.' },
            { icon: '✅', label: 'R-454B / R-32', note: 'Next generation', desc: 'Lower GWP, future-compliant, A2L classification (mildly flammable — requires certified tech).' },
          ].map((r, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem' }}>{r.icon}</div>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: '1rem', margin: '0.4rem 0 0.1rem' }}>{r.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{r.note}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.5 }}>{r.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔬 Refrigerant Impact Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>System Refrigerant Type</label>
              <select value={refrigerant} onChange={e => { setRefrigerant(e.target.value); setAge(''); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select refrigerant...</option>
                <option value='R22'>R-22 (Freon)</option>
                <option value='R410A'>R-410A (Puron)</option>
                <option value='R454B'>R-454B (Opteon XL41)</option>
                <option value='R32'>R-32</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>System Installation Era</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select era...</option>
                {refrigerant === 'R22′ && <><option value=’pre2000'>Before 2000</option><option value='2000s'>2000–2010</option></>}
                {refrigerant === 'R410A' && <><option value='pre2020'>Before 2020</option><option value='post2020'>2020 or newer</option></>}
                {(refrigerant === 'R454B' || refrigerant === 'R32') && <option value='any'>Any age</option>}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, color: result.color, fontSize: '1rem', marginBottom: '1rem' }}>Status: {result.status}</div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW Impact</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.impact.map((item, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{item}</li>)}</ul>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Options</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.options.map((item, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{item}</li>)}</ul>
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>Ask Your HVAC Tech</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.techQuestions.map((q, i) => <li key={i} style={{ color: '#94a3b8', fontSize: '0.83rem', marginBottom: '0.3rem', fontStyle: 'italic' }}>{q}</li>)}</ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
