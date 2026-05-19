import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";

const LAST_UPDATED = "March 29, 2026";
const EMAIL = "privacy@prolnk.com";

export default function CCPARights() {
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
            <Shield className="w-4 h-4" />
            Last updated: {LAST_UPDATED}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">CCPA Data Rights</h1>
          <p className="text-gray-500">
            This page describes the rights of California residents under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA) as they apply to your use of ProLnk and TrustyPro.
          </p>
        </div>

        {[
          {
            title: "Your Rights as a California Resident",
            body: `Under the CCPA and CPRA, California residents have the following rights regarding their personal information: (1) Right to Know — you may request disclosure of the categories and specific pieces of personal information we have collected about you, the sources of that information, the business purpose for collecting it, and the categories of third parties with whom we share it. (2) Right to Delete — you may request deletion of personal information we have collected from you, subject to certain exceptions. (3) Right to Correct — you may request correction of inaccurate personal information we maintain about you. (4) Right to Opt Out of Sale — we do not sell personal information. (5) Right to Limit Use of Sensitive Personal Information — you may limit our use of sensitive personal information to that which is necessary to provide the Services. (6) Right to Non-Discrimination — we will not discriminate against you for exercising any of these rights.`,
          },
          {
            title: "Categories of Personal Information We Collect",
            body: `We collect the following categories of personal information: Identifiers (name, email, phone number, IP address); Property and Home Data (address, home characteristics, improvement history, project wish list); Commercial Information (subscription tier, payment history); Internet Activity (pages visited, features used, device information); Photos and Images (property photos you upload); Inferences (AI-generated property assessments, partner match scores).`,
          },
          {
            title: "Sensitive Personal Information",
            body: `We collect the following sensitive personal information: precise geolocation (property address used for partner matching); photos of your home interior and exterior. We use this information only to provide the Services and do not use it for advertising or profiling purposes unrelated to the Services.`,
          },
          {
            title: "Data Retention",
            body: `We retain personal information for as long as your account is active. After account deletion: personal identifiers are deleted within 90 days; property photos are deleted within 30 days (unless you consented to AI training use); anonymized, aggregated data may be retained indefinitely for analytics and AI model improvement.`,
          },
          {
            title: "How to Submit a Request",
            body: `To exercise any of your CCPA rights, you may: (1) Email us at ${EMAIL} with the subject line "CCPA Request"; (2) Use the Data Rights section in your account Privacy Settings. We will respond to verified requests within 45 days. We may extend this period by an additional 45 days when reasonably necessary, with notice. We will verify your identity before processing any request to protect your information.`,
          },
          {
            title: "Authorized Agents",
            body: `You may designate an authorized agent to submit a CCPA request on your behalf. To use an authorized agent, provide written permission signed by you and a copy of your government-issued ID to ${EMAIL}. We may still contact you directly to verify your identity.`,
          },
          {
            title: "Contact",
            body: `For CCPA-related questions, contact our Privacy Team at ${EMAIL}.`,
          },
        ].map(({ title, body }) => (
          <section key={title} className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
          </section>
        ))}

        <div className="border-t border-gray-200 pt-8 flex flex-wrap gap-4 text-sm text-indigo-600">
          <Link href="/terms"><span className="hover:underline cursor-pointer">Terms of Service</span></Link>
          <Link href="/privacy"><span className="hover:underline cursor-pointer">Privacy Policy</span></Link>
          <Link href="/cookies"><span className="hover:underline cursor-pointer">Cookie Policy</span></Link>
        </div>
      </div>
    </div>
  );
}
