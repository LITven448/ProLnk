/**
 * TrustyProScans — Admin view of all homeowner photo scan submissions.
 * Shows scan queue, AI analysis results, and home health scores.
 */
import AdminLayout from "@/components/AdminLayout";
import { T } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  Camera, Search, CheckCircle, Clock,
  Home, TrendingUp, Zap, Image, RefreshCw, Download, Eye, X, MapPin, Mail, Phone
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  pending: "#FBB140",
  processing: "#17C1E8",
  complete: "#82D616",
  failed: "#EA0606",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  complete: "Complete",
  failed: "Failed",
};

function ScanDetailModal({ scan, onClose }: { scan: any; onClose: () => void }) {
  if (!scan) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold" style={{ color: T.text }}>Scan Details</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:opacity-70" style={{ color: T.dim }}><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #49a3f1, #1A73E8)" }}>
              {(scan.homeownerName || "H")[0].toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: T.text }}>{scan.homeownerName || "Unknown"}</div>
              <div className="text-xs flex items-center gap-1" style={{ color: T.muted }}><Mail className="w-3 h-3" />{scan.homeownerEmail || "—"}</div>
            </div>
          </div>
          {scan.address && <div className="flex items-center gap-2 text-sm" style={{ color: T.muted }}><MapPin className="w-4 h-4 shrink-0" style={{ color: T.accent }} />{scan.address}</div>}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3" style={{ backgroundColor: T.bg }}>
              <div className="text-xs mb-1" style={{ color: T.muted }}>Status</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${STATUS_COLORS[scan.status] ?? T.dim}20`, color: STATUS_COLORS[scan.status] ?? T.dim }}>{STATUS_LABELS[scan.status] ?? scan.status}</span>
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: T.bg }}>
              <div className="text-xs mb-1" style={{ color: T.muted }}>Photos</div>
              <div className="text-sm font-bold" style={{ color: T.text }}>{scan.photoCount ?? "—"}</div>
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: T.bg }}>
              <div className="text-xs mb-1" style={{ color: T.muted }}>Health Score</div>
              <div className="text-sm font-bold" style={{ color: scan.healthScore >= 70 ? "#82D616" : scan.healthScore >= 40 ? "#FBB140" : "#EA0606" }}>{scan.healthScore != null ? `${scan.healthScore}/100` : "—"}</div>
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: T.bg }}>
              <div className="text-xs mb-1" style={{ color: T.muted }}>Submitted</div>
              <div className="text-sm font-bold" style={{ color: T.text }}>{scan.createdAt ? new Date(scan.createdAt).toLocaleDateString() : "—"}</div>
            </div>
          </div>
          {scan.aiSummary && (
            <div className="rounded-xl p-4" style={{ backgroundColor: `${T.accent}10`, border: `1px solid ${T.accent}30` }}>
              <div className="text-xs font-semibold mb-2" style={{ color: T.accent }}>AI Analysis Summary</div>
              <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{scan.aiSummary}</p>
            </div>
          )}
          {scan.reportUrl && (
            <a href={scan.reportUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: T.accent }}>
              <Download className="w-4 h-4" /> Download Full Report
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrustyProScans() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedScan, setSelectedScan] = useState<any>(null);

  const { data: scans, isLoading, refetch } = trpc.admin.getPhotoScans.useQuery(
    { search, status: statusFilter === "all" ? undefined : statusFilter },
    { refetchInterval: 30000 }
  );

  const stats = [
    {
      label: "Total Scans",
      value: scans?.total ?? "—",
      icon: Camera,
      bg: "linear-gradient(195deg, #49a3f1, #1A73E8)",
      sub: "All time",
    },
    {
      label: "Pending Review",
      value: scans?.pending ?? "—",
      icon: Clock,
      bg: "linear-gradient(195deg, #FFA726, #FB8C00)",
      sub: "Awaiting AI analysis",
    },
    {
      label: "Completed",
      value: scans?.completed ?? "—",
      icon: CheckCircle,
      bg: "linear-gradient(195deg, #66BB6A, #43A047)",
      sub: "Reports generated",
    },
    {
      label: "Avg. Health Score",
      value: scans?.avgScore ? `${scans.avgScore}/100` : "—",
      icon: TrendingUp,
      bg: "linear-gradient(195deg, #ab47bc, #8e24aa)",
      sub: "Across all homes",
    },
  ];

  return (
    <AdminLayout title="Photo Scans" subtitle="Homeowner photo submissions and AI analysis queue">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)" }}>
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: T.text }}>Photo Scan Queue</h1>
              <p className="text-sm" style={{ color: T.muted }}>AI-powered home analysis submissions from TrustyPro homeowners</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => { refetch(); toast.success("Refreshed"); }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl p-5 shadow-sm" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.bg }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: T.text }}>{stat.value}</div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: T.text }}>{stat.label}</div>
                <div className="text-xs" style={{ color: T.muted }}>{stat.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: T.dim }} />
            <Input
              placeholder="Search by homeowner name, address, or scan ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              style={{ backgroundColor: T.surface, borderColor: T.border, color: T.text }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "processing", "complete", "failed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
                style={{
                  backgroundColor: statusFilter === s ? T.accent : T.surface,
                  color: statusFilter === s ? "white" : T.muted,
                  border: `1px solid ${statusFilter === s ? T.accent : T.border}`,
                }}
              >
                {s === "all" ? "All" : STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Scan Table */}
        <div className="rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}>
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-6 h-6 animate-spin" style={{ color: T.accent }} />
              <span className="ml-3 text-sm" style={{ color: T.muted }}>Loading scans…</span>
            </div>
          ) : !scans?.items?.length ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${T.accent}15` }}>
                <Image className="w-8 h-8" style={{ color: T.accent }} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: T.text }}>No photo scans yet</h3>
              <p className="text-sm max-w-sm" style={{ color: T.muted }}>
                Once homeowners submit photos through the TrustyPro app, their scans will appear here for AI analysis and review.
              </p>
              <div className="mt-4 p-3 rounded-xl text-xs" style={{ backgroundColor: T.bg, color: T.muted }}>
                <Zap className="w-4 h-4 inline mr-1" style={{ color: "#FBB140" }} />
                Scans are processed automatically via AI — no manual action required unless flagged.
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                    {["Homeowner", "Address", "Submitted", "Photos", "Status", "Health Score", "Actions"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: T.muted }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scans.items.map((scan: any) => (
                    <tr key={scan.id} className="transition-colors hover:opacity-80" style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #49a3f1, #1A73E8)" }}>
                            {(scan.homeownerName || "H")[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold" style={{ color: T.text }}>{scan.homeownerName || "Unknown"}</div>
                            <div className="text-xs" style={{ color: T.muted }}>{scan.homeownerEmail || ""}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 shrink-0" style={{ color: T.dim }} />
                          <span className="text-sm" style={{ color: T.text }}>{scan.address || "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm" style={{ color: T.muted }}>
                          {scan.createdAt ? new Date(scan.createdAt).toLocaleDateString() : "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" style={{ color: T.dim }} />
                          <span className="text-sm font-semibold" style={{ color: T.text }}>{scan.photoCount ?? "—"}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: `${STATUS_COLORS[scan.status] ?? T.dim}20`,
                            color: STATUS_COLORS[scan.status] ?? T.dim,
                          }}
                        >
                          {STATUS_LABELS[scan.status] ?? scan.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {scan.healthScore != null ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: T.border }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${scan.healthScore}%`,
                                  backgroundColor: scan.healthScore >= 70 ? "#82D616" : scan.healthScore >= 40 ? "#FBB140" : "#EA0606",
                                }}
                              />
                            </div>
                            <span className="text-sm font-semibold" style={{ color: T.text }}>{scan.healthScore}</span>
                          </div>
                        ) : (
                          <span className="text-sm" style={{ color: T.dim }}>—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 rounded-lg transition-all hover:opacity-80"
                            style={{ backgroundColor: `${T.accent}15` }}
                            onClick={() => setSelectedScan(scan)}
                            title="View scan details"
                          >
                            <Eye className="w-3.5 h-3.5" style={{ color: T.accent }} />
                          </button>
                          {scan.reportUrl && (
                            <a
                              href={scan.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg transition-all hover:opacity-80"
                              style={{ backgroundColor: "#82D61615" }}
                              title="Download report"
                            >
                              <Download className="w-3.5 h-3.5" style={{ color: "#82D616" }} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ backgroundColor: `${T.accent}10`, border: `1px solid ${T.accent}30` }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${T.accent}20` }}>
            <Zap className="w-5 h-5" style={{ color: T.accent }} />
          </div>
          <div>
            <h4 className="text-sm font-bold mb-1" style={{ color: T.text }}>How Photo Scans Work</h4>
            <p className="text-xs leading-relaxed" style={{ color: T.muted }}>
              Homeowners upload photos through the TrustyPro app. The AI analyzes each image for maintenance needs, aging systems, safety issues, and improvement opportunities. A Home Health Score (0–100) is generated and the homeowner is matched with relevant ProLnk partners. Scans typically complete within 2–5 minutes.
            </p>
          </div>
        </div>

      </div>
      {selectedScan && <ScanDetailModal scan={selectedScan} onClose={() => setSelectedScan(null)} />}
    </AdminLayout>
  );
}
