import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  MapPin, Clock, DollarSign, Users, Star, Flame, Filter,
  SortAsc, Zap, ChevronDown, X, Droplets, Wind, Bolt, Paintbrush,
  Wrench, Home, Search, TrendingUp, Image,
} from "lucide-react";
import { toast } from "sonner";

type SortKey = "newest" | "closest" | "highest_value" | "best_match";
type ServiceType = "All" | "HVAC" | "Plumbing" | "Electrical" | "Roofing" | "Painting" | "Lawn Care" | "General";

interface MarketplaceLead {
  id: number;
  serviceType: ServiceType;
  city: string;
  state: string;
  distanceMiles: number;
  jobSizeEstimate: number;
  ageMinutes: number;
  bidCount: number;
  matchScore: number;
  isHighValue: boolean;
  isUrgent: boolean;
  description: string;
  neighborhood: string;
  creditCost: number;
  isFreeForEarlyUsers: boolean;
  photos: number;
}

const TRADE_COLORS: Record<string, string> = {
  "Lawn Care": "#10B981", "HVAC": "#3B82F6", "Plumbing": "#14B8A6",
  "Pest Control": "#F59E0B", "Fence & Deck": "#6366F1", "Roofing": "#F97316",
  "Electrical": "#EAB308", "Cleaning": "#EC4899", "Pool Service": "#06B6D4", "Painting": "#8B5CF6",
  "General": "#6B7280",
};

const TRADE_BG_COLORS: Record<string, string> = {
  "Lawn Care": "#ECFDF5", "HVAC": "#EFF6FF", "Plumbing": "#F0FDFA",
  "Pest Control": "#FFFBEB", "Fence & Deck": "#EEF2FF", "Roofing": "#FFF7ED",
  "Electrical": "#FEFCE8", "Cleaning": "#FDF2F8", "Pool Service": "#ECFEFF",
  "Painting": "#F5F3FF", "General": "#F9FAFB",
};

function TradeIconSmall({ trade }: { trade: string }) {
  const color = TRADE_COLORS[trade] ?? "#6B7280";
  const bg = TRADE_BG_COLORS[trade] ?? "#F9FAFB";
  let Icon = Wrench;
  if (trade === "HVAC") Icon = Wind;
  else if (trade === "Plumbing") Icon = Droplets;
  else if (trade === "Electrical") Icon = Bolt;
  else if (trade === "Roofing") Icon = Home;
  else if (trade === "Painting") Icon = Paintbrush;
  return (
    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
      <Icon size={16} color={color} />
    </div>
  );
}

function AiScoreCircle({ score }: { score: number }) {
  const color = score >= 85 ? "#14B8A6" : score >= 65 ? "#3B82F6" : "#F59E0B";
  const circumference = 2 * Math.PI * 14;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#E5E7EB" strokeWidth="3" />
        <circle cx="16" cy="16" r="14" fill="none" strokeWidth="3" stroke={color}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

function relativeAge(minutes: number): string {
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
}

const MAP_CITIES: Array<{ name: string; x: number; y: number; leads: number }> = [
  { name: "Downtown", x: 50, y: 40, leads: 4 },
  { name: "Northside", x: 38, y: 22, leads: 2 },
  { name: "Eastbrook", x: 68, y: 35, leads: 3 },
  { name: "Westfield", x: 22, y: 48, leads: 1 },
  { name: "Lakeview", x: 55, y: 60, leads: 5 },
  { name: "Midtown", x: 45, y: 52, leads: 2 },
  { name: "Riverside", x: 72, y: 62, leads: 3 },
];

const SAMPLE_LEADS: MarketplaceLead[] = [
  {
    id: 1, serviceType: "HVAC", city: "Lakeview", state: "GA", distanceMiles: 3.2,
    jobSizeEstimate: 4800, ageMinutes: 14, bidCount: 1, matchScore: 94,
    isHighValue: true, isUrgent: true,
    description: "Central AC stopped blowing cold air overnight. Family with two kids. Unit is 12 years old — homeowner open to replacement if repair cost is high.",
    neighborhood: "Lakewood Heights area (south of Ponce)", creditCost: 0, isFreeForEarlyUsers: true, photos: 2,
  },
  {
    id: 2, serviceType: "Plumbing", city: "Eastbrook", state: "GA", distanceMiles: 5.8,
    jobSizeEstimate: 1200, ageMinutes: 47, bidCount: 3, matchScore: 81,
    isHighValue: false, isUrgent: false,
    description: "Master bathroom faucet leaking under the sink. Has been dripping for a week. Looking for licensed plumber to assess and fix.",
    neighborhood: "Near Eastbrook Commons shopping center", creditCost: 1, isFreeForEarlyUsers: true, photos: 1,
  },
  {
    id: 3, serviceType: "Roofing", city: "Downtown", state: "GA", distanceMiles: 1.9,
    jobSizeEstimate: 7500, ageMinutes: 92, bidCount: 0, matchScore: 77,
    isHighValue: true, isUrgent: false,
    description: "Storm damage from last Tuesday — 3 shingles blown off, possible flashing issue near chimney. Need an estimate ASAP for insurance claim.",
    neighborhood: "Historic Fourth Ward", creditCost: 2, isFreeForEarlyUsers: false, photos: 4,
  },
  {
    id: 4, serviceType: "Electrical", city: "Northside", state: "GA", distanceMiles: 8.1,
    jobSizeEstimate: 650, ageMinutes: 210, bidCount: 2, matchScore: 68,
    isHighValue: false, isUrgent: false,
    description: "Two outlets in the kitchen stopped working. Breaker doesn't seem tripped. Would like someone to come diagnose this week.",
    neighborhood: "Buckhead area, near Chastain Park", creditCost: 1, isFreeForEarlyUsers: true, photos: 0,
  },
  {
    id: 5, serviceType: "Painting", city: "Riverside", state: "GA", distanceMiles: 11.4,
    jobSizeEstimate: 3200, ageMinutes: 380, bidCount: 4, matchScore: 72,
    isHighValue: true, isUrgent: false,
    description: "Exterior repaint for 2,100 sq ft ranch-style home. Current paint is peeling in several spots. Need full prep, prime, and two coats.",
    neighborhood: "Riverside Drive corridor", creditCost: 2, isFreeForEarlyUsers: false, photos: 3,
  },
  {
    id: 6, serviceType: "HVAC", city: "Westfield", state: "GA", distanceMiles: 14.3,
    jobSizeEstimate: 9200, ageMinutes: 30, bidCount: 0, matchScore: 88,
    isHighValue: true, isUrgent: true,
    description: "Full HVAC system replacement needed. Current system is 20+ years old and failed inspection. Homeowner wants quotes on Carrier or Trane 16 SEER.",
    neighborhood: "Westfield Farms subdivision", creditCost: 0, isFreeForEarlyUsers: true, photos: 1,
  },
];

const SERVICE_TYPES: ServiceType[] = ["All", "HVAC", "Plumbing", "Electrical", "Roofing", "Painting", "Lawn Care", "General"];

export default function LeadMarketplace() {
  const [sortKey, setSortKey] = useState<SortKey>("best_match");
  const [serviceFilter, setServiceFilter] = useState<ServiceType>("All");
  const [maxDistance, setMaxDistance] = useState<number>(25);
  const [minJobValue, setMinJobValue] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLead, setSelectedLead] = useState<MarketplaceLead | null>(null);
  const [claimedIds, setClaimedIds] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    let list = SAMPLE_LEADS.filter((l) => {
      if (serviceFilter !== "All" && l.serviceType !== serviceFilter) return false;
      if (l.distanceMiles > maxDistance) return false;
      if (l.jobSizeEstimate < minJobValue) return false;
      return true;
    });
    if (sortKey === "newest") list = [...list].sort((a, b) => a.ageMinutes - b.ageMinutes);
    else if (sortKey === "closest") list = [...list].sort((a, b) => a.distanceMiles - b.distanceMiles);
    else if (sortKey === "highest_value") list = [...list].sort((a, b) => b.jobSizeEstimate - a.jobSizeEstimate);
    else list = [...list].sort((a, b) => b.matchScore - a.matchScore);
    return list;
  }, [sortKey, serviceFilter, maxDistance, minJobValue]);

  function handleClaim(lead: MarketplaceLead) {
    if (claimedIds.has(lead.id)) return;
    setClaimedIds((prev) => new Set(prev).add(lead.id));
    setSelectedLead(null);
    toast.success(
      lead.isFreeForEarlyUsers
        ? "Lead claimed — homeowner contact info unlocked!"
        : `Lead claimed — ${lead.creditCost} credit${lead.creditCost !== 1 ? "s" : ""} used`,
    );
  }

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#0A1628]" />Lead Marketplace
            </h1>
            <p className="text-sm text-gray-500 mt-1">Browse and claim available leads in your service area</p>
          </div>
          <Badge className="bg-teal-100 text-teal-700 border-teal-200 text-sm px-3 py-1">
            {filtered.length} available
          </Badge>
        </div>

        {/* Map placeholder */}
        <Card className="overflow-hidden border border-gray-200">
          <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 h-44">
            <div className="absolute inset-0 p-4">
              {MAP_CITIES.map((city) => (
                <div
                  key={city.name}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%,-50%)" }}
                >
                  <div className={`rounded-full border-2 border-white shadow flex items-center justify-center font-bold text-xs text-white ${city.leads >= 4 ? "w-8 h-8 bg-teal-600" : city.leads >= 2 ? "w-7 h-7 bg-blue-500" : "w-6 h-6 bg-gray-400"}`}>
                    {city.leads}
                  </div>
                  <span className="mt-0.5 text-[10px] font-semibold text-gray-600 bg-white/80 rounded px-1 leading-tight whitespace-nowrap">
                    {city.name}
                  </span>
                </div>
              ))}
              <div className="absolute bottom-3 left-3 text-xs text-gray-500 bg-white/80 rounded px-2 py-1">
                <MapPin className="w-3 h-3 inline mr-1 text-teal-500" />Your location (center)
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-3 text-[10px] text-gray-500 bg-white/80 rounded px-2 py-1">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />4+ leads</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />2–3 leads</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-400 inline-block" />1 lead</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Sort + Filter bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {(["best_match", "newest", "closest", "highest_value"] as SortKey[]).map((k) => {
              const labels: Record<SortKey, string> = {
                best_match: "Best Match", newest: "Newest",
                closest: "Closest", highest_value: "Highest Value",
              };
              return (
                <button
                  key={k}
                  onClick={() => setSortKey(k)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${sortKey === k ? "bg-white shadow text-[#0A1628]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {labels[k]}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-colors ${showFilters ? "bg-[#0A1628] text-white border-[#0A1628]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"}`}
          >
            <Filter className="w-3.5 h-3.5" />Filters
            {(serviceFilter !== "All" || maxDistance < 25 || minJobValue > 0) && (
              <span className="w-4 h-4 rounded-full bg-teal-500 text-white text-[10px] flex items-center justify-center">
                {[serviceFilter !== "All", maxDistance < 25, minJobValue > 0].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <Card className="border border-gray-200">
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Service Type</p>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICE_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setServiceFilter(t)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${serviceFilter === t ? "bg-[#0A1628] text-white border-[#0A1628]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Max Distance: <span className="text-teal-600">{maxDistance} mi</span>
                  </p>
                  <input
                    type="range" min={5} max={50} step={5} value={maxDistance}
                    onChange={(e) => setMaxDistance(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                    Min Job Value: <span className="text-teal-600">${minJobValue.toLocaleString()}</span>
                  </p>
                  <input
                    type="range" min={0} max={5000} step={500} value={minJobValue}
                    onChange={(e) => setMinJobValue(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
              </div>
              {(serviceFilter !== "All" || maxDistance < 25 || minJobValue > 0) && (
                <button
                  onClick={() => { setServiceFilter("All"); setMaxDistance(25); setMinJobValue(0); }}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />Clear all filters
                </button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Lead cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-gray-600">No leads match your filters</p>
            <p className="text-sm mt-1">Try widening your distance or service type</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => {
              const tradeColor = TRADE_COLORS[lead.serviceType] ?? "#6B7280";
              const isClaimed = claimedIds.has(lead.id);
              return (
                <Card
                  key={lead.id}
                  className={`border-2 transition-all cursor-pointer hover:shadow-md ${isClaimed ? "opacity-60 border-gray-100" : lead.isUrgent ? "border-amber-200 hover:border-amber-300" : "border-gray-200 hover:border-teal-300"}`}
                  onClick={() => !isClaimed && setSelectedLead(lead)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AiScoreCircle score={lead.matchScore} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: tradeColor }}>
                            {lead.serviceType}
                          </span>
                          {lead.isHighValue && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />High Value
                            </span>
                          )}
                          {lead.isUrgent && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                              <Flame className="w-3 h-3" />Urgent
                            </span>
                          )}
                          {isClaimed && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Claimed</Badge>
                          )}
                        </div>
                        <p className="font-bold text-gray-900 text-sm leading-snug truncate">
                          {lead.serviceType} job — {lead.city}, {lead.state}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />{lead.distanceMiles} mi away
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{relativeAge(lead.ageMinutes)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />{lead.bidCount} bid{lead.bidCount !== 1 ? "s" : ""}
                          </span>
                          {lead.photos > 0 && (
                            <span className="flex items-center gap-1">
                              <Image className="w-3 h-3" />{lead.photos} photo{lead.photos !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-1">
                        <div className="text-xl font-heading font-bold text-gray-900 leading-none">
                          ${lead.jobSizeEstimate.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">est. value</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${lead.isFreeForEarlyUsers ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {lead.isFreeForEarlyUsers ? "Free — early access" : `${lead.creditCost} credit${lead.creditCost !== 1 ? "s" : ""}`}
                      </span>
                      {!isClaimed && (
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-4"
                          onClick={(e) => { e.stopPropagation(); handleClaim(lead); }}
                        >
                          <Zap className="w-3 h-3 mr-1.5" />Claim This Lead
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Lead detail modal */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => { if (!open) setSelectedLead(null); }}>
        <DialogContent className="max-w-md">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <TradeIconSmall trade={selectedLead.serviceType} />
                  <span>{selectedLead.serviceType} — {selectedLead.city}, {selectedLead.state}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <AiScoreCircle score={selectedLead.matchScore} />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">AI Match Score</p>
                    <p className="text-sm font-bold text-gray-800">
                      {selectedLead.matchScore >= 85 ? "Excellent fit" : selectedLead.matchScore >= 65 ? "Good fit" : "Fair fit"}
                    </p>
                  </div>
                  {selectedLead.isHighValue && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />High Value
                    </span>
                  )}
                  {selectedLead.isUrgent && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                      <Flame className="w-3 h-3" />Urgent
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-gray-500">Est. Value</p>
                    <p className="font-bold text-gray-900">${selectedLead.jobSizeEstimate.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-gray-500">Distance</p>
                    <p className="font-bold text-gray-900">{selectedLead.distanceMiles} mi</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                    <p className="text-xs text-gray-500">Bids</p>
                    <p className="font-bold text-gray-900">{selectedLead.bidCount}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Job Description</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedLead.description}</p>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-0.5">Neighborhood</p>
                    <p className="text-sm text-gray-700">{selectedLead.neighborhood}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Full address unlocked after claiming
                    </p>
                  </div>
                </div>

                {selectedLead.photos > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5" />{selectedLead.photos} photo{selectedLead.photos !== 1 ? "s" : ""} attached
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">Photos visible after claiming</p>
                  </div>
                )}

                <div className={`rounded-lg p-3 border ${selectedLead.isFreeForEarlyUsers ? "bg-green-50 border-green-100" : "bg-gray-50 border-gray-200"}`}>
                  <p className={`text-sm font-bold ${selectedLead.isFreeForEarlyUsers ? "text-green-700" : "text-gray-700"}`}>
                    {selectedLead.isFreeForEarlyUsers
                      ? "Free to claim — early access benefit"
                      : `Costs ${selectedLead.creditCost} credit${selectedLead.creditCost !== 1 ? "s" : ""}`}
                  </p>
                  <p className={`text-xs mt-0.5 ${selectedLead.isFreeForEarlyUsers ? "text-green-600" : "text-gray-500"}`}>
                    Contact info + full address unlocked immediately
                  </p>
                </div>

                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                  onClick={() => handleClaim(selectedLead)}
                >
                  <Zap className="w-4 h-4 mr-2" />Claim This Lead
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PartnerLayout>
  );
}
