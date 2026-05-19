import { useState } from 'react';

const schedules: Record<string, Record<string, string>> = {
  summer: {
    dry: 'Daily watering, 30-40 min per zone. Run soaker hose at night to reduce evaporation. Critical: do not skip July or August.',
    normal: 'Every other day. Monitor for cracking soil near foundation — increase if cracks appear.',
    wet: 'Every 3-4 days. Soil is saturated — over-watering causes as much damage as drought.',
  },
  spring: {
    dry: 'Every 2 days. Spring dry spells in DFW can be severe. Start watering before soil cracks.',
    normal: 'Every 3-4 days. Rainfall helps but is unreliable — supplement with soaker hose.',
    wet: 'Weekly. Heavy spring rains provide most moisture needed.',
  },
  fall: {
    dry: 'Every 3 days. Fall drought is underestimated — foundation damage from Oct-Nov dry spells is common.',
    normal: 'Weekly. Cooler temps reduce demand but clay still contracts in dry conditions.',
    wet: 'Every 10-14 days. Monitor soil moisture — stop if soil is saturated 2 inches down.',
  },
  winter: {
    dry: 'Weekly. DFW winters can be dry. Foundation watering year-round is required.',
    normal: 'Every 2 weeks. Reduce frequency but do not stop entirely.',
    wet: 'Monthly or less. Winter rain usually sufficient — monitor only.',
  },
};

export default function DFWFoundationWateringGuide2026() {
  const [season, setSeason] = useState('');
  const [soil, setSoil] = useState('');
  const schedule = season && soil ? schedules[season]?.[soil] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Foundation Watering Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>The single most important and most neglected DFW home maintenance task.</p>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '8px 16px', borderRadius: 6, marginBottom: 32, fontSize: 14, fontWeight: 600 }}>
          💧 Consistent moisture = stable clay = no foundation movement. It's that simple.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: '📏 Soaker Hose Placement', desc: 'Place 12-18 inches from foundation perimeter. Too close floods the slab. Too far misses the critical zone.' },
            { label: '🌙 Water at Night', desc: 'Night watering reduces evaporation by 50% in DFW summer heat. Soil absorbs more with less waste.' },
            { label: '🌡️ July & August Critical', desc: 'DFW averages 28 days above 100°F. Clay contracts rapidly. Daily watering is non-negotiable.' },
            { label: '📱 Smart Irrigation', desc: 'Rachio, RainBird, or Hunter smart controllers with soil sensors are worth every penny in DFW.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💧 My Watering Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Current season:</label>
              <select value={season} onChange={(e) => setSeason(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="">Select season...</option>
                <option value="summer">Summer (Jun–Aug)</option>
                <option value="spring">Spring (Mar–May)</option>
                <option value="fall">Fall (Sep–Nov)</option>
                <option value="winter">Winter (Dec–Feb)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Current soil condition:</label>
              <select value={soil} onChange={(e) => setSoil(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="">Select condition...</option>
                <option value="dry">Dry (cracks visible, hard surface)</option>
                <option value="normal">Normal (moist 2in down)</option>
                <option value="wet">Wet (saturated, standing water)</option>
              </select>
            </div>
          </div>
          {schedule && (
            <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Your Recommended Schedule:</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{schedule}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 8, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get a Foundation Inspection</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Already seeing cracks or door problems? Get 3 quotes from vetted DFW foundation pros — free on ProLnk.</div>
        </div>
      </div>
    </div>
  );
}
