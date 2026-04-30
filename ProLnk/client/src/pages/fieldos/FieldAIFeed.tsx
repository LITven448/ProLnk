/**
 * Field OS -- AI Lead Feed (v3)
 * Design system: Teal #0D9488 (actions) | Lime #E8FF47 (money) | Navy #070D1A (bg)
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { FOS } from "./fosTokens";
import { toast } from "sonner";
import {
  Zap, CheckCircle2, Clock, ChevronRight,
  Loader2, Sparkles, TrendingUp
} from "lucide-react";

type FilterKey = "all" | "pending" | "active" | "completed";

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 80 ? FOS.teal : pct >= 60 ? FOS.lime : FOS.amber;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] w-20 shrink-0" style={{ color: FOS.faint }}>AI Confidence</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: FOS.ghost }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[10px] font-mono w-8 text-right" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function FieldAIFeed() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [acceptingId, setAcceptingId] = useState<number | null>(null);

  const { data: opportunities, isLoading } = trpc.partners.getInboundOpportunities.useQuery();
  const utils = trpc.useUtils();

  const acceptMutation = trpc.partners.respondToOpportunity.useMutation({
    onMutate:  (vars) => setAcceptingId(vars.opportunityId),
    onSuccess: () => {
      utils.partners.getInboundOpportunities.invalidate();
      setAcceptingId(null);
      toast.success("Lead accepted! Check your dashboard.");
    },
    onError: (err) => {
      setAcceptingId(null);
      toast.error(err.message ?? "Failed to accept lead");
    },
  });

  const all          = opportunities ?? [];
  const pendingCount = all.filter((o: any) => o.status === "pending" || o.status === "active").length;
  const pipelineVal  = all
    .filter((o: any) => o.status === "pending" || o.status === "active")
    .reduce((s: number, o: any) => s + Number(o.referralCommissionAmount ?? 0), 0);

  const filtered = filter === "all" ? all : all.filter((o: any) => o.status === filter);

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all",       label: `All (${all.length})`       },
    { key: "pending",   label: `New (${pendingCount})`     },
    { key: "active",    label: "Active"                    },
    { key: "completed", label: "Completed"                 },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3" style={{ background: FOS.bg }}>
        <Loader2 className="w-7 h-7 animate-spin" style={{ color: FOS.teal }} />
        <p className="text-sm" style={{ color: FOS.muted }}>Loading AI feed...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4 min-h-full" style={{ background: FOS.bg }}>

      {/* -- Header -- */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: FOS.muted }}>AI Engine</p>
            <h2 className="text-white text-2xl font-black">Lead Feed</h2>
          </div>
          {/* Pipeline pill */}
          <div
            className="rounded-2xl px-4 py-2.5 text-center"
            style={{ background: FOS.limeDim, border: `1px solid ${FOS.lime}20` }}
          >
            <p className="font-black text-lg leading-none" style={{ color: FOS.lime }}>${pipelineVal.toLocaleString()}</p>
            <p className="text-[9px] mt-0.5 uppercase tracking-wider" style={{ color: FOS.faint }}>pipeline</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mb-4">
          {[
            { label: "New",      value: pendingCount,                                         color: FOS.lime  },
            { label: "Total",    value: all.length,                                            color: FOS.teal  },
            { label: "Accepted", value: all.filter((o: any) => o.status === "accepted").length, color: FOS.green },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex-1 rounded-2xl px-3 py-2.5 text-center"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              <p className="text-lg font-black leading-none" style={{ color }}>{value}</p>
              <p className="text-[9px] mt-0.5 uppercase tracking-wider" style={{ color: FOS.faint }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: filter === key ? FOS.teal : FOS.surface,
                color:      filter === key ? "#fff"   : FOS.muted,
                border:     filter === key ? "none"   : `1px solid ${FOS.border}`,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* -- Cards -- */}
      <div className="px-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center"
              style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
            >
              <Sparkles className="w-7 h-7" style={{ color: FOS.faint }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: FOS.muted }}>No leads yet</p>
              <p className="text-xs mt-1 max-w-[200px] leading-relaxed" style={{ color: FOS.faint }}>
                Log jobs with photos and the AI will detect opportunities automatically
              </p>
            </div>
          </div>
        ) : (
          filtered.map((opp: any) => {
            const status      = opp.status ?? "pending";
            const isAccepting = acceptingId === opp.id;
            const commission  = Number(opp.referralCommissionAmount ?? 0);
            const confidence  = Number(opp.aiConfidence ?? opp.confidenceScore ?? 0.75);
            const isPending   = status === "pending" || status === "active";

            const statusCfg: Record<string, { label: string; dot: string; bg: string; bdr: string }> = {
              pending:   { label: "New Lead",  dot: FOS.lime,  bg: FOS.limeDim,                    bdr: `${FOS.lime}20`  },
              active:    { label: "Active",    dot: FOS.teal,  bg: FOS.tealDim,                    bdr: `${FOS.teal}20`  },
              accepted:  { label: "Accepted",  dot: FOS.green, bg: "rgba(16,185,129,0.10)",        bdr: "rgba(16,185,129,0.20)" },
              completed: { label: "Completed", dot: FOS.faint, bg: FOS.surface,                    bdr: FOS.border       },
              expired:   { label: "Expired",   dot: FOS.red,   bg: "rgba(239,68,68,0.08)",         bdr: "rgba(239,68,68,0.20)" },
            };
            const s = statusCfg[status] ?? statusCfg.pending;

            return (
              <div
                key={opp.id}
                className="rounded-2xl p-4 flex flex-col gap-3"
                style={{ background: s.bg, border: `1px solid ${s.bdr}` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${s.dot}18` }}
                    >
                      <Zap className="w-4 h-4" style={{ color: s.dot }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold text-sm leading-tight truncate">
                        {opp.opportunityType ?? "Home Service Opportunity"}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: FOS.muted }}>
                        {opp.opportunityCategory ?? "Detected from photo"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: s.dot, boxShadow: isPending ? `0 0 5px ${s.dot}` : "none" }}
                    />
                    <span className="text-[10px] font-semibold" style={{ color: s.dot }}>{s.label}</span>
                  </div>
                </div>

                {/* Description */}
                {opp.description && (
                  <p className="text-xs leading-relaxed" style={{ color: FOS.muted }}>{opp.description}</p>
                )}

                {/* Confidence */}
                <ConfidenceBar value={confidence} />

                {/* Bottom row */}
                <div
                  className="flex items-center justify-between pt-2"
                  style={{ borderTop: `1px solid ${FOS.border}` }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-black text-xl" style={{ color: FOS.lime }}>${commission.toFixed(0)}</span>
                    <span className="text-[10px]" style={{ color: FOS.faint }}>est. commission</span>
                  </div>

                  {isPending && (
                    <button
                      onClick={() => acceptMutation.mutate({ opportunityId: opp.id, response: "accepted" })}
                      disabled={isAccepting}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black active:scale-95 transition-all"
                      style={{
                        background: isAccepting ? FOS.ghost : `linear-gradient(135deg, ${FOS.teal} 0%, #0F766E 100%)`,
                        color: "#fff",
                        boxShadow: isAccepting ? "none" : `0 4px 12px ${FOS.tealGlow}`,
                      }}
                    >
                      {isAccepting
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <><CheckCircle2 className="w-3.5 h-3.5" /> Accept</>}
                    </button>
                  )}

                  {status === "accepted" && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: FOS.green }}>
                      <CheckCircle2 className="w-4 h-4" />Accepted
                    </div>
                  )}

                  {status === "completed" && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: FOS.muted }}>
                      <TrendingUp className="w-4 h-4" />Completed
                    </div>
                  )}
                </div>

                {/* Expiry */}
                {opp.leadExpiresAt && status === "pending" && (
                  <div
                    className="pt-2 flex items-center gap-1.5 text-[10px]"
                    style={{ borderTop: `1px solid ${FOS.border}`, color: FOS.amber }}
                  >
                    <Clock className="w-3 h-3" />
                    Expires {new Date(opp.leadExpiresAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
