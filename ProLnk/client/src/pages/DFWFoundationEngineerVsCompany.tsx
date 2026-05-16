import { useState } from 'react';

const SITUATIONS = [
  'Cracks in drywall or sheetrock',
  'Doors or windows sticking',
  'Visible floor slope or bounce',
  'Exterior brick cracks (stair-step)',
  'Gaps between walls and ceiling/floor',
  'Chimney leaning or separating',
];
const URGENCY = ['Minor — cosmetic only', 'Moderate — functional issues', 'Severe — structural concern'];

type EngineerResult = { getEngineer: boolean; reason: string; whereToFind: string; reportIncludes: string[]; costSavings: string };

const guidance: Record<string, EngineerResult> = {
  'Minor — cosmetic only': {
    getEngineer: false,
    reason: 'Minor cosmetic issues are often normal settling. A foundation company consultation is appropriate first.',
    whereToFind: 'If issues worsen, find a PE at Texas Board of Professional Engineers (tbpe.texas.gov)',
    reportIncludes: ['Not required at this stage'],
    costSavings: 'Skip engineer now — save $400–$800. Monitor for 6 months.',
  },
  'Moderate — functional issues': {
    getEngineer: true,
    reason: 'Functional issues (sticking doors, sloping floors) indicate potential movement that needs objective measurement before a company quotes repairs.',
    whereToFind: 'Find a licensed Structural PE at tbpe.texas.gov — filter by "Structural Engineering". Avoid engineers who also sell repairs.',
    reportIncludes: ['Elevation survey with readings across all rooms', 'Soil report interpretation', 'Pier recommendation (count, location, type)', 'Independent repair scope estimate'],
    costSavings: 'Engineering report costs $400–$800. Prevents over-selling of 15–30 unnecessary piers ($6,000–$12,000 savings).',
  },
  'Severe — structural concern': {
    getEngineer: true,
    reason: 'Severe structural concerns require an independent engineer BEFORE any company touches your foundation. Companies have a financial interest in recommending more work.',
    whereToFind: 'tbpe.texas.gov — Structural PE license required. For litigation-grade reports, specify "forensic structural engineering."',
    reportIncludes: ['Comprehensive elevation survey (every 4 ft)', 'Soil boring or probe data', 'Drainage and hydrology analysis', 'Repair scope with specific pier locations', 'Estimated repair cost range (independent)', 'Documentation for insurance or legal claims'],
    costSavings: 'Engineer costs $600–$1,200. Prevents $20,000–$60,000 in unnecessary or incorrect repairs. Required for insurance claims.',
  },
};

export default function DFWFoundationEngineerVsCompany() {
  const [situation, setSituation] = useState('');
  const [urgency, setUrgency] = useState('');
  const result = urgency ? guidance[urgency] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>⚖️</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Foundation Engineer vs. Company Guide</h1>
          <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
            In DFW, foundation companies have a direct financial interest in recommending repairs. An independent structural 
            engineer has no stake in the outcome — they just tell you the truth. Knowing when to get one can save you tens of thousands.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #EF4444' }}>
          <h2 style={{ color: '#EF4444', marginTop: 0 }}>⚠️ The Conflict of Interest Problem</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            Foundation companies in Texas are paid per pier installed — typically $800–$1,500 each. A company quoting 20 piers 
            earns $16,000–$30,000. An independent engineer with no financial stake often finds that 8–12 piers are sufficient. 
            The average DFW homeowner who skips the engineer overpays by <strong style={{ color: '#F5E642' }}>$8,000–$15,000</strong>.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Should I Get an Engineer First?</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>What Are You Seeing?</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select situation</option>
                {SITUATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Severity Level</label>
              <select value={urgency} onChange={e => setUrgency(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select severity</option>
                {URGENCY.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: result.getEngineer ? '#22C55E' : '#6B7280', borderRadius: 8, padding: '0.5rem 1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                  {result.getEngineer ? '✅ Get Engineer First' : '⏸️ Not Required Yet'}
                </div>
              </div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1rem' }}>{result.reason}</p>
              <div style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: 4 }}>WHERE TO FIND ONE</div>
              <p style={{ color: '#E8EAF0', marginBottom: '1rem', lineHeight: 1.5 }}>{result.whereToFind}</p>
              {result.reportIncludes[0] !== 'Not required at this stage' && (
                <>
                  <div style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: 4 }}>REPORT INCLUDES</div>
                  {result.reportIncludes.map((item, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: '0.9rem', marginBottom: 3 }}>• {item}</div>)}
                </>
              )}
              <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#111D35', borderRadius: 8 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Cost Analysis: </span>
                <span style={{ color: '#CBD5E1' }}>{result.costSavings}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📊 Engineer vs. Company: Key Differences</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: '🎓 Engineer', items: ['Licensed PE, no financial stake in repair', 'Objective measurement and diagnosis', 'Costs $400–$1,200 for report', 'Required for insurance and legal claims', 'Finds MINIMUM repair needed'] },
              { label: '🏗️ Foundation Company', items: ['Paid per pier installed', 'Sales-oriented inspection process', 'Free inspection (builds in upsell)', 'Warranty tied to their own work', 'May recommend MAXIMUM scope'] },
            ].map((col, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <h3 style={{ color: '#F5E642', marginTop: 0 }}>{col.label}</h3>
                <ul style={{ color: '#CBD5E1', lineHeight: 1.9, paddingLeft: '1rem' }}>
                  {col.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
