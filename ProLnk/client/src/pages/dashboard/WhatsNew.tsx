import {
  Zap, CreditCard, Home, Network, ShoppingBag,
  ArrowUpRight, ChevronRight, Sparkles, Smartphone,
  Calculator, Brain, Cloud, GitMerge, Shield, Camera,
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
    year: "2026",
    icon: ShoppingBag,
    color: "#F5E642",
    tag: "New",
    title: "Exchange marketplace live",
    detail:
      "Pros can now buy, sell, and transfer origination rights on homes they've documented. Set your price, list your portfolio, and earn a one-time gain without giving up future recurring income.",
    cta: { label: "Visit Exchange", href: "/exchange" },
  },
  {
    id: "trustypro-dashboard",
    month: "May",
    year: "2026",
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
    year: "2026",
    icon: Sparkles,
    color: "#3b82f6",
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
    year: "2026",
    icon: Smartphone,
    color: "#8b5cf6",
    tag: "Update",
    title: "Mobile bottom navigation",
    detail:
      "The mobile app now has a persistent bottom nav bar — tap between Dashboard, Network, Jobs, and Account with one thumb. Replaces the hamburger menu on screens under 768px.",
  },
  {
    id: "commission-calculator",
    month: "Apr",
    year: "2026",
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
    year: "2026",
    icon: Brain,
    color: "#ec4899",
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
    year: "2026",
    icon: Cloud,
    color: "#06b6d4",
    tag: "New",
    title: "Weather storm alerts",
    detail:
      "NOAA weather data is now integrated. When a severe weather event is forecast in your service area, you'll get an early notification so you can prepare for surge demand — roof, water, and HVAC jobs spike after storms.",
  },
  {
    id: "referral-funnel",
    month: "Mar",
    year: "2026",
    icon: GitMerge,
    color: "#10b981",
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
    year: "2026",
    icon: Shield,
    color: "#6366f1",
    tag: "New",
    title: "Home Health Vault",
    detail:
      "The Home Health Vault is now open. Document systems, appliances, and service history for every home you work on. Each entry stakes your origination rights and builds the permanent data asset that pays you long-term.",
    cta: { label: "Open Vault", href: "/vault" },
  },
  {
    id: "photo-scan-ai",
    month: "Feb",
    year: "2026",
    icon: Camera,
    color: "#f97316",
    tag: "New",
    title: "Photo scan AI",
    detail:
      "Upload job site photos and our AI automatically identifies HVAC units, water heaters, electrical panels, and plumbing fixtures — extracting make, model, and estimated age. No more manual data entry.",
    cta: { label: "Upload Photos", href: "/photo-upload" },
  },
];

// ─── Tag Colors ────────────────────────────────────────────────────────────────

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  "New":             { bg: "rgba(34,197,94,0.15)",    color: "#22c55e" },
  "Update":          { bg: "rgba(59,130,246,0.15)",   color: "#3b82f6" },
  "Live Now":        { bg: "rgba(245,230,66,0.15)",   color: "#F5E642" },
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
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhatsNew() {
  const groups = groupByMonth(CHANGELOG);

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(245,230,66,0.12)" }}
          >
            <Sparkles size={20} style={{ color: "#F5E642" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">What's New</h1>
            <p className="text-gray-400 text-sm">Platform changelog — new features and updates for partners.</p>
          </div>
        </div>

        {/* Grouped by month */}
        {groups.map(({ key, label, items }) => (
          <div key={key} className="space-y-4">
            {/* Month divider */}
            <div className="flex items-center gap-3">
              <div
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.2)" }}
              >
                {label}
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            </div>

            {/* Cards grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((entry) => (
                <ChangelogCard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <p className="text-xs text-gray-600 text-center pb-4">
          New features are posted here as they ship. Check back weekly.
        </p>

      </div>
    </div>
  );
}
