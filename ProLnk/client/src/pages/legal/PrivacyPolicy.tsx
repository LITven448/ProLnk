import { Link } from "wouter";
import { ArrowLeft, Lock } from "lucide-react";

const LAST_UPDATED = "March 29, 2026";
const COMPANY = "ProLnk Technologies, LLC";
const EMAIL = "privacy@prolnk.com";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            Last updated: {LAST_UPDATED}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500">
            This Privacy Policy describes how {COMPANY} collects, uses, and protects information about users of the ProLnk and TrustyPro platforms.
          </p>
        </div>

        {[
          {
            title: "1. Information We Collect",
            body: `We collect information you provide directly, including: name, email address, phone number, business information (for Partners), and property information (for Homeowners). We collect property photos you upload for AI analysis. We collect usage data including pages visited, features used, and actions taken within the platform. We collect device and browser information for security and performance purposes.`,
          },
          {
            title: "2. Property and Home Data",
            body: `For TrustyPro homeowners, we collect detailed property information including: property address, home type, year built, square footage, bedroom and bathroom count, lot size, presence of pool, garage, and fence, home systems and their ages, improvement history, project wish list with budgets and urgency levels, style preferences, and property photos. This data is used to generate AI-powered maintenance suggestions, match homeowners with qualified Partners, and improve our AI models (with your consent).`,
          },
          {
            title: "3. How We Use Your Information",
            body: `We use collected information to: operate and improve the platform; generate AI-powered property analysis and partner match recommendations; process payments and commissions; send transactional emails and notifications; comply with legal obligations; and improve our AI models in anonymized, aggregated form (with consent). We do not sell your personal information to third parties. We do not use your information for advertising purposes outside the platform.`,
          },
          {
            title: "4. AI Photo Analysis",
            body: `Photos you upload are processed by our AI systems to identify property features, maintenance needs, and improvement opportunities. Photos are stored securely in encrypted cloud storage. With your consent (which you can manage in Privacy Settings), anonymized photo data may be used to improve our AI models. You may delete your photos at any time from your account settings, which will also remove them from our AI training pipeline.`,
          },
          {
            title: "5. Data Sharing",
            body: `We share information with Partners only as necessary to fulfill service requests you have accepted. We share data with Stripe for payment processing. We use third-party services including cloud storage, email delivery, and analytics — all governed by data processing agreements. We may disclose information if required by law, court order, or to protect the rights and safety of our users.`,
          },
          {
            title: "6. Data Retention",
            body: `We retain your account data for as long as your account is active. After account deletion, we retain anonymized, aggregated data indefinitely for analytics and AI model improvement. Personal data is deleted within 90 days of account deletion, except where retention is required by law. Property photos are deleted within 30 days of account deletion unless you have explicitly consented to their use in AI training.`,
          },
          {
            title: "7. Your Rights",
            body: `You have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; withdraw consent for AI training at any time; opt out of non-transactional communications. California residents have additional rights under CCPA — see our CCPA Data Rights page. To exercise any of these rights, contact us at ${EMAIL}.`,
          },
          {
            title: "8. Security",
            body: `We use industry-standard encryption for data in transit and at rest. Access to personal data is restricted to employees and contractors who need it to perform their job functions. We conduct regular security reviews. In the event of a data breach, we will notify affected users within 72 hours as required by applicable law.`,
          },
          {
            title: "9. Children's Privacy",
            body: `The Services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will delete it immediately.`,
          },
          {
            title: "10. Changes to This Policy",
            body: `We may update this Privacy Policy from time to time. We will notify you of material changes via email or in-app notification at least 30 days before the changes take effect. Your continued use of the Services after the effective date constitutes acceptance of the updated policy.`,
          },
          {
            title: "11. Contact",
            body: `For privacy questions or to exercise your rights, contact our Privacy Team at ${EMAIL} or by mail at ${COMPANY}, Dallas, TX.`,
          },
        ].map(({ title, body }) => (
          <section key={title} className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
          </section>
        ))}

        <div className="border-t border-gray-200 pt-8 flex flex-wrap gap-4 text-sm text-indigo-600">
          <Link href="/terms"><span className="hover:underline cursor-pointer">Terms of Service</span></Link>
          <Link href="/ccpa"><span className="hover:underline cursor-pointer">CCPA Data Rights</span></Link>
          <Link href="/cookies"><span className="hover:underline cursor-pointer">Cookie Policy</span></Link>
        </div>
      </div>
    </div>
  );
}
