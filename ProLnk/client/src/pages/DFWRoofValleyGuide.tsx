import { useState } from 'react';

export default function DFWRoofValleyGuide() {
  const [valleyStyle, setValleyStyle] = useState('');
  const [stormExposure, setStormExposure] = useState('');
  const [result, setResult] = useState<null | { health: string; healthColor: string; maintenance: string; timeline: string; note: string }>(null);

  const data: Record<string, Record<string, { health: string; healthColor: string; maintenance: string; timeline: string; note: string }>> = {
    open: {
      high: { health: 'High Risk Zone', healthColor: '#EF4444', maintenance: 'Annual metal flashing inspection. Check for lifted edges, rust spots, and pulled caulk lines after every major DFW storm.', timeline: 'Replace flashing at 15-20 years or when rust appears. Do not defer — open valley failures cause major interior damage.', note: 'Open metal valleys concentrate DFW storm runoff at tremendous velocity. A 2-inch DFW rain event can move more water through your valley than a 4-inch rain in lower-intensity climates.' },
      medium: { health: 'Moderate Risk', healthColor: '#F59E0B', maintenance: 'Biennial inspection plus post-storm check for debris accumulation and lifted edges.', timeline: 'Metal valley lifespan 20-25 years in DFW with moderate exposure. Budget replacement with next reroof.', note: 'Open valleys are highly visible from ground — use binoculars to check for leaf dams after fall storms which can cause winter ice-melt backup.' },
      low: { health: 'Lower Risk', healthColor: '#10B981', maintenance: 'Inspect annually. Primary concern is organic debris accumulation in low-exposure valleys.', timeline: 'Extended lifespan in low-storm exposure — 25+ years possible with clean, debris-free valleys.', note: 'Debris accumulation is the top risk for shaded open valleys. Clear after every major leaf-fall and storm event.' }
    },
    closed: {
      high: { health: 'High Risk Zone', healthColor: '#EF4444', maintenance: 'Closed valleys in high DFW storm exposure need professional inspection every 2 years — granule wear at the valley crease accelerates under heavy water flow.', timeline: 'Closed valleys typically last 15-18 years in high DFW storm exposure before valley line becomes visible and water infiltration begins.', note: 'Once the valley crease starts showing bare asphalt — visible as a dark line with no granules — water is wicking under the overlapping shingles. This requires immediate attention.' },
      medium: { health: 'Moderate Risk', healthColor: '#F59E0B', maintenance: 'Inspect valley crease for granule loss every 2-3 years. Look for dark center line forming.', timeline: '18-22 years in moderate exposure. Replace when center line becomes visible.', note: 'Closed valleys are common in DFW due to lower initial cost. They perform adequately in moderate storm exposure but deteriorate faster than open metal in heavy-storm zones.' },
      low: { health: 'Good Performance', healthColor: '#10B981', maintenance: 'Inspect annually. Closed valleys perform well in low-exposure conditions.', timeline: '20-25 years expected lifespan in low-storm exposure DFW conditions.', note: 'Closed valleys are a solid choice for low-exposure positions. Maintain by clearing debris to prevent moisture retention.' }
    },
    woven: {
      high: { health: 'Highest Risk', healthColor: '#EF4444', maintenance: 'Woven valleys in high-storm DFW positions need inspection after every significant storm. Difficult to repair without replacing significant shingle area.', timeline: 'Woven valleys typically underperform in high-exposure DFW positions — 12-15 year practical lifespan before leaking begins.', note: 'Woven valleys are difficult to repair — fixing a failure often requires removing and replacing shingles on both valley planes. Consider converting to open metal valley at next reroof.' },
      medium: { health: 'Moderate — Monitor', healthColor: '#F59E0B', maintenance: 'Inspect every 2 years for separation along the weave line which can allow water infiltration.', timeline: '15-20 years in moderate DFW storm exposure.', note: 'Woven valleys in moderate exposure perform acceptably but are harder to diagnose early problems. Pay attention to staining on soffits near valley locations.' },
      low: { health: 'Adequate Performance', healthColor: '#10B981', maintenance: 'Annual inspection sufficient. Focus on debris clearance.', timeline: '20-25 years in low-exposure positions.', note: 'Woven valleys are a reasonable choice in low-storm-exposure positions. Lower installation cost offsets the shorter lifespan at this exposure level.' }
    }
  };

  function analyze() {
    if (!valleyStyle || !stormExposure) return;
    setResult(data[valleyStyle]?.[stormExposure] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.25rem' }}>🌊</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '.5rem' }}>
          DFW Roof Valley Guide
        </h1>
        <p style={{ color: '#9AAAB8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Roof valleys are where two roof planes meet — the drainage highways of your roof. During DFW thunderstorms, valleys concentrate massive water volume in seconds. They fail before field shingles and are one of the top sources of interior water damage in DFW homes.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Open Valley', icon: '▽', color: '#3B82F6', desc: 'Exposed metal flashing runs down the valley center. Most visible, easiest to inspect, best water-shedding.' },
            { label: 'Closed Valley', icon: '⊿', color: '#10B981', desc: 'Shingles overlap the valley center. Common DFW installation. Fails at the center crease over time.' },
            { label: 'Woven Valley', icon: '✕', color: '#F59E0B', desc: 'Shingles from both planes interweave. Seamless look but hardest to inspect and repair.' },
          ].map(v => (
            <div key={v.label} style={{ background: '#0F2040', borderRadius: 10, padding: '1rem', borderTop: `4px solid ${v.color}`, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem', color: v.color }}>{v.icon}</div>
              <div style={{ fontWeight: 700, color: v.color, fontSize: '.9rem' }}>{v.label}</div>
              <div style={{ color: '#9AAAB8', fontSize: '.8rem', marginTop: '.25rem' }}>{v.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '.5rem' }}>🌩️ DFW Storm Context</div>
          <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>A 2-inch DFW thunderstorm in 30 minutes pushes hundreds of gallons through roof valleys per hour. DFW's intense convective storms — often dumping 1 inch in under 10 minutes — create water velocities that can force water under poorly sealed valley edges. Know your valley type before the next storm season.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>🔍 Assess Your Valley</h2>
          <div style={{ display: 'grid', gap: '.75rem', marginBottom: '1rem' }}>
            <select value={valleyStyle} onChange={e => setValleyStyle(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Select valley style</option>
              <option value='open'>Open Metal Valley</option>
              <option value='closed'>Closed Cut Valley</option>
              <option value='woven'>Woven Valley</option>
            </select>
            <select value={stormExposure} onChange={e => setStormExposure(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>DFW storm exposure level</option>
              <option value='high'>High — large drainage area, no overhanging trees blocking rain</option>
              <option value='medium'>Medium — moderate drainage area</option>
              <option value='low'>Low — small valley with significant shade/wind protection</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Assess My Valley
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: `1px solid ${result.healthColor}` }}>
            <h3 style={{ color: result.healthColor, marginBottom: '1rem' }}>{result.health}</h3>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>MAINTENANCE APPROACH</div><div style={{ color: '#E8EDF5′ }}>{result.maintenance}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>REPLACEMENT TIMELINE</div><div style={{ color: '#E8EDF5′ }}>{result.timeline}</div></div>
              <div style={{ color: '#9AAAB8', fontSize: '.9rem', borderTop: '1px solid #1E3A5F', paddingTop: '.75rem' }}>{result.note}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
