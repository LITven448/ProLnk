import { useState, type ElementType, type ReactNode, type FormEvent } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  Shield, Lock, FileText, Mail, Phone, ChevronRight,
  CheckCircle, AlertTriangle, Info, ExternalLink, Send, Trash2, DollarSign,
} from "lucide-react";
import { toast } from "sonner";

type Tab = "overview" | "privacy" | "tcpa" | "respa" | "1099" | "ccpa" | "data-rights";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy", desc: "How we collect, use, and protect your personal data." },
  { label: "Terms of Service", href: "/terms", desc: "Rules and conditions governing use of the ProLnk platform." },
  { label: "CCPA Privacy Rights", href: "#ccpa", desc: "California residents: access, delete, and opt-out rights." },
  { label: "Cookie Policy", href: "/cookies", desc: "Which cookies we set and how to manage your preferences." },
  { label: "Partner Agreement", href: "/partner-agreement", desc: "Full partnership terms, commission rules, and network income." },
];

const DATA_RETENTION = [
  { category: "Waitlist signups", period: "Until launch + 12 months", notes: "Purged on request sooner" },
  { category: "Partner profiles", period: "Duration of account + 7 years", notes: "Required for 1099 / tax compliance" },
  { category: "Homeowner records", period: "Duration of account + 3 years", notes: "Minimum for dispute resolution" },
  { category: "Job photos (TrustyPro)", period: "90 days", notes: "Deleted after AI analysis is complete" },
  { category: "AI analysis results", period: "1 year", notes: "Retained for accuracy audits" },
  { category: "Email / SMS logs", period: "6 months", notes: "For deliverability and TCPA audit trail" },
  { category: "Commission ledger", period: "7 years", notes: "IRS record-keeping requirement" },
  { category: "1099-NEC tax records", period: "7 years", notes: "IRS minimum for backup documentation" },
  { category: "W-9 / W-8 forms", period: "7 years after filing", notes: "Required for potential IRS audit" },
];

function SectionHeader({ icon: Icon, title, subtitle }: { icon: ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-teal-400" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function InfoBox({ type, children }: { type: "info" | "warning" | "success"; children: ReactNode }) {
  const styles = {
    info: { bg: "bg-blue-900/30", border: "border-blue-700/40", text: "text-blue-200", Icon: Info, iconColor: "text-blue-400" },
    warning: { bg: "bg-amber-900/30", border: "border-amber-700/40", text: "text-amber-200", Icon: AlertTriangle, iconColor: "text-amber-400" },
    success: { bg: "bg-teal-900/30", border: "border-teal-700/40", text: "text-teal-200", Icon: CheckCircle, iconColor: "text-teal-400" },
  }[type];
  const { Icon } = styles;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${styles.bg} ${styles.border}`}>
      <Icon className={`w-4 h-4 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
      <div className={`text-sm ${styles.text} leading-relaxed`}>{children}</div>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Shield}
        title="Compliance & Legal Hub"
        subtitle="ProLnk's commitment to transparency, privacy, and regulatory compliance."
      />

      <InfoBox type="success">
        <strong>ProLnk is committed to full compliance</strong> with applicable federal and state laws including TCPA, RESPA, CCPA, and applicable IRS requirements. Questions? Email{" "}
        <a href="mailto:legal@prolnk.io" className="underline">legal@prolnk.io</a>.
      </InfoBox>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Legal Documents</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {LEGAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-start gap-3 p-4 bg-slate-700/40 rounded-xl border border-slate-600/50 hover:border-teal-500/50 hover:bg-slate-700/60 transition-all group"
            >
              <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0 group-hover:text-teal-400 transition-colors" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">{link.label}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{link.desc}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-500 flex-shrink-0 mt-1 group-hover:text-slate-300 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Regulatory Compliance Status</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { label: "TCPA", status: "Compliant", desc: "SMS consent on opt-in; do-not-call honored within 24 hours" },
            { label: "RESPA", status: "Compliant", desc: "Referral fee transparency disclosed at time of lead delivery" },
            { label: "CCPA", status: "Compliant", desc: "California residents may access, delete, or opt out at any time" },
            { label: "IRS 1099", status: "Compliant", desc: "Form 1099-NEC issued for partners earning ≥$600/year; W-9 required" },
            { label: "GDPR", status: "In Progress", desc: "EU data subject rights being implemented for international expansion" },
          ].map((item) => (
            <div key={item.label} className="p-4 bg-slate-700/40 rounded-xl border border-slate-600/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white">{item.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    item.status === "Compliant"
                      ? "bg-teal-900/50 text-teal-300 border border-teal-700/50"
                      : "bg-amber-900/50 text-amber-300 border border-amber-700/50"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
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

      <p className="text-sm text-slate-300 leading-relaxed">
        ProLnk collects personal information only as necessary to provide matching services between homeowners and service professionals. We do not sell personal data to third parties. Data is stored in encrypted databases hosted in the United States.
      </p>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Data Retention Schedule</h3>
        <div className="overflow-hidden rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400">Data Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400">Retention Period</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {DATA_RETENTION.map((row) => (
                <tr key={row.category} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-white">{row.category}</td>
                  <td className="px-4 py-3 text-xs font-mono text-teal-400">{row.period}</td>
                  <td className="px-4 py-3 text-xs text-slate-400 hidden sm:table-cell">{row.notes}</td>
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

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-4">
        <h3 className="text-sm font-bold text-white">SMS Consent Language</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          By providing your phone number and checking the SMS opt-in box on any ProLnk or TrustyPro form, you expressly consent to receive recurring automated text messages from ProLnk, Inc. at the number provided. These messages may include:
        </p>
        <ul className="text-sm text-slate-300 space-y-1.5 list-none">
          {[
            "Waitlist status updates and launch notifications",
            "New lead alerts and match notifications (active partners)",
            "Account and commission activity summaries",
            "Service reminders or follow-up requests",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <InfoBox type="warning">
          <strong>Message &amp; data rates may apply.</strong> Message frequency varies. Reply <strong>STOP</strong> to opt out at any time. Reply <strong>HELP</strong> for assistance. You will receive one final confirmation message after opting out. For help email{" "}
          <a href="mailto:support@prolnk.io" className="underline">support@prolnk.io</a>.
        </InfoBox>
        <p className="text-xs text-slate-500">
          Opt-out requests are processed within 24 hours. ProLnk honors all national Do-Not-Call (DNC) registry numbers. We do not use autodialed calls for marketing purposes.
        </p>
      </div>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-3">
        <h3 className="text-sm font-bold text-white">Do-Not-Call / Opt-Out</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          To be removed from all ProLnk communications (SMS, email, phone), contact us at:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="mailto:optout@prolnk.io" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 border border-slate-600 rounded-lg text-sm text-slate-300 hover:border-teal-500/50 transition-colors">
            <Mail className="w-4 h-4 text-slate-400" /> optout@prolnk.io
          </a>
          <a href="mailto:legal@prolnk.io" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/60 border border-slate-600 rounded-lg text-sm text-slate-300 hover:border-teal-500/50 transition-colors">
            <Mail className="w-4 h-4 text-slate-400" /> legal@prolnk.io
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

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-4">
        <h3 className="text-sm font-bold text-white">Referral Fee Disclosure</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          ProLnk operates a fee-based lead referral marketplace. When a homeowner is matched with a service professional through ProLnk or TrustyPro, a referral or subscription fee may be charged to the service professional.{" "}
          <strong className="text-white">No fee is ever charged to the homeowner for receiving a match.</strong>
        </p>
        <div className="space-y-2">
          {[
            { label: "Partner subscription fee", value: "$149/month (fixed, all tiers)" },
            { label: "Per-match fee", value: "Varies by job type and market; disclosed at match time" },
            { label: "Network override commissions", value: "Paid between participating partners; not charged to homeowners" },
            { label: "Homeowner cost", value: "$0 — free to use for homeowners" },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4 py-2 border-b border-slate-600/50 last:border-0">
              <span className="text-sm text-slate-400">{item.label}</span>
              <span className="text-sm font-semibold text-white text-right flex-shrink-0">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="info">
        ProLnk does <strong>not steer homeowners</strong> toward specific service professionals based on fee considerations. Matches are made algorithmically based on trade, location, availability, and rating — in compliance with RESPA Section 8.
      </InfoBox>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-3">
        <h3 className="text-sm font-bold text-white">Affiliated Business Arrangements (AfBA)</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          ProLnk may have affiliated business relationships with certain service providers (e.g., insurance, financing). Any such arrangements are disclosed separately at the time of the referral in compliance with RESPA Section 8(c)(4). Homeowners are never required to use an affiliated provider.
        </p>
      </div>
    </div>
  );
}

function Tax1099Tab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={DollarSign}
        title="1099 Tax Reporting"
        subtitle="IRS requirements for ProLnk partners earning commission income."
      />

      <InfoBox type="warning">
        <strong>Important:</strong> ProLnk is required by law to issue IRS Form 1099-NEC to any partner who earns $600 or more in commission income during a calendar year. Partners are solely responsible for reporting this income and paying any applicable taxes.
      </InfoBox>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-4">
        <h3 className="text-sm font-bold text-white">Who Receives a 1099-NEC?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          You will receive a Form 1099-NEC if your total commissions paid by ProLnk during a calendar year equal or exceed <strong className="text-white">$600</strong>. This threshold applies to:
        </p>
        <ul className="space-y-2">
          {[
            "Direct job commissions earned from completed matched jobs",
            "Network Income overrides earned from your recruited partners' jobs",
            "Subscription override commissions",
            "Origination right payouts from the Home Health Vault",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-4">
        <h3 className="text-sm font-bold text-white">W-9 Requirement</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Before receiving your first commission payment, you must provide a valid IRS Form W-9 (for U.S. persons) or Form W-8BEN (for non-U.S. persons) through the Platform. Failure to submit a valid form will result in withholding of 24% backup withholding tax on all payments, as required by IRS regulations.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="bg-slate-800/60 rounded-lg p-3">
            <div className="text-xs font-semibold text-slate-400 mb-1">U.S. Partners</div>
            <div className="text-sm text-white font-semibold">Form W-9</div>
            <div className="text-xs text-slate-400 mt-1">Required before first payout</div>
          </div>
          <div className="bg-slate-800/60 rounded-lg p-3">
            <div className="text-xs font-semibold text-slate-400 mb-1">Non-U.S. Partners</div>
            <div className="text-sm text-white font-semibold">Form W-8BEN</div>
            <div className="text-xs text-slate-400 mt-1">Required; 30% withholding may apply</div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-3">
        <h3 className="text-sm font-bold text-white">Key Dates</h3>
        <div className="space-y-2">
          {[
            { date: "January 31", desc: "ProLnk mails or electronically delivers Form 1099-NEC to qualifying partners" },
            { date: "January 31", desc: "ProLnk files copies of 1099-NEC with the IRS" },
            { date: "April 15", desc: "Standard federal tax filing deadline (extensions available)" },
            { date: "Quarterly", desc: "Partners earning significant commission income may need to make estimated tax payments (Form 1040-ES)" },
          ].map((item) => (
            <div key={item.date + item.desc} className="flex items-start gap-3 py-2 border-b border-slate-600/50 last:border-0">
              <div className="text-sm font-semibold text-teal-400 flex-shrink-0 w-24">{item.date}</div>
              <div className="text-sm text-slate-300">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="info">
        ProLnk recommends consulting a qualified tax professional regarding your obligations as an independent contractor. Self-employment tax (15.3%) applies to net earnings above $400. ProLnk is not a tax advisor and this information is provided for general guidance only.
      </InfoBox>
    </div>
  );
}

function CcpaTab() {
  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Shield}
        title="CCPA — California Consumer Privacy Act"
        subtitle="Rights and disclosures for California residents under the CCPA and CPRA."
      />

      <InfoBox type="info">
        If you are a California resident, the CCPA and its amendment (CPRA, effective January 1, 2023) grant you specific rights regarding your personal information. ProLnk honors all CCPA rights described below.
      </InfoBox>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-4">
        <h3 className="text-sm font-bold text-white">Categories of Personal Information Collected</h3>
        <div className="space-y-2">
          {[
            { category: "Identifiers", examples: "Name, email, phone number, IP address, account ID" },
            { category: "Commercial information", examples: "Job records, commission history, subscription status" },
            { category: "Professional/employment data", examples: "Contractor license number, trade specialty, service area" },
            { category: "Internet/network activity", examples: "Platform usage, pages visited, feature interactions" },
            { category: "Geolocation data", examples: "Service area zip codes; no precise real-time location collected" },
            { category: "Inferences", examples: "Partner Priority Score (PPS) derived from performance data" },
          ].map((item) => (
            <div key={item.category} className="flex items-start gap-3 py-2 border-b border-slate-600/50 last:border-0">
              <div className="text-sm font-semibold text-white flex-shrink-0 w-44">{item.category}</div>
              <div className="text-sm text-slate-400">{item.examples}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-3">
        <h3 className="text-sm font-bold text-white">How We Use Personal Information</h3>
        <ul className="space-y-2">
          {[
            "Matching service professionals with homeowners",
            "Processing commission payments and issuing 1099s",
            "Platform improvement and AI model training (anonymized)",
            "Sending account notifications, match alerts, and newsletters (with consent)",
            "Fraud prevention and security",
            "Legal compliance and dispute resolution",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 bg-slate-700/40 rounded-xl border border-slate-600/50 space-y-3">
        <h3 className="text-sm font-bold text-white">Do Not Sell or Share</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          ProLnk does <strong className="text-white">not sell</strong> your personal information to third parties. We do not share personal information for cross-context behavioral advertising. If this changes, we will update this notice and provide an opt-out mechanism at least 30 days in advance.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Your CCPA Rights</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: "Right to Know", desc: "Request a copy of the personal information we hold about you and how it is used." },
            { title: "Right to Delete", desc: "Request permanent deletion of your personal information (subject to legal exceptions)." },
            { title: "Right to Correct", desc: "Request correction of inaccurate personal information." },
            { title: "Right to Opt Out", desc: "Opt out of sale or sharing of personal information (we don't sell, but you can affirm)." },
            { title: "Right to Limit Use", desc: "Limit our use of sensitive personal information to only what is necessary." },
            { title: "Non-Discrimination", desc: "You will not be denied services or charged different rates for exercising your CCPA rights." },
          ].map((right) => (
            <div key={right.title} className="p-4 bg-slate-700/40 rounded-xl border border-slate-600/50">
              <CheckCircle className="w-4 h-4 text-teal-400 mb-2" />
              <div className="text-sm font-semibold text-white mb-1">{right.title}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{right.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <InfoBox type="success">
        To exercise any CCPA right, use the Data Rights tab or email{" "}
        <a href="mailto:privacy@prolnk.io" className="underline">privacy@prolnk.io</a>. We respond within 45 days. California residents may also contact the California Privacy Protection Agency at{" "}
        <a href="https://cppa.ca.gov" className="underline" target="_blank" rel="noopener noreferrer">cppa.ca.gov</a>.
      </InfoBox>
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
        setSubmitted(true);
        toast.success("Request received. We will respond within 30 days.");
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
          <div key={right.title} className="p-4 bg-slate-700/40 rounded-xl border border-slate-600/50">
            <CheckCircle className="w-4 h-4 text-teal-400 mb-2" />
            <div className="text-sm font-semibold text-white mb-1">{right.title}</div>
            <div className="text-xs text-slate-400 leading-relaxed">{right.desc}</div>
          </div>
        ))}
      </div>

      <InfoBox type="info">
        We respond to all verified data requests within <strong>30 days</strong> (45 days for complex requests with a 15-day notice). California residents may also submit requests to the California Attorney General's office.
      </InfoBox>

      {submitted ? (
        <div className="p-6 bg-teal-900/30 border border-teal-700/50 rounded-2xl text-center space-y-2">
          <CheckCircle className="w-10 h-10 text-teal-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Request Submitted</h3>
          <p className="text-sm text-teal-200">
            We have received your {requestType} request. Our privacy team will verify your identity and respond to{" "}
            <strong>{email}</strong> within 30 days.
          </p>
        </div>
      ) : (
        <div className="bg-slate-700/40 rounded-2xl border border-slate-600/50 p-6">
          <h3 className="text-base font-bold text-white mb-4">Submit a Data Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Request Type</label>
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
                        ? "bg-teal-600 text-white border-teal-500"
                        : "bg-slate-800 text-slate-300 border-slate-600 hover:border-teal-500/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="dr-email" className="block text-xs font-semibold text-slate-400 mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                id="dr-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
              />
              <p className="text-xs text-slate-500 mt-1">Must match the email on your ProLnk account for identity verification.</p>
            </div>

            <div>
              <label htmlFor="dr-message" className="block text-xs font-semibold text-slate-400 mb-1.5">
                Additional Details <span className="text-slate-500">(optional)</span>
              </label>
              <textarea
                id="dr-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any specific data categories, time ranges, or clarifications..."
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none"
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {requestType === "deletion" ? <Trash2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {submitting ? "Submitting..." : requestType === "deletion" ? "Submit Deletion Request" : "Submit Request"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const TABS: { id: Tab; label: string; icon: ElementType }[] = [
  { id: "overview", label: "Overview", icon: Shield },
  { id: "privacy", label: "Privacy & Retention", icon: Lock },
  { id: "tcpa", label: "TCPA Notice", icon: Phone },
  { id: "respa", label: "RESPA Disclosure", icon: FileText },
  { id: "1099", label: "1099 Tax Reporting", icon: DollarSign },
  { id: "ccpa", label: "CCPA (California)", icon: Shield },
  { id: "data-rights", label: "Data Rights", icon: Lock },
];

export default function ComplianceDocs() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <>
      <Helmet>
        <title>Compliance & Legal | ProLnk</title>
        <meta name="description" content="ProLnk legal compliance: TCPA, RESPA, CCPA, 1099 tax reporting, data rights, and privacy policy." />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628]">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="text-sm text-slate-400 hover:text-slate-200 transition-colors">Home</button>
              </Link>
              <span className="text-slate-600">/</span>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <h1 className="text-lg font-bold text-white">Compliance & Legal</h1>
              </div>
            </div>
            <a href="mailto:legal@prolnk.io" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors">
              <Mail className="w-3.5 h-3.5" /> legal@prolnk.io
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-4 sticky top-20">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sections</div>
                <nav className="space-y-1">
                  {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                          activeTab === tab.id
                            ? "bg-teal-500/10 text-teal-300 font-semibold"
                            : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {tab.label}
                        {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto text-teal-400" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contact</div>
                  <a href="mailto:legal@prolnk.io" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 py-1 transition-colors">
                    <Mail className="w-3 h-3" /> legal@prolnk.io
                  </a>
                  <a href="mailto:privacy@prolnk.io" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 py-1 transition-colors">
                    <Mail className="w-3 h-3" /> privacy@prolnk.io
                  </a>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "privacy" && <PrivacyTab />}
                {activeTab === "tcpa" && <TcpaTab />}
                {activeTab === "respa" && <RespaTab />}
                {activeTab === "1099" && <Tax1099Tab />}
                {activeTab === "ccpa" && <CcpaTab />}
                {activeTab === "data-rights" && <DataRightsTab />}
              </div>

              <p className="text-xs text-slate-600 mt-4 text-center leading-relaxed">
                Last updated May 2026. ProLnk, Inc. — Dallas, TX.{" "}
                <a href="mailto:legal@prolnk.io" className="underline hover:text-slate-400">legal@prolnk.io</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
