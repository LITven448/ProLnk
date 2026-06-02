import { useEffect, useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Inbox, MapPin, DollarSign, Clock, CheckCircle, XCircle,
  Loader2, Sparkles, Briefcase, Award, ArrowRight,
} from "lucide-react";

const NAVY = "#0A1628";
const TEAL = "#0D9488";

const STATUS_STYLE: Record<string, { label: string; bg: string; color: string; border: string }> = {
  offered: { label: "Awaiting your response", bg: "bg-[#0D9488]/5", color: "text-[#0D9488]", border: "border-[#0D9488]/30" },
  accepted: { label: "Accepted", bg: "bg-emerald-50", color: "text-emerald-700", border: "border-emerald-200" },
  declined: { label: "Declined", bg: "bg-red-50", color: "text-red-700", border: "border-red-200" },
  expired: { label: "Expired", bg: "bg-gray-50", color: "text-gray-500", border: "border-gray-200" },
};

function Countdown({ expiresAt }: { expiresAt: string | Date | null }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!expiresAt) return null;
  const ms = new Date(expiresAt).getTime() - now;
  if (ms <= 0) return <span className="text-red-600 font-semibold">Expired</span>;
  const hrs = Math.floor(ms / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  const urgent = ms < 2 * 3_600_000;
  return (
    <span className={`font-semibold ${urgent ? "text-red-600" : "text-[#0A1628]"}`}>
      {hrs > 0 ? `${hrs}h ` : ""}{mins}m left
    </span>
  );
}

type Offer = {
  offerId: number;
  opportunityId: number;
  status: string;
  rank: number | null;
  score: number | null;
  reasons: string[] | unknown;
  offeredAt: string | Date;
  expiresAt: string | Date | null;
  respondedAt: string | Date | null;
  opportunity: {
    category: string | null;
    type: string | null;
    description: string | null;
    zip: string | null;
    address: string | null;
    estimatedValue: number | null;
    status: string | null;
  } | null;
};

function OfferCard({ offer, onResponded }: { offer: Offer; onResponded: () => void }) {
  const respond = trpc.matching.respondToOffer.useMutation({
    onSuccess: (data) => {
      if (data.status === "accepted") {
        toast.success("Offer accepted — the job is yours.");
        track("offer_accepted", { offerId: offer.offerId });
      } else toast.success("Offer declined — routing to the next partner.");
      onResponded();
    },
    onError: (err) => toast.error(`Failed: ${err.message}`),
  });

  const style = STATUS_STYLE[offer.status] ?? STATUS_STYLE.offered;
  const isOpen = offer.status === "offered";
  const opp = offer.opportunity;
  const reasons = Array.isArray(offer.reasons) ? (offer.reasons as string[]) : [];

  return (
    <div className={`bg-white rounded-2xl border ${style.border} shadow-sm overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${NAVY}10` }}>
              <Briefcase className="w-5 h-5" style={{ color: NAVY }} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[#0A1628] capitalize truncate">
                {opp?.category?.replace(/_/g, " ") ?? "Job Opportunity"}
              </h3>
              <div className={`inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${style.bg} ${style.color}`}>
                {offer.status === "accepted" ? <CheckCircle className="w-3 h-3" /> :
                 offer.status === "declined" || offer.status === "expired" ? <XCircle className="w-3 h-3" /> :
                 <Clock className="w-3 h-3" />}
                {style.label}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="text-right shrink-0">
              <div className="text-xs text-gray-400 mb-0.5">Expires in</div>
              <Countdown expiresAt={offer.expiresAt} />
            </div>
          )}
        </div>

        {opp?.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-3">{opp.description}</p>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm">
          {opp?.zip && (
            <span className="inline-flex items-center gap-1.5 text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              {opp.address ? opp.address : `ZIP ${opp.zip}`}
            </span>
          )}
          {opp?.estimatedValue != null && (
            <span className="inline-flex items-center gap-1.5 text-gray-600">
              <DollarSign className="w-4 h-4 text-gray-400" />
              Est. ${opp.estimatedValue.toLocaleString()}
            </span>
          )}
          {offer.score != null && (
            <span className="inline-flex items-center gap-1.5 font-semibold" style={{ color: TEAL }}>
              <Sparkles className="w-4 h-4" />
              Match score {Math.round(offer.score)}
            </span>
          )}
        </div>

        {reasons.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {reasons.map((r, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-[#0D9488]/5 text-[#0D9488] border border-[#0D9488]/20">
                <Award className="w-3 h-3" />
                {r}
              </span>
            ))}
          </div>
        )}

        {isOpen && (
          <div className="flex gap-3 mt-5">
            <Button
              className="flex-1 text-white"
              style={{ backgroundColor: TEAL }}
              disabled={respond.isPending}
              onClick={() => respond.mutate({ offerId: offer.offerId, accept: true })}
            >
              {respond.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                <>Accept Job <ArrowRight className="w-4 h-4 ml-1" /></>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled={respond.isPending}
              onClick={() => respond.mutate({ offerId: offer.offerId, accept: false })}
            >
              Decline
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PartnerOffers() {
  const { data: offers = [], isLoading, refetch } = trpc.matching.getPartnerOffers.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const open = (offers as Offer[]).filter((o) => o.status === "offered");
  const past = (offers as Offer[]).filter((o) => o.status !== "offered");

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${TEAL}15` }}>
            <Inbox className="w-5 h-5" style={{ color: TEAL }} />
          </div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Job Offers</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-13">
          Matched jobs offered to you. Accept within 24 hours or they route to the next partner.
        </p>

        {isLoading && (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {!isLoading && offers.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${NAVY}08` }}>
              <Inbox className="w-7 h-7 text-gray-300" />
            </div>
            <h3 className="font-bold text-[#0A1628]">No job offers yet</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              When the matching engine routes a job your way, it will appear here. Keep your trades and service area current to receive more offers.
            </p>
          </div>
        )}

        {open.length > 0 && (
          <div className="space-y-4 mb-8">
            {open.map((o) => (
              <OfferCard key={o.offerId} offer={o} onResponded={() => refetch()} />
            ))}
          </div>
        )}

        {past.length > 0 && (
          <>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">History</h2>
            <div className="space-y-4 opacity-90">
              {past.map((o) => (
                <OfferCard key={o.offerId} offer={o} onResponded={() => refetch()} />
              ))}
            </div>
          </>
        )}
      </div>
    </PartnerLayout>
  );
}
