import { useState } from 'react';

const questions = [
  { q: 'How many amps is your electrical service?', a: '100-amp service was standard until the 1980s. Most DFW homes built after 1990 have 200-amp service. EV chargers, hot tubs, and large AC units often require 200A minimum. Find this on your main breaker label.' },
  { q: 'When was your panel last inspected?', a: 'The National Electrical Code recommends inspection every 10 years, or after major storms. DFW has frequent lightning and surge events. An inspection costs $150–$400 and can prevent house fires.' },
  { q: 'Do you have GFCI outlets in wet areas?', a: 'GFCI (Ground Fault Circuit Interrupter) outlets are required by code in kitchens, bathrooms, garages, and outdoors. They have TEST and RESET buttons. Press TEST monthly — it should trip. If not, replace it.' },
  { q: 'What brand is your electrical panel?', a: 'Federal Pacific (Stab-Lok) and Zinsco panels have known safety defects and should be replaced immediately. Common safe brands in DFW: Square D, Eaton, Siemens, Leviton. Look inside your breaker box.' },
  { q: 'Do you have aluminum wiring?', a: 'Homes built from 1965–1973 may have aluminum branch circuit wiring, which expands/contracts more than copper and causes loose connections and fire risk. Look for silver-colored wire or the label "AL" on outlets and switches.' },
  { q: 'Do you have arc-fault circuit interrupters (AFCIs)?', a: 'AFCIs detect dangerous arcing that can cause fires inside walls — required in new DFW construction since 2014 for bedrooms. Look for "AFCI" on your breaker. Older homes should retrofit these, especially in bedrooms.' },
  { q: 'Do you have a whole-home surge protector?', a: 'DFW averages 60+ lightning days per year — one of the highest in the US. A whole-home surge protector ($150–$400 installed) protects all appliances and electronics from voltage spikes. Point-of-use strips alone are insufficient.' },
  { q: 'Do you know how to safely reset a tripped breaker?', a: 'A tripped breaker sits in the middle position. First, unplug devices on that circuit. Then push the breaker fully OFF, then firmly ON. If it trips again immediately, call an electrician — do not keep resetting it.' },
  { q: 'Do you have outdoor outlets rated for exterior use?', a: 'Outdoor outlets must be GFCI protected and in weatherproof covers rated "In Use" (covers that seal even with a plug inserted). Standard indoor covers outdoors are a code violation and fire/shock hazard.' },
  { q: 'What is your panel\’s rated amperage vs. actual load?', a: 'Calculate your load: add up your major appliances (AC, dryer, range, water heater) and compare to your service rating. If you\’re running a 200A service at 170+ amps consistently, consider a service upgrade before adding EV chargers.' },
  { q: 'Do you have double-tapped breakers?', a: 'A "double-tap" is when two wires connect to a single breaker pole not rated for it. This is a common DFW code violation found in older homes. It causes overheating. Visible when you open the panel door.' },
  { q: 'Do you know where your main disconnect is?', a: 'Your main disconnect (usually the large breaker at the top of your panel) shuts off all power to the home. During flooding, fire, or electrical emergency, locate and trip this immediately.' },
  { q: 'Do you have smoke detectors on every level and in every bedroom?', a: 'Texas code requires smoke detectors in each bedroom, outside each sleeping area, and on each level. Combination smoke/CO detectors are recommended. Test monthly; replace batteries annually or get 10-year sealed units.' },
  { q: 'Is your electrical panel accessible and unobstructed?', a: 'OSHA and NEC require 36 inches of clear space in front of electrical panels. Storing items in front is a code violation and a fire/emergency hazard. Panels must not be in closets used for storage.' },
  { q: 'Do you have a generator interlock or transfer switch?', a: 'Connecting a portable generator to your home without a transfer switch can backfeed the grid, electrocuting utility workers. DFW\’s ice storm history (2021) makes generator prep essential. Interlocks cost $150–$600 installed.' },
];

export default function DFWElectricalQuestionsGuide() {
  const [open, setOpen] = useState<number | null>(null);
  const [checked, setChecked] = useState<boolean[]>(Array(questions.length).fill(false));

  const toggle = (i: number) => setOpen(open === i ? null : i);
  const check = (i: number) => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const score = checked.filter(Boolean).length;
  const level = score >= 12 ? { label: '⚡ Expert', color: '#16a34a' } : score >= 8 ? { label: '👍 Competent', color: '#ca8a04′ } : { label: '📚 Learning', color: '#dc2626' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Electrical Knowledge Guide</h1>
          <p style={{ color: '#8899aa', fontSize: 15 }}>15 electrical questions every DFW homeowner should know for safety and savings</p>
          <div style={{ marginTop: 12, background: '#1a2a40', borderRadius: 8, padding: '10px 24px', display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{score}</span>
            <span style={{ color: '#8899aa', fontSize: 14 }}> / {questions.length} — </span>
            <span style={{ color: level.color, fontWeight: 700 }}>{level.label}</span>
          </div>
          {score >= 5 && score < 15 && (
            <div style={{ marginTop: 10, background: '#1a2a40', borderRadius: 8, padding: '8px 16px', display: 'inline-block', marginLeft: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 4, height: 8, width: 200, overflow: 'hidden' }}>
                <div style={{ width: `${(score / 15) * 100}%`, height: '100%', background: '#F5E642', transition: 'width 0.3s' }} />
              </div>
            </div>
          )}
        </div>
        {questions.map((item, i) => (
          <div key={i} style={{ background: '#111f35', borderRadius: 10, marginBottom: 10, border: checked[i] ? '1.5px solid #F5E642′ : '1.5px solid #1e3050' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', cursor: 'pointer', gap: 12 }} onClick={() => toggle(i)}>
              <span onClick={e => { e.stopPropagation(); check(i); }} style={{ fontSize: 20, cursor: 'pointer' }}>{checked[i] ? '✅' : '⬜'}</span>
              <span style={{ flex: 1, fontWeight: 600, fontSize: 15 }}>{i + 1}. {item.q}</span>
              <span style={{ color: '#F5E642', fontSize: 18 }}>{open === i ? '▲' : '▼'}</span>
            </div>
            {open === i && <div style={{ padding: '0 16px 16px 52px', color: '#aabbcc', fontSize: 14, lineHeight: 1.7 }}>{item.a}</div>}
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 28, color: '#8899aa', fontSize: 13 }}>Powered by <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's trusted home services marketplace</div>
      </div>
    </div>
  );
}
