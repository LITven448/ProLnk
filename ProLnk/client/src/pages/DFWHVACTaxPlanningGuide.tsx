import { useState } from 'react';

type Situation = {
  id: string;
  label: string;
  emoji: string;
  creditAmount: string;
  creditType: string;
  strategy: string[];
  timing: string;
  warning?: string;
};

const situations: Situation[] = [
  {
    id: 'homeowner_replace',
    label: 'Replacing HVAC — I Own My Home',
    emoji: '🏠',
    creditAmount: 'Up to $2,000 (30% of cost)',
    creditType: 'IRA 25C Tax Credit',
    strategy: [
      'Purchase and install in the SAME tax year (2026)',
      'Equipment must be 15+ SEER2 or 8.5+ HSPF2 heat pump',
      'Credit applies to equipment + installation costs',
      'Claim on IRS Form 5695 — keep your contractor invoice',
      'Texas has no state income tax — federal credit is your only play',
    ],
    timing: 'Best timing: complete before Dec 31, 2026 to capture this tax year',
  },
  {
    id: 'landlord',
    label: 'Rental Property Owner',
    emoji: '🏢',
    creditAmount: '$0 (25C not available for rentals)',
    creditType: 'Section 179 / Bonus Depreciation',
    strategy: [
      '25C credit ONLY applies to primary or secondary residence — not rentals',
      'Instead: deduct HVAC as business expense under Section 179',
      'Full cost deductible in year of installation (up to $1.16M limit 2026)',
      'Or depreciate over 27.5 years as residential rental property component',
      'Talk to your CPA about bonus depreciation phase-down (80% in 2026)',
    ],
    timing: 'Section 179 requires equipment in service before Dec 31, 2026',
    warning: '25C does NOT apply to rental properties. Do not claim it.',
  },
  {
    id: 'high_income',
    label: 'High Income (AMT Exposure)',
    emoji: '💼',
    creditAmount: 'Up to $2,000 — NOT AMT-limited',
    creditType: 'IRA 25C Tax Credit',
    strategy: [
      'Good news: 25C credit IS allowed against AMT starting 2023',
      'Combine with heat pump water heater ($600 more) and windows ($600)',
      'Total possible in 2026: $3,200 from 25C across all eligible upgrades',
      'Stack with Oncor utility rebate (up to $1,800 in DFW) — not taxable',
      'Document everything: receipts, contractor licenses, equipment AHRI cert',
    ],
    timing: 'Plan multi-upgrade strategy across 2026–2027 to max annual $3,200 cap',
  },
  {
    id: 'property_tax',
    label: 'Concerned About DFW Property Tax Impact',
    emoji: '📊',
    creditAmount: 'Up to $2,000 federal credit still applies',
    creditType: 'IRA 25C + Property Tax Strategy',
    strategy: [
      'New HVAC does NOT trigger automatic reassessment in Texas',
      'HVAC upgrades may increase appraised value at next scheduled review',
      'Homestead exemption caps annual value increase at 10% — you\’re protected',
      'File for homestead exemption before April 30 if you haven\’t',
      'Consider timing upgrade after your annual appraisal notice (usually May)',
    ],
    timing: 'Upgrade after May appraisal notices to defer any value adjustment by ~1 year',
  },
  {
    id: 'just_bought',
    label: 'Just Bought a DFW Home in 2026',
    emoji: '🔑',
    creditAmount: 'Up to $2,000 if replacing immediately',
    creditType: 'IRA 25C + First Year Strategy',
    strategy: [
      'If closing in 2026, you can claim 25C for replacement in same tax year',
      'New homeowners often inherit aging systems — get inspection immediately',
      'Ask seller for any existing manufacturer warranties (transferable)',
      'DFW MUD tax district: HVAC upgrade may affect assessed value next year',
      'Oncor rebate applies from your first month as account holder',
    ],
    timing: 'Act before year-end if system is 10+ years old — replace now vs. emergency later',
  },
];

export default function DFWHVACTaxPlanningGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const sit = situations.find((s) => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>HVAC Tax Planning Guide — DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12 }}>
          The IRA 25C credit gives DFW homeowners up to $2,000 back on qualifying HVAC upgrades. But timing and situation matter.
        </p>
        <div style={{ background: '#0f2040', borderRadius: 10, padding: '10px 16px', marginBottom: 32, fontSize: 13, color: '#94a3b8', borderLeft: '3px solid #F5E642′ }}>
          💡 This is general tax information, not professional tax advice. Consult a CPA for your specific situation.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {situations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                background: '#0f2040',
                border: '2px solid',
                borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f',
                borderRadius: 12,
                padding: '14px 18px',
                cursor: 'pointer',
                textAlign: 'left',
                color: '#fff',
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{s.emoji}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginTop: 2 }}>{s.creditAmount}</div>
              </div>
            </button>
          ))}
        </div>
        {sit && (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{sit.emoji} {sit.label}</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, marginTop: 12, flexWrap: 'wrap' }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '10px 16px', flex: 1 }}>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>POTENTIAL CREDIT</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{sit.creditAmount}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: '10px 16px', flex: 1 }}>
                <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TAX VEHICLE</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{sit.creditType}</div>
              </div>
            </div>
            {sit.warning && (
              <div style={{ background: '#7c2d12', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13 }}>
                ⚠️ {sit.warning}
              </div>
            )}
            <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>TAX STRATEGY</div>
            {sit.strategy.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#34d399', flexShrink: 0 }}>✓</span>
                <span>{s}</span>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, marginTop: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>⏰ TIMING NOTE</div>
              <div style={{ fontSize: 14 }}>{sit.timing}</div>
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Get Qualifying HVAC Quotes via ProLnk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
