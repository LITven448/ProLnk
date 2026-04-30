/**
 * Wave 16 -- Territory Marketplace
 * Admin view of all DFW territories: status, revenue projections, and purchase flow.
 * Territories are grouped by 2-3 zip codes per the franchise territory strategy.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, DollarSign, TrendingUp, Users, CheckCircle2, Lock, Search, Star, Building2, Zap } from "lucide-react";
import { toast } from "sonner";

// --- Territory Data -----------------------------------------------------------
// Based on DFW high-income zip codes, 2-3 zips per territory
// Revenue projections based on avg home value  service penetration rate
const TERRITORIES = [
  // Tier 1 -- Premium ($1M+ projected annual revenue)
  {
    id: "T01",
    name: "Frisco North",
    zips: ["75034", "75035", "75071"],
    city: "Frisco / Prosper",
    tier: "premium",
    status: "owned",
    owner: "ProLnk (Founding)",
    annualRevProj: 1_420_000,
    fiveYearProj: 7_100_000,
    initFee: 923_000,
    homeCount: 28_400,
    avgHomeValue: 620_000,
    partners: 8,
    color: "#D4AF37",
  },
  {
    id: "T02",
    name: "McKinney / Allen",
    zips: ["75070", "75013", "75002"],
    city: "McKinney / Allen",
    tier: "premium",
    status: "owned",
    owner: "ProLnk (Founding)",
    annualRevProj: 1_280_000,
    fiveYearProj: 6_400_000,
    initFee: 832_000,
    homeCount: 25_600,
    avgHomeValue: 580_000,
    partners: 6,
    color: "#D4AF37",
  },
  {
    id: "T03",
    name: "Southlake / Keller",
    zips: ["76092", "76248", "76244"],
    city: "Southlake / Keller",
    tier: "premium",
    status: "available",
    owner: null,
    annualRevProj: 1_350_000,
    fiveYearProj: 6_750_000,
    initFee: 877_500,
    homeCount: 22_100,
    avgHomeValue: 890_000,
    partners: 0,
    color: "#D4AF37",
  },
  {
    id: "T04",
    name: "Plano West",
    zips: ["75093", "75024", "75025"],
    city: "Plano",
    tier: "premium",
    status: "available",
    owner: null,
    annualRevProj: 1_190_000,
    fiveYearProj: 5_950_000,
    initFee: 773_500,
    homeCount: 23_800,
    avgHomeValue: 560_000,
    partners: 0,
    color: "#D4AF37",
  },
  {
    id: "T05",
    name: "Celina / Prosper",
    zips: ["75009", "75078", "75056"],
    city: "Celina / Prosper",
    tier: "premium",
    status: "reserved",
    owner: "Pending Close",
    annualRevProj: 1_050_000,
    fiveYearProj: 5_250_000,
    initFee: 682_500,
    homeCount: 18_200,
    avgHomeValue: 640_000,
    partners: 0,
    color: "#D4AF37",
  },
  // Tier 2 -- Growth ($600K-$1M projected)
  {
    id: "T06",
    name: "Flower Mound / Lewisville",
    zips: ["75028", "75022", "75067"],
    city: "Flower Mound",
    tier: "growth",
    status: "available",
    owner: null,
    annualRevProj: 890_000,
    fiveYearProj: 4_450_000,
    initFee: 578_500,
    homeCount: 19_600,
    avgHomeValue: 480_000,
    partners: 0,
    color: "#6366F1",
  },
  {
    id: "T07",
    name: "Coppell / Irving",
    zips: ["75019", "75039", "75038"],
    city: "Coppell / Irving",
    tier: "growth",
    status: "available",
    owner: null,
    annualRevProj: 820_000,
    fiveYearProj: 4_100_000,
    initFee: 533_000,
    homeCount: 17_400,
    avgHomeValue: 510_000,
    partners: 0,
    color: "#6366F1",
  },
  {
    id: "T08",
    name: "Richardson / Garland North",
    zips: ["75080", "75081", "75082"],
    city: "Richardson",
    tier: "growth",
    status: "available",
    owner: null,
    annualRevProj: 760_000,
    fiveYearProj: 3_800_000,
    initFee: 494_000,
    homeCount: 16_200,
    avgHomeValue: 430_000,
    partners: 0,
    color: "#6366F1",
  },
  {
    id: "T09",
    name: "Colleyville / Grapevine",
    zips: ["76034", "76051", "76092"],
    city: "Colleyville / Grapevine",
    tier: "growth",
    status: "available",
    owner: null,
    annualRevProj: 840_000,
    fiveYearProj: 4_200_000,
    initFee: 546_000,
    homeCount: 15_800,
    avgHomeValue: 620_000,
    partners: 0,
    color: "#6366F1",
  },
  {
    id: "T10",
    name: "Rockwall / Rowlett",
    zips: ["75087", "75088", "75089"],
    city: "Rockwall / Rowlett",
    tier: "growth",
    status: "available",
    owner: null,
    annualRevProj: 680_000,
    fiveYearProj: 3_400_000,
    initFee: 442_000,
    homeCount: 14_200,
    avgHomeValue: 390_000,
    partners: 0,
    color: "#6366F1",
  },
  // Tier 3 -- Standard ($300K-$600K projected)
  {
    id: "T11",
    name: "Mesquite / Balch Springs",
    zips: ["75149", "75150", "75180"],
    city: "Mesquite",
    tier: "standard",
    status: "available",
    owner: null,
    annualRevProj: 480_000,
    fiveYearProj: 2_400_000,
    initFee: 312_000,
    homeCount: 18_400,
    avgHomeValue: 280_000,
    partners: 0,
    color: "#00B5B8",
  },
  {
    id: "T12",
    name: "Grand Prairie / Arlington North",
    zips: ["75050", "75051", "75052"],
    city: "Grand Prairie",
    tier: "standard",
    status: "available",
    owner: null,
    annualRevProj: 520_000,
    fiveYearProj: 2_600_000,
    initFee: 338_000,
    homeCount: 20_100,
    avgHomeValue: 290_000,
    partners: 0,
    color: "#00B5B8",
  },
  {
    id: "T13",
    name: "Duncanville / DeSoto",
    zips: ["75116", "75115", "75137"],
    city: "Duncanville / DeSoto",
    tier: "standard",
    status: "available",
    owner: null,
    annualRevProj: 440_000,
    fiveYearProj: 2_200_000,
    initFee: 286_000,
    homeCount: 16_800,
    avgHomeValue: 270_000,
    partners: 0,
    color: "#00B5B8",
  },
  {
    id: "T14",
    name: "Wylie / Murphy",
    zips: ["75098", "75094", "75189"],
    city: "Wylie / Murphy",
    tier: "standard",
    status: "available",
    owner: null,
    annualRevProj: 560_000,
    fiveYearProj: 2_800_000,
    initFee: 364_000,
    homeCount: 14_600,
    avgHomeValue: 380_000,
    partners: 0,
    color: "#00B5B8",
  },
  {
    id: "T15",
    name: "Denton / Corinth",
    zips: ["76201", "76210", "76065"],
    city: "Denton",
    tier: "standard",
    status: "available",
    owner: null,
    annualRevProj: 490_000,
    fiveYearProj: 2_450_000,
    initFee: 318_500,
    homeCount: 17_200,
    avgHomeValue: 310_000,
    partners: 0,
    color: "#00B5B8",
  },
];

const TIER_CONFIG = {
  premium: { label: "Premium", color: "#D4AF37", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800" },
  growth:  { label: "Growth",  color: "#6366F1", bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800" },
  standard:{ label: "Standard",color: "#00B5B8", bg: "bg-teal-50",   border: "border-teal-200",   text: "text-teal-800"   },
};

const STATUS_CONFIG = {
  owned:     { label: "Owned",     color: "bg-green-100 text-green-700",  icon: CheckCircle2 },
  reserved:  { label: "Reserved",  color: "bg-yellow-100 text-yellow-700", icon: Lock },
  available: { label: "Available", color: "bg-blue-100 text-blue-700",    icon: Zap },
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

// --- Territory Card -----------------------------------------------------------
function TerritoryCard({ t, onSelect }: { t: typeof TERRITORIES[0]; onSelect: (t: typeof TERRITORIES[0]) => void }) {
  const tier = TIER_CONFIG[t.tier as keyof typeof TIER_CONFIG];
  const status = STATUS_CONFIG[t.status as keyof typeof STATUS_CONFIG];
  const StatusIcon = status.icon;

  return (
    <div
      className={`rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        t.status === "available" ? "border-gray-200 hover:border-indigo-300" : "border-gray-100"
      }`}
      style={{ background: t.status === "owned" ? "#f9fafb" : "#fff" }}
      onClick={() => onSelect(t)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tier.bg} ${tier.border} ${tier.text}`}>
              {tier.label}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${status.color}`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-base">{t.name}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {t.city}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Territory ID</p>
          <p className="text-sm font-mono font-bold text-gray-600">{t.id}</p>
        </div>
      </div>

      {/* Zip codes */}
      <div className="flex gap-1.5 mb-4">
        {t.zips.map(z => (
          <span key={z} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">{z}</span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-0.5">Annual Rev Proj.</p>
          <p className="text-lg font-bold text-gray-900">{fmt(t.annualRevProj)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-0.5">5-Year Proj.</p>
          <p className="text-lg font-bold text-gray-900">{fmt(t.fiveYearProj)}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-0.5">Homes</p>
          <p className="text-lg font-bold text-gray-900">{t.homeCount.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-0.5">Avg Home Value</p>
          <p className="text-lg font-bold text-gray-900">{fmt(t.avgHomeValue)}</p>
        </div>
      </div>

      {/* Init Fee */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Initiation Fee (13% of 5yr)</p>
          <p className="text-xl font-black" style={{ color: tier.color }}>{fmt(t.initFee)}</p>
        </div>
        {t.status === "available" ? (
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            View Details
          </Button>
        ) : t.status === "owned" ? (
          <div className="flex items-center gap-1.5 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold">Active</span>
          </div>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>
        )}
      </div>
    </div>
  );
}

// --- Main Component -----------------------------------------------------------
export default function TerritoryMarketplace() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<typeof TERRITORIES[0] | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = TERRITORIES.filter(t => {
    const matchSearch = search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.city.toLowerCase().includes(search.toLowerCase()) ||
      t.zips.some(z => z.includes(search));
    const matchTier = tierFilter === "all" || t.tier === tierFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchTier && matchStatus;
  });

  // Summary stats
  const totalRevProj = TERRITORIES.reduce((s, t) => s + t.annualRevProj, 0);
  const available = TERRITORIES.filter(t => t.status === "available").length;
  const owned = TERRITORIES.filter(t => t.status === "owned").length;
  const totalInitFees = TERRITORIES.filter(t => t.status === "available").reduce((s, t) => s + t.initFee, 0);

  function handleSubmitInterest() {
    if (!buyerName || !buyerEmail) {
      toast.error("Please fill in your name and email.");
      return;
    }
    toast.success(`Interest submitted for ${selected?.name}! We'll reach out within 24 hours.`);
    setSubmitted(true);
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Territory Marketplace</h1>
              <p className="text-sm text-gray-500">DFW ProLnk Partner Territory Sales & Management</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Total DFW Territories</p>
            <p className="text-3xl font-black text-gray-900">{TERRITORIES.length}</p>
            <p className="text-xs text-gray-400 mt-1">across DFW metro</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Available</p>
            <p className="text-3xl font-black text-indigo-600">{available}</p>
            <p className="text-xs text-gray-400 mt-1">ready to sell</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Network Rev Proj.</p>
            <p className="text-3xl font-black text-green-600">{fmt(totalRevProj)}</p>
            <p className="text-xs text-gray-400 mt-1">annual at full build-out</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Available Init Fees</p>
            <p className="text-3xl font-black text-yellow-600">{fmt(totalInitFees)}</p>
            <p className="text-xs text-gray-400 mt-1">total addressable sales</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name, city, or zip..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {["all", "premium", "growth", "standard"].map(t => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  tierFilter === t ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t === "all" ? "All Tiers" : t}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {["all", "available", "owned", "reserved"].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  statusFilter === s ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s === "all" ? "All Status" : s}
              </button>
            ))}
          </div>
        </div>

        {/* Territory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(t => (
            <TerritoryCard key={t.id} t={t} onSelect={setSelected} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No territories match your filters</p>
            </div>
          )}
        </div>

        {/* Territory Detail Modal */}
        <Dialog open={!!selected} onOpenChange={() => { setSelected(null); setSubmitted(false); setBuyerName(""); setBuyerEmail(""); setBuyerPhone(""); }}>
          <DialogContent className="max-w-lg">
            {selected && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription>{selected.city}  {selected.zips.join(", ")}</DialogDescription>
                </DialogHeader>

                {!submitted ? (
                  <div className="space-y-5">
                    {/* Financial breakdown */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" /> Revenue Projections
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Annual Rev Proj.</p>
                          <p className="font-bold text-gray-900">{fmt(selected.annualRevProj)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">5-Year Proj.</p>
                          <p className="font-bold text-gray-900">{fmt(selected.fiveYearProj)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Avg Home Value</p>
                          <p className="font-bold text-gray-900">{fmt(selected.avgHomeValue)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Total Homes</p>
                          <p className="font-bold text-gray-900">{selected.homeCount.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-xs text-gray-500">Initiation Fee (13% of 5yr revenue)</p>
                        <p className="text-2xl font-black text-indigo-600">{fmt(selected.initFee)}</p>
                        <p className="text-xs text-gray-400 mt-1">+ 10% royalty  2.5% marketing fee</p>
                      </div>
                    </div>

                    {selected.status === "available" ? (
                      <>
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-700">Submit Interest</h4>
                          <Input placeholder="Your Name" value={buyerName} onChange={e => setBuyerName(e.target.value)} />
                          <Input placeholder="Email Address" type="email" value={buyerEmail} onChange={e => setBuyerEmail(e.target.value)} />
                          <Input placeholder="Phone Number" type="tel" value={buyerPhone} onChange={e => setBuyerPhone(e.target.value)} />
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSubmitInterest}>
                          Submit Interest in {selected.name}
                        </Button>
                      </>
                    ) : selected.status === "owned" ? (
                      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-green-800">Territory Active</p>
                          <p className="text-sm text-green-600">Owned by: {selected.owner}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <Lock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-yellow-800">Reserved -- Pending Close</p>
                          <p className="text-sm text-yellow-600">Currently in negotiation. Check back soon.</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interest Submitted!</h3>
                    <p className="text-gray-500 text-sm">We'll reach out to <strong>{buyerEmail}</strong> within 24 hours to discuss the <strong>{selected.name}</strong> territory.</p>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
