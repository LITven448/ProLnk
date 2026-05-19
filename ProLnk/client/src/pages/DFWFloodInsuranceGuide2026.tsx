import { useState } from 'react';

export default function DFWFloodInsuranceGuide2026() {
  const [locationType, setLocationType] = useState('suburb');
  const [nearWater, setNearWater] = useState(false);
  const [floodZone, setFloodZone] = useState('x');

  const riskLevel = floodZone === 'ae' ? 'HIGH' : floodZone === 'a' ? 'MODERATE-HIGH' : nearWater ? 'MODERATE' : 'LOW-MODERATE';
  const riskColor = riskLevel === 'HIGH' ? '#ef4444' : riskLevel === 'MODERATE-HIGH' ? '#f97316' : '#22c55e';
  const nfipCost = floodZone === 'ae' ? '$900-2,400/yr' : floodZone === 'a' ? '$600-1,400/yr' : '$300-700/yr';
  const privateCost = floodZone === 'ae' ? '$700-1,800/yr' : floodZone === 'a' ? '$450-1,100/yr' : '$200-500/yr';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🌊 DFW FLOOD INSURANCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Flood Insurance Guide 2026</h1>
        <div style={{ background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: 10, padding: 14, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>⚠️ Your standard HO-3 policy does NOT cover flood damage</div>
          <div style={{ color: '#fca5a5', fontSize: 13, marginTop: 6 }}>
            DFW flooded in 2015, 2019, 2022, and 2024. Standard homeowner insurance excludes ALL flooding — even from storms.
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🗺️ DFW Flood Risk Areas</h2>
          {[
            { icon: '🔴', area: 'Trinity River Corridor', risk: 'High — AE zone, flood mandatory', areas: 'Downtown Dallas, Irving, Grand Prairie' },
            { icon: '🟠', area: 'Elm Fork / Lewisville Lake', risk: 'Moderate-High', areas: 'Carrollton, Farmers Branch, Lewisville' },
            { icon: '🟡', area: 'Joe Pool Lake Area', risk: 'Moderate — check specific address', areas: 'Cedar Hill, Grand Prairie, Mansfield' },
            { icon: '🟢', area: 'Far North DFW / Collin County', risk: 'Lower — mostly X zone', areas: 'Plano, Allen, Frisco, McKinney' },
          ].map(z => (
            <div key={z.area} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{z.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{z.area}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{z.risk} · {z.areas}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Flood Insurance Need Assessment</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>Location Type</label>
            <select value={locationType} onChange={e => setLocationType(e.target.value)}
              style={{ background: '#1a2f55', color: '#fff', border: '1px solid #2a3f65', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              <option value="urban">Urban Dallas / Fort Worth core</option>
              <option value="suburb">Suburban DFW (Plano, Arlington, etc.)</option>
              <option value="rural">Rural / Outer DFW suburbs</option>
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>FEMA Flood Zone</label>
            <select value={floodZone} onChange={e => setFloodZone(e.target.value)}
              style={{ background: '#1a2f55', color: '#fff', border: '1px solid #2a3f65', borderRadius: 6, padding: '8px 12px', width: '100%' }}>
              <option value="x">Zone X (minimal flood risk)</option>
              <option value="a">Zone A (100-yr floodplain)</option>
              <option value="ae">Zone AE (100-yr + base flood elevation)</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer' }}>
            <input type="checkbox" checked={nearWater} onChange={e => setNearWater(e.target.checked)} style={{ accentColor: '#F5E642' }} />
            <span style={{ fontSize: 13 }}>Within 1 mile of creek, river, or lake</span>
          </label>
          <div style={{ background: '#1a2f55', borderRadius: 10, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Your Flood Risk</span>
              <span style={{ color: riskColor, fontWeight: 800, fontSize: 16 }}>{riskLevel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: '#94a3b8' }}>NFIP (federal) cost</span>
              <span>{nfipCost}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: '#94a3b8' }}>Private flood insurance</span>
              <span style={{ color: '#22c55e' }}>{privateCost}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 10 }}>
              Private flood often cheaper + covers more (NFIP max: $250K dwelling / $100K contents)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
