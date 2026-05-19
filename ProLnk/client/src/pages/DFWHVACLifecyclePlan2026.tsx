import { useState } from 'react';

export default function DFWHVACLifecyclePlan2026() {
  const [age, setAge] = useState<number | null>(null);

  const getStage = (a: number) => {
    if (a <= 5) return 'early';
    if (a <= 10) return 'mid';
    if (a <= 15) return 'late';
    return 'replace';
  };

  const stages: Record<string, { label: string; color: string; icon: string; actions: string[]; budget: string; prolnk: string }> = {
    early: {
      label: 'Years 1–5: Maintain & Monitor', color: '#22c55e', icon: '✅',
      actions: [
        'Replace 1-inch filters every 30 days (DFW dust, pollen, cottonwood)',
        'Schedule annual tune-up in April before DFW cooling season',
        'Clean outdoor condenser coil annually (hose down fins)',
        'Verify refrigerant charge is correct at tune-up',
        'Document install date, brand, model, SEER rating for your Home Health Vault',
      ],
      budget: '$150–300/yr',
      prolnk: 'ProLnk can schedule your annual tune-up with a vetted Charter HVAC pro — locked-in pricing, no upsell pressure.',
    },
    mid: {
      label: 'Years 5–10: Service & Watch Efficiency', color: '#F5E642', icon: '👀',
      actions: [
        'Continue bi-annual service (spring + fall check)',
        'Track utility bills vs. baseline — 10%+ increase signals efficiency loss',
        'Inspect ductwork for leaks (DFW attics reach 140°F — duct tape fails)',
        'Test static pressure — original install may have been undersized',
        'Begin researching replacement options (SEER2 requirements changed in 2023)',
      ],
      budget: '$300–600/yr',
      prolnk: 'ProLnk tracks your system age and flags when efficiency metrics suggest replacement ROI makes sense.',
    },
    late: {
      label: 'Years 10–15: Budget & Prepare', color: '#f97316', icon: '⚠️',
      actions: [
        'Get replacement quotes NOW — before emergency forces rushed decisions',
        'Consider hybrid system (heat pump + gas backup) for DFW climate',
        'Ask about Oncor rebates ($250–500 for high-SEER installs)',
        'Check if R-22 refrigerant phaseout affects your system (pre-2010 units)',
        'Budget $5,000–12,000 for full system replacement + ductwork inspection',
      ],
      budget: '$400–800/yr + replacement reserve',
      prolnk: 'ProLnk matches you with DFW HVAC pros who provide honest replacement vs. repair analysis — no upsell.',
    },
    replace: {
      label: '15+ Years: Replace Proactively', color: '#ef4444', icon: '🔴',
      actions: [
        'Do NOT wait for a summer emergency breakdown — replace now while you have time to compare quotes',
        'DFW average summer replacement wait times: 3–14 days during peak season',
        'New 18+ SEER2 system saves $600–1,200/yr vs a 10-SEER 2006 unit',
        'Pair replacement with attic insulation and duct sealing for maximum savings',
        'Consider a 10-year parts + 1-year labor warranty — insist on it in DFW heat',
      ],
      budget: '$7,000–14,000 installed (system + labor)',
      prolnk: 'ProLnk Charter pros offer transparent replacement pricing — see equipment cost, labor, and markup before you sign.',
    },
  };

  const stageName = age !== null ? getStage(age) : null;
  const stage = stageName ? stages[stageName] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW HVAC Lifecycle Planning Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>A 20-year plan for managing your HVAC system in the Dallas–Fort Worth climate</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 32 }}>
          {Object.entries(stages).map(([key, s]) => (
            <div key={key} style={{ background: '#1e2d45', borderRadius: 10, padding: 12, textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ color: s.color, fontSize: 11, fontWeight: 700, marginTop: 4 }}>
                {key === 'early' ? '1–5 yrs' : key === 'mid' ? '5–10 yrs' : key === 'late' ? '10–15 yrs' : '15+ yrs'}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>How old is your HVAC system?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 32 }}>
          {[1, 3, 5, 8, 10, 12, 15, 17, 20, 25].map(yr => (
            <button key={yr} onClick={() => setAge(age === yr ? null : yr)}
              style={{ background: age === yr ? '#F5E642′ : '#1e2d45', border: '2px solid',
                borderColor: age === yr ? '#F5E642′ : '#2d3f5a', borderRadius: 8,
                padding: '12px 4px', cursor: 'pointer', color: age === yr ? '#0A1628′ : '#fff',
                fontWeight: 700, fontSize: 15 }}>{yr} yr{yr === 1 ? '' : 's'}</button>
          ))}
        </div>

        {stage && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ borderLeft: `4px solid ${stage.color}`, paddingLeft: 16, marginBottom: 16 }}>
              <h3 style={{ color: stage.color, marginTop: 0, fontSize: 18 }}>{stage.icon} {stage.label}</h3>
              <div style={{ background: '#1e2d45', borderRadius: 8, padding: '8px 14px', display: 'inline-block' }}>
                <span style={{ color: '#64748b', fontSize: 12 }}>Annual Budget: </span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{stage.budget}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stage.actions.map((a, i) => (
                <div key={i} style={{ background: '#1e2d45', borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: stage.color, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{a}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: '#1e2d45', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>🔗 {stage.prolnk}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk tracks your HVAC lifecycle inside your Home Health Vault — never miss a tune-up or a replacement window.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Your home's mechanical history, stored permanently, with proactive alerts when service is due.</p>
        </div>
      </div>
    </div>
  );
}
