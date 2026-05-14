import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Heart, Star, MapPin, Phone, Mail, Globe, Trash2,
  Search, Building2, ChevronRight, Shield, Zap
} from "lucide-react";
import { Link } from "wouter";

const TIER_COLORS: Record<string, string> = {
  Scout: "bg-slate-100 text-slate-700",
  Pro: "bg-blue-100 text-blue-700",
  Crew: "bg-indigo-100 text-indigo-700",
  Company: "bg-amber-100 text-amber-700",
  Enterprise: "bg-slate-800 text-white",
};

export default function HomeownerFavorites() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");

  const { data: favorites, isLoading, refetch } = trpc.homeownerExtras.getFavorites.useQuery(undefined, {
    enabled: !!user,
  });

  const removeFavorite = trpc.homeownerExtras.removeFavorite.useMutation({
    onSuccess: () => {
      toast.success("Removed from saved pros");
      refetch();
    },
    onError: (err) => toast.error(err.message || "Could not remove"),
  });

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

  const filtered = (favorites ?? []).filter(f =>
    !search ||
    (f.businessName ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (f.businessType ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (f.serviceArea ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A1628] pb-16">
      {/* Header */}
      <div
        className="relative overflow-hidden px-4 pt-10 pb-8"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #0d2240 50%, #0A1628 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-rose-400" />
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">Saved Pros</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-1">My Favorite Contractors</h1>
          <p className="text-white/50 text-sm">Pros you've saved for quick access and future bookings.</p>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, trade, or area..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">
              {search ? "No saved pros match your search" : "No saved pros yet"}
            </h3>
            <p className="text-white/40 text-sm mb-6">
              {search
                ? "Try a different search term."
                : "When you find a contractor you love, save them here for easy access."}
            </p>
            <Link href="/my-home/find-a-pro">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Find a Pro
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-white/40 text-sm">{filtered.length} saved pro{filtered.length !== 1 ? "s" : ""}</p>
            {filtered.map(fav => (
              <Card key={fav.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-cyan-400" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-white font-semibold text-base truncate">
                          {fav.businessName ?? "Unknown Business"}
                        </h3>
                        {fav.tier && (
                          <Badge className={`text-xs px-2 py-0.5 ${TIER_COLORS[fav.tier] ?? "bg-slate-100 text-slate-700"}`}>
                            {fav.tier}
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/50 text-sm">{fav.businessType ?? "Home Services"}</p>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 mt-2">
                        {fav.serviceArea && (
                          <span className="flex items-center gap-1 text-white/40 text-xs">
                            <MapPin className="w-3 h-3" /> {fav.serviceArea}
                          </span>
                        )}
                        {fav.rating && Number(fav.rating) > 0 && (
                          <span className="flex items-center gap-1 text-amber-400 text-xs">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {Number(fav.rating).toFixed(1)}
                            {fav.reviewCount ? ` (${fav.reviewCount})` : ""}
                          </span>
                        )}
                      </div>

                      {/* Notes */}
                      {fav.notes && (
                        <p className="mt-2 text-white/40 text-xs italic">"{fav.notes}"</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => removeFavorite.mutate({ partnerId: fav.partnerId! })}
                        disabled={removeFavorite.isPending}
                        className="p-2 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-3">
                    {fav.contactPhone && (
                      <a
                        href={`tel:${fav.contactPhone}`}
                        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> {fav.contactPhone}
                      </a>
                    )}
                    {fav.contactEmail && (
                      <a
                        href={`mailto:${fav.contactEmail}`}
                        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" /> {fav.contactEmail}
                      </a>
                    )}
                    {fav.website && (
                      <a
                        href={fav.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" /> Website
                      </a>
                    )}
                    <Link
                      href={`/my-home/request-a-pro?partnerId=${fav.partnerId}`}
                      className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-white bg-cyan-500/20 hover:bg-cyan-500/30 px-3 py-1.5 rounded-lg transition-all"
                    >
                      Book Again <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
