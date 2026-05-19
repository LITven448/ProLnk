import { useState } from 'react';

const entryChecklist: Record<string, string[]> = {
  droppings: [
    'Check kitchen cabinets and under sink for droppings',
    'Inspect pantry and food storage areas',
    'Look for gnaw marks on food packaging or wood',
    'Check behind appliances (stove, fridge, dishwasher)',
    'Inspect garage door sweep and side gaps',
  ],
  sounds: [
    'Listen at dusk/dawn — scratching in attic or walls',
    'Check attic vents for damage or gaps',
    'Inspect roofline where soffit meets fascia',
    'Look for entry points at utility line penetrations',
    'Check chimney cap condition',
  ],
  sightings: [
    'Full exclusion inspection required — all exterior gaps',
    'Check foundation cracks and weep holes',
    'Inspect all plumbing penetrations through walls',
    'Seal garage interior door gap (bottom sweep)',
    'Check HVAC return air penetrations',
  ],
};

export default function DFWRodentProofingGuide() {
  const [homeAge, setHomeAge] = useState('newer');
  const [evidence, setEvidence] = useState('droppings');
  const [showPlan, setShowPlan] = useState(false);

  const getCost = () => {
    const base = homeAge === 'newer' ? 250 : homeAge === 'mid' ? 450 : 750;
    return { low: base, high: Math.round(base * 2.2) };
  };

  const cost = getCost();
  const checklist = entryChecklist[evidence] || [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🐭</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Rodent-Proofing Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            Mice and rats are a <strong style={{ color: '#F5E642′ }}>major issue in DFW winters</strong> (November–February). As temperatures drop, rodents seek warmth inside homes. DFW’s older housing stock — especially 1970s–1990s brick homes — has countless potential entry points. Attic damage from rodents is the #1 hidden home repair cost in North Texas.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🚪 Top Entry Points in DFW Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              ['🔌', 'Utility line penetrations (electrical, gas, plumbing)'],
              ['🏗️', 'Weep holes in brick (mice fit through 1/4 inch)'],
              ['🌬️', 'Attic vents with damaged screens'],
              ['🚗', 'Garage door gaps (bottom and sides)'],
              ['🌿', 'Tree branches touching roofline'],
              ['🔩', 'Gaps where soffit meets fascia'],
              ['💧', 'Plumbing penetrations under sinks'],
              ['🏚️', 'Foundation cracks (rats fit through 1/2 inch)'],
            ].map(([icon, text]) => (
              <div key={text} style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>⚡ Exclusion vs. Extermination</h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { title: 'Exclusion (Seal-Out)', icon: '🔒', desc: 'Physical sealing of all entry points with steel wool, hardware cloth, caulk, or expanding foam. Permanent solution. Without exclusion, traps and poison are a treadmill — new rodents replace killed ones.', recommended: true },
              { title: 'Trapping', icon: '🪤', desc: 'Snap traps or live traps inside home. Effective for existing infestation. Must be combined with exclusion or population rebounds. Check daily — trapped rodents decay fast in DFW heat.', recommended: false },
              { title: 'Rodenticide (Poison Bait)', icon: '☠️', desc: 'Fast knockdown of large populations. Risk: rodents die inside walls causing odor. Risk to pets and raptors (owls, hawks) from secondary poisoning. Use only as last resort or with tamper-resistant bait stations outside.', recommended: false },
            ].map(t => (
              <div key={t.title} style={{ flex: '1 1 220px', backgroundColor: '#1a2d4a', borderRadius: 10, padding: 16, borderTop: t.recommended ? '3px solid #22c55e' : '3px solid #334155′ }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 6 }}>{t.title}</div>
                {t.recommended && <div style={{ color: '#22c55e', fontSize: 12, marginBottom: 6 }}>✅ Recommended first step</div>}
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>⚠️ DFW Attic Damage: What's at Stake</h2>
          <div style={{ backgroundColor: '#1a2d4a', borderRadius: 8, padding: 16, borderLeft: '4px solid #ef4444′ }}>
            <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              DFW attics are prime real estate for rats. They shred blown-in insulation for nests (requires full re-insulation at $2,000–$5,000), chew through electrical wiring (fire hazard), and contaminate insulation with urine and droppings (health risk). If you hear scratching in your attic, treat as urgent — the longer they stay, the more damage compounds.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#F5E642', marginBottom: 16 }}>🎯 Entry Point Checklist & Action Plan</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Age</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['newer', 'After 2000'], ['mid', '1980–2000'], ['older', 'Before 1980']].map(([v, l]) => (
                <button key={v} onClick={() => setHomeAge(v)}
                  style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '2px solid', borderColor: homeAge === v ? '#F5E642′ : '#1a2d4a', backgroundColor: homeAge === v ? '#F5E642' : '#1a2d4a', color: homeAge === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer', fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Evidence Type</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['droppings', '💩 Droppings'], ['sounds', '👂 Sounds/scratching'], ['sightings', '👁️ Live sightings']].map(([v, l]) => (
                <button key={v} onClick={() => setEvidence(v)}
                  style={{ flex: 1, padding: '10px 4px', borderRadius: 8, border: '2px solid', borderColor: evidence === v ? '#F5E642′ : '#1a2d4a', backgroundColor: evidence === v ? '#F5E642' : '#1a2d4a', color: evidence === v ? '#0A1628' : '#cbd5e1', fontWeight: 600, cursor: ’pointer', fontSize: 12 }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowPlan(true)}
            style={{ width: '100%', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Generate My Checklist & Cost Estimate →
          </button>

          {showPlan && (
            <div style={{ marginTop: 20, backgroundColor: '#1a2d4a', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Estimated Cost: ${cost.low}–${cost.high}</div>
              <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 10 }}>🔍 Inspection Checklist:</div>
              {checklist.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid #0f2040′ }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, marginBottom: 6 }}>🏠</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>ProLnk connects you with licensed DFW rodent exclusion specialists — get quotes today.</p>
        </div>

      </div>
    </div>
  );
}
