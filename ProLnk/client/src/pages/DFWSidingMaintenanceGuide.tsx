import { useState } from 'react';

const sidingTypes = ['Brick', 'Fiber Cement (HardiePlank)', 'Vinyl', 'Wood', 'Stucco', 'Stone Veneer'];
const conditionOptions = ['Excellent — no visible issues', 'Good — minor fading or wear', 'Fair — cracks, gaps, or paint peeling', 'Poor — significant damage or failure'];

export default function DFWSidingMaintenanceGuide() {
  const [sidingType, setSidingType] = useState('');
  const [sidingAge, setSidingAge] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<null | { schedule: string; cost: string; replace: string }>(null);

  function calculate() {
    const age = parseInt(sidingAge) || 15;
    const isPoor = condition.includes('Poor');
    const isFair = condition.includes('Fair');

    const scheduleMap: Record<string, string> = {
      'Brick': 'Inspect mortar joints every 10 years. Repoint every 20–30 years. Power wash annually at 1,500 PSI — DFW dust and pollen coat brick fast.',
      'Fiber Cement (HardiePlank)': 'Repaint every 7–10 years in DFW UV (vs 12–15 in northern climates). Caulk all joints annually. Power wash annually before painting.',
      'Vinyl': 'Power wash annually. Inspect for warping or cracking from DFW 110°F heat. Replace individual warped panels as needed. Never paint vinyl in DFW heat.',
      'Wood': 'Repaint every 4–5 years in DFW climate. Caulk all joints twice yearly. Inspect for rot after spring storms. Highest maintenance siding type in DFW UV/moisture cycles.',
      'Stucco': 'Inspect for cracks every 6 months — DFW heat/cold cycles create expansion cracks annually. Seal cracks immediately. Repaint every 5–7 years with elastomeric paint.',
      'Stone Veneer': 'Inspect mortar joints every 5 years. Reseal stone annually with penetrating silane sealer. Watch for veneer separation in DFW clay soil movement.'
    };

    const costMap: Record<string, string> = {
      'Brick': '$800–$2,500 for repointing (per 100 linear ft). Power wash: $200–$400.',
      'Fiber Cement (HardiePlank)': 'Paint: $3,000–$8,000 per job. Annual caulk: $300–$600 DIY.',
      'Vinyl': 'Wash: $200–$400. Panel replacement: $300–$900 per section.',
      'Wood': 'Paint: $4,000–$12,000 per job. Rot repair: $500–$3,000 per section.',
      'Stucco': 'Crack repair: $200–$1,500. Repaint with elastomeric: $3,500–$9,000.',
      'Stone Veneer': 'Repointing: $1,200–$3,500. Annual sealing: $300–$700.'
    };

    const replaceThreshold: Record<string, number> = {
      'Brick': 60,
      'Fiber Cement (HardiePlank)': 35,
      'Vinyl': 30,
      'Wood': 25,
      'Stucco': 40,
      'Stone Veneer': 50
    };

    const lifespan = replaceThreshold[sidingType] || 30;
    const schedule = scheduleMap[sidingType] || 'Inspect annually and maintain caulk seals to protect against DFW climate cycles.';
    const cost = costMap[sidingType] || 'Costs vary by condition — get a professional assessment.';
    const shouldReplace = isPoor || (isFair && age > lifespan * 0.75);
    const replace = shouldReplace
      ? `🔴 Consider Replacement — at ${age} years in ${condition.toLowerCase()} condition, repair cost may approach replacement value. Full siding replacement: $12,000–$45,000 for average DFW home depending on material chosen.`
      : `🟢 Maintain — at ${age} years, scheduled maintenance extends life to expected ${lifespan}-year lifespan. Replacement not yet warranted.`;

    setResult({ schedule, cost, replace });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          🏡 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Siding Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          DFW's extreme heat, UV, and clay soil movement stress every siding type differently. Know your material’s maintenance cycle.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 36 }}>
          {[
            { icon: '🧱', title: 'Brick — Low Maintenance but Not Zero', body: 'DFW brick homes are common and durable but mortar joints need repointing every 20–30 years. DFW dust and pollen coat brick — power wash at 1,500 PSI annually. Never use high-pressure on mortar joints. Check for efflorescence (white mineral deposits) indicating moisture.' },
            { icon: '🏠', title: 'Fiber Cement — Repaint Every 7–10 Years in DFW', body: 'HardiePlank is excellent for DFW but UV fades factory finish faster than northern climates. Repaint every 7–10 years (not the 12–15 year manufacturer estimate for cooler markets). Caulk all butt joints and trim annually — DFW heat expansion opens gaps constantly.' },
            { icon: '🌡️', title: 'Vinyl — Watch for Heat Warping', body: 'DFW summer heat (110°F+ surface temps) warps dark-colored vinyl siding. Power wash annually. Never paint vinyl — DFW heat causes painted vinyl to buckle. Replace individual warped panels before they pull adjacent panels loose.' },
            { icon: '🪵', title: 'Wood — Highest Maintenance in DFW', body: 'Wood siding requires painting every 4–5 years in DFW UV (not 7–10 as labeled). Caulk every joint twice yearly. DFW\’s wet spring + dry summer causes wood to swell and shrink more than most climates. Rot spreads faster in spring moisture — inspect after storm season.' },
            { icon: '🏚️', title: 'Stucco — Crack-Prone in DFW Cycles', body: 'Stucco cracks in DFW from thermal expansion and clay soil movement. Expect hairline cracks annually. Seal immediately with elastomeric caulk — water intrusion behind stucco causes mold and structural damage fast in DFW humidity. Use elastomeric paint for repaint (not standard latex).' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Siding Maintenance Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Siding Type', state: sidingType, set: setSidingType, opts: sidingTypes, isSelect: true },
              { label: 'Siding Age (Years)', state: sidingAge, set: setSidingAge, isSelect: false, ph: 'e.g. 18′ },
              { label: 'Current Condition', state: condition, set: setCondition, opts: conditionOptions, isSelect: true },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>{f.label}</label>
                {f.isSelect ? (
                  <select value={f.state} onChange={e => f.set(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                    <option value="">Select...</option>
                    {f.opts!.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={f.state} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }} />
                )}
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Maintenance Schedule + Decision
          </button>
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {[
                { label: '📋 Maintenance Schedule', value: result.schedule },
                { label: '💰 Cost Estimate', value: result.cost },
                { label: '🔧 Maintain vs Replace', value: result.replace },
              ].map(r => (
                <div key={r.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 14, color: '#E2E8F0′ }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
