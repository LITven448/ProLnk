import { useState } from 'react';

const trees = [
  {
    name: 'Live Oak', icon: '🌳',
    trimSeason: 'July–Sept (avoid Feb–June to prevent oak wilt)',
    removeWhen: 'Severe lean, hollow trunk, >50% dead canopy, root damage',
    avgTrim: '$300–$800', avgRemove: '$800–$3,000',
    notes: 'Most iconic DFW tree. Never prune Feb–June — oak wilt spreads through fresh wounds.'
  },
  {
    name: 'Cedar Elm', icon: '🌲',
    trimSeason: 'Late winter (Jan–Feb) when dormant',
    removeWhen: 'Extensive storm damage, disease, structural hazard',
    avgTrim: '$200–$600', avgRemove: '$600–$2,000',
    notes: 'Very common in DFW. Tolerates clay soil well. Watch for elm leaf beetles.'
  },
  {
    name: 'Pecan', icon: '🌿',
    trimSeason: 'Dormant season Nov–Feb',
    removeWhen: 'Decline from pecan scab, severe storm damage, root rot',
    avgTrim: '$400–$1,200', avgRemove: '$1,000–$4,000',
    notes: 'TX state tree! Large canopy requires ISA-certified arborist for safe removal.'
  },
  {
    name: 'Bur Oak', icon: '🍂',
    trimSeason: 'Summer only (same oak wilt caution as Live Oak)',
    removeWhen: 'Root girdling, extensive decay, lightning damage',
    avgTrim: '$350–$900', avgRemove: '$900–$3,500',
    notes: 'Extremely drought tolerant. Very long-lived — worth preserving whenever possible.'
  },
];

const permitCities = [
  { city: 'Dallas', rule: 'Trees >19″ diameter require permit for removal on private property in protected areas', link: 'dallascityhall.com/arborist' },
  { city: 'Frisco', rule: 'Heritage trees (oak, elm, pecan) over 6″ diameter may require permit', link: 'friscotexas.gov/trees' },
  { city: 'Plano', rule: 'No city permit for private property trees, but HOA rules often apply', link: 'plano.gov' },
  { city: 'McKinney', rule: 'Protected heritage tree ordinance — 8″+ diameter trees may need review', link: 'mckinneytexas.org' },
  { city: 'Arlington', rule: 'No general tree removal permit, but flood plain trees have restrictions', link: 'arlingtontx.gov' },
];

export default function TreeServiceGuide() {
  const [city, setCity] = useState('');
  const [diameter, setDiameter] = useState('');
  const [species, setSpecies] = useState('');
  const [permitResult, setPermitResult] = useState('');

  const checkPermit = () => {
    const d = parseFloat(diameter) || 0;
    const cityData = permitCities.find(c => c.city === city);
    if (!city) { setPermitResult('Please select a city.'); return; }
    if (city === 'Dallas' && d >= 19 && ['Live Oak', 'Bur Oak'].includes(species)) {
      setPermitResult('📋 PERMIT LIKELY REQUIRED — Dallas protected tree ordinance applies to large oak trees. Contact Dallas Urban Forestry before any work.');
    } else if (city === 'Frisco' && d >= 6 && ['Live Oak', 'Cedar Elm', 'Pecan', 'Bur Oak'].includes(species)) {
      setPermitResult('📋 PERMIT MAY BE REQUIRED — Frisco\’s heritage tree ordinance could apply. Confirm with the city before removal.');
    } else if (city === 'McKinney' && d >= 8) {
      setPermitResult('⚠️ CHECK REQUIRED — McKinney heritage tree rules may apply at this diameter. Get a city review first.');
    } else {
      setPermitResult(`✅ PERMIT LIKELY NOT REQUIRED in ${city} for this tree — but verify with your HOA and confirm city rules haven't changed. Always use a licensed arborist.`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌳</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Tree Service Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Common DFW trees, trim vs. remove decisions, storm damage, oak wilt prevention & permit checker
          </p>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🌲 Common DFW Trees</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {trees.map(t => (
              <div key={t.name} style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{t.icon}</span>
                  <span style={{ fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{t.name}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '0.75rem' }}>{t.notes}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                  <div style={{ background: '#0A1628', borderRadius: '6px', padding: '0.6rem' }}>
                    <div style={{ color: '#60a5fa', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>WHEN TO TRIM</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{t.trimSeason}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: '6px', padding: '0.6rem' }}>
                    <div style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>WHEN TO REMOVE</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{t.removeWhen}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: '6px', padding: '0.6rem' }}>
                    <div style={{ color: '#86efac', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>COSTS</div>
                    <div style={{ color: '#F5E642', fontSize: '0.82rem' }}>Trim: {t.avgTrim}</div>
                    <div style={{ color: '#f87171', fontSize: '0.82rem' }}>Remove: {t.avgRemove}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>⚡ Storm Damage Response</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>DFW severe weather can cause major tree damage. Act safely and quickly:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                ['🚨', 'Safety first', 'If a tree has fallen on a structure or is near power lines, call 911 and your utility company — not a tree service — first'],
                ['📸', 'Document everything', 'Photograph all damage before any cleanup for insurance claims'],
                ['⏰', 'Act within 24–48 hours', 'Exposed wood and damaged roots begin to fail quickly in DFW heat'],
                ['🌳', 'Don\’t assume it\’s dead', 'A professional arborist can assess whether storm-damaged trees can be saved'],
                ['🔍', 'Watch for storm chasers', 'After major storms, unlicensed crews flood DFW — always check license and insurance'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <span style={{ color: '#F5E642', fontWeight: 600 }}>{title}: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🍄 Oak Wilt Prevention (Critical for DFW)</h2>
          <div style={{ background: '#1a0a0a', border: '1px solid #dc2626', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#fca5a5', fontWeight: 600, marginBottom: '0.75rem' }}>Oak wilt is the #1 tree killer in North Texas. It spreads rapidly through fresh pruning wounds Feb–June.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                'NEVER prune oaks between February 1 and June 30',
                'If emergency pruning is required, immediately paint all cuts with pruning sealant',
                'Remove infected trees and sever root connections to prevent underground spread to neighbors',
                'Symptoms: leaves wilting from outside in, brown veining, rapid full-tree decline',
                'Certified arborist diagnosis strongly recommended before removal — oak wilt is often misidentified',
              ].map(point => (
                <div key={point} style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#dc2626', flexShrink: 0 }}>!</span>
                  <span style={{ color: '#fcd5d5', fontSize: '0.88rem' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>📋 Do I Need a Permit to Remove This Tree?</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>City:</label>
                <select value={city} onChange={e => setCity(e.target.value)}
                  style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '100%' }}>
                  <option value="">— Select —</option>
                  {permitCities.map(c => <option key={c.city} value={c.city}>{c.city}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Trunk diameter (inches):</label>
                <input type="number" value={diameter} onChange={e => setDiameter(e.target.value)} placeholder="e.g. 18″
                  style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '100%' }} />
              </div>
              <div>
                <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Tree species:</label>
                <select value={species} onChange={e => setSpecies(e.target.value)}
                  style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '100%' }}>
                  <option value="">— Select —</option>
                  {trees.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                  <option value="Other">Other species</option>
                </select>
              </div>
            </div>
            <button onClick={checkPermit}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.95rem', marginBottom: permitResult ? '1rem' : 0 }}>
              Check Permit Requirement
            </button>
            {permitResult && (
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#F5E642', fontWeight: 600, fontSize: '0.95rem' }}>
                {permitResult}
              </div>
            )}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d45', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌳</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Find ISA-certified DFW arborists through ProLnk</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Licensed, insured tree pros who know DFW species and local permit rules</p>
        </div>
      </div>
    </div>
  );
}
