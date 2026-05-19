import { useState } from 'react';

type DuplexCity = 'dallas' | 'fortworth' | 'denton' | 'arlington' | 'garland' | 'irving' | 'mesquite' | 'mckinney';
type UnitConfig = '2bed2bath' | '3bed2bath' | '2bed1bath';

const cityZoning: Record<DuplexCity, { zoned: boolean; minLot: number; setback: string; notes: string }> = {
  dallas: { zoned: true, minLot: 5000, setback: '5 ft side, 20 ft front', notes: 'MF-1(A) zoning allows duplexes; many older Dallas neighborhoods already have duplex lots' },
  fortworth: { zoned: true, minLot: 6000, setback: '5 ft side, 25 ft front', notes: 'B and C residential zones allow duplexes; strong rental market near TCU and downtown' },
  denton: { zoned: true, minLot: 7500, setback: '5 ft side, 25 ft front', notes: 'Strong university demand; duplex zoning available in RD-5 and RD-6 zones' },
  arlington: { zoned: true, minLot: 6000, setback: '5 ft side, 25 ft front', notes: 'Duplex permitted in R-2 zones; growing rental demand near UT Arlington' },
  garland: { zoned: true, minLot: 7500, setback: '5 ft side, 20 ft front', notes: 'More affordable land; duplex zoning available; strong working-class rental demand' },
  irving: { zoned: true, minLot: 8000, setback: '7 ft side, 25 ft front', notes: 'Near DFW airport; corporate renter demand; SF-MF-1 zones allow duplexes' },
  mesquite: { zoned: false, minLot: 10000, setback: 'Variance required', notes: 'Primarily single-family; duplex requires special use permit and variance process' },
  mckinney: { zoned: true, minLot: 7500, setback: '7 ft side, 25 ft front', notes: 'Fast-growing; R-2 zones available but competition for land is intense' },
};

const unitRent: Record<UnitConfig, { label: string; rent: number; buildCost: number }> = {
  '2bed2bath': { label: '2 Bed / 2 Bath', rent: 1650, buildCost: 135000 },
  '3bed2bath': { label: '3 Bed / 2 Bath', rent: 1950, buildCost: 165000 },
  '2bed1bath': { label: '2 Bed / 1 Bath', rent: 1400, buildCost: 110000 },
};

export default function DFWDuplexBuildingGuide() {
  const [city, setCity] = useState<DuplexCity>('dallas');
  const [config, setConfig] = useState<UnitConfig>('2bed2bath');
  const [budget, setBudget] = useState(350000);
  const [showResults, setShowResults] = useState(false);

  const zoning = cityZoning[city];
  const unit = unitRent[config];
  const totalBuildCost = unit.buildCost * 2 + 25000;
  const monthlyGross = unit.rent * 2;
  const monthlyExpenses = Math.round(monthlyGross * 0.35);
  const monthlyNOI = monthlyGross - monthlyExpenses;
  const annualNOI = monthlyNOI * 12;
  const capRate = budget > 0 ? ((annualNOI / budget) * 100).toFixed(1) : '0';
  const canAfford = budget >= totalBuildCost;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>Building a Duplex in DFW</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>Rental income from day one. Where duplex zoning exists, how much it costs, and what you'll actually earn.</p>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, margin: '40px 0′ }}>
          {[
            { icon: '💰', title: '$100–150K/Unit', desc: 'Typical construction cost per unit in DFW. Total duplex: $220–330K all-in.', bg: '#EFF6FF', accent: '#1D4ED8′ },
            { icon: '📈', title: 'Day 1 Cash Flow', desc: 'Live in one unit, rent the other. Your tenant covers most of your mortgage.', bg: '#F0FDF4', accent: '#15803D' },
            { icon: '🏗️', title: '9–12 Months', desc: 'Typical permit-to-certificate timeline in DFW for new duplex construction.', bg: '#FFF7ED', accent: '#C2410C' },
            { icon: '🏦', title: 'Construction Loan', desc: '20–25% down required. Convert to permanent financing upon C.O.', bg: '#FDF4FF', accent: '#7C3AED' },
          ].map(card => (
            <div key={card.title} style={{ background: card.bg, borderRadius: 12, padding: 22, borderLeft: `4px solid ${card.accent}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: card.accent, margin: '0 0 6px', fontSize: 15 }}>{card.title}</h3>
              <p style={{ color: '#475569', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', margin: '0 0 16px' }}>🗺️ DFW Duplex Zoning at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {(Object.entries(cityZoning) as [DuplexCity, typeof cityZoning[DuplexCity]][]).map(([c, z]) => (
              <div key={c} style={{ background: z.zoned ? '#F0FDF4′ : '#FFF5F5', borderRadius: 10, padding: 16, border: `1px solid ${z.zoned ? '#86EFAC' : '#FECACA'}` }}>
                <h4 style={{ color: '#1E293B', margin: '0 0 4px', fontSize: 13, textTransform: 'capitalize' }}>{c === 'fortworth' ? 'Fort Worth' : c === 'mckinney' ? 'McKinney' : c.charAt(0).toUpperCase() + c.slice(1)}</h4>
                <div style={{ fontSize: 11, fontWeight: 700, color: z.zoned ? '#15803D' : '#DC2626', marginBottom: 4 }}>{z.zoned ? '✓ Duplex Zones Available' : '✗ Variance Required'}</div>
                <div style={{ color: '#64748B', fontSize: 11 }}>Min lot: {z.minLot.toLocaleString()} sq ft</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', margin: '0 0 16px' }}>🏦 Financing Your DFW Duplex</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { type: 'Construction Loan', down: '20–25%', rate: 'Prime + 1–2%', convert: 'Converts to perm at C.O.', detail: 'Draw-based — you pull funds as construction milestones hit. Interest only during build.' },
              { type: 'FHA 203(k)', down: '3.5%', rate: 'Market rate', convert: 'Owner-occupied only', detail: 'Can buy land + build or renovate. Must occupy one unit for 1 year minimum.' },
              { type: 'Conventional Investment', down: '25%', rate: 'Market + 0.5%', convert: 'If buying existing duplex', detail: 'For purchase of existing 2-unit property. Strong reserves required by most lenders.' },
            ].map(loan => (
              <div key={loan.type} style={{ background: '#F8FAFC', borderRadius: 10, padding: 20, border: '1px solid #E2E8F0′ }}>
                <h4 style={{ color: '#1E3A5F', margin: '0 0 8px', fontSize: 14 }}>{loan.type}</h4>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>Down: {loan.down}</span>
                  <span style={{ background: '#F0FDF4', color: '#15803D', fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{loan.rate}</span>
                </div>
                <p style={{ color: '#475569', margin: 0, fontSize: 12, lineHeight: 1.5 }}>{loan.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', margin: '0 0 24px' }}>📊 Duplex ROI Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#475569', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => { setCity(e.target.value as DuplexCity); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 8, color: '#1E293B', fontSize: 14 }}>
                <option value="dallas">Dallas</option>
                <option value="fortworth">Fort Worth</option>
                <option value="denton">Denton</option>
                <option value="arlington">Arlington</option>
                <option value="garland">Garland</option>
                <option value="irving">Irving</option>
                <option value="mesquite">Mesquite</option>
                <option value="mckinney">McKinney</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#475569', fontSize: 13, display: 'block', marginBottom: 6 }}>Unit Configuration</label>
              <select value={config} onChange={e => { setConfig(e.target.value as UnitConfig); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: 8, color: '#1E293B', fontSize: 14 }}>
                <option value="2bed2bath">2 Bed / 2 Bath</option>
                <option value="3bed2bath">3 Bed / 2 Bath</option>
                <option value="2bed1bath">2 Bed / 1 Bath</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#475569', fontSize: 13, display: 'block', marginBottom: 6 }}>Total Budget: ${budget.toLocaleString()}</label>
              <input type="range" min={200000} max={600000} step={10000} value={budget} onChange={e => { setBudget(+e.target.value); setShowResults(false); }} style={{ width: '100%', accentColor: '#1E3A5F' }} />
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#1E3A5F', color: '#F5E642', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Returns →</button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              {!zoning.zoned && <div style={{ background: '#FFF5F5', border: '1px solid #FECACA', borderRadius: 10, padding: 16, marginBottom: 16 }}><p style={{ color: '#DC2626', margin: 0, fontSize: 13 }}>⚠️ {city.charAt(0).toUpperCase() + city.slice(1)} requires a variance for duplex construction. Factor in 3–6 months and $5–10K for variance process.</p></div>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#EFF6FF', borderRadius: 10, padding: 16 }}><div style={{ color: '#1D4ED8', fontSize: 12 }}>Build Cost (2 units)</div><div style={{ color: '#1D4ED8', fontSize: 18, fontWeight: 700 }}>${totalBuildCost.toLocaleString()}</div></div>
                <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 16 }}><div style={{ color: '#15803D', fontSize: 12 }}>Gross Monthly Rent</div><div style={{ color: '#15803D', fontSize: 18, fontWeight: 700 }}>${monthlyGross.toLocaleString()}</div></div>
                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 16 }}><div style={{ color: '#475569', fontSize: 12 }}>Monthly NOI</div><div style={{ color: '#1E293B', fontSize: 18, fontWeight: 700 }}>${monthlyNOI.toLocaleString()}</div></div>
                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 16 }}><div style={{ color: '#475569', fontSize: 12 }}>Annual NOI</div><div style={{ color: '#1E293B', fontSize: 18, fontWeight: 700 }}>${annualNOI.toLocaleString()}</div></div>
                <div style={{ background: canAfford ? '#F0FDF4′ : '#FFF5F5', borderRadius: 10, padding: 16, border: `2px solid ${canAfford ? '#22C55E' : '#EF4444'}` }}><div style={{ color: canAfford ? '#15803D' : '#DC2626', fontSize: 12 }}>Cap Rate</div><div style={{ color: canAfford ? '#15803D' : '#DC2626', fontSize: 22, fontWeight: 700 }}>{capRate}%</div></div>
              </div>
              <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 18, border: '1px solid #E2E8F0′ }}>
                <p style={{ color: '#475569', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#1E3A5F' }}>Zoning:</strong> {zoning.notes}</p>
                <p style={{ color: '#475569', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#1E3A5F' }}>Setbacks:</strong> {zoning.setback}</p>
                <p style={{ color: '#475569', margin: 0, fontSize: 13 }}><strong style={{ color: '#1E3A5F' }}>Market Rent ({unit.label}):</strong> ${unit.rent.toLocaleString()}/unit/month — ${monthlyGross.toLocaleString()} total</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
