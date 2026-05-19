import { useState, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { MapPin, TrendingUp, Users, Briefcase, AlertCircle, Filter, Search, X, Camera, BarChart2 } from "lucide-react";
import { MapView } from "@/components/Map";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/AdminLayout";

const BUSINESS_TYPES_HEAT = [
  "Lawn Care", "Landscaping", "Pest Control", "Pool Service", "Pressure Washing",
  "Window Cleaning", "Handyman", "Painting", "Roofing", "HVAC", "Plumbing",
  "Electrical", "Tree Service", "Gutter Cleaning", "Pet Waste Removal",
];

export default function HeatMap() {
  const { data: jobs } = trpc.admin.getAllJobs.useQuery();
  const { data: partners } = trpc.admin.getAllPartners.useQuery();
  const mapRef = useRef<google.maps.Map | null>(null);

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterZip, setFilterZip] = useState("");
  const [showCoverage, setShowCoverage] = useState(true);

  // Build zip code density from job addresses (serviceZip preferred, fallback to parsing serviceAddress)
  const zipDensity: Record<string, number> = {};
  const zipPhotoDensity: Record<string, number> = {};
  const zipAnalyzedDensity: Record<string, number> = {};
  (jobs ?? []).forEach((job: any) => {
    const zip = job.serviceZip || (job.serviceAddress ?? "").match(/\b\d{5}\b/)?.[0];
    if (zip) {
      zipDensity[zip] = (zipDensity[zip] ?? 0) + 1;
      // Count analyzed jobs as "photos with AI" (proxy for photo density)
      if (job.aiAnalysisStatus === "complete" || job.aiAnalysisStatus === "analyzed") {
        zipPhotoDensity[zip] = (zipPhotoDensity[zip] ?? 0) + 1;
      }
      if (job.aiAnalysisStatus === "complete") {
        zipAnalyzedDensity[zip] = (zipAnalyzedDensity[zip] ?? 0) + 1;
      }
    }
  });

  const topZips = Object.entries(zipDensity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topPhotoZips = Object.entries(zipPhotoDensity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const totalPhotos = Object.values(zipPhotoDensity).reduce((a, b) => a + b, 0);
  const totalAnalyzed = Object.values(zipAnalyzedDensity).reduce((a, b) => a + b, 0);

  const allApproved = (partners ?? []).filter((p) => p.status === "approved");
  const approvedPartners = allApproved.filter((p: any) => {
    if (filterType !== "all" && !p.businessType?.toLowerCase().includes(filterType.toLowerCase())) return false;
    return true;
  });

  const activeFilterCount = [filterType !== "all", filterZip !== ""].filter(Boolean).length;

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Center on DFW
    map.setCenter({ lat: 32.7767, lng: -96.797 });
    map.setZoom(10);

    // Add partner location markers
    approvedPartners.forEach((partner) => {
      const lat = Number(partner.serviceAreaLat);
      const lng = Number(partner.serviceAreaLng);
      if (!lat || !lng) return;

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: partner.businessName,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#00B5B8",
          fillOpacity: 0.9,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding:8px;min-width:160px">
            <p style="font-weight:700;margin:0 0 4px">${partner.businessName}</p>
            <p style="font-size:12px;color:#666;margin:0">${partner.businessType}</p>
            <p style="font-size:12px;color:#666;margin:4px 0 0">${partner.referralCount} referrals  ${partner.jobsLogged} jobs</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      // Coverage radius circle
      new google.maps.Circle({
        map,
        center: { lat, lng },
        radius: (partner.serviceRadiusMiles ?? 15) * 1609.34,
        fillColor: "#00B5B8",
        fillOpacity: 0.06,
        strokeColor: "#00B5B8",
        strokeOpacity: 0.3,
        strokeWeight: 1,
      });
    });
  }, [approvedPartners]);

  return (
    <AdminLayout title="Heat Map" subtitle="Job density, partner coverage, and market gaps across DFW">
      <div className="space-y-6">

        {/* Filter panel */}
        {filterOpen && (
          <div className="rounded-xl border p-4 space-y-4" style={{ backgroundColor: "#1E293B", borderColor: "#334155" }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Zip search */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Filter by Zip Code</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <Input
                    value={filterZip}
                    onChange={e => setFilterZip(e.target.value)}
                    placeholder="e.g. 75034"
                    className="pl-8 h-8 text-xs bg-white border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
              {/* Business type */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Business Type</label>
                <select
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                  className="w-full h-8 text-xs rounded-lg px-2 bg-white border border-slate-700 text-white"
                >
                  <option value="all">All Types</option>
                  {BUSINESS_TYPES_HEAT.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {/* Coverage toggle */}
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Map Layers</label>
                <button
                  onClick={() => setShowCoverage(!showCoverage)}
                  className="h-8 px-3 rounded-lg border text-xs font-medium transition-all"
                  style={{
                    backgroundColor: showCoverage ? "rgba(0,181,184,0.15)" : "#0F172A",
                    borderColor: showCoverage ? "#00B5B8" : "#334155",
                    color: showCoverage ? "#00B5B8" : "#64748B",
                  }}
                >
                  {showCoverage ? "Coverage Circles: ON" : "Coverage Circles: OFF"}
                </button>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setFilterType("all"); setFilterZip(""); }}
                className="text-xs flex items-center gap-1.5 text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Neighborhood Heat Map</h1>
              <p className="text-sm text-slate-400">Job density, partner coverage, and market gaps across DFW</p>
            </div>
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-colors"
            style={{
              backgroundColor: filterOpen || activeFilterCount > 0 ? "rgba(0,181,184,0.1)" : "#1E293B",
              borderColor: filterOpen || activeFilterCount > 0 ? "#00B5B8" : "#334155",
              color: filterOpen || activeFilterCount > 0 ? "#00B5B8" : "#64748B",
            }}
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ backgroundColor: "#00B5B8" }}>{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Jobs", value: jobs?.length ?? 0, icon: <Briefcase className="w-4 h-4 text-teal-400" />, color: "text-teal-400" },
            { label: "Active Partners", value: approvedPartners.length, icon: <Users className="w-4 h-4 text-blue-400" />, color: "text-blue-400" },
            { label: "Zip Codes Covered", value: Object.keys(zipDensity).length, icon: <TrendingUp className="w-4 h-4 text-purple-400" />, color: "text-purple-400" },
            { label: "Photos w/ AI", value: totalPhotos, icon: <Camera className="w-4 h-4 text-amber-400" />, color: "text-amber-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-xs text-slate-400">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <p className="text-sm font-medium text-white">Partner Coverage Map -- DFW</p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" /> Partner location
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full border border-teal-500 inline-block" /> Service radius
              </span>
            </div>
          </div>
          <div className="h-96">
            <MapView onMapReady={handleMapReady} />
          </div>
        </div>

        {/* Top zip codes -- two tables side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Job volume */}
          {topZips.length > 0 && (
            <div className="bg-slate-800 rounded-xl border border-slate-700">
              <div className="p-4 border-b border-slate-700 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal-400" />
                <p className="text-sm font-medium text-white">Top Zip Codes by Job Volume</p>
              </div>
              <div className="divide-y divide-slate-700">
                {topZips.map(([zip, count], i) => (
                  <div key={zip} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 w-5">#{i + 1}</span>
                      <span className="font-mono text-sm text-white">{zip}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full"
                          style={{ width: `${Math.round((count / (topZips[0]?.[1] ?? 1)) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-teal-400 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo / AI density */}
          {topPhotoZips.length > 0 ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700">
              <div className="p-4 border-b border-slate-700 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <p className="text-sm font-medium text-white">Top Zip Codes by Photo Density</p>
              </div>
              <div className="divide-y divide-slate-700">
                {topPhotoZips.map(([zip, count], i) => {
                  const analyzed = zipAnalyzedDensity[zip] ?? 0;
                  return (
                    <div key={zip} className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 w-5">#{i + 1}</span>
                        <div>
                          <span className="font-mono text-sm text-white">{zip}</span>
                          {analyzed > 0 && (
                            <span className="ml-2 text-xs text-green-400">{analyzed} analyzed</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${Math.round((count / (topPhotoZips[0]?.[1] ?? 1)) * 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-amber-400 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center p-8">
              <div className="text-center">
                <Camera className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No photo data yet</p>
                <p className="text-xs text-slate-500 mt-1">Photos will appear here once partners start uploading job photos with AI analysis.</p>
              </div>
            </div>
          )}
        </div>

        {/* Coverage gap alert */}
        {approvedPartners.length < 5 && (
          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-300">Coverage Gap Detected</p>
              <p className="text-xs text-yellow-400/80 mt-0.5">
                You have {approvedPartners.length} active partner{approvedPartners.length !== 1 ? "s" : ""}. Target 10+ partners per metro area for full neighborhood coverage and faster lead routing.
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
