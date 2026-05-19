import { useState } from 'react';

type ConcernDetail = {
  method: string;
  resources: string[];
  evaluation: string;
};

const concerns: Record<string, ConcernDetail> = {
  safety: {
    method: 'Visit the neighborhood on a weekday evening and weekend morning. Drive every street in a 0.5 mile radius. Check crime mapping tools and talk to residents you encounter.',
    resources: [
      'CrimeMapping.com — DFW agency feeds (varies by city)',
      'SpotCrime.com — incident-level crime by address',
      'Nextdoor.com — join neighborhood group, search past posts',
      'City of Dallas / Fort Worth / Plano open data portals',
      'Local Facebook neighborhood groups',
    ],
    evaluation: 'Compare crime rate to city average, not just absolute numbers. Trend matters — is it improving or worsening? Ask your agent about the neighborhood\’s 5-year trajectory.',
  },
  development: {
    method: 'Check city GIS and zoning maps for all vacant and commercial parcels within 1 mile. File open records requests for any pending plat or zoning applications.',
    resources: [
      'Dallas City GIS: gis.dallascityhall.com',
      'Fort Worth GIS: mapoakcliff.com/fw',
      'Tarrant Appraisal District: tap.org',
      'TxDOT project tracker: txdot.gov/construction',
      'NCTCOG Regional Planning: nctcog.org',
    ],
    evaluation: 'A vacant lot next door can be anything. Check current zoning AND if rezoning has been requested. Commercial-to-residential rezoning is common in DFW — either way can affect your value.',
  },
  schools: {
    method: 'Check current school assignments AND whether redistricting is in progress. DFW districts redistrict frequently as population grows.',
    resources: [
      'GreatSchools.org — ratings + test scores by campus',
      'TEA.texas.gov — official accountability ratings',
      'Individual district websites for redistricting maps',
      'PISD, FISD, Allen, Plano ISD — all have boundary tools online',
      'Attend a school board meeting if redistricting is active',
    ],
    evaluation: 'School ratings shift with demographics. If a school is good now but a major apartment complex is coming nearby, research how the district historically handles demographic shifts.',
  },
  noise: {
    method: 'Visit at 7am, noon, 5pm, and 10pm on different days. Check flight path maps (DFW and Love Field), train/freight rail routes, and proximity to freeways.',
    resources: [
      'FlightAware noise maps — DFW approach/departure paths',
      'Google Maps satellite — identify industrial uses nearby',
      'TxDOT traffic count data — future road expansion plans',
      'Union Pacific / BNSF rail maps for freight corridors',
      'City noise complaint records (open records request)',
    ],
    evaluation: 'DFW airport expansion has shifted flight paths. If within 5 miles of DFW or Love Field, research current and proposed flight corridors on the FAA\’s NextGen site.',
  },
  flood: {
    method: 'Check FEMA FIRM maps AND local city flood maps (cities often have more detailed data). Walk the drainage channels near the property after a heavy rain if possible.',
    resources: [
      'FEMA Flood Map Service Center: msc.fema.gov',
      'Dallas Floodplain Management: dallascityhall.com',
      'Fort Worth Stormwater Management maps',
      'North Texas Council of Governments flood data',
      'Texas Water Development Board aquifer/flood records',
    ],
    evaluation: 'Even Zone X (low risk) properties in DFW flood. Check if the property flooded in 2015, 2019, or 2022 storms. Community flood history matters more than the FEMA zone alone.',
  },
  value: {
    method: 'Pull 3-year sold comp trends by zip code. Check appraisal district value history. Research any major employers leaving or entering the area.',
    resources: [
      'DCAD.org — assessed value history by address',
      'HAR / NTREIS MLS data (via your agent)',
      'CoStar or LoopNet — commercial development pipeline',
      'DFW real estate analyst blogs and Redfin data',
      'City economic development department — incentive programs signal where growth is planned',
    ],
    evaluation: 'DFW has 9 distinct sub-markets. Inner loop vs. outer suburbs have very different appreciation profiles. Ask your agent to show you 5-year price trends for the specific zip, not just "DFW."',
  },
};

const concernTypes = [
  { key: 'safety', label: '🚔 Safety & Crime' },
  { key: 'development', label: '🏗️ Nearby Development' },
  { key: 'schools', label: '🎓 School Quality' },
  { key: 'noise', label: '✈️ Noise & Traffic' },
  { key: 'flood', label: '💧 Flooding History' },
  { key: 'value', label: '📈 Value Trends' },
];

export default function DFWNeighborhoodDueDiligence() {
  const [selected, setSelected] = useState<string | null>(null);
  const info = selected ? concerns[selected] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️ DFW Neighborhood Due Diligence</div>
          <p style={{ fontSize: '1.05rem', color: '#374151' }}>
            In DFW, the neighborhood changes as fast as the home. The region adds 100,000+ residents per year, new highways are constantly planned, and school districts redraw boundaries regularly. Here's how to research what you're really buying into.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>⏰ When to Visit</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              ['Weekday 7–8am', 'Traffic pattern, school drop-off chaos, commute reality'],
              ['Weekday noon', 'Neighborhood activity, who\’s around during the day'],
              ['Friday 5–7pm', 'Rush hour on your actual commute route'],
              ['Saturday morning', 'How the community uses its space, noise levels'],
              ['After heavy rain', 'Drainage, low spots, neighbors with water in yards'],
              ['Evening in summer', 'Noise from pools, bars, events nearby'],
            ].map(([time, purpose], i) => (
              <div key={i} style={{ backgroundColor: '#F9FAFB', borderRadius: 8, padding: '0.75rem', border: '1px solid #E5E7EB' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>🕐 {time}</div>
                <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>{purpose}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>🔎 Select a Concern to Research</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: info ? '1.5rem' : 0 }}>
            {concernTypes.map(({ key, label }) => (
              <button key={key} onClick={() => setSelected(selected === key ? null : key)}
                style={{ padding: '0.6rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === key ? '#F5E642' : '#E5E7EB', backgroundColor: selected === key ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: selected === key ? 700 : 400, cursor: 'pointer', fontSize: '0.88rem' }}>
                {label}
              </button>
            ))}
          </div>
          {info && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#1D4ED8', marginBottom: '0.4rem' }}>🔍 Research Method</div>
                <div style={{ fontSize: '0.92rem' }}>{info.method}</div>
              </div>
              <div style={{ backgroundColor: '#F0FDF4', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>📌 DFW Resources</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: 1.9 }}>
                  {info.resources.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div style={{ backgroundColor: '#F9FAFB', borderRadius: 8, padding: '1rem', border: '1px solid #E5E7EB' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>💡 How to Evaluate What You Find</div>
                <div style={{ fontSize: '0.92rem' }}>{info.evaluation}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#FEF9C3', borderRadius: 12, padding: '1.5rem', border: '1px solid #FDE047' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>⚡ DFW Growth Context</div>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <li>DFW adds ~300 new residents per day — what's "the edge of town" today won't be in 5 years</li>
            <li>NCTCOG's MTP (Metropolitan Transportation Plan) shows 20-year highway expansion — check it before buying near any undeveloped corridor</li>
            <li>Master-planned communities (Frisco, Allen, Celina) change faster than established neighborhoods — know what's coming before you buy</li>
            <li>Nextdoor is extremely active in DFW — join and read 6 months of history before making an offer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
