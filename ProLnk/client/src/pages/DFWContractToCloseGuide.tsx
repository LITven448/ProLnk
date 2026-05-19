import { useState } from 'react';

const issueTypes = [
  'Inspection found major defects (roof, foundation, HVAC)',
  'Inspection found minor items (deferred maintenance)',
  'Appraisal came in below contract price',
  'Buyer requested repairs or credit',
  'Financing contingency — buyer loan denied',
  'Financing contingency — buyer changing lenders',
  'Title issue found (lien, boundary dispute)',
  'Buyer requesting contract extension',
  'Final walkthrough — buyer found new damage',
  'Buyer trying to back out after option period',
];

const issueGuide: Record<string, { action: string; rights: string; attorney: boolean }> = {
  'Inspection found major defects (roof, foundation, HVAC)': {
    action: 'You have three options in Texas: repair, offer a credit at closing, or refuse and let buyer decide. Get contractor quotes immediately — a real number beats a buyer\’s inflated repair estimate every time. Major defects don\’t automatically kill the deal; how you respond does.',
    rights: 'In Texas, sellers are not required to make any repairs — even after inspection. The buyer\’s option period gives them the right to terminate for any reason, but once the option expires, they must close or risk their earnest money.',
    attorney: false,
  },
  'Inspection found minor items (deferred maintenance)': {
    action: 'Offer a modest closing cost credit ($500-1,500) rather than doing repairs yourself. Buyers prefer cash credits — they control the vendor. Avoid the negotiation of specific repair line items; move to a lump sum credit and close the chapter.',
    rights: 'Minor items are not grounds for termination after the option period. If buyer raises them post-option, your agent can firmly decline — you already provided full disclosure and the home is sold as-is after option expires.',
    attorney: false,
  },
  'Appraisal came in below contract price': {
    action: 'You have four paths: (1) Reduce price to appraised value, (2) Meet buyer halfway, (3) Dispute the appraisal with comps your agent pulls, (4) Hold firm and let buyer make up the gap in cash. In DFW\’s volatile market, appraisal gaps are common — many buyers expect to cover them.',
    rights: 'If the contract has an appraisal contingency, buyer can terminate if value comes in low. If they waived appraisal contingency (common in competitive DFW offers), they must close at contract price regardless of appraised value.',
    attorney: false,
  },
  'Buyer requested repairs or credit': {
    action: 'Counter every repair request with a cash credit at closing rather than agreeing to do the work. This keeps you in control, avoids disputes about workmanship, and keeps the timeline clean. Budget: offer 40-60% of what they asked as a credit and meet in the middle.',
    rights: 'After the option period expires in Texas, you are not obligated to make repairs or provide credits. Any credits agreed to must be memorialized in an amendment signed by both parties.',
    attorney: false,
  },
  'Financing contingency — buyer loan denied': {
    action: 'Immediately request written documentation of loan denial from buyer\’s lender. This triggers the financing contingency. You are entitled to release from contract and should get your home back on market within 24-48 hours. Return the earnest money — do not fight it.',
    rights: 'If the financing contingency is in the contract and the buyer provides timely written notice of loan denial, you must release the earnest money and the contract terminates. Fighting this is usually not worth the delay.',
    attorney: false,
  },
  'Financing contingency — buyer changing lenders': {
    action: 'Require written confirmation from the new lender of loan approval within 5 business days. Do not grant unlimited time. If the new lender cannot approve within that window, you have the right to terminate. Switching lenders mid-contract is a red flag — watch the timeline carefully.',
    rights: 'The contract\’s financing deadline is a hard deadline. If buyer misses it without written extension agreement, you may have grounds to terminate and keep earnest money depending on contract language. Involve your agent immediately.',
    attorney: true,
  },
  'Title issue found (lien, boundary dispute)': {
    action: 'Do not panic — title issues are resolved before closing, not after. Your title company will identify what needs to be cleared. If it\’s a lien (contractor, HOA, IRS), you\’ll pay it at closing from proceeds. If it\’s a boundary dispute, you may need a survey and potentially a court order.',
    rights: 'Texas contracts typically require sellers to deliver clear, marketable title. If you cannot clear a title issue before the closing date, the buyer has the right to terminate. Most title issues are resolvable with time — request an extension.',
    attorney: true,
  },
  'Buyer requesting contract extension': {
    action: 'Evaluate the reason before agreeing. Financing delays — grant 7-10 days max. Appraisal delays — grant 5-7 days. Vague "scheduling" reasons — ask your agent to press for specifics before agreeing. Always execute an amendment with a new firm closing date.',
    rights: 'You are not obligated to grant extensions. If the buyer cannot close by the contract date, you may have the right to terminate and retain earnest money depending on who caused the delay. Never extend verbally — always use a written amendment.',
    attorney: false,
  },
  'Final walkthrough — buyer found new damage': {
    action: 'If damage occurred during your ownership after the contract date (moving damage, a/c failure, appliance breakdown), you are responsible. Offer a credit equal to repair cost. If the buyer is manufacturing concerns that existed at inspection, have your agent compare walkthrough notes to inspection report.',
    rights: 'You must deliver the home in substantially the same condition as at contract signing. New damage between contract and closing is your responsibility. Pre-existing conditions already disclosed are not.',
    attorney: false,
  },
  'Buyer trying to back out after option period': {
    action: 'Do not release earnest money voluntarily. The earnest money is your protection for a buyer who terminates without contractual grounds after the option period. Document everything. Have your agent communicate through official channels only.',
    rights: 'After the Texas option period expires, the buyer has very limited grounds to terminate without forfeiting earnest money. Grounds include: failed financing contingency, appraisal contingency, or seller breach. Buyer cold feet is not grounds — and you are entitled to earnest money in most cases.',
    attorney: true,
  },
};

const stages = [
  { name: '📝 Offer Accepted', days: 'Day 0', items: ['Execute all addenda','Deliver earnest money instructions to buyer','Schedule option period end date on calendar'] },
  { name: '🔍 Inspection Period', days: 'Days 1-10', items: ['Allow buyer\’s inspector full access','Prepare any pre-inspection disclosures','Negotiate repair requests or credits by option deadline'] },
  { name: '🏦 Appraisal', days: 'Days 7-21', items: ['Provide access for appraiser','Have your agent pull supporting comps','Prepare for appraisal gap conversation if DFW market is volatile'] },
  { name: '💼 Financing', days: 'Days 7-30', items: ['Monitor buyer\’s financing deadline','Request proof of loan approval at deadline','Flag any lender delays to your agent immediately'] },
  { name: '📜 Title Work', days: 'Days 1-30', items: ['Title company searches for liens and encumbrances','Clear any outstanding HOA dues or contractor liens','Review preliminary title commitment'] },
  { name: '🚶 Final Walkthrough', days: 'Day before close', items: ['Leave home in listing condition (no new damage)','Remove all personal property per contract','Confirm utilities on through closing date'] },
  { name: '🎉 Closing', days: 'Closing Day', items: ['Bring keys, garage openers, and manuals','Sign closing documents (can often be done early/remote)','Confirm wire instructions directly with title company (never via email)'] },
];

export default function DFWContractToCloseGuide() {
  const [issueType, setIssueType] = useState('');
  const guide = issueType ? issueGuide[issueType] : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui,sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>🔐</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>Contract to Close — DFW Seller Guide</h1>
          <p style={{ color: '#CBD5E1', margin: 0 }}>What happens at each stage after accepting an offer, what you must do, and how to handle contract issues without losing your deal.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 The DFW Close Timeline</h2>
          {stages.map(s => (
            <div key={s.name} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</span>
                <span style={{ background: '#F1F5F9', color: '#475569', fontSize: 11, padding: '2px 7px', borderRadius: 4 }}>{s.days}</span>
              </div>
              {s.items.map(item => <div key={item} style={{ fontSize: 12, color: '#334155', marginLeft: 4, marginBottom: 2 }}>• {item}</div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>⚠️ Handle a Contract Issue</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}>Select the issue you're facing for guidance, your rights, and when to involve an attorney.</p>
          <select value={issueType} onChange={e => setIssueType(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, background: '#fff', color: '#0A1628', marginBottom: 14 }}>
            <option value=''>Select contract issue</option>
            {issueTypes.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
          {guide && (
            <div>
              <div style={{ background: '#FFFBEA', border: '1px solid #F5E642', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>✅ What to Do</div>
                <p style={{ fontSize: 13, color: '#334155', margin: 0, lineHeight: 1.6 }}>{guide.action}</p>
              </div>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#1D4ED8' }}>⚖️ Your Seller Rights</div>
                <p style={{ fontSize: 13, color: '#1E3A5F', margin: 0, lineHeight: 1.6 }}>{guide.rights}</p>
              </div>
              {guide.attorney && (
                <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#BE123C' }}>⚠️ Consider Involving a Real Estate Attorney</div>
                  <div style={{ fontSize: 12, color: '#9F1239', marginTop: 3 }}>This issue has legal complexity that goes beyond what your agent can advise on. A Texas real estate attorney review is recommended before responding.</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, color: '#CBD5E1', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Wire Fraud Warning:</span> Title company wire instructions MUST be confirmed by calling the title company directly using a number you find independently — never from an email or DocuSign. Wire fraud in DFW real estate transactions is common. One call prevents a catastrophic loss.
        </div>
      </div>
    </div>
  );
}
