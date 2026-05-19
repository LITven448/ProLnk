import { useState } from 'react';

const slowSeasons = {
  hvac: 'Jan-Feb (cold weather, less AC demand)',
  plumber: 'Jan-Feb (slower home sales, less remodel)',
  electrician: 'Jan-Feb (construction slowdown post-holidays)',
  roofer: 'Dec-Feb (no hail season, less maintenance demand)'
};

const taxBrackets = [
  { min: 0, max: 20000, rate: 0.15, label: '15% (SE tax only)' },
  { min: 20001, max: 50000, rate: 0.27, label: '27% (SE + federal)' },
  { min: 50001, max: 100000, rate: 0.32, label: '32% (higher bracket)' },
  { min: 100001, max: 999999, rate: 0.37, label: '37% (top bracket)' }
];

const tools = [
  { name: 'QuickBooks Self-Employed', cost: 15, use: 'Income/expense tracking, quarterly tax estimates, mileage log' },
  { name: 'Wave Accounting', cost: 0, use: 'Free invoicing and basic bookkeeping. Good for solo operators under $150K' },
  { name: 'Jobber', cost: 49, use: 'Job costing, invoicing, scheduling. Built for field service businesses' },
  { name: 'TurboTax Self-Employed', cost: 120, use: 'Annual filing. Handles Schedule C and SE tax automatically' }
];

export default function DFWTradeFinanceGuide() {
  const [revenue, setRevenue] = useState('');
  const [trade, setTrade] = useState('');

  const rev = parseInt(revenue.replace(/,/g, '')) || 0;
  const annual = rev * 12;
  const bracket = taxBrackets.find(b => annual >= b.min && annual <= b.max) || taxBrackets[taxBrackets.length - 1];
  const monthlyTax = rev > 0 ? Math.round(rev * bracket.rate) : 0;
  const quarterlyTax = monthlyTax * 3;
  const emergencyFund = rev > 0 ? Math.round(rev * 3) : 0;
  const slowSeasonReserve = rev > 0 ? Math.round(rev * 2) : 0;
  const businessSavings = rev > 0 ? Math.round(rev * 0.20) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK DFW PRO RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Trade Finance Guide</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 }}>Texas has no income tax which is great, but you still owe federal taxes and self-employment tax quarterly. Running your trade business like a real business means separating finances, tracking jobs, and saving aggressively for slow season and taxes.</p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Calculate Your Financial Targets</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Average Monthly Revenue ($)</label>
            <input value={revenue} onChange={ev => setRevenue(ev.target.value)} placeholder="e.g. 12000″ style={{ background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 16px', color: '#fff', fontSize: 18, width: '100%', boxSizing: 'border-box', fontWeight: 700 }} />
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.keys(slowSeasons).map(k => (
              <button key={k} onClick={() => setTrade(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === k ? '#F5E642′ : '#1e3a5f', background: trade === k ? '#F5E642' : ’transparent', color: trade === k ? '#0A1628′ : '#fff', fontWeight: 700, cursor: ’pointer', textTransform: 'capitalize' }}>{k}</button>
            ))}
          </div>
        </div>

        {rev > 0 && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>SET ASIDE FOR TAXES</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${monthlyTax.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>per month ({bracket.label})</div>
              </div>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>QUARTERLY TAX PAYMENT</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#ef4444′ }}>${quarterlyTax.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>due Apr 15, Jun 15, Sep 15, Jan 15</div>
              </div>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>EMERGENCY FUND TARGET</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${emergencyFund.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>3 months expenses minimum</div>
              </div>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>SLOW SEASON RESERVE</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${slowSeasonReserve.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>2 months revenue in the bank</div>
              </div>
            </div>

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>MONTHLY SAVINGS TARGET</div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>${businessSavings.toLocaleString()}<span style={{ fontSize: 16, color: '#64748b' }}>/mo</span></div>
              <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 13 }}>20% of revenue into business savings covers taxes, reserve, and equipment fund</p>
            </div>

            {trade && (
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Slow Season for {trade.charAt(0).toUpperCase() + trade.slice(1)}</div>
                <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>{slowSeasons[trade as keyof typeof slowSeasons]}</p>
                <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 13 }}>Your ${slowSeasonReserve.toLocaleString()} slow season reserve covers 2 months at current revenue. Build it during peak season (May-Sep).</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24, background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>First 5 Financial Steps for Every DFW Trade Pro</div>
          {[
            'Open a separate business checking account this week. Do not mix personal and business funds.',
            'Get an EIN from IRS.gov (free, instant online). Protects your SSN on invoices and vendor apps.',
            'Open a business savings account and auto-transfer 20% of every deposit immediately.',
            'Mark quarterly tax due dates in your calendar now: April 15, June 15, September 15, January 15.',
            'Track every job in a spreadsheet or app. You cannot manage what you cannot measure.'
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5E642', color: '#0A1628', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>{i + 1}</div>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.5 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Recommended Tools for DFW Trade Finances</div>
          {tools.map((tool, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < tools.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{tool.name}</span>
                <span style={{ color: tool.cost === 0 ? '#86efac' : '#F5E642', fontWeight: 700 }}>{tool.cost === 0 ? 'Free' : '$' + tool.cost + '/mo'}</span>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 13 }}>{tool.use}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
