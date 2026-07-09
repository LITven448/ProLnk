import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import {
  Webhook,
  Key,
  Zap,
  Copy,
  Check,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Activity,
} from "lucide-react";

const WEBHOOK_EVENTS = [
  {
    event: "partner.signup",
    description: "Fired when a new partner completes the signup form",
    category: "Partner",
  },
  {
    event: "partner.activated",
    description: "Fired when a partner is approved and activated by admin",
    category: "Partner",
  },
  {
    event: "partner.tier_upgrade",
    description: "Fired when a partner moves to a new commission tier",
    category: "Partner",
  },
  {
    event: "job.logged",
    description: "Fired when a partner logs a completed job",
    category: "Jobs",
  },
  {
    event: "job.matched",
    description: "Fired when a homeowner lead is matched to a partner",
    category: "Jobs",
  },
  {
    event: "job.photo_submitted",
    description: "Fired when before/after photos are uploaded for a job",
    category: "Jobs",
  },
  {
    event: "commission.calculated",
    description: "Fired when a commission amount is calculated for a completed job",
    category: "Finance",
  },
  {
    event: "commission.paid",
    description: "Fired when a payout is processed and sent to a partner",
    category: "Finance",
  },
  {
    event: "referral.created",
    description: "Fired when a partner generates a new referral link click",
    category: "Network",
  },
  {
    event: "homeowner.signup",
    description: "Fired when a homeowner completes the waitlist/quote form",
    category: "Homeowner",
  },
  {
    event: "home.vault_created",
    description: "Fired when a home is added to the Home Health Vault",
    category: "Homeowner",
  },
  {
    event: "scan.completed",
    description: "Fired when a TrustyPro photo scan analysis is complete",
    category: "TrustyPro",
  },
];

const SAMPLE_PAYLOAD = `{
  "event": "commission.paid",
  "timestamp": "2026-05-12T14:23:00Z",
  "version": "1.0",
  "data": {
    "partner_id": "prt_abc123",
    "partner_email": "john@example.com",
    "job_id": "job_xyz789",
    "commission_type": "direct",
    "gross_amount": 847.00,
    "tier_rate": 0.20,
    "net_amount": 169.40,
    "payout_method": "ach",
    "payout_reference": "pay_2026051201"
  }
}`;

const RATE_LIMITS = [
  { plan: "Starter (waitlist)", requests: "100 / hour", burst: "20 / minute" },
  { plan: "Charter Partner", requests: "2,000 / hour", burst: "100 / minute" },
  { plan: "Founding Partner", requests: "10,000 / hour", burst: "500 / minute" },
  { plan: "Admin / Internal", requests: "Unlimited", burst: "Unlimited" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all"
      style={{
        background: copied ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.07)",
        color: copied ? "#22d3ee" : "rgba(255,255,255,0.5)",
        border: `1px solid ${copied ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.1)"}`,
      }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Section({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="mb-6"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" style={{ color: "#22d3ee" }} />
          <span className="font-bold text-white">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/30" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/30" />
        )}
      </button>
      {open && <div className="px-6 py-5">{children}</div>}
    </div>
  );
}

const categoryColors: Record<string, string> = {
  Partner: "#22d3ee",
  Jobs: "#4ade80",
  Finance: "#f59e0b",
  Network: "#a78bfa",
  Homeowner: "#fb7185",
  TrustyPro: "#38bdf8",
};

export default function APIGuide() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(WEBHOOK_EVENTS.map((e) => e.category))];
  const filteredEvents = activeCategory
    ? WEBHOOK_EVENTS.filter((e) => e.category === activeCategory)
    : WEBHOOK_EVENTS;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#080f1e", color: "#e2e8f0" }}>
      {/* Nav */}
      <nav
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <Link href="/">
          <span
            className="text-xl font-black tracking-tight cursor-pointer"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#22d3ee" }}
          >
            ProLnk
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/help">
            <span className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
              Help Center
            </span>
          </Link>
          <Link href="/">
            <span className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div
        className="px-6 py-14 border-b"
        style={{
          background: "linear-gradient(180deg, rgba(34,211,238,0.06) 0%, transparent 100%)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "rgba(34,211,238,0.12)", color: "#22d3ee" }}
          >
            <Activity className="w-3 h-3" />
            API & Integrations
          </div>
          <h1
            className="text-4xl font-black mb-3"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            ProLnk Integration Guide
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Connect ProLnk to your automation tools (n8n, Zapier, Make) using webhooks.
            Receive real-time events, process commissions, and build custom workflows.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* API Key */}
        <Section title="Using Your API Key" icon={Key}>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            Your ProLnk API key authenticates all webhook deliveries and future REST requests.
            Find your key in{" "}
            <Link href="/dashboard/integrations">
              <span className="text-teal-400 hover:underline cursor-pointer">
                Dashboard → Integrations
              </span>
            </Link>
            .
          </p>
          <div
            className="p-4 mb-4 text-xs"
            style={{
              background: "rgba(245,158,11,0.08)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#fbbf24",
            }}
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Never expose your API key in client-side code. Store it as an environment
                variable in your automation tool.
              </span>
            </div>
          </div>
          <p className="text-sm text-white/60 mb-3">
            Include your key in the <code className="text-teal-300">Authorization</code> header:
          </p>
          <div
            className="flex items-center justify-between p-4"
            style={{ background: "#0d1526", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <code className="text-sm" style={{ color: "#86efac" }}>
              Authorization: Bearer pl_live_your_api_key_here
            </code>
            <CopyButton text="Authorization: Bearer pl_live_your_api_key_here" />
          </div>
        </Section>

        {/* Webhook Setup */}
        <Section title="Webhook Setup" icon={Webhook}>
          <p className="text-sm text-white/60 mb-5 leading-relaxed">
            Register an HTTPS endpoint URL to receive real-time event payloads. ProLnk sends
            a <code className="text-teal-300">POST</code> request with a JSON body and the
            header <code className="text-teal-300">X-ProLnk-Signature</code> (HMAC-SHA256
            signed with your webhook secret).
          </p>
          <ol className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <span
                className="w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee" }}
              >
                1
              </span>
              <span>
                Go to{" "}
                <Link href="/dashboard/integrations">
                  <span className="text-teal-400 cursor-pointer hover:underline">
                    Dashboard → Integrations
                  </span>
                </Link>{" "}
                and click <strong className="text-white">Add Webhook</strong>.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee" }}
              >
                2
              </span>
              <span>
                Paste your n8n webhook URL (e.g.{" "}
                <code className="text-teal-300">https://your-n8n.app/webhook/prolnk</code>
                ) or your Zapier catch URL.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee" }}
              >
                3
              </span>
              <span>
                Select the events you want to receive (or choose{" "}
                <strong className="text-white">All Events</strong>).
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee" }}
              >
                4
              </span>
              <span>
                Copy the generated webhook secret and store it securely. ProLnk uses it to
                sign all payloads.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                className="w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(34,211,238,0.15)", color: "#22d3ee" }}
              >
                5
              </span>
              <span>
                Click <strong className="text-white">Send Test Event</strong> to verify your
                endpoint receives the payload.
              </span>
            </li>
          </ol>
        </Section>

        {/* Webhook Events */}
        <Section title="Available Webhook Events" icon={Zap}>
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => setActiveCategory(null)}
              className="px-3 py-1 text-xs font-semibold transition-all"
              style={{
                background: !activeCategory ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.05)",
                color: !activeCategory ? "#22d3ee" : "rgba(255,255,255,0.4)",
                border: `1px solid ${!activeCategory ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              All ({WEBHOOK_EVENTS.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className="px-3 py-1 text-xs font-semibold transition-all"
                style={{
                  background:
                    activeCategory === cat
                      ? `${categoryColors[cat]}22`
                      : "rgba(255,255,255,0.05)",
                  color:
                    activeCategory === cat ? categoryColors[cat] : "rgba(255,255,255,0.4)",
                  border: `1px solid ${
                    activeCategory === cat
                      ? `${categoryColors[cat]}44`
                      : "rgba(255,255,255,0.08)"
                  }`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filteredEvents.map((ev) => (
              <div
                key={ev.event}
                className="flex items-start justify-between gap-4 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <code className="text-sm font-bold" style={{ color: "#22d3ee" }}>
                    {ev.event}
                  </code>
                  <p className="text-xs text-white/40 mt-0.5">{ev.description}</p>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 shrink-0"
                  style={{
                    background: `${categoryColors[ev.category]}18`,
                    color: categoryColors[ev.category],
                  }}
                >
                  {ev.category}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Sample Payload */}
        <Section title="Sample Webhook Payload" icon={Activity}>
          <p className="text-sm text-white/60 mb-4">
            Example payload for the <code className="text-teal-300">commission.paid</code> event:
          </p>
          <div
            className="relative p-5 overflow-x-auto"
            style={{ background: "#0d1526", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="absolute top-3 right-3">
              <CopyButton text={SAMPLE_PAYLOAD} />
            </div>
            <pre className="text-xs leading-relaxed" style={{ color: "#86efac" }}>
              {SAMPLE_PAYLOAD}
            </pre>
          </div>
          <p className="text-xs text-white/40 mt-3">
            All timestamps are UTC ISO 8601. Monetary values are in USD as floats.
          </p>
        </Section>

        {/* Rate Limits */}
        <Section title="Rate Limits" icon={AlertCircle} defaultOpen={false}>
          <p className="text-sm text-white/60 mb-5">
            Webhook delivery retries follow exponential back-off (1s → 5s → 30s → 5min → 30min).
            Endpoints that return non-2xx for 24 hours are auto-disabled.
          </p>
          <div
            className="overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/40">
                    Plan
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/40">
                    Requests / Hour
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/40">
                    Burst
                  </th>
                </tr>
              </thead>
              <tbody>
                {RATE_LIMITS.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <td className="px-4 py-3 text-white/70">{row.plan}</td>
                    <td className="px-4 py-3 font-mono text-teal-400">{row.requests}</td>
                    <td className="px-4 py-3 font-mono text-white/50">{row.burst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Footer CTA */}
        <div
          className="mt-10 p-6 text-center"
          style={{
            background: "rgba(34,211,238,0.05)",
            border: "1px solid rgba(34,211,238,0.15)",
          }}
        >
          <p className="text-sm text-white/60 mb-4">
            Need a custom integration or have questions about the API?
          </p>
          <a
            href="mailto:support@prolnk.xyz"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#22d3ee", color: "#080f1e" }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
