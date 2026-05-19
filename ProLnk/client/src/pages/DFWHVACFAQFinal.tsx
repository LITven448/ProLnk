import { useState } from 'react';

const faqs = [
  { category: 'Cooling', q: 'Why does my AC run constantly in DFW summers?', a: 'DFW homes are designed for 100°F+ design days. When outdoor temps exceed your system\’s design load (typically 95-100°F), your AC runs continuously — this is normal operation, not a malfunction. Ensure your system is sized via Manual J for your specific square footage.' },
  { category: 'Cooling', q: 'Why is my upstairs always hotter than downstairs?', a: 'DFW two-story homes have attics reaching 140-160°F. Heat transfers through the ceiling into upper floors. Solutions: radiant barrier insulation, attic ventilation upgrade, zoning system, or a dedicated mini-split for the second floor.' },
  { category: 'Billing', q: 'Why does my electric bill spike in July?', a: 'July is DFW\’s peak month — average highs of 96°F, humidity 50%+, and 14+ hours of sunlight. Your AC works 3-4x harder than in mild weather. A $300-500 July bill is typical for a 2,000 sq ft DFW home without high-efficiency equipment.' },
  { category: 'Cooling', q: 'What SEER2 rating do I need for DFW?', a: 'Federal minimum for DFW (Climate Zone 3) is 15 SEER2 as of 2023. Recommended for DFW: 17-20 SEER2 for significant savings. At 20 SEER2 vs 15 SEER2, expect 25-30% lower cooling costs — a $40-60/month summer savings in DFW.' },
  { category: 'Humidity', q: 'Why is my home humid even when AC is running?', a: 'DFW spring humidity (April-June) can hit 75-85%. Standard AC units remove humidity as a byproduct of cooling, but oversized systems short-cycle — they cool fast without running long enough to dehumidify. A properly sized system or whole-home dehumidifier fixes this.' },
  { category: 'Heating', q: 'Do I need a heat pump or gas furnace in DFW?', a: 'DFW winters are mild (avg low 35°F) with occasional ice storms. Heat pumps are highly efficient for DFW\’s climate and now qualify for $2,000 federal tax credits. Dual-fuel systems (heat pump + gas backup) are optimal for DFW — electric heat pump for mild winters, gas for ice events.' },
  { category: 'Maintenance', q: 'How often should I change filters in DFW?', a: 'DFW has high pollen (cedar, oak, ragweed) and dust. Change 1-inch filters every 30-45 days. Upgrade to MERV-11 or higher for allergy sufferers. Higher MERV filters reduce airflow — ensure your system can handle the static pressure increase.' },
  { category: 'Cooling', q: 'Why does my AC freeze up in DFW summer?', a: 'Freezing in 95°F heat seems counterintuitive but it\’s common. Causes: dirty coils, restricted airflow (dirty filter or blocked vents), low refrigerant, or a failing blower motor. Turn the system to fan-only for 2 hours, replace the filter, then restart. If it refreezes, call a tech.' },
  { category: 'Cooling', q: 'What size AC do I need for a DFW home?', a: 'Rule of thumb for DFW: 1 ton per 400-500 sq ft (tighter homes) to 600-700 sq ft (older homes). But proper sizing requires Manual J — accounts for your attic insulation, window efficiency, orientation, and shading. Oversizing is the #1 DFW install mistake.' },
  { category: 'Billing', q: 'Is a programmable thermostat worth it in DFW?', a: 'Absolutely. Setting your DFW home to 78-80°F while away saves 10-15% on cooling costs. Smart thermostats (Nest, Ecobee) learn your patterns and are eligible for Oncor/Atmos energy rebates in DFW — often $50-100 back after purchase.' },
  { category: 'Maintenance', q: 'How often should DFW HVAC systems be serviced?', a: 'Twice yearly: spring (March-April) before cooling season and fall (October) before heating season. DFW\’s extreme summer puts enormous stress on systems. A skipped spring tune-up often leads to a mid-July breakdown — the worst time to wait for a tech.' },
  { category: 'Humidity', q: 'Should I use a whole-home dehumidifier in DFW?', a: 'For DFW homeowners with allergies, asthma, or humidity-sensitive finishes (hardwood floors, art), yes. A whole-home dehumidifier ($1,500-3,000 installed) maintains 45-50% RH year-round and reduces AC runtime — often paying back in 3-5 years through energy savings.' },
  { category: 'Heating', q: 'What temperature should I set during a DFW ice storm?', a: 'Set your thermostat to 68-70°F during ice events. Below 25°F, heat pumps lose efficiency — dual-fuel systems automatically switch to gas. For pure electric heat pumps, use emergency/auxiliary heat manually. Never set below 65°F to prevent pipe freeze in DFW slab homes.' },
  { category: 'Cooling', q: 'Why does my AC smell musty when first turned on?', a: 'DFW AC coils accumulate mold and mildew during humid periods. This is the "dirty sock syndrome." Solutions: UV germicidal light installed on the coil ($300-500), annual coil cleaning, and running the fan for 15 minutes after cooling to dry the coil before shutting down.' },
  { category: 'Billing', q: 'How much does a new HVAC system save in DFW?', a: 'Replacing a 10-year-old 10 SEER unit with a 20 SEER2 system in DFW: expect $600-900/year savings for a 2,000 sq ft home. With federal tax credits (up to $600 for equipment), payback period is 6-9 years. DFW\’s long cooling season maximizes ROI vs. northern states.' },
  { category: 'Maintenance', q: 'Should I cover my outdoor AC unit in DFW winters?', a: 'No. Outdoor units are weatherproof and need airflow. Covering traps moisture, encourages rodents, and can damage the unit. DFW winters rarely drop below 20°F — no protection needed. Exception: use a hail guard if you\’re in a DFW hail corridor (north Dallas, Collin County).' },
  { category: 'Cooling', q: 'Can I add refrigerant to my own AC in DFW?', a: 'No — it\’s illegal without EPA 608 certification. R-22 (older systems) is largely banned and costs $150-300/lb. R-410A and the new R-454B require certified technicians. If your DFW system is low on refrigerant, there\’s a leak — find and fix the leak, don\’t just add refrigerant.' },
  { category: 'Humidity', q: 'Why does my DFW home feel clammy in spring?', a: 'DFW spring (March-May) is the worst for humidity — 65-80% RH is common. If outdoor temps are mild (65-72°F), your AC may not run enough to dehumidify. Options: run the AC at a lower temp, use a portable or whole-home dehumidifier, or upgrade to a variable-speed system that can run longer at lower capacity.' },
  { category: 'Heating', q: 'How do I prevent frozen pipes during DFW ice storms?', a: 'DFW homes have exterior plumbing more exposed than northern homes (slab foundations, exterior walls). During sub-25°F events: set thermostat to 68°F+, open cabinet doors under sinks on exterior walls, let faucets drip, disconnect garden hoses, and insulate exposed pipes in garage or crawlspaces.' },
  { category: 'Maintenance', q: 'How long should an HVAC system last in DFW?', a: 'DFW systems work harder than almost anywhere in the US — 3,000+ hours of runtime annually vs 1,500 in northern climates. Expect 12-15 years for a well-maintained DFW system vs 15-20 years in milder climates. Annual maintenance and filter changes are the single biggest factor in lifespan.' },
];

const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

export default function DFWHVACFAQFinal() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = faqs.filter(f => activeCategory === 'All' || f.category === activeCategory);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>❓</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW HVAC FAQ</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>20 questions every DFW homeowner asks — answered with local context</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeCategory === cat ? '#F5E642' : '#1e2d45', color: activeCategory === cat ? '#0A1628' : '#94a3b8' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((faq, i) => (
            <div key={i} style={{ background: '#1e2d45', borderRadius: 12, overflow: 'hidden', border: openIndex === i ? '1px solid #F5E642' : '1px solid #2a3f5f' }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, textAlign: 'left' }}>{faq.q}</span>
                <span style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>{openIndex === i ? '▲' : '▼'}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 20px 18px', color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>
                  <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, marginBottom: 10 }}>{faq.category}</div>
                  <p style={{ margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', background: '#1e2d45', borderRadius: 16, padding: '28px 24px' }}>
          <div style={{ fontSize: 32 }}>🔧</div>
          <h3 style={{ color: '#F5E642', margin: '10px 0 8px' }}>Get a DFW HVAC Quote</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC professionals — free, no commitment.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
