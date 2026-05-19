import { useState } from 'react';

const situations = [
  {
    id: 'older_backup',
    label: 'My system is 8–12 years old and still running',
    age: '8–12 years',
    recommendation: 'Extended warranty may make sense — but run the math first.',
    logic: 'In DFW, systems fail most between years 8–15 due to heat cycle fatigue. An extended warranty on an aging system transfers risk but at a cost. If your system is working well and was properly installed, replacement savings may outperform warranty premiums.',
    alternative: 'Put the extended warranty premium cost ($150–300/yr) into a dedicated HVAC savings account. If the system makes it to 15 years, you\’ll have $1,500–4,500 for a new install.',
    worthIt: 'Worth it if: compressor is original, unit has had no major repairs, and you can\’t absorb a $3,000–5,000 emergency replacement cost.',
  },
  {
    id: 'high_cost',
    label: 'I have a premium system with expensive components',
    age: 'Any age',
    recommendation: 'Extended warranty is worth serious consideration.',
    logic: 'Variable-speed compressors, communicating thermostats, and inverter-driven systems can cost $2,000–4,000+ to repair. A $400/yr extended warranty can pay off on a single control board replacement. In DFW\’s heat, electronics degrade faster than in milder climates.',
    alternative: 'Manufacturer extended warranties (not third-party) are generally more reliable. Check if Carrier, Lennox, or Trane offers first-party extensions — they know their own failure modes.',
    worthIt: 'Worth it if: equipment cost was $12,000+, you have smart/communicating components, or you\’ve already had one electronics repair.',
  },
  {
    id: 'budget_emergency',
    label: 'I can\’t absorb a $3,000+ emergency repair',
    age: 'Any age',
    recommendation: 'Extended warranty is strongly recommended as financial protection.',
    logic: 'In DFW, July HVAC emergencies are common and contractors charge premium rates ($150+/hr service call vs. $95 off-season). Without coverage, a compressor failure at peak summer can cost $2,800–5,500 for a full replacement.',
    alternative: 'If extended warranty premiums are too high, look into HVAC service plans from local DFW companies like One Hour Air or Air Rescue — $15–25/month includes priority service and discounted repairs.',
    worthIt: 'Worth it if: you\’re on a fixed income, rental property with tenant, or your home relies on a single HVAC system with no backup.',
  },
  {
    id: 'new_system',
    label: 'My system is brand new (0–3 years)',
    age: '0–3 years',
    recommendation: 'Extended warranty is generally not necessary for the first few years.',
    logic: 'New DFW HVAC systems are covered by manufacturer warranty (10-year parts, 5–10-year compressor when registered). Adding extended warranty on top creates redundant coverage you\’re already paying for. The failure risk is lowest in years 1–5.',
    alternative: 'Use the money saved to prepay for annual maintenance contracts. Two professional tune-ups/year in DFW costs $150–250 — far less than extended warranty premiums — and prevents most failures.',
    worthIt: 'Worth it if: you have a variable-speed/premium system and your manufacturer extended warranty option expires before year 5.',
  },
  {
    id: 'rental_property',
    label: 'This is a rental or investment property',
    age: 'Any age',
    recommendation: 'Extended warranty is often worth it for landlord peace of mind.',
    logic: 'In DFW, landlords are required to maintain habitable conditions including cooling. A summer HVAC failure means tenant hardship and potential legal liability. Extended warranty with priority service gives you protection and response SLA.',
    alternative: 'Negotiate a service plan with a local DFW contractor instead. Many offer landlord packages: priority response, discounted service, and maintenance for $200–350/yr per unit.',
    worthIt: 'Worth it if: property is in a 100°F+ DFW zone (most of it is), tenants cannot be easily relocated during a failure, or you self-manage remotely.',
  },
];

export default function DFWHVACExtendedWarrantyGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF4′ }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Extended Warranty Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BAAC0', maxWidth: 580, margin: '0 auto' }}>
            Should DFW homeowners buy extended HVAC warranties? A situation-by-situation breakdown.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            🌡️ The DFW Factor: Why Extended Warranties Deserve Extra Thought Here
          </h2>
          <p style={{ color: '#9BAAC0', fontSize: 15, lineHeight: 1.7 }}>
            DFW HVAC systems run 3–4x more hours annually than systems in moderate climates. That means components wear
            faster, and the financial consequences of a failure are higher. A compressor that lasts 18 years in Seattle
            may give out at 11 years in Frisco. Extended warranties transfer this risk — but they cost money and come
            with fine print. The right answer depends entirely on your situation.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#E8EDF4', marginBottom: 16 }}>
          🏡 Select Your Situation
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {situations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#1A3A6E' : '#0F2040',
                border: selected === s.id ? '2px solid #F5E642′ : '1px solid #1E3A5F',
                borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                textAlign: 'left', color: '#E8EDF4', fontSize: 15, fontWeight: 600,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              {selected === s.id ? '▼' : '▶'} {s.label}
              {selected === s.id && (
                <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📊 Recommendation</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{s.recommendation}</div>
                    <div style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.6 }}>{s.logic}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔄 The Alternative</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{s.alternative}</div>
                  </div>
                  <div style={{ background: '#0F2A10', border: '1px solid #1E5F25', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#5FD068', fontWeight: 700, marginBottom: 6 }}>✅ Worth It If...</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{s.worthIt}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⚠️ Extended Warranty Red Flags in DFW</h3>
          <ul style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Third-party warranties with out-of-state claims processing — DFW repair is time-sensitive in summer</li>
            <li>Warranties that exclude refrigerant recharge (one of the most common DFW repairs)</li>
            <li>Policies that require 30-day authorization before repair — you can't wait in 105°F heat</li>
            <li>Fine print excluding "consequential damage" — in DFW, a failed system causes property and health damage</li>
            <li>No local service network — if they can't dispatch a tech in 24 hours in July, the warranty is useless</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
