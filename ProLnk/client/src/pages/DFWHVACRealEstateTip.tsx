import { useState } from 'react';

const roles = [
  {
    id: 'buyer',
    label: 'Home Buyer',
    emoji: '🔍',
    tips: [
      {
        title: 'Get the age from the model number — not the seller',
        detail: 'Sellers routinely misremember or misrepresent HVAC age. The model number on the unit encodes the manufacture date. Search "[brand] serial number decoder" to find the exact year and month.',
      },
      {
        title: 'An inspection report is not an HVAC evaluation',
        detail: 'Home inspectors check if the unit turns on. They don\’t assess capacity, efficiency decline, refrigerant charge, duct leakage, or remaining life. Budget $75–150 for a separate HVAC eval.',
      },
      {
        title: 'DFW rule: units over 10 years old are negotiation chips',
        detail: 'In DFW\’s heat, HVAC systems age faster. A 10-year unit may have 2–5 years left. Factor replacement cost ($6,000–15,000) into your offer or ask for a concession.',
      },
      {
        title: 'Check for R-22 refrigerant',
        detail: 'Systems manufactured before 2010 likely use R-22, which is phased out. Replacement refrigerant costs $100+/lb now. A leak in an R-22 system means replacement, not repair.',
      },
      {
        title: 'Verify permit pulled for prior HVAC work',
        detail: 'Unpermitted HVAC work can create code violations you inherit. Check city permit records (most DFW cities have online portals) for any HVAC permits tied to the address.',
      },
    ],
  },
  {
    id: 'seller',
    label: 'Home Seller',
    emoji: '🏷️',
    tips: [
      {
        title: 'Service the unit before listing — it pays off',
        detail: 'A $150 tune-up gives you documentation that the system is in good working order. Buyers who see recent service records ask fewer questions and make fewer concessions.',
      },
      {
        title: 'Document the age clearly and accurately',
        detail: 'Find the model number and calculate the actual installation year. Disclosing this honestly upfront prevents the buyer\’s inspector from discovering a discrepancy and triggering renegotiation.',
      },
      {
        title: 'Know what\’s still under warranty',
        detail: 'Manufacturer warranties (5–10 yr parts, 1 yr labor) are sometimes transferable. Check your unit\’s paperwork. A transferable warranty is a selling point worth $500–1,000 in buyer perception.',
      },
      {
        title: 'DFW summer showings: keep the house cold',
        detail: 'Buyers touring a 78°F home in July immediately notice. Set your thermostat to 72°F during showing windows. If the unit can\’t hold that temperature, it signals a problem.',
      },
      {
        title: 'Don\’t replace preemptively unless unit is under 12 SEER',
        detail: 'Replacing a functional 14 SEER unit rarely returns dollar-for-dollar. Fix what\’s broken, service what\’s running, and price the home accordingly.',
      },
    ],
  },
  {
    id: 'investor',
    label: 'Real Estate Investor / Flipper',
    emoji: '📈',
    tips: [
      {
        title: 'HVAC age is the single highest-leverage inspection point',
        detail: 'For flips and rentals, aging HVAC is the most common surprise capital expenditure. Always get HVAC age and condition before closing. Budget replacement if the unit is 10+ years.',
      },
      {
        title: 'In DFW, install 16+ SEER2 for rental differentiation',
        detail: 'Higher efficiency units reduce tenant utility bills, reduce complaints, and reduce turnover. Tenants who are comfortable stay longer. The payback via reduced vacancy is real.',
      },
      {
        title: 'Section 179 deduction for rental HVAC replacement',
        detail: 'Unlike homeowner 25C credits, investors deduct HVAC as a business expense under Section 179 in the year of installation — up to the full cost. Consult your CPA.',
      },
      {
        title: 'Standardize equipment brand across your portfolio',
        detail: 'Using one brand (e.g., Carrier, Lennox, Trane) across multiple properties simplifies contractor relationships, parts inventory, and warranty management.',
      },
      {
        title: 'Build HVAC replacement into your per-property reserve',
        detail: 'DFW property managers recommend $75–100/month HVAC reserve per unit. Skipping this creates cash flow crises when a unit fails in August.',
      },
    ],
  },
];

export default function DFWHVACRealEstateTip() {
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const role = roles.find((r) => r.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Real Estate Tips</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          HVAC is the most common source of real estate surprises in DFW. Select your role for specific guidance.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 32 }}>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => { setSelected(r.id); setExpanded(null); }}
              style={{
                background: selected === r.id ? '#F5E642' : '#0f2040',
                color: selected === r.id ? '#0A1628' : '#fff',
                border: '2px solid',
                borderColor: selected === r.id ? '#F5E642' : '#1e3a5f',
                borderRadius: 12,
                padding: '20px 12px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{r.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{r.label}</div>
            </button>
          ))}
        </div>
        {role && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 20 }}>{role.emoji} {role.label} — HVAC Tips</div>
            {role.tips.map((tip, i) => (
              <div
                key={i}
                style={{ background: '#0f2040', borderRadius: 12, marginBottom: 10, border: '1px solid', borderColor: expanded === i ? '#F5E642' : '#1e3a5f', overflow: 'hidden' }}
              >
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', color: '#fff', padding: '16px 18px', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{tip.title}</span>
                  <span style={{ color: '#F5E642', fontSize: 18, marginLeft: 12 }}>{expanded === i ? '▲' : '▼'}</span>
                </button>
                {expanded === i && (
                  <div style={{ padding: '0 18px 16px', fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>
                    {tip.detail}
                  </div>
                )}
              </div>
            ))}
            <div style={{ marginTop: 24, background: '#0f2040', borderRadius: 16, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Need a trusted DFW HVAC pro for your transaction?</div>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Find DFW HVAC Pros via ProLnk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
