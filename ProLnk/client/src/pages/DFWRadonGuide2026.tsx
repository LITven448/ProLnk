import { useState } from 'react';

const radonZones: Record<string, { risk: string; color: string; pCi: string; rec: string[] }> = {
  '750': { risk: 'ELEVATED RISK', color: '#ef4444', pCi: 'Avg 2–4 pCi/L (near EPA action level)', rec: ['Test your home immediately — short-term kit','If result ≥4 pCi/L: mitigation required','Mitigation system: $800–$1,500 installed','Sub-slab depressurization most common method','Retest after mitigation to confirm results'] },
  '760': { risk: 'MODERATE RISK', color: '#f59e0b', pCi: 'Avg 1.5–3 pCi/L', rec: ['Annual radon test recommended','Short-term test kit ($15–$25 at hardware store','If result ≥4 pCi/L: install mitigation system','Seal foundation cracks as preventive measure','Retest every 2 years if initial test below 4'] },
  '75007': { risk: 'ELEVATED RISK', color: '#ef4444', pCi: 'Avg 2–5 pCi/L — north DFW elevated zone', rec: ['North Collin/Denton County: higher radon geology','Test home immediately — north DFW has elevated readings','Mitigation system strongly recommended if ≥2 pCi/L for children','Post-mitigation test required','Disclose radon level in any home sale'] },
  '75034': { risk: 'MODERATE-HIGH', color: '#f59e0b', pCi: 'Avg 2–4 pCi/L (Frisco area)', rec: ['Frisco/McKinney area: test annually','Short-term kit sufficient for initial screening','Mitigation if ≥4 pCi/L','Radon-resistant construction in new homes recommended'] },
  'other': { risk: 'LOW-MODERATE RISK', color: '#22c55e', pCi: 'Avg <2 pCi/L typical for south/central DFW', rec: ['Texas overall lower risk than Midwest/Northeast','Still recommend testing every 2 years','EPA action level: 4 pCi/L regardless of region','Test kit: $15–$25 at Home Depot or Amazon','Mitigation if result surprises you'] },
};

export default function DFWRadonGuide2026() {
  const [zip, setZip] = useState('');
  const getZone = (z: string) => {
    if (['75002','75009','75013','75023','75024','75025','75070','75071','75072','75074','75075'].includes(z)) return '75007';
    if (['75033','75034','75035'].includes(z)) return '75034';
    if (z.startsWith('750') && parseInt(z) < 750_40) return '750';
    if (z.startsWith('760')) return '760';
    return 'other';
  };
  const zone = zip.length === 5 ? getZone(zip) : null;
  const result = zone ? radonZones[zone] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME HEALTH VAULT · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>☢️ DFW Radon Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Texas has lower average radon levels than some states, but north DFW zip codes show elevated readings. EPA action level is 4 pCi/L — a $15 test kit could protect your family.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[['🎯','EPA Action Level','4 pCi/L — test and mitigate'],['🧪','Test Kit Cost','$15–$25 at hardware stores'],['🔧','Mitigation Cost','$800–$2,500 installed']].map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#1a2744', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642' }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗺️ DFW Zip Zone Radon Lookup</h2>
          <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Enter your DFW zip code:</label>
          <input type='text' value={zip} onChange={e => setZip(e.target.value.slice(0, 5))} placeholder='e.g. 75034' maxLength={5}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 16, boxSizing: 'border-box' }} />
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: `4px solid ${result.color}` }}>
                <div style={{ fontWeight: 800, color: result.color, marginBottom: 4 }}>{result.risk}</div>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.pCi}</div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Recommendations:</div>
              {result.rec.map(r => <div key={r} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6 }}>• {r}</div>)}
            </div>
          )}
          {zip.length > 0 && zip.length < 5 && <div style={{ fontSize: 13, color: '#64748b' }}>Enter full 5-digit zip code</div>}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 Testing Process</h2>
          {[['1️⃣','Buy Test Kit','Charcoal canister from hardware store (~$15)'],['2️⃣','Place in Lowest Level','Basement or lowest livable floor, closed windows 12 hrs prior'],['3️⃣','Leave 2–7 Days','Short-term test; long-term test = 90+ days (more accurate)'],['4️⃣','Mail to Lab','Lab processes and returns digital results in 3–5 days'],['5️⃣','Act on Results','<4 pCi/L: retest in 2 yrs. ≥4 pCi/L: install mitigation system']].map(([num, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 20, minWidth: 28 }}>{num}</div>
              <div><div style={{ fontWeight: 600, fontSize: 14, color: '#F5E642' }}>{title}</div><div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
