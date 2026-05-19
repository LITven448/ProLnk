import { useState } from 'react';

const categories = [
  {
    id: 'walkaway',
    label: '🚨 Walk Away',
    subtitle: '(or negotiate substantial price reduction)',
    color: '#f87171',
    bg: '#2d1a1a',
    border: '#f87171',
    findings: [
      { id: 'w1', name: 'Active Foundation Settlement', desc: 'Interior damage (not just cracks — actual movement). Not the same as minor settling. Structural issue.', cost: 'Unknown — engineering assessment required', action: 'Walk away or get full structural engineer report before offer' },
      { id: 'w2', name: 'Unpermitted Additions', desc: 'Structure built without permit = potentially built without inspections = potentially unsafe framing, wiring, plumbing.', cost: '$5,000–50,000+ to bring to code', action: 'Require seller to pull permits and pass inspection or reduce price accordingly' },
      { id: 'w3', name: 'Federal Pacific / Zinsco Panel', desc: 'Fire risk electrical panels with documented failure history. Insurance companies increasingly refuse to cover homes with these.', cost: '$3,000–8,000 to replace', action: 'Negotiate panel replacement as condition of sale' },
      { id: 'w4', name: 'Polybutylene Plumbing', desc: 'Grey plastic pipes from the 1980s–90s subject to a class action settlement. Fail from inside out — no warning.', cost: '$7,000–15,000 for full repipe', action: 'Negotiate full repipe credit or walk away' },
      { id: 'w5', name: 'Active Roof Leak Damage Throughout', desc: 'Evidence of ongoing water intrusion into structural members, not just surface staining. Mold and rot risk.', cost: '$15,000–40,000+', action: 'Walk away or get mold remediation + structural assessment cost before proceeding' },
      { id: 'w6', name: 'Major Flood / Water Intrusion History', desc: 'Evidence of repeated flooding — high water marks, efflorescence, warped framing. Check flood insurance requirements.', cost: 'Highly variable', action: 'FEMA flood zone check + flood insurance quote required before proceeding' },
    ],
  },
  {
    id: 'negotiate',
    label: '⚠️ Negotiate Hard',
    subtitle: '(significant known cost items)',
    color: '#fbbf24',
    bg: '#1a1a0d',
    border: '#fbbf24',
    findings: [
      { id: 'n1', name: 'HVAC System Over 10 Years Old', desc: 'Serviceable but end-of-life. In DFW heat, HVAC failure during summer is not optional.', cost: '$5,000–12,000 to replace', action: 'Request $6,000–8,000 credit at closing' },
      { id: 'n2', name: 'Roof Over 15 Years or Hail Damage', desc: 'DFW hail shortens roof life. Most insurance companies won’t pay for roofs over 20 years.', cost: '$12,000–22,000 to replace', action: 'Request full replacement credit or require seller to replace' },
      { id: 'n3', name: 'Galvanized Steel Plumbing', desc: 'Corrodes from the inside out. Reduced flow, rust, and eventual failure. Pre-1970 homes at highest risk.', cost: '$7,000–15,000 to repipe', action: 'Negotiate $8,000–10,000 credit' },
      { id: 'n4', name: 'Knob-and-Tube Wiring', desc: 'Pre-1940 wiring — no grounding, cloth insulation, overloaded by modern loads. Most insurers refuse coverage.', cost: '$8,000–25,000 to rewire', action: 'Negotiate full rewire credit or walk away from older homes without update' },
      { id: 'n5', name: 'Foundation Issues Without Interior Damage', desc: 'Pier and beam settling or slab movement that hasn’t yet reached interior. Addressable but real.', cost: '$5,000–20,000 for foundation repair', action: 'Get foundation company estimate, negotiate 120% of estimate as credit' },
    ],
  },
  {
    id: 'accept',
    label: '✅ Accept & Document',
    subtitle: '(normal, expected, or cosmetic)',
    color: '#34d399',
    bg: '#0d2a1e',
    border: '#34d399',
    findings: [
      { id: 'a1', name: 'Minor Foundation Cracks', desc: 'Hairline cracks with no evidence of movement or interior damage. Normal settling in Texas clay soil.', cost: '$0 unless movement found', action: 'Document and monitor annually — get a 90-day foundation warranty if possible' },
      { id: 'a2', name: 'HVAC 7–10 Years Old', desc: 'Serviceable and likely to last 3–5 more years with maintenance. Not a deal breaker.', cost: 'Budget for future replacement', action: 'Request service records, negotiate $1,000–2,000 credit for age' },
      { id: 'a3', name: 'Cosmetic Issues / Deferred Maintenance', desc: 'Peeling paint, dated finishes, worn carpet, minor landscaping issues. All cosmetic.', cost: '$500–5,000 typically', action: 'Use for minor negotiation or leave alone' },
    ],
  },
];

function getStrategy(selected: string[]) {
  const walkaway = selected.filter((id) => id.startsWith('w'));
  const negotiate = selected.filter((id) => id.startsWith('n'));
  const accept = selected.filter((id) => id.startsWith('a'));
  if (walkaway.length >= 2) return { label: '🚨 Serious Concerns — Consider Walking Away', color: '#f87171', advice: 'Multiple walk-away items significantly increase your risk. Consult with a real estate attorney before proceeding.' };
  if (walkaway.length === 1) return { label: '⚠️ One Major Red Flag — Negotiate or Walk', color: '#fbbf24', advice: 'One walk-away item found. Get precise cost estimates and negotiate hard, or request seller remediation before close.' };
  if (negotiate.length >= 3) return { label: '💰 Multiple Significant Cost Items — Negotiate $20k+', color: '#fbbf24', advice: 'Sum the estimated repair costs and request 110–120% as a closing credit. Multiple items = more negotiating leverage.' };
  if (negotiate.length > 0) return { label: '💬 Negotiate a Credit for Known Items', color: '#a5b4fc', advice: 'You have clear negotiating points. Get contractor quotes for each item and request credits at closing.' };
  if (accept.length > 0) return { label: '✅ Looks Clean — Accept with Documentation', color: '#34d399', advice: 'Only minor items found. Document everything in your inspection report and proceed with confidence.' };
  return null;
}

export default function DFWHomeInspectionRedFlags() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('walkaway');

  function toggle(id: string) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const strategy = selected.length > 0 ? getStrategy(selected) : null;
  const current = categories.find((c) => c.id === activeCategory)!;

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#f87171', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            🔍 DFW Buyer's Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>
            DFW Home Inspection Red Flags
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            Walk Away or Negotiate? — A DFW Buyer's Playbook
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCategory(c.id)} style={{
              padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: activeCategory === c.id ? c.color : '#1e293b',
              color: activeCategory === c.id ? '#0a0a0f' : '#94a3b8',
            }}>{c.label}</button>
          ))}
        </div>

        <div style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>
          {current.subtitle} — click any finding to add it to your negotiation analyzer
        </div>

        {/* Findings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {current.findings.map((f) => {
            const isSelected = selected.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggle(f.id)}
                style={{
                  display: 'block', textAlign: 'left', width: '100%', cursor: 'pointer',
                  background: isSelected ? current.bg : '#0f172a',
                  border: `1px solid ${isSelected ? current.border : '#1e293b'}`,
                  borderRadius: 12, padding: '20px 22px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ color: isSelected ? current.color : '#e2e8f0', fontWeight: 700, fontSize: 16 }}>
                    {isSelected ? '✓ ' : ''}{f.name}
                  </div>
                  <div style={{ color: current.color, fontSize: 12, fontWeight: 600, background: current.bg, padding: '3px 10px', borderRadius: 12, whiteSpace: 'nowrap', marginLeft: 12 }}>
                    {f.cost}
                  </div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>{f.desc}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>
                  <strong style={{ color: '#475569′ }}>Recommended action:</strong> {f.action}
                </div>
              </button>
            );
          })}
        </div>

        {/* Negotiation Analyzer */}
        {strategy && (
          <div style={{ background: '#0f172a', border: `1px solid ${strategy.color}`, borderRadius: 12, padding: 28, marginBottom: 40 }}>
            <h2 style={{ color: strategy.color, marginTop: 0 }}>Your Negotiation Strategy</h2>
            <div style={{ fontSize: 20, fontWeight: 700, color: strategy.color, marginBottom: 12 }}>{strategy.label}</div>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: '0 0 16px' }}>{strategy.advice}</p>
            <div style={{ color: '#64748b', fontSize: 14 }}>
              Selected items: {selected.map((id) => {
                const f = categories.flatMap((c) => c.findings).find((f) => f.id === id);
                return f?.name;
              }).filter(Boolean).join(', ')}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
          <h3 style={{ color: '#e2e8f0', marginTop: 0 }}>Get Independent Verification</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>TrustyPro's AI scan gives you a second opinion on any home — structure, systems, and risk factors.</p>
          <button style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16,
            fontWeight: 700, cursor: 'pointer',
          }}>
            Get a TrustyPro AI Scan →
          </button>
        </div>

      </div>
    </div>
  );
}
