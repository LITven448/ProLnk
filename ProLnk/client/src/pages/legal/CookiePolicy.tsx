import { Link } from "wouter";
import { ArrowLeft, Cookie } from "lucide-react";

const LAST_UPDATED = "March 29, 2026";
const EMAIL = "privacy@prolnk.com";

export default function CookiePolicy() {
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
            <Cookie className="w-4 h-4" />
            Last updated: {LAST_UPDATED}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-gray-500">
            This Cookie Policy explains how ProLnk Technologies, LLC uses cookies and similar technologies on the ProLnk and TrustyPro platforms.
          </p>
        </div>

        {[
          {
            title: "What Are Cookies",
            body: `Cookies are small text files stored on your device when you visit a website. They allow the website to remember your preferences, keep you logged in, and understand how you use the site. We also use similar technologies such as local storage and session storage for the same purposes.`,
          },
          {
            title: "Cookies We Use",
            body: `We use the following types of cookies: (1) Essential Cookies — required for the platform to function. These include session cookies that keep you logged in and security cookies that prevent cross-site request forgery. You cannot opt out of essential cookies. (2) Functional Cookies — remember your preferences such as your selected tier, notification settings, and dashboard layout. (3) Analytics Cookies — help us understand how users interact with the platform so we can improve it. We use privacy-respecting analytics that do not track you across other websites. (4) We do not use advertising or tracking cookies.`,
          },
          {
            title: "Session Authentication",
            body: `We use a secure, HTTP-only session cookie to keep you authenticated. This cookie is set when you log in and expires when you log out or after 30 days of inactivity. It is essential to the operation of the platform and cannot be disabled.`,
          },
          {
            title: "Managing Cookies",
            body: `You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that blocking essential cookies will prevent you from logging in and using the platform. To clear your session, use the Sign Out button in your account menu rather than deleting cookies directly.`,
          },
          {
            title: "Changes to This Policy",
            body: `We may update this Cookie Policy from time to time. We will notify you of material changes via email or in-app notification.`,
          },
          {
            title: "Contact",
            body: `For questions about our use of cookies, contact us at ${EMAIL}.`,
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
          <Link href="/ccpa"><span className="hover:underline cursor-pointer">CCPA Data Rights</span></Link>
        </div>
      </div>
    </div>
  );
}
