import { useState } from 'react';

const devTypes: Record<string, { pros: string[]; cons: string[]; valueImpact: string; examples: string }> = {
  "Corporate Campus": {
    pros: ["Massive job creation within 20-min drive","Retail and restaurant development follows","Increased housing demand drives appreciation","New infrastructure investments (roads, utilities)","Area brand elevation (Goldman = Richardson premium)"],
    cons: ["Traffic volume spikes during rush hours","Construction noise for 2–4 years","Possible displacement of existing businesses","Property taxes may rise to fund incentives"],
    valueImpact: "Typically +8–18% premium within 2 miles within 3 years of announcement",
    examples: "Goldman Sachs campus — Richardson/Plano corridor. Toyota HQ — Plano. Caterpillar — Irving.",
  },
  "New Toll Road": {
    pros: ["Dramatically faster commute access","Opens new development corridors","Connects previously isolated suburbs","Increases viable purchase radius from employment centers"],
    cons: ["Daily tolls add $100–400/month for commuters","Traffic from new access floods local roads","Some residents oppose as suburban sprawl enabler","Environmental impact on wetlands and greenspace"],
    valueImpact: "+5–12% for previously isolated areas; mixed for established neighborhoods with new cut-through traffic",
    examples: "SH 183 toll improvements driving Alliance/Haslet/Saginaw growth. SH 114 expansion — Westlake/Trophy Club.",
  },
  "Mixed-Use District": {
    pros: ["Walkability increases nearby","Local tax base diversification","Entertainment and dining within walking distance","Signals neighborhood investment commitment","Can transform perception of area dramatically"],
    cons: ["Construction disruption 18–36 months","Increased local traffic","Parking demand during events","Noise from entertainment venues near residential"],
    valueImpact: "+6–15% within half-mile; Bishop Arts District added 20%+ over 5 years",
    examples: "Legacy West (Plano) lifted surrounding Plano/Allen values. Bishop Arts transformed West Dallas.",
  },
  "Industrial/Logistics Hub": {
    pros: ["Job creation in the area","Local retail and service demand","Strong government incentives for infrastructure"],
    cons: ["Truck traffic is a significant negative","24/7 operations possible","Noise and light pollution","Limited walkability or amenity benefit","Can anchor area as industrial — limits residential upside"],
    valueImpact: "Negative for adjacent residential (-5–15%); positive for nearby commercial (+10–20%)",
    examples: "Alliance Corridor (NW Fort Worth) — huge logistics hub but residential immediately adjacent sees truck traffic.",
  },
  "Large Residential Subdivision": {
    pros: ["New school capacity often follows","Infrastructure improvements","More local businesses from density increase","Can signal area desirability"],
    cons: ["School boundary changes frequent in DFW","Traffic increases on connecting roads","Existing neighborhood character can change","Construction dust and noise for years"],
    valueImpact: "Neutral to +3% if development quality is high; negative if lower-price-point than existing stock",
    examples: "Celina, Prosper, and Forney seeing massive growth — prices rising but infrastructure lagging.",
  },
};

export default function DFWCommercialGrowthImpact2026() {
  const [selected, setSelected] = useState<string>('');

  const result = selected ? devTypes[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Commercial Growth Impact 2026</h1>
          <p style={{ color: '#9BA3B2', fontSize: 16 }}>How development near your DFW home affects value — the full picture</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏢', label: 'Corporate Relocations', desc: 'Goldman, Toyota, Caterpillar all chose DFW' },
            { icon: '🛣️', label: 'Toll Road Expansion', desc: 'Alliance/Haslet corridor exploding with access' },
            { icon: '🏪', label: 'Mixed-Use Districts', desc: 'Legacy West, Bishop Arts transform neighborhoods' },
            { icon: '📦', label: 'Industrial Growth', desc: 'DFW is the #1 US logistics market' },
          ].map(card => (
            <div key={card.label} style={{ background: '#0F1E35', borderRadius: 12, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#9BA3B2', fontSize: 13 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 What Development Is Near Your Home?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {Object.keys(devTypes).map(d => (
              <button key={d} onClick={() => setSelected(d)} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === d ? '#F5E642′ : '#1A2E48', color: selected === d ? '#0A1628' : '#E8EAF0', fontWeight: 600, fontSize: 13 }}>{d}</button>
            ))}
          </div>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, marginBottom: 12, border: '1px solid #F5E642′ }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Value Impact: </span>{result.valueImpact}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #1A3A1A' }}>
                  <h4 style={{ color: '#4ADE80', marginBottom: 10, fontSize: 14 }}>✅ Potential Benefits</h4>
                  {result.pros.map((p, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6, display: 'flex', gap: 6 }}>
                      <span style={{ color: '#4ADE80', flexShrink: 0 }}>+</span>{p}
                    </div>
                  ))}
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #3A1A1A' }}>
                  <h4 style={{ color: '#F87171', marginBottom: 10, fontSize: 14 }}>⚠️ Potential Downsides</h4>
                  {result.cons.map((c, i) => (
                    <div key={i} style={{ fontSize: 13, color: '#CBD5E1', marginBottom: 6, display: 'flex', gap: 6 }}>
                      <span style={{ color: '#F87171', flexShrink: 0 }}>−</span>{c}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#1A2E48', borderRadius: 8, padding: 14, fontSize: 13, color: '#9BA3B2', borderLeft: '3px solid #F5E642′ }}>
                <span style={{ color: '#F5E642′ }}>📍 DFW Examples: </span>{result.examples}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F1E35', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📊 How to Research Planned Development</h2>
          <p style={{ color: '#9BA3B2', lineHeight: 1.7 }}>Check your city and county planning department portals for pending permits and zoning changes. Dallas, Fort Worth, Plano, and Frisco all publish development pipeline data online. Search for your address radius within 1–3 miles. TxDOT publishes highway and toll road expansion plans. Economic development announcements often precede rezoning applications by 6–18 months — be proactive, not reactive.</p>
        </div>
      </div>
    </div>
  );
}
