import { useState } from 'react';

const ASSESSMENT: Record<string, Record<string, { risk: string; factors: string; action: string }>> = {
  rural: {
    pier: { risk: 'Moderate', factors: 'Rural Sunnyvale lots have deeper clay profiles. Piers on large lots may shift unevenly during extended drought cycles.', action: 'Annual perimeter inspection + soil moisture monitoring. Slab hydration system often prevents movement.' },
    slab: { risk: 'Moderate-High', factors: 'Older rural slabs without interior piers depend on edge stability. Large lots with mature trees create root pressure zones.', action: 'Engineer-stamped inspection. Interior pier quotes typically $8,000–$18,000 for rural slab stabilization.' },
    crawl: { risk: 'High', factors: 'Crawlspace foundations on Dallas-area clay are the most vulnerable to moisture cycling. Rare in Sunnyvale but high-risk when present.', action: 'Immediate inspection. Crawlspace encapsulation + support pier installation.' },
  },
  new: {
    pier: { risk: 'Low', factors: 'Modern pier-and-beam construction in Sunnyvale uses deeper footings that account for clay expansion. Monitor during first 3 years.', action: 'Builder warranty review. Monitor for door/window sticking as settlement indicator.' },
    slab: { risk: 'Low-Moderate', factors: 'New construction slabs are engineered for local soil, but Sunnyvale\’s semi-rural character means varying lot conditions.', action: 'Post-tension slab inspection at year 3 and year 7. Watch for diagonal cracks at door corners.' },
    crawl: { risk: 'Low', factors: 'New crawlspace construction is rare in Sunnyvale. If present, it should have modern vapor barrier and support system.', action: 'Annual moisture check. Ensure vapor barrier integrity.' },
  },
  mixed: {
    pier: { risk: 'Moderate-High', factors: '1980s–2000s pier-and-beam in Sunnyvale varies widely. Builder quality and lot position relative to drainage matters significantly.', action: 'Foundation inspection with moisture meter readings. Shimming may be needed before more serious movement.' },
    slab: { risk: 'Moderate', factors: 'Mid-era Sunnyvale slabs often lack post-tension reinforcement of newer homes. Clay activity has had decades to affect them.', action: 'Elevation survey recommended. Signs of movement: sticking doors, diagonal cracks, uneven floors.' },
    crawl: { risk: 'Moderate-High', factors: 'Mid-era crawlspace may have deteriorating support structures and inadequate vapor management.', action: 'Crawlspace camera inspection. Wood rot and pier deterioration common in this era.' },
  },
};

export default function DFWFoundationRepairSunnyvale() {
  const [homeType, setHomeType] = useState('');
  const [foundationType, setFoundationType] = useState('');
  const [result, setResult] = useState<{ risk: string; factors: string; action: string } | null>(null);

  function assess() {
    if (homeType && foundationType) setResult(ASSESSMENT[homeType][foundationType]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🏗️🌱</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>Sunnyvale TX Foundation Repair</h1>
        <p style={{ fontSize: '16px', color: '#A8B8D0', margin: '0', maxWidth: '560px', marginInline: 'auto' }}>
          Rural East Dallas Specialists — clay soil experts serving large-lot Sunnyvale properties
        </p>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🌍 Why Sunnyvale Soil Is Different</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🏕️', label: 'Semi-Rural Large Lots', desc: 'Sunnyvale\’s acreage properties have more drainage variability, mature trees, and soil depth differences than typical DFW subdivisions' },
              { icon: '🪨', label: 'Dallas County Clay Soil', desc: 'Expansive clay (Vertisol) swells 30–40% when wet and contracts significantly when dry — the primary driver of Dallas-area foundation movement' },
              { icon: '🏗️', label: 'Old + New Construction Mix', desc: 'Sunnyvale has rural farmhouses, 1980s–90s suburban tracts, and 2010s+ new builds — each requires a different foundation approach' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#E8EDF5', fontSize: '14px' }}>{item.label}</div>
                  <div style={{ color: '#8898AA', fontSize: '13px', marginTop: '2px' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1A3060′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', margin: '0 0 16px' }}>🔍 Risk Factors + Inspection Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Home Type</label>
              <select
                value={homeType}
                onChange={(e) => { setHomeType(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select type...</option>
                <option value="rural">Rural / farmhouse (pre-1980s)</option>
                <option value="mixed">Suburban tract (1980s–2000s)</option>
                <option value="new">New construction (2005+)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A8B8D0', fontSize: '13px', marginBottom: '6px' }}>Foundation Type</label>
              <select
                value={foundationType}
                onChange={(e) => { setFoundationType(e.target.value); setResult(null); }}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #2A4080', borderRadius: '8px', padding: '10px 12px', color: '#E8EDF5', fontSize: '14px' }}
              >
                <option value="">Select foundation...</option>
                <option value="slab">Concrete slab</option>
                <option value="pier">Pier and beam</option>
                <option value="crawl">Crawlspace</option>
              </select>
            </div>
          </div>
          <button
            onClick={assess}
            disabled={!homeType || !foundationType}
            style={{ width: '100%', background: homeType && foundationType ? '#F5E642′ : '#2A4080', color: homeType && foundationType ? '#0A1628' : '#4A6080', border: ’none', borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: '700', cursor: homeType && foundationType ? 'pointer' : 'not-allowed' }}
          >
            Assess My Foundation Risk
          </button>
          {result && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: `1px solid ${result.risk.startsWith('High') ? '#FF4444' : result.risk.startsWith('Moderate-High') ? '#FF8C00' : '#F5E642'}` }}>
              <div style={{ fontWeight: '800', fontSize: '16px', color: result.risk.startsWith('High') ? '#FF4444′ : result.risk.startsWith(’Moderate-High') ? '#FF8C00′ : '#F5E642', marginBottom: '6px' }}>Risk Level: {result.risk}</div>
              <div style={{ color: '#8898AA', fontSize: '13px', marginBottom: '10px' }}>{result.factors}</div>
              <div style={{ background: '#0F2040', borderRadius: '6px', padding: '10px', color: '#E8EDF5', fontSize: '13px', borderLeft: '3px solid #F5E642′ }}>
                ✅ Recommended Action: {result.action}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏗️</div>
          <h3 style={{ color: '#0A1628', fontSize: '18px', fontWeight: '800', margin: '0 0 6px' }}>Schedule a Sunnyvale Foundation Inspection</h3>
          <p style={{ color: '#1A3060', fontSize: '13px', margin: '0 0 16px' }}>Engineer-certified inspectors. Large-lot specialists. Free elevation survey with inspection.</p>
          <a href="/pro-signup" style={{ display: 'inline-block', background: '#0A1628', color: '#F5E642', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', fontSize: '14px', textDecoration: 'none' }}>
            Connect with a Sunnyvale Foundation Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
