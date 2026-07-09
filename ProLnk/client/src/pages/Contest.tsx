import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Trophy, Calendar, Users, Star, ArrowRight, CheckCircle, Clock, Share2, Copy, Zap, Flame, ChevronDown, ChevronUp, TrendingUp, Award } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const LAUNCH_DATE = new Date("2026-09-01T00:00:00");
const SPRINT_END = new Date("2026-05-31T23:59:59"); // Sprint closes May 31

const SHARE_URL = "https://prolnk.xyz/contest";
const SHARE_TEXT = "DFW homeowners & service pros — sign up for ProLnk & TrustyPro and compete for $10,000 in prizes. Top 5 referrers win cash at the live launch event.";

// ─── Spring Sprint data (would come from API in production) ─────────────────

const SPRINT_LEADERBOARD = [
  { rank: 1, name: "Marcus T.", initials: "MT", recruits: 12, delta: "+3 this week", prize: "$2,500 + Charter Upgrade" },
  { rank: 2, name: "Deja W.",   initials: "DW", recruits: 9,  delta: "+2 this week", prize: "$1,000" },
  { rank: 3, name: "Carlos M.", initials: "CM", recruits: 8,  delta: "+1 this week", prize: "$500" },
  { rank: 4, name: "Priya S.",  initials: "PS", recruits: 7,  delta: "+2 this week", prize: null },
  { rank: 5, name: "Tyrone B.", initials: "TB", recruits: 6,  delta: "+1 this week", prize: null },
  { rank: 6, name: "Lauren K.", initials: "LK", recruits: 5,  delta: "+3 this week", prize: null },
  { rank: 7, name: "Andre F.",  initials: "AF", recruits: 4,  delta: "+1 this week", prize: null },
  { rank: 8, name: "Sofia R.",  initials: "SR", recruits: 4,  delta: "+2 this week", prize: null },
];

const MY_POSITION = { rank: 9, name: "You", initials: "AF", recruits: 3, delta: "+1 this week" };
const RECRUITS_TO_NEXT_RANK = 1; // recruits needed to reach rank 8

const SPRINT_PRIZES = [
  { place: "1st",   amount: "$2,500",              extra: "+ Charter Upgrade", color: "text-amber-400",  bg: "from-amber-500/10 to-yellow-500/5", border: "border-amber-500/30" },
  { place: "2nd",   amount: "$1,000",              extra: "",                  color: "text-slate-300",  bg: "from-slate-500/10 to-slate-500/5",  border: "border-slate-500/30" },
  { place: "3rd",   amount: "$500",                extra: "",                  color: "text-amber-700",  bg: "from-amber-700/10 to-amber-700/5",  border: "border-amber-700/30" },
  { place: "Participation", amount: "Override income for life", extra: "", color: "text-slate-400", bg: "from-slate-700/20 to-slate-700/10", border: "border-slate-700/50" },
];

// ─── Shared Components ────────────────────────────────────────────────────────

function ShareButtons() {
  const copyLink = () => {
    navigator.clipboard.writeText(SHARE_URL);
    toast.success("Contest link copied!");
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Post on X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(SHARE_TEXT)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Share on Facebook
      </a>
      <a
        href={`sms:?body=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Text a Friend
      </a>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
      >
        <Copy className="w-4 h-4" />
        Copy Link
      </button>
    </div>
  );
}

function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      {[
        { label: "Days",    value: time.days },
        { label: "Hours",   value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-[#0A1628] text-[#F5E642] font-black text-3xl w-20 h-20 rounded-xl flex items-center justify-center tabular-nums">
            {String(value).padStart(2, "0")}
          </div>
          <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">{label}</p>
        </div>
      ))}
    </div>
  );
}

const LAUNCH_PRIZES = [
  {
    place: "1st Place", medal: "🥇", prize: "$5,000 Cash",
    sub: "Handed to you in person at the DFW launch event",
    perks: ["Lifetime Founding Member status", "VIP reserved seat at the launch event", "Featured in ProLnk & TrustyPro marketing"],
    gold: true,
  },
  {
    place: "2nd Place", medal: "🥈", prize: "$2,500 Cash",
    sub: "Cash prize awarded at the live launch event",
    perks: ["2 years free Premium membership", "Launch event VIP invite"],
    gold: false,
  },
  {
    place: "3rd Place", medal: "🥉", prize: "$1,000 Cash",
    sub: "Cash prize awarded at the live launch event",
    perks: ["1 year free Premium membership", "Launch event invite"],
    gold: false,
  },
  {
    place: "4th Place", medal: "4️⃣", prize: "$750 in ProLnk Credits",
    sub: "Lead credits or home improvement credits — your choice",
    perks: ["Priority matching at launch", "Launch event invite"],
    gold: false,
  },
  {
    place: "5th Place", medal: "5️⃣", prize: "$750 in ProLnk Credits",
    sub: "Lead credits or home improvement credits — your choice",
    perks: ["Priority matching at launch", "Launch event invite"],
    gold: false,
  },
];

const RULES = [
  "Contest is open to DFW Metroplex residents and service professionals only.",
  "Referrals must sign up using your unique referral link — direct signups without your link do not count.",
  "Both homeowner (TrustyPro) and service pro (ProLnk) referrals count toward your total.",
  "To qualify for prizes, referred pros must sign up AND receive approval on their application.",
  "Cash prizes are awarded at the live launch event. Winners must attend in person to claim cash prizes.",
  "Credits are non-transferable and expire 24 months after issuance.",
  "ProLnk and TrustyPro reserve the right to disqualify fraudulent or self-referral activity.",
  "Contest runs from the date of waitlist launch through Sep 1, 2026 (DFW launch day).",
  "Winners will be contacted via the email used during waitlist signup at least 14 days before the event.",
];

const SPRINT_RULES = [
  "Sprint runs May 13 – May 31, 2026. Rankings are based on founding network recruits brought in during this window.",
  "A recruit counts when they complete their application and are accepted into the founding network.",
  "Recruits must join via your unique referral link. Direct signups without your link do not count toward your total.",
  "You must have an active ProLnk partner account in good standing to participate and claim prizes.",
  "1st place prize includes a Charter Member tier upgrade (valued at $500/yr). 2nd and 3rd are cash credits.",
  "Prizes are awarded within 14 days of sprint close. Charter upgrades are applied immediately to your account.",
  "ProLnk reserves the right to disqualify accounts with fraudulent or self-referral activity.",
];

// ─── Sprint Section ────────────────────────────────────────────────────────────

function CountdownInline({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTime({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 justify-center">
      {[
        { label: "Days",    value: time.days },
        { label: "Hrs",     value: time.hours },
        { label: "Min",     value: time.minutes },
        { label: "Sec",     value: time.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-slate-900 text-amber-400 font-black text-xl w-14 h-14 rounded-xl flex items-center justify-center tabular-nums border border-slate-700">
            {String(value).padStart(2, "0")}
          </div>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, max, colorClass = "bg-emerald-500" }: { value: number; max: number; colorClass?: string }) {
  const pct = Math.min(100, max === 0 ? 0 : (value / max) * 100);
  return (
    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
      <div className={`${colorClass} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function SpringSprintSection() {
  const [rulesOpen, setRulesOpen] = useState(false);
  const topRecruit = SPRINT_LEADERBOARD[0]?.recruits ?? 1;

  return (
    <section className="bg-gradient-to-br from-[#0A1628] via-[#0f2040] to-[#1a2d4a] py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4">
            <Flame className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Active Now · Ends May 31</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">Spring Sprint</h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Top 3 recruiters by May 31 win cash + prizes — bring in the most founding network members to win.
          </p>

          {/* Countdown */}
          <div className="mt-6 mb-4">
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 font-semibold">Contest closes in</p>
            <CountdownInline targetDate={SPRINT_END} />
          </div>

          {/* Meta stats */}
          <div className="flex items-center justify-center gap-4 mt-4 text-sm flex-wrap">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Trophy className="w-3.5 h-3.5 text-[#F5E642]" />
              <span className="text-white font-semibold">$4,000 prize pool</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-white">87 participants</span>
            </div>
          </div>
        </div>

        {/* Prize row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {SPRINT_PRIZES.map(({ place, amount, extra, color, bg, border }) => (
            <div key={place} className={`bg-gradient-to-br ${bg} border ${border} rounded-xl p-4 text-center`}>
              <div className={`text-xl font-black ${color}`}>{amount}</div>
              {extra && <div className="text-amber-400/70 text-xs mt-0.5">{extra}</div>}
              <div className="text-slate-400 text-xs font-semibold mt-1">{place}</div>
            </div>
          ))}
        </div>

        {/* My Position */}
        <div className="mb-8 bg-violet-600/10 border border-violet-500/30 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 font-semibold text-sm">Your Current Position</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {MY_POSITION.initials}
              </div>
              <div>
                <div className="text-white font-bold text-lg">#{MY_POSITION.rank}</div>
                <div className="text-slate-400 text-xs">{MY_POSITION.recruits} recruits · {MY_POSITION.delta}</div>
              </div>
            </div>
            <div className="flex-1 min-w-0" />
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2 text-sm text-amber-300">
              Recruit <span className="font-black text-amber-400">{RECRUITS_TO_NEXT_RANK} more</span> to reach rank #{MY_POSITION.rank - 1}
            </div>
          </div>
          {/* Progress toward rank 3 prize */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Progress toward 3rd place ({SPRINT_LEADERBOARD[2]?.recruits ?? 8} recruits needed)</span>
              <span className="text-white font-semibold">{MY_POSITION.recruits} / {SPRINT_LEADERBOARD[2]?.recruits ?? 8}</span>
            </div>
            <ProgressBar value={MY_POSITION.recruits} max={SPRINT_LEADERBOARD[2]?.recruits ?? 8} colorClass="bg-violet-500" />
          </div>
          {MY_POSITION.rank > 3 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-3.5 h-3.5" />
              You need to reach top 3 to win a cash prize. You're {MY_POSITION.rank - 3} spot{MY_POSITION.rank - 3 !== 1 ? "s" : ""} away.
            </div>
          )}
        </div>

        {/* Leaderboard with progress bars */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-white font-bold flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Sprint Leaderboard
            </h3>
            <span className="text-slate-400 text-xs">Top 3 recruiters by May 31 win</span>
          </div>
          <div className="divide-y divide-slate-700/50">
            {SPRINT_LEADERBOARD.map((entry, i) => (
              <div key={entry.rank} className={`px-5 py-3.5 ${i < 3 ? "bg-slate-700/20" : ""}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 text-center flex-shrink-0">
                    {i === 0 ? <span className="text-lg">🥇</span>
                      : i === 1 ? <span className="text-lg">🥈</span>
                      : i === 2 ? <span className="text-lg">🥉</span>
                      : <span className="text-slate-500 text-sm font-bold">#{entry.rank}</span>}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {entry.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold">{entry.name}</div>
                    <div className="text-slate-400 text-xs">{entry.delta}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-white font-bold text-sm">{entry.recruits} recruits</div>
                    {entry.prize && <div className="text-amber-400 text-xs font-semibold">{entry.prize}</div>}
                  </div>
                </div>
                <div className="pl-10">
                  <ProgressBar
                    value={entry.recruits}
                    max={topRecruit}
                    colorClass={i === 0 ? "bg-amber-400" : i === 1 ? "bg-slate-400" : i === 2 ? "bg-amber-700" : "bg-slate-600"}
                  />
                </div>
              </div>
            ))}
            {/* My position separator */}
            <div className="px-5 py-2 bg-slate-900/40 text-center">
              <span className="text-slate-500 text-xs">· · · {MY_POSITION.rank - SPRINT_LEADERBOARD.length - 1} more participants · · ·</span>
            </div>
            <div className="px-5 py-3.5 bg-violet-600/10 border-l-2 border-violet-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 text-center flex-shrink-0">
                  <span className="text-slate-400 text-sm font-bold">#{MY_POSITION.rank}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {MY_POSITION.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-violet-200 text-sm font-semibold">You</div>
                  <div className="text-slate-400 text-xs">{MY_POSITION.delta}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-violet-200 font-bold text-sm">{MY_POSITION.recruits} recruits</div>
                </div>
              </div>
              <div className="pl-10">
                <ProgressBar value={MY_POSITION.recruits} max={topRecruit} colorClass="bg-violet-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Share button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => { navigator.clipboard.writeText("https://prolnk.xyz/contest"); toast.success("Contest link copied!"); }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share Contest &amp; Climb the Board
          </button>
          <p className="text-slate-500 text-xs mt-2">Every person you recruit counts toward your rank</p>
        </div>

        {/* Rules accordion */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setRulesOpen(!rulesOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-left text-white font-semibold text-sm hover:bg-slate-700/20 transition-colors"
          >
            <span>Sprint Rules &amp; Eligibility</span>
            {rulesOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {rulesOpen && (
            <div className="px-5 pb-5 space-y-2">
              {SPRINT_RULES.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/60 rounded-lg px-4 py-3">
                  <span className="text-xs font-black text-slate-500 w-5 flex-shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Contest() {
  const { data: counts } = trpc.waitlist.getPublicCounts.useQuery(undefined, { refetchInterval: 60_000 });
  const totalParticipants = (counts?.pros ?? 0) + (counts?.homes ?? 0);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Spring Sprint (active, in-app contest) ── */}
      <SpringSprintSection />

      {/* ── Divider ── */}
      <div className="bg-gray-50 border-y border-gray-100 py-6 px-4 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Also Happening</p>
        <p className="text-gray-700 font-bold mt-1">DFW Launch Referral Contest — Sep 1, 2026</p>
      </div>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0A1628] via-[#0f2040] to-[#1a2d4a] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/30 rounded-full px-4 py-1.5 mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#F5E642]" />
            <span className="text-[#F5E642] text-xs font-semibold uppercase tracking-wider">DFW Metroplex Only</span>
          </div>
          <h1 className="text-5xl font-black mb-4 leading-tight">
            Refer Your Neighbors.<br />
            <span className="text-[#F5E642]">Win $10,000.</span>
          </h1>
          <p className="text-white/70 text-lg mb-2 max-w-xl mx-auto">
            The top 5 people who refer the most DFW homeowners and service pros to ProLnk and TrustyPro win real prizes — handed to you in person at our launch event.
          </p>
          <p className="text-white/50 text-sm mb-4">Contest ends Sep 1, 2026 — DFW launch day. Winners celebrated live.</p>

          {totalParticipants > 0 && (
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <Users className="w-3.5 h-3.5 text-[#F5E642]" />
              <span className="text-white text-xs font-semibold">
                <span className="text-[#F5E642] font-black">{totalParticipants.toLocaleString()}</span> people already competing
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/waitlist/pro" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F5E642] text-[#0A1628] font-bold text-sm rounded-none hover:opacity-90 transition-opacity">
              Join as a Service Pro <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/waitlist/homeowner" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 border border-white/20 text-white font-bold text-sm rounded-none hover:bg-white/15 transition-colors">
              Join as a Homeowner <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Countdown ── */}
      <div className="bg-gray-50 border-b border-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Time Until DFW Launch Day — Sep 1, 2026</p>
          </div>
          <Countdown targetDate={LAUNCH_DATE} />
          <p className="text-xs text-gray-400 mt-2">Contest closes at launch. Refer as many people as possible before time runs out.</p>
        </div>
      </div>

      {/* ── How to Win ── */}
      <div className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-[#00B5B8]" />
              <h2 className="text-2xl font-black text-[#0A1628]">How to Win</h2>
            </div>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Your goal is simple: refer 5 or more service pros who sign up <em>and get approved</em>. The more approved pros you refer, the higher you climb the leaderboard.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#0A1628]/5 to-[#00B5B8]/5 rounded-2xl border border-[#0A1628]/10 p-8">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Sign Up", desc: "Join the ProLnk or TrustyPro waitlist. You'll receive a unique referral link immediately after signing up.", icon: <Users className="w-6 h-6" /> },
                { step: "02", title: "Refer 5+ Approved Pros", desc: "Share your link with licensed contractors and service professionals in DFW. Each referral who gets approved counts toward your total.", icon: <Star className="w-6 h-6" /> },
                { step: "03", title: "Claim Your Prize", desc: "Top 5 referrers at launch day are invited to the live event. Prizes are handed out on stage. You must attend to collect cash.", icon: <Trophy className="w-6 h-6" /> },
              ].map(({ step, title, desc, icon }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#0A1628] flex items-center justify-center mx-auto mb-4 text-white">{icon}</div>
                  <div className="text-xs font-black text-gray-300 mb-1 tracking-widest">{step}</div>
                  <h3 className="font-bold text-[#0A1628] mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 bg-[#F5E642]/20 border border-[#F5E642]/40 rounded-xl px-6 py-3">
              <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-sm font-semibold text-amber-800">Minimum threshold: refer 5+ approved pros to be eligible for prizes</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Prize Tiers (DFW Launch) ── */}
      <div className="py-14 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-black text-[#0A1628]">DFW Launch Prize Breakdown</h2>
            </div>
            <p className="text-gray-500 text-sm">Top 5 referrers win. The more approved pros you refer, the higher you finish.</p>
          </div>
          <div className="space-y-3">
            {LAUNCH_PRIZES.map(({ place, medal, prize, sub, perks, gold }) => (
              <div key={place} className={`rounded-xl border p-5 ${gold ? "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300" : "bg-white border-gray-100"}`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{medal}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className={`text-xs font-bold uppercase tracking-wider ${gold ? "text-amber-600" : "text-gray-400"}`}>{place}</span>
                      <span className={`text-xl font-black ${gold ? "text-amber-700" : "text-[#0A1628]"}`}>{prize}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{sub}</p>
                    <div className="flex flex-wrap gap-2">
                      {perks.map((perk) => (
                        <span key={perk} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${gold ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                          <CheckCircle className="w-3 h-3" />{perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Total prize pool: $10,000 in cash + credits</p>
        </div>
      </div>

      {/* ── The Event ── */}
      <div className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2d4a] rounded-2xl p-8 text-white text-center">
            <Calendar className="w-10 h-10 text-[#F5E642] mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-3">The Launch Event — Sep 1, 2026</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              When ProLnk and TrustyPro officially launch in DFW, we're hosting a live event to celebrate. The top 5 referrers will be invited as VIP guests. Prize checks are handed out on stage.
            </p>
            <div className="flex items-center justify-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-xl px-6 py-3 inline-flex">
              <MapPin className="w-4 h-4 text-[#F5E642]" />
              <span className="text-[#F5E642] text-sm font-semibold">DFW Metroplex — Location announced 30 days before launch</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Official Rules ── */}
      <div className="bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-[#0A1628] mb-6">Official Contest Rules</h2>
          <div className="space-y-3">
            {RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 px-4 py-3">
                <span className="text-xs font-black text-gray-300 w-5 flex-shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Share ── */}
      <div className="py-14 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <Share2 className="w-8 h-8 text-[#00B5B8] mx-auto mb-4" />
          <h2 className="text-2xl font-black text-[#0A1628] mb-2">Spread the Word</h2>
          <p className="text-gray-500 text-sm mb-6">Share with DFW neighbors, contractors, and friends. Every approved referral climbs your rank.</p>
          <ShareButtons />
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-[#0A1628] mb-3">Ready to compete?</h2>
          <p className="text-gray-500 mb-2">Sign up now and start referring. Contest closes Sep 1, 2026.</p>
          {totalParticipants > 0 && (
            <p className="text-sm text-[#00B5B8] font-semibold mb-6">{totalParticipants.toLocaleString()} people are already on the board.</p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/waitlist/pro" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0A1628] text-white font-bold text-sm hover:opacity-90 transition-opacity">
              I'm a Service Pro <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/waitlist/homeowner" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors">
              I'm a Homeowner <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">Questions? Contact us at hello@prolnk.xyz</p>
        </div>
      </div>

    </div>
  );
}
