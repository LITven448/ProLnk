/**
 * Partner Verification -- /admin/verification
 * Admin reviews and approves 7-point trust checkpoints for each partner.
 * Trust score drives badge level (Bronze  Silver  Gold  Platinum).
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import {
  Shield, ShieldCheck, ShieldAlert, CheckCircle, XCircle, Clock,
  Search, ChevronRight, Star, Award, FileText, Users, Camera,
  Briefcase, UserCheck, AlertTriangle, RefreshCw, X, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// --- Types --------------------------------------------------------------------
type CheckpointKey = "license" | "insurance" | "backgroundCheck" | "businessRegistration" | "references" | "portfolio" | "identity";

interface CheckpointDef {
  key: CheckpointKey;
  label: string;
  field: string;
  icon: React.ElementType;
  description: string;
  weight: number;
}

const CHECKPOINTS: CheckpointDef[] = [
  { key: "license", field: "licenseVerified", label: "Business License", icon: FileText, description: "Valid state/local contractor license", weight: 20 },
  { key: "insurance", field: "insuranceVerified", label: "Liability Insurance", icon: Shield, description: "General liability + workers comp", weight: 20 },
  { key: "backgroundCheck", field: "backgroundCheckVerified", label: "Background Check", icon: UserCheck, description: "Criminal background screening", weight: 18 },
  { key: "businessRegistration", field: "businessRegistrationVerified", label: "Business Registration", icon: Briefcase, description: "LLC/Corp or DBA registration", weight: 14 },
  { key: "references", field: "referencesVerified", label: "References (3+)", icon: Users, description: "Verified client references", weight: 12 },
  { key: "portfolio", field: "portfolioVerified", label: "Work Portfolio", icon: Camera, description: "Photos or examples of completed work", weight: 8 },
  { key: "identity", field: "identityVerified", label: "Identity Verification", icon: UserCheck, description: "Government-issued ID", weight: 8 },
];

const BADGE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  none: { label: "Unverified", color: "text-gray-500", bg: "bg-gray-50", border: "border-gray-200" },
  bronze: { label: "Bronze", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  silver: { label: "Silver", color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200" },
  gold: { label: "Gold", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  platinum: { label: "Platinum", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
};

// --- Trust score ring ---------------------------------------------------------
function TrustRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#10B981" : score >= 50 ? "#F59E0B" : score >= 20 ? "#F97316" : "#E5E7EB";
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={size * 0.1} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size * 0.1}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-gray-900" style={{ fontSize: size * 0.22 }}>{score}</span>
      </div>
    </div>
  );
}

// --- Partner row --------------------------------------------------------------
function PartnerRow({ partner, onSelect }: { partner: any; onSelect: () => void }) {
  const badge = BADGE_CONFIG[partner.badgeLevel] || BADGE_CONFIG.none;
  const checkCount = CHECKPOINTS.filter(c => partner[c.field]).length;

  return (
    <tr
      className="border-b border-gray-50 hover:bg-gray-50/60 cursor-pointer transition-colors"
      onClick={onSelect}
    >
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ backgroundColor: "#1B4FD8" }}
          >
            {(partner.businessName || "P")[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{partner.businessName}</div>
            <div className="text-xs text-gray-400">{partner.businessType}  {partner.email}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <TrustRing score={partner.trustScore} size={40} />
          <Badge className={`text-xs font-semibold ${badge.bg} ${badge.color} ${badge.border}`}>
            {badge.label}
          </Badge>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          {CHECKPOINTS.map(c => (
            <div
              key={c.key}
              title={c.label}
              className={`w-4 h-4 rounded-full flex items-center justify-center ${partner[c.field] ? "bg-emerald-100" : "bg-gray-100"}`}
            >
              {partner[c.field]
                ? <Check className="w-2.5 h-2.5 text-emerald-600" />
                : <X className="w-2.5 h-2.5 text-gray-300" />
              }
            </div>
          ))}
          <span className="text-xs text-gray-500 ml-1">{checkCount}/7</span>
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge className={`text-xs ${
          partner.overallStatus === "verified" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
          partner.overallStatus === "partial" ? "bg-amber-50 text-amber-700 border-amber-100" :
          "bg-gray-50 text-gray-500 border-gray-200"
        }`}>
          {partner.overallStatus}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <ChevronRight className="w-4 h-4 text-gray-300" />
      </td>
    </tr>
  );
}

// --- Checkpoint toggle --------------------------------------------------------
function CheckpointRow({
  checkpoint, verified, partnerId, onUpdated
}: {
  checkpoint: CheckpointDef;
  verified: boolean;
  partnerId: number;
  onUpdated: () => void;
}) {
  const [notes, setNotes] = useState("");
  const [expanded, setExpanded] = useState(false);

  const updateMutation = trpc.verification.adminUpdateCheckpoint.useMutation({
    onSuccess: () => {
      toast.success(`${checkpoint.label} ${verified ? "un-verified" : "verified"}`);
      setExpanded(false);
      onUpdated();
    },
    onError: () => toast.error("Update failed"),
  });

  return (
    <div className={`rounded-xl border transition-all ${verified ? "border-emerald-100 bg-emerald-50/30" : "border-gray-100 bg-white"}`}>
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${verified ? "bg-emerald-100" : "bg-gray-100"}`}>
          <checkpoint.icon className={`w-4 h-4 ${verified ? "text-emerald-600" : "text-gray-400"}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900">{checkpoint.label}</span>
            <span className="text-xs text-gray-400">+{checkpoint.weight} pts</span>
          </div>
          <div className="text-xs text-gray-500">{checkpoint.description}</div>
        </div>
        {verified ? (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified
          </Badge>
        ) : (
          <Badge className="bg-gray-50 text-gray-500 border-gray-200 text-xs">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        )}
        <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
              disabled={updateMutation.isPending}
              onClick={() => updateMutation.mutate({
                partnerId,
                checkpoint: checkpoint.key,
                verified: true,
                notes: notes || undefined,
              })}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Mark Verified
            </Button>
            {verified && (
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 text-xs gap-1.5"
                disabled={updateMutation.isPending}
                onClick={() => updateMutation.mutate({
                  partnerId,
                  checkpoint: checkpoint.key,
                  verified: false,
                  notes: notes || undefined,
                })}
              >
                <XCircle className="w-3.5 h-3.5" />
                Revoke
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- Detail panel -------------------------------------------------------------
function PartnerDetail({ partner, onClose }: { partner: any; onClose: () => void }) {
  const utils = trpc.useUtils();
  const { data: verif, refetch } = trpc.verification.adminGetVerification.useQuery({ partnerId: partner.id });

  const handleUpdated = () => {
    refetch();
    utils.verification.adminListVerifications.invalidate();
  };

  const badge = BADGE_CONFIG[verif?.badgeLevel || "none"];
  const trustScore = verif?.trustScore || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: "#1B4FD8" }}
            >
              {(partner.businessName || "P")[0].toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-gray-900">{partner.businessName}</div>
              <div className="text-xs text-gray-400">{partner.businessType}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trust score */}
        <div className="p-5 border-b border-gray-50">
          <div className="flex items-center gap-4">
            <TrustRing score={trustScore} size={72} />
            <div>
              <div className="text-sm text-gray-500 mb-1">Trust Score</div>
              <Badge className={`text-sm font-bold px-3 py-1 ${badge.bg} ${badge.color} ${badge.border}`}>
                <Award className="w-4 h-4 mr-1.5" />
                {badge.label} Partner
              </Badge>
              <div className="text-xs text-gray-400 mt-1.5">
                {CHECKPOINTS.filter(c => verif?.[c.field]).length}/7 checkpoints complete
              </div>
            </div>
          </div>
        </div>

        {/* Checkpoints */}
        <div className="p-5 space-y-3 flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Verification Checkpoints</h3>
          {CHECKPOINTS.map(cp => (
            <CheckpointRow
              key={cp.key}
              checkpoint={cp}
              verified={!!(verif?.[cp.field])}
              partnerId={partner.id}
              onUpdated={handleUpdated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Main page ----------------------------------------------------------------
export default function PartnerVerification() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unverified" | "partial" | "verified">("all");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const { data, isLoading, refetch } = trpc.verification.adminListVerifications.useQuery({
    limit: 100,
    offset: 0,
    status: statusFilter,
  });

  const partners = (data?.partners || []).filter((p: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (p.businessName || "").toLowerCase().includes(q) || (p.email || "").toLowerCase().includes(q);
  });

  const total = data?.total || 0;
  const verified = partners.filter((p: any) => p.overallStatus === "verified").length;
  const partial = partners.filter((p: any) => p.overallStatus === "partial").length;
  const unverified = partners.filter((p: any) => p.overallStatus === "unverified").length;
  const avgScore = partners.length > 0
    ? Math.round(partners.reduce((s: number, p: any) => s + (p.trustScore || 0), 0) / partners.length)
    : 0;

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              Partner Verification
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              7-point trust checkpoint system -- License, Insurance, Background, Registration, References, Portfolio, Identity
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Partners", value: total, color: "text-gray-900" },
            { label: "Fully Verified", value: verified, color: "text-emerald-600" },
            { label: "Partial", value: partial, color: "text-amber-600" },
            { label: "Avg Trust Score", value: avgScore, color: "text-blue-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Badge legend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Badge Levels</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(BADGE_CONFIG).map(([key, cfg]) => (
              <div key={key} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                <Award className="w-3.5 h-3.5" />
                {cfg.label}
                <span className="opacity-60">
                  {key === "none" ? "0 checks" : key === "bronze" ? "1-2" : key === "silver" ? "3-4" : key === "gold" ? "5-6" : "7/7"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search partners..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "unverified", "partial", "verified"] as const).map(s => (
              <Button
                key={s}
                size="sm"
                variant={statusFilter === s ? "default" : "outline"}
                onClick={() => setStatusFilter(s)}
                className={statusFilter === s ? "bg-blue-600 text-white" : ""}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <RefreshCw className="w-8 h-8 text-gray-300 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-gray-400">Loading partners...</p>
          </div>
        ) : partners.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <Shield className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700 mb-1">No partners found</h3>
            <p className="text-sm text-gray-400">Approved partners will appear here for verification.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Partner</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trust Score</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Checkpoints</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="py-3 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {partners.map((partner: any) => (
                    <PartnerRow
                      key={partner.id}
                      partner={partner}
                      onSelect={() => setSelectedPartner(partner)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Detail slide-over */}
      {selectedPartner && (
        <PartnerDetail
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </AdminLayout>
  );
}
