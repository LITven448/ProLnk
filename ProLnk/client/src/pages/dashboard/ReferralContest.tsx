import { useState, useEffect } from "react";
import { Copy, Check, Trophy, Medal, Award, Users, DollarSign, Share2, Linkedin, MessageSquare, Mail } from "lucide-react";

const CONTEST_END = new Date("2026-06-30T23:59:59Z");

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins: Math.floor((diff % 3600000) / 60000),
      secs: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function CopyBtn({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0″
      style={{
        background: copied ? "rgba(20,184,166,0.2)" : "rgba(20,184,166,0.1)",
        color: "#14b8a6″,
        border: `1px solid ${copied ? "rgba(20,184,166,0.5)" : "rgba(20,184,166,0.25)"}`,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : label ?? "Copy"}
    </button>
  );
}

const LEADERBOARD = [
  { rank: 1, name: "David K.", recruits: 18, earnings: 3240 },
  { rank: 2, name: "Priya S.", recruits: 15, earnings: 2700 },
  { rank: 3, name: "Marcus T.", recruits: 14, earnings: 2520 },
  { rank: 4, name: "Jennifer L.", recruits: 13, earnings: 2340 },
  { rank: 5, name: "Robert C.", recruits: 12, earnings: 2160 },
  { rank: 6, name: "Amira N.", recruits: 11, earnings: 1980 },
  { rank: 7, name: "Carlos M.", recruits: 10, earnings: 1800 },
  { rank: 8, name: "Sarah W.", recruits: 9, earnings: 1620 },
  { rank: 9, name: "Tony B.", recruits: 8, earnings: 1440 },
  { rank: 10, name: "Diana R.", recruits: 8, earnings: 1440 },
  { rank: 11, name: "Frank O.", recruits: 7, earnings: 1260 },
  { rank: 12, name: "Layla H.", recruits: 6, earnings: 1080 },
  { rank: 13, name: "James V.", recruits: 5, earnings: 900 },
  { rank: 14, name: "Nadia P.", recruits: 4, earnings: 720 },
  { rank: 15, name: "Kevin A.", recruits: 3, earnings: 540 },
  { rank: 47, name: "You", recruits: 2, earnings: 360, isYou: true },
];

const SOCIAL_POSTS = [
  {
    platform: "LinkedIn",
    icon: Linkedin,
    color: "#0a66c2″,
    bg: "rgba(10,102,194,0.1)",
    border: "rgba(10,102,194,0.25)",
    text: "Just locked in my founding spot on ProLnk — the new home services marketplace with a 4-level network income system. Partners earn overrides on every job their network does, 4 levels deep. Spots are extremely limited before the waitlist closes at 500. If you're a home service pro, this is worth 5 minutes of your time: prolnk.io/join?ref=partner123″,
  },
  {
    platform: "SMS",
    icon: MessageSquare,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
    text: "Hey — grabbed you a founding spot on ProLnk before they close the waitlist. Lock in $149/mo forever + earn passive income on your network. prolnk.io/join?ref=partner123″,
  },
  {
    platform: "Email",
    icon: Mail,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    text: "Subject: I saved you a founding partner spot\n\nHey,\n\nI've been using ProLnk and wanted to pass along my founding invite before the waitlist closes. You lock in the $149/mo rate forever and earn network overrides 4 levels deep — meaning every pro you bring in (and every pro they bring in) puts money in your pocket monthly.\n\nGrab your spot here: prolnk.io/join?ref=partner123\n\nOnly ~450 spots left.",
  },
];

const REFERRAL_LINK = "prolnk.io/join?ref=partner123″;

export default function ReferralContest() {
  const { days, hours, mins, secs } = useCountdown(CONTEST_END);
  const visibleRows = LEADERBOARD.filter((r) => r.rank <= 15 || r.isYou);
  const youRow = LEADERBOARD.find((r) => r.isYou)!;

  return (
    <div className="min-h-screen bg-[#0A1628] px-4 py-8″>
      <div className="max-w-4xl mx-auto space-y-8″>

        {/* Hero banner */}
        <div
          className="rounded-2xl p-6 sm:p-8 text-center"
          style={{ background: "linear-gradient(135deg, rgba(245,230,66,0.12), rgba(139,92,246,0.1))", border: "1px solid rgba(245,230,66,0.3)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-3″>
            <Trophy size={24} style={{ color: "#F5E642″ }} />
            <span className="text-yellow-400 font-black text-lg sm:text-xl">Founding Network Sprint</span>
          </div>
          <p className="text-gray-300 text-sm mb-6″>Ends June 30, 2026 · Top recruiters win free months + exclusive badges</p>

          {/* Countdown */}
          <div className="flex justify-center gap-3 sm:gap-5″>
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Mins", value: mins },
              { label: "Secs", value: secs },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center font-black text-xl sm:text-2xl text-white"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {String(value).padStart(2, "0″)}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Your position card */}
        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4″
          style={{ background: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.3)" }}
        >
          <div className="flex items-center gap-4 flex-1″>
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shrink-0″
              style={{ background: "rgba(20,184,166,0.15)", color: "#14b8a6″ }}
            >
              #47
            </div>
            <div>
              <p className="text-white font-bold">You're ranked #47 of 112 partners</p>
              <p className="text-sm text-gray-400 mt-0.5″>Recruited this month: <span className="text-white font-semibold">2</span> · Target: <span className="text-teal-400 font-semibold">5</span></p>
            </div>
          </div>
          <div
            className="px-3 py-2 rounded-xl text-center shrink-0″
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)" }}
          >
            <p className="text-xs text-gray-400″>Current tier</p>
            <p className="text-sm font-bold text-amber-400″>🥉 Bronze</p>
          </div>
        </div>

        {/* Prizes */}
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Prize Tiers</h2>
          <div className="grid sm:grid-cols-3 gap-3″>
            {[
              {
                icon: "🥇",
                rank: "Top 10″,
                label: "Founding Champion",
                prize: "6 months free",
                bonus: "+$500 cash bonus",
                color: "#F5E642″,
                bg: "rgba(245,230,66,0.08)",
                border: "rgba(245,230,66,0.3)",
                isCurrent: false,
              },
              {
                icon: "🥈",
                rank: "Top 25″,
                label: "Founding Star",
                prize: "3 months free",
                bonus: "Exclusive badge",
                color: "#9ca3af",
                bg: "rgba(156,163,175,0.07)",
                border: "rgba(156,163,175,0.25)",
                isCurrent: false,
              },
              {
                icon: "🥉",
                rank: "Top 50″,
                label: "Founding Member",
                prize: "1 month free",
                bonus: "Founding badge",
                color: "#f59e0b",
                bg: "rgba(245,158,11,0.1)",
                border: "rgba(245,158,11,0.35)",
                isCurrent: true,
              },
            ].map(({ icon, rank, label, prize, bonus, color, bg, border, isCurrent }) => (
              <div
                key={rank}
                className="rounded-xl p-4 relative"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                {isCurrent && (
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                    style={{ background: "#f59e0b", color: "#0A1628″ }}
                  >
                    You're here
                  </div>
                )}
                <div className="text-2xl mb-2″>{icon}</div>
                <p className="font-bold text-white text-sm">{rank} referrers</p>
                <p className="text-xs font-medium mt-0.5″ style={{ color }}>{prize}</p>
                <p className="text-[10px] text-gray-500 mt-0.5″>{bonus}</p>
                <div
                  className="mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold inline-block"
                  style={{ background: `${color}18`, color }}
                >
                  "{label}" badge
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress to next tier */}
        <div
          className="rounded-xl p-4 flex items-center gap-4″
          style={{ background: "rgba(156,163,175,0.07)", border: "1px solid rgba(156,163,175,0.2)" }}
        >
          <Medal size={20} style={{ color: "#9ca3af" }} />
          <div className="flex-1″>
            <p className="text-white text-sm font-semibold">You need <span className="text-gray-300 font-black">3 more referrals</span> to reach Silver tier</p>
            <div className="mt-2 w-full bg-white/10 rounded-full h-1.5″>
              <div className="h-full rounded-full" style={{ width: "40%", background: "#9ca3af" }} />
            </div>
            <p className="text-[10px] text-gray-500 mt-1″>2 of 5 needed for Top 25</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div
          className="rounded-2xl p-5″
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2 mb-4″>
            <Award size={16} style={{ color: "#F5E642″ }} />
            <h2 className="text-sm font-semibold text-white">Top 15 Leaderboard</h2>
          </div>
          <div className="space-y-1″>
            {visibleRows.map((row, i) => {
              const isYou = row.isYou;
              const prevRank = i > 0 ? visibleRows[i - 1].rank : 0;
              const showGap = !isYou && i > 0 && row.rank - prevRank > 1;

              const rankColor =
                row.rank === 1 ? "#F5E642″ : row.rank === 2 ? "#9ca3af" : row.rank === 3 ? "#f59e0b" : "rgba(255,255,255,0.4)";

              return (
                <div key={row.rank}>
                  {showGap && (
                    <div className="py-1 text-center text-gray-600 text-xs">· · ·</div>
                  )}
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                    style={{
                      background: isYou ? "rgba(20,184,166,0.12)" : "rgba(255,255,255,0.02)",
                      border: isYou ? "1px solid rgba(20,184,166,0.35)" : "1px solid transparent",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0″
                      style={{
                        background: row.rank <= 3 ? `${rankColor}18` : "rgba(255,255,255,0.05)",
                        color: rankColor,
                      }}
                    >
                      {row.rank <= 3 ? (row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : "🥉") : `#${row.rank}`}
                    </div>
                    <p className={`flex-1 text-sm font-semibold ${isYou ? "text-teal-400" : "text-white"}`}>
                      {row.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0″>
                      <Users size={11} />
                      <span className="font-semibold text-white">{row.recruits}</span>
                      <span>this mo.</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0 w-20 justify-end">
                      <DollarSign size={11} />
                      <span className="font-semibold text-white">{row.earnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Referral tools */}
        <div>
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Your Referral Tools</h2>
          <div className="space-y-3″>
            {SOCIAL_POSTS.map(({ platform, icon: Icon, color, bg, border, text }) => (
              <div
                key={platform}
                className="rounded-xl p-4″
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <div className="flex items-center justify-between mb-2″>
                  <div className="flex items-center gap-2″>
                    <Icon size={14} style={{ color }} />
                    <span className="text-xs font-semibold" style={{ color }}>{platform}</span>
                  </div>
                  <CopyBtn text={text} label="Copy Post" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3″>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral link + QR placeholder */}
        <div
          className="rounded-2xl p-5″
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2 mb-3″>
            <Share2 size={14} style={{ color: "#14b8a6″ }} />
            <p className="text-sm font-semibold text-white">Your Referral Link</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4″>
            <div className="flex-1 w-full">
              <div
                className="flex items-center gap-3 p-3 rounded-xl mb-2″
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <code className="flex-1 text-sm text-gray-300 font-mono truncate">{REFERRAL_LINK}</code>
                <CopyBtn text={`https://${REFERRAL_LINK}`} label="Copy Link" />
              </div>
              <p className="text-xs text-gray-500″>Every signup through your link counts toward your contest rank</p>
            </div>
            {/* QR placeholder */}
            <div
              className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 self-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.15)" }}
            >
              <div className="text-center">
                <div className="grid grid-cols-3 gap-0.5 mx-auto w-10″>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ background: [0, 2, 6, 8, 4].includes(i) ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
                <p className="text-[8px] text-gray-600 mt-1″>QR Code</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
