import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";

const EFFECTIVE_DATE = "January 1, 2026";
const COMPANY = "ProLnk Technologies, LLC";
const LEGAL_EMAIL = "legal@prolnk.io";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By creating an account or using the ProLnk partner platform or the TrustyPro homeowner platform (collectively, the "Services"), you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the Services.

${COMPANY} may update these Terms at any time. For material changes, we will provide notice via email or in-app notification at least 30 days before changes take effect. Continued use of the Services after the effective date constitutes acceptance.`,
  },
  {
    title: "2. What ProLnk Does",
    body: `ProLnk is a home services marketplace. We connect licensed home service professionals ("Partners") with homeowners who need quotes and services. We facilitate matches, track jobs, and pay commissions — but we are not a party to any service agreement between a Partner and a Homeowner. All work is contracted directly between Partners and Homeowners.`,
  },
  {
    title: "3. Partner Requirements",
    body: `To use ProLnk as a Partner, you must:

• Be at least 18 years of age
• Hold all licenses, certifications, and permits required by your state and trade to legally perform the services you offer
• Maintain active general liability insurance of at least $1,000,000 per occurrence
• Pass a background check as required by ProLnk before receiving live leads
• Provide accurate information about your business, service area, and trade specialties

${COMPANY} reserves the right to verify credentials at any time. Accounts found to be out of compliance will be suspended with 7 days' notice, except in cases of fraud or imminent harm, which may result in immediate suspension.`,
  },
  {
    title: "4. Platform Fees",
    body: `ProLnk charges a platform fee of 6–15% of the job value, depending on trade category:

• Standard trades (landscaping, cleaning, painting): 6–8%
• Skilled trades (HVAC, plumbing, electrical): 10–12%
• Specialty and high-value jobs: up to 15%

The applicable fee for each trade is displayed in your Partner dashboard before you accept any lead. Fees are deducted from commission disbursements, not charged separately.`,
  },
  {
    title: "5. Commission Payments",
    body: `Partner commissions are calculated monthly and paid via Stripe Connect. Payment terms:

• Commissions are processed on the 1st of each month for the prior month's completed jobs
• Minimum payout threshold: $25 — balances under $25 roll over to the next month
• Payments are deposited to your connected bank account within 3–5 business days of processing
• Founding Network members: your subscription rate and commission tier are locked for the life of your membership as stated in your Founding Member Agreement — we will not raise rates on existing Founding members

${COMPANY} may withhold commissions pending investigation of suspected fraud, policy violations, or disputed transactions. We will notify you in writing within 2 business days if a hold is placed on your account.`,
  },
  {
    title: "6. Founding Network Members",
    body: `If you joined ProLnk as a Charter, Founding, or early-tier member, your subscription rate and commission percentage are locked in your membership agreement and will not increase while your membership remains active. Rate locks apply to the specific tier you enrolled in. Upgrades to a higher tier are voluntary and subject to the rates in effect at the time of upgrade.`,
  },
  {
    title: "7. Prohibited Conduct",
    body: `The following are prohibited and may result in immediate account suspension and forfeiture of pending commissions:

• Off-platform transactions: completing work for a homeowner you met through ProLnk outside the platform within 12 months of introduction
• False job logs: submitting job records for work not performed or inflating job values to increase commissions
• Competitor recruiting: using ProLnk's platform or lead data to recruit Partners for a competing platform
• Sharing or selling homeowner contact information obtained through ProLnk
• Creating multiple accounts to circumvent restrictions or earn duplicate commissions
• Misrepresenting your license status, insurance coverage, or trade qualifications`,
  },
  {
    title: "8. Account Suspension and Termination",
    body: `${COMPANY} may suspend or terminate your account for violations of these Terms, non-payment of subscription fees, or conduct determined to be harmful to the platform or other users.

For standard violations: 7 days' written notice is provided before suspension, during which you may respond or appeal.

For serious violations (fraud, off-platform transactions, data misuse): immediate suspension without prior notice. You will be notified in writing within 24 hours.

Upon termination, your access to the platform ceases and pending commissions for completed jobs remain payable per normal schedule unless withheld for cause. Data retention following termination is governed by our Privacy Policy.`,
  },
  {
    title: "9. Homeowner Terms",
    body: `Homeowner accounts are free. We do not charge homeowners for receiving quotes, viewing partner profiles, or scheduling estimates.

Homeowners agree to:
• Provide accurate property information and contact details
• Not solicit additional work from Partners introduced through ProLnk outside the platform for a period of 6 months after introduction
• Not share Partner contact information from ProLnk with competing platforms

Homeowners grant ${COMPANY} a limited, non-exclusive license to process uploaded photos using AI systems for the purpose of generating maintenance suggestions and partner match recommendations.`,
  },
  {
    title: "10. Intellectual Property",
    body: `The ProLnk and TrustyPro platforms — including all software, AI models, brand assets, matching algorithms, and content — are the exclusive property of ${COMPANY}. Our lead matching algorithm and network income system are patent pending.

You may not copy, reverse-engineer, scrape, or create derivative works from any part of the platform without express written permission. AI-generated reports and analysis are licensed to you for personal use only and may not be resold or redistributed.`,
  },
  {
    title: "11. Disclaimers and Limitation of Liability",
    body: `The Services are provided "as is." ${COMPANY} does not guarantee the accuracy of AI-generated assessments, the quality of work performed by Partners, or the availability of specific Partners in your area. We facilitate connections — we do not employ Partners or guarantee outcomes.

To the maximum extent permitted by law, ${COMPANY}'s total liability to you for any claim arising from use of the Services shall not exceed the greater of (a) the amount you paid to ${COMPANY} in the 3 months preceding the claim, or (b) $100.`,
  },
  {
    title: "12. Arbitration",
    body: `Any dispute arising from or relating to these Terms or your use of the Services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.

• Arbitration will be conducted in Dallas County, Texas
• The arbitrator's decision is final and binding
• Each party bears its own arbitration costs unless the arbitrator finds the claim was frivolous
• Either party may seek emergency injunctive relief in a court of competent jurisdiction to prevent irreparable harm

By using the Services, you waive the right to a jury trial and to participate in a class action lawsuit.`,
  },
  {
    title: "13. Governing Law",
    body: `These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any action not subject to arbitration shall be brought exclusively in the state or federal courts located in Dallas County, Texas.`,
  },
  {
    title: "14. Contact",
    body: `For questions about these Terms or to report a violation:\n\nEmail: ${LEGAL_EMAIL}\nMail: ${COMPANY}, Dallas, TX\n\nWe respond to all legal inquiries within 5 business days.`,
  },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a1628", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ backgroundColor: "#0d1f3c", borderBottom: "1px solid #1e3a5f" }} className="sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm transition-colors" style={{ color: "#7aa3cc" }}>
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </Link>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#4a6fa0" }}>
            <FileText className="w-4 h-4" />
            Effective: {EFFECTIVE_DATE}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-black mb-3" style={{ color: "#e8f0fe" }}>Terms of Service</h1>
          <p style={{ color: "#7aa3cc" }} className="leading-relaxed">
            These Terms govern your use of the ProLnk and TrustyPro platforms operated by {COMPANY}.
            We've written them to be readable, not just legally defensible. If something is unclear, email us.
          </p>
        </div>

        {sections.map(({ title, body }) => (
          <section key={title} className="space-y-3">
            <h2 className="text-base font-bold" style={{ color: "#3b82f6" }}>{title}</h2>
            <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#a8c4e0" }}>
              {body}
            </div>
          </section>
        ))}

        <div style={{ borderTop: "1px solid #1e3a5f" }} className="pt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy"><span className="hover:underline cursor-pointer" style={{ color: "#3b82f6" }}>Privacy Policy</span></Link>
          <Link href="/ccpa"><span className="hover:underline cursor-pointer" style={{ color: "#3b82f6" }}>CCPA Data Rights</span></Link>
          <Link href="/cookies"><span className="hover:underline cursor-pointer" style={{ color: "#3b82f6" }}>Cookie Policy</span></Link>
        </div>
      </div>
    </div>
  );
}
