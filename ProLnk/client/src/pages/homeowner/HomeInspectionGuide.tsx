import { useState } from 'react';
import HomeownerLayout from '../../components/layouts/HomeownerLayout';

export default function HomeInspectionGuide() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggle = (id: string) => setOpenItem(openItem === id ? null : id);

  const missed = [
    {
      id: 'foundation',
      title: 'Foundation Elevation Survey',
      badge: 'Separate $350 Test',
      detail: 'Standard inspectors visually check the foundation for visible cracks and bowing, but they do not perform elevation surveys. A slab foundation elevation survey (done with a water level or digital level) measures differential settlement across the slab. In DFW clay soil, differentials over 1.5 inches indicate active movement. This is a completely separate service — ask for a SLAB-A-LYZER or engineer’s elevation certificate.'
    },
    {
      id: 'roof',
      title: 'Roof Physical Inspection',
      badge: 'Liability Limitation',
      detail: 'Many DFW inspectors will not physically walk the roof due to liability and safety concerns. They use binoculars from the ground or a drone. This means hail bruising, soft spots, lifted flashings, and deteriorated sealant may be completely missed. If the roof is over 5 years old, pay for a separate roofing specialist who will physically get on the roof.'
    },
    {
      id: 'sewer',
      title: 'Sewer Line Camera Scope',
      badge: 'Not Included — $250–350',
      detail: 'Standard inspections do not include sewer line scoping. In homes built before 2000, cast iron drain lines are common. These corrode, develop root intrusion, and collapse — and none of this is visible without a camera. A sewer scope runs $250–$350 and takes 30 minutes. For pre-2000 homes, it’s non-negotiable. A failed sewer line is a $5,000–$15,000 repair.'
    },
    {
      id: 'pool',
      title: 'Pool and Spa Inspection',
      badge: 'Separate Inspector Needed',
      detail: 'General home inspectors are not certified pool inspectors and will often note "pool present, not inspected." A certified pool inspector checks equipment age and function, shell integrity, coping and decking, plumbing leaks, and electrical safety. Pools can have $3,000–$8,000 in deferred maintenance that’s invisible to the eye.'
    },
    {
      id: 'drainage',
      title: 'Foundation Drainage and Grading',
      badge: 'Not Evaluated in Detail',
      detail: 'Inspectors note obvious grading issues but don’t evaluate drainage comprehensively. In DFW, where clay soil directs water toward foundations during heavy rain, French drains, downspout extensions, and grading corrections can run $1,500–$5,000. Walk the perimeter yourself during or after rain, or hire a drainage specialist.'
    },
    {
      id: 'hail',
      title: 'Hail Damage Assessment',
      badge: 'Only Obvious Damage Detected',
      detail: 'Inspectors can identify obvious hail damage but are not roofing specialists and cannot assess the full extent. Hail bruises asphalt shingles in ways that accelerate granule loss and water intrusion over the following years — invisible to a non-specialist. After your inspection, request a roofing company’s hail damage assessment before closing.'
    },
  ];

  const addOns = [
    { service: 'Foundation Elevation Survey', cost: '$300–$500', when: 'All homes on clay soil', specialist: 'Structural engineer or foundation company' },
    { service: 'Sewer Camera Scope', cost: '$250–$350', when: 'All homes pre-2000 especially', specialist: 'Plumber with scope equipment' },
    { service: 'Roofing Specialist', cost: '$150–$300', when: 'Any roof 5+ years old or post-hail', specialist: 'Licensed roofing contractor' },
    { service: 'Pool Inspection', cost: '$200–$400', when: 'Any home with pool/spa', specialist: 'Certified pool inspector (NSPF/PHTA)' },
  ];

  const redFlags = [
    { flag: 'Foundation differential settlement > 1.5 inches', action: 'Require engineer’s report + foundation company bid before proceeding' },
    { flag: 'Active roof leaks or extensive hail bruising', action: 'Price reduction equal to full roof replacement cost ($12,000–$22,000)' },
    { flag: 'HVAC system 12+ years old', action: 'Negotiate $3,000–$5,000 credit or seller replacement' },
    { flag: 'Sewer line root intrusion or collapse on scope', action: 'Price reduction or repair contingency before close' },
    { flag: 'Evidence of prior flooding or water intrusion', action: 'Full moisture testing + mold assessment ($500–$1,200) before proceeding' },
    { flag: 'Electrical panel known issues (Federal Pacific, Zinsco)', action: 'Full panel replacement credit ($2,500–$4,500) — these are fire hazards' },
    { flag: 'Polybutylene plumbing (PB pipe)', action: 'Negotiate full repiping credit — PB fails without warning, $4,000–$8,000 to repipe' },
    { flag: 'Unpermitted additions or converted spaces', action: 'Require permit pull and inspection by city before close — or significant price reduction for the liability' },
  ];

  return (
    <HomeownerLayout>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, fontSize: 12, letterSpacing: 1.5, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            BUYER INTELLIGENCE
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
            DFW Home Inspection Guide — What Inspectors Miss and What to Look For Yourself
          </h1>
          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.75, margin: 0 }}>
            A standard home inspection is a starting point — not a complete picture. In DFW, the stakes are higher because the risks are higher. Here's exactly what to add, what to watch for, and when to walk away.
          </p>
        </div>

        {/* What a Standard Inspection Covers */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 20, borderBottom: '2px solid #F5C842', paddingBottom: 10 }}>
            What a Standard Inspection Covers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
            {[
              { num: '400+', label: 'Items checked' },
              { num: '2–3 hrs', label: 'Typical duration' },
              { num: '$300–500', label: 'Typical cost' },
            ].map((s) => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '18px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#F5C842', marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '18px 20px' }}>
            <p style={{ color: '#CBD5E0', lineHeight: 1.75, margin: 0 }}>
              A licensed inspector walks through structure (foundation, roof, walls, windows), systems (electrical, plumbing, HVAC), and interior (ceilings, floors, doors, attic). They document visible defects and safety hazards. What they don't do: invasive testing, specialty system inspection, or engineering-level analysis. In DFW, that gap is where the expensive surprises live.
            </p>
          </div>
        </section>

        {/* What Inspectors Miss */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8, borderBottom: '2px solid #F5C842', paddingBottom: 10 }}>
            What Inspectors Miss (or Skip) in DFW
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: 20, lineHeight: 1.7 }}>
            These are the highest-cost items that fall outside the standard inspection scope.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {missed.map((item) => (
              <div
                key={item.id}
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${openItem === item.id ? '#F5C842' : 'rgba(255,255,255,0.1)'}`, borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => toggle(item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, color: '#fff', marginRight: 12 }}>{item.title}</span>
                    <span style={{ display: 'inline-block', background: '#7C3AED', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4 }}>{item.badge}</span>
                  </div>
                  <span style={{ color: '#94A3B8', fontSize: 18, flexShrink: 0 }}>{openItem === item.id ? '−' : '+'}</span>
                </div>
                {openItem === item.id && (
                  <div style={{ padding: '0 20px 18px', color: '#CBD5E0', lineHeight: 1.75, fontSize: 14 }}>{item.detail}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Add-Ons Table */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 20, borderBottom: '2px solid #F5C842', paddingBottom: 10 }}>
            DFW-Specific Items to Add to Your Inspection
          </h2>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['Service', 'Cost', 'When to Get It', 'Who to Call'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '13px 16px', color: '#94A3B8', fontWeight: 600, fontSize: 12, letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {addOns.map((row, i) => (
                  <tr key={row.service} style={{ borderBottom: i < addOns.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <td style={{ padding: '13px 16px', fontWeight: 600, color: '#fff', fontSize: 13 }}>{row.service}</td>
                    <td style={{ padding: '13px 16px', color: '#F5C842', fontWeight: 700, fontSize: 13 }}>{row.cost}</td>
                    <td style={{ padding: '13px 16px', color: '#CBD5E0', fontSize: 13 }}>{row.when}</td>
                    <td style={{ padding: '13px 16px', color: '#94A3B8', fontSize: 12 }}>{row.specialist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Red Flags */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8, borderBottom: '2px solid #F5C842', paddingBottom: 10 }}>
            Red Flag List — 8 Items That Should Trigger Renegotiation
          </h2>
          <p style={{ color: '#94A3B8', marginBottom: 20, lineHeight: 1.7 }}>
            If any of these appear in your inspection report or add-on assessments, don't walk away — renegotiate. These are priced items with clear remedies.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {redFlags.map((item, i) => (
              <div key={i} style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, background: '#DC2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#FCA5A5', marginBottom: 4, fontSize: 14 }}>{item.flag}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}><strong style={{ color: '#CBD5E0' }}>Action:</strong> {item.action}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* After Inspection */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 20, borderBottom: '2px solid #F5C842', paddingBottom: 10 }}>
            After Inspection — Repairs vs. Price Reduction
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: '22px 20px' }}>
              <div style={{ fontWeight: 700, color: '#86EFAC', marginBottom: 12, fontSize: 16 }}>✓ Ask for Seller Repairs When</div>
              <ul style={{ color: '#CBD5E0', lineHeight: 1.8, margin: 0, paddingLeft: 18, fontSize: 14 }}>
                <li>Issue is safety-related (electrical, gas leaks)</li>
                <li>Repair is straightforward and cost is clear</li>
                <li>Item would fail re-inspection</li>
                <li>Seller has contractors or relationships to fix it cheaper</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 10, padding: '22px 20px' }}>
              <div style={{ fontWeight: 700, color: '#F5C842', marginBottom: 12, fontSize: 16 }}>$ Ask for Price Reduction When</div>
              <ul style={{ color: '#CBD5E0', lineHeight: 1.8, margin: 0, paddingLeft: 18, fontSize: 14 }}>
                <li>Repair is complex with uncertain final cost</li>
                <li>You want to choose your own contractor</li>
                <li>Seller's fix might use lowest-cost method</li>
                <li>Issue is deferred maintenance (roof age, HVAC age)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TrustyPro CTA */}
        <section style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 16, padding: '36px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5C842', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
            POST-PURCHASE INTELLIGENCE
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 14px' }}>
            Get AI-Powered Ongoing Monitoring After Purchase
          </h3>
          <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 26px' }}>
            A home inspection is a snapshot. TrustyPro gives you a continuous picture — tracking your home's systems, flagging DFW-specific risks before they escalate, and connecting you with verified pros when you need them.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '13px 30px', borderRadius: 8, textDecoration: 'none' }}
          >
            Join the Homeowner Waitlist →
          </a>
        </section>
      </div>
    </HomeownerLayout>
  );
}
