import { useState } from 'react';

const products = {
  low: [
    { name: 'Amdro Fire Ant Bait (broadcast)', usage: 'Scatter over entire yard at label rate. Works in 1–2 weeks.', safety: 'Pet-safe once dry (~1 hr). Keep kids off until dry.' },
    { name: 'Ortho Orthene (individual mounds)', usage: 'Dust directly on mound. Do not disturb before treating.', safety: 'Odorous — apply when adults/pets are inside. Avoid rain for 24 hrs.' },
  ],
  moderate: [
    { name: 'Amdro broadcast + Ortho Orthene combo (Two-Step)', usage: 'Broadcast bait first, treat individual mounds 3 days later. Most effective DFW method.', safety: 'Keep pets off treated areas until watered in and dry.' },
    { name: 'Extinguish Plus (IGR + bait)', usage: 'Contains insect growth regulator — sterilizes queen. Slower but longer-lasting colony kill.', safety: 'Very low toxicity. Safe for pets after application.' },
  ],
  high: [
    { name: 'Professional broadcast + liquid drench', usage: 'Pro applies granular bait to full yard + drenches each mound with liquid insecticide. Most complete treatment.', safety: 'Area re-entry time per label — typically 2–4 hours.' },
    { name: 'HOA-coordinated community treatment', usage: 'Most effective in suburban DFW — re-invasion from neighbors eliminated when entire neighborhood treats simultaneously.', safety: 'Coordinated with HOA; professional application.' },
  ],
};

export default function DFWFireAntGuide() {
  const [yardSize, setYardSize] = useState('medium');
  const [severity, setSeverity] = useState('moderate');
  const [showPlan, setShowPlan] = useState(false);

  const getCost = () => {
    const base = yardSize === 'small' ? 80 : yardSize === 'medium' ? 140 : 220;
    const mult = severity === 'low' ? 1 : severity === 'moderate' ? 1.5 : 2.2;
    return Math.round(base * mult);
  };

  const recs = products[severity as keyof typeof products];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🐜</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Fire Ant Treatment Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            Texas fire ants (<em>Solenopsis invicta</em>) are <strong style={{ color: '#F5E642′ }}>aggressive year-round in DFW</strong> due to mild winters. Unlike northern states, you get no seasonal break. Colonies can contain 250,000+ workers and multiple queens, making elimination without the right approach nearly impossible.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>⚡ The Two-Step Method (Texas A&M Recommended)</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { step: '1', title: 'Broadcast Bait', desc: 'Scatter fire ant bait granules over entire yard. Workers carry bait back to queen. Reduces 80–90% of colony activity in 2 weeks.' },
              { step: '2', title: 'Individual Mound Treatment', desc: 'Treat remaining active mounds 3 days after broadcast. Use liquid drench, dust, or granules directly on each mound.' },
            ].map(s => (
              <div key={s.step} style={{ flex: '1 1 300px', backgroundColor: '#1a2d4a', borderRadius: 10, padding: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{s.step}</div>
                <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🔄 When Treatments Fail: Re-Invasion</h2>
          <div style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16, borderLeft: '4px solid #f59e0b' }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              Fire ants treated in your yard will re-invade from neighboring properties within <strong style={{ color: '#e2e8f0′ }}>30–60 days</strong>. This is the #1 reason DFW homeowners feel treatment "didn’t work." Solutions: (1) re-apply bait every 6 months, (2) coordinate with neighbors, (3) talk to your HOA about community-wide treatment programs. Some DFW HOAs fund quarterly community treatments — check yours.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🐾 Pet & Child Safety</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { icon: '✅', text: 'Bait products (Amdro, Extinguish) are low-toxicity — safe once watered in' },
              { icon: '⚠️', text: 'Liquid drenches require 2–4 hr re-entry time minimum' },
              { icon: '🐕', text: 'Dogs dig mounds — check yard before outdoor play' },
              { icon: '👶', text: 'Keep children away from visible mounds even post-treatment for 48 hrs' },
            ].map(item => (
              <div key={item.text} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 12, display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🎯 Treatment Plan Calculator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Yard Size</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['small', 'Small (<5,000 sq ft)'], ['medium', 'Medium (5–10K sq ft)'], ['large', 'Large (10K+ sq ft)']].map(([v, l]) => (
                <button key={v} onClick={() => setYardSize(v)}
                  style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '2px solid', borderColor: yardSize === v ? '#F5E642′ : '#1a2d4a', backgroundColor: yardSize === v ? '#F5E642' : '#1a2d4a', color: yardSize === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer', fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Infestation Severity</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['low', 'Low (1–3 mounds)'], ['moderate', 'Moderate (4–10)'], ['high', 'Heavy (10+ mounds)']].map(([v, l]) => (
                <button key={v} onClick={() => setSeverity(v)}
                  style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '2px solid', borderColor: severity === v ? '#F5E642′ : '#1a2d4a', backgroundColor: severity === v ? '#F5E642' : '#1a2d4a', color: severity === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer', fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowPlan(true)}
            style={{ width: '100%', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My Treatment Plan →
          </button>

          {showPlan && (
            <div style={{ marginTop: 20, backgroundColor: '#1a2d4a', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Estimated Cost: ~${getCost()}/treatment</div>
              {recs.map(r => (
                <div key={r.name} style={{ backgroundColor: '#0f2040', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>✅ {r.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{r.usage}</div>
                  <div style={{ color: '#22c55e', fontSize: 12 }}>🔒 {r.safety}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏠</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get matched with a licensed DFW pest control pro through ProLnk — free, fast quotes.</p>
        </div>

      </div>
    </div>
  );
}
