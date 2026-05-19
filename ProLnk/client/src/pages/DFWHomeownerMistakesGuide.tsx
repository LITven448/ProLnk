import { useState } from 'react';

const MISTAKES_BY_STAGE: Record<string, { title: string; detail: string; fix: string }[]> = {
  '0-1': [
    { title: 'Skipping foundation watering', detail: 'DFW clay soil shrinks in summer — cracks appear fast.', fix: 'Set a soaker hose on a timer 3-4 feet from foundation, run 30 min/day in summer.' },
    { title: 'Ignoring the first pest inspection', detail: 'Termites and roaches are common in DFW within year one.', fix: 'Schedule a pest inspection at move-in and set up quarterly treatment.' },
    { title: 'Not changing HVAC filters monthly in summer', detail: 'DFW summers run your AC 24/7 — filters clog in weeks.', fix: 'Buy a 12-pack of 1" filters. Set a phone reminder for the 1st of each month May-Sep.' },
  ],
  '1-3': [
    { title: 'Using wrong caulk in wet areas', detail: 'Latex caulk fails in DFW humidity — mold follows fast.', fix: 'Use 100% silicone for showers, tubs, and sink edges. Check annually.' },
    { title: 'Ignoring a slow drain', detail: 'DFW hard water causes fast mineral buildup — slow drains become full blockages.', fix: 'Use a drain snake quarterly. If slow drain persists 2+ weeks, call a plumber.' },
    { title: 'Overwatering foundation and damaging wood', detail: 'Too much foundation water draws moisture into sill plates.', fix: 'Water evenly around perimeter, not pooling. 30-45 min on soaker hose is enough.' },
  ],
  '3-7': [
    { title: 'DIY electrical without permits', detail: 'DFW inspectors pull permits during sales — unpermitted work kills deals.', fix: 'Always pull permits for electrical. Cost is $100-200 and protects resale value.' },
    { title: 'Skipping HVAC replacement until failure', detail: 'DFW units last 10-15 years — failure in July means emergency pricing.', fix: 'Plan HVAC replacement at 12 years, before emergency. Get quotes in winter when prices are lower.' },
    { title: 'Letting gutters go multiple years', detail: 'DFW storms drop debris fast — clogged gutters send water into fascia boards.', fix: 'Clean gutters twice a year: spring and fall. Add gutter guards if you have large trees.' },
  ],
  '7+': [
    { title: 'Ignoring water heater age', detail: 'DFW hard water destroys water heaters in 8-10 years. Failure means flooding.', fix: 'Check install date on the unit. Replace proactively at year 10. Add a drip pan.' },
    { title: 'Not re-grading soil away from foundation', detail: 'Years of watering shifts soil — water starts flowing toward house instead of away.', fix: 'Check that soil slopes 6" downward over 10 feet away from foundation.' },
    { title: 'Deferred tree trimming near roof', detail: 'DFW storms bring down limbs — overhanging trees are insurance claims waiting to happen.', fix: 'Trim any branch within 10 feet of roof. Budget $300-600/year for large-tree homes.' },
  ],
};

export default function DFWHomeownerMistakesGuide() {
  const [years, setYears] = useState('0-1');
  const [submitted, setSubmitted] = useState(false);

  const mistakes = MISTAKES_BY_STAGE[years] || [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          ⚠️ DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Top Mistakes DFW Homeowners Make</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          From skipping foundation watering to DIY electrical — different ownership stages bring different pitfalls. Find yours.
        </p>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📅 How long have you owned your DFW home?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {Object.keys(MISTAKES_BY_STAGE).map(stage => (
              <label key={stage} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '0.75rem 1rem', borderRadius: 8, background: years === stage ? '#1e3a5f' : '#162035', border: `2px solid ${years === stage ? '#F5E642' : '#334155'}` }}>
                <input type="radio" name="years" value={stage} checked={years === stage} onChange={() => setYears(stage)} style={{ accentColor: '#F5E642' }} />
                <span style={{ fontWeight: years === stage ? 700 : 400 }}>
                  {stage === '0-1' ? '🆕 Less than 1 year' : stage === '1-3' ? '🌱 1–3 years' : stage === '3-7' ? '🏡 3–7 years' : '🏆 7+ years'}
                </span>
              </label>
            ))}
            <button onClick={() => setSubmitted(true)}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 15, marginTop: 4 }}>
              🔍 Show My Stage Mistakes
            </button>
          </div>
        </div>

        {submitted && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Most Common Mistakes at Your Stage</h2>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Ownership stage: {years === '0-1' ? 'First year' : years === '1-3' ? 'Years 1–3' : years === '3-7' ? 'Years 3–7' : 'Year 7+'}</p>
            {mistakes.map((m, i) => (
              <div key={i} style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', marginBottom: 14, borderLeft: '4px solid #ef4444' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🚫 Mistake {i + 1}: {m.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>{m.detail}</div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', fontSize: 13, borderLeft: '3px solid #4ade80' }}>
                  <span style={{ color: '#4ade80', fontWeight: 700 }}>✅ How to avoid: </span>{m.fix}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Avoid costly mistakes with vetted DFW pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>ProLnk connects you to licensed professionals who know DFW's unique challenges.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Find a Pro on ProLnk →
          </button>
        </div>
      </div>
    </div>
  );
}
