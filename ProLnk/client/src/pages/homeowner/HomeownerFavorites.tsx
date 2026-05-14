import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Heart, Star, MapPin, MessageSquare, Calendar, X,
  Search, Shield, Clock, ChevronRight, SlidersHorizontal,
  Wrench, Zap, Droplets, Home, Check
} from "lucide-react";
import { Link } from "wouter";

const TRADE_ICONS: Record<string, JSX.Element> = {
  HVAC: <Zap className="w-4 h-4 text-amber-400" />,
  Plumbing: <Droplets className="w-4 h-4 text-blue-400" />,
  Roofing: <Home className="w-4 h-4 text-orange-400" />,
  Electrical: <Zap className="w-4 h-4 text-yellow-400" />,
  General: <Wrench className="w-4 h-4 text-cyan-400" />,
};

const TRADE_CHIP_COLORS: Record<string, string> = {
  HVAC: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  Plumbing: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Roofing: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Electrical: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
};

const MOCK_PROS = [
  { id: 1, name: "Marcus Rivera", trade: "HVAC", rating: 4.9, reviews: 84, distance: "2.1 miles", responseTime: "Usually responds in <1 hour", lastUsed: "Jan 15, 2026", hasActiveDeal: true, dealText: "15% off this week", verified: true, initials: "MR" },
  { id: 2, name: "Blue Ridge Plumbing", trade: "Plumbing", rating: 4.7, reviews: 132, distance: "4.2 miles", responseTime: "Usually responds in <2 hours", lastUsed: "Mar 3, 2026", hasActiveDeal: false, dealText: "", verified: true, initials: "BR" },
  { id: 3, name: "SkyHigh Roofing Co.", trade: "Roofing", rating: 4.8, reviews: 57, distance: "6.8 miles", responseTime: "Usually responds in <4 hours", lastUsed: null, hasActiveDeal: true, dealText: "Free inspection + 10% off", verified: true, initials: "SH" },
  { id: 4, name: "Coolbreeze HVAC", trade: "HVAC", rating: 4.6, reviews: 201, distance: "3.4 miles", responseTime: "Usually responds in <2 hours", lastUsed: "Apr 28, 2026", hasActiveDeal: false, dealText: "", verified: true, initials: "CB" },
  { id: 5, name: "QuickFix Electric", trade: "Electrical", rating: 4.5, reviews: 43, distance: "5.1 miles", responseTime: "Usually responds in <3 hours", lastUsed: "Feb 10, 2026", hasActiveDeal: false, dealText: "", verified: false, initials: "QF" },
  { id: 6, name: "TrueFlow Plumbing", trade: "Plumbing", rating: 4.9, reviews: 96, distance: "7.3 miles", responseTime: "Usually responds in <1 hour", lastUsed: null, hasActiveDeal: false, dealText: "", verified: true, initials: "TF" },
  { id: 7, name: "Apex Roofing & Gutters", trade: "Roofing", rating: 4.7, reviews: 78, distance: "9.0 miles", responseTime: "Usually responds in <6 hours", lastUsed: "Dec 5, 2025", hasActiveDeal: false, dealText: "", verified: true, initials: "AR" },
  { id: 8, name: "ProTemp HVAC", trade: "HVAC", rating: 4.4, reviews: 29, distance: "11.2 miles", responseTime: "Usually responds in <4 hours", lastUsed: null, hasActiveDeal: false, dealText: "", verified: false, initials: "PT" },
];

const RECENTLY_HIRED = [
  { name: "Marcus Rivera", trade: "HVAC", job: "AC tune-up + filter replacement", amount: "$189", date: "Jan 15, 2026" },
  { name: "Blue Ridge Plumbing", trade: "Plumbing", job: "Water heater flush + inspection", amount: "$145", date: "Mar 3, 2026" },
  { name: "Coolbreeze HVAC", trade: "HVAC", job: "Emergency compressor repair", amount: "$520", date: "Apr 28, 2026" },
];

const SORT_OPTIONS = ["Rating", "Recently Added", "Most Used"] as const;
type SortOption = typeof SORT_OPTIONS[number];

export default function HomeownerFavorites() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("Rating");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [removed, setRemoved] = useState<number[]>([]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
        <Card className="max-w-md w-full bg-white/5 border-white/10">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h2 className="text-white text-xl font-bold mb-2">Sign In to View Saved Pros</h2>
            <p className="text-white/60 text-sm mb-6">Save your favorite contractors for quick access and future bookings.</p>
            <a href={getLoginUrl()}>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Sign In</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allTrades = ["All", "HVAC", "Plumbing", "Roofing", "Electrical"];
  const activePros = MOCK_PROS.filter(p => !removed.includes(p.id));
  const withDeals = activePros.filter(p => p.hasActiveDeal).length;

  let displayed = activePros.filter(p =>
    (activeFilter === "All" || p.trade === activeFilter) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.trade.toLowerCase().includes(search.toLowerCase()))
  );

  if (sort === "Rating") displayed = [...displayed].sort((a, b) => b.rating - a.rating);
  else if (sort === "Recently Added") displayed = [...displayed].sort((a, b) => b.id - a.id);
  else if (sort === "Most Used") displayed = [...displayed].sort((a, b) => (b.lastUsed ? 1 : 0) - (a.lastUsed ? 1 : 0));

  const handleRemove = (id: number) => {
    setRemoved(prev => [...prev, id]);
    toast.success("Removed from saved pros");
  };

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] pb-20">
        {/* Header */}
        <div className="px-4 pt-10 pb-8" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0d2240 60%, #0A1628 100%)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-rose-400" />
              <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">Saved Pros</span>
            </div>
            <h1 className="text-white text-3xl font-bold mb-1">My Favorite Contractors</h1>
            <p className="text-white/50 text-sm mb-6">Pros you trust — saved for quick bookings and deal alerts.</p>

            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white">{activePros.length}</div>
                <div className="text-white/50 text-xs mt-0.5">Saved Pros</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-white/50 text-xs mt-0.5">Categories</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-amber-400">{withDeals}</div>
                <div className="text-white/50 text-xs mt-0.5">Active Deals</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or trade..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          {/* Sort + Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white/40 text-xs flex items-center gap-1"><SlidersHorizontal className="w-3.5 h-3.5" /> Filter:</span>
              {allTrades.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveFilter(t)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    activeFilter === t
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : t !== "All" && TRADE_CHIP_COLORS[t]
                        ? `${TRADE_CHIP_COLORS[t]} border`
                        : "bg-white/5 text-white/50 border-white/10 hover:border-white/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">Sort:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none"
              >
                {SORT_OPTIONS.map(o => <option key={o} value={o} className="bg-[#0d2240]">{o}</option>)}
              </select>
            </div>
          </div>

          {/* Pro Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {displayed.map(pro => (
              <Card key={pro.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all overflow-hidden relative">
                {/* Active deal banner */}
                {pro.hasActiveDeal && (
                  <div className="bg-amber-500/20 border-b border-amber-500/30 px-4 py-1.5 flex items-center gap-2">
                    <span className="text-amber-300 text-xs font-semibold">Deal: {pro.dealText}</span>
                  </div>
                )}
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-11 h-11 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-300 text-sm font-bold">{pro.initials}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-white font-semibold text-sm truncate">{pro.name}</h3>
                        {pro.verified && (
                          <Shield className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" title="Verified Pro" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${TRADE_CHIP_COLORS[pro.trade] ?? "bg-white/10 text-white/50 border-white/10"}`}>
                          {pro.trade}
                        </span>
                        <span className="flex items-center gap-0.5 text-xs text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.round(pro.rating) ? "fill-amber-400" : "fill-white/10 text-white/10"}`} />
                          ))}
                          <span className="ml-1 text-white/50">{pro.rating} ({pro.reviews})</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-white/40">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{pro.responseTime}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{pro.distance}</span>
                      </div>
                      <div className="mt-1.5 text-xs text-white/30">
                        {pro.lastUsed ? `Last used ${pro.lastUsed}` : "Never used"}
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(pro.id)}
                      className="p-1.5 rounded-lg text-white/20 hover:text-rose-400 hover:bg-rose-500/10 transition-all flex-shrink-0"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    <Link href={`/my-home/request-a-pro?partnerId=${pro.id}`} className="flex-1">
                      <button className="w-full py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-xs font-semibold transition-colors">
                        Book Now
                      </button>
                    </Link>
                    <button
                      onClick={() => toast.info(`Messaging ${pro.name}...`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium transition-colors border border-white/10"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Message
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayed.length === 0 && (
            <div className="text-center py-16">
              <Heart className="w-12 h-12 text-white/10 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No saved pros match your filters.</p>
            </div>
          )}

          {/* Recently Hired */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" /> Recently Hired
            </h2>
            <div className="space-y-3">
              {RECENTLY_HIRED.map((h, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{h.name}</p>
                    <p className="text-white/40 text-xs truncate">{h.job}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-semibold">{h.amount}</p>
                    <p className="text-white/30 text-xs">{h.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Find More Pros CTA */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center">
            <h3 className="text-white font-semibold text-base mb-1">Looking for someone new?</h3>
            <p className="text-white/50 text-sm mb-4">Browse verified pros in your area and add them to your favorites.</p>
            <Link href="/trustypro/book">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6">
                Find More Pros <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
