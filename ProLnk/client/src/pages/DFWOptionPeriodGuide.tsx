import { useState } from 'react';

const offerPrices = [
  { id: 'under400', label: 'Under $400K' },
  { id: '400to600', label: '$400K–$600K' },
  { id: '600to800', label: '$600K–$800K' },
  { id: 'over800', label: 'Over $800K' },
];

const findings = [
  { id: 'none', label: 'No Issues Found' },
  { id: 'minor', label: 'Minor Items Only' },
  { id: 'moderate', label: 'Moderate — HVAC, Roof, Plumbing' },
  { id: 'major', label: 'Major Structural or Safety Issues' },
];

function getStrategy(price: string, finding: string) {
  if (finding === 'none') return { action: 'Proceed to closing', savings: '$0', note: 'Clean inspection — no leverage needed. Consider waiving repair requests to strengthen goodwill.' };
  if (finding === 'minor') return { action: 'Request repair credit', savings: '$500–$3,000', note: 'Minor items rarely justify full renegotiation. Ask for closing cost credit instead of repairs.' };
  if (finding === 'moderate') {
    const amt = price === 'under400′ ? '$5,000–$12,000' : price === '400to600' ? '$8,000–$18,000' : '$12,000–$25,000';
    return { action: 'Negotiate price reduction or repair credit', savings: amt, note: 'Get contractor bids during option period. Use documented estimates as negotiation leverage.' };
  }
  return { action: 'Terminate or renegotiate significantly', savings: 'Varies — potentially $30,000+', note: 'Major structural issues in DFW often justify termination. You lose only the option fee ($100–$300 typical). Keep your earnest money.' };
}

export default function DFWOptionPeriodGuide() {
  const [price, setPrice] = useState('');
  const [finding, setFinding] = useState('');
  const [showResult, setShowResult] = useState(false);
  const result = price && finding ? getStrategy(price, finding) : null;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 14px', borderRadius: 4, fontSize: 13, marginBottom: 16 }}>
          🏠 TEXAS OPTION PERIOD
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>The Texas Option Period — Your Safety Net</h1>
        <p style={{ fontSize: 17, color: '#555', marginBottom: 36 }}>
          Texas is one of the few states with a formal option period built into residential contracts. Understanding it could save you tens of thousands of dollars.
        </p>
        <div style={{ background: '#fff', border: '2px solid #0A1628', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 What Is the Option Period?</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
            <li>A <strong>7 to 10 day period</strong> after contract execution where you can walk away for any reason</li>
            <li>You pay a small <strong>option fee</strong> ($100–$300 typical in DFW) for this right — non-refundable</li>
            <li>If you terminate during the option period, <strong>you keep your earnest money</strong></li>
            <li>If you terminate after the option period expires, you may <strong>forfeit your earnest money</strong></li>
            <li>Option fee is typically applied toward closing costs if you proceed</li>
          </ul>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#0A1628′ }}>💰 Option Fee</h3>
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: 14 }}>Typically $100–$300 in DFW. Non-refundable regardless of outcome. Buys you the right to terminate for any reason during the option period. Negotiate this amount — it can go higher in competitive markets.</p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: '#0A1628′ }}>🏦 Earnest Money</h3>
            <p style={{ color: '#444', lineHeight: 1.7, fontSize: 14 }}>Typically $2,000–$10,000+ in DFW. Held by title company. Protected during option period — if you terminate before expiration, you get it back. At risk after option period expires.</p>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Using the Option Period Effectively</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: '1', title: 'Schedule inspection immediately', desc: 'Book your inspector the day you go under contract — good inspectors in DFW book fast' },
              { step: '2', title: 'Get specialist inspections if needed', desc: 'Foundation, HVAC, roof, and sewer line specialists — DFW foundation issues are common due to clay soil' },
              { step: '3', title: 'Get contractor bids on issues found', desc: 'Turn inspection findings into dollar figures — this is your negotiation ammunition' },
              { step: '4', title: 'Renegotiate or terminate by deadline', desc: 'Your agent submits amendment or termination notice before the option period expires — do not miss this deadline' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{item.step}</div>
                <div><strong>{item.title}</strong><br /><span style={{ color: '#555', fontSize: 14 }}>{item.desc}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, marginBottom: 28, color: '#fff' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Negotiation Strategy Calculator</h2>
          <p style={{ color: '#ccc', marginBottom: 20 }}>Offer price plus inspection findings → negotiation strategy and potential savings</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Offer Price Range</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {offerPrices.map(p => (
                <button key={p.id} onClick={() => { setPrice(p.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: price === p.id ? '#F5E642′ : '#444', background: price === p.id ? '#F5E642' : ’transparent', color: price === p.id ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 10 }}>Inspection Findings</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {findings.map(f => (
                <button key={f.id} onClick={() => { setFinding(f.id); setShowResult(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: finding === f.id ? '#F5E642′ : '#444', background: finding === f.id ? '#F5E642' : ’transparent', color: finding === f.id ? '#0A1628′ : '#fff', fontWeight: 600, cursor: ’pointer' }}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!price || !finding}
            style={{ background: price && finding ? '#F5E642′ : '#333', color: '#0A1628', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: price && finding ? 'pointer' : 'not-allowed', fontSize: 16 }}>
            Get My Strategy →
          </button>
          {showResult && result && (
            <div style={{ marginTop: 24, background: 'rgba(245,230,66,0.1)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 10, padding: 20 }}>
              <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Recommended Action: </span>{result.action}</div>
              <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Potential Savings: </span>{result.savings}</div>
              <div style={{ color: '#ccc', fontSize: 14 }}>💡 {result.note}</div>
            </div>
          )}
        </div>
        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚡ DFW-Specific Option Period Tips</h2>
          <ul style={{ paddingLeft: 20, lineHeight: 2, color: '#444′ }}>
            <li>DFW clay soil causes foundation movement — <strong>always get a foundation specialist</strong></li>
            <li>HVAC systems in DFW run hard — check age and service history every time</li>
            <li>Pool equipment inspection is separate — do not skip if the home has a pool</li>
            <li>Many DFW sellers accept price reductions over repair credits — ask your agent which they prefer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
