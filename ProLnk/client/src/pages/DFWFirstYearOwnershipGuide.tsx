import { useState } from 'react';

const homeAges = ['0–5 years', '6–15 years', '16–30 years', '31+ years'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type Task = { task: string; why: string; ages?: string[] };

const monthlyBase: Record<number, Task[]> = {
  1: [
    { task: 'Submit all warranty claims with builder or sellers', why: 'Most warranties require claims within 30–90 days' },
    { task: 'Change HVAC filter and set a quarterly reminder', why: 'DFW dust and pollen clog filters fast — $10 filter saves $500 repair' },
    { task: 'Set up auto-pay for mortgage, HOA, and utilities', why: 'Late payments in first months hurt your credit and relationships' },
  ],
  3: [
    { task: 'Schedule first HVAC service (before summer heat)', why: 'DFW summer starts in April — get ahead of it before demand surges' },
    { task: 'Test all sprinkler zones and adjust for spring', why: 'Stage restrictions in DFW go into effect spring — know your schedule' },
    { task: 'Inspect attic insulation and ventilation', why: 'Inadequate insulation is a top DFW energy bill cause' },
  ],
  6: [
    { task: 'Mid-year home systems check: water heater, HVAC, appliances', why: 'Catch issues before they become emergency repairs in DFW heat' },
    { task: 'Check foundation for new cracks after spring rains', why: 'DFW clay soil shifts dramatically — early detection = lower repair cost' },
    { task: 'Review homeowners insurance for accuracy and gaps', why: 'Hail season is spring/fall — confirm your DFW hail coverage is adequate' },
  ],
  12: [
    { task: 'Annual HVAC service before winter', why: 'DFW gets freezes — prepare before the first cold snap' },
    { task: 'Drain and winterize outdoor hose bibs if freeze expected', why: 'DFW freeze events cause thousands in burst pipe claims annually' },
    { task: 'File homestead exemption with county appraisal district', why: 'Deadline is April 30 — this reduces your property taxes permanently' },
    { task: 'Review all home warranties expiring this year', why: 'Builder warranties often end at year 1 or year 10 — document open items' },
    { task: 'Compile all receipts for capital improvements for taxes', why: 'Increases cost basis when you sell — reduces capital gains tax' },
  ],
};

const ageSpecific: Record<string, Record<number, Task[]>> = {
  '0–5 years': {
    1: [{ task: 'Register all builder warranties and appliance warranties', why: 'Many DFW builders have tiered warranties — register or lose coverage' }],
    12: [{ task: 'Builder structural warranty year-1 walkthrough', why: 'Document all settlement issues before year-1 deadline' }],
  },
  '16–30 years': {
    3: [{ task: 'Have foundation specialist evaluate any cracks noted in inspection', why: 'Spring rain is the best time to assess DFW slab movement' }],
    6: [{ task: 'Check polybutylene pipes if home is pre-1995', why: 'Poly pipes fail without warning — DFW homes often still have them' }],
  },
  '31+ years': {
    1: [{ task: 'Get electrical panel inspected if not done at inspection', why: 'FPE and Zinsco panels are fire hazards — replace before use' }],
    6: [{ task: 'Camera-inspect main drain line for root intrusion', why: 'Mature trees in older DFW neighborhoods aggressively invade cast iron' }],
  },
};

export default function DFWFirstYearOwnershipGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [purchaseMonth, setPurchaseMonth] = useState<number | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (task: string) =>
    setChecked(prev => prev.includes(task) ? prev.filter(x => x !== task) : [...prev, task]);

  const milestones = [1, 3, 6, 12];

  const getMonthLabel = (offset: number) => {
    if (purchaseMonth === null) return `Month ${offset}`;
    const idx = (purchaseMonth - 1 + offset - 1) % 12;
    return months[idx];
  };

  const getTasks = (monthOffset: number): Task[] => {
    const base = monthlyBase[monthOffset] ?? [];
    const extras = homeAge ? (ageSpecific[homeAge]?.[monthOffset] ?? []) : [];
    return [...base, ...extras];
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>DFW FIRST YEAR OWNERSHIP GUIDE</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>📅 Your 12-Month Homeowner Calendar</h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0' }}>Month-by-month priorities personalized for your DFW home.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🏠 Home Age</div>
            {homeAges.map(a => (
              <button key={a} onClick={() => setHomeAge(a === homeAge ? '' : a)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: homeAge === a ? '2px solid #F5E642' : '1px solid #e2e8f0', background: homeAge === a ? '#0A1628' : '#F9FAFB', color: homeAge === a ? '#F5E642' : '#0A1628', fontWeight: homeAge === a ? 700 : 400, cursor: 'pointer', fontSize: 14, marginBottom: 6 }}>
                {a}
              </button>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>📅 Month You Purchased</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {months.map((m, i) => (
                <button key={m} onClick={() => setPurchaseMonth(purchaseMonth === i + 1 ? null : i + 1)} style={{ padding: '6px 10px', borderRadius: 8, border: purchaseMonth === i + 1 ? '2px solid #F5E642' : '1px solid #e2e8f0', background: purchaseMonth === i + 1 ? '#0A1628' : '#F9FAFB', color: purchaseMonth === i + 1 ? '#F5E642' : '#0A1628', fontWeight: purchaseMonth === i + 1 ? 700 : 400, cursor: 'pointer', fontSize: 13 }}>
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {milestones.map(offset => {
          const tasks = getTasks(offset);
          const doneCount = tasks.filter(t => checked.includes(t.task)).length;
          return (
            <div key={offset} style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {offset === 1 && '🚀 '}
                  {offset === 3 && '🌱 '}
                  {offset === 6 && '☀️ '}
                  {offset === 12 && '🎉 '}
                  {offset === 1 ? 'Month 1' : `Month ${offset}`}
                  {purchaseMonth && <span style={{ fontWeight: 400, color: '#64748b', fontSize: 14 }}> — {getMonthLabel(offset)}</span>}
                </div>
                <div style={{ background: doneCount === tasks.length && tasks.length > 0 ? '#dcfce7' : '#f1f5f9', color: doneCount === tasks.length && tasks.length > 0 ? '#16a34a' : '#475569', fontSize: 13, fontWeight: 600, padding: '3px 10px', borderRadius: 12 }}>
                  {doneCount}/{tasks.length}
                </div>
              </div>
              {tasks.map(t => (
                <label key={t.task} style={{ display: 'flex', gap: 12, marginBottom: 12, cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" checked={checked.includes(t.task)} onChange={() => toggle(t.task)} style={{ marginTop: 3, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: checked.includes(t.task) ? 400 : 600, color: checked.includes(t.task) ? '#94a3b8' : '#0A1628', textDecoration: checked.includes(t.task) ? 'line-through' : 'none' }}>{t.task}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>💡 {t.why}</div>
                  </div>
                </label>
              ))}
            </div>
          );
        })}

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🏡 PROLNK TIP</div>
          <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.6 }}>
            Need a trusted plumber, HVAC tech, or roofer for year-one maintenance? ProLnk connects DFW homeowners with vetted local professionals — no cold calls, no guessing.
          </div>
        </div>
      </div>
    </div>
  );
}
