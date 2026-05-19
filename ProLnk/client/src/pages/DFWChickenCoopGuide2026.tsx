import { useState } from 'react';

const cities = [
  { city: 'Dallas', icon: '🌆', rules: 'City ordinances allow backyard hens in some single-family residential zones. No roosters permitted. Limit typically 4-6 hens. Coop must be 50ft from neighboring dwellings. Check Dallas Development Services for zone classification.' },
  { city: 'Fort Worth', icon: '🤠', rules: 'Fort Worth allows up to 6 hens on lots 6,000+ sq ft in agricultural and some residential zones. No roosters. Coop setback: 25ft from any dwelling. Permit required for permanent coop. Contact Fort Worth Planning and Development.' },
  { city: 'Frisco', icon: '🏙️', rules: 'Frisco generally restricts backyard poultry in standard residential zones R1, R2, R3. Allowed on AG-zoned or larger lots. Ordinances have tightened as city grew. Call Frisco Code Compliance at 972-292-5350 before investing in a coop.' },
  { city: 'Plano', icon: '🏡', rules: 'Plano prohibits chickens in most residential zones. Exceptions may apply to large estate lots. Plano enforces animal ordinances actively. Contact Plano Animal Services for a definitive ruling before purchasing birds.' },
  { city: 'McKinney', icon: '🌾', rules: 'McKinney allows chickens in AG and rural residential zones. Standard subdivisions typically prohibit. Mix of older rural lots and newer subdivisions means rules vary significantly by address. Contact McKinney Planning at 972-547-7400.' },
  { city: 'Arlington', icon: '🏟️', rules: 'Arlington allows up to 6 hens in residential zones on lots 7,500+ sq ft. No roosters. Coop must be in rear yard, setback 15ft from property lines. Annual animal license required per hen. Contact Arlington Animal Services.' },
];

const tips = [
  { label: 'DFW Heat Management', icon: '🌡️', body: 'DFW summers are brutal for chickens. Provide shade, deep water, and frozen treats daily in summer. Ventilate coops thoroughly. Consider misting systems over the run during July-August peak. Chickens die from heat faster than cold in DFW.' },
  { label: 'Predator Protection', icon: '🐺', body: 'Coyotes are common in DFW suburbs and will dig under fences. Use hardware cloth buried 12 inches below ground. Lock coop at night. Great horned owls and raccoons are also active DFW predators. Standard chicken wire is not predator-proof.' },
  { label: 'Coop Requirements', icon: '🏠', body: 'Minimum 4 sq ft per hen inside coop, 10 sq ft per hen in run. Covered run reduces wild bird contact for Avian flu risk. Elevate coop floor 12 inches to reduce moisture and rodents. Face coop opening south or east in DFW for winter warmth.' },
];

export default function DFWChickenCoopGuide2026() {
  const [sel, setSel] = useState<string | null>(null);
  const active = cities.find(c => c.city === sel);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🐔</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Backyard Chickens Guide 2026</h1>
          <p style={{ color: '#aab', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
            City ordinances, coop requirements, heat management, and coyote protection for DFW urban chicken keepers. Select your city.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 32 }}>
          {cities.map(c => (
            <button key={c.city} onClick={() => setSel(c.city === sel ? null : c.city)}
              style={{ background: sel === c.city ? '#F5E642' : '#1a2a42', border: '2px solid', borderColor: sel === c.city ? '#F5E642' : '#2a3a55', borderRadius: 10, padding: '16px 8px', cursor: 'pointer', color: sel === c.city ? '#0A1628' : '#fff', fontWeight: 700, fontSize: 13, transition: 'all .2s' }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{c.icon}</div>
              {c.city}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1a2a42', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642', marginBottom: 28 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{active.icon} {active.city} Chicken Ordinance</h2>
            <p style={{ color: '#dde', lineHeight: 1.8, margin: 0 }}>{active.rules}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: 16 }}>
          {tips.map(t => (
            <div key={t.label} style={{ background: '#1a2a42', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>{t.icon} {t.label}</h3>
              <p style={{ color: '#aab', lineHeight: 1.7, margin: 0 }}>{t.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 32px', display: 'inline-block', fontWeight: 800, fontSize: 15 }}>
            🔧 Get Free Coop Build Quotes from DFW Pros — ProLnk.io
          </div>
        </div>
      </div>
    </div>
  );
}