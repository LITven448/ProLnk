import { useState } from 'react';

type Rec = { label: string; cost: string; note?: string };

const fenceRecs: Record<string, Record<string, Rec[]>> = {
  privacy: {
    security: [
      { label: 'Add coyote rollers along top (DFW wildlife + intruder deterrent)', cost: '$200–$600', note: 'Dual purpose: keeps coyotes out, makes climbing harder' },
      { label: 'Security camera at fence corners aimed along fence line', cost: '$60–$150 each' },
      { label: 'Motion sensor lights on fence perimeter', cost: '$80–$200′ },
      { label: 'Trim interior shrubs — privacy fence hides activity from neighbors', cost: '$0–$200′ },
    ],
    wildlife: [
      { label: 'Coyote rollers (stops coyotes AND intruders)', cost: '$200–$600′ },
      { label: 'Extend fence 2 inches outward with PVC extender', cost: '$50–$150′ },
      { label: 'Motion alert camera to notify of intrusions', cost: '$60–$150′ },
    ],
    both: [
      { label: 'Coyote rollers along full perimeter', cost: '$200–$600′ },
      { label: 'Corner cameras covering full fence line', cost: '$120–$300 total' },
      { label: 'Smart gate lock with keypad + auto-lock', cost: '$80–$250′ },
      { label: 'Motion lights on 4-corner posts', cost: '$80–$200′ },
    ],
  },
  chain: {
    security: [
      { label: 'Privacy slats (removes see-through visibility into yard)', cost: '$100–$400′ },
      { label: 'Barbed wire topper (commercial zones only — check HOA)', cost: '$50–$200′ },
      { label: 'Camera coverage at gate (chain link gates often unsecured)', cost: '$60–$150′ },
      { label: 'Heavy-duty padlock on gate (Grade 1 or disc lock)', cost: '$20–$60′ },
    ],
    wildlife: [
      { label: 'Bottom tension wire — closes ground gap (coyote entry point)', cost: '$50–$150′ },
      { label: 'Coyote rollers on top rail', cost: '$200–$500′ },
    ],
    both: [
      { label: 'Privacy slats + bottom tension wire', cost: '$150–$550′ },
      { label: 'Coyote rollers on top rail', cost: '$200–$500′ },
      { label: 'Padlock + chain at gate', cost: '$20–$80′ },
    ],
  },
  wood: {
    security: [
      { label: 'Reinforce gate hinges (standard wood gate hinges fail)', cost: '$30–$80′ },
      { label: 'Gate lock upgrade — hasp + padlock or keypad', cost: '$30–$150′ },
      { label: 'Camera at gate (wood fences have poor sight lines from home)', cost: '$60–$150′ },
      { label: 'Inspect for rot at base — structural failure = easy breach', cost: '$0 (DIY inspection)' },
    ],
    wildlife: [
      { label: 'Hardware cloth at base (blocks wildlife ground entry)', cost: '$50–$150′ },
      { label: 'Coyote rollers on top rail', cost: '$200–$600′ },
    ],
    both: [
      { label: 'Coyote rollers + hardware cloth at base', cost: '$250–$750′ },
      { label: 'Reinforced gate with keypad lock', cost: '$80–$250′ },
      { label: 'Camera at each gate', cost: '$60–$150 each' },
    ],
  },
};

export default function DFWFenceSecurityGuide() {
  const [fenceType, setFenceType] = useState('');
  const [securityGoal, setSecurityGoal] = useState('');
  const [result, setResult] = useState<Rec[] | null>(null);

  function assess() {
    const typeGroup = fenceRecs[fenceType] || fenceRecs.wood;
    const recs = typeGroup[securityGoal] || typeGroup.security;
    setResult(recs);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40 }}>🦝</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, margin: '0.5rem 0′ }}>DFW Fence Security Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '1.5rem' }}>
          Fencing is a double-edged security tool in DFW. Privacy fences deter casual theft but can hide intruders
          from neighbors. DFW also has active coyote populations in Frisco, McKinney, Allen, and Southlake — coyote
          rollers address both threats simultaneously.
        </p>

        <div style={{ background: '#0D2A0D', border: '1px solid #2D7A2D', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span>🐺</span>
            <strong style={{ color: '#4CAF82′ }}>DFW Coyote Alert</strong>
          </div>
          <p style={{ color: '#9BA8BB', fontSize: 14, margin: 0 }}>
            DFW urban coyotes can scale a 6-foot privacy fence. Coyote rollers spin when an animal (or person)
            grabs the top, preventing them from pulling themselves over. They install on any fence type and cost
            $4–6 per linear foot. HOA-friendly and highly effective.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🔒', title: 'Gate Locks', desc: 'Keypad + auto-close gate locks run $80–$250 and eliminate the #1 fence vulnerability' },
            { icon: '📹', title: 'Fence Cameras', desc: 'Corner-mounted cameras cover the full fence line and catch approach from any direction' },
            { icon: '💡', title: 'Perimeter Lights', desc: 'Solar motion lights on fence posts cost $20–$40 each and require no wiring' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: '0.25rem' }}>{c.title}</div>
              <div style={{ color: '#9BA8BB', fontSize: 12 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🔍 Get Recommendations</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>Fence Type</label>
              <select value={fenceType} onChange={e => setFenceType(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select</option>
                <option value="privacy">Privacy (wood/vinyl 6ft+)</option>
                <option value="chain">Chain link</option>
                <option value="wood">Wood picket / decorative</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>Primary Security Goal</label>
              <select value={securityGoal} onChange={e => setSecurityGoal(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select</option>
                <option value="security">Burglary deterrence</option>
                <option value="wildlife">Coyote / wildlife containment</option>
                <option value="both">Both</option>
              </select>
            </div>
            <button onClick={assess} disabled={!fenceType || !securityGoal}
              style={{ padding: '0.75rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Get Recommendations
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🛡️ Your Fence Improvement Plan</h2>
            {result.map((r, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ color: '#E8EDF5', flex: 1 }}>{r.label}</div>
                  <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{r.cost}</span>
                </div>
                {r.note && <div style={{ color: '#9BA8BB', fontSize: 12, marginTop: 4 }}>💡 {r.note}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
