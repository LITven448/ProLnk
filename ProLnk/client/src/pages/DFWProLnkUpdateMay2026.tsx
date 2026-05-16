import { useState } from 'react';

const memberTypes = [
  {
    id: 'charter-pro',
    label: '🔧 Charter Pro Member',
    update: {
      headline: 'Your Charter Spot is Locked',
      items: [
        'Charter tier is 69% full — 347 of 500 spots claimed. Waitlist closes permanently when we hit 500.',
        'Your $149/mo rate is locked forever, even as platform rates increase post-launch.',
        'Your 7% network override on jobs you source and 12% subscription override on pros you refer are active from Day 1.',
        'Pro matching begins DFW-wide in June 2026. You will receive email confirmation of your launch queue position.',
        'Territory assignments finalized May 31. Charter pros get first selection of service areas.',
        'Action item: Ensure your trades, license numbers, and service zip codes are current in your waitlist profile.',
      ],
    },
  },
  {
    id: 'founding-pro',
    label: '⭐ Founding Pro Member',
    update: {
      headline: 'Founding Tier — 100 Spot Maximum',
      items: [
        'Founding tier holds 100 pros. Current fill: 78 of 100. 22 spots remain as of May 16.',
        'Same $149/mo locked rate as Charter, same 7/12% overrides — plus first-call access to high-value leads.',
        'Founding pros get dedicated onboarding call in late May. Watch for calendar invite from the ProLnk team.',
        'You will receive 3 matched homeowner introductions in the first 30 days of launch at no additional cost.',
        'Founding pro badge added to your profile — increases homeowner trust scores in the matching algorithm.',
        'Action item: Complete your ProLnk profile to 100% — profiles above 90% complete get 40% more match opportunities.',
      ],
    },
  },
  {
    id: 'homeowner',
    label: '🏠 Homeowner Waitlist',
    update: {
      headline: 'Your Home is Queued for Launch',
      items: [
        '5,200+ DFW homeowners now on waitlist. You are ahead of the curve — launch access is first-come, first-served.',
        'June 2026 launch means your first service request will be matched against 130+ vetted DFW pros.',
        'Home Health Vault registration opens at launch. Add your home to start building your property health record.',
        'Early homeowners get priority matching during peak demand periods — critical for emergency HVAC calls in July and August.',
        'No cost to submit a service request through ProLnk. Pros compete for your job. You choose.',
        'Action item: Add your home address and top 3 service needs to your waitlist form before May 31 for best match results.',
      ],
    },
  },
  {
    id: 'interested',
    label: '👀 Exploring ProLnk',
    update: {
      headline: 'May 2026 is Your Last Window',
      items: [
        'Charter waitlist closes permanently at 500 pro spots. 153 spots remain as of May 16, 2026.',
        'The $149/mo Charter rate will not be available after the waitlist closes — post-launch pricing will be higher.',
        'DFW homeowners: free to join, no cost to use the platform, and June launch is 6 weeks away.',
        'ProLnk pros earn across 5 income streams: direct commissions, network overrides, subscription shares, homeowner sourcing, and origination rights.',
        'The Home Health Vault is a permanent data asset — every home you add generates recurring platform revenue for you.',
        'Action item: Visit prolnk.io and join the waitlist today. Takes 3 minutes. Charter rate expires when spots fill.',
      ],
    },
  },
];

export default function DFWProLnkUpdateMay2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = memberTypes.find(m => m.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          PROLNK — MAY 2026 UPDATE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          What's Happening at ProLnk This May
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW launch is 6 weeks out. Select your member type for your personalized May 2026 update.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {memberTypes.map(m => (
            <button
              key={m.id}
              onClick={() => setSelected(selected === m.id ? null : m.id)}
              style={{
                background: selected === m.id ? '#F5E642' : '#0F2040',
                color: selected === m.id ? '#0A1628' : '#fff',
                border: '1px solid',
                borderColor: selected === m.id ? '#F5E642' : '#1E3A5F',
                borderRadius: 12,
                padding: '16px 18px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 16, padding: 28 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 20 }}>{active.update.headline}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {active.update.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                  <span style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.65 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
