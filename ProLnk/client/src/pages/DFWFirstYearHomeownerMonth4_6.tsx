import { useState } from 'react';

export default function DFWFirstYearHomeownerMonth4_6() {
  const [month, setMonth] = useState('');

  const checklists: Record<string, string[]> = {
    jan: [
      '❄️ Check pipes in exterior walls and under sinks — DFW freeze risk Jan–Feb',
      '📑 File homestead exemption by April 30 deadline — saves hundreds annually',
      '🌡️ Run furnace at full capacity test before deepest cold',
      '💧 Pause foundation watering — winter moisture usually sufficient',
      '🔥 Check chimney if you have fireplace — creosote buildup in first winter',
    ],
    apr: [
      '❄️ Start AC — schedule spring tune-up before Memorial Day rush',
      '📑 Property tax protest window opens May 1 — file protest for year 1 appraisal',
      '💧 Begin foundation watering — start before soil fully dries out',
      '🌿 Irrigation startup — check all zones and heads after winter',
      '🔍 Inspect roof for winter hail damage before summer storm season',
    ],
    jul: [
      '💧 Increase foundation watering to daily during July heat',
      '💨 Replace HVAC filter — running constantly in DFW summer',
      '🌿 Check irrigation system mid-summer — heads break under heat pressure',
      '⚡ Check attic ventilation — excess heat causes shingle and wood damage',
      '📋 Update Home Health Vault with any summer repairs already made',
    ],
    oct: [
      '🔥 Schedule furnace tune-up — October is ideal before cold snaps',
      '🌿 Irrigation winterization if no rain — DFW can go dry in fall',
      '💧 Reduce foundation watering as temps drop and rain returns',
      '🍂 Clean gutters — DFW oak and pecan trees drop heavily in fall',
      '🔍 Walk exterior before first freeze — caulk gaps around windows and doors',
    ],
  };

  const monthOptions = [
    { val: 'jan', label: 'January – March' },
    { val: 'apr', label: 'April – June' },
    { val: 'jul', label: 'July – September' },
    { val: 'oct', label: 'October – December' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK HOMEOWNER GUIDES — DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🌤️ Months 4–6 Mid-Year DFW Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Mid-year is when DFW seasonal services become critical. Foundation, HVAC, and storm prep all converge here.</p>

        <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>What part of the year are you in?</label>
        <select
          value={month}
          onChange={e => setMonth(e.target.value)}
          style={{ background: '#1e2d45', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px', fontSize: 15, width: '100%', marginBottom: 28 }}
        >
          <option value="">Select current quarter</option>
          {monthOptions.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
        </select>

        {month && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Months 4–6 DFW Checklist</h2>
            {checklists[month].map((item, i) => (
              <div key={i} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', marginBottom: 10, fontSize: 15, borderLeft: '3px solid #F5E642′ }}>
                {item}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 36, background: '#1e2d45', borderRadius: 12, padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏛️ Property Tax Protest — DFW Hidden Savings</div>
          <div style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
            DFW homeowners who protest their property tax appraisal save an average of $800–$2,400 in year one. The protest window opens May 1 and closes May 15. Many protest services work on contingency — no savings, no fee.
          </div>
        </div>
      </div>
    </div>
  );
}

