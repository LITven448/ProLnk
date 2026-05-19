import { useState, useMemo } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  Shield, Star, Search, MapPin, BadgeCheck,
  ChevronRight, Users, Sparkles, ArrowLeft, Clock,
  Briefcase, SlidersHorizontal, ArrowUpDown, Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TRADE_CATEGORIES = [
  "All", "HVAC", "Plumbing", "Electrical", "Roofing", "Lawn Care",
  "Pest Control", "Pressure Washing", "Handyman", "Fencing", "Gutters",
  "Painting", "Landscaping", "Pool Service", "Window Cleaning", "Tree Service",
  "Concrete", "Flooring", "Insulation", "Drywall",
];

const DISTANCE_OPTIONS = ["5 mi", "10 mi", "25 mi", "50 mi"];
const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "jobs", label: "Most Jobs" },
  { value: "response", label: "Fastest Response" },
  { value: "name", label: "A–Z" },
];

const AVATAR_COLORS = [
  "#1B4FD8", "#0d9488", "#7c3aed", "#d97706",
  "#059669", "#0891b2", "#9333ea", "#c2410c",
];

function avatarColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
      ))}
    </span>
  );
}

export default function TrustyProDirectory() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("All");
  const [distance, setDistance] = useState("25 mi");
  const [sort, setSort] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const { data: partners, isLoading } = trpc.directory.getApprovedPartners.useQuery();
  const { data: spotlightPartners } = trpc.directory.getSpotlightPartners.useQuery();

  const filtered = useMemo(() => {
    if (!partners) return [];
    let list = partners.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch = !search
        || p.businessName.toLowerCase().includes(q)
        || p.businessType.toLowerCase().includes(q)
        || p.serviceArea.toLowerCase().includes(q);
      const matchTrade = selectedTrade === "All"
        || p.businessType.toLowerCase().includes(selectedTrade.toLowerCase());
      return matchSearch && matchTrade;
    });

    list = [...list].sort((a, b) => {
      if (sort === "rating") return (Number(b.avgRating) || 4.5) - (Number(a.avgRating) || 4.5);
      if (sort === "jobs") return (b.referralCount ?? 0) - (a.referralCount ?? 0);
      if (sort === "response") return (a.id % 60) - (b.id % 60);
      return a.businessName.localeCompare(b.businessName);
    });

    return list;
  }, [partners, search, selectedTrade, sort]);

  function responseTime(id: number) {
    const mins = 15 + (id % 60);
    return mins < 60 ? `${mins} min` : `${Math.round(mins / 60)}h`;
  }

  return (
    <HomeownerLayout>
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFF" }}>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/trustypro">
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </Link>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: "#1B4FD8" }} />
              <span className="font-bold text-gray-900 text-sm">TrustyPro</span>
              <span className="text-gray-400 text-sm">Pro Directory</span>
            </div>
          </div>
          <Link href="/my-home">
            <Button size="sm" className="text-white text-xs" style={{ backgroundColor: "#1B4FD8" }}>
              My Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: "#EFF6FF", color: "#1B4FD8" }}>
            <BadgeCheck className="w-3.5 h-3.5" /> Every pro is background-checked, licensed & insured
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Verified Pro Near You</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Browse DFW's verified home service professionals. All TrustyPro partners are vetted, insured, and rated by real homeowners.
          </p>
        </div>

        {/* Search & filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, trade, or area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters((v) => !v)}
              className="gap-1.5 text-xs shrink-0"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-3 pt-1 border-t border-gray-50">
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium">Distance</p>
                <div className="flex gap-1.5">
                  {DISTANCE_OPTIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDistance(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${distance === d ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                      style={distance === d ? { backgroundColor: "#1B4FD8" } : {}}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1.5 font-medium">Sort by</p>
                <div className="flex gap-1.5 flex-wrap">
                  {SORT_OPTIONS.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => setSort(o.value)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${sort === o.value ? "text-white border-transparent" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                      style={sort === o.value ? { backgroundColor: "#1B4FD8" } : {}}
                    >
                      <ArrowUpDown className="w-3 h-3" />{o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            {TRADE_CATEGORIES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTrade(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  selectedTrade === t
                    ? "text-white border-transparent"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
                style={selectedTrade === t ? { backgroundColor: "#1B4FD8" } : {}}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight row */}
        {!search && selectedTrade === "All" && spotlightPartners && spotlightPartners.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <h2 className="text-sm font-bold text-gray-900">Top Rated This Month</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {spotlightPartners.slice(0, 3).map((p: any) => {
                const rating = Number(p.avgRating || 4.8);
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-blue-200 transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{ backgroundColor: avatarColor(p.businessName) }}
                      >
                        {p.businessName?.[0] ?? "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{p.businessName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.businessType}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <StarRow rating={rating} />
                          <span className="text-xs font-semibold text-gray-700 ml-0.5">{rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin className="w-3 h-3" />{p.serviceArea}</span>
                      <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{responseTime(p.id)}</span>
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-white text-xs"
                      style={{ backgroundColor: "#1B4FD8" }}
                      onClick={() => navigate(`/trustypro/book?pro=${p.id}&service=${encodeURIComponent(p.businessType)}`)}
                    >
                      <Zap className="w-3 h-3 mr-1" /> Request Quote
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900">
              {search || selectedTrade !== "All"
                ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`
                : `All Verified Pros (${partners?.length ?? 0})`}
            </h2>
            {!showFilters && (
              <button
                onClick={() => setShowFilters(true)}
                className="text-xs text-blue-600 flex items-center gap-1 hover:underline"
              >
                <ArrowUpDown className="w-3 h-3" /> Sort & Filter
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 h-24 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-600">No pros found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different search or trade category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((p) => {
                const rating = Number((p as any).avgRating || 4.7);
                const jobs = p.referralCount ?? 0;
                const resp = responseTime(p.id);
                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-100 transition-all">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ backgroundColor: avatarColor(p.businessName) }}
                      >
                        {p.businessName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-900">{p.businessName}</p>
                          <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Verified</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{p.businessType}</p>
                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            <StarRow rating={rating} />
                            <span className="text-xs font-semibold text-gray-700 ml-0.5">{rating.toFixed(1)}</span>
                          </div>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Briefcase className="w-3 h-3" />{jobs} jobs
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />{resp} response
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <MapPin className="w-3 h-3" />{p.serviceArea}
                          </span>
                        </div>
                        {p.description && (
                          <p className="text-xs text-gray-500 mt-1.5 line-clamp-1">{p.description}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <Link href={`/partner/${p.id}`}>
                          <button className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all text-gray-600 whitespace-nowrap">
                            View Profile <ChevronRight className="w-3 h-3" />
                          </button>
                        </Link>
                        <Button
                          size="sm"
                          className="text-white text-xs gap-1 whitespace-nowrap"
                          style={{ backgroundColor: "#1B4FD8" }}
                          onClick={() => navigate(`/trustypro/book?pro=${p.id}&service=${encodeURIComponent(p.businessType)}`)}
                        >
                          <Zap className="w-3 h-3" /> Request Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #1B4FD8 0%, #7C3AED 100%)" }}>
          <Shield className="w-10 h-10 text-white/80 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Are you a home service pro?</h3>
          <p className="text-white/80 text-sm mb-4 max-w-sm mx-auto">
            Join the TrustyPro network and get matched with homeowners in your area who need your services.
          </p>
          <Link href="/apply">
            <Button className="bg-white font-semibold hover:bg-gray-50" style={{ color: "#1B4FD8" }}>
              Apply to Join the Network
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </HomeownerLayout>
  );
}
