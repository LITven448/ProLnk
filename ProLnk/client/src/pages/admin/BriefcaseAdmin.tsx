/**
 * Admin Briefcase Management
 * Review and verify partner company credentials.
 */

import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, Clock, AlertTriangle, Shield } from "lucide-react";
import { toast } from "sonner";

const STATUS_BADGE: Record<string, string> = {
  draft: "bg-gray-700 text-gray-300",
  pending_review: "bg-yellow-500/10 text-yellow-400",
  active: "bg-green-500/10 text-green-400",
  restricted: "bg-orange-500/10 text-orange-400",
  suspended: "bg-red-500/10 text-red-400",
};

export default function BriefcaseAdmin() {
  const pending = trpc.briefcase.adminListPending.useQuery();
  const runReview = trpc.briefcase.adminRunQuarterlyReview.useMutation({
    onSuccess: (r) => toast.success(`Review complete: ${r.reviewed} reviewed, ${r.flagged} flagged, ${r.suspended} restricted`),
    onError: (e) => toast.error(e.message),
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Briefcase Management</h1>
            <p className="text-gray-400 text-sm mt-1">Review and verify company credentials</p>
          </div>
          <Button
            onClick={() => runReview.mutate()}
            disabled={runReview.isPending}
            className="bg-teal-500 hover:bg-teal-400 text-white"
          >
            {runReview.isPending ? "Running..." : "Run Quarterly Review"}
          </Button>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-base font-semibold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-teal-400" />
              Pending Review ({pending.data?.length ?? 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {pending.isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : !pending.data?.length ? (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <p>All briefcases are up to date</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {pending.data.map((b: any) => (
                  <div key={b.id} className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm">{b.businessName}</div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        Score: {b.briefcaseScore}/100 ·
                        {b.pendingDocs > 0 && <span className="text-yellow-400 ml-1">{b.pendingDocs} docs pending review</span>}
                      </div>
                    </div>
                    <Badge className={`text-xs ${STATUS_BADGE[b.status] ?? "bg-gray-700 text-gray-300"}`}>
                      {b.status}
                    </Badge>
                    {b.pendingDocs > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {b.pendingDocs} pending
                      </div>
                    )}
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:text-white text-xs">
                      Review
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
