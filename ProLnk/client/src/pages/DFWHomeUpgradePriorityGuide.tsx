import { useState } from 'react';

const UPGRADES = [
  { category: 'Safety', items: ['Smoke & CO detectors', 'Electrical panel inspection', 'GFCI outlets'], cost: 300, urgency: 'Immediate' },
  { category: 'Damage Prevention', items: ['Roof inspection & repair', 'Foundation drainage', 'Water heater check'], cost: 1200, urgency: 'Within 30 days' },
  { category: 'Systems (DFW Essential)', items: ['AC tune-up & filter upgrade', 'HVAC duct sealing', 'Plumbing inspection'], cost: 800, urgency: 'Before summer' },
  { category: 'Comfort', items: ['Attic insulation', 'Window weatherstripping', 'Smart thermostat'], cost: 1500, urgency: 'This year' },
  { category: 'Value-Add', items: ['Kitchen refresh', 'Landscaping', 'Paint interior'], cost: 5000, urgency: 'When budget allows' },
];

const ISSUE_MODIFIERS: Record<string, string> = {
  ac: 'AC repair jumps to top priority — DFW summers are dangerous without cooling.',
  foundation: 'Foundation issues must be addressed before any cosmetic upgrades.',
  roof: 'Active roof leaks override all other priorities.',
  electrical: 'Electrical hazards are life-safety — address immediately.',
};

export default function DFWHomeUpgradePriorityGuide() {
  const [budget, setBudget] = useState(5000);
  const [homeAge, setHomeAge] = useState(15);
  const [issue, setIssue] = useState('none');
  const [submitted, setSubmitted] = useState(false);

  const getFilteredUpgrades = () => {
    let remaining = budget;
    return UPGRADES.map((u) => {
      const affordable = remaining >= u.cost;
      remaining -= affordable ? u.cost : 0;
      return { ...u, affordable };
    });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          🏠 DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Home Upgrade Priority Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          In DFW, budget decisions are different. AC maintenance almost always tops the list. Here's how to prioritize when money is limited.
        </p>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>⚡ Your Situation</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Available Budget</label>
              <input type="range" min={1000} max={20000} step={500} value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Age (years)</label>
              <input type="range" min={1} max={60} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{homeAge} years old</div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Known Urgent Issue?</label>
              <select value={issue} onChange={e => setIssue(e.target.value)}
                style={{ background: '#162035', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem', width: '100%', fontSize: 14 }}>
                <option value="none">None</option>
                <option value="ac">AC problems</option>
                <option value="foundation">Foundation concerns</option>
                <option value="roof">Roof issues</option>
                <option value="electrical">Electrical concerns</option>
              </select>
            </div>
            <button onClick={() => setSubmitted(true)}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              📋 Get My Priority List
            </button>
          </div>
        </div>

        {submitted && (
          <div>
            {issue !== 'none' && (
              <div style={{ background: '#7c2d12', borderRadius: 10, padding: '1rem', marginBottom: 16, fontSize: 14 }}>
                🚨 {ISSUE_MODIFIERS[issue]}
              </div>
            )}
            {homeAge > 25 && (
              <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: 16, fontSize: 14, color: '#93c5fd' }}>
                🏚️ Older home alert: plumbing, electrical, and HVAC systems are higher priority. Inspect before cosmetic upgrades.
              </div>
            )}
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Your Prioritized Upgrade List</h2>
            {getFilteredUpgrades().map((u, i) => (
              <div key={i} style={{ background: u.affordable ? '#0f2044′ : '#1a1a2e', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: 12, opacity: u.affordable ? 1 : 0.5, borderLeft: `4px solid ${u.affordable ? '#F5E642' : '#334155'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700 }}>{i + 1}. {u.category}</span>
                  <span style={{ color: '#F5E642', fontSize: 13 }}>{u.urgency}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{u.items.join(' · ')}</div>
                <div style={{ fontSize: 13, color: u.affordable ? '#4ade80′ : '#f87171' }}>
                  {u.affordable ? `✅ Est. $${u.cost.toLocaleString()}` : `⏳ Beyond current budget — plan for next cycle`}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Get quotes from vetted DFW pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>ProLnk connects you to licensed professionals with upfront pricing.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Find a Pro on ProLnk →
          </button>
        </div>
      </div>
    </div>
  );
}
