import { useState } from 'react';

const movingInChecklist = [
  { icon: '🔑', item: 'Change all locks within 48 hours of closing.' },
  { icon: '💡', item: 'Transfer utilities before move-in: electric, gas, water, trash.' },
  { icon: '📬', item: 'Update address with USPS, bank, employer, IRS, and DMV.' },
  { icon: '🚗', item: 'Get a Texas driver’s license within 90 days of establishing residency.' },
  { icon: '🏡', item: 'File for homestead exemption with your county appraisal district (Jan 1 – May 1).' },
  { icon: '📡', item: 'Schedule internet installation — lead times in new suburbs can be 2–4 weeks.' },
  { icon: '🩺', item: 'Find a local doctor, dentist, and pediatrician before you need them.' },
];

const movingOutChecklist = [
  { icon: '🔍', item: 'Pre-sale inspection: 3–6 months before listing. Gives you time to fix on your terms.' },
  { icon: '📋', item: 'Gather all capital improvement receipts — they reduce your taxable gain at sale.' },
  { icon: '📦', item: 'Get 3 moving quotes. Off-peak (Jan–Mar) saves 20–30% on moving costs.' },
  { icon: '🏦', item: 'Call your mortgage servicer to confirm payoff timeline and final payment date.' },
  { icon: '🧹', item: 'Deep clean and stage before listing photos. First impression is priced in.' },
];

const movingCosts = [
  { route: 'Within DFW (local)', low: '$800', high: '$1,500', note: 'Standard 2-3 bedroom home, full-service' },
  { route: 'Out of state (inbound)', low: '$2,500', high: '$5,000', note: 'Varies heavily by origin and load size' },
  { route: 'DFW → Austin', low: '$1,800', high: '$2,600', note: 'Off-peak can dip to $1,400' },
  { route: 'DFW → Houston', low: '$1,500', high: '$2,200', note: 'Shorter drive, lower avg cost' },
  { route: 'DFW → Nationwide', low: '$3,500', high: '$8,000+', note: 'Long haul; get 4+ quotes' },
];

export default function DFWMovingGuide() {
  const [tab, setTab] = useState<'in' | 'out'>('in');

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#1B2B4B', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#93C5FD', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>DFW Relocation Guide · 2026</div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,50px)', fontWeight: 800, color: '#FFFFFF', margin: '0 auto 20px', maxWidth: 720, lineHeight: 1.15 }}>
          DFW Moving Guide
        </h1>
        <p style={{ fontSize: 18, color: '#B0C4DE', maxWidth: 600, margin: '0 auto' }}>
          Everything you need to move in or out of Dallas-Fort Worth — costs, checklists, and the honest things no one tells you.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px' }}>

        {/* DFW transit warning */}
        <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 12, padding: '20px 24px', marginBottom: 44, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>🚗</span>
          <div>
            <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 4 }}>DFW Driving Reality Check</div>
            <p style={{ color: '#78350F', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
              DFW has no real public transit. DART light rail covers a small fraction of the metro. You will drive everywhere — grocery runs, school pickups, doctor visits, everything. Factor your commute into your neighborhood choice before you sign. 30 miles in DFW traffic can mean 60–90 minutes each way.
            </p>
          </div>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', gap: 0, background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', marginBottom: 36, maxWidth: 360 }}>
          {(['in', 'out'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '12px',
                background: tab === t ? '#1B2B4B' : 'transparent',
                color: tab === t ? '#FFFFFF' : '#6B7280',
                fontWeight: 700,
                fontSize: 15,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Moving {t === 'in' ? 'In ↓' : 'Out ↑'}
            </button>
          ))}
        </div>

        {tab === 'in' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Moving to DFW</h2>
            <p style={{ color: '#6B7280', marginBottom: 8 }}><strong>Best months to move:</strong> January–March (off-peak, 20–30% cheaper moving costs)</p>
            <p style={{ color: '#6B7280', marginBottom: 24 }}><strong>Pro tip:</strong> School districts are everything for resale. Research DISD, Frisco ISD, Prosper ISD, and McKinney ISD before committing to a neighborhood.</p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 16 }}>First Month Checklist</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
              {movingInChecklist.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 10, padding: '16px 20px' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ color: '#374151', fontSize: 15, lineHeight: 1.65 }}>{c.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'out' && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Moving Out of DFW</h2>
            <p style={{ color: '#6B7280', marginBottom: 24 }}>Keep every contractor invoice. Capital improvements (new roof, HVAC, kitchen remodel) reduce your taxable gain at sale — potentially saving thousands.</p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Pre-Sale Checklist</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
              {movingOutChecklist.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 10, padding: '16px 20px' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ color: '#374151', fontSize: 15, lineHeight: 1.65 }}>{c.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moving costs table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Moving Cost Estimates</h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFFFFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}>
            <thead>
              <tr style={{ background: '#F3F4F6' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151' }}>Route</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#374151' }}>Low</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#374151' }}>High</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {movingCosts.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#111827' }}>{row.route}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', color: '#10B981', fontWeight: 700 }}>{row.low}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', color: '#EF4444', fontWeight: 700 }}>{row.high}</td>
                  <td style={{ padding: '14px 20px', color: '#6B7280', fontSize: 13 }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TrustyPro CTA */}
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1E40AF', marginBottom: 10 }}>Know What You're Buying Before the Option Period Ends</div>
          <p style={{ color: '#3B82F6', fontSize: 15, lineHeight: 1.65, maxWidth: 520, margin: '0 auto 24px' }}>
            Get a TrustyPro home health score before you buy in a new neighborhood. AI-powered scanning reveals foundation, HVAC, roofing, and moisture issues before your inspector even arrives.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#1B2B4B', color: '#FFFFFF', fontWeight: 700, fontSize: 15, padding: '13px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Join the Homeowner Waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}
