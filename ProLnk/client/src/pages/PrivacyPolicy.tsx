import { Link } from "wouter";
import { ArrowLeft, Lock } from "lucide-react";

const EFFECTIVE_DATE = "January 1, 2026″;
const COMPANY = "ProLnk Technologies, LLC";
const PRIVACY_EMAIL = "privacy@prolnk.io";

const sections = [
  {
    title: "1. What Information We Collect",
    body: `We collect information you provide directly when you sign up or use ProLnk or TrustyPro:

• Identity & contact: full name, email address, phone number, and mailing address
• Business information (Partners only): company name, trade license numbers, insurance policy details, service area, and years in business
• Property information (Homeowners only): property address, home type, square footage, year built, home systems and their ages, and improvement history
• Photos: images you upload for AI-assisted analysis of your home or completed work
• Payment information: processed via Stripe — we never store raw card numbers
• Usage data: pages visited, features used, match history, and session activity
• Device and browser data: IP address, browser type, and operating system (for security and performance purposes)`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use your information to operate and improve the ProLnk platform:

• Match Partners with Homeowners based on trade, location, and job type
• Calculate and process commissions and subscription billing
• Send transactional emails (confirmations, match alerts, payout notices)
• Detect and prevent fraud and policy violations
• Improve our AI matching models using anonymized, aggregated data
• Comply with tax reporting obligations (e.g., 1099 forms for Partners earning over $20,000/year)
• Respond to support requests and account inquiries

We do not use your information for advertising to third parties.`,
  },
  {
    title: "3. Do We Sell Your Data?",
    body: `No. ProLnk does not sell, rent, or trade your personal information to any third party — ever.

We are a marketplace, not a data broker. Your information exists to help you get matched, get paid, or get your home serviced. That is the only use.`,
  },
  {
    title: "4. Home Health Vault Data",
    body: `Photos and property data you add to the Home Health Vault are treated with the highest level of care:

• Photos are processed on our secure, encrypted servers to generate AI-powered maintenance insights
• Your home data is never sold to advertisers, data brokers, or competitors
• Your home data is never shared with other homeowners or made publicly visible
• With your explicit consent, anonymized and aggregated structural data may contribute to improving our AI models — you can revoke this consent at any time in Privacy Settings
• You may delete all photos and property data from your account at any time

Your home data belongs to you. We are the custodian, not the owner.`,
  },
  {
    title: "5. Data Sharing",
    body: `We share your information only as necessary to deliver the service:

• With matched Partners: limited profile details are shared when a match is accepted (name, contact info, job details)
• With Stripe: payment and identity data required to process transactions and issue payouts
• With cloud infrastructure providers: encrypted storage and email delivery (all governed by data processing agreements)
• With law enforcement or courts: only if legally required by subpoena, court order, or to prevent imminent harm

We do not share your data with social media platforms, advertising networks, or analytics providers who would use it for their own commercial purposes.`,
  },
  {
    title: "6. Cookies",
    body: `We use minimal cookies. Specifically:

• Session cookie: keeps you logged in during your browser session (expires when you close the tab)
• Authentication token: a secure, HttpOnly cookie storing your login state across sessions

We do not use advertising cookies, tracking pixels, or third-party analytics cookies. No cookie consent banner is required because we only use essential cookies necessary for the platform to function.`,
  },
  {
    title: "7. How to Request Deletion of Your Data",
    body: `You have the right to request deletion of your personal data at any time.

To submit a deletion request, email ${PRIVACY_EMAIL} with the subject line "Data Deletion Request" and include the email address associated with your account. We will confirm receipt within 3 business days and complete deletion within 30 days.

Upon deletion:
• Your account and personal data are permanently removed
• Property photos are deleted within 30 days
• Anonymized, aggregated transaction data (with no identifying information) may be retained for analytics
• Records required by law (e.g., tax records for paid partners) are retained for the legally required period

California residents have additional rights under CCPA — see Section 9 below.`,
  },
  {
    title: "8. Security",
    body: `We take security seriously:

• All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
• Access to personal data is restricted to employees and contractors who need it to perform their role
• We conduct regular security reviews and penetration testing
• In the event of a data breach affecting your personal information, we will notify you within 72 hours as required by applicable law`,
  },
  {
    title: "9. Your Rights (CCPA / GDPR)",
    body: `Regardless of where you live, you have the right to:

• Access the personal data we hold about you
• Correct inaccurate information
• Request deletion of your data (see Section 7)
• Withdraw consent for AI model training at any time
• Opt out of non-transactional communications at any time via the unsubscribe link in any email

California residents (CCPA): You have the additional right to know what categories of data we have collected, to opt out of any sale of personal information (we do not sell data), and to non-discriminatory service when exercising your rights.

EU/UK residents (GDPR): You may also request portability of your data and lodge a complaint with your local supervisory authority.

To exercise any of these rights, contact ${PRIVACY_EMAIL}.`,
  },
  {
    title: "10. Children's Privacy",
    body: `ProLnk and TrustyPro are not directed at children under 13. We do not knowingly collect personal information from children under 13. If we discover that we have collected such data, we will delete it immediately. Contact ${PRIVACY_EMAIL} if you believe a child's data has been submitted.`,
  },
  {
    title: "11. Changes to This Policy",
    body: `We may update this Privacy Policy to reflect changes in law, our practices, or our services. For material changes, we will notify you by email or in-app notice at least 30 days before the change takes effect. Your continued use of the platform after the effective date constitutes acceptance of the updated policy.`,
  },
  {
    title: "12. Contact Us",
    body: `Privacy questions, data requests, or concerns:\n\nEmail: ${PRIVACY_EMAIL}\nMail: ${COMPANY}, Dallas, TX\n\nWe respond to all privacy inquiries within 5 business days.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a1628″, fontFamily: "'Inter', sans-serif" }}>
      <div style={{ backgroundColor: "#0d1f3c", borderBottom: "1px solid #1e3a5f" }} className="sticky top-0 z-10″>
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm transition-colors" style={{ color: "#7aa3cc" }}>
              <ArrowLeft className="w-4 h-4″ /> Back to Home
            </button>
          </Link>
          <div className="flex items-center gap-2 text-sm" style={{ color: "#4a6fa0″ }}>
            <Lock className="w-4 h-4″ />
            Effective: {EFFECTIVE_DATE}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10″>
        <div>
          <h1 className="text-3xl font-black mb-3″ style={{ color: "#e8f0fe" }}>Privacy Policy</h1>
          <p style={{ color: "#7aa3cc" }} className="leading-relaxed">
            This Privacy Policy describes how {COMPANY} collects, uses, and protects information about
            users of the ProLnk and TrustyPro platforms. We believe privacy should be simple: we collect
            what we need, we protect it carefully, and we never sell it.
          </p>
        </div>

        {sections.map(({ title, body }) => (
          <section key={title} className="space-y-3″>
            <h2 className="text-base font-bold" style={{ color: "#3b82f6″ }}>{title}</h2>
            <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#a8c4e0″ }}>
              {body}
            </div>
          </section>
        ))}

        <div style={{ borderTop: "1px solid #1e3a5f" }} className="pt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/terms"><span className="hover:underline cursor-pointer" style={{ color: "#3b82f6″ }}>Terms of Service</span></Link>
          <Link href="/ccpa"><span className="hover:underline cursor-pointer" style={{ color: "#3b82f6″ }}>CCPA Data Rights</span></Link>
          <Link href="/cookies"><span className="hover:underline cursor-pointer" style={{ color: "#3b82f6″ }}>Cookie Policy</span></Link>
        </div>
      </div>
    </div>
  );
}
