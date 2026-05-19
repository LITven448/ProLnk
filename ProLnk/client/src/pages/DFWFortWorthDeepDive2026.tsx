import { useState } from 'react';

const AREAS = [
  { id: 'stockyards', label: '🤠 Historic Stockyards / North Side' },
  { id: 'sundance', label: '🌆 Sundance Square / Downtown Adjacent' },
  { id: 'southwest', label: '🏘️ Southwest Fort Worth' },
  { id: 'southeast', label: '🏗️ Southeast Fort Worth / Everman' },
  { id: 'westside', label: '🌿 Westside / Benbrook / Weatherford Corridor' },
];

const GUIDES: Record<string, { title: string; points: string[] }> = {
  stockyards: {
    title: 'Historic Stockyards / North Side Homeowner Guide',
    points: [
      '🤠 Homes date 1920s–1960s — original systems common in un-renovated stock',
      '🔌 60–100 amp panels standard — upgrade required for modern HVAC and EV',
      '💧 Cast iron sewer and galvanized supply common — proactive replacement recommended',
      '🌳 Mature pecan and elm trees — root intrusion into sewer lines is ongoing risk',
      '🏗️ Pier and beam foundations — moisture and leveling inspections annually',
      '🛠️ ProLnk pros experienced with historic North Side Fort Worth stock',
    ],
  },
  sundance: {
    title: 'Sundance Square / Downtown Adjacent Guide',
    points: [
      '🌆 Urban loft and condo conversions — shared systems, HOA coordination required',
      '🔌 Commercial-to-residential conversions have unique electrical configurations',
      '💧 Industrial plumbing in converted buildings — specialist knowledge required',
      '🚿 High-end urban finish expectations — kitchen and bath upgrades premium-priced',
      '📡 Smart home and AV integration very popular in downtown living',
      '🤝 ProLnk matches downtown FW owners with licensed urban specialty contractors',
    ],
  },
  southwest: {
    title: 'Southwest Fort Worth Homeowner Guide',
    points: [
      '🏘️ 1970s–1990s suburban stock — system replacement cycle in full swing',
      '🌡️ HVAC systems reaching 20–25 year mark — budget for full replacement',
      '💧 Polybutylene pipe in 1980s builds — replace proactively before failure',
      '🌿 Established neighborhoods — large trees near foundations are common',
      '🔑 Pool homes common in this corridor — pump and plaster refresh needed',
      '🔧 ProLnk: HVAC and pool service pros most active in SW Fort Worth',
    ],
  },
  southeast: {
    title: 'Southeast Fort Worth / Everman Guide',
    points: [
      '🏗️ Affordable 1960s–1990s stock — entry-level ownership with renovation upside',
      '🔌 Older panels common — 100–150 amp upgrades very common service need',
      '💧 Mix of plumbing types — inspection before purchase strongly recommended',
      '🌿 Large lots common — landscaping and fence replacement high demand',
      '🏠 Strong homeownership culture — repair over replace is the local ethic',
      '🛠️ ProLnk connects SE Fort Worth homeowners with affordable, vetted local pros',
    ],
  },
  westside: {
    title: 'Westside / Benbrook / Weatherford Corridor Guide',
    points: [
      '🌿 Rural-to-suburban transition zone — septic systems common west of Loop 820',
      '💧 Well water in some properties — annual water quality testing recommended',
      '🏗️ Larger lots require different contractor skill sets — site work and drainage',
      '🌳 Cedar and oak tree clearing common — defensible space near homes important',
      '🔌 Some areas on co-op electric — unique infrastructure vs. Oncor territory',
      '🤝 ProLnk covers Benbrook and Weatherford corridor with vetted rural-capable pros',
    ],
  },
};

export default function DFWFortWorthDeepDive2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? GUIDES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Deep Dive 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🤠 Fort Worth City Proper</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          Cowtown with big city infrastructure — historic Stockyards to modern Sundance Square. 350+ square miles across Tarrant County. Select your Fort Worth area for a homeowner guide.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {AREAS.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ background: selected === a.id ? '#F5E642′ : '#0f2035', color: selected === a.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === a.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '14px 10px', fontWeight: 600, fontSize: 14, cursor: ’pointer', textAlign: 'left' }}>
              {a.label}
            </button>
          ))}
        </div>
        {guide && (
          <div style={{ background: '#0f2035', border: '1px solid #1e3a5f', borderRadius: 14, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>{guide.title}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {guide.points.map((p, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14, lineHeight: 1.6 }}>{p}</li>
              ))}
            </ul>
          </div>
        )}
        {!guide && (
          <div style={{ textAlign: 'center', color: '#475569', padding: '40px 0', fontSize: 14 }}>
            ☝️ Select your Fort Worth area above to get your homeowner deep dive guide
          </div>
        )}
        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🔗 ProLnk — Fort Worth Pros Across All of Tarrant County</div>
          <div style={{ color: '#1a2e4a', fontSize: 13 }}>Licensed contractors covering all of Fort Worth and the Tarrant County corridor — vetted and ready.</div>
        </div>
      </div>
    </div>
  );
}
