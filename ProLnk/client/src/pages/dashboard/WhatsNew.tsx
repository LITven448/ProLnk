import {
  Zap, CreditCard, Home, Network,
  ArrowUpRight, ChevronRight, Sparkles,
} from "lucide-react";
import { Link } from "wouter";

// ─── Announcements ────────────────────────────────────────────────────────────

const ANNOUNCEMENTS = [
  {
    id: "ai-agents",
    icon: Zap,
    color: "#F5E642",
    badge: "Live Now",
    badgeBg: "rgba(245,230,66,0.15)",
    badgeColor: "#F5E642",
    title: "AI agents now active",
    detail:
      "Your job photos are being analyzed automatically. Our AI extracts home details, detects system types, and builds a profile for every address you document — no manual data entry required.",
    cta: { label: "Upload Photos", href: "/photo-upload", external: false },
  },
  {
    id: "stripe",
    icon: CreditCard,
    color: "#22c55e",
    badge: "Action Required",
    badgeBg: "rgba(34,197,94,0.12)",
    badgeColor: "#22c55e",
    title: "Stripe Connect setup available",
    detail:
      "Connect your bank account now so you're ready the moment payouts go live. Takes under 3 minutes. Your earnings will be deposited automatically on the 1st of each month.",
    cta: { label: "Connect Bank", href: "/settings/payout", external: false },
  },
  {
    id: "origination",
    icon: Home,
    color: "#8b5cf6",
    badge: "New Feature",
    badgeBg: "rgba(139,92,246,0.12)",
    badgeColor: "#8b5cf6",
    title: "Home origination rights are live",
    detail:
      "Start documenting homes today to earn a 1.5% perpetual override on every future job at that address. Every job photo you upload stakes your permanent claim — first pro wins.",
    cta: { label: "Log a Job", href: "/job-log", external: false },
  },
  {
    id: "network-tree",
    icon: Network,
    color: "#3b82f6",
    badge: "New",
    badgeBg: "rgba(59,130,246,0.12)",
    badgeColor: "#3b82f6",
    title: "Network tree visualization",
    detail:
      "See your 4-level downline growing in real time. Track L1–L4 counts, projected monthly override income, and which pros are actively referring others in your network.",
    cta: { label: "View Network", href: "/network-tree", external: false },
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function AnnouncementCard({
  icon: Icon, color, badge, badgeBg, badgeColor,
  title, detail, cta,
}: (typeof ANNOUNCEMENTS)[number]) {
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
          style={{ background: badgeBg, color: badgeColor, border: `1px solid ${badgeColor}30` }}
        >
          {badge}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{detail}</p>
      </div>

      {cta.external ? (
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
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WhatsNew() {
  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

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
            <p className="text-gray-400 text-sm">Latest platform updates and features for partners.</p>
          </div>
        </div>

        {/* Announcement Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {ANNOUNCEMENTS.map((a) => (
            <AnnouncementCard key={a.id} {...a} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-600 text-center">
          Updates are posted here as new features go live. Check back weekly.
        </p>

      </div>
    </div>
  );
}
