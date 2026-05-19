import { useState } from 'react';

const pathway = [
  { level: "Plumber's Apprentice", years: 0, bond: 0, exam: false, income: [26000, 38000], description: "Must be registered with TSBPE. Work under a licensed plumber. No independent work permitted." },
  { level: 'Tradesman Plumber', years: 2, bond: 2500, exam: true, income: [38000, 54000], description: '2 years experience + written exam. Can perform basic plumbing tasks under journeyman supervision.' },
  { level: 'Journeyman Plumber', years: 4, bond: 5000, exam: true, income: [52000, 75000], description: '4 years total experience + 2 as tradesman. Independent plumbing work on most residential jobs.' },
  { level: 'Master Plumber', years: 8, bond: 10000, exam: true, income: [75000, 130000], description: '8 years total (4 as journeyman). Full licensing. Can pull permits, own business, supervise others.' },
];

const dfwOutlook = [
  { metric: '$68/hr', label: 'Avg master plumber billing rate' },
  { metric: '18%', label: 'DFW growth forecast 2025-2030' },
  { metric: '3,400', label: 'Open plumbing jobs DFW (2024)' },
  { metric: '62%', label: 'Jobs from ProLnk in DFW plumbing' },
];

export default function DFWPlumberLicensingGuide() {
  const [currentLevel, setCurrentLevel] = useState('');
  const [expYears, setExpYears] = useState('');
  const [result, setResult] = useState<null | { nextLevel: string; yearsLeft: number; examNote: string; bondReq: number; incomeRange: string }>(null);

  function calculate() {
    const years = parseFloat(expYears) || 0;
    const currentIdx = pathway.findIndex(p => p.level === currentLevel);
    if (currentIdx === -1) return;
    const next = pathway[currentIdx + 1];
    if (!next) {
      setResult({ nextLevel: 'You\’ve reached the top!', yearsLeft: 0, examNote: 'Consider PHCC membership and business licensing to maximize DFW revenue.', bondReq: 10000, incomeRange: '$75,000 – $130,000+/yr' });
      return;
    }
    const yearsLeft = Math.max(0, next.years - years);
    setResult({ nextLevel: next.level, yearsLeft, examNote: next.exam ? 'TSBPE written exam required. Schedule via tsbpe.texas.gov. ~65% first-pass rate.' : 'No exam required for this step.', bondReq: next.bond, incomeRange: `$${next.income[0].toLocaleString()} – $${next.income[1].toLocaleString()}/yr` });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK CONTRACTOR GUIDES — DFW PLUMBING</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1 }}>Texas Plumber Licensing Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: '0 0 40px' }}>Every TSBPE step, bond requirement, and income milestone — built for DFW plumbers.</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📈 DFW Market Outlook</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {dfwOutlook.map((d, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 10, padding: '20px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{d.metric}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{d.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔧 TSBPE Licensing Pathway</h2>
          <div style={{ position: 'relative' }}>
            {pathway.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 800, fontSize: 14 }}>{i + 1}</div>
                  {i < pathway.length - 1 && <div style={{ width: 2, flex: 1, background: '#1e3a5f', marginTop: 4 }} />}
                </div>
                <div style={{ flex: 1, background: '#131f35', borderRadius: 10, padding: '16px 18px', border: '1px solid #1e3a5f', marginBottom: i < pathway.length - 1 ? 8 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{p.level}</span>
                    <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 14 }}>${p.income[0].toLocaleString()} – ${p.income[1].toLocaleString()}/yr</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 10px' }}>{p.description}</p>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {p.years > 0 && <div style={{ fontSize: 12, color: '#60a5fa' }}>⏱️ {p.years} yrs experience</div>}
                    {p.bond > 0 && <div style={{ fontSize: 12, color: '#fbbf24' }}>🔒 ${p.bond.toLocaleString()} bond</div>}
                    {p.exam && <div style={{ fontSize: 12, color: '#f87171' }}>📝 Written exam required</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#131f35', borderRadius: 14, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🗺️ Your Timeline to Master Plumber</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current license level</label>
              <select value={currentLevel} onChange={e => setCurrentLevel(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select your level</option>
                {pathway.map(p => <option key={p.level} value={p.level}>{p.level}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Total years of plumbing experience</label>
              <input type="number" value={expYears} onChange={e => setExpYears(e.target.value)} placeholder="e.g. 3.5"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>
            Show My Next Steps →
          </button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 10, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 12 }}>{result.nextLevel}</div>
              {result.yearsLeft > 0 && <div style={{ color: '#60a5fa', marginBottom: 8 }}>⏱️ ~{result.yearsLeft} more year{result.yearsLeft !== 1 ? 's' : ''} of documented experience needed</div>}
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>📝 {result.examNote}</div>
              {result.bondReq > 0 && <div style={{ color: '#fbbf24', fontSize: 13, marginBottom: 8 }}>🔒 Bond requirement: ${result.bondReq.toLocaleString()}</div>}
              <div style={{ color: '#4ade80', fontWeight: 700 }}>💰 Target income: {result.incomeRange}</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
