import { useState } from 'react';

const locationTypes = [
  {
    key: 'creek',
    label: '🌊 Near a creek, river, or drainage channel',
    risk: 'HIGH',
    riskColor: '#DC2626',
    assessment: 'DFW creeks flood fast and hard. Even "minor" channels can overflow in 30-minute storms. FEMA maps often underestimate risk here.',
    resources: [
      'Pull your exact parcel on FEMA Flood Map Service Center (msc.fema.gov) — look for Zone AE or A.',
      'Search county flood control district records (Dallas County / Tarrant County both publish drainage improvement plans).',
      'Ask seller\’s disclosure: Has the property ever flooded? Required in Texas — lying voids the sale.',
      'Check FEMA claims history: Request a Flood Insurance Claims History from FEMA for the address.',
    ],
    insurance: 'Expect NFIP flood insurance requirement if in Zone AE. Budget $1,200–$3,500/year on top of homeowner\’s insurance.',
    redFlag: 'Any seller who says "it\’s never flooded" but can\’t show you a claims history — run.',
  },
  {
    key: 'lowland',
    label: '🏔️ Low-lying area or bottom of a slope',
    risk: 'MODERATE-HIGH',
    riskColor: '#D97706',
    assessment: 'Water flows downhill. Topography is your friend here — research it. DFW\’s clay soil doesn\’t absorb water quickly, making slope-bottom homes vulnerable.',
    resources: [
      'Use Google Earth\’s terrain view or USGS topographic maps to understand water flow direction around the home.',
      'Check permit history via DCAD (Dallas Central Appraisal District) or TAD (Tarrant Appraisal District) for drainage work.',
      'Drive the area during a heavy rain — watch where water pools and flows.',
      'Ask HOA (if applicable) about detention pond maintenance — deferred maintenance = flooding downstream.',
    ],
    insurance: 'May not require flood insurance by lender, but consider purchasing anyway. Check Excess Flood market for better rates than NFIP.',
    redFlag: 'Downslope from a detention pond that looks poorly maintained or overgrown.',
  },
  {
    key: 'suburban',
    label: '🏘️ Established suburban neighborhood',
    risk: 'MODERATE',
    riskColor: '#2563EB',
    assessment: 'DFW suburban streets flood from overwhelmed storm drains. Sheet flooding across roads is common. Streets flood, not necessarily homes — but access matters.',
    resources: [
      'Research city drainage improvement bond programs — many DFW cities publish 5-year drainage plans.',
      'Search "[city name] flooding 2022" or 2023 on YouTube — residents post videos. Real footage, real data.',
      'Check NextDoor for the neighborhood — search "flood" in the local feed.',
      'Look at satellite imagery after recent rain events via Google Earth historical imagery.',
    ],
    insurance: 'Likely no lender requirement, but $400–$900/year for flood policy is worth it in DFW.',
    redFlag: 'Three or more streets in the neighborhood labeled as "local drainage improvements needed" in city plans.',
  },
  {
    key: 'newdev',
    label: '🏗️ New development or master-planned community',
    risk: 'LOW-MODERATE',
    riskColor: '#16A34A',
    assessment: 'New construction must meet current drainage codes — but detention ponds take years to prove out. North Texas soil issues evolve with impervious cover growth.',
    resources: [
      'Request the subdivision plat and drainage study from the developer or city engineering department.',
      'Confirm detention pond capacity: Is it sized for a 100-year storm or just 25-year?',
      'Check if MUD (Municipal Utility District) owns the drainage infrastructure and how it\’s funded.',
      'Review the subdivision\’s first 2 rainy seasons with residents in buyer Facebook groups.',
    ],
    insurance: 'Usually Zone X (minimal risk) — no requirement, but inexpensive to add. Rates as low as $300–$500/year.',
    redFlag: 'Developer refuses to share the drainage study. Also watch for homes sited at the bottom of a detention pond outflow.',
  },
];

export default function DFWFloodRiskResearchGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = locationTypes.find(l => l.key === selected);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🌧️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Flood Risk Research Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 16, margin: 0 }}>DFW flash floods kill people and ruin homes. Here\'s how to research real risk before you buy.</p>
        </div>

        <div style={{ backgroundColor: '#FEF3C7', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: '4px solid #F59E0B' }}>
          <p style={{ color: '#92400E', fontWeight: 600, margin: 0 }}>⚡ DFW Flash Flood Reality: North Texas gets 35–40 inches of rain annually — mostly in violent 2–4 hour bursts. FEMA maps are updated infrequently and routinely underestimate DFW risk. Neighborhoods that have never flooded before flooded in 2022 and 2023. Don\'t rely on FEMA alone.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>What best describes the property location?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {locationTypes.map(l => (
              <button key={l.key} onClick={() => setSelected(l.key)}
                style={{ textAlign: 'left', padding: '14px 20px', borderRadius: 10, border: '2px solid', cursor: 'pointer',
                  borderColor: selected === l.key ? '#F5E642' : '#E2E8F0',
                  backgroundColor: selected === l.key ? '#FEFCE8' : '#F9FAFB',
                  color: '#0A1628', fontWeight: 600, fontSize: 15 }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ backgroundColor: match.riskColor, color: '#fff', padding: '4px 14px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>
                {match.risk} RISK
              </span>
            </div>
            <p style={{ color: '#334155', marginBottom: 20 }}>{match.assessment}</p>
            <h3 style={{ color: '#0A1628', fontWeight: 700, marginBottom: 12 }}>Research checklist:</h3>
            {match.resources.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                <p style={{ color: '#334155', margin: 0 }}>{r}</p>
              </div>
            ))}
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 10, padding: 16, marginTop: 20, marginBottom: 16 }}>
              <p style={{ color: '#166534', margin: 0 }}>🛡️ <strong>Insurance outlook:</strong> {match.insurance}</p>
            </div>
            <div style={{ backgroundColor: '#FEF2F2', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#991B1B', margin: 0 }}>🚩 <strong>Red flag:</strong> {match.redFlag}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
