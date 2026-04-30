/**
 * Admin Scout Dashboard
 * View all Scout assessments, Home Intelligence Reports, and Bid Board activity.
 */

import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Home, DollarSign, Clock, CheckCircle, Eye } from "lucide-react";
import { useLocation } from "wouter";

const STATUS_COLORS: Record<string, string> = {
  in_progress: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  zones_complete: "bg-blue-500/10 text-blue-600 border-blue-200",
  report_generated: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  report_shared: "bg-green-500/10 text-green-600 border-green-200",
  archived: "bg-gray-500/10 text-gray-600 border-gray-200",
};

export default function AdminScoutDashboard() {
  const [, navigate] = useLocation();
  const assessments = trpc.scout.adminListAssessments.useQuery({ limit: 50 });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Scout Assessments</h1>
            <p className="text-gray-400 text-sm mt-1">Home Intelligence Reports and Bid Board activity</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/bid-board")} className="border-gray-700 text-gray-300">
              Bid Board
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Assessments", value: assessments.data?.length ?? 0, icon: <ClipboardList className="w-5 h-5" /> },
            { label: "In Progress", value: assessments.data?.filter((a: any) => a.status === "in_progress").length ?? 0, icon: <Clock className="w-5 h-5" /> },
            { label: "Reports Generated", value: assessments.data?.filter((a: any) => a.status === "report_generated").length ?? 0, icon: <CheckCircle className="w-5 h-5" /> },
            { label: "Total Est. Value", value: `$${(assessments.data?.reduce((s: number, a: any) => s + parseFloat(a.totalEstimatedRepairCost || "0"), 0) ?? 0).toLocaleString()}`, icon: <DollarSign className="w-5 h-5" /> },
          ].map((stat, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-teal-400">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assessment List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-base font-semibold">All Assessments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {assessments.isLoading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : !assessments.data?.length ? (
              <div className="p-8 text-center text-gray-500">No assessments yet</div>
            ) : (
              <div className="divide-y divide-gray-700">
                {assessments.data.map((a: any) => (
                  <div key={a.id} className="p-4 flex items-center gap-4 hover:bg-gray-750">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <Home className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{a.propertyAddress}</div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        Scout: {a.scoutName} · {a.findingCount ?? 0} findings
                        {a.totalEstimatedRepairCost ? ` · Est. $${parseFloat(a.totalEstimatedRepairCost).toLocaleString()}` : ""}
                      </div>
                    </div>
                    {a.homeHealthScore && (
                      <div className="text-center">
                        <div className={`text-lg font-black ${a.homeHealthScore >= 80 ? "text-green-400" : a.homeHealthScore >= 60 ? "text-yellow-400" : "text-red-400"}`}>
                          {a.homeHealthScore}
                        </div>
                        <div className="text-gray-500 text-xs">score</div>
                      </div>
                    )}
                    <Badge className={`text-xs border ${STATUS_COLORS[a.status] ?? "bg-gray-700 text-gray-300"}`}>
                      {a.status.replace(/_/g, " ")}
                    </Badge>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => navigate(`/admin/scout/${a.id}`)}>
                      <Eye className="w-4 h-4" />
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
