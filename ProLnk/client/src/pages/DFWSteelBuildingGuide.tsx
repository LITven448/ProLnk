import { useState } from 'react';

const buildingUses = ['Barndominium', 'Workshop/Garage', 'Horse Barn', 'Storage Building', 'Agricultural Shed'];
const locationTypes = ['City/Suburb', 'Rural Unincorporated', 'Agricultural Exemption'];

function getEstimate(use: string, sqft: number, loc: string) {
  const baseCost: Record<string, number> = {
    'Barndominium': 85, 'Workshop/Garage': 28, 'Horse Barn': 35, 'Storage Building': 18, 'Agricultural Shed': 16,
  };
  const locMult: Record<string, number> = { 'City/Suburb': 1.25, 'Rural Unincorporated': 1.0, 'Agricultural Exemption': 0.9 };
  const perSqft = (baseCost[use] || 30) * (locMult[loc] || 1);
  const low = Math.round(perSqft * sqft);
  const high = Math.round(perSqft * sqft * 1.35);
  const permitReq = loc === 'City/Suburb' || use === 'Barndominium';
  const windLoad = loc === 'City/Suburb' ? '115 mph (IBC)' : '90 mph (residential) — verify county';
  const lead = use === 'Barndominium' ? '16–26 weeks' : use === 'Workshop/Garage' ? '8–14 weeks' : '6–12 weeks';
  return { low, high, permitReq, windLoad, lead };
}

export default function DFWSteelBuildingGuide() {
  const [use, setUse] = useState(buildingUses[0]);
  const [loc, setLoc] = useState(locationTypes[0]);
  const [sqft, setSqft] = useState(1200);
  const [result, setResult] = useState<null | ReturnType<typeof getEstimate>>(null);

  function estimate() { setResult(getEstimate(use, sqft, loc)); }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 60%,#122040)', padding: '48px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '12px 0 8px' }}>DFW Steel Building Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>Barndominiums, workshops, horse barns — what DFW wind loads, permitting, and costs look like in 2026.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16, marginBottom: 28 }}>
          {[['🏡','Barndominium','DFW exurb trend: Kaufman, Parker, Hood counties. Steel shell + residential finish. $75–110/sqft all-in.'],['🔨','Workshop','Most common steel build in DFW. 30×40 to 60×100 range. City permit required inside city limits.'],['🐴','Horse Barn','Parker/Wise counties dominant. Ag exemption can eliminate permit requirement. $28–45/sqft.'],['📦','Storage','Lowest cost steel build. Many require only ag-use affidavit in rural TX. $14–22/sqft.']].map(([ic,t,d])=>(
            <div key={t} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28 }}>{ic}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 8 }}>{t}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🌪️ DFW Wind Load Requirements</h2>
          {[['Inside City Limits (IBC)','115 mph design wind speed required. Engineer-stamped drawings mandatory for permit.'],['Rural / Unincorporated','90 mph residential standard in most DFW counties. Verify with county engineer — some follow IBC.'],['Tornado Alley Reality','DFW sits in tornado corridor. Steel buildings outperform wood frame but always anchor to engineered piers.'],['Foundation Type','Caliche soil in many DFW exurbs requires deeper piers. Budget $8–15K for foundation on larger builds.']].map(([h,d])=>(
            <div key={h} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 14 }}>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{h}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Permitting: Residential vs Ag</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Residential Permit Required','Inside any city limits. HOA approval may be separate. Inspections: foundation, frame, electrical, final.'],['Ag Exemption Route','5+ acres with active ag use. File ag-use affidavit with county. No permit in most unincorporated TX counties.'],['Barndominium Complexity','Residential certificate of occupancy required if used as dwelling — triggers full building code.'],['Steel Kit vs Custom','Kit buildings have pre-engineered stamped drawings. Custom builds need local PE stamp (~$2,500–5,000).']].map(([t,d])=>(
              <div key={t} style={{ background: '#122040', borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 13 }}>{t}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg,#0f1f3d,#122040)', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🧮 Cost & Permit Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Building Use</label>
              <select value={use} onChange={e=>setUse(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {buildingUses.map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Location Type</label>
              <select value={loc} onChange={e=>setLoc(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13 }}>
                {locationTypes.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Square Footage</label>
              <input type="number" value={sqft} min={400} max={20000} onChange={e=>setSqft(Number(e.target.value))} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 13, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={estimate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Calculate</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, textAlign: 'center' }}>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Cost Range</div><div style={{ color: '#F5E642', fontSize: 15, fontWeight: 800 }}>${result.low.toLocaleString()}–${result.high.toLocaleString()}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Lead Time</div><div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{result.lead}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Wind Load</div><div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 600 }}>{result.windLoad}</div></div>
                <div><div style={{ color: '#94a3b8', fontSize: 11 }}>Permit Req.</div><div style={{ fontSize: 14, fontWeight: 700, color: result.permitReq ? '#ef4444' : '#22c55e' }}>{result.permitReq ? '⚠️ Yes' : '✅ Likely No'}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
