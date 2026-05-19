import { useState } from 'react';

const fixtureRecommendations: Record<string, { fixture: string; qty: string; cost: string }[]> = {
  'small-front': [
    { fixture: 'Path lights', qty: '4–6 units', cost: '$120–$300 professional' },
    { fixture: 'Entry sconces', qty: '2 units', cost: '$150–$400 installed' },
    { fixture: 'Motion floodlight', qty: '1–2 units', cost: '$80–$200 installed' },
  ],
  'large-front': [
    { fixture: 'Path lights', qty: '8–12 units', cost: '$300–$700 professional' },
    { fixture: 'Tree uplights', qty: '2–4 units', cost: '$200–$500 installed' },
    { fixture: 'Entry sconces', qty: '2–4 units', cost: '$200–$600 installed' },
    { fixture: 'Motion floodlights', qty: '2–3 units', cost: '$160–$450 installed' },
  ],
  'backyard-patio': [
    { fixture: 'String/market lights', qty: '40–80 ft run', cost: '$200–$600 installed' },
    { fixture: 'Step lights', qty: '4–8 units', cost: '$150–$400 installed' },
    { fixture: 'Motion security', qty: '2 units', cost: '$120–$280 installed' },
  ],
  'pool-area': [
    { fixture: 'Underwater LED lights', qty: '2–4 units', cost: '$400–$1,200 installed' },
    { fixture: 'Perimeter path lights', qty: '6–10 units', cost: '$200–$500 installed' },
    { fixture: 'Landscape uplights', qty: '3–6 units', cost: '$300–$700 installed' },
  ],
  'large-trees': [
    { fixture: 'LED uplights (12W+)', qty: '1–2 per tree', cost: '$150–$400 per tree installed' },
    { fixture: 'Moonlighting (down)', qty: '1 per tree', cost: '$200–$500 per tree installed' },
  ],
};

const propertyOptions = [
  { id: 'small-front', label: '🏡 Small front yard (<3,000 sq ft)' },
  { id: 'large-front', label: '🏘️ Large front yard (3,000+ sq ft)' },
  { id: 'backyard-patio', label: '🪑 Backyard patio / entertaining area' },
  { id: 'pool-area', label: '🏊 Pool or water feature' },
  { id: 'large-trees', label: '🌳 Large specimen trees' },
];

export default function OutdoorLightingGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const allRecs = selected.flatMap(s => fixtureRecommendations[s] ?? []);

  return (
    <div style={{ background: '#0a0a0a', color: '#e5e7eb', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#6b7280′ }}>
          💡 ProLnk Homeowner Resource
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700, color: '#f9fafb', lineHeight: 1.2, marginBottom: 16 }}>
          DFW Outdoor Lighting Guide
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 48 }}>
          Curb Appeal, Safety, and Energy Savings — What Every DFW Homeowner Needs to Know
        </p>

        {/* Why it matters */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            🏡 Why Outdoor Lighting Matters in DFW
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { icon: '💰', stat: '+$3,500', label: 'Perceived Home Value', sub: 'Front lighting adds avg $3,500 to perceived home value at sale' },
              { icon: '🔒', stat: '43% less', label: 'Property Crime', sub: 'Well-lit homes experience significantly less property crime' },
              { icon: '⚠️', stat: 'Liability', label: 'Slip-and-Fall Risk', sub: 'Motion lighting prevents costly slip-and-fall incidents' },
              { icon: '⚡', stat: '$150–$350', label: 'Annual Savings', sub: 'LED outdoor lighting saves vs. traditional incandescent bulbs' },
            ].map(card => (
              <div key={card.stat} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#60a5fa', marginBottom: 4 }}>{card.stat}</div>
                <div style={{ fontWeight: 600, color: '#f3f4f6', marginBottom: 8, fontSize: 14 }}>{card.label}</div>
                <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{card.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Types */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            🔦 Types of Outdoor Lighting for DFW Homes
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🛤️', type: 'Path Lighting', cost: 'Solar $80–$200 DIY | Low-voltage $400–$1,200 professional', detail: 'Illuminates walkways and driveways. Solar is cost-effective for short runs; low-voltage wired systems offer more reliability and output for long paths.' },
              { icon: '🌳', type: 'Landscape Uplighting', cost: 'LED — very low operating cost once installed', detail: 'Highlights trees and architectural features. Modern LED uplights consume 8–15W and last 50,000+ hours. Dramatically improves nighttime curb appeal.' },
              { icon: '🚨', type: 'Motion Security Floodlights', cost: '$80–$250 per fixture installed', detail: 'Install at all entry points — garage, front door, side gates, back door. Motion-activated floodlights are the single best crime deterrent per dollar spent.' },
              { icon: '🚪', type: 'Porch & Entry Lighting', cost: '$100–$400 per fixture installed', detail: 'Style + safety at front and back doors. Several DFW cities (including parts of Frisco) have dark sky ordinances — check before installing bright downward-facing lights.' },
              { icon: '✨', type: 'String / Market Lights', cost: '$200–$600 installed for patio runs', detail: 'Patio ambiance. Temporary seasonal lights use standard outlets; permanent market lights use commercial-grade fixtures and dedicated circuits.' },
              { icon: '📱', type: 'Smart Outdoor Systems', cost: '$300–$1,500+ for app-controlled systems', detail: 'Lutron Caseta outdoor, Philips Hue Outdoor. Schedule sunrise/sunset automation, create scenes, control remotely. Best ROI when paired with smart thermostat ecosystem.' },
            ].map(item => (
              <div key={item.type} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: 12, padding: 20, display: 'flex', gap: 16 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f3f4f6', marginBottom: 4 }}>{item.type}</div>
                  <div style={{ fontSize: 12, color: '#10b981', marginBottom: 8, fontWeight: 600 }}>{item.cost}</div>
                  <div style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DFW-Specific */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 24 }}>
            ☀️ DFW-Specific Considerations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '🔥', title: 'UV Resistance', body: 'Texas sun destroys cheap plastic fixtures in 2–3 seasons. Buy commercial-grade aluminum or marine-rated stainless. Pay the premium once.' },
              { icon: '🌙', title: 'Dark Sky Compliance', body: 'Frisco and several DFW cities have light pollution ordinances. Use full-cutoff fixtures that direct light downward only. Required for new construction permits in some areas.' },
              { icon: '🦟', title: 'Mosquito Deterrence', body: 'Warm yellow/amber LEDs (2700K) attract significantly fewer mosquitoes than cool white bulbs (4000K+). A real quality-of-life consideration for DFW summer evenings.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#1f2937', borderRadius: 12, padding: 24, border: '1px solid #374151′ }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#f3f4f6', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Planner */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f3f4f6', marginBottom: 8 }}>
            🗺️ Outdoor Lighting Planner
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: 24, fontSize: 15 }}>
            Select your property features to get fixture recommendations and cost estimates.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {propertyOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                style={{
                  background: selected.includes(opt.id) ? '#1e3a5f' : '#111827',
                  border: selected.includes(opt.id) ? '2px solid #3b82f6′ : '2px solid #1f2937',
                  borderRadius: 10,
                  padding: '14px 20px',
                  color: selected.includes(opt.id) ? '#93c5fd' : '#d1d5db',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 15,
                  fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {allRecs.length > 0 && (
            <div style={{ background: '#0d1f33', border: '1px solid #1e40af', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#93c5fd', marginBottom: 16, fontSize: 16 }}>
                ✅ Recommended Fixtures for Your Property
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {allRecs.map((rec, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, borderBottom: '1px solid #1e3a5f', paddingBottom: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#f3f4f6', fontSize: 14 }}>{rec.fixture}</div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>{rec.qty}</div>
                    </div>
                    <div style={{ color: '#10b981', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{rec.cost}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e1b4b)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f9fafb', marginBottom: 12 }}>
            Ready to Light Up Your Property?
          </h3>
          <p style={{ color: '#9ca3af', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Find a licensed outdoor lighting installer in your DFW neighborhood — vetted, insured, and reviewed by ProLnk.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Find a Licensed Installer
          </a>
        </div>
      </div>
    </div>
  );
}
