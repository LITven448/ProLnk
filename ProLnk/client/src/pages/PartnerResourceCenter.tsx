import { Link } from "wouter";
import {
  BookOpen, TrendingUp, Users, Clock, ArrowRight,
  Rocket, DollarSign, Star, ChevronRight, Play,
  FileText, BarChart2, Share2, Target, Zap, CheckCircle2,
} from "lucide-react";

interface ResourceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  readTime: string;
  tag: string;
  href: string;
  featured?: boolean;
}

function ResourceCardItem({ card }: { card: ResourceCard }) {
  return (
    <div
      className="rounded-2xl p-6 border flex flex-col gap-4 transition-all hover:border-amber-500/30 hover:-translate-y-0.5 cursor-pointer group"
      style={{
        backgroundColor: card.featured ? "rgba(245,158,11,0.06)" : "rgba(255,255,255,0.04)",
        borderColor: card.featured ? "rgba(245,158,11,0.25)" : "rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: card.featured ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.08)" }}
        >
          {card.icon}
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
        >
          {card.tag}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-bold text-sm leading-snug mb-1.5">{card.title}</h3>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
          {card.description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs">{card.readTime}</span>
        </div>
        <span
          className="text-xs font-semibold flex items-center gap-1 transition-all group-hover:gap-2"
          style={{ color: "#F59E0B" }}
        >
          Read guide <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

const GETTING_STARTED: ResourceCard[] = [
  {
    icon: <Rocket className="w-5 h-5 text-amber-400" />,
    title: "Your First 30 Days: ProLnk Partner Quickstart",
    description:
      "Step-by-step walkthrough for new partners. Learn how to optimize your profile, respond to leads, and close your first 5 jobs on the platform.",
    readTime: "12 min read",
    tag: "Beginner",
    href: "/resources",
    featured: true,
  },
  {
    icon: <Target className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />,
    title: "Setting Up Your Service Area for Maximum Leads",
    description:
      "Geographic targeting is the #1 factor in lead volume. This guide shows you how to configure your coverage zones to capture jobs without overstretching.",
    readTime: "8 min read",
    tag: "Setup",
    href: "/resources",
  },
  {
    icon: <FileText className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />,
    title: "Photo Best Practices: Win Homeowners Before You Arrive",
    description:
      "Partners with 5+ job photos convert 3x more leads. Learn the exact shots to take on every job and how to organize your portfolio for maximum impact.",
    readTime: "6 min read",
    tag: "Profile",
    href: "/resources/photo-guide",
  },
];

const EARNINGS_OPT: ResourceCard[] = [
  {
    icon: <BarChart2 className="w-5 h-5 text-amber-400" />,
    title: "The Tier Acceleration Playbook",
    description:
      "How top partners reach Founding Tier in 60 days or less. Covers job cadence, seasonal demand patterns, and the compounding effect of early tier advancement.",
    readTime: "15 min read",
    tag: "Earnings",
    href: "/resources/maximize-earnings",
    featured: true,
  },
  {
    icon: <DollarSign className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />,
    title: "Understanding Your 5 Income Streams",
    description:
      "ProLnk partners earn from direct commissions, network overrides, subscription referrals, homeowner sourcing, and home origination rights. This guide breaks down each stream with real dollar examples.",
    readTime: "10 min read",
    tag: "Commission",
    href: "/resources",
  },
  {
    icon: <Zap className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />,
    title: "Seasonal Surge Strategy: Q3 & Q4 DFW Demand",
    description:
      "HVAC and roofing demand spikes 300% in summer in North Texas. Plan your capacity, raise your close rate, and position for the highest-value jobs before the season hits.",
    readTime: "9 min read",
    tag: "Strategy",
    href: "/resources",
  },
];

const RECRUITING: ResourceCard[] = [
  {
    icon: <Share2 className="w-5 h-5 text-amber-400" />,
    title: "How to Build a 10-Person Network in 90 Days",
    description:
      "Your Level 1 network earns you 7% of every job your recruits close — forever. This guide covers the exact outreach scripts, timing, and positioning that convert fellow tradespeople into your network.",
    readTime: "14 min read",
    tag: "Recruiting",
    href: "/resources",
    featured: true,
  },
  {
    icon: <Users className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />,
    title: "The 4-Level Network Math: Why Early Recruiting Pays Forever",
    description:
      "With a 4-level override cascade, one Charter-tier partner with 5 direct recruits who each recruit 5 more generates $3,200/mo in passive overrides. Run the numbers here.",
    readTime: "7 min read",
    tag: "Network Math",
    href: "/resources",
  },
  {
    icon: <Star className="w-5 h-5" style={{ color: "rgba(255,255,255,0.6)" }} />,
    title: "Home Origination Rights: The Long Game Asset",
    description:
      "Every home you bring into the Home Health Vault generates a permanent revenue share for the life of that home on the platform. Learn how to originate homes and why it matters at scale.",
    readTime: "11 min read",
    tag: "Advanced",
    href: "/resources",
  },
];

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  cards: ResourceCard[];
  accentColor: string;
}

function ResourceSection({ icon, title, subtitle, cards, accentColor }: SectionProps) {
  return (
    <section className="mb-14">
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-white font-bold text-xl">{title}</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <ResourceCardItem card={card} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function PartnerResourceCenter() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#0A1628",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 max-w-6xl mx-auto">
        <Link href="/">
          <span className="text-white font-bold text-lg tracking-tight cursor-pointer">ProLnk</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/partner/profile">
            <span className="text-sm cursor-pointer" style={{ color: "rgba(255,255,255,0.5)" }}>
              My Profile
            </span>
          </Link>
          <Link href="/resources/faq">
            <span
              className="text-sm cursor-pointer px-4 py-2 rounded-xl border transition-all hover:border-amber-500/40"
              style={{ color: "#F59E0B", borderColor: "rgba(245,158,11,0.3)" }}
            >
              FAQ
            </span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-10">
        <div
          className="rounded-2xl px-8 py-10 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(10,22,40,0) 60%)",
            borderColor: "rgba(245,158,11,0.2)",
          }}
        >
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{
                backgroundColor: "rgba(245,158,11,0.1)",
                color: "#F59E0B",
                borderColor: "rgba(245,158,11,0.3)",
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Partner Resource Center
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Everything you need to win on ProLnk
            </h1>
            <p className="text-sm max-w-lg" style={{ color: "rgba(255,255,255,0.5)" }}>
              Guides written by partners earning at Founding Tier. From first lead to 5-stream passive income — the full playbook is here.
            </p>
            <div className="flex items-center gap-5 mt-5">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#4ade80" }} />
                <span className="text-xs text-white/60">9 guides</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#4ade80" }} />
                <span className="text-xs text-white/60">Real earnings data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" style={{ color: "#4ade80" }} />
                <span className="text-xs text-white/60">Updated weekly</span>
              </div>
            </div>
          </div>
          <Link href="/resources/success-stories">
            <button
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{
                backgroundColor: "#F59E0B",
                color: "#0A1628",
                boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
              }}
            >
              <Play className="w-4 h-4" />
              Success Stories
            </button>
          </Link>
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <ResourceSection
          icon={<Rocket className="w-5 h-5 text-amber-400" />}
          title="Getting Started"
          subtitle="Set up your profile, understand the lead flow, and close your first jobs."
          cards={GETTING_STARTED}
          accentColor="#F59E0B"
        />
        <ResourceSection
          icon={<TrendingUp className="w-5 h-5" style={{ color: "#34d399" }} />}
          title="Earnings Optimization"
          subtitle="Tier advancement, commission mechanics, and seasonal strategy."
          cards={EARNINGS_OPT}
          accentColor="#34d399"
        />
        <ResourceSection
          icon={<Users className="w-5 h-5" style={{ color: "#818cf8" }} />}
          title="Recruiting Guide"
          subtitle="Build your network, activate passive income, and earn overrides across 4 levels."
          cards={RECRUITING}
          accentColor="#818cf8"
        />

        {/* Bottom CTA */}
        <div
          className="rounded-2xl p-8 border text-center"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <h2 className="text-white font-bold text-xl mb-2">Have a question not covered here?</h2>
          <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
            The partner FAQ has answers to 80+ common questions about leads, commissions, disputes, and platform features.
          </p>
          <Link href="/resources/faq">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border transition-all hover:border-amber-500/50"
              style={{
                color: "#F59E0B",
                borderColor: "rgba(245,158,11,0.3)",
                backgroundColor: "rgba(245,158,11,0.08)",
              }}
            >
              Browse the FAQ <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t text-center py-8 text-xs"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
      >
        &copy; 2026 ProLnk &mdash; Resource center content is for partner use only.
      </div>
    </div>
  );
}
