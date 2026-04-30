import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Package, Users, TrendingUp, Zap, CheckCircle2, AlertCircle,
  Home, Wrench, Layers, ArrowRight, RefreshCw, DollarSign,
  Target, Shield, Clock, Star, ChevronDown, ChevronUp,
} from "lucide-react";

// ─── Demo Issues for Testing ─────────────────────────────────────────────────
const DEMO_ISSUES = [
  { id: "1", type: "lawn_care", category: "landscape", confidence: 0.92, estimatedValue: 180, description: "Overgrown grass and weeds visible throughout front yard" },
  { id: "2", type: "pressure_washing", category: "exterior", confidence: 0.87, estimatedValue: 250, description: "Heavy algae staining on driveway and walkway" },
  { id: "3", type: "gutter_cleaning", category: "exterior", confidence: 0.78, estimatedValue: 150, description: "Gutters visibly clogged with leaf debris" },
  { id: "4", type: "pest_control", category: "services", confidence: 0.71, estimatedValue: 120, description: "Ant mounds visible near foundation" },
  { id: "5", type: "window_cleaning", category: "exterior", confidence: 0.65, estimatedValue: 200, description: "Significant grime buildup on exterior windows" },
];

// ─── Bundle Result Card ───────────────────────────────────────────────────────
function BundleResultCard({ bundle }: { bundle: any }) {
  const [expanded, setExpanded] = useState(false);

  if (!bundle) return null;

  const savingsPercent = bundle.estimatedTotalValue > 0
    ? Math.round((bundle.estimatedSavings / bundle.estimatedTotalValue) * 100)
    : 0;

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Bundle Generated</h3>
          <p className="text-sm text-zinc-400 mt-0.5">
            {bundle.assignments?.length ?? 0} pros cover {bundle.issues?.length ?? 0} issues in{" "}
            {bundle.assignments?.length ?? 0} visit{bundle.assignments?.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400">
            ${(bundle.estimatedTotalValue ?? 0).toLocaleString()}
          </div>
          <div className="text-xs text-emerald-300">
            saves ${(bundle.estimatedSavings ?? 0).toLocaleString()} ({savingsPercent}%)
          </div>
        </div>
      </div>

      {/* Coverage bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Coverage Score</span>
          <span>{Math.round((bundle.coverageScore ?? 0) * 100)}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
            style={{ width: `${Math.round((bundle.coverageScore ?? 0) * 100)}%` }}
          />
        </div>
      </div>

      {/* Assignments */}
      <div className="space-y-3">
        {(bundle.assignments ?? []).map((assignment: any, i: number) => (
          <div key={i} className="rounded-lg bg-zinc-800/60 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{assignment.pro?.partnerName ?? "Pro"}</div>
                  <div className="text-xs text-zinc-400">
                    PPS: {assignment.pro?.priorityScore ?? 0} · {assignment.pro?.tier ?? "scout"}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">
                  ${(assignment.estimatedBundleValue ?? 0).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-400">
                  {assignment.assignedIssues?.length ?? 0} issue{assignment.assignedIssues?.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {(assignment.assignedIssues ?? []).map((issue: any, j: number) => (
                <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300">
                  {issue.type?.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unmatched issues */}
      {(bundle.unmatchedIssues ?? []).length > 0 && (
        <div className="rounded-lg bg-amber-950/30 border border-amber-500/20 p-3">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-2">
            <AlertCircle className="w-4 h-4" />
            {bundle.unmatchedIssues.length} issue{bundle.unmatchedIssues.length !== 1 ? "s" : ""} unmatched
          </div>
          <div className="flex flex-wrap gap-1">
            {bundle.unmatchedIssues.map((issue: any, i: number) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-amber-900/40 text-amber-300">
                {issue.type?.replace(/_/g, " ")}
              </span>
            ))}
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            No qualified partners found for these categories. Add more partners to improve coverage.
          </p>
        </div>
      )}

      {/* Bundle message */}
      {bundle.bundleMessage && (
        <div className="rounded-lg bg-zinc-800/40 p-3 border-l-2 border-emerald-500">
          <p className="text-sm text-zinc-300 italic">"{bundle.bundleMessage}"</p>
        </div>
      )}

      {/* Raw JSON toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        {expanded ? "Hide" : "Show"} raw bundle data
      </button>
      {expanded && (
        <pre className="text-xs bg-zinc-900 rounded p-3 overflow-auto max-h-64 text-zinc-300">
          {JSON.stringify(bundle, null, 2)}
        </pre>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BundleOffers() {
  const [testAddress, setTestAddress] = useState("123 Main St, Dallas TX 75201");
  const [customIssues, setCustomIssues] = useState(DEMO_ISSUES);
  const [bundleResult, setBundleResult] = useState<any>(null);

  const { data: stats, refetch: refetchStats } = trpc.bundleOffers.stats.useQuery();

  const createBundle = trpc.bundleOffers.createBundle.useMutation({
    onSuccess: (data) => {
      if (data.success && data.bundle) {
        setBundleResult(data.bundle);
        toast.success(`Bundle generated — ${data.bundle.assignments?.length ?? 0} pros matched to ${data.bundle.totalIssues ?? 0} issues`);
        refetchStats();
      } else {
        toast.error("No bundle possible — no qualified partners found for these issues");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleGenerateBundle = () => {
    createBundle.mutate({
      addressId: testAddress,
      issues: customIssues,
      requestedByHomeowner: true,
    });
  };

  return (
    <AdminLayout>
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Job Bundler Engine</h1>
        <p className="text-zinc-400 mt-1">
          Intelligently groups multiple detected issues into the fewest pro visits possible — maximizing homeowner convenience and average ticket size.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Partners", value: stats?.activePartners ?? 0, icon: Users, color: "text-blue-400" },
          { label: "Bundles Generated", value: stats?.total ?? 0, icon: Package, color: "text-emerald-400" },
          { label: "Accepted", value: stats?.accepted ?? 0, icon: CheckCircle2, color: "text-green-400" },
          { label: "Est. Value Bundled", value: `$${((stats?.totalEstimatedValue ?? 0) / 1000).toFixed(1)}k`, icon: DollarSign, color: "text-amber-400" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-400">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-60`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Algorithm Explanation */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              Bundling Algorithm
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-400">
              Uses a greedy set-cover algorithm to find the minimum number of pros that collectively cover all detected issues at an address.
            </p>
            <div className="space-y-3">
              {[
                { step: "1", title: "Issue Detection", desc: "Waterfall AI identifies all service opportunities from photos", icon: Target, color: "bg-blue-600/20 text-blue-400" },
                { step: "2", title: "Pro Matching", desc: "Each issue matched to qualified pros in the network by service type, location, and PPS score", icon: Users, color: "bg-purple-600/20 text-purple-400" },
                { step: "3", title: "Greedy Set Cover", desc: "Selects the fewest pros that cover the most issues — optimal within ~63% of theoretical best", icon: Zap, color: "bg-amber-600/20 text-amber-400" },
                { step: "4", title: "Bundle Offer", desc: "Homeowner receives one offer: 'X pros can handle all Y projects in Z visits'", icon: Package, color: "bg-emerald-600/20 text-emerald-400" },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-zinc-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="bg-zinc-800" />
            <div className="space-y-2">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Rate Limiting Rules</p>
              <div className="space-y-1 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span><strong className="text-white">Homeowner-initiated:</strong> No limits — surface everything, always</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <span><strong className="text-white">AI-initiated outreach:</strong> Max 1 bundle per address per 14 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span><strong className="text-white">Historical photos:</strong> Home Health Vault updates only — no outreach</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Bundle Tester */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
              Live Bundle Tester
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300 text-sm">Service Address</Label>
              <Input
                value={testAddress}
                onChange={(e) => setTestAddress(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="123 Main St, Dallas TX 75201"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-zinc-300 text-sm">Detected Issues ({customIssues.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {customIssues.map((issue, i) => (
                  <div key={issue.id} className="flex items-center justify-between rounded-lg bg-zinc-800/60 px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Wrench className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span className="text-sm text-zinc-300 truncate">{issue.type.replace(/_/g, " ")}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-zinc-500">{Math.round(issue.confidence * 100)}%</span>
                      <span className="text-xs text-emerald-400">${issue.estimatedValue}</span>
                      <button
                        onClick={() => setCustomIssues(prev => prev.filter((_, j) => j !== i))}
                        className="text-zinc-600 hover:text-red-400 text-xs ml-1"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCustomIssues(DEMO_ISSUES)}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Reset to demo issues
              </button>
            </div>

            <Button
              onClick={handleGenerateBundle}
              disabled={createBundle.isPending || customIssues.length === 0}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              {createBundle.isPending ? (
                <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Generating Bundle...</>
              ) : (
                <><Package className="w-4 h-4 mr-2" /> Generate Bundle</>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bundle Result */}
      {bundleResult && <BundleResultCard bundle={bundleResult} />}

      {/* How it benefits everyone */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Why Bundling Wins for Everyone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Homeowner",
                icon: Home,
                color: "text-blue-400",
                bg: "bg-blue-600/10 border-blue-500/20",
                points: [
                  "Fewer strangers at the door",
                  "One coordinated visit instead of 5",
                  "Bundled pricing = better deals",
                  "All issues addressed at once",
                ],
              },
              {
                title: "Service Pro",
                icon: Wrench,
                color: "text-emerald-400",
                bg: "bg-emerald-600/10 border-emerald-500/20",
                points: [
                  "Higher average ticket per visit",
                  "Pre-qualified multi-service lead",
                  "Less competition per job",
                  "Network referral credit earned",
                ],
              },
              {
                title: "ProLnk",
                icon: TrendingUp,
                color: "text-purple-400",
                bg: "bg-purple-600/10 border-purple-500/20",
                points: [
                  "Multiple commissions per address",
                  "Higher homeowner trust & retention",
                  "Differentiated from Angi/Thumbtack",
                  "Network density compounds value",
                ],
              },
            ].map((group) => (
              <div key={group.title} className={`rounded-xl border p-4 ${group.bg}`}>
                <div className="flex items-center gap-2 mb-3">
                  <group.icon className={`w-5 h-5 ${group.color}`} />
                  <span className={`font-semibold ${group.color}`}>{group.title}</span>
                </div>
                <ul className="space-y-1.5">
                  {group.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <ArrowRight className={`w-3 h-3 mt-0.5 flex-shrink-0 ${group.color}`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
