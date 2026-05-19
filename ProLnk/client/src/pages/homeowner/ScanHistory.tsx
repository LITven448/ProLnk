import { trpc } from "@/lib/trpc";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Camera, ClipboardList, AlertTriangle, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

function SeverityBadge({ flag }: { flag: string | null }) {
  if (!flag || flag === "ok") return null;
  const map: Record<string, { label: string; color: string }> = {
    too_dark: { label: "Too Dark", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    too_blurry: { label: "Blurry", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    too_far: { label: "Too Far", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    retake_needed: { label: "Retake Needed", color: "bg-red-100 text-red-700 border-red-200" },
  };
  const info = map[flag] ?? { label: flag, color: "bg-gray-100 text-gray-600 border-gray-200" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${info.color}`}>
      <AlertTriangle className="w-3 h-3" /> {info.label}
    </span>
  );
}

function ConditionBadge({ condition }: { condition: string }) {
  const map: Record<string, string> = {
    excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    good: "bg-green-100 text-green-700 border-green-200",
    fair: "bg-yellow-100 text-yellow-700 border-yellow-200",
    poor: "bg-orange-100 text-orange-700 border-orange-200",
    critical: "bg-red-100 text-red-700 border-red-200",
    unknown: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const color = map[condition?.toLowerCase()] ?? map.unknown;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${color}`}>
      {condition ?? "Unknown"}
    </span>
  );
}

export default function ScanHistory() {
  const { data: scans, isLoading } = trpc.homeowner.getScanHistory.useQuery(undefined, { retry: false });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <HomeownerLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Scan History</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {isLoading ? "Loading..." : `${scans?.length ?? 0} scan${scans?.length !== 1 ? "s" : ""} on record`}
            </p>
          </div>
          <Link href="/trustypro/scan">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#0A1628] hover:bg-teal-700 transition-colors">
              <Camera className="w-4 h-4" /> New Scan
            </button>
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 h-24 animate-pulse" />
            ))}
          </div>
        ) : !scans || scans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">No scans yet</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-5">
              Run your first AI Home Scan to start building your home's history. Every scan is saved here automatically.
            </p>
            <Link href="/trustypro/scan">
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0A1628] hover:bg-teal-700 transition-colors">
                Start Your First Scan
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {scans.map((scan: any, idx: number) => {
              const analysis = typeof scan.analysisJson === 'string' ? JSON.parse(scan.analysisJson) : scan.analysisJson;
              const photos: string[] = typeof scan.photoUrls === 'string' ? JSON.parse(scan.photoUrls) : scan.photoUrls ?? [];
              const isOpen = expanded === idx;
              return (
                <div key={scan.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <button
                    className="w-full text-left p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : idx)}
                  >
                    {/* Thumbnail */}
                    {photos[0] ? (
                      <img src={photos[0]} alt="scan" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Camera className="w-6 h-6 text-slate-400" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-semibold text-gray-900 text-sm">
                          {scan.roomLabel ?? "Home Scan"}
                        </span>
                        <ConditionBadge condition={scan.overallCondition} />
                        <SeverityBadge flag={scan.photoQualityFlag} />
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(scan.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        {" · "}
                        {scan.issueCount ?? 0} issue{scan.issueCount !== 1 ? "s" : ""}
                        {scan.upgradeCount > 0 ? ` · ${scan.upgradeCount} upgrade${scan.upgradeCount !== 1 ? "s" : ""}` : ""}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded detail */}
                  {isOpen && analysis && (
                    <div className="px-5 pb-5 border-t border-slate-50 pt-4 space-y-4">
                      {/* Photo strip */}
                      {photos.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {photos.map((url: string, i: number) => (
                            <img key={i} src={url} alt={`photo ${i + 1}`} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                          ))}
                        </div>
                      )}

                      {/* Issues */}
                      {analysis.issues?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Issues Detected</h4>
                          <div className="space-y-2">
                            {analysis.issues.map((issue: any, i: number) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-medium text-gray-800">{issue.name}</span>
                                  {issue.estimatedCost && (
                                    <span className="text-gray-400 ml-2 text-xs">{issue.estimatedCost}</span>
                                  )}
                                  <p className="text-gray-500 text-xs mt-0.5">{issue.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Upgrades */}
                      {analysis.upgrades?.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Upgrade Opportunities</h4>
                          <div className="space-y-2">
                            {analysis.upgrades.map((upgrade: any, i: number) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-medium text-gray-800">{upgrade.title ?? upgrade.name}</span>
                                  {upgrade.estimatedValue && (
                                    <span className="text-gray-400 ml-2 text-xs">{upgrade.estimatedValue}</span>
                                  )}
                                  <p className="text-gray-500 text-xs mt-0.5">{upgrade.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </HomeownerLayout>
  );
}
