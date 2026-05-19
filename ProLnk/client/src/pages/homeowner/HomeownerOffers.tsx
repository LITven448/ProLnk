import HomeownerLayout from "@/components/HomeownerLayout";
import FeaturedAdvertiserBanner from "@/components/FeaturedAdvertiserBanner";
import { Link } from "wouter";
import {
  Zap, Star, CheckCircle, Clock, Camera, Calendar,
  ThumbsDown, Database, ExternalLink, Sparkles, ArrowRight, Share2, MapPin, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

// Before images (current state) keyed by trade category
const TRADE_BEFORE: Record<string, string> = {
  Fencing: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80″,
  Gutters: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80″,
  Concrete: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80″,
  Handyman: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80″,
  Interior: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80″,
  Painting: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80″,
  default: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80″,
};

// Style-matched mockup images keyed by trade category
const TRADE_MOCKUPS: Record<string, string> = {
  Fencing: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
  Gutters: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
  Concrete: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
  Handyman: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-interior_aa7c0963.jpg",
  Interior: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-interior_aa7c0963.jpg",
  Painting: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-interior_aa7c0963.jpg",
  default: "https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/after-front-yard_3b26a6f3.jpg",
};

// Expiry timestamps: offer 1 = 31h from a fixed past point, offer 2 = 4d, offer 3 = null
const OFFER_EXPIRES: Record<number, number | null> = {
  1: Date.now() + 31 * 60 * 60 * 1000,
  2: Date.now() + 4 * 24 * 60 * 60 * 1000,
  3: null,
  4: null,
};

const DEMO_OFFERS = [
  {
    id: 1, type: "Fence Repair", trade: "Fencing", urgency: "medium",
    description: "Rotting fence post at the back gate -- detected during lawn service. Left unaddressed, the post will fail within 6-12 months requiring full section replacement.",
    detectedBy: "Green Thumb Lawn Care", detectedDate: "Mar 15, 2025″,
    proName: "DFW Fence Masters", proRating: 4.9, proJobs: 312, proVerified: true,
    estimateRange: "Free estimate", status: "pending", expiresIn: "31 hours",
    photoUrl: null, token: null, isDemo: true, popularity: 12,
  },
  {
    id: 2, type: "Gutter Cleaning", trade: "Gutters", urgency: "low",
    description: "Debris buildup in front gutters visible from ground level. Downspout may be partially blocked -- could cause fascia damage in heavy rain.",
    detectedBy: "ProLnk AI", detectedDate: "Mar 12, 2025″,
    proName: "Clear Flow Gutters", proRating: 4.8, proJobs: 189, proVerified: true,
    estimateRange: "$120-$180″, status: "pending", expiresIn: "4 days",
    photoUrl: null, token: null, isDemo: true, popularity: 8,
  },
  {
    id: 3, type: "Driveway Crack Sealing", trade: "Concrete", urgency: "high",
    description: "Expansion crack running 8 feet across the driveway. Texas freeze/thaw cycles will widen this significantly. Seal now or replace a section later.",
    detectedBy: "ProLnk AI", detectedDate: "Mar 8, 2025″,
    proName: "DFW Concrete Pros", proRating: 4.7, proJobs: 445, proVerified: true,
    estimateRange: "$150-$300″, status: "accepted", expiresIn: null,
    photoUrl: null, token: null, isDemo: true, popularity: 17,
  },
  {
    id: 4, type: "Window Caulking", trade: "Handyman", urgency: "low",
    description: "Exterior caulking around two front windows is cracked and pulling away. Air and moisture infiltration risk.",
    detectedBy: "Green Thumb Lawn Care", detectedDate: "Feb 20, 2025″,
    proName: "Handy Dan's Services", proRating: 4.6, proJobs: 98, proVerified: true,
    estimateRange: "$80-$150″, status: "declined", expiresIn: null,
    photoUrl: null, token: null, isDemo: true, popularity: 5,
  },
];

const urgencyConfig: Record<string, { dot: string; label: string; text: string }> = {
  high:   { dot: "#EF4444″, label: "Urgent", text: "#EF4444" },
  medium: { dot: "#F59E0B", label: "Soon",   text: "#D97706″ },
  low:    { dot: "#10B981″, label: "When Ready", text: "#059669" },
};

// Countdown timer hook-free component
function CountdownTimer({ expiresMs }: { expiresMs: number }) {
  const [remaining, setRemaining] = useState(() => {
    const ms = expiresMs - new Date().getTime();
    return ms > 0 ? ms : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const ms = expiresMs - new Date().getTime();
      setRemaining(ms > 0 ? ms : 0);
    }, 60000);
    return () => clearInterval(interval);
  }, [expiresMs]);

  if (remaining <= 0) return null;

  const totalHours = Math.floor(remaining / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  const label = days > 0
    ? `${days}d ${hours}h left`
    : `${hours}h ${mins}m left`;

  return (
    <div className="flex items-center gap-1 text-xs text-amber-500 flex-shrink-0 font-medium bg-amber-50 px-2 py-1 rounded-lg">
      <Clock className="w-3 h-3″ /> {label}
    </div>
  );
}

// Before/After slider component
function BeforeAfterSlider({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-44 overflow-hidden cursor-ew-resize select-none"
      onMouseDown={(e) => { isDragging.current = true; updatePos(e.clientX); }}
      onMouseMove={(e) => { if (isDragging.current) updatePos(e.clientX); }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
      onTouchStart={(e) => { isDragging.current = true; updatePos(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (isDragging.current) updatePos(e.touches[0].clientX); }}
      onTouchEnd={() => { isDragging.current = false; }}
    >
      {/* After image (full) */}
      <img src={after} alt={`${alt} after`} className="absolute inset-0 w-full h-full object-cover" />
      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img src={before} alt={`${alt} before`} className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: "none" }} />
      </div>
      {/* Slider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-600″ fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3″ strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-2 left-2 text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded">BEFORE</div>
      <div className="absolute top-2 right-2 text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded">AFTER</div>
      {/* Gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />
    </div>
  );
}

function mapDbDeal(d: any) {
  const conf = d.aiConfidence != null ? Number(d.aiConfidence) : 50;
  const urgency = conf >= 80 ? "high" : conf >= 50 ? "medium" : "low";
  const isPending = ["sent", "viewed", "pending"].includes(d.status);
  const isAccepted = ["accepted", "scheduled", "estimate_done", "job_closed"].includes(d.status);
  let expiresIn: string | null = null;
  if (d.expiresAt && isPending) {
    const ms = new Date(d.expiresAt).getTime() - Date.now();
    if (ms > 0) {
      const hours = Math.floor(ms / (1000 * 60 * 60));
      expiresIn = hours < 24 ? `${hours}h` : `${Math.floor(hours / 24)}d`;
    }
  }
  return {
    id: d.id, type: d.issueType || "Home Issue", trade: d.issueCategory || "General",
    urgency, description: d.issueDescription || "",
    detectedBy: d.referredBy || "ProLnk Network",
    detectedDate: new Date(d.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    proName: d.proName || "Assigned Pro",
    proRating: d.proRating ? parseFloat(d.proRating) : 4.8,
    proJobs: null, proVerified: true,
    estimateRange: d.estimatedValueLow && d.estimatedValueHigh
      ? `$${Math.round(d.estimatedValueLow)}-$${Math.round(d.estimatedValueHigh)}`
      : "Free estimate",
    status: isPending ? "pending" : isAccepted ? "accepted" : d.status,
    expiresIn, photoUrl: d.photoUrl || null, token: d.token, isDemo: false, popularity: null,
  };
}

const ZIP_CODE = "75034″;
const DEALS_CLAIMED = 2;
const DEALS_TOTAL = 3;
const SAVINGS_TOTAL = 284;

export default function HomeownerOffers() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("all");

  const { data: dbDeals, isLoading } = trpc.deals.getForHomeowner.useQuery(
    { email: user?.email ?? "" },
    { enabled: !!user?.email, retry: false }
  );

  const { data: scanOffers, isLoading: scanLoading } = trpc.homeowner.getScanOffers.useQuery(
    undefined,
    { enabled: !!user, retry: false }
  );

  const dismissOffer = trpc.homeowner.dismissScanOffer.useMutation({
    onSuccess: () => trpc.useUtils().homeowner.getScanOffers.invalidate(),
  });

  const allOffers = useMemo(() => {
    const partnerOffers = dbDeals && dbDeals.length > 0 ? dbDeals.map(mapDbDeal) : [];
    const aiOffers = (scanOffers ?? []).map((o: any) => ({
      id: `scan-${o.id}`,
      type: o.issueType,
      trade: o.issueCategory,
      urgency: o.severity === "critical" ? "high" : o.severity === "upgrade" ? "low" : o.severity,
      description: o.issueDescription,
      detectedBy: "TrustyPro AI Scan",
      detectedDate: new Date(o.createdAt).toLocaleDateString(),
      proName: null,
      proRating: null,
      proJobs: null,
      proVerified: false,
      estimateRange: o.estimatedCostLow && o.estimatedCostHigh
        ? `$${Number(o.estimatedCostLow).toLocaleString()}–$${Number(o.estimatedCostHigh).toLocaleString()}`
        : o.estimatedCostLow ? `From $${Number(o.estimatedCostLow).toLocaleString()}` : "Free estimate",
      status: "pending",
      expiresIn: null,
      photoUrl: o.photoUrl,
      token: null,
      isDemo: false,
      isScanOffer: true,
      scanOfferId: o.id,
      roomLabel: o.roomLabel,
      isUpgrade: o.severity === "upgrade",
      popularity: null,
    }));
    return [...partnerOffers, ...aiOffers];
  }, [dbDeals, scanOffers]);

  const usingRealData = (dbDeals && dbDeals.length > 0) || (scanOffers && scanOffers.length > 0);
  const displayOffers = usingRealData ? allOffers : (DEMO_OFFERS as any[]);
  const filtered = filter === "all" ? displayOffers : displayOffers.filter((o: any) => o.status === filter);
  const pendingCount = displayOffers.filter((o: any) => o.status === "pending").length;

  function handleShare(offerType: string) {
    if (navigator.share) {
      navigator.share({
        title: `ProLnk Offer: ${offerType}`,
        text: `I got a great home service offer through ProLnk for ${offerType}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("Link copied to clipboard!");
      });
    }
  }

  return (
    <HomeownerLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6″>

        {/* Personalized header */}
        <div className="flex items-start justify-between gap-4″>
          <div>
            <div className="flex items-center gap-2 mb-1″>
              <MapPin className="w-4 h-4 text-teal-400″ />
              <span className="text-sm font-semibold text-teal-400″>{pendingCount} offers saved for your ZIP {ZIP_CODE}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Suggestions for Your Home</h1>
            <p className="text-sm text-gray-400 mt-0.5″>
              {(isLoading || scanLoading) ? "Loading..." : pendingCount > 0
                ? `${pendingCount} suggestion${pendingCount > 1 ? "s" : ""} waiting -- each includes a style preview`
                : "All caught up"}
            </p>
          </div>
          {usingRealData && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 flex-shrink-0″>
              <Database className="w-3 h-3″ /> Live
            </div>
          )}
        </div>

        {/* Loyalty savings banner */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-xl px-4 py-3″>
          <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0″>
            <Gift className="w-4 h-4 text-teal-600″ />
          </div>
          <div className="flex-1 min-w-0″>
            <p className="text-sm font-semibold text-teal-800″>You've saved <span className="text-teal-600">${SAVINGS_TOTAL}</span> with ProLnk offers</p>
            <p className="text-xs text-teal-600/70 mt-0.5″>Keep using ProLnk to unlock higher savings tiers</p>
          </div>
        </div>

        {/* Deals claimed progress bar */}
        <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 space-y-2″>
          <div className="flex items-center justify-between text-xs text-gray-500″>
            <span className="font-medium text-gray-700″>Monthly deals claimed</span>
            <span className="font-bold text-gray-900″>{DEALS_CLAIMED} of {DEALS_TOTAL} available</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all"
              style={{ width: `${(DEALS_CLAIMED / DEALS_TOTAL) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400″>
            You've claimed {DEALS_CLAIMED} of {DEALS_TOTAL} available deals this month
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "pending", "accepted", "declined"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all capitalize"
              style={filter === f
                ? { backgroundColor: "#111827″, color: "#fff" }
                : { backgroundColor: "#F9FAFB", color: "#6B7280″, border: "1px solid #E5E7EB" }}>
              {f === "all" ? `All (${displayOffers.length})`
                : f === "pending" ? `Pending (${displayOffers.filter((o: any) => o.status === "pending").length})`
                : f === "accepted" ? `Accepted (${displayOffers.filter((o: any) => o.status === "accepted").length})`
                : `Declined (${displayOffers.filter((o: any) => o.status === "declined").length})`}
            </button>
          ))}
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="space-y-4″>
            {[1, 2].map(i => <div key={i} className="bg-white rounded-2xl border border-slate-100 h-64 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4″>
              <Sparkles className="w-8 h-8 text-indigo-400″ />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2″>No suggestions yet</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-5″>
              Once a ProLnk partner visits your property, AI will scan their photos and send you personalized suggestions — including style previews of what your home could look like.
            </p>
            <Link href="/my-home/pros">
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0A1628] hover:bg-teal-700 transition-colors">
                Browse Verified Pros
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4″>
            {filtered.map((offer: any) => {
              const urg = urgencyConfig[offer.urgency] || urgencyConfig.medium;
              const mockupUrl = TRADE_MOCKUPS[offer.trade] || TRADE_MOCKUPS.default;
              const expiresMs = OFFER_EXPIRES[offer.id as number] ?? null;
              return (
                <div key={offer.id}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all ${offer.status === "declined" ? "opacity-50" : "hover:shadow-md"}`}
                  style={{ borderColor: offer.status === "pending" ? "#E0E7FF" : "#F1F5F9″ }}>

                  {/* Top: detected photo OR before/after slider */}
                  <div className="relative">
                    {offer.photoUrl ? (
                      <div className="relative h-44″>
                        <img src={offer.photoUrl} alt={offer.type} className="w-full h-44 object-cover" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "rgba(17,24,39,0.75)", color: "#fff", backdropFilter: "blur(4px)" }}>
                          <Camera className="w-3 h-3 text-blue-300″ />
                          Photo detected
                        </div>
                      </div>
                    ) : (
                      <div className="relative">
                        <BeforeAfterSlider
                          before={TRADE_BEFORE[offer.trade] || TRADE_BEFORE.default}
                          after={mockupUrl}
                          alt={offer.type}
                        />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "rgba(17,24,39,0.75)", color: "#fff", backdropFilter: "blur(4px)" }}>
                          <Sparkles className="w-3 h-3 text-indigo-300″ />
                          Drag to compare
                        </div>
                      </div>
                    )}

                    {/* Popularity badge */}
                    {offer.popularity != null && offer.popularity > 0 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                        {offer.popularity} homeowners in your area claimed this
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-4″>
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3″>
                      <div>
                        <div className="flex items-center gap-2 mb-1″>
                          <span className="w-2 h-2 rounded-full flex-shrink-0″ style={{ backgroundColor: urg.dot }} />
                          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: urg.text }}>{urg.label}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 leading-tight">{offer.type}</h3>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0″>
                        {expiresMs != null ? (
                          <CountdownTimer expiresMs={expiresMs} />
                        ) : offer.expiresIn ? (
                          <div className="flex items-center gap-1 text-xs text-amber-500 font-medium bg-amber-50 px-2 py-1 rounded-lg">
                            <Clock className="w-3 h-3″ /> {offer.expiresIn} left
                          </div>
                        ) : null}
                        <button
                          onClick={() => handleShare(offer.type)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Share offer"
                        >
                          <Share2 className="w-4 h-4″ />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">{offer.description}</p>

                    {/* Detected by */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400″>
                      <Camera className="w-3 h-3″ />
                      Spotted by <span className="font-medium text-gray-600 ml-0.5″>{offer.detectedBy}</span>
                      <span className="mx-1″></span>{offer.detectedDate}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-50″ />

                    {/* Pro row */}
                    {offer.proName && (
                      <div className="flex items-center justify-between gap-3″>
                        <div className="flex items-center gap-3″>
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0″
                            style={{ backgroundColor: "#1B4FD8″ }}>
                            {(offer.proName || "P")[0]}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 leading-tight">{offer.proName}</div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5″>
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400″ />
                              <span>{offer.proRating?.toFixed(1)}</span>
                              {offer.proJobs && <><span></span><span>{offer.proJobs} jobs</span></>}
                              {offer.proVerified && (
                                <span className="flex items-center gap-0.5 font-medium" style={{ color: "#10B981″ }}>
                                  <CheckCircle className="w-3 h-3″ /> Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0″>
                          <div className="text-xs text-gray-400″>Estimate</div>
                          <div className="text-sm font-bold text-gray-900″>{offer.estimateRange}</div>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    {offer.status === "pending" && (
                      <div className="flex gap-2 pt-1″>
                        {offer.token ? (
                          <Link href={`/deal/${offer.token}`} className="flex-1″>
                            <Button className="w-full text-white font-semibold text-sm rounded-xl h-10″ style={{ backgroundColor: "#111827" }}>
                              View Full Offer <ArrowRight className="w-4 h-4 ml-1.5″ />
                            </Button>
                          </Link>
                        ) : (
                          <Button className="flex-1 text-white font-semibold text-sm rounded-xl h-10″ style={{ backgroundColor: "#111827" }}
                            onClick={() => toast.info("A pro will reach out within 24 hours to schedule your estimate.")}>
                            <Calendar className="w-4 h-4 mr-1.5″ /> Schedule Estimate
                          </Button>
                        )}
                        <Button variant="outline" className="text-sm text-gray-400 border-slate-200 rounded-xl h-10 px-3″>
                          <ThumbsDown className="w-4 h-4″ />
                        </Button>
                      </div>
                    )}

                    {offer.status === "accepted" && (
                      <div className="flex items-center gap-2 text-sm font-medium p-3 rounded-xl bg-emerald-50 text-emerald-700″>
                        <CheckCircle className="w-4 h-4 flex-shrink-0″ />
                        Estimate scheduled -- the pro will contact you within 24 hours
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {/* -- Bundle Offers Banner: show when 3+ pending scan offers exist -- */}
      {allOffers.filter((o: any) => o.isScanOffer && o.status === "pending").length >= 3 && (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-4″>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0″>
              <Sparkles className="w-5 h-5 text-yellow-300″ />
            </div>
            <div className="flex-1 min-w-0″>
              <div className="flex items-center gap-2 mb-1″>
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300″>Bundle Opportunity</span>
              </div>
              <h3 className="font-bold text-base mb-1″>
                {allOffers.filter((o: any) => o.isScanOffer && o.status === "pending").length} projects detected — one visit could handle them all
              </h3>
              <p className="text-white/70 text-sm mb-3″>
                TrustyPro can match you with a pro who covers multiple trades, saving you time and potentially reducing costs vs. booking each separately.
              </p>
              <Link href="/my-home/quick-quote">
                <button className="px-4 py-2 rounded-lg bg-white text-indigo-900 text-sm font-bold hover:bg-yellow-300 transition-colors">
                  Request a Bundle Quote →
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* -- Featured Partner Banner (high-intent scan results placement) -- */}
      <FeaturedAdvertiserBanner placement="scanResults" className="mt-2″ />

      </div>
    </HomeownerLayout>
  );
}
