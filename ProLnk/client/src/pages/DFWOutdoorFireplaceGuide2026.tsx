import { useState } from 'react';

const features = [
  { type: 'Gas Fireplace', icon: '🔥', tips: ['No DFW burn ban applies to gas fireplaces — gas is always allowed', 'Permit required for permanent gas line extension; pull from city before starting', 'Maintain 10-foot clearance from combustibles and structure overhangs', 'Install gas shutoff accessible without tools — DFW code requirement', 'Annual inspection recommended; spider webs clog burner orifices in DFW off-season'] },
  { type: 'Wood-Burning Fireplace', icon: '🪵', tips: ['Always check DFW Burn Ban status before lighting — active Nov–March when air quality spikes', 'Dallas, Fort Worth, Frisco, and Plano all participate in Ozone Action Day restrictions', 'Permit required for permanent outdoor fireplace; setback minimums vary by city (typically 10–15 ft)', 'Use seasoned hardwood (post oak, live oak are local options) — green wood creates excess smoke', 'Clean firebox and flue annually; DFW wind drives debris into open flues year-round'] },
  { type: 'Fire Pit (Portable)', icon: '⭕', tips: ['Portable fire pits generally do NOT require a permit in most DFW cities', 'Burn bans apply even to portable pits — check airnorthTexas.com before use', 'Keep 10+ feet from structures, fences, and overhanging trees', 'DFW winds can spread embers quickly; always have water or sand nearby', 'Store portable pit indoors or covered — summer humidity causes rapid rust'] },
  { type: 'Built-In Fire Pit', icon: '🧱', tips: ['Permit required in most DFW cities for permanent, in-ground, or masonry fire pits', 'Gas-line installation for fire pit requires separate gas permit and licensed contractor', 'Drain holes required to prevent water pooling — DFW clay soil drains poorly', 'Keep 10-foot setback from wood fences; DFW HOAs may have additional restrictions', 'Cover with weatherproof lid when not in use — DFW spring rains fill open pits quickly'] },
];

export default function DFWOutdoorFireplaceGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = features.find(f => f.type === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🔥</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Outdoor Fireplace & Fire Pit Guide 2026</h1>
          <p style={{ color: '#aab', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
            DFW burn bans, permits, and safety clearances — what you need to know before you build or light up. Select your feature type.
          </p>
        </div>

        <div style={{ background: '#2a1a10', border: '2px solid #F5E642', borderRadius: 10, padding: '14px 20px', marginBottom: 28 }}>
          <strong style={{ color: '#F5E642' }}>⚠️ DFW Burn Ban Alert:</strong>
          <span style={{ color: '#dde', marginLeft: 8 }}>Always check <span style={{ color: '#F5E642' }}>airnorthTexas.com</span> or your city's website before burning wood. Violations carry fines up to $500 in most DFW cities.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
          {features.map(f => (
            <button key={f.type} onClick={() => setSelected(f.type === selected ? null : f.type)}
              style={{ background: selected === f.type ? '#F5E642' : '#1a2a42', border: '2px solid', borderColor: selected === f.type ? '#F5E642' : '#2a3a55', borderRadius: 10, padding: '18px 10px', cursor: 'pointer', color: selected === f.type ? '#0A1628' : '#fff', fontWeight: 700, fontSize: 14, transition: 'all .2s' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
              {f.type}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1a2a42', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{active.icon} {active.type} — DFW Guide</h2>
            <ul style={{ paddingLeft: 20, lineHeight: 2 }}>
              {active.tips.map((t, i) => <li key={i} style={{ color: '#dde' }}>{t}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#1a2a42', borderRadius: 12, padding: 24, marginTop: 28 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📋 DFW Permit Quick Reference</h3>
          <p style={{ color: '#aab', lineHeight: 1.7 }}>Permanent structures require building permits. Gas line work requires a gas permit and licensed plumber. Most DFW cities require permits to be posted on-site. Budget $150–$400 for permit fees and 2–4 weeks for approval.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 32px', display: 'inline-block', fontWeight: 800, fontSize: 15 }}>
            🔧 Get Free Outdoor Fireplace Quotes from DFW Pros — ProLnk.io
          </div>
        </div>
      </div>
    </div>
  );
}