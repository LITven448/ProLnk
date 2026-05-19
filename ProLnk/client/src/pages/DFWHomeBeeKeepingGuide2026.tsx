import { useState } from 'react';

const cities = [
  { city: 'Dallas', icon: '🌆', rules: 'Dallas has no specific beekeeping ordinance in most residential zones, defaulting to nuisance laws. Maintain a flyway barrier 6 feet high to direct bees upward over neighbors. Register hives with Texas Apiary Inspection Service TAIS for record-keeping. HOA rules may restrict hives so check deed restrictions first.' },
  { city: 'Fort Worth', icon: '🤠', rules: 'Fort Worth allows beekeeping in residential areas without a specific permit but subject to nuisance ordinances. Maintain water source on property so bees do not visit neighbor pools. Hives should be 10 feet from property lines with flyway barriers. Register with TAIS. Fort Worth Animal Control enforces complaints.' },
  { city: 'Frisco', icon: '🏙️', rules: 'Frisco has limited explicit beekeeping ordinance. Densely platted lots create neighbor proximity issues. Africanized honey bee risk makes neighbor relations critical. Contact Frisco Animal Services and verify HOA rules before starting. TAIS registration strongly recommended in Frisco.' },
  { city: 'Plano', icon: '🏡', rules: 'Plano allows beekeeping but enforces nuisance ordinances strictly. Provide fresh water on property. Maintain gentle Carniolan or Italian stock only. Do not keep aggressive colonies in suburban Plano. TAIS registration required for inspection access during disease events.' },
  { city: 'McKinney', icon: '🌾', rules: 'McKinney allows backyard beekeeping in most residential and agricultural zones. Larger rural McKinney lots have fewer constraints. Standard practice: 10 foot setback, flyway barrier, fresh water source. Register with TAIS. McKinney has active beekeeping community resources through DABA.' },
  { city: 'Arlington', icon: '🏟️', rules: 'Arlington permits beekeeping subject to nuisance ordinances. Hives must not create aggressive bee activity or public nuisance. Two to four hives recommended for standard residential lots. Flyway barrier required if hive faces neighbor property. TAIS registration and gentle bee stock are essential.' },
];

const cards = [
  { label: 'Texas Permit Requirement', icon: '📋', body: 'Texas has no state permit required for beekeeping. All beekeepers should register with the Texas Apiary Inspection Service TAIS at tais.tamu.edu for free. This ensures hives can be inspected during disease outbreaks and protects you from liability.' },
  { label: 'Africanized Honey Bee Risk', icon: '⚠️', body: 'Africanized honey bees are established in north Texas and are a real DFW concern. They can interbreed with European stock within 2 to 3 years without queen management. Re-queen annually with certified gentle stock from reputable DFW suppliers. This is not optional in suburban DFW.' },
  { label: 'DFW Pollinator Decline', icon: '🌸', body: 'DFW has lost significant pollinator habitat to suburban development. Urban apiaries measurably improve yields in nearby gardens and farms. A healthy DFW hive forages a 2-mile radius benefiting neighbors and community gardens even if they do not know it.' },
  { label: 'Starter Equipment', icon: '🍯', body: 'Eight-frame Langstroth hives are standard for DFW backyard beekeepers. Start with 2 hives to compare colonies and share resources. Full gear: veil, gloves, hive tool, smoker. Join the Dallas Area Beekeepers Association DABA for mentorship, inspections, and local queen sources.' },
];

export default function DFWHomeBeeKeepingGuide2026() {
  const [sel, setSel] = useState<string | null>(null);
  const active = cities.find(c => c.city === sel);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🐝</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Backyard Beekeeping Guide 2026</h1>
          <p style={{ color: '#aab', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>
            Urban beekeeping in DFW — city ordinances, Africanized bee risk, pollinator decline benefits, and equipment basics. Select your city.
          </p>
        </div>

        <div style={{ background: '#1a2a42', borderRadius: 10, padding: '14px 20px', marginBottom: 28 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>Texas State Law: </span>
          <span style={{ color: '#aab' }}>No state permit required to keep bees in Texas. Local city ordinances and HOA rules apply. Register free with TAIS at tais.tamu.edu.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 32 }}>
          {cities.map(c => (
            <button key={c.city} onClick={() => setSel(c.city === sel ? null : c.city)}
              style={{ background: sel === c.city ? '#F5E642′ : '#1a2a42', border: '2px solid', borderColor: sel === c.city ? '#F5E642' : '#2a3a55', borderRadius: 10, padding: '16px 8px', cursor: ’pointer', color: sel === c.city ? '#0A1628′ : '#fff', fontWeight: 700, fontSize: 13, transition: ’all .2s' }}>
              <div style={{ fontSize: 24, marginBottom: 5 }}>{c.icon}</div>
              {c.city}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1a2a42', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642', marginBottom: 28 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{active.icon} {active.city} Beekeeping Ordinance</h2>
            <p style={{ color: '#dde', lineHeight: 1.8, margin: 0 }}>{active.rules}</p>
          </div>
        )}

        <div style={{ display: 'grid', gap: 16 }}>
          {cards.map(card => (
            <div key={card.label} style={{ background: '#1a2a42', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>{card.icon} {card.label}</h3>
              <p style={{ color: '#aab', lineHeight: 1.7, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 32px', display: 'inline-block', fontWeight: 800, fontSize: 15 }}>
            🔧 Get Help from DFW Outdoor and Garden Pros — ProLnk.io
          </div>
        </div>
      </div>
    </div>
  );
}
