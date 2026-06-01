import { useState } from 'react';

const findingTypes = [
  'Foundation cracks or movement',
  'Roof damage or missing shingles',
  'HVAC system old or not working',
  'Electrical panel issues',
  'Plumbing leaks or outdated pipes',
  'Window seals failed (fogging)',
  'Cosmetic issues (paint, carpet, minor cracks)',
  'Pest or termite evidence',
  'Drainage or grading issues',
  'Water heater old or failing',
];

function getRepairGuidance(finding: string) {
  const guides: Record<string, { request: string; phrase: string; letGo: string; priority: string }> = {
    'Foundation cracks or movement': {
      priority: '🔴 Safety / Major',
      request: 'Request a licensed structural engineer or foundation company letter (not just inspector opinion). Ask for repair estimate or seller credit. In DFW, pier-and-beam repairs run K-K; slab repairs K-K depending on severity.',
      phrase: 'Buyer requests seller provide a written foundation assessment from a licensed structural engineer within 7 days and either complete recommended repairs prior to closing or provide a credit equal to 125% of the lowest repair estimate.',
      letGo: 'Never let this go uninvestigated. Even hairline cracks need a letter. DFW clay soil means foundation movement is common but not always serious — get the letter, then decide.'
    },
    'Roof damage or missing shingles': {
      priority: '🔴 Safety / Major',
      request: 'Request seller provide recent roof inspection (within 60 days) or credit for full replacement if shingles have less than 3 years of life. DFW hail storms make roof condition critical for insurance.',
      phrase: 'Buyer requests a credit of  toward roof repair/replacement based on roofing contractor estimate provided. Alternatively, seller may provide written roof certification from licensed contractor.',
      letGo: 'Do not let active leaks go — water intrusion causes mold within 48 hours in DFW humidity. Minor missing shingles with documented recent inspection can sometimes be accepted.'
    },
    'HVAC system old or not working': {
      priority: '🟡 Functional / Moderate',
      request: 'Request HVAC service and certification by licensed HVAC tech, or credit. In DFW, a full HVAC system replacement runs K-K depending on size and age. Systems over 15 years old warrant full credit.',
      phrase: 'Buyer requests seller have HVAC system serviced by licensed HVAC contractor and provide written certification that system is in functional working order, or provide a  closing cost credit.',
      letGo: 'If system is 5-10 years old and inspector says functional, you can accept with a home warranty covering HVAC. Do not overbuy the fight on newer systems.'
    },
    'Electrical panel issues': {
      priority: '🔴 Safety / Major',
      request: 'Always request repair or credit for safety violations — Federal Pacific and Zinsco panels are fire hazards. Permit-required work must be completed by licensed electrician. DFW panel replacement: $1,800-$3,000.',
      phrase: 'Buyer requests all electrical deficiencies noted in inspection report be repaired by a licensed electrician with permits pulled and final inspection passed prior to closing, or a credit of .',
      letGo: 'Minor items (single GFCI outlet, loose cover plate) can be let go. Major panel issues cannot — insurance may deny coverage on homes with flagged panels.'
    },
    'Plumbing leaks or outdated pipes': {
      priority: '🟡 Functional / Moderate',
      request: 'Polybutylene pipes (gray plastic, pre-1995 homes) warrant full replacement credit — they fail without warning. Active leaks must be repaired. DFW plumbing scope-out runs $150-$350; re-pipe $4K-$10K.',
      phrase: 'Buyer requests seller repair all active plumbing leaks identified in inspection and provide plumbing scope video for drain lines, or provide credit of  to cover scope and identified issues.',
      letGo: 'Minor dripping faucets or slow drains are cosmetic and can be let go. Focus on supply line integrity and drain scope results.'
    },
    'Window seals failed (fogging)': {
      priority: '🟢 Cosmetic / Minor',
      request: 'Window seal failure (fogging between panes) is cosmetic — insulation value is reduced but it is not a safety issue. You can request credit only if there are many units affected. Single IGU replacement: $200-$500 per unit.',
      phrase: 'Buyer requests a credit of  for replacement of X failed window units identified during inspection.',
      letGo: '1-3 windows: let it go or negotiate a small credit and move on. Seller rarely replaces windows for fog — and you do not want them to since quality varies.'
    },
    'Cosmetic issues (paint, carpet, minor cracks)': {
      priority: '🟢 Cosmetic / Skip',
      request: 'Do not request cosmetic repairs — you are asking for trouble. Sellers will patch paint poorly, replace carpet with builder-grade material, and create more issues than they solve. Take a small credit only if you choose to ask.',
      phrase: 'If you must ask: Buyer requests a credit of  toward buyer-selected flooring and paint in lieu of seller completing cosmetic repairs.',
      letGo: 'Always let cosmetic issues go unless there is a clear deceptive non-disclosure. You will do it better yourself post-closing with your own contractors.'
    },
    'Pest or termite evidence': {
      priority: '🔴 Safety / Major',
      request: 'Texas Wood Destroying Insect (WDI) report is standard. Active termites require treatment — request seller-paid treatment and a 1-year warranty. Structural damage from termites requires repair credit. Treatment: $800-$1,500.',
      phrase: 'Buyer requests seller provide licensed termite treatment with transferable 1-year warranty prior to closing, and repair any structural wood damage identified in WDI report, or provide credit of .',
      letGo: 'Previous evidence with existing treatment warranty: you can accept the existing warranty transfer. No active infestation, no structural damage: let old signs go.'
    },
    'Drainage or grading issues': {
      priority: '🟡 Functional / Moderate',
      request: 'Poor grading that directs water toward the foundation is a serious DFW issue — clay soil holds water and attacks foundations. Request grading correction or credit. Also check French drain needs. Regrading: $1,500-$3,500.',
      phrase: 'Buyer requests seller correct grading adjacent to foundation on [specify side] of home to ensure positive drainage away from structure, or provide credit of  based on landscape contractor estimate.',
      letGo: 'Standing water away from the foundation in the back yard after heavy rain is common in DFW. Focus only on drainage toward the foundation or toward neighbor property.'
    },
    'Water heater old or failing': {
      priority: '🟡 Functional / Moderate',
      request: 'Water heaters over 12 years in DFW warrant credit — hard water accelerates mineral buildup. Replacement: $900-$1,800 installed. Ask for credit, not replacement — you choose the unit.',
      phrase: 'Buyer requests a credit of  toward water heater replacement given unit age of X years and inspector notation of [issue].',
      letGo: 'Under 8 years old with no noted issues: let it go and add to home warranty. Do not fight the seller over a functional water heater.'
    },
  };
  return guides[finding] || { priority: '⬜ Review', request: 'Discuss with your agent and inspector before requesting repairs on this item.', phrase: 'Work with your agent to draft specific repair language.', letGo: 'Evaluate impact on your daily life and budget.' };
}

export default function DFWInspectionRepairGuide() {
  const [finding, setFinding] = useState('');
  const result = finding ? getRepairGuidance(finding) : null;

  return (
    <div style={{ background: '#F8F6F1', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ borderBottom: '3px solid #1A2B3C', paddingBottom: 24, marginBottom: 40 }}>
          <p style={{ color: '#5C7A9F', letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', margin: '0 0 12px' }}>DFW Buyer Guide • 2026</p>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15 }}>Inspection Repair Request Guide</h1>
          <p style={{ color: '#4A5568', fontSize: 17, margin: 0, lineHeight: 1.6 }}>What to ask for after your DFW home inspection — how to phrase it, what to hold firm on, and what to skip to protect the deal.</p>
        </div>

        <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 20, marginBottom: 32 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, fontSize: 15 }}>🏠 DFW Inspection Rule #1</p>
          <p style={{ margin: 0, color: '#4A5568', fontSize: 14, lineHeight: 1.6 }}>If any foundation cracks are noted — even hairline — always request a structural engineer letter. DFW clay soil (shrink-swell) is the #1 cause of foundation movement in the U.S. A letter costs - and tells you if it is settlement (common, stable) or active movement (costly). Never skip this step.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <label style={{ display: 'block', color: '#1A2B3C', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>🔍 Inspection Finding Type</label>
          <select value={finding} onChange={e => setFinding(e.target.value)} style={{ width: '100%', background: '#fff', border: '1.5px solid #CBD5E0', color: '#1A2B3C', padding: '12px 16px', fontSize: 15, borderRadius: 4 }}>
            <option value=''>Select a finding from your inspection report...</option>
            {findingTypes.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 6, padding: 32, marginBottom: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'inline-block', background: '#F0F4FF', border: '1.5px solid #CBD5E0', borderRadius: 4, padding: '4px 12px', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>{result.priority}</div>
            <h2 style={{ color: '#1A2B3C', fontSize: 20, margin: '0 0 24px', borderBottom: '2px solid #E2E8F0', paddingBottom: 12 }}>{finding}</h2>
            {[['📋 What to Request', result.request, '#1A4A8C'], ['✍️ How to Phrase It', result.phrase, '#2D6A4F'], ['✅ When to Let It Go', result.letGo, '#6B7280']].map(([label, text, color]) => (
              <div key={label as string} style={{ borderLeft: '4px solid ' + color, paddingLeft: 16, marginBottom: 24 }}>
                <div style={{ color: color as string, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 }}>{label}</div>
                <div style={{ color: '#4A5568', lineHeight: 1.7, fontSize: 15 }}>{text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[['🔴 Always Request', 'Foundation issues, active roof leaks, electrical hazards, active termites, broken HVAC in Texas heat'],['🟢 Usually Skip', 'Paint, carpet, minor cracks, dated but functional appliances, 1-3 failed window seals']].map(([label, text]) => (
            <div key={label as string} style={{ background: '#1A2B3C', color: '#F8F6F1', borderRadius: 4, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{label}</div>
              <div style={{ fontSize: 13, color: '#CBD5E0', lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
