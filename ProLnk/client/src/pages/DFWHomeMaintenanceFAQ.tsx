import { useState } from 'react';

const faqs = [
  { category: 'Roof', q: 'How often should I have my roof inspected in DFW?', a: 'Annually plus after any major hail or wind event. DFW averages 5-7 hail events per year — more than almost any U.S. metro. Most roofing contractors offer free inspections. Schedule in fall before winter storms. A $0 inspection can identify issues before they become $10,000+ repairs.' },
  { category: 'Foundation', q: 'When should I water my foundation in DFW?', a: 'Begin in May and continue through October during dry spells. Use a soaker hose 6-12 inches from the perimeter. Run 15-20 minutes daily during drought. Stop when the soil is consistently moist 4-6 inches down. DFW clay soil needs consistent moisture year-round to prevent movement.' },
  { category: 'Plumbing', q: 'How do I prevent my pipes from freezing in a DFW ice storm?', a: 'Insulate pipes in unconditioned spaces (attic, garage, exterior walls) with foam pipe insulation. Know where your main shutoff is. Let faucets drip at 1 drip per second during temperatures below 28°F. Open cabinet doors under sinks on exterior walls. DFW homes are built for heat, not cold — pipe freezing is a real risk.' },
  { category: 'Exterior', q: 'How often do DFW homes need exterior painting?', a: 'Every 7-10 years for quality acrylic exterior paint. Brick and masonry may only need paint every 15-20 years. DFW UV intensity, extreme temperature swings, and hail accelerate paint degradation. Signs to repaint sooner: peeling, cracking, fading, or visible wood showing through.' },
  { category: 'HVAC', q: 'How often should I clean my AC drain line in DFW?', a: 'Flush monthly during summer operation with 1 cup of distilled white vinegar through the access port. DFW humidity creates ideal conditions for algae and mold in drain lines — a clogged drain causes water damage and HVAC shutoff. Annual professional cleaning at tune-up time is also recommended.' },
  { category: 'Lawn', q: 'How often should I fertilize my DFW lawn?', a: 'Warm-season grasses (St. Augustine, Bermuda, Zoysia) need 4-5 applications: March, May, June/July, August, and a winterizer in November. Cool-season grasses are rare in DFW. Over-fertilizing in summer heat causes burn. Follow soil test recommendations for your specific lawn.' },
  { category: 'Roof', q: 'How long do roofs last in DFW?', a: 'Standard 3-tab asphalt shingles: 15-20 years. Architectural/dimensional shingles: 20-30 years. Metal roofing: 40-70 years. DFW hail, wind, and UV intensity shorten lifespans compared to national averages. A roof over 15 years old should be inspected by a licensed roofer before any storm season.' },
  { category: 'Foundation', q: 'What are the early warning signs of foundation problems in DFW?', a: 'Doors or windows that suddenly stick or do not close properly. Diagonal cracks in drywall starting from door/window corners. Gaps between wall and ceiling or floor. Cracks in brick mortar. Floors that feel uneven. DFW clay soil movement is the leading cause of foundation issues nationwide — catch it early.' },
  { category: 'Exterior', q: 'How often should I caulk windows and doors in DFW?', a: 'Inspect caulking annually in fall. Silicone caulk around windows and doors lasts 5-10 years. Paintable acrylic caulk lasts 3-7 years. DFW temperature extremes (from 100°F summers to 10°F ice events) cause more caulk failure than most climates. Failed caulking causes water intrusion and energy loss.' },
  { category: 'Plumbing', q: 'How often should I flush my water heater in DFW?', a: 'Annually. DFW water is considered moderately hard — sediment accumulates at the bottom of the tank, reducing efficiency and lifespan. Attach a garden hose to the drain valve, open it, and drain 2-3 gallons until the water runs clear. Turn off the heater first.' },
  { category: 'HVAC', q: 'When should I replace vs repair my HVAC in DFW?', a: 'Replace if the unit is 12+ years old and needs a repair over $1,000 (use the 5,000 rule: age x repair cost; if over $5,000, replace). Replace if refrigerant is R-22 (discontinued, expensive). In DFW, a new high-efficiency system pays back in 5-8 years on energy savings alone.' },
  { category: 'Roof', q: 'Can I walk on my roof to inspect it in DFW?', a: 'Not recommended without proper footwear and experience. DFW asphalt shingles are extremely soft in summer heat — foot traffic causes granule loss and micro-cracks. Use binoculars from the ground or hire a roofer who uses safety equipment. Many offer free inspections and provide photos.' },
  { category: 'Exterior', q: 'How often should I seal my driveway in DFW?', a: 'Every 3-5 years for asphalt. Every 5-7 years for concrete (use penetrating sealer, not film sealer on concrete). DFW heat and UV degrade asphalt sealant faster than northern climates. Apply in April-May when temps are 50-90°F. Never seal immediately after heavy rain.' },
  { category: 'Lawn', q: 'When should I aerate my lawn in DFW?', a: 'Warm-season grasses: aerate in late April to June when actively growing. Core aeration every 1-2 years helps with DFW clay compaction and improves water penetration. Combine with overseeding for bare areas. Never aerate during dormancy or drought stress.' },
  { category: 'Foundation', q: 'How does DFW clay soil affect my home differently than other cities?', a: 'DFW sits on some of the most expansive clay soil in the United States. This clay swells significantly when wet and shrinks dramatically when dry — sometimes 2-4 inches of vertical movement. This seasonal movement is the primary cause of foundation issues, plumbing breaks, and driveway cracking unique to North Texas.' },
  { category: 'Plumbing', q: 'How do I know if I have a slab leak in DFW?', a: 'Signs: unexplained increase in water bill, warm spots on the floor, sound of running water when all is off, wet or stained carpet, cracks in flooring or walls. Slab leaks are common in DFW due to shifting clay soil stressing water lines. Call a plumber for leak detection — most use electronic detection and do not break the slab until confirmed.' },
  { category: 'Exterior', q: 'How often should I power wash my DFW home?', a: 'Annually. DFW dust, pollen, algae from humidity, and mildew on north-facing surfaces accumulate quickly. Power washing before painting is essential. Use 1,500-2,500 PSI for most surfaces. Avoid directing water under siding or window sills. Fall is ideal timing in DFW before winter moisture.' },
  { category: 'HVAC', q: 'Why does my HVAC smell musty in DFW?', a: 'Mold or mildew in the evaporator coil or drain pan — extremely common in DFW due to humidity. Clean the coil and drain pan annually with coil cleaner spray. Run the fan on a schedule to allow the coil to dry between cycles. If the smell persists, a UV light sanitizer installed in the air handler eliminates 99% of microbial growth.' },
  { category: 'Roof', q: 'What roofing materials hold up best in DFW?', a: 'Class 4 impact-resistant shingles are the gold standard in DFW — they resist hail better and often earn a 20-30% insurance discount. Metal roofing (standing seam or metal shingles) is the most durable option. Avoid 3-tab shingles — they are cheaper but fail much faster in DFW wind and hail.' },
  { category: 'Foundation', q: 'Should I buy a home warranty that covers foundation in DFW?', a: 'Standard home warranties do not cover foundation. Structural warranties (common on new construction) typically cover 10 years. When buying a DFW home, ask for the foundation inspection history and any repair records. Budget $500-$1,000/year for foundation monitoring and maintenance regardless of warranty coverage.' },
];

const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

export default function DFWHomeMaintenanceFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Home Maintenance FAQ</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>20 maintenance questions specific to the DFW climate and environment</p>
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
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 6px' }}>🏠 Stay ahead of DFW maintenance</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk connects you with licensed, vetted pros for every home maintenance need in DFW.</p>
        </div>
      </div>
    </div>
  );
}
