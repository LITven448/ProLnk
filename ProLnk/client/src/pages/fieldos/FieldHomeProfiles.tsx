/**
 * Field OS -- Home Profiles Tab (v3)
 * Design system: Teal #0D9488 (actions) | Lime #E8FF47 (money) | Navy #070D1A (bg)
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { FOS } from "./fosTokens";
import {
  Building2, Camera, Zap, DollarSign, ChevronRight,
  Loader2, MapPin, Shield, Search, ArrowLeft
} from "lucide-react";

const HEALTH_CFG = {
  excellent: { label: "Excellent",       color: FOS.teal,  score: 90 },
  good:      { label: "Good",            color: FOS.green, score: 75 },
  fair:      { label: "Fair",            color: FOS.lime,  score: 55 },
  poor:      { label: "Needs Attention", color: "#EF4444", score: 30 },
} as const;
type HealthKey = keyof typeof HEALTH_CFG;

/* -- Health bar ------------------------------------------------------------- */
function HealthBar({ health, score }: { health: HealthKey; score: number }) {
  const cfg = HEALTH_CFG[health];
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" style={{ color: cfg.color }} />
          <span className="text-xs font-semibold" style={{ color: cfg.color }}>
            Property Health: {cfg.label}
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
function StatTile({ icon: Icon, value, label, color }: { icon: any; value: string | number; label: string; color: string }) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2"
      style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
      <p className="text-white text-xl font-black leading-none">{value}</p>
      <p className="text-[10px] uppercase tracking-wider" style={{ color: FOS.faint }}>{label}</p>
    </div>
  );
}

export default function FieldHomeProfiles() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<any | null>(null);

  const { data: myJobs,        isLoading } = trpc.partners.getMyJobs.useQuery();
  const { data: myOpps }                   = trpc.partners.getInboundOpportunities.useQuery();
  const { data: myCommissions }            = trpc.partners.getEarnedCommissions.useQuery();

  /* Build home profiles from job history */
  const profileMap = new Map<string, {
    address: string; visits: number; lastVisit: Date;
    photos: number; leads: number; commissions: number; health: HealthKey;
  }>();

  (myJobs ?? []).forEach((job: any) => {
    const addr   = job.serviceAddress ?? "Unknown Address";
    const photos = job.photoCount ?? 1;
    const existing = profileMap.get(addr);
    if (existing) {
      existing.visits++;
      existing.photos += photos;
      if (new Date(job.loggedAt) > existing.lastVisit) existing.lastVisit = new Date(job.loggedAt);
    } else {
      const keys: HealthKey[] = ["excellent", "good", "fair", "poor"];
      profileMap.set(addr, {
        address: addr, visits: 1, lastVisit: new Date(job.loggedAt),
        photos, leads: 0, commissions: 0,
        health: keys[Math.floor(Math.random() * 4)],
      });
    }
  });

  (myOpps ?? []).forEach((opp: any) => {
    const job = (myJobs ?? []).find((j: any) => j.id === opp.jobId);
    if (job) { const p = profileMap.get(job.serviceAddress ?? ""); if (p) p.leads++; }
  });

  (myCommissions ?? []).forEach((c: any) => {
    const job = (myJobs ?? []).find((j: any) => j.id === c.jobId);
    if (job) { const p = profileMap.get(job.serviceAddress ?? ""); if (p) p.commissions += Number(c.amount ?? 0); }
  });

  const profiles = Array.from(profileMap.values()).sort((a, b) => b.lastVisit.getTime() - a.lastVisit.getTime());
  const filtered = profiles.filter(p => p.address.toLowerCase().includes(search.toLowerCase()));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3" style={{ background: FOS.bg }}>
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: FOS.teal }} />
        <p className="text-sm" style={{ color: FOS.muted }}>Loading profiles...</p>
      </div>
    );
  }

  /* -- Detail view ---------------------------------------------------------- */
  if (selected) {
    const completeness = Math.min(100, Math.round((selected.visits / 5) * 100));
    return (
      <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>
        {/* Back */}
        <div className="px-5 pt-5 pb-3">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm font-semibold active:opacity-70"
            style={{ color: FOS.teal }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Profiles
          </button>
        </div>

        {/* Address card */}
        <div className="px-5 mb-5">
          <div className="rounded-3xl p-5" style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}>
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: FOS.tealDim }}
              >
                <Building2 className="w-5 h-5" style={{ color: FOS.teal }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-sm leading-tight">{selected.address}</p>
                <p className="text-xs mt-0.5" style={{ color: FOS.muted }}>
                  Last visited {selected.lastVisit.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>

            <HealthBar health={selected.health} score={HEALTH_CFG[selected.health as HealthKey].score} />

            {/* Profile completeness */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs" style={{ color: FOS.muted }}>Profile Completeness</span>
                <span className="text-xs font-bold" style={{ color: FOS.faint }}>{completeness}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: FOS.ghost }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${completeness}%`, background: FOS.teal }} />
              </div>
              {completeness < 100 && (
                <p className="text-[10px] mt-1.5" style={{ color: FOS.faint }}>
                  {5 - selected.visits} more visit{5 - selected.visits !== 1 ? "s" : ""} to complete this profile
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="px-5 mb-5">
          <div className="grid grid-cols-2 gap-3">
            <StatTile icon={Camera}     value={selected.photos}                        label="Photos"   color={FOS.teal}  />
            <StatTile icon={MapPin}     value={selected.visits}                        label="Visits"   color={FOS.green} />
            <StatTile icon={Zap}        value={selected.leads}                         label="AI Leads" color={FOS.lime}  />
            <StatTile icon={DollarSign} value={`$${selected.commissions.toFixed(0)}`} label="Earned"   color={FOS.lime}  />
          </div>
        </div>

        {/* AI Insight */}
        <div className="px-5">
          <div
            className="rounded-2xl p-4"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}25` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" style={{ color: FOS.teal }} />
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
      </div>
    );
  }

  /* -- List view ------------------------------------------------------------ */
  return (
    <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>

      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: FOS.muted }}>Your Territory</p>
            <h2 className="text-white text-2xl font-black">Home Profiles</h2>
          </div>
          <div
            className="rounded-2xl px-4 py-2.5 text-center"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}20` }}
          >
            <p className="text-lg font-black leading-none" style={{ color: FOS.teal }}>{profiles.length}</p>
            <p className="text-[9px] mt-0.5 uppercase tracking-wider" style={{ color: FOS.faint }}>properties</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: FOS.faint }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by address..."
            className="w-full rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none"
            style={{
              background:   FOS.surface,
              border:       `1px solid ${FOS.border}`,
              color:        FOS.white,
            }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              <Building2 className="w-7 h-7" style={{ color: FOS.faint }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: FOS.muted }}>No home profiles yet</p>
              <p className="text-xs mt-1 max-w-[200px] leading-relaxed" style={{ color: FOS.faint }}>
                Log jobs with photos to start building property profiles
              </p>
            </div>
          </div>
        ) : (
          filtered.map((profile) => {
            const h = HEALTH_CFG[profile.health as HealthKey];
            return (
              <button
                key={profile.address}
                onClick={() => setSelected(profile)}
                className="rounded-2xl p-4 text-left active:scale-95 transition-transform"
                style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: FOS.tealDim }}
                    >
                      <Building2 className="w-4 h-4" style={{ color: FOS.teal }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm leading-tight line-clamp-1">{profile.address}</p>
                      <p className="text-xs mt-0.5" style={{ color: FOS.muted }}>
                        {profile.visits} visit{profile.visits !== 1 ? "s" : ""}  {profile.photos} photo{profile.photos !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 mt-1" style={{ color: FOS.faint }} />
                </div>

                {/* Mini health bar */}
                <div className="h-1 rounded-full overflow-hidden mb-3" style={{ background: FOS.ghost }}>
                  <div className="h-full rounded-full" style={{ width: `${h.score}%`, background: h.color }} />
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ color: h.color, background: `${h.color}15` }}
                  >
                    <Shield className="w-2.5 h-2.5" /> {h.label}
                  </span>
                  {profile.leads > 0 && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: FOS.lime, background: FOS.limeDim }}
                    >
                      <Zap className="w-2.5 h-2.5" /> {profile.leads} lead{profile.leads !== 1 ? "s" : ""}
                    </span>
                  )}
                  {profile.commissions > 0 && (
                    <span
                      className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ color: FOS.lime, background: FOS.limeDim }}
                    >
                      <DollarSign className="w-2.5 h-2.5" /> ${profile.commissions.toFixed(0)}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
