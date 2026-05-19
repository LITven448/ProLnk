import { useState } from 'react';

const stages = [
  { status: 'No experience', yearsToJourneyman: 4, yearsToMaster: 7, currentHourly: 0, journeymanHourly: 28, masterHourly: 42 },
  { status: 'Apprentice (Year 1–2)', yearsToJourneyman: 3, yearsToMaster: 6, currentHourly: 18, journeymanHourly: 28, masterHourly: 42 },
  { status: 'Apprentice (Year 3–4)', yearsToJourneyman: 1, yearsToMaster: 4, currentHourly: 22, journeymanHourly: 28, masterHourly: 42 },
  { status: 'Journeyman Electrician', yearsToJourneyman: 0, yearsToMaster: 3, currentHourly: 28, journeymanHourly: 28, masterHourly: 42 },
  { status: 'Master Electrician', yearsToJourneyman: 0, yearsToMaster: 0, currentHourly: 42, journeymanHourly: 42, masterHourly: 55 },
];

const steps = [
  { icon: '📋', step: 'Get Hired as Apprentice', desc: 'Join a licensed electrical contractor. Hours must be logged under a licensed Master.' },
  { icon: '⏱️', step: 'Log 8,000 Work Hours', desc: 'Texas requires 8,000 verified on-the-job hours for Journeyman eligibility (roughly 4 years full-time).' },
  { icon: '📝', step: 'Pass Journeyman Exam', desc: 'Texas TDLR exam — 80 questions, NEC code-based, 70% to pass. $74 exam fee.' },
  { icon: '🏢', step: 'Work as Journeyman (3 years)', desc: 'Must work 3 additional years as a licensed Journeyman under a Master before Master exam.' },
  { icon: '🏆', step: 'Pass Master Electrician Exam', desc: 'More complex NEC application, business law, load calculations. $95 exam fee through TDLR.' },
  { icon: '📄', step: 'Get Master License + Bond', desc: 'Submit to TDLR with proof of exam, insurance, and background check. License valid 2 years.' },
];

export default function DFWMasterElectricianPathGuide() {
  const [currentStatus, setCurrentStatus] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [result, setResult] = useState<null | typeof stages[0]>(null);

  function calculate() {
    const stage = stages.find(s => s.status === currentStatus) || stages[0];
    setResult(stage);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Path to Master Electrician in Texas — DFW Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BB0CC', maxWidth: 640, margin: '0 auto' }}>
            From no experience to running your own electrical business—this is the exact path Texas requires.
            The journey takes 5–7 years, but Master Electricians in DFW are among the highest-paid tradespeople in the country.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '💵', label: 'Apprentice Start', val: '$18–22/hr in DFW' },
            { icon: '💵', label: 'Journeyman', val: '$26–32/hr in DFW' },
            { icon: '💰', label: 'Master Electrician', val: '$40–65/hr or own business' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#9BB0CC', fontSize: 13 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginTop: 4 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 20, fontSize: 20 }}>🗺️ The Texas Electrician Roadmap</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
                <div style={{ fontSize: 28, minWidth: 40 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{i + 1}. {s.step}</div>
                  <div style={{ color: '#9BB0CC', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📊 Where Are You Now?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Current Status</label>
              <select
                value={currentStatus}
                onChange={e => setCurrentStatus(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Select your status</option>
                {stages.map(s => <option key={s.status} value={s.status}>{s.status}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Verified Hours Logged</label>
              <input
                type="number"
                value={hoursWorked}
                onChange={e => setHoursWorked(e.target.value)}
                placeholder="e.g. 2400″
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >
            Show My Timeline →
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📅 Your Electrician Path</div>
              <div style={{ color: '#ccc', fontSize: 15, lineHeight: 1.8 }}>
                {result.yearsToJourneyman > 0 && <div>🎯 Years to Journeyman license: <strong>{result.yearsToJourneyman} yrs</strong></div>}
                {result.yearsToMaster > 0 && <div>🏆 Years to Master Electrician: <strong>{result.yearsToMaster} yrs</strong></div>}
                {result.currentHourly > 0 && <div>💵 Current expected wage: <strong>${result.currentHourly}/hr</strong></div>}
                <div>💵 Journeyman wage in DFW: <strong>${result.journeymanHourly}/hr (${(result.journeymanHourly * 2080).toLocaleString()}/yr)</strong></div>
                <div>💰 Master Electrician wage: <strong>${result.masterHourly}/hr or business owner income</strong></div>
                <div>🤝 ProLnk benefit: <strong>Master Electricians get Elite tier priority routing + 50% commission rate</strong></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚡ ProLnk Rewards Master Electricians</h3>
          <p style={{ color: '#9BB0CC', lineHeight: 1.7, margin: 0 }}>
            Master Electricians on ProLnk qualify for Elite tier—our highest lead routing priority, 50% commission on matched
            jobs, and a verified Master badge shown to every homeowner. DFW has over 2,400 permitted electrical projects per
            month and a significant shortage of available Masters. Your license is your competitive moat.
          </p>
        </div>

      </div>
    </div>
  );
}
