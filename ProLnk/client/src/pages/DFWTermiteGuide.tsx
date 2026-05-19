import { useState } from 'react';

const riskFactors = [
  { id: 'old', label: 'Home built before 1980', weight: 3 },
  { id: 'woodSoil', label: 'Wood-to-soil contact present', weight: 4 },
  { id: 'prevTreatment', label: 'Previous termite treatment (5+ years ago)', weight: 2 },
  { id: 'moisture', label: 'Moisture issues or leaky pipes', weight: 3 },
  { id: 'mulch', label: 'Mulch within 12 inches of foundation', weight: 2 },
];

export default function DFWTermiteGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const score = selected.reduce((acc, id) => {
    const f = riskFactors.find(r => r.id === id);
    return acc + (f ? f.weight : 0);
  }, 0);

  const getRisk = () => {
    if (score <= 2) return { level: 'Low', color: '#22c55e', plan: 'Annual inspection only. Preventive bait stations optional.', cost: '$300–$500/year' };
    if (score <= 6) return { level: 'Moderate', color: '#f59e0b', plan: 'Install perimeter bait station system. Annual inspection required. Address moisture issues immediately.', cost: '$600–$900 install + $200–$400/year monitoring' };
    return { level: 'High', color: '#ef4444', plan: 'Liquid barrier treatment recommended. Full perimeter application + bait stations. Re-inspect in 6 months.', cost: '$800–$1,500 treatment + ongoing monitoring' };
  };

  const risk = getRisk();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🐛</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Termite Risk & Treatment Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            North Texas sits in a <strong style={{ color: '#F5E642′ }}>very heavy termite pressure zone</strong>. Two species dominate: Eastern Subterranean (most common) and Formosan (more aggressive, harder to eliminate). DFW’s clay soil and hot humid summers create ideal conditions year-round.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>⚠️ Signs of Infestation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              ['🪵', 'Hollow-sounding wood when tapped'],
              ['🧱', 'Mud tubes on foundation or walls'],
              ['🪟', 'Stuck or warped doors and windows'],
              ['🐜', 'Discarded wings near windowsills'],
              ['🫧', 'Bubbling or peeling paint (moisture from termites)'],
              ['💩', 'Frass (termite droppings) near baseboards'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, backgroundColor: '#1a2d4a', borderRadius: 8, padding: 12 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🔬 Treatment Options in DFW</h2>
          {[
            { name: 'Liquid Barrier (Termidor)', best: 'Best for active infestations', desc: 'Chemical trenched around perimeter. Termites carry it back to colony. Effective within 90 days. Lasts 10+ years. Most common DFW choice.', cost: '$800–$1,500′ },
            { name: 'Bait Station System (Sentricon)', best: 'Best for prevention + monitoring', desc: 'Stations installed every 10–12 feet around perimeter. Slow-kill bait eliminates colony. Annual monitoring required. Preferred for environmentally sensitive sites.', cost: '$400–$700 install + $200–$400/year' },
            { name: 'Tent Fumigation', best: 'Rarely needed in DFW', desc: 'Effective for drywood termites (rare here). Not effective against subterranean species dominant in DFW. Only consider if drywood confirmed by inspection.', cost: '$2,000–$4,000′ },
          ].map(t => (
            <div key={t.name} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>{t.name}</span>
                <span style={{ color: '#F5E642', fontSize: 14 }}>{t.cost}</span>
              </div>
              <div style={{ color: '#22c55e', fontSize: 13, marginBottom: 6 }}>{t.best}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>📅 Annual Inspections</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
            Texas requires a termite inspection for most real estate transactions (Wood Destroying Insect Report). Even without buying/selling, annual inspections catch infestations before structural damage occurs. DFW inspections typically cost <strong style={{ color: '#e2e8f0′ }}>$75–$150</strong>. Many companies offer free inspections when under a treatment contract.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🎯 Your Risk Assessment</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select all conditions that apply to your home:</p>
          {riskFactors.map(f => (
            <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #1a2d4a' }}>
              <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)}
                style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
              <span style={{ color: '#cbd5e1′ }}>{f.label}</span>
            </label>
          ))}
          <button onClick={() => setShowPlan(true)}
            style={{ marginTop: 20, backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Calculate My Risk Score →
          </button>
          {showPlan && (
            <div style={{ marginTop: 20, backgroundColor: '#1a2d4a', borderRadius: 10, padding: 20, borderLeft: `4px solid ${risk.color}` }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: risk.color, marginBottom: 8 }}>Risk Level: {risk.level} (Score: {score})</div>
              <div style={{ color: '#e2e8f0', marginBottom: 10 }}>{risk.plan}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>Estimated Cost: {risk.cost}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏠</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get matched with a licensed DFW termite specialist through ProLnk — free quotes, vetted pros.</p>
        </div>

      </div>
    </div>
  );
}
