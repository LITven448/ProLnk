import { useState } from 'react';

const corridors = [
  { label: 'Celina / Prosper / Frisco (North Growth Corridor)', key: 'north' },
  { label: 'Mansfield / Midlothian / Waxahachie (South Growth)', key: 'south' },
  { label: 'Rockwall / Rowlett / Garland (East Expansion)', key: 'east' },
  { label: 'Fort Worth / Burleson / Crowley (West Fort Worth)', key: 'west' },
  { label: 'Dallas Core / Lakewood / M Streets (Inner City)', key: 'core' },
];

const tradeSpecialties = [
  { label: 'HVAC', key: 'hvac' },
  { label: 'Plumbing', key: 'plumbing' },
  { label: 'Roofing', key: 'roofing' },
  { label: 'Electrical', key: 'electrical' },
  { label: 'General Contractor', key: 'gc' },
];

const corridorData: Record<string, { profile: string; hoaMultipliers: string[]; realtorTargets: string[]; networkProjection: string }> = {
  north: {
    profile: 'Fastest-growing suburb cluster in the US. New construction = warranty gaps + upgrade demand. Median home value $650K+. HOAs everywhere.',
    hoaMultipliers: ['Celina Community HOA (2,400 homes)', 'Prosper Lakes HOA (1,800 homes)', 'Star Trail Prosper (3,100 homes)', 'Newman Village HOA (900 homes)'],
    realtorTargets: ['Keller Williams Frisco', 'Compass North Dallas', 'Ebby Halliday Prosper', 'RE/MAX DFW Associates'],
    networkProjection: '12-month projection: 180-240 partner recruits, 800-1,200 homeowners registered, $4,200-$7,800/mo network income',
  },
  south: {
    profile: 'Blue collar homeowner base with high project frequency. Older homes need constant maintenance. Lower competition from other networks.',
    hoaMultipliers: ['Mansfield National HOA (1,200 homes)', 'Walnut Creek Estates (600 homes)', 'Midlothian Ranch HOA (450 homes)'],
    realtorTargets: ['Century 21 Judge Fite', 'Coldwell Banker Midlothian', 'RE/MAX Mansfield'],
    networkProjection: '12-month projection: 120-160 partner recruits, 500-800 homeowners registered, $2,800-$4,600/mo network income',
  },
  east: {
    profile: 'Mixed new and existing construction. Strong working-class homeowner base. Lake communities add seasonal project demand.',
    hoaMultipliers: ['Harbor Club Rockwall (800 homes)', 'Rowlett Lakeview HOA (1,100 homes)', 'Firewheel Garland (2,200 homes)'],
    realtorTargets: ['Dave Perry-Miller Rockwall', 'Ebby Halliday Garland', 'Allie Beth Allman East DFW'],
    networkProjection: '12-month projection: 100-140 partner recruits, 400-700 homeowners registered, $2,200-$3,800/mo network income',
  },
  west: {
    profile: 'Fort Worth growth corridor. Strong trades culture makes partner recruiting easier. Large family homes with consistent maintenance needs.',
    hoaMultipliers: ['Ventana West HOA (1,400 homes)', 'Summer Creek Fort Worth (2,000 homes)', 'Burleson Meadows HOA (700 homes)'],
    realtorTargets: ['Keller Williams Fort Worth', 'Williams Trew Fort Worth', 'Briggs Freeman Sothebys'],
    networkProjection: '12-month projection: 140-180 partner recruits, 600-900 homeowners registered, $3,200-$5,200/mo network income',
  },
  core: {
    profile: 'Dense, high-income urban homeowners. Smaller homes but premium project values. Tech workers and professionals — high digital adoption.',
    hoaMultipliers: ['M Streets Neighborhood Association', 'Lakewood Heights HOA (450 homes)', 'Bishop Arts District Community'],
    realtorTargets: ['Allie Beth Allman Dallas', 'Briggs Freeman Sothebys', 'Compass Dallas'],
    networkProjection: '12-month projection: 80-120 partner recruits, 300-500 homeowners registered, $3,800-$6,400/mo network income (high project values)',
  },
};

const tradeBoosts: Record<string, string> = {
  hvac: 'HVAC partners have the fastest conversion — every Texas homeowner needs AC work every 2-3 years. Lead with summer season urgency.',
  plumbing: 'Plumbing creates the most urgent leads. Offer emergency contractor access as your hook — homeowners will sign up immediately.',
  roofing: 'Target post-storm periods. Storm-chase neighborhoods after hail events for concentrated homeowner acquisition.',
  electrical: 'Target new homeowners and renovators. Panel upgrades and EV charger installs are high-value projects driving demand.',
  gc: 'General contractors see the widest project range. Focus on remodel corridors where aging homes are being upgraded.',
};

export default function PartnerDFWMasterPlan() {
  const [corridor, setCorridor] = useState('');
  const [trade, setTrade] = useState('');
  const data = corridor ? corridorData[corridor] : null;
  const tradeBoost = trade ? tradeBoosts[trade] : null;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🗺️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>DFW Market Domination Plan</h1>
          <p style={{ color: '#4B5563', fontSize: 16, lineHeight: 1.6 }}>
            DFW is the #1 growth market in America. 7 million people, 400+ new residents per day, and a home services industry ripe for disruption. Here is how you plant your flag.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏘️ HOA Boards as Multipliers</h2>
          <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 12, lineHeight: 1.6 }}>
            One HOA board member controls access to hundreds or thousands of homeowners. Getting a board member as a partner is the highest-leverage move in DFW.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['Attend board meetings as a guest', 'Offer a neighborhood contractor directory', 'Propose a community maintenance day', 'Partner on HOA newsletter inclusion'].map(tactic => (
              <div key={tactic} style={{ padding: '10px 14px', backgroundColor: '#F0F9FF', borderRadius: 8, fontSize: 13, color: '#0369A1', border: '1px solid #BAE6FD' }}>
                ✅ {tactic}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏡 Real Estate Agent Partnerships</h2>
          <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 12, lineHeight: 1.6 }}>
            DFW realtors close 8,000+ transactions per month. Each closing is a homeowner who needs contractors immediately.
          </p>
          <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>The Realtor Pitch</p>
            <p style={{ fontSize: 13, color: '#374151', fontStyle: 'italic' }}>
              "I help your buyers get connected with vetted contractors immediately after closing. You look like a hero, they get help fast, and I earn origination rights. Want to refer your next 5 buyers as a trial?"
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🎯 Territory Strategy Builder</h2>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>Select your starting location and trade specialty for a customized DFW strategy.</p>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Starting Territory</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {corridors.map(c => (
                <button key={c.key} onClick={() => setCorridor(c.key)}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid', borderColor: corridor === c.key ? '#F5E642' : '#E5E7EB', backgroundColor: corridor === c.key ? '#FEFCE8' : '#F9FAFB', cursor: 'pointer', textAlign: 'left', fontSize: 13, color: '#0A1628', fontWeight: corridor === c.key ? 700 : 400 }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Trade Specialty</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tradeSpecialties.map(t => (
                <button key={t.key} onClick={() => setTrade(t.key)}
                  style={{ padding: '8px 14px', borderRadius: 20, border: '2px solid', borderColor: trade === t.key ? '#F5E642' : '#E5E7EB', backgroundColor: trade === t.key ? '#FEFCE8' : '#F9FAFB', cursor: 'pointer', fontSize: 13, color: '#0A1628', fontWeight: trade === t.key ? 700 : 400 }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {data && (
            <div style={{ backgroundColor: '#F0F9FF', borderRadius: 10, padding: 20 }}>
              <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 6 }}>Territory Profile</p>
              <p style={{ fontSize: 14, color: '#0A1628', marginBottom: 16 }}>{data.profile}</p>
              {tradeBoost && (
                <div style={{ backgroundColor: '#FEFCE8', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: '3px solid #F5E642' }}>
                  <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px 0' }}>Trade Advantage</p>
                  <p style={{ fontSize: 13, color: '#374151', margin: 0 }}>{tradeBoost}</p>
                </div>
              )}
              <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 6 }}>Top HOA Targets</p>
              <ul style={{ paddingLeft: 18, marginBottom: 16 }}>
                {data.hoaMultipliers.map(h => <li key={h} style={{ fontSize: 13, marginBottom: 4 }}>{h}</li>)}
              </ul>
              <p style={{ fontWeight: 700, color: '#0369A1', marginBottom: 6 }}>Realtor Partners to Approach</p>
              <ul style={{ paddingLeft: 18, marginBottom: 16 }}>
                {data.realtorTargets.map(r => <li key={r} style={{ fontSize: 13, marginBottom: 4 }}>{r}</li>)}
              </ul>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 12 }}>
                <p style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, margin: '0 0 4px 0' }}>📈 12-Month Network Projection</p>
                <p style={{ fontSize: 13, color: '#D1D5DB', margin: 0 }}>{data.networkProjection}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
