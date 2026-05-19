import { useState } from 'react';

const situations = [
  'Single owner, no estate plan yet',
  'Married couple, home in one name',
  'Married couple, home in both names',
  'Own home, want to pass to adult children',
  'Own home, concerned about probate cost/delay',
  'Own home with mortgage, want estate planning',
  'Own multiple properties in DFW',
  'Blended family / children from prior marriage',
];

type EstatePlan = {
  headline: string;
  structure: string;
  texasTools: { name: string; how: string; pros: string; cons: string }[];
  homesteadNote: string;
  nextSteps: string[];
  cost: string;
  urgency: string;
};

const plans: Record<string, EstatePlan> = {
  'Single owner, no estate plan yet': {
    headline: 'Without any estate plan, your DFW home goes through Texas probate — which takes 6–12 months and costs 3–5% of home value.',
    structure: 'Texas Transfer on Death Deed (TODD) — simplest solution for single owners',
    texasTools: [
      { name: 'Transfer on Death Deed (TODD)', how: 'File a deed naming your beneficiary — recorded at Dallas/Tarrant/Collin County courthouse', pros: 'Avoids probate entirely, revocable anytime, free during life, beneficiary gets stepped-up tax basis', cons: 'No asset protection, does not avoid Medicaid estate recovery, beneficiary must survive you' },
      { name: 'Revocable Living Trust', how: 'Create trust, deed home into trust during life — trust controls distribution at death', pros: 'Full probate avoidance, handles multiple assets, incapacity planning included', cons: 'More expensive to set up ($1,500–$3,000), requires ongoing maintenance' },
    ],
    homesteadNote: 'Texas homestead protection continues after death during probate if surviving spouse or minor children remain in home — up to 10 acres in DFW metro areas.',
    nextSteps: ['File TODD at county courthouse ($25 filing fee) naming beneficiary', 'Or consult estate attorney about revocable trust if you have other assets', 'Update beneficiary designations on life insurance and retirement accounts', 'Create basic will for remaining assets'],
    cost: 'TODD: $25 filing fee (self-file) or $300–$500 with attorney. Living Trust: $1,500–$3,000.',
    urgency: 'HIGH — without any plan, your DFW home is subject to full probate. Act now.',
  },
  'Married couple, home in both names': {
    headline: 'Texas community property law gives you natural protections — but you still need a plan for the second death.',
    structure: 'Community Property with Right of Survivorship Agreement + TODD for second-to-die',
    texasTools: [
      { name: 'Community Property Survivorship Agreement', how: 'Sign agreement converting community property to survivorship — recorded at county courthouse', pros: 'Surviving spouse gets home automatically without probate, full stepped-up basis on whole property', cons: 'Irrevocable once signed without both spouses agreeing' },
      { name: 'Transfer on Death Deed (Second Death)', how: 'Add TODD naming children/heirs for when the surviving spouse dies', pros: 'Completes the probate avoidance chain through two deaths', cons: 'Must be updated if beneficiaries change' },
    ],
    homesteadNote: 'Texas homestead exemption protects up to $100,000 in home equity from most creditors during life. Survives death for dependent family members in DFW.',
    nextSteps: ['Execute Community Property Survivorship Agreement — both spouses must sign', 'File at Dallas/Tarrant/Collin/Denton County clerk', 'Add TODD to pass home to children after surviving spouse dies', 'Update wills to coordinate with property documents'],
    cost: 'Community Property Agreement: $500–$1,000 with attorney. TODD: $25–$300.',
    urgency: 'MODERATE — you have natural protection for first death, but plan for second death.',
  },
  'Own home, want to pass to adult children': {
    headline: 'Texas offers two tools specifically designed to transfer your DFW home to children with minimal hassle and tax efficiency.',
    structure: 'Lady Bird Deed (Enhanced Life Estate Deed) or TODD — both avoid probate and preserve stepped-up basis',
    texasTools: [
      { name: 'Lady Bird Deed (Enhanced Life Estate Deed)', how: 'Deed names you as grantor-grantee with enhanced life estate, children as remaindermen', pros: 'Keeps full control during life, can sell or mortgage without children\’s consent, avoids probate, Medicaid estate recovery protection', cons: 'More complex than TODD, requires attorney drafting, not available in all title companies' },
      { name: 'Transfer on Death Deed (TODD)', how: 'Simpler deed naming children as beneficiaries — recorded at county courthouse', pros: 'Easy to create and revoke, avoids probate, stepped-up basis for children', cons: 'Children have no interest during life, does not protect against Medicaid estate recovery like Lady Bird Deed' },
    ],
    homesteadNote: 'Lady Bird Deed is superior if you might need Medicaid for long-term care — Medicaid cannot recover from Lady Bird Deed remainder interest in Texas.',
    nextSteps: ['Consult elder law attorney if Medicaid concern exists — Lady Bird Deed is the answer', 'File TODD for simple situations without Medicaid concerns', 'Discuss stepped-up tax basis with CPA before transferring', 'Update your will to coordinate (avoid leaving home to children twice)'],
    cost: 'Lady Bird Deed: $750–$1,500 with elder law attorney. TODD: $25–$500.',
    urgency: 'MODERATE — plan now to avoid your children paying probate fees on your DFW home.',
  },
  'Own home, concerned about probate cost/delay': {
    headline: 'Texas probate costs 3–5% of home value and takes 6–12 months — easily avoided with the right tool filed today.',
    structure: 'Transfer on Death Deed (TODD) — fastest, cheapest probate avoidance for DFW homes',
    texasTools: [
      { name: 'Transfer on Death Deed (TODD)', how: 'File at county courthouse naming beneficiary — takes effect at death, revocable anytime during life', pros: 'Costs $25–$300, completely avoids probate, beneficiary gets stepped-up tax basis, you keep full control', cons: 'Does not handle incapacity planning, only covers the home (not other assets)' },
      { name: 'Revocable Living Trust', how: 'Create trust entity, deed home into trust, name successor trustee and beneficiaries', pros: 'Handles all assets (not just home), incapacity planning built in, multistate property handled cleanly', cons: '$1,500–$3,000 to create, must be maintained and funded properly' },
    ],
    homesteadNote: 'Texas probate is not as expensive as California — but DFW home values have risen so much ($350K–$800K median) that probate fees on $500K home = $15,000–$25,000 easily avoided.',
    nextSteps: ['File TODD today at Dallas/Tarrant/Collin/Denton county courthouse', 'Or create revocable trust if you have multiple assets or out-of-state property', 'Coordinate with a will (pour-over will if using trust)', 'Update beneficiary designations on financial accounts'],
    cost: 'TODD: $25 filing fee (self-file). Savings vs. probate on $500K DFW home: $15,000–$25,000.',
    urgency: 'HIGH — $25 filing fee eliminates $15,000+ probate costs on your DFW home. File now.',
  },
  'Own home with mortgage, home in both names': {
    headline: 'A mortgage does not prevent estate planning — but your lender has due-on-sale rights you must navigate carefully.',
    structure: 'Revocable Living Trust is safest with mortgaged DFW property — most lenders allow transfer to trust with proper notice',
    texasTools: [
      { name: 'Revocable Living Trust (with Lender Notice)', how: 'Transfer home to trust, notify lender per Garn-St. Germain Act — federal law protects trust transfers from due-on-sale', pros: 'Lender cannot call loan due on transfer to your own revocable trust — federal law (Garn-St. Germain Act) protects this', cons: 'Must properly notify lender and provide trust certification — skipping this step creates risk' },
      { name: 'Transfer on Death Deed', how: 'TODD does not trigger due-on-sale — title stays in your name during life', pros: 'Safe with mortgaged property — lender has no claim until beneficiary inherits', cons: 'Beneficiary must deal with assumption or refinancing after you die' },
    ],
    homesteadNote: 'DFW homes with mortgages still qualify for homestead exemption — keep filing annually with county appraisal district to maintain exemption.',
    nextSteps: ['Consult estate attorney about trust transfer — provide lender with trust certification under Garn-St. Germain', 'Or file TODD as simpler option — no lender notification required', 'Ensure life insurance coverage is sufficient to pay off mortgage if desired', 'Review beneficiary on mortgage insurance (PMI/MPI if applicable)'],
    cost: 'TODD: $25–$300. Living Trust: $1,500–$3,000 plus lender coordination.',
    urgency: 'MODERATE — act before health changes make planning more complex.',
  },
  'Own multiple properties in DFW': {
    headline: 'Multiple DFW properties means multiple probate proceedings without proper planning — a living trust is the right tool.',
    structure: 'Revocable Living Trust with sub-trust provisions — deeds each DFW property into trust during life',
    texasTools: [
      { name: 'Revocable Living Trust', how: 'Single trust controls all DFW properties — each property deeded into trust with separate recorded deed', pros: 'One document controls all properties, single trustee administration at death, no probate on any property, incapacity protection', cons: 'Each property requires separate deed transfer to trust ($300–$500/property for deed preparation)' },
      { name: 'TODDs for Each Property', how: 'File separate TODD for each DFW property naming beneficiaries', pros: 'Cheaper than trust, simple beneficiary designations per property', cons: 'No coordination between properties, more complex for heirs, no incapacity protection' },
    ],
    homesteadNote: 'Only one DFW property qualifies for homestead exemption — file for correct property at county appraisal district. Investment properties do not qualify.',
    nextSteps: ['Create revocable living trust if you own 3+ properties or have complex situation', 'Deed each property into trust with separate recorded deed at each county', 'Update property insurance to reflect trust as named insured', 'Create pour-over will for any property not yet transferred to trust'],
    cost: 'Living Trust: $2,000–$5,000 for multi-property setup. Deed transfer per property: $300–$500 each.',
    urgency: 'HIGH — multiple properties = multiple probate proceedings without planning. Trust is essential.',
  },
  'Blended family / children from prior marriage': {
    headline: 'Blended family situations are the highest risk for DFW estate disputes — a trust with precise instructions is essential.',
    structure: 'Revocable Living Trust with specific sub-trust provisions for spouse and prior children — do not rely on default Texas rules',
    texasTools: [
      { name: 'Revocable Trust with QTIP or Credit Shelter Provisions', how: 'Trust provides for surviving spouse during life while preserving remainder for prior children', pros: 'Precisely controls who gets what and when, avoids disputes between spouse and children, coordinates with Texas community/separate property rules', cons: 'More expensive — $3,000–$6,000 for blended family trust design — but essential for your situation' },
      { name: 'Special Warranty Deed into Trust', how: 'Deed home into trust specifying whether it is community or separate property — critical for DFW homes with complex ownership history', pros: 'Clear title prevents disputes about property ownership between spouse and children', cons: 'Requires attorney familiar with Texas community property rules' },
    ],
    homesteadNote: 'Texas homestead rights for surviving spouse can create conflict with children from prior marriage — trust must specifically address this. An elder law attorney familiar with DFW blended families is essential.',
    nextSteps: ['CRITICAL: Hire estate attorney experienced in Texas blended family situations — not a general practice attorney', 'Do NOT use TODD alone — insufficient for blended family complexity', 'Address community property vs. separate property characterization of home in trust', 'Coordinate life insurance beneficiaries with trust provisions'],
    cost: '$3,000–$6,000+ for proper blended family trust design in DFW.',
    urgency: 'CRITICAL — blended family situations without a trust invite litigation. Act immediately.',
  },
  'Married couple, home in one name': {
    headline: 'Texas community property law likely protects the home regardless of whose name is on deed — but the title should be corrected.',
    structure: 'Add spouse to deed + Community Property Survivorship Agreement + TODD for second death',
    texasTools: [
      { name: 'Add Spouse to Deed (Warranty Deed)', how: 'File warranty deed adding spouse — recorded at Dallas/Tarrant/Collin/Denton county courthouse', pros: 'Corrects the record to reflect true ownership, allows community property survivorship agreement', cons: 'May trigger lender notification requirement if mortgaged — check with lender first' },
      { name: 'Community Property Survivorship Agreement', how: 'Once both on deed, sign agreement ensuring surviving spouse gets home without probate', pros: 'Full stepped-up basis for surviving spouse, automatic transfer, no probate', cons: 'Both spouses must agree — irrevocable without mutual consent' },
    ],
    homesteadNote: 'Texas community property: even if only one spouse is on the deed, home purchased during marriage is likely community property. Surviving spouse has strong rights — but proving it requires evidence. Get both names on deed.',
    nextSteps: ['Consult real estate attorney to add spouse to deed — check mortgage for due-on-sale clause', 'Execute Community Property Survivorship Agreement once both on deed', 'Add TODD naming children for when both spouses are gone', 'Update will and beneficiary designations'],
    cost: 'Deed addition: $300–$800. Community Property Agreement: $500–$1,000. TODD: $25–$300.',
    urgency: 'MODERATE-HIGH — fix the deed to match your intent. One name on deed creates confusion.',
  },
};

export default function DFWHomeEstatePlanGuide() {
  const [situation, setSituation] = useState('');

  const result = situation ? plans[situation] : null;

  return (
    <div style={{ background: '#FAFAF7', minHeight: '100vh', color: '#1A1A2E', fontFamily: 'Georgia, serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #1A2A4A 0%, #0A1628 100%)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🏛️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px', fontFamily: 'system-ui, sans-serif' }}>DFW Home Estate Planning Guide</h1>
        <p style={{ color: '#A0C0E0', fontSize: 15, maxWidth: 600, margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>Texas has unique estate planning tools — including the Lady Bird Deed and Transfer on Death Deed — that can help DFW homeowners pass their home without probate. Learn your options.</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#EEF4FF', border: '1px solid #B0C8E8', borderRadius: 10, padding: 16, margin: '28px 0 20px' }}>
          <div style={{ color: '#1A3A6A', fontWeight: 700, fontSize: 14, marginBottom: 8, fontFamily: 'system-ui, sans-serif' }}>⚖️ Texas Estate Planning: Key Advantage</div>
          <p style={{ color: '#2A3A5A', fontSize: 14, margin: 0, lineHeight: 1.6, fontFamily: 'system-ui, sans-serif' }}>Texas law offers the Transfer on Death Deed (TODD) and Lady Bird Deed — two tools not available in most states that allow DFW homeowners to avoid probate with minimal cost and complexity. Texas also has strong homestead protection laws that protect your home from most creditors.</p>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #D0D8E8', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1A2A4A', fontSize: 15, fontWeight: 700, margin: '0 0 14px', fontFamily: 'system-ui, sans-serif' }}>📋 Texas Estate Planning Tools at a Glance</h2>
          {[
            { tool: 'Transfer on Death Deed (TODD)', desc: 'Names beneficiary on deed — recorded during life, takes effect at death. Revocable. $25 filing fee.', texas: 'YES' },
            { tool: 'Lady Bird Deed (Enhanced Life Estate)', desc: 'Keeps full control during life including ability to sell. Superior Medicaid protection.', texas: 'YES' },
            { tool: 'Community Property Survivorship', desc: 'Converts community property to survivorship — spouse gets home automatically.', texas: 'YES' },
            { tool: 'Revocable Living Trust', desc: 'Controls all assets, incapacity planning, handles multiple properties.', texas: 'YES' },
          ].map(({ tool, desc, texas }) => (
            <div key={tool} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #E8EEF4' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#1A2A4A', fontWeight: 700, fontSize: 13, fontFamily: 'system-ui, sans-serif' }}>{tool}</div>
                <div style={{ color: '#5A6A8A', fontSize: 12, marginTop: 2, fontFamily: 'system-ui, sans-serif' }}>{desc}</div>
              </div>
              <div style={{ background: '#E8F4E8', color: '#2A6A2A', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4, flexShrink: 0, fontFamily: 'system-ui, sans-serif' }}>TX ✓</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #D0D8E8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#1A2A4A', fontSize: 16, fontWeight: 700, margin: '0 0 20px', fontFamily: 'system-ui, sans-serif' }}>🔍 Get Your DFW Estate Plan Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#5A6A8A', fontSize: 13, display: 'block', marginBottom: 6, fontFamily: 'system-ui, sans-serif' }}>Your Estate Planning Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', background: '#FAFAF7', color: '#1A1A2E', border: '1px solid #B0C8D0', borderRadius: 8, fontSize: 14, fontFamily: 'system-ui, sans-serif' }}>
              <option value="">Select your situation</option>
              {situations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {result && (
            <div style={{ background: '#F4F8FF', borderRadius: 10, padding: 20, marginTop: 8, border: '2px solid #1A3A6A' }}>
              <div style={{ background: '#1A2A4A', color: '#F5E642', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, fontFamily: 'system-ui, sans-serif', lineHeight: 1.5 }}>{result.headline}</div>
              <div style={{ color: '#1A2A4A', fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>🏛️ Recommended Structure: {result.structure}</div>
              {result.texasTools.map(tool => (
                <div key={tool.name} style={{ background: '#FFFFFF', border: '1px solid #C0D0E4', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                  <div style={{ color: '#1A2A4A', fontWeight: 700, fontSize: 13, marginBottom: 6, fontFamily: 'system-ui, sans-serif' }}>{tool.name}</div>
                  <div style={{ color: '#3A4A6A', fontSize: 13, marginBottom: 6, fontFamily: 'system-ui, sans-serif' }}><strong>How:</strong> {tool.how}</div>
                  <div style={{ color: '#2A6A2A', fontSize: 12, marginBottom: 4, fontFamily: 'system-ui, sans-serif' }}>✓ {tool.pros}</div>
                  <div style={{ color: '#8A4A20', fontSize: 12, fontFamily: 'system-ui, sans-serif' }}>⚠ {tool.cons}</div>
                </div>
              ))}
              {[
                { label: '🏠 Texas Homestead Note', value: result.homesteadNote, color: '#2A4A6A' },
                { label: '💰 Estimated Cost', value: result.cost, color: '#1A2A4A' },
                { label: '🚨 Urgency', value: result.urgency, color: '#6A1A1A' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <div style={{ color: '#1A2A4A', fontSize: 12, fontWeight: 700, marginBottom: 4, fontFamily: 'system-ui, sans-serif' }}>{label}</div>
                  <div style={{ color, fontSize: 13, lineHeight: 1.5, fontFamily: 'system-ui, sans-serif' }}>{value}</div>
                </div>
              ))}
              <div style={{ marginTop: 8 }}>
                <div style={{ color: '#1A2A4A', fontSize: 12, fontWeight: 700, marginBottom: 8, fontFamily: 'system-ui, sans-serif' }}>✅ Next Steps</div>
                {result.nextSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#1A3A6A', fontWeight: 700, fontSize: 13, flexShrink: 0, fontFamily: 'system-ui, sans-serif' }}>{i + 1}.</span>
                    <span style={{ color: '#2A3A5A', fontSize: 13, lineHeight: 1.5, fontFamily: 'system-ui, sans-serif' }}>{step}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FFF8E0', border: '1px solid #D0B040', borderRadius: 6, padding: 10, marginTop: 14 }}>
                <p style={{ color: '#5A4010', fontSize: 12, margin: 0, fontFamily: 'system-ui, sans-serif' }}>⚖️ This guide is for general information only — not legal advice. Consult a Texas estate planning attorney before filing any deeds or creating estate documents.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
