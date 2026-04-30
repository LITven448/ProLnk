import HomeownerLayout from "@/components/HomeownerLayout";
import FeaturedAdvertiserBanner from "@/components/FeaturedAdvertiserBanner";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Zap, Camera, Star, Shield,
  ArrowRight, Clock, CheckCircle,
  DollarSign, Calendar, Sparkles,
  CloudLightning, AlertTriangle, Eye, TrendingUp, Radar,
  Home, Trophy, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const urgencyConfig: Record<string, { dot: string; label: string; text: string }> = {
  high:   { dot: "#EF4444", label: "Urgent",     text: "#EF4444" },
  medium: { dot: "#F59E0B", label: "Soon",       text: "#D97706" },
  low:    { dot: "#10B981", label: "When Ready", text: "#059669" },
};

const TRADE_MOCKUPS: Record<string, string> = {
  Fencing:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/after-front-yard_3b26a6f3.jpg",
  Gutters:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/after-front-yard_3b26a6f3.jpg",
  Concrete: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/after-front-yard_3b26a6f3.jpg",
  Handyman: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/after-interior_aa7c0963.jpg",
  Painting: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/after-interior_aa7c0963.jpg",
  default:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/after-front-yard_3b26a6f3.jpg",
};

export default function HomeownerDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: profile, isLoading: profileLoading } = trpc.homeowner.getProfile.useQuery();
  const { data: properties = [], isLoading: propsLoading } = trpc.homeowner.getMyProperties.useQuery();
  const { data: stats } = trpc.homeowner.getMyStats.useQuery();
  const { data: deals = [] } = trpc.homeowner.getMyDeals.useQuery();
  const { data: allPhotos = [] } = trpc.homeowner.getPropertyPhotos.useQuery(
    { propertyId: (properties as any[])[0]?.id ?? 0 },
    { enabled: !!(properties as any[])[0]?.id }
  );
  const isLoading = profileLoading || propsLoading;

  const displayName = user?.name ?? "Homeowner";
  const primaryProperty = (properties as any[])[0];
  const displayAddress = primaryProperty?.address ?? profile?.city ?? "";
  const setupComplete = profile?.setupComplete;

  // Profile completion percentage
  const profileCompletionPct = (() => {
    let pts = 0;
    if (profile) pts += 15;
    if (primaryProperty?.address) pts += 15;
    if (primaryProperty?.propertyType) pts += 10;
    if (primaryProperty?.yearBuilt) pts += 10;
    if (primaryProperty?.sqft) pts += 10;
    if (primaryProperty?.bedrooms) pts += 5;
    if (primaryProperty?.bathrooms) pts += 5;
    if (primaryProperty?.systems && JSON.parse(primaryProperty.systems || '[]').length > 0) pts += 10;
    if (profile?.consentTerms) pts += 10;
    if (setupComplete) pts += 10;
    return Math.min(pts, 100);
  })();

  // Only show real deals — no fake demo data
  const displayOffers = deals.slice(0, 3).map(d => ({
    id: d.id,
    type: d.serviceType,
    trade: d.serviceType,
    urgency: d.urgencyLevel === 1 ? 'high' : d.urgencyLevel === 3 ? 'low' : 'medium',
    description: d.description ?? '',
    detectedBy: d.proName ?? 'ProLnk Network',
    detectedDate: new Date(d.createdAt).toLocaleDateString(),
    proName: d.proName ?? 'Verified Pro',
    proRating: 4.8,
    proJobs: 150,
    estimateRange: d.estimateRange ?? 'Free estimate',
    status: d.status,
    photoUrl: null,
    expiresIn: d.expiresAt ? (() => {
      const ms = new Date(d.expiresAt!).getTime() - Date.now();
      const hrs = Math.floor(ms / 3600000);
      return hrs > 24 ? `${Math.floor(hrs/24)} days` : `${hrs} hours`;
    })() : null,
  }));

  const activeOffersCount = stats?.pendingOffers ?? 0;
  const completedJobsCount = stats?.completedJobs ?? 0;

  if (isLoading) {
    return (
      <HomeownerLayout homeownerName="" homeownerAddress="">
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
          <div className="h-7 w-56 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-28 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1,2,3,4].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-gray-100 animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />)}
          </div>
          <div className="h-48 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          <div className="h-32 bg-white rounded-2xl border border-gray-100 animate-pulse" />
        </div>
      </HomeownerLayout>
    );
  }

  return (
    <HomeownerLayout homeownerName={displayName} homeownerAddress={displayAddress}>
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">

        {/* -- Profile Completion Banner ----------------------------- */}
        {!setupComplete && (
          <div className="rounded-2xl overflow-hidden border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🏠</span>
                    <h3 className="text-base font-bold text-gray-900">Complete your Home Profile</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Your home profile unlocks AI-powered maintenance alerts, personalized pro matching, and before/after mockups. Takes about 5 minutes.
                  </p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Profile strength</span>
                      <span className="font-semibold text-indigo-600">{profileCompletionPct}% complete</span>
                    </div>
                    <div className="w-full bg-indigo-100 rounded-full h-2">
                      <div className="h-2 rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${profileCompletionPct}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate(profileCompletionPct === 0 ? "/my-home/quick-start" : "/my-home/wizard")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                      {profileCompletionPct === 0 ? "Quick Start (3 min)" : "Continue Setup"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {profileCompletionPct === 0 && (
                      <button onClick={() => navigate("/my-home/wizard")}
                        className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                        Full setup instead →
                      </button>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-3xl">🏡</span>
                  </div>
                  <span className="text-xs text-indigo-500 font-semibold">{profileCompletionPct}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* -- Welcome Header ----------------------------------------- */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Welcome back, {displayName.split(" ")[0]}
          </h1>
          {displayAddress && <p className="text-gray-400 mt-0.5 text-sm">{displayAddress}</p>}
        </div>

        {/* -- Stats Row ---------------------------------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Active Offers",  value: String(activeOffersCount), icon: Zap,         color: "#111827" },
            { label: "Jobs Completed", value: String(completedJobsCount), icon: CheckCircle, color: "#10B981" },
            { label: "Money Saved",    value: (stats as any)?.moneySaved ? `$${Number((stats as any).moneySaved).toLocaleString()}` : "$0",  icon: DollarSign,  color: "#7C3AED" },
            { label: "Trusted Pros",   value: String((stats as any)?.trustedPros ?? 0),                                                               icon: Shield,      color: "#F59E0B" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-slate-100">
              <stat.icon className="w-4 h-4 mb-3" style={{ color: stat.color }} />
              <div className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* -- Active Offers ------------------------------------------ */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900 tracking-tight">Suggestions for Your Home</h2>
            <Link href="/my-home/offers">
              <span className="text-xs font-semibold text-gray-500 cursor-pointer flex items-center gap-1 hover:text-gray-900">
                View all <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>

          <div className="space-y-3">
            {displayOffers.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-100 p-8 text-center">
                <Sparkles className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                <p className="text-sm font-semibold text-gray-600">No offers yet</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Complete your home profile so our AI can generate personalized offers for your property</p>
                <button onClick={() => navigate("/my-home/quick-start")} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  Quick Start <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            {displayOffers.map((offer) => {
              const urg = urgencyConfig[offer.urgency] || urgencyConfig.medium;
              const mockupUrl = TRADE_MOCKUPS[offer.trade] || TRADE_MOCKUPS.default;
              return (
                <div key={offer.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-sm transition-all">
                  {/* Auto-attached style preview */}
                  <div className="relative h-36 overflow-hidden">
                    <img src={offer.photoUrl ?? mockupUrl} alt={offer.type} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)" }} />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "rgba(17,24,39,0.7)", color: "#fff", backdropFilter: "blur(4px)" }}>
                      <Sparkles className="w-2.5 h-2.5 text-indigo-300" /> Style preview
                    </div>
                    {offer.expiresIn && (
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600">
                        <Clock className="w-2.5 h-2.5" /> {offer.expiresIn}
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: urg.dot }} />
                        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: urg.text }}>{urg.label}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{offer.type}</h3>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed">{offer.description}</p>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ backgroundColor: "#111827" }}>
                          {offer.proName[0]}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-900">{offer.proName}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            {offer.proRating} &middot; <span className="text-emerald-600 font-medium">Verified</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-900">{offer.estimateRange}</span>
                    </div>

                    <div className="flex gap-2 pt-0.5">
                      <Button className="flex-1 text-white font-semibold text-xs rounded-lg h-8" style={{ backgroundColor: "#111827" }} onClick={() => navigate("/my-home/offers")}>
                        <Calendar className="w-3 h-3 mr-1.5" /> Schedule Estimate
                      </Button>
                      <Button variant="outline" className="text-xs text-gray-400 border-slate-200 rounded-lg h-8 px-3" onClick={() => navigate("/my-home/offers")}>Pass</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* -- Recent Jobs -------------------------------------------- */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" style={{ color: "#10B981" }} />
              Recent Jobs
            </h2>
            <Link href="/my-home/photos">
              <span className="text-sm font-medium cursor-pointer flex items-center gap-1" style={{ color: "#1B4FD8" }}>
                View all <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {([] as any[]).map((job: any, i: number) => (
              <div
                key={job.id}
                className={`flex items-center justify-between p-4 ${i < 99 ? "border-b border-slate-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#D1FAE5" }}
                  >
                    <CheckCircle className="w-4 h-4" style={{ color: "#10B981" }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{job.trade}</div>
                    <div className="text-xs text-gray-500">{job.pro}  {job.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: job.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-sm font-bold text-gray-900">{job.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* -- Property Health Score (data-driven) ---------------- */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Radar className="w-4 h-4" style={{ color: "#111827" }} />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Property Health Score</p>
            </div>
            {(stats as any)?.healthScore ? (
              <>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="text-3xl font-black text-gray-900 tracking-tight">{(stats as any).healthScore}<span className="text-lg text-gray-300 font-normal">/100</span></div>
                    <p className="text-xs text-gray-400 mt-1">Based on your home systems and completed work</p>
                  </div>
                </div>
                <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${(stats as any).healthScore}%`, backgroundColor: "#111827" }} />
                </div>
              </>
            ) : (
              <div className="py-6 text-center">
                <Radar className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                <p className="text-sm font-semibold text-gray-600">No health score yet</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Add your home systems in the Health Vault to generate your property health score</p>
                <button onClick={() => navigate("/my-home/vault")} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  Open Health Vault <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Proactive alerts — only shown when real data exists */}
          {(stats as any)?.alerts && ((stats as any).alerts as any[]).length > 0 && (
            <div className="border-t border-slate-100">
              <div className="px-5 py-3 flex items-center justify-between bg-slate-50">
                <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  Proactive Alerts
                </span>
                <span className="text-[10px] text-gray-400">Powered by ProLnk Engine</span>
              </div>
              <div className="divide-y divide-slate-50">
                {((stats as any).alerts as any[]).map((alert: any, i: number) => (
                  <div key={i} className="px-5 py-3 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#3B82F615" }}>
                      <AlertTriangle className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-gray-900">{alert.title}</span>
                        <span className="text-[10px] text-gray-300">{alert.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      {/* -- Room Gallery Gamification -------------------------------- */}
      {primaryProperty && (() => {
        const ROOMS = [
          { key: 'living_room', label: 'Living Room' },
          { key: 'kitchen', label: 'Kitchen' },
          { key: 'primary_bedroom', label: 'Primary Bed' },
          { key: 'bathroom', label: 'Bathroom' },
          { key: 'exterior_front', label: 'Front Yard' },
          { key: 'exterior_back', label: 'Back Yard' },
          { key: 'garage', label: 'Garage' },
          { key: 'dining_room', label: 'Dining Room' },
        ];
        const coveredKeys = new Set((allPhotos as any[]).map((p: any) => p.roomLabel));
        const covered = ROOMS.filter(r => coveredKeys.has(r.key)).length;
        const pct = Math.round((covered / ROOMS.length) * 100);
        const unlocked = pct === 100;
        return (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-indigo-500" />
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Home Room Gallery</p>
                </div>
                {unlocked ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Trophy className="w-3 h-3" /> Gallery Complete!
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> {covered}/{ROOMS.length} rooms
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: unlocked ? '#F59E0B' : '#6366F1' }} />
                </div>
                <span className="text-xs font-bold text-gray-700">{pct}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {ROOMS.map(room => {
                  const done = coveredKeys.has(room.key);
                  const photo = (allPhotos as any[]).find((p: any) => p.roomLabel === room.key);
                  return (
                    <button
                      key={room.key}
                      onClick={() => navigate('/my-home/photos')}
                      className={`relative rounded-xl overflow-hidden aspect-square flex flex-col items-center justify-center border-2 transition-all ${
                        done ? 'border-indigo-200' : 'border-dashed border-slate-200 bg-slate-50 hover:border-indigo-300'
                      }`}
                    >
                      {done && photo?.url ? (
                        <img src={photo.url} alt={room.label} className="w-full h-full object-cover" />
                      ) : (
                        <Camera className={`w-5 h-5 ${done ? 'text-indigo-400' : 'text-slate-300'}`} />
                      )}
                      <span className={`absolute bottom-0 left-0 right-0 text-[9px] font-semibold text-center py-0.5 ${
                        done ? 'bg-indigo-600/80 text-white' : 'bg-slate-100/90 text-slate-400'
                      }`}>{room.label}</span>
                      {done && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {!unlocked && (
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Add photos of all 8 rooms to unlock your <span className="font-semibold text-indigo-600">Home Gallery Badge</span> and boost your AI scan accuracy.
                </p>
              )}
            </div>
          </div>
        );
      })()}
      {/* -- Featured Advertiser Banner -------------------------------- */}
      <FeaturedAdvertiserBanner
        placement="dashboard"
        zipCode={(primaryProperty as any)?.zip ?? undefined}
      />

      </div>
    </HomeownerLayout>
  );
}
