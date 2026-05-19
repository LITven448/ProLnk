import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, XCircle, Clock, AlertTriangle, FileText,
  User, MapPin, Calendar, Shield, Camera, Zap, ChevronRight,
  RotateCcw, Star
} from "lucide-react";
import { toast } from "sonner";

const FILTER_OPTIONS = ["All", "Missing Docs", "Ready to Approve", "Flagged"];

const APPLICATIONS = [
  {
    id: "app_001″, name: "Marcus Rivera", trade: "HVAC", city: "Frisco", applied: "May 12, 2026",
    score: 92, licenseUploaded: true, insuranceUploaded: true, backgroundClear: true, photoReady: true,
    autoEligible: true,
  },
  {
    id: "app_002″, name: "Sandra Kim", trade: "Plumbing", city: "Allen", applied: "May 12, 2026",
    score: 88, licenseUploaded: true, insuranceUploaded: true, backgroundClear: true, photoReady: false,
    autoEligible: true,
  },
  {
    id: "app_003″, name: "Tony Okafor", trade: "Electrical", city: "McKinney", applied: "May 11, 2026",
    score: 74, licenseUploaded: true, insuranceUploaded: false, backgroundClear: true, photoReady: false,
    autoEligible: false,
  },
  {
    id: "app_004″, name: "Diana Vasquez", trade: "Roofing", city: "Plano", applied: "May 11, 2026",
    score: 61, licenseUploaded: false, insuranceUploaded: true, backgroundClear: false, photoReady: false,
    autoEligible: false,
  },
  {
    id: "app_005″, name: "Ben Sutherland", trade: "Pest Control", city: "Prosper", applied: "May 10, 2026",
    score: 95, licenseUploaded: true, insuranceUploaded: true, backgroundClear: true, photoReady: true,
    autoEligible: true,
  },
  {
    id: "app_006″, name: "Janelle Morris", trade: "Foundation Repair", city: "Garland", applied: "May 10, 2026",
    score: 79, licenseUploaded: true, insuranceUploaded: true, backgroundClear: false, photoReady: true,
    autoEligible: false,
  },
  {
    id: "app_007″, name: "Rafael Cruz", trade: "Landscaping", city: "Southlake", applied: "May 9, 2026",
    score: 86, licenseUploaded: true, insuranceUploaded: true, backgroundClear: true, photoReady: false,
    autoEligible: true,
  },
  {
    id: "app_008″, name: "Heather Lin", trade: "Painting", city: "Carrollton", applied: "May 9, 2026",
    score: 55, licenseUploaded: false, insuranceUploaded: false, backgroundClear: true, photoReady: false,
    autoEligible: false,
  },
];

const RECENT_APPROVALS = [
  { name: "Carlos Mendez", trade: "HVAC", tier: "Founding", time: "Today 10:14am" },
  { name: "Priya Nair", trade: "Electrical", tier: "Charter", time: "Today 9:02am" },
  { name: "James Whitfield", trade: "Plumbing", tier: "Founding", time: "Yesterday 4:31pm" },
  { name: "Angela Torres", trade: "Roofing", tier: "Charter", time: "Yesterday 2:17pm" },
  { name: "Derek Hammond", trade: "HVAC", tier: "L3″, time: "May 13, 11:44am" },
];

function filterApps(apps: typeof APPLICATIONS, filter: string) {
  if (filter === "All") return apps;
  if (filter === "Missing Docs") return apps.filter(a => !a.licenseUploaded || !a.insuranceUploaded || !a.photoReady);
  if (filter === "Ready to Approve") return apps.filter(a => a.score >= 85);
  if (filter === "Flagged") return apps.filter(a => !a.backgroundClear);
  return apps;
}

function CheckRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok
        ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0″ />
        : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0″ />}
      <span className={ok ? "text-slate-300″ : "text-amber-400"}>{label}</span>
    </div>
  );
}

export default function PartnerVerificationQueue() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [autoApprove, setAutoApprove] = useState(true);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = filterApps(APPLICATIONS, activeFilter).filter(a => !dismissed.has(a.id));

  function approve(id: string, name: string) {
    setDismissed(prev => new Set([...prev, id]));
    toast.success(`${name} approved and notified`);
  }
  function reject(id: string, name: string) {
    setDismissed(prev => new Set([...prev, id]));
    toast.error(`${name} rejected`);
  }
  function requestInfo(name: string) {
    toast.info(`Info request sent to ${name}`);
  }

  return (
    <AdminLayout>
      <div className="space-y-6″>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Partner Verification Queue</h1>
            <p className="text-slate-400 mt-1″>Review and approve incoming partner applications</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${autoApprove ? "bg-emerald-400 animate-pulse" : "bg-slate-500"}`} />
            <span className="text-slate-400″>{autoApprove ? "Auto-approve active" : "Manual review only"}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4″>
          {[
            { label: "Pending Review", value: "12″, icon: Clock, color: "text-amber-400" },
            { label: "Approved Today", value: "4″, icon: CheckCircle, color: "text-emerald-400" },
            { label: "Avg Review Time", value: "2.1 days", icon: Calendar, color: "text-blue-400″ },
            { label: "Auto-Approved", value: "8″, icon: Zap, color: "text-violet-400" },
          ].map(stat => (
            <Card key={stat.label} className="bg-slate-800/50 border-slate-700″>
              <CardContent className="p-4 flex items-center gap-3″>
                <stat.icon className={`w-8 h-8 ${stat.color} shrink-0`} />
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400″>{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Automation toggle */}
        <Card className="bg-violet-900/20 border-violet-700/40″>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3″>
            <div className="flex items-center gap-3″>
              <Zap className="w-5 h-5 text-violet-400 shrink-0″ />
              <div>
                <p className="text-white font-medium text-sm">Auto-approve applicants scoring &gt;85%</p>
                <p className="text-slate-400 text-xs mt-0.5″>Currently: <span className="text-emerald-400 font-medium">8 eligible</span> in queue</p>
              </div>
            </div>
            <button
              onClick={() => { setAutoApprove(p => !p); toast.success(`Auto-approve ${!autoApprove ? "enabled" : "disabled"}`); }}
              className={`relative w-11 h-6 rounded-full transition-colors ${autoApprove ? "bg-violet-500" : "bg-slate-600"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${autoApprove ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-2″>
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700″
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Application cards */}
        <div className="space-y-3″>
          {visible.length === 0 && (
            <Card className="bg-slate-800/40 border-slate-700″>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2″ />
                <p className="text-slate-300 font-medium">No applications in this category</p>
              </CardContent>
            </Card>
          )}
          {visible.map(app => (
            <Card key={app.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
              <CardContent className="p-4″>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4″>

                  {/* Left: identity */}
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center shrink-0″>
                        <User className="w-5 h-5 text-slate-300″ />
                      </div>
                      <div>
                        <div className="flex items-center gap-2″>
                          <span className="text-white font-semibold">{app.name}</span>
                          {app.autoEligible && (
                            <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">
                              <Zap className="w-2.5 h-2.5 mr-1″ /> Auto-approve eligible
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400″>
                          <span className="flex items-center gap-1″><Shield className="w-3 h-3" />{app.trade}</span>
                          <span className="flex items-center gap-1″><MapPin className="w-3 h-3" />{app.city}, TX</span>
                          <span className="flex items-center gap-1″><Calendar className="w-3 h-3" />Applied {app.applied}</span>
                        </div>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="mt-3 grid grid-cols-2 gap-1.5″>
                      <CheckRow label="License uploaded" ok={app.licenseUploaded} />
                      <CheckRow label="Insurance uploaded" ok={app.insuranceUploaded} />
                      <CheckRow label="Background check clear" ok={app.backgroundClear} />
                      <CheckRow label={app.photoReady ? "Photo ready" : "Photo pending"} ok={app.photoReady} />
                    </div>

                    {/* Score bar */}
                    <div className="mt-3″>
                      <div className="flex items-center justify-between mb-1″>
                        <span className="text-xs text-slate-400″>Completeness</span>
                        <span className={`text-xs font-bold ${app.score >= 85 ? "text-emerald-400" : app.score >= 70 ? "text-amber-400" : "text-red-400"}`}>
                          {app.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${app.score >= 85 ? "bg-emerald-500" : app.score >= 70 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${app.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: actions */}
                  <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[140px]">
                    <Button
                      size="sm"
                      className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
                      onClick={() => approve(app.id, app.name)}
                    >
                      <CheckCircle className="w-3.5 h-3.5 mr-1″ /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 lg:flex-none text-xs"
                      onClick={() => reject(app.id, app.name)}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1″ /> Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 lg:flex-none bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 text-xs"
                      onClick={() => requestInfo(app.name)}
                    >
                      <FileText className="w-3.5 h-3.5 mr-1″ /> Request Info
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recently approved */}
        <Card className="bg-slate-800/50 border-slate-700″>
          <CardContent className="p-4″>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2″>
              <Star className="w-4 h-4 text-amber-400″ /> Recently Approved
            </h3>
            <div className="space-y-2″>
              {RECENT_APPROVALS.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0″>
                  <div className="flex items-center gap-2″>
                    <div className="w-7 h-7 rounded-full bg-emerald-900/40 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400″ />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{a.name}</p>
                      <p className="text-slate-400 text-xs">{a.trade}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2″>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">{a.tier}</Badge>
                    <span className="text-slate-500 text-xs">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
