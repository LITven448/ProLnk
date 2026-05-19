import { useState } from 'react';

const faqs = [
  {
    q: "💧 Why does my DFW foundation need watering?",
    a: "DFW sits on expansive clay soil — the same black and dark gray clay found across North Texas. This soil shrinks dramatically during drought and expands when wet, creating movement beneath your slab. During dry summers, the soil pulls away from the perimeter of your foundation, removing support. A soaker hose system run 18 inches from the foundation maintains consistent soil moisture, preventing the differential movement that causes cracks, sticking doors, and pier failure."
  },
  {
    q: "📅 How often should I water my DFW foundation?",
    a: "In DFW, foundation watering frequency depends on the season: Summer (June–September): water 3–4 times per week for 30–45 minutes per zone. Spring/Fall: 1–2 times per week. Winter: once per week unless there's been significant rain. The goal is keeping soil moisture consistent — not soaking it. Probe the soil 4–6 inches down near the foundation perimeter; it should feel damp but not muddy. Automated drip irrigation on a timer is the most reliable method."
  },
  {
    q: "🔍 Are foundation cracks normal in DFW?",
    a: "Hairline cracks (under 1/16 inch, running straight) in drywall near doors and windows are normal seasonal movement in DFW homes. These open slightly in summer when soil dries and close in winter. Cracks that are wider than 1/4 inch, horizontal, stair-step along brick mortar joints, or grow over time are warning signs requiring professional evaluation. Diagonal cracks running from door corners are particularly telling. Document with photos and measurements every 6 months."
  },
  {
    q: "👷 Do I need a structural engineer or a repair company first?",
    a: "Always get an independent structural engineer first — before calling a foundation repair company. Engineers charge $400–$800 for a full evaluation and give you an unbiased diagnosis. Foundation repair companies offer free inspections but have a financial incentive to recommend repairs. An engineer's report tells you exactly what work is needed (and what isn't), gives you a spec to get competitive bids, and may be required by your home insurer or buyer's lender. Skip the engineer and you risk paying for unnecessary piers."
  },
  {
    q: "⏳ How long does DFW foundation repair last?",
    a: "Steel push piers installed to bedrock (typically 15–30 feet in DFW) have a lifetime warranty and don't shift once set. Pressed concrete piers — the most common method in DFW — typically carry 10–25 year warranties but can fail if soil conditions change dramatically. The key factor is whether your soil is stabilized: proper drainage, consistent irrigation, and root barriers near large trees dramatically extend repair longevity. Repairs fail most often when the root cause (drainage or irrigation) isn't addressed."
  },
  {
    q: "🌳 Can tree roots damage my DFW foundation?",
    a: "Yes — in DFW's expansive clay soils, large trees (especially post oak, live oak, and Bradford pear) draw massive amounts of moisture from soil near your foundation, causing it to dry and shrink faster than surrounding soil. The general rule: no trees within a distance equal to their mature height from your foundation. If trees are already close, install a root barrier (18–24 inch deep plastic barrier) between the tree and foundation. Monitor the perimeter soil moisture monthly with a soil probe."
  },
  {
    q: "🏠 Does homeowner's insurance cover foundation damage in DFW?",
    a: "Standard Texas homeowner policies (HO-3) do NOT cover foundation damage from soil movement, which is the cause of nearly all DFW foundation issues. The exception is if a sudden event — like a plumbing leak beneath the slab — caused the damage. In that case, the plumbing repair may be covered but the foundation repair often isn't. Some insurers offer an endorsement for foundation coverage at additional cost. Review your policy with your agent and get clarity before you discover a problem."
  },
  {
    q: "💰 How much does DFW foundation repair cost?",
    a: "DFW foundation repair typically runs $500–$1,500 per pier, with most homes needing 8–20 piers. Average repair costs: $5,000–$15,000 for a standard 1,800 sq ft home; $15,000–$35,000 for large or severely damaged homes. Pressed concrete piers cost less than steel push piers but offer less warranty protection. Always get 3 bids from licensed Texas foundation contractors (verify at tdlr.texas.gov). Price variation of 30–50% between bids is common — the lowest bid isn't always worst but verify pier type and warranty."
  },
  {
    q: "🚿 How does plumbing relate to my DFW foundation?",
    a: "DFW homes experience slab plumbing leaks at a higher rate than other regions due to foundation movement stressing pipes. Signs of under-slab leaks: unexplained water bill increases, warm spots on floors, sound of running water when all fixtures are off, or mold near baseboards. Leak detection companies use pressure tests and acoustic equipment to locate leaks without excavation. A single undetected leak can erode soil beneath the slab and cause significant settling — repair immediately."
  },
  {
    q: "🔎 How do I find a trusted DFW foundation company?",
    a: "Verify any foundation contractor holds a Texas Residential Foundation Repair license (search tdlr.texas.gov). Ask how long they've operated in DFW — soil knowledge matters and varies by sub-region (Southlake clay vs. Rockwall chalk vs. Grand Prairie shale). Request at least 5 local references from jobs done in the past 2 years. Get the warranty in writing and confirm it transfers to the next owner — this is a selling point if you ever list your home. ProLnk connects DFW homeowners with vetted, licensed foundation specialists."
  }
];

export default function DFWFoundationFAQTop10DFW2026() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Top 10 Foundation FAQs 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Most common DFW foundation questions — answered for North Texas clay soil</p>
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
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Need a DFW foundation specialist?</p>
          <p style={{ color: '#8899AA', fontSize: 13 }}>ProLnk matches you with licensed DFW foundation contractors — get quotes fast.</p>
        </div>
      </div>
    </div>
  );
}