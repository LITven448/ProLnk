import { useState } from 'react';

type Responsibility = 'city' | 'homeowner' | 'shared' | 'depends';

const issueTypes = [
  'Pothole / Street Damage',
  'Sidewalk Crack or Heave',
  'Street Light Out',
  'Storm Drain Blocked',
  'Tree in Right-of-Way',
  'Tree on Private Property',
  'Sewer Backup',
  'Water Main Leak',
  'Neighbor Fence Dispute',
  'Shared Driveway Damage',
];

const issueData: Record<string, {
  responsibility: Responsibility;
  cityScope: string;
  homeownerScope: string;
  howToReport: string;
  responseTime: string;
  tip: string;
}> = {
  'Pothole / Street Damage': {
    responsibility: 'city',
    cityScope: 'Public streets, lanes, and alleys. City repairs at no cost.',
    homeownerScope: 'Private driveways and parking areas on your property.',
    howToReport: '311 (all major DFW cities). Report online or via city 311 app. Include cross-street for faster routing.',
    responseTime: '3–14 days depending on severity. High-traffic streets prioritized.',
    tip: 'Take photos with date/time metadata. If car is damaged by pothole, report immediately and file property damage claim with city.',
  },
  'Sidewalk Crack or Heave': {
    responsibility: 'depends',
    cityScope: 'Sidewalks abutting city right-of-way in Dallas are city responsibility. Frisco/Plano: varies.',
    homeownerScope: 'In many DFW cities, YOU are responsible for sidewalk adjacent to your property even though it is in the public right-of-way.',
    howToReport: 'Report to 311. City will inspect and determine responsibility before scheduling repair.',
    responseTime: '2–6 weeks. ADA-related hazards prioritized.',
    tip: 'Sidewalk rules are counterintuitive. Dallas shifted to city responsibility in 2016. Frisco and suburban cities vary — call your city public works to confirm before paying for repairs yourself.',
  },
  'Street Light Out': {
    responsibility: 'city',
    cityScope: 'All public street lights — maintained by Oncor (electric) and the city. Report to city and Oncor.',
    homeownerScope: 'Lights on private property or HOA common areas are your responsibility.',
    howToReport: '311 or Oncor directly at 888-313-4747. Have pole number (on the pole) for faster repair.',
    responseTime: '3–7 business days typically.',
    tip: 'Street lights are Oncor-owned infrastructure. City 311 routes your report to Oncor automatically in most DFW cities.',
  },
  'Storm Drain Blocked': {
    responsibility: 'city',
    cityScope: 'Storm drain inlets and underground pipes in public right-of-way. City clears blockages.',
    homeownerScope: 'Private drainage on your property — drainage ditches, private culverts, swales.',
    howToReport: '311 for emergency drain blockages. Flag as urgent during heavy rain events.',
    responseTime: 'Emergency response same day during flood events. Non-urgent: 5–10 days.',
    tip: 'Clear leaves and debris from the drain near the curb yourself — it prevents backups and keeps your neighborhood off the emergency call list.',
  },
  'Tree in Right-of-Way': {
    responsibility: 'depends',
    cityScope: 'City-planted trees in right-of-way are typically city responsibility for removal. Emergency hazard trees prioritized.',
    homeownerScope: 'Trees planted by previous homeowners in the right-of-way may be YOUR responsibility in some cities.',
    howToReport: '311 with location. City arborist will inspect before any removal.',
    responseTime: '1–4 weeks for inspection. Removal scheduling varies.',
    tip: 'Never remove a right-of-way tree without city approval — you can be fined. Get written clearance from city before any work.',
  },
  'Tree on Private Property': {
    responsibility: 'homeowner',
    cityScope: 'City has no obligation for private property trees unless it has fallen on public infrastructure.',
    homeownerScope: 'Your tree, your cost. If it falls on neighbor\’s property, insurance applies — but may still be your liability.',
    howToReport: 'No city reporting for private trees. Hire a licensed arborist.',
    responseTime: 'N/A — private matter.',
    tip: 'If your tree is dead or leaning toward a neighbor\’s home, document it in writing NOW. Failure to act on a known hazard creates liability.',
  },
  'Sewer Backup': {
    responsibility: 'shared',
    cityScope: 'Main sewer line in the street. If blockage is in the main, city clears it free.',
    homeownerScope: 'Lateral line from your home to the main (in your yard and under your foundation) is your cost. This can be $3,000–$15,000+.',
    howToReport: '311 emergency line. Sewer backups are treated as urgent. Available 24/7.',
    responseTime: 'Same day for active backups. City will camera the main to determine fault point.',
    tip: 'Request camera inspection from city before paying any plumber. If the fault is on the city\’s side of the cleanout, it\’s free. Many homeowners pay thousands unnecessarily.',
  },
  'Water Main Leak': {
    responsibility: 'shared',
    cityScope: 'Water main in the street and to the meter box is city responsibility.',
    homeownerScope: 'From the meter to your home (the service line) is your responsibility. Can cost $1,000–$5,000+.',
    howToReport: '311 or city water emergency line. Available 24/7 — leaks near street are urgent.',
    responseTime: 'Active main breaks: 2–4 hours. Slow leaks: 1–3 days.',
    tip: 'Meter box is the dividing line. Know where yours is. City owns up to (and including) the meter. You own everything from the meter to the house.',
  },
  'Neighbor Fence Dispute': {
    responsibility: 'homeowner',
    cityScope: 'City does not arbitrate property disputes. Police may respond if it escalates but won\’t resolve ownership.',
    homeownerScope: 'Survey your property. Shared fences are typically co-owned and co-maintained in Texas.',
    howToReport: 'Contact an HOA (if applicable) first. Otherwise consult a property attorney or hire a surveyor.',
    responseTime: 'N/A — civil matter.',
    tip: 'In Texas, a fence on the property line is typically shared property. Both neighbors have rights to maintain it. Get a survey before assuming where the line is.',
  },
  'Shared Driveway Damage': {
    responsibility: 'depends',
    cityScope: 'If the shared driveway crosses public right-of-way, city may have jurisdiction at the curb cut only.',
    homeownerScope: 'Private shared driveways are civil matters between neighbors — check your deed for easement language.',
    howToReport: 'Review your deed or title documents for easement terms. Mediation often more effective than courts.',
    responseTime: 'N/A — private civil matter.',
    tip: 'Many DFW older homes have shared driveway easements that go unread for decades. Pull your deed before any repair — determines who pays.',
  },
};

const responsibilityColors: Record<Responsibility, { bg: string; text: string; label: string }> = {
  city: { bg: '#052e1680', text: '#4ade80', label: '🏛️ CITY RESPONSIBILITY' },
  homeowner: { bg: '#3b0a0a80', text: '#f87171', label: '🏠 YOUR RESPONSIBILITY' },
  shared: { bg: '#1c1a0880', text: '#facc15', label: '🤝 SHARED RESPONSIBILITY' },
  depends: { bg: '#1a1040', text: '#a78bfa', label: '⚠️ DEPENDS ON CITY' },
};

const cityPhone: Record<string, string> = {
  Dallas: '214-670-3111', Frisco: '972-292-5750', Plano: '972-941-7311', McKinney: '972-547-7500',
  'Fort Worth': '817-392-1234', Arlington: '817-459-6566', Garland: '972-205-2000',
};

export default function DFWPublicWorksGuide() {
  const [selectedCity, setSelectedCity] = useState('Dallas');
  const [selectedIssue, setSelectedIssue] = useState('Pothole / Street Damage');

  const issue = issueData[selectedIssue];
  const resp = responsibilityColors[issue.responsibility];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>🏗️ DFW Public Works Guide</h1>
          <p style={{ color: '#8A9BB5', marginTop: 10 }}>Know what your city fixes vs. what falls on you — before spending money on the wrong problem.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>YOUR CITY</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}
              style={{ width: '100%', background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              {Object.keys(cityPhone).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 2, minWidth: 240 }}>
            <label style={{ display: 'block', fontSize: 12, color: '#8A9BB5', marginBottom: 8, fontWeight: 600 }}>ISSUE TYPE</label>
            <select value={selectedIssue} onChange={e => setSelectedIssue(e.target.value)}
              style={{ width: '100%', background: '#111F35', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              {issueTypes.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: resp.bg, border: `1px solid ${resp.text}40`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: resp.text, fontWeight: 800, marginBottom: 8 }}>{resp.label}</div>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, margin: 0 }}>{selectedIssue}</h2>
        </div>

        <div style={{ background: '#111F35', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#052e1680', borderRadius: 12, padding: 18, border: '1px solid #4ade8040' }}>
              <div style={{ fontSize: 11, color: '#4ade80', fontWeight: 700, marginBottom: 8 }}>🏛️ CITY HANDLES</div>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{issue.cityScope}</p>
            </div>
            <div style={{ background: '#3b0a0a80', borderRadius: 12, padding: 18, border: '1px solid #f8717140' }}>
              <div style={{ fontSize: 11, color: '#f87171', fontWeight: 700, marginBottom: 8 }}>🏠 YOU HANDLE</div>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{issue.homeownerScope}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 11, color: '#60a5fa', fontWeight: 700, marginBottom: 8 }}>📞 HOW TO REPORT</div>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{issue.howToReport}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 11, color: '#facc15', fontWeight: 700, marginBottom: 8 }}>⏱️ EXPECTED RESPONSE</div>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{issue.responseTime}</p>
            </div>
          </div>
          <div style={{ background: '#1A2E4A', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 PRO TIP</div>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{issue.tip}</p>
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📞 {selectedCity} 311 — {cityPhone[selectedCity]}</div>
          <p style={{ color: '#8A9BB5', fontSize: 13, margin: 0 }}>Most DFW 311 lines operate 24/7 for emergencies and 8am–5pm for standard requests. Online portals available for non-urgent issues.</p>
        </div>
      </div>
    </div>
  );
}
