import { useState } from 'react';

const situations = ['First time selling','Selling quickly (relocation/job)','Luxury home ($1M+)','Investment property','Competitive DFW market','Slow DFW market','Fixer-upper','Estate/inherited'];

const termAdvice: Record<string, { negotiate: string[]; redFlags: string[]; include: string[] }> = {
  'First time selling': {
    negotiate: ['Ask for 90-day listing period (not 6 months)','Negotiate 5% total commission if possible','Include 30-day cancellation clause with 30-day notice'],
    redFlags: ['6-month listing period with no exit clause','Commission higher than 6% without justification','Vague marketing obligations in contract'],
    include: ['Price reduction trigger clause (if no offer in 21 days)','Open house schedule commitment','Weekly reporting requirement from agent'],
  },
  'Selling quickly (relocation/job)': {
    negotiate: ['Shorter listing period (60 days)','Pre-approved price reduction schedule','Flexible commission if agent also handles purchase'],
    redFlags: ['No urgency language in marketing plan','Agent unwilling to commit to 7-day listing','Automatic renewal clauses'],
    include: ['Firm closing date language','Right to accept backup offers','Virtual showing authorization'],
  },
  'Luxury home ($1M+)': {
    negotiate: ['Tiered commission (lower base + bonus at price target)','Concierge marketing budget from agent','International MLS exposure requirement'],
    redFlags: ['No luxury network mentioned','Standard MLS-only marketing plan','Commission over 6% with no luxury services included'],
    include: ['Lifestyle photography + video requirement','Exclusive preview period before public list','Minimum days before price reduction without seller consent'],
  },
  'Investment property': {
    negotiate: ['Reduced commission (investor volume)','Non-exclusive listing option','Quick-close incentive clause'],
    redFlags: ['Agents unfamiliar with cap rate pricing','No investor buyer network mentioned','Long exclusive period'],
    include: ['Tenant notification language (if occupied)','As-is sale disclosure','1031 exchange timeline considerations'],
  },
  'Competitive DFW market': {
    negotiate: ['45-day listing period (homes move fast)','Offer review deadline clause','Escalation clause guidance in contract'],
    redFlags: ['No mention of offer deadline strategy','Unwilling to hold offers for review period','No experience with multiple-offer situations'],
    include: ['Pre-inspection authorization','Backup offer acceptance clause','Above-list offer handling instructions'],
  },
  'Slow DFW market': {
    negotiate: ['90-day listing with 30-day cancellation right','Price reduction schedule after 21 DOM','Agent-funded staging credit'],
    redFlags: ['No price reduction strategy discussed','Commission above market without extras','Overconfident pricing without comps'],
    include: ['Showing feedback reporting (weekly)','Open house frequency commitment','Buyer broker incentive language'],
  },
  'Fixer-upper': {
    negotiate: ['Lower commission reflecting lower price point','Cash buyer outreach commitment','Quick close allowance'],
    redFlags: ['Agent prices at retail without renovation context','No contractor network mentioned','Overpromising after-repair value'],
    include: ['As-is addendum','Disclosure requirements addressed','Investor showing facilitation'],
  },
  'Estate/inherited': {
    negotiate: ['Extended listing period (estate admin takes time)','Probate sale experience requirement','Executor authorization language'],
    redFlags: ['No probate experience','Pushing for immediate low-price sale','No coordination with estate attorney'],
    include: ['Multiple beneficiary notification process','Court approval contingency if needed','Personal property removal timeline'],
  },
};

const standardTerms = [
  ['Commission Rate','Typically 5-6% total in DFW; split between listing and buyer agents'],
  ['Listing Period','Standard 90-180 days; negotiate shorter with cancellation clause'],
  ['Exclusive vs Non-Exclusive','Most DFW agents require exclusive — you cannot list with another agent during period'],
  ['Cancellation Terms','Always negotiate 30-day written notice cancellation right'],
  ['Price Reduction Authority','Agent should need your written approval for any reduction'],
  ['Marketing Obligations','Should specify: MLS, photography, open houses, digital marketing'],
];

export default function DFWListingAgreementGuide() {
  const [situation, setSituation] = useState('');
  const advice = situation ? termAdvice[situation] : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui,sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 24px', marginBottom: 28 }}>
          <div style={{ fontSize: 28 }}>📋</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Listing Agreement Guide</h1>
          <p style={{ color: '#CBD5E1', margin: 0 }}>What's in a listing contract, what you can negotiate, and what must be included to protect your interests.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📄 What's in a DFW Listing Contract</h2>
          {standardTerms.map(([term, desc]) => (
            <div key={term} style={{ background: '#F8FAFC', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{term}</div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 2 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 20, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>🎯 Your Situation → What to Negotiate</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 10 }}>Select your situation for specific listing agreement guidance.</p>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, background: '#fff', color: '#0A1628', marginBottom: 14 }}>
            <option value=''>Select your situation</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {advice && (
            <div>
              <div style={{ background: '#FFFBEA', border: '1px solid #F5E642', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>💬 Terms to Negotiate</div>
                {advice.negotiate.map(n => <div key={n} style={{ fontSize: 13, marginBottom: 4 }}>✅ {n}</div>)}
              </div>
              <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#BE123C' }}>🚩 Red Flags</div>
                {advice.redFlags.map(r => <div key={r} style={{ fontSize: 13, marginBottom: 4, color: '#9F1239′ }}>✕ {r}</div>)}
              </div>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: '#15803D' }}>📌 Must Include in Contract</div>
                {advice.include.map(i => <div key={i} style={{ fontSize: 13, marginBottom: 4, color: '#166534′ }}>• {i}</div>)}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: 18, color: '#CBD5E1', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Commission Reality:</span> In competitive DFW markets, some agents will negotiate commission — especially if you're buying your next home through them, if the home is priced above $600K, or if it’s a fast-moving submarket where their time investment is lower.
        </div>
      </div>
    </div>
  );
}
