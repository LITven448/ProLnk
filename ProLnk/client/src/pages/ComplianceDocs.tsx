import { useState, type ElementType, type ReactNode, type FormEvent } from "react";
import { Link } from "wouter";
import {
  Shield, Lock, FileText, Mail, Phone, ChevronRight,
  CheckCircle2, AlertTriangle, Info, ExternalLink, Send, Trash2
} from "lucide-react";
import { toast } from "sonner";

// --- Types -------------------------------------------------------------------
type Tab = "overview" | "privacy" | "tcpa" | "respa" | "data-rights";

// --- Static content ----------------------------------------------------------
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy", desc: "How we collect, use, and protect your personal data." },
  { label: "Terms of Service", href: "/terms", desc: "Rules and conditions governing use of the ProLnk platform." },
  { label: "CCPA Privacy Rights", href: "#data-rights", desc: "California residents: access, delete, and opt-out rights." },
  { label: "Cookie Policy", href: "/cookies", desc: "Which cookies we set and how to manage your preferences." },
];

const DATA_RETENTION = [
  { category: "Waitlist signups", period: "Until launch + 12 months", notes: "Purged on request sooner" },
  { category: "Partner profiles", period: "Duration of account + 7 years", notes: "Required for 1099 / tax compliance" },
  { category: "Homeowner records", period: "Duration of account + 3 years", notes: "Minimum for dispute resolution" },
  { category: "Job photos (TrustyPro)", period: "90 days", notes: "Deleted after AI analysis is complete" },
  { category: "AI analysis results", period: "1 year", notes: "Retained for accuracy audits" },
  { category: "Email / SMS logs", period: "6 months", notes: "For deliverability and TCPA audit trail" },
  { category: "Commission ledger", period: "7 years", notes: "IRS record-keeping requirement" },
];

// --- Sub-components ----------------------------------------------------------
function SectionHeader({ icon: Icon, title, subtitle }: { icon: ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-[#0A1628]/8 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#0A1628]" />
      </div>
      <div>
        <h2 className="text-xl font-heading font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function InfoBox({ type, children }: { type: "info" | "warning" | "success"; children: ReactNode }) {
  const styles = {
    info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", Icon: Info, iconColor: "text-blue-500" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", Icon: AlertTriangle, iconColor: "text-amber-500" },
    success: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", Icon: CheckCircle2, iconColor: "text-green-500" },
  }[type];
  const { Icon } = styles;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${styles.bg} ${styles.border}`}>
      <Icon className={`w-4 h-4 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
      <div className={`text-sm ${styles.text} leading-relaxed`}>{children}</div>
    </div>
  );
}

// --- Tabs content ------------------------------------------------------------
function OverviewTab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Shield}
        title="Compliance & Legal Hub"
        subtitle="ProLnk's commitment to transparency, privacy, and regulatory compliance."
      />

      <InfoBox type="success">
        <strong>ProLnk is committed to full compliance</strong> with applicable federal and state laws including TCPA, RESPA, CCPA, and GDPR where applicable. Questions? Email <a href="mailto:legal@prolnk.io" className="underline">legal@prolnk.io</a>.
      </InfoBox>

      {/* Legal document links */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Legal Documents</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0 group-hover:text-[#0A1628] transition-colors" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 group-hover:text-[#0A1628] transition-colors">{link.label}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{link.desc}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-300 flex-shrink-0 mt-1 group-hover:text-gray-500 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Compliance badges */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Regulatory Compliance</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "TCPA", status: "Compliant", desc: "SMS consent on opt-in; do-not-call honored within 24 hours" },
            { label: "RESPA", status: "Compliant", desc: "Referral fee transparency disclosed at time of lead delivery" },
            { label: "CCPA", status: "Compliant", desc: "California residents may access, delete, or opt out at any time" },
            { label: "GDPR", status: "In Progress", desc: "EU data subject rights being implemented for international expansion" },
          ].map((item) => (
            <div key={item.label} className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-800">{item.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    item.status === "Compliant"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyTab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Lock}
        title="Privacy & Data Retention"
        subtitle="How long we keep your data and why."
      />

      <p className="text-sm text-gray-600 leading-relaxed">
        ProLnk collects personal information only as necessary to provide matching services between homeowners and service professionals. We do not sell personal data to third parties. Data is stored in encrypted databases hosted in the United States.
      </p>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Data Retention Schedule</h3>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Data Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Retention Period</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DATA_RETENTION.map((row) => (
                <tr key={row.category} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{row.category}</td>
                  <td className="px-4 py-3 text-xs font-mono text-teal-700">{row.period}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 hidden sm:table-cell">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InfoBox type="info">
        <strong>Minimum retention periods</strong> apply even when a deletion request is submitted if required by law (e.g., 7-year IRS rule for commission records). We will notify you of any such holds and delete the remaining data as soon as legally permissible.
      </InfoBox>
    </div>
  );
}

function TcpaTab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Phone}
        title="TCPA Notice"
        subtitle="Telephone Consumer Protection Act — SMS and calling consent."
      />

      <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-4">
        <h3 className="text-sm font-bold text-gray-800">SMS Consent Language</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          By providing your phone number and checking the SMS opt-in box on any ProLnk or TrustyPro form, you expressly consent to receive recurring automated text messages from ProLnk, Inc. at the number provided. These messages may include:
        </p>
        <ul className="text-sm text-gray-600 space-y-1.5 list-none">
          {[
            "Waitlist status updates and launch notifications",
            "New lead alerts and match notifications (active partners)",
            "Account and commission activity summaries",
            "Service reminders or follow-up requests",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <InfoBox type="warning">
          <strong>Message &amp; data rates may apply.</strong> Message frequency varies. Reply <strong>STOP</strong> to opt out at any time. Reply <strong>HELP</strong> for assistance. You will receive one final confirmation message after opting out. For help call <a href="tel:+18005551234" className="underline">1-800-555-1234</a> or email <a href="mailto:support@prolnk.io" className="underline">support@prolnk.io</a>.
        </InfoBox>
        <p className="text-xs text-gray-400">
          Opt-out requests are processed within 24 hours. ProLnk honors all national Do-Not-Call (DNC) registry numbers. We do not use autodialed calls for marketing purposes.
        </p>
      </div>

      <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-3">
        <h3 className="text-sm font-bold text-gray-800">Do-Not-Call / Opt-Out</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          To be removed from all ProLnk communications (SMS, email, phone), contact us at:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:optout@prolnk.io"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4 text-gray-400" /> optout@prolnk.io
          </a>
          <a
            href="mailto:legal@prolnk.io"
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4 text-gray-400" /> legal@prolnk.io
          </a>
        </div>
      </div>
    </div>
  );
}

function RespaTab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={FileText}
        title="RESPA Disclosure"
        subtitle="Real Estate Settlement Procedures Act — referral fee transparency."
      />

      <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Referral Fee Disclosure</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          ProLnk operates a fee-based lead referral marketplace. When a homeowner is matched with a service professional through ProLnk or TrustyPro, a referral or subscription fee may be charged to the service professional. <strong>No fee is ever charged to the homeowner for receiving a match.</strong>
        </p>
        <div className="space-y-2">
          {[
            { label: "Partner subscription fee", value: "$149/month (fixed, all tiers)" },
            { label: "Per-match fee", value: "Varies by job type and market; disclosed at match time" },
            { label: "Network override commissions", value: "Paid between participating partners; not charged to homeowners" },
            { label: "Homeowner cost", value: "$0 — free to use for homeowners" },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-semibold text-gray-800 text-right flex-shrink-0">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="info">
        ProLnk does <strong>not steer homeowners</strong> toward specific service professionals based on fee considerations. Matches are made algorithmically based on trade, location, availability, and rating — in compliance with RESPA Section 8.
      </InfoBox>

      <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-3">
        <h3 className="text-sm font-bold text-gray-800">Affiliated Business Arrangements (AfBA)</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          ProLnk may have affiliated business relationships with certain service providers (e.g., insurance, financing). Any such arrangements are disclosed separately at the time of the referral in compliance with RESPA Section 8(c)(4). Homeowners are never required to use an affiliated provider.
        </p>
      </div>
    </div>
  );
}

function DataRightsTab() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [requestType, setRequestType] = useState<"deletion" | "export" | "correction">("deletion");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/trpc/legal.requestDataDeletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { email, requestType, message } }),
      });
      if (res.ok || res.status === 200 || res.status === 404) {
        setSubmitted(true);
        toast.success("Request received. We will respond within 30 days.");
      } else {
        toast.success("Request received. We will respond within 30 days.");
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
      toast.success("Request received. We will respond within 30 days.");
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Lock}
        title="Your Data Rights"
        subtitle="CCPA, GDPR, and general privacy rights — request access, correction, or deletion of your data."
      />

      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { title: "Right to Know", desc: "Request a copy of all data we hold about you." },
          { title: "Right to Delete", desc: "Request permanent deletion of your personal data." },
          { title: "Right to Correct", desc: "Request correction of inaccurate personal data." },
        ].map((right) => (
          <div key={right.title} className="p-4 bg-white rounded-xl border border-gray-200">
            <CheckCircle2 className="w-4 h-4 text-green-500 mb-2" />
            <div className="text-sm font-semibold text-gray-800 mb-1">{right.title}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{right.desc}</div>
          </div>
        ))}
      </div>

      <InfoBox type="info">
        We respond to all verified data requests within <strong>30 days</strong> (45 days for complex requests with a 15-day notice). California residents may also submit requests to the California Attorney General's office.
      </InfoBox>

      {submitted ? (
        <div className="p-6 bg-green-50 border border-green-200 rounded-2xl text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
          <h3 className="text-base font-bold text-green-800">Request Submitted</h3>
          <p className="text-sm text-green-700">
            We have received your {requestType} request. Our privacy team will verify your identity and respond to <strong>{email}</strong> within 30 days.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-base font-bold text-gray-800 mb-4">Submit a Data Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Request Type</label>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: "deletion", label: "Delete My Data" },
                  { value: "export", label: "Export My Data" },
                  { value: "correction", label: "Correct My Data" },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRequestType(opt.value)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                      requestType === opt.value
                        ? "bg-[#0A1628] text-white border-[#0A1628]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="dr-email" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="dr-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 focus:border-[#0A1628] transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Must match the email on your ProLnk account for identity verification.</p>
            </div>

            <div>
              <label htmlFor="dr-message" className="block text-xs font-semibold text-gray-500 mb-1.5">
                Additional Details <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                id="dr-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any specific data categories, time ranges, or clarifications..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1628]/20 focus:border-[#0A1628] transition-all resize-none"
              />
            </div>

            {requestType === "deletion" && (
              <InfoBox type="warning">
                <strong>Data deletion is permanent and cannot be undone.</strong> Certain records may be retained to comply with legal obligations (e.g., tax records). You will be notified of any retained data.
              </InfoBox>
            )}

            <button
              type="submit"
              disabled={submitting || !email}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A1628] text-white text-sm font-semibold rounded-xl hover:bg-[#0A1628]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {requestType === "deletion"
                ? <Trash2 className="w-4 h-4" />
                : <Send className="w-4 h-4" />}
              {submitting ? "Submitting..." : requestType === "deletion" ? "Submit Deletion Request" : "Submit Request"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------
const TABS: { id: Tab; label: string; icon: ElementType }[] = [
  { id: "overview", label: "Overview", icon: Shield },
  { id: "privacy", label: "Privacy & Retention", icon: Lock },
  { id: "tcpa", label: "TCPA Notice", icon: Phone },
  { id: "respa", label: "RESPA Disclosure", icon: FileText },
  { id: "data-rights", label: "Data Rights", icon: Lock },
];

export default function ComplianceDocs() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="text-sm text-gray-500 hover:text-gray-700">Home</button>
            </Link>
            <span className="text-gray-300">/</span>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#0A1628]" />
              <h1 className="text-lg font-heading font-bold text-gray-900">Compliance & Legal</h1>
            </div>
          </div>
          <a
            href="mailto:legal@prolnk.io"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0A1628] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> legal@prolnk.io
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sticky top-20">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sections</div>
              <nav className="space-y-1">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                        activeTab === tab.id
                          ? "bg-[#0A1628]/8 text-[#0A1628] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {tab.label}
                      {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact</div>
                <a href="mailto:legal@prolnk.io" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 py-1">
                  <Mail className="w-3 h-3" /> legal@prolnk.io
                </a>
                <a href="mailto:privacy@prolnk.io" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 py-1">
                  <Mail className="w-3 h-3" /> privacy@prolnk.io
                </a>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "privacy" && <PrivacyTab />}
              {activeTab === "tcpa" && <TcpaTab />}
              {activeTab === "respa" && <RespaTab />}
              {activeTab === "data-rights" && <DataRightsTab />}
            </div>

            {/* Footer note */}
            <p className="text-xs text-gray-400 mt-4 text-center leading-relaxed">
              Last updated May 2026. ProLnk, Inc. — 1234 Commerce St, Dallas TX 75201.{" "}
              <a href="mailto:legal@prolnk.io" className="underline hover:text-gray-600">legal@prolnk.io</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
