import { useState } from 'react';

const myths = [
  {
    belief: 'DIY always saves money vs. hiring a pro',
    verdict: 'MYTH',
    reality: 'In DFW, DIY electrical, plumbing, and HVAC work done without permits can void homeowner\’s insurance, fail home inspection at resale, and require licensed correction. The "savings" of a $300 DIY electrical fix can become a $2,000 licensed re-do at sale. Cosmetic DIY (paint, landscaping) is fine — structural/mechanical is risky.',
    icon: '🔨',
  },
  {
    belief: 'Premium materials always last longer in DFW',
    verdict: 'MYTH',
    reality: 'DFW climate — 100°F summers, freeze-thaw cycles, clay soil — degrades materials based on suitability, not price. A $4/sqft DFW-appropriate caulk outperforms a $12/sqft premium product not rated for Texas temperature swings. Ask your contractor what\’s climate-tested for DFW, not what\’s most expensive.',
    icon: '🪟',
  },
  {
    belief: 'HOA approval always takes months',
    verdict: 'MYTH',
    reality: 'In DFW, HOA approval timelines range from 3 business days (small HOAs with online portals) to 6 months (large master-planned communities with architectural review boards). Submit complete documentation and expect the full timeline in communities like Frisco, Prosper, and The Colony.',
    icon: '📄',
  },
  {
    belief: 'Permits are just bureaucracy with no real benefit',
    verdict: 'MYTH',
    reality: 'Unpermitted work in DFW is a material fact that must be disclosed at sale. Buyers can demand it be remediated before closing. Permitted work is inspected for safety and creates a legal record. Permits protect your investment, your sale, and your family\’s safety — not just city revenue.',
    icon: '🏛️',
  },
  {
    belief: 'Roof damage in DFW is always covered by insurance',
    verdict: 'MYTH',
    reality: 'DFW insurers have tightened hail and storm coverage significantly. Many policies now have separate hail deductibles (1–3% of home value), require wind mitigation credits, or exclude roofs over 15 years old. Review your policy before assuming you\’re covered after a DFW storm.',
    icon: '⛈️',
  },
];

const verdictColor: Record<string, string> = {
  MYTH: '#EF4444',
  SOMETIMES: '#F59E0B',
  FACT: '#10B981',
};

export default function DFWHomeMythsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>DFW Home Maintenance Myths — Debunked</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>General DFW home ownership beliefs tested against reality. Click to reveal the truth.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {myths.map((m, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#0F2040′ : '#111D33',
                border: `1px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 12,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{m.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{m.belief}</span>
                </div>
                <span style={{
                  background: verdictColor[m.verdict] || '#EF4444',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  flexShrink: 0,
                  marginLeft: 12,
                }}>{m.verdict}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, padding: '14px', background: '#0A1628', borderRadius: 8, color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>
                  {m.reality}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, padding: 20, background: '#111D33', borderRadius: 12, border: '1px solid #1E3A5F', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>Protect Your DFW Home Investment</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>ProLnk connects DFW homeowners with licensed, insured professionals who understand Texas codes and climate.</p>
        </div>
      </div>
    </div>
  );
}
