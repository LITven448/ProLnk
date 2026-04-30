/**
 * Admin Waitlist Manager
 * Unified view of ProLnk pro waitlist + TrustyPro homeowner waitlist.
 * Includes: stats, filterable tables, status updates, bulk approve, and launch switch.
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Users, Home as HomeIcon, CheckCircle, XCircle, Clock, Mail,
  Search, ChevronDown, ChevronUp, Zap, BarChart3, Send, Filter, Download
} from "lucide-react";

type StatusFilter = "all" | "pending" | "approved" | "rejected" | "invited";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  invited: "bg-blue-100 text-blue-800",
};

export default function WaitlistManager() {
  const [tab, setTab] = useState<"pros" | "homes">("pros");
  const [proStatus, setProStatus] = useState<StatusFilter>("all");
  const [homeStatus, setHomeStatus] = useState<StatusFilter>("all");
  const [proSearch, setProSearch] = useState("");
  const [homeSearch, setHomeSearch] = useState("");
  const [expandedPro, setExpandedPro] = useState<number | null>(null);
  const [expandedHome, setExpandedHome] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState<Record<number, string>>({});
  const [confirmBulk, setConfirmBulk] = useState(false);

  const utils = trpc.useUtils();

  const stats = trpc.waitlist.getWaitlistStats.useQuery(undefined, { refetchInterval: 30000 });
  const pros = trpc.waitlist.getProWaitlist.useQuery({ status: proStatus, limit: 500 });
  const homes = trpc.waitlist.getHomeWaitlist.useQuery({ status: homeStatus, limit: 500 });

  const updatePro = trpc.waitlist.updateProStatus.useMutation({
    onSuccess: () => { utils.waitlist.getProWaitlist.invalidate(); utils.waitlist.getWaitlistStats.invalidate(); toast.success("Status updated"); },
    onError: (e) => toast.error(e.message),
  });
  const updateHome = trpc.waitlist.updateHomeStatus.useMutation({
    onSuccess: () => { utils.waitlist.getHomeWaitlist.invalidate(); utils.waitlist.getWaitlistStats.invalidate(); toast.success("Status updated"); },
    onError: (e) => toast.error(e.message),
  });
  const activateAndInvite = trpc.waitlist.activateAndInvite.useMutation({
    onSuccess: (data) => {
      utils.waitlist.getProWaitlist.invalidate();
      utils.waitlist.getHomeWaitlist.invalidate();
      utils.waitlist.getWaitlistStats.invalidate();
      toast.success(`Invite sent to ${data.name} (${data.email})`);
    },
    onError: (e) => toast.error(`Invite failed: ${e.message}`),
  });

  const bulkApprove = trpc.waitlist.bulkApproveAll.useMutation({
    onSuccess: (data) => {
      utils.waitlist.getProWaitlist.invalidate();
      utils.waitlist.getHomeWaitlist.invalidate();
      utils.waitlist.getWaitlistStats.invalidate();
      toast.success(`${data.updated} entries approved`);
      setConfirmBulk(false);
    },
    onError: (e) => toast.error(e.message),
  });

  // CSV export helper
  function exportToCsv(rows: any[], filename: string) {
    if (!rows.length) { toast.error("No data to export"); return; }
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map(row =>
        headers.map(h => {
          const val = row[h];
          if (val === null || val === undefined) return "";
          const str = Array.isArray(val) ? val.join(";") : String(val).replace(/"/g, '""');
          return str.includes(",") || str.includes('"') || str.includes("\n") ? `"${str}"` : str;
        }).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} rows to ${filename}`);
  }

  const filteredPros = (pros.data || []).filter(p =>
    !proSearch || `${p.firstName} ${p.lastName} ${p.businessName} ${p.email} ${p.primaryCity}`.toLowerCase().includes(proSearch.toLowerCase())
  );
  const filteredHomes = (homes.data || []).filter(h =>
    !homeSearch || `${h.firstName} ${h.lastName} ${h.email} ${h.city} ${h.address}`.toLowerCase().includes(homeSearch.toLowerCase())
  );

  const s = stats.data;

  return (
    <AdminLayout>
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">Waitlist Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Review and approve ProLnk pro and TrustyPro homeowner waitlist applications.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Pros", value: s?.pros.total ?? "—", icon: <Users className="w-4 h-4" />, color: "text-blue-600" },
            { label: "Pros Pending", value: s?.pros.pending ?? "—", icon: <Clock className="w-4 h-4" />, color: "text-yellow-600" },
            { label: "Total Homes", value: s?.homes.total ?? "—", icon: <HomeIcon className="w-4 h-4" />, color: "text-indigo-600" },
            { label: "Homes Pending", value: s?.homes.pending ?? "—", icon: <Clock className="w-4 h-4" />, color: "text-yellow-600" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className={`flex items-center gap-2 text-sm font-medium mb-1 ${stat.color}`}>
                {stat.icon} {stat.label}
              </div>
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Progress toward goals */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            { label: "ProLnk Pro Goal", current: s?.pros.total ?? 0, goal: 1000, color: "#0A1628", accent: "#F5E642" },
            { label: "TrustyPro Home Goal", current: s?.homes.total ?? 0, goal: 10000, color: "#4F46E5", accent: "#818CF8" },
          ].map(g => {
            const pct = Math.min(100, Math.round(((g.current as number) / g.goal) * 100));
            return (
              <div key={g.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">{g.label}</span>
                  <span className="text-sm font-bold" style={{ color: g.color }}>{g.current as number} / {g.goal.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: g.color }} />
                </div>
                <div className="text-xs text-gray-400 mt-1.5">{pct}% of goal</div>
              </div>
            );
          })}
        </div>

        {/* Export Actions */}
        <div className="flex gap-2 mb-4 justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1.5 border-gray-300"
            onClick={() => exportToCsv(pros.data ?? [], `prolnk-pro-waitlist-${new Date().toISOString().split('T')[0]}.csv`)}
            disabled={!pros.data?.length}
          >
            <Download className="w-3.5 h-3.5" />
            Export Pros CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1.5 border-gray-300"
            onClick={() => exportToCsv(homes.data ?? [], `trustypro-homeowner-waitlist-${new Date().toISOString().split('T')[0]}.csv`)}
            disabled={!homes.data?.length}
          >
            <Download className="w-3.5 h-3.5" />
            Export Homeowners CSV
          </Button>
        </div>
        {/* Bulk Actions */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-amber-900 text-sm">Launch Switch</div>
            <div className="text-xs text-amber-700 mt-0.5">Bulk approve all pending entries when you're ready to open access. This cannot be undone.</div>
          </div>
          <div className="flex gap-2">
            {!confirmBulk ? (
              <Button onClick={() => setConfirmBulk(true)} variant="outline" className="border-amber-400 text-amber-800 bg-amber-50 hover:bg-amber-100 text-sm">
                <Zap className="w-4 h-4 mr-1.5" /> Approve All Pending
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => bulkApprove.mutate({ type: "pros" })} disabled={bulkApprove.isPending}
                  className="bg-blue-600 text-white text-xs">
                  Approve All Pros
                </Button>
                <Button onClick={() => bulkApprove.mutate({ type: "homes" })} disabled={bulkApprove.isPending}
                  className="bg-indigo-600 text-white text-xs">
                  Approve All Homes
                </Button>
                <Button onClick={() => setConfirmBulk(false)} variant="outline" className="text-xs">Cancel</Button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-200 rounded-xl p-1 mb-6 w-fit">
          {(["pros", "homes"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
              {t === "pros" ? `Service Pros (${s?.pros.total ?? 0})` : `Homeowners (${s?.homes.total ?? 0})`}
            </button>
          ))}
        </div>

        {/* Pro Table */}
        {tab === "pros" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input value={proSearch} onChange={e => setProSearch(e.target.value)} placeholder="Search by name, business, city..." className="pl-9 text-sm" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {(["all", "pending", "approved", "rejected", "invited"] as StatusFilter[]).map(s => (
                  <button key={s} onClick={() => setProStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${proStatus === s ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {pros.isLoading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : filteredPros.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No results found.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredPros.map((pro: any) => (
                  <div key={pro.id}>
                    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedPro(expandedPro === pro.id ? null : pro.id)}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-gray-900">{pro.firstName} {pro.lastName}</span>
                          <span className="text-xs text-gray-500">{pro.businessName}</span>
                          <Badge className={`text-xs ${STATUS_COLORS[pro.status] || "bg-gray-100 text-gray-600"}`}>{pro.status}</Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex flex-wrap gap-3">
                          <span>{pro.email}</span>
                          <span>{pro.primaryCity}, {pro.primaryState}</span>
                          <span>{Array.isArray(pro.trades) ? pro.trades.join(", ") : (typeof pro.trades === "string" ? JSON.parse(pro.trades).join(", ") : "")}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 hidden sm:block">{new Date(pro.createdAt).toLocaleDateString()}</div>
                      {expandedPro === pro.id ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </div>
                    {expandedPro === pro.id && (
                      <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 text-xs">
                          <div><span className="text-gray-400 block">Phone</span>{pro.phone}</div>
                          <div><span className="text-gray-400 block">Business Type</span>{pro.businessType}</div>
                          <div><span className="text-gray-400 block">Years in Business</span>{pro.yearsInBusiness}</div>
                          <div><span className="text-gray-400 block">Team Size</span>{pro.employeeCount}</div>
                          <div><span className="text-gray-400 block">Jobs/Month</span>{pro.estimatedJobsPerMonth}</div>
                          <div><span className="text-gray-400 block">Avg Job Value</span>{pro.avgJobValue}</div>
                          <div><span className="text-gray-400 block">Referrals Given</span>{pro.referralsGivenPerMonth}/mo</div>
                          <div><span className="text-gray-400 block">Referrals Received</span>{pro.referralsReceivedPerMonth}/mo</div>
                          <div className="col-span-2"><span className="text-gray-400 block">Service Zips</span>{pro.serviceZipCodes}</div>
                          <div className="col-span-2"><span className="text-gray-400 block">Software</span>{Array.isArray(pro.currentSoftware) ? pro.currentSoftware.join(", ") : (typeof pro.currentSoftware === "string" ? JSON.parse(pro.currentSoftware).join(", ") : "")}</div>
                          <div className="col-span-2"><span className="text-gray-400 block">Primary Goal</span>{pro.primaryGoal}</div>
                          {pro.additionalNotes && <div className="col-span-4"><span className="text-gray-400 block">Notes from Applicant</span>{pro.additionalNotes}</div>}
                        </div>
                        <div className="mt-3">
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Admin Notes</label>
                          <Textarea value={editNotes[pro.id] ?? pro.adminNotes ?? ""} onChange={e => setEditNotes(n => ({ ...n, [pro.id]: e.target.value }))}
                            className="text-xs min-h-[60px] resize-none" placeholder="Internal notes..." />
                        </div>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {(["approved", "rejected", "invited", "pending"] as const).map(s => (
                            <Button key={s} size="sm"
                              disabled={updatePro.isPending}
                              onClick={() => updatePro.mutate({ id: pro.id, status: s, adminNotes: editNotes[pro.id] ?? pro.adminNotes ?? undefined })}
                              className={`text-xs ${pro.status === s ? "ring-2 ring-offset-1 ring-gray-400" : ""} ${s === "approved" ? "bg-green-600 text-white hover:bg-green-700" : s === "rejected" ? "bg-red-600 text-white hover:bg-red-700" : s === "invited" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                              {s === "approved" ? <CheckCircle className="w-3 h-3 mr-1" /> : s === "rejected" ? <XCircle className="w-3 h-3 mr-1" /> : s === "invited" ? <Send className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                              Mark {s}
                            </Button>
                          ))}
                          <Button size="sm" variant="outline" className="text-xs bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100"
                            disabled={activateAndInvite.isPending}
                            onClick={() => activateAndInvite.mutate({ id: pro.id, type: 'pro', origin: window.location.origin })}>
                            <Zap className="w-3 h-3 mr-1" /> Send Invite Email
                          </Button>
                          <a href={`mailto:${pro.email}`} className="ml-auto">
                            <Button size="sm" variant="outline" className="text-xs">
                              <Mail className="w-3 h-3 mr-1" /> Email
                            </Button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Home Table */}
        {tab === "homes" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input value={homeSearch} onChange={e => setHomeSearch(e.target.value)} placeholder="Search by name, address, city..." className="pl-9 text-sm" />
              </div>
              <div className="flex gap-1 flex-wrap">
                {(["all", "pending", "approved", "rejected", "invited"] as StatusFilter[]).map(s => (
                  <button key={s} onClick={() => setHomeStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${homeStatus === s ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {homes.isLoading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : filteredHomes.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No results found.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredHomes.map((home: any) => (
                  <div key={home.id}>
                    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedHome(expandedHome === home.id ? null : home.id)}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-gray-900">{home.firstName} {home.lastName}</span>
                          <Badge className={`text-xs ${STATUS_COLORS[home.status] || "bg-gray-100 text-gray-600"}`}>{home.status}</Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex flex-wrap gap-3">
                          <span>{home.email}</span>
                          <span>{home.address}, {home.city}, {home.state} {home.zipCode}</span>
                          <span>{home.homeType?.replace("_", " ")}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 hidden sm:block">{new Date(home.createdAt).toLocaleDateString()}</div>
                      {expandedHome === home.id ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                    </div>
                    {expandedHome === home.id && (
                      <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 text-xs">
                          <div><span className="text-gray-400 block">Year Built</span>{home.yearBuilt || "—"}</div>
                          <div><span className="text-gray-400 block">Sq Footage</span>{home.squareFootage ? `${home.squareFootage.toLocaleString()} sqft` : "—"}</div>
                          <div><span className="text-gray-400 block">Beds / Baths</span>{home.bedrooms || "—"} bd / {home.bathrooms || "—"} ba</div>
                          <div><span className="text-gray-400 block">Condition</span>{home.overallCondition?.replace("_", " ") || "—"}</div>
                          <div><span className="text-gray-400 block">Ownership</span>{home.ownershipStatus}</div>
                          <div><span className="text-gray-400 block">Years Owned</span>{home.yearsOwned ?? "—"}</div>
                          <div><span className="text-gray-400 block">Timeline</span>{home.projectTimeline?.replace("_", " ")}</div>
                          <div><span className="text-gray-400 block">Budget</span>{home.estimatedBudget || "—"}</div>
                          <div className="col-span-2 md:col-span-4">
                            <span className="text-gray-400 block">Desired Projects</span>
                            {Array.isArray(home.desiredProjects) ? home.desiredProjects.join(", ") : (typeof home.desiredProjects === "string" ? JSON.parse(home.desiredProjects).join(", ") : "—")}
                          </div>
                          {home.recentImprovements && (
                            <div className="col-span-2 md:col-span-4">
                              <span className="text-gray-400 block">Recent Improvements</span>
                              {Array.isArray(home.recentImprovements) ? home.recentImprovements.join(", ") : (typeof home.recentImprovements === "string" ? JSON.parse(home.recentImprovements).join(", ") : "—")}
                            </div>
                          )}
                          {home.additionalNotes && <div className="col-span-4"><span className="text-gray-400 block">Notes from Applicant</span>{home.additionalNotes}</div>}
                        </div>
                        <div className="mt-3">
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">Admin Notes</label>
                          <Textarea value={editNotes[home.id] ?? home.adminNotes ?? ""} onChange={e => setEditNotes(n => ({ ...n, [home.id]: e.target.value }))}
                            className="text-xs min-h-[60px] resize-none" placeholder="Internal notes..." />
                        </div>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {(["approved", "rejected", "invited", "pending"] as const).map(s => (
                            <Button key={s} size="sm"
                              disabled={updateHome.isPending}
                              onClick={() => updateHome.mutate({ id: home.id, status: s, adminNotes: editNotes[home.id] ?? home.adminNotes ?? undefined })}
                              className={`text-xs ${home.status === s ? "ring-2 ring-offset-1 ring-gray-400" : ""} ${s === "approved" ? "bg-green-600 text-white hover:bg-green-700" : s === "rejected" ? "bg-red-600 text-white hover:bg-red-700" : s === "invited" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                              {s === "approved" ? <CheckCircle className="w-3 h-3 mr-1" /> : s === "rejected" ? <XCircle className="w-3 h-3 mr-1" /> : s === "invited" ? <Send className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                              Mark {s}
                            </Button>
                          ))}
                          <Button size="sm" variant="outline" className="text-xs bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100"
                            disabled={activateAndInvite.isPending}
                            onClick={() => activateAndInvite.mutate({ id: home.id, type: 'home', origin: window.location.origin })}>
                            <Zap className="w-3 h-3 mr-1" /> Send Invite Email
                          </Button>
                          <a href={`mailto:${home.email}`} className="ml-auto">
                            <Button size="sm" variant="outline" className="text-xs">
                              <Mail className="w-3 h-3 mr-1" /> Email
                            </Button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}
