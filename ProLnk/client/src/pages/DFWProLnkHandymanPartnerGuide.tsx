import { useState } from 'react';

const businessTypes = [
  {
    type: 'Solo Handyman',
    prolnkSends: 'Small repairs, drywall patches, door/window fixes, caulking',
    bigContractorPasses: 'Anything under $2K — not worth their mobilization cost',
    avgJob: '$350–$900',
    volume: '25–60 matches/mo',
  },
  {
    type: 'Move-In / Move-Out Specialists',
    prolnkSends: 'Pre-listing punch lists, move-in repair packages, paint touch-ups',
    bigContractorPasses: 'Too small, too scattered across trades',
    avgJob: '$600–$2,400',
    volume: '15–35 matches/mo',
  },
  {
    type: 'Home Maintenance Programs',
    prolnkSends: 'Recurring quarterly check-ins, seasonal maintenance bundles',
    bigContractorPasses: 'Not their model — they want project work',
    avgJob: '$200–$500/quarter',
    volume: '10–20 contracts/mo',
  },
  {
    type: 'Rental Property Handyman',
    prolnkSends: 'Landlord repair calls, tenant turnover punch lists',
    bigContractorPasses: 'Scattered properties, low per-job value',
    avgJob: '$250–$800',
    volume: '20–50 matches/mo',
  },
];

const stats = [
  { icon: '🔧', label: 'DFW Small Repair Market (Under $2K)', value: '$620M/yr' },
  { icon: '🏠', label: 'Avg Jobs Passed by Large Contractors', value: '68%' },
  { icon: '📋', label: 'Move-In Punch List Avg Value', value: '$1,100′ },
  { icon: '🔄', label: 'Rental Units in DFW', value: '890,000+' },
];

export default function DFWProLnkHandymanPartnerGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5', padding: '40px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔧</span>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk Partner Guide</span>
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Handymen on ProLnk</h1>
        <p style={{ color: '#8A9BB5', fontSize: 16, marginBottom: 36, maxWidth: 620 }}>
          Large contractors won't touch small jobs — but you will. ProLnk captures the demand they pass on and routes it directly to handymen who can respond fast and deliver.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#8A9BB5', fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Select Your Handyman Business Type</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {businessTypes.map((b, i) => (
            <div key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1A3A5C' : '#112240', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: selected === i ? 12 : 0 }}>{b.type}</div>
              {selected === i && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 8 }}>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>PROLNK SENDS YOU</div><div style={{ fontSize: 14 }}>{b.prolnkSends}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>BIG CONTRACTORS PASS ON</div><div style={{ fontSize: 14 }}>{b.bigContractorPasses}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>AVG JOB VALUE</div><div style={{ fontSize: 14 }}>{b.avgJob}</div></div>
                  <div><div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>EST. MONTHLY VOLUME</div><div style={{ fontSize: 14 }}>{b.volume}</div></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '24px 28px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Join the ProLnk Handyman Network</div>
          <div style={{ color: '#1A3050', fontSize: 14 }}>The small-job market is massive and underserved. Charter $149/mo locks your rate for life.</div>
        </div>
      </div>
    </div>
  );
}
