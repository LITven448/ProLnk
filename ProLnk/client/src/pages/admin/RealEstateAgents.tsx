import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Users, DollarSign, TrendingUp, AlertCircle, Plus, ChevronRight, Home, RefreshCw } from "lucide-react";

export default function RealEstateAgents() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [logReferralOpen, setLogReferralOpen] = useState(false);
  const [logReferralType, setLogReferralType] = useState<"to_agent" | "to_trustypro">("to_agent");
  const [referralForm, setReferralForm] = useState({ homeownerName: "", homeownerEmail: "", homeownerPhone: "", propertyAddress: "", notes: "" });
  const [recordSaleOpen, setRecordSaleOpen] = useState(false);
  const [saleForm, setSaleForm] = useState({ referralId: "", salePrice: "", agentCommissionPercent: "3" });

  const { data: stats, refetch: refetchStats } = trpc.realEstateAgents.getStats.useQuery();
  const { data: agentsData, refetch: refetchAgents } = trpc.realEstateAgents.listAgents.useQuery({ page, limit: 20 });
  const { data: agentDetail } = trpc.realEstateAgents.getAgentDetail.useQuery(
    { agentId: selectedAgent! }, { enabled: !!selectedAgent }
  );

  const logToAgent = trpc.realEstateAgents.logTrustyProToAgentReferral.useMutation({
    onSuccess: () => { toast.success("Referral logged"); setLogReferralOpen(false); refetchAgents(); refetchStats(); },
  });
  const logToTrustyPro = trpc.realEstateAgents.logAgentToTrustyProReferral.useMutation({
    onSuccess: () => { toast.success("Referral logged"); setLogReferralOpen(false); refetchAgents(); refetchStats(); },
  });
  const recordSale = trpc.realEstateAgents.recordHomeSale.useMutation({
    onSuccess: (data) => {
      toast.success(`Sale recorded — ProLnk fee: $${Number(data.proLnkFee).toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
      setRecordSaleOpen(false); refetchAgents(); refetchStats();
    },
  });
  const markPaid = trpc.realEstateAgents.markReferralFeePaid.useMutation({
    onSuccess: () => { toast.success("Marked as paid"); refetchAgents(); },
  });

  const handleLogReferral = () => {
    if (!selectedAgent) return;
    if (logReferralType === "to_agent") {
      logToAgent.mutate({ agentId: selectedAgent, ...referralForm });
    } else {
      logToTrustyPro.mutate({ agentId: selectedAgent, ...referralForm });
    }
  };

  const handleRecordSale = () => {
    if (!saleForm.referralId || !saleForm.salePrice) return;
    recordSale.mutate({
      referralId: Number(saleForm.referralId),
      salePrice: Number(saleForm.salePrice),
      agentCommissionPercent: Number(saleForm.agentCommissionPercent) / 100,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Real Estate Agent Partners</h1>
            <p className="text-slate-400 text-sm mt-1">10% referral fee on home sales · 25% perpetual commission on homeowner jobs</p>
          </div>
          <Button onClick={() => refetchAgents()} variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Agents", value: stats?.totalAgents ?? 0, icon: Users, color: "text-blue-400" },
            { label: "Referrals Sent", value: stats?.totalReferrals ?? 0, icon: TrendingUp, color: "text-emerald-400" },
            { label: "Sales Closed", value: stats?.totalSales ?? 0, icon: Home, color: "text-purple-400" },
            { label: "Unpaid Fees", value: `$${Number(stats?.unpaidReferralFees ?? 0).toLocaleString("en-US", { minimumFractionDigits: 0 })}`, icon: DollarSign, color: "text-amber-400" },
          ].map((s) => (
            <Card key={s.label} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 flex items-center gap-3">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <div>
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent List */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <Input placeholder="Search agents..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500" />
            </div>
            {agentsData?.agents?.length === 0 && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 text-center text-slate-400">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No real estate agents registered yet.</p>
                  <p className="text-xs mt-1">Partners with the Real Estate category can be registered here.</p>
                </CardContent>
              </Card>
            )}
            {(agentsData?.agents ?? []).filter((a: any) =>
              !search || a.businessName?.toLowerCase().includes(search.toLowerCase()) || a.contactName?.toLowerCase().includes(search.toLowerCase())
            ).map((agent: any) => (
              <Card key={agent.id}
                className={`bg-slate-800 border-slate-700 cursor-pointer hover:border-blue-500 transition-colors ${selectedAgent === agent.id ? "border-blue-500" : ""}`}
                onClick={() => setSelectedAgent(agent.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm">{agent.businessName || agent.contactName}</div>
                      <div className="text-xs text-slate-400">{agent.brokerageName || "Independent"}</div>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs border-emerald-600 text-emerald-400">{agent.totalReferralsSent} referrals</Badge>
                        <Badge variant="outline" className="text-xs border-purple-600 text-purple-400">{agent.totalSalesCompleted} sales</Badge>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                  {Number(agent.unpaidReferralFees) > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-amber-400">
                      <AlertCircle className="w-3 h-3" /> ${Number(agent.unpaidReferralFees).toLocaleString()} unpaid fees
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Agent Detail */}
          <div className="lg:col-span-2">
            {!selectedAgent ? (
              <Card className="bg-slate-800 border-slate-700 h-full flex items-center justify-center">
                <CardContent className="text-center text-slate-400 py-16">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Select an agent to view details</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {agentDetail && (
                  <>
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-lg">{agentDetail.agent.businessName || agentDetail.agent.contactName}</CardTitle>
                          <div className="flex gap-2">
                            <Dialog open={logReferralOpen} onOpenChange={setLogReferralOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                  <Plus className="w-3 h-3 mr-1" /> Log Referral
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                                <DialogHeader><DialogTitle>Log Referral</DialogTitle></DialogHeader>
                                <div className="space-y-4">
                                  <div className="flex gap-2">
                                    <Button size="sm" variant={logReferralType === "to_agent" ? "default" : "outline"}
                                      onClick={() => setLogReferralType("to_agent")}
                                      className={logReferralType === "to_agent" ? "bg-blue-600" : "border-slate-600 text-slate-300"}>
                                      TrustyPro → Agent
                                    </Button>
                                    <Button size="sm" variant={logReferralType === "to_trustypro" ? "default" : "outline"}
                                      onClick={() => setLogReferralType("to_trustypro")}
                                      className={logReferralType === "to_trustypro" ? "bg-emerald-600" : "border-slate-600 text-slate-300"}>
                                      Agent → TrustyPro
                                    </Button>
                                  </div>
                                  <p className="text-xs text-slate-400">
                                    {logReferralType === "to_agent" ? "TrustyPro homeowner referred to this agent. ProLnk earns 10% of agent commission when sale closes." : "Agent recruited homeowner to TrustyPro. Agent earns 25% of ProLnk commission on all future jobs from this homeowner."}
                                  </p>
                                  {["homeownerName", "homeownerEmail", "homeownerPhone", "propertyAddress", "notes"].map((field) => (
                                    <div key={field}>
                                      <Label className="text-slate-300 capitalize">{field.replace(/([A-Z])/g, " $1")}</Label>
                                      <Input value={(referralForm as any)[field]} onChange={(e) => setReferralForm(f => ({ ...f, [field]: e.target.value }))}
                                        className="bg-slate-800 border-slate-600 text-white mt-1" />
                                    </div>
                                  ))}
                                  <Button onClick={handleLogReferral} disabled={!referralForm.homeownerName || logToAgent.isPending || logToTrustyPro.isPending}
                                    className="w-full bg-blue-600 hover:bg-blue-700">Log Referral</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog open={recordSaleOpen} onOpenChange={setRecordSaleOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-900/30">
                                  <DollarSign className="w-3 h-3 mr-1" /> Record Sale
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                                <DialogHeader><DialogTitle>Record Home Sale</DialogTitle></DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-slate-300">Referral ID</Label>
                                    <Input value={saleForm.referralId} onChange={(e) => setSaleForm(f => ({ ...f, referralId: e.target.value }))}
                                      placeholder="From referrals list below" className="bg-slate-800 border-slate-600 text-white mt-1" />
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Sale Price ($)</Label>
                                    <Input type="number" value={saleForm.salePrice} onChange={(e) => setSaleForm(f => ({ ...f, salePrice: e.target.value }))}
                                      className="bg-slate-800 border-slate-600 text-white mt-1" />
                                  </div>
                                  <div>
                                    <Label className="text-slate-300">Agent Commission % (default 3%)</Label>
                                    <Input type="number" value={saleForm.agentCommissionPercent} onChange={(e) => setSaleForm(f => ({ ...f, agentCommissionPercent: e.target.value }))}
                                      className="bg-slate-800 border-slate-600 text-white mt-1" />
                                  </div>
                                  {saleForm.salePrice && (
                                    <div className="bg-slate-800 rounded p-3 text-sm">
                                      <div className="text-slate-400">Agent commission: <span className="text-white">${(Number(saleForm.salePrice) * Number(saleForm.agentCommissionPercent) / 100).toLocaleString()}</span></div>
                                      <div className="text-slate-400">ProLnk 10% fee: <span className="text-emerald-400 font-bold">${(Number(saleForm.salePrice) * Number(saleForm.agentCommissionPercent) / 100 * 0.10).toLocaleString()}</span></div>
                                    </div>
                                  )}
                                  <Button onClick={handleRecordSale} disabled={!saleForm.referralId || !saleForm.salePrice || recordSale.isPending}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700">Record Sale</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-slate-700/50 rounded p-3 text-center">
                            <div className="text-lg font-bold text-blue-400">{agentDetail.agent.totalReferralsSent}</div>
                            <div className="text-xs text-slate-400">Referrals Sent</div>
                          </div>
                          <div className="bg-slate-700/50 rounded p-3 text-center">
                            <div className="text-lg font-bold text-purple-400">{agentDetail.agent.totalSalesCompleted}</div>
                            <div className="text-xs text-slate-400">Sales Closed</div>
                          </div>
                          <div className="bg-slate-700/50 rounded p-3 text-center">
                            <div className="text-lg font-bold text-amber-400">${Number(agentDetail.agent.totalOwed ?? 0).toLocaleString()}</div>
                            <div className="text-xs text-slate-400">Owed to ProLnk</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-slate-400">Brokerage: <span className="text-white">{agentDetail.agent.brokerageName || "—"}</span></div>
                          <div className="text-slate-400">License: <span className="text-white">{agentDetail.agent.licenseNumber || "—"}</span></div>
                          <div className="text-slate-400">Referral Rate: <span className="text-emerald-400">{(Number(agentDetail.agent.proLnkReferralRate) * 100).toFixed(0)}%</span></div>
                          <div className="text-slate-400">Perpetual Rate: <span className="text-blue-400">{(Number(agentDetail.agent.homeownerRecruitRate) * 100).toFixed(0)}%</span></div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Referrals */}
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-2"><CardTitle className="text-white text-sm">Referral History</CardTitle></CardHeader>
                      <CardContent>
                        {agentDetail.referrals.length === 0 ? (
                          <p className="text-slate-400 text-sm text-center py-4">No referrals logged yet.</p>
                        ) : (
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {agentDetail.referrals.map((ref: any) => (
                              <div key={ref.id} className="flex items-center justify-between bg-slate-700/50 rounded p-3">
                                <div>
                                  <div className="text-sm text-white font-medium">{ref.homeownerName}</div>
                                  <div className="text-xs text-slate-400">{ref.propertyAddress || "No address"} · ID: {ref.id}</div>
                                  <Badge variant="outline" className={`text-xs mt-1 ${ref.referralDirection === "trustypro_to_agent" ? "border-blue-600 text-blue-400" : "border-emerald-600 text-emerald-400"}`}>
                                    {ref.referralDirection === "trustypro_to_agent" ? "TrustyPro → Agent" : "Agent → TrustyPro"}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <Badge className={`text-xs ${ref.saleStatus === "closed" ? "bg-emerald-700" : ref.saleStatus === "under_contract" ? "bg-amber-700" : "bg-slate-600"}`}>
                                    {ref.saleStatus}
                                  </Badge>
                                  {ref.saleStatus === "closed" && !ref.referralFeePaidAt && ref.proLnkReferralFee && (
                                    <Button size="sm" variant="ghost" className="text-xs text-amber-400 hover:text-amber-300 mt-1 h-6"
                                      onClick={() => markPaid.mutate({ referralId: ref.id })}>
                                      Mark Paid ${Number(ref.proLnkReferralFee).toLocaleString()}
                                    </Button>
                                  )}
                                  {ref.referralFeePaidAt && <div className="text-xs text-emerald-400 mt-1">✓ Paid</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Perpetual Commissions */}
                    {agentDetail.perpetualCommissions.length > 0 && (
                      <Card className="bg-slate-800 border-slate-700">
                        <CardHeader className="pb-2"><CardTitle className="text-white text-sm">Perpetual Commission Log</CardTitle></CardHeader>
                        <CardContent>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {agentDetail.perpetualCommissions.map((pc: any) => (
                              <div key={pc.id} className="flex items-center justify-between bg-slate-700/50 rounded p-2 text-sm">
                                <div>
                                  <div className="text-white">{pc.homeownerName}</div>
                                  <div className="text-xs text-slate-400">{new Date(pc.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-emerald-400 font-medium">${Number(pc.agentEarnedAmount).toFixed(2)}</div>
                                  <Badge variant="outline" className={`text-xs ${pc.paid ? "border-emerald-600 text-emerald-400" : "border-amber-600 text-amber-400"}`}>
                                    {pc.paid ? "Paid" : "Pending"}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
