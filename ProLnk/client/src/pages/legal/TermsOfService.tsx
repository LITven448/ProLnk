import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";

const LAST_UPDATED = "March 29, 2026";
const COMPANY = "ProLnk Technologies, LLC";
const EMAIL = "legal@prolnk.com";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            Last updated: {LAST_UPDATED}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500">
            These Terms of Service govern your use of the ProLnk and TrustyPro platforms operated by {COMPANY}.
            By creating an account or using our services, you agree to these terms.
          </p>
        </div>

        {[
          {
            title: "1. Acceptance of Terms",
            body: `By accessing or using the ProLnk partner platform or the TrustyPro homeowner platform (collectively, the "Services"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use the Services. ${COMPANY} reserves the right to update these terms at any time with notice provided via email or in-app notification.`,
          },
          {
            title: "2. Description of Services",
            body: `ProLnk is a partner network platform that enables home service professionals ("Partners") to log jobs, identify cross-sell opportunities using AI-powered photo analysis, and earn referral commissions. TrustyPro is a homeowner platform that enables homeowners to build a digital home profile, receive AI-analyzed maintenance suggestions, and connect with verified home service professionals.`,
          },
          {
            title: "3. Eligibility",
            body: `You must be at least 18 years of age to use the Services. Partners must hold any licenses, certifications, or insurance required by applicable law to perform the services they offer. ${COMPANY} reserves the right to verify credentials and suspend or terminate accounts that do not meet eligibility requirements.`,
          },
          {
            title: "4. Partner Terms",
            body: `Partners agree to: (a) provide accurate information about their business, services, and service area; (b) maintain required licenses and insurance; (c) complete background check verification as required; (d) respond to leads within the timeframe specified in their tier agreement; (e) not circumvent the platform to conduct business with homeowners outside the ProLnk system for a period of 12 months after introduction. Commission rates, tier pricing, and referral structures are defined in the Partner Agreement and may be updated with 30 days notice.`,
          },
          {
            title: "5. Homeowner Terms",
            body: `Homeowners agree to: (a) provide accurate property information; (b) grant ProLnk and its Partners a limited license to photograph and analyze their property for the purpose of generating maintenance suggestions; (c) not use the platform to solicit services outside the platform from Partners introduced through TrustyPro for a period of 6 months after introduction. Homeowner accounts are free. We do not charge homeowners for receiving suggestions, viewing partner profiles, or scheduling estimates.`,
          },
          {
            title: "6. AI Photo Analysis",
            body: `By uploading photos to the platform, you grant ${COMPANY} a non-exclusive, royalty-free license to process those photos using artificial intelligence for the purpose of generating maintenance suggestions and partner match recommendations. Photos may be used to improve our AI models in anonymized, aggregated form if you have provided consent in your privacy settings. You may withdraw this consent at any time in your account settings.`,
          },
          {
            title: "7. Payments and Commissions",
            body: `Partner subscription fees are billed monthly or annually as selected at signup. Commission payments are processed via Stripe Connect and subject to the commission structure defined in the Partner Agreement. ${COMPANY} reserves the right to withhold commissions in cases of suspected fraud, policy violations, or disputed transactions. Refunds for subscription fees are available within 7 days of initial purchase only.`,
          },
          {
            title: "8. Intellectual Property",
            body: `The ProLnk and TrustyPro platforms, including all software, AI models, brand assets, and content, are the exclusive property of ${COMPANY}. You may not copy, modify, distribute, or create derivative works from any part of the platform without express written permission. The AI-generated property analysis, before/after mockups, and opportunity reports generated by the platform are the property of ${COMPANY} and licensed to you for personal use only.`,
          },
          {
            title: "9. Disclaimers and Limitation of Liability",
            body: `The Services are provided "as is" without warranty of any kind. ${COMPANY} does not guarantee the accuracy of AI-generated property assessments, the quality of work performed by Partners, or the availability of specific Partners in your area. To the maximum extent permitted by law, ${COMPANY}'s total liability to you for any claim arising from use of the Services shall not exceed the amount you paid to ${COMPANY} in the 12 months preceding the claim.`,
          },
          {
            title: "10. Termination",
            body: `Either party may terminate an account at any time. ${COMPANY} may suspend or terminate accounts for violations of these Terms, non-payment, or any conduct that ${COMPANY} determines, in its sole discretion, is harmful to the platform or other users. Upon termination, your right to use the Services ceases immediately. Data retention following termination is governed by our Privacy Policy.`,
          },
          {
            title: "11. Governing Law",
            body: `These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved by binding arbitration in Dallas County, Texas, except that either party may seek injunctive relief in a court of competent jurisdiction.`,
          },
          {
            title: "12. Contact",
            body: `For questions about these Terms, contact us at ${EMAIL} or by mail at ${COMPANY}, Dallas, TX.`,
          },
        ].map(({ title, body }) => (
          <section key={title} className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
          </section>
        ))}

        {/* Footer nav */}
        <div className="border-t border-gray-200 pt-8 flex flex-wrap gap-4 text-sm text-indigo-600">
          <Link href="/privacy"><span className="hover:underline cursor-pointer">Privacy Policy</span></Link>
          <Link href="/ccpa"><span className="hover:underline cursor-pointer">CCPA Data Rights</span></Link>
          <Link href="/cookies"><span className="hover:underline cursor-pointer">Cookie Policy</span></Link>
        </div>
      </div>
    </div>
  );
}
