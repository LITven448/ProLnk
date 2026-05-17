import { useState } from 'react';

export default function DFWPropertyTaxDeadlines2026() {
  const [county, setCounty] = useState('dallas');

  const countyData: Record<string, { protest: string; bills: string; note: string }> = {
    dallas: { protest: 'May 15, 2026', bills: 'October 2026', note: 'DCAD — dcad.org. Online protest filing available.' },
    tarrant: { protest: 'May 15, 2026', bills: 'October 2026', note: 'TCAD — tad.org. In-person hearings at 2500 Handley-Ederville Rd, Fort Worth.' },
    collin: { protest: 'May 15, 2026', bills: 'October 2026', note: 'CCAD — collincad.org. iFile portal for online protests.' },
    denton: { protest: 'May 15, 2026', bills: 'October 2026', note: 'DCAD — dentoncad.com. eFile system for protests.' },
    rockwall: { protest: 'May 15, 2026', bills: 'October 2026', note: 'RCAD — rockwallcad.com. Smaller volume means faster hearings.' },
    ellis: { protest: 'May 15, 2026', bills: 'October 2026', note: 'ECAD — elliscad.net. Protest online or in person in Waxahachie.' },
  };

  const sel = countyData[county];

  const deadlines = [
    { date: 'January 1, 2026', icon: '📅', title: 'Appraisal Date', desc: 'Official date appraisal districts use to value all DFW properties. Your homes condition and market value on this date determines your tax bill.', color: '#3b82f6' },
    { date: 'January 31, 2026', icon: '💳', title: 'Last Year Tax Payment Due', desc: 'Pay your 2025 DFW property taxes by January 31 to avoid 6% penalty + 1% monthly interest. After Feb 1, delinquency begins.', color: '#ef4444' },
    { date: 'April 1, 2026', icon: '📬', title: 'Appraisal Notices Mailed', desc: 'DFW appraisal districts mail Notice of Appraised Value. Check your assessed value vs comparable sales. This starts your 30-day protest window.', color: '#f59e0b' },
    { date: 'April 30, 2026', icon: '🏠', title: 'Homestead Exemption Deadline', desc: 'New DFW homeowners must file homestead exemption by April 30. Saves $2,000-$5,000+ per year. Apply at your county CAD website — free.', color: '#10b981' },
    { date: 'May 15, 2026', icon: '⚖️', title: 'Property Tax Protest Deadline', desc: 'Most DFW counties: file protest by May 15 or 30 days from notice date, whichever is later. Online filing available at all major DFW CADs.', color: '#F5E642' },
    { date: 'October 2026', icon: '📄', title: 'Tax Bills Mailed', desc: 'DFW county tax offices mail 2026 property tax statements. You have until January 31, 2027 to pay without penalty. Many offer 2% discount for early payment.', color: '#8b5cf6' },
    { date: 'January 31, 2027', icon: '🚨', title: '2026 Taxes Due — Penalty Starts Feb 1', desc: 'Pay 2026 DFW property taxes by January 31, 2027. After this date: 6% penalty immediately, then 1% per month. After July 1: attorney collection fees added.', color: '#ef4444' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 ProLnk DFW Resource Hub</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Property Tax Key Dates 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Never miss a DFW property tax deadline. Miss the protest deadline and you leave thousands on the table — permanently.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <label style={{ fontSize: 12, color: '#94a3b8' }}>📍 Select Your DFW County</label>
          <select value={county} onChange={e => setCounty(e.target.value)} style={{ display: 'block', marginTop: 8, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
            <option value="dallas">Dallas County</option>
            <option value="tarrant">Tarrant County</option>
            <option value="collin">Collin County</option>
            <option value="denton">Denton County</option>
            <option value="rockwall">Rockwall County</option>
            <option value="ellis">Ellis County</option>
          </select>
          {sel && (
            <div style={{ marginTop: 16, padding: 14, background: '#0A1628', borderRadius: 10, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>📍 {county.charAt(0).toUpperCase() + county.slice(1)} County Details</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>Protest Deadline: <span style={{ color: '#F5E642' }}>{sel.protest}</span></div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>Tax Bills Mailed: {sel.bills}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{sel.note}</div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Full 2026 DFW Tax Calendar</h2>
        {deadlines.map((d, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{d.icon}</div>
              {i < deadlines.length - 1 && <div style={{ width: 2, flex: 1, background: '#1e2d47', minHeight: 24 }} />}
            </div>
            <div style={{ background: '#1e2d47', borderRadius: 10, padding: 16, flex: 1, marginBottom: 4 }}>
              <div style={{ color: d.color, fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{d.date}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{d.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

