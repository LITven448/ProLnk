import { useState } from 'react';

const timelines = [
  { id: 'week1', label: '📦 First Week', icon: '📦' },
  { id: 'month1', label: '🏠 First Month', icon: '🏠' },
  { id: 'month3', label: '📋 First 90 Days', icon: '📋' },
  { id: 'year1', label: '📅 First Year', icon: '📅' },
  { id: 'ongoing', label: '🔄 Ongoing', icon: '🔄' },
];

const guides: Record<string, { title: string; desc: string; tag: string }[]> = {
  week1: [
    { title: 'DFW Utility Setup Checklist — First 48 Hours', desc: 'Oncor electric, Atmos gas, water districts, and internet setup in DFW.', tag: 'Urgent' },
    { title: 'Emergency Contacts Every DFW Homeowner Needs', desc: 'HVAC, plumber, electrician, locksmith — pre-vetted DFW contacts.', tag: 'Emergency' },
    { title: 'Home Security System Setup in DFW', desc: 'ADT, Ring, SimpliSafe — which works best in North Texas neighborhoods.', tag: 'Safety' },
    { title: 'Change Your Locks Before Moving In — DFW Guide', desc: 'Rekeying vs replacing and why it matters in Texas.', tag: 'Security' },
  ],
  month1: [
    { title: 'DFW Homestead Exemption Filing Guide 2026', desc: 'File by April 30 to save thousands on property taxes.', tag: 'Save Money' },
    { title: 'HVAC Filter Schedule for DFW New Homeowners', desc: 'DFW dust and pollen make 30-day changes critical.', tag: 'Maintenance' },
    { title: 'DFW HOA Introduction — What New Homeowners Must Know', desc: 'CC&Rs, dues, approval processes, and dispute rights in Texas.', tag: 'HOA' },
    { title: 'Foundation Watering Setup for New DFW Homeowners', desc: 'Start your soaker hose routine immediately in North Texas clay.', tag: 'Critical' },
  ],
  month3: [
    { title: 'DFW Home Inspection After Moving In — What to Check', desc: '90-day owner walk-through checklist for North Texas homes.', tag: 'Inspection' },
    { title: 'Setting Up ProLnk for Your DFW Home', desc: 'Add your home to ProLnk and get matched with vetted pros.', tag: '⭐ ProLnk' },
    { title: 'DFW School District Enrollment for New Residents', desc: 'DISD, FWISD, Plano ISD, and 20+ other DFW districts explained.', tag: 'Family' },
    { title: 'Texas Homeowners Insurance Review Guide', desc: 'Make sure your policy covers hail, wind, and foundation properly.', tag: 'Insurance' },
  ],
  year1: [
    { title: 'Year 1 Home Maintenance Schedule for DFW', desc: 'Month-by-month maintenance tasks for North Texas climate.', tag: 'Schedule' },
    { title: 'DFW Property Tax Protest Guide 2026', desc: 'How to protest your appraisal and win — step by step.', tag: 'Save Money' },
    { title: 'Seasonal HVAC Tune-Up Schedule for DFW', desc: 'Spring AC check and fall heat check timing for North Texas.', tag: 'HVAC' },
    { title: 'First-Year Tree and Landscaping Guide for DFW', desc: 'Native plants, watering restrictions, and foundation-safe trees.', tag: 'Landscaping' },
  ],
  ongoing: [
    { title: 'DFW Home Health Vault — Track Your Home\'s History', desc: 'Store repair records, warranties, and permit history digitally.', tag: 'ProLnk' },
    { title: 'Annual DFW Home Maintenance Budget Guide', desc: '1-3% rule applied to North Texas average home values.', tag: 'Budgeting' },
    { title: 'DFW Neighborhood Resources and Community Guide', desc: 'NextDoor, local Facebook groups, and city resource portals.', tag: 'Community' },
    { title: 'Sell or Stay? DFW Equity and Upgrade Planning', desc: 'When to tap equity for improvements vs sell in DFW market.', tag: 'Long-Term' },
  ],
};

export default function DFWNewHomeownerResourceHub2026() {
  const [active, setActive] = useState('week1');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔑🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            DFW New Homeowner Complete Resource Hub 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>
            Everything you need, organized by when you need it — from move-in day through your first year in North Texas.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {timelines.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: '10px 20px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: active === t.id ? '#F5E642' : '#1e3a5f', color: active === t.id ? '#0A1628' : '#94a3b8',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 40 }}>
          {guides[active].map((g, i) => (
            <div key={i} style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d4a7a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', margin: 0, flex: 1, marginRight: 8 }}>{g.title}</h3>
                <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap' }}>{g.tag}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>{g.desc}</p>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Read Guide →
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Your DFW Home Care Partner</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects new DFW homeowners with vetted service pros for every home need — from day one.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Register Your DFW Home on ProLnk →
          </button>
        </div>
      </div>
    </div>
  );
}