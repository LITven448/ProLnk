import { useState } from 'react';

const faqs = [
  {
    q: "🌐 How does the 4-level ProLnk network work?",
    a: "When you join ProLnk as a pro and refer another pro who activates their account, you earn a percentage of their match income indefinitely. That is level 1. If your level-1 recruit refers another pro, that is level 2 and you earn from that pro too. The cascade goes 4 levels deep. Rates: 7% from direct recruits at level 1, 4% from level 2, 2% from level 3, and 1% from level 4. Network income compounds as your recruits build their own networks across DFW."
  },
  {
    q: "💰 When does network income pay out?",
    a: "Network income is calculated on the 1st of each month for the prior month's activity and paid via ACH direct deposit by the 10th. You receive an itemized statement showing each level-1, 2, 3, and 4 contributor, their match volume, and your percentage share. Minimum payout threshold is $25. Amounts below that roll to the next month. There is no cap on network income. Pros in mature networks with 50 or more active recruits across all 4 levels have earned $3,000-$8,000 per month in network income alone."
  },
  {
    q: "What if a pro I recruited cancels their account?",
    a: "If a pro you directly recruited cancels, your network income from that individual stops. However, their recruits at your level 2 remain active and you continue earning from them. Cancellations at lower levels cascade similarly. You lose that node but retain all active nodes below it. ProLnk tracks all 4 levels dynamically so your network income statement always reflects current active accounts only. High cancellation rates at level 1 indicate you are recruiting poor fits."
  },
  {
    q: "🔧 Can I recruit pros from any trade in DFW?",
    a: "Yes. ProLnk accepts pros across all licensed home service trades: HVAC, plumbing, electrical, roofing, foundation repair, general contracting, painting, landscaping, pool service, pest control, and more. The broader your recruiting across trades, the more resilient your network income. A slow HVAC month does not hurt if plumbing and roofing are strong. Target pros who are already busy with referral work since they are more likely to activate and earn consistently."
  },
  {
    q: "🏡 How do origination rights work?",
    a: "When you help a DFW homeowner register their property in the Home Health Vault, you earn permanent origination rights to that home. Origination rights entitle you to a 1.5% share of ProLnk's platform fee on every job completed at that address, indefinitely, even if the home changes owners. A pro with origination rights on 200 DFW homes earning a $150 average platform fee per job receives $2.25 per job at each of those homes. Across a portfolio of active homes, this becomes significant passive income."
  },
  {
    q: "🤔 Is ProLnk's network income system an MLM?",
    a: "ProLnk's network income is a referral override system, not a multi-level marketing scheme. In MLM, participants primarily earn by recruiting others with no real product. In ProLnk's model, the primary income is job-based match income earned by completing real home service work for real homeowners. Network income is a secondary bonus for growing the platform's pro supply. Pros who never recruit still earn their full match commissions. There are no recruitment fees and no required minimum purchases."
  },
  {
    q: "📈 What is the Charter tier network advantage?",
    a: "Charter Pros, the first 25 in the DFW network, earn enhanced network rates: 7/4/2/1% versus standard 6/3/1.5/0.75% for later joiners. Charter status also grants a first-mover recruiting advantage. The best DFW pros are recruited early, and your level-1 recruits quality determines your long-term network income. Charter Pros who recruit actively in their first 90 days typically establish the strongest networks because the platform's early growth period drives the highest pro conversion rates."
  },
  {
    q: "🔗 How do I track my network and recruit performance?",
    a: "Your ProLnk pro dashboard includes a Network tab with a visual tree of your 4-level recruits, their activation status, monthly match volume, and your income from each. You receive a monthly network income statement itemized by level. Recruiting tools in the dashboard include your personal referral link, a pre-written text and email template, and a QR code for in-person sharing. You can see which of your recruits are actively booking jobs and which are dormant."
  },
  {
    q: "🏆 What is the subscription override for referring pros?",
    a: "When a pro you refer activates their ProLnk subscription at $149 per month, you earn 12% of their monthly subscription fee indefinitely, which is $17.88 per month per active subscription. If you have 20 active subscription referrals, that is $357.60 per month in passive subscription override income regardless of job volume. Subscription overrides pay on the same monthly cycle as network job income. This stream is particularly valuable in slow job months since subscription overrides are fixed regardless of DFW seasonal demand fluctuations."
  },
  {
    q: "📋 What disclosures does ProLnk provide about network income?",
    a: "ProLnk provides an annual Income Disclosure Statement showing average network income by tier level and tenure. This is published on the ProLnk website and available to all prospective pros before signing up. Average monthly network income varies significantly. Pros who recruit actively earn more and pros who never recruit earn zero network income. ProLnk does not guarantee income levels and is transparent that network income is supplemental. Primary income comes from completing DFW home service jobs. Review the full disclosure before making enrollment decisions based on projected network income."
  }
];

export default function DFWProNetworkFAQ2026() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW ProLnk Pro Network FAQs 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Top 10 questions about the ProLnk 4-level pro network income system</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#0F2040′ : '#0D1E35', border: '1px solid #1E3A5F', borderRadius: 10, padding: '16px 20px', cursor: ’pointer', transition: 'all 0.2s' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{faq.q}</div>
              {selected === i && (
                <div style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.7, marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F' }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36, padding: 20, backgroundColor: '#0D1E35', borderRadius: 10, border: '1px solid #F5E642′ }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Ready to build your DFW pro network?</p>
          <p style={{ color: '#8899AA', fontSize: 13 }}>Charter spots are limited to 25 DFW pros. Join now to lock in the highest network rates.</p>
        </div>
      </div>
    </div>
  );
}