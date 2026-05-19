import { useState } from 'react';

const homeProfiles = [
  { label: 'Standard DFW home (1,500–2,500 sq ft)', key: 'standard' },
  { label: 'Large DFW home (2,500+ sq ft)', key: 'large' },
  { label: 'DFW home with older system (10+ years)', key: 'older' },
  { label: 'DFW home with pets and allergy concerns', key: 'pets_allergy' },
  { label: 'Rental property or second DFW home', key: 'rental' },
];

const schedules: Record<string, { title: string; tasks: { month: string; task: string; cost: string }[] }> = {
  standard: {
    title: '📅 Standard DFW Home Annual Schedule',
    tasks: [
      { month: 'March', task: 'Spring AC tune-up — coil clean, refrigerant check, drain line flush', cost: '$89–$149' },
      { month: 'Monthly May–Sep', task: 'Replace MERV 8–10 filter — DFW AC runs 18+ hrs/day', cost: '$8–$15' },
      { month: 'Monthly May–Sep', task: 'Pour 1 cup bleach in condensate drain', cost: '$0' },
      { month: 'October', task: 'Fall heating check — furnace or heat pump inspection', cost: '$79–$129' },
      { month: 'November', task: 'Replace filter before heating season, clear outdoor unit', cost: '$10–$15' },
      { month: 'Year-Round', task: 'Monitor thermostat — catch issues before they become emergencies', cost: '$0' },
    ],
  },
  large: {
    title: '📅 Large DFW Home Annual Schedule',
    tasks: [
      { month: 'March', task: 'Spring tune-up for ALL units — zoned systems need zone-by-zone check', cost: '$149–$299' },
      { month: 'Monthly May–Sep', task: 'Replace all filters — large homes often have 2–3 filter locations', cost: '$20–$45' },
      { month: 'Monthly May–Sep', task: 'Flush all condensate drain lines', cost: '$0' },
      { month: 'September', task: 'Mid-season coil inspection — large homes run systems harder', cost: '$89–$149' },
      { month: 'October', task: 'Fall check for all heating zones', cost: '$149–$249' },
      { month: 'December', task: 'Ductwork inspection — large homes have more leakage risk', cost: '$149–$399' },
    ],
  },
  older: {
    title: '📅 Older DFW System Annual Schedule',
    tasks: [
      { month: 'February', task: 'Pre-season diagnostic — catch failures before summer heat', cost: '$99–$179' },
      { month: 'March', task: 'Deep spring tune-up — full cleaning, electrical check, refrigerant', cost: '$129–$199' },
      { month: 'Monthly', task: 'Filter check every 3–4 weeks — weak blower needs clean filter', cost: '$8–$15' },
      { month: 'June', task: 'Mid-summer check — older systems most likely to fail July–Aug', cost: '$89–$149' },
      { month: 'October', task: 'Fall heating test — heat exchangers on old furnaces crack', cost: '$99–$159' },
      { month: 'November', task: 'Replacement assessment — is repair-or-replace the right call?', cost: 'Free quote' },
    ],
  },
  pets_allergy: {
    title: '📅 DFW Pets + Allergy Annual Schedule',
    tasks: [
      { month: 'March', task: 'Spring tune-up + coil cleaning — pet dander builds on coil', cost: '$99–$169' },
      { month: 'Every 3 weeks May–Sep', task: 'Replace MERV 11–12 filter — pet hair clogs faster', cost: '$12–$20' },
      { month: 'Monthly', task: 'Wipe down return air grilles — pet dander accumulates', cost: '$0' },
      { month: 'June', task: 'Duct cleaning assessment — pet homes may need 3-year cycle', cost: 'Quote' },
      { month: 'October', task: 'Fall tune-up + UV light check (if installed)', cost: '$89–$149' },
      { month: 'Year-Round', task: 'Groom pets regularly — single biggest filter life extender', cost: '$0' },
    ],
  },
  rental: {
    title: '📅 DFW Rental Property Annual Schedule',
    tasks: [
      { month: 'Between Tenants', task: 'Full HVAC inspection + filter replacement', cost: '$89–$149' },
      { month: 'March', task: 'Spring tune-up — landlord liability if AC fails in DFW summer', cost: '$89–$149' },
      { month: 'Quarterly', task: 'Filter check and replacement (tenant often forgets)', cost: '$8–$15' },
      { month: 'October', task: 'Fall heating check before winter', cost: '$79–$129' },
      { month: 'Annual', task: 'Document all service — protects you in tenant disputes', cost: '$0' },
      { month: 'Every 3–5 years', task: 'Duct cleaning — rental properties accumulate debris faster', cost: '$299–$599' },
    ],
  },
};

export default function DFWHVACMaintenanceSummary() {
  const [selected, setSelected] = useState<string | null>(null);
  const sched = selected ? schedules[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          DFW HVAC GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🔧 DFW HVAC Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Complete DFW maintenance reference — spring tune-up, fall check, monthly tasks, and everything in between.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>⚡ Why DFW Maintenance Is Non-Negotiable</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { stat: '8+ months', label: 'DFW cooling season — longest in the country' },
              { stat: '110°F', label: 'Peak DFW temps — AC failure = health emergency' },
              { stat: '30–50%', label: 'Energy savings from clean, tuned system' },
              { stat: '$300–$500', label: 'Average DFW emergency repair — preventable' },
            ].map(s => (
              <div key={s.stat} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{s.stat}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your DFW Maintenance Schedule</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your home profile to get your complete annual maintenance plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {homeProfiles.map(s => (
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
          {sched && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{sched.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sched.tasks.map((t, i) => (
                  <div key={i} style={{ background: '#0F2040', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>{t.month}</div>
                      <div style={{ fontSize: 14, marginTop: 2 }}>{t.task}</div>
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: 13, whiteSpace: 'nowrap' }}>{t.cost}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, background: '#F5E642', borderRadius: 10, padding: '14px 20px', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
                📞 Schedule your DFW HVAC tune-up via ProLnk — vetted pros only
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
