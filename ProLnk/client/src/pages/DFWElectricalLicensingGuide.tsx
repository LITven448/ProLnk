import { useState } from 'react';

const pathway = [
  { level: 'Apprentice', hours: 0, examCost: 0, licenseCost: 0, income: [28000, 40000], description: 'Entry level. Must work under licensed electrician. No independent work.' },
  { level: 'Journeyman Electrician', hours: 8000, examCost: 75, licenseCost: 79, income: [52000, 72000], description: '8,000 work hours under a master. Pass TDLR written exam. Can work independently on most jobs.' },
  { level: 'Master Electrician', hours: 12000, examCost: 100, licenseCost: 100, income: [78000, 120000], description: '12,000+ hours + 4 years journeyman. Full independent contracting and pulling permits.' },
  { level: 'Electrical Contractor (EC)', hours: 0, examCost: 150, licenseCost: 400, income: [100000, 180000], description: 'Business license to own and operate electrical contracting company. Requires a master on staff.' },
];

const dfwDemand = [
  { stat: '12,000+', label: 'Annual DFW residential permits' },
  { stat: '23%', label: 'Projected growth 2024-2034' },
  { stat: '$34/hr', label: 'Avg journeyman rate DFW' },
  { stat: '4,200', label: 'Open electrical jobs DFW (2024)' },
];

export default function DFWElectricalLicensingGuide() {
  const [currentLevel, setCurrentLevel] = useState('');
  const [currentHours, setCurrentHours] = useState('');
  const [result, setResult] = useState<null | { yearsToNext: number; nextLevel: string; examPrep: string; incomeRange: string }>(null);

  function calculate() {
    const hours = parseInt(currentHours) || 0;
    if (currentLevel === 'Apprentice') {
      const remaining = Math.max(0, 8000 - hours);
      const years = Math.ceil(remaining / 2000);
      setResult({ yearsToNext: years, nextLevel: 'Journeyman Electrician', examPrep: 'Study NEC 2023 + TDLR Texas Electrical Safety Law. PrepMaster or Mike Holt materials recommended.', incomeRange: '$52,000 – $72,000/yr' });
    } else if (currentLevel === 'Journeyman Electrician') {
      const remaining = Math.max(0, 12000 - hours);
      const years = Math.ceil(remaining / 2000);
      setResult({ yearsToNext: years, nextLevel: 'Master Electrician', examPrep: 'Advanced NEC, load calculations, service entry. Exam is 100 questions, 4 hours. Pass rate ~55%.', incomeRange: '$78,000 – $120,000/yr' });
    } else if (currentLevel === 'Master Electrician') {
      setResult({ yearsToNext: 0, nextLevel: 'Electrical Contractor', examPrep: 'Business law, liability, bonding requirements. $400 contractor license + $10,000 bond minimum.', incomeRange: '$100,000 – $180,000/yr' });
    } else {
      setResult(null);
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK CONTRACTOR GUIDES — DFW ELECTRICAL</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1 }}>Texas Electrical Licensing Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: '0 0 40px' }}>Apprentice to Master Electrician — every step, exam, and income milestone for DFW.</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>⚡ DFW Market Demand</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {dfwDemand.map((d, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 10, padding: '20px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{d.stat}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{d.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🪜 Licensing Pathway</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {pathway.map((p, i) => (
              <div key={i} style={{ background: '#131f35', borderRadius: 10, padding: '18px 20px', border: '1px solid #1e3a5f', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 18, right: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 12, padding: '3px 10px', borderRadius: 20 }}>
                  Level {i + 1}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{p.level}</div>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: '0 0 12px' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {p.hours > 0 && <div style={{ fontSize: 13 }}><span style={{ color: '#64748b' }}>Hours req'd: </span><span style={{ color: '#fff', fontWeight: 600 }}>{p.hours.toLocaleString()}</span></div>}
                  {p.examCost > 0 && <div style={{ fontSize: 13 }}><span style={{ color: '#64748b' }}>Exam: </span><span style={{ color: '#fff', fontWeight: 600 }}>${p.examCost}</span></div>}
                  {p.licenseCost > 0 && <div style={{ fontSize: 13 }}><span style={{ color: '#64748b' }}>License fee: </span><span style={{ color: '#fff', fontWeight: 600 }}>${p.licenseCost}</span></div>}
                  <div style={{ fontSize: 13 }}><span style={{ color: '#64748b' }}>Income: </span><span style={{ color: '#4ade80', fontWeight: 600 }}>${p.income[0].toLocaleString()} – ${p.income[1].toLocaleString()}/yr</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#131f35', borderRadius: 14, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Your Progress Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current license level</label>
              <select value={currentLevel} onChange={e => setCurrentLevel(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select your level</option>
                {pathway.slice(0, 3).map(p => <option key={p.level} value={p.level}>{p.level}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Hours worked under license (approx)</label>
              <input type="number" value={currentHours} onChange={e => setCurrentHours(e.target.value)} placeholder="e.g. 4500"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>
            Calculate My Path →
          </button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 10, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 12 }}>Next Level: {result.nextLevel}</div>
              {result.yearsToNext > 0 && <div style={{ color: '#60a5fa', marginBottom: 8 }}>⏱️ Approx. {result.yearsToNext} year{result.yearsToNext !== 1 ? 's' : ''} at full-time hours</div>}
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>📚 {result.examPrep}</div>
              <div style={{ color: '#4ade80', fontWeight: 700 }}>💰 Target income: {result.incomeRange}</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
