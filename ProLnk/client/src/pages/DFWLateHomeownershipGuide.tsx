import { useState } from 'react';

const considerations = [
  { icon: '🏗️', title: 'Deferred Maintenance Catching Up', detail: "Roofs (20-25 yr life), HVAC systems (15-20 yr), plumbing, and foundation issues cluster in years 15-30. Budget $8-15K/yr for aging home maintenance in DFW." },
  { icon: '💰', title: 'Equity Is Your Largest Asset', detail: "After 15-30 years, you likely hold $200K–$600K in equity depending on DFW appreciation timing. This isn't just retirement security — it's optionality." },
  { icon: '📉', title: 'Over-Housed Risk', detail: "Kids are gone, rooms sit empty, you're maintaining 3,000 sq ft for 2 people. In DFW, the carrying cost of an over-sized home runs $1,500–$3,500/mo in property tax + utilities alone." },
  { icon: '🏦', title: 'Tax Implications', detail: "Texas homestead exemption reduces your tax basis. Selling a DFW home after 30 years may trigger capital gains above the $250K/$500K exclusion — consult a CPA before listing." },
];

const financialOptions = [
  { option: 'Sell & Downsize', pros: ['Unlock $200K–$600K equity', 'Reduce monthly carrying cost', 'Simplify estate planning'], cons: ['Transaction costs 6-8%', 'Emotional disruption', 'DFW smaller homes still expensive'] },
  { option: 'Renovate & Age in Place', pros: ['No move disruption', 'Preserve community ties', 'Potential HELOC access'], cons: ['Renovation costs don\’t fully recoup', 'Still maintaining large home', 'Accessibility may require future work'] },
  { option: 'Reverse Mortgage', pros: ['Cash flow from equity', 'Stay in home', 'No monthly payments'], cons: ['Reduces estate inheritance', 'Costs and fees significant', 'Requires 62+ age and primary residence'] },
];

export default function DFWLateHomeownershipGuide() {
  const [yearsOwned, setYearsOwned] = useState('');
  const [homeEquity, setHomeEquity] = useState('');
  const [lifeStage, setLifeStage] = useState('');
  const [result, setResult] = useState<null | { title: string; detail: string }>(null);

  function analyze() {
    const yr = parseInt(yearsOwned) || 0;
    const eq = parseFloat(homeEquity) || 0;
    if (!yr || !eq || !lifeStage) return;
    if (lifeStage === 'empty_nester' && eq > 200000) {
      setResult({ title: '🔑 Sell & Downsize in DFW', detail: `With ${yr} years of ownership and $${Math.round(eq / 1000)}K in equity, downsizing unlocks a significant cash position. In DFW, 55+ communities in Frisco, Little Elm, and Denton offer lock-and-leave living at $350K–$500K — well below what you'll net from your sale. Monthly carrying cost drops $1,200–$2,500.` });
    } else if (lifeStage === 'aging_in_place' && yr >= 20) {
      setResult({ title: '🏠 Age-in-Place Renovation Plan', detail: `After ${yr} years in your DFW home, accessibility improvements are worth planning now. Grab bars, wider doorways, single-floor living, and step-free entry run $15K–$35K total — far cheaper than assisted living or a rushed relocation. A HELOC on your $${Math.round(eq / 1000)}K equity funds it easily.` });
    } else if (lifeStage === 'reverse_mortgage') {
      setResult({ title: '📋 Reverse Mortgage Basics for DFW', detail: `With $${Math.round(eq / 1000)}K in equity and ${yr} years of ownership, a reverse mortgage could provide $1,200–$3,500/mo in tax-free income while you remain in your DFW home. The key catch: the loan balance grows, reducing what your estate inherits. A HUD-approved counselor must walk you through this before you can proceed — it's required by law.` });
    } else {
      setResult({ title: '⚖️ Your Situation Is Balanced', detail: `With ${yr} years owned and $${Math.round(eq / 1000)}K in equity, you have real optionality. The critical question is your 5-year plan. If you expect to move within 5 years, don't pour renovation dollars into the home. If you'll stay 10+ years, maintain it proactively — deferred maintenance costs 3-5x more when you finally address it in DFW's contractor market.` });
    }
  }

  return (
    <div style={{ background: '#F8F6F0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 16px', borderRadius: 4, fontSize: 13, marginBottom: 20 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Late-Stage Homeownership<br />in DFW</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 40, lineHeight: 1.7 }}>You've owned your DFW home 15-30+ years. The equity is real, the maintenance is real, and the decision about what comes next is one of the most important financial moves of your life.</p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {considerations.map((c, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 24, display: 'flex', gap: 20 }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: '#0A1628′ }}>{c.title}</div>
                <div style={{ color: '#555', lineHeight: 1.7 }}>{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#0A1628', marginBottom: 20 }}>📋 Your Financial Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {financialOptions.map((o, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>{o.option}</div>
                <div style={{ marginBottom: 12 }}>
                  {o.pros.map((p, j) => <div key={j} style={{ color: '#22c55e', fontSize: 13, marginBottom: 4 }}>✓ {p}</div>)}
                </div>
                <div>
                  {o.cons.map((c, j) => <div key={j} style={{ color: '#ef4444', fontSize: 13, marginBottom: 4 }}>✗ {c}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '2px solid #F5E642', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, color: '#0A1628', marginBottom: 8 }}>🎯 Your DFW Late-Stage Analysis</h2>
          <p style={{ color: '#666', marginBottom: 24 }}>Tell us your situation and we'll give you a tailored recommendation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Years in This Home</label>
              <input value={yearsOwned} onChange={e => setYearsOwned(e.target.value)} placeholder="e.g. 22″ style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Estimated Home Equity ($)</label>
              <input value={homeEquity} onChange={e => setHomeEquity(e.target.value)} placeholder="e.g. 380000″ style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>My Life Stage Goal</label>
              <select value={lifeStage} onChange={e => setLifeStage(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}>
                <option value="">Select...</option>
                <option value="empty_nester">🪺 Empty nester, considering downsizing</option>
                <option value="aging_in_place">🏠 Want to age in place</option>
                <option value="reverse_mortgage">💳 Exploring reverse mortgage</option>
                <option value="unsure">🤔 Not sure yet</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get My Recommendation</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{result.title}</div>
              <div style={{ color: '#ccc', lineHeight: 1.7 }}>{result.detail}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
