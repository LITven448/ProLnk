import { useState } from 'react';

const whyInspectors = [
  { icon: '🔍', title: 'You See Every Problem', desc: 'Inspectors identify every defect in every home — making you the perfect guide for what comes next.' },
  { icon: '🤝', title: 'Trusted at the Critical Moment', desc: 'Buyers trust your recommendations more than any other professional at the purchase decision point.' },
  { icon: '💰', title: 'Referral Income', desc: 'Earn commissions when buyers you refer use ProLnk to fix the issues you found in your report.' },
  { icon: '🏠', title: 'Origination Rights', desc: 'Register each home you inspect and earn a permanent slice of every future service transaction there.' },
];

const script = [
  { step: 'In the Report', text: 'Add a section: "Next Steps for Buyers" with ProLnk highlighted as your recommended platform for finding vetted contractors to address the items in this report.' },
  { step: 'At the Walkthrough', text: '"I always recommend ProLnk for finding contractors to fix what we found today. They pre-screen all their pros — no random Google searches."' },
  { step: 'Follow-Up Email', text: 'Send the inspection report with a ProLnk referral link: "Here\’s the report — and here\’s where I\’d start for contractors."' },
  { step: 'Social Proof', text: 'Share inspection statistics: "X% of homes I inspect have HVAC issues — here\’s how ProLnk buyers got theirs fixed fast."' },
];

export default function DFWHomeInspectorProLnkGuide() {
  const [monthlyInspections, setMonthlyInspections] = useState(18);
  const [avgIssues, setAvgIssues] = useState(7);

  const annualInspections = monthlyInspections * 12;
  const conversionRate = 0.4;
  const convertedBuyers = Math.round(annualInspections * conversionRate);
  const avgJobValue = 285;
  const issuesAddressed = Math.round(convertedBuyers * avgIssues * 0.6);
  const referralIncome = Math.round(issuesAddressed * avgJobValue * 0.04);
  const originationResidue = Math.round(annualInspections * 18 * 12);
  const networkIncome = Math.round(convertedBuyers * 28);
  const total = referralIncome + originationResidue + networkIncome;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1a2233', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>ProLnk for DFW Home Inspectors</h1>
        <p style={{ fontSize: 18, color: '#F5E642', margin: 0 }}>You find the problems. ProLnk connects buyers to the pros who fix them — and pays you for it.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>The Inspector Advantage</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 12 }}>
            No professional in real estate has more visibility into home condition — and more trust — than the inspector. You walk
            through every room, document every defect, and hand buyers a roadmap of exactly what needs to be fixed. That list is
            a ProLnk gold mine.
          </p>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            When you refer buyers to ProLnk to address your inspection findings, you earn a commission on every job they complete.
            And when you register the home in the ProLnk Health Vault (takes 2 minutes post-inspection), you lock in origination
            rights — income that continues every month, from every future service call at that address, permanently.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {whyInspectors.map((w) => (
            <div key={w.title} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{w.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{w.title}</div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{w.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📊 Inspector Income Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Monthly Inspections</label>
              <input type="range" min={5} max={60} value={monthlyInspections} onChange={(e) => setMonthlyInspections(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{monthlyInspections}/mo</div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Avg Issues Found Per Inspection</label>
              <input type="range" min={3} max={20} value={avgIssues} onChange={(e) => setAvgIssues(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#0A1628', fontSize: 20 }}>{avgIssues} issues</div>
            </div>
          </div>
          <div style={{ background: '#fefce8', borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 13, color: '#713f12' }}>
            📌 Assuming 40% buyer conversion + 60% of issues addressed via ProLnk — {convertedBuyers} buyers, {issuesAddressed} jobs/year
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { label: 'Referral Commissions', value: `$${referralIncome.toLocaleString()}`, sub: 'per year' },
              { label: 'Origination Residual', value: `$${originationResidue.toLocaleString()}`, sub: 'annual recurring' },
              { label: 'Network Override', value: `$${networkIncome.toLocaleString()}`, sub: 'per year' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#f8f9fb', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 4 }}>Estimated Total Annual ProLnk Income</div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>${total.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Estimates only. Based on DFW averages.</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🗣️ How to Have the Conversation with Buyers</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {script.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 10px', fontWeight: 800, fontSize: 12, whiteSpace: 'nowrap', marginTop: 2 }}>{s.step}</div>
                <div style={{ color: '#4a5568', lineHeight: 1.6, fontSize: 14 }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Your Inspection Reports Are Worth More Than You Think</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Join DFW inspectors already earning ProLnk income. Charter tier locks in maximum rates before waitlist closes.</p>
          <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 36px', borderRadius: 50, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block' }}>
            Apply as a Partner Inspector →
          </a>
        </div>
      </div>
    </div>
  );
}
