import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { AlertTriangle, Clock, Users, DollarSign, CheckSquare } from "lucide-react";

const ICONS: Record<string, any> = { applications: Users, disputes: AlertTriangle, inactive: Clock, payouts: DollarSign };
const PRIORITY_COLORS: Record<string, string> = { high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-blue-100 text-blue-700" };

export default function TaskManager() {
  const { data: tasks, isLoading } = trpc.adminExtras.getAdminTasks.useQuery();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Task Manager</h1>
          <p className="text-muted-foreground">Action items derived from live platform data</p>
        </div>
        {isLoading && <div className="py-8 text-center text-muted-foreground">Loading tasks…</div>}
        {!isLoading && (tasks?.length ?? 0) === 0 && (
          <Card><CardContent className="py-12 text-center"><CheckSquare className="h-12 w-12 text-green-500 mx-auto mb-3" /><div className="text-lg font-semibold text-green-700">All clear!</div><div className="text-muted-foreground">No pending action items right now.</div></CardContent></Card>
        )}
        <div className="space-y-3">
          {(tasks ?? []).map((task: any) => {
            const Icon = ICONS[task.type] ?? CheckSquare;
            return (
              <Card key={task.id} className={task.priority === "high" ? "border-red-200" : "border-amber-200"}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${task.priority === "high" ? "text-red-500" : "text-amber-500"}`} />
                      <div>
                        <div className="font-semibold">{task.title}</div>
                        <div className="text-sm text-muted-foreground">{task.count} item{task.count !== 1 ? "s" : ""} need attention</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={PRIORITY_COLORS[task.priority]}>{task.priority}</Badge>
                      <Link href={task.href}><Button size="sm" variant="outline">View</Button></Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
