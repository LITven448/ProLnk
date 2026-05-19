import { useState } from 'react';

type County = 'parker' | 'wise' | 'ellis' | 'johnson' | 'collin' | 'denton';
type Finishes = 'basic' | 'mid' | 'luxury';

const countyInfo: Record<County, { permit: string; notes: string; financing: string }> = {
  parker: { permit: 'Weatherford City or Parker County — relatively straightforward', notes: 'Popular barndo county; precedent exists, faster approvals', financing: 'AgriLend, Farm Credit TX, local community banks' },
  wise: { permit: 'Decatur permit office; county allows metal residential', notes: 'Lower land cost; septic required outside city limits', financing: 'Farm Credit TX, Plains Commerce Bank' },
  ellis: { permit: 'Waxahachie city or Ellis County; septic outside city', notes: 'Strong resale market; HOA-free rural tracts available', financing: 'AgriLend, First National Bank Texas' },
  johnson: { permit: 'Cleburne or county; engineering stamp required', notes: 'Growing barndo market; ranch subdivisions available', financing: 'Lone Star Ag Credit, local community banks' },
  collin: { permit: 'Stricter — unincorporated areas vary widely', notes: 'Higher land cost; less rural availability', financing: 'Most major lenders, better appraisals' },
  denton: { permit: 'Denton County unincorporated allows metal residential', notes: 'Strong market but higher land cost near city', financing: 'Farm Credit TX, Security State Bank' },
};

const finishCosts: Record<Finishes, { perSqft: number; features: string[] }> = {
  basic: { perSqft: 95, features: ['Exposed steel interior', 'LVP flooring', 'Basic fixtures', 'Standard windows', 'Metal roof'] },
  mid: { perSqft: 135, features: ['Drywall in living areas', 'Tile + LVP mix', 'Custom cabinetry', 'Energy windows', 'Spray foam insulation'] },
  luxury: { perSqft: 185, features: ['Full custom interior', 'Hardwood + tile', 'Quartz countertops', 'Smart home', 'Metal roof + gutters + wrap'] },
};

export default function DFWBarndominiumGuide() {
  const [sqft, setSqft] = useState(2000);
  const [acreage, setAcreage] = useState(5);
  const [county, setCounty] = useState<County>('parker');
  const [finishes, setFinishes] = useState<Finishes>('mid');
  const [showResults, setShowResults] = useState(false);

  const info = countyInfo[county];
  const finish = finishCosts[finishes];
  const buildCost = sqft * finish.perSqft;
  const landCost = acreage * (county === 'collin' ? 35000 : county === 'denton' ? 28000 : 18000);
  const wellSeptic = acreage > 1 ? 22000 : 0;
  const total = buildCost + landCost + wellSeptic + 15000;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏚️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Barndominium Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>The exploding trend in DFW exurbs — steel shell, custom interior, Texas land. Everything you need to know.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 24px', margin: '32px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>🔥</span>
          <p style={{ color: '#0A1628', margin: 0, fontWeight: 600, fontSize: 14 }}>Barndominiums are the fastest-growing housing trend in Texas. Weatherford, Decatur, and Waxahachie are the DFW epicenters — raw land + steel shell = 30–40% lower cost than traditional stick-built.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏗️', title: 'Steel Shell First', desc: 'Erect the metal building, then finish interior to any spec. Faster and cheaper than framing.' },
            { icon: '💰', title: '$95–$185/sq ft', desc: 'All-in construction cost. Land, well, and septic add $30–60K.' },
            { icon: '🏦', title: 'Financing Challenge', desc: 'Most big banks won\’t lend. Ag lenders and community banks specialize in barndo loans.' },
            { icon: '☀️', title: 'Insulation Critical', desc: 'DFW summers destroy uninsulated metal. Spray foam closed-cell is the only viable option.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 15 }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px' }}>🏘️ DFW Barndo Hot Spots</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { city: 'Weatherford', county: 'Parker Co.', land: '$15–22K/acre', vibe: '1hr from DFW, barndo-friendly permits, active community' },
              { city: 'Decatur', county: 'Wise Co.', land: '$12–18K/acre', vibe: 'Most affordable land in metro; ranching heritage' },
              { city: 'Waxahachie', county: 'Ellis Co.', land: '$16–25K/acre', vibe: 'Strong resale, close to I-35, growing market' },
              { city: 'Cleburne', county: 'Johnson Co.', land: '$13–20K/acre', vibe: 'Quiet growth, ranch subdivisions popular' },
            ].map(loc => (
              <div key={loc.city} style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <h4 style={{ color: '#F5E642', margin: '0 0 4px', fontSize: 15 }}>{loc.city}</h4>
                <div style={{ color: '#64748B', fontSize: 11, marginBottom: 8 }}>{loc.county}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{loc.land}</div>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 12, lineHeight: 1.4 }}>{loc.vibe}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 24px' }}>📊 Barndominium Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Square Footage: {sqft.toLocaleString()} sq ft</label>
              <input type="range" min={1000} max={5000} step={200} value={sqft} onChange={e => { setSqft(+e.target.value); setShowResults(false); }} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Acreage: {acreage} acres</label>
              <input type="range" min={1} max={50} step={1} value={acreage} onChange={e => { setAcreage(+e.target.value); setShowResults(false); }} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW County</label>
              <select value={county} onChange={e => { setCounty(e.target.value as County); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="parker">Parker (Weatherford)</option>
                <option value="wise">Wise (Decatur)</option>
                <option value="ellis">Ellis (Waxahachie)</option>
                <option value="johnson">Johnson (Cleburne)</option>
                <option value="collin">Collin Co.</option>
                <option value="denton">Denton Co.</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Interior Finishes</label>
              <select value={finishes} onChange={e => { setFinishes(e.target.value as Finishes); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="basic">Basic ($95/sq ft)</option>
                <option value="mid">Mid-Range ($135/sq ft)</option>
                <option value="luxury">Luxury ($185/sq ft)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Total →</button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Build Cost</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>${buildCost.toLocaleString()}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Land Est.</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>${landCost.toLocaleString()}</div></div>
                {wellSeptic > 0 && <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Well + Septic</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>${wellSeptic.toLocaleString()}</div></div>}
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Permit + Misc</div><div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>$15,000</div></div>
                <div style={{ background: '#F5E642', borderRadius: 10, padding: 16 }}><div style={{ color: '#0A1628', fontSize: 12, fontWeight: 600 }}>All-In Total</div><div style={{ color: '#0A1628', fontSize: 20, fontWeight: 700 }}>${total.toLocaleString()}</div></div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>Permits:</strong> {info.permit}</p>
                <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>County Notes:</strong> {info.notes}</p>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>Financing:</strong> {info.financing}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
