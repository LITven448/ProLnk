import { useState } from 'react';

const stages = ['Crime & Safety', 'Schools', 'Flood Zone', 'HOA', 'Site Visits'];

const checklists: Record<string, string[]> = {
  'Crime & Safety': [
    '🚔 Visit DPD Crime Map (dallaspolice.net/crimewatch)',
    '🚔 Check FWPD Crime Map for Fort Worth properties',
    '📊 Review 12-month crime trend, not just current snapshot',
    '🗺️ Check 0.25mi, 0.5mi, 1mi radius crime density',
    '🏠 Note sex offender registry (familywatchdog.us)',
    '🌙 Drive neighborhood at night — lighting and activity',
  ],
  Schools: [
    '🏫 Look up school ratings on GreatSchools.org',
    '📈 Check school rating trend (improving vs declining)',
    '🚌 Confirm attendance zone at district website (not Zillow)',
    '📍 Verify elementary, middle, AND high school ratings',
    '🏆 Check Texas Education Agency accountability ratings',
    '📞 Call district to confirm boundary — zones redraw often',
  ],
  'Flood Zone': [
    '🌊 Check FEMA Flood Map Service (msc.fema.gov)',
    '🔴 Identify if property is Zone AE, AO, X, or 500-yr',
    '💧 Search historical flood claims (NFIP loss history)',
    '🏗️ Check if property has elevation certificate',
    '💰 Get flood insurance quote even if not required',
    '📋 Ask seller disclosure for any flooding history',
  ],
  HOA: [
    '📄 Request CC&Rs, bylaws, and rules/regulations',
    '💰 Review last 2 years of HOA financial statements',
    '🏦 Check reserve fund balance vs reserve study',
    '⚠️ Ask for any pending special assessments',
    '📬 Review board meeting minutes (last 12 months)',
    '🔍 Check HOA litigation history (public court records)',
  ],
  'Site Visits': [
    '☀️ Visit on a weekday morning (commute traffic)',
    '🌙 Visit on a Friday or Saturday night (noise, activity)',
    '🛒 Time drive to nearest grocery, hospital, and highway',
    '🚧 Check TxDOT for planned road construction nearby',
    '✈️ Note flight patterns (DFW and Love Field)',
    '🏭 Identify any industrial or commercial neighbors',
  ],
};

export default function DFWNeighborhoodResearchGuide2026() {
  const [activeStage, setActiveStage] = useState('Crime & Safety');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Neighborhood Research Guide 2026</h1>
          <p style={{ fontSize: 16, color: '#94A3B8', margin: 0 }}>How to research DFW neighborhoods before buying — crime, schools, flood zones, HOAs, and site visits.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
          {stages.map(s => (
            <button key={s} onClick={() => setActiveStage(s)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: activeStage === s ? '#F5E642' : '#1E2D45', color: activeStage === s ? '#0A1628' : '#94A3B8', transition: 'all 0.2s' }}>{s}</button>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, border: '1px solid #2D3F5A' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginTop: 0, marginBottom: 20 }}>✅ {activeStage} Checklist</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {checklists[activeStage].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', fontSize: 15, color: '#CBD5E1', lineHeight: 1.5, borderLeft: '3px solid #F5E642' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, background: '#1E2D45', borderRadius: 12, padding: 24, border: '1px solid #2D3F5A' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>💡 Pro Tip</h3>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>Spend at least 3 visits at different times of day and week before making an offer. No amount of online research replaces direct observation. The neighborhood at 2pm Saturday looks nothing like 7am Monday.</p>
        </div>
      </div>
    </div>
  );
}