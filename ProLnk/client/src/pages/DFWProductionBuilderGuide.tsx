import { useState } from 'react';

const BUILDERS = {
  drhorton: {
    name: 'DR Horton', tier: 'Entry–Mid', priceRange: '$250K–$450K',
    quality: 3, warranty: 3, upgrades: 2, speed: 5, locations: 5,
    strengths: ['Largest volume = fastest build', 'Wide DFW coverage', 'Express series for entry-level'],
    weaknesses: ['Thin walls, basic insulation', 'Warranty responsiveness mixed', 'Limited structural upgrades'],
    negotiate: 'Closing costs, fence, blinds, appliance package',
    redFlags: 'Pressure to use in-house lender — get competing quote first',
  },
  lennar: {
    name: 'Lennar', tier: 'Entry–Mid', priceRange: '$280K–$550K',
    quality: 3, warranty: 3, upgrades: 3, speed: 4, locations: 5,
    strengths: ['Everything Included pricing (less surprise costs)', 'Smart home standard features', 'Large DFW presence'],
    weaknesses: ['Everything Included = limited true customization', 'Upgrade pricing opaque', 'Quality consistency varies by superintendent'],
    negotiate: 'Lot premium waiver, extended rate lock, title services',
    redFlags: 'Model home finishes are not standard — clarify what is included',
  },
  highland: {
    name: 'Highland Homes', tier: 'Mid–High', priceRange: '$350K–$750K',
    quality: 4, warranty: 4, upgrades: 4, speed: 3, locations: 4,
    strengths: ['Texas-only builder with local knowledge', 'Strong warranty reputation', 'Design center flexibility'],
    weaknesses: ['Higher price point than DR Horton/Lennar', 'Fewer communities in outer exurbs', 'Longer build timeline'],
    negotiate: 'Structural options at no cost, design center credit, closing costs',
    redFlags: 'Structural upgrade pricing adds up fast — set a hard design center budget',
  },
  meritage: {
    name: 'Meritage Homes', tier: 'Mid–High', priceRange: '$320K–$650K',
    quality: 4, warranty: 4, upgrades: 3, speed: 3, locations: 3,
    strengths: ['Energy efficiency leader (M.Connected standard)', 'Spray foam insulation standard', 'Low utility bills'],
    weaknesses: ['Less community variety in DFW vs Highland', 'Design options more limited than custom builders', 'Price premium for energy features'],
    negotiate: 'Rate buydown, extended warranty upgrade, landscaping credit',
    redFlags: 'Energy features are genuine value — but verify HERS rating documentation',
  },
  perry: {
    name: 'Perry Homes', tier: 'Mid–High', priceRange: '$340K–$700K',
    quality: 4, warranty: 4, upgrades: 4, speed: 3, locations: 4,
    strengths: ['Texas-only heritage, 55+ years DFW', 'High standard ceiling heights', 'Strong resale reputation'],
    weaknesses: ['Less customization than true custom builder', 'Fewer communities in south DFW', 'Design center can be overwhelming'],
    negotiate: 'Fence, gutters, blinds, appliance allowance, closing costs',
    redFlags: 'Confirm which phase/lot before signing — premium lots cost more',
  },
};

const PRIORITIES = {
  price: ['drhorton', 'lennar', 'meritage'],
  quality: ['highland', 'perry', 'meritage'],
  timeline: ['drhorton', 'lennar', 'highland'],
  location: ['drhorton', 'lennar', 'perry'],
};

export default function DFWProductionBuilderGuide() {
  const [budget, setBudget] = useState(450000);
  const [priority, setPriority] = useState('quality');

  const recommended = PRIORITIES[priority as keyof typeof PRIORITIES]
    .map(key => BUILDERS[key as keyof typeof BUILDERS])
    .filter(b => {
      const maxPrice = parseInt(b.priceRange.split('–')[1].replace(/\D/g, '')) * 1000;
      return budget >= maxPrice * 0.6;
    })
    .slice(0, 3);

  const RatingBar = ({ val }: { val: number }) => (
    <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ width: 20, height: 6, borderRadius: 3, background: i <= val ? '#F5E642′ : '#1e3a5f' }} />
      ))}
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>
          DFW Construction Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Production Builder Comparison</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40 }}>
          DR Horton vs Lennar vs Highland vs Meritage vs Perry — DFW's top builders ranked by price, quality, and warranty.
        </p>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🏆 Find Your Best Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Your Budget</label>
              <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} step={25000}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, marginTop: 8 }}>
                <option value="price">Lowest Price</option>
                <option value="quality">Build Quality</option>
                <option value="timeline">Fastest Timeline</option>
                <option value="location">Community Selection</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {recommended.map((b, i) => (
              <div key={b.name} style={{ background: i === 0 ? '#1a2a0a' : '#1a2a4a', border: `2px solid ${i === 0 ? '#22c55e' : '#1e3a5f'}`, borderRadius: 12, padding: 16, textAlign: 'center' as const }}>
                {i === 0 && <div style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>TOP PICK</div>}
                <div style={{ fontSize: 18, fontWeight: 800 }}>{b.name}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginTop: 2 }}>{b.priceRange}</div>
              </div>
            ))}
          </div>
        </div>

        {Object.values(BUILDERS).map(b => (
          <div key={b.name} style={{ background: '#0d1f38', borderRadius: 16, padding: 28, marginBottom: 20, border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>{b.name}</h3>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{b.tier} &bull; {b.priceRange}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 20px', fontSize: 13, color: '#94a3b8′ }}>
                {[['Quality', b.quality], ['Warranty', b.warranty], ['Upgrades', b.upgrades], ['Speed', b.speed]].map(([label, val]) => (
                  <div key={label as string}><span>{label as string}</span><RatingBar val={val as number} /></div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
              <div>
                {b.strengths.map(s => <div key={s} style={{ color: '#86efac', fontSize: 13, marginBottom: 4 }}>+ {s}</div>)}
              </div>
              <div>
                {b.weaknesses.map(w => <div key={w} style={{ color: '#fca5a5', fontSize: 13, marginBottom: 4 }}>- {w}</div>)}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#1a2a4a', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>NEGOTIATE FOR</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{b.negotiate}</div>
              </div>
              <div style={{ background: '#1a0d0d', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#ef4444', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>WATCH OUT FOR</div>
                <div style={{ color: '#fca5a5', fontSize: 13 }}>{b.redFlags}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
