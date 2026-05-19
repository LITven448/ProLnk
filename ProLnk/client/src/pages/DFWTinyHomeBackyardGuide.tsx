import { useState } from 'react';

const cityRules: Record<string, { allowed: boolean; notes: string; setbacks: string; maxSqFt: string; utility: string }> = {
  dallas: { allowed: true, notes: 'Dallas allows ADUs per SB 2 (2023). Zoning varies by district — SF-1 allows, some historic districts restricted.', setbacks: '5ft side, 5ft rear', maxSqFt: '1,400 sq ft or 50% main home', utility: 'Separate meter available' },
  fortworth: { allowed: true, notes: 'Fort Worth embraced ADUs post-SB 2. "Detached ADU" category added 2023.', setbacks: '5ft side, 5ft rear', maxSqFt: '1,200 sq ft', utility: 'Shared or separate meter' },
  plano: { allowed: true, notes: 'Plano updated codes 2024. ADUs allowed in most residential zones.', setbacks: '5ft side, 10ft rear', maxSqFt: '50% primary structure or 800 sq ft', utility: 'Shared meter standard, separate available with utility upgrade' },
  frisco: { allowed: true, notes: 'Frisco allows per state law. Strict design standards — must match primary structure aesthetics.', setbacks: '5ft side, 10ft rear', maxSqFt: '700 sq ft max', utility: 'Shared meter required in most cases' },
  mckinney: { allowed: true, notes: 'McKinney allows ADUs. 2024 update streamlined permit process.', setbacks: '5ft side, 5ft rear', maxSqFt: '1,000 sq ft', utility: 'Utility connection fee: $2,000–4,000′ },
  denton: { allowed: true, notes: 'Denton allows ADUs, somewhat more flexible than north DFW suburbs.', setbacks: '5ft side, 5ft rear', maxSqFt: '1,200 sq ft or 50% primary', utility: 'Separate meter available for rentals' },
  arlington: { allowed: true, notes: 'Arlington allows per SB 2. Some older SF zones have restrictions — verify by address.', setbacks: '5ft side, 5ft rear', maxSqFt: '1,000 sq ft', utility: 'Utility hookup runs $3,000–6,000 for separate service' },
  other: { allowed: true, notes: 'Texas SB 2 (2023) prohibits cities from banning ADUs outright in single-family zones. Check your specific city — most DFW cities have updated codes.', setbacks: 'Varies (5–10ft typical)', maxSqFt: 'Varies (700–1,400 sq ft)', utility: 'Connection fees $2,000–8,000 depending on distance from main service' },
};

const useCaseCosts: Record<string, { cost: string; timeline: string; notes: string }> = {
  guest: { cost: '$60,000–120,000', timeline: '3–6 months', notes: 'No separate utility meter needed. Can share water/electric with main house. DFW guest house sweet spot: 400–600 sq ft with bedroom, bath, and kitchenette.' },
  rental: { cost: '$80,000–150,000', timeline: '4–8 months', notes: 'Separate utility meter required for rental income. DFW average ADU rent: $1,200–2,000/mo. Payback typically 5–8 years. Check for HOA restrictions before starting.' },
  multigenerational: { cost: '$75,000–140,000', timeline: '4–7 months', notes: 'Full accessibility features add $5,000–15,000 (wide doorways, roll-in shower, no steps). Single-story preferred for aging parents. DFW demand surging post-pandemic.' },
};

export default function DFWTinyHomeBackyardGuide() {
  const [city, setCity] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [showResult, setShowResult] = useState(false);

  const cityData = cityRules[city];
  const useData = useCaseCosts[intendedUse];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW ADU GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Backyard Tiny Home & ADU Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Texas SB 2 (signed 2023) prevents DFW cities from banning Accessory Dwelling Units in single-family zones.
          This changed everything — ADU permits in DFW surged 340% from 2023 to 2025.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>📋 Texas SB 2 — What It Means for DFW</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <ul style={{ color: '#94a3b8', margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8 }}>
            <li>Cities <strong style={{ color: '#fff' }}>cannot prohibit</strong> ADUs in single-family residential zones</li>
            <li>Cities CAN set reasonable setbacks, height limits, and design standards</li>
            <li>HOAs <strong style={{ color: '#fff' }}>can still prohibit</strong> ADUs — check your HOA docs first</li>
            <li>Permit process must be completed within <strong style={{ color: '#fff' }}>60 days</strong> (state mandate)</li>
            <li>Owner-occupancy requirements were removed — you can rent and live elsewhere</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏗️ ADU Use Cases & Costs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {Object.entries(useCaseCosts).map(([key, val]) => (
            <div key={key} style={{ background: '#1e2d45', borderRadius: 8, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <strong style={{ color: '#F5E642′ }}>{key === ’guest' ? '🛏️ Guest Suite' : key === 'rental' ? '💰 Rental Income' : '👨‍👩‍👧 Multigenerational'}</strong>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{val.cost} · {val.timeline}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '8px 0 0′ }}>{val.notes}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Check Your DFW City + Get Your Plan</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your DFW City</label>
              <select value={city} onChange={e => { setCity(e.target.value); setShowResult(false); }}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select city</option>
                <option value='dallas'>Dallas</option>
                <option value='fortworth'>Fort Worth</option>
                <option value='plano'>Plano</option>
                <option value='frisco'>Frisco</option>
                <option value='mckinney'>McKinney</option>
                <option value='denton'>Denton</option>
                <option value='arlington'>Arlington</option>
                <option value='other'>Other DFW City</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Intended Use</label>
              <select value={intendedUse} onChange={e => { setIntendedUse(e.target.value); setShowResult(false); }}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select use</option>
                <option value='guest'>Guest Suite</option>
                <option value='rental'>Rental Income</option>
                <option value='multigenerational'>Multigenerational Living</option>
              </select>
            </div>
          </div>
          <button onClick={() => { if (city && intendedUse) setShowResult(true); }}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get My DFW ADU Plan
          </button>

          {showResult && cityData && useData && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 6, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>✅ Your DFW ADU Plan</div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>📋 {city.charAt(0).toUpperCase() + city.slice(1)} ADU Rules</div>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 4px' }}>{cityData.notes}</p>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
                  Setbacks: {cityData.setbacks} · Max: {cityData.maxSqFt} · Utility: {cityData.utility}
                </p>
              </div>

              <div style={{ borderTop: '1px solid #1e2d45', paddingTop: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>💰 Cost & Timeline</div>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: '0 0 4px' }}>
                  Estimated Cost: <strong style={{ color: '#F5E642′ }}>{useData.cost}</strong> · Timeline: <strong style={{ color: '#fff' }}>{useData.timeline}</strong>
                </p>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{useData.notes}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>⚠️ Check Your HOA First</strong>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 14 }}>
            Texas SB 2 does not override HOA restrictions. Before spending a dollar on plans,
            review your HOA CC&Rs or email your HOA board. In DFW, approximately 60% of subdivisions
            built after 2000 have HOA restrictions that may limit or prohibit ADUs despite state law.
          </p>
        </div>
      </div>
    </div>
  );
}
