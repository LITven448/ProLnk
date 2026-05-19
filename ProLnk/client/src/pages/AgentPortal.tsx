import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  DollarSign, Users, TrendingUp, Copy, ExternalLink, Home,
  CheckCircle, Clock, AlertCircle, QrCode, Send, Building2
} from "lucide-react";

export default function AgentPortal() {
  const { user, loading: authLoading } = useAuth();
  const [referralForm, setReferralForm] = useState({
    homeownerName: "", homeownerEmail: "", homeownerPhone: "", propertyAddress: "", notes: ""
  });

  const { data: agentData, isLoading, refetch } = trpc.realEstateAgents.getMyAgentProfile.useQuery(undefined, {
    enabled: !!user,
  });

  const submitReferral = trpc.realEstateAgents.submitHomeownerReferral.useMutation({
    onSuccess: () => {
      toast.success("Referral submitted! We'll reach out to the homeowner shortly.");
      setReferralForm({ homeownerName: "", homeownerEmail: "", homeownerPhone: "", propertyAddress: "", notes: "" });
      refetch();
    },
    onError: (err) => toast.error(err.message || "Could not submit referral."),
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-6">
        <Card className="bg-white/10 border-white/20 text-white max-w-md w-full">
          <CardHeader className="text-center">
            <div className="text-4xl font-black tracking-tight mb-2">ProLnk</div>
            <CardTitle className="text-xl">Real Estate Agent Portal</CardTitle>
            <p className="text-white/70 text-sm mt-2">Sign in to access your referral dashboard and commission tracking.</p>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold" onClick={() => window.location.href = getLoginUrl()}>
              Sign In to Agent Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400" />
      </div>
    );
  }

  if (!agentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-6">
        <Card className="bg-white/10 border-white/20 text-white max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-xl font-bold mb-2">Not Registered as Agent</h2>
            <p className="text-white/70 text-sm mb-6">Your account is not registered in the ProLnk Real Estate Agent Program. Contact your ProLnk representative to get set up.</p>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => window.location.href = "/"}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { agent, referrals, perpetualCommissions } = agentData;
  const baseReferralUrl = `${window.location.origin}/join?ref=${agent.referralCode}`;
  const referralUrl = `${baseReferralUrl}&utm_source=agent&utm_medium=referral&utm_campaign=agent_portal&utm_content=${agent.referralCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
      toast.success("Referral link copied to clipboard.");
  };

  const statusIcon = (status: string) => {
    if (status === "closed") return <CheckCircle className="h-4 w-4 text-green-400" />;
    if (status === "active") return <Clock className="h-4 w-4 text-yellow-400" />;
    return <AlertCircle className="h-4 w-4 text-slate-400" />;
  };

  const totalUnpaidPerpetual = perpetualCommissions
    .filter((c: any) => !c.paid)
    .reduce((sum: number, c: any) => sum + parseFloat(c.agentEarnedAmount || "0"), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-black text-white tracking-tight">ProLnk</div>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Agent Portal</Badge>
          </div>
          <div className="flex items-center gap-3">
            <a href="/agent-agreement" className="text-xs text-cyan-400 hover:text-cyan-300 underline">Agreement</a>
            <span className="text-white/70 text-sm">{user.name}</span>
            <div className="w-8 h-8 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">
              {user.name?.charAt(0) || "A"}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {agent.contactName || agent.businessName}</h1>
          <p className="text-white/60">{agent.brokerageName} · License #{agent.licenseNumber || "N/A"}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earned", value: `$${parseFloat(agent.totalEarned || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Pending Payout", value: `$${totalUnpaidPerpetual.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-500/10" },
            { label: "Referrals Sent", value: agent.totalReferralsSent || 0, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Sales Closed", value: agent.totalSalesCompleted || 0, icon: Home, color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className="text-white/60 text-xs mb-1">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Referral Link Card */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-white font-semibold">Your Referral Link</h3>
                </div>
                <p className="text-white/60 text-sm mb-3">Share this link with homeowners. When they sign up for TrustyPro, you earn perpetual commissions on every job they complete.</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-cyan-300 text-sm font-mono truncate">
                    {referralUrl}
                  </div>
                  <Button size="sm" onClick={copyReferralLink} className="bg-cyan-500 hover:bg-cyan-600 text-white shrink-0">
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </Button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge className="bg-white/10 text-white/70 border-white/20 font-mono text-xs">{agent.referralCode}</Badge>
                  <span className="text-white/40 text-xs">Commission rate: {(parseFloat(agent.homeownerRecruitRate || "0.25") * 100).toFixed(0)}% of ProLnk fees</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="referrals">
          <TabsList className="bg-white/5 border border-white/10 mb-6">
            <TabsTrigger value="referrals" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">My Referrals</TabsTrigger>
            <TabsTrigger value="submit" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">Submit Referral</TabsTrigger>
            <TabsTrigger value="commissions" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">Commissions</TabsTrigger>
            <TabsTrigger value="how-it-works" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">How It Works</TabsTrigger>
          </TabsList>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Homeowner Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                {referrals.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-10 w-10 mx-auto mb-3 text-white/20" />
                    <p className="text-white/40">No referrals yet. Submit your first homeowner referral to start earning!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {referrals.map((ref: any) => (
                      <div key={ref.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          {statusIcon(ref.saleStatus || "pending")}
                          <div>
                            <p className="text-white font-medium">{ref.homeownerName}</p>
                            <p className="text-white/50 text-xs">{ref.propertyAddress || ref.homeownerEmail || "No address"} · {new Date(ref.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            ref.saleStatus === "closed" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                            ref.saleStatus === "active" ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                            "bg-slate-500/20 text-slate-300 border-slate-500/30"
                          }>
                            {ref.saleStatus || "pending"}
                          </Badge>
                          {ref.proLnkReferralFee && (
                            <p className="text-green-400 text-xs mt-1">Fee: ${parseFloat(ref.proLnkReferralFee).toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Referral Tab */}
          <TabsContent value="submit">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Submit a Homeowner Referral</CardTitle>
                <p className="text-white/60 text-sm">Refer a homeowner to TrustyPro. You'll earn a perpetual commission on every job they complete through the platform.</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/70 text-sm">Homeowner Name *</Label>
                    <Input
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/30"
                      placeholder="Jane Smith"
                      value={referralForm.homeownerName}
                      onChange={e => setReferralForm(p => ({ ...p, homeownerName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 text-sm">Email</Label>
                    <Input
                      type="email"
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/30"
                      placeholder="jane@example.com"
                      value={referralForm.homeownerEmail}
                      onChange={e => setReferralForm(p => ({ ...p, homeownerEmail: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 text-sm">Phone</Label>
                    <Input
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/30"
                      placeholder="(214) 555-0100"
                      value={referralForm.homeownerPhone}
                      onChange={e => setReferralForm(p => ({ ...p, homeownerPhone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 text-sm">Property Address</Label>
                    <Input
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/30"
                      placeholder="123 Main St, Dallas TX"
                      value={referralForm.propertyAddress}
                      onChange={e => setReferralForm(p => ({ ...p, propertyAddress: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-white/70 text-sm">Notes</Label>
                    <Textarea
                      className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/30"
                      placeholder="Any context about the homeowner or their home service needs..."
                      rows={3}
                      value={referralForm.notes}
                      onChange={e => setReferralForm(p => ({ ...p, notes: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-300">
                    <strong>Disclosure Reminder:</strong> Per your Agent Agreement, you must disclose to the homeowner that you may receive compensation for this referral before submitting.
                  </p>
                </div>
                <Button
                  className="mt-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
                  disabled={!referralForm.homeownerName || submitReferral.isPending}
                  onClick={() => submitReferral.mutate(referralForm)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {submitReferral.isPending ? "Submitting..." : "Submit Referral"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Perpetual Commissions</CardTitle>
                <p className="text-white/60 text-sm">You earn {(parseFloat(agent.homeownerRecruitRate || "0.25") * 100).toFixed(0)}% of ProLnk's fee on every job completed by homeowners you referred.</p>
              </CardHeader>
              <CardContent>
                {perpetualCommissions.length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="h-10 w-10 mx-auto mb-3 text-white/20" />
                    <p className="text-white/40">No commissions yet. Commissions appear here when your referred homeowners complete jobs.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {perpetualCommissions.map((c: any) => (
                      <div key={c.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <p className="text-white font-medium">{c.homeownerName}</p>
                          <p className="text-white/50 text-xs">{c.propertyAddress || "No address"} · {new Date(c.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">${parseFloat(c.agentEarnedAmount || "0").toFixed(2)}</p>
                          <Badge className={c.paid ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"}>
                            {c.paid ? "Paid" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="how-it-works">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Refer Homeowners",
                  desc: "Share your unique referral link with homeowners you work with. When they sign up for TrustyPro, they're linked to your account.",
                  color: "from-cyan-500 to-blue-500",
                },
                {
                  step: "2",
                  title: "They Complete Jobs",
                  desc: "Every time your referred homeowner completes a home service job through TrustyPro, ProLnk collects a platform fee.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  step: "3",
                  title: "You Earn Forever",
                  desc: `You earn ${(parseFloat(agent.homeownerRecruitRate || "0.25") * 100).toFixed(0)}% of ProLnk's platform fee — for the lifetime of that homeowner's account. No cap, no expiration.`,
                  color: "from-green-500 to-emerald-500",
                },
              ].map((item) => (
                <Card key={item.step} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-lg mb-4`}>
                      {item.step}
                    </div>
                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-white/5 border-white/10 mt-6">
              <CardContent className="p-6">
                <h3 className="text-white font-bold mb-4">Commission Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Homeowner Recruit Rate</p>
                    <p className="text-2xl font-bold text-cyan-400">{(parseFloat(agent.homeownerRecruitRate || "0.25") * 100).toFixed(0)}%</p>
                    <p className="text-white/50 text-xs mt-1">of ProLnk's fee per job</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">ProLnk Referral Rate</p>
                    <p className="text-2xl font-bold text-purple-400">{(parseFloat(agent.proLnkReferralRate || "0.10") * 100).toFixed(0)}%</p>
                    <p className="text-white/50 text-xs mt-1">of agent commission on home sales</p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-cyan-300 text-sm font-medium mb-1">Example: $10,000 roofing job</p>
                  <p className="text-white/70 text-sm">ProLnk collects ~$1,000 platform fee → You earn ${(1000 * parseFloat(agent.homeownerRecruitRate || "0.25")).toFixed(0)} perpetually for that job.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
