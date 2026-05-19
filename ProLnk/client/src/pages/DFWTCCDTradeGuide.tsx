import { useState } from 'react';

const programs = [
  { trade: 'HVAC', level: 'Beginner', cost: 3800, weeks: 32, schedules: ['Day (8am–2pm)', 'Evening (6pm–9pm)'], incomeStart: 20, income3yr: 29 },
  { trade: 'HVAC', level: 'Experienced', cost: 1200, weeks: 8, schedules: ['Weekend only'], incomeStart: 28, income3yr: 38 },
  { trade: 'Electrical', level: 'Beginner', cost: 4200, weeks: 40, schedules: ['Day (8am–2pm)'], incomeStart: 22, income3yr: 32 },
  { trade: 'Electrical', level: 'Experienced', cost: 900, weeks: 6, schedules: ['Online + Saturday lab'], incomeStart: 30, income3yr: 42 },
  { trade: 'Plumbing', level: 'Beginner', cost: 3600, weeks: 36, schedules: ['Day (8am–2pm)', 'Evening'], incomeStart: 21, income3yr: 30 },
  { trade: 'Plumbing', level: 'Experienced', cost: 1100, weeks: 10, schedules: ['Weekend + online'], incomeStart: 29, income3yr: 40 },
];

export default function DFWTCCDTradeGuide() {
  const [trade, setTrade] = useState('');
  const [level, setLevel] = useState('');
  const [result, setResult] = useState<null | typeof programs[0]>(null);

  function findProgram() {
    const match = programs.find(p =>
      (!trade || p.trade === trade) && (!level || p.level === level)
    ) || programs[0];
    setResult(match);
  }

  const trades = [...new Set(programs.map(p => p.trade))];
  const levels = ['Beginner', 'Experienced'];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏫</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            TCCD Trade Programs — DFW Fort Worth Metro Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BB0CC', maxWidth: 640, margin: '0 auto' }}>
            Tarrant County College District is DFW's largest community college system with campuses across Fort Worth,
            Arlington, Hurst, and South Fort Worth. Whether you're starting from scratch or leveling up an existing license,
            TCCD has a schedule that fits.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '🏫', label: 'Campuses', val: '6 locations across DFW' },
            { icon: '👷', label: 'Enrollment', val: '100,000+ students/year' },
            { icon: '💼', label: 'Trades Offered', val: 'HVAC, Electrical, Plumbing + 12 more' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{s.label}</div>
              <div style={{ color: '#9BB0CC', fontSize: 14, marginTop: 4 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your TCCD Program</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Trade Type</label>
              <select
                value={trade}
                onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Any trade</option>
                {trades.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BB0CC', fontSize: 14, display: 'block', marginBottom: 6 }}>Experience Level</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #1E3A5F', color: '#fff', fontSize: 15 }}
              >
                <option value="">Any level</option>
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button
            onClick={findProgram}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
          >
            Show My Program →
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginBottom: 12 }}>
                ✅ TCCD {result.trade} — {result.level} Track
              </div>
              <div style={{ color: '#ccc', fontSize: 15, lineHeight: 1.8 }}>
                <div>📅 Duration: <strong>{result.weeks} weeks</strong></div>
                <div>💰 Program cost: <strong>${result.cost.toLocaleString()}</strong></div>
                <div>🕐 Schedule options: <strong>{result.schedules.join(' · ')}</strong></div>
                <div>💵 Starting income: <strong>${result.incomeStart}/hr (${(result.incomeStart * 2080).toLocaleString()}/yr)</strong></div>
                <div>📈 Income after 3 years: <strong>${result.income3yr}/hr (${(result.income3yr * 2080).toLocaleString()}/yr)</strong></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F', marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 Continuing Education for Licensed Trades</h3>
          <p style={{ color: '#9BB0CC', lineHeight: 1.7, margin: 0 }}>
            Already licensed? TCCD Continuing Education offers renewal-hour courses for HVAC, Electrical, and Plumbing—
            all accepted by the Texas Department of Licensing and Regulation (TDLR). Courses are typically 8–16 hours and
            can be completed online or at any TCCD campus. ProLnk verified partners receive credits toward elite tier status
            for every renewal hour logged through TCCD.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🤝 ProLnk + TCCD Graduate Pathway</h3>
          <p style={{ color: '#9BB0CC', lineHeight: 1.7, margin: 0 }}>
            TCCD graduates who join ProLnk within 6 months of completion receive priority lead routing in the Fort Worth and
            Arlington service areas. Your TCCD credential appears verified on your ProLnk profile—a trust signal homeowners
            actively look for when requesting quotes.
          </p>
        </div>

      </div>
    </div>
  );
}
