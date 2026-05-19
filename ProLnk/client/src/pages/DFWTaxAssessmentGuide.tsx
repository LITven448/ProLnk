import { useState } from 'react';

export default function DFWTaxAssessmentGuide() {
  const [assessed, setAssessed] = useState('380000');
  const [market, setMarket] = useState('420000');
  const [result, setResult] = useState<{ score: string; savings: number; worthIt: boolean } | null>(null);

  function calculate() {
    const a = parseInt(assessed.replace(/,/g, '')) || 380000;
    const m = parseInt(market.replace(/,/g, '')) || 420000;
    const gap = m - a;
    const gapPct = ((m - a) / m) * 100;
    const taxRate = 0.0225;
    const savings = Math.round(gap * taxRate);
    let score = '';
    if (a > m * 1.05) score = 'Strong Case — Assessed above market';
    else if (a > m * 0.98) score = 'Very Likely Worth It — Assessed near or above market';
    else if (gapPct < 5) score = 'Borderline — Small gap, may not justify filing fee';
    else score = 'Assessed well below market — protest less likely to succeed';
    setResult({ score, savings: Math.max(0, savings), worthIt: a >= m * 0.97 });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '52px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>DFW PROPERTY TAX GUIDE</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          Understanding Your DFW Property Tax Assessment
        </h1>
        <p style={{ fontSize: 17, color: '#b0bdd4', lineHeight: 1.7, marginBottom: 40 }}>
          DCAD (Dallas CAD), TAD (Tarrant), CCAD (Collin), and DCAD (Denton) all use mass appraisal — a bulk process
          that often misses your home's individual characteristics. Here is how to fight back.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏛️', title: 'Mass Appraisal Methodology', desc: 'CADs appraise tens of thousands of homes using statistical models — not individual inspections. Your specific upgrades, issues, or lot quirks are often missed.' },
            { icon: '🔒', title: '10% Homestead Cap', desc: 'If you have a homestead exemption, your appraised value cannot rise more than 10% per year — even if the market surges 30%. This is a powerful shield.' },
            { icon: '📅', title: 'Key Dates', desc: 'Notices arrive April–May. Protest deadline is May 15 (or 30 days after notice). Mark your calendar — missing it costs you an entire year.' },
            { icon: '⚖️', title: 'Market vs. Appraised Value', desc: 'In Texas, appraisal districts target 100% of market value. If your neighbor sold for K and you are assessed at K, you likely have a case.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#12213A', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#8a9fc0', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#12213A', borderRadius: 14, padding: 32, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Protest Worthiness Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Your Assessed Value (CAD Notice)</label>
              <input type="text" value={assessed} onChange={e => setAssessed(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Your Estimated Market Value</label>
              <input type="text" value={market} onChange={e => setMarket(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Should I Protest?
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <p style={{ fontSize: 13, color: '#8a9fc0', marginBottom: 4 }}>Protest Assessment</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: result.worthIt ? '#F5E642′ : '#6af26a', marginBottom: 8 }}>{result.score}</p>
              {result.worthIt && result.savings > 0 && (
                <p style={{ fontSize: 15, color: '#b0bdd4′ }}>Estimated annual tax savings if successful: <strong style={{ color: '#F5E642' }}>{fmt(result.savings)}</strong></p>
              )}
              <p style={{ fontSize: 13, color: '#8a9fc0', marginTop: 8 }}>Filing is free and takes ~30 min online via your county CAD portal. Bring 3 comps pulled from the MLS within the past 6 months.</p>
            </div>
          )}
        </div>

        <div style={{ background: '#12213A', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 How to File a Protest</h2>
          <ol style={{ paddingLeft: 20, color: '#b0bdd4', lineHeight: 2.2, fontSize: 14 }}>
            <li>Go to your county CAD website (DCAD.org, TAD.org, CCAD.net, or DCAD.net for Denton)</li>
            <li>File online by May 15 — select "Value is Over Market Value"</li>
            <li>Gather 3–5 comparable sales from the MLS within 1 mile, 6 months, similar size</li>
            <li>Attend informal hearing (phone or in person) — most cases settle here</li>
            <li>If unsatisfied, proceed to ARB (Appraisal Review Board) formal hearing</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
