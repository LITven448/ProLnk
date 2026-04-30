/**
 * Admin Referral Pipeline -- 8-stage Kanban
 * ProLnk controls every referral before it reaches a partner or homeowner.
 */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles, CheckCircle, Send, Home, Briefcase, DollarSign,
  XCircle, Eye, ChevronRight, MapPin, Clock, User, Camera,
  AlertTriangle, ArrowRight, X, Edit2, Check
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

// --- Types ---------------------------------------------------------------------
type Stage =
  | "detected"
  | "approved"
  | "routed"
  | "accepted"
  | "deal_sent"
  | "homeowner_responded"
  | "job_closed"
  | "commission_paid";

interface Referral {
  id: string;
  stage: Stage;
  trade: string;
  description: string;
  confidence: number;
  estimatedValue: number;
  fieldPartner: string;
  fieldPartnerBusiness: string;
  homeownerName: string;
  address: string;
  city: string;
  receivingPartner?: string;
  detectedAt: Date;
  commissionField: number;
  commissionProLnk: number;
  photoCount: number;
  notes?: string;
}

// --- Demo Data -----------------------------------------------------------------
const INITIAL_REFERRALS: Referral[] = [
  {
    id: "r1", stage: "detected", trade: "Fence & Deck", confidence: 94,
    description: "2 fence panels showing significant rot on west side of property. Estimated 40 linear feet affected.",
    estimatedValue: 1400, fieldPartner: "Alex Johnson", fieldPartnerBusiness: "DFW Lawn Pros",
    homeownerName: "Jennifer Martinez", address: "4821 Willow Creek Dr", city: "Frisco, TX 75034",
    detectedAt: new Date(Date.now() - 2 * 3600000), commissionField: 70, commissionProLnk: 140, photoCount: 3,
    notes: "High confidence -- fence rot clearly visible in after photo.",
  },
  {
    id: "r2", stage: "detected", trade: "Drainage", confidence: 78,
    description: "Low spot near back patio creating standing water risk. Likely French drain or regrading needed.",
    estimatedValue: 800, fieldPartner: "Alex Johnson", fieldPartnerBusiness: "DFW Lawn Pros",
    homeownerName: "Jennifer Martinez", address: "4821 Willow Creek Dr", city: "Frisco, TX 75034",
    detectedAt: new Date(Date.now() - 2 * 3600000), commissionField: 40, commissionProLnk: 80, photoCount: 2,
  },
  {
    id: "r3", stage: "approved", trade: "Pest Control", confidence: 85,
    description: "Fire ant mounds visible near foundation on south side. Active infestation likely.",
    estimatedValue: 320, fieldPartner: "Marcus Williams", fieldPartnerBusiness: "GreenScape Lawn",
    homeownerName: "David Richardson", address: "1205 Ridgecrest Ln", city: "Plano, TX 75075",
    detectedAt: new Date(Date.now() - 5 * 3600000), commissionField: 16, commissionProLnk: 32, photoCount: 2,
  },
  {
    id: "r4", stage: "routed", trade: "HVAC", confidence: 91,
    description: "Outdoor condenser unit running continuously -- possible refrigerant leak or compressor issue.",
    estimatedValue: 1800, fieldPartner: "Sarah Chen", fieldPartnerBusiness: "ProClean Services",
    homeownerName: "Sarah Thompson", address: "3390 Oak Hollow Ct", city: "McKinney, TX 75070",
    receivingPartner: "DFW HVAC Pros", detectedAt: new Date(Date.now() - 8 * 3600000),
    commissionField: 144, commissionProLnk: 180, photoCount: 4,
  },
  {
    id: "r5", stage: "deal_sent", trade: "Window Cleaning", confidence: 72,
    description: "Exterior windows heavily soiled -- 12 windows visible from yard photos.",
    estimatedValue: 280, fieldPartner: "James Rodriguez", fieldPartnerBusiness: "Lawn Masters",
    homeownerName: "Michael Brooks", address: "7712 Meadow View Dr", city: "Allen, TX 75013",
    receivingPartner: "Crystal Clear Windows", detectedAt: new Date(Date.now() - 24 * 3600000),
    commissionField: 14, commissionProLnk: 28, photoCount: 2,
  },
  {
    id: "r6", stage: "homeowner_responded", trade: "Pressure Washing", confidence: 88,
    description: "Driveway and walkway heavily stained -- algae growth visible on concrete.",
    estimatedValue: 350, fieldPartner: "Lisa Park", fieldPartnerBusiness: "Park Lawn Care",
    homeownerName: "Amanda Foster", address: "2201 Sunset Blvd", city: "Southlake, TX 76092",
    receivingPartner: "Southlake Wash Pros", detectedAt: new Date(Date.now() - 36 * 3600000),
    commissionField: 18, commissionProLnk: 35, photoCount: 3,
  },
  {
    id: "r7", stage: "job_closed", trade: "Tree Trimming", confidence: 96,
    description: "Oak tree branches overhanging roof -- 3 large limbs need removal.",
    estimatedValue: 650, fieldPartner: "Tom Baker", fieldPartnerBusiness: "Baker Lawn Services",
    homeownerName: "Robert Kim", address: "5544 Creekside Dr", city: "Garland, TX 75040",
    receivingPartner: "DFW Tree Experts", detectedAt: new Date(Date.now() - 72 * 3600000),
    commissionField: 33, commissionProLnk: 65, photoCount: 5,
  },
  {
    id: "r8", stage: "commission_paid", trade: "Sprinkler Repair", confidence: 90,
    description: "2 broken sprinkler heads visible -- one spraying sidewalk instead of lawn.",
    estimatedValue: 240, fieldPartner: "Maria Santos", fieldPartnerBusiness: "Santos Lawn Care",
    homeownerName: "Patricia White", address: "8821 Elm Ridge Rd", city: "Denton, TX 76201",
    receivingPartner: "DFW Irrigation Co.", detectedAt: new Date(Date.now() - 120 * 3600000),
    commissionField: 12, commissionProLnk: 24, photoCount: 2,
  },
];

// --- Stage Config ---------------------------------------------------------------
const STAGES: Array<{ id: Stage; label: string; color: string; bg: string; border: string; icon: typeof Sparkles; description: string }> = [
  { id: "detected",            label: "Detected",           color: "#8B5CF6", bg: "bg-purple-50",  border: "border-purple-200", icon: Sparkles,   description: "AI found an opportunity -- needs ProLnk review" },
  { id: "approved",            label: "Approved",           color: "#3B82F6", bg: "bg-blue-50",    border: "border-blue-200",   icon: CheckCircle, description: "ProLnk approved -- routing to receiving partner" },
  { id: "routed",              label: "Routed",             color: "#F59E0B", bg: "bg-amber-50",   border: "border-amber-200",  icon: Send,        description: "Sent to partner -- awaiting acceptance" },
  { id: "accepted",            label: "Accepted",           color: "#F97316", bg: "bg-orange-50",  border: "border-orange-200", icon: Briefcase,   description: "Partner accepted -- deal being composed" },
  { id: "deal_sent",           label: "Deal Sent",          color: "#00B5B8", bg: "bg-teal-50",    border: "border-teal-200",   icon: Home,        description: "Homeowner notified via SMS + email" },
  { id: "homeowner_responded", label: "HO Responded",       color: "#EC4899", bg: "bg-pink-50",    border: "border-pink-200",   icon: User,        description: "Homeowner expressed interest" },
  { id: "job_closed",          label: "Job Closed",         color: "#10B981", bg: "bg-emerald-50", border: "border-emerald-200", icon: CheckCircle, description: "Job completed -- commissions calculating" },
  { id: "commission_paid",     label: "Commission Paid",    color: "#059669", bg: "bg-green-50",   border: "border-green-200",  icon: DollarSign,  description: "All commissions paid out" },
];

function timeAgo(d: Date) {
  const h = Math.floor((Date.now() - d.getTime()) / 3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// --- Referral Card -------------------------------------------------------------
function ReferralCard({ referral, onSelect }: { referral: Referral; onSelect: () => void }) {
  const stage = STAGES.find(s => s.id === referral.stage)!;
  return (
    <button onClick={onSelect} className="w-full text-left group">
      <Card className={`border ${stage.border} hover:shadow-md transition-all cursor-pointer`}>
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="font-semibold text-sm text-gray-900">{referral.trade}</span>
            <span className="text-xs font-bold text-gray-500">{referral.confidence}%</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{referral.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{referral.city.split(",")[0]}</span>
            <span className="flex items-center gap-1"><Camera className="w-3 h-3" />{referral.photoCount}</span>
            <span className="font-semibold text-emerald-600">${referral.estimatedValue.toLocaleString()}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
            <span>{referral.fieldPartnerBusiness}</span>
            <span>{timeAgo(referral.detectedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

// --- Detail Panel --------------------------------------------------------------
function DetailPanel({ referral, onClose, onApprove, onReject, onAdvance }: {
  referral: Referral;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAdvance: (id: string) => void;
}) {
  const stage = STAGES.find(s => s.id === referral.stage)!;
  const stageIdx = STAGES.findIndex(s => s.id === referral.stage);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className={`p-4 ${stage.bg} border-b ${stage.border} flex items-start justify-between`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <stage.icon className="w-4 h-4" style={{ color: stage.color }} />
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: stage.color }}>{stage.label}</span>
            </div>
            <h2 className="text-lg font-heading font-bold text-gray-900">{referral.trade} Opportunity</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{referral.address}, {referral.city}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/50"><X className="w-5 h-5 text-gray-500" /></button>
        </div>

        <div className="p-4 space-y-4">
          {/* AI Description */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">AI Detection</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-800">{referral.confidence}% Confidence</span>
              </div>
              <p className="text-sm text-gray-700">{referral.description}</p>
              {referral.notes && <p className="text-xs text-purple-600 mt-1.5 italic">{referral.notes}</p>}
            </div>
          </div>

          {/* People */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Field Partner</h3>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-sm font-semibold text-gray-900">{referral.fieldPartner}</p>
                <p className="text-xs text-gray-500">{referral.fieldPartnerBusiness}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Homeowner</h3>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-sm font-semibold text-gray-900">{referral.homeownerName}</p>
                <p className="text-xs text-gray-500">{referral.address}</p>
              </div>
            </div>
          </div>

          {referral.receivingPartner && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Receiving Partner</h3>
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
                <p className="text-sm font-semibold text-teal-800">{referral.receivingPartner}</p>
              </div>
            </div>
          )}

          {/* Financials */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Financials</h3>
            <div className="bg-gray-50 rounded-xl p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Job Value</span>
                <span className="font-bold text-gray-900">${referral.estimatedValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Field Partner Commission (5%)</span>
                <span className="font-semibold text-emerald-600">+${referral.commissionField}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ProLnk Platform Fee (10%)</span>
                <span className="font-semibold text-teal-600">+${referral.commissionProLnk}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold">
                <span className="text-gray-700">Total Platform Revenue</span>
                <span className="text-gray-900">${referral.commissionField + referral.commissionProLnk}</span>
              </div>
            </div>
          </div>

          {/* Stage progress */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pipeline Progress</h3>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {STAGES.map((s, i) => (
                <div key={s.id} className="flex items-center gap-1 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${i <= stageIdx ? "" : "bg-gray-200"}`} style={i <= stageIdx ? { backgroundColor: s.color } : {}} />
                  {i < STAGES.length - 1 && <div className={`w-4 h-0.5 ${i < stageIdx ? "bg-teal-400" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            {referral.stage === "detected" && (
              <>
                <Button className="flex-1 text-white" style={{ backgroundColor: "#00B5B8" }} onClick={() => onApprove(referral.id)}>
                  <Check className="w-4 h-4 mr-1.5" />Approve & Route
                </Button>
                <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50" onClick={() => onReject(referral.id)}>
                  <XCircle className="w-4 h-4 mr-1.5" />Reject
                </Button>
              </>
            )}
            {referral.stage !== "detected" && referral.stage !== "commission_paid" && (
              <Button className="flex-1 text-white" style={{ backgroundColor: "#00B5B8" }} onClick={() => onAdvance(referral.id)}>
                <ArrowRight className="w-4 h-4 mr-1.5" />Advance to Next Stage
              </Button>
            )}
            {referral.stage === "commission_paid" && (
              <div className="flex-1 text-center py-2 text-sm text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4" />Complete -- Commission Paid
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page -----------------------------------------------------------------
function mapStatusToStage(status: string): Stage {
  switch (status) {
    case "pending": return "detected";
    case "sent": return "routed";
    case "accepted": return "accepted";
    case "declined": return "job_closed";
    case "converted": return "commission_paid";
    case "expired": return "job_closed";
    default: return "detected";
  }
}

export default function ReferralPipeline() {
  const [referrals, setReferrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [selected, setSelected] = useState<Referral | null>(null);
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [isLive, setIsLive] = useState(false);

  const { data: liveOpps, refetch } = trpc.admin.getAllOpportunities.useQuery();

  useEffect(() => {
    if (liveOpps && liveOpps.length > 0) {
      const mapped: Referral[] = liveOpps.map((opp: any) => ({
        id: String(opp.id),
        stage: mapStatusToStage(opp.status),
        trade: opp.opportunityType ?? "Unknown",
        description: opp.description ?? "",
        confidence: opp.aiConfidence ? Math.round(parseFloat(opp.aiConfidence) * 100) : 75,
        estimatedValue: opp.estimatedJobValue ? parseFloat(opp.estimatedJobValue) : 0,
        fieldPartner: opp.sourcePartnerName ?? "Unknown Partner",
        fieldPartnerBusiness: opp.sourcePartnerName ?? "Unknown",
        homeownerName: "Homeowner",
        address: opp.serviceAddress ?? "DFW Area",
        city: "DFW, TX",
        receivingPartner: opp.receivingPartnerName ?? undefined,
        detectedAt: new Date(opp.createdAt),
        commissionField: opp.referralCommissionAmount ? parseFloat(opp.referralCommissionAmount) : 0,
        commissionProLnk: opp.proLinkNetAmount ? parseFloat(opp.proLinkNetAmount) : 0,
        photoCount: opp.photoUrl ? 1 : 0,
      }));
      setReferrals(mapped);
      setIsLive(true);
    }
  }, [liveOpps]);

  const approve = (id: string) => {
    setReferrals(prev => prev.map(r => r.id === id ? { ...r, stage: "approved" as Stage } : r));
    setSelected(null);
    toast.success("Referral approved -- routing to receiving partner");
  };
  const reject = (id: string) => {
    setReferrals(prev => prev.filter(r => r.id !== id));
    setSelected(null);
    toast("Referral rejected and archived");
  };
  const advance = (id: string) => {
    const stageOrder: Stage[] = ["detected", "approved", "routed", "accepted", "deal_sent", "homeowner_responded", "job_closed", "commission_paid"];
    setReferrals(prev => prev.map(r => {
      if (r.id !== id) return r;
      const idx = stageOrder.indexOf(r.stage);
      const next = stageOrder[Math.min(idx + 1, stageOrder.length - 1)];
      return { ...r, stage: next };
    }));
    setSelected(null);
    toast.success("Referral advanced to next stage");
  };

  const totalValue = referrals.reduce((s, r) => s + r.estimatedValue, 0);
  const totalProLnk = referrals.reduce((s, r) => s + r.commissionProLnk, 0);
  const detected = referrals.filter(r => r.stage === "detected").length;

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Referral Pipeline</h1>
          <p className="text-sm text-gray-500 mt-0.5">ProLnk controls every referral before it reaches a partner or homeowner</p>
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 inline-block animate-pulse" />
              Live Data
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView(v => v === "kanban" ? "list" : "kanban")}>
            {view === "kanban" ? "List View" : "Kanban View"}
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border border-purple-200 bg-purple-50">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-purple-700">{detected}</div>
            <div className="text-xs text-purple-600 mt-0.5">Needs Review</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-gray-900">{referrals.length}</div>
            <div className="text-xs text-gray-500 mt-0.5">Active Referrals</div>
          </CardContent>
        </Card>
        <Card className="border border-teal-200 bg-teal-50">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-teal-700">${(totalValue / 1000).toFixed(1)}k</div>
            <div className="text-xs text-teal-600 mt-0.5">Pipeline Value</div>
          </CardContent>
        </Card>
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3">
            <div className="text-2xl font-heading font-bold text-emerald-700">${totalProLnk}</div>
            <div className="text-xs text-emerald-600 mt-0.5">ProLnk Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Alert for pending reviews */}
      {detected > 0 && (
        <div className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-purple-800">{detected} referral{detected !== 1 ? "s" : ""} waiting for your review</p>
            <p className="text-xs text-purple-600 mt-0.5">AI has detected opportunities -- review and approve before they are routed to receiving partners.</p>
          </div>
        </div>
      )}

      {/* Kanban */}
      {view === "kanban" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {STAGES.map(stage => {
              const cards = referrals.filter(r => r.stage === stage.id);
              return (
                <div key={stage.id} className="w-64 flex-shrink-0">
                  <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-xl ${stage.bg} border ${stage.border}`}>
                    <stage.icon className="w-4 h-4 flex-shrink-0" style={{ color: stage.color }} />
                    <span className="text-sm font-semibold" style={{ color: stage.color }}>{stage.label}</span>
                    <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full bg-white/70" style={{ color: stage.color }}>{cards.length}</span>
                  </div>
                  <div className="space-y-2 min-h-[80px]">
                    {cards.map(r => (
                      <ReferralCard key={r.id} referral={r} onSelect={() => setSelected(r)} />
                    ))}
                    {cards.length === 0 && (
                      <div className="h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-300">Empty</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="space-y-2">
          {referrals.map(r => {
            const stage = STAGES.find(s => s.id === r.stage)!;
            return (
              <button key={r.id} onClick={() => setSelected(r)} className="w-full text-left">
                <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900">{r.trade}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: stage.bg.replace("bg-", "#").replace("-50", ""), color: stage.color }}>{stage.label}</span>
                        <span className="text-xs text-gray-400">{r.confidence}% confidence</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 truncate">{r.address}, {r.city}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-gray-900">${r.estimatedValue.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">{timeAgo(r.detectedAt)}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <DetailPanel
          referral={selected}
          onClose={() => setSelected(null)}
          onApprove={approve}
          onReject={reject}
          onAdvance={advance}
        />
      )}
    </div>
    </AdminLayout>
  );
}
