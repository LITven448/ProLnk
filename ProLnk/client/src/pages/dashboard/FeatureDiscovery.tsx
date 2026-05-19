import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import {
  Share2, DollarSign, Briefcase, Network, Camera, BarChart3,
  Zap, Shield, Star, Award, Users, Map, Bell, Settings,
  ChevronRight, ArrowRight, CheckSquare, Rocket, Globe,
  FileText, TrendingUp, Trophy, MessageSquare, Clock,
  Home, Search, Layers, BookOpen,
} from "lucide-react";

type Category = "core" | "tools" | "trustypro" | "exchange" | "soon";

type Feature = {
  icon: React.ElementType;
  name: string;
  description: string;
  href: string;
  color: string;
  bg: string;
  isNew?: boolean;
  category: Category;
  comingSoon?: boolean;
};

const FEATURES: Feature[] = [
  // Core Features
  { icon: Share2, name: "Referral Hub", description: "Share your unique link and recruit pros into your 4-level network income cascade.", href: "/dashboard/referral", color: "#3b82f6″, bg: "rgba(59,130,246,0.12)", isNew: false, category: "core" },
  { icon: DollarSign, name: "Earnings Tracker", description: "Real-time breakdown of job commissions, override income, and subscription overrides.", href: "/dashboard/earnings", color: "#22c55e", bg: "rgba(34,197,94,0.12)", isNew: false, category: "core" },
  { icon: Briefcase, name: "Job Log", description: "Log completed jobs to build your work history and improve your algorithm ranking.", href: "/job-log", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", isNew: false, category: "core" },
  { icon: Network, name: "Network Tree", description: "Visualize your full downline across all 4 levels — see who's active and earning.", href: "/network-tree", color: "#8b5cf6″, bg: "rgba(139,92,246,0.12)", isNew: true, category: "core" },
  { icon: Award, name: "Tier Progress", description: "Track your journey from Level 4 up to Charter Member with unlock milestones.", href: "/dashboard/tier", color: "#F5E642″, bg: "rgba(245,230,66,0.12)", isNew: false, category: "core" },
  { icon: Trophy, name: "Leaderboard", description: "See where you rank among the top referrers in the ProLnk founding network.", href: "/leaderboard", color: "#F5E642″, bg: "rgba(245,230,66,0.12)", isNew: false, category: "core" },

  // Partner Tools
  { icon: BarChart3, name: "Earnings Calculator", description: "Model your projected monthly income as your network grows using live rates.", href: "/dashboard/calculator", color: "#22c55e", bg: "rgba(34,197,94,0.12)", isNew: false, category: "tools" },
  { icon: Camera, name: "Photo Upload", description: "Add before/after job photos to build your credibility score with homeowners.", href: "/photo-upload", color: "#3b82f6″, bg: "rgba(59,130,246,0.12)", isNew: false, category: "tools" },
  { icon: TrendingUp, name: "Performance Alerts", description: "Get notified when your ranking changes, a new referral joins, or a tier milestone is hit.", href: "/dashboard/alerts", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", isNew: true, category: "tools" },
  { icon: FileText, name: "Commission Ledger", description: "Full audit trail of every commission event, override payment, and pending balance.", href: "/commission-ledger", color: "#8b5cf6″, bg: "rgba(139,92,246,0.12)", isNew: false, category: "tools" },
  { icon: Users, name: "Referral Funnel", description: "Track every lead in your recruitment funnel — click, signup, conversion.", href: "/dashboard/referral-funnel", color: "#3b82f6″, bg: "rgba(59,130,246,0.12)", isNew: true, category: "tools" },
  { icon: Settings, name: "Partner Settings", description: "Manage your notification preferences, payout methods, and account security.", href: "/dashboard/settings", color: "#9ca3af", bg: "rgba(156,163,175,0.12)", isNew: false, category: "tools" },
  { icon: Bell, name: "Notifications", description: "Unified feed for leads, commission events, tier changes, and platform updates.", href: "/dashboard/notifications", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", isNew: false, category: "tools" },
  { icon: MessageSquare, name: "Unified Inbox", description: "All your messages — homeowner inquiries, platform alerts — in one place.", href: "/dashboard/inbox", color: "#3b82f6″, bg: "rgba(59,130,246,0.12)", isNew: true, category: "tools" },

  // TrustyPro
  { icon: Home, name: "Home Health Dashboard", description: "View property health scans, maintenance history, and system condition for homes you've serviced.", href: "/trustypro/home-health", color: "#22c55e", bg: "rgba(34,197,94,0.12)", isNew: true, category: "trustypro" },
  { icon: Camera, name: "Photo Scan AI", description: "AI-powered analysis of your job photos — automatically detects issues and documents conditions.", href: "/trustypro/scan", color: "#3b82f6″, bg: "rgba(59,130,246,0.12)", isNew: true, category: "trustypro" },
  { icon: Search, name: "Pro Directory", description: "Searchable directory of all verified pros in the ProLnk network, filterable by trade and region.", href: "/partners", color: "#8b5cf6″, bg: "rgba(139,92,246,0.12)", isNew: false, category: "trustypro" },
  { icon: Shield, name: "Compliance Docs", description: "Access your service agreements, TCPA consent records, and insurance documentation.", href: "/dashboard/compliance", color: "#22c55e", bg: "rgba(34,197,94,0.12)", isNew: false, category: "trustypro" },

  // Exchange
  { icon: Layers, name: "Job Exchange", description: "Browse available jobs posted by other pros and bid on work in your trade area.", href: "/exchange/jobs", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", isNew: true, category: "exchange" },
  { icon: Globe, name: "Exchange Home", description: "The ProLnk peer-to-peer job marketplace — post jobs you need help with, or pick up extra work.", href: "/exchange/home", color: "#3b82f6″, bg: "rgba(59,130,246,0.12)", isNew: true, category: "exchange" },
  { icon: FileText, name: "My Bids", description: "Track all bids you've submitted on the exchange — view status, responses, and wins.", href: "/exchange/my-bids", color: "#8b5cf6″, bg: "rgba(139,92,246,0.12)", isNew: true, category: "exchange" },

  // Coming Soon
  { icon: Map, name: "Territory Manager", description: "Claim and protect your service territory with geo-fenced lead routing.", href: "#", color: "#9ca3af", bg: "rgba(156,163,175,0.08)", isNew: false, category: "soon", comingSoon: true },
  { icon: Star, name: "Lead Matching", description: "AI-powered matching connects your profile to homeowners who need your trade.", href: "#", color: "#9ca3af", bg: "rgba(156,163,175,0.08)", isNew: false, category: "soon", comingSoon: true },
  { icon: BookOpen, name: "Training Academy", description: "Courses, certifications, and playbooks to increase your algorithm score.", href: "/dashboard/academy", color: "#9ca3af", bg: "rgba(156,163,175,0.08)", isNew: false, category: "soon", comingSoon: true },
];

const QUICK_SETUP = [
  { step: 1, label: "Complete your partner profile", href: "/partner-onboarding", icon: Settings, color: "#F5E642″ },
  { step: 2, label: "Copy and share your referral link", href: "/dashboard/referral", icon: Share2, color: "#3b82f6″ },
  { step: 3, label: "Log your first job", href: "/job-log", icon: Briefcase, color: "#f59e0b" },
  { step: 4, label: "Upload job photos for your profile", href: "/photo-upload", icon: Camera, color: "#22c55e" },
  { step: 5, label: "Explore the Founding Network dashboard", href: "/dashboard/founding", icon: Rocket, color: "#8b5cf6″ },
];

const TAB_CONFIG: { id: Category; label: string }[] = [
  { id: "core", label: "Core Features" },
  { id: "tools", label: "Partner Tools" },
  { id: "trustypro", label: "TrustyPro" },
  { id: "exchange", label: "Exchange" },
  { id: "soon", label: "Coming Soon" },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const { icon: Icon, name, description, href, color, bg, isNew, comingSoon } = feature;

  const inner = (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 h-full transition-all"
      style={{
        background: bg,
        border: `1px solid ${comingSoon ? "rgba(255,255,255,0.06)" : color + "33"}`,
        opacity: comingSoon ? 0.6 : 1,
        cursor: comingSoon ? "default" : "pointer",
      }}
    >
      <div className="flex items-start justify-between gap-2″>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0″
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <Icon size={19} style={{ color }} />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {isNew && !comingSoon && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "rgba(245,230,66,0.15)", color: "#F5E642″, border: "1px solid rgba(245,230,66,0.3)" }}
            >
              New
            </span>
          )}
          {comingSoon && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: "rgba(156,163,175,0.1)", color: "#6b7280″, border: "1px solid rgba(156,163,175,0.2)" }}
            >
              Soon
            </span>
          )}
        </div>
      </div>
      <div className="flex-1″>
        <p className="text-sm font-bold text-white mb-1″>{name}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      </div>
      {!comingSoon && (
        <div className="flex items-center gap-1 text-xs font-semibold" style={{ color }}>
          Open <ChevronRight size={12} />
        </div>
      )}
    </div>
  );

  if (comingSoon) return <div>{inner}</div>;

  return (
    <Link href={href}>
      <div className="h-full">{inner}</div>
    </Link>
  );
}

export default function FeatureDiscovery() {
  const [activeTab, setActiveTab] = useState<Category>("core");

  const filtered = FEATURES.filter((f) => f.category === activeTab);

  return (
    <div className="min-h-screen" style={{ background: "#0A1628″ }}>
      <div className="max-w-6xl mx-auto px-4 py-8″>

        {/* Header */}
        <div className="mb-8″>
          <div className="flex items-center gap-3 mb-3″>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(245,230,66,0.12)" }}
            >
              <Rocket size={20} style={{ color: "#F5E642″ }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Platform Features</h1>
              <p className="text-sm text-gray-400″>Everything available in your partner portal</p>
            </div>
          </div>
        </div>

        {/* Quick Setup */}
        <div
          className="rounded-2xl p-6 mb-8″
          style={{ background: "linear-gradient(135deg, rgba(245,230,66,0.08), rgba(10,22,40,0))", border: "1px solid rgba(245,230,66,0.2)" }}
        >
          <div className="flex items-center gap-3 mb-5″>
            <CheckSquare size={18} style={{ color: "#F5E642″ }} />
            <h2 className="text-base font-bold text-white">Quick Setup — 5 things to do in your first 24 hours</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3″>
            {QUICK_SETUP.map(({ step, label, href, icon: Icon, color }) => (
              <Link key={step} href={href}>
                <div
                  className="rounded-xl p-4 flex flex-col gap-3 cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${color}22`, color }}
                    >
                      {step}
                    </span>
                    <Icon size={15} style={{ color }} />
                  </div>
                  <p className="text-xs text-gray-300 font-medium leading-snug">{label}</p>
                  <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color }}>
                    Go <ArrowRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1″>
          {TAB_CONFIG.map(({ id, label }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
                style={{
                  background: active ? "rgba(245,230,66,0.15)" : "rgba(255,255,255,0.05)",
                  color: active ? "#F5E642″ : "#6b7280",
                  border: active ? "1px solid rgba(245,230,66,0.35)" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {label}
                <span
                  className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active ? "rgba(245,230,66,0.2)" : "rgba(255,255,255,0.07)",
                    color: active ? "#F5E642″ : "#4b5563",
                  }}
                >
                  {FEATURES.filter((f) => f.category === id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4″>
          {filtered.map((feature) => (
            <FeatureCard key={feature.name} feature={feature} />
          ))}
        </div>

        {/* Footer CTA */}
        <div
          className="mt-8 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4″
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="text-sm font-bold text-white">Missing something?</p>
            <p className="text-xs text-gray-400 mt-0.5″>New features ship every sprint. Check the What's New page for the latest additions.</p>
          </div>
          <Link href="/dashboard/whats-new">
            <span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 whitespace-nowrap"
              style={{ background: "#F5E642″, color: "#0A1628" }}
            >
              What's New <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
