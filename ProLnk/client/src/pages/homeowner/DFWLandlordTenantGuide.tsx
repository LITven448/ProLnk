import { useState } from 'react';

const issueTypes = [
  {
    id: 'repairs',
    label: 'Landlord Won’t Make Repairs',
    law: 'Texas Property Code §92.056',
    summary: 'Landlord must maintain habitability — working heat/AC, plumbing, and freedom from pests. After written notice, landlord has a "reasonable time" (courts typically interpret as 7 days for urgent issues).',
    action: 'Send written notice (email or certified mail). If no response in 7 days, you may have the right to repair and deduct — up to 1 month’s rent — after giving a second written notice.',
    severity: 'High',
  },
  {
    id: 'deposit',
    label: 'Security Deposit Dispute',
    law: 'Texas Property Code §92.103',
    summary: 'Landlord must return security deposit within 30 days of move-out. No statutory limit on deposit amount. Must provide itemized list of deductions.',
    action: 'Document everything at move-in and move-out with photos. If deposit not returned in 30 days, you may sue in Justice Court for 3x the deposit amount plus attorney fees.',
    severity: 'Medium',
  },
  {
    id: 'lockout',
    label: 'Landlord Changed Locks / Lockout',
    law: 'Texas Property Code §92.0081',
    summary: 'Illegal to change locks without court order. Landlord cannot remove doors, windows, or utility connections to force departure.',
    action: 'This is an illegal lockout. Contact local police — lockouts can be treated as criminal trespass against the landlord. You can also get an emergency court order.',
    severity: 'Critical',
  },
  {
    id: 'eviction',
    label: 'Eviction Notice Received',
    law: 'Texas Property Code §24',
    summary: '3-day notice for non-payment. 30-day notice for lease violations (or as specified in lease). Must file in Justice Court after notice period.',
    action: 'Do not ignore the notice. Pay owed rent if possible within the 3-day window. If you believe the eviction is retaliatory or improper, consult a tenant’s rights attorney immediately.',
    severity: 'High',
  },
  {
    id: 'retaliation',
    label: 'Landlord Retaliation',
    law: 'Texas Property Code §92.331',
    summary: 'Landlord cannot retaliate against a tenant for making repair requests, reporting violations, or exercising legal rights. Retaliation includes raising rent, reducing services, or threatening eviction within 6 months of protected activity.',
    action: 'Document all communications. If eviction is filed within 6 months of a repair request, retaliation is presumed. Use this as a defense in court.',
    severity: 'High',
  },
  {
    id: 'habitability',
    label: 'Habitability Issues (No Heat/AC/Water)',
    law: 'Texas Property Code §92.052',
    summary: 'DFW summers make non-functioning AC a potential health emergency. Texas law requires landlords to maintain HVAC in working order as a habitability requirement.',
    action: 'Provide written notice immediately. For health-threatening conditions (extreme heat, no water), courts may expedite. Document with photos and temperature readings.',
    severity: 'Critical',
  },
];

export default function DFWLandlordTenantGuide() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const result = issueTypes.find(i => i.id === selectedIssue);

  const severityColor = (s: string) => {
    if (s === 'Critical') return '#ef4444';
    if (s === 'High') return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e8e8e8', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>⚖️</span>
          <span style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 2 }}>HomeOwner Guide</span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', lineHeight: 1.2, marginBottom: 16 }}>
          DFW Landlord-Tenant Law Guide
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 48 }}>
          Know Your Rights and Responsibilities
        </p>

        <div style={{ background: '#1f1207', borderRadius: 12, padding: 18, marginBottom: 48, border: '1px solid #92400e' }}>
          <p style={{ color: '#fbbf24', fontSize: 14 }}>
            ⚠️ This guide is for informational purposes only and does not constitute legal advice. Laws change — verify current statutes at texasattorneygeneral.gov or consult a licensed Texas attorney for your specific situation.
          </p>
        </div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>🏠 Texas Landlord Basics</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '🏙️', title: 'No Rent Control in Texas', desc: 'Texas law prohibits cities from enacting rent control ordinances. Landlords may raise rent at lease renewal with proper notice.' },
              { icon: '💵', title: 'Security Deposit Rules', desc: 'No statutory limit on deposit amount, but must be returned within 30 days of move-out with itemized deductions in writing.' },
              { icon: '📄', title: 'Notice to Vacate', desc: '3 days for non-payment of rent. 30 days (or as specified in lease) for lease violations. Written notice is required before filing eviction.' },
              { icon: '🔑', title: 'Lockout Prohibition', desc: 'Landlord cannot change locks, remove doors, or shut off utilities to force departure. Requires a court eviction order.' },
              { icon: '🛡️', title: 'Anti-Retaliation Protection', desc: 'Cannot retaliate against tenants for requesting repairs, reporting violations, or joining a tenant union.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#1a1d27', borderRadius: 10, padding: 20, border: '1px solid #2a2d3a', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>🔧 Landlord Repair Obligations</h2>
          <div style={{ background: '#1a1d27', borderRadius: 12, padding: 28, border: '1px solid #2a2d3a' }}>
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>What Must Be Maintained</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.7 }}>Working heat and AC, plumbing (hot and cold), freedom from pest infestation, structural integrity, functioning smoke and CO detectors.</p>
              </div>
              <div style={{ borderTop: '1px solid #2a2d3a', paddingTop: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>Repair Timeline</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.7 }}>Texas requires repair within a "reasonable time" after written notice. Courts typically interpret this as <strong style={{ color: '#fbbf24' }}>7 days for non-emergency</strong> and faster for health-threatening issues (no AC in a DFW summer = urgent).</p>
              </div>
              <div style={{ borderTop: '1px solid #2a2d3a', paddingTop: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>Repair and Deduct Option</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.7 }}>If landlord fails after two written notices, tenant may hire a repair person and deduct the cost from rent — up to one month's rent. Must follow proper notice procedure precisely.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>📍 DFW-Specific Considerations</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '⚖️', title: 'No Statewide Eviction Moratorium', desc: 'Check for any current local emergency orders from Dallas or Tarrant County. Texas resumed normal eviction procedures post-pandemic.' },
              { icon: '🏛️', title: 'Small Claims Court Limit', desc: 'Texas Justice Courts handle landlord-tenant disputes up to $20,000. No attorney required. Filing fee is typically $50–100.' },
              { icon: '🏙️', title: 'Dallas and Fort Worth Local Ordinances', desc: 'Both cities have some additional tenant protection ordinances beyond state law — verify current provisions at dallas.gov and fortworthtexas.gov.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#1a1d27', borderRadius: 10, padding: 18, border: '1px solid #2a2d3a', display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>⚡ Issue Quick Reference</h2>
          <p style={{ color: '#9ca3af', marginBottom: 16 }}>Select your situation for the relevant Texas law summary and recommended action:</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10, marginBottom: 24 }}>
            {issueTypes.map(issue => (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                style={{
                  background: selectedIssue === issue.id ? '#1e3a5f' : '#1a1d27',
                  border: `1px solid ${selectedIssue === issue.id ? '#3b82f6' : '#2a2d3a'}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  color: selectedIssue === issue.id ? '#93c5fd' : '#d1d5db',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: severityColor(issue.severity),
                  flexShrink: 0,
                  display: 'inline-block',
                }} />
                {issue.label}
              </button>
            ))}
          </div>

          {result && (
            <div style={{ background: '#111827', borderRadius: 12, padding: 28, border: `1px solid ${severityColor(result.severity)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff' }}>{result.label}</h3>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: '#1a1d27', color: '#6b7280', padding: '3px 10px', borderRadius: 6, fontSize: 12 }}>{result.law}</span>
                  <span style={{ background: '#1a1d27', color: severityColor(result.severity), padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{result.severity}</span>
                </div>
              </div>
              <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: 16 }}>{result.summary}</p>
              <div style={{ background: '#1a1d27', borderRadius: 8, padding: 18 }}>
                <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 8 }}>Recommended Action:</p>
                <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>{result.action}</p>
              </div>
            </div>
          )}
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>📸 Security Deposit Best Practices</h2>
          <div style={{ background: '#1a1d27', borderRadius: 12, padding: 24, border: '1px solid #2a2d3a' }}>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: 12 }}>
              Document property condition at <strong style={{ color: '#60a5fa' }}>both move-in and move-out</strong> with date-stamped photos of every room, appliance, and surface. Email the photos to yourself or the landlord immediately — creating a timestamped record.
            </p>
            <p style={{ color: '#9ca3af', fontSize: 14 }}>
              Most deposit disputes come down to documentation. A landlord with photographic evidence beats a tenant without it every time — and vice versa.
            </p>
          </div>
        </section>

        <section>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f2544)', borderRadius: 16, padding: 36, textAlign: 'center', border: '1px solid #3b82f6' }}>
            <span style={{ fontSize: 36 }}>🤖</span>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', margin: '16px 0 12px' }}>TrustyPro for Landlords</h2>
            <p style={{ color: '#93c5fd', lineHeight: 1.7, marginBottom: 24, maxWidth: 540, margin: '0 auto 24px' }}>
              AI scanning documents property condition objectively at tenant turnover — creating a legally defensible, timestamped record that reduces deposit disputes before they happen.
            </p>
            <a
              href="/waitlist/homeowner"
              style={{ display: 'inline-block', background: '#3b82f6', color: '#ffffff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}
            >
              Get a Free Property Scan →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
