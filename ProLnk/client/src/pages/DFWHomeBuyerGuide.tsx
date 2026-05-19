import { useState } from 'react';

export default function DFWHomeBuyerGuide() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            DFW HOMEOWNER RESOURCE
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#0A1628', lineHeight: 1.15, margin: '0 0 20px' }}>
            DFW Home Buyer's Guide — What Every New Dallas-Fort Worth Homeowner Needs to Know
          </h1>
          <p style={{ fontSize: 18, color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
            Buying a home in the Dallas-Fort Worth metroplex is one of the biggest financial decisions you'll make. This guide covers the market realities, the first-year essentials, and the costs most new buyers don't see coming.
          </p>
        </div>

        {/* DFW Market Overview */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0A1628', marginBottom: 24, borderBottom: '3px solid #F5C842', paddingBottom: 12 }}>
            DFW Market Overview
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Median Home Price', value: '$380,000', note: 'Up 12% since 2022' },
              { label: 'Property Tax Rate', value: '2.1–2.5%', note: 'One of highest in US' },
              { label: 'State Income Tax', value: '0%', note: 'Offsets property tax burden' },
              { label: 'Homestead Exemption', value: '$100K', note: 'On school district taxes' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '20px 18px' }}>
                <div style={{ fontSize: 13, color: '#718096', fontWeight: 600, marginBottom: 6 }}>{stat.label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#A0AEC0' }}>{stat.note}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#EBF4FF', border: '1px solid #BEE3F8', borderRadius: 10, padding: '18px 20px' }}>
            <strong style={{ color: '#0A1628' }}>The tax trade-off:</strong>{' '}
            <span style={{ color: '#2D3748' }}>Texas has no state income tax, which attracts buyers from high-tax states. However, property taxes of 2.1–2.5% annually mean a $380K home costs $7,980–$9,500/year in property taxes alone — before insurance, HOA, or maintenance.</span>
          </div>
        </section>

        {/* Before You Buy Checklist */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0A1628', marginBottom: 24, borderBottom: '3px solid #F5C842', paddingBottom: 12 }}>
            Before You Buy — The DFW Checklist
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                title: 'Get pre-approved (know your real budget)',
                detail: 'Pre-approval gives you negotiating power in a competitive market. Know your ceiling before falling in love with a home. Factor in property taxes — they add $650–$800/month to a $380K purchase.'
              },
              {
                title: 'Research school districts — they affect resale 5–15%',
                detail: 'FISD, Coppell ISD, Carroll ISD, and Highland Park ISD consistently command price premiums. Even if you have no children, school district reputation directly impacts resale value and buyer pool.'
              },
              {
                title: 'Understand property tax rates by city and county',
                detail: 'Rates vary significantly: Frisco and McKinney run ~2.3%, while some inner Dallas neighborhoods run closer to 2.5%+. Always verify the exact rate for the specific address, not just the city average.'
              },
              {
                title: 'Factor in HOA fees ($0–$500+/month)',
                detail: 'Master-planned communities in Prosper, Celina, and Frisco often carry HOA fees of $150–$400+/month plus special assessments. Request the last 3 years of HOA financials and read the CC&Rs before making an offer.'
              },
              {
                title: 'Budget for maintenance (1–2% of home value per year)',
                detail: 'On a $380K home, that’s $3,800–$7,600 per year in expected maintenance. In DFW, with clay soil, extreme weather, and hard water, budget closer to 2%. This is not optional money — it’s home preservation capital.'
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => toggle(`buy-${i}`)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F5C842', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#0A1628', flexShrink: 0 }}>{i + 1}</div>
                  <span style={{ fontWeight: 600, color: '#0A1628', flex: 1 }}>{item.title}</span>
                  <span style={{ color: '#A0AEC0', fontSize: 18 }}>{openSection === `buy-${i}` ? '−' : '+'}</span>
                </div>
                {openSection === `buy-${i}` && (
                  <div style={{ padding: '0 20px 18px 62px', color: '#4A5568', lineHeight: 1.7, fontSize: 15 }}>{item.detail}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* First Year Ownership Guide */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0A1628', marginBottom: 24, borderBottom: '3px solid #F5C842', paddingBottom: 12 }}>
            First Year Ownership Guide
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: '🏛️', title: 'File Homestead Exemption', timing: 'By April 30', detail: 'Saves $1,500–$2,500/year on school district taxes. File with your county appraisal district. Takes 5 minutes online. Miss this deadline and wait another full year.' },
              { icon: '🛡️', title: 'Get a Home Warranty', timing: 'First 30 days', detail: 'The first year is when appliance surprises happen. A $500–$700/year warranty covers HVAC, water heater, appliances, and plumbing up to defined limits. Pay for 13 months so Year 2 renewal negotiations start from a position of history.' },
              { icon: '❄️', title: 'HVAC Inspection', timing: 'Within 90 days', detail: 'DFW HVAC systems run 8–10 months per year. Have a certified tech inspect coils, refrigerant, drain lines, and filter situation. Identify issues before summer heat hits. Cost: $80–$150.' },
              { icon: '🔥', title: 'Test Smoke & CO Detectors', timing: 'Day 1', detail: 'Test every detector. Replace batteries even if they seem fine. Texas law requires interconnected smoke alarms in new construction — verify older homes have adequate coverage.' },
              { icon: '🔒', title: 'Change All Locks', timing: 'Day 1', detail: 'The sellers gave you their set of keys. You have no idea how many copies exist. Rekeying all locks costs $20–$40 per lock. Consider adding a smart lock for the front door ($150–$300).' },
              { icon: '🔧', title: 'Locate All Shutoffs', timing: 'First week', detail: 'Water main shutoff, individual fixture shutoffs, gas shutoff at meter, main electrical panel location and labeling. A burst pipe found fast is a $500 repair. Found slow, it’s a $15,000 remediation.' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '22px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ display: 'inline-block', background: '#FEFCBF', color: '#744210', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}>{item.timing}</div>
                  </div>
                </div>
                <p style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DFW-Specific First Year Costs */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0A1628', marginBottom: 24, borderBottom: '3px solid #F5C842', paddingBottom: 12 }}>
            DFW-Specific First Year Costs to Budget For
          </h2>
          <p style={{ color: '#4A5568', marginBottom: 20, lineHeight: 1.7 }}>
            These costs are specific to the DFW climate and environment. Most buyers from other states are blindsided by them.
          </p>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0A1628' }}>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: '#fff', fontWeight: 600, fontSize: 14 }}>Item</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: '#fff', fontWeight: 600, fontSize: 14 }}>Annual Cost</th>
                  <th style={{ textAlign: 'left', padding: '14px 20px', color: '#fff', fontWeight: 600, fontSize: 14 }}>Why DFW</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { item: 'Foundation watering system', cost: '$200–400/year', why: 'Blackland Prairie clay soil expands and contracts — controlled moisture prevents foundation movement' },
                  { item: 'Pest control', cost: '$400–600/year', why: 'Termites, fire ants, and scorpions are active year-round in North Texas climate' },
                  { item: 'HVAC filter replacement', cost: '$60–120/year', why: 'Systems run ~10 months/year; more cycles = more filter changes needed' },
                  { item: 'Lawn care / irrigation', cost: '$600–1,200/year', why: 'Clay soil + extreme summer heat + water restrictions require active lawn management' },
                ].map((row, i) => (
                  <tr key={row.item} style={{ background: i % 2 === 0 ? '#FAFAF9' : '#fff', borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: '#0A1628', fontSize: 14 }}>{row.item}</td>
                    <td style={{ padding: '14px 20px', color: '#2D7D46', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>{row.cost}</td>
                    <td style={{ padding: '14px 20px', color: '#4A5568', fontSize: 13 }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background: '#FFFBEB', border: '1px solid #F6E05E', borderRadius: 10, padding: '16px 20px', marginTop: 16 }}>
            <strong style={{ color: '#744210' }}>Total first-year budget add-on: $1,260–$2,320/year</strong>
            <span style={{ color: '#92400E' }}> — above standard maintenance. Plan for this before you close.</span>
          </div>
        </section>

        {/* TrustyPro CTA */}
        <section style={{ background: '#0A1628', borderRadius: 16, padding: '40px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5C842', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
            TRUSTYPRO FOR NEW HOMEOWNERS
          </div>
          <h3 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 16px' }}>
            Get Your AI Home Health Score Within 90 Days of Purchase
          </h3>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 28px' }}>
            Know exactly what you have. TrustyPro scans your home's systems, flags DFW-specific risks, and creates a personalized maintenance plan before small issues become expensive ones.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}
          >
            Join the Homeowner Waitlist →
          </a>
        </section>
      </div>
    </div>
  );
}
