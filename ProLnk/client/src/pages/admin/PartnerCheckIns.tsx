import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { MapPin, Camera, Clock, CheckCircle, XCircle, Star, Filter, Download, AlertTriangle, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { DCard } from "@/components/DashboardShared";

const STATUS_COLORS: Record<string, string> = {
  job_start: "bg-blue-100 text-blue-800",
  job_progress: "bg-amber-100 text-amber-800",
  job_complete: "bg-green-100 text-green-800",
  site_visit: "bg-purple-100 text-purple-800",
  estimate: "bg-gray-100 text-gray-800",
};

const RISK_COLORS = {
  High: "bg-red-100 text-red-700",
  Med: "bg-amber-100 text-amber-700",
  Low: "bg-green-100 text-green-700",
};

const ROW_COLORS = {
  High: "bg-red-50",
  Med: "bg-amber-50",
  Low: "bg-green-50",
};

const PARTNER_ENGAGEMENT = [
  { id: 1, name: "Sun Valley HVAC", tier: "Elite", daysSince: 42, risk: "High" as const, lastOutcome: "Skipped follow-up", scheduled: false },
  { id: 2, name: "ProFix Plumbing", tier: "Pro", daysSince: 38, risk: "High" as const, lastOutcome: "Needs support", scheduled: false },
  { id: 3, name: "Volt Masters Electric", tier: "Rising", daysSince: 34, risk: "High" as const, lastOutcome: "Interested in referrals", scheduled: false },
  { id: 4, name: "ABC Plumbing", tier: "Pro", daysSince: 22, risk: "Med" as const, lastOutcome: "On track", scheduled: false },
  { id: 5, name: "XYZ Roofing", tier: "Elite", daysSince: 18, risk: "Med" as const, lastOutcome: "Expanding team", scheduled: false },
  { id: 6, name: "Elite Electric", tier: "Rising", daysSince: 16, risk: "Med" as const, lastOutcome: "Asked about tier upgrade", scheduled: false },
  { id: 7, name: "Sunrise Painting", tier: "New", daysSince: 10, risk: "Low" as const, lastOutcome: "Strong start", scheduled: false },
  { id: 8, name: "Dallas General Contractors", tier: "Legend", daysSince: 7, risk: "Low" as const, lastOutcome: "Happy, wants more leads", scheduled: false },
  { id: 9, name: "North TX Landscaping", tier: "Pro", daysSince: 5, risk: "Low" as const, lastOutcome: "Referred 2 new pros", scheduled: false },
  { id: 10, name: "HomeGuard HVAC", tier: "Elite", daysSince: 3, risk: "Low" as const, lastOutcome: "Top performer", scheduled: false },
];

const RECENT_COMPLETED = [
  { id: 1, partner: "Apex Roofing", date: "May 14", outcome: "Retained", note: "Partner agreed to 2 more leads/week" },
  { id: 2, partner: "Blue Sky Plumbing", date: "May 13", outcome: "Escalated", note: "Billing dispute — routed to support" },
  { id: 3, partner: "ClearView Windows", date: "May 12", outcome: "Retained", note: "Upgraded to Elite tier" },
  { id: 4, partner: "QuickFix General", date: "May 11", outcome: "At Risk", note: "Considering competitor platform" },
  { id: 5, partner: "Prestige Electrical", date: "May 10", outcome: "Retained", note: "Very satisfied with lead quality" },
];

const OUTCOME_COLORS: Record<string, string> = {
  Retained: "bg-green-100 text-green-700",
  Escalated: "bg-red-100 text-red-700",
  "At Risk": "bg-amber-100 text-amber-700",
};

export default function PartnerCheckIns() {
  const [filter, setFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("7d");
  const [partners, setPartners] = useState(PARTNER_ENGAGEMENT);

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

  function scheduleAll() {
    setPartners(prev => prev.map(p => p.daysSince > 30 ? { ...p, scheduled: true } : p));
    toast.success("Scheduled check-ins for all 3 overdue partners");
  }

  function scheduleOne(id: number) {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, scheduled: true } : p));
    toast.success("Check-in scheduled");
  }

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

      {/* Churn Risk Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 text-gray-900">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm font-semibold">3 partners haven&apos;t had a check-in in 30+ days — at churn risk</span>
        <button onClick={scheduleAll} className="ml-auto px-3 py-1.5 bg-white text-red-600 rounded-lg text-xs font-bold hover:bg-red-50 transition-colors whitespace-nowrap">
          Schedule check-ins for all overdue
        </button>
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-4 gap-4">
        <DCard className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-gray-500">Due Today</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">8</div>
        </DCard>
        <DCard className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-gray-500">Overdue</span>
          </div>
          <div className="text-2xl font-bold text-red-600">3</div>
        </DCard>
        <DCard className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-500">Completed This Week</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">24</div>
        </DCard>
        <DCard className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-gray-500">Avg Response</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">4.2h</div>
        </DCard>
      </div>

      {/* Partner Engagement Table */}
      <DCard>
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Partner Engagement Status</h2>
          <Users className="w-4 h-4 text-gray-400" />
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Partner</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Tier</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Days Since</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Risk</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Last Outcome</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(p => (
                <tr key={p.id} className={`border-b last:border-0 ${ROW_COLORS[p.risk]}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-gray-600">{p.tier}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gray-800">{p.daysSince}d</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${RISK_COLORS[p.risk]}`}>{p.risk}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{p.lastOutcome}</td>
                  <td className="px-4 py-3 text-center">
                    {p.scheduled ? (
                      <span className="text-xs text-green-600 font-semibold">Scheduled ✓</span>
                    ) : (
                      <button onClick={() => scheduleOne(p.id)} className="px-3 py-1 bg-blue-600 text-gray-900 rounded-lg text-xs hover:bg-blue-700 transition-colors">
                        Schedule
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DCard>

      {/* Recent Completed Check-ins */}
      <DCard>
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-900">Recent Completed Check-Ins</h2>
        </div>
        <div className="divide-y">
          {RECENT_COMPLETED.map(item => (
            <div key={item.id} className="px-4 py-3 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm">{item.partner}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${OUTCOME_COLORS[item.outcome] || "bg-gray-100 text-gray-600"}`}>{item.outcome}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{item.date}</span>
            </div>
          ))}
        </div>
      </DCard>

      {/* Existing Check-In Stats */}
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
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-[#F8FAFC] text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
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
                <td className="px-4 py-3 text-center">{c.verifiedByGeo ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">{c.verifiedByPhoto ? <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> : <XCircle className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                <td className="px-4 py-3 text-center">
                  {c.verifiedByHomeowner ? (
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
