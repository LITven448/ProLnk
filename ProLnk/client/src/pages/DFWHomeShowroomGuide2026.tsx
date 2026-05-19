import { useState } from 'react';

export default function DFWHomeShowroomGuide2026() {
  const [reno, setReno] = useState<string>('flooring');

  const guides: Record<string, { label: string; stores: { icon: string; name: string; locations: string; detail: string }[] }> = {
    flooring: {
      label: 'Flooring',
      stores: [
        { icon: '🏬', name: 'Floor & Decor', locations: '8 DFW locations', detail: 'Best selection and pricing in DFW for tile, hardwood, LVP, and laminate. Contractors get trade pricing — ask your ProLnk pro to source materials here and pass savings to you.' },
        { icon: '🏗️', name: 'BuilderDirect', locations: 'Online + DFW showroom', detail: 'Excellent for hardwood and LVP bulk orders. No middleman markup. Order samples first — colors vary between screen and real life especially on DFW clay soil subfloors.' },
        { icon: '🛒', name: 'LL Flooring', locations: 'Plano, Ft Worth, Arlington', detail: 'Good for budget hardwood and laminate. Clearance section often has quality DFW-appropriate options at 40–60% off retail.' },
        { icon: '🔨', name: 'Home Depot / Lowes', locations: '50+ DFW locations', detail: 'Best for in-stock same-day pickup. Installation services available but price 15–20% above independent DFW contractors. Use for emergency replacements or small repairs.' },
      ],
    },
    kitchen: {
      label: 'Kitchen',
      stores: [
        { icon: '🏠', name: 'IKEA (SEKTION Cabinets)', locations: 'IKEA Coppell (DFW)', detail: 'IKEA kitchen cabinets have transformed DFW budget renovations. SEKTION line is modular, durable, and 40–60% less than mid-range custom. Works best with ProLnk-vetted IKEA kitchen installers.' },
        { icon: '🏬', name: 'Floor & Decor', locations: '8 DFW locations', detail: 'Excellent for backsplash tile and kitchen flooring. Their design consultants are free and can help you match tile to cabinet colors — worth the visit before you order anything.' },
        { icon: '🪨', name: 'MSI Surfaces DFW', locations: 'Carrollton showroom', detail: 'Best DFW source for quartz and granite countertops. Fabrication and install included. Visit the slab yard in person — remnants are priced at a fraction of full slabs for smaller kitchens.' },
        { icon: '🛁', name: 'Ferguson Bath & Kitchen', locations: 'Dallas, Plano, Ft Worth', detail: 'Where DFW designers source appliances and fixtures. Trade accounts get 20–30% off retail. Ask your ProLnk contractor if they have a trade account you can leverage.' },
      ],
    },
    bathroom: {
      label: 'Bathroom',
      stores: [
        { icon: '🛁', name: 'Ferguson Bath & Kitchen', locations: 'Dallas, Plano, Ft Worth', detail: 'Top DFW source for Kohler, Moen, Delta, and luxury vanities. Their showrooms have working displays — see and touch before you buy. Trade pricing available through licensed contractors.' },
        { icon: '🏬', name: 'Floor & Decor', locations: '8 DFW locations', detail: 'Best DFW destination for bathroom tile — floor, wall, and shower. Their porcelain selection for wet areas is unmatched at the price point. Free design consultation included.' },
        { icon: '🛒', name: 'The Tile Shop', locations: 'Dallas, Plano, Southlake', detail: 'Premium and designer tile for DFW luxury bath renovations. Higher price point but unique patterns not available at big box stores. Good for master bath feature walls and shower niches.' },
        { icon: '🏠', name: 'IKEA (GODMORGON)', locations: 'IKEA Coppell', detail: 'IKEA bathroom vanities are highly underrated for DFW budget baths. GODMORGON series is water-resistant, well-built, and pairs with undermount sinks for a clean look at $300–500.' },
      ],
    },
    exterior: {
      label: 'Exterior',
      stores: [
        { icon: '🖌️', name: 'Sherwin-Williams', locations: '100+ DFW locations', detail: 'DFW contractors almost universally prefer Sherwin-Williams Emerald for exterior. The heat and UV in North Texas requires a premium paint — cheaper paints peel in 2–3 years. Contractor pricing available.' },
        { icon: '🪵', name: "Lowe's Pro Desk", locations: '50+ DFW', detail: "Lowe's Pro Desk is underutilized. Contractors get a separate checkout, bulk pricing, and delivery scheduling. If your ProLnk contractor uses Lowe's, ask them to set up a project account." },
        { icon: '🏗️', name: 'ABC Supply Co.', locations: 'Dallas, Ft Worth, Garland, Plano', detail: 'The DFW roofing and siding supply hub. Not open to public — but every serious DFW roofing and siding contractor sources here. Material quality is consistent and commercial-grade.' },
        { icon: '🌿', name: 'SiteOne Landscape Supply', locations: 'Multiple DFW locations', detail: 'Where DFW landscape contractors source pavers, mulch, sod, and stone. Not retail-facing, but your ProLnk landscaper can source here for better material quality than big box options.' },
      ],
    },
  };

  const renoTypes = Object.keys(guides);
  const active = guides[reno];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏪</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Home Showroom Shopping Guide 2026</h1>
          <p style={{ color: '#8B9AB5', marginTop: '0.5rem' }}>Where DFW homeowners shop smart — by renovation type</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {renoTypes.map((rt) => (
            <button
              key={rt}
              onClick={() => setReno(rt)}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 20,
                border: `1px solid ${reno === rt ? '#F5E642' : '#1E3050'}`,
                background: reno === rt ? '#F5E642' : '#0F1E35',
                color: reno === rt ? '#0A1628' : '#8B9AB5',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {guides[rt].label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {active.stores.map((s, i) => (
            <div key={i} style={{ background: '#0F1E35', border: '1px solid #1E3050', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.3rem' }}>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    <span style={{ color: '#F5E642', fontSize: '0.8rem' }}>📍 {s.locations}</span>
                  </div>
                  <p style={{ color: '#8B9AB5', margin: '0.4rem 0 0', fontSize: '0.85rem', lineHeight: 1.5 }}>{s.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0F1E35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3050', textAlign: 'center' }}>
          <p style={{ color: '#8B9AB5', margin: 0, fontSize: '0.9rem' }}>
            🔗 <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk</span> connects you with DFW contractors who know these suppliers — and can pass trade pricing on to you.
          </p>
        </div>
      </div>
    </div>
  );
}
