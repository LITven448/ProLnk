#!/usr/bin/env python3
"""
Overwrites the 13 static homeowner pages with real tRPC-connected versions.
Run: python3 scripts/fix-static-pages.py
"""
import os

BASE = "/home/ubuntu/duke-partners/client/src/pages/homeowner"

PAGES = {}

# ─── 1. NotificationSettings ──────────────────────────────────────────────────
PAGES["NotificationSettings"] = """import { useState, useEffect } from "react";
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
  );
}
"""

# ─── 2. MaintenanceSchedule ───────────────────────────────────────────────────
PAGES["MaintenanceSchedule"] = """import { Badge } from "@/components/ui/badge";
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
  );
}
"""

# ─── 3. SeasonalPrepGuide ─────────────────────────────────────────────────────
PAGES["SeasonalPrepGuide"] = """import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Leaf, Sun, Snowflake, Wind, DollarSign, Wrench, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const SEASON_ICONS = { spring: Leaf, summer: Sun, fall: Wind, winter: Snowflake };
const SEASON_COLORS: Record<string, string> = {
  spring: "text-green-600", summer: "text-yellow-600", fall: "text-orange-600", winter: "text-blue-600"
};
const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

type Season = "spring" | "summer" | "fall" | "winter";

export default function SeasonalPrepGuide() {
  const now = new Date();
  const month = now.getMonth();
  const defaultSeason: Season = month >= 2 && month <= 4 ? "spring" : month >= 5 && month <= 7 ? "summer" : month >= 8 && month <= 10 ? "fall" : "winter";
  const [season, setSeason] = useState<Season>(defaultSeason);
  const { data, isLoading } = trpc.homeownerExtras.getSeasonalPrepGuide.useQuery({ season });

  const SeasonIcon = SEASON_ICONS[season];

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Seasonal Prep Guide</h1>
        <p className="text-muted-foreground mt-1">DFW-specific home maintenance checklist by season.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["spring", "summer", "fall", "winter"] as Season[]).map(s => {
          const Icon = SEASON_ICONS[s];
          return (
            <Button key={s} variant={season === s ? "default" : "outline"} size="sm" onClick={() => setSeason(s)} className="capitalize">
              <Icon className="h-3.5 w-3.5 mr-1.5" />{s}
            </Button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : (
        <>
          {data?.tip && (
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-4">
                <p className="text-sm font-medium flex items-start gap-2">
                  <SeasonIcon className={`h-4 w-4 mt-0.5 shrink-0 ${SEASON_COLORS[season]}`} />
                  {data.tip}
                </p>
              </CardContent>
            </Card>
          )}
          <div className="space-y-3">
            {(data?.checklist ?? []).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{item.task}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[item.priority]}`}>{item.priority}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Wrench className="h-3 w-3" />{item.category}</span>
                        <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{item.estimatedCost}</span>
                        {item.diy && <span className="flex items-center gap-1 text-green-600"><CheckCircle className="h-3 w-3" />DIY Possible</span>}
                      </div>
                    </div>
                    {!item.diy && (
                      <Link href="/my-home/quick-quote">
                        <Button size="sm" variant="outline" className="shrink-0">Get Quote</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
"""

# ─── 4. TrueCostGuide ─────────────────────────────────────────────────────────
PAGES["TrueCostGuide"] = """import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Loader2, Search, TrendingDown, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const POPULAR = [
  "Roof replacement", "AC replacement", "Foundation repair", "Kitchen remodel",
  "Bathroom remodel", "Fence installation", "Window replacement", "Flooring",
  "Exterior painting", "Pool installation", "Plumbing repair", "Electrical panel",
];

export default function TrueCostGuide() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = trpc.homeownerExtras.getTrueCostEstimate.useQuery(
    { service: search },
    { enabled: search.length > 2 }
  );

  const handleSearch = () => { if (query.trim().length > 2) setSearch(query.trim()); };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">True Cost Guide</h1>
        <p className="text-muted-foreground mt-1">Real DFW pricing for home services — no surprises.</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="e.g. Roof replacement, AC tune-up..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {data && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg capitalize">{data.service}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><TrendingDown className="h-3 w-3" />Low</p>
                <p className="text-xl font-bold text-green-700 dark:text-green-400">${(data.low ?? 0).toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200">
                <p className="text-xs text-muted-foreground mb-1">Average</p>
                <p className="text-xl font-bold text-blue-700 dark:text-blue-400">${(data.avg ?? 0).toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3" />High</p>
                <p className="text-xl font-bold text-orange-700 dark:text-orange-400">${(data.high ?? 0).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1"><DollarSign className="h-3 w-3 inline mr-1" />{data.unit}</p>
            <p className="text-sm text-muted-foreground">{data.notes}</p>
            <Link href="/my-home/quick-quote">
              <Button className="w-full mt-4">Get a Free Quote from TrustyPro Partners</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div>
        <p className="text-sm font-medium mb-3">Popular Searches</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR.map(p => (
            <button key={p} onClick={() => { setQuery(p); setSearch(p); }}
              className="text-xs px-3 py-1.5 rounded-full border hover:bg-accent transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
"""

# ─── 5. EmergencyServices ─────────────────────────────────────────────────────
PAGES["EmergencyServices"] = """import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Star, Loader2, Shield, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const EMERGENCY_TIPS = [
  { icon: Zap, title: "Gas Leak", tip: "Leave immediately, call 911, then your gas company. Do NOT use light switches." },
  { icon: AlertTriangle, title: "Burst Pipe", tip: "Turn off main water shutoff immediately. Call a plumber. Open faucets to drain pressure." },
  { icon: Shield, title: "Electrical Fire", tip: "Use a Class C fire extinguisher. Never use water. Call 911 first." },
  { icon: AlertTriangle, title: "Roof Damage", tip: "Cover with tarps if safe. Document with photos for insurance. Call a roofer." },
];

export default function EmergencyServices() {
  const { data: partners, isLoading } = trpc.homeownerExtras.getEmergencyPartners.useQuery({});

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 dark:bg-red-950/30 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Emergency Services</h1>
          <p className="text-muted-foreground text-sm">Fast access to vetted pros for urgent home issues.</p>
        </div>
      </div>

      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
        <CardContent className="pt-4">
          <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">Life-threatening emergency?</p>
          <p className="text-sm text-red-600 dark:text-red-300">Call 911 first. Then use Quick Quote to reach a TrustyPro partner fast.</p>
          <Link href="/my-home/quick-quote">
            <Button className="mt-3 bg-red-600 hover:bg-red-700 text-white w-full">Request Emergency Quote</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {EMERGENCY_TIPS.map(tip => (
          <Card key={tip.title}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <tip.icon className="h-4 w-4 text-red-500" />
                <p className="font-semibold text-sm">{tip.title}</p>
              </div>
              <p className="text-xs text-muted-foreground">{tip.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="font-semibold mb-3">Available TrustyPro Partners</h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-32"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : (partners ?? []).length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground text-sm">No partners found. Use Quick Quote to broadcast to all available pros.</p>
              <Link href="/my-home/quick-quote">
                <Button className="mt-3">Quick Quote</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(partners ?? []).slice(0, 8).map((p: any) => (
              <Card key={p.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{p.businessName}</p>
                      <p className="text-xs text-muted-foreground">{p.trade}</p>
                      {p.averageRating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{Number(p.averageRating).toFixed(1)} ({p.reviewCount} reviews)</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {p.isVerified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
                      {p.phone && (
                        <a href={"tel:" + p.phone}>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />Call
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"""

# ─── 6. NeighborhoodDeals ─────────────────────────────────────────────────────
PAGES["NeighborhoodDeals"] = """import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Star, Loader2, Users, Clock } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

function timeLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d left`;
  const hours = Math.floor(diff / 3600000);
  return `${hours}h left`;
}

export default function NeighborhoodDeals() {
  const { data: deals, isLoading } = trpc.homeownerExtras.getNeighborhoodDeals.useQuery();

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Neighborhood Deals</h1>
        <p className="text-muted-foreground mt-1">Group discounts when multiple homeowners book the same service.</p>
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm">How it works</p>
              <p className="text-xs text-muted-foreground mt-1">When 3+ neighbors book the same service in the same week, everyone gets a group discount. The more who join, the bigger the savings.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : (deals ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Tag className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No active deals in your area</p>
            <p className="text-sm text-muted-foreground mt-1">Check back soon — deals are added as partners offer group pricing.</p>
            <Link href="/my-home/quick-quote">
              <Button className="mt-4">Request a Service</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {(deals ?? []).map((deal: any) => (
            <Card key={deal.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{deal.title ?? deal.serviceType}</p>
                      {deal.discountPercent && <Badge className="text-xs">{deal.discountPercent}% off</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{deal.partnerName} · {deal.trade}</p>
                    {deal.averageRating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{Number(deal.averageRating).toFixed(1)}</span>
                      </div>
                    )}
                    {deal.expiresAt && (
                      <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />{timeLeft(deal.expiresAt)}
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    {deal.dealPrice && <p className="text-lg font-bold text-primary">${Number(deal.dealPrice).toLocaleString()}</p>}
                    {deal.originalPrice && <p className="text-xs text-muted-foreground line-through">${Number(deal.originalPrice).toLocaleString()}</p>}
                    <Button size="sm" className="mt-2">Claim Deal</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
"""

# ─── 7. JobTimeline ───────────────────────────────────────────────────────────
PAGES["JobTimeline"] = """import { Card, CardContent } from "@/components/ui/card";
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
  );
}
"""

# ─── 8. SavingsTracker ────────────────────────────────────────────────────────
PAGES["SavingsTracker"] = """import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Loader2, PiggyBank, TrendingDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function SavingsTracker() {
  const { data, isLoading } = trpc.homeownerExtras.getSavingsData.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  const { totalSaved = 0, deals = [] } = data ?? {};

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Savings Tracker</h1>
        <p className="text-muted-foreground mt-1">Track how much you've saved through TrustyPro deals.</p>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200">
        <CardContent className="pt-6 text-center">
          <PiggyBank className="h-10 w-10 mx-auto text-green-600 mb-2" />
          <p className="text-4xl font-bold text-green-700 dark:text-green-400">${totalSaved.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">Total saved through TrustyPro</p>
        </CardContent>
      </Card>

      {deals.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingDown className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No savings recorded yet</p>
            <p className="text-sm text-muted-foreground mt-1">Book services through TrustyPro to start tracking your savings.</p>
            <Link href="/my-home/neighborhood-deals">
              <Button className="mt-4">Browse Deals</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm">Deal History</h2>
          {deals.map((deal: any) => {
            const orig = Number(deal.originalPrice ?? 0);
            const final = Number(deal.dealPrice ?? deal.finalPrice ?? orig);
            const saved = Math.max(0, orig - final);
            return (
              <Card key={deal.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{deal.title ?? deal.serviceType ?? "Service"}</p>
                      <p className="text-xs text-muted-foreground">{deal.partnerName} · {new Date(deal.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${final.toLocaleString()}</p>
                      {saved > 0 && (
                        <p className="text-xs text-green-600 flex items-center gap-0.5 justify-end">
                          <DollarSign className="h-3 w-3" />saved ${saved.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
"""

# ─── 9. HomeValueImpact ───────────────────────────────────────────────────────
PAGES["HomeValueImpact"] = """import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Loader2, DollarSign, Wrench } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function HomeValueImpact() {
  const { data, isLoading } = trpc.homeownerExtras.getHomeValueImpact.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  const { improvements = [], estimatedValueAdded = 0, propertyValue, address } = data ?? {};

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Home Value Impact</h1>
        <p className="text-muted-foreground mt-1">See how your improvements affect your home's estimated value.</p>
      </div>

      {address && <p className="text-sm text-muted-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />{address}</p>}

      <div className="grid grid-cols-2 gap-4">
        {propertyValue && (
          <Card>
            <CardContent className="pt-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Estimated Value</p>
              <p className="text-2xl font-bold">${Number(propertyValue).toLocaleString()}</p>
            </CardContent>
          </Card>
        )}
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardContent className="pt-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Value Added</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">+${estimatedValueAdded.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {improvements.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <TrendingUp className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No improvements logged yet</p>
            <p className="text-sm text-muted-foreground mt-1">Log your home improvements to see their estimated impact on value.</p>
            <Link href="/my-home/projects">
              <Button className="mt-4">Log an Improvement</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          <h2 className="font-semibold text-sm">Logged Improvements</h2>
          {improvements.map((imp: any) => {
            const cost = Number(imp.cost ?? 0);
            const roi = 0.65;
            const valueAdded = Math.round(cost * roi);
            return (
              <Card key={imp.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{imp.title ?? imp.category}</p>
                      <p className="text-xs text-muted-foreground">{imp.completedAt ? new Date(imp.completedAt).toLocaleDateString() : "Date unknown"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold flex items-center gap-0.5"><DollarSign className="h-3.5 w-3.5" />{cost.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+${valueAdded.toLocaleString()} est. value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
"""

# ─── 10. ContractorComparison ─────────────────────────────────────────────────
PAGES["ContractorComparison"] = """import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare, Star, Loader2, DollarSign, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function ContractorComparison() {
  const { data: quotes, isLoading } = trpc.homeownerExtras.getContractorComparisons.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Compare Contractors</h1>
        <p className="text-muted-foreground mt-1">Side-by-side comparison of quotes you've received.</p>
      </div>

      {(quotes ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <GitCompare className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No quotes to compare yet</p>
            <p className="text-sm text-muted-foreground mt-1">Request quotes from multiple partners to compare them here.</p>
            <Link href="/my-home/quick-quote">
              <Button className="mt-4">Request Quotes</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {(quotes ?? []).map((q: any) => (
            <Card key={q.id} className={q.quotedAmount === Math.min(...(quotes ?? []).map((x: any) => x.quotedAmount ?? Infinity)) ? "border-green-300 ring-1 ring-green-300" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{q.businessName}</p>
                      {q.tier && <Badge variant="secondary" className="text-xs capitalize">{q.tier}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{q.trade}</p>
                    {q.averageRating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{Number(q.averageRating).toFixed(1)} ({q.reviewCount} reviews)</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{q.serviceCategory} · {new Date(q.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-primary">${Number(q.quotedAmount).toLocaleString()}</p>
                    <Button size="sm" className="mt-2">Accept Quote</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
"""

# ─── 11. PropertyComparison ───────────────────────────────────────────────────
PAGES["PropertyComparison"] = """import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Home, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function CompRow({ label, yours, area, higherIsBetter = true }: { label: string; yours: number | null; area: number | null; higherIsBetter?: boolean }) {
  if (!yours || !area) return null;
  const diff = ((yours - area) / area) * 100;
  const isGood = higherIsBetter ? diff >= 0 : diff <= 0;
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Your Home</p>
          <p className="font-semibold text-sm">{yours.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Area Avg</p>
          <p className="font-semibold text-sm">{area.toLocaleString()}</p>
        </div>
        <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${isGood ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {diff >= 0 ? "+" : ""}{diff.toFixed(0)}%
        </div>
      </div>
    </div>
  );
}

export default function PropertyComparison() {
  const { data, isLoading } = trpc.homeownerExtras.getPropertyComparison.useQuery();

  if (isLoading) return (
    <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
  );

  if (!data?.property) return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent className="py-12 text-center">
          <Home className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="font-medium">No property data yet</p>
          <p className="text-sm text-muted-foreground mt-1">Add your home details to compare with your neighborhood.</p>
          <Link href="/my-home/profile">
            <Button className="mt-4">Add Home Details</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );

  const { property: p, areaAvgSqft, areaAvgValue, areaAvgYearBuilt, totalInArea } = data;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Property Comparison</h1>
        <p className="text-muted-foreground mt-1">How your home stacks up against others in your zip code.</p>
      </div>

      {p.address && <p className="text-sm text-muted-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />{p.address}</p>}

      {totalInArea > 0 && (
        <p className="text-xs text-muted-foreground">Comparing against {totalInArea} properties in {p.zip ?? "your area"}</p>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" />Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <CompRow label="Square Footage" yours={p.sqft} area={areaAvgSqft} />
          <CompRow label="Estimated Value" yours={p.estimatedValue ? Number(p.estimatedValue) : null} area={areaAvgValue} />
          <CompRow label="Year Built" yours={p.yearBuilt} area={areaAvgYearBuilt} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Home Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {p.bedrooms && <div><p className="text-xs text-muted-foreground">Bedrooms</p><p className="font-medium">{p.bedrooms}</p></div>}
            {p.bathrooms && <div><p className="text-xs text-muted-foreground">Bathrooms</p><p className="font-medium">{p.bathrooms}</p></div>}
            {p.propertyType && <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium capitalize">{p.propertyType.replace(/_/g, " ")}</p></div>}
            {p.lotSize && <div><p className="text-xs text-muted-foreground">Lot Size</p><p className="font-medium">{p.lotSize.replace(/_/g, " ")}</p></div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
"""

# ─── 12. DocumentVault ────────────────────────────────────────────────────────
PAGES["DocumentVault"] = """import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderLock, Plus, FileText, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const CATEGORIES = ["warranty", "permit", "receipt", "insurance", "manual", "contract", "inspection", "photo", "other"] as const;
const CATEGORY_COLORS: Record<string, string> = {
  warranty: "bg-blue-100 text-blue-700", permit: "bg-purple-100 text-purple-700",
  receipt: "bg-green-100 text-green-700", insurance: "bg-orange-100 text-orange-700",
  manual: "bg-gray-100 text-gray-700", contract: "bg-red-100 text-red-700",
  inspection: "bg-yellow-100 text-yellow-700", photo: "bg-pink-100 text-pink-700",
  other: "bg-slate-100 text-slate-700",
};

export default function DocumentVault() {
  const { data: docs, isLoading, refetch } = trpc.homeownerExtras.getDocuments.useQuery();
  const saveMutation = trpc.homeownerExtras.saveDocument.useMutation({
    onSuccess: () => { toast.success("Document saved"); setShowForm(false); setTitle(""); setUrl(""); refetch(); },
    onError: (e) => toast.error(e.message),
  });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<typeof CATEGORIES[number]>("receipt");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    saveMutation.mutate({ title: title.trim(), category, fileUrl: url || undefined, notes: notes || undefined });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Vault</h1>
          <p className="text-muted-foreground mt-1">Store warranties, permits, receipts, and home documents.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          <Plus className="h-4 w-4 mr-1.5" />Add Document
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/30">
          <CardHeader className="pb-2"><CardTitle className="text-base">Add Document</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Document title (e.g. HVAC Warranty 2024)" value={title} onChange={e => setTitle(e.target.value)} />
            <Select value={category} onValueChange={v => setCategory(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Document URL (optional)" value={url} onChange={e => setUrl(e.target.value)} />
            <Input placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saveMutation.isPending} className="flex-1">
                {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Save
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
      ) : (docs ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderLock className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No documents yet</p>
            <p className="text-sm text-muted-foreground mt-1">Add warranties, permits, receipts, and other home documents.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {(docs ?? []).map((doc: any) => (
            <Card key={doc.id}>
              <CardContent className="pt-3 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{doc.title}</p>
                      {doc.description && <p className="text-xs text-muted-foreground truncate">{doc.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={"text-xs px-2 py-0.5 rounded-full capitalize " + (CATEGORY_COLORS[doc.entryType] ?? CATEGORY_COLORS.other)}>
                      {doc.entryType}
                    </span>
                    {doc.fileUrl && (
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost"><ExternalLink className="h-3.5 w-3.5" /></Button>
                      </a>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
"""

# ─── 13. ReferralProgram ─────────────────────────────────────────────────────
PAGES["ReferralProgram"] = """import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Users, DollarSign, Copy, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const TIERS = [
  { referrals: 1, reward: "$25 credit", badge: "First Referral" },
  { referrals: 3, reward: "$75 credit", badge: "3 Referrals" },
  { referrals: 5, reward: "$150 credit + Free Inspection", badge: "5 Referrals" },
  { referrals: 10, reward: "$350 credit + Priority Booking", badge: "10 Referrals" },
];

export default function ReferralProgram() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const { data: balance } = trpc.homeowner.getCreditBalance.useQuery();
  const { data: referrals, isLoading } = trpc.homeowner.getMyReferrals.useQuery();
  const submitMutation = trpc.homeowner.submitReferral.useMutation({
    onSuccess: (d) => { toast.success(d.message); setEmail(""); },
    onError: (e) => toast.error(e.message),
  });

  const referralCode = balance?.referralCode ?? (user ? `HO-${String(user.id).padStart(6, "0")}` : "HO-000001");
  const referralLink = `${window.location.origin}/trustypro?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const sendInvite = () => {
    if (!email.includes("@")) { toast.error("Please enter a valid email"); return; }
    submitMutation.mutate({ email });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Refer a Neighbor</h1>
        <p className="text-muted-foreground mt-1">Earn credits for every neighbor you bring to TrustyPro.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="pt-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-primary mb-1" />
            <p className="text-2xl font-bold">${(balance?.creditBalance ?? 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Credit Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Users className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">{balance?.referralCount ?? 0}</p>
            <p className="text-xs text-muted-foreground">Referrals Made</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Your Referral Link</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="text-xs" />
            <Button variant="outline" onClick={copyLink} className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Friend's email address" value={email} onChange={e => setEmail(e.target.value)} />
            <Button onClick={sendInvite} disabled={submitMutation.isPending} className="shrink-0">
              {submitMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Invite"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Reward Tiers</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {TIERS.map(tier => {
            const count = balance?.referralCount ?? 0;
            const achieved = count >= tier.referrals;
            return (
              <div key={tier.referrals} className={`flex items-center justify-between p-3 rounded-lg border ${achieved ? "border-green-300 bg-green-50 dark:bg-green-950/20" : ""}`}>
                <div className="flex items-center gap-3">
                  {achieved ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Gift className="h-4 w-4 text-muted-foreground" />}
                  <div>
                    <p className="text-sm font-medium">{tier.badge}</p>
                    <p className="text-xs text-muted-foreground">{tier.referrals} referral{tier.referrals > 1 ? "s" : ""} needed</p>
                  </div>
                </div>
                <Badge variant={achieved ? "default" : "secondary"}>{tier.reward}</Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {isLoading ? null : (referrals ?? []).length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Your Referrals</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {(referrals ?? []).map((r: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm p-2 rounded border">
                <span className="text-muted-foreground">{r.referredEmail ?? "Referred user"}</span>
                <Badge variant="secondary" className="capitalize">{r.status ?? "pending"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
"""

# Write all pages
for name, content in PAGES.items():
    path = os.path.join(BASE, name + ".tsx")
    with open(path, "w") as f:
        f.write(content)
    print(f"Written: {name}.tsx ({len(content)} chars)")

print("\\nAll 13 pages written successfully.")
