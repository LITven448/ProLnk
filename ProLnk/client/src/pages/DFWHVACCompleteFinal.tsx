import { useState } from 'react';

const levels = [
  {
    id: 'beginner',
    label: '🟡 I am just getting started',
    plan: [
      'Step 1: Learn your system — find the model number on the outdoor unit. Note the brand, tons (BTU/12000), and estimated age.',
      'Step 2: Start a maintenance baseline — replace the filter today. Flush the condensate drain with a cup of water mixed with a tablespoon of bleach.',
      'Step 3: Schedule a spring tune-up now — use ProLnk to get 2-3 quotes from vetted DFW HVAC pros.',
      'Step 4: Add your home to ProLnk Health Vault — store your system info so you never lose it.',
      'Step 5: Set a calendar reminder every May 1 to start your DFW HVAC prep season.',
    ],
  },
  {
    id: 'intermediate',
    label: '🟠 I know the basics but want to optimize',
    plan: [
      'Step 1: Request a Manual J load calculation if your system is over 10 years old or you have hot/cold spots.',
      'Step 2: Get a duct leakage test — DFW homes commonly lose 20-30% of conditioned air through duct leaks.',
      'Step 3: Evaluate your efficiency rating — if below 16 SEER, calculate replacement payback at your current utility rate.',
      'Step 4: Review your filter type — cheap fiberglass filters hurt airflow. Use MERV 8-11 for DFW dust conditions.',
      'Step 5: Join ProLnk waitlist — get early access to AI-driven maintenance alerts before the summer peak.',
    ],
  },
  {
    id: 'advanced',
    label: '🟢 I want to go deep on optimization',
    plan: [
      'Step 1: Install a smart thermostat with local weather integration and ERCOT demand response capability.',
      'Step 2: Commission a complete energy audit including HVAC, envelope, and attic — identify all efficiency losses.',
      'Step 3: Evaluate variable-speed upgrade — 30-40% efficiency gain vs your current single-stage system.',
      'Step 4: Consider zoning — DFW two-story homes commonly have 5-10°F variance between floors. Zoning solves this.',
      'Step 5: Use ProLnk to find contractors who specialize in efficiency upgrades and can quote full scope with ROI analysis.',
    ],
  },
];

export default function DFWHVACCompleteFinal() {
  const [active, setActive] = useState<string | null>(null);
  const selected = levels.find(l => l.id === active);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>Your Final DFW HVAC Action Plan</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Everything you have learned, applied. Select your HVAC confidence level for a personalized action plan.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {levels.map(l => (
            <button
              key={l.id}
              onClick={() => setActive(active === l.id ? null : l.id)}
              style={{
                background: active === l.id ? '#1a2e4a' : '#0f1f35',
                border: `2px solid ${active === l.id ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '1rem 1.25rem',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 16,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0f1f35', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>Your Action Plan</h2>
            <ol style={{ margin: 0, padding: '0 0 0 1.2rem' }}>
              {selected.plan.map((step, i) => (
                <li key={i} style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: 15, marginBottom: '0.75rem' }}>
                  {step.replace(/^Step \d+: /, '')}
                </li>
              ))}
            </ol>
          </div>
        )}
        <div style={{ marginTop: '2.5rem', background: 'linear-gradient(135deg, #0f1f35, #1a2e4a)', borderRadius: 12, padding: '1.5rem', textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏁</div>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>You are ready for DFW HVAC</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>ProLnk connects you to vetted DFW HVAC pros who know everything you just learned — and then some. Join the waitlist for early access.</div>
        </div>
      </div>
    </div>
  );
}
