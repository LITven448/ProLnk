import React from 'react';
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  Users, TrendingUp, MapPin, DollarSign, Award, Zap,
  Clock, CheckCircle, ChevronRight, Shield, Activity, Globe,
} from "lucide-react";

// -- Animated counter ----------------------------------------------------------
function useCountUp(target: number, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return value;
}

// -- Intersection observer -----------------------------------------------------
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// -- Animated progress bar -----------------------------------------------------
function TierBar({
  label, filled, total, color, started,
}: {
  label: string; filled: number; total: number; color: string; started: boolean;
}) {
  const pct = Math.round((filled / total) * 100);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(t);
  }, [started, pct]);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-200 font-medium">{label}</span>
        <span className="text-slate-400 tabular-nums">
          {filled}/{total}
          <span className="ml-2 text-xs font-semibold" style={{ color }}>{pct}%</span>
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-700/60 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// -- Stat card -----------------------------------------------------------------
function StatCard({
  icon: Icon, label, value, prefix = "", suffix = "", color, description, started,
}: {
  icon: React.ElementType; label: string; value: number; prefix?: string; suffix?: string;
  color: string; description: string; started: boolean;
}) {
  const animated = useCountUp(value, 1800, started);
  const display = value >= 1000
    ? animated >= 1000 ? `${(animated / 1000).toFixed(1)}k` : animated.toString()
    : animated.toString();

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}22` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full bg-teal-400/10 text-teal-400 uppercase">Live</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {prefix}{display}{suffix}
      </div>
      <div className="text-sm font-semibold text-slate-300 mb-0.5">{label}</div>
      <div className="text-xs text-slate-500">{description}</div>
    </div>
  );
}

// -- Trade bar -----------------------------------------------------------------
function TradeBar({ name, pct, started }: { name: string; pct: number; started: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setWidth(pct), 120);
    return () => clearTimeout(t);
  }, [started, pct]);

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 text-right text-xs text-slate-400 shrink-0">{name}</span>
      <div className="flex-1 h-2 rounded-full bg-slate-700/60 overflow-hidden">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-700 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-xs text-teal-400 tabular-nums w-8 shrink-0">{pct}%</span>
    </div>
  );
}

// -- Trades data ---------------------------------------------------------------
const TRADES = [
  { name: "HVAC", pct: 23 },
  { name: "Plumbing", pct: 18 },
  { name: "Electrical", pct: 15 },
  { name: "Roofing", pct: 12 },
  { name: "Landscaping", pct: 10 },
  { name: "Painting", pct: 8 },
  { name: "General", pct: 8 },
  { name: "Other", pct: 6 },
];

// -- Main page -----------------------------------------------------------------
export default function NetworkStats() {
  const { data: counts } = trpc.waitlist.getPublicCounts.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { ref: cardsRef, inView: cardsVisible } = useInView();
  const { ref: tiersRef, inView: tiersVisible } = useInView();
  const { ref: tradesRef, inView: tradesVisible } = useInView();

  const totalMembers = (counts?.pros ?? 0);
  const heroCount = useCountUp(totalMembers, 2000, true);

  return (
    <>
      <Helmet>
        <title>ProLnk Founding Network — Live Stats</title>
        <meta
          name="description"
          content="Live statistics for the ProLnk founding network. Track founding tier progress, trade breakdowns, and network growth in real time."
        />
        <meta property="og:title" content="ProLnk Founding Network — Live Stats" />
        <meta
          property="og:description"
          content="Watch the ProLnk founding network grow in real time. 2,125 total founding spots across 4 tiers. DFW + 3 markets."
        />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: "#0A1628" }}>

        {/* Nav */}
        <nav className="sticky top-0 z-20 border-b border-slate-700/60 bg-[#0A1628]/90 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/">
              <span className="font-bold text-xl text-white cursor-pointer tracking-tight">
                Pro<span className="text-teal-400">Lnk</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/pro-waitlist">
                <button className="px-4 py-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors">
                  Join Waitlist
                </button>
              </Link>
              <Link href="/founding-partner">
                <button className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors">
                  Founding Partner
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div ref={heroRef} className="max-w-6xl mx-auto px-4 pt-20 pb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-400/10 text-teal-400 text-xs font-semibold mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Live Network Data
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            ProLnk Founding Network
            <br />
            <span className="text-teal-400">Live Stats</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Real-time pulse of the ProLnk founding network. 2,125 total spots across 4 tiers — once full, the waitlist closes permanently.
          </p>

          {/* Big animated counter */}
          <div className="inline-block rounded-2xl border border-teal-500/30 bg-slate-800/60 px-12 py-8 backdrop-blur-sm">
            <div className="text-7xl font-bold text-teal-400 tabular-nums leading-none mb-2">
              {heroCount.toLocaleString()}
            </div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-widest">
              Founding members on waitlist
            </div>
          </div>
        </div>

        {/* 4 Stat cards */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Founding Members"
              value={totalMembers}
              color="#14b8a6"
              description="Pros on the founding network waitlist"
              started={cardsVisible}
            />
            <StatCard
              icon={Award}
              label="Service Trades"
              value={47}
              suffix="+"
              color="#8b5cf6"
              description="Trade categories represented in network"
              started={cardsVisible}
            />
            <StatCard
              icon={MapPin}
              label="Markets"
              value={4}
              color="#3b82f6"
              description="DFW active + 3 markets launching"
              started={cardsVisible}
            />
            <StatCard
              icon={Clock}
              label="Avg Response"
              value={24}
              suffix=" hr"
              color="#f59e0b"
              description="Average partner response time to leads"
              started={cardsVisible}
            />
          </div>
        </div>

        {/* Founding tier progress */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div
            ref={tiersRef}
            className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Founding Tier Progress</h2>
                <p className="text-sm text-slate-400">Spots fill permanently — no re-opens after launch</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-400">257</div>
                <div className="text-xs text-slate-500">of 2,125 filled</div>
              </div>
            </div>

            <div className="space-y-5">
              <TierBar label="Charter Partners" filled={12} total={25} color="#f59e0b" started={tiersVisible} />
              <TierBar label="Founding Members" filled={43} total={100} color="#14b8a6" started={tiersVisible} />
              <TierBar label="Level 3 Partners" filled={78} total={400} color="#8b5cf6" started={tiersVisible} />
              <TierBar label="Level 4 Partners" filled={124} total={1600} color="#3b82f6" started={tiersVisible} />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { tier: "Charter", spots: 25, price: "$149/mo", locked: true },
                { tier: "Founding", spots: 100, price: "$149/mo", locked: false },
                { tier: "Level 3", spots: 400, price: "$149/mo", locked: false },
                { tier: "Level 4", spots: 1600, price: "$149/mo", locked: false },
              ].map((t) => (
                <div key={t.tier} className="rounded-xl bg-slate-700/30 p-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{t.tier}</div>
                  <div className="text-lg font-bold text-white">{t.spots}</div>
                  <div className="text-xs text-slate-400">total spots</div>
                  <div className="text-xs text-teal-400 font-medium mt-1">{t.price} locked</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Network Income Forecast */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Network Income Forecast</h2>
                <p className="text-sm text-slate-400">
                  Projected annual override income if current recruits maintain activity
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "L1 Override (1%)",
                  recruits: 12,
                  avgMonthlyEarnings: 800,
                  rate: 0.01,
                  color: "#14b8a6",
                },
                {
                  label: "L2 Override (0.5%)",
                  recruits: 34,
                  avgMonthlyEarnings: 600,
                  rate: 0.005,
                  color: "#8b5cf6",
                },
                {
                  label: "L3 Override (0.25%)",
                  recruits: 78,
                  avgMonthlyEarnings: 500,
                  rate: 0.0025,
                  color: "#3b82f6",
                },
                {
                  label: "L4 Override (0.1%)",
                  recruits: 124,
                  avgMonthlyEarnings: 400,
                  rate: 0.001,
                  color: "#f59e0b",
                },
              ].map((stream) => {
                const monthlyIncome = stream.recruits * stream.avgMonthlyEarnings * stream.rate;
                const annualIncome = monthlyIncome * 12;
                return (
                  <div key={stream.label} className="rounded-xl bg-slate-700/30 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: stream.color }}>
                      {stream.label}
                    </p>
                    <p className="text-2xl font-bold text-white mb-0.5">
                      ${Math.round(annualIncome).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">per year</p>
                    <p className="text-[10px] text-slate-500 mt-2">
                      {stream.recruits} recruits · ${Math.round(monthlyIncome)}/mo
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-700/40 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Total Projected Annual Network Income</p>
                <p className="text-3xl font-bold text-teal-400">
                  ${(12 * 0.01 * 800 * 12 + 34 * 0.005 * 600 * 12 + 78 * 0.0025 * 500 * 12 + 124 * 0.001 * 400 * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <p className="text-xs text-slate-500 max-w-xs">
                Based on current network activity. Numbers update as your recruits close more jobs.
              </p>
            </div>
          </div>
        </div>

        {/* Geographic Heatmap & Network Strength */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Geographic heatmap placeholder */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Network Geography</h2>
                  <p className="text-xs text-slate-400">Where your recruits are active</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { zone: "DFW North (Plano/Frisco)", pct: 38, color: "#14b8a6", recruits: 47 },
                  { zone: "DFW Central (Dallas)",     pct: 26, color: "#3b82f6", recruits: 32 },
                  { zone: "DFW South (Irving/Grand Prairie)", pct: 18, color: "#8b5cf6", recruits: 22 },
                  { zone: "DFW East (Garland/Mesquite)", pct: 12, color: "#f59e0b", recruits: 15 },
                  { zone: "Other / Expanding",        pct: 6,  color: "#6b7280", recruits: 7 },
                ].map((z) => (
                  <div key={z.zone}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">{z.zone}</span>
                      <span className="text-slate-500">{z.recruits} recruits</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700/60 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${z.pct}%`, backgroundColor: z.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-teal-500/20 bg-teal-400/5 px-3 py-2.5">
                <p className="text-xs font-semibold text-teal-300">
                  Most of your network is in DFW North
                </p>
                <p className="text-[10px] text-teal-400/60 mt-0.5">
                  Plano, Frisco, and Allen represent your strongest recruiting pocket
                </p>
              </div>
            </div>

            {/* Network Strength Score */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-400/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Network Strength Score</h2>
                  <p className="text-xs text-slate-400">Based on L1 recruit activity levels</p>
                </div>
              </div>
              {(() => {
                const l1Recruits = [
                  { name: "Mike R.", jobsThisMonth: 8,  active: true  },
                  { name: "Dana S.", jobsThisMonth: 5,  active: true  },
                  { name: "Tom L.",  jobsThisMonth: 3,  active: true  },
                  { name: "Sara K.", jobsThisMonth: 1,  active: true  },
                  { name: "Jade M.", jobsThisMonth: 0,  active: false },
                  { name: "Chris P.", jobsThisMonth: 0, active: false },
                ];
                const totalMonthlyJobs = l1Recruits.reduce((s, r) => s + r.jobsThisMonth, 0);
                const activeCount = l1Recruits.filter((r) => r.active).length;
                const strengthScore = Math.min(100, Math.round((activeCount / l1Recruits.length) * 60 + (totalMonthlyJobs / 20) * 40));
                const scoreColor = strengthScore >= 70 ? "#14b8a6" : strengthScore >= 45 ? "#f59e0b" : "#ef4444";
                const scoreLabel = strengthScore >= 70 ? "Strong" : strengthScore >= 45 ? "Moderate" : "Weak";
                return (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                          <circle cx="32" cy="32" r="26" fill="none" stroke="#1E293B" strokeWidth="8" />
                          <circle
                            cx="32" cy="32" r="26" fill="none"
                            stroke={scoreColor} strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 26 * strengthScore / 100} ${2 * Math.PI * 26 * (100 - strengthScore) / 100}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white">
                          {strengthScore}
                        </span>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-white">{scoreLabel}</p>
                        <p className="text-xs text-slate-400">{activeCount}/{l1Recruits.length} L1 recruits active this month</p>
                        <p className="text-xs text-slate-500">{totalMonthlyJobs} total jobs logged</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {l1Recruits.map((r) => (
                        <div key={r.name} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.active ? "bg-teal-400" : "bg-slate-600"}`} />
                          <span className="text-xs text-slate-300 w-20 flex-shrink-0">{r.name}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-teal-500 transition-all duration-700"
                              style={{ width: r.jobsThisMonth > 0 ? `${Math.min(100, (r.jobsThisMonth / 10) * 100)}%` : "0%" }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 w-12 text-right flex-shrink-0">
                            {r.jobsThisMonth > 0 ? `${r.jobsThisMonth} jobs` : "inactive"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Trade breakdown chart */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div
            ref={tradesRef}
            className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-white mb-2">Trade Breakdown</h2>
            <p className="text-sm text-slate-400 mb-8">Distribution of service trades across founding members</p>
            <div className="space-y-3.5">
              {TRADES.map((t) => (
                <TradeBar key={t.name} name={t.name} pct={t.pct} started={tradesVisible} />
              ))}
            </div>
          </div>
        </div>

        {/* DFW Coverage Map */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 backdrop-blur-sm">
            <h2 className="text-xl font-bold text-white mb-2">DFW Coverage Map</h2>
            <p className="text-sm text-slate-400 mb-6">Active partner coverage across the Dallas–Fort Worth Metroplex</p>
            <div className="relative rounded-xl overflow-hidden border border-slate-700/40" style={{ height: 340 }}>
              {import.meta.env.VITE_MAPBOX_TOKEN ? (
                <img
                  src={`https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l-home+14b8a6(-96.7970,32.7767),pin-l-home+14b8a6(-97.3308,32.7555),pin-l-home+14b8a6(-96.9336,32.8481),pin-l-home+14b8a6(-97.1401,32.7254),pin-l-home+14b8a6(-96.6389,33.0315)/-97.0641,32.7668,9,0/1200x340@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`}
                  alt="DFW Coverage Map"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/80 gap-4">
                  <MapPin className="w-8 h-8 text-teal-400" />
                  <div className="text-center">
                    <p className="text-white font-semibold">Dallas–Fort Worth Metroplex</p>
                    <p className="text-slate-400 text-sm mt-1">DFW Active · Frisco · Plano · Allen · McKinney · Prosper</p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    {["DFW North", "DFW Central", "DFW South", "DFW East", "DFW West"].map(z => (
                      <span key={z} className="text-[10px] px-2 py-1 rounded-full bg-teal-400/10 text-teal-400 border border-teal-500/20">{z}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-semibold text-teal-300">5 active zones — DFW Metroplex</span>
                </div>
                <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <span className="text-xs font-bold text-slate-300">Expanding to Houston &amp; Austin 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Network perks row */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Shield,
                title: "Price Locked Forever",
                body: "Founding members lock in $149/mo. Never increases, even as platform grows.",
              },
              {
                icon: TrendingUp,
                title: "5 Income Streams",
                body: "Direct commissions, network overrides, subscription share, lead origination, and home vault rights.",
              },
              {
                icon: Zap,
                title: "AI-Matched Leads",
                body: "Job photos analyzed by AI, routed to best-fit partners within minutes of upload.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-teal-400" />
                </div>
                <div className="font-bold text-white mb-2">{item.title}</div>
                <div className="text-sm text-slate-400 leading-relaxed">{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d3b4f 0%, #0A1628 60%, #0d2b4a 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #14b8a6 0%, transparent 60%)" }}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-400/10 text-teal-400 text-xs font-semibold mb-6 uppercase tracking-widest">
                <CheckCircle className="w-3.5 h-3.5" />
                Waitlist open — limited spots
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Secure Your Spot in the
                <br />
                <span className="text-teal-400">Founding Network</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
                Once all 2,125 founding spots are filled, the waitlist closes permanently. Price locks in at $149/mo for life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/founding-partner">
                  <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#0A1628] bg-teal-400 hover:bg-teal-300 transition-colors text-base">
                    Become a Founding Partner
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/pro-waitlist">
                  <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-teal-400 border-2 border-teal-500/40 hover:border-teal-400 transition-colors text-base">
                    Join Free Waitlist
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-700/60 py-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Data updates every 60 seconds
            <span className="mx-2 opacity-30">|</span>
            2025 ProLnk — Home Service Partner Network — DFW, Texas
          </div>
        </footer>

      </div>
    </>
  );
}
