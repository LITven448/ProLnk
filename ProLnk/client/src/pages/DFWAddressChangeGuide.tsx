import { useState } from 'react';

type HouseholdType = 'Single' | 'Family' | 'Business' | 'Senior';

const deadlines: Record<string, { item: string; deadline: string; link: string }[]> = {
  Single: [
    { item: "TX Driver's License", deadline: '30 days (TX law)', link: 'DPS office or DPS online' },
    { item: 'Vehicle Registration', deadline: '30 days (TX law)', link: 'County tax office' },
    { item: 'Voter Registration', deadline: '30 days before next election', link: 'votetexas.gov' },
    { item: 'USPS Mail Forward', deadline: 'Before move date', link: 'usps.com' },
    { item: 'Bank / Credit Cards', deadline: 'Immediately', link: 'Online banking portal' },
    { item: 'Employer / Payroll', deadline: 'Before next paycheck', link: 'HR department' },
    { item: 'IRS / Tax Records', deadline: 'File Form 8822 within 60 days', link: 'irs.gov' },
    { item: 'Insurance (auto, renters)', deadline: 'Same day if possible', link: 'Your agent' },
    { item: 'Subscriptions / Streaming', deadline: 'Before renewal', link: 'Each account portal' },
  ],
  Family: [
    { item: "TX Driver's License (all adults)", deadline: '30 days', link: 'DPS office or DPS online' },
    { item: 'School Enrollment', deadline: 'Before first school day', link: 'District enrollment office' },
    { item: 'Vehicle Registration (all vehicles)', deadline: '30 days', link: 'County tax office' },
    { item: 'Voter Registration (all adults)', deadline: '30 days before election', link: 'votetexas.gov' },
    { item: 'USPS Mail Forward', deadline: 'Before move date', link: 'usps.com' },
    { item: 'Health Insurance / PCP', deadline: 'Within 30 days', link: 'HR or insurance portal' },
    { item: 'Bank / All Accounts', deadline: 'Immediately', link: 'Online or branch' },
    { item: 'IRS for all filers', deadline: '60 days post-move', link: 'irs.gov Form 8822′ },
    { item: 'Pediatrician / Specialists', deadline: 'Within 2 weeks', link: 'Call directly' },
  ],
  Business: [
    { item: 'TX Secretary of State', deadline: 'Within 30 days', link: 'sos.state.tx.us' },
    { item: 'TX Comptroller / Sales Tax', deadline: 'Before next filing', link: 'comptroller.texas.gov' },
    { item: 'Business Licenses', deadline: 'Before operating at new address', link: 'City/county clerk' },
    { item: 'IRS EIN Address', deadline: 'Promptly', link: 'irs.gov Form 8822-B' },
    { item: 'Bank / Business Accounts', deadline: 'Immediately', link: 'Branch or online' },
    { item: 'Google Business Profile', deadline: 'Day of move', link: 'google.com/business' },
    { item: 'USPS Mail Forward', deadline: 'Before move date', link: 'usps.com' },
    { item: 'Vendors / Clients', deadline: '2 weeks prior', link: 'Email or letter' },
  ],
  Senior: [
    { item: "TX Driver's License or ID", deadline: '30 days', link: 'DPS office' },
    { item: 'Social Security Administration', deadline: 'Promptly', link: '1-800-772-1213′ },
    { item: 'Medicare', deadline: 'Before next benefits period', link: 'medicare.gov' },
    { item: 'Medicare Supplement / Advantage', deadline: 'Promptly', link: 'Your plan' },
    { item: 'USPS Mail Forward', deadline: 'Before move', link: 'usps.com' },
    { item: 'Voter Registration', deadline: '30 days before election', link: 'votetexas.gov' },
    { item: 'Bank / Financial', deadline: 'Immediately', link: 'Branch or online' },
    { item: 'Pension / Retirement Plans', deadline: 'Within 30 days', link: 'Plan administrator' },
    { item: 'Primary Care + Specialists', deadline: 'Within 2 weeks', link: 'Call each office' },
  ],
};

export default function DFWAddressChangeGuide() {
  const [householdType, setHouseholdType] = useState<HouseholdType | ''>('');
  const [checklist, setChecklist] = useState<null | { item: string; deadline: string; link: string }[]>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function generate() {
    if (householdType) {
      setChecklist(deadlines[householdType]);
      setChecked({});
    }
  }

  function toggleCheck(i: number) {
    setChecked(prev => ({ ...prev, [i]: !prev[i] }));
  }

  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>📋 DFW Address Change Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Moving in or to DFW? Get a complete Texas-specific checklist with deadlines so nothing slips through the cracks.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>⚡ Texas-Specific Rules</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            TX Driver's License must be updated within <strong style={{ color: '#F5E642' }}>30 days</strong> — fines apply • Vehicle registration address update also 30 days • Voter re-registration required if moving to new county • USPS forward lasts 12 months, not permanent
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🏠 Generate My Checklist</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {(['Single', 'Family', 'Business', 'Senior'] as HouseholdType[]).map(t => (
              <button key={t} onClick={() => setHouseholdType(t)} style={{ padding: '0.5rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: householdType === t ? '#F5E642′ : '#1e3a5f', background: householdType === t ? '#F5E642' : ’transparent', color: householdType === t ? '#0A1628′ : '#94a3b8', fontWeight: 600, cursor: ’pointer' }}>{t}</button>
            ))}
          </div>
          <button onClick={generate} disabled={!householdType} style={{ background: householdType ? '#F5E642′ : '#1e3a5f', color: '#0A1628', border: ’none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, cursor: householdType ? 'pointer' : 'default' }}>Generate Checklist</button>
        </div>

        {checklist && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>✅ Your Address Change Checklist</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{done} / {checklist.length} complete</div>
            </div>
            {checklist.map((item, i) => (
              <div key={i} onClick={() => toggleCheck(i)} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', marginBottom: '0.5rem', background: checked[i] ? '#0A1628′ : '#162840', borderRadius: 8, cursor: ’pointer', opacity: checked[i] ? 0.6 : 1 }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{checked[i] ? '✅' : '⬜'}</span>
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, textDecoration: checked[i] ? 'line-through' : 'none' }}>{item.item}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>⏰ {item.deadline} — {item.link}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
