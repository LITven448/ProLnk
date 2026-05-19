import { useState } from 'react';

type Decision = { recommendation: string; financial: string; nextStep: string; roi: string };

const decisions: Record<string, Record<string, Decision>> = {
  hvac: {
    repair: { recommendation: '🔧 Repair if under 10 years old and repair cost < 50% of replacement', financial: 'Repair: $200-1,500 | Replacement: $6,000-14,000. If SEER < 14, new 16+ SEER cuts bills 25-40%.', roi: 'New HVAC ROI: 8-12 years in DFW', nextStep: 'Get 3 repair quotes + 1 replacement quote. Compare total 5-year cost.' },
    replace: { recommendation: '🔄 Replace now — DFW summers punish old inefficient systems hard', financial: 'New 16 SEER: $7,000-10,000 installed. Tax credit: up to $2,000 (25C). Oncor rebate: up to $600.', roi: 'All-in cost after incentives: $4,400-7,400. Break-even vs repair: 3-5 years.', nextStep: 'Apply for Oncor rebate before purchase. Get Manual J sizing calculation from contractor.' },
    wait: { recommendation: '⏳ Defer if system is 5-8 years old and running efficiently', financial: 'Defer 3-5 years saves $7,000-10,000 in capital but costs ~$300-500/yr in extra operating costs vs new unit.', roi: 'Financially optimal to defer if SEER > 14 and no repair history', nextStep: 'Budget $150-200/yr for annual maintenance. Set replacement reserve of $100/mo.' },
  },
  roof: {
    repair: { recommendation: '🔧 Repair if under 15 years old, hail damage is isolated, < 3 layers', financial: 'Repair: $300-2,000. Full replacement: $12,000-22,000. Insurance may cover hail damage minus deductible.', roi: 'File insurance claim for hail events > 1″ — DFW averages 5+ hail events per year', nextStep: 'Get roofer inspection + public adjuster review before signing with any contractor.' },
    replace: { recommendation: '🔄 Replace — DFW hail and heat cycles shorten roof life to 15-20 years max', financial: 'Insurance replacement: $0-3,000 out of pocket. Cash replacement: $12,000-22,000. Impact-resistant Class 4 shingles: insurance discount 20-35%.', roi: 'Class 4 shingles cost $2,000-3,000 more but save $400-700/yr on insurance. Break-even: 4-6 years.', nextStep: 'Request Class 4 shingle upgrade quote. Call insurance before project for pre-approval.' },
    wait: { recommendation: '⏳ Defer only if no active leaks and under 12 years old', financial: 'Risk: one DFW hail storm can cause interior damage. Water damage claims average $11,000 in DFW.', roi: 'Defer only with annual inspection. Cost of waiting: high if weather event occurs.', nextStep: 'Annual inspection $150-200. Add roof to home warranty if < 15 years old.' },
  },
  windows: {
    repair: { recommendation: '🔧 Repair seals if frames are solid — fog between panes = failed seal only', financial: 'Seal replacement: $75-200 per window. Full window replacement: $600-1,200 per window. Usually not worth repairing old aluminum frames.', roi: 'Single-pane to double-pane: $180-300/yr energy savings. Payback: 12-20 years on energy alone.', nextStep: 'Check if frames are wood/vinyl (repair-friendly) or aluminum (replace). Get pane replacement quote first.' },
    replace: { recommendation: '🔄 Replace if single-pane, aluminum-frame, or frames are warped/rotted', financial: 'Low-E double-pane vinyl: $650-900/window installed. 15 windows: $10,000-14,000. Tax credit: 30% up to $600 total.', roi: 'DFW ROI on windows is primarily comfort and noise, not energy. ROI > 25 years on energy savings alone.', nextStep: 'Prioritize west and south-facing windows for maximum DFW summer impact. Low-E coating essential.' },
    wait: { recommendation: '⏳ Windows are rarely the right first improvement in DFW — do HVAC, ductwork, insulation first', financial: 'Air sealing + insulation returns $3-5 for every $1 spent in DFW. Windows return $0.50-0.80 per $1 spent.', roi: 'Better ROI alternatives: attic insulation ($1,500-3,500) saves as much as $20,000 in windows', nextStep: 'Prioritize: 1) HVAC tune 2) Attic insulation 3) Air sealing 4) Then windows.' },
  },
};

const systems = [
  { id: 'hvac', label: '❄️ HVAC System' },
  { id: 'roof', label: '🏠 Roof' },
  { id: 'windows', label: '🪟 Windows' },
];

const actions = [
  { id: 'repair', label: '🔧 Repair It' },
  { id: 'replace', label: '🔄 Replace It' },
  { id: 'wait', label: '⏳ Do Nothing for Now' },
];

export default function DFWHomeImprovementDecisionTree() {
  const [system, setSystem] = useState('');
  const [action, setAction] = useState('');
  const result = system && action ? decisions[system]?.[action] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌳</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Home Improvement Decision Tree</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Repair, replace, or wait? Get a DFW-specific financial analysis and clear next step for every major home system.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Step 1 — Which system?</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {systems.map(s => (
              <button key={s.id} onClick={() => { setSystem(s.id); setAction(''); }}
                style={{ flex: 1, background: system === s.id ? '#F5E642′ : '#0A1628', color: system === s.id ? '#0A1628' : '#CBD5E1', border: `2px solid ${system === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 8px', fontSize: 13, fontWeight: system === s.id ? 700 : 400, cursor: ’pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {system && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Step 2 — What are you considering?</h2>
            <div style={{ display: 'flex', gap: 12 }}>
              {actions.map(a => (
                <button key={a.id} onClick={() => setAction(a.id)}
                  style={{ flex: 1, background: action === a.id ? '#F5E642′ : '#0A1628', color: action === a.id ? '#0A1628' : '#CBD5E1', border: `2px solid ${action === a.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 8px', fontSize: 13, fontWeight: action === a.id ? 700 : 400, cursor: ’pointer' }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <>
            <div style={{ background: '#0F3460', borderRadius: 12, padding: 24, marginBottom: 16, border: '2px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 10 }}>📊 DFW Recommendation</h3>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0, fontSize: 15 }}>{result.recommendation}</p>
            </div>
            {[['💰 Financial Analysis', result.financial], ['📈 ROI Context', result.roi], ['➡️ Your Next Step', result.nextStep]].map(([title, text]) => (
              <div key={title} style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
