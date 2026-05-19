import { useState } from 'react';

const profiles = [
  { id: 'pre1960', label: '🏚️ Pre-1960 / Central DFW' },
  { id: '1970s', label: '🔧 1970s / Galvanized Era' },
  { id: '1980s1990s', label: '💧 1980s–1990s / Suburbs' },
  { id: 'post2000', label: '🏠 Post-2000 / Outer DFW' },
  { id: 'slab', label: '🪨 Any era / Slab foundation' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  'pre1960': { title: 'Pre-1960 Central DFW Priorities', steps: ['Cast iron drain lines: scope for cracks/root intrusion', 'Original supply lines likely galvanized — inspect now', 'Water pressure test (DFW runs 80–100 PSI — add PRV)', 'Install whole-home water shutoff for emergency', 'Budget $8K–$25K for full replumb if galvanized'] },
  '1970s': { title: '1970s Galvanized Era Priorities', steps: ['Galvanized steel corrodes from inside — check flow rate', 'Replumb with PEX: $5K–$12K whole home', 'Check hot water heater (likely at end of life)', 'Hard water: install whole-home softener', 'Scope cast iron sewer lines before any sale'] },
  '1980s1990s': { title: '1980s–1990s Suburban Priorities', steps: ['Polybutylene (PB) pipe: MUST replace if present', 'Check for PB at water heater connections and in walls', 'Hard water scale in water heater reduces life 30%', 'Add pressure reducing valve if not present', 'Flush water heater annually, anode rod every 3 years'] },
  'post2000': { title: 'Post-2000 Outer DFW Priorities', steps: ['PEX or CPVC supply: generally solid', 'Clay soil movement: check for slab/pipe separation', 'Inspect expansion tank on water heater', 'Test water quality — outer DFW varies by municipality', 'Add whole-home filtration if on well or problematic supply'] },
  'slab': { title: 'Slab Foundation Plumbing Priorities', steps: ['DFW clay soil moves significantly — slab leaks common', 'Signs: hot spots on floor, high water bill, foundation movement', 'Leak detection: electronic/thermal imaging ($300–$500)', 'Repair options: tunneling vs rerouting overhead', 'Get 3 bids; rerouting often better long-term in DFW'] },
};

export default function DFWPlumbing2026Summary() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW PLUMBING 2026 · COMPLETE SUMMARY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💧 DFW Plumbing Knowledge Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Complete plumbing guidance for DFW's unique soil, water, and climate conditions.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🪨', title: 'Slab Leaks & Clay Movement', body: 'DFW expansive clay soil shifts 3–6 inches seasonally. This stresses underground pipes constantly. Slab leaks cost $2K–$15K to repair. Electronic leak detection is essential before assuming foundation issues.' },
            { icon: '💧', title: 'Hard Water Impact', body: 'DFW water hardness: 15–25 grains per gallon (very hard). Scale buildup destroys water heaters in 8–10 years instead of 12–15. Whole-home softener ($1,500–$3,500) pays for itself in appliance longevity.' },
            { icon: '🔧', title: 'Pipe Materials by Era', body: 'Pre-1960: cast iron drains, galvanized supply. 1970s: galvanized (corroded), early copper. 1980s–1995: polybutylene (defective — class action). 1995+: CPVC or copper. 2005+: PEX (best). Know what you have.' },
            { icon: '🌡️', title: 'Freeze Risk in DFW', body: 'URI 2021 proved DFW pipes fail in hard freezes. Wrap exposed pipes in garage/attic. Know your main shutoff location. Install Flo by Moen or similar auto-shutoff. Budget $200 for freeze protection annually.' },
            { icon: '📋', title: 'Code Requirements 2026', body: 'TX requires: PRV if street pressure exceeds 80 PSI, expansion tank on closed systems, TCEQ licensed plumbers for all permitted work. Permit required for water heater replacement, re-routes, and drain work.' },
            { icon: '📅', title: 'Maintenance Schedule', body: 'Annual: flush water heater, inspect anode rod. Every 3 years: scope sewer line if trees nearby. Every 5 years: full plumbing inspection. Every 10 years: water heater replacement. Immediately: any sign of slab movement.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111d35', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Plumbing Priorities for Your DFW Situation</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>Select your home vintage and area:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === p.id ? '#F5E642' : '#1e3a5f'}`, background: selected === p.id ? '#F5E642′ : ’transparent', color: selected === p.id ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>{p.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>{plans[selected].title}</div>
              {plans[selected].steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: 14, background: '#111d35', borderRadius: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🔗 ProLnk finds licensed DFW plumbers who know your neighborhood's pipe history.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
