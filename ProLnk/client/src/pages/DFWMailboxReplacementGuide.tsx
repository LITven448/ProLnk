import { useState } from 'react';

const mailboxTypes: Record<string, { uspsOk: string; security: string; cost: string; note: string }> = {
  Standard_Curbside: { uspsOk: '✅ USPS compliant', security: 'Basic mail only', cost: '$30–$80', note: 'T1 USPS approved post height 41–45" from road' },
  Locking_Curbside: { uspsOk: '✅ USPS compliant', security: 'Anti-theft locking slot', cost: '$80–$250', note: 'Popular in DFW suburbs with package theft concerns' },
  Cluster_Unit: { uspsOk: '✅ HOA managed', security: 'Locked per unit', cost: 'HOA covers', note: 'Common in Frisco, McKinney, Allen master plans' },
  Package_Locker: { uspsOk: '⚠️ Check carrier', security: 'Package + mail secure', cost: '$200–$600', note: 'Verify UPS/FedEx will use before purchasing' },
  Wall_Mount: { uspsOk: '✅ For door delivery', security: 'Locked options available', cost: '$40–$150', note: 'Only valid if carrier delivers to door, not curb' },
};

const areas: Record<string, string> = {
  North_Dallas: 'High package theft zone — locking strongly recommended',
  Plano: 'Many neighborhoods transitioning to cluster units',
  Frisco: 'Most new construction has HOA cluster boxes — verify before buying',
  McKinney: 'Mixed — older areas have curbside, new areas cluster',
  Southlake: 'HOA approval required for any mailbox style change',
  Irving: 'Urban density — wall mount or secure curbside preferred',
  Garland: 'Standard curbside common, theft risk moderate',
  Mesquite: 'Standard curbside, post-style HOA restrictions vary',
};

export default function DFWMailboxReplacementGuide() {
  const [area, setArea] = useState('');
  const [security, setSecurity] = useState('');
  const [hoa, setHoa] = useState('');
  const [result, setResult] = useState<null | { rec: typeof mailboxTypes[string]; areaNote: string }>(null);

  function calculate() {
    let key = 'Standard_Curbside';
    if (security === 'High' && hoa === 'No') key = 'Locking_Curbside';
    else if (security === 'High' && hoa === 'Yes') key = 'Cluster_Unit';
    else if (security === 'Packages') key = 'Package_Locker';
    const areaKey = area.replace(' ', '_');
    setResult({ rec: mailboxTypes[key], areaNote: areas[areaKey] || 'Check with your local postmaster for delivery area rules' });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>📬 DFW Mailbox Replacement Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>USPS specifications, security options, and HOA rules for DFW mailboxes — get it right before you buy.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📏 USPS Curbside Specs for DFW</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <div>📐 Post height: 41–45" from road surface</div>
            <div>📦 Opening: min 3.5" H × 15" W × 5" D</div>
            <div>🚗 Setback: 6–8" from curb face</div>
            <div>🔵 Flag: right side or top, red preferred</div>
            <div>🏷️ Numbers: visible on both sides</div>
            <div>🔒 Lock: allowed if carrier has master key access</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🔍 Get My Recommendation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select area...</option>
                {Object.keys(areas).map(a => <option key={a} value={a}>{a.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Security Concern</label>
              <select value={security} onChange={e => setSecurity(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select...</option>
                <option>Low</option>
                <option>High</option>
                <option>Packages</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>HOA?</label>
              <select value={hoa} onChange={e => setHoa(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Recommendation</button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>✅ Recommended Mailbox</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 2 }}>
              <div>{result.rec.uspsOk}</div>
              <div>🔒 Security: {result.rec.security}</div>
              <div>💰 Cost: {result.rec.cost}</div>
              <div>📝 Note: {result.rec.note}</div>
              <div style={{ marginTop: '0.75rem', color: '#F5E642', fontSize: '0.85rem' }}>Area intel: {result.areaNote}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>⚠️ Before You Replace</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Get HOA approval in writing first • Confirm your street has curbside vs door delivery • Contact local postmaster if unsure about locking models • Never block sight lines at intersections
          </div>
        </div>
      </div>
    </div>
  );
}
