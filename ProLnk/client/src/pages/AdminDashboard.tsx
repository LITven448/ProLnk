import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ProLnkLogo from "@/components/ProLnkLogo";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Award, Users, TrendingUp, DollarSign, CheckCircle, XCircle,
  Send, LogOut, BarChart2, Bell, ChevronRight, Percent, Zap, ShieldCheck,
  Home, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; icon: string; bg: string; color: string }> = {
    scout:      { label: "Scout",      icon: "[SEARCH]", bg: "#f8fafc", color: "#64748b" },
    pro:        { label: "Pro",        icon: "",   bg: "#f0fdfa", color: "#0d9488" },
    crew:       { label: "Crew",       icon: "",   bg: "#eef2ff", color: "#6366f1" },
    company:    { label: "Company",    icon: "",   bg: "#fefce8", color: "#d4af37" },
    enterprise: { label: "Enterprise", icon: "[AWARD]",   bg: "#1e293b", color: "#94a3b8" },
  };
  const t = map[tier] ?? map.scout;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: t.bg, color: t.color, border: `1px solid ${t.color}` }}>
      {t.icon} {t.label}
    </span>
  );
}

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const utils = trpc.useUtils();

  const { data: stats } = trpc.admin.getNetworkStats.useQuery(undefined, { enabled: isAuthenticated });
  const { data: pending } = trpc.admin.getPendingApplications.useQuery(undefined, { enabled: isAuthenticated });
  const { data: trustyLeads, refetch: refetchLeads } = trpc.trustyPro.getLeads.useQuery(undefined, { enabled: isAuthenticated });
  const { data: approvedPartners } = trpc.admin.getApprovedPartnersForDispatch.useQuery(undefined, { enabled: isAuthenticated });
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [routePartnerId, setRoutePartnerId] = useState<string>("");
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

  const updateLeadStatus = trpc.trustyPro.updateLeadStatus.useMutation({
    onSuccess: () => { toast.success("Lead status updated"); refetchLeads(); },
    onError: () => toast.error("Failed to update status"),
  });
  const routeLead = trpc.trustyPro.routeLeadToPartner.useMutation({
    onSuccess: (data) => { toast.success(`Lead routed to ${data.partnerName}`); setSelectedLeadId(null); setRoutePartnerId(""); refetchLeads(); },
    onError: () => toast.error("Failed to route lead"),
  });
  const { data: allPartners } = trpc.admin.getAllPartners.useQuery(undefined, { enabled: isAuthenticated });
  const { data: unpaidCommissions } = trpc.admin.getUnpaidCommissions.useQuery(undefined, { enabled: isAuthenticated });

  const approveMutation = trpc.admin.approvePartner.useMutation({
    onSuccess: () => {
      toast.success("Partner approved!");
      utils.admin.getPendingApplications.invalidate();
      utils.admin.getAllPartners.invalidate();
      utils.admin.getNetworkStats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const rejectMutation = trpc.admin.rejectPartner.useMutation({
    onSuccess: () => {
      toast.success("Application rejected.");
      utils.admin.getPendingApplications.invalidate();
      utils.admin.getNetworkStats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const markPaidMutation = trpc.admin.markCommissionPaid.useMutation({
    onSuccess: () => {
      toast.success("Commission marked as paid.");
      utils.admin.getUnpaidCommissions.invalidate();
      utils.admin.getNetworkStats.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const broadcastMutation = trpc.admin.broadcastMessage.useMutation({
    onSuccess: () => {
      toast.success("Message broadcast to all partners.");
      setBroadcastSubject("");
      setBroadcastMessage("");
    },
    onError: (e) => toast.error(e.message),
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 animate-spin" style={{ borderColor: "var(--teal)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "var(--teal-light)" }}>
            <Award className="h-7 w-7" style={{ color: "var(--teal)" }} />
          </div>
          <h2 className="text-2xl font-heading text-gray-900 mb-3">Admin Login Required</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in with your admin account to access the control panel.</p>
          <a href={getLoginUrl()}>
            <Button className="w-full font-heading" style={{ backgroundColor: "var(--teal)" }}>
              Sign In
            </Button>
          </a>
          <Link href="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600"> Back to Home</Link>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md w-full text-center">
          <div className="text-5xl mb-5"></div>
          <h2 className="text-2xl font-heading text-gray-900 mb-3">Access Denied</h2>
          <p className="text-gray-500 text-sm mb-6">You don't have admin privileges. Contact the network owner.</p>
          <Link href="/">
            <Button variant="outline" className="border-2" style={{ borderColor: "var(--teal)", color: "var(--teal)" }}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <ProLnkLogo height={28} variant="light" className="shrink-0" />
            <Badge className="text-xs" style={{ backgroundColor: "var(--teal-light)", color: "var(--teal)", border: "1px solid var(--teal)" }}>
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500">
              <LogOut className="h-4 w-4 mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage partner applications, commissions, and network activity.</p>
        </div>

        {/* Quick nav to sub-pages */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/admin/opportunities">
            <Button variant="outline" size="sm" className="gap-2 border-[#0A1628]/20 hover:border-[#0A1628]/40 hover:bg-[#F5E642]/10">
              <Zap className="w-4 h-4" style={{ color: "var(--teal)" }} />
              AI Opportunity Feed
            </Button>
          </Link>
          <Link href="/admin/rates">
            <Button variant="outline" size="sm" className="gap-2 border-[#0A1628]/20 hover:border-[#0A1628]/40 hover:bg-[#F5E642]/10">
              <Percent className="w-4 h-4" style={{ color: "var(--teal)" }} />
              Commission Rates
            </Button>
          </Link>
          <Link href="/partners">
            <Button variant="outline" size="sm" className="gap-2 border-[#0A1628]/20 hover:border-[#0A1628]/40 hover:bg-[#F5E642]/10">
              <Users className="w-4 h-4" style={{ color: "var(--teal)" }} />
              Partner Directory
            </Button>
          </Link>
          <Link href="/admin/setup">
            <Button variant="outline" size="sm" className="gap-2 border-gray-200">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              Admin Setup
            </Button>
          </Link>
        </div>

        {/* Network stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Partners", value: stats?.totalPartners ?? 0, icon: Users, color: "var(--teal)" },
            { label: "Pending Applications", value: stats?.pendingApplications ?? 0, icon: ChevronRight, color: "#f59e0b" },
            { label: "Total Opportunities", value: stats?.totalOpportunities ?? 0, icon: TrendingUp, color: "#6366f1" },
            { label: "Commissions Paid", value: `$${(stats?.totalCommissionsPaid ?? 0).toFixed(2)}`, icon: DollarSign, color: "#22c55e" },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications">
          <TabsList className="mb-6 bg-white border border-gray-200 shadow-sm">
            <TabsTrigger value="applications" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              Applications {pending && pending.length > 0 && (
                <Badge className="ml-1.5 text-xs h-4 w-4 p-0 flex items-center justify-center rounded-full bg-red-500 text-white">
                  {pending.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="partners" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              All Partners
            </TabsTrigger>
            <TabsTrigger value="commissions" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              Commissions
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              Broadcast
            </TabsTrigger>
            <TabsTrigger value="trustypro-leads" className="font-heading data-[state=active]:bg-teal data-[state=active]:text-white">
              TrustyPro Leads {trustyLeads && trustyLeads.filter(l => l.status === 'new').length > 0 && (
                <Badge className="ml-1.5 text-xs h-4 w-4 p-0 flex items-center justify-center rounded-full bg-indigo-500 text-white">
                  {trustyLeads.filter(l => l.status === 'new').length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Applications */}
          <TabsContent value="applications">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {pending && pending.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Service Area</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pending.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            <div className="font-semibold text-gray-900">{p.businessName}</div>
                            {p.website && <a href={p.website} target="_blank" rel="noreferrer" className="text-xs text-teal hover:underline">{p.website}</a>}
                          </TableCell>
                          <TableCell className="text-gray-600">{p.businessType}</TableCell>
                          <TableCell className="text-gray-600">{p.serviceArea}</TableCell>
                          <TableCell>
                            <div className="text-sm">{p.contactName}</div>
                            <div className="text-xs text-gray-400">{p.contactEmail}</div>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">
                            {new Date(p.appliedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="text-xs h-7 px-3"
                                style={{ backgroundColor: "var(--teal)" }}
                                onClick={() => approveMutation.mutate({ partnerId: p.id })}
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircle className="h-3 w-3 mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-7 px-3 border-red-300 text-red-500 hover:bg-red-50"
                                onClick={() => rejectMutation.mutate({ partnerId: p.id })}
                                disabled={rejectMutation.isPending}
                              >
                                <XCircle className="h-3 w-3 mr-1" /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-16 text-center text-gray-400">
                    <CheckCircle className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No pending applications. All caught up!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Partners */}
          <TabsContent value="partners">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900">All Partners</CardTitle>
              </CardHeader>
              <CardContent>
                {allPartners && allPartners.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Referrals</TableHead>
                        <TableHead>Total Earned</TableHead>
                        <TableHead>Owed</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allPartners.map((p) => {
                        const earned = parseFloat(p.totalCommissionEarned as string);
                        const paid = parseFloat(p.totalCommissionPaid as string);
                        const owed = earned - paid;
                        return (
                          <TableRow key={p.id}>
                            <TableCell>
                              <div className="font-semibold text-gray-900">{p.businessName}</div>
                              <div className="text-xs text-gray-400">{p.contactEmail}</div>
                            </TableCell>
                            <TableCell className="text-gray-600 text-sm">{p.businessType}</TableCell>
                            <TableCell><TierBadge tier={p.tier} /></TableCell>
                            <TableCell className="font-medium">{p.referralCount}</TableCell>
                            <TableCell className="font-medium">${earned.toFixed(2)}</TableCell>
                            <TableCell>
                              <span className={`font-semibold ${owed > 0 ? "text-amber-600" : "text-gray-400"}`}>
                                ${owed.toFixed(2)}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="text-xs capitalize"
                                style={{
                                  color: p.status === "approved" ? "#22c55e" : p.status === "rejected" ? "#ef4444" : "#f59e0b",
                                  borderColor: p.status === "approved" ? "#22c55e" : p.status === "rejected" ? "#ef4444" : "#f59e0b",
                                }}
                              >
                                {p.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-16 text-center text-gray-400 text-sm">No partners yet.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions */}
          <TabsContent value="commissions">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900">Unpaid Commissions</CardTitle>
              </CardHeader>
              <CardContent>
                {unpaidCommissions && unpaidCommissions.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partner</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unpaidCommissions.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{c.partnerName}</TableCell>
                          <TableCell className="text-gray-600 text-sm">{c.description || "Referral commission"}</TableCell>
                          <TableCell className="font-semibold text-amber-600">${parseFloat(c.amount as string).toFixed(2)}</TableCell>
                          <TableCell className="text-gray-500 text-sm">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              className="text-xs h-7 px-3"
                              style={{ backgroundColor: "#22c55e" }}
                              onClick={() => markPaidMutation.mutate({ commissionId: c.id })}
                              disabled={markPaidMutation.isPending}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" /> Mark Paid
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-16 text-center text-gray-400">
                    <DollarSign className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No unpaid commissions. All settled!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Broadcast */}
          <TabsContent value="broadcast">
            <Card className="border-0 shadow-sm max-w-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5" style={{ color: "var(--teal)" }} /> Broadcast Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-gray-500">
                  Send a message to all approved partners. This will appear in their dashboard inbox.
                </p>
                <div>
                  <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 mb-1.5 block">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g. New referral bonus for Q2"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-1.5 block">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message to all partners..."
                    rows={6}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="resize-none"
                  />
                </div>
                <Button
                  className="font-heading"
                  style={{ backgroundColor: "var(--teal)" }}
                  disabled={!broadcastSubject.trim() || !broadcastMessage.trim() || broadcastMutation.isPending}
                  onClick={() => broadcastMutation.mutate({ subject: broadcastSubject, message: broadcastMessage })}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {broadcastMutation.isPending ? "Sending..." : "Send to All Partners"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          {/* TrustyPro Leads */}
          <TabsContent value="trustypro-leads">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="font-heading text-lg text-gray-900 flex items-center gap-2">
                  <Home className="w-5 h-5 text-indigo-500" />
                  TrustyPro AI Scan Leads
                  {trustyLeads && <span className="text-sm font-normal text-gray-500 ml-2">{trustyLeads.length} total</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!trustyLeads || trustyLeads.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No TrustyPro leads yet</p>
                    <p className="text-sm mt-1">Leads appear here when homeowners complete an AI scan</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {trustyLeads.map((lead) => {
                      const analysis = lead.aiAnalysis ? (() => { try { return JSON.parse(lead.aiAnalysis!); } catch { return null; } })() : null;
                      const isExpanded = expandedLead === lead.id;
                      const isInsurance = analysis?.issues?.some((i: { isInsuranceClaim?: boolean }) => i.isInsuranceClaim);
                      const statusColors: Record<string, string> = {
                        new: "bg-blue-100 text-blue-700",
                        analyzing: "bg-yellow-100 text-yellow-700",
                        matched: "bg-green-100 text-green-700",
                        contacted: "bg-purple-100 text-purple-700",
                        closed: "bg-gray-100 text-gray-600",
                        lost: "bg-red-100 text-red-600",
                      };
                      return (
                        <div key={lead.id} className="border border-gray-100 rounded-xl overflow-hidden">
                          <div className="p-4 bg-white">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="font-bold text-gray-900">{lead.name ?? "Anonymous"}</span>
                                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>{lead.status}</span>
                                  {isInsurance && <span className="text-xs font-bold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">🏛️ Possible Claim</span>}
                                </div>
                                <div className="text-sm text-gray-500 space-y-0.5">
                                  {lead.email && <div>📧 {lead.email}</div>}
                                  {lead.phone && <div>📞 {lead.phone}</div>}
                                  {lead.address && <div>📍 {lead.address}</div>}
                                  <div className="text-xs text-gray-400">{new Date(lead.createdAt).toLocaleString()}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                                  className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                                >
                                  <Eye className="w-3 h-3" /> {isExpanded ? "Hide" : "View AI Report"}
                                </button>
                                <select
                                  value={lead.status}
                                  onChange={(e) => updateLeadStatus.mutate({ leadId: lead.id, status: e.target.value as "new" | "analyzing" | "matched" | "contacted" | "closed" | "lost" })}
                                  className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                                >
                                  {["new","analyzing","matched","contacted","closed","lost"].map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Route to partner */}
                            {lead.matchedPartnerId ? (
                              <div className="mt-3 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                ✅ Routed to Partner ID {lead.matchedPartnerId}
                              </div>
                            ) : (
                              <div className="mt-3 flex items-center gap-2">
                                <select
                                  value={selectedLeadId === lead.id ? routePartnerId : ""}
                                  onChange={(e) => { setSelectedLeadId(lead.id); setRoutePartnerId(e.target.value); }}
                                  className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white"
                                >
                                  <option value="">— Route to a Partner —</option>
                                  {(approvedPartners ?? []).map((p: { id: number; businessName: string; businessType: string }) => (
                                    <option key={p.id} value={p.id}>{p.businessName} ({p.businessType})</option>
                                  ))}
                                </select>
                                <Button
                                  size="sm"
                                  disabled={selectedLeadId !== lead.id || !routePartnerId || routeLead.isPending}
                                  onClick={() => routeLead.mutate({ leadId: lead.id, partnerId: parseInt(routePartnerId) })}
                                  className="text-xs"
                                  style={{ backgroundColor: "var(--teal)" }}
                                >
                                  Route Lead
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Expanded AI analysis */}
                          {isExpanded && analysis && (
                            <div className="border-t border-gray-100 bg-gray-50 p-4">
                              <div className="mb-3">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">AI Analysis</span>
                                <span className="ml-2 text-xs font-semibold text-indigo-600">{analysis.overallCondition?.replace("_", " ")}</span>
                              </div>
                              {analysis.summary && <p className="text-sm text-gray-600 mb-3">{analysis.summary}</p>}
                              {analysis.issues && analysis.issues.length > 0 && (
                                <div className="space-y-2">
                                  {analysis.issues.map((issue: { name: string; severity: string; tradeType: string; estimatedCost: string; isInsuranceClaim?: boolean }, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 text-xs bg-white rounded-lg px-3 py-2 border border-gray-100">
                                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                        issue.severity === "urgent" ? "bg-red-500" : issue.severity === "moderate" ? "bg-amber-500" : "bg-green-500"
                                      }`} />
                                      <span className="font-semibold text-gray-800 flex-1">{issue.name}</span>
                                      <span className="text-gray-500">{issue.tradeType}</span>
                                      <span className="text-gray-400">{issue.estimatedCost}</span>
                                      {issue.isInsuranceClaim && <span className="text-amber-600 font-bold">🏛️</span>}
                                    </div>
                                  ))}
                                </div>
                              )}
                              {analysis.issues?.length === 0 && <p className="text-sm text-green-600">✅ No issues detected — home in excellent condition.</p>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </AdminLayout>
  );
}
