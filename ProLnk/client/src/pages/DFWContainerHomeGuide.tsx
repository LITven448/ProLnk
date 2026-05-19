import { useState } from 'react';

type ContainerCount = 1 | 2 | 3 | 4;
type ContainerUse = 'home' | 'studio' | 'office' | 'guesthouse';
type DFWZone = 'dallas_urban' | 'dfw_suburb' | 'dfw_exurb' | 'dfw_rural';

const zoneInfo: Record<DFWZone, { label: string; feasibility: string; permit: string; notes: string; color: string }> = {
  dallas_urban: { label: 'Dallas / Urban Core', feasibility: 'Possible — Artistic Districts Friendly', permit: 'Full residential permit + engineering stamp required', notes: 'Deep Ellum, Bishop Arts areas more permissive. HOAs and historic districts may block.', color: '#F59E0B' },
  dfw_suburb: { label: 'DFW Suburbs', feasibility: 'Difficult — Check Zoning First', permit: 'Many suburbs have no container home precedent', notes: 'Plano, Frisco, Allen typically restrict non-traditional structures. Verify before buying.', color: '#EF4444′ },
  dfw_exurb: { label: 'DFW Exurbs', feasibility: 'Good — Growing Acceptance', permit: 'County or small city permit; engineering stamp needed', notes: 'Weatherford, Waxahachie, Decatur see increasing container home builds.', color: '#22C55E' },
  dfw_rural: { label: 'Rural / Unincorporated', feasibility: 'Best Option', permit: 'County permit only; most lenient rules', notes: 'Unincorporated Parker, Ellis, Wise counties — minimal restrictions.', color: '#22C55E' },
};

const containerCosts = {
  purchase: (count: ContainerCount) => count * 5500,
  modification: (count: ContainerCount, use: ContainerUse) => {
    const basePerUnit = use === 'home' ? 45000 : use === 'studio' ? 28000 : use === 'office' ? 22000 : 32000;
    return count * basePerUnit;
  },
  insulation: (count: ContainerCount) => count * 8500,
  hvac: (count: ContainerCount) => count * 4200,
  foundation: (count: ContainerCount) => 12000 + count * 2000,
  engineering: () => 4500,
};

const heatWarning = '⚠️ DFW summers hit 105°F+. Bare steel containers reach 140°F+ interior. Closed-cell spray foam insulation (minimum 3″) on all surfaces is not optional — it\’s a survival requirement.';

export default function DFWContainerHomeGuide() {
  const [containerCount, setContainerCount] = useState<ContainerCount>(2);
  const [use, setUse] = useState<ContainerUse>('home');
  const [zone, setZone] = useState<DFWZone>('dfw_exurb');
  const [showResults, setShowResults] = useState(false);

  const zInfo = zoneInfo[zone];
  const costs = containerCosts;
  const purchase = costs.purchase(containerCount);
  const mod = costs.modification(containerCount, use);
  const insulation = costs.insulation(containerCount);
  const hvac = costs.hvac(containerCount);
  const foundation = costs.foundation(containerCount);
  const engineering = costs.engineering();
  const total = purchase + mod + insulation + hvac + foundation + engineering;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Container Home Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto' }}>Growing trend in DFW artistic districts and exurbs — but the Texas heat makes insulation the #1 factor.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#7F1D1D', border: '1px solid #EF4444', borderRadius: 12, padding: '18px 24px', margin: '32px 0′ }}>
          <p style={{ color: '#FCA5A5', margin: 0, fontSize: 14, lineHeight: 1.6 }}>{heatWarning}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏗️', title: 'Steel Structure', desc: 'Containers are ISO-certified steel boxes. Strong, stackable, and fast to erect.' },
            { icon: '🔥', title: 'Insulation First', desc: 'Spray foam closed-cell is the only viable option. Budget $7–10K per container.' },
            { icon: '📋', title: 'Engineering Stamp', desc: 'Most DFW cities require a PE-stamped structural plan for container structures.' },
            { icon: '🎨', title: 'Artistic Trend', desc: 'Deep Ellum and Bishop Arts in Dallas lead DFW\’s container architecture scene.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 15 }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px' }}>🌡️ Beating the DFW Heat in a Container</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { step: '1', title: 'Spray Foam', desc: 'Closed-cell foam on all interior walls, ceiling, floor. 3″ minimum. This is the single most important build decision.' },
              { step: '2', title: 'Reflective Roof', desc: 'White or cool-roof coating on exterior reduces solar heat gain by 40%. Metal roof panel over top is ideal.' },
              { step: '3', title: 'Mini-Split HVAC', desc: 'Ductless mini-splits sized for each container. 1.5 ton per 40ft container minimum in DFW climate zone.' },
              { step: '4', title: 'Shade Structure', desc: 'Carport or pergola over container cuts radiant heat dramatically. Often cheaper than extra HVAC capacity.' },
            ].map(s => (
              <div key={s.step} style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
                <div style={{ width: 28, height: 28, background: '#F5E642', borderRadius: '50%', color: '#0A1628', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{s.step}</div>
                <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: 14 }}>{s.title}</h4>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 12, lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px' }}>📍 DFW Location Feasibility</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {(Object.entries(zoneInfo) as [DFWZone, typeof zoneInfo[DFWZone]][]).map(([z, info]) => (
              <div key={z} style={{ background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: `3px solid ${info.color}` }}>
                <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: 13 }}>{info.label}</h4>
                <div style={{ fontSize: 11, color: info.color, fontWeight: 700, marginBottom: 6 }}>{info.feasibility}</div>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 11, lineHeight: 1.4 }}>{info.notes}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 24px' }}>📊 Container Home Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Number of Containers</label>
              <select value={containerCount} onChange={e => { setContainerCount(+e.target.value as ContainerCount); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value={1}>1 Container (~320 sq ft)</option>
                <option value={2}>2 Containers (~640 sq ft)</option>
                <option value={3}>3 Containers (~960 sq ft)</option>
                <option value={4}>4 Containers (~1,280 sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Intended Use</label>
              <select value={use} onChange={e => { setUse(e.target.value as ContainerUse); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="home">Primary Residence</option>
                <option value="studio">Art / Music Studio</option>
                <option value="office">Home Office</option>
                <option value="guesthouse">Guest House / ADU</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Location</label>
              <select value={zone} onChange={e => { setZone(e.target.value as DFWZone); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="dallas_urban">Dallas / Urban Core</option>
                <option value="dfw_suburb">DFW Suburbs</option>
                <option value="dfw_exurb">DFW Exurbs</option>
                <option value="dfw_rural">Rural / Unincorporated</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Estimate My Build →</button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              <div style={{ background: zInfo.color + '22', border: `1px solid ${zInfo.color}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ color: zInfo.color, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{zInfo.feasibility}</div>
                <p style={{ color: '#94A3B8', margin: '0 0 4px', fontSize: 13 }}>{zInfo.permit}</p>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 13 }}>{zInfo.notes}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 11 }}>Containers</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${purchase.toLocaleString()}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 11 }}>Modification</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${mod.toLocaleString()}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 11 }}>Insulation</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${insulation.toLocaleString()}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 11 }}>HVAC</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${hvac.toLocaleString()}</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 14 }}><div style={{ color: '#94A3B8', fontSize: 11 }}>Foundation</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${foundation.toLocaleString()}</div></div>
                <div style={{ background: '#F5E642', borderRadius: 10, padding: 14 }}><div style={{ color: '#0A1628', fontSize: 11, fontWeight: 600 }}>Total Estimate</div><div style={{ color: '#0A1628', fontSize: 18, fontWeight: 700 }}>${total.toLocaleString()}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
