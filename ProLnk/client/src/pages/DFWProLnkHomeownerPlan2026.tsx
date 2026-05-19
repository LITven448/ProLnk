import { useState } from 'react';

const yearPlans: Record<string, { title: string; icon: string; steps: { step: string; detail: string }[]; value: string }> = {
  'year-1': {
    title: 'Year 1 — Foundation',
    icon: '🏗️',
    steps: [
      { step: 'Set Up ProLnk Profile', detail: 'Add your DFW home address, square footage, year built, and current systems (HVAC brand, water heater age, roof year). Takes 10 minutes.' },
      { step: 'Add Home to the Vault', detail: 'Upload your home inspection report, warranty documents, and any service records you have. The Vault stores everything permanently.' },
      { step: 'Get Your First 3 Services', detail: 'Use ProLnk for HVAC tune-up, any plumbing work, and one other trade. Build your Vault service history and rate each pro.' },
      { step: 'Connect With Charter Pros', detail: 'Save your top-rated pros to your preferred list. They will see your home in the Vault for faster, more accurate future quotes.' },
    ],
    value: 'End of Year 1: Complete home profile, first service records in Vault, 3 trusted pro relationships.',
  },
  'year-2': {
    title: 'Year 2 — Value Building',
    icon: '📈',
    steps: [
      { step: 'Expand Service History', detail: 'Every service logged adds data to your Home Health Score. Score improves with each verified, completed service.' },
      { step: 'Use Vault for Refinance', detail: 'DFW home refinances average $800 in fees. Vault data reduces appraiser uncertainty — lenders see complete maintenance history.' },
      { step: 'HOA Documentation', detail: 'Use Vault records as proof of maintenance for HOA compliance checks. Roofing, gutters, and exterior work are all documented.' },
      { step: 'Annual Home Health Review', detail: 'ProLnk sends an annual home health report based on your Vault data. Shows what is aging and what to plan for next year.' },
    ],
    value: 'End of Year 2: Home Health Score established, refinance-ready documentation, HOA-proof records.',
  },
  'year-3-plus': {
    title: 'Year 3+ — Permanent Asset',
    icon: '🏆',
    steps: [
      { step: 'Vault Adds Measurable Value', detail: 'Homes with complete ProLnk Vault history sell faster in DFW. Buyers see every repair, every service, every appliance date — reducing negotiation friction.' },
      { step: 'Trusted Pro Relationships', detail: 'By year 3, you have 3-5 pros who know your home. Faster quotes, better pricing, no repeat diagnosis fees. Network effect of consistent relationships.' },
      { step: 'Origination Rights Revenue', detail: 'As a Vault homeowner, you participate in the ProLnk Origination program. Other homeowners you refer earn you a permanent share of their platform activity.' },
      { step: 'Emergency Advantage', detail: 'When systems fail, Charter pros see your full home history instantly. No re-explaining your system — faster diagnosis, faster fix, lower emergency costs.' },
    ],
    value: 'Year 3+: Home sells faster and at higher price, trusted pro network, passive origination income.',
  },
};

const usageStats = [
  { label: 'Average DFW Service Jobs Per Year', value: '4-6' },
  { label: 'Average Savings With Charter Pros vs Yelp/Angi', value: '$340/yr' },
  { label: 'Vault ROI at Home Sale (avg)', value: '$1,200+' },
  { label: 'Time to Set Up ProLnk Profile', value: '10 min' },
];

export default function DFWProLnkHomeownerPlan2026() {
  const [selectedYear, setSelectedYear] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            ProLnk Homeowner Plan 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>How DFW homeowners use ProLnk to protect their home, save money, and build long-term value</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {usageStats.map(({ label, value }) => (
            <div key={label} style={{ background: '#112240', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{value}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 Your Homeownership Year → ProLnk Usage Guide</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {[['year-1', '🏗️ Year 1'], ['year-2', '📈 Year 2'], ['year-3-plus', '🏆 Year 3+']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setSelectedYear(k)}
                style={{ flex: 1, padding: '12px 0', background: selectedYear === k ? '#F5E642' : '#0d1f35', color: selectedYear === k ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 15 }}
              >
                {l}
              </button>
            ))}
          </div>
          {selectedYear && yearPlans[selectedYear] && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#F5E642', marginBottom: 16 }}>
                {yearPlans[selectedYear].icon} {yearPlans[selectedYear].title}
              </div>
              {yearPlans[selectedYear].steps.map(({ step, detail }, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: 16, marginBottom: 8, background: '#0d1f35', borderRadius: 10 }}>
                  <div style={{ width: 28, height: 28, background: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0A1628', flexShrink: 0, fontSize: 14 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{step}</div>
                    <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: '#1a3a1a', border: '1px solid #22c55e', borderRadius: 10, padding: 16, marginTop: 12 }}>
                <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 4 }}>🎯 Milestone</div>
                <div style={{ color: '#86efac', fontSize: 14 }}>{yearPlans[selectedYear].value}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏦 The Home Health Vault Explained</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>
            The Vault is a permanent, structured record of everything that has ever been serviced, replaced, or inspected in your DFW home. Unlike a folder of PDFs, the Vault is machine-readable — so when a pro quotes a job, they pull your Vault data and skip the 30-minute diagnosis that normally costs you $95-150.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📄', label: 'Service Records', detail: 'Every completed job with date, cost, and pro name' },
              { icon: '🔧', label: 'System Ages', detail: 'HVAC, water heater, roof, appliances — all tracked' },
              { icon: '⚠️', label: 'Open Issues', detail: 'Deferred repairs and monitoring items flagged' },
              { icon: '📈', label: 'Home Health Score', detail: 'AI-generated score improves with each service' },
            ].map(({ icon, label, detail }) => (
              <div key={label} style={{ background: '#0d1f35', borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Start Your ProLnk Homeowner Profile</h3>
          <p style={{ color: '#1e3a5f', marginBottom: 4 }}>Free to join. Add your DFW home. Get Charter pro access and start building your Vault.</p>
          <p style={{ color: '#0A1628', fontWeight: 700 }}>prolnk.io → Homeowner Signup</p>
        </div>
      </div>
    </div>
  );
}