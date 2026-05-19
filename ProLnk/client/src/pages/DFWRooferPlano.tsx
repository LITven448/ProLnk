import { useState } from 'react';

const stats = [
  { label: 'Avg Hail Events / Year', value: '4-6' },
  { label: 'Insurance Claims Filed', value: '12,000+' },
  { label: 'Avg Roof Replacement Cost', value: '$8,500' },
  { label: 'Homes in Plano', value: '100,000+' },
];

const urgencyMap: Record<string, { level: string; color: string; action: string }> = {
  'new-none': { level: 'Low', color: '#4CAF50', action: 'Schedule annual inspection next spring.' },
  'new-recent': { level: 'Moderate', color: '#F5E642', action: 'Get a free post-storm inspection within 30 days.' },
  'new-severe': { level: 'High', color: '#FF6B35', action: 'File insurance claim now — damage likely present.' },
  'mid-none': { level: 'Low', color: '#4CAF50', action: 'Inspect flashing and gutters this season.' },
  'mid-recent': { level: 'High', color: '#FF6B35', action: 'Granule loss likely — get inspected before next storm.' },
  'mid-severe': { level: 'Critical', color: '#E53935', action: 'Immediate inspection required — leaks probable.' },
  'old-none': { level: 'Moderate', color: '#F5E642', action: 'Proactive replacement planning recommended within 2 years.' },
  'old-recent': { level: 'Critical', color: '#E53935', action: 'Replacement likely — insurance adjuster + roofer both needed.' },
  'old-severe': { level: 'Emergency', color: '#B71C1C', action: 'Do not wait — schedule emergency inspection today.' },
};

export default function DFWRooferPlano() {
  const [roofAge, setRoofAge] = useState('');
  const [hailEvent, setHailEvent] = useState('');
  const [result, setResult] = useState<null | { level: string; color: string; action: string }>(null);

  function evaluate() {
    if (!roofAge || !hailEvent) return;
    const key = `${roofAge}-${hailEvent}`;
    setResult(urgencyMap[key] ?? null);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠⛈️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>
            Plano TX Roofers
          </h1>
          <p style={{ fontSize: 20, color: '#94A3B8', margin: 0 }}>
            Storm Damage Specialists — Serving Plano's 100,000+ Homes
          </p>
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Why Plano Homeowners Need Storm-Ready Roofers</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>
            Plano's suburban neighborhoods — built predominantly in the 1990s through 2010s — face some of the
            most intense hail exposure in North Texas. Located directly in DFW's hail corridor, Plano sees
            4 to 6 significant hail events annually, with stones frequently reaching 1" diameter or larger.
          </p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            Many homeowners don't realize their roofs have sustained damage until interior leaks appear months
            later. Insurance companies require timely claims — typically within 1 year of the storm date.
            A certified storm damage roofer knows exactly what adjusters look for and how to document it.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ backgroundColor: '#1E2D45', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>🔍 Roof Urgency Calculator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>
            Select your roof age and most recent hail event to get your urgency level and recommended action.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>Roof Age</label>
              <select
                value={roofAge}
                onChange={e => { setRoofAge(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
              >
                <option value="">Select age...</option>
                <option value="new">Under 5 years old</option>
                <option value="mid">5–15 years old</option>
                <option value="old">15+ years old</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>Last Hail Event</label>
              <select
                value={hailEvent}
                onChange={e => { setHailEvent(e.target.value); setResult(null); }}
                style={{ width: '100%', padding: '12px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
              >
                <option value="">Select event...</option>
                <option value="none">No recent hail</option>
                <option value="recent">Hail in last 12 months</option>
                <option value="severe">Severe hail (1"+ stones)</option>
              </select>
            </div>
          </div>

          <button
            onClick={evaluate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 28px', border: 'none', borderRadius: 8, cursor: 'pointer', width: '100%' }}
          >
            Check My Urgency Level →
          </button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: result.color }} />
                <span style={{ color: result.color, fontWeight: 700, fontSize: 18 }}>Urgency: {result.level}</span>
              </div>
              <p style={{ color: '#CBD5E1', margin: 0, fontSize: 15 }}>{result.action}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛡️ What Plano Storm Specialists Do Differently</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '📋', title: 'Insurance Documentation', desc: 'Photo-based damage reports formatted exactly as adjusters require — maximizing your claim value.' },
              { icon: '🗓️', title: 'Storm Date Verification', desc: 'Cross-reference NOAA records to confirm hail dates, sizes, and paths across your specific Plano zip code.' },
              { icon: '🔧', title: 'Manufacturer-Certified Install', desc: 'Impact-resistant shingles (Class 4) qualify Plano homeowners for up to 20% insurance discounts.' },
              { icon: '📍', title: 'Local Permit Pulls', desc: 'Licensed in Plano — pulls city permits same-day so your project stays compliant and insurable.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📞</div>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
            Get Your Free Plano Roof Inspection
          </h2>
          <p style={{ color: '#1E2D45', margin: '0 0 24px', fontSize: 16 }}>
            ProLnk connects you with verified, Plano-licensed storm damage roofers — fast quotes, no pressure.
          </p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, fontSize: 18, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Request Free Inspection
          </button>
        </div>

      </div>
    </div>
  );
}
