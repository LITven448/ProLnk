import { Badge } from "@/components/ui/badge";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CalendarCheck, CheckCircle, Clock, Loader2, Wrench } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function MaintenanceSchedule() {
  const { data, isLoading } = trpc.homeownerExtras.getMaintenanceSchedule.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  const { upcoming = [], overdue = [], completed = [] } = data ?? {};

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Maintenance Schedule</h1>
        <p className="text-muted-foreground mt-1">Your home's upcoming and overdue maintenance tasks.</p>
      </div>

      {overdue.length > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-4 w-4" /> Overdue ({overdue.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdue.map((item: any) => (
              <div key={item.type} className="flex items-center justify-between p-3 bg-white dark:bg-background rounded-lg border border-red-100">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.lastServiceDate ? `Last done: ${formatDate(item.lastServiceDate)}` : "Never completed"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Overdue</Badge>
                  <Link href="/my-home/quick-quote">
                    <Button size="sm" variant="outline">Book Now</Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {upcoming.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" /> Upcoming ({upcoming.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map((item: any) => (
              <div key={item.type} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">Due: {formatDate(item.nextDueDate)} · Every {item.intervalMonths} months</p>
                </div>
                <Link href="/my-home/quick-quote">
                  <Button size="sm" variant="ghost">Schedule</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {completed.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Recent Completions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {completed.map((log: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm p-2 rounded border">
                <div className="flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{log.serviceDescription ?? log.systemType}</span>
                </div>
                <span className="text-xs text-muted-foreground">{log.servicedAt ? formatDate(new Date(log.servicedAt).toISOString()) : ""}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {upcoming.length === 0 && overdue.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <CalendarCheck className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No maintenance data yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add your home systems in the Home Health Vault to track maintenance.</p>
            <Link href="/my-home/vault">
              <Button className="mt-4">Go to Home Health Vault</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
    </HomeownerLayout>
  );
}
