import { useState, useEffect } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, MessageSquare, Phone, Wrench, DollarSign, Star, AlertTriangle, CheckCircle, Tag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const NOTIF_ITEMS = [
  { id: "jobUpdates", label: "Job Status Updates", description: "When a contractor accepts, starts, or completes your job", icon: Wrench },
  { id: "paymentConfirmations", label: "Payment Confirmations", description: "When a payment is charged or a refund is issued", icon: DollarSign },
  { id: "reviewRequests", label: "Review Requests", description: "When a job is complete and we ask for your feedback", icon: Star },
  { id: "maintenanceReminders", label: "Maintenance Reminders", description: "Seasonal reminders for home upkeep tasks", icon: Bell },
  { id: "dealAlerts", label: "New Deals Available", description: "When a new service deal is available in your area", icon: CheckCircle },
  { id: "emergencyAlerts", label: "Emergency Alerts", description: "Urgent notifications about your home or active jobs", icon: AlertTriangle },
  { id: "neighborhoodDeals", label: "Neighborhood Deals", description: "Group discounts when neighbors book the same service", icon: Tag },
  { id: "weeklyDigest", label: "Weekly Digest", description: "A weekly summary of your home activity and tips", icon: MessageSquare },
];

export default function NotificationSettings() {
  const { data: prefs, isLoading } = trpc.homeownerExtras.getHomeownerNotifPrefs.useQuery();
  const updateMutation = trpc.homeownerExtras.updateHomeownerNotifPrefs.useMutation({
    onSuccess: () => toast.success("Notification preferences saved"),
    onError: () => toast.error("Failed to save preferences"),
  });
  const [local, setLocal] = useState<Record<string, boolean>>({});
  const [channels, setChannels] = useState({ emailEnabled: true, smsEnabled: false, pushEnabled: true });

  useEffect(() => {
    if (prefs) {
      const { emailEnabled, smsEnabled, pushEnabled, ...rest } = prefs as any;
      setLocal(rest as Record<string, boolean>);
      setChannels({ emailEnabled: !!emailEnabled, smsEnabled: !!smsEnabled, pushEnabled: !!pushEnabled });
    }
  }, [prefs]);

  const toggle = (id: string) => setLocal(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleChannel = (ch: string) => setChannels(prev => ({ ...prev, [ch]: !(prev as any)[ch] }));
  const save = () => updateMutation.mutate({ ...local, ...channels } as any);

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  return (
    <HomeownerLayout>
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-1">Control what alerts you receive and how.</p>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Delivery Channels</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "emailEnabled", label: "Email Notifications", icon: Mail },
            { id: "smsEnabled", label: "SMS / Text Messages", icon: Phone },
            { id: "pushEnabled", label: "In-App Notifications", icon: Bell },
          ].map(ch => (
            <div key={ch.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ch.icon className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor={ch.id} className="cursor-pointer">{ch.label}</Label>
              </div>
              <Switch id={ch.id} checked={(channels as any)[ch.id]} onCheckedChange={() => toggleChannel(ch.id)} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Notification Types</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {NOTIF_ITEMS.map((item, i) => (
            <div key={item.id}>
              {i > 0 && <Separator className="mb-4" />}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch checked={!!(local as any)[item.id]} onCheckedChange={() => toggle(item.id)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button onClick={save} disabled={updateMutation.isPending} className="w-full">
        {updateMutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : "Save Preferences"}
      </Button>
    </div>
    </HomeownerLayout>
  );
}
