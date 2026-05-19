import { useState } from 'react';

const appliances = [
  { name: 'Refrigerator', watts: 800 },
  { name: 'Central AC (3-ton)', watts: 3500 },
  { name: 'Window AC', watts: 1200 },
  { name: 'Electric Furnace', watts: 10000 },
  { name: 'Gas Furnace (blower)', watts: 800 },
  { name: 'Sump Pump', watts: 1050 },
  { name: 'Well Pump', watts: 1500 },
  { name: 'Microwave', watts: 1000 },
  { name: 'Lights (whole house)', watts: 600 },
  { name: 'Phone Chargers', watts: 50 },
  { name: 'TV + Entertainment', watts: 400 },
  { name: 'Medical Equipment', watts: 500 },
  { name: 'Electric Water Heater', watts: 4500 },
  { name: 'Washer/Dryer', watts: 5000 },
];

function getRecommendation(watts: number) {
  if (watts < 5000) return { type: 'Portable Gas Generator', range: '$500–$2,000', note: 'Good for essentials. Manual start. Store gas safely.' };
  if (watts < 10000) return { type: 'Mid-Range Portable or Battery Backup', range: '$2,000–$8,000', note: 'Covers most critical loads. Consider a transfer switch.' };
  if (watts < 20000) return { type: 'Whole-Home Standby (Natural Gas / Propane)', range: '$5,000–$15,000 installed', note: 'Automatic start, runs indefinitely on gas line. Best for DFW.' };
  return { type: 'Large Standby or Diesel Generator', range: '$10,000–$25,000 installed', note: 'Commercial-grade. Handles entire home including HVAC. Permit required.' };
}

export default function GeneratorGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  const totalWatts = appliances.filter(a => selected.includes(a.name)).reduce((sum, a) => sum + a.watts, 0);
  const rec = getRecommendation(totalWatts);

  return (
    <div style={{ background: '#0f0f13', color: '#f0ede8', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ background: '#1c1a28', borderRadius: 12, padding: '16px 24px', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span>⚡</span>
          <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: 14 }}>DFW Home Preparedness Series</span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          DFW Home Generator Guide
          <span style={{ display: 'block', color: '#a78bfa' }}>Never Lose Power Again</span>
        </h1>

        <p style={{ color: '#9ca3af', fontSize: 18, lineHeight: 1.7, marginBottom: 60 }}>
          Winter Storm Uri (February 2021) killed 246 Texans and left millions without heat for days. Since Uri, generator sales in DFW have increased <strong style={{ color: '#f0ede8' }}>400%</strong>. If you don't have a plan, you're gambling with your family's safety.
        </p>

        {/* Generator Types */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Generator Types for DFW Homes</h2>
        <div style={{ display: 'grid', gap: 20, marginBottom: 60 }}>
          {[
            {
              icon: '⛽',
              title: 'Portable Gas Generator',
              cost: '$500–$2,000',
              tag: 'Budget Option',
              tagColor: '#6b7280',
              pros: ['Runs essential appliances', 'Widely available', 'Lower upfront cost'],
              cons: ['Cannot power whole house', 'Manual start required', 'Gas degrades, fire hazard'],
            },
            {
              icon: '🔋',
              title: 'Portable Battery Backup',
              subtitle: 'Tesla Powerwall, Generac PWRcell',
              cost: '$8,000–$15,000 installed',
              tag: 'Clean & Quiet',
              tagColor: '#059669',
              pros: ['Zero emissions', 'Automatic transfer', 'Pairs with solar', 'No fuel storage'],
              cons: ['Limited run time', 'High upfront cost', 'May not run heavy AC loads'],
            },
            {
              icon: '🏠',
              title: 'Whole-Home Standby — Natural Gas/Propane',
              cost: '$5,000–$15,000 installed',
              tag: '⭐ Best for DFW',
              tagColor: '#a78bfa',
              pros: ['Automatic start', 'Runs 7–10 days continuously', 'Natural gas stays on during ice storms', 'Whole-home coverage'],
              cons: ['Permit required', 'Professional installation only', 'Higher upfront cost'],
            },
            {
              icon: '🏭',
              title: 'Whole-Home Standby — Diesel',
              cost: '$10,000–$25,000 installed',
              tag: 'Commercial Grade',
              tagColor: '#d97706',
              pros: ['Longest run time', 'Maximum power output', 'Extremely reliable'],
              cons: ['Highest fuel cost', 'Louder than gas', 'Fuel must be stored and rotated'],
            },
          ].map(gen => (
            <div key={gen.title} style={{ background: '#1c1a28', border: '1px solid #2e2b3d', borderRadius: 12, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <span style={{ fontSize: 24, marginRight: 10 }}>{gen.icon}</span>
                  <strong style={{ fontSize: 18 }}>{gen.title}</strong>
                  {gen.subtitle && <div style={{ color: '#9ca3af', fontSize: 13, marginTop: 2 }}>{gen.subtitle}</div>}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ background: gen.tagColor + '22', color: gen.tagColor, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{gen.tag}</span>
                  <span style={{ color: '#a78bfa', fontWeight: 700 }}>{gen.cost}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <div>
                  <div style={{ color: '#34d399', fontWeight: 600, fontSize: 12, marginBottom: 6 }}>✅ PROS</div>
                  {gen.pros.map(p => <div key={p} style={{ color: '#d1d5db', fontSize: 14, marginBottom: 4 }}>• {p}</div>)}
                </div>
                <div>
                  <div style={{ color: '#f87171', fontWeight: 600, fontSize: 12, marginBottom: 6 }}>⚠️ CONS</div>
                  {gen.cons.map(c => <div key={c} style={{ color: '#d1d5db', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DFW Fuel Guidance */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>DFW-Specific Fuel Guidance</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 60 }}>
          {[
            { icon: '🔥', fuel: 'Natural Gas', verdict: 'Most Reliable', color: '#34d399', desc: 'Gas lines usually remain pressurized during ice storms unlike electric grid. If your home has gas service, this is your best standby fuel.' },
            { icon: '🛢️', fuel: 'Propane', verdict: 'Good Backup', color: '#fbbf24', desc: 'Requires a large tank ($400–$1,000 to fill). Stores indefinitely. Great if you’re not on the gas grid. Order early before storms.' },
            { icon: '⛽', fuel: 'Gasoline', verdict: 'Use Cautiously', color: '#f87171', desc: 'Degrades within 30–90 days without stabilizer. Creates fire hazard when stockpiled. Shortages occur during emergencies. Least preferred.' },
          ].map(f => (
            <div key={f.fuel} style={{ background: '#1c1a28', border: `1px solid ${f.color}33`, borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{f.fuel}</div>
              <div style={{ color: f.color, fontSize: 12, fontWeight: 600, marginBottom: 10 }}>{f.verdict}</div>
              <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Permit Note */}
        <div style={{ background: '#1c1a28', border: '1px solid #f59e0b55', borderRadius: 12, padding: 24, marginBottom: 60 }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>📋 Permit Required for Standby Generators</div>
          <p style={{ color: '#d1d5db', lineHeight: 1.7, margin: 0 }}>
            Installing a whole-home standby generator in DFW requires both an <strong>electrical permit</strong> and a <strong>gas line permit</strong> from your city or county. Most reputable installers pull permits on your behalf. Unpermitted installations can void your homeowner's insurance.
          </p>
        </div>

        {/* Interactive Sizing Guide */}
        <div style={{ background: '#1c1a28', border: '1px solid #2e2b3d', borderRadius: 16, padding: 36, marginBottom: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>⚡ What Size Generator Do You Need?</h2>
          <p style={{ color: '#9ca3af', marginBottom: 28 }}>Select the appliances that must run during an outage:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, marginBottom: 32 }}>
            {appliances.map(a => {
              const on = selected.includes(a.name);
              return (
                <button
                  key={a.name}
                  onClick={() => toggle(a.name)}
                  style={{
                    background: on ? '#a78bfa22' : '#0f0f13',
                    border: `1px solid ${on ? '#a78bfa' : '#2e2b3d'}`,
                    borderRadius: 8,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: on ? '#f0ede8' : '#9ca3af',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{a.name}</span>
                  <span style={{ fontSize: 12, color: on ? '#a78bfa' : '#6b7280' }}>{a.watts.toLocaleString()}W</span>
                </button>
              );
            })}
          </div>
          {selected.length > 0 && (
            <div style={{ background: '#0f0f13', borderRadius: 12, padding: 24, border: '1px solid #a78bfa33' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: '#9ca3af' }}>Total load estimate:</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#a78bfa' }}>{totalWatts.toLocaleString()} Watts</span>
              </div>
              <div style={{ borderTop: '1px solid #2e2b3d', paddingTop: 16 }}>
                <div style={{ color: '#34d399', fontWeight: 600, marginBottom: 6 }}>Recommended: {rec.type}</div>
                <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: 6 }}>{rec.range}</div>
                <div style={{ color: '#9ca3af', fontSize: 14 }}>{rec.note}</div>
              </div>
            </div>
          )}
          {selected.length === 0 && (
            <div style={{ textAlign: 'center', color: '#6b7280', padding: 20 }}>Select appliances above to see your wattage requirement →</div>
          )}
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1c1a28, #2e2b3d)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🔌</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Find a Generator Installer in DFW</h3>
          <p style={{ color: '#9ca3af', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Get matched with licensed, TrustyPro-verified generator installers. Compare quotes before committing.
          </p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#a78bfa', color: '#fff', fontWeight: 700, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
            Get Free Installer Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}
