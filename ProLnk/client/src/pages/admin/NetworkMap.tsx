import { useState, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { MapView } from "@/components/Map";
import { Users, Zap, Map, Globe, Eye, EyeOff, ChevronDown, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// DFW zip code centroids for service area visualization
const DFW_ZIP_CENTROIDS: Record<string, [number, number]> = {
  "75001": [-96.8397, 32.9776], "75002": [-96.6988, 33.0148], "75006": [-96.8988, 32.9554],
  "75007": [-96.9054, 33.0048], "75010": [-96.9321, 33.0765], "75019": [-96.9799, 32.9776],
  "75022": [-97.0654, 33.0432], "75024": [-96.8321, 33.0765], "75025": [-96.8321, 33.1098],
  "75028": [-97.0321, 33.0432], "75034": [-96.8654, 33.1432], "75035": [-96.8321, 33.1765],
  "75038": [-96.9654, 32.8432], "75039": [-96.9321, 32.8765], "75040": [-96.6654, 32.9432],
  "75041": [-96.6321, 32.9098], "75042": [-96.6654, 32.9765], "75043": [-96.6321, 32.9432],
  "75044": [-96.6654, 33.0098], "75048": [-96.5988, 32.9765], "75050": [-97.0321, 32.7432],
  "75051": [-97.0654, 32.7098], "75052": [-97.0321, 32.6765], "75054": [-97.0654, 32.6432],
  "75056": [-96.9321, 33.1432], "75057": [-96.9988, 33.1098], "75061": [-96.9988, 32.8432],
  "75062": [-96.9654, 32.8098], "75063": [-96.9654, 32.8765], "75065": [-97.0321, 33.1765],
  "75067": [-97.0654, 33.1432], "75068": [-96.9321, 33.1765], "75070": [-96.8654, 33.1765],
  "75071": [-96.8321, 33.2098], "75074": [-96.7321, 33.0432], "75075": [-96.7654, 33.0098],
  "75080": [-96.7321, 32.9765], "75081": [-96.6988, 32.9432], "75082": [-96.6654, 33.0432],
  "75087": [-96.5988, 33.0432], "75088": [-96.5654, 32.9765], "75089": [-96.5321, 32.9432],
  "75093": [-96.8321, 33.0432], "75094": [-96.7654, 33.0765], "75098": [-96.5321, 33.0432],
  "75104": [-96.8654, 32.5765], "75115": [-96.9654, 32.6432], "75116": [-96.9321, 32.6098],
  "75119": [-96.8321, 32.4765], "75126": [-96.4321, 32.7765], "75134": [-96.8321, 32.5432],
  "75137": [-96.8988, 32.5765], "75141": [-96.7988, 32.5432], "75146": [-96.7654, 32.5098],
  "75149": [-96.6654, 32.7432], "75150": [-96.6321, 32.7098], "75154": [-96.8654, 32.4432],
  "75159": [-96.5988, 32.5765], "75172": [-96.7321, 32.4765], "75180": [-96.5988, 32.6765],
  "75181": [-96.5654, 32.6432], "75182": [-96.5321, 32.6765], "75189": [-96.4654, 33.0098],
  "75201": [-96.7988, 32.7832], "75202": [-96.8054, 32.7765], "75203": [-96.8054, 32.7432],
  "75204": [-96.7832, 32.7988], "75205": [-96.7832, 32.8321], "75206": [-96.7654, 32.8321],
  "75207": [-96.8321, 32.7832], "75208": [-96.8321, 32.7432], "75209": [-96.8321, 32.8098],
  "75210": [-96.7432, 32.7432], "75211": [-96.8654, 32.7432], "75212": [-96.8654, 32.7832],
  "75214": [-96.7432, 32.8098], "75215": [-96.7432, 32.7432], "75216": [-96.7654, 32.7098],
  "75217": [-96.7098, 32.7098], "75218": [-96.7098, 32.8321], "75219": [-96.8098, 32.8098],
  "75220": [-96.8654, 32.8432], "75223": [-96.7432, 32.7765], "75224": [-96.7988, 32.7098],
  "75225": [-96.7832, 32.8654], "75226": [-96.7654, 32.7765], "75227": [-96.6988, 32.7432],
  "75228": [-96.6988, 32.8098], "75229": [-96.8654, 32.8765], "75230": [-96.7832, 32.9098],
  "75231": [-96.7432, 32.8654], "75232": [-96.7988, 32.6765], "75233": [-96.8321, 32.7098],
  "75234": [-96.8988, 32.9098], "75235": [-96.8321, 32.8432], "75236": [-96.8988, 32.6765],
  "75237": [-96.8654, 32.6765], "75238": [-96.7098, 32.8654], "75240": [-96.7832, 32.9432],
  "75241": [-96.7432, 32.6765], "75243": [-96.7432, 32.9098], "75244": [-96.8321, 32.9432],
  "75246": [-96.7654, 32.7988], "75247": [-96.8321, 32.8098], "75248": [-96.7832, 32.9765],
  "75249": [-96.9321, 32.6432], "75251": [-96.7654, 32.9098], "75252": [-96.7832, 33.0098],
  "75253": [-96.6654, 32.6432], "75254": [-96.7654, 32.9432],
};

const TIER_COLORS: Record<string, string> = {
  bronze: "#CD7F32",
  silver: "#A8A9AD",
  gold: "#D4AF37",
};

const EXPANSION_CITIES = [
  { name: "Houston", coords: [-95.3698, 29.7604] as [number, number], status: "Q3 2025" },
  { name: "Austin", coords: [-97.7431, 30.2672] as [number, number], status: "Q4 2025" },
  { name: "San Antonio", coords: [-98.4936, 29.4241] as [number, number], status: "Q1 2026" },
  { name: "Oklahoma City", coords: [-97.5164, 35.4676] as [number, number], status: "Q2 2026" },
  { name: "Nashville", coords: [-86.7816, 36.1627] as [number, number], status: "Q3 2026" },
  { name: "Atlanta", coords: [-84.388, 33.749] as [number, number], status: "Q4 2026" },
  { name: "Charlotte", coords: [-80.8431, 35.2271] as [number, number], status: "2027" },
  { name: "Denver", coords: [-104.9903, 39.7392] as [number, number], status: "2027" },
  { name: "Phoenix", coords: [-112.074, 33.4484] as [number, number], status: "2027" },
  { name: "Las Vegas", coords: [-115.1398, 36.1699] as [number, number], status: "2028" },
];

const BUSINESS_TYPES = [
  "Lawn Care", "Landscaping", "Pest Control", "Pool Service", "Pressure Washing",
  "Window Cleaning", "Handyman", "Painting", "Roofing", "HVAC", "Plumbing",
  "Electrical", "Tree Service", "Gutter Cleaning", "Pet Waste Removal",
];

export default function NetworkMap() {
  const [showExpansion, setShowExpansion] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showServiceAreas, setShowServiceAreas] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const markersRef = useState<google.maps.Marker[]>([])[0];

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("approved");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterSearch, setFilterSearch] = useState("");

  const { data: allPartners } = trpc.admin.getAllPartners.useQuery();
  const { data: stats } = trpc.admin.getNetworkStats.useQuery();

  // Apply filters
  const filteredPartners = (allPartners ?? []).filter((p: any) => {
    if (filterTier !== "all" && p.tier !== filterTier) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (filterType !== "all" && !p.businessType?.toLowerCase().includes(filterType.toLowerCase())) return false;
    if (filterSearch) {
      const q = filterSearch.toLowerCase();
      return p.businessName?.toLowerCase().includes(q) || p.serviceArea?.toLowerCase().includes(q) || p.businessType?.toLowerCase().includes(q);
    }
    return true;
  });

  const handleMapReady = useCallback((map: google.maps.Map) => {
    setMapInstance(map);

    // Style the map dark
    map.setOptions({
      styles: [
        { elementType: "geometry", stylers: [{ color: "#0A1628" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#0A1628" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#7B809A" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#9CA3AF" }] },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#0F1F35" }] },
        { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1E3A5F" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7B809A" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1E3A5F" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#060E1A" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#2A4A6F" }] },
      ],
      center: { lat: 32.7767, lng: -96.797 },
      zoom: 10,
    });

    // Add partner markers from real data
    if (filteredPartners) {
      filteredPartners.forEach((partner: any) => {
        if (!partner.serviceArea) return;
        // Try to find a zip code in the service area string
        const zipMatch = partner.serviceArea.match(/\b7[0-9]{4}\b/);
        const zip = zipMatch?.[0];
        const coords = zip ? DFW_ZIP_CENTROIDS[zip] : null;
        const lat = coords ? coords[1] : 32.7767 + (Math.random() - 0.5) * 0.5;
        const lng = coords ? coords[0] : -96.797 + (Math.random() - 0.5) * 0.5;

        const tierColor = TIER_COLORS[partner.tier] ?? "#00B5B8";

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: partner.businessName,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: tierColor,
            fillOpacity: 0.9,
            strokeColor: "#fff",
            strokeWeight: 2,
          },
        });

        // Service area circle
        if (showServiceAreas) {
          new google.maps.Circle({
            map,
            center: { lat, lng },
            radius: 8000,
            fillColor: tierColor,
            fillOpacity: 0.06,
            strokeColor: tierColor,
            strokeOpacity: 0.3,
            strokeWeight: 1,
          });
        }

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="background:#0F1F35;border:1px solid #1E3A5F;border-radius:8px;padding:12px;min-width:180px;font-family:Inter,sans-serif;">
              <div style="color:#00B5B8;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">${partner.tier?.toUpperCase() ?? "BRONZE"} PARTNER</div>
              <div style="color:#fff;font-weight:600;font-size:14px;margin-bottom:2px;">${partner.businessName}</div>
              <div style="color:#4A6FA5;font-size:12px;">${partner.businessType}</div>
              <div style="color:#4A6FA5;font-size:11px;margin-top:4px;">${partner.serviceArea}</div>
              <div style="display:flex;gap:12px;margin-top:8px;padding-top:8px;border-top:1px solid #1E3A5F;">
                <div><div style="color:#fff;font-weight:700;font-size:14px;">${partner.referralCount ?? 0}</div><div style="color:#4A6FA5;font-size:10px;">Referrals</div></div>
                <div><div style="color:#10B981;font-weight:700;font-size:14px;">$${Number(partner.commissionOwed ?? 0).toFixed(0)}</div><div style="color:#4A6FA5;font-size:10px;">Owed</div></div>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
          setSelectedPartner(partner);
        });
      });
    }

    // DFW boundary highlight
    new google.maps.Circle({
      map,
      center: { lat: 32.7767, lng: -96.797 },
      radius: 80000,
      fillColor: "#00B5B8",
      fillOpacity: 0.03,
      strokeColor: "#00B5B8",
      strokeOpacity: 0.15,
      strokeWeight: 1.5,
    });

  }, [filteredPartners, showServiceAreas]);

  // Add expansion city markers when toggled
  const handleExpansionToggle = () => {
    setShowExpansion(!showExpansion);
    if (!mapInstance) return;

    if (!showExpansion) {
      // Zoom out to show national view
      mapInstance.setZoom(5);
      mapInstance.setCenter({ lat: 35.5, lng: -97 });

      EXPANSION_CITIES.forEach((city) => {
        const marker = new google.maps.Marker({
          position: { lat: city.coords[1], lng: city.coords[0] },
          map: mapInstance,
          title: city.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4A6FA5",
            fillOpacity: 0.6,
            strokeColor: "#00B5B8",
            strokeWeight: 1.5,
          },
          label: {
            text: city.name,
            color: "#9CA3AF",
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
          },
        });
      });
    } else {
      // Zoom back to DFW
      mapInstance.setZoom(10);
      mapInstance.setCenter({ lat: 32.7767, lng: -96.797 });
    }
  };

  const activeFilterCount = [filterTier !== "all", filterStatus !== "approved", filterType !== "all", filterSearch !== ""].filter(Boolean).length;

  return (
    <AdminLayout title="Network Map" subtitle="Live partner coverage  DFW launch market">
      {/* Filter panel */}
      {filterOpen && (
        <div className="mb-4 rounded-xl border p-4 space-y-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Search Partners</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <Input
                  value={filterSearch}
                  onChange={e => setFilterSearch(e.target.value)}
                  placeholder="Name, type, area..."
                  className="pl-8 h-8 text-xs bg-white border-slate-700 text-gray-800 placeholder:text-slate-500"
                />
              </div>
            </div>
            {/* Tier */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Tier</label>
              <div className="flex gap-1.5 flex-wrap">
                {["all", "bronze", "silver", "gold"].map(t => (
                  <button key={t} onClick={() => setFilterTier(t)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium transition-all capitalize"
                    style={{
                      backgroundColor: filterTier === t ? TIER_COLORS[t] ?? "#00B5B8" : "#0A1628",
                      color: filterTier === t ? "#fff" : "#4A6FA5",
                      border: `1px solid ${filterTier === t ? TIER_COLORS[t] ?? "#00B5B8" : "#1E3A5F"}`,
                    }}>{t === "all" ? "All Tiers" : t}</button>
                ))}
              </div>
            </div>
            {/* Status */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Status</label>
              <div className="flex gap-1.5 flex-wrap">
                {["all", "approved", "pending", "rejected"].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium transition-all capitalize"
                    style={{
                      backgroundColor: filterStatus === s ? "#00B5B8" : "#0A1628",
                      color: filterStatus === s ? "#fff" : "#4A6FA5",
                      border: `1px solid ${filterStatus === s ? "#00B5B8" : "#1E3A5F"}`,
                    }}>{s === "all" ? "All Status" : s}</button>
                ))}
              </div>
            </div>
            {/* Business Type */}
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Business Type</label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full h-8 text-xs rounded-lg px-2 bg-white border border-slate-700 text-gray-800"
              >
                <option value="all">All Types</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setFilterTier("all"); setFilterStatus("approved"); setFilterType("all"); setFilterSearch(""); }}
              className="text-xs flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Tier legend */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-lg border text-xs" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          {Object.entries(TIER_COLORS).map(([tier, color]) => (
            <span key={tier} className="flex items-center gap-1.5 capitalize font-medium" style={{ color }}>
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
              {tier}
            </span>
          ))}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors"
          style={{
            backgroundColor: filterOpen || activeFilterCount > 0 ? "rgba(0,181,184,0.1)" : "#0F1F35",
            borderColor: filterOpen || activeFilterCount > 0 ? "#00B5B8" : "#1E3A5F",
            color: filterOpen || activeFilterCount > 0 ? "#00B5B8" : "#4A6FA5",
          }}
        >
          <Filter className="w-3.5 h-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full text-gray-800 text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: "#00B5B8" }}>{activeFilterCount}</span>
          )}
        </button>

        {/* Toggles */}
        <button
          onClick={() => setShowServiceAreas(!showServiceAreas)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors"
          style={{
            backgroundColor: showServiceAreas ? "rgba(0,181,184,0.1)" : "#0F1F35",
            borderColor: showServiceAreas ? "#00B5B8" : "#1E3A5F",
            color: showServiceAreas ? "#00B5B8" : "#4A6FA5",
          }}
        >
          {showServiceAreas ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          Service Areas
        </button>

        <button
          onClick={handleExpansionToggle}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors"
          style={{
            backgroundColor: showExpansion ? "rgba(139,92,246,0.1)" : "#0F1F35",
            borderColor: showExpansion ? "#8B5CF6" : "#1E3A5F",
            color: showExpansion ? "#8B5CF6" : "#4A6FA5",
          }}
        >
          <Globe className="w-3.5 h-3.5" />
          National Expansion
        </button>

        {/* Stats */}
        <div className="ml-auto flex items-center gap-4 text-xs" style={{ color: "#7B809A" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {stats?.totalPartners ?? 0} Active Partners
          </span>
          <span>DFW Metro  {showExpansion ? "National View" : "Local View"}</span>
        </div>
      </div>

      {/* Map container */}
      <div className="rounded-xl border overflow-hidden" style={{ height: "calc(100vh - 280px)", borderColor: "#E9ECEF" }}>
        <MapView onMapReady={handleMapReady} />
      </div>

      {/* Expansion cities panel */}
      {showExpansion && (
        <div className="mt-4 rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <h3 className="font-bold text-[#344767] text-sm mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: "#8B5CF6" }} />
            National Expansion Roadmap
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {EXPANSION_CITIES.map((city) => (
              <div key={city.name} className="rounded-lg p-2.5 text-center" style={{ backgroundColor: "#0A1628", border: "1px solid #E9ECEF" }}>
                <div className="text-sm font-medium text-gray-800">{city.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "#8B5CF6" }}>{city.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
