import { useState, useMemo } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  Shield, Star, Search, MapPin, CheckCircle, BadgeCheck,
  ChevronRight, Filter, Users, Award, Sparkles, ArrowLeft, Phone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TRADE_CATEGORIES = [
  "All", "Lawn Care", "Pest Control", "Pressure Washing", "HVAC", "Plumbing",
  "Handyman", "Fencing", "Roofing", "Gutters", "Pet Waste Removal", "Painting",
  "Landscaping", "Pool Service", "Window Cleaning", "Tree Service"
];

export default function TrustyProDirectory() {
  const [search, setSearch] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("All");

  const { data: partners, isLoading } = trpc.directory.getApprovedPartners.useQuery();
  const { data: spotlightPartners } = trpc.directory.getSpotlightPartners.useQuery();

  const filtered = useMemo(() => {
    if (!partners) return [];
    return partners.filter((p) => {
      const matchSearch = !search || p.businessName.toLowerCase().includes(search.toLowerCase()) || p.businessType.toLowerCase().includes(search.toLowerCase()) || p.serviceArea.toLowerCase().includes(search.toLowerCase());
      const matchTrade = selectedTrade === "All" || p.businessType.toLowerCase().includes(selectedTrade.toLowerCase());
      return matchSearch && matchTrade;
    });
  }, [partners, search, selectedTrade]);

  return (
    <HomeownerLayout>
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFF" }}>
      {/* Header */}
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
              <span className="text-gray-400 text-sm"> Pro Directory</span>
            </div>
          </div>
          <Link href="/my-home">
            <Button size="sm" className="text-white text-xs" style={{ backgroundColor: "#1B4FD8" }}>
              My Home Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: "#EFF6FF", color: "#1B4FD8" }}>
            <BadgeCheck className="w-3.5 h-3.5" /> Every pro is background-checked & insured
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Find a Trusted Pro Near You</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Browse verified home service professionals in the DFW area. All TrustyPro partners are vetted, insured, and rated by real homeowners.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, trade, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
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

        {/* Spotlight section */}
        {!search && selectedTrade === "All" && spotlightPartners && spotlightPartners.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <h2 className="text-base font-bold text-gray-900">Top Rated This Month</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {spotlightPartners.slice(0, 3).map((p: any) => (
                <Link key={p.id} href={`/partner/${p.id}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: "#1B4FD8" }}>
                        {p.businessName?.[0] ?? "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{p.businessName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{p.businessType}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-semibold text-gray-700">{Number(p.avgRating || 0).toFixed(1)}</span>
                          {p.reviewCount > 0 && <span className="text-xs text-gray-400">({p.reviewCount})</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs" style={{ color: "#1B4FD8" }}>
                      <MapPin className="w-3 h-3" /> {p.serviceArea}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All pros */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">
              {search || selectedTrade !== "All" ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : `All Verified Pros (${partners?.length ?? 0})`}
            </h2>
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
              {filtered.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: "#1B4FD8" }}>
                      {p.businessName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900">{p.businessName}</p>
                        <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Verified</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{p.businessType}</p>
                      <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{p.serviceArea}</span>
                        </div>
                        {p.referralCount > 0 && (
                          <span className="text-xs text-gray-400">{p.referralCount} referrals sent</span>
                        )}
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
                      <button
                        onClick={() => toast.success("Estimate request sent! This pro will contact you within 24 hours.")}
                        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg text-white transition-all whitespace-nowrap"
                        style={{ backgroundColor: "#1B4FD8" }}
                      >
                        <Sparkles className="w-3 h-3" /> Get Estimate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
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
