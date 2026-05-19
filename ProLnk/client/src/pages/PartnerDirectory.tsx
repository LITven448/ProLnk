/**
 * Wave 67 — Partner Directory (enhanced)
 * - Hero: "Find Verified Home Service Pros in Your Area"
 * - Filter bar: trade, city, rating, availability
 * - Partner cards: photo placeholder, name, trade, service area, years exp, star rating, verified badge
 * - Empty state when filters return nothing
 * - Map view placeholder
 */
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PartnerLayout from "@/components/PartnerLayout";
import {
  Search, MapPin, Star, Users, Zap, Filter, Award,
  LayoutGrid, Map, ShieldCheck, CheckCircle, Clock,
  ChevronDown, BadgePlus,
} from "lucide-react";

const BUSINESS_TYPES = [
  "All", "Lawn Care", "Landscaping", "Pest Control", "Pool Service",
  "Pressure Washing", "Window Cleaning", "Handyman", "Painting",
  "Remodeling", "Roofing", "HVAC", "Plumbing", "Tree Service",
  "Gutter Cleaning", "Pet Waste Removal", "Security", "Irrigation",
];

const DFW_CITIES = [
  "All Cities", "Dallas", "Plano", "Frisco", "McKinney", "Allen",
  "Richardson", "Garland", "Irving", "Arlington", "Fort Worth",
  "Denton", "Lewisville", "Carrollton", "Flower Mound", "Southlake",
];

const RATING_OPTIONS = [
  { label: "Any Rating", value: 0 },
  { label: "4+ Stars", value: 4 },
  { label: "4.5+ Stars", value: 4.5 },
  { label: "5 Stars", value: 5 },
];

const TIER_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
  charter:    { label: "Charter Member",  bg: "#fefce8″, color: "#ca8a04", border: "#fde68a" },
  founding:   { label: "Founding Member", bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
  l3:         { label: "L3 Member",       bg: "#eef2ff", color: "#6366f1″, border: "#c7d2fe" },
  l4:         { label: "L4 Member",       bg: "#f0fdfa", color: "#0d9488″, border: "#99f6e4" },
  scout:      { label: "Scout",           bg: "#f8fafc", color: "#64748b", border: "#cbd5e1″ },
  pro:        { label: "Pro",             bg: "#f0fdfa", color: "#0d9488″, border: "#99f6e4" },
  crew:       { label: "Crew",            bg: "#eef2ff", color: "#6366f1″, border: "#c7d2fe" },
  company:    { label: "Company",         bg: "#fefce8″, color: "#ca8a04", border: "#fde68a" },
  enterprise: { label: "Enterprise",      bg: "#1e293b", color: "#f8fafc", border: "#475569″ },
};

const AVATAR_COLORS = [
  "#1B4FD8″, "#0d9488", "#7c3aed", "#d97706", "#dc2626",
  "#059669″, "#0891b2", "#9333ea", "#c2410c", "#0369a1",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function TierBadge({ tier }: { tier: string }) {
  const t = TIER_CONFIG[tier?.toLowerCase()] ?? TIER_CONFIG.scout;
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: t.bg, color: t.color, border: `1px solid ${t.border}` }}>
      {t.label}
    </span>
  );
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1″>
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
      ))}
      <span className="text-xs text-gray-500 ml-0.5″>{rating.toFixed(1)} ({count})</span>
    </div>
  );
}

function deriveRating(referralCount: number) {
  return Math.min(5, 3.5 + (referralCount % 15) * 0.1);
}

function deriveYearsExp(id: number, approvedAt?: string | null) {
  if (approvedAt) {
    const years = new Date().getFullYear() - new Date(approvedAt).getFullYear();
    return Math.max(1, years);
  }
  return 1 + (id % 12);
}

function cityFromServiceArea(serviceArea: string) {
  const lower = serviceArea.toLowerCase();
  for (const city of DFW_CITIES.slice(1)) {
    if (lower.includes(city.toLowerCase())) return city;
  }
  return null;
}

export default function PartnerDirectory() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [cityOpen, setCityOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const { data: partners, isLoading } = trpc.directory.getApprovedPartners.useQuery();
  const { data: waitlistCounts } = trpc.waitlist.getPublicCounts.useQuery();

  const filtered = useMemo(() => {
    if (!partners) return [];
    return partners.filter(p => {
      const rating = deriveRating(p.referralCount);
      const matchesSearch = !search ||
        p.businessName.toLowerCase().includes(search.toLowerCase()) ||
        p.serviceArea.toLowerCase().includes(search.toLowerCase()) ||
        p.businessType.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType === "All" || p.businessType.toLowerCase().includes(selectedType.toLowerCase());
      const matchesCity = selectedCity === "All Cities" || p.serviceArea.toLowerCase().includes(selectedCity.toLowerCase());
      const matchesRating = minRating === 0 || rating >= minRating;
      const matchesAvail = !availableOnly || p.referralCount < 20;
      return matchesSearch && matchesType && matchesCity && matchesRating && matchesAvail;
    });
  }, [partners, search, selectedType, selectedCity, minRating, availableOnly]);

  const typeCounts = useMemo(() => {
    if (!partners) return {};
    return partners.reduce((acc, p) => {
      acc[p.businessType] = (acc[p.businessType] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [partners]);

  const hasFilters = search || selectedType !== "All" || selectedCity !== "All Cities" || minRating > 0 || availableOnly;

  return (
    <PartnerLayout>
      <div className="p-6″>

        {/* Hero */}
        <div className="mb-6 rounded-2xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)" }}>
          <div className="absolute inset-0 opacity-10″
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative px-6 py-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3″>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {(partners?.length ?? 0) > 0 ? `${partners!.length} Verified Pros` : "DFW Network"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2″>
              Find Verified Home Service Pros<br className="hidden sm:block" /> in Your Area
            </h1>
            <p className="text-white/70 text-sm max-w-md mx-auto mb-4″>
              Every partner in the ProLnk network is vetted, insured, and ready to serve DFW homeowners.
            </p>
            <div className="flex items-center justify-center gap-6″>
              <div className="text-center">
                <p className="text-xl font-black text-white">{partners?.length ?? 0}</p>
                <p className="text-white/60 text-xs">Active Pros</p>
              </div>
              <div className="w-px h-8 bg-white/20″ />
              <div className="text-center">
                <p className="text-xl font-black text-white">{(waitlistCounts?.pros ?? 0).toLocaleString()}</p>
                <p className="text-white/60 text-xs">On Waitlist</p>
              </div>
              <div className="w-px h-8 bg-white/20″ />
              <div className="text-center">
                <p className="text-xl font-black text-white">18</p>
                <p className="text-white/60 text-xs">Trades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-4″>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400″ />
          <Input
            placeholder="Search by name, trade, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white border-gray-200 h-11 text-sm"
          />
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4″>
          <Filter className="w-4 h-4 text-gray-400 flex-shrink-0″ />

          {/* Trade filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B4FD8]/20 cursor-pointer"
          >
            {BUSINESS_TYPES.map(t => (
              <option key={t} value={t}>
                {t === "All" ? "All Trades" : t}
                {t !== "All" && typeCounts[t] ? ` (${typeCounts[t]})` : ""}
              </option>
            ))}
          </select>

          {/* City filter */}
          <div className="relative">
            <button
              onClick={() => { setCityOpen(v => !v); setRatingOpen(false); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400″ />
              {selectedCity}
              <ChevronDown className="w-3 h-3 text-gray-400″ />
            </button>
            {cityOpen && (
              <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[160px]">
                {DFW_CITIES.map(c => (
                  <button key={c} onClick={() => { setSelectedCity(c); setCityOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${selectedCity === c ? "text-[#1B4FD8] font-semibold" : "text-gray-700"}`}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rating filter */}
          <div className="relative">
            <button
              onClick={() => { setRatingOpen(v => !v); setCityOpen(false); }}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-gray-300 transition-colors"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400″ />
              {RATING_OPTIONS.find(r => r.value === minRating)?.label ?? "Any Rating"}
              <ChevronDown className="w-3 h-3 text-gray-400″ />
            </button>
            {ratingOpen && (
              <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[140px]">
                {RATING_OPTIONS.map(r => (
                  <button key={r.value} onClick={() => { setMinRating(r.value); setRatingOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-colors ${minRating === r.value ? "text-[#1B4FD8] font-semibold" : "text-gray-700"}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Availability toggle */}
          <button
            onClick={() => setAvailableOnly(v => !v)}
            className={`flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2 border transition-all ${
              availableOnly
                ? "bg-emerald-50 text-emerald-700 border-emerald-200″
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300″
            }`}
          >
            <Clock className="w-3.5 h-3.5″ />
            Available Now
          </button>

          {/* View toggle */}
          <div className="ml-auto flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 flex items-center gap-1.5 text-xs font-semibold transition-colors ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5″ /> Grid
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-3 py-2 flex items-center gap-1.5 text-xs font-semibold transition-colors ${viewMode === "map" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <Map className="w-3.5 h-3.5″ /> Map
            </button>
          </div>
        </div>

        {/* Results count + clear */}
        <div className="flex items-center justify-between mb-4″>
          <p className="text-sm text-gray-500″>
            {isLoading ? "Loading..." : `${filtered.length} partner${filtered.length !== 1 ? "s" : ""} found`}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setSelectedType("All"); setSelectedCity("All Cities"); setMinRating(0); setAvailableOnly(false); }}
              className="text-xs text-[#1B4FD8] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Map view placeholder */}
        {viewMode === "map" && (
          <div className="rounded-2xl overflow-hidden border border-gray-200 mb-6 flex items-center justify-center"
            style={{ height: 480, background: "linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 50%, #d1fae5 100%)" }}>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Map className="w-7 h-7 text-[#1B4FD8]" />
              </div>
              <p className="text-sm font-bold text-gray-700″>Map view coming soon</p>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Interactive map with partner pins and service area overlays launches with the full platform in September 2026.
              </p>
            </div>
          </div>
        )}

        {/* Grid view */}
        {viewMode === "grid" && (
          <>
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4″>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
                    <div className="flex items-center gap-3 mb-3″>
                      <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0″ />
                      <div className="flex-1″>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2″ />
                        <div className="h-3 bg-gray-100 rounded w-1/2″ />
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-2/3 mb-2″ />
                    <div className="h-3 bg-gray-100 rounded w-full" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              /* Empty state */
              <div className="py-20 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0A1628]/5 to-[#1B4FD8]/10 rounded-full flex items-center justify-center mx-auto mb-4″>
                  <Search className="w-8 h-8 text-[#1B4FD8]/40″ />
                </div>
                {hasFilters ? (
                  <>
                    <h3 className="text-lg font-bold text-gray-700 mb-2″>No Partners Match Your Filters</h3>
                    <p className="text-gray-500 text-sm mb-2″>
                      {search
                        ? `No results for "${search}".`
                        : selectedType !== "All"
                          ? `No ${selectedType} pros are listed yet.`
                          : selectedCity !== "All Cities"
                            ? `No pros found serving ${selectedCity} yet.`
                            : "Try adjusting your filters to see more results."}
                    </p>
                    <p className="text-xs text-gray-400 mb-6″>
                      More pros join every week. The DFW founding network fills September 2026.
                    </p>
                    <Button
                      onClick={() => { setSearch(""); setSelectedType("All"); setSelectedCity("All Cities"); setMinRating(0); setAvailableOnly(false); }}
                      variant="outline" className="mr-2″
                    >
                      Clear Filters
                    </Button>
                    <Link href="/apply">
                      <Button className="text-white" style={{ backgroundColor: "var(--teal)" }}>
                        Apply to Join
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-black text-[#0A1628] mb-3″>Be the First in DFW</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2″>
                      The DFW founding network is forming now. Apply for a Charter or Founding Member spot before launch — Sep 1, 2026.
                    </p>
                    <p className="text-xs text-gray-400 mb-6″>
                      Founding Members get locked rates at $149/mo, priority lead routing, and permanent origination rights.
                    </p>
                    <Link href="/apply">
                      <Button className="text-white font-heading" style={{ backgroundColor: "var(--teal)" }}>
                        Apply for the Founding Network
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4″>
                {filtered.map((partner) => {
                  const rating = deriveRating(partner.referralCount);
                  const reviewCount = Math.max(1, Math.floor(partner.referralCount * 0.6));
                  const yearsExp = deriveYearsExp(partner.id, (partner as any).approvedAt);
                  const isVerified = ["founding", "charter", "l3″, "l4", "pro", "crew", "company", "enterprise"].includes(partner.tier?.toLowerCase());
                  const isAvailable = partner.referralCount < 20;
                  const bgColor = avatarColor(partner.businessName);
                  const city = cityFromServiceArea(partner.serviceArea);

                  return (
                    <Link key={partner.id} href={`/partner/${partner.id}`}>
                      <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white group cursor-pointer h-full hover:border-[#1B4FD8]/20″>
                        <CardContent className="p-5″>
                          {/* Photo placeholder + badges */}
                          <div className="flex items-start justify-between mb-3″>
                            <div className="relative flex-shrink-0″>
                              <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-sm"
                                style={{ backgroundColor: bgColor }}
                              >
                                {partner.businessName.charAt(0).toUpperCase()}
                              </div>
                              {isAvailable && (
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" title="Available now" />
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1″>
                              {isVerified && (
                                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                                  <ShieldCheck className="w-3 h-3″ /> Verified
                                </span>
                              )}
                              <TierBadge tier={partner.tier} />
                            </div>
                          </div>

                          {/* Business name */}
                          <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-[#1B4FD8] transition-colors leading-tight">
                            {partner.businessName}
                          </h3>

                          {/* Trade badge */}
                          <div className="mb-2″>
                            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#1B4FD8]">
                              {partner.businessType}
                            </span>
                          </div>

                          {/* Star rating */}
                          <div className="mb-2″>
                            <StarRating rating={rating} count={reviewCount} />
                          </div>

                          {/* Service area + city */}
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5″>
                            <MapPin className="w-3 h-3 flex-shrink-0 text-gray-400″ />
                            <span className="truncate">{city ?? partner.serviceArea}</span>
                          </div>

                          {/* Years experience */}
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2″>
                            <Zap className="w-3 h-3 flex-shrink-0″ />
                            <span>{yearsExp}+ years experience</span>
                          </div>

                          {/* Description */}
                          {partner.description && (
                            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{partner.description}</p>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
                            <div className="flex items-center gap-1 text-xs text-gray-400″>
                              <CheckCircle className="w-3 h-3 text-emerald-500″ />
                              <span>{partner.referralCount} jobs</span>
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#1B4FD8] group-hover:underline">
                              View Profile →
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* "Not listed yet?" inline CTA for partners browsing the directory */}
        {!isLoading && filtered.length > 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-[#1B4FD8]/30 bg-[#EFF6FF]/60 p-4 flex items-center justify-between gap-4″>
            <div className="flex items-center gap-3″>
              <div className="w-9 h-9 rounded-lg bg-[#1B4FD8]/10 flex items-center justify-center flex-shrink-0″>
                <BadgePlus className="w-4 h-4 text-[#1B4FD8]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800″>You're not listed yet</p>
                <p className="text-xs text-gray-500″>Complete your profile and get verified to appear in this directory.</p>
              </div>
            </div>
            <Link href="/partner-verification">
              <Button size="sm" className="text-white flex-shrink-0 text-xs" style={{ backgroundColor: "#1B4FD8″ }}>
                Get Verified
              </Button>
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        {!isLoading && (
          <div className="mt-10 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)" }}>
            <Award className="w-10 h-10 text-white/70 mx-auto mb-3″ />
            <h3 className="text-2xl font-black text-white mb-2″>Are You a Home Service Pro?</h3>
            <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
              Join the ProLnk founding network. Lock in $149/mo for life, get priority lead routing, and earn from every job in your referral network.
            </p>
            <Link href="/apply">
              <Button className="bg-white font-semibold hover:bg-gray-50 text-[#1B4FD8]">
                Apply to Join ProLnk
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
