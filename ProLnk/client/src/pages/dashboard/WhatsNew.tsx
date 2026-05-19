import { useState } from "react";
import {
  Zap, CreditCard, Home, Network, ShoppingBag,
  ArrowUpRight, ChevronRight, Sparkles, Smartphone,
  Calculator, Brain, Cloud, GitMerge, Shield, Camera,
  Star, Lock, ChevronDown, ChevronUp, Rocket, Package,
  TrendingUp, Bell,
} from "lucide-react";
import { Link } from "wouter";

// ─── Changelog Data ───────────────────────────────────────────────────────────

type ChangelogEntry = {
  id: string;
  month: string;
  year: string;
  icon: typeof Zap;
  color: string;
  tag: "New" | "Update" | "Live Now" | "Action Required";
  title: string;
  detail: string;
  cta?: { label: string; href: string; external?: boolean };
};

const CHANGELOG: ChangelogEntry[] = [
  // May 2026
  {
    id: "exchange-marketplace",
    month: "May",
    year: "2026″,
    icon: ShoppingBag,
    color: "#F5E642″,
    tag: "New",
    title: "Exchange marketplace live",
    detail:
      "Pros can now buy, sell, and transfer origination rights on homes they've documented. Set your price, list your portfolio, and earn a one-time gain without giving up future recurring income.",
    cta: { label: "Visit Exchange", href: "/exchange" },
  },
  {
    id: "trustypro-dashboard",
    month: "May",
    year: "2026″,
    icon: Network,
    color: "#22c55e",
    tag: "New",
    title: "TrustyPro partner dashboard",
    detail:
      "The full TrustyPro portal is now live — manage your licensed service area, track leads, message homeowners, and view your TrustyPro-specific earnings in one place.",
    cta: { label: "Open Dashboard", href: "/trustypro/dashboard" },
  },
  {
    id: "faq-howitworks",
    month: "May",
    year: "2026″,
    icon: Sparkles,
    color: "#3b82f6″,
    tag: "Update",
    title: "FAQ + How It Works pages",
    detail:
      "New detailed FAQ and How It Works pages explain the network income system, origination rights, and the 4-level override structure — great to share with prospects before they sign up.",
    cta: { label: "View FAQ", href: "/faq" },
  },

  // April 2026
  {
    id: "mobile-nav",
    month: "Apr",
    year: "2026″,
    icon: Smartphone,
    color: "#8b5cf6″,
    tag: "Update",
    title: "Mobile bottom navigation",
    detail:
      "The mobile app now has a persistent bottom nav bar — tap between Dashboard, Network, Jobs, and Account with one thumb. Replaces the hamburger menu on screens under 768px.",
  },
  {
    id: "commission-calculator",
    month: "Apr",
    year: "2026″,
    icon: Calculator,
    color: "#f59e0b",
    tag: "Update",
    title: "Commission calculator rewrite",
    detail:
      "The income simulator was fully rewritten. Adjustable sliders for recruit count, avg job value, and job frequency. Shows subscription overrides, job overrides, and total passive income side by side in real time.",
    cta: { label: "Try Calculator", href: "/network-income" },
  },
  {
    id: "ai-matching",
    month: "Apr",
    year: "2026″,
    icon: Brain,
    color: "#ec4899″,
    tag: "New",
    title: "AI opportunity matching",
    detail:
      "Our AI now scores incoming homeowner leads against your trade specialties, service area, availability, and past job history to surface the highest-value opportunities first in your feed.",
    cta: { label: "View Opportunities", href: "/opportunities" },
  },

  // March 2026
  {
    id: "storm-alerts",
    month: "Mar",
    year: "2026″,
    icon: Cloud,
    color: "#06b6d4″,
    tag: "New",
    title: "Weather storm alerts",
    detail:
      "NOAA weather data is now integrated. When a severe weather event is forecast in your service area, you'll get an early notification so you can prepare for surge demand — roof, water, and HVAC jobs spike after storms.",
  },
  {
    id: "referral-funnel",
    month: "Mar",
    year: "2026″,
    icon: GitMerge,
    color: "#10b981″,
    tag: "New",
    title: "Referral funnel tracker",
    detail:
      "New analytics panel shows exactly where your referred pros are in the onboarding funnel — clicked link, signed up, agreement signed, first job completed. Identify who needs a nudge to activate.",
    cta: { label: "View Funnel", href: "/referral-funnel" },
  },

  // February 2026
  {
    id: "home-health-vault",
    month: "Feb",
    year: "2026″,
    icon: Shield,
    color: "#6366f1″,
    tag: "New",
    title: "Home Health Vault",
    detail:
      "The Home Health Vault is now open. Document systems, appliances, and service history for every home you work on. Each entry stakes your origination rights and builds the permanent data asset that pays you long-term.",
    cta: { label: "Open Vault", href: "/vault" },
  },
  {
    id: "photo-scan-ai",
    month: "Feb",
    year: "2026″,
    icon: Camera,
    color: "#f97316″,
    tag: "New",
    title: "Photo scan AI",
    detail:
      "Upload job site photos and our AI automatically identifies HVAC units, water heaters, electrical panels, and plumbing fixtures — extracting make, model, and estimated age. No more manual data entry.",
    cta: { label: "Upload Photos", href: "/photo-upload" },
  },
];

// ─── Version Timeline Data ────────────────────────────────────────────────────

type Release = {
  version: string;
  label: string;
  date: string;
  color: string;
  isNew?: boolean;
  highlights: string[];
};

const RELEASES: Release[] = [
  {
    version: "v2.4″,
    label: "This week",
    date: "May 12, 2026″,
    color: "#F5E642″,
    isNew: true,
    highlights: [
      "AI Photo Scan improvements — faster model, better fixture detection",
      "Storm Alert upgrades — real-time NOAA push notifications",
      "BookPro booking flow — homeowners can reserve your time slot",
    ],
  },
  {
    version: "v2.3″,
    label: "Last week",
    date: "May 5, 2026″,
    color: "#22c55e",
    highlights: [
      "TrueCostGuide rebuild — side-by-side material + labor estimates",
      "HomeAssistant dark theme — full OLED-friendly palette",
      "EarningsCalendar heat map — visualize job density by day",
    ],
  },
  {
    version: "v2.2″,
    label: "2 weeks ago",
    date: "Apr 28, 2026″,
    color: "#3b82f6″,
    highlights: [
      "InsuranceClaimAssistant wizard — step-by-step claim documentation",
      "ContractorComparison badges — differentiate licensed vs unlicensed",
      "EmergencyServices redesign — one-tap urgent request flow",
    ],
  },
  {
    version: "v2.1″,
    label: "3 weeks ago",
    date: "Apr 21, 2026″,
    color: "#8b5cf6″,
    highlights: [
      "Inngest background jobs wired — async job processing at scale",
      "Stripe payouts live — weekly payout batch now automated",
      "Admin dashboards — full ops visibility for the team",
    ],
  },
  {
    version: "v2.0″,
    label: "1 month ago",
    date: "Apr 14, 2026″,
    color: "#f97316″,
    highlights: [
      "Full dark theme rollout — every page, every component",
      "TrustyPro integration — licensed pros now in same platform",
      "PhotoScan AI — computer vision for home system documentation",
    ],
  },
];

// ─── Coming Soon Features ─────────────────────────────────────────────────────

const COMING_SOON = [
  {
    icon: ShoppingBag,
    color: "#F5E642″,
    title: "Exchange B2B Marketplace",
    description: "Trade origination rights, portfolio bundles, and territory packages with other pros.",
    eta: "Q3 2026″,
  },
  {
    icon: Smartphone,
    color: "#22c55e",
    title: "Mobile App (iOS & Android)",
    description: "Native push notifications, offline job logs, and GPS-based territory management.",
    eta: "Q3 2026″,
  },
  {
    icon: Brain,
    color: "#3b82f6″,
    title: "AI Matching v2″,
    description: "Self-learning model trained on your past wins — surfaces the jobs you're most likely to win.",
    eta: "Q4 2026″,
  },
];

// ─── Tag Colors ────────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  "New":             { bg: "rgba(34,197,94,0.15)",    color: "#22c55e" },
  "Update":          { bg: "rgba(59,130,246,0.15)",   color: "#3b82f6″ },
  "Live Now":        { bg: "rgba(245,230,66,0.15)",   color: "#F5E642″ },
  "Action Required": { bg: "rgba(245,158,11,0.15)",   color: "#f59e0b" },
};

// ─── Group entries by month ────────────────────────────────────────────────────

function groupByMonth(entries: ChangelogEntry[]) {
  const groups: Array<{ key: string; label: string; items: ChangelogEntry[] }> = [];
  const seen = new Map<string, number>();
  for (const entry of entries) {
    const key = `${entry.month}-${entry.year}`;
    if (!seen.has(key)) {
      seen.set(key, groups.length);
      groups.push({ key, label: `${entry.month} ${entry.year}`, items: [] });
    }
    groups[seen.get(key)!].items.push(entry);
  }
  return groups;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ChangelogCard({ entry }: { entry: ChangelogEntry }) {
  const { icon: Icon, color, tag, title, detail, cta } = entry;
  const tagStyle = TAG_STYLES[tag] ?? TAG_STYLES["New"];

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3″
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between gap-3″>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0″
          style={{ background: `${color}18` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0″
          style={{
            background: tagStyle.bg,
            color: tagStyle.color,
            border: `1px solid ${tagStyle.color}30`,
          }}
        >
          {tag}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{detail}</p>
      </div>

      {cta && (
        cta.external ? (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all self-start"
            style={{ color }}
          >
            {cta.label}
            <ArrowUpRight size={12} />
          </a>
        ) : (
          <Link href={cta.href}>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all"
              style={{ color }}
            >
              {cta.label}
              <ChevronRight size={12} />
            </span>
          </Link>
        )
      )}
    </div>
  );
}

// ─── Version Timeline ─────────────────────────────────────────────────────────

function VersionTimeline() {
  const [expanded, setExpanded] = useState<string | null>("v2.4″);

  return (
    <div
      className="rounded-2xl p-6″
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-5″>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0″
          style={{ background: "rgba(245,230,66,0.12)" }}
        >
          <Package size={18} style={{ color: "#F5E642″ }} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Version Timeline</h2>
          <p className="text-xs text-gray-400″>Release history — tap to expand</p>
        </div>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-2 bottom-2 w-px"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />

        <div className="space-y-2″>
          {RELEASES.map((release) => {
            const isOpen = expanded === release.version;
            return (
              <div key={release.version}>
                <button
                  onClick={() => setExpanded(isOpen ? null : release.version)}
                  className="w-full flex items-center gap-4 text-left group"
                >
                  {/* Dot */}
                  <div
                    className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all"
                    style={{
                      background: isOpen ? release.color : "rgba(255,255,255,0.06)",
                      color: isOpen ? "#0A1628″ : release.color,
                      border: `2px solid ${release.color}40`,
                      boxShadow: isOpen ? `0 0 12px ${release.color}60` : "none",
                    }}
                  >
                    {release.version.replace("v", "")}
                  </div>

                  <div className="flex-1 min-w-0 py-2″>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">{release.version}</span>
                      {release.isNew && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(245,230,66,0.15)",
                            color: "#F5E642″,
                            border: "1px solid rgba(245,230,66,0.3)",
                            animation: "pulse 2s ease-in-out infinite",
                          }}
                        >
                          NEW
                        </span>
                      )}
                      <span className="text-xs text-gray-500″>{release.label} · {release.date}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-gray-500″>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="ml-[52px] pb-3″>
                    <ul className="space-y-1.5″>
                      {release.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2″>
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0″
                            style={{ background: release.color }}
                          />
                          <span className="text-xs text-gray-300 leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Feature Spotlight ────────────────────────────────────────────────────────

function FeatureSpotlightCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(245,230,66,0.08), rgba(34,197,94,0.05))",
        border: "1px solid rgba(245,230,66,0.2)",
      }}
    >
      <div className="p-6″>
        <div className="flex items-center gap-2 mb-4″>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(245,230,66,0.15)" }}
          >
            <Star size={14} style={{ color: "#F5E642″ }} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#F5E642″ }}>
            Feature Spotlight
          </span>
        </div>

        {/* Screenshot placeholder */}
        <div
          className="rounded-xl mb-4 flex items-center justify-center"
          style={{
            height: 160,
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-center">
            <Camera size={32} className="mx-auto mb-2 text-gray-600″ />
            <p className="text-xs text-gray-600″>AI Photo Scan — v2.4 Preview</p>
          </div>
        </div>

        <h3 className="text-base font-bold text-white mb-2″>
          AI Photo Scan 2.0 — Instant Fixture Recognition
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-4″>
          Point your phone at any HVAC unit, water heater, or electrical panel. The upgraded AI model identifies
          make, model, serial number, and estimated install year in under 3 seconds. No barcode scanning required —
          just a photo. Automatically logs to the Home Health Vault and stakes your origination rights.
        </p>

        <div className="flex items-center gap-3″>
          <Link href="/photo-upload">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: "#F5E642″, color: "#0A1628" }}
            >
              Try Photo Scan <ArrowUpRight size={12} />
            </span>
          </Link>
          <Link href="/vault">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 hover:text-white transition-colors">
              View Vault <ChevronRight size={12} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Coming Soon ──────────────────────────────────────────────────────────────

function ComingSoonSection() {
  return (
    <div className="space-y-4″>
      <div className="flex items-center gap-3″>
        <div
          className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: "rgba(139,92,246,0.1)", color: "#8b5cf6″, border: "1px solid rgba(139,92,246,0.2)" }}
        >
          Coming Soon
        </div>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4″>
        {COMING_SOON.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Blur overlay */}
              <div
                className="absolute inset-0 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center gap-2 z-10″
                style={{ background: "rgba(10,22,40,0.65)" }}
              >
                <Lock size={16} className="text-gray-500″ />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  ETA {feature.eta}
                </span>
              </div>

              {/* Blurred content behind */}
              <div className="opacity-40″>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3″
                  style={{ background: `${feature.color}18` }}
                >
                  <Icon size={20} style={{ color: feature.color }} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1″>{feature.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Feedback Widget ──────────────────────────────────────────────────────────

function FeedbackWidget() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) setSubmitted(true);
  };

  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {submitted ? (
        <div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3″
            style={{ background: "rgba(34,197,94,0.12)" }}
          >
            <Sparkles size={20} style={{ color: "#22c55e" }} />
          </div>
          <p className="text-sm font-bold text-white">Thanks for the feedback!</p>
          <p className="text-xs text-gray-500 mt-1″>Your input shapes what we build next.</p>
        </div>
      ) : (
        <>
          <p className="text-sm font-semibold text-white mb-1″>Rate this update</p>
          <p className="text-xs text-gray-500 mb-4″>How useful was v2.4?</p>
          <div className="flex items-center justify-center gap-2 mb-4″>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(n)}
                className="transition-all"
              >
                <Star
                  size={28}
                  style={{
                    color: n <= (hovered || rating) ? "#F5E642″ : "rgba(255,255,255,0.15)",
                    fill: n <= (hovered || rating) ? "#F5E642″ : "transparent",
                    transition: "color 0.15s, fill 0.15s",
                  }}
                />
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="px-5 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-40″
            style={{
              background: rating > 0 ? "#F5E642″ : "rgba(255,255,255,0.08)",
              color: rating > 0 ? "#0A1628″ : "#6b7280",
            }}
          >
            Submit Rating
          </button>
        </>
      )}
    </div>
  );
}

// ─── New This Week Banner ─────────────────────────────────────────────────────

function NewThisWeekBanner() {
  const newCount = RELEASES[0].highlights.length;

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4″
      style={{
        background: "linear-gradient(135deg, rgba(245,230,66,0.12), rgba(245,230,66,0.04))",
        border: "1px solid rgba(245,230,66,0.25)",
      }}
    >
      <div className="relative flex-shrink-0″>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(245,230,66,0.15)" }}
        >
          <Bell size={18} style={{ color: "#F5E642″ }} />
        </div>
        {/* Pulsing badge */}
        <div
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{
            background: "#F5E642″,
            color: "#0A1628″,
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          {newCount}
        </div>
      </div>
      <div className="flex-1 min-w-0″>
        <p className="text-sm font-bold text-white">
          {newCount} new features shipped this week
        </p>
        <p className="text-xs text-gray-400 mt-0.5″>
          v2.4 is live — AI Photo Scan improvements, Storm Alert upgrades, BookPro booking flow
        </p>
      </div>
      <a
        href="#timeline"
        className="flex-shrink-0 text-xs font-semibold flex items-center gap-1″
        style={{ color: "#F5E642″ }}
      >
        View <ChevronRight size={12} />
      </a>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhatsNew() {
  const groups = groupByMonth(CHANGELOG);

  return (
    <div className="min-h-screen" style={{ background: "#0A1628″ }}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8″>

        {/* Header */}
        <div className="flex items-center gap-3″>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0″
            style={{ background: "rgba(245,230,66,0.12)" }}
          >
            <Sparkles size={20} style={{ color: "#F5E642″ }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">What's New</h1>
            <p className="text-gray-400 text-sm">Platform changelog — new features and updates for partners.</p>
          </div>
        </div>

        {/* New This Week Banner */}
        <NewThisWeekBanner />

        {/* Feature Spotlight */}
        <FeatureSpotlightCard />

        {/* Version Timeline */}
        <div id="timeline">
          <VersionTimeline />
        </div>

        {/* Changelog grouped by month */}
        {groups.map(({ key, label, items }) => (
          <div key={key} className="space-y-4″>
            {/* Month divider */}
            <div className="flex items-center gap-3″>
              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642″, border: "1px solid rgba(245,230,66,0.2)" }}
              >
                {label}
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Cards grid */}
            <div className="grid sm:grid-cols-2 gap-4″>
              {items.map((entry) => (
                <ChangelogCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}

        {/* Coming Soon */}
        <ComingSoonSection />

        {/* Feedback widget */}
        <FeedbackWidget />

        {/* Footer */}
        <p className="text-xs text-gray-600 text-center pb-4″>
          New features are posted here as they ship. Check back weekly.
        </p>

      </div>
    </div>
  );
}
