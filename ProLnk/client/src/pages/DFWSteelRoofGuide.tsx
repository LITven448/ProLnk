import { useState } from 'react';

const homeSizes = ['Under 1,500 sq ft', '1,500 – 2,500 sq ft', '2,500 – 4,000 sq ft', '4,000+ sq ft'];
const budgets = ['$15,000 – $30,000', '$30,000 – $55,000', '$55,000 – $90,000', '$90,000+'];
const priorities = ['Hail protection (DFW priority #1)', 'Lowest long-term cost', 'Energy efficiency', 'Maximum lifespan', 'Insurance discount'];

type MetalRec = {
  system: string;
  metal: string;
  profile: string;
  class4: string;
  cost: string;
  lifespan: string;
  energySavings: string;
  insurance: string;
  note: string;
};

const getRecommendation = (size: string, budget: string, priority: string): MetalRec => {
  if (budget === '$15,000 – $30,000') {
    return {
      system: 'Exposed Fastener Steel Panels (26-gauge Galvalume)',
      metal: 'Steel (Galvalume coated) — best value for DFW hail protection',
      profile: 'R-Panel or 5V Crimp exposed fastener — lower cost, still Class 4 rated',
      class4: 'Yes — most 26-gauge+ steel panels qualify for DFW Class 4 impact resistance',
      cost: '$8–12/sq ft installed ($12K–$22K typical DFW home)',
      lifespan: '30–40 years in DFW climate',
      energySavings: '15–25% cooling savings with proper underlayment in DFW heat',
      insurance: 'Most DFW insurers offer 15–30% discount for Class 4 rated roofs',
      note: 'Exposed fastener requires periodic fastener inspection — best for steeper pitches (4:12+) in DFW',
    };
  }
  if (budget === '$30,000 – $55,000') {
    return {
      system: 'Standing Seam Steel (24-gauge Kynar/PVDF coated)',
      metal: 'Steel with Kynar 500 paint — premium corrosion resistance for DFW humidity and UV',
      profile: 'Standing seam concealed fastener — superior water management for DFW storm events',
      class4: 'Yes — standing seam steel is the gold standard for DFW Class 4 impact rating',
      cost: '$14–20/sq ft installed ($21K–$50K typical DFW home)',
      lifespan: '50+ years in DFW — outlasts the home in most cases',
      energySavings: '25–40% cooling savings — standing seam air gap provides superior thermal performance',
      insurance: '20–40% insurance discount — DFW insurers love standing seam steel',
      note: 'Standing seam is the #1 recommended system for DFW — handles hail, wind (130+ mph rated), and heat',
    };
  }
  if (budget === '$55,000 – $90,000') {
    return {
      system: 'Standing Seam Steel + Solar-Ready Clips (SolarMount compatible)',
      metal: 'Premium 24-gauge steel with Kynar 500 — solar-ready bracket attachment',
      profile: 'Standing seam with integrated solar mounting rails — no roof penetrations for solar',
      class4: 'Yes — Class 4 + wind rated 130+ mph + solar-ready integration',
      cost: '$18–25/sq ft installed ($27K–$75K typical DFW home)',
      lifespan: '50+ years steel roof + 25-year solar panel lifespan running concurrently',
      energySavings: '40–60% total energy savings combining roof thermal + solar generation in DFW',
      insurance: '20–40% roof discount + solar production offsets utility costs',
      note: 'Solar-ready standing seam is the smartest DFW investment — TX deregulated market maximizes solar ROI',
    };
  }
  return {
    system: 'Copper or Zinc Standing Seam (architectural premium)',
    metal: 'Copper patinas beautifully in DFW humidity — zinc offers matte natural finish',
    profile: 'Custom standing seam — architectural fabrication for premium DFW homes',
    class4: 'Yes — copper and zinc both exceed Class 4 impact requirements',
    cost: '$28–50/sq ft installed ($90K–$200K+ for large DFW luxury homes)',
    lifespan: '75–100+ years — generational roof for DFW estate properties',
    energySavings: '30–45% cooling savings with premium underlayment systems',
    insurance: 'Maximum insurance discount — copper/zinc is top tier for DFW insurers',
    note: 'Copper and zinc are architectural statements — increasingly popular in Preston Hollow, Southlake, and Westlake DFW luxury market',
  };
};

export default function DFWSteelRoofGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');

  const result = homeSize && budget ? getRecommendation(homeSize, budget, priority) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2A40 100%)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Steel & Metal Roof Guide</h1>
        <p style={{ color: '#A0B0C8', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>DFW hail events cost homeowners billions annually. Metal roofing is the premium solution — Class 4 impact rated, 50+ year lifespan, and significant insurance discounts.</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '32px 0 20px' }}>
          {[
            { icon: '⛈️', title: 'DFW Hail Risk', desc: 'DFW averages 4–6 significant hail events/year — more than any major US metro' },
            { icon: '🛡️', title: 'Class 4 Rating', desc: 'Class 4 impact resistance = largest insurance discount available in TX' },
            { icon: '♻️', title: '50+ Year Lifespan', desc: 'Outlasts asphalt shingles by 3–4x in DFW heat and UV exposure' },
            { icon: '❄️', title: 'Energy Efficient', desc: 'Metal reflects DFW summer heat — 25–40% cooling savings typical' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: '#112240', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#A0B0C8', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>⚖️ Steel vs Aluminum vs Copper for DFW</h2>
          {[
            { metal: 'Steel (Galvalume/Kynar)', cost: '$$', hail: '⭐⭐⭐⭐⭐', lifespan: '40–50 yrs', note: 'Best value — standard choice for DFW Class 4 protection' },
            { metal: 'Aluminum', cost: '$$$', hail: '⭐⭐⭐⭐', lifespan: '40–50 yrs', note: 'Lighter weight, no rust — better for coastal, overkill for DFW' },
            { metal: 'Copper', cost: '$$$$$', hail: '⭐⭐⭐⭐⭐', lifespan: '75–100 yrs', note: 'Architectural luxury — generational investment for DFW estates' },
          ].map(m => (
            <div key={m.metal} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{m.metal}</div>
                <div style={{ color: '#A0B0C8', fontSize: 12, marginTop: 2 }}>{m.note}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: '#A0C8A0', fontSize: 11 }}>Hail: {m.hail}</div>
                <div style={{ color: '#A0B0C8', fontSize: 11 }}>{m.lifespan}</div>
                <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700 }}>{m.cost}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>🔍 Get Your DFW Metal Roof Recommendation</h2>
          {[
            { label: 'Home Size', value: homeSize, setter: setHomeSize, options: homeSizes },
            { label: 'Budget Range', value: budget, setter: setBudget, options: budgets },
            { label: 'Top Priority', value: priority, setter: setPriority, options: priorities },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#A0B0C8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8E8E8', border: '1px solid #2A4A6F', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, border: '2px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🏗️ {result.system}</div>
              {[
                { label: '🔩 Metal Type', value: result.metal },
                { label: '📐 Profile', value: result.profile },
                { label: '🛡️ Class 4 Rated', value: result.class4 },
                { label: '💰 Installed Cost', value: result.cost },
                { label: '📅 Expected Lifespan', value: result.lifespan },
                { label: '❄️ DFW Energy Savings', value: result.energySavings },
                { label: '📋 Insurance Discount', value: result.insurance },
                { label: '💡 DFW Note', value: result.note },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{label}</div>
                  <div style={{ color: '#C0D0E0', fontSize: 14 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
