import { Card, CardContent } from "@/components/ui/card";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Badge } from "@/components/ui/badge";
import { Loader2, Briefcase, Star, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  accepted: { label: "Accepted", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-700", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function JobTimeline() {
  const { data: jobs, isLoading } = trpc.homeownerExtras.getJobTimeline.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Job Timeline</h1>
        <p className="text-muted-foreground mt-1">Your complete history of home service jobs.</p>
      </div>

      {(jobs ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No jobs yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your job history will appear here after your first service.</p>
            <Link href="/my-home/quick-quote">
              <Button className="mt-4">Request a Service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {(jobs ?? []).map((job: any) => {
              const cfg = STATUS_CONFIG[job.status] ?? STATUS_CONFIG.pending;
              const Icon = cfg.icon;
              return (
                <div key={job.id} className="relative flex gap-4 pl-12">
                  <div className="absolute left-3 top-4 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <Icon className="h-2.5 w-2.5 text-primary" />
                  </div>
                  <Card className="flex-1">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-sm">{job.serviceType ?? job.description ?? "Service Job"}</p>
                          {job.partnerName && <p className="text-xs text-muted-foreground">{job.partnerName} · {job.trade}</p>}
                          <p className="text-xs text-muted-foreground mt-1">{new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={"text-xs px-2 py-0.5 rounded-full font-medium " + cfg.color}>{cfg.label}</span>
                          {job.totalCost && <p className="text-sm font-semibold">${Number(job.totalCost).toLocaleString()}</p>}
                        </div>
                      </div>
                      {job.status === "completed" && (
                        <div className="mt-2 pt-2 border-t flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />Leave a review
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </HomeownerLayout>
  );
}
