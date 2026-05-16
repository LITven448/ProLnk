import { useState } from 'react';

const coverageTypes = [
  { type: 'Dwelling Coverage', description: 'Rebuilding cost of your home structure', typical: '100% of rebuild cost' },
  { type: 'Other Structures', description: 'Fences, detached garages, sheds', typical: '10% of dwelling coverage' },
  { type: 'Personal Property', description: 'Furniture, appliances, clothing', typical: '50-70% of dwelling coverage' },
  { type: 'Loss of Use', description: 'Hotel/living expenses during repairs', typical: '20% of dwelling coverage' },
  { type: 'Liability', description: 'Injuries on your property, lawsuits', typical: '$100K-$500K minimum' },
  { type: 'Medical Payments', description: 'Guest injuries regardless of fault', typical: '$1K-$10K' },
];

const rateFactors = [
  { factor: 'Roof Age', impact: '🔴 High', detail: 'Roofs 10+ years old add 20-40% to premium; hail-resistant roofs save 15-25%' },
  { factor: 'Claims History', impact: '🔴 High', detail: 'Two claims in 3 years can raise rates 30-60% or trigger non-renewal' },
  { factor: 'Credit Score', impact: '🟡 Medium', detail: 'Excellent credit saves up to 25%; poor credit adds 50%+ in TX' },
  { factor: 'Home Age', impact: '🟡 Medium', detail: 'Homes 20+ years with original wiring/plumbing pay more' },
  { factor: 'Location', impact: '🟡 Medium', detail: 'Proximity to fire stations, flood zones, and hail corridors' },
  { factor: 'Home Value', impact: '🟢 Standard', detail: 'Higher rebuild costs = higher premium; land value excluded' },
  { factor: 'Deductible', impact: '🟢 Standard', detail: 'Raising deductible $1K to $2.5K can save 10-20% annually' },
];

export default function DFWHomeInsuranceGuide2026() {
  const [homeValue, setHomeValue] = useState(350000);
  const [roofAge, setRoofAge] = useState(8);
  const [deductible, setDeductible] = useState('1000');
  const [result, setResult] = useState<{ premium: string; dwelling: string; liability: string; deductibleNote: string } | null>(null);

  function calculate() {
    const base = homeValue * 0.0065;
    const roofMult = roofAge < 5 ? 0.85 : roofAge < 10 ? 1.0 : roofAge < 15 ? 1.22 : 1.45;
    const deductMult = deductible === '500' ? 1.15 : deductible === '1000' ? 1.0 : deductible === '2500' ? 0.88 : 0.80;
    const raw = base * roofMult * deductMult;
    const low = Math.round(raw * 0.85 / 100) * 100;
    const high = Math.round(raw * 1.15 / 100) * 100;
    const dwelling = Math.round(homeValue * 1.15 / 1000) * 1000;
    setResult({
      premium: `$${low.toLocaleString()} – $${high.toLocaleString()}/year`,
      dwelling: `$${dwelling.toLocaleString()} dwelling coverage recommended`,
      liability: homeValue > 400000 ? '$300K–$500K liability minimum' : '$100K–$300K liability minimum',
      deductibleNote: deductible === '500' ? 'Low deductible: higher premium, less out-of-pocket per claim' : deductible === '5000' ? 'High deductible: significant savings but large out-of-pocket risk' : 'Balanced deductible choice for most DFW homeowners',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Resource · 2026</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.1 }}>DFW Home Insurance Guide 2026</h1>
        <p style={{ fontSize: 18, color: '#8BA3C7', marginBottom: 48, maxWidth: 680 }}>Why rates are rising in North Texas, what drives your premium, and how to get the right coverage without overpaying.</p>

        <div style={{ background: '#1A2640', borderRadius: 16, padding: 32, marginBottom: 40, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>⚠️ Why DFW Rates Are Rising Fast</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '🌨️', title: 'Hail Catastrophes', body: 'DFW averages 4-6 major hail events per year. 2023-2025 saw $8B+ in insured losses, forcing carriers to exit Texas.' },
              { icon: '🌪️', title: 'Wind & Tornado Risk', body: 'Tornado Alley proximity drives up wind coverage costs. Collin & Denton counties saw record tornadoes in 2024.' },
              { icon: '🥶', title: 'Winter Storm Losses', body: "Post-Uri freeze (2021) and 2024's second major freeze caused $18B in claims. Insurers are still repricing." },
              { icon: '📈', title: 'Carrier Exits', body: 'Farmers, AAA, and 4 others reduced or exited TX market 2023-2025, reducing competition and raising rates 25-40%.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 16, display: 'flex', gap: 40 }}>
            <div><div style={{ color: '#8BA3C7', fontSize: 13 }}>DFW Average Premium (2026)</div><div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>$2,100–$3,800/yr</div></div>
            <div><div style={{ color: '#8BA3C7', fontSize: 13 }}>Texas State Average</div><div style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 800 }}>$1,900/yr</div></div>
            <div><div style={{ color: '#8BA3C7', fontSize: 13 }}>National Average</div><div style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 800 }}>$1,200/yr</div></div>
          </div>
        </div>

        <h2 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>What Drives Your Rate</h2>
        <div style={{ marginBottom: 40 }}>
          {rateFactors.map(f => (
            <div key={f.factor} style={{ background: '#1A2640', borderRadius: 10, padding: 18, marginBottom: 10, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ minWidth: 160 }}><span style={{ color: '#FFFFFF', fontWeight: 700 }}>{f.factor}</span><div style={{ fontSize: 13, marginTop: 4 }}>{f.impact}</div></div>
              <div style={{ color: '#8BA3C7', fontSize: 15, lineHeight: 1.6 }}>{f.detail}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Coverage Types Explained</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          {coverageTypes.map(c => (
            <div key={c.type} style={{ background: '#1A2640', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{c.type}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, marginBottom: 8 }}>{c.description}</div>
              <div style={{ color: '#8BA3C7', fontSize: 13 }}>Typical: {c.typical}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1A2640', borderRadius: 16, padding: 32, marginBottom: 40, borderLeft: '4px solid #4A90D9' }}>
          <h2 style={{ color: '#4A90D9', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>🏛️ Texas FAIR Plan — Last Resort Coverage</h2>
          <p style={{ color: '#8BA3C7', lineHeight: 1.7, marginBottom: 16 }}>If private insurers have denied you or your home is in a high-risk area, the Texas FAIR Plan provides basic dwelling coverage as a last resort. Coverage limits are lower and premiums are higher than standard market, but it prevents you from being uninsured entirely.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Eligible If...</div><div style={{ color: '#8BA3C7', fontSize: 14 }}>Denied by 2+ standard carriers · High-risk location · Older home · Recent claims history</div></div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Limitations</div><div style={{ color: '#8BA3C7', fontSize: 14 }}>Max $1.5M dwelling · Basic perils only · No liability · Higher deductibles required</div></div>
          </div>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 20, padding: 36, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🧮 Estimate Your DFW Premium</h2>
          <p style={{ color: '#8BA3C7', marginBottom: 28 }}>Get a rough estimate based on your home's key factors.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Value: ${homeValue.toLocaleString()}</label>
              <input type="range" min={150000} max={1000000} step={25000} value={homeValue} onChange={e => setHomeValue(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A5568', fontSize: 12, marginTop: 4 }}><span>$150K</span><span>$1M</span></div>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Roof Age: {roofAge} years</label>
              <input type="range" min={0} max={25} step={1} value={roofAge} onChange={e => setRoofAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A5568', fontSize: 12, marginTop: 4 }}><span>New</span><span>25 yrs</span></div>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Wind/Hail Deductible</label>
              <select value={deductible} onChange={e => setDeductible(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="500">$500 (Low)</option>
                <option value="1000">$1,000 (Standard)</option>
                <option value="2500">$2,500 (Higher Deductible)</option>
                <option value="5000">$5,000 (High Deductible)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 24 }}>Calculate Estimated Premium →</button>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Estimated Annual Premium</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{result.premium}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Recommended Coverage</div><div style={{ color: '#FFFFFF', fontWeight: 700 }}>{result.dwelling}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Liability Recommendation</div><div style={{ color: '#FFFFFF', fontWeight: 700 }}>{result.liability}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Deductible Note</div><div style={{ color: '#FFFFFF', fontSize: 14 }}>{result.deductibleNote}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A2640', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Need a Home Inspection Before Shopping Insurance?</h3>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>Insurers reward homes with documented condition. A ProLnk-connected inspector can identify issues before they affect your coverage or rate.</p>
          <a href="/" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 15 }}>Get a Home Inspection Quote →</a>
        </div>
      </div>
    </div>
  );
}
