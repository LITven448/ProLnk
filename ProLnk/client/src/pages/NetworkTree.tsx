import React from 'react';
import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Loader2, Users, ChevronRight, ChevronDown, Network, TrendingUp,
  DollarSign, Star, Layers, UserPlus, Zap,
} from "lucide-react";

// ── Tier Config ────────────────────────────────────────────────────────────────
const TIER_COLOR: Record<string, string> = {
  charter:  "#F5C518",
  founding: "#2DD4BF",
  level3:   "#A78BFA",
  level4:   "#60A5FA",
  waitlist: "#6b7280",
};

const TIER_LABEL: Record<string, string> = {
  charter:  "Charter",
  founding: "Founding",
  level3:   "L3 Partner",
  level4:   "L4 Partner",
  waitlist: "Waitlist",
};

// ── Rate Constants ─────────────────────────────────────────────────────────────
const AVG_JOB  = 800;
const JOBS_MO  = 8;
const PLAT_FEE = 0.12;
const SUB_MO   = 149;

const JOB_RATES = [0.07, 0.04, 0.02, 0.01];
const SUB_RATES = [0.12, 0.06, 0.03, 0.015];

function monthlyOverride(count: number, level: number) {
  const feePerJob = AVG_JOB * PLAT_FEE;
  return Math.round(
    count * JOBS_MO * feePerJob * JOB_RATES[level] +
    count * SUB_MO * SUB_RATES[level]
  );
}

function fullPotential(l1: number) {
  const l2 = l1 * 3;
  const l3 = l2 * 2;
  const l4 = l3 * 2;
  const counts = [l1, l2, l3, l4];
  const total = counts.reduce((sum, n, i) => sum + monthlyOverride(n, i), 0);
  return { total, l1, l2, l3, l4 };
}

// ── Types ──────────────────────────────────────────────────────────────────────
type Pro = {
  firstName: string;
  trade: string;
  tier?: string;
  joinedAt?: string;
  referrals?: Pro[];
};

type ActivityStatus = "active" | "inactive30" | "inactive90";

function activityStatus(joinedAt?: string): ActivityStatus {
  if (!joinedAt) return "inactive90";
  const d = (Date.now() - new Date(joinedAt).getTime()) / 86_400_000;
  if (d <= 30) return "active";
  if (d <= 90) return "inactive30";
  return "inactive90";
}

const ACTIVITY_COLOR: Record<ActivityStatus, string> = {
  active:     "#22c55e",
  inactive30: "#f59e0b",
  inactive90: "#ef4444",
};

const ACTIVITY_LABEL: Record<ActivityStatus, string> = {
  active:     "Active",
  inactive30: "Quiet 30d",
  inactive90: "Inactive 90d+",
};

const LEVEL_LABELS = ["L1", "L2", "L3", "L4"];
const LEVEL_COLORS = ["#60A5FA", "#2DD4BF", "#A78BFA", "#F59E0B"];

// ── ProNode (recursive) ───────────────────────────────────────────────────────
function ProNode({ pro, level, isLast }: { pro: Pro; level: number; isLast: boolean }) {
  const [expanded, setExpanded] = useState(level < 2);
  const hasChildren = (pro.referrals ?? []).length > 0;
  const activity = activityStatus(pro.joinedAt);
  const actColor = ACTIVITY_COLOR[activity];
  const levelColor = LEVEL_COLORS[level] ?? "#6b7280";
  const tierColor = TIER_COLOR[pro.tier ?? "waitlist"] ?? "#6b7280";

  return (
    <div className="flex items-start gap-0">
      <div className="flex flex-col items-center" style={{ width: 24, flexShrink: 0 }}>
        <div style={{ width: 2, height: 20, background: `${levelColor}44` }} />
        <div style={{ width: 20, height: 2, background: `${levelColor}44` }} />
        {!isLast && (
          <div style={{ flex: 1, width: 2, minHeight: 48, background: `${levelColor}44` }} />
        )}
      </div>

      <div className="mb-3 flex-1">
        <div
          className="rounded-xl p-3"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${actColor}40`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: `${actColor}20`, color: actColor }}
            >
              {pro.firstName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-semibold text-white truncate">{pro.firstName}</span>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${tierColor}20`, color: tierColor }}
                >
                  {TIER_LABEL[pro.tier ?? "waitlist"]}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{pro.trade}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: `${levelColor}20`, color: levelColor }}
              >
                {LEVEL_LABELS[level]}
              </span>
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{ background: `${actColor}18`, color: actColor }}
              >
                {ACTIVITY_LABEL[activity]}
              </span>
            </div>
          </div>

          {pro.joinedAt && (
            <p className="text-[10px] text-gray-600 mt-1.5 pl-10">
              Joined {new Date(pro.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              {" · "}
              <span className="text-gray-500">
                Est. ${monthlyOverride(1, level).toLocaleString()}/mo override
              </span>
            </p>
          )}

          {hasChildren && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="mt-2 ml-10 flex items-center gap-1 text-[10px] font-semibold transition-opacity"
              style={{ color: levelColor, opacity: 0.8 }}
            >
              {expanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              {expanded ? "Collapse" : `Expand ${pro.referrals!.length} recruit${pro.referrals!.length !== 1 ? "s" : ""}`}
            </button>
          )}
        </div>

        {hasChildren && expanded && (
          <div className="pl-4 mt-1">
            {pro.referrals!.map((child, i) => (
              <ProNode
                key={i}
                pro={child}
                level={level + 1}
                isLast={i === pro.referrals!.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub: string; color: string; icon: React.ElementType;
}) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}30` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon size={15} style={{ color }} />
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function NetworkTree() {
  const { user, isAuthenticated } = useAuth();
  const email = user?.email ?? "";

  const { data: status, isLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: isAuthenticated && !!email }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#0A1628" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#2DD4BF" }} />
          <p className="text-sm text-gray-400">Loading your network tree…</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6" style={{ background: "#0A1628" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(45,212,191,0.1)" }}>
          <Network size={28} style={{ color: "#2DD4BF" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Not on the waitlist yet</h2>
        <p className="text-gray-400 mb-6 max-w-sm text-sm">
          Join the ProLnk founding network to see your partner tree and start earning network overrides.
        </p>
        <Link href="/join">
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "#2DD4BF", color: "#0A1628" }}>
            Claim Your Spot <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    );
  }

  const tier = status.tier ?? "waitlist";
  const rawReferrals: Pro[] = (status.referrals ?? []) as Pro[];
  const l1Count = rawReferrals.length;
  const hasReferrals = l1Count > 0;

  function countNodes(nodes: Pro[], depth = 0): number {
    return nodes.reduce((sum, n) => sum + 1 + countNodes(n.referrals ?? [], depth + 1), 0);
  }
  const totalNodes = countNodes(rawReferrals);

  const activeCount = rawReferrals.filter(r => activityStatus(r.joinedAt) === "active").length;
  const potential = fullPotential(Math.max(l1Count, 5));
  const thisMonthEarnings = monthlyOverride(l1Count, 0);
  const fullName = `${status.firstName ?? ""} ${status.lastName ?? ""}`.trim() || "You";
  const myTierColor = TIER_COLOR[tier] ?? "#6b7280";

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <Helmet>
        <title>ProLnk Partner Network Tree — Your Recruiting Downline</title>
        <meta name="description" content="View your 4-level partner network tree and calculate override income potential." />
        <link rel="canonical" href="https://prolnk.io/network-tree" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Network size={22} style={{ color: "#2DD4BF" }} />
              Partner Network Tree
            </h1>
            <p className="text-gray-400 text-sm mt-1">Your 4-level recruiting downline and earnings potential</p>
            {hasReferrals && (
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(45,212,191,0.12)", color: "#2DD4BF" }}>
                  <Layers size={12} />
                  {totalNodes} total node{totalNodes !== 1 ? "s" : ""}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
                  {activeCount} active
                </span>
                {l1Count - activeCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.10)", color: "#ef4444" }}>
                    {l1Count - activeCount} need outreach
                  </span>
                )}
              </div>
            )}
          </div>
          <Link href="/dashboard/partner-home">
            <span className="text-xs font-semibold flex items-center gap-1 shrink-0" style={{ color: "#2DD4BF" }}>
              Dashboard <ChevronRight size={12} />
            </span>
          </Link>
        </div>

        {/* Network Income This Month */}
        {hasReferrals && (
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.10), rgba(45,212,191,0.04))", border: "1px solid rgba(45,212,191,0.25)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#2DD4BF" }}>
              Network Income This Month
            </p>
            <p className="text-4xl font-bold text-white mb-1">
              ${thisMonthEarnings.toLocaleString()}
              <span className="text-base font-normal text-gray-400 ml-1">/mo est.</span>
            </p>
            <p className="text-xs text-gray-400">
              From {l1Count} direct L1 recruit{l1Count !== 1 ? "s" : ""} — grow to L4 to multiply this
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[0, 1, 2, 3].map(i => {
                const cnt = i === 0 ? l1Count : 0;
                return (
                  <div
                    key={i}
                    className="rounded-xl p-3 text-center"
                    style={{ background: `${LEVEL_COLORS[i]}10`, border: `1px solid ${LEVEL_COLORS[i]}30` }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: LEVEL_COLORS[i] }}>
                      {LEVEL_LABELS[i]}
                    </p>
                    <p className="text-lg font-bold text-white">{cnt}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      {JOB_RATES[i] * 100}% job / {SUB_RATES[i] * 100}% sub
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tree */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-6"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Root node */}
          <div className="mb-6">
            <div
              className="inline-flex flex-col px-5 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.06)", border: `2px solid ${myTierColor}`, boxShadow: `0 0 24px ${myTierColor}33` }}
            >
              <span
                className="text-[10px] font-bold px-3 py-0.5 rounded-full self-start mb-2"
                style={{ background: `${myTierColor}22`, color: myTierColor }}
              >
                {TIER_LABEL[tier]} — You
              </span>
              <p className="text-lg font-bold text-white">{fullName}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Position #{status.position ?? 0} · Code:{" "}
                <span className="font-mono text-gray-300">{status.referralCode ?? ""}</span>
              </p>
            </div>
          </div>

          {/* Connector */}
          {hasReferrals && (
            <div style={{ width: 2, height: 20, background: "rgba(96,165,250,0.4)", marginLeft: 16, marginBottom: 0 }} />
          )}

          {/* L1+ tree */}
          {hasReferrals ? (
            <div className="pl-4">
              {rawReferrals.map((pro, i) => (
                <ProNode key={i} pro={pro} level={0} isLast={i === rawReferrals.length - 1} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-2xl p-8 text-center mt-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(45,212,191,0.2)", maxWidth: 480 }}
            >
              <Users size={32} className="mx-auto mb-3 text-gray-600" />
              <p className="text-white font-semibold mb-1">Your network tree will appear here</p>
              <p className="text-sm text-gray-400 mb-4">
                Share your referral link to recruit your first pro and start earning L1–L4 overrides.
              </p>
              <Link href="/dashboard/partner-home">
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: "#2DD4BF", color: "#0A1628" }}
                >
                  Get Your Referral Link <ChevronRight size={14} />
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard
            label="L1 Recruits"
            value={l1Count.toString()}
            sub="Direct referrals in your network"
            color="#60A5FA"
            icon={Users}
          />
          <StatCard
            label="Monthly Override"
            value={l1Count > 0 ? `$${thisMonthEarnings.toLocaleString()}` : "—"}
            sub={l1Count > 0 ? `7% job + 12% sub on ${l1Count} pro${l1Count !== 1 ? "s" : ""}` : "Recruit your first pro to unlock"}
            color="#22c55e"
            icon={DollarSign}
          />
          <StatCard
            label="4-Level Potential"
            value={`$${potential.total.toLocaleString()}`}
            sub={`/mo at ${potential.l1}·${potential.l2}·${potential.l3}·${potential.l4} (L1–L4)`}
            color="#F5C518"
            icon={TrendingUp}
          />
        </div>

        {/* Override rate legend */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h3 className="text-sm font-bold text-white mb-1">Network Override Rate Legend</h3>
          <p className="text-xs text-gray-500 mb-4">
            You earn these % rates on platform fees whenever a pro in your network closes a job or pays their $149/mo subscription.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LEVEL_LABELS.map((lbl, i) => (
              <div
                key={lbl}
                className="rounded-xl p-3"
                style={{ background: `${LEVEL_COLORS[i]}08`, border: `1px solid ${LEVEL_COLORS[i]}30` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${LEVEL_COLORS[i]}22`, color: LEVEL_COLORS[i] }}>
                    {lbl}
                  </div>
                </div>
                <p className="text-xs text-gray-400">Job: <span className="text-white font-semibold">{JOB_RATES[i] * 100}%</span></p>
                <p className="text-xs text-gray-400">Sub: <span className="text-white font-semibold">{SUB_RATES[i] * 100}%</span></p>
              </div>
            ))}
          </div>

          {/* Tier color legend */}
          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-semibold text-gray-400 mb-2">Tier badge colors</p>
            <div className="flex flex-wrap gap-4">
              {[
                { key: "charter",  label: "Charter" },
                { key: "founding", label: "Founding" },
                { key: "level3",   label: "L3 Partner" },
                { key: "level4",   label: "L4 Partner" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: TIER_COLOR[key] }} />
                  <span className="text-[10px] text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity color legend */}
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-semibold text-gray-400 mb-2">Node activity colors</p>
            <div className="flex flex-wrap gap-4">
              {(["active", "inactive30", "inactive90"] as ActivityStatus[]).map(s => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: ACTIVITY_COLOR[s] }} />
                  <span className="text-[10px] text-gray-500">{ACTIVITY_LABEL[s]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start building CTA (empty state) */}
        {!hasReferrals && (
          <div
            className="mt-6 rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.08), rgba(45,212,191,0.03))", border: "1px solid rgba(45,212,191,0.2)" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(45,212,191,0.12)" }}>
              <UserPlus size={26} style={{ color: "#2DD4BF" }} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Start Building Your Network</h3>
            <p className="text-gray-400 text-sm mb-2 max-w-md mx-auto">
              Every pro you recruit earns you 7% on their job overrides and 12% on their $149/mo subscription — forever. Recruit 10 active pros = ~$1,600/mo passive.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              <Link href="/dashboard/referral-hub">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold" style={{ background: "#2DD4BF", color: "#0A1628" }}>
                  <Zap size={15} />
                  Get Referral Link
                </span>
              </Link>
              <Link href="/dashboard/partner-home">
                <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: "rgba(255,255,255,0.15)", color: "white" }}>
                  Dashboard <ChevronRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
