import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Loader2, Users, ChevronRight, Network, TrendingUp, DollarSign } from "lucide-react";

const TIER_BORDER: Record<string, string> = {
  charter:  "#F5E642",
  founding: "#3b82f6",
  level3:   "#22c55e",
  level4:   "#8b5cf6",
  waitlist: "#6b7280",
};

const TIER_LABEL: Record<string, string> = {
  charter:  "Charter Member",
  founding: "Founding Member",
  level3:   "Level 3 Partner",
  level4:   "Level 4 Partner",
  waitlist: "Waitlist",
};

const AVG_JOB_VALUE = 800;
const JOBS_PER_MONTH = 8;
const PLATFORM_FEE = 0.12;
const L1_JOB_RATE = 0.07;
const L1_SUB_RATE = 0.12;
const SUB_RATE = 149;

function calcMonthlyEarnings(l1Count: number) {
  const feePerJob = AVG_JOB_VALUE * PLATFORM_FEE;
  const l1JobOverride = l1Count * JOBS_PER_MONTH * feePerJob * L1_JOB_RATE;
  const l1SubOverride = l1Count * SUB_RATE * L1_SUB_RATE;
  return Math.round(l1JobOverride + l1SubOverride);
}

function calcFullNetworkPotential(l1Count: number) {
  const feePerJob = AVG_JOB_VALUE * PLATFORM_FEE;
  const l2 = l1Count * 3;
  const l3 = l2 * 2;
  const l4 = l3 * 2;
  const jobO =
    l1Count * JOBS_PER_MONTH * feePerJob * 0.07 +
    l2      * JOBS_PER_MONTH * feePerJob * 0.04 +
    l3      * JOBS_PER_MONTH * feePerJob * 0.02 +
    l4      * JOBS_PER_MONTH * feePerJob * 0.01;
  const subO =
    l1Count * SUB_RATE * 0.12 +
    l2      * SUB_RATE * 0.06 +
    l3      * SUB_RATE * 0.03 +
    l4      * SUB_RATE * 0.015;
  return { total: Math.round(jobO + subO), l1Count, l2, l3, l4 };
}

function UserCard({
  name, tier, position, referralCode,
}: {
  name: string; tier: string; position: number; referralCode: string;
}) {
  const border = TIER_BORDER[tier] ?? "#6b7280";
  const label = TIER_LABEL[tier] ?? "Waitlist";
  return (
    <div
      className="flex flex-col items-center px-4 sm:px-6 py-4 rounded-2xl w-full sm:w-auto"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: `2px solid ${border}`,
        boxShadow: `0 0 24px ${border}33`,
      }}
    >
      <div
        className="text-xs font-bold px-3 py-1 rounded-full mb-2"
        style={{ background: `${border}22`, color: border }}
      >
        {label}
      </div>
      <p className="text-lg font-bold text-white text-center">{name}</p>
      <p className="text-xs text-gray-400 mt-1 text-center">
        Position #{position} &middot; Code: <span className="font-mono text-gray-300">{referralCode}</span>
      </p>
    </div>
  );
}

function ReferralNode({
  ref: r, index, total,
}: {
  ref: { firstName: string; trade: string; joinedAt?: string };
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  return (
    <div className="flex items-start gap-0">
      <div className="flex flex-col items-center" style={{ width: 24 }}>
        <div
          style={{
            width: 2,
            height: 20,
            background: "rgba(245,230,66,0.35)",
          }}
        />
        <div className="flex items-center" style={{ gap: 0 }}>
          <div style={{ width: 20, height: 2, background: "rgba(245,230,66,0.35)" }} />
        </div>
        {!isLast && (
          <div style={{ flex: 1, width: 2, minHeight: 40, background: "rgba(245,230,66,0.35)" }} />
        )}
      </div>
      <div className="mb-3 flex-1">
        <div
          className="inline-flex flex-col px-4 py-3 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            minWidth: 220,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}
            >
              {r.firstName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{r.firstName}</p>
              <p className="text-xs text-gray-500">{r.trade}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}
            >
              L1
            </span>
            {r.joinedAt && (
              <span className="text-[10px] text-gray-600">
                Joined {new Date(r.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>
        </div>
        <div
          className="mt-2 ml-4 px-3 py-2 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            maxWidth: 320,
          }}
        >
          <p className="text-[10px] text-gray-600 italic">
            L2+ data loads when your direct recruits also recruit
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NetworkTree() {
  const { user, isAuthenticated } = useAuth();
  const email = user?.email ?? "";

  const { data: status, isLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: isAuthenticated && !!email }
  );

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: "#0A1628" }}
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#F5E642" }} />
          <p className="text-sm text-gray-400">Loading your network tree...</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center px-6"
        style={{ background: "#0A1628" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: "rgba(245,230,66,0.1)" }}
        >
          <Network size={28} style={{ color: "#F5E642" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Not on the waitlist yet</h2>
        <p className="text-gray-400 mb-6 max-w-sm text-sm">
          Join the ProLnk founding network to see your partner tree and start earning network overrides.
        </p>
        <Link href="/join">
          <span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
            style={{ background: "#F5E642", color: "#0A1628" }}
          >
            Claim Your Spot <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    );
  }

  const tier = status.tier ?? "waitlist";
  const referrals: { firstName: string; trade: string; joinedAt?: string }[] = status.referrals ?? [];
  const l1Count = referrals.length;
  const monthlyL1 = calcMonthlyEarnings(l1Count);
  const fullPotential = calcFullNetworkPotential(Math.max(l1Count, 5));
  const hasReferrals = l1Count > 0;

  const fullName = `${status.firstName ?? ""} ${status.lastName ?? ""}`.trim() || "You";

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <Helmet>
        <title>ProLnk Partner Network Tree — Your Recruiting Downline</title>
        <meta name="description" content="View your 4-level partner network tree and calculate override income potential. Track recruits and network earnings in real time." />
        <meta property="og:title" content="ProLnk Partner Network Tree" />
        <meta property="og:description" content="View your 4-level partner network tree and calculate override income potential. Track recruits and network earnings in real time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.io/network-tree" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ProLnk Partner Network Tree" />
        <meta name="twitter:description" content="View your 4-level partner network tree and calculate override income potential." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.io/network-tree" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Network size={22} style={{ color: "#F5E642" }} />
              Partner Network Tree
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Your 4-level recruiting downline and earnings potential
            </p>
          </div>
          <Link href="/dashboard/partner-home">
            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#F5E642" }}>
              Dashboard <ChevronRight size={12} />
            </span>
          </Link>
        </div>

        {/* Tree visualization */}
        <div
          className="rounded-2xl p-8 mb-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Root node — the user */}
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <UserCard
                name={fullName}
                tier={tier}
                position={status.position ?? 0}
                referralCode={status.referralCode ?? ""}
              />
            </div>

            {/* Connector down */}
            {hasReferrals && (
              <div style={{ width: 2, height: 24, background: "rgba(245,230,66,0.35)", marginLeft: 16 }} />
            )}

            {/* L1 referrals */}
            {hasReferrals ? (
              <div className="pl-4">
                {referrals.map((r, i) => (
                  <ReferralNode
                    key={i}
                    ref={r}
                    index={i}
                    total={referrals.length}
                  />
                ))}
              </div>
            ) : (
              <div
                className="mt-4 rounded-2xl p-8 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px dashed rgba(245,230,66,0.2)",
                  maxWidth: 480,
                }}
              >
                <Users size={32} className="mx-auto mb-3 text-gray-600" />
                <p className="text-white font-semibold mb-1">Your network tree will appear here</p>
                <p className="text-sm text-gray-400 mb-4">
                  Once you recruit your first pro, share your referral link to start building your network.
                </p>
                <Link href="/dashboard/partner-home">
                  <span
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: "#F5E642", color: "#0A1628" }}
                  >
                    Get Your Referral Link <ChevronRight size={14} />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Earnings summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} style={{ color: "#3b82f6" }} />
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">L1 Recruits</p>
            </div>
            <p className="text-3xl font-bold text-white">{l1Count}</p>
            <p className="text-xs text-gray-500 mt-1">Direct referrals in your network</p>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={16} style={{ color: "#22c55e" }} />
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Monthly L1 Override</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {l1Count > 0 ? `$${monthlyL1.toLocaleString()}` : "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {l1Count > 0
                ? `7% job + 12% sub overrides on ${l1Count} pro${l1Count !== 1 ? "s" : ""}`
                : "Recruit your first pro to unlock"}
            </p>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(245,230,66,0.06)", border: "1px solid rgba(245,230,66,0.2)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} style={{ color: "#F5E642" }} />
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#F5E642" }}>4-Level Potential</p>
            </div>
            <p className="text-3xl font-bold" style={{ color: "#F5E642" }}>
              ${fullPotential.total.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              /mo est. at {fullPotential.l1Count}L1 · {fullPotential.l2}L2 · {fullPotential.l3}L3 · {fullPotential.l4}L4
            </p>
          </div>
        </div>

        {/* Earnings breakdown legend */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h3 className="text-sm font-bold text-white mb-4">Override Rate Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { level: "L1", jobRate: "7%", subRate: "12%", color: "#3b82f6" },
              { level: "L2", jobRate: "4%", subRate: "6%",  color: "#22c55e" },
              { level: "L3", jobRate: "2%", subRate: "3%",  color: "#f59e0b" },
              { level: "L4", jobRate: "1%", subRate: "1.5%", color: "#8b5cf6" },
            ].map(({ level, jobRate, subRate, color }) => (
              <div
                key={level}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33` }}
              >
                <div
                  className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-2"
                  style={{ background: `${color}22`, color }}
                >
                  {level}
                </div>
                <p className="text-xs text-gray-400">Job override: <span className="text-white font-semibold">{jobRate}</span></p>
                <p className="text-xs text-gray-400">Sub override: <span className="text-white font-semibold">{subRate}</span></p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4">
            Earnings estimate: avg $800 job &times; 8 jobs/mo/pro &times; 12% platform fee &times; override rate.
            Subscription overrides on $149/mo per pro.
          </p>
        </div>
      </div>
    </div>
  );
}
