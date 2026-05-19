import { useState } from 'react';

export default function DFWSolarTaxCreditTimeline2026() {
  const [cost, setCost] = useState<string>('');
  const [credits, setCredits] = useState<{ year: string; pct: number; savings: number }[]>([]);

  const calculate = () => {
    const num = parseFloat(cost.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num <= 0) return;
    setCredits([
      { year: '2022-2032', pct: 30, savings: num * 0.30 },
      { year: '2033', pct: 26, savings: num * 0.26 },
      { year: '2034', pct: 22, savings: num * 0.22 },
      { year: '2035+', pct: 0, savings: 0 },
    ]);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>☀️</span>
          <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 12 }}>DFW SOLAR GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Solar Federal Tax Credit Timeline 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 28 }}>IRA solar credits run through 2032 at 30% — here is exactly what that means for your DFW install</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 ITC Credit Schedule (Residential)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['2022-2032', '30%', '#4ADE80', 'Full IRA credit — maximum savings window'],
              ['2033', '26%', '#FCD34D', 'Begins phasing down — act before year-end 2032'],
              ['2034', '22%', '#FB923C', 'Significant reduction — most homeowners miss this window'],
              ['2035+', '0%', '#F87171', 'Residential credit expires — commercial only at 10%'],
            ].map(([yr, pct, color, note]) => (
              <div key={yr} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1E2F4F' }}>
                <span style={{ minWidth: 100, color: '#E8EAF0', fontWeight: 700, fontSize: 14 }}>{yr}</span>
                <span style={{ color, fontWeight: 800, fontSize: 22, minWidth: 52 }}>{pct}</span>
                <span style={{ color: '#94A3B8', fontSize: 13 }}>{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏙️ Why 2026 Is Prime Time for DFW Solar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['⚡ ERCOT Grid Pressure', 'DFW peak demand records broken in 2023 and 2024. Solar + storage reduces grid stress and qualifies for Oncor rebates up to $2,500.'],
              ['🏗️ Installer Backlog Clearing', 'Post-IRA rush installer backlog has stabilized. 2026 lead times average 6-10 weeks vs 6+ months in 2023.'],
              ['📉 Panel Prices Down 40%', 'Utility-grade solar panels hit $0.18/watt in 2025, driving installed costs to $2.50-3.20/watt in DFW.'],
              ['🔋 Battery + Solar Bundle Credit', 'Standalone battery storage now qualifies for 30% ITC if installed with solar — making battery retrofit much more attractive.'],
            ].map(([title, body]) => (
              <div key={title} style={{ background: '#1E2F4F', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🗓️ DFW Installer Backlog Reality</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>DFW has over 200 certified solar installers as of 2026, but top-rated firms (SunPower, Sunrun, Trinity Solar, local NABCEP-certified) book 8-14 weeks out. To capture the 30% credit for tax year 2026, your system must be installed and operational before December 31, 2026.</p>
          <div style={{ background: '#1E2F4F', borderRadius: 8, padding: 14 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>⏰ 2026 Installation Deadline Math</div>
            <ul style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
              <li>Book installer by August 2026 to guarantee December install slot</li>
              <li>Permit approval in Dallas and Fort Worth averages 3-5 weeks</li>
              <li>Oncor interconnection approval adds 2-4 weeks after installation</li>
              <li>System must be energized (PTO received) before Dec 31 for that tax year</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 Solar Credit Calculator by Year</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={cost}
              onChange={e => setCost(e.target.value)}
              placeholder="Enter system cost (e.g. 28000)"
              style={{ background: '#1E2F4F', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 14px', fontSize: 14, flex: 1, minWidth: 200 }}
            />
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Calculate</button>
          </div>
          {credits.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {credits.map(({ year, pct, savings }) => (
                <div key={year} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1E2F4F', borderRadius: 8, padding: '12px 16px' }}>
                  <span style={{ color: '#E8EAF0', fontWeight: 600, fontSize: 14 }}>{year}</span>
                  <span style={{ color: '#94A3B8', fontSize: 14 }}>{pct}% credit</span>
                  <span style={{ color: pct === 30 ? '#4ADE80' : pct === 0 ? '#F87171' : '#FCD34D', fontWeight: 800, fontSize: 18 }}>
                    {pct === 0 ? '$0' : '$' + savings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
