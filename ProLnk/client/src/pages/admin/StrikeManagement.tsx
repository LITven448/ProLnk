/**
 * Admin Strike Management — Wave 62
 * Issue strikes, clear strikes, suspend/unsuspend partners, review COI docs.
 * Route: /admin/compliance
 */
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertTriangle, Shield, ShieldOff, ShieldCheck, Search, RefreshCw, FileText, CheckCircle, XCircle, Clock, History, StickyNote } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STRIKE_REASONS = [
  "No-show on scheduled job",
  "Fraudulent lead claim",
  "Circumventing commission system",
  "Customer complaint — unprofessional conduct",
  "COI lapsed or expired",
  "License expired or invalid",
  "Repeated late responses to leads",
  "Misrepresentation of services",
  "Other (see notes)",
];

type StandingBadge = { label: string; color: string; bg: string; icon: React.ReactNode };

function getStanding(strikeCount: number, status: string): StandingBadge {
  if (status === "rejected") return { label: "Suspended", color: "#7C3AED", bg: "#EDE9FE", icon: <ShieldOff className="w-3 h-3" /> };
  if (strikeCount >= 2) return { label: "Final Warning", color: "#EF4444", bg: "#FEE2E2", icon: <AlertTriangle className="w-3 h-3" /> };
  if (strikeCount === 1) return { label: "1 Strike", color: "#F97316", bg: "#FFF7ED", icon: <AlertTriangle className="w-3 h-3" /> };
  return { label: "Good Standing", color: "#059669", bg: "#D1FAE5", icon: <ShieldCheck className="w-3 h-3" /> };
}

export default function StrikeManagement() {
  const [search, setSearch] = useState("");
  const [filterStanding, setFilterStanding] = useState<string>("all");
  const [issueTarget, setIssueTarget] = useState<any>(null);
  const [strikeReason, setStrikeReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [clearTarget, setClearTarget] = useState<any>(null);
  const [unsuspendTarget, setUnsuspendTarget] = useState<any>(null);
  const [noteTarget, setNoteTarget] = useState<any>(null);
  const [noteText, setNoteText] = useState("");
  const [auditPartnerId, setAuditPartnerId] = useState<number | undefined>(undefined);

  const { data, isLoading, refetch } = trpc.admin.getAllPartners.useQuery();
  const partners = (Array.isArray(data) ? data : []) as any[];

  const { data: auditLog, isLoading: auditLoading, refetch: refetchAudit } = trpc.compliance.getAuditLog.useQuery(
    { partnerId: auditPartnerId, limit: 200 },
    { refetchInterval: 30000 }
  );
  const auditEvents = (Array.isArray(auditLog) ? auditLog : []) as any[];

  const addNoteMut = trpc.compliance.addNote.useMutation({
    onSuccess: () => {
      toast.success("Note Added", { description: "Compliance note recorded in audit trail." });
      setNoteTarget(null);
      setNoteText("");
      refetchAudit();
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  const issueStrikeMut = trpc.compliance.issueStrike.useMutation({
    onSuccess: (res) => {
      toast.success(res.suspended ? "Partner Suspended" : "Strike Issued", { description: res.suspended ? "Partner has been suspended after 3 strikes." : `Strike recorded. Partner now has ${res.newCount} strike(s).` });
      setIssueTarget(null);
      setStrikeReason("");
      setCustomReason("");
      refetch();
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  const clearStrikeMut = trpc.compliance.clearStrike.useMutation({
    onSuccess: (res) => {
      toast.success("Strike Cleared", { description: `Partner now has ${res.newCount} strike(s).` });
      setClearTarget(null);
      refetch();
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  const unsuspendMut = trpc.compliance.unsuspend.useMutation({
    onSuccess: () => {
      toast.success("Partner Reinstated", { description: "Partner account restored to Good Standing." });
      setUnsuspendTarget(null);
      refetch();
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  const filtered = partners.filter((p: any) => {
    const matchSearch = !search || p.businessName?.toLowerCase().includes(search.toLowerCase()) || p.contactName?.toLowerCase().includes(search.toLowerCase());
    const strikes = p.strikeCount ?? 0;
    const status = p.status ?? "approved";
    if (filterStanding === "suspended") return matchSearch && status === "rejected";
    if (filterStanding === "final_warning") return matchSearch && strikes >= 2 && status !== "rejected";
    if (filterStanding === "strike") return matchSearch && strikes === 1;
    if (filterStanding === "good") return matchSearch && strikes === 0 && status !== "rejected";
    if (filterStanding === "at_risk") return matchSearch && (strikes > 0 || status === "rejected");
    return matchSearch;
  });

  // Summary stats
  const suspended = partners.filter((p: any) => p.status === "rejected").length;
  const finalWarning = partners.filter((p: any) => (p.strikeCount ?? 0) >= 2 && p.status !== "rejected").length;
  const oneStrike = partners.filter((p: any) => (p.strikeCount ?? 0) === 1).length;
  const goodStanding = partners.filter((p: any) => (p.strikeCount ?? 0) === 0 && p.status !== "rejected").length;

  const finalReason = strikeReason === "Other (see notes)" ? customReason : strikeReason;

  const EVENT_LABELS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    strike_issued: { label: "Strike Issued", color: "text-orange-600", icon: <AlertTriangle className="w-3 h-3" /> },
    strike_resolved: { label: "Strike Cleared", color: "text-emerald-600", icon: <ShieldCheck className="w-3 h-3" /> },
    warning_issued: { label: "Warning", color: "text-yellow-600", icon: <AlertTriangle className="w-3 h-3" /> },
    suspension: { label: "Suspended", color: "text-red-600", icon: <ShieldOff className="w-3 h-3" /> },
    reinstatement: { label: "Reinstated", color: "text-purple-600", icon: <ShieldCheck className="w-3 h-3" /> },
    note: { label: "Admin Note", color: "text-blue-600", icon: <StickyNote className="w-3 h-3" /> },
  };

  return (
    <AdminLayout>
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-500" />
            Compliance & Strike Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">3-strike system · 72hr dispute SLA · Auto-suspend at 3 strikes</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { refetch(); refetchAudit(); }}>
          <RefreshCw className="w-4 h-4 mr-1" /> Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Good Standing", value: goodStanding, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
          { label: "1 Strike", value: oneStrike, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30", icon: <AlertTriangle className="w-5 h-5 text-orange-500" /> },
          { label: "Final Warning", value: finalWarning, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", icon: <AlertTriangle className="w-5 h-5 text-red-500" /> },
          { label: "Suspended", value: suspended, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30", icon: <ShieldOff className="w-5 h-5 text-purple-600" /> },
        ].map((s) => (
          <Card key={s.label} className={`${s.bg} border-0`}>
            <CardContent className="p-4 flex items-center gap-3">
              {s.icon}
              <div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>



      {/* Audit Trail Tab */}
      <Tabs defaultValue="partners" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="partners">Partner List</TabsTrigger>
          <TabsTrigger value="audit"><History className="w-3 h-3 mr-1" />Audit Trail</TabsTrigger>
        </TabsList>
        <TabsContent value="partners">
          {/* Filters */}
          <div className="flex gap-3 flex-wrap mb-4">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search partner..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={filterStanding} onValueChange={setFilterStanding}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter by standing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Partners</SelectItem>
                <SelectItem value="at_risk">At Risk (any strike)</SelectItem>
                <SelectItem value="strike">1 Strike</SelectItem>
                <SelectItem value="final_warning">Final Warning</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="good">Good Standing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading partners...</div>
          ) : (
            <div className="space-y-2">
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No partners match your filters.</div>
              )}
              {filtered.map((p: any) => {
                const strikes = p.strikeCount ?? 0;
                const standing = getStanding(strikes, p.status ?? "approved");
                const isSuspended = p.status === "rejected";
                return (
                  <Card key={p.id} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                            style={{ background: standing.bg, color: standing.color }}>
                            {(p.businessName ?? "?")[0]}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm truncate">{p.businessName}</div>
                            <div className="text-xs text-muted-foreground">{p.contactName} · {p.businessType?.replace(/_/g, " ")}</div>
                            {p.lastStrikeReason && (
                              <div className="text-xs text-orange-600 mt-0.5 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> Last reason: {p.lastStrikeReason}
                              </div>
                            )}
                            {isSuspended && p.suspensionReason && (
                              <div className="text-xs text-purple-600 mt-0.5 flex items-center gap-1">
                                <ShieldOff className="w-3 h-3" /> Suspended: {p.suspensionReason}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ background: standing.bg, color: standing.color }}>
                            {standing.icon} {standing.label}
                          </span>
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i < strikes ? "bg-red-500" : "bg-muted"}`} />
                            ))}
                          </div>
                          {!isSuspended && (
                            <>
                              <Button size="sm" variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                onClick={() => setIssueTarget(p)}>
                                <AlertTriangle className="w-3 h-3 mr-1" /> Issue Strike
                              </Button>
                              {strikes > 0 && (
                                <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                  onClick={() => setClearTarget(p)}>
                                  <ShieldCheck className="w-3 h-3 mr-1" /> Clear Strike
                                </Button>
                              )}
                            </>
                          )}
                          {isSuspended && (
                            <Button size="sm" variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50"
                              onClick={() => setUnsuspendTarget(p)}>
                              <ShieldCheck className="w-3 h-3 mr-1" /> Reinstate
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="text-blue-600"
                            onClick={() => setNoteTarget(p)}>
                            <StickyNote className="w-3 h-3 mr-1" /> Note
                          </Button>
                          <Button size="sm" variant="ghost" className="text-muted-foreground"
                            onClick={() => { setAuditPartnerId(p.id); }}>
                            <History className="w-3 h-3 mr-1" /> History
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="audit">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Select value={auditPartnerId?.toString() ?? "all"} onValueChange={(v) => setAuditPartnerId(v === "all" ? undefined : Number(v))}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="All partners" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Partners</SelectItem>
                  {partners.map((p: any) => (
                    <SelectItem key={p.id} value={p.id.toString()}>{p.businessName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => refetchAudit()}>
                <RefreshCw className="w-4 h-4 mr-1" /> Refresh
              </Button>
              <span className="text-xs text-muted-foreground ml-auto">{auditEvents.length} events</span>
            </div>
            {auditLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading audit log...</div>
            ) : auditEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <History className="w-8 h-8 mx-auto mb-2 opacity-30" />
                No compliance events recorded yet.
              </div>
            ) : (
              <div className="space-y-2">
                {auditEvents.map((ev: any) => {
                  const meta = EVENT_LABELS[ev.eventType] ?? { label: ev.eventType, color: "text-gray-600", icon: <Clock className="w-3 h-3" /> };
                  return (
                    <Card key={ev.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${meta.color}`}>{meta.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-semibold ${meta.color}`}>{meta.label}</span>
                              {ev.businessName && (
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{ev.businessName}</span>
                              )}
                              <span className="text-xs text-muted-foreground ml-auto">
                                {new Date(ev.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-sm text-foreground mt-1">{ev.reason}</div>
                            {ev.resolutionNote && (
                              <div className="text-xs text-muted-foreground mt-1 italic">Resolution: {ev.resolutionNote}</div>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              By: {ev.adminName ?? "Admin"}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Issue Strike Dialog */}
      <Dialog open={!!issueTarget} onOpenChange={() => { setIssueTarget(null); setStrikeReason(""); setCustomReason(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" /> Issue Strike — {issueTarget?.businessName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-sm text-orange-800 dark:text-orange-300">
              Current strikes: <strong>{issueTarget?.strikeCount ?? 0}/3</strong>.
              {(issueTarget?.strikeCount ?? 0) >= 2 && " ⚠️ This will trigger automatic suspension."}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Strike</label>
              <Select value={strikeReason} onValueChange={setStrikeReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  {STRIKE_REASONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {strikeReason === "Other (see notes)" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Reason</label>
                <Textarea placeholder="Describe the reason..." value={customReason} onChange={(e) => setCustomReason(e.target.value)} rows={3} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIssueTarget(null)}>Cancel</Button>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white"
              disabled={!finalReason || issueStrikeMut.isPending}
              onClick={() => issueStrikeMut.mutate({ partnerId: issueTarget.id, reason: finalReason })}>
              {issueStrikeMut.isPending ? "Issuing..." : "Confirm Strike"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear Strike Dialog */}
      <Dialog open={!!clearTarget} onOpenChange={() => setClearTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-600">
              <ShieldCheck className="w-5 h-5" /> Clear Strike — {clearTarget?.businessName}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm text-muted-foreground">
            This will remove one strike from {clearTarget?.businessName}. Current strikes: <strong>{clearTarget?.strikeCount ?? 0}</strong>.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearTarget(null)}>Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={clearStrikeMut.isPending}
              onClick={() => clearStrikeMut.mutate({ partnerId: clearTarget.id })}>
              {clearStrikeMut.isPending ? "Clearing..." : "Clear Strike"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsuspend Dialog */}
      <Dialog open={!!unsuspendTarget} onOpenChange={() => setUnsuspendTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-purple-600">
              <ShieldCheck className="w-5 h-5" /> Reinstate Partner — {unsuspendTarget?.businessName}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 text-sm text-muted-foreground">
            This will restore {unsuspendTarget?.businessName} to Good Standing, clear all strikes, and re-activate their account.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUnsuspendTarget(null)}>Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={unsuspendMut.isPending}
              onClick={() => unsuspendMut.mutate({ partnerId: unsuspendTarget.id })}>
              {unsuspendMut.isPending ? "Reinstating..." : "Reinstate Partner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={!!noteTarget} onOpenChange={() => { setNoteTarget(null); setNoteText(""); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-blue-600">
              <StickyNote className="w-5 h-5" /> Add Compliance Note — {noteTarget?.businessName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Textarea
              placeholder="Enter compliance note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setNoteTarget(null); setNoteText(""); }}>Cancel</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!noteText.trim() || addNoteMut.isPending}
              onClick={() => addNoteMut.mutate({ partnerId: noteTarget.id, note: noteText.trim() })}>
              {addNoteMut.isPending ? "Saving..." : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </AdminLayout>
  );
}
