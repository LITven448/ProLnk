import { useState } from "react";
import {
  Trophy, Star, Zap, Flame, Users, DollarSign, Crown, Medal, Award,
  Lock, ChevronRight, Sparkles, TrendingUp, Gift,
} from "lucide-react";

type MilestoneTab = "jobs" | "earnings" | "network";

interface MilestoneMark {
  value: number;
  label: string;
  reward: string;
  achieved: boolean;
}

interface EarnedBadge {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  xp: number;
}

const JOBS_MILESTONES: MilestoneMark[] = [
  { value: 5, label: "5 Jobs", reward: "Silver Badge + 100 XP", achieved: true },
  { value: 10, label: "10 Jobs", reward: "Bronze Shield + 150 XP", achieved: true },
  { value: 25, label: "25 Jobs", reward: "Consistent Pro Badge + 200 XP", achieved: true },
  { value: 50, label: "50 Jobs", reward: "Gold Shield + 300 XP", achieved: true },
  { value: 100, label: "100 Jobs", reward: "Gold Badge + 500 XP + Featured on Leaderboard", achieved: false },
  { value: 250, label: "250 Jobs", reward: "Diamond Badge + 1,000 XP", achieved: false },
  { value: 500, label: "500 Jobs", reward: "Legend Status + 2,500 XP + Account manager", achieved: false },
];

const EARNINGS_MILESTONES: MilestoneMark[] = [
  { value: 1000, label: "$1K", reward: "First Dollar Badge + 50 XP", achieved: true },
  { value: 5000, label: "$5K", reward: "Rising Star + 150 XP", achieved: true },
  { value: 10000, label: "$10K", reward: "Five-Figure Pro + 300 XP", achieved: true },
  { value: 25000, label: "$25K", reward: "Gold Earner Badge + 500 XP", achieved: false },
  { value: 50000, label: "$50K", reward: "Half-Century Club + 750 XP", achieved: false },
  { value: 100000, label: "$100K", reward: "Six-Figure Legend + 2,000 XP + Lifetime Charter Lock", achieved: false },
];

const NETWORK_MILESTONES: MilestoneMark[] = [
  { value: 1, label: "1 Recruit", reward: "Networker Badge + 100 XP", achieved: true },
  { value: 3, label: "3 Recruits", reward: "Team Builder + 200 XP", achieved: true },
  { value: 5, label: "5 Recruits", reward: "Connector Pro + 300 XP", achieved: false },
  { value: 10, label: "10 Recruits", reward: "Network Leader + 500 XP", achieved: false },
  { value: 25, label: "25 Recruits", reward: "Expansion Expert + 1,000 XP", achieved: false },
  { value: 50, label: "50 Recruits", reward: "Empire Builder + 2,500 XP + Custom territory", achieved: false },
];

const BADGES: EarnedBadge[] = [
  { id: "founding", emoji: "🏆", title: "Founding Member", description: "Charter tier partner", earned: true, earnedDate: "Jan 2025″, xp: 500 },
  { id: "speed", emoji: "⚡", title: "Speed Demon", description: "Responded to lead in under 5 min", earned: true, earnedDate: "Feb 2025″, xp: 200 },
  { id: "fivestar", emoji: "⭐", title: "5-Star Pro", description: "5.0 average after 10+ reviews", earned: true, earnedDate: "Mar 2025″, xp: 300 },
  { id: "verified", emoji: "✅", title: "Profile Verified", description: "All credentials confirmed", earned: true, earnedDate: "Jan 2025″, xp: 150 },
  { id: "consistent", emoji: "🔥", title: "Consistent Pro", description: "25 jobs completed", earned: true, earnedDate: "Apr 2025″, xp: 200 },
  { id: "network", emoji: "🤝", title: "Team Builder", description: "3 partners recruited", earned: true, earnedDate: "May 2025″, xp: 200 },
  { id: "earner", emoji: "💰", title: "Five-Figure Pro", description: "$10K lifetime earnings", earned: true, earnedDate: "Apr 2025″, xp: 300 },
  { id: "responder", emoji: "🛡️", title: "Storm Responder", description: "Took job during weather event", earned: true, earnedDate: "Apr 2025″, xp: 250 },
  { id: "gold", emoji: "🥇", title: "Gold Shield", description: "50 jobs completed", earned: false, xp: 300 },
  { id: "centurion", emoji: "💯", title: "Centurion", description: "100 jobs completed", earned: false, xp: 500 },
  { id: "connector", emoji: "🌐", title: "Connector Pro", description: "5 partners recruited", earned: false, xp: 300 },
  { id: "earner25k", emoji: "💎", title: "Gold Earner", description: "$25K lifetime earnings", earned: false, xp: 500 },
];

const CURRENT_JOBS = 84;
const CURRENT_EARNINGS = 14847;
const CURRENT_NETWORK = 3;
const TOTAL_XP = 2100;

function getMilestoneConfig(tab: MilestoneTab) {
  if (tab === "jobs") return { milestones: JOBS_MILESTONES, current: CURRENT_JOBS, max: 500, format: (v: number) => `${v}` };
  if (tab === "earnings") return { milestones: EARNINGS_MILESTONES, current: CURRENT_EARNINGS, max: 100000, format: (v: number) => `$${v.toLocaleString()}` };
  return { milestones: NETWORK_MILESTONES, current: CURRENT_NETWORK, max: 50, format: (v: number) => `${v}` };
}

function getCurrentRange(milestones: MilestoneMark[], current: number) {
  const achieved = milestones.filter((m) => m.achieved);
  const next = milestones.find((m) => !m.achieved);
  const prev = achieved[achieved.length - 1];
  return { prev, next };
}

function ProgressBar({ current, min, max }: { current: number; min: number; max: number }) {
  const pct = Math.min(100, Math.max(0, ((current - min) / (max - min)) * 100));
  return (
    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-700″
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function MilestoneSystem() {
  const [activeTab, setActiveTab] = useState<MilestoneTab>("jobs");

  const config = getMilestoneConfig(activeTab);
  const { prev, next } = getCurrentRange(config.milestones, config.current);

  const jobsLeft = next && activeTab === "jobs" ? next.value - CURRENT_JOBS : 0;

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8″>

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/40 to-yellow-900/30 border border-amber-700/40 rounded-2xl p-8″>
          <div className="flex items-center gap-3 mb-2″>
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400″ />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Milestones & Rewards</h1>
              <p className="text-amber-300 text-sm">Celebrate every win</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-6″>
            <div>
              <div className="text-3xl font-bold text-amber-400″>{TOTAL_XP.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-0.5″>Total XP earned</div>
            </div>
            <div className="h-10 border-l border-slate-700″ />
            <div>
              <div className="text-3xl font-bold text-white">{BADGES.filter((b) => b.earned).length}</div>
              <div className="text-xs text-slate-400 mt-0.5″>Badges earned</div>
            </div>
            <div className="h-10 border-l border-slate-700″ />
            <div>
              <div className="text-3xl font-bold text-white">#47</div>
              <div className="text-xs text-slate-400 mt-0.5″>Leaderboard rank</div>
            </div>
          </div>
        </div>

        {/* Next Milestone Banner */}
        <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/30 border border-teal-600/50 rounded-2xl p-6″>
          <div className="flex items-start gap-4″>
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center flex-shrink-0″>
              <Zap className="w-6 h-6 text-teal-400″ />
            </div>
            <div className="flex-1″>
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1″>Next Milestone</div>
              <h2 className="text-lg font-bold text-white mb-1″>
                You're {jobsLeft} jobs away from the "100 Jobs" milestone!
              </h2>
              <div className="text-sm text-slate-300 mb-4″>
                Reward: <span className="text-amber-400 font-semibold">Gold Badge + 500 bonus XP + featured on leaderboard</span>
              </div>
              <ProgressBar current={CURRENT_JOBS} min={50} max={100} />
              <div className="flex justify-between text-xs text-slate-500 mt-1.5″>
                <span>50 Jobs ✓</span>
                <span className="text-teal-400 font-medium">{CURRENT_JOBS} / 100</span>
                <span>100 Jobs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Track Tabs */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <div className="flex gap-2 mb-6″>
            {([
              { key: "jobs" as const, label: "Jobs", icon: Flame },
              { key: "earnings" as const, label: "Earnings", icon: DollarSign },
              { key: "network" as const, label: "Network", icon: Users },
            ]).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === key
                    ? "bg-teal-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4″ />
                {label}
              </button>
            ))}
          </div>

          {/* Track info */}
          <div className="mb-6″>
            <div className="flex justify-between items-end mb-3″>
              <div>
                <div className="text-xs text-slate-400 mb-1″>Current Progress</div>
                <div className="text-2xl font-bold text-white">{config.format(config.current)}</div>
              </div>
              {next && (
                <div className="text-right">
                  <div className="text-xs text-slate-400 mb-1″>Next milestone</div>
                  <div className="text-sm font-semibold text-teal-400″>{config.format(next.value)}</div>
                </div>
              )}
            </div>
            <ProgressBar
              current={config.current}
              min={prev ? prev.value : 0}
              max={next ? next.value : config.max}
            />
          </div>

          {/* Milestone list */}
          <div className="space-y-2″>
            {config.milestones.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 flex items-center gap-4 ${
                  m.achieved
                    ? "bg-teal-900/20 border border-teal-700/30″
                    : m === next
                    ? "bg-amber-900/20 border border-amber-600/40″
                    : "bg-slate-800/30 border border-slate-700/20″
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.achieved ? "bg-teal-600″ : m === next ? "bg-amber-700/50 border-2 border-amber-500" : "bg-slate-700"
                }`}>
                  {m.achieved ? (
                    <Star className="w-4 h-4 text-white" />
                  ) : m === next ? (
                    <Zap className="w-4 h-4 text-amber-400″ />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-500″ />
                  )}
                </div>
                <div className="flex-1 min-w-0″>
                  <div className={`text-sm font-semibold ${m.achieved ? "text-white" : m === next ? "text-amber-300" : "text-slate-500"}`}>
                    {m.label}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{m.reward}</div>
                </div>
                {m.achieved && <Star className="w-4 h-4 text-teal-400 flex-shrink-0″ />}
                {m === next && <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0″ />}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Milestone */}
        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/20 border border-green-700/40 rounded-xl p-5 flex items-start gap-4″>
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0″>
            <Award className="w-5 h-5 text-green-400″ />
          </div>
          <div>
            <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-1″>Recent Achievement</div>
            <div className="text-white font-semibold">You reached 5★ Average Rating on May 10!</div>
            <div className="text-sm text-slate-400 mt-1″>Reward: <span className="text-green-400">+200 XP + Profile verified badge</span></div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-2xl p-6″>
          <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2″>
            <Medal className="w-4 h-4 text-amber-400″ />
            Your Badges
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3″>
            {BADGES.map((b) => (
              <div
                key={b.id}
                className={`rounded-xl p-4 text-center transition-colors ${
                  b.earned
                    ? "bg-slate-800/60 border border-slate-600/50″
                    : "bg-slate-900/40 border border-slate-800/50 opacity-50″
                }`}
              >
                <div className="text-2xl mb-2″>{b.earned ? b.emoji : "🔒"}</div>
                <div className={`text-xs font-semibold leading-tight mb-1 ${b.earned ? "text-white" : "text-slate-600"}`}>
                  {b.title}
                </div>
                {b.earned && b.earnedDate && (
                  <div className="text-xs text-slate-500″>{b.earnedDate}</div>
                )}
                {b.earned && (
                  <div className="text-xs text-amber-400 mt-1″>+{b.xp} XP</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Position */}
        <div className="bg-[#0f1f38] border border-slate-700/50 rounded-xl p-5 flex items-center gap-4″>
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0″>
            <TrendingUp className="w-6 h-6 text-purple-400″ />
          </div>
          <div className="flex-1″>
            <div className="text-white font-semibold">You're #47 in milestone points this month</div>
            <div className="text-sm text-slate-400 mt-0.5″>
              Top 40 gets a featured spotlight — you're{" "}
              <span className="text-amber-400 font-semibold">7 spots away</span>
            </div>
          </div>
          <button className="text-xs bg-purple-700/50 hover:bg-purple-700 text-purple-300 px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
            View Board
          </button>
        </div>

        {/* Reward Store Teaser */}
        <div className="bg-gradient-to-r from-slate-800/60 to-slate-900/40 border border-slate-700/40 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-slate-700/60 rounded-xl flex items-center justify-center mx-auto mb-4″>
            <Gift className="w-6 h-6 text-slate-400″ />
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2″>Coming Soon</div>
          <h3 className="text-lg font-bold text-white mb-2″>Reward Store</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Redeem your XP for premium features, extended trial periods, and exclusive ProLnk swag.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-amber-400″>
            <Sparkles className="w-4 h-4″ />
            You'll have {TOTAL_XP.toLocaleString()} XP ready to spend
          </div>
        </div>

      </div>
    </div>
  );
}
