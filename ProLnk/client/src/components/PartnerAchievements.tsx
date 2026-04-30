/**
 * PartnerAchievements — CS-06 + CS-07
 * Streak counter (consecutive months with referrals) + achievement badges.
 * Shown on PartnerDashboard and EarningsTracker.
 */
import { useMemo } from "react";
import { Flame, Star, Zap, Trophy, Award, TrendingUp, Camera, Users, Shield, Clock } from "lucide-react";

// --- Badge Definitions -------------------------------------------------------
export const BADGE_DEFS = [
  {
    id: "first_referral",
    label: "First Referral",
    desc: "Generated your first referral",
    icon: Star,
    color: "#F59E0B",
    bg: "#FEF3C7",
    threshold: (p: PartnerStats) => (p.referralCount ?? 0) >= 1,
  },
  {
    id: "top_referrer",
    label: "Top Referrer",
    desc: "Sent 25+ referrals",
    icon: TrendingUp,
    color: "#10B981",
    bg: "#D1FAE5",
    threshold: (p: PartnerStats) => (p.referralCount ?? 0) >= 25,
  },
  {
    id: "photo_pro",
    label: "Photo Pro",
    desc: "Logged 50+ jobs with photos",
    icon: Camera,
    color: "#3B82F6",
    bg: "#DBEAFE",
    threshold: (p: PartnerStats) => (p.jobsLogged ?? 0) >= 50,
  },
  {
    id: "network_builder",
    label: "Network Builder",
    desc: "Recruited 3+ partners",
    icon: Users,
    color: "#8B5CF6",
    bg: "#EDE9FE",
    threshold: (p: PartnerStats) => (p.partnersReferred ?? 0) >= 3,
  },
  {
    id: "rising_star",
    label: "Rising Star",
    desc: "Earned $1,000+ in commissions",
    icon: Zap,
    color: "#F97316",
    bg: "#FFEDD5",
    threshold: (p: PartnerStats) => parseFloat(String(p.totalCommissionEarned ?? "0")) >= 1000,
  },
  {
    id: "commission_king",
    label: "Commission King",
    desc: "Earned $10,000+ in commissions",
    icon: Trophy,
    color: "#D97706",
    bg: "#FEF3C7",
    threshold: (p: PartnerStats) => parseFloat(String(p.totalCommissionEarned ?? "0")) >= 10000,
  },
  {
    id: "verified_elite",
    label: "Verified Elite",
    desc: "COI + license verified",
    icon: Shield,
    color: "#0A1628",
    bg: "#E0E7FF",
    threshold: (p: PartnerStats) => !!(p.coiVerifiedAt && p.licenseVerifiedAt),
  },
  {
    id: "fastest_responder",
    label: "Fastest Responder",
    desc: "Average lead response under 2 hours",
    icon: Clock,
    color: "#06B6D4",
    bg: "#CFFAFE",
    threshold: (p: PartnerStats) => parseFloat(String(p.avgLeadResponseHours ?? "24")) < 2,
  },
  {
    id: "streak_3",
    label: "3-Month Streak",
    desc: "3 consecutive months with referrals",
    icon: Flame,
    color: "#EF4444",
    bg: "#FEE2E2",
    threshold: (p: PartnerStats) => (p.referralStreakMonths ?? 0) >= 3,
  },
  {
    id: "streak_6",
    label: "6-Month Streak",
    desc: "6 consecutive months with referrals",
    icon: Flame,
    color: "#DC2626",
    bg: "#FEE2E2",
    threshold: (p: PartnerStats) => (p.referralStreakMonths ?? 0) >= 6,
  },
];

export interface PartnerStats {
  referralCount?: number;
  jobsLogged?: number;
  partnersReferred?: number;
  totalCommissionEarned?: string | number;
  coiVerifiedAt?: string | Date | null;
  licenseVerifiedAt?: string | Date | null;
  avgLeadResponseHours?: string | number;
  referralStreakMonths?: number;
  achievementBadges?: string[] | null;
}

interface PartnerAchievementsProps {
  partner: PartnerStats;
  compact?: boolean;
}

export function computeBadges(partner: PartnerStats): typeof BADGE_DEFS {
  return BADGE_DEFS.filter((b) => b.threshold(partner));
}

export default function PartnerAchievements({ partner, compact = false }: PartnerAchievementsProps) {
  const earned = useMemo(() => computeBadges(partner), [partner]);
  const streak = partner.referralStreakMonths ?? 0;

  if (compact) {
    // Compact mode: just the streak flame + badge count pill
    return (
      <div className="flex items-center gap-2">
        {streak > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-50 border border-red-100">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span className="text-xs font-bold text-red-600">{streak}mo</span>
          </div>
        )}
        {earned.length > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 border border-yellow-100">
            <Award className="w-3.5 h-3.5 text-yellow-600" />
            <span className="text-xs font-bold text-yellow-700">{earned.length}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-gray-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#0A1628]" /> Achievements
        </h3>
        <span className="text-xs text-gray-400">{earned.length} / {BADGE_DEFS.length} earned</span>
      </div>

      {/* Streak Counter */}
      <div className={`flex items-center gap-3 p-3 rounded-xl mb-4 ${streak > 0 ? "bg-red-50 border border-red-100" : "bg-gray-50 border border-gray-100"}`}>
        <div className={`p-2 rounded-lg ${streak > 0 ? "bg-red-100" : "bg-gray-200"}`}>
          <Flame className={`w-5 h-5 ${streak > 0 ? "text-red-500" : "text-gray-400"}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">
            {streak > 0 ? `${streak}-Month Referral Streak` : "No Active Streak"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {streak > 0
              ? `${streak} consecutive month${streak !== 1 ? "s" : ""} with at least 1 referral`
              : "Log a referral this month to start your streak"}
          </p>
        </div>
        {streak >= 3 && (
          <div className="flex-shrink-0">
            <span className="text-lg">🔥</span>
          </div>
        )}
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BADGE_DEFS.map((badge) => {
          const isEarned = badge.threshold(partner);
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              title={badge.desc}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
                isEarned
                  ? "border-transparent shadow-sm"
                  : "border-gray-100 opacity-40 grayscale"
              }`}
              style={isEarned ? { backgroundColor: badge.bg, borderColor: badge.color + "30" } : {}}
            >
              <div
                className="p-1.5 rounded-lg flex-shrink-0"
                style={isEarned ? { backgroundColor: badge.color + "20" } : { backgroundColor: "#F3F4F6" }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: isEarned ? badge.color : "#9CA3AF" }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate leading-tight">{badge.label}</p>
                <p className="text-[10px] text-gray-500 truncate leading-tight mt-0.5">{badge.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {earned.length === 0 && (
        <p className="text-center text-xs text-gray-400 mt-3">
          Start logging jobs and generating referrals to unlock badges.
        </p>
      )}
    </div>
  );
}
