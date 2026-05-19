import { useState } from 'react';

const FAQS = [
  {
    q: 'Am I an employee of ProLnk or an independent contractor?',
    a: 'You are an independent contractor, not an employee. ProLnk is a lead marketplace — we connect you with homeowners who need your services. You set your own schedule, prices, and service area. No taxes are withheld from your earnings, and you are responsible for your own self-employment taxes. ProLnk does not control how you perform your work.',
  },
  {
    q: 'Can I partner with ProLnk in multiple states?',
    a: 'Yes. You can set service areas across multiple states. However, you are responsible for holding the proper licenses in each state where you operate. ProLnk will verify your licenses per state before activating you for leads in that state.',
  },
  {
    q: 'What if a homeowner sues a pro I referred?',
    a: 'If you referred a pro to ProLnk (as part of the Network Income System), you are not legally liable for that pro\’s work. You are not their employer, partner, or guarantor. However, each pro is required to carry general liability insurance that protects against claims from homeowners.',
  },
  {
    q: 'Is ProLnk compliant with RESPA for real estate-adjacent work?',
    a: 'Yes. RESPA (Real Estate Settlement Procedures Act) prohibits kickbacks for referrals on federally related mortgage transactions. ProLnk\’s lead matching is based on trade, geography, and availability — not financial incentives between pros and real estate agents. Our system does not allow steering homeowners to specific pros for financial benefit.',
  },
  {
    q: 'What does the Independent Contractor Agreement cover?',
    a: 'The IC Agreement covers: (1) your classification as an independent contractor, (2) your obligation to carry proper insurance and licensing, (3) ProLnk\’s right to remove you from the platform for violations, (4) payment terms for commissions, (5) confidentiality of homeowner data, and (6) dispute resolution procedures.',
  },
  {
    q: 'Does ProLnk share my personal information with homeowners?',
    a: 'ProLnk shares your trade, service area, ratings, and business name with homeowners during the matching process. We do not share your home address, personal phone number, or Social Security Number. Homeowners communicate with you through the platform\’s messaging system until you choose to share direct contact.',
  },
  {
    q: 'Can ProLnk terminate my account without notice?',
    a: 'ProLnk reserves the right to suspend or terminate accounts for violations of the Terms of Service, including fraud, misrepresentation of credentials, homeowner complaints, insurance lapses, or abusive behavior. We provide notice except in cases of immediate safety concerns.',
  },
  {
    q: 'Who is responsible if I damage a homeowner\’s property?',
    a: 'You are responsible for any damage caused by your work. This is why ProLnk requires general liability insurance — it protects both you and the homeowner. ProLnk does not indemnify pros for damage claims. Your GL policy should cover third-party property damage.',
  },
  {
    q: 'Can homeowners sue ProLnk for the quality of a pro\’s work?',
    a: 'ProLnk is a marketplace, not a contractor. Our Terms of Service explicitly state that ProLnk does not guarantee the quality of any service performed by a pro. Homeowners agree to this when signing up. Any quality dispute is between the homeowner and the pro.',
  },
  {
    q: 'What happens to my earnings if I\’m suspended?',
    a: 'Earned commissions for completed matches are paid out on the regular payout schedule, even if your account is later suspended. Pending commissions for disputed matches may be held until the dispute is resolved. Commissions for fraudulent activity are forfeited.',
  },
  {
    q: 'Am I required to accept every lead ProLnk sends me?',
    a: 'No. You are free to accept or decline any lead. There is no penalty for declining leads within your service area. However, consistently declining leads may result in reduced match priority.',
  },
  {
    q: 'Can I set my own prices for jobs?',
    a: 'Yes. ProLnk provides 3 competitive quotes to homeowners, but each pro sets their own pricing independently. You compete on price, response time, and ratings. ProLnk does not dictate or cap your pricing.',
  },
  {
    q: 'What are the TCPA requirements for contacting homeowners?',
    a: 'TCPA (Telephone Consumer Protection Act) requires that any marketing SMS or phone calls to homeowners are based on proper consent. Homeowners who submit their information through ProLnk consent to be contacted by matched pros about their service request. You may NOT add them to third-party marketing lists or contact them about unrelated services.',
  },
  {
    q: 'How does CCPA affect me as a pro on ProLnk?',
    a: 'CCPA (California Consumer Privacy Act) gives California residents rights over their data. If you serve California homeowners, you must honor data deletion requests and not sell or share their personal data. ProLnk handles CCPA compliance at the platform level for data we control.',
  },
  {
    q: 'Can I recruit other pros to ProLnk?',
    a: 'Yes — this is the Network Income System\’s Stream 2. You earn override commissions on earnings from pros you recruit, up to 4 levels deep. Recruitment must be honest and transparent. Misrepresenting ProLnk\’s earning potential to recruits is a violation of the Terms.',
  },
  {
    q: 'What happens if a homeowner files a fraudulent complaint?',
    a: 'ProLnk has a dispute resolution process. You can submit evidence (job photos, messages, receipts) to contest any complaint. ProLnk reviews both sides. If a complaint is found to be fraudulent, it is removed from your record and the homeowner may be warned or removed from the platform.',
  },
  {
    q: 'Is there a non-compete clause in the contractor agreement?',
    a: 'No. ProLnk does not prevent you from working with other lead platforms, your own clients, or competitors. You are free to grow your business in any way you choose. We only ask that you honor confidentiality around homeowner contact data obtained through ProLnk.',
  },
  {
    q: 'How are earnings reported for tax purposes?',
    a: 'ProLnk issues 1099-NEC forms to pros earning $600 or more in a calendar year. Earnings are reported to the IRS. You are responsible for paying self-employment tax on your ProLnk income. Consult a tax professional to set up quarterly estimated payments.',
  },
  {
    q: 'What is ProLnk\’s privacy policy summary?',
    a: 'ProLnk collects name, contact info, trade info, license numbers, and service area data. This data is used to match you with homeowners, process commissions, and improve the platform. We do not sell your personal data to advertisers. Data is encrypted in transit and at rest. You can request data deletion at any time.',
  },
  {
    q: 'How do I delete my ProLnk account and data?',
    a: 'Go to Account Settings → Privacy → Request Data Deletion. Your account will be deactivated within 24 hours and all personal data deleted within 30 days, except data required for legal and tax compliance (which is retained for 7 years per IRS rules).',
  },
];

export default function ProLnkLegalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#1e293b', color: '#94a3b8', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            ⚖️ Legal & Policy
          </span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2, color: '#f1f5f9′ }}>
          ProLnk Legal & Policy FAQ
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40 }}>
          Straight answers to the 20 most common legal and policy questions from pros and homeowners. Not legal advice — consult an attorney for your specific situation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 10, overflow: 'hidden' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '18px 24px',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.5, flex: 1 }}>
                  Q{i + 1}: {faq.q}
                </span>
                <span style={{ fontSize: 18, color: '#64748b', flexShrink: 0, transform: openIndex === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: '0 24px 20px', borderTop: '1px solid #334155′ }}>
                  <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7, margin: '16px 0 0′ }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24 }}>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0, lineHeight: 1.6 }}>
            ⚠️ This FAQ is for informational purposes only and does not constitute legal advice. Laws vary by state and situation. For legal questions specific to your business, consult a licensed attorney. Last updated May 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
