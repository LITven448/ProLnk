import { useState } from 'react';

const faqs = [
  { category: 'HVAC', q: 'How often should I change HVAC filters?', a: 'In DFW, change 1-inch filters every 1-2 months due to dust and allergens. Thicker 4-inch filters can last 6-12 months. During high pollen season or if you have pets, change more frequently.' },
  { category: 'Foundation', q: 'When should I have my foundation checked?', a: 'Have your foundation inspected if you notice doors/windows sticking, cracks in drywall (especially diagonal), gaps between walls and ceiling, or visible cracks in the slab. DFW clay soil expands/contracts seasonally, so annual checks are wise.' },
  { category: 'Plumbing', q: 'How do I find a licensed plumber in DFW?', a: 'Verify licensing through the Texas State Board of Plumbing Examiners at tsbpe.texas.gov. Search by name or license number. Always ask for proof of insurance and pull permits for major work.' },
  { category: 'Contractors', q: 'What is a reasonable contractor deposit?', a: 'In Texas, 10-30% is standard for most projects. Never pay more than 50% upfront. For jobs over $5,000, structure payments tied to milestones. Get everything in writing before paying anything.' },
  { category: 'Permits', q: 'Do I need a permit for my patio?', a: 'Most DFW cities require permits for covered patios, decks over 30 inches high, and structures over 200 sq ft. Contact your city building department. Permit requirements vary by municipality.' },
  { category: 'Roofing', q: 'How do I know if my roof needs replacing vs repairing?', a: 'Repair if damage is isolated. Replace if shingles are curling/buckling across large areas, granules fill gutters, the roof is 20+ years old, or after major hail damage. Get 2-3 quotes.' },
  { category: 'Foundation', q: 'How much does foundation repair cost in DFW?', a: 'Pier installation typically costs $1,000-$1,500 per pier. Most DFW homes need 10-30 piers for a full repair, so expect $10,000-$40,000 for major work. Get at least 3 quotes.' },
  { category: 'HVAC', q: 'What size AC unit does my DFW home need?', a: 'Generally 1 ton per 400-600 sq ft in DFW climate. A 2,000 sq ft home typically needs 3.5-4 tons. Oversizing causes humidity problems; undersizing causes constant running. Always get a Manual J load calculation.' },
  { category: 'Plumbing', q: 'How do I shut off water to my house in an emergency?', a: 'Your main shutoff is typically near the street or where the main line enters your home. Turn clockwise to close. For burst pipes, shut off immediately and call a plumber.' },
  { category: 'Electrical', q: 'When do I need to upgrade my electrical panel?', a: 'Upgrade if your panel is 100 amps or less, breakers trip frequently, lights flicker, you are adding an EV charger, or the panel is a recalled brand (Federal Pacific, Zinsco). Cost: $2,000-$4,500 in DFW.' },
  { category: 'Permits', q: 'What home improvements require permits in Texas?', a: 'Structural changes, electrical panel upgrades, plumbing reroutes, HVAC replacements, additions, pools, and most exterior structures require permits. Cosmetic work typically does not.' },
  { category: 'Contractors', q: 'How do I verify a contractor is legitimate?', a: 'Check TDLR at tdlr.texas.gov for license verification. Require a certificate of insurance. Search BBB and Google reviews. Never hire door-to-door contractors after storms.' },
  { category: 'Roofing', q: 'How do I file a roof claim after a DFW hail storm?', a: 'Document damage with photos immediately. Call your insurance company within 72 hours. Do not sign anything with a contractor until your claim is approved. Avoid contractors who offer to waive your deductible.' },
  { category: 'Foundation', q: 'How do I water my foundation to prevent cracking in DFW summers?', a: 'Use a soaker hose 6-12 inches from the foundation perimeter. Water 15-20 minutes daily during drought. Maintain consistent moisture since DFW clay soil shrinks when dry and swells when wet.' },
  { category: 'HVAC', q: 'How long should an HVAC system last in DFW?', a: 'Expect 12-15 years for AC units in DFW climate. Furnaces last 18-25 years. Annual maintenance extends life. Replace both systems together for efficiency.' },
  { category: 'Plumbing', q: 'Why does my water heater make a popping noise?', a: 'Sediment buildup, common in DFW due to hard water. Flush the tank annually. If the noise persists, the element may be failing. Water heaters last 8-12 years; replace proactively.' },
  { category: 'Electrical', q: 'Are GFCI outlets required in my bathroom?', a: 'Yes. Texas code requires GFCI protection in bathrooms, kitchens within 6 ft of sink, garages, outdoors, and near pools. If outlets lack test/reset buttons, they may not be protected.' },
  { category: 'Contractors', q: 'Should I get multiple bids for home repairs?', a: 'Always get 3 bids for projects over $1,000. Compare scope, materials, timeline, and warranty. Ask each contractor to bid on identical scope for accurate comparison.' },
  { category: 'Permits', q: 'What happens if I do work without a permit in DFW?', a: 'Unpermitted work can cause problems when selling, void insurance for related claims, and require expensive removal. Cities can also levy fines. Always pull permits.' },
  { category: 'Foundation', q: 'How do I pick a foundation repair company in DFW?', a: 'Look for companies using steel piers. Verify SPIEA membership. Get a written transferable warranty. Ask how long they have been in business locally. Avoid companies who pressure quick decisions.' },
];

const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

export default function DFWHomeownerFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Homeowner FAQ</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>20 most common questions from Dallas-Fort Worth homeowners</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpen(null); }}
              style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: activeCategory === cat ? '#F5E642' : '#1e3a5f', color: activeCategory === cat ? '#0A1628' : '#94a3b8' }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((faq, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, overflow: 'hidden', border: open === i ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 1, marginRight: 10 }}>{faq.category}</span>
                  <span style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 600 }}>{faq.q}</span>
                </div>
                <span style={{ color: '#F5E642', fontSize: 18, marginLeft: 12 }}>{open === i ? '▲' : '▼'}</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 16px', color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 10, border: '1px solid #F5E642', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 6px' }}>🔧 Need a trusted DFW pro?</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk connects you with licensed, verified contractors in the DFW area.</p>
        </div>
      </div>
    </div>
  );
}
