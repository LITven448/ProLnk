import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Layers, DollarSign, MapPin, Loader2, Sparkles, CheckCircle2,
  Clock, UserCheck, TrendingUp, Hammer,
} from "lucide-react";

const NAVY = "#0A1628";
const YELLOW = "#FFD60A";

function money(n: number | null | undefined): string {
  return `$${(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const STATUS_LABEL: Record<string, { label: string; color: string; icon: any }> = {
  new: { label: "Queued", color: "#6b7280", icon: Clock },
  sent: { label: "Offered", color: "#2563eb", icon: Clock },
  accepted: { label: "Assigned", color: "#16a34a", icon: UserCheck },
  assigned: { label: "Assigned", color: "#16a34a", icon: UserCheck },
  expired: { label: "Unmatched", color: "#dc2626", icon: Clock },
};

function ComponentRow({ c }: { c: any }) {
  const meta = STATUS_LABEL[c.status] ?? { label: c.status, color: "#6b7280", icon: Clock };
  const Icon = meta.icon;
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border" style={{ borderColor: "#e5e7eb" }}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Hammer className="w-4 h-4" style={{ color: NAVY }} />
          <span className="font-bold" style={{ color: NAVY }}>{c.trade}</span>
        </div>
        <div className="text-sm text-gray-600 line-clamp-2">{c.description}</div>
        {c.assignedPartner && (
          <div className="text-xs mt-1 font-medium" style={{ color: "#16a34a" }}>
            {c.assignedPartner.businessName} ({c.assignedPartner.tier})
          </div>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="font-extrabold" style={{ color: NAVY }}>{money(c.estimatedValue)}</div>
        <div className="inline-flex items-center gap-1 text-xs font-semibold mt-1" style={{ color: meta.color }}>
          <Icon className="w-3 h-3" />{meta.label}
        </div>
      </div>
    </div>
  );
}

export default function ExchangeProject() {
  const [scope, setScope] = useState("");
  const [approvedTotal, setApprovedTotal] = useState("");
  const [postedTotal, setPostedTotal] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [projectId, setProjectId] = useState<number | null>(null);

  const project = trpc.exchange.getProject.useQuery(
    { projectId: projectId ?? 0 },
    { enabled: projectId != null, refetchInterval: projectId != null ? 8000 : false }
  );

  const post = trpc.exchange.postProject.useMutation({
    onSuccess: (res) => {
      setProjectId(res.projectId);
      toast.success(
        res.decomposed
          ? `Project broken into ${res.components.length} trade components and offered to best-matched pros.`
          : `Project posted as a single general contractor component.`
      );
    },
    onError: (err) => toast.error(err.message || "Failed to post project"),
  });

  function submit() {
    const approved = parseFloat(approvedTotal);
    const posted = postedTotal.trim() ? parseFloat(postedTotal) : approved;
    if (!scope.trim() || scope.trim().length < 10) return toast.error("Describe the project scope (10+ chars)");
    if (!Number.isFinite(approved) || approved < 100) return toast.error("Enter an approved total of $100+");
    if (!zip.trim()) return toast.error("Enter the property ZIP");
    post.mutate({
      scope: scope.trim(),
      approvedTotal: approved,
      postedTotal: posted,
      zip: zip.trim(),
      address: address.trim() || undefined,
    });
  }

  const p = project.data;

  return (
    <PartnerLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <Layers className="w-7 h-7" style={{ color: NAVY }} />
          <h1 className="text-2xl font-extrabold" style={{ color: NAVY }}>Exchange — Post a Project</h1>
        </div>
        <p className="text-gray-600 mb-8">
          Post a large multi-trade project. ProLnk AI breaks it into trade components and routes
          each as a fixed-price offer to the best-matched pro. Your margin is the spread between
          the homeowner-approved total and what you post.
        </p>

        {!projectId && (
          <div className="rounded-2xl border p-6 space-y-4 shadow-sm" style={{ borderColor: "#e5e7eb" }}>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: NAVY }}>Project scope</label>
              <textarea
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                rows={4}
                placeholder="e.g. Full kitchen remodel — demo existing, new plumbing rough-in, electrical, cabinets, countertops, tile backsplash, paint."
                className="w-full rounded-xl border px-3 py-2 text-sm"
                style={{ borderColor: "#d1d5db" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: NAVY }}>Homeowner-approved total</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input value={approvedTotal} onChange={(e) => setApprovedTotal(e.target.value)} inputMode="decimal"
                    placeholder="100000" className="w-full rounded-xl border pl-9 pr-3 py-2 text-sm" style={{ borderColor: "#d1d5db" }} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: NAVY }}>Posted total (optional)</label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input value={postedTotal} onChange={(e) => setPostedTotal(e.target.value)} inputMode="decimal"
                    placeholder="90000" className="w-full rounded-xl border pl-9 pr-3 py-2 text-sm" style={{ borderColor: "#d1d5db" }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: NAVY }}>Property ZIP</label>
                <input value={zip} onChange={(e) => setZip(e.target.value)}
                  placeholder="75201" className="w-full rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "#d1d5db" }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: NAVY }}>Address (optional)</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input value={address} onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St" className="w-full rounded-xl border pl-9 pr-3 py-2 text-sm" style={{ borderColor: "#d1d5db" }} />
                </div>
              </div>
            </div>
            <Button onClick={submit} disabled={post.isPending}
              className="w-full font-bold" style={{ background: NAVY, color: YELLOW }}>
              {post.isPending
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Decomposing & routing offers…</>
                : <><Sparkles className="w-4 h-4 mr-2" /> Post project & route offers</>}
            </Button>
          </div>
        )}

        {projectId && (
          <div className="space-y-6">
            {project.isLoading && <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading project…</div>}
            {p && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl p-5 border shadow-sm" style={{ background: NAVY, color: "white", borderColor: NAVY }}>
                    <div className="text-xs font-semibold uppercase opacity-80 mb-1">Approved</div>
                    <div className="text-xl font-extrabold">{money(p.approvedTotal)}</div>
                  </div>
                  <div className="rounded-2xl p-5 border shadow-sm" style={{ borderColor: "#e5e7eb", color: NAVY }}>
                    <div className="text-xs font-semibold uppercase opacity-70 mb-1">Posted</div>
                    <div className="text-xl font-extrabold">{money(p.postedTotal)}</div>
                  </div>
                  <div className="rounded-2xl p-5 border shadow-sm" style={{ borderColor: "#e5e7eb", color: NAVY }}>
                    <div className="flex items-center gap-1 text-xs font-semibold uppercase opacity-70 mb-1">
                      <TrendingUp className="w-3 h-3" /> Your margin
                    </div>
                    <div className="text-xl font-extrabold" style={{ color: "#16a34a" }}>{money(p.scoutMargin)}</div>
                  </div>
                </div>

                <div className="rounded-2xl border p-6 shadow-sm" style={{ borderColor: "#e5e7eb" }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold flex items-center gap-2" style={{ color: NAVY }}>
                      <Layers className="w-5 h-5" /> Trade components ({p.components.length})
                    </h2>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> live — refreshes automatically
                    </span>
                  </div>
                  <div className="space-y-3">
                    {p.components.map((c) => <ComponentRow key={c.opportunityId} c={c} />)}
                  </div>
                </div>

                <Button variant="outline" onClick={() => { setProjectId(null); setScope(""); setApprovedTotal(""); setPostedTotal(""); setZip(""); setAddress(""); }}>
                  Post another project
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
