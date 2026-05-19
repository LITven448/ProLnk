import { useState } from 'react';

const doorbells = [
  { name: 'Ring Video Doorbell 4', power: 'Battery/Wired', heatRating: 'Good', tempMax: '120°F rated', price: 179, hoaFriendly: true },
  { name: 'Google Nest Doorbell', power: 'Wired only', heatRating: 'Excellent', tempMax: '104°F rated', price: 179, hoaFriendly: true },
  { name: 'Eufy Security S330', power: 'Wired/Battery', heatRating: 'Very Good', tempMax: '113°F rated', price: 219, hoaFriendly: true },
  { name: 'Arlo Essential', power: 'Battery', heatRating: 'Poor (DFW heat)', tempMax: '95°F rated', price: 149, hoaFriendly: true },
];

const recs: Record<string, Record<string, string>> = {
  hardwired: { no_hoa: '🥇 Google Nest Doorbell — best heat performance, hardwired only, Google AI detection.', hoa_restricted: '✅ Ring Video Doorbell 4 (wired) — small form factor, HOA-neutral gray finish available.' },
  battery: { no_hoa: '⚡ Ring Video Doorbell 4 — best battery life in DFW heat, 120°F rated.', hoa_restricted: '🏠 Eufy S330 — local storage, no subscription, discreet design for HOA approval.' },
  new_install: { no_hoa: '🏆 Eufy Security S330 — hardwired, local storage, no monthly fee, superior DFW heat tolerance.', hoa_restricted: '📋 Check HOA rules first. Eufy S330 has the most discreet profile for approval.' },
};

export default function DFWVideoDoorBellGuide2026() {
  const [installType, setInstallType] = useState('');
  const [hoaRule, setHoaRule] = useState('');

  const rec = installType && hoaRule ? recs[installType]?.[hoaRule] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔔📹</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Video Doorbell Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>DFW heat performance · HOA rules · porch pirate protection</p>
        </div>

        <div style={{ backgroundColor: '#7f1d1d', borderRadius: 12, padding: 16, marginBottom: 24, borderLeft: '4px solid #ef4444′ }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>⚠️ DFW Heat Warning</div>
          <p style={{ color: '#fca5a5', fontSize: 13, margin: 0 }}>DFW regularly hits 105°F+ in July–August. Battery-powered doorbells drain 3x faster above 90°F. Some models (especially Arlo) can shut down entirely. Always check the max operating temp before buying.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {doorbells.map(d => (
            <div key={d.name} style={{ backgroundColor: '#112240', borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{d.name}</div>
              <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 4 }}>${d.price}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Power: {d.power}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Max Temp: {d.tempMax}</div>
              <div style={{ fontSize: 12, padding: '2px 8px', borderRadius: 99, display: 'inline-block', marginTop: 4,
                backgroundColor: d.heatRating === 'Excellent' || d.heatRating === 'Very Good' ? '#14532d' : d.heatRating === 'Good' ? '#78350f' : '#7f1d1d' }}>
                {d.heatRating}
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📦 DFW Porch Piracy Stats</h2>
          {['DFW ranks top-5 nationally for package theft incidents', 'Peak theft: 12pm–4pm, Mon–Fri, when residents are at work', 'Holiday season theft spikes 340% November–December', 'Video doorbells reduce theft attempts by 60% (visible deterrent)', 'Consider package lockbox — deters 95% of opportunistic theft'].map(s => (
            <div key={s} style={{ padding: '6px 0', fontSize: 13, color: '#94a3b8', display: 'flex', gap: 8 }}>📌 {s}</div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 Find Your Doorbell</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>Installation Type</label>
              <select value={installType} onChange={e => setInstallType(e.target.value)} style={{ width: '100%', padding: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, fontSize: 13 }}>
                <option value="">Select…</option>
                <option value="hardwired">Existing wired doorbell</option>
                <option value="battery">Battery only (no wiring)</option>
                <option value="new_install">New install with electrician</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8', display: 'block', marginBottom: 4 }}>HOA Camera Rules</label>
              <select value={hoaRule} onChange={e => setHoaRule(e.target.value)} style={{ width: '100%', padding: 8, backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, fontSize: 13 }}>
                <option value="">Select…</option>
                <option value="no_hoa">No HOA / No restrictions</option>
                <option value="hoa_restricted">HOA with camera restrictions</option>
              </select>
            </div>
          </div>
          {rec && <div style={{ backgroundColor: '#0A1628', padding: 16, borderRadius: 8, fontSize: 14, borderLeft: '3px solid #F5E642′ }}>{rec}</div>}
        </div>

        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>🔗 ProLnk electricians handle hardwired doorbell installs — proper GFCI and weatherproofing included.</p>
        </div>
      </div>
    </div>
  );
}