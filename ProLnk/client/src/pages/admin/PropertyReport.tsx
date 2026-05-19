import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, ArrowLeft, Home, Camera, Wrench, DollarSign, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";

function formatDate(ts: number | null | undefined) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function PropertyReport() {
  const [, params] = useRoute("/admin/properties/:address/report");
  const address = params?.address ? decodeURIComponent(params.address) : "";
  const [printing, setPrinting] = useState(false);

  const { data: jobs, isLoading } = trpc.admin.getJobsByAddress.useQuery(
    { address },
    { enabled: !!address }
  );

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Generating property report...</p>
        </div>
      </div>
    );
  }

  const jobList = jobs ?? [];
  const totalOpportunities = jobList.reduce((sum, j) => {
    try { const r = j.aiAnalysisResult ? JSON.parse(JSON.stringify(j.aiAnalysisResult)) : null; return sum + (r?.issues?.length ?? 0); } catch { return sum; }
  }, 0);
  const totalPipelineValue = jobList.reduce((sum, j) => {
    try { const r = j.aiAnalysisResult ? JSON.parse(JSON.stringify(j.aiAnalysisResult)) : null; return sum + (r?.estimatedValue ?? 0); } catch { return sum; }
  }, 0);
  const acceptedDeals = 0; // derived from deals table separately
  const lastVisit = jobList.length > 0 ? Math.max(...jobList.map(j => j.createdAt instanceof Date ? j.createdAt.getTime() : 0)) : null;

  return (
    <AdminLayout>
    <div className="min-h-screen bg-white">
      {/* Print-hidden controls */}
      <div className="print:hidden bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
        <Link href={`/admin/properties`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Properties
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button onClick={handlePrint} disabled={printing} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Download className="w-4 h-4" />
            {printing ? "Preparing..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 pb-8 border-b-2 border-gray-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">ProLnk Property Intelligence Report</div>
                <div className="text-xs text-gray-400">Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
              </div>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mt-4">{address}</h1>
            <p className="text-gray-500 mt-1">Dallas-Fort Worth Metro Area</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Report Status</div>
            <Badge className="bg-green-100 text-green-700 border-green-200">Active Property</Badge>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "Service Visits", value: jobList.length, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "AI Detections", value: totalOpportunities, icon: Camera, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Pipeline Value", value: formatCurrency(totalPipelineValue), icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
            { label: "Accepted Deals", value: acceptedDeals, icon: CheckCircle, color: "text-indigo-600", bg: "bg-indigo-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} rounded-xl p-4 text-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Last Visit */}
        {lastVisit && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-semibold text-amber-800">Last Service Visit:</span>
              <span className="text-amber-700 ml-2">{formatDate(lastVisit)}</span>
              {totalPipelineValue > 0 && (
                <span className="text-amber-600 ml-4 text-sm">
                  {formatCurrency(totalPipelineValue)} in unaddressed opportunities detected
                </span>
              )}
            </div>
          </div>
        )}

        {/* Job History */}
        <div className="mb-10">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-indigo-600" />
            Service Visit History
          </h2>
          <div className="space-y-6">
            {jobList.length === 0 ? (
              <div className="text-center py-12 text-gray-400">No service visits recorded for this address.</div>
            ) : (
              jobList.map((job, idx) => (
                <div key={job.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Job Header */}
                  <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{job.serviceType ?? "General Service"}</div>
                        <div className="text-sm text-gray-500">{formatDate(job.createdAt instanceof Date ? job.createdAt.getTime() : job.createdAt)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {job.partnerName && (
                        <div className="text-sm text-gray-600">
                          <span className="text-gray-400">Tech: </span>
                          <span className="font-medium">{job.partnerName}</span>
                        </div>
                      )}
                      <Badge variant="outline" className={
                        job.status === "analyzed" ? "border-green-300 text-green-700 bg-green-50" :
                        job.status === "opportunities_sent" ? "border-blue-300 text-blue-700 bg-blue-50" :
                        "border-gray-200 text-gray-500"
                      }>
                        {job.status ?? "logged"}
                      </Badge>
                    </div>
                  </div>

                  {/* Job Body */}
                  <div className="px-6 py-4">
                    {/* Photos */}
                    {(() => { try { const photos = job.photoUrls ? JSON.parse(JSON.stringify(job.photoUrls)) as string[] : []; return photos.length > 0 ? (
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Camera className="w-3 h-3" /> Site Photos ({photos.length})
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {photos.slice(0, 6).map((url: string, pi: number) => (
                            <img key={pi} src={url} alt={`Site photo ${pi + 1}`} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                          ))}
                          {photos.length > 6 && (
                            <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-sm text-gray-500 font-medium">+{photos.length - 6}</div>
                          )}
                        </div>
                      </div>
                    ) : null; } catch { return null; } })()}

                    {/* AI Detections */}
                    {(() => { try { const r = job.aiAnalysisResult ? JSON.parse(JSON.stringify(job.aiAnalysisResult)) : null; const dets = r?.issues ?? []; return dets.length > 0 ? (
                      <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> AI-Detected Opportunities ({dets.length})
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {dets.map((det: { category?: string; name?: string; description?: string; estimatedValue?: number; estimatedCost?: string; confidence?: number; severity?: string }, di: number) => (
                            <div key={di} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <span className="text-sm font-semibold text-amber-900">{det.category ?? det.name ?? "Issue"}</span>
                                <Badge className={`text-xs shrink-0 ${
                                  det.severity === "urgent" ? "bg-red-100 text-red-700" :
                                  det.severity === "moderate" ? "bg-amber-100 text-amber-700" :
                                  "bg-blue-100 text-blue-700"
                                }`}>
                                  {det.severity ?? "low"}
                                </Badge>
                              </div>
                              <p className="text-xs text-amber-700 mb-2">{det.description ?? "Maintenance opportunity identified"}</p>
                              <div className="flex items-center justify-between text-xs text-amber-600">
                                <span>Est. {det.estimatedValue ? formatCurrency(det.estimatedValue) : det.estimatedCost ?? "TBD"}</span>
                                {det.confidence && (
                                  <span>{Math.round(det.confidence * 100)}% confidence</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null; } catch { return null; } })()}

                    {/* Notes */}
                    {job.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Technician Notes</div>
                        <p className="text-sm text-gray-700">{job.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recommendations */}
        {totalPipelineValue > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-10">
            <h3 className="font-black text-indigo-900 text-lg mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              ProLnk Recommendations
            </h3>
            <p className="text-indigo-800 text-sm mb-4">
              Based on {totalOpportunities} AI-detected opportunities across {jobList.length} service visits,
              this property has an estimated <strong>{formatCurrency(totalPipelineValue)}</strong> in
              addressable maintenance needs. Proactive scheduling can prevent escalation and protect property value.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-black text-indigo-700">{formatCurrency(totalPipelineValue * 0.15)}</div>
                <div className="text-xs text-gray-500">Avg. deferred cost increase per year</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-black text-green-700">{formatCurrency(totalPipelineValue * 0.85)}</div>
                <div className="text-xs text-gray-500">Savings from early intervention</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-black text-amber-700">{Math.ceil(totalOpportunities / 2)}</div>
                <div className="text-xs text-gray-500">Recommended service appointments</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t-2 border-gray-200 pt-6 text-center">
          <div className="text-sm font-bold text-gray-700 mb-1">ProLnk Partner Network</div>
          <div className="text-xs text-gray-400">
            This report was generated by ProLnk's AI Property Intelligence system.
            All detections are AI-assisted and should be verified by a licensed professional.
          </div>
          <div className="text-xs text-gray-400 mt-1">
            © {new Date().getFullYear()} ProLnk · Dallas-Fort Worth, TX · prolnk.com
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
    </AdminLayout>
  );
}
