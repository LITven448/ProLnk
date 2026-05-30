import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Loader2, Target, Sparkles, Send, MapPin, DollarSign,
  Award, ChevronDown, ChevronUp, Inbox,
} from "lucide-react";

const NAVY = "#0A1628";
const TEAL = "#0D9488";

type RankedPartner = {
  partnerId: number;
  businessName?: string | null;
  score: number;
  reasons: string[];
};

function MatchPanel({ opportunityId }: { opportunityId: number }) {
  const matches = trpc.matching.findMatches.useQuery(
    { opportunityId },
    { enabled: false }
  );
  const createOffer = trpc.matching.createOffer.useMutation({
    onSuccess: (d) => toast.success(`Offer #${d.offerId} sent to the top-ranked partner.`),
    onError: (e) => toast.error(`Could not create offer: ${e.message}`),
  });

  const ranked = (matches.data as RankedPartner[] | undefined) ?? [];

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => matches.refetch()}
          disabled={matches.isFetching}
        >
          {matches.isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
          <span className="ml-1.5">Find Matches</span>
        </Button>
        <Button
          size="sm"
          className="text-white"
          style={{ backgroundColor: TEAL }}
          onClick={() => createOffer.mutate({ opportunityId })}
          disabled={createOffer.isPending}
        >
          {createOffer.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span className="ml-1.5">Create Offer (top match)</span>
        </Button>
      </div>

      {matches.isFetched && ranked.length === 0 && (
        <p className="text-xs text-gray-400 mt-3">No eligible partners matched this opportunity.</p>
      )}

      {ranked.length > 0 && (
        <div className="mt-3 space-y-2">
          {ranked.map((p, i) => (
            <div
              key={p.partnerId}
              className={`rounded-xl border p-3 ${i === 0 ? "border-[#0D9488]/40 bg-[#0D9488]/5" : "border-gray-100 bg-white"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ backgroundColor: i === 0 ? TEAL : "#94A3B8" }}>
                    {i + 1}
                  </span>
                  <span className="font-semibold text-sm text-[#0A1628] truncate">
                    {p.businessName ?? `Partner #${p.partnerId}`}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-bold shrink-0" style={{ color: TEAL }}>
                  <Sparkles className="w-3.5 h-3.5" /> {Math.round(p.score)}
                </span>
              </div>
              {p.reasons?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.reasons.map((r, j) => (
                    <span key={j} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs bg-gray-50 text-gray-600 border border-gray-100">
                      <Award className="w-3 h-3 text-gray-400" /> {r}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OpportunityRow({ opp }: { opp: any }) {
  const [open, setOpen] = useState(false);
  const est = opp.estimatedJobValue != null ? Number(opp.estimatedJobValue) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-gray-50/60 transition"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0A1628] capitalize truncate">
              {(opp.opportunityCategory ?? opp.opportunityType ?? "Opportunity").replace(/_/g, " ")}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 capitalize">
              {opp.status ?? "new"}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {opp.jobAddress || (opp.jobZip ? `ZIP ${opp.jobZip}` : opp.serviceAddress || "No location")}
            </span>
            {est != null && (
              <span className="inline-flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" /> Est. ${est.toLocaleString()}
              </span>
            )}
            <span className="text-gray-400">#{opp.id}</span>
          </div>
          {opp.description && (
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{opp.description}</p>
          )}
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-4 pb-4"><MatchPanel opportunityId={opp.id} /></div>}
    </div>
  );
}

export default function MatchingConsole() {
  const { data: opportunities = [], isLoading } = trpc.admin.getOpportunityFeed.useQuery(undefined, {
    refetchInterval: 30_000,
  });

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${TEAL}15` }}>
            <Target className="w-5 h-5" style={{ color: TEAL }} />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Matching Console</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-13">
          Run the matching engine on any opportunity, review ranked partners, and dispatch the first offer.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {!isLoading && opportunities.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${NAVY}08` }}>
              <Inbox className="w-7 h-7 text-gray-300" />
            </div>
            <h3 className="font-bold text-[#0A1628]">No opportunities yet</h3>
            <p className="text-sm text-gray-500 mt-1">Homeowner job requests will appear here for matching.</p>
          </div>
        )}

        <div className="space-y-3">
          {(opportunities as any[]).map((opp) => (
            <OpportunityRow key={opp.id} opp={opp} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
