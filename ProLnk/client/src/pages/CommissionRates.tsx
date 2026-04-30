import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DollarSign, Search, TrendingUp, Info } from "lucide-react";

const RATE_TIERS = {
  scout: { label: "Scout", color: "bg-gray-100 text-gray-700", keep: "70%", platform: "30%" },
  pro: { label: "Pro", color: "bg-blue-100 text-blue-700", keep: "75%", platform: "25%" },
  crew: { label: "Crew", color: "bg-purple-100 text-purple-700", keep: "80%", platform: "20%" },
  company: { label: "Company", color: "bg-amber-100 text-amber-700", keep: "82%", platform: "18%" },
  enterprise: { label: "Enterprise", color: "bg-emerald-100 text-emerald-700", keep: "85%", platform: "15%" },
};

const COMMISSION_CATEGORIES = [
  { group: "Lawn & Landscape", items: [
    { service: "Lawn Care / Mowing", avgJob: "$150–$400", platformFee: "8–12%", notes: "Per visit or monthly contract" },
    { service: "Landscaping Design", avgJob: "$800–$5,000", platformFee: "10–14%", notes: "Design + install projects" },
    { service: "Irrigation / Sprinklers", avgJob: "$400–$2,500", platformFee: "10–12%", notes: "Install, repair, winterize" },
    { service: "Tree Service", avgJob: "$300–$3,000", platformFee: "10–14%", notes: "Trimming, removal, stump grinding" },
    { service: "Artificial Turf", avgJob: "$2,000–$15,000", platformFee: "12–15%", notes: "High-value installs" },
    { service: "Mulch & Bed Prep", avgJob: "$200–$800", platformFee: "8–10%", notes: "Seasonal service" },
    { service: "Sod Installation", avgJob: "$500–$4,000", platformFee: "10–12%", notes: "Per sq ft pricing" },
    { service: "Drainage Solutions", avgJob: "$800–$5,000", platformFee: "10–14%", notes: "French drains, grading" },
  ]},
  { group: "Exterior Maintenance", items: [
    { service: "Pressure Washing", avgJob: "$150–$600", platformFee: "8–12%", notes: "Driveway, siding, deck" },
    { service: "Window Cleaning", avgJob: "$150–$500", platformFee: "8–10%", notes: "Interior + exterior" },
    { service: "Gutter Cleaning", avgJob: "$100–$350", platformFee: "8–10%", notes: "Cleaning + guards" },
    { service: "Exterior Painting", avgJob: "$1,500–$8,000", platformFee: "10–14%", notes: "Full exterior repaint" },
    { service: "Roof Cleaning", avgJob: "$200–$600", platformFee: "8–10%", notes: "Soft wash method" },
    { service: "Driveway Sealing", avgJob: "$150–$500", platformFee: "8–10%", notes: "Asphalt or concrete" },
    { service: "Fence & Gate", avgJob: "$500–$5,000", platformFee: "10–14%", notes: "Install or repair" },
    { service: "Deck / Patio", avgJob: "$1,000–$10,000", platformFee: "10–14%", notes: "Build or refinish" },
  ]},
  { group: "Home Systems", items: [
    { service: "HVAC Service", avgJob: "$150–$3,000", platformFee: "10–14%", notes: "Repair, tune-up, replace" },
    { service: "Plumbing", avgJob: "$200–$2,500", platformFee: "10–14%", notes: "Repair, install, emergency" },
    { service: "Electrical", avgJob: "$200–$3,000", platformFee: "10–14%", notes: "Panel, outlets, fixtures" },
    { service: "Roofing", avgJob: "$3,000–$20,000", platformFee: "12–15%", notes: "Repair or full replacement" },
    { service: "Water Filtration", avgJob: "$500–$3,000", platformFee: "10–14%", notes: "Whole-home or under-sink" },
    { service: "Water Heater", avgJob: "$800–$2,500", platformFee: "10–12%", notes: "Tank or tankless" },
    { service: "Insulation", avgJob: "$1,000–$5,000", platformFee: "10–14%", notes: "Attic, wall, spray foam" },
    { service: "Generator Install", avgJob: "$3,000–$15,000", platformFee: "12–15%", notes: "Standby or portable" },
  ]},
  { group: "Interior Services", items: [
    { service: "Interior Painting", avgJob: "$500–$4,000", platformFee: "10–12%", notes: "Rooms, full interior" },
    { service: "Flooring", avgJob: "$1,000–$8,000", platformFee: "10–14%", notes: "Hardwood, tile, LVP" },
    { service: "Remodeling", avgJob: "$5,000–$50,000", platformFee: "12–15%", notes: "Kitchen, bath, additions" },
    { service: "Handyman", avgJob: "$100–$1,000", platformFee: "8–12%", notes: "General repairs" },
    { service: "Carpet Cleaning", avgJob: "$100–$400", platformFee: "8–10%", notes: "Per room or whole home" },
    { service: "House Cleaning", avgJob: "$100–$350", platformFee: "8–10%", notes: "Standard or deep clean" },
    { service: "Appliance Repair", avgJob: "$100–$500", platformFee: "8–10%", notes: "Washer, dryer, fridge" },
    { service: "Cabinet Refinishing", avgJob: "$1,500–$6,000", platformFee: "10–14%", notes: "Paint or reface" },
  ]},
  { group: "Pest & Pool", items: [
    { service: "Pest Control", avgJob: "$100–$400", platformFee: "8–12%", notes: "Monthly or one-time" },
    { service: "Termite Treatment", avgJob: "$500–$3,000", platformFee: "10–14%", notes: "Tent or spot treat" },
    { service: "Pool Service", avgJob: "$100–$300/mo", platformFee: "8–12%", notes: "Weekly maintenance" },
    { service: "Pool Repair", avgJob: "$200–$2,000", platformFee: "10–14%", notes: "Equipment, plaster, tile" },
    { service: "Pool Installation", avgJob: "$30,000–$80,000", platformFee: "12–15%", notes: "New pool build" },
    { service: "Mosquito Control", avgJob: "$100–$300", platformFee: "8–10%", notes: "Spray or misting system" },
  ]},
  { group: "Smart Home & Security", items: [
    { service: "Security Systems", avgJob: "$500–$3,000", platformFee: "10–14%", notes: "Cameras, alarms, monitoring" },
    { service: "Smart Home Install", avgJob: "$300–$2,000", platformFee: "10–12%", notes: "Thermostats, locks, hubs" },
    { service: "EV Charger Install", avgJob: "$800–$2,500", platformFee: "10–14%", notes: "Level 2 home charger" },
    { service: "Solar Panels", avgJob: "$15,000–$40,000", platformFee: "12–15%", notes: "Full system install" },
    { service: "Home Theater", avgJob: "$1,000–$10,000", platformFee: "10–14%", notes: "AV, projector, surround" },
  ]},
  { group: "Specialty & Concrete", items: [
    { service: "Concrete / Flatwork", avgJob: "$1,000–$8,000", platformFee: "10–14%", notes: "Driveway, patio, sidewalk" },
    { service: "Garage Epoxy", avgJob: "$1,000–$4,000", platformFee: "10–12%", notes: "Coating + flake system" },
    { service: "Foundation Repair", avgJob: "$2,000–$15,000", platformFee: "12–15%", notes: "Piers, leveling" },
    { service: "Chimney Service", avgJob: "$200–$2,000", platformFee: "8–12%", notes: "Sweep, repair, cap" },
    { service: "Junk Removal", avgJob: "$100–$600", platformFee: "8–10%", notes: "Haul-away, demo cleanup" },
    { service: "Moving Services", avgJob: "$300–$2,000", platformFee: "8–12%", notes: "Local or long-distance" },
    { service: "Storage Solutions", avgJob: "$500–$3,000", platformFee: "8–12%", notes: "Garage, closet, shed" },
  ]},
];

export default function CommissionRates() {
  const [search, setSearch] = useState("");
  const [activeTier] = useState("pro");

  const filtered = COMMISSION_CATEGORIES.map(group => ({
    ...group,
    items: group.items.filter(item =>
      item.service.toLowerCase().includes(search.toLowerCase()) ||
      group.group.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(group => group.items.length > 0);

  const tier = RATE_TIERS[activeTier as keyof typeof RATE_TIERS];

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-[#0A1628]" />Commission Rates
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Industry-standard referral rates across all 50+ service categories. Your keep rate increases as you advance through tiers.
          </p>
        </div>

        {/* Tier Rate Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(RATE_TIERS).map(([key, t]) => (
            <Card key={key} className={`border ${activeTier === key ? "border-[#0A1628] shadow-md" : "border-gray-200"}`}>
              <CardContent className="p-3 text-center">
                <Badge className={`${t.color} text-xs mb-2`}>{t.label}</Badge>
                <div className="text-xl font-bold text-gray-900">{t.keep}</div>
                <div className="text-xs text-gray-500">you keep</div>
                <div className="text-xs text-gray-400 mt-1">{t.platform} platform</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>How it works:</strong> When your job photo generates a referral that converts to a paid job, you earn the platform fee percentage of that job's value. The rates below show the typical range — your actual commission depends on the job value entered at close.
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search service categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Rate Tables by Group */}
        {filtered.map((group) => (
          <Card key={group.group} className="border border-gray-200">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0A1628]" />{group.group}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Service</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Avg Job Value</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Platform Fee</th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600 hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item, i) => (
                      <tr key={item.service} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-2.5 font-medium text-gray-800">{item.service}</td>
                        <td className="px-4 py-2.5 text-gray-600">{item.avgJob}</td>
                        <td className="px-4 py-2.5">
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">{item.platformFee}</Badge>
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell text-xs">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p>No categories match "{search}"</p>
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
