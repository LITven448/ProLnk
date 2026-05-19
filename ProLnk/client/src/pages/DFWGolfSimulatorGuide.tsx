import { useState } from 'react';

const PACKAGES: Record<string, { label: string; screen: string; monitor: string; cost: string; ceiling: number }> = {
  entry: { label: 'Entry Package', screen: '10ft impact screen', monitor: 'Garmin R10 / Rapsodo MLM2', cost: '$4,000–$8,000', ceiling: 10 },
  mid: { label: 'Mid-Range Package', screen: '12ft curved screen', monitor: 'SkyTrak+ / Bushnell Launch Pro', cost: '$10,000–$22,000', ceiling: 10 },
  pro: { label: 'Pro Package', screen: '16ft wide curved screen', monitor: 'Trackman 4 / Foresight GCQuad', cost: '$30,000–$70,000', ceiling: 11 },
};

export default function DFWGolfSimulatorGuide() {
  const [room, setRoom] = useState('');
  const [ceiling, setCeiling] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ pkg: string; cost: string; mods: string[]; feasible: boolean } | null>(null);

  function calculate() {
    const ceilH = parseFloat(ceiling);
    const bud = parseInt(budget);
    const feasible = ceilH >= 10;
    let pkg = 'entry';
    if (bud >= 30000 && ceilH >= 11) pkg = 'pro';
    else if (bud >= 10000) pkg = 'mid';
    const p = PACKAGES[pkg];
    const mods: string[] = [];
    if (!feasible) mods.push('⚠️ Ceiling too low — minimum 10ft required for safe swing clearance');
    if (room === 'garage') mods.push('Add rubber flooring mat over concrete ($500–$1,200)', 'Insulate walls + mini-split AC — DFW garage temps hit 110°F in summer', 'Soundproofing panels for door vibration ($800–$2,000)');
    if (room === 'bonus') mods.push('Verify floor load capacity (launch monitor + mat weight)', 'Blackout curtains or screen divider for ambient light control');
    setResult({ pkg: p.label, cost: p.cost, mods, feasible });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.25rem' }}>⛳ DFW Golf Simulator Guide</div>
        <div style={{ color: '#94A3B8', marginBottom: '2rem' }}>DFW has 150+ courses — now build one at home</div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏠 DFW Room Reality Check</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW homes have no basements — clay soil and drainage make below-grade impractical. Your options are a <strong style={{ color: '#fff' }}>dedicated bonus room</strong> or a <strong style={{ color: '#fff' }}>climate-controlled garage</strong>. Garages require insulation, mini-split AC, and rubberized flooring before simulator install. Bonus rooms need ceiling height verification — standard 9ft ceilings are borderline and require a low-ceiling net.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📏 Core Requirements</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#CBD5E1′ }}>
            <div>Min ceiling: <strong style={{ color: '#fff' }}>10 ft (11 ft preferred)</strong></div>
            <div>Min room width: <strong style={{ color: '#fff' }}>15 ft</strong></div>
            <div>Min room depth: <strong style={{ color: '#fff' }}>20 ft (25 ft ideal)</strong></div>
            <div>Projector throw: <strong style={{ color: '#fff' }}>8–14 ft from screen</strong></div>
            <div>Hitting mat: <strong style={{ color: '#fff' }}>5×10 ft minimum</strong></div>
            <div>Launch monitor clearance: <strong style={{ color: '#fff' }}>6 ft behind ball</strong></div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🔇 Soundproofing for DFW Attached Garages</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            Impact screen shots transmit significant vibration through shared walls. Install 1.5 in resilient channel + 5/8 in Type X drywall on shared walls. Add mass-loaded vinyl behind screen frame. Cost: $1,500–$4,000. Without soundproofing, full driver shots register clearly in adjacent rooms and disturb neighbors.
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem' }}>🧮 Simulator Recommender</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Room Type</div>
              <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select room type</option>
                <option value="garage">Garage</option>
                <option value="bonus">Bonus Room</option>
                <option value="dedicated">Dedicated Room</option>
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Ceiling Height (ft)</div>
              <input value={ceiling} onChange={e => setCeiling(e.target.value)} placeholder="e.g. 10.5″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Total Budget ($)</div>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 15000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: `1px solid ${result.feasible ? '#F5E642' : '#EF4444'}` }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.pkg}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Estimated Cost: {result.cost}</div>
              {result.mods.length > 0 && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Required Modifications:</div>
                  {result.mods.map((m, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: '0.9rem', paddingLeft: '0.5rem' }}>• {m}</div>)}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', textAlign: 'center', fontSize: '0.8rem' }}>ProLnk connects you with DFW simulator installation pros · prolnk.io</div>
      </div>
    </div>
  );
}
