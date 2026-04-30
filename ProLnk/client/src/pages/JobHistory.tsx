import { useState } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Loader2, Camera, Zap, CheckCircle, Clock, AlertCircle,
  MapPin, ChevronDown, ChevronUp, Plus
} from "lucide-react";
import PartnerLayout from "@/components/PartnerLayout";

const STATUS_CONFIG = {
  logged: { label: "Logged", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
  analyzed: { label: "Analyzed", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  processing: { label: "Analyzing...", icon: Loader2, color: "text-yellow-600", bg: "bg-yellow-50" },
  failed: { label: "Analysis Failed", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
};

const AI_STATUS_CONFIG = {
  pending: { label: "Queued", color: "text-gray-500" },
  processing: { label: "Analyzing...", color: "text-yellow-600" },
  complete: { label: "Complete", color: "text-green-600" },
  failed: { label: "Failed", color: "text-red-500" },
};

type Job = {
  id: number;
  serviceAddress: string;
  serviceType: string | null;
  aiAnalysisStatus: string;
  status: string;
  createdAt: Date;
  photoUrls: string[];
  aiAnalysisResult: unknown;
  notes: string | null;
  customerName: string | null;
};

function JobCard({ job }: { job: Job }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = STATUS_CONFIG[job.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.logged;
  const aiCfg = AI_STATUS_CONFIG[job.aiAnalysisStatus as keyof typeof AI_STATUS_CONFIG] ?? AI_STATUS_CONFIG.pending;
  const StatusIcon = statusCfg.icon;
  const photos: string[] = Array.isArray(job.photoUrls) ? (job.photoUrls as string[]) : [];

  // Parse AI results
  type AiOpportunity = { type: string; confidence: number; description: string; estimatedValue: number };
  const aiResult = job.aiAnalysisResult as { opportunities?: AiOpportunity[]; analysisNotes?: string } | null;
  const opportunities = aiResult?.opportunities ?? [];

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${statusCfg.bg}`}>
                <StatusIcon className={`w-4 h-4 ${statusCfg.color} ${job.aiAnalysisStatus === "processing" ? "animate-spin" : ""}`} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {job.serviceType ?? "Service Job"}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{job.serviceAddress}</span>
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</p>
              <p className={`text-xs font-medium ${aiCfg.color}`}>{aiCfg.label}</p>
            </div>
          </div>

          {/* Photo strip */}
          {photos.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {photos.slice(0, 4).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                />
              ))}
              {photos.length > 4 && (
                <div className="w-16 h-16 rounded-lg flex-shrink-0 bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-medium">+{photos.length - 4}</span>
                </div>
              )}
            </div>
          )}

          {/* AI opportunities summary */}
          {opportunities.length > 0 && (
            <div className="flex items-center gap-2 p-2 rounded-lg mb-3"
              style={{ backgroundColor: "var(--teal-light)" }}>
              <Zap className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--teal)" }} />
              <p className="text-xs font-medium" style={{ color: "var(--teal)" }}>
                {opportunities.length} opportunit{opportunities.length === 1 ? "y" : "ies"} detected
              </p>
            </div>
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#0A1628] transition-colors w-full"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? "Hide" : "Show"} details
          </button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-3">
            {job.customerName && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Customer</p>
                <p className="text-sm text-gray-700">{job.customerName}</p>
              </div>
            )}
            {job.notes && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Notes</p>
                <p className="text-sm text-gray-600">{job.notes}</p>
              </div>
            )}
            {opportunities.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">AI-Detected Opportunities</p>
                <div className="space-y-2">
                  {opportunities.map((opp, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-800 capitalize">
                          {opp.type.replace(/_/g, " ")}
                        </span>
                        <span className="text-xs font-bold text-[#0A1628]">
                          {Math.round(opp.confidence * 100)}% confident
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{opp.description}</p>
                      {opp.estimatedValue && (
                        <p className="text-xs text-green-600 font-medium mt-1">
                          Est. value: ${opp.estimatedValue.toLocaleString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {job.aiAnalysisStatus === "complete" && opportunities.length === 0 && (
              <div className="text-center py-2">
                <p className="text-xs text-gray-400">No opportunities detected in this job's photos.</p>
              </div>
            )}
            {job.aiAnalysisStatus === "failed" && (
              <div className="text-center py-2">
                <p className="text-xs text-red-400">AI analysis failed for this job. Photos may be unclear.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function JobHistory() {
  const [, navigate] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const { data: jobs, isLoading } = trpc.partners.getMyJobs.useQuery();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#0A1628]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 px-4">
        <h2 className="text-2xl font-heading text-gray-900">Sign In Required</h2>
        <Button className="text-white" style={{ backgroundColor: "var(--teal)" }}
          onClick={() => { window.location.href = getLoginUrl(); }}>
          Sign In
        </Button>
      </div>
    );
  }

  const analyzedCount = (jobs ?? []).filter((j: unknown) => (j as Job).aiAnalysisStatus === "complete").length;
  const opportunitiesCount = (jobs ?? []).reduce((sum: number, j: unknown) => {
    const job = j as Job;
    const result = job.aiAnalysisResult as { opportunities?: unknown[] } | null;
    return sum + (result?.opportunities?.length ?? 0);
  }, 0);

  return (
    <PartnerLayout>
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-gray-900 tracking-wide text-sm font-semibold">JOB HISTORY</span>
          </div>
          <Button
            size="sm"
            className="gap-1.5 text-white font-heading"
            style={{ backgroundColor: "var(--teal)" }}
            onClick={() => navigate("/job/new")}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Log Job</span>
          </Button>
         </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total Jobs", value: jobs?.length ?? 0, icon: Camera },
            { label: "Analyzed", value: analyzedCount, icon: CheckCircle },
            { label: "Opportunities", value: opportunitiesCount, icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
              <stat.icon className="w-4 h-4 mx-auto mb-1 text-[#0A1628]" />
              <p className="text-xl font-heading text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Job list */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : !jobs?.length ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "var(--teal-light)" }}>
              <Camera className="w-8 h-8" style={{ color: "var(--teal)" }} />
            </div>
            <h3 className="text-lg font-heading text-gray-700 mb-2">No Jobs Logged Yet</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
              Start logging completed jobs to let the AI find referral opportunities for you.
            </p>
            <Button
              className="text-white font-heading gap-2"
              style={{ backgroundColor: "var(--teal)" }}
              onClick={() => navigate("/job/new")}
            >
              <Camera className="w-4 h-4" /> Log Your First Job
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {(jobs as unknown as Job[]).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
    </PartnerLayout>
  );
}
