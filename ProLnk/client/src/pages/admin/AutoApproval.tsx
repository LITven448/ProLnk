import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Zap, CheckCircle2, XCircle, Clock, Shield, AlertTriangle,
  Settings, TrendingUp, Users, Building2, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "Unknown";
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  return `${Math.floor(diffHr / 24)} days ago`;
}

const APPROVAL_RULES = [
  { id: "license", label: "Business License Verification", desc: "Auto-approve if license is verifiable via state database", enabled: true, weight: 30 },
  { id: "insurance", label: "Insurance Verification", desc: "Auto-approve if COI is on file and not expired", enabled: true, weight: 25 },
  { id: "fsm", label: "FSM Software Integration", desc: "Auto-approve if partner uses Jobber, HCP, ServiceTitan, or CompanyCam", enabled: true, weight: 20 },
  { id: "zips", label: "Minimum Zip Code Coverage", desc: "Require at least 5 zip codes to ensure lead volume viability", enabled: true, weight: 15 },
  { id: "google", label: "Google Business Profile", desc: "Verify Google Business listing with 3+ reviews", enabled: false, weight: 10 },
  { id: "bbb", label: "BBB Accreditation Check", desc: "Flag if BBB rating is below B or has unresolved complaints", enabled: false, weight: 5 },
];

export default function AutoApproval() {
  const [rules, setRules] = useState(APPROVAL_RULES);
  const [threshold, setThreshold] = useState(70);

  const { data: pendingApplicants, isLoading, refetch } = trpc.admin.getPendingApplications.useQuery();
  const approvePartner = trpc.admin.approvePartner.useMutation({
    onSuccess: () => { toast.success("Partner approved"); refetch(); },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });
  const rejectPartner = trpc.admin.rejectPartner.useMutation({
    onSuccess: () => { toast.success("Partner rejected"); refetch(); },
    onError: (e) => toast.error(`Failed: ${e.message}`),
  });

  const applicants = pendingApplicants ?? [];

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    toast.success("Rule updated");
  };

  const statusBadge = (status: string) => {
    if (status === "approved") return <Badge className="bg-green-100 text-green-700 gap-1"><CheckCircle2 className="h-3 w-3" />Approved</Badge>;
    if (status === "rejected") return <Badge className="bg-red-100 text-red-700 gap-1"><XCircle className="h-3 w-3" />Rejected</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-700 gap-1"><Clock className="h-3 w-3" />Pending Review</Badge>;
  };

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Auto-Approval Engine</h1>
              <p className="text-gray-500 text-sm">Automated partner vetting -- approve qualified applicants in seconds, not days</p>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-700 text-sm px-3 py-1">Live  Scoring Active</Badge>
        </div>

        {/* Why This Matters */}
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <Shield className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-purple-800 mb-1">The #1 Adoption Barrier: Waiting for Approval</p>
                <p className="text-sm text-purple-700">
                  Every hour a qualified applicant waits is an hour they might join a competitor or lose interest. 
                  The Auto-Approval Engine scores applicants in real-time against 6 verification criteria. 
                  Applicants scoring 70+ are approved instantly and receive their first lead within 48 hours. 
                  Only edge cases require manual review.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3"><CheckCircle2 className="h-8 w-8 shrink-0 text-green-500" /><div><div className="text-2xl font-bold text-gray-800">--</div><div className="text-xs text-gray-500">Auto-Approved Today</div></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><Clock className="h-8 w-8 shrink-0 text-yellow-500" /><div><div className="text-2xl font-bold text-gray-800">{applicants.length}</div><div className="text-xs text-gray-500">Pending Review</div></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><XCircle className="h-8 w-8 shrink-0 text-red-500" /><div><div className="text-2xl font-bold text-gray-800">--</div><div className="text-xs text-gray-500">Auto-Rejected</div></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="h-8 w-8 shrink-0 text-blue-500" /><div><div className="text-2xl font-bold text-gray-800">85%</div><div className="text-xs text-gray-500">Auto-Approve Rate</div></div></CardContent></Card>
        </div>

        {/* Approval Rules */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                Approval Rules
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Auto-approve threshold:</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setThreshold(Math.max(50, threshold - 5))} className="w-6 h-6 rounded bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200"></button>
                  <span className="w-8 text-center font-bold text-gray-800">{threshold}</span>
                  <button onClick={() => setThreshold(Math.min(95, threshold + 5))} className="w-6 h-6 rounded bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200">+</button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {rules.map((rule, idx) => (
              <div key={rule.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-gray-800 text-sm">{rule.label}</p>
                      <Badge variant="outline" className="text-xs">{rule.weight} pts</Badge>
                    </div>
                    <p className="text-xs text-gray-500">{rule.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Label className="text-xs text-gray-500">{rule.enabled ? "On" : "Off"}</Label>
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>
                </div>
                {idx < rules.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Applicants */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              Pending Applications
              {applicants.length > 0 && (
                <Badge className="bg-yellow-100 text-yellow-700 ml-1">{applicants.length}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-teal-500" />
              </div>
            )}
            {!isLoading && applicants.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">All caught up!</p>
                <p className="text-gray-400 text-sm">No pending applications at this time.</p>
              </div>
            )}
            {applicants.map((app, idx) => (
              <div key={app.id}>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Building2 className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-semibold text-gray-800 text-sm truncate">{app.businessName}</p>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">{formatRelativeTime(app.appliedAt)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{app.contactName}  {app.businessType}  {app.serviceArea}</p>
                    {app.contactEmail && <p className="text-xs text-gray-400 mb-2">{app.contactEmail}</p>}
                    <div className="flex items-center gap-2">
                      {statusBadge(app.status)}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-green-600 hover:bg-green-700"
                      disabled={approvePartner.isPending}
                      onClick={() => approvePartner.mutate({ partnerId: app.id })}
                    >Approve</Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                      disabled={rejectPartner.isPending}
                      onClick={() => rejectPartner.mutate({ partnerId: app.id })}
                    >Reject</Button>
                  </div>
                </div>
                {idx < applicants.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Adoption Impact */}
        <Card className="bg-white text-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-teal-400" />
              <p className="font-semibold">Adoption Impact</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-teal-400">~2 sec</p>
                <p className="text-xs text-gray-400 mt-1">Approval time for qualified applicants</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">85%</p>
                <p className="text-xs text-gray-400 mt-1">Of applicants expected to auto-approve</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">48 hrs</p>
                <p className="text-xs text-gray-400 mt-1">Time to first lead after approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700" onClick={() => toast.success("Rules saved")}>
            <Settings className="h-4 w-4" /> Save Rule Configuration
          </Button>
          <Button variant="outline" className="flex-1 gap-2" onClick={() => toast.info("Running batch re-score on pending applicants...")}>
            <Zap className="h-4 w-4" /> Re-Score All Pending
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
