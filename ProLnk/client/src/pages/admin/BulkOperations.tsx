import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers, Mail, TrendingUp, Download, UserX, StickyNote,
  CheckSquare, Square, CheckCircle, XCircle, Loader2, Clock,
  Upload, AlertTriangle, Calendar, Users, FileText, DollarSign
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

const PARTNERS = [
  { id: 1, name: "Marcus Chen", trade: "HVAC", tier: "Founding", status: "Active", location: "Austin, TX", joined: "2026-02-01" },
  { id: 2, name: "Sarah Williams", trade: "Plumbing", tier: "Charter", status: "Active", location: "Denver, CO", joined: "2026-02-14" },
  { id: 3, name: "James Rodriguez", trade: "Electrical", tier: "Founding", status: "Active", location: "Phoenix, AZ", joined: "2026-02-20" },
  { id: 4, name: "Emily Foster", trade: "Roofing", tier: "Charter", status: "Inactive", location: "Seattle, WA", joined: "2026-03-01" },
  { id: 5, name: "David Park", trade: "HVAC", tier: "L3", status: "Active", location: "Chicago, IL", joined: "2026-03-10" },
  { id: 6, name: "Priya Sharma", trade: "Landscaping", tier: "Charter", status: "Active", location: "Miami, FL", joined: "2026-03-15" },
  { id: 7, name: "Tom Bradley", trade: "Painting", tier: "Founding", status: "Active", location: "Nashville, TN", joined: "2026-03-22" },
  { id: 8, name: "Angela Moore", trade: "Electrical", tier: "Charter", status: "Pending", location: "Portland, OR", joined: "2026-04-02" },
  { id: 9, name: "Kevin Torres", trade: "Plumbing", tier: "Charter", status: "Active", location: "San Diego, CA", joined: "2026-04-08" },
  { id: 10, name: "Lisa Nguyen", trade: "HVAC", tier: "L3", status: "Active", location: "Atlanta, GA", joined: "2026-04-15" },
];

const QUEUE_JOBS = [
  { id: "BLK-001", name: "Charter tier email blast", status: "completed", records: 312, duration: "2m 14s", date: "2026-05-12" },
  { id: "BLK-002", name: "Inactive partner deactivation", status: "completed", records: 18, duration: "0m 42s", date: "2026-05-10" },
  { id: "BLK-003", name: "Founding tier CSV export", status: "failed", records: 0, duration: "—", date: "2026-05-08" },
  { id: "BLK-004", name: "Monthly tier recalculation", status: "running", records: 156, duration: "running", date: "2026-05-14" },
  { id: "BLK-005", name: "NPS survey blast", status: "completed", records: 489, duration: "3m 08s", date: "2026-05-07" },
];

const SCHEDULED_JOBS = [
  { name: "Weekly inactive partner email", next: "2026-05-18", frequency: "Weekly", target: "Inactive > 14 days" },
  { name: "Monthly tier recalculation", next: "2026-06-01", frequency: "Monthly", target: "All active partners" },
  { name: "Quarterly NPS survey", next: "2026-07-01", frequency: "Quarterly", target: "Active partners > 90 days" },
];

const TABS = ["Partners", "Leads", "Homeowners", "Payments"];

const tierBadge = (tier: string) => {
  if (tier === "Founding") return <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">Founding</Badge>;
  if (tier === "Charter") return <Badge className="bg-teal-500/20 text-teal-400 border-0 text-xs">Charter</Badge>;
  if (tier === "L3") return <Badge className="bg-purple-500/20 text-purple-400 border-0 text-xs">L3</Badge>;
  return <Badge className="bg-slate-600/40 text-slate-400 border-0 text-xs">{tier}</Badge>;
};

const statusBadge = (status: string) => {
  if (status === "Active") return <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Active</Badge>;
  if (status === "Inactive") return <Badge className="bg-slate-600/40 text-slate-400 border-0 text-xs">Inactive</Badge>;
  return <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">Pending</Badge>;
};

const jobStatusIcon = (status: string) => {
  if (status === "completed") return <CheckCircle className="h-4 w-4 text-emerald-400" />;
  if (status === "failed") return <XCircle className="h-4 w-4 text-red-400" />;
  return <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />;
};

const jobStatusBadge = (status: string) => {
  if (status === "completed") return <Badge className="bg-emerald-500/20 text-emerald-400 border-0 text-xs">Completed</Badge>;
  if (status === "failed") return <Badge className="bg-red-500/20 text-red-400 border-0 text-xs">Failed</Badge>;
  return <Badge className="bg-blue-500/20 text-blue-400 border-0 text-xs">Running</Badge>;
};

export default function BulkOperations() {
  const [activeTab, setActiveTab] = useState("Partners");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(PARTNERS.map((p) => p.id));
      setSelectAll(true);
    }
  };

  const toggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    setSelectAll(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="h-6 w-6 text-teal-400" />
              Bulk Operations
            </h1>
            <p className="text-slate-400 mt-1">Mass actions for partners, leads, homeowners, and payments</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-500 text-white gap-2">
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
        </div>

        <div className="flex gap-1 bg-slate-800/60 border border-slate-700 rounded-lg p-1 w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Partners" && (
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-400" /> Partner Selection
                </CardTitle>
                {selected.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Affected: <span className="text-white font-medium">{selected.length} partners</span></span>
                    {selected.length > 50 && (
                      <Badge className="bg-red-500/20 text-red-400 border-0 text-xs flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Large operation
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              {selected.length > 0 && (
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                  <Button size="sm" className="h-7 text-xs bg-blue-600/80 hover:bg-blue-600 text-white border-0 gap-1">
                    <Mail className="h-3 w-3" /> Send Email
                  </Button>
                  <Button size="sm" className="h-7 text-xs bg-purple-600/80 hover:bg-purple-600 text-white border-0 gap-1">
                    <TrendingUp className="h-3 w-3" /> Change Tier
                  </Button>
                  <Button size="sm" className="h-7 text-xs bg-emerald-600/80 hover:bg-emerald-600 text-white border-0 gap-1">
                    <Download className="h-3 w-3" /> Export CSV
                  </Button>
                  <Button size="sm" className="h-7 text-xs bg-amber-600/80 hover:bg-amber-600 text-white border-0 gap-1">
                    <StickyNote className="h-3 w-3" /> Add Note
                  </Button>
                  <Button size="sm" className="h-7 text-xs bg-red-600/80 hover:bg-red-600 text-white border-0 gap-1">
                    <UserX className="h-3 w-3" /> Deactivate
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {selected.length > 50 && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-red-300">Large bulk operation — requires confirmation before proceeding</span>
                </div>
              )}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="pb-2 pr-3 w-8">
                        <button onClick={toggleAll} className="text-slate-400 hover:text-white">
                          {selectAll ? <CheckSquare className="h-4 w-4 text-teal-400" /> : <Square className="h-4 w-4" />}
                        </button>
                      </th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Name</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Trade</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Tier</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Status</th>
                      <th className="text-left text-slate-400 font-medium pb-2 pr-4">Location</th>
                      <th className="text-left text-slate-400 font-medium pb-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PARTNERS.map((p) => (
                      <tr
                        key={p.id}
                        className={`border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors cursor-pointer ${
                          selected.includes(p.id) ? "bg-teal-600/5" : ""
                        }`}
                        onClick={() => toggleOne(p.id)}
                      >
                        <td className="py-3 pr-3">
                          {selected.includes(p.id)
                            ? <CheckSquare className="h-4 w-4 text-teal-400" />
                            : <Square className="h-4 w-4 text-slate-600" />}
                        </td>
                        <td className="py-3 pr-4 text-white font-medium">{p.name}</td>
                        <td className="py-3 pr-4 text-slate-300">{p.trade}</td>
                        <td className="py-3 pr-4">{tierBadge(p.tier)}</td>
                        <td className="py-3 pr-4">{statusBadge(p.status)}</td>
                        <td className="py-3 pr-4 text-slate-400">{p.location}</td>
                        <td className="py-3 text-slate-400">{p.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab !== "Partners" && (
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="pt-10 pb-10 text-center">
              <div className="text-slate-500 text-sm">
                {activeTab === "Leads" && <FileText className="h-8 w-8 mx-auto mb-3 text-slate-600" />}
                {activeTab === "Homeowners" && <Users className="h-8 w-8 mx-auto mb-3 text-slate-600" />}
                {activeTab === "Payments" && <DollarSign className="h-8 w-8 mx-auto mb-3 text-slate-600" />}
                <p className="text-slate-400">{activeTab} bulk operations available post-launch</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-400" /> Recent Bulk Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {QUEUE_JOBS.map((job) => (
                  <div key={job.id} className="flex items-center gap-3 p-3 bg-slate-700/20 rounded-lg">
                    {jobStatusIcon(job.status)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate">{job.name}</div>
                      <div className="text-xs text-slate-400">{job.id} · {job.date} · {job.records} records · {job.duration}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {jobStatusBadge(job.status)}
                      {job.status === "completed" && (
                        <button className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-teal-400">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-teal-400" /> Scheduled Bulk Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SCHEDULED_JOBS.map((job) => (
                  <div key={job.name} className="p-3 bg-slate-700/20 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm text-white font-medium">{job.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{job.target}</div>
                      </div>
                      <Badge className="bg-slate-600/40 text-slate-400 border-0 text-xs shrink-0">{job.frequency}</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">Next run: <span className="text-teal-400">{job.next}</span></span>
                      <Button size="sm" className="h-6 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 border-0">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/60 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Upload className="h-4 w-4 text-teal-400" /> CSV Import Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-teal-500/50 transition-colors">
              <Upload className="h-8 w-8 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 text-sm font-medium mb-1">Drop CSV file here or click to upload</p>
              <p className="text-slate-500 text-xs mb-3">Max 10MB · Supports .csv format</p>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white border-0 gap-2">
                <Upload className="h-3.5 w-3.5" /> Choose File
              </Button>
            </div>
            <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
              <p className="text-xs text-slate-400 font-medium mb-2">Required CSV columns:</p>
              <div className="flex flex-wrap gap-1.5">
                {["first_name", "last_name", "email", "phone", "trade", "zip_code", "tier"].map((col) => (
                  <code key={col} className="text-xs bg-slate-700 text-teal-300 px-2 py-0.5 rounded">{col}</code>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
