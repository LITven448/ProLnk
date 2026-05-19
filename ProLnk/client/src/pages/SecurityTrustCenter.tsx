/**
 * Security & Privacy Trust Center — /security
 * Documents ProLnk's 5 non-negotiable security measures for photo data.
 * Serves as a public-facing trust signal for partners, homeowners, and investors.
 */
import { Shield, Camera, Lock, Eye, FileCheck, CheckCircle, AlertTriangle, Database, Cpu, Users } from "lucide-react";
import { Link } from "wouter";

const SECURITY_PILLARS = [
  {
    id: "exif",
    icon: Camera,
    color: "teal",
    title: "EXIF Metadata Stripping",
    subtitle: "GPS & Device ID Removed at Upload",
    description:
      "Every photo uploaded through ProLnk is processed server-side using Sharp image processing. Before any photo is stored, all EXIF metadata is permanently stripped — including GPS coordinates, device serial numbers, camera model, and capture timestamps. This is not optional and cannot be bypassed.",
    details: [
      "GPS coordinates removed (latitude, longitude, altitude)",
      "Device identifiers removed (camera make, model, serial number)",
      "Capture timestamps removed from embedded metadata",
      "Processed using Sharp (server-side, not client-side)",
      "Original EXIF data is never logged or stored",
    ],
    badge: "Enforced at Infrastructure Level",
  },
  {
    id: "ai-zero-retention",
    icon: Cpu,
    color: "indigo",
    title: "Zero-Retention AI Processing",
    subtitle: "Photos Analyzed, Never Retained by AI",
    description:
      "When photos are submitted for AI analysis, raw image data is passed to the vision model for a single inference call. The AI model does not store, index, or learn from your photos. Analysis results (property conditions, detected items, recommended services) are stored — but the raw photo is only retained in your encrypted S3 bucket, not in any AI system.",
    details: [
      "AI receives photo URL for single-pass inference only",
      "No photo data is sent to external AI training pipelines",
      "Analysis results stored separately from raw photos",
      "AI processing logs include event type and timestamp — not photo content",
      "Partners may revoke AI analysis consent at any time",
    ],
    badge: "Privacy-by-Design Architecture",
  },
  {
    id: "audit-log",
    icon: Eye,
    color: "amber",
    title: "Photo Access Audit Log",
    subtitle: "Every Access Event Recorded",
    description:
      "Every photo access event is recorded in a tamper-evident audit log — who accessed what, when, from which IP address, and in what capacity. The log covers uploads, AI analysis events, homeowner views, and admin access. This creates a complete chain of custody for every photo in the system.",
    details: [
      "Logged events: upload (partner), AI analysis (system), view (homeowner), admin review",
      "Each entry records: photo URL, job ID, accessor role, accessor ID, IP address, user agent, UTC timestamp",
      "Audit log is append-only — entries cannot be modified through the application layer",
      "Admins can review the full audit trail in Admin Portal → Photo Access Log",
      "Supports DSAR (Data Subject Access Requests) and incident response",
    ],
    badge: "Tamper-Evident Audit Trail",
  },
  {
    id: "rbac",
    icon: Users,
    color: "blue",
    title: "Homeowner-Scoped Access Controls",
    subtitle: "Photos Belong to the Homeowner",
    description:
      "Service professionals upload photos after completing a job — they have no retrieval access after upload. Photos belong to the homeowner. Only the homeowner can view their home's photos and AI analysis results through their TrustyPro dashboard, scoped to their property. Admins have access for compliance purposes only, and all admin access is logged.",
    details: [
      "Service professionals are upload-only — no retrieval access after submission",
      "Homeowners access their own photos and AI results scoped to their property address",
      "API layer enforces homeowner-scoped queries — no cross-property access possible",
      "Admin access restricted to compliance and audit purposes, fully logged",
      "AI pipeline accesses photos as a system actor, logged separately from human access",
    ],
    badge: "Enforced at Database & API Layer",
  },
  {
    id: "consent",
    icon: FileCheck,
    color: "emerald",
    title: "Explicit Consent & Opt-In",
    subtitle: "One-Time Consent at Onboarding — Not Per Upload",
    description:
      "Service professionals give explicit, informed consent during partner onboarding (Step 4 of the application). Consent is captured once — not on every upload — keeping the experience frictionless while maintaining full legal compliance. The consent record is timestamped, versioned, and linked to the partner's account. Consent can be revoked at any time from Settings → Security.",
    details: [
      "Consent captured in Step 4 of the Partner Onboarding Wizard — one time only",
      "Partners explicitly informed that photos are AI-processed only and not retrievable after upload",
      "Three granular consent flags: photo storage, AI analysis, lead routing",
      "Consent timestamped, versioned (v1.0+), and stored with IP address and user agent",
      "Revocation immediately disables the upload pipeline for that partner",
    ],
    badge: "GDPR / CCPA Compliant",
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; icon: string; badge: string; dot: string }> = {
  teal:    { bg: "bg-teal-50",    border: "border-teal-200",   icon: "text-teal-600",    badge: "bg-teal-100 text-teal-700",    dot: "bg-teal-500" },
  indigo:  { bg: "bg-indigo-50",  border: "border-indigo-200", icon: "text-indigo-600",  badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",  icon: "text-amber-600",   badge: "bg-amber-100 text-amber-700",   dot: "bg-amber-500" },
  blue:    { bg: "bg-blue-50",    border: "border-blue-200",   icon: "text-blue-600",    badge: "bg-blue-100 text-blue-700",     dot: "bg-blue-500" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200",icon: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700",dot: "bg-emerald-500" },
};

export default function SecurityTrustCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 mb-6">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Security & Privacy Trust Center
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            ProLnk is built on a Privacy-by-Design architecture. Every photo uploaded through our platform
            is protected by five non-negotiable security measures — enforced at the infrastructure level,
            not as optional settings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              GDPR Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              CCPA Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Privacy-by-Design
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Zero-Retention AI
            </span>
          </div>
        </div>
      </div>

      {/* 5 Pillars */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">5 Non-Negotiable Security Measures</h2>
          <p className="text-sm text-gray-500">These protections are enforced at the server level and cannot be disabled by any user, partner, or admin.</p>
        </div>

        {SECURITY_PILLARS.map((pillar, index) => {
          const colors = COLOR_MAP[pillar.color];
          const Icon = pillar.icon;
          return (
            <div key={pillar.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className={`p-6 ${colors.bg} border-b ${colors.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Measure {index + 1}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors.badge}`}>
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{pillar.title}</h3>
                    <p className={`text-sm font-medium ${colors.icon}`}>{pillar.subtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{pillar.description}</p>
                <div className="space-y-2">
                  {pillar.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} mt-1.5 flex-shrink-0`} />
                      <p className="text-sm text-gray-600">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Data Flow Diagram */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Database className="w-5 h-5 text-gray-500" />
            Photo Data Flow
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center">
            {[
              { label: "Partner uploads photo", sub: "Base64 → Server", color: "bg-gray-100 text-gray-700" },
              { label: "EXIF stripped", sub: "GPS, device ID removed", color: "bg-teal-100 text-teal-700" },
              { label: "Consent verified", sub: "Partner consent checked", color: "bg-emerald-100 text-emerald-700" },
              { label: "Stored in S3", sub: "Encrypted, access-logged", color: "bg-blue-100 text-blue-700" },
              { label: "AI analyzes", sub: "Single-pass, no retention", color: "bg-indigo-100 text-indigo-700" },
              { label: "Lead generated", sub: "Results only, not photo", color: "bg-purple-100 text-purple-700" },
            ].map((step, i, arr) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <div className={`px-3 py-2 rounded-xl text-xs font-medium ${step.color} text-center min-w-[100px]`}>
                  <p className="font-semibold">{step.label}</p>
                  <p className="opacity-75 mt-0.5">{step.sub}</p>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gray-300 font-bold hidden sm:block">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Disclosure */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-base font-bold text-amber-800 mb-2">AI Data Processing Disclosure</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                ProLnk uses AI vision models to analyze job photos for property condition assessment and lead generation.
                This processing is subject to explicit partner consent. AI models receive photo URLs for single-pass inference
                only — no photo data is retained by the AI system, used for model training, or shared with third parties.
                All AI processing events are logged with event type, timestamp, and partner ID. Partners may revoke AI
                analysis consent at any time from their Settings page, which immediately halts all AI processing of new uploads.
              </p>
              <p className="text-xs text-amber-600 mt-3">
                Last updated: April 2026 · Consent version: 1.0 · Questions? Contact{" "}
                <a href="mailto:privacy@prolnk.io" className="underline">privacy@prolnk.io</a>
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Links */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-500" />
            Your Rights & Contacts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-800 mb-1">Data Subject Requests</p>
              <p>To request deletion, export, or correction of your data, email <a href="mailto:privacy@prolnk.io" className="text-teal-600 underline">privacy@prolnk.io</a>.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Security Disclosures</p>
              <p>To report a security vulnerability, email <a href="mailto:security@prolnk.io" className="text-teal-600 underline">security@prolnk.io</a>.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Consent Management</p>
              <p>Partners can manage photo consent in <Link href="/dashboard/settings" className="text-teal-600 underline">Settings → Security</Link>.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Legal Documents</p>
              <div className="flex gap-3 mt-1">
                <Link href="/privacy" className="text-teal-600 underline">Privacy Policy</Link>
                <Link href="/terms" className="text-teal-600 underline">Terms of Service</Link>
                <Link href="/ccpa" className="text-teal-600 underline">CCPA Rights</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white py-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} ProLnk · Built with Privacy-by-Design · All photo security measures are enforced at the infrastructure level.
        </p>
      </div>
    </div>
  );
}
