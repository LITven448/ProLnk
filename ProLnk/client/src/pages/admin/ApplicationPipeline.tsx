import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  ClipboardList, CheckCircle, XCircle, Clock, ChevronRight,
  Phone, Mail, MapPin, Briefcase, Star, ExternalLink, X, AlertTriangle,
  Calendar, Globe, Shield, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STAGES = [
  { key: "pending", label: "Applied", color: "#F59E0B", icon: Clock },
  { key: "approved", label: "Approved", color: "#10B981", icon: CheckCircle },
  { key: "rejected", label: "Rejected", color: "#EF4444", icon: XCircle },
];

// -- Reject Reason Modal ------------------------------------------------------
function RejectModal({ partner, onConfirm, onCancel, isPending }: {
  partner: any;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const [reason, setReason] = useState("");
  const PRESETS = [
    "Incomplete application -- missing required documents",
    "Service area outside our current coverage zone",
    "Business license could not be verified",
    "Does not meet minimum years-in-business requirement",
    "Duplicate application -- already exists in system",
    "Category not currently accepting new partners",
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="rounded-2xl border w-full max-w-md p-6" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(239,68,68,0.15)" }}>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="font-bold text-[#344767] text-sm">Reject Application</div>
            <div className="text-xs mt-0.5" style={{ color: "#7B809A" }}>{partner.businessName}</div>
          </div>
          <button onClick={onCancel} className="ml-auto text-gray-400 hover:text-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="text-xs font-medium" style={{ color: "#9CA3AF" }}>Quick reason (click to select)</div>
          <div className="space-y-1.5">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setReason(p)}
                className="w-full text-left text-xs px-3 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: reason === p ? "rgba(0,181,184,0.15)" : "#0A1628",
                  borderColor: reason === p ? "#00B5B8" : "#1E3A5F",
                  color: reason === p ? "#00B5B8" : "#8BA3C7",
                  border: "1px solid",
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="text-xs font-medium mt-3" style={{ color: "#9CA3AF" }}>Or write a custom reason</div>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Explain why this application is being rejected..."
            rows={3}
            className="w-full rounded-lg px-3 py-2 text-xs resize-none outline-none focus:ring-1 focus:ring-teal-500"
            style={{ backgroundColor: "#0A1628", borderColor: "#E9ECEF", color: "#fff", border: "1px solid" }}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} className="flex-1 h-8 text-xs border-gray-600 text-gray-300">
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={isPending}
            onClick={() => onConfirm(reason)}
            className="flex-1 h-8 text-xs font-bold text-[#344767]"
            style={{ backgroundColor: "#EF4444" }}
          >
            {isPending ? "Rejecting..." : "Confirm Rejection"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// -- Partner Detail Drawer ----------------------------------------------------
function PartnerDrawer({ partner, onClose, onApprove, onRejectRequest, isActing }: {
  partner: any;
  onClose: () => void;
  onApprove?: () => void;
  onRejectRequest?: () => void;
  isActing?: boolean;
}) {
  const fields = [
    { icon: Mail, label: "Email", value: partner.contactEmail },
    { icon: Phone, label: "Phone", value: partner.contactPhone },
    { icon: MapPin, label: "Service Area", value: partner.serviceArea },
    { icon: Briefcase, label: "Business Type", value: partner.businessType },
    { icon: Star, label: "Years in Business", value: partner.yearsInBusiness ? `${partner.yearsInBusiness} years` : null },
    { icon: Globe, label: "Website", value: partner.website },
    { icon: Shield, label: "License #", value: partner.licenseNumber },
    { icon: Calendar, label: "Applied", value: partner.createdAt ? new Date(partner.createdAt).toLocaleDateString() : null },
  ].filter(f => f.value);

  return (
    <div className="fixed inset-0 z-40 flex" onClick={onClose}>
      <div className="flex-1" />
      <div
        className="w-full max-w-sm h-full overflow-y-auto border-l shadow-2xl"
        style={{ backgroundColor: "#0A1628", borderColor: "#E9ECEF" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center gap-3 px-5 py-4 border-b" style={{ backgroundColor: "#0A1628", borderColor: "#E9ECEF" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-[#344767] flex-shrink-0" style={{ backgroundColor: "#00B5B820" }}>
            {partner.businessName?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#344767] text-sm truncate">{partner.businessName}</div>
            <div className="text-xs mt-0.5" style={{ color: "#7B809A" }}>{partner.tier ?? "Standard"} tier</div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Contact info */}
          <div>
            <div className="text-xs font-medium mb-2" style={{ color: "#7B809A" }}>CONTACT INFO</div>
            <div className="space-y-2">
              {fields.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#9CA3AF" }}>
                  <f.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#7B809A" }} />
                  <span className="text-gray-400 w-28 flex-shrink-0">{f.label}</span>
                  <span className="truncate text-gray-800/80">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application message */}
          {partner.message && (
            <div>
              <div className="text-xs font-medium mb-2" style={{ color: "#7B809A" }}>APPLICATION MESSAGE</div>
              <div className="text-xs p-3 rounded-lg leading-relaxed" style={{ backgroundColor: "#FFFFFF", color: "#9CA3AF", border: "1px solid #E9ECEF" }}>
                "{partner.message}"
              </div>
            </div>
          )}

          {/* Rejection reason (if rejected) */}
          {partner.status === "rejected" && partner.rejectionReason && (
            <div>
              <div className="text-xs font-medium mb-2 text-red-400">REJECTION REASON</div>
              <div className="text-xs p-3 rounded-lg leading-relaxed" style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#FCA5A5", border: "1px solid rgba(239,68,68,0.2)" }}>
                {partner.rejectionReason}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-2">
            <Link href={`/partner/${partner.id}`}>
              <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1.5 border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                <ExternalLink className="w-3 h-3" /> View Public Profile
              </Button>
            </Link>
          </div>

          {/* Actions */}
          {partner.status === "pending" && (onApprove || onRejectRequest) && (
            <div className="flex gap-2 pt-2 border-t" style={{ borderColor: "#E9ECEF" }}>
              {onApprove && (
                <Button size="sm" disabled={isActing} onClick={onApprove} className="flex-1 h-9 text-xs font-bold text-[#344767]" style={{ backgroundColor: "#10B981" }}>
                   Approve
                </Button>
              )}
              {onRejectRequest && (
                <Button size="sm" disabled={isActing} onClick={onRejectRequest} variant="outline" className="flex-1 h-9 text-xs font-heading border-red-500/30 text-red-400 hover:bg-red-500/10">
                   Reject
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -- Partner Card -------------------------------------------------------------
function PartnerCard({ partner, onOpen }: { partner: any; onOpen: () => void }) {
  const statusColor = partner.status === "approved" ? "#10B981" : partner.status === "rejected" ? "#EF4444" : "#F59E0B";
  return (
    <div
      className="rounded-xl border p-3.5 cursor-pointer transition-all hover:border-teal-500/30 group"
      style={{ backgroundColor: "#0A1628", borderColor: "#E9ECEF" }}
      onClick={onOpen}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-[#344767] flex-shrink-0" style={{ backgroundColor: "#00B5B820" }}>
          {partner.businessName?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-800 text-sm truncate">{partner.businessName}</div>
          <div className="text-xs mt-0.5 truncate" style={{ color: "#7B809A" }}>{partner.businessType}  {partner.serviceArea}</div>
        </div>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:text-teal-400 transition-colors" style={{ color: "#2A4A6F" }} />
      </div>
      {partner.contactEmail && (
        <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: "#7B809A" }}>
          <Mail className="w-3 h-3" />
          <span className="truncate">{partner.contactEmail}</span>
        </div>
      )}
      {partner.status === "rejected" && partner.rejectionReason && (
        <div className="mt-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#FCA5A5" }}>
          <FileText className="w-3 h-3 inline mr-1" />
          {partner.rejectionReason.length > 60 ? partner.rejectionReason.slice(0, 60) + "..." : partner.rejectionReason}
        </div>
      )}
    </div>
  );
}

// -- Main Page -----------------------------------------------------------------
export default function ApplicationPipeline() {
  const [actingId, setActingId] = useState<number | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [rejectTarget, setRejectTarget] = useState<any | null>(null);

  const { data: pending, refetch: refetchPending } = trpc.admin.getPendingApplications.useQuery();
  const { data: allPartners, refetch: refetchAll } = trpc.admin.getAllPartners.useQuery();

  const approve = trpc.admin.approvePartner.useMutation({
    onSuccess: () => {
      refetchPending(); refetchAll();
      setSelectedPartner(null);
      toast.success("Partner approved and notified");
    },
    onError: () => toast.error("Failed to approve partner"),
  });
  const reject = trpc.admin.rejectPartner.useMutation({
    onSuccess: () => {
      refetchPending(); refetchAll();
      setRejectTarget(null);
      setSelectedPartner(null);
      toast.success("Application rejected");
    },
    onError: () => toast.error("Failed to reject partner"),
  });

  const approved = (allPartners ?? []).filter((p: any) => p.status === "approved");
  const rejected = (allPartners ?? []).filter((p: any) => p.status === "rejected");

  const columns = [
    { stage: STAGES[0], items: pending ?? [] },
    { stage: STAGES[1], items: approved },
    { stage: STAGES[2], items: rejected },
  ];

  return (
    <AdminLayout title="Application Pipeline" subtitle="Partner onboarding  Review  Approve  Activate">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {columns.map(({ stage, items }) => (
          <div key={stage.key} className="rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center gap-2 mb-1">
              <stage.icon className="w-4 h-4" style={{ color: stage.color }} />
              <span className="text-xs" style={{ color: "#7B809A" }}>{stage.label}</span>
            </div>
            <div className="font-heading text-3xl" style={{ color: stage.color }}>{items.length}</div>
          </div>
        ))}
        {/* Onboarding Completion Rate */}
        <div className="rounded-xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-teal-500" />
            <span className="text-xs" style={{ color: "#7B809A" }}>Onboarding Rate</span>
          </div>
          <div className="font-heading text-3xl text-teal-500">
            {(() => {
              const total = (allPartners ?? []).length;
              const active = (allPartners ?? []).filter((p: any) => p.status === "approved" && (p.jobsLogged ?? 0) > 0).length;
              return total > 0 ? `${Math.round((active / total) * 100)}%` : "--";
            })()}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Partners with 1 job logged</div>
        </div>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {columns.map(({ stage, items }) => (
          <div key={stage.key} className="rounded-xl border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E9ECEF" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "#E9ECEF" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
              <span className="font-heading text-sm text-gray-800">{stage.label}</span>
              <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: `${stage.color}15`, color: stage.color }}>
                {items.length}
              </span>
            </div>
            <div className="p-3 space-y-2 min-h-32">
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <stage.icon className="w-6 h-6 mb-2" style={{ color: "#1E3A5F" }} />
                  <p className="text-xs" style={{ color: "#2A4A6F" }}>No {stage.label.toLowerCase()} partners</p>
                </div>
              )}
              {items.map((p: any) => (
                <PartnerCard
                  key={p.id}
                  partner={p}
                  onOpen={() => setSelectedPartner(p)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Partner Detail Drawer */}
      {selectedPartner && (
        <PartnerDrawer
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
          onApprove={selectedPartner.status === "pending" ? () => {
            setActingId(selectedPartner.id);
            approve.mutate({ partnerId: selectedPartner.id }, { onSettled: () => setActingId(null) });
          } : undefined}
          onRejectRequest={selectedPartner.status === "pending" ? () => {
            setRejectTarget(selectedPartner);
            setSelectedPartner(null);
          } : undefined}
          isActing={actingId === selectedPartner.id}
        />
      )}

      {/* Reject Reason Modal */}
      {rejectTarget && (
        <RejectModal
          partner={rejectTarget}
          isPending={reject.isPending}
          onConfirm={(reason) => {
            setActingId(rejectTarget.id);
            reject.mutate({ partnerId: rejectTarget.id }, { onSettled: () => setActingId(null) });
          }}
          onCancel={() => setRejectTarget(null)}
        />
      )}
    </AdminLayout>
  );
}
