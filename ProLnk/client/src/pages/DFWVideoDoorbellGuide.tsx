import { useState } from 'react';

const DOORBELLS = [
  {
    name: 'Ring Video Doorbell Pro 2',
    price: 249,
    power: 'Wired',
    resolution: '1536p HD',
    heatRating: '⭐⭐⭐⭐⭐',
    dfwBattery: 'N/A (wired)',
    monitoring: '$10/mo for storage',
    pros: ['Best wired option for DFW', 'Head-to-toe view', '3D motion detection', 'No battery worries'],
    cons: ['Requires existing doorbell wiring', 'Higher upfront cost'],
    ecosystem: 'Alexa native',
  },
  {
    name: 'Ring Battery Doorbell Plus',
    price: 179,
    power: 'Battery',
    resolution: '1536p HD',
    heatRating: '⭐⭐⭐',
    dfwBattery: 'Recharge every 2–3 weeks in summer',
    monitoring: '$10/mo for storage',
    pros: ['No wiring needed', 'Easy install', 'Good video quality'],
    cons: ['DFW summer kills battery fast', 'Must remove and charge indoors'],
    ecosystem: 'Alexa native',
  },
  {
    name: 'Google Nest Doorbell (Wired)',
    price: 179,
    power: 'Wired',
    resolution: '960p HDR',
    heatRating: '⭐⭐⭐⭐⭐',
    dfwBattery: 'N/A (wired)',
    monitoring: '$8/mo Nest Aware',
    pros: ['Best AI facial recognition', '24/7 recording (wired)', 'Handles DFW heat well', 'Google Home integration'],
    cons: ['Lower resolution than Ring', 'Requires wiring'],
    ecosystem: 'Google Home',
  },
  {
    name: 'Arlo Essential Video Doorbell',
    price: 149,
    power: 'Wired or Battery',
    resolution: '1080p HDR',
    heatRating: '⭐⭐⭐',
    dfwBattery: 'Battery: 3–4 weeks summer (better than Ring)',
    monitoring: '$3–8/mo Arlo Secure',
    pros: ['Wide 180° field of view', 'Lowest monthly fee option', 'Local storage option'],
    cons: ['App less polished', 'Battery still suffers in DFW heat'],
    ecosystem: 'Works with all',
  },
  {
    name: 'Eufy Video Doorbell S330',
    price: 199,
    power: 'Wired',
    resolution: '2K+',
    heatRating: '⭐⭐⭐⭐',
    dfwBattery: 'N/A (wired)',
    monitoring: 'FREE local storage included',
    pros: ['No subscription required', 'Best resolution for the price', 'Local storage = privacy'],
    cons: ['App updates can be slow', 'Limited smart home integration'],
    ecosystem: 'Limited integrations',
  },
];

const PACKAGE_STATS = [
  { area: 'Plano', theft: '↑ 34%', peak: 'Nov–Dec, March' },
  { area: 'Frisco', theft: '↑ 28%', peak: 'Nov–Dec' },
  { area: 'Southlake', theft: '↑ 41%', peak: 'Year-round (high-value deliveries)' },
  { area: 'Richardson', theft: '↑ 22%', peak: 'Oct–Jan' },
];

type WiringSituation = 'wired' | 'no-wiring' | 'solar' | '';
type PowerPref = 'always-on' | 'no-subscription' | 'battery-ok' | '';
type MonitoringPref = 'cloud' | 'local' | 'free' | '';

export default function DFWVideoDoorbellGuide() {
  const [wiring, setWiring] = useState<WiringSituation>('');
  const [power, setPower] = useState<PowerPref>('');
  const [monitoring, setMonitoring] = useState<MonitoringPref>('');
  const [showResult, setShowResult] = useState(false);

  function getRecommendation() {
    if (monitoring === 'local' || monitoring === 'free') return DOORBELLS[4];
    if (wiring === 'wired' && monitoring !== 'free') {
      if (power === 'always-on') return DOORBELLS[2];
      return DOORBELLS[0];
    }
    if (wiring === 'no-wiring') return DOORBELLS[1];
    return DOORBELLS[3];
  }

  const rec = getRecommendation();
  const canGenerate = wiring && power && monitoring;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🔔 DFW VIDEO DOORBELL</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', lineHeight: 1.2 }}>
            DFW Video Doorbell Guide: Ring vs Nest vs Arlo vs Eufy
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW homeowners face two unique challenges: extreme summer heat destroys battery-powered doorbell performance, and suburban package theft has surged 22–41% across the Metroplex.
          </p>
        </div>

        <div style={{ background: '#F87171', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #EF4444' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🌡️ DFW Heat Warning: Battery Doorbells</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: '#FFF' }}>
            Battery-powered doorbells are rated to operate at 95°F–105°F. DFW summer temps regularly exceed 105°F on west-facing doors in afternoon sun — and your doorbell surface can reach 130°F+. This degrades battery chemistry and cuts runtime from "6 months" to 2–3 weeks. <strong>If your door gets direct afternoon sun, choose wired or plan to charge frequently.</strong>
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📦 DFW Porch Theft by Suburb</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {PACKAGE_STATS.map(s => (
              <div key={s.area} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.area}</div>
                <div style={{ color: '#F87171', fontWeight: 700, fontSize: 18 }}>{s.theft}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>Peak: {s.peak}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          {DOORBELLS.map(db => (
            <div key={db.name} style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{db.name}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ background: db.power === 'Wired' ? '#34D399' : '#F59E0B', color: '#0A1628', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{db.power}</span>
                    <span style={{ background: '#1E3A5F', color: '#94A3B8', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>{db.resolution}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>${db.price}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{db.monitoring}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ fontSize: 12, color: '#34D399', marginBottom: 6 }}>✅ Pros</div>{db.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#94A3B8', marginBottom: 3 }}>• {p}</div>)}</div>
                <div><div style={{ fontSize: 12, color: '#F87171', marginBottom: 6 }}>⚠️ Cons</div>{db.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#94A3B8', marginBottom: 3 }}>• {c}</div>)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13 }}>
                <span style={{ color: '#64748B' }}>DFW Battery Life:</span>
                <span style={{ color: db.dfwBattery.includes('N/A') ? '#34D399' : '#F59E0B', fontWeight: 600 }}>{db.dfwBattery}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Find Your Best DFW Doorbell</h2>
          {[
            { label: 'Your door wiring situation:', options: [{ v: 'wired', l: '🔌 Have existing doorbell wiring' }, { v: 'no-wiring', l: '🔋 No wiring (battery needed)' }, { v: 'solar', l: '☀️ Want solar option' }], state: wiring, set: (v: string) => { setWiring(v as WiringSituation); setShowResult(false); } },
            { label: 'Power preference:', options: [{ v: 'always-on', l: '📹 24/7 always-on recording' }, { v: 'no-subscription', l: '🆓 Avoid monthly fees' }, { v: 'battery-ok', l: '🔋 Battery fine, easy install priority' }], state: power, set: (v: string) => { setPower(v as PowerPref); setShowResult(false); } },
            { label: 'Video storage preference:', options: [{ v: 'cloud', l: '☁️ Cloud with AI features' }, { v: 'local', l: '💾 Local storage only' }, { v: 'free', l: '🆓 Free plan OK' }], state: monitoring, set: (v: string) => { setMonitoring(v as MonitoringPref); setShowResult(false); } },
          ].map(group => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{group.label}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {group.options.map(opt => (
                  <button key={opt.v} onClick={() => group.set(opt.v)}
                    style={{ padding: '10px 16px', borderRadius: 20, border: `2px solid ${group.state === opt.v ? '#F5E642' : '#1E3A5F'}`, background: group.state === opt.v ? '#F5E642' : 'transparent', color: group.state === opt.v ? '#0A1628' : '#E8EDF5', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => setShowResult(true)} disabled={!canGenerate}
            style={{ background: canGenerate ? '#F5E642' : '#1E3A5F', color: canGenerate ? '#0A1628' : '#64748B', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: canGenerate ? 'pointer' : 'not-allowed', width: '100%' }}>
            Get My Doorbell Recommendation →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#F5E642' }}>✅ Best for You: {rec.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>PRICE</div><div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642' }}>${rec.price}</div></div>
                <div><div style={{ fontSize: 12, color: '#64748B' }}>MONITORING</div><div style={{ fontWeight: 600, fontSize: 14 }}>{rec.monitoring}</div></div>
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>DFW Heat Performance: {rec.heatRating}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '24px', background: '#0F2140', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Need a licensed DFW electrician to install your wired doorbell?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with vetted DFW doorbell & security installers 🔔</div>
        </div>

      </div>
    </div>
  );
}
