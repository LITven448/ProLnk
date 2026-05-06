import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { MapPin, Camera, Clock, CheckCircle2, XCircle, Star, Filter, Download } from "lucide-react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  job_start: "bg-blue-100 text-blue-800",
  job_progress: "bg-amber-100 text-amber-800",
  job_complete: "bg-green-100 text-green-800",
  site_visit: "bg-purple-100 text-purple-800",
  estimate: "bg-gray-100 text-gray-800",
};

export default function PartnerCheckIns() {
  const [filter, setFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("7d");

  // Placeholder data until tRPC endpoint is wired
  const checkIns = [
    { id: 1, partnerName: "ABC Plumbing", checkInType: "job_start", address: "1234 Main St, Dallas TX 75201", verifiedByGeo: true, verifiedByPhoto: true, verifiedByHomeowner: false, homeownerRating: null, createdAt: new Date().toISOString(), photoUrl: null },
    { id: 2, partnerName: "XYZ Roofing", checkInType: "job_complete", address: "5678 Oak Ave, Plano TX 75024", verifiedByGeo: true, verifiedByPhoto: true, verifiedByHomeowner: true, homeownerRating: 5, createdAt: new Date(Date.now() - 86400000).toISOString(), photoUrl: null },
    { id: 3, partnerName: "Elite Electric", checkInType: "estimate", address: "910 Elm St, Frisco TX 75034", verifiedByGeo: false, verifiedByPhoto: false, verifiedByHomeowner: false, homeownerRating: null, createdAt: new Date(Date.now() - 172800000).toISOString(), photoUrl: null },
  ];

  const filtered = filter === "all" ? checkIns : checkIns.filter(c => c.checkInType === filter);

  const stats = {
    total: checkIns.length,
    geoVerified: checkIns.filter(c => c.verifiedByGeo).length,
    photoVerified: checkIns.filter(c => c.verifiedByPhoto).length,
    homeownerVerified: checkIns.filter(c => c.verifiedByHomeowner).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Check-Ins</h1>
          <p className="text-sm text-gray-500 mt-1">Job site verification and partner activity tracking</p>
        </div>
        <button onClick={() => toast.info("Export coming soon")} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 mt-1">Total Check-Ins</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.geoVerified}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">GPS Verified</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{stats.photoVerified}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Photo Verified</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.homeownerVerified}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">Homeowner Confirmed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-gray-400" />
        {["all", "job_start", "job_progress", "job_complete", "site_visit", "estimate"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {f === "all" ? "All" : f.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Check-In Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Partner</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Address</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">GPS</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Photo</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Homeowner</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{c.partnerName}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[c.checkInType] || "bg-gray-100"}`}>
                    {c.checkInType.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{c.address}</td>
                <td className="px-4 py-3 text-center">{c.verifiedByGeo ? <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">{c.verifiedByPhoto ? <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">
                  {c.verifiedByHomeowner ? (
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      {c.homeownerRating && <span className="text-xs text-amber-600">{c.homeownerRating}★</span>}
                    </div>
                  ) : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(c.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
