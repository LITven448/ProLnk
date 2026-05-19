import { Card, CardContent } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tag,
  Star,
  Loader2,
  Users,
  Clock,
  MapPin,
  Share2,
  CheckCircle,
  Filter,
  Zap,
  Flame,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useState, useEffect } from "react";

const TRADE_FILTERS = [
  "All",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Cleaning",
  "Pest Control",
  "Painting",
];

const MOCK_DEALS = [
  {
    id: "featured",
    title: "Spring HVAC Tune-Up",
    trade: "HVAC",
    partnerName: "CoolBreeze Systems",
    averageRating: 4.9,
    offerText: "20% off spring HVAC tune-up + free filter replacement",
    dealPrice: 79,
    originalPrice: 99,
    discountPercent: 20,
    expiresAt: new Date(Date.now() + 3 * 3600000 + 24 * 60000).toISOString(),
    availabilityCount: 3,
    isFeatured: true,
    neighborhood: "Southlake / ZIP 76092″,
  },
  {
    id: "2″,
    title: "Full Home Electrical Inspection",
    trade: "Electrical",
    partnerName: "Bright Spark Electric",
    averageRating: 4.8,
    offerText: "Free safety inspection + 15% off panel upgrades",
    dealPrice: 0,
    originalPrice: 150,
    discountPercent: 100,
    expiresAt: new Date(Date.now() + 2 * 86400000).toISOString(),
    availabilityCount: 7,
    isFeatured: false,
    neighborhood: "Southlake / ZIP 76092″,
  },
  {
    id: "3″,
    title: "Deep Clean Package",
    trade: "Cleaning",
    partnerName: "SparkleHome Pros",
    averageRating: 4.7,
    offerText: "3-bedroom deep clean for $149 (reg $210)",
    dealPrice: 149,
    originalPrice: 210,
    discountPercent: 29,
    expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
    availabilityCount: 12,
    isFeatured: false,
    neighborhood: "Southlake / ZIP 76092″,
  },
  {
    id: "4″,
    title: "Roof Inspection & Moss Treatment",
    trade: "Roofing",
    partnerName: "DFW Roofing Co.",
    averageRating: 4.6,
    offerText: "Free 20-point roof inspection + 25% off any repairs",
    dealPrice: 0,
    originalPrice: 200,
    discountPercent: 100,
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    availabilityCount: 5,
    isFeatured: false,
    neighborhood: "Grapevine / ZIP 76051″,
  },
];

function useCountdown(expiresAt: string) {
  const [remaining, setRemaining] = useState(() => Math.max(0, new Date(expiresAt).getTime() - Date.now()));

  useEffect(() => {
    const tick = setInterval(() => {
      const left = Math.max(0, new Date(expiresAt).getTime() - Date.now());
      setRemaining(left);
    }, 1000);
    return () => clearInterval(tick);
  }, [expiresAt]);

  if (remaining <= 0) return "Expired";
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  if (h > 24) {
    const d = Math.floor(h / 24);
    return `${d}d ${h % 24}h left`;
  }
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

function timeLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d left`;
  const hours = Math.floor(diff / 3600000);
  return `${hours}h left`;
}

function FeaturedCountdown({ expiresAt }: { expiresAt: string }) {
  const label = useCountdown(expiresAt);
  return <span>{label}</span>;
}

function DealCard({ deal, onClaim }: { deal: typeof MOCK_DEALS[0]; onClaim: (id: string) => void }) {
  const [claimed, setClaimed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  function handleClaim() {
    if (confirming) {
      setClaimed(true);
      setConfirming(false);
      onClaim(deal.id);
    } else {
      setConfirming(true);
    }
  }

  return (
    <Card className="bg-[#0F1E35] border-white/10 hover:border-teal-400/40 transition-all">
      <CardContent className="pt-4 pb-4″>
        <div className="flex items-start gap-3″>
          <div className="flex-1 min-w-0″>
            <div className="flex flex-wrap items-center gap-2 mb-1″>
              <span className="font-semibold text-white text-sm">{deal.title}</span>
              <Badge className="bg-teal-400/15 text-teal-300 border-0 text-xs">{deal.trade}</Badge>
              {deal.discountPercent >= 100 ? (
                <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-xs">FREE</Badge>
              ) : (
                <Badge className="bg-orange-500/20 text-orange-300 border-0 text-xs">{deal.discountPercent}% off</Badge>
              )}
            </div>

            <p className="text-xs text-gray-400 mb-1″>
              {deal.partnerName}
              {deal.averageRating && (
                <span className="ml-2 inline-flex items-center gap-0.5″>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400″ />
                  <span className="text-yellow-300″>{deal.averageRating}</span>
                </span>
              )}
            </p>

            <p className="text-sm text-gray-300 mb-2″>{deal.offerText}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500″>
              <span className="flex items-center gap-1″>
                <MapPin className="h-3 w-3 text-teal-400″ />
                <span className="text-teal-400″>Exclusive to {deal.neighborhood}</span>
              </span>
              <span className="flex items-center gap-1″>
                <Users className="h-3 w-3″ />
                {deal.availabilityCount} spots left
              </span>
              <span className="flex items-center gap-1 text-orange-400″>
                <Clock className="h-3 w-3″ />
                {timeLeft(deal.expiresAt)}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2″>
            {deal.dealPrice > 0 ? (
              <div className="text-right">
                <p className="text-lg font-bold text-teal-400″>${deal.dealPrice}</p>
                {deal.originalPrice > 0 && (
                  <p className="text-xs text-gray-500 line-through">${deal.originalPrice}</p>
                )}
              </div>
            ) : (
              <p className="text-sm font-bold text-emerald-400″>Free</p>
            )}

            {claimed ? (
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                <CheckCircle className="h-4 w-4″ /> Claimed!
              </div>
            ) : confirming ? (
              <div className="flex flex-col gap-1″>
                <p className="text-xs text-gray-400 text-center">Confirm?</p>
                <div className="flex gap-1″>
                  <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-black text-xs h-7 px-2″ onClick={handleClaim}>
                    Yes
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs h-7 px-2 border-white/20 text-gray-300″ onClick={() => setConfirming(false)}>
                    No
                  </Button>
                </div>
              </div>
            ) : (
              <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-black text-xs" onClick={handleClaim}>
                Claim Deal
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="text-xs text-gray-500 hover:text-teal-400 h-6 px-1 gap-1″
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              <Share2 className="h-3 w-3″ /> Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NeighborhoodDeals() {
  const { data: apiDeals, isLoading } = trpc.homeownerExtras.getNeighborhoodDeals.useQuery(undefined, {
    retry: false,
    onError: () => {},
  } as any);

  const [activeFilter, setActiveFilter] = useState("All");
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const deals: typeof MOCK_DEALS = (apiDeals as any) ?? MOCK_DEALS;
  const featuredDeal = deals.find((d: any) => d.isFeatured) ?? deals[0];
  const otherDeals = deals.filter((d: any) => d.id !== featuredDeal?.id);

  const filteredOther = activeFilter === "All"
    ? otherDeals
    : otherDeals.filter((d: any) => d.trade === activeFilter);

  function handleClaim(id: string) {
    setClaimedIds(prev => [...prev, id]);
  }

  return (
    <HomeownerLayout>
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="max-w-2xl mx-auto space-y-5 p-4 pb-10″>

          <div>
            <h1 className="text-2xl font-bold text-white">Neighborhood Deals</h1>
            <p className="text-gray-400 mt-1 text-sm">Exclusive offers from verified pros within 5 miles of your home.</p>
          </div>

          <Card className="border-teal-400/30 bg-teal-900/20″>
            <CardContent className="pt-4 pb-4″>
              <div className="flex items-start gap-3″>
                <MapPin className="h-5 w-5 text-teal-400 mt-0.5 shrink-0″ />
                <div>
                  <p className="font-semibold text-sm text-teal-300″>Pros within 5 miles of your ZIP</p>
                  <p className="text-xs text-gray-400 mt-0.5″>
                    These deals are exclusive to homeowners in your neighborhood. Pros set limited availability — once spots fill, the deal closes.
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500″>
                    <span className="flex items-center gap-1″>
                      <span className="h-2 w-2 rounded-full bg-teal-400 inline-block" /> Southlake / ZIP 76092
                    </span>
                    <span className="flex items-center gap-1″>
                      <span className="h-2 w-2 rounded-full bg-blue-400 inline-block" /> Grapevine / ZIP 76051
                    </span>
                    <span className="flex items-center gap-1″>
                      <Users className="h-3 w-3″ /> 14 active pros nearby
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoading && (
            <div className="flex items-center justify-center h-40″>
              <Loader2 className="h-8 w-8 animate-spin text-teal-400″ />
            </div>
          )}

          {!isLoading && featuredDeal && (
            <div>
              <div className="flex items-center gap-2 mb-2″>
                <Flame className="h-4 w-4 text-orange-400″ />
                <span className="text-sm font-semibold text-orange-400″>Featured Deal — Ends Soon</span>
              </div>
              <Card className="bg-gradient-to-br from-teal-900/40 to-[#0F1E35] border-teal-400/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  FEATURED
                </div>
                <CardContent className="pt-5 pb-4″>
                  <div className="flex flex-wrap items-center gap-2 mb-1″>
                    <span className="font-bold text-white text-base">{featuredDeal.title}</span>
                    <Badge className="bg-teal-400/20 text-teal-300 border-0 text-xs">{featuredDeal.trade}</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-1″>
                    {featuredDeal.partnerName}
                    {featuredDeal.averageRating && (
                      <span className="ml-2 inline-flex items-center gap-0.5″>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400″ />
                        <span className="text-yellow-300″>{featuredDeal.averageRating}</span>
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-200 mb-3″>{featuredDeal.offerText}</p>

                  <div className="flex items-center gap-2 mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-400/20″>
                    <Clock className="h-4 w-4 text-orange-400 shrink-0″ />
                    <span className="text-sm text-orange-300 font-mono font-semibold">
                      <FeaturedCountdown expiresAt={featuredDeal.expiresAt} />
                    </span>
                    <span className="text-xs text-orange-400 ml-1″>— {featuredDeal.availabilityCount} spots remain</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3″>
                    <MapPin className="h-3 w-3 text-teal-400″ />
                    <span className="text-xs text-teal-400″>Exclusive to {featuredDeal.neighborhood}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {featuredDeal.dealPrice > 0 ? (
                        <div>
                          <span className="text-2xl font-bold text-teal-400″>${featuredDeal.dealPrice}</span>
                          {featuredDeal.originalPrice > 0 && (
                            <span className="text-sm text-gray-500 line-through ml-2″>${featuredDeal.originalPrice}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-emerald-400″>Free</span>
                      )}
                    </div>
                    <div className="flex gap-2″>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-gray-300 hover:text-teal-400 gap-1″
                        onClick={() => navigator.clipboard?.writeText(window.location.href)}
                      >
                        <Share2 className="h-3 w-3″ /> Share with neighbor
                      </Button>
                      {claimedIds.includes(featuredDeal.id) ? (
                        <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium px-3″>
                          <CheckCircle className="h-4 w-4″ /> Claimed
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-teal-500 hover:bg-teal-400 text-black font-semibold gap-1″
                          onClick={() => handleClaim(featuredDeal.id)}
                        >
                          <Zap className="h-3 w-3″ /> Claim Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!isLoading && (
            <div>
              <div className="flex items-center gap-2 mb-3″>
                <Filter className="h-4 w-4 text-gray-400″ />
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {TRADE_FILTERS.map(f => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        activeFilter === f
                          ? "bg-teal-500 text-black"
                          : "bg-white/5 text-gray-400 hover:bg-white/10″
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {filteredOther.length === 0 ? (
                <Card className="bg-[#0F1E35] border-white/10″>
                  <CardContent className="py-10 text-center">
                    <Tag className="h-8 w-8 mx-auto text-gray-600 mb-3″ />
                    <p className="text-gray-400 text-sm">No deals in this category right now.</p>
                    <Link href="/my-home/quick-quote">
                      <Button className="mt-4 bg-teal-500 hover:bg-teal-400 text-black text-sm">Request a Service</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3″>
                  {filteredOther.map((deal: any) => (
                    <DealCard key={deal.id} deal={deal} onClaim={handleClaim} />
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </HomeownerLayout>
  );
}
