import { useState } from 'react';

const riskFactors = [
  { id: 'age_old', label: 'Home built before 1980', weight: 3 },
  { id: 'age_mid', label: 'Home built 1980–2000', weight: 1 },
  { id: 'wood_soil', label: 'Wood-to-soil contact present', weight: 4 },
  { id: 'prev_treatment', label: 'Previous termite treatment on record', weight: 2 },
  { id: 'moisture', label: 'Known moisture or drainage issues', weight: 3 },
  { id: 'mulch_beds', label: 'Dense mulch beds against foundation', weight: 2 },
  { id: 'loan_type', label: 'VA or FHA loan (inspection required)', weight: 0 },
];

export default function DFWWDOInspectionGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = selected.reduce((acc, id) => {
    const f = riskFactors.find(r => r.id === id);
    return acc + (f ? f.weight : 0);
  }, 0);

  const loanRequired = selected.includes('loan_type');

  const getRisk = () => {
    if (loanRequired) return { label: 'Required', color: '#F5E642', urgency: 'Schedule before closing — VA/FHA mandates WDO report.' };
    if (score >= 7) return { label: 'High Risk', color: '#FF6B6B', urgency: 'Schedule WDO inspection immediately. Active infestation likely.' };
    if (score >= 4) return { label: 'Moderate Risk', color: '#FFB347', urgency: 'Add WDO to your inspection. DFW conditions favor termite activity.' };
    return { label: 'Low Risk', color: '#4CAF50', urgency: 'Standard inspection may suffice, but WDO is inexpensive insurance.' };
  };

  const risk = getRisk();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1F3C', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Inspection Series</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>🪲 WDO / Termite Inspection Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Wood-Destroying Organism inspections in DFW — what they cover, when they're required, and how to read the report.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🏠 Why WDO Inspections Matter in DFW</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 12px' }}>North Texas is one of the highest-risk termite zones in the United States. Subterranean termites thrive in DFW's clay soil and humid summers. A standard TREC home inspection does not include a WDO inspection — it must be ordered separately.</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}><strong style={{ color: '#F5E642' }}>VA and FHA loans require</strong> a WDO report before closing. Conventional buyers are not required to order one, but most real estate professionals recommend it on any DFW home.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🔍 What Inspectors Look For</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🪵', title: 'Active Infestation', desc: 'Live termites, mud tubes, or fresh damage — requires treatment before closing.' },
              { icon: '💥', title: 'Prior Damage', desc: 'Structural wood already eaten. May require repairs in addition to treatment.' },
              { icon: '⚠️', title: 'Conditions Conducive', desc: 'Wood-to-soil contact, moisture, or other factors that attract WDOs but no active infestation yet.' },
              { icon: '🌿', title: 'Other Wood-Destroying Organisms', desc: 'Carpenter ants, wood-boring beetles, and wood-decaying fungi — all reportable on a WDO.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: '#132240', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📋 How to Read the WDO Report</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              'Section I — Active infestation or damage: requires treatment and/or repair.',
              'Section II — Previously treated with no current evidence: verify warranty transferability.',
              'Section III — Conditions conducive only: no active WDOs, but risk factors noted.',
              'Clear report: no evidence of WDOs and no risk conditions found.',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, color: '#CBD5E1', fontSize: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>💰 Typical DFW Cost</h2>
          <div style={{ color: '#4CAF50', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>$75 – $150</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>Treatment (if needed): $400–$1,500+ depending on infestation type and size. Bait systems run $800–$2,000 annually.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>🎯 WDO Risk Calculator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select all that apply to your property:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {riskFactors.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', backgroundColor: selected.includes(f.id) ? '#1E3A5F' : '#132240', borderRadius: 8, padding: '12px 16px', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} style={{ display: 'none' }} />
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#4A5568'}`, backgroundColor: selected.includes(f.id) ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0A1628', fontWeight: 900, fontSize: 14 }}>{selected.includes(f.id) ? '✓' : ''}</span>
                <span style={{ color: selected.includes(f.id) ? '#fff' : '#CBD5E1', fontSize: 15 }}>{f.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Calculate WDO Risk →</button>
          {showResult && (
            <div style={{ marginTop: 20, padding: 20, backgroundColor: '#132240', borderRadius: 10, borderLeft: `4px solid ${risk.color}` }}>
              <div style={{ color: risk.color, fontWeight: 800, fontSize: 20, marginBottom: 8 }}>{risk.label}</div>
              <p style={{ color: '#CBD5E1', margin: 0 }}>{risk.urgency}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
