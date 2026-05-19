import { useState } from 'react';

const profiles = [
  { label: 'Standard DFW home, allergy concerns', key: 'allergy' },
  { label: 'Standard DFW home, basic protection', key: 'basic' },
  { label: 'Pet owner in DFW', key: 'pets' },
  { label: 'DFW home with older HVAC (10+ years)', key: 'older' },
  { label: 'High-end DFW home, maximum air quality', key: 'premium' },
];

const recs: Record<string, { title: string; merv: string; type: string; frequency: string; notes: string[] }> = {
  allergy: {
    title: '🌸 DFW Allergy Filter Recommendation',
    merv: 'MERV 11–13',
    type: 'Pleated Electrostatic',
    frequency: 'Every 3–4 weeks (May–Sep), every 6 weeks (Oct–Apr)',
    notes: [
      '🌸 DFW pollen peaks Feb–May and Sep–Nov — change more often',
      '💨 MERV 11–13 captures pollen, dust mites, mold spores',
      '⚠️ Do NOT use MERV 14–16 — restricts airflow, strains DFW AC',
      '🔄 Check filter after any high-wind DFW dust event',
      '📱 Set a monthly phone reminder — DFW pollen is year-round',
    ],
  },
  basic: {
    title: '🏠 DFW Standard Filter Recommendation',
    merv: 'MERV 8–10',
    type: 'Pleated Polyester',
    frequency: 'Every 4–6 weeks (May–Sep), every 2–3 months (Oct–Apr)',
    notes: [
      '✅ MERV 8–10 is the DFW sweet spot — good filtration, no restriction',
      '💰 Budget: $8–$18 per filter — buy a 12-pack for the year',
      '🌡️ DFW runs AC 8+ months — filter change frequency matters here',
      '🐾 If you add pets later, upgrade to MERV 11',
      '📦 Keep 3–4 spare filters on hand for easy monthly swaps',
    ],
  },
  pets: {
    title: '🐾 DFW Pet Owner Filter Recommendation',
    merv: 'MERV 11–12',
    type: 'Pleated Electrostatic or Carbon',
    frequency: 'Every 3 weeks (May–Sep), every 4–5 weeks (Oct–Apr)',
    notes: [
      '🐕 Pets add dander + hair — DFW dust makes this worse',
      '💨 MERV 11–12 captures pet dander without straining system',
      '🌿 Carbon filter layer helps with pet odors — optional upgrade',
      '🔍 Check filter weekly for first month to calibrate your schedule',
      '🛁 Grooming pets regularly reduces filter load significantly',
    ],
  },
  older: {
    title: '⚙️ Older DFW HVAC Filter Recommendation',
    merv: 'MERV 8 MAX',
    type: 'Pleated or Fiberglass',
    frequency: 'Every 4 weeks year-round',
    notes: [
      '⚠️ Older systems have weaker blower motors — don\’t restrict airflow',
      '🚫 Avoid MERV 11+ on systems 10+ years old — causes strain',
      '🔄 MERV 8 is the safe maximum for aging DFW equipment',
      '📞 Consider scheduling an HVAC assessment — system may need upgrade',
      '💡 A new system pays back in DFW energy savings within 3–5 years',
    ],
  },
  premium: {
    title: '⭐ DFW Premium Air Quality Recommendation',
    merv: 'MERV 13 + UV Light',
    type: 'Pleated + In-Duct UV Purifier',
    frequency: 'Every 3 weeks (May–Sep), every 5 weeks (Oct–Apr)',
    notes: [
      '🌟 MERV 13 captures bacteria, virus-sized particles, fine dust',
      '☀️ In-duct UV light kills mold and bacteria on coil',
      '💨 Verify your system can handle MERV 13 — get a pro assessment',
      '💰 UV light install: $300–$700 — worth it for DFW mold prevention',
      '📞 ProLnk connects you to DFW air quality specialists',
    ],
  },
};

export default function DFWHVACFilterSummary() {
  const [selected, setSelected] = useState<string | null>(null);
  const rec = selected ? recs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🔄 DFW HVAC Filter Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Complete DFW filter guide — MERV ratings, filter types, change schedules, and DFW-specific considerations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 32 }}>
          {[
            { merv: 'MERV 4–6', label: 'Fiberglass', use: 'Basic dust — not recommended for DFW' },
            { merv: 'MERV 8–10', label: 'Standard Pleated', use: 'DFW sweet spot — balanced filtration' },
            { merv: 'MERV 11–13', label: 'High Efficiency', use: 'Pets, allergies, premium DFW homes' },
          ].map(r => (
            <div key={r.merv} style={{ background: '#0F2040', borderRadius: 12, padding: 18 }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{r.merv}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{r.use}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📅 DFW Change Schedule Rule of Thumb</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>May – September</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>Every 3–4 weeks — AC runs 18+ hrs/day in DFW heat</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>October – April</div>
              <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>Every 6–8 weeks — system runs less in mild DFW winters</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your DFW Filter Recommendation</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your home profile to get your specific filter recommendation.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {profiles.map(s => (
              <button
                key={s.key}
                onClick={() => setSelected(s.key)}
                style={{
                  background: selected === s.key ? '#F5E642' : '#1A2F4E',
                  color: selected === s.key ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '13px 18px',
                  textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{rec.title}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>MERV RATING</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{rec.merv}</div>
                </div>
                <div style={{ background: '#0F2040', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>FILTER TYPE</div>
                  <div style={{ fontWeight: 700, marginTop: 4 }}>{rec.type}</div>
                </div>
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: 14, marginBottom: 16 }}>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>CHANGE FREQUENCY</div>
                <div style={{ fontWeight: 600, marginTop: 4, fontSize: 14 }}>{rec.frequency}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {rec.notes.map((n, i) => (
                  <div key={i} style={{ background: '#0F2040', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>{n}</div>
                ))}
              </div>
              <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 10, padding: '14px 20px', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
                📞 Get a vetted DFW HVAC tune-up via ProLnk — free to connect
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
