import { useState } from 'react';

const faqs = [
  {
    q: "🌨️ How do I know if hail damaged my DFW roof?",
    a: "After a DFW hail storm, look for these signs: dents on metal vents, gutters, and downspouts (the easiest to spot from the ground); bruised or cracked asphalt shingles with a soft spot when pressed; granule loss creating bald patches; and cracked or dented ridge caps. On the ground, check for piles of granules in your gutters or at downspout exits. When in doubt, have a licensed DFW roofing contractor or independent inspector evaluate — storm season hail damage must be filed within 1–2 years per Texas law."
  },
  {
    q: "📋 When should I file a hail damage insurance claim in DFW?",
    a: "File within 1 year of the storm date — Texas law (TIC 542A) gives insurers specific timelines and your window to file starts at the storm date, not the date you discover damage. Don't wait for the damage to worsen. Before filing: get a roofing contractor to document damage with photos, measurements, and a report. File the claim yourself — never let a storm chaser or public adjuster file on your behalf without reading their contract first, as some take 10–30% of your settlement. After filing, you have the right to request a re-inspection if the initial adjuster misses damage."
  },
  {
    q: "⏱️ How long does a DFW roof installation take?",
    a: "Most DFW residential roofing jobs take 1–3 days once materials are delivered. A standard 2,000 sq ft single-story home with 25 squares of shingles: 1 day for tear-off and install, 1 day for trim and cleanup. Larger homes, complex roof lines, or tile/metal roofing take 3–7 days. DFW's unpredictable spring weather can cause delays — your contractor should have a rain contingency plan. Materials typically arrive 1–5 business days after your permit is pulled (required in most DFW municipalities)."
  },
  {
    q: "🛡️ What is a Class 4 impact-resistant shingle and do I need one in DFW?",
    a: "Class 4 is the highest impact resistance rating for asphalt shingles, tested by dropping a 2-inch steel ball from 20 feet. In DFW — one of the highest hail frequency regions in the US — Class 4 shingles are worth the 15–25% premium because most Texas insurers offer 15–30% premium discounts for Class 4 roofs, reducing your annual cost. Over a 25-year roof life, the discount typically offsets the upfront cost entirely. Ask your insurer for the specific discount percentage before choosing materials. Top DFW-rated Class 4 shingles: Owens Corning Duration Flex, GAF Timberline HDZ."
  },
  {
    q: "🏗️ Should I get a metal roof in DFW?",
    a: "Metal roofing is an excellent choice for DFW if you plan to stay in the home 20+ years. Standing seam metal reflects 40–70% of solar heat, cutting cooling costs $300–$600/year in DFW summers. It's Class 4 rated and handles DFW hail far better than asphalt. Cost: $18,000–$45,000 for a typical DFW home vs. $8,000–$18,000 for premium asphalt. Lifespan: 40–70 years vs. 20–30 for shingles. Drawback: loud during DFW thunderstorms without proper insulation backing. Best for: long-term owners, energy-conscious homeowners, and those tired of filing hail claims."
  },
  {
    q: "💧 What's the most common DFW roof leak cause?",
    a: "In DFW, the #1 cause of roof leaks is flashing failure — the metal strips that seal joints around chimneys, skylights, vents, and where the roof meets a wall. DFW's extreme heat (170°F+ on dark shingles in summer) causes flashing sealant to dry and crack within 5–7 years. Second most common: lifted or missing shingles after high-wind events (DFW sees 60–80 mph wind gusts multiple times per year). Always address leaks immediately — DFW's intense rain events (3–5 inches in hours) can cause major interior damage from even a small leak."
  },
  {
    q: "🌬️ How do I know if my DFW attic ventilation is adequate?",
    a: "Proper attic ventilation is critical in DFW — inadequate ventilation lets attic temps reach 160–180°F, cooking shingles from below and driving up AC costs. Signs of poor ventilation: excessive AC bills, ice dams in rare DFW freeze events, or visible daylight only from soffit vents without ridge vents. The standard is 1 sq ft of net free vent area per 150 sq ft of attic floor. A balanced system has equal intake (soffits) and exhaust (ridge or gable). Have a roofer inspect ventilation during your next estimate — it's often fixable at low cost."
  },
  {
    q: "📐 How many roofing squares does my DFW home need?",
    a: "A roofing square = 100 sq ft of roof surface. Roof surface area is always larger than floor area due to pitch. A 2,000 sq ft DFW ranch home with a 4/12 pitch typically has 22–26 squares. A two-story with steeper pitch might have 30–35 squares. Roofing contractors measure this precisely during estimates. Knowing your approximate square count helps you evaluate bids — if estimates vary dramatically in square count, one contractor is measuring incorrectly. Always get at least 3 bids and ask each to show you their measurement."
  },
  {
    q: "🔍 What permits are required for DFW roofing?",
    a: "Most DFW municipalities require a permit for full roof replacements. Cities including Dallas, Fort Worth, Plano, Frisco, and McKinney all require permits and inspections. The permit process typically adds $150–$400 and 2–5 days. Contractors who offer to skip permits are a red flag — if discovered during a future home sale or insurance claim, unpermitted work can void warranties and complicate closing. Verify permit status by looking up your address on your city's permit portal after your contractor says it was pulled."
  },
  {
    q: "🔎 How do I find a trustworthy DFW roofer after a storm?",
    a: "After major DFW hail events, out-of-state storm chasers flood the Metroplex with door-to-door solicitations. Warning signs: out-of-state plates, pressure to sign immediately, offers to waive your deductible (insurance fraud in Texas). Verify any roofer holds a Texas contractor registration (required since 2019) at tdlr.texas.gov, has a physical DFW office address, and pulls their own permits. Ask for 5 local references from DFW jobs in the past 12 months. ProLnk pre-vets all roofing contractors to confirm licensing, insurance, and local track record."
  }
];

export default function DFWRoofingFAQTop10DFW2026() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Top 10 Roofing FAQs 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Most common DFW roofing questions — hail, claims, materials, and contractors</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#0F2040′ : '#0D1E35', border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: ’pointer', transition: 'all 0.2s' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{faq.q}</div>
              {selected === i && (
                <div style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36, padding: 20, backgroundColor: '#0D1E35', borderRadius: 10, border: '1px solid #F5E642′ }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a vetted DFW roofer?</p>
          <p style={{ color: '#8899AA', fontSize: 13 }}>ProLnk matches DFW homeowners with licensed, insured roofing contractors — no storm chasers.</p>
        </div>
      </div>
    </div>
  );
}