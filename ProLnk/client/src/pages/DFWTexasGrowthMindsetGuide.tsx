import { useState } from 'react';

type Goal = 'invest' | 'comfort' | 'resale';

function getRecommendation(value: number, years: number, goal: Goal): { headline: string; actions: string[]; insight: string } {
  if (goal === 'invest') {
    if (years < 3) return {
      headline: 'Build Equity Fast — Strategic Upgrades Only',
      actions: ['Foundation inspection now — DFW clay soil is brutal on new owners', 'Kitchen upgrade ROI is 85%+ in DFW market — prioritize if dated', 'Curb appeal matters in DFW — landscaping returns 100% in this market', 'Do NOT over-improve for neighborhood — cap gains limited by comps'],
      insight: 'DFW appreciates 7-12% annually. Every dollar in strategic upgrades compounds.'
    };
    return {
      headline: 'You Have Equity — Now Leverage It',
      actions: ['HELOC at 80% LTV to fund next investment property', 'Finish any deferred maintenance before refinancing', 'ADU or casita if lot allows — DFW rental demand is explosive', 'Upgrade HVAC — buyers pay premium for new systems in Texas heat'],
      insight: `After ${years} years in DFW, your equity is your next down payment. Use it.`
    };
  }
  if (goal === 'comfort') {
    return {
      headline: 'Invest in Daily Life Quality — DFW Lifestyle Upgrades',
      actions: ['Outdoor covered patio — extends your living space 7+ months/year in DFW', 'Pool or hot tub — transforms DFW summer entertainment', 'Home office if remote work — DFW traffic makes WFH valuable', 'Smart HVAC — Texas electric bills are the #1 comfort complaint'],
      insight: 'DFW homes are lived in hard. Invest in what makes daily life better — you\’ll recoup it at sale.'
    };
  }
  if (value < 400000) return {
    headline: 'Entry-Level DFW: Maximize Before You Move Up',
    actions: ['Kitchen and bath updates — highest ROI in this price range', 'Fresh exterior paint and landscaping — DFW buyers judge curb appeal hard', 'Replace flooring if dated — buyers discount heavily for old carpet', 'Stage the home before listing — DFW buyers expect move-in ready'],
    insight: 'Entry DFW homes move fast. Clean, updated, and priced right beats over-improved.'
  };
  return {
    headline: 'Premium DFW: Buyers Expect It All',
    actions: ['Outdoor kitchen and pool are expected at this price point', 'High-end finishes throughout — DFW luxury buyers are educated', 'Smart home integration — standard in $600K+ DFW market', 'Professional staging required — photos sell DFW homes in 72 hours'],
    insight: 'At this price, DFW buyers want move-in luxury. Under-improving kills your price.'
  };
}

export default function DFWTexasGrowthMindsetGuide() {
  const [valueStr, setValueStr] = useState('');
  const [yearsStr, setYearsStr] = useState('');
  const [goal, setGoal] = useState<Goal | ''>('');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  function generate() {
    const value = parseInt(valueStr.replace(/[^0-9]/g, ''));
    const years = parseInt(yearsStr);
    if (!value || !years || !goal) return;
    setResult(getRecommendation(value, years, goal));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>📈 DFW Growth Mindset Home Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 16 }}>
          DFW homeowners who win treat their home as both shelter AND investment. Here's your strategic playbook.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Home value estimate</label>
              <input value={valueStr} onChange={e => setValueStr(e.target.value)} placeholder="e.g. 450000″ style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 8 }}>Years owned</label>
              <input value={yearsStr} onChange={e => setYearsStr(e.target.value)} placeholder="e.g. 4″ type="number" style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 14, display: 'block', marginBottom: 10 }}>Primary goal</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {([['invest', '💰 Build Wealth'], ['comfort', '🛋️ Quality of Life'], ['resale', '🏷️ Maximize Resale']] as [Goal, string][]).map(([g, label]) => (
                <button key={g} onClick={() => setGoal(g)} style={{ flex: 1, background: goal === g ? '#F5E642′ : '#0A1628', color: goal === g ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 6px', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>{label}</button>
              ))}
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get My DFW Strategy 📊
          </button>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{result.headline}</div>
            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 20, fontStyle: 'italic' }}>{result.insight}</div>
            {result.actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span>
                <span style={{ color: '#e2e8f0', fontSize: 15 }}>{a}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🎯 DFW Market Truths</div>
          {['DFW appreciates 7-12%/year — strategic upgrades compound this', 'Move vs improve: if neighbors are capped, move up', 'Deferred maintenance destroys DFW resale — buyers discount 3x the fix cost', 'Foundation health is the most important asset in DFW — clay soil is relentless'].map((t, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 16, borderLeft: '2px solid #F5E642′ }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
