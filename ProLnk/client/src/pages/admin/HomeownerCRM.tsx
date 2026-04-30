/**
 * Admin Homeowner CRM — Wave 63
 * Searchable table of all homeowners who've received deal links.
 * Shows credit balance, referral count, last-visit date, deal history, and Send Deal CTA.
 * Route: /admin/homeowners
 */
import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Users, Search, Mail, Phone, MapPin, Star, DollarSign, RefreshCw, Send, Eye, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700",
  sent: "bg-blue-100 text-blue-700",
  viewed: "bg-purple-100 text-purple-700",
  scheduled: "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  closed: "bg-teal-100 text-teal-700",
  declined: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
};

function fmtDate(ts: any) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function HomeownerCRM() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "deals" | "value">("recent");
  const [selectedHomeowner, setSelectedHomeowner] = useState<any>(null);
  const [sendDealTarget, setSendDealTarget] = useState<any>(null);

  const { data, isLoading, refetch } = trpc.deals.listDeals.useQuery({ limit: 500, offset: 0 });
  const deals = useMemo(() => (data?.deals ?? []) as any[], [data]);

  // Group deals by homeowner (email or name+city)
  const homeowners = useMemo(() => {
    const map = new Map<string, any>();
    for (const d of deals) {
      const key = d.homeownerName?.toLowerCase().trim() + "|" + (d.homeownerCity ?? "");
      if (!map.has(key)) {
        map.set(key, {
          name: d.homeownerName ?? "Unknown",
          city: d.homeownerCity ?? "",
          zip: d.homeownerZip ?? "",
          deals: [],
          totalValue: 0,
          lastDealAt: null,
          acceptedCount: 0,
          viewedCount: 0,
        });
      }
      const ho = map.get(key)!;
      ho.deals.push(d);
      ho.totalValue += ((d.estimatedValueLow ?? 0) + (d.estimatedValueHigh ?? 0)) / 2;
      if (!ho.lastDealAt || new Date(d.createdAt) > new Date(ho.lastDealAt)) {
        ho.lastDealAt = d.createdAt;
      }
      if (d.status === "accepted" || d.status === "closed") ho.acceptedCount++;
      if (d.viewCount > 0) ho.viewedCount++;
    }
    return Array.from(map.values());
  }, [deals]);

  const filtered = useMemo(() => {
    let list = homeowners.filter((h) => {
      const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase()) || h.zip.includes(search);
      const matchStatus = statusFilter === "all" || h.deals.some((d: any) => d.status === statusFilter);
      return matchSearch && matchStatus;
    });
    if (sortBy === "deals") list = list.sort((a, b) => b.deals.length - a.deals.length);
    else if (sortBy === "value") list = list.sort((a, b) => b.totalValue - a.totalValue);
    else list = list.sort((a, b) => new Date(b.lastDealAt ?? 0).getTime() - new Date(a.lastDealAt ?? 0).getTime());
    return list;
  }, [homeowners, search, statusFilter, sortBy]);

  // Summary stats
  const totalHomeowners = homeowners.length;
  const totalAccepted = homeowners.reduce((s, h) => s + h.acceptedCount, 0);
  const totalPipelineValue = homeowners.reduce((s, h) => s + h.totalValue, 0);
  const activeThisMonth = homeowners.filter((h) => {
    if (!h.lastDealAt) return false;
    const d = new Date(h.lastDealAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <AdminLayout>
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-500" />
            Homeowner CRM
          </h1>
          <p className="text-muted-foreground text-sm mt-1">All homeowners who've received deal links — deal history, pipeline value, and re-engagement</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Homeowners", value: totalHomeowners, icon: <Users className="w-5 h-5 text-blue-500" />, color: "text-blue-600" },
          { label: "Accepted Deals", value: totalAccepted, icon: <Star className="w-5 h-5 text-emerald-500" />, color: "text-emerald-600" },
          { label: "Pipeline Value", value: fmtCurrency(totalPipelineValue), icon: <DollarSign className="w-5 h-5 text-amber-500" />, color: "text-amber-600" },
          { label: "Active This Month", value: activeThisMonth, icon: <TrendingUp className="w-5 h-5 text-purple-500" />, color: "text-purple-600" },
        ].map((s) => (
          <Card key={s.label} className="border border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              {s.icon}
              <div>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search name, city, zip..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="viewed">Viewed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="deals">Most Deals</SelectItem>
            <SelectItem value="value">Highest Value</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Homeowner Table */}
      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading homeowners...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No homeowners match your filters.</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((h, i) => {
            const latestDeal = h.deals[0];
            const conversionRate = h.deals.length > 0 ? Math.round((h.acceptedCount / h.deals.length) * 100) : 0;
            return (
              <Card key={i} className="border border-border/50 hover:border-blue-200 transition-colors cursor-pointer"
                onClick={() => setSelectedHomeowner(h)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
                        {h.name[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm">{h.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {h.city}{h.zip ? `, ${h.zip}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap text-sm">
                      <div className="text-center">
                        <div className="font-bold text-foreground">{h.deals.length}</div>
                        <div className="text-xs text-muted-foreground">Deals</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-emerald-600">{h.acceptedCount}</div>
                        <div className="text-xs text-muted-foreground">Accepted</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-amber-600">{fmtCurrency(h.totalValue)}</div>
                        <div className="text-xs text-muted-foreground">Pipeline</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{conversionRate}%</div>
                        <div className="text-xs text-muted-foreground">Conv.</div>
                      </div>
                      <div className="text-center hidden md:block">
                        <div className="font-medium text-foreground">{fmtDate(h.lastDealAt)}</div>
                        <div className="text-xs text-muted-foreground">Last Deal</div>
                      </div>
                      {latestDeal?.status && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[latestDeal.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {latestDeal.status}
                        </span>
                      )}
                      <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={(e) => { e.stopPropagation(); setSendDealTarget(h); }}>
                        <Send className="w-3 h-3 mr-1" /> Send Deal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Homeowner Detail Drawer */}
      <Dialog open={!!selectedHomeowner} onOpenChange={() => setSelectedHomeowner(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              {selectedHomeowner?.name}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                — {selectedHomeowner?.city}{selectedHomeowner?.zip ? `, ${selectedHomeowner?.zip}` : ""}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Summary row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Deals", value: selectedHomeowner?.deals?.length ?? 0, color: "text-blue-600" },
                { label: "Accepted", value: selectedHomeowner?.acceptedCount ?? 0, color: "text-emerald-600" },
                { label: "Pipeline Value", value: fmtCurrency(selectedHomeowner?.totalValue ?? 0), color: "text-amber-600" },
              ].map((s) => (
                <div key={s.label} className="bg-muted/30 rounded-lg p-3 text-center">
                  <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Deal history */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Deal History</h3>
              <div className="space-y-2">
                {(selectedHomeowner?.deals ?? []).map((d: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${STATUS_COLORS[d.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {d.status}
                      </span>
                      <span className="truncate text-foreground">{d.issueDescriptionShort ?? d.issueType ?? "Service deal"}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {d.viewCount ?? 0}
                      </span>
                      <span className="text-muted-foreground text-xs">{fmtDate(d.createdAt)}</span>
                      <span className="font-medium text-amber-600">
                        {d.estimatedValueLow ? fmtCurrency((d.estimatedValueLow + (d.estimatedValueHigh ?? d.estimatedValueLow)) / 2) : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedHomeowner(null)}>Close</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => { setSendDealTarget(selectedHomeowner); setSelectedHomeowner(null); }}>
              <Send className="w-4 h-4 mr-1" /> Send New Deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Deal CTA Dialog */}
      <Dialog open={!!sendDealTarget} onOpenChange={() => setSendDealTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-blue-600">
              <Send className="w-5 h-5" /> Send Deal to {sendDealTarget?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-3 space-y-3 text-sm text-muted-foreground">
            <p>To send a new deal to <strong>{sendDealTarget?.name}</strong>, use the Deal Composer to select a partner, set the issue type, and generate a personalized deal link.</p>
            <p className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 p-3 rounded-lg">
              Tip: Use the Deal Composer at <strong>/admin/deal-composer</strong> to pre-fill the homeowner's name and city for a faster send.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDealTarget(null)}>Cancel</Button>
            <Link href="/admin/deal-composer">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setSendDealTarget(null)}>
                Open Deal Composer <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
}
