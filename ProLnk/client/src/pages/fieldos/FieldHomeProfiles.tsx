import React from 'react';
/**
 * Field OS -- Home Profiles Tab (v4)
 * Design system: Teal #0D9488 (actions) | Lime #E8FF47 (money) | Navy #070D1A (bg)
 */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { FOS } from "./fosTokens";
import {
  Building2, Camera, Zap, DollarSign, ChevronRight,
  Loader2, MapPin, Shield, Search, ArrowLeft,
  Calendar, Wrench, SortAsc, Home, Users, Star,
  ChevronDown
} from "lucide-react";

const HEALTH_CFG = {
  excellent: { label: "Excellent",       color: FOS.teal,  score: 92 },
  good:      { label: "Good",            color: FOS.green, score: 74 },
  fair:      { label: "Fair",            color: FOS.lime,  score: 54 },
  poor:      { label: "Needs Attention", color: "#EF4444″, score: 28 },
} as const;
type HealthKey = keyof typeof HEALTH_CFG;

const SORT_OPTIONS = ["Last Visit", "Health Score", "Address"] as const;
type SortOption = typeof SORT_OPTIONS[number];

const TRADE_BADGES: Record<string, { label: string; color: string }> = {
  plumbing:    { label: "Plumbing",    color: "#3B82F6″ },
  roofing:     { label: "Roofing",     color: "#8B5CF6″ },
  electrical:  { label: "Electrical",  color: FOS.lime  },
  hvac:        { label: "HVAC",        color: "#06B6D4″ },
  landscaping: { label: "Landscaping", color: FOS.green },
  painting:    { label: "Painting",    color: "#F97316″ },
  flooring:    { label: "Flooring",    color: "#A78BFA" },
  cleaning:    { label: "Cleaning",    color: FOS.teal  },
  general:     { label: "General",     color: FOS.muted },
};

function getTradeBadge(type: string) {
  const key = Object.keys(TRADE_BADGES).find(k => (type ?? "").toLowerCase().includes(k));
  return key ? TRADE_BADGES[key] : TRADE_BADGES.general;
}

/* -- Health bar ------------------------------------------------------------- */
function HealthBar({ health, score }: { health: HealthKey; score: number }) {
  const cfg = HEALTH_CFG[health];
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5″>
        <div className="flex items-center gap-1.5″>
          <Shield className="w-3.5 h-3.5″ style={{ color: cfg.color }} />
          <span className="text-xs font-semibold" style={{ color: cfg.color }}>
            Health: {cfg.label}
          </span>
        </div>
        <span className="text-xs font-black" style={{ color: cfg.color }}>{score}/100</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: FOS.ghost }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, background: cfg.color }}
        />
      </div>
    </div>
  );
}

/* -- Stat tile -------------------------------------------------------------- */
function StatTile({
  icon: Icon, value, label, color,
}: { icon: React.ElementType; value: string | number; label: string; color: string }) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2″
      style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
    >
      <Icon className="w-5 h-5″ style={{ color }} />
      <p className="text-white text-xl font-black leading-none">{value}</p>
      <p className="text-[10px] uppercase tracking-wider" style={{ color: FOS.faint }}>{label}</p>
    </div>
  );
}

/* -- Map placeholder -------------------------------------------------------- */
function MapPlaceholder({ count }: { count: number }) {
  const pinPositions = [
    { x: "20%", y: "30%" },
    { x: "55%", y: "55%" },
    { x: "75%", y: "25%" },
    { x: "35%", y: "70%" },
    { x: "65%", y: "75%" },
  ].slice(0, count);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        height: 160,
        background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
        border: `1px solid ${FOS.border}`,
      }}
    >
      {/* Grid lines */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-20″>
        {[0.25, 0.5, 0.75].map(f => (
          <g key={f}>
            <line x1={`${f * 100}%`} y1="0″ x2={`${f * 100}%`} y2="100%" stroke={FOS.teal} strokeWidth="0.5" />
            <line x1="0″ y1={`${f * 100}%`} x2="100%" y2={`${f * 100}%`} stroke={FOS.teal} strokeWidth="0.5" />
          </g>
        ))}
      </svg>

      {/* Faint road lines */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-15″>
        <line x1="0″ y1="45%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1="30%" y1="0″ x2="45%" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      </svg>

      {/* Pins */}
      {pinPositions.map((pos, i) => {
        const colors = [FOS.teal, FOS.lime, FOS.green, "#3B82F6″, "#F97316"];
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -100%)" }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
              style={{
                background: c,
                boxShadow: `0 0 8px ${c}80`,
                color: "#000″,
              }}
            >
              {i + 1}
            </div>
            <div className="w-0.5 h-2″ style={{ background: c }} />
          </div>
        );
      })}

      {/* Label */}
      <div
        className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5″
        style={{ background: "rgba(7,13,26,0.80)", backdropFilter: "blur(4px)" }}
      >
        <MapPin className="w-3 h-3″ style={{ color: FOS.teal }} />
        <p className="text-[10px] font-semibold" style={{ color: FOS.muted }}>
          Last {Math.min(5, count)} visited homes
        </p>
      </div>
    </div>
  );
}

/* -- Sort button ------------------------------------------------------------ */
function SortPill({
  active, label, onClick,
}: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
      style={{
        background: active ? FOS.tealDim : FOS.surface,
        color:      active ? FOS.teal    : FOS.faint,
        border:     active ? `1px solid ${FOS.teal}40` : `1px solid ${FOS.border}`,
      }}
    >
      {active && <SortAsc className="w-3 h-3″ />}
      {label}
    </button>
  );
}

export default function FieldHomeProfiles() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<any | null>(null);
  const [sortBy,   setSortBy]   = useState<SortOption>("Last Visit");

  const { data: myJobs,        isLoading } = trpc.partners.getMyJobs.useQuery();
  const { data: myOpps }                   = trpc.partners.getInboundOpportunities.useQuery();
  const { data: myCommissions }            = trpc.partners.getEarnedCommissions.useQuery();

  /* Build home profiles from job history */
  const profileMap = useMemo(() => {
    const map = new Map<string, {
      address:     string;
      suburb:      string;
      visits:      number;
      lastVisit:   Date;
      photos:      number;
      leads:       number;
      commissions: number;
      health:      HealthKey;
      trade:       string;
      isRepeat:    boolean;
    }>();

    (myJobs ?? []).forEach((job: any) => {
      const addr    = job.serviceAddress ?? "Unknown Address";
      const parts   = addr.split(",");
      const street  = parts[0]?.trim() ?? addr;
      const suburb  = parts[1]?.trim() ?? parts[0]?.trim() ?? "";
      const photos  = job.photoCount ?? 1;
      const trade   = job.tradeCategory ?? job.opportunityType ?? "general";

      const existing = map.get(addr);
      if (existing) {
        existing.visits++;
        existing.photos += photos;
        existing.isRepeat = true;
        if (new Date(job.loggedAt) > existing.lastVisit) {
          existing.lastVisit = new Date(job.loggedAt);
          existing.trade     = trade;
        }
      } else {
        const keys: HealthKey[] = ["excellent", "good", "fair", "poor"];
        map.set(addr, {
          address: street, suburb, visits: 1,
          lastVisit: new Date(job.loggedAt),
          photos, leads: 0, commissions: 0,
          health: keys[Math.floor(Math.random() * 4)],
          trade, isRepeat: false,
        });
      }
    });

    (myOpps ?? []).forEach((opp: any) => {
      const job = (myJobs ?? []).find((j: any) => j.id === opp.jobId);
      if (job) {
        const p = map.get(job.serviceAddress ?? "");
        if (p) p.leads++;
      }
    });

    (myCommissions ?? []).forEach((c: any) => {
      const job = (myJobs ?? []).find((j: any) => j.id === c.jobId);
      if (job) {
        const p = map.get(job.serviceAddress ?? "");
        if (p) p.commissions += Number(c.amount ?? 0);
      }
    });

    return map;
  }, [myJobs, myOpps, myCommissions]);

  const profiles = useMemo(() => {
    const arr = Array.from(profileMap.values());
    if (sortBy === "Last Visit")    return arr.sort((a, b) => b.lastVisit.getTime() - a.lastVisit.getTime());
    if (sortBy === "Health Score")  return arr.sort((a, b) => HEALTH_CFG[b.health].score - HEALTH_CFG[a.health].score);
    return arr.sort((a, b) => a.address.localeCompare(b.address));
  }, [profileMap, sortBy]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return profiles.filter(p =>
      p.address.toLowerCase().includes(q) ||
      p.suburb.toLowerCase().includes(q)
    );
  }, [profiles, search]);

  // Quick stats
  const totalHomes     = profiles.length;
  const repeatCount    = profiles.filter(p => p.isRepeat).length;
  const avgHealthScore = profiles.length
    ? Math.round(profiles.reduce((s, p) => s + HEALTH_CFG[p.health].score, 0) / profiles.length)
    : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3″ style={{ background: FOS.bg }}>
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: FOS.teal }} />
        <p className="text-sm" style={{ color: FOS.muted }}>Loading profiles...</p>
      </div>
    );
  }

  /* -- Detail view ---------------------------------------------------------- */
  if (selected) {
    const completeness = Math.min(100, Math.round((selected.visits / 5) * 100));
    const badge        = getTradeBadge(selected.trade);
    const healthCfg    = HEALTH_CFG[selected.health as HealthKey];

    return (
      <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>
        {/* Back */}
        <div className="px-5 pt-5 pb-3″>
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm font-semibold active:opacity-70″
            style={{ color: FOS.teal }}
          >
            <ArrowLeft className="w-4 h-4″ /> Back to Profiles
          </button>
        </div>

        {/* Address card */}
        <div className="px-5 mb-5″>
          <div className="rounded-3xl p-5″ style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            <div className="flex items-start gap-3 mb-4″>
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0″
                style={{ background: FOS.tealDim }}
              >
                <Building2 className="w-5 h-5″ style={{ color: FOS.teal }} />
              </div>
              <div className="flex-1 min-w-0″>
                <p className="text-white font-black text-sm leading-tight">{selected.address}</p>
                {selected.suburb && (
                  <p className="text-xs mt-0.5″ style={{ color: FOS.muted }}>{selected.suburb}</p>
                )}
                <div className="flex items-center gap-2 mt-2″>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: badge.color, background: `${badge.color}18` }}
                  >
                    {badge.label}
                  </span>
                  {selected.isRepeat && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: FOS.lime, background: FOS.limeDim }}
                    >
                      Repeat Client
                    </span>
                  )}
                </div>
              </div>
            </div>

            <HealthBar health={selected.health} score={healthCfg.score} />

            <div className="flex items-center gap-2 mt-3″>
              <Calendar className="w-3.5 h-3.5″ style={{ color: FOS.faint }} />
              <p className="text-xs" style={{ color: FOS.muted }}>
                Last visited{" "}
                {selected.lastVisit.toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </p>
            </div>

            {/* Profile completeness */}
            <div className="mt-4″>
              <div className="flex justify-between items-center mb-1.5″>
                <span className="text-xs" style={{ color: FOS.muted }}>Profile Completeness</span>
                <span className="text-xs font-bold" style={{ color: FOS.faint }}>{completeness}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: FOS.ghost }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${completeness}%`, background: FOS.teal }} />
              </div>
              {completeness < 100 && (
                <p className="text-[10px] mt-1.5″ style={{ color: FOS.faint }}>
                  {5 - selected.visits} more visit{5 - selected.visits !== 1 ? "s" : ""} to complete
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="px-5 mb-5″>
          <div className="grid grid-cols-2 gap-3″>
            <StatTile icon={Camera}     value={selected.photos}                        label="Photos"   color={FOS.teal}  />
            <StatTile icon={MapPin}     value={selected.visits}                        label="Visits"   color={FOS.green} />
            <StatTile icon={Zap}        value={selected.leads}                         label="AI Leads" color={FOS.lime}  />
            <StatTile icon={DollarSign} value={`$${selected.commissions.toFixed(0)}`} label="Earned"   color={FOS.lime}  />
          </div>
        </div>

        {/* AI Insight */}
        <div className="px-5 mb-5″>
          <div
            className="rounded-2xl p-4″
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}25` }}
          >
            <div className="flex items-center gap-2 mb-2″>
              <Zap className="w-4 h-4″ style={{ color: FOS.teal }} />
              <p className="text-sm font-bold" style={{ color: FOS.teal }}>AI Insight</p>
            </div>
            {selected.visits >= 3 ? (
              <p className="text-sm leading-relaxed" style={{ color: FOS.muted }}>
                This property has been visited{" "}
                <span className="text-white font-semibold">{selected.visits} times</span>.
                The AI has built a detailed home profile and is actively monitoring for event-driven
                opportunities like storm damage, asset aging, and seasonal maintenance needs.
              </p>
            ) : (
              <p className="text-sm leading-relaxed" style={{ color: FOS.muted }}>
                Visit this property{" "}
                <span className="text-white font-semibold">
                  {3 - selected.visits} more time{3 - selected.visits !== 1 ? "s" : ""}
                </span>{" "}
                to unlock full AI monitoring. More photos = more accurate opportunity detection.
              </p>
            )}
          </div>
        </div>

        {/* Book return visit CTA */}
        <div className="px-5″>
          <button
            className="w-full py-4 rounded-2xl text-base font-black transition-all active:scale-95″
            style={{
              background: `linear-gradient(135deg, ${FOS.teal}, #0ea5e9)`,
              color:      "#ffffff",
              boxShadow:  `0 8px 24px rgba(13,148,136,0.25)`,
            }}
          >
            Book Return Visit
          </button>
        </div>
      </div>
    );
  }

  /* -- List view ------------------------------------------------------------ */
  return (
    <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>

      {/* Header */}
      <div className="px-5 pt-6 pb-4″>
        <div className="flex items-start justify-between mb-4″>
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1″ style={{ color: FOS.muted }}>Your Territory</p>
            <h2 className="text-white text-2xl font-black">Home Profiles</h2>
          </div>
          <div
            className="rounded-2xl px-4 py-2.5 text-center"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}20` }}
          >
            <p className="text-lg font-black leading-none" style={{ color: FOS.teal }}>{totalHomes}</p>
            <p className="text-[9px] mt-0.5 uppercase tracking-wider" style={{ color: FOS.faint }}>properties</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4″ style={{ color: FOS.faint }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by address, ZIP, or name..."
            className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none"
            style={{
              background: FOS.surface,
              border:     `1px solid ${FOS.border}`,
              color:      FOS.white,
            }}
          />
        </div>
      </div>

      {/* Quick stats */}
      <div className="px-5 mb-4″>
        <div
          className="rounded-2xl px-4 py-3 grid grid-cols-3 gap-0″
          style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1″>
              <Home className="w-3.5 h-3.5″ style={{ color: FOS.teal }} />
              <p className="text-lg font-black" style={{ color: FOS.teal }}>{totalHomes}</p>
            </div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: FOS.faint }}>Homes Served</p>
          </div>
          <div className="text-center" style={{ borderLeft: `1px solid ${FOS.border}`, borderRight: `1px solid ${FOS.border}` }}>
            <div className="flex items-center justify-center gap-1.5 mb-1″>
              <Users className="w-3.5 h-3.5″ style={{ color: FOS.green }} />
              <p className="text-lg font-black" style={{ color: FOS.green }}>{repeatCount}</p>
            </div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: FOS.faint }}>Repeat Clients</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1″>
              <Star className="w-3.5 h-3.5″ style={{ color: FOS.lime }} />
              <p className="text-lg font-black" style={{ color: FOS.lime }}>{avgHealthScore}</p>
            </div>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: FOS.faint }}>Avg Health</p>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      {profiles.length > 0 && (
        <div className="px-5 mb-4″>
          <MapPlaceholder count={profiles.length} />
        </div>
      )}

      {/* Sort options */}
      {profiles.length > 0 && (
        <div className="px-5 mb-3″>
          <div className="flex items-center gap-2 overflow-x-auto pb-1″ style={{ scrollbarWidth: "none" }}>
            <p className="text-[10px] uppercase tracking-wider shrink-0″ style={{ color: FOS.faint }}>Sort:</p>
            {SORT_OPTIONS.map(opt => (
              <SortPill
                key={opt}
                active={sortBy === opt}
                label={opt}
                onClick={() => setSortBy(opt)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="px-5 flex flex-col gap-3″>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              <Building2 className="w-7 h-7″ style={{ color: FOS.faint }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: FOS.muted }}>
                {search ? "No matches found" : "No home profiles yet"}
              </p>
              <p className="text-xs mt-1 max-w-[200px] leading-relaxed" style={{ color: FOS.faint }}>
                {search
                  ? "Try a different address or ZIP code"
                  : "Log jobs with photos to start building property profiles"}
              </p>
            </div>
          </div>
        ) : (
          filtered.map(profile => {
            const h     = HEALTH_CFG[profile.health as HealthKey];
            const badge = getTradeBadge(profile.trade);
            return (
              <button
                key={profile.address}
                onClick={() => setSelected(profile)}
                className="rounded-2xl p-4 text-left active:scale-[0.98] transition-transform"
                style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
              >
                {/* Top row: address + chevron */}
                <div className="flex items-start justify-between mb-3″>
                  <div className="flex items-start gap-3″>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5″
                      style={{ background: FOS.tealDim }}
                    >
                      <Building2 className="w-4 h-4″ style={{ color: FOS.teal }} />
                    </div>
                    <div className="min-w-0″>
                      <p className="text-white font-bold text-sm leading-tight line-clamp-1″>
                        {profile.address}
                      </p>
                      {profile.suburb && (
                        <p className="text-[11px] mt-0.5 line-clamp-1″ style={{ color: FOS.faint }}>
                          {profile.suburb}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 mt-1″ style={{ color: FOS.faint }} />
                </div>

                {/* Last service + trade badge */}
                <div className="flex items-center gap-2 mb-3″>
                  <div className="flex items-center gap-1″>
                    <Calendar className="w-3 h-3″ style={{ color: FOS.faint }} />
                    <p className="text-[11px]" style={{ color: FOS.muted }}>
                      {profile.lastVisit.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: badge.color, background: `${badge.color}18` }}
                  >
                    {badge.label}
                  </span>
                  {profile.isRepeat && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: FOS.lime, background: FOS.limeDim }}
                    >
                      Repeat
                    </span>
                  )}
                </div>

                {/* Health score bar */}
                <div className="mb-3″>
                  <div className="flex justify-between items-center mb-1″>
                    <div className="flex items-center gap-1″>
                      <Shield className="w-3 h-3″ style={{ color: h.color }} />
                      <p className="text-[10px] font-semibold" style={{ color: h.color }}>{h.label}</p>
                    </div>
                    <p className="text-[10px] font-black" style={{ color: h.color }}>{h.score}/100</p>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: FOS.ghost }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${h.score}%`, background: h.color }}
                    />
                  </div>
                </div>

                {/* Footer: job count + CTA hint */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5″>
                    <Wrench className="w-3 h-3″ style={{ color: FOS.faint }} />
                    <p className="text-[11px]" style={{ color: FOS.muted }}>
                      {profile.visits} job{profile.visits !== 1 ? "s" : ""} completed here
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: FOS.tealDim,
                      color:      FOS.teal,
                      border:     `1px solid ${FOS.teal}25`,
                    }}
                  >
                    Book Return Visit
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
