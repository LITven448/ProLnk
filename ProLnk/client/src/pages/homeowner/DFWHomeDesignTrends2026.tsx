import { useState } from 'react';

const rooms = [
  {
    room: 'Living Room',
    trends: [
      { trend: 'Warm neutrals (Agreeable Gray, Accessible Beige)', roi: 'High', note: 'Replaces cool grays — buyers respond immediately.' },
      { trend: 'Open floor plan (remove wall to kitchen)', roi: 'Very High', note: '$5K–$15K investment, adds $20K–$50K to value in DFW.' },
      { trend: 'Hard floors (LVP or engineered hardwood)', roi: 'High', note: 'DFW buyers will not buy homes with carpet in living areas.' },
      { trend: 'Large sliding or folding glass doors to patio', roi: 'Medium', note: 'Indoor-outdoor connection. DFW weather makes this premium.' },
    ],
    out: ['Carpet', 'Barn doors', 'All-white walls', 'Shiplap accent walls'],
  },
  {
    room: 'Kitchen',
    trends: [
      { trend: 'Quartz countertops with waterfall island', roi: 'Very High', note: 'Granite is declining. Quartz = clean, durable, buyer expectation.' },
      { trend: 'Dark kitchen island (contrasting color)', roi: 'High', note: 'Two-tone cabinetry is the standard for $400K+ homes.' },
      { trend: 'Black or matte brass hardware and fixtures', roi: 'Medium', note: 'Chrome is dated. Dark hardware elevates perceived quality.' },
      { trend: 'Hidden walk-in pantry', roi: 'High', note: 'DFW buyers prioritize storage. Hidden pantry is a top ask.' },
    ],
    out: ['All-white kitchens', 'Colored appliances', 'Tile countertops', 'Open shelving everywhere'],
  },
  {
    room: 'Primary Bathroom',
    trends: [
      { trend: 'Walk-in shower with bench, frameless glass, rainfall head', roi: 'Very High', note: 'No tubs in primary bath for $400K+ DFW homes. Remove it.' },
      { trend: 'Heated floors (radiant)', roi: 'Medium', note: 'Luxury signal. Cost: $800–$2,500. ROI depends on price point.' },
      { trend: 'Double vanity with integrated lighting', roi: 'High', note: 'Single vanity is a deal-breaker for dual-income buyers.' },
      { trend: 'Spa color palette — warm stone, greige, terracotta', roi: 'High', note: 'Cold blue tile is out. Warm tones signal luxury.' },
    ],
    out: ['Garden tubs (in primary)', 'Colored tile', 'Chrome fixtures', 'Single vanity'],
  },
  {
    room: 'Home Office',
    trends: [
      { trend: 'Dedicated office (not a flex room)', roi: 'Very High', note: 'Remote work is permanent. Buyers paying $400K+ expect a real office.' },
      { trend: 'Built-in bookshelves or desk', roi: 'High', note: 'Signals permanence. Buyers will pay $5K–$15K more for built-ins.' },
      { trend: 'Glass french doors for visibility and light', roi: 'Medium', note: 'Makes space feel connected while maintaining acoustic separation.' },
    ],
    out: ['Closet conversions', 'No natural light', 'Single electrical outlet'],
  },
  {
    room: 'Exterior / Outdoor',
    trends: [
      { trend: 'Covered outdoor living space (pergola, covered patio)', roi: 'Very High', note: 'DFW heat means covered = usable. Uncovered = unused.' },
      { trend: 'Outdoor kitchen or built-in grill', roi: 'Medium–High', note: 'Texas buyers expect it at $500K+ price points.' },
      { trend: 'Dark exterior accents (gutters, shutters, trim)', roi: 'High', note: 'Crisp contrast vs. warm body color. Curb appeal standard.' },
    ],
    out: ['Above-ground pools', 'Decorative shutters (non-functional)', 'Dated brick painted over'],
  },
];

const roiColors: Record<string, string> = {
  'Very High': '#34d399',
  'High': '#a78bfa',
  'Medium': '#fbbf24',
  'Medium–High': '#60a5fa',
};

export default function DFWHomeDesignTrends2026() {
  const [activeRoom, setActiveRoom] = useState(rooms[0].room);
  const current = rooms.find(r => r.room === activeRoom)!;

  return (
    <div style={{ background: '#0f0f13', color: '#f0ede8', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ background: '#1c1a28', borderRadius: 12, padding: '12px 20px', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span>🏡</span>
          <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: 14 }}>DFW Real Estate Intelligence</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          DFW Home Design Trends 2026
          <span style={{ display: 'block', color: '#a78bfa', fontSize: 28 }}>What Buyers and Sellers Need to Know</span>
        </h1>

        <p style={{ color: '#9ca3af', fontSize: 18, lineHeight: 1.7, marginBottom: 50 }}>
          DFW is one of the most competitive housing markets in the US. Buyers here are sophisticated — they know what they want and they walk away from homes that don't deliver it. These trends are not aesthetic preferences. They’re <strong style={{ color: '#f0ede8' }}>deal-makers and deal-breakers.</strong>
        </p>

        {/* What's OUT */}
        <div style={{ background: '#1c1a28', border: '1px solid #f8717133', borderRadius: 12, padding: 28, marginBottom: 50 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f87171', marginBottom: 20 }}>🚫 What's OUT in DFW (2026)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {[
              { item: 'Barn Doors', note: 'Peaked 2018. Now signals "HGTV era" — dated.' },
              { item: 'Shiplap', note: 'Over-done. Hard to paint over later. Buyers see extra cost.' },
              { item: 'All-White Kitchens', note: 'Too sterile. Warm cabinet colors are the new standard.' },
              { item: 'Carpet in Living Areas', note: 'Hard stop. DFW buyers will not offer on carpeted main floors.' },
              { item: 'Cool Gray Paint', note: 'Replaced by warm neutrals across the board.' },
              { item: 'Colored Appliances', note: 'Stay stainless. Any other color limits your buyer pool.' },
            ].map(o => (
              <div key={o.item} style={{ background: '#0f0f13', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: '#f87171' }}>✗ {o.item}</div>
                <div style={{ color: '#9ca3af', fontSize: 13 }}>{o.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Room Checker */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>🔍 Room-by-Room Trend Guide</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {rooms.map(r => (
            <button
              key={r.room}
              onClick={() => setActiveRoom(r.room)}
              style={{
                background: activeRoom === r.room ? '#a78bfa' : '#1c1a28',
                color: activeRoom === r.room ? '#fff' : '#9ca3af',
                border: '1px solid ' + (activeRoom === r.room ? '#a78bfa' : '#2e2b3d'),
                borderRadius: 8,
                padding: '8px 18px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.15s',
              }}
            >
              {r.room}
            </button>
          ))}
        </div>

        <div style={{ background: '#1c1a28', borderRadius: 16, padding: 32, marginBottom: 50 }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>{activeRoom} — Trends & ROI</h3>
          <div style={{ display: 'grid', gap: 14, marginBottom: 28 }}>
            {current.trends.map(t => (
              <div key={t.trend} style={{ background: '#0f0f13', borderRadius: 10, padding: 18, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.trend}</div>
                  <div style={{ color: '#9ca3af', fontSize: 14 }}>{t.note}</div>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <span style={{ background: (roiColors[t.roi] || '#6b7280') + '22', color: roiColors[t.roi] || '#6b7280', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>
                    ROI: {t.roi}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#f87171', fontWeight: 600, fontSize: 13, marginBottom: 10 }}>AVOID in {activeRoom}:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {current.out.map(o => (
                <span key={o} style={{ background: '#f8717122', color: '#f87171', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>✗ {o}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1c1a28, #2e2b3d)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🔨</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ready to Update Your DFW Home?</h3>
          <p style={{ color: '#9ca3af', marginBottom: 28 }}>Get matched with licensed contractors who specialize in high-ROI DFW updates.</p>
          <a href="/homeowner/signup" style={{ display: 'inline-block', background: '#a78bfa', color: '#fff', fontWeight: 700, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
            Get Contractor Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}
