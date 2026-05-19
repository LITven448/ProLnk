import { useState } from 'react';

const zoningData: Record<string, Record<string, { designation: string; allows: string[]; restrictions: string[]; variance: boolean; note: string }>> = {
  adu: {
    Frisco: { designation: 'SF-1 / SF-2', allows: ['Accessory structures up to 600 sq ft', 'Guest houses (no kitchen)', 'Pool houses'], restrictions: ['No separate utility meters', 'Cannot rent as standalone dwelling', 'Must match primary structure materials'], variance: false, note: 'Frisco does NOT permit ADUs as rentable units — only accessory structures.' },
    Dallas: { designation: 'SF-1 / SF-2 / SF-3', allows: ['ADUs permitted by right in SF-2 and SF-3', 'Detached up to 1,000 sq ft', 'Separate entrance allowed'], restrictions: ['Must be owner-occupied primary', 'Parking requirement applies', 'Max height 17 ft'], variance: false, note: 'Dallas liberalized ADU rules in 2023 — one of most permissive DFW cities.' },
    Plano: { designation: 'R-1 / R-2', allows: ['Guest quarters without kitchen', 'Detached garage with living area'], restrictions: ['No separate rental permitted', 'Must be on same lot as primary', 'Max 800 sq ft'], variance: true, note: 'Variance required to add kitchen to accessory structure in Plano.' },
    default: { designation: 'Varies by city', allows: ['Accessory structures generally allowed', 'Some cities permit ADUs as rentals'], restrictions: ['Check specific city zoning ordinance', 'HOA rules may be more restrictive', 'Utility connections require permits'], variance: false, note: 'ADU rules vary significantly across DFW. Contact your city planning department.' },
  },
  business: {
    Frisco: { designation: 'SF-1 (residential)', allows: ['Home-based business with no client traffic', 'No exterior signage', 'No employees on-site'], restrictions: ['No commercial vehicles visible', 'Max 25% of home used for business', 'No retail sales on-site'], variance: false, note: 'Frisco home occupation permit required — apply at development.friscotexas.gov' },
    Dallas: { designation: 'SF-1 / SF-2 / SF-3', allows: ['Home occupation permit covers most service businesses', 'One non-resident employee allowed'], restrictions: ['No client visits in SF-1', 'No stock storage beyond 100 sq ft', 'No equipment visible from street'], variance: false, note: 'Dallas home occupation permits are $100 and processed online.' },
    default: { designation: 'SF-1 (typical residential)', allows: ['Administrative/paperwork businesses', 'Phone/computer-based work', 'No-traffic consulting'], restrictions: ['No client visits without permit', 'No visible commercial activity', 'No signage'], variance: false, note: 'Most DFW cities require a home occupation permit. Verify with your city.' },
  },
  pool: {
    default: { designation: 'SF — all types', allows: ['Pools permitted by right in residential zones', 'Spa/hot tub included'], restrictions: ['5 ft setback from property line typical', 'Fence/barrier required (barrier code)', 'Mechanical equipment location restrictions'], variance: false, note: 'Pools are generally by-right in all DFW residential zones but require permits and barrier compliance.' },
  },
  garage: {
    default: { designation: 'SF — all types', allows: ['Detached garage permitted in most zones', 'Garage conversion to living space'], restrictions: ['Max height 15–18 ft typical', 'Setback rules apply (5 ft side/rear)', 'Impervious cover limits apply in some cities'], variance: false, note: 'Detached garages are one of the simplest projects in DFW — verify impervious cover limits.' },
  },
};

const cities = ['Frisco', 'Dallas', 'Plano', 'Fort Worth', 'McKinney', 'Allen'];
const uses = [
  { key: 'adu', label: 'ADU / Guest House / Rental Cottage' },
  { key: 'business', label: 'Home Business / Office' },
  { key: 'pool', label: 'Swimming Pool / Spa' },
  { key: 'garage', label: 'Detached Garage / Workshop' },
];

export default function DFWZoningGuide() {
  const [use, setUse] = useState('');
  const [city, setCity] = useState('');

  const useInfo = use && zoningData[use] ? (zoningData[use][city] || zoningData[use].default) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>🏠 PROLNK DFW RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Residential Zoning Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>What your SF-1/SF-2/SF-3 zoning actually allows — and how to check before you build.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Planned Use</label>
            <select value={use} onChange={e => setUse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select planned use...</option>
              {uses.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select city...</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {useInfo && (
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55′ }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>✅ What's Allowed</div>
                <ul style={{ paddingLeft: 16, margin: 0, color: '#94A3B8', fontSize: 13, lineHeight: 1.9 }}>
                  {useInfo.allows.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div style={{ backgroundColor: '#1a0a0a', borderRadius: 12, padding: 20, border: '1px solid #7f1d1d' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#FCA5A5', marginBottom: 10 }}>🚫 Restrictions</div>
                <ul style={{ paddingLeft: 16, margin: 0, color: '#94A3B8', fontSize: 13, lineHeight: 1.9 }}>
                  {useInfo.restrictions.map(r => <li key={r}>{r}</li>)}
                </ul>
              </div>
            </div>
            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#F5E642′ }}>📋 Likely Zoning Designation</span>
                <span style={{ backgroundColor: '#0A1628', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{useInfo.designation}</span>
                {useInfo.variance && <span style={{ backgroundColor: '#7f1d1d', color: '#FCA5A5', padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>Variance May Be Required</span>}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{useInfo.note}</div>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #2D3E55', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>📍 How to Look Up Your Zoning</div>
          <ol style={{ paddingLeft: 20, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
            <li>Visit your city's GIS/zoning portal (search "[city] zoning map")</li>
            <li>Enter your property address to see current zoning designation</li>
            <li>Cross-reference designation with city's zoning ordinance permitted uses table</li>
            <li>Remember: deed restrictions and HOA rules can be MORE restrictive than zoning</li>
          </ol>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>Need a contractor familiar with DFW zoning requirements?</div>
          <a href='https://prolnk.io' style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Find Local Experts on ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
