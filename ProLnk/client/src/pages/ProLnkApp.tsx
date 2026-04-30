/**
 * ProLnk Mobile App -- Fully Functional Dashboard
 * Tabs: Dashboard | Jobs | Camera | Referrals | Earnings
 */
import { useState, useEffect } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard, Briefcase, Camera, Send, DollarSign,
  MapPin, Clock, CheckCircle, Play, Navigation, Zap, ArrowRight,
  Sparkles, Star, ChevronRight, Home, Phone, AlertTriangle,
  Image, TrendingUp, Bell, User, CloudSun, Calendar,
  BarChart2, Circle, Timer, XCircle, Eye, Loader2
} from "lucide-react";
import { toast } from "sonner";

// --- Types --------------------------------------------------------------------
type JobStatus = "scheduled" | "en_route" | "in_progress" | "complete";
type ReferralStatus = "submitted" | "under_review" | "approved" | "routed" | "deal_sent" | "closed" | "rejected";

interface Job {
  id: string;
  customerName: string;
  address: string;
  city: string;
  service: string;
  scheduledTime: string;
  estimatedDuration: string;
  status: JobStatus;
  phone: string;
  notes: string;
  routeOrder: number;
  estimatedDrive: string;
  beforePhotos: number;
  afterPhotos: number;
  aiOpportunities: AiOpportunity[];
}

interface AiOpportunity {
  id: string;
  trade: string;
  description: string;
  confidence: number;
  estimatedValue: number;
  yourCommission: number;
  referralStatus?: ReferralStatus;
}

// --- Demo Data -----------------------------------------------------------------
const JOBS: Job[] = [
  {
    id: "job-1", routeOrder: 1,
    customerName: "Jennifer Martinez", address: "4821 Willow Creek Dr", city: "Frisco, TX 75034",
    service: "Lawn Mowing & Edging", scheduledTime: "8:00 AM", estimatedDuration: "45 min",
    estimatedDrive: "12 min", status: "complete", phone: "(214) 555-0142",
    notes: "Gate code: 4821. Dog in backyard -- keep gate closed.",
    beforePhotos: 3, afterPhotos: 3,
    aiOpportunities: [
      { id: "ai-1", trade: "Fence & Deck", description: "2 fence panels showing rot on west side", confidence: 94, estimatedValue: 1400, yourCommission: 70, referralStatus: "deal_sent" },
      { id: "ai-2", trade: "Drainage", description: "Low spot near back patio -- standing water risk", confidence: 78, estimatedValue: 800, yourCommission: 40, referralStatus: "approved" },
    ],
  },
  {
    id: "job-2", routeOrder: 2,
    customerName: "David Richardson", address: "1205 Ridgecrest Ln", city: "Plano, TX 75075",
    service: "Lawn Mowing & Edging", scheduledTime: "9:30 AM", estimatedDuration: "50 min",
    estimatedDrive: "18 min", status: "in_progress", phone: "(972) 555-0287",
    notes: "Side gate is unlocked. Prefer no contact.",
    beforePhotos: 2, afterPhotos: 0, aiOpportunities: [],
  },
  {
    id: "job-3", routeOrder: 3,
    customerName: "Sarah Thompson", address: "3390 Oak Hollow Ct", city: "McKinney, TX 75070",
    service: "Full Yard Service", scheduledTime: "11:00 AM", estimatedDuration: "1 hr 15 min",
    estimatedDrive: "22 min", status: "scheduled", phone: "(469) 555-0391",
    notes: "Trim hedges along driveway.",
    beforePhotos: 0, afterPhotos: 0, aiOpportunities: [],
  },
  {
    id: "job-4", routeOrder: 4,
    customerName: "Michael Brooks", address: "7712 Meadow View Dr", city: "Allen, TX 75013",
    service: "Lawn Mowing", scheduledTime: "1:30 PM", estimatedDuration: "35 min",
    estimatedDrive: "15 min", status: "scheduled", phone: "(214) 555-0448",
    notes: "", beforePhotos: 0, afterPhotos: 0, aiOpportunities: [],
  },
];

const REFERRAL_HISTORY: Array<{ id: string; trade: string; address: string; status: ReferralStatus; submittedAt: Date; commission: number; estimatedValue: number }> = [
  { id: "r1", trade: "Fence & Deck", address: "4821 Willow Creek Dr, Frisco", status: "deal_sent", submittedAt: new Date(Date.now() - 3 * 3600000), commission: 70, estimatedValue: 1400 },
  { id: "r2", trade: "Drainage", address: "4821 Willow Creek Dr, Frisco", status: "approved", submittedAt: new Date(Date.now() - 3 * 3600000), commission: 40, estimatedValue: 800 },
  { id: "r3", trade: "Pest Control", address: "1205 Ridgecrest Ln, Plano", status: "closed", submittedAt: new Date(Date.now() - 2 * 86400000), commission: 16, estimatedValue: 320 },
  { id: "r4", trade: "HVAC", address: "3390 Oak Hollow Ct, McKinney", status: "closed", submittedAt: new Date(Date.now() - 5 * 86400000), commission: 144, estimatedValue: 1800 },
  { id: "r5", trade: "Window Cleaning", address: "2201 Sunset Blvd, Southlake", status: "rejected", submittedAt: new Date(Date.now() - 10 * 86400000), commission: 14, estimatedValue: 280 },
];

const STATUS_CFG: Record<JobStatus, { label: string; color: string; bg: string; border: string; dot: string }> = {
  scheduled:   { label: "Scheduled",   color: "#6B7280", bg: "bg-gray-50",    border: "border-gray-200",   dot: "bg-gray-400"   },
  en_route:    { label: "En Route",    color: "#3B82F6", bg: "bg-blue-50",    border: "border-blue-200",   dot: "bg-blue-500"   },
  in_progress: { label: "In Progress", color: "#F59E0B", bg: "bg-amber-50",   border: "border-amber-200",  dot: "bg-amber-500"  },
  complete:    { label: "Complete",    color: "#10B981", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500"},
};

const REF_CFG: Record<ReferralStatus, { label: string; color: string; bg: string }> = {
  submitted:    { label: "Submitted",    color: "#6B7280", bg: "bg-gray-100"    },
  under_review: { label: "Under Review", color: "#8B5CF6", bg: "bg-purple-100" },
  approved:     { label: "Approved",     color: "#3B82F6", bg: "bg-blue-100"   },
  routed:       { label: "Routed",       color: "#F59E0B", bg: "bg-amber-100"  },
  deal_sent:    { label: "Deal Sent",    color: "#0A1628", bg: "bg-[#0A1628]/10"   },
  closed:       { label: "Closed ",    color: "#10B981", bg: "bg-emerald-100" },
  rejected:     { label: "Rejected",     color: "#EF4444", bg: "bg-red-100"    },
};

function timeAgo(d: Date) {
  const h = Math.floor((Date.now() - d.getTime()) / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// --- Tab: Dashboard ------------------------------------------------------------
function TabDashboard({ jobs, onStartJob }: { jobs: Job[]; onStartJob: (id: string) => void }) {
  const completed = jobs.filter(j => j.status === "complete").length;
  const inProgress = jobs.find(j => j.status === "in_progress");
  const nextJob = jobs.find(j => j.status === "scheduled");
  const todayEarnings = REFERRAL_HISTORY.filter(r => r.status === "closed" && r.submittedAt > new Date(Date.now() - 86400000 * 7)).reduce((s, r) => s + r.commission, 0);
  const pendingEarnings = REFERRAL_HISTORY.filter(r => ["approved", "routed", "deal_sent"].includes(r.status)).reduce((s, r) => s + r.commission, 0);

  return (
    <div className="space-y-5">
      {/* Greeting + weather */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-gray-900">Good morning, Alex</h2>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-sm text-amber-700">
          <CloudSun className="w-4 h-4" />
          <span className="font-medium">78F  Clear</span>
        </div>
      </div>

      {/* Today's progress */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">Today's Progress</span>
            <span className="text-sm font-bold text-gray-900">{completed}/{jobs.length} jobs</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all" style={{ width: `${(completed / jobs.length) * 100}%`, backgroundColor: "#0A1628" }} />
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {(["complete", "in_progress", "en_route", "scheduled"] as JobStatus[]).map(s => {
              const count = jobs.filter(j => j.status === s).length;
              const cfg = STATUS_CFG[s];
              return (
                <div key={s} className={`rounded-lg p-2 ${cfg.bg}`}>
                  <div className="text-lg font-bold" style={{ color: cfg.color }}>{count}</div>
                  <div className="text-xs text-gray-500 leading-tight">{cfg.label}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Earnings summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span className="text-xs text-emerald-700 font-medium">Earned (7 days)</span>
            </div>
            <div className="text-2xl font-heading font-bold text-emerald-700">${todayEarnings}</div>
          </CardContent>
        </Card>
        <Card className="border border-[#0A1628]/20 bg-[#F5E642]/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Timer className="w-4 h-4 text-[#0A1628]" />
              <span className="text-xs text-[#0A1628] font-medium">Pending</span>
            </div>
            <div className="text-2xl font-heading font-bold text-[#0A1628]">${pendingEarnings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active job */}
      {inProgress && (
        <Card className="border-2 border-amber-300 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">In Progress</span>
            </div>
            <p className="font-semibold text-gray-900">{inProgress.customerName}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{inProgress.address}</p>
            <div className="flex gap-2 mt-3">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(inProgress.address + ", " + inProgress.city)}`} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline" className="text-xs"><Navigation className="w-3 h-3 mr-1" />Navigate</Button>
              </a>
              <a href={`tel:${inProgress.phone}`}>
                <Button size="sm" variant="outline" className="text-xs"><Phone className="w-3 h-3 mr-1" />Call</Button>
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next job */}
      {nextJob && !inProgress && (
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Next Job</span>
              <span className="text-xs text-gray-400">{nextJob.scheduledTime}  {nextJob.estimatedDrive} away</span>
            </div>
            <p className="font-semibold text-gray-900">{nextJob.customerName}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{nextJob.address}</p>
            <Button size="sm" className="mt-3 text-white text-xs" style={{ backgroundColor: "#0A1628" }} onClick={() => onStartJob(nextJob.id)}>
              <Play className="w-3 h-3 mr-1.5" />Start & Navigate
            </Button>
          </CardContent>
        </Card>
      )}

      {/* AI opportunities today */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#0A1628]" />AI Opportunities Today
        </h3>
        {jobs.flatMap(j => j.aiOpportunities).length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No AI opportunities detected yet -- complete more jobs to unlock referral earnings.</p>
        ) : (
          <div className="space-y-2">
            {jobs.flatMap(j => j.aiOpportunities).map(opp => {
              const refCfg = REF_CFG[opp.referralStatus ?? "submitted"];
              return (
                <div key={opp.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3">
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{opp.trade}</span>
                    <p className="text-xs text-gray-500">{opp.description.slice(0, 50)}...</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-sm font-bold text-[#0A1628]">${opp.yourCommission}</div>
                    <Badge className="text-xs mt-0.5" style={{ backgroundColor: refCfg.bg, color: refCfg.color }}>{refCfg.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Tab: Jobs -----------------------------------------------------------------
function TabJobs({ jobs, onSelectJob }: { jobs: Job[]; onSelectJob: (job: Job) => void }) {
  const [filter, setFilter] = useState<"all" | JobStatus>("all");
  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {(["all", "scheduled", "in_progress", "complete"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>
            {f === "all" ? "All" : f === "in_progress" ? "Active" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(job => {
          const cfg = STATUS_CFG[job.status];
          return (
            <button key={job.id} onClick={() => onSelectJob(job)} className="w-full text-left">
              <Card className={`border ${cfg.border} hover:shadow-md transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 mt-0.5">
                      {job.routeOrder}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-gray-900">{job.customerName}</span>
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg}`} style={{ color: cfg.color }}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1 truncate"><MapPin className="w-3 h-3 flex-shrink-0" />{job.address}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.scheduledTime}</span>
                        <span>{job.estimatedDuration}</span>
                        <span className="flex items-center gap-1"><Navigation className="w-3 h-3" />{job.estimatedDrive}</span>
                        {job.aiOpportunities.length > 0 && (
                          <span className="flex items-center gap-1 text-[#0A1628] font-medium">
                            <Zap className="w-3 h-3" />{job.aiOpportunities.length} opp{job.aiOpportunities.length !== 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Tab: Camera / Job Detail --------------------------------------------------
function TabCamera({ jobs }: { jobs: Job[] }) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [jobStates, setJobStates] = useState<Record<string, { status: JobStatus; before: number; after: number; opps: AiOpportunity[]; analyzing: boolean; submitted: string[]; notified: boolean }>>(() =>
    Object.fromEntries(jobs.map(j => [j.id, { status: j.status, before: j.beforePhotos, after: j.afterPhotos, opps: j.aiOpportunities, analyzing: false, submitted: j.aiOpportunities.filter(o => o.referralStatus && o.referralStatus !== "submitted").map(o => o.id), notified: j.status === "complete" }]))
  );

  const activeJob = jobs.find(j => j.id === selectedJobId);
  const state = selectedJobId ? jobStates[selectedJobId] : null;

  const update = (id: string, patch: Partial<typeof jobStates[string]>) =>
    setJobStates(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  if (!activeJob || !state) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">Select a job to capture photos and run AI analysis.</p>
        {jobs.filter(j => j.status !== "complete").map(job => {
          const cfg = STATUS_CFG[job.status];
          return (
            <button key={job.id} onClick={() => setSelectedJobId(job.id)} className="w-full text-left">
              <Card className={`border ${cfg.border}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{job.customerName}</p>
                    <p className="text-xs text-gray-500">{job.service}  {job.scheduledTime}</p>
                  </div>
                  <Badge className={`text-xs ${cfg.bg}`} style={{ color: cfg.color }}>{cfg.label}</Badge>
                </CardContent>
              </Card>
            </button>
          );
        })}
        {jobs.filter(j => j.status === "complete").length > 0 && (
          <p className="text-xs text-gray-400 text-center">Completed jobs are locked -- photos already submitted.</p>
        )}
      </div>
    );
  }

  const handleBefore = () => { update(activeJob.id, { before: state.before + 1 }); toast("Before photo added"); };
  const handleAfter = () => {
    if (state.before === 0) { toast.error("Add at least one before photo first"); return; }
    const newAfter = state.after + 1;
    update(activeJob.id, { after: newAfter });
    if (state.after === 0) {
      update(activeJob.id, { after: newAfter, analyzing: true });
      setTimeout(() => {
        const newOpps: AiOpportunity[] = state.opps.length === 0 ? [
          { id: `ai-new-${Date.now()}`, trade: "HVAC", description: "Outdoor unit running constantly -- possible refrigerant issue", confidence: 82, estimatedValue: 950, yourCommission: 48, referralStatus: "submitted" }
        ] : state.opps;
        update(activeJob.id, { analyzing: false, opps: newOpps });
        if (state.opps.length === 0) toast.success("AI spotted 1 opportunity in your photos!");
      }, 2500);
    } else {
      toast("After photo added");
    }
  };
  const handleComplete = () => {
    if (state.after === 0) { toast.error("Add at least one after photo before completing"); return; }
    update(activeJob.id, { status: "complete", notified: true });
    toast.success(`Job complete! Notification sent to ${activeJob.customerName}`);
  };
  const handleSubmit = (opp: AiOpportunity) => {
    update(activeJob.id, { submitted: [...state.submitted, opp.id] });
    toast.success(`${opp.trade} referral submitted to ProLnk for review`);
  };

  return (
    <div className="space-y-4">
      <button onClick={() => setSelectedJobId(null)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ChevronRight className="w-4 h-4 rotate-180" />Back to job list
      </button>

      {/* Job header */}
      <Card className={`border-2 ${STATUS_CFG[state.status].border}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${STATUS_CFG[state.status].dot}`} />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{STATUS_CFG[state.status].label}</span>
          </div>
          <p className="font-semibold text-gray-900">{activeJob.customerName}</p>
          <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{activeJob.address}, {activeJob.city}</p>
          {activeJob.notes && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{activeJob.notes}
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <a href={`https://maps.google.com/?q=${encodeURIComponent(activeJob.address + ", " + activeJob.city)}`} target="_blank" rel="noreferrer">
              <Button size="sm" variant="outline" className="text-xs"><Navigation className="w-3 h-3 mr-1" />Navigate</Button>
            </a>
            <a href={`tel:${activeJob.phone}`}>
              <Button size="sm" variant="outline" className="text-xs"><Phone className="w-3 h-3 mr-1" />Call</Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Photo capture */}
      <div className="grid grid-cols-2 gap-3">
        {/* Before */}
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700 flex items-center gap-1"><Image className="w-3.5 h-3.5" />Before</span>
              {state.before > 0 && <Badge className="text-xs bg-gray-100 text-gray-600">{state.before}</Badge>}
            </div>
            {state.before === 0 ? (
              <div className="h-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">No photos</div>
            ) : (
              <div className="flex gap-1 flex-wrap mb-2">
                {Array.from({ length: state.before }).map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400"><Camera className="w-4 h-4" /></div>
                ))}
              </div>
            )}
            {state.status !== "complete" && (
              <Button size="sm" variant="outline" className="w-full text-xs mt-1" onClick={handleBefore}><Camera className="w-3 h-3 mr-1" />Add</Button>
            )}
          </CardContent>
        </Card>

        {/* After */}
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" />After</span>
              {state.after > 0 && <Badge className="text-xs bg-emerald-100 text-emerald-700">{state.after}</Badge>}
            </div>
            {state.after === 0 ? (
              <div className="h-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">
                {state.analyzing ? <Loader2 className="w-4 h-4 animate-spin text-[#0A1628]" /> : "No photos"}
              </div>
            ) : (
              <div className="flex gap-1 flex-wrap mb-2">
                {Array.from({ length: state.after }).map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-400"><CheckCircle className="w-4 h-4" /></div>
                ))}
              </div>
            )}
            {state.status !== "complete" && (
              <Button size="sm" variant="outline" className="w-full text-xs mt-1" onClick={handleAfter} disabled={state.analyzing}>
                {state.analyzing ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Scanning...</> : <><Camera className="w-3 h-3 mr-1" />Add</>}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Opportunities */}
      {state.opps.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#0A1628]" />AI Detected {state.opps.length} Opportunity{state.opps.length !== 1 ? "ies" : ""}</h3>
          <div className="space-y-2">
            {state.opps.map(opp => {
              const submitted = state.submitted.includes(opp.id);
              return (
                <Card key={opp.id} className={`border ${submitted ? "border-emerald-200 bg-emerald-50" : "border-[#0A1628]/20 bg-[#F5E642]/10"}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-sm text-gray-900">{opp.trade}</span>
                          <span className="text-xs text-gray-500">{opp.confidence}% confidence</span>
                        </div>
                        <p className="text-xs text-gray-600">{opp.description}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="text-gray-500">Est. ${opp.estimatedValue.toLocaleString()}</span>
                          <span className="text-[#0A1628] font-semibold">You earn: ${opp.yourCommission}</span>
                        </div>
                      </div>
                      {submitted ? (
                        <Badge className="bg-emerald-100 text-emerald-700 text-xs flex-shrink-0">Submitted</Badge>
                      ) : (
                        <Button size="sm" className="text-white text-xs flex-shrink-0" style={{ backgroundColor: "#0A1628" }} onClick={() => handleSubmit(opp)}>
                          <Send className="w-3 h-3 mr-1" />Submit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Complete job */}
      {state.status === "in_progress" && (
        <Button className="w-full text-white" style={{ backgroundColor: "#10B981" }} onClick={handleComplete} disabled={state.after === 0}>
          <CheckCircle className="w-4 h-4 mr-2" />Complete Job & Notify Homeowner
        </Button>
      )}

      {state.notified && state.status === "complete" && (
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3 flex items-start gap-2">
            <Bell className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">Completion notification sent</p>
              <p className="text-xs text-emerald-700 mt-0.5">{activeJob.customerName} received before/after photos via SMS and email. Any approved deals were included.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// --- Tab: Referrals ------------------------------------------------------------
function TabReferrals() {
  const [filter, setFilter] = useState<"all" | ReferralStatus>("all");
  const filtered = filter === "all" ? REFERRAL_HISTORY : REFERRAL_HISTORY.filter(r => r.status === filter);
  const totalEarned = REFERRAL_HISTORY.filter(r => r.status === "closed").reduce((s, r) => s + r.commission, 0);
  const pending = REFERRAL_HISTORY.filter(r => ["approved", "routed", "deal_sent"].includes(r.status)).reduce((s, r) => s + r.commission, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-heading font-bold text-emerald-700">${totalEarned}</div>
            <div className="text-xs text-emerald-600">Earned</div>
          </CardContent>
        </Card>
        <Card className="border border-[#0A1628]/20 bg-[#F5E642]/10">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-heading font-bold text-[#0A1628]">${pending}</div>
            <div className="text-xs text-[#0A1628]">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline stages legend */}
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max pb-1">
          {(["submitted", "under_review", "approved", "deal_sent", "closed"] as ReferralStatus[]).map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: REF_CFG[s].bg, color: REF_CFG[s].color }}>{REF_CFG[s].label}</div>
              {i < 4 && <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {(["all", "under_review", "deal_sent", "closed"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 px-1 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "bg-white shadow text-gray-900" : "text-gray-500"}`}>
            {f === "all" ? "All" : f === "under_review" ? "Review" : f === "deal_sent" ? "Sent" : "Closed"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(ref => {
          const cfg = REF_CFG[ref.status];
          return (
            <Card key={ref.id} className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-sm text-gray-900">{ref.trade}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{ref.address}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(ref.submittedAt)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-base font-bold ${ref.status === "closed" ? "text-emerald-600" : "text-gray-400"}`}>${ref.commission}</div>
                    <div className="text-xs text-gray-400">{Math.round(ref.commission / ref.estimatedValue * 100)}% of ${ref.estimatedValue.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// --- Tab: Earnings -------------------------------------------------------------
function TabEarnings() {
  const weeks = [
    { label: "Wk 1", amount: 0 },
    { label: "Wk 2", amount: 16 },
    { label: "Wk 3", amount: 144 },
    { label: "Wk 4", amount: 110 },
  ];
  const maxWeek = Math.max(...weeks.map(w => w.amount), 1);
  const totalEarned = REFERRAL_HISTORY.filter(r => r.status === "closed").reduce((s, r) => s + r.commission, 0);
  const pending = REFERRAL_HISTORY.filter(r => ["approved", "routed", "deal_sent"].includes(r.status)).reduce((s, r) => s + r.commission, 0);
  const tierProgress = 62; // percent to next tier

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-heading font-bold text-emerald-700">${totalEarned}</div>
            <div className="text-xs text-emerald-600 mt-0.5">Earned</div>
          </CardContent>
        </Card>
        <Card className="border border-amber-200 bg-amber-50">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-heading font-bold text-amber-700">${pending}</div>
            <div className="text-xs text-amber-600 mt-0.5">Pending</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-heading font-bold text-gray-900">${totalEarned + pending}</div>
            <div className="text-xs text-gray-500 mt-0.5">Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Bar chart */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><BarChart2 className="w-4 h-4" />This Month</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex items-end gap-3 h-24">
            {weeks.map(w => (
              <div key={w.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs font-semibold text-gray-700">{w.amount > 0 ? `$${w.amount}` : ""}</div>
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${(w.amount / maxWeek) * 72}px`, backgroundColor: w.amount > 0 ? "#0A1628" : "#E5E7EB", minHeight: "4px" }} />
                <div className="text-xs text-gray-400">{w.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tier progress */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold text-gray-900">Bronze Tier</span>
              <span className="text-xs text-gray-500 ml-2">5% commission rate</span>
            </div>
            <Badge className="bg-[#0A1628]/10 text-[#0A1628] text-xs">Silver at 10 referrals</Badge>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full rounded-full" style={{ width: `${tierProgress}%`, backgroundColor: "#0A1628" }} />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{tierProgress}% to Silver</span>
            <span>Silver unlocks 8% commission + priority routing</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent commissions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Commissions</h3>
        <div className="space-y-2">
          {REFERRAL_HISTORY.filter(r => r.status === "closed").map(r => (
            <div key={r.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{r.trade}</p>
                <p className="text-xs text-gray-500">{timeAgo(r.submittedAt)}</p>
              </div>
              <span className="text-sm font-bold text-emerald-600">+${r.commission}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main Page -----------------------------------------------------------------
type Tab = "dashboard" | "jobs" | "camera" | "referrals" | "earnings";

const TABS: Array<{ id: Tab; label: string; icon: typeof LayoutDashboard }> = [
  { id: "dashboard", label: "Home",      icon: LayoutDashboard },
  { id: "jobs",      label: "Jobs",      icon: Briefcase       },
  { id: "camera",    label: "Camera",    icon: Camera          },
  { id: "referrals", label: "Referrals", icon: Send            },
  { id: "earnings",  label: "Earnings",  icon: DollarSign      },
];

export default function ProLnkApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleStartJob = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: "en_route" as JobStatus } : j));
    setActiveTab("jobs");
    toast("Navigating to job...");
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setActiveTab("camera");
  };

  return (
    <PartnerLayout>
      <div className="flex flex-col h-full">
        {/* App header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-base font-heading font-bold text-gray-900">ProLnk Mobile App</h1>
            <p className="text-xs text-gray-400">Partner Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg text-gray-400 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0A1628]" />
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {activeTab === "dashboard" && <TabDashboard jobs={jobs} onStartJob={handleStartJob} />}
          {activeTab === "jobs"      && <TabJobs jobs={jobs} onSelectJob={handleSelectJob} />}
          {activeTab === "camera"    && <TabCamera jobs={jobs} />}
          {activeTab === "referrals" && <TabReferrals />}
          {activeTab === "earnings"  && <TabEarnings />}
        </div>

        {/* Bottom tab bar */}
        <div className="bg-white border-t border-gray-200 flex-shrink-0 safe-area-bottom">
          <div className="flex">
            {TABS.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${active ? "text-[#0A1628]" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <tab.icon className={`w-5 h-5 ${tab.id === "camera" ? "w-6 h-6" : ""}`} />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {active && <span className="w-1 h-1 rounded-full bg-[#0A1628]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}
