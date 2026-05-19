import { useState } from 'react';

const MARKET_FACTS = [
  { icon: '📈', title: 'Peak Demand Window', body: 'February through May is DFW\’s hottest selling season. Listings receive 40% more showings than summer or fall. Buyer competition peaks in March and April.' },
  { icon: '🌿', title: 'Lawn & Landscaping Surge', body: 'DFW landscapers are fully booked by mid-February. Schedule spring lawn treatment and sod installation in January to guarantee your preferred contractor and best pricing.' },
  { icon: '🔧', title: 'Contractor Booking Crunch', body: 'HVAC, roofing, and exterior contractors see 2-3 week wait times by March. If you\’re selling in spring, complete repairs and updates no later than February 1.' },
  { icon: '🏡', title: 'Why DFW Spring Works', body: 'Texas school calendars drive family moves in May-June. Buyers pre-shop February-April to close before summer. DFW\’s warm springs mean curb appeal peaks earlier than national markets.' },
  { icon: '💧', title: 'Sprinkler System Prep', body: 'First spring activation often reveals cracked heads and valve failures after DFW\’s freeze events. Budget $150-$400 for a professional spring startup and inspection each March.' },
];

type Role = 'buyer' | 'seller' | 'owner' | '';

const STRATEGIES: Record<string, { title: string; steps: string[] }> = {
  buyer: {
    title: '🛒 Spring Buyer Strategy',
    steps: [
      'Get fully pre-approved (not just pre-qualified) before February 1 — sellers reject conditional offers in spring',
      'Search new listings daily at 7am — well-priced DFW homes go under contract in 48-72 hours in spring',
      'Waive inspection contingency only on homes with recent (post-2020) roofs and HVAC systems',
      'Target listings that missed the February-March window — sellers are more negotiable in May',
      'Budget 3-5% above asking price for your must-have neighborhoods; set hard limits before touring',
    ],
  },
  seller: {
    title: '🏷️ Spring Seller Strategy',
    steps: [
      'List Thursday or Friday — weekend showings drive the first offers; aim for March 1-April 15 sweet spot',
      'Price at market, not above — overpriced spring listings stall and carry a stigma into summer',
      'Complete all cosmetic updates by February 15: fresh paint, new fixtures, deep clean, professional photos',
      'Request offers by Sunday at 5pm to create urgency and competitive multiple-offer situations',
      'Accept escalation clauses with a reasonable ceiling — don\’t leave money on the table in a hot spring market',
    ],
  },
  owner: {
    title: '🏠 Spring Homeowner Strategy',
    steps: [
      'Book HVAC tune-up in January before spring rush — filters, coils, refrigerant check before 90°F days arrive',
      'Apply pre-emergent herbicide in late February before soil hits 55°F — prevents crabgrass all season',
      'Inspect roof after late-winter hail events; file insurance claims within 12 months of storm damage',
      'Power wash driveways, fences, and siding in March before heat sets in for best results',
      'Refresh exterior caulking and paint trim in March-April for peak curb appeal and weather protection',
    ],
  },
};

export default function DFWSpringMarketGuide() {
  const [active, setActive] = useState<string | null>(null);
  const [role, setRole] = useState<Role>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌸</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Spring Market Guide
          </h1>
          <p style={{ color: '#8A9BB5', fontSize: 15, margin: 0 }}>
            February–May: DFW's hottest real estate window explained
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {MARKET_FACTS.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setActive(active === String(i) ? null : String(i))}
                style={{ width: '100%', textAlign: 'left', background: active === String(i) ? '#1E3A5F' : '#0F2340', border: '1px solid', borderColor: active === String(i) ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '14px 18px', color: '#E8EDF5', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span>{f.icon}</span><span>{f.title}</span>
              </button>
              {active === String(i) && (
                <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px', fontSize: 14, color: '#B8C8DC', lineHeight: 1.6 }}>
                  {f.body}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>
            🎯 What's Your Spring Role?
          </h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {(['buyer', 'seller', 'owner'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{ flex: 1, padding: '11px 0', background: role === r ? '#F5E642' : '#1E3A5F', color: role === r ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                {r === 'buyer' ? '🛒 Buyer' : r === 'seller' ? '🏷️ Seller' : '🏠 Owner'}
              </button>
            ))}
          </div>
          {role && (
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 18 }}>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>
                {STRATEGIES[role].title}
              </h3>
              <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {STRATEGIES[role].steps.map((step, i) => (
                  <li key={i} style={{ color: '#B8C8DC', fontSize: 14, lineHeight: 1.6 }}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#3A5070', fontSize: 12, marginTop: 32 }}>
          ProLnk — DFW Home Intelligence
        </p>
      </div>
    </div>
  );
}
