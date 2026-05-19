import { useState } from 'react';

const faqs = [
  { category: 'Licensing', q: 'How do I verify a contractor license in Texas?', a: 'Visit tdlr.texas.gov for most trades (HVAC, electricians, plumbers have separate boards). For plumbers, check tsbpe.texas.gov. For electricians, check tdlr.texas.gov/electrical. Always search by license number AND name to confirm they match.' },
  { category: 'Pricing', q: 'What is a reasonable HVAC replacement quote in DFW 2026?', a: 'Expect $5,500-$9,000 for a standard 3-ton split system installed in DFW. Full system replacement (air handler + condenser) ranges $7,000-$14,000 for higher efficiency units. Get 3 quotes minimum. Prices 20%+ below average are a red flag.' },
  { category: 'Payments', q: 'Should I pay cash for a discount?', a: 'Avoid cash payments for large projects. Cash-only contractors may be unlicensed, uninsured, or trying to avoid taxes. For legitimate discounts, ask about check payment discounts (2-3% is reasonable). Always get a receipt and written contract.' },
  { category: 'Roofing', q: 'What does per-square mean for roofing?', a: 'One "square" equals 100 sq ft of roof surface. A 2,000 sq ft home typically has 2,200-2,600 sq ft of roof surface (due to pitch) or 22-26 squares. DFW asphalt shingle replacement costs $450-$700 per square installed in 2026.' },
  { category: 'Timelines', q: 'How long should a kitchen remodel take in DFW?', a: 'Minor remodel (cabinets, counters, paint): 2-4 weeks. Mid-range remodel (layout changes, new plumbing/electrical): 6-10 weeks. Full gut renovation: 12-20 weeks. Add 20-30% to any timeline for permit delays and material lead times in DFW.' },
  { category: 'Insurance', q: 'What insurance should a contractor carry?', a: 'Minimum: General liability ($1M per occurrence) and Workers Compensation if they have employees. Ask for a Certificate of Insurance (COI) naming you as additional insured. Call the insurance company to verify the policy is active before work begins.' },
  { category: 'Contracts', q: 'What should be in a contractor contract?', a: 'Scope of work (detailed), materials specified with brand/model, start and completion dates, payment schedule tied to milestones, permit responsibility, warranty terms, and what happens if either party defaults. Never sign a vague one-page contract.' },
  { category: 'Roofing', q: 'How do I spot a storm chaser roofer in DFW?', a: 'Red flags: knocks on your door right after a hail storm, out-of-state phone number or address, asks you to sign an Assignment of Benefits (AOB) immediately, offers to waive your deductible, cannot provide local references. DFW has the highest storm chaser density in Texas.' },
  { category: 'Pricing', q: 'What does foundation repair cost per pier in DFW 2026?', a: 'Steel push piers: $1,200-$1,800 each. Concrete piers: $800-$1,200 each. Most DFW slab homes need 12-25 piers for a full repair. Total cost: $15,000-$40,000+. Get a written warranty that transfers to future owners.' },
  { category: 'Licensing', q: 'Do general contractors need a license in Texas?', a: 'No state-level GC license in Texas — but most DFW cities (Dallas, Fort Worth, Plano, Frisco) require a local contractor registration. Subcontractors (plumbers, electricians, HVAC) must be individually licensed by their trade boards.' },
  { category: 'Payments', q: 'What payment schedule is fair for a home renovation?', a: 'For projects under $5,000: 30% deposit, 70% on completion. For $5,000-$25,000: 10% deposit, 3-4 milestone payments, 10% on final walkthrough. Never pay final 10% until punch list is complete and you are satisfied.' },
  { category: 'Timelines', q: 'How long does a bathroom remodel take in DFW?', a: 'Half bath (toilet, vanity only): 1-2 weeks. Full bath refresh (no layout change): 2-3 weeks. Full bathroom remodel (layout change, tile, fixtures): 4-8 weeks. Add time for permit and inspection scheduling in DFW cities.' },
  { category: 'Insurance', q: 'What happens if a contractor damages my home?', a: 'Their general liability insurance covers property damage caused by their work. Document everything with photos before, during, and after. If they refuse to claim, file a complaint with TDLR or the relevant license board. Small claims court handles disputes under $20,000 in Texas.' },
  { category: 'Pricing', q: 'What is a fair price for exterior painting in DFW 2026?', a: 'Expect $2.50-$4.50 per sq ft of paintable surface for exterior painting in DFW. A 2,000 sq ft home typically costs $3,500-$7,500 depending on stories, prep work needed, and trim detail. Power washing is usually included. Ask what paint brand and sheen they use.' },
  { category: 'Contracts', q: 'What is a lien waiver and when should I ask for one?', a: 'A lien waiver is a document stating that a contractor or supplier has been paid and waives their right to file a mechanics lien on your property. Request partial lien waivers at each payment milestone and a final lien waiver upon project completion. Critical for protecting your home title.' },
  { category: 'Licensing', q: 'How do I check if a plumber is licensed in Texas?', a: 'Visit tsbpe.texas.gov and search by name or license number. Licensed plumbers in Texas must have a Texas plumber license card on their person at all times while working. Ask to see it and verify it matches the person doing the work.' },
  { category: 'Pricing', q: 'What does an electrical panel upgrade cost in DFW 2026?', a: '100A to 200A upgrade: $2,200-$4,500 installed in DFW. Add $500-$1,500 if the meter base or service entrance also needs updating. Some DFW cities also require permit fees ($150-$400) and final inspection. 2026 material costs are 15% higher than 2024.' },
  { category: 'Timelines', q: 'How long does a roof replacement take in DFW?', a: 'Most DFW residential roofs (1,500-3,500 sq ft) are replaced in 1-2 days. Larger homes or complex roof lines take 2-3 days. Weather delays are common April-June. The actual work is fast — getting on the schedule is the delay (2-6 weeks after a major hail event).' },
  { category: 'Insurance', q: 'Does my homeowner insurance cover contractor damage?', a: 'Your policy covers sudden accidental damage but typically not damage from poor workmanship. Unlicensed contractor work may void coverage entirely. Always hire licensed, insured contractors and keep records of every permit and inspection.' },
  { category: 'Contracts', q: 'What is a change order and should I sign one?', a: 'A change order is a written amendment to your contract when scope changes. Always get change orders in writing before authorizing additional work. Verbal approvals are unenforceable in Texas. Change orders should specify additional cost, timeline impact, and be signed by both parties.' },
];

const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

export default function DFWContractorFAQ2026() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Contractor FAQ 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>20 questions to ask before hiring any contractor in Dallas-Fort Worth</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpen(null); }}
              style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: activeCategory === cat ? '#F5E642′ : '#1e3a5f', color: activeCategory === cat ? '#0A1628' : '#94a3b8' }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((faq, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, overflow: 'hidden', border: open === i ? '1px solid #F5E642′ : '1px solid #1e3a5f' }}>
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
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 6px' }}>✅ Skip the guesswork — find verified DFW pros</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk pre-screens contractors for license, insurance, and reputation so you do not have to.</p>
        </div>
      </div>
    </div>
  );
}
