import { useState } from 'react';

const checks = {
  newborn: [
    '🌡️ Set nursery thermostat to 68-70°F (DFW summer requires constant AC)',
    '💨 Install MERV-13 filter — traps 90%+ of airborne particles',
    '🔔 Place CO detector within 10 feet of nursery, not directly over HVAC vents',
    '💧 Target 45-55% humidity — DFW AC dries air aggressively in summer',
    '🌀 Use ceiling fan on low, counterclockwise to circulate without draft',
    '🔇 Verify AC unit is functioning quietly — loud rattles signal repair needed',
    '📅 Schedule filter change every 30 days with newborn in home',
  ],
  infant: [
    '🌡️ Maintain 69-72°F — infants regulate temperature better than newborns',
    '💨 MERV-13 minimum; consider MERV-16 if near DFW highway or construction',
    '🔔 CO detector in place and tested within last 6 months',
    '💧 Humidity 45-55%; DFW spring brings pollen spikes — seal return vents well',
    '🌀 Ceiling fan circulation helps even temperatures across nursery',
    '🧹 Clean AC vents in nursery quarterly — infant crawling stirs floor dust',
    '📅 Change filters every 30-45 days; inspect coils before peak DFW summer',
  ],
  toddler: [
    '🌡️ 70-72°F daytime; toddlers are active and generate more heat',
    '💨 MERV-11 or MERV-13 — toddlers on floor disturb settled allergens',
    '🔔 CO detector functional; check battery and test monthly',
    '💧 Humidity 45-55%; toddlers mouth-breathe more, dry air causes issues',
    '🌀 Redirect vents away from play area to avoid direct cold airflow',
    '🧹 Wipe supply/return vents monthly — toddler traffic increases debris',
    '📅 Filter change every 45 days; schedule pre-summer AC tune-up in April',
  ],
};

const homeTypes: Record<string, string> = {
  apartment: '🏢 Apartment: Report HVAC issues to building management immediately. Request MERV-13 if allowed.',
  condo: '🏙️ Condo: Verify HOA allows filter upgrades. Schedule annual duct cleaning with board approval.',
  house: '🏠 House: Full control — upgrade to MERV-13, install UV air purifier, schedule bi-annual service.',
  'older-home': '🏚️ Older Home (pre-1990): Duct leaks common — have ducts inspected before summer. Seal with mastic.',
};

export default function DFWHVACForNewParents() {
  const [babyAge, setBabyAge] = useState('');
  const [homeType, setHomeType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (babyAge && homeType) setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>HVAC for New DFW Parents 👶</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7 }}>
            When it's 105°F outside and your nursery is 78°F, that's a medical concern — not just discomfort. DFW summers demand that your HVAC system protects your newborn around the clock.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>🌡️ The DFW Nursery Temperature Rule</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            Safe nursery range: <strong style={{ color: '#F5E642' }}>68–72°F</strong>. In DFW, your AC runs 14–18 hours/day in summer just to maintain this. An aging unit or clogged filter puts your baby at risk — not just discomfort, but SIDS risk increases significantly with overheating.
          </p>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🧪 Nursery Air Quality Essentials</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '💨', label: 'MERV-13 Filter', desc: 'Captures pollen, pet dander, dust mites, and bacteria — critical in DFW cedar/oak season' },
              { icon: '💧', label: 'Humidity 45–55%', desc: 'DFW AC dries air to 25–35% — a humidifier in the nursery protects mucous membranes' },
              { icon: '🔔', label: 'CO Detector', desc: 'Place within 10 ft of nursery. DFW gas heaters in winter are the #1 CO source in homes' },
              { icon: '🧹', label: 'Duct Cleaning', desc: 'DFW dust and construction debris — new parent = time to clean ducts if not done in 3+ years' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>📋 Get Your Nursery HVAC Checklist</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>BABY'S AGE</label>
              <select value={babyAge} onChange={e => { setBabyAge(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select age range...</option>
                <option value="newborn">Newborn (0–3 months)</option>
                <option value="infant">Infant (3–12 months)</option>
                <option value="toddler">Toddler (1–3 years)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW HOME TYPE</label>
              <select value={homeType} onChange={e => { setHomeType(e.target.value); setSubmitted(false); }}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select home type...</option>
                <option value="newborn">Newborn (0–3 months)</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="house">Single-Family House</option>
                <option value="older-home">Older Home (pre-1990)</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My Nursery HVAC Checklist →
          </button>
        </div>

        {submitted && babyAge && checks[babyAge as keyof typeof checks] && (
          <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Your Nursery HVAC Checklist</h2>
            {homeType && <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 16px' }}>{homeTypes[homeType]}</p>}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {checks[babyAge as keyof typeof checks].map((item, i) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: 15, lineHeight: 1.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Get a nursery HVAC inspection from a certified DFW pro</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Get Free Nursery HVAC Quote — DFW
          </button>
        </div>
      </div>
    </div>
  );
}
