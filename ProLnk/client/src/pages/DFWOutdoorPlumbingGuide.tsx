import { useState } from 'react';

const OUTDOOR_FEATURES = [
  { id: 'irrigation', label: '🌿 Irrigation System', permit: true, cost: '$2,500–5,500', desc: 'City of Dallas, Plano, Fort Worth all require permits for new irrigation system installation. Requires licensed irrigator (LI) or plumber.' },
  { id: 'hose-bib', label: '🚰 Hose Bib / Outdoor Faucet', permit: false, cost: '$150–350', desc: 'Replacement typically no permit. New faucet installation may require one. Simple backflow device required.' },
  { id: 'backflow', label: '🔒 Backflow Preventer', permit: true, cost: '$250–600 installed', desc: 'Required by most DFW municipalities for any irrigation system. Annual testing required. Failure = fine.' },
  { id: 'outdoor-kitchen', label: '🍖 Outdoor Kitchen Plumbing', permit: true, cost: '$1,200–4,000', desc: 'Requires plumbing permit for new supply lines and drain. Gas line work needs separate permit. Common in DFW suburban homes.' },
  { id: 'pool-fill', label: '🏊 Pool Fill Line', permit: true, cost: '$600–1,500', desc: 'Auto-fill lines require backflow preventer and permit. Some DFW cities require dedicated meter.' },
  { id: 'winterize', label: '❄️ Line Winterization', permit: false, cost: '$75–200/service', desc: 'DFW gets hard freezes (2021 URI caused $47B in damage). Blow-out service protects irrigation from freeze damage.' },
];

const PERMIT_CITIES: Record<string, { threshold: string; fee: string; notes: string }> = {
  'Dallas': { threshold: 'All new outdoor plumbing', fee: '$65–185', notes: 'Online permits available via Dallas Development Services' },
  'Fort Worth': { threshold: 'All new outdoor plumbing', fee: '$55–160', notes: 'Permit office on 1000 Throckmorton' },
  'Plano': { threshold: 'New lines + irrigation', fee: '$75–200', notes: 'Strict backflow testing enforcement' },
  'Frisco': { threshold: 'All outdoor + irrigation', fee: '$80–225', notes: 'Fast online permit processing' },
  'McKinney': { threshold: 'New outdoor lines + irrigation', fee: '$60–175', notes: 'LI license required for irrigation' },
  'Arlington': { threshold: 'New outdoor plumbing', fee: '$55–150', notes: 'Separate gas + plumbing permits' },
};

export default function DFWOutdoorPlumbingGuide() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [city, setCity] = useState('Dallas');
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
    setShowResult(false);
  };

  const selectedFeatures = OUTDOOR_FEATURES.filter(f => selected.has(f.id));
  const needsPermit = selectedFeatures.some(f => f.permit);
  const cityInfo = PERMIT_CITIES[city];

  const parseCostRange = (range: string) => {
    const nums = range.replace(/[^0-9–-]/g, '').split(/[–-]/).map(n => parseInt(n.replace(/\D/g, '')));
    return { low: nums[0] || 0, high: nums[1] || nums[0] || 0 };
  };
  const totalLow = selectedFeatures.reduce((sum, f) => sum + parseCostRange(f.cost).low, 0);
  const totalHigh = selectedFeatures.reduce((sum, f) => sum + parseCostRange(f.cost).high, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🏡 DFW OUTDOOR PLUMBING</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>Outdoor Plumbing Guide<br /><span style={{ color: '#F5E642′ }}>for DFW Homeowners</span></h1>
          <p style={{ fontSize: 16, color: '#8BA3C7', maxWidth: 620, margin: 0 }}>From irrigation systems to outdoor kitchens and pool fill lines — DFW municipalities have specific permit requirements for all outdoor plumbing. Here's what you need to know before you dig.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🔒 Backflow Preventers — DFW Requirement</h2>
          <div style={{ background: '#112240', border: '1px solid #FF8800', borderRadius: 12, padding: 22, marginBottom: 20 }}>
            <div style={{ color: '#FF8800', fontWeight: 800, fontSize: 15, marginBottom: 10 }}>⚠️ Required by Most DFW Municipalities</div>
            <p style={{ color: '#C0D0E8', lineHeight: 1.7, margin: '0 0 12px' }}>Any irrigation system connected to the city water supply must have a backflow preventer to protect the public water system from contamination. Dallas Water Utilities, Fort Worth Water Department, and most DFW cities enforce this — failure to install or test annually can result in water service termination.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['Device cost + install', '$250–600'], ['Annual test required', 'Yes — every year'], ['Test cost', '$50–100'], ['Penalty for non-compliance', 'Water shutoff or fine']].map(([k, v]) => (
                <div key={k} style={{ fontSize: 13 }}><span style={{ color: '#8BA3C7′ }}>{k}: </span><span style={{ color: '#E8EDF5', fontWeight: 700 }}>{v}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>❄️ Winterization — Lesson from the 2021 URI</h2>
          <p style={{ color: '#C0D0E8', lineHeight: 1.7, marginBottom: 14 }}>Winter Storm Uri (February 2021) froze and burst outdoor plumbing across DFW, causing an estimated $47 billion in damage statewide. Outdoor irrigation lines, hose bibs, and pool fill lines are especially vulnerable. Annual blow-out winterization ($75–200) is the single best investment DFW homeowners can make for outdoor plumbing.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { icon: '🌬️', step: 'Blow-out service', when: 'Before first freeze (Nov)', cost: '$75–200′ },
              { icon: '🔧', step: 'Insulate hose bibs', when: 'Oct–Nov', cost: '$5–15 DIY' },
              { icon: '🚰', step: 'Drain irrigation system', when: 'Before each freeze warning', cost: 'Free if winterized' },
              { icon: '⚙️', step: 'Install freeze sensor', when: 'One time', cost: '$80–150′ },
            ].map(item => (
              <div key={item.step} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 26 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#E8EDF5', margin: '8px 0 4px', fontSize: 14 }}>{item.step}</div>
                <div style={{ color: '#8BA3C7', fontSize: 12, marginBottom: 4 }}>{item.when}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{item.cost}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>📋 Permit Requirements by DFW City</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#F5E642', color: '#0A1628′ }}>
                  {['City', 'When Permit Required', 'Permit Fee Range', 'Notes'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 800 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(PERMIT_CITIES).map(([cityName, info], i) => (
                  <tr key={cityName} style={{ background: i % 2 === 0 ? '#0E1E35′ : '#112240' }}>
                    <td style={{ padding: '10px 12px', color: '#F5E642', borderBottom: '1px solid #1E3A5F', fontWeight: 700 }}>{cityName}</td>
                    <td style={{ padding: '10px 12px', color: '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{info.threshold}</td>
                    <td style={{ padding: '10px 12px', color: '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{info.fee}</td>
                    <td style={{ padding: '10px 12px', color: '#8BA3C7', borderBottom: '1px solid #1E3A5F', fontSize: 12 }}>{info.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 40, background: '#112240', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>🧮 Outdoor Plumbing Project Estimator</h2>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>Select your outdoor features to see what needs a permit and get a cost estimate.</p>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>YOUR CITY</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14, width: '100%', maxWidth: 300 }}>
              {Object.keys(PERMIT_CITIES).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {OUTDOOR_FEATURES.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', background: selected.has(f.id) ? '#0D2B4E' : '#0A1628', border: `1px solid ${selected.has(f.id) ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8, padding: '14px 16px' }}>
                <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)} style={{ accentColor: '#F5E642', marginTop: 2 }} />
                <div>
                  <div style={{ color: '#E8EDF5', fontWeight: 700, marginBottom: 3 }}>{f.label}</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: f.permit ? '#FF8800′ : '#4ECDC4' }}>{f.permit ? '📋 Permit required' : '✅ Usually no permit'}</span>
                    <span style={{ fontSize: 12, color: '#F5E642', fontWeight: 700 }}>{f.cost}</span>
                  </div>
                  <div style={{ color: '#8BA3C7', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              </label>
            ))}
          </div>

          <button onClick={() => setShowResult(true)} disabled={selected.size === 0} style={{ background: selected.size > 0 ? '#F5E642′ : '#1E3A5F', color: '#0A1628', border: ’none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: selected.size > 0 ? 'pointer' : 'not-allowed', width: '100%', marginBottom: 20 }}>
            View Permit Requirements + Cost Estimate
          </button>

          {showResult && selected.size > 0 && (
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#8BA3C7′ }}>ESTIMATED TOTAL COST</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#F5E642′ }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#8BA3C7′ }}>PERMIT NEEDED?</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: needsPermit ? '#FF8800′ : '#4ECDC4' }}>{needsPermit ? '⚠️ YES' : '✅ Not Required'}</div>
                  </div>
                </div>
                {needsPermit && cityInfo && (
                  <div style={{ background: '#112240', borderRadius: 8, padding: '12px 16px', fontSize: 13 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{city} Permit Info</div>
                    <div style={{ color: '#C0D0E8', marginBottom: 3 }}>Fee: {cityInfo.fee}</div>
                    <div style={{ color: '#8BA3C7′ }}>{cityInfo.notes}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#0A1628', marginBottom: 8 }}>Get a Licensed DFW Outdoor Plumbing Quote</div>
          <p style={{ color: '#112240', margin: '0 0 16px' }}>TSBPE-licensed plumbers handle permits, backflow devices, and all outdoor plumbing in DFW metro.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '14px 32px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Request Outdoor Plumbing Quote →</div>
        </div>
      </div>
    </div>
  );
}
