import { useState } from 'react';

const ORIGIN_STATES = [
  'California',
  'Illinois',
  'New York',
  'Colorado',
  'Washington',
  'Florida',
  'Ohio',
  'Michigan',
];

type MigrantProfile = {
  rank: string;
  whyComing: string[];
  typicalIncome: string;
  homeExpectations: string[];
  neighborhoods: { area: string; reason: string }[];
  culturalNote: string;
};

const profiles: Record<string, MigrantProfile> = {
  California: {
    rank: '#1 Source State',
    whyComing: ['No California state income tax savings (up to 13.3%)', 'Home price arbitrage: sell $1.2M LA home, buy $600K DFW home with equity left over', 'Tech jobs in DFW (Oracle, Dell, AT&T) without the Bay Area cost', 'Perception of more space, land, and quality of life per dollar'],
    typicalIncome: '$120,000 — $250,000 HHI',
    homeExpectations: ['Expect open floor plans and large square footage', 'Strong preference for energy-efficient features (solar-ready, EV chargers)', 'Outdoor entertaining spaces are a must', 'Accustomed to modern finishes — granite, quartz, stainless', 'Often shocked by Texas property tax rates — educate early'],
    neighborhoods: [
      { area: 'Frisco / Prosper', reason: 'Top-rated schools, new construction, master-planned feel' },
      { area: 'Plano / Allen', reason: 'Tech corridor proximity, established neighborhoods with Californian density norms' },
      { area: 'Southlake / Westlake', reason: 'Luxury, privacy, gated — mirrors Palos Verdes/Marin mentality' },
      { area: 'Las Colinas', reason: 'Urban walkability for LA migrants used to city living' },
    ],
    culturalNote: 'California migrants often bring price expectations from their origin market and are willing to pay DFW premiums for "California-quality" finishes. They drive luxury spec home demand in master-planned communities.',
  },
  Illinois: {
    rank: '#2 Source State',
    whyComing: ['Escape Illinois property taxes (often 2-3x DFW rates even on same value home)', 'Chicago-to-DFW flight takes under 3 hours — staying connected to family', 'No state income tax in Texas vs. 4.95% flat in Illinois', 'Business-friendlier regulatory environment'],
    typicalIncome: '$90,000 — $175,000 HHI',
    homeExpectations: ['Familiar with four seasons — often surprised by DFW summer severity', 'Value good school districts strongly (similar to Illinois suburban culture)', 'Basement absence takes adjustment — DFW homes have none', 'Brick exterior preference from Chicago suburbs', 'Want established trees and mature landscaping'],
    neighborhoods: [
      { area: 'Naperville-equivalent: Flower Mound / Lewisville', reason: 'Suburban Chicago feel with strong school districts' },
      { area: 'Keller / Southlake', reason: 'For higher-income Illinois migrants — reminds of Barrington, Lake Forest' },
      { area: 'Richardson / Garland', reason: 'Value-oriented, Midwestern sensibility fits here' },
      { area: 'Fort Worth West Side', reason: 'More affordable, relaxed pace appeals to Illinois small-city migrants' },
    ],
    culturalNote: 'Illinois migrants are often pragmatic buyers focused on value and tax savings. They\’re less flashy than California migrants but very quality-conscious. Property tax comparison is the #1 closing conversation for this group.',
  },
  'New York': {
    rank: '#3 Source State',
    whyComing: ['NYC state + city income tax elimination (combined up to 12.7%)', 'Space: trading 900 sqft NYC apartment for 3,000+ sqft DFW home at same or lower monthly cost', 'Goldman Sachs, finance industry presence pulling finance workers to Uptown Dallas', 'Remote work making NYC-level salary portable to DFW cost structure'],
    typicalIncome: '$150,000 — $400,000 HHI',
    homeExpectations: ['Used to small spaces — DFW size can overwhelm; want curated, not just large', 'Walkability matters more than for other migrants; want restaurants/cafes within reach', 'Building quality scrutiny from NYC condo experience — inspect everything', 'Concierge building amenities expected at luxury price points', 'Privacy and security features important'],
    neighborhoods: [
      { area: 'Uptown Dallas', reason: 'NYC-closest walkability, restaurant density, urban energy' },
      { area: 'Knox-Henderson / M Streets', reason: 'Brownstone-adjacent feel, walkable, established' },
      { area: 'Highland Park / University Park', reason: 'For highest-income NY migrants — prestige, private schools, established wealth' },
      { area: 'Plano Legacy', reason: 'Finance corridor proximity for Goldman/fintech workers' },
    ],
    culturalNote: 'NY migrants are discerning and skeptical. They research heavily and negotiate hard. Building genuine trust is critical. They often make referrals within tight professional networks once converted — high LTV clients.',
  },
  Colorado: {
    rank: '#4 Source State',
    whyComing: ['Colorado housing unaffordability (Denver median surpassed $600K by 2022)', 'Texas land availability — want acreage impossible in Front Range', 'Job market diversification — Colorado tech workers finding roles in DFW', 'Lower overall cost of living despite losing Colorado state income tax advantages'],
    typicalIncome: '$100,000 — $180,000 HHI',
    homeExpectations: ['Outdoor lifestyle is core — want trail access, parks, lakes nearby', 'Sustainability features matter — solar, water efficiency, green building', 'Mountain home aesthetics: stone, wood, craftsman details preferred', 'Want land — half-acre+ is common ask from Colorado migrants', 'Garage space and workshop/hobby room important'],
    neighborhoods: [
      { area: 'Denton / Argyle', reason: 'Land, rural feel, horse properties — appeals to Colorado outdoors culture' },
      { area: 'Celina / Van Alstyne', reason: 'Acreage lots, new development with space' },
      { area: 'Mansfield / Midlothian', reason: 'Affordable with land options south of Fort Worth' },
      { area: 'Flower Mound (near Grapevine Lake)', reason: 'Water access and greenspace feels closest to Colorado lifestyle' },
    ],
    culturalNote: 'Colorado migrants are often outdoor-first buyers. If the neighborhood has trails, lakes, or parks within 5 minutes, that feature closes deals faster than granite countertops. Lead with lifestyle, follow with specs.',
  },
  Washington: {
    rank: 'Top 8 Source',
    whyComing: ['Seattle tech exodus continuing — Amazon, Microsoft workers going remote and relocating', 'Washington housing costs matched California levels by 2022', 'No change in income tax (WA also has no income tax), but massive home cost difference', 'DFW tech ecosystem (AT&T, Texas Instruments, regional offices of major tech) provides landing spots'],
    typicalIncome: '$140,000 — $280,000 HHI',
    homeExpectations: ['Tech-forward home features: smart home, EV chargers, fiber internet non-negotiable', 'Quality over quantity — prefer smaller high-quality over McMansion', 'Environmental features matter — energy efficiency, water conservation', 'Pacific Northwest aesthetic: clean lines, natural materials', 'Proximity to tech employers or good remote work infrastructure'],
    neighborhoods: [
      { area: 'Frisco / Allen', reason: 'Tech corridor, new builds with smart home features standard' },
      { area: 'Plano Legacy / Richardson', reason: 'Tech employer proximity, established professional community' },
      { area: 'Richardson Telecom Corridor', reason: 'For telecom/tech workers specifically' },
      { area: 'Highland Village / Flower Mound', reason: 'Quality suburban feel, lake access, less crowded than Plano' },
    ],
    culturalNote: 'Washington migrants expect tech-first everything — from home features to the buying process. Digital-first experience, electronic everything. They research exhaustively online before ever calling an agent.',
  },
  Florida: {
    rank: 'Top 8 Source',
    whyComing: ['Ironically escaping Florida\’s booming prices and overcrowding', 'Florida insurance crisis pushing homeowners to Texas', 'No income tax in both states — no tax incentive, but DFW prices often lower than South Florida', 'Job market competition (DFW more diverse employers than Florida tourism-heavy economy)'],
    typicalIncome: '$80,000 — $160,000 HHI',
    homeExpectations: ['Used to hurricane prep — want solid construction, no basement concerns', 'Pool is often a baseline expectation (Florida standard)', 'Open layout, indoor-outdoor flow preference', 'Warm weather adapted — will be fine with Texas heat, may miss Florida humidity oddly', 'HOA-comfortable (used to Florida strict HOA culture)'],
    neighborhoods: [
      { area: 'Arlington / Grand Prairie', reason: 'Affordable, established, sports/entertainment nearby (reminds of Florida\’s activity culture)' },
      { area: 'Fort Worth Suburbs', reason: 'Value pricing with quality neighborhoods' },
      { area: 'Mansfield / Burleson', reason: 'Growing areas with Florida-comparable price points' },
      { area: 'Carrollton / Farmers Branch', reason: 'Established, diverse, central DFW access' },
    ],
    culturalNote: 'Florida migrants are surprisingly well-adjusted to Texas — climate, culture, and HOA norms transfer reasonably well. Insurance savings is a key talking point (Florida homeowner insurance is in crisis).',
  },
  Ohio: {
    rank: 'Top 10 Source',
    whyComing: ['Midwest manufacturing job shifts and business relocations', 'Texas no income tax vs Ohio 3.99% flat', 'Lower cost entry with similar suburban lifestyle quality', 'Corporate transfers to DFW from Midwest Fortune 500 moves'],
    typicalIncome: '$70,000 — $140,000 HHI',
    homeExpectations: ['Value-conscious, no-nonsense buyers', 'Want good schools and safe neighborhoods above all', 'Four seasons expected — Texas climate adjustment curve is real', 'Basement absence is a sticking point — storage solutions matter', 'Practical over prestige — function over flash'],
    neighborhoods: [
      { area: 'Garland / Rowlett / Sachse', reason: 'Value-oriented, good schools, established community feel' },
      { area: 'Lewisville / The Colony', reason: 'Affordable, family-friendly, lake access' },
      { area: 'North Richland Hills / Haltom City', reason: 'Fort Worth metro affordable options' },
      { area: 'Mesquite / Balch Springs', reason: 'Entry-level DFW market, Midwest pricing familiarity' },
    ],
    culturalNote: 'Ohio and Midwest migrants are easy to work with and do what they say. They appreciate straightforward communication and don\’t over-negotiate. Strong word-of-mouth referral culture within Midwest transplant communities.',
  },
  Michigan: {
    rank: 'Top 10 Source',
    whyComing: ['Auto industry pivot and corporate moves out of Detroit metro', 'Michigan 4.25% income tax vs Texas 0%', 'Lower overall tax burden including property (Michigan has high effective rates)', 'DFW\’s Toyota and automotive supplier ecosystem appeals to auto industry workers'],
    typicalIncome: '$80,000 — $160,000 HHI',
    homeExpectations: ['Quality construction matters — Michigan buyers check everything after dealing with older Michigan homes', 'Garages are sacred — oversized two-car minimum expected', 'Finished square footage is valued over land (Michigan lots often small)', 'School district is major driver (Michigan public schools vary wildly)', 'Winter weather comfort — Texas storms are surprising but less severe'],
    neighborhoods: [
      { area: 'Plano / Allen (near Toyota corridor)', reason: 'Auto industry proximity, professional community' },
      { area: 'McKinney', reason: 'Charming downtown, family culture reminiscent of Grand Rapids/Ann Arbor feel' },
      { area: 'Wylie / Murphy', reason: 'Value-priced with good schools, Michigan-comparable suburban feel' },
      { area: 'Keller / Hurst / Euless', reason: 'Mid-tier Fort Worth suburbs, auto industry access via highways' },
    ],
    culturalNote: 'Michigan migrants from auto industry backgrounds have specific home quality standards. They know construction — don\’t oversell spec homes. Authenticity and detailed inspection results matter to this group.',
  },
};

export default function DFWMigrationPatternGuide() {
  const [originState, setOriginState] = useState('');

  const profile = originState ? profiles[originState] : null;

  const migrationStats = [
    { state: 'California', pct: '28%', icon: '🌴' },
    { state: 'Illinois', pct: '14%', icon: '🏙️' },
    { state: 'New York', pct: '11%', icon: '🗽' },
    { state: 'Colorado', pct: '8%', icon: '⛰️' },
    { state: 'Washington', pct: '7%', icon: '🌲' },
    { state: 'Others', pct: '32%', icon: '🗺️' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          🗺️ DFW Real Estate Intelligence
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          DFW Migration Pattern Guide 2026
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW gained 1.3M+ new residents since 2020. Where they come from shapes what they buy, where they settle, and what they pay. Understanding migrant buyer profiles is a competitive edge in this market.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 Where DFW New Residents Come From</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {migrationStats.map(({ state, pct, icon }) => (
              <div key={state} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{pct}</div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>{state}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#64748B', marginTop: 16, marginBottom: 0 }}>
            Why they're coming: no state income tax (saves $8K-$33K/yr vs CA/NY), lower cost of living relative to origin, strong job market, and space that origin metros can’t offer at any price.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🎯 Migrant Buyer Profile by Origin State</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Select Origin State</label>
            <select value={originState} onChange={e => setOriginState(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '12px 14px', fontSize: 14 }}>
              <option value="">Select state of origin...</option>
              {ORIGIN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {profile && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{originState} Migrants</div>
                <div style={{ background: '#F5E642', color: '#0A1628', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{profile.rank}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>💼 Typical Household Income</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>{profile.typicalIncome}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Why They're Coming</div>
                {profile.whyComing.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#F5E642′ }}>✓</span>
                    <span style={{ fontSize: 14, color: '#94A3B8′ }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>🏡 Home Expectations</div>
                {profile.homeExpectations.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#94A3B8′ }}>→</span>
                    <span style={{ fontSize: 14, color: '#94A3B8′ }}>{e}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>📍 Neighborhoods They Tend to Favor</div>
                {profile.neighborhoods.map(({ area, reason }) => (
                  <div key={area} style={{ background: '#0F2040', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{area}</div>
                    <div style={{ fontSize: 13, color: '#64748B' }}>{reason}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 14, background: '#F5E64210', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Cultural Note</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.6 }}>{profile.culturalNote}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏘️ How Migration Is Changing DFW</h2>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginBottom: 0 }}>
            DFW is evolving from a regional Texas hub into a nationally diverse metro. California migrants bring tech culture and premium home expectations. New York finance workers are urbanizing Dallas. Midwest migrants are stabilizing and diversifying the suburban market. This diversity is creating sub-markets within DFW — from walkable urban to 5-acre exurban — that didn't exist 10 years ago. The agent who understands origin-state buyer psychology closes more deals.
          </p>
        </div>
      </div>
    </div>
  );
}
