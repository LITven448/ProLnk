import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft, Printer, Star, TrendingUp, DollarSign, Shield,
  Award, AlertTriangle, CheckCircle, Clock, Briefcase, User,
  Phone, Mail, MapPin, Calendar
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

function formatDate(ts: number | Date | null | undefined) {
  if (!ts) return "—";
  const d = ts instanceof Date ? ts : new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function StarRating({ value }: { value: number | null | undefined }) {
  const v = Number(value ?? 0);
  return (
    <span className="flex items-center gap-0.5″>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= v ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
      ))}
      <span className="ml-1 text-sm font-semibold text-gray-700″>{v > 0 ? v.toFixed(1) : "—"}</span>
    </span>
  );
}

const TIER_COLORS: Record<string, string> = {
  scout: "bg-gray-100 text-gray-700 border-gray-300″,
  pro: "bg-blue-50 text-blue-700 border-blue-300″,
  crew: "bg-teal-50 text-teal-700 border-teal-300″,
  company: "bg-purple-50 text-purple-700 border-purple-300″,
  enterprise: "bg-yellow-50 text-yellow-700 border-yellow-400″,
};

const TIER_LABELS: Record<string, string> = {
  scout: "Scout",
  pro: "Pro",
  crew: "Crew",
  company: "Company",
  enterprise: "Enterprise",
};

function WaitlistPartnerReport({ email }: { email: string }) {
  const { data, isLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: !!email }
  );
  const updatePro = trpc.waitlistAdmin.updateProStatus.useMutation({
    onSuccess: () => toast.success("Status updated — approval email sent"),
    onError: (e) => toast.error(e.message),
  });

  const TIER_COMMISSION: Record<string, string> = {
    Charter: "25% Direct · 7/4/2/1% Override · 12/6/3/1.5% Subscription",
    Founding: "25% Direct · 7/4/2/1% Override · 12/6/3/1.5% Subscription",
    Growth: "20% Direct · 4/2/1% Override · 6/3/1.5% Subscription",
    Standard: "12% Direct · No override · No subscription override",
  };

  const reportDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#00B5B8] border-t-transparent rounded-full animate-spin mx-auto mb-4″ />
          <p className="text-gray-500″>Loading waitlist partner data…</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3″ />
          <p className="text-gray-700 font-semibold">No waitlist record found for {email}</p>
          <Link href="/admin/waitlist">
            <Button variant="outline" className="mt-4″>Back to Waitlist</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50″>
        <div className="no-print bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10″>
          <div className="flex items-center gap-3″>
            <Link href="/admin/waitlist">
              <Button variant="ghost" size="sm" className="gap-2″>
                <ArrowLeft className="w-4 h-4″ /> Back to Waitlist
              </Button>
            </Link>
            <span className="text-gray-300″>|</span>
            <span className="text-sm font-medium text-gray-600″>Waitlist Partner Report</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8″>
          <Card className="border-gray-100 shadow-sm mb-6″>
            <CardContent className="pt-6″>
              <div className="flex items-start justify-between mb-4″>
                <div>
                  <div className="text-xs font-bold tracking-widest text-[#00B5B8] uppercase mb-1″>ProLnk Partner Network</div>
                  <h1 className="text-2xl font-bold text-gray-900″>Waitlist Partner Report</h1>
                  <p className="text-gray-500 text-sm mt-1″>Generated {reportDate}</p>
                </div>
                <Badge variant="outline" className="text-sm font-bold px-3 py-1 border-blue-300 text-blue-700 bg-blue-50″>
                  <Award className="w-3.5 h-3.5 mr-1.5 inline" />
                  {data.tier} Tier
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100″>
                <div className="space-y-2″>
                  <div className="flex items-center gap-2 text-sm text-gray-700″>
                    <User className="w-3.5 h-3.5 text-gray-400″ />
                    {data.firstName} {data.lastName}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700″>
                    <Mail className="w-3.5 h-3.5 text-gray-400″ />
                    {data.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700″>
                    <MapPin className="w-3.5 h-3.5 text-gray-400″ />
                    {data.primaryCity}, {data.primaryState}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700″>
                    <Briefcase className="w-3.5 h-3.5 text-gray-400″ />
                    {data.businessType ?? "—"}
                  </div>
                </div>
                <div className="space-y-2″>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500″>Waitlist Position</span>
                    <span className="font-bold text-gray-900″>#{data.position}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500″>Referral Code</span>
                    <span className="font-mono font-bold text-gray-900″>{data.referralCode}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500″>Status</span>
                    <Badge className={`text-xs ${data.status === "approved" ? "bg-green-100 text-green-800" : data.status === "rejected" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {data.status ?? "pending"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500″>Spots to Charter</span>
                    <span className="font-semibold text-gray-700″>{data.spotsToCharter > 0 ? `${data.spotsToCharter} away` : "Charter member"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm mb-6″>
            <CardHeader className="pb-3″>
              <CardTitle className="text-base flex items-center gap-2″>
                <DollarSign className="w-4 h-4 text-green-500″ />
                Commission Rate Breakdown — {data.tier} Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4″>
                <p className="text-sm text-gray-700 font-mono">{TIER_COMMISSION[data.tier] ?? "Standard rates apply"}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4″>
                {[
                  { label: "Override Levels", value: `${data.overrideLevels} deep` },
                  { label: "Commission Rate", value: `${data.commissionRate}%` },
                  { label: "Network Size", value: `${(data.referrals ?? []).length} direct` },
                ].map((item) => (
                  <div key={item.label} className="text-center bg-white border border-gray-100 rounded-lg p-3″>
                    <div className="text-xs text-gray-400 mb-1″>{item.label}</div>
                    <div className="text-lg font-bold text-gray-900″>{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {(data.referrals ?? []).length > 0 && (
            <Card className="border-gray-100 shadow-sm mb-6″>
              <CardHeader className="pb-3″>
                <CardTitle className="text-base flex items-center gap-2″>
                  <User className="w-4 h-4 text-[#00B5B8]" />
                  L1 Referral Tree
                  <Badge variant="outline" className="ml-auto text-xs">{(data.referrals ?? []).length} recruits</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-50″>
                  {(data.referrals ?? []).map((r, i) => (
                    <div key={i} className="py-2 flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-[#00B5B8]/10 flex items-center justify-center text-xs font-bold text-[#00B5B8]">
                        {(r.firstName ?? "?")[0]}
                      </div>
                      <span className="text-gray-800″>{r.firstName}</span>
                      <span className="text-gray-400 ml-auto">{r.businessType}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-gray-100 shadow-sm">
            <CardHeader className="pb-3″>
              <CardTitle className="text-base">Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-wrap">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white gap-2″
                  disabled={updatePro.isPending || data.status === "approved"}
                  onClick={() => {
                    if (!data.id) return;
                    if (!window.confirm(`Approve ${data.firstName} ${data.lastName}? An approval email will be sent.`)) return;
                    updatePro.mutate({ id: data.id, status: "approved" });
                  }}
                >
                  <CheckCircle className="w-4 h-4″ />
                  Send Approval Email
                </Button>
                <a href={`mailto:${data.email}`}>
                  <Button variant="outline" className="gap-2″>
                    <Mail className="w-4 h-4″ />
                    Email Partner
                  </Button>
                </a>
                <Link href="/admin/waitlist">
                  <Button variant="outline">Back to Waitlist</Button>
                </Link>
              </div>
              {data.status === "approved" && (
                <p className="text-sm text-green-600 font-semibold mt-3″>✓ Partner already approved</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

function ActivatedPartnerReport({ partnerId }: { partnerId: number }) {
  const [printing, setPrinting] = useState(false);

  const { data, isLoading } = trpc.compliance.getPartnerReport.useQuery(
    { partnerId },
    { enabled: !!partnerId }
  );

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#00B5B8] border-t-transparent rounded-full animate-spin mx-auto mb-4″ />
          <p className="text-gray-500″>Loading partner report…</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3″ />
          <p className="text-gray-700 font-semibold">Partner not found</p>
          <Link href="/admin/partners">
            <Button variant="outline" className="mt-4″>Back to Partners</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { partner, stats, earnedCommissions, reviews, recentJobs } = data;

  const totalEarned = earnedCommissions.reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const paidEarned = earnedCommissions.filter(c => c.paid).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const pendingEarned = earnedCommissions.filter(c => !c.paid).reduce((s, c) => s + Number(c.amount ?? 0), 0);
  const avgRating = reviews.length > 0
    ? reviews.reduce((s: number, r: any) => s + Number(r.rating ?? 0), 0) / reviews.length
    : 0;
  const conversionRate = (stats?.inboundOpportunities ?? 0) > 0
    ? Math.round(((stats?.convertedOpportunities ?? 0) / (stats?.inboundOpportunities ?? 1)) * 100)
    : 0;

  const isCompliant = !partner.suspendedAt && (partner.strikeCount ?? 0) === 0;
  const complianceStatus = partner.suspendedAt ? "Suspended" : (partner.strikeCount ?? 0) >= 2 ? "Warning" : (partner.strikeCount ?? 0) === 1 ? "1 Strike" : "Good Standing";
  const complianceColor = partner.suspendedAt ? "text-red-600″ : (partner.strikeCount ?? 0) >= 1 ? "text-yellow-600" : "text-green-600";

  const reportDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <AdminLayout>
    <div className={`min-h-screen bg-gray-50 ${printing ? "print:bg-white" : ""}`}>
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .print-page { box-shadow: none !important; }
        }
      `}</style>

      {/* Top bar */}
      <div className="no-print bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10″>
        <div className="flex items-center gap-3″>
          <Link href="/admin/partners">
            <Button variant="ghost" size="sm" className="gap-2″>
              <ArrowLeft className="w-4 h-4″ /> Back to Partners
            </Button>
          </Link>
          <span className="text-gray-300″>|</span>
          <span className="text-sm font-medium text-gray-600″>Partner Performance Report</span>
        </div>
        <Button
          onClick={handlePrint}
          className="gap-2 bg-[#00B5B8] hover:bg-[#009a9d] text-white"
          size="sm"
        >
          <Printer className="w-4 h-4″ />
          Print / Save PDF
        </Button>
      </div>

      {/* Report body */}
      <div className="max-w-4xl mx-auto px-6 py-8 print-page">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6″>
          <div className="flex items-start justify-between mb-6″>
            <div>
              <div className="flex items-center gap-2 mb-1″>
                <span className="text-xs font-bold tracking-widest text-[#00B5B8] uppercase">ProLnk Partner Network</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900″ style={{ fontFamily: "Oswald, sans-serif" }}>
                Partner Performance Report
              </h1>
              <p className="text-gray-500 text-sm mt-1″>Generated {reportDate}</p>
            </div>
            <div className="text-right">
              <Badge
                variant="outline"
                className={`text-sm font-bold px-3 py-1 ${TIER_COLORS[partner.tier ?? "scout"] ?? TIER_COLORS.scout}`}
              >
                <Award className="w-3.5 h-3.5 mr-1.5 inline" />
                {TIER_LABELS[partner.tier ?? "scout"] ?? "Scout"} Tier
              </Badge>
              <div className="mt-2 text-xs text-gray-400″>Partner ID #{partner.id}</div>
            </div>
          </div>

          {/* Partner identity */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100″>
            <div>
              <div className="flex items-center gap-2 mb-3″>
                <div className="w-10 h-10 rounded-full bg-[#00B5B8]/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#00B5B8]" />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900″>{partner.businessName}</div>
                  <div className="text-sm text-gray-500″>{partner.businessType ?? "—"}</div>
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-gray-600″>
                {partner.contactName && (
                  <div className="flex items-center gap-2″>
                    <User className="w-3.5 h-3.5 text-gray-400″ />
                    {partner.contactName}
                  </div>
                )}
                {partner.contactEmail && (
                  <div className="flex items-center gap-2″>
                    <Mail className="w-3.5 h-3.5 text-gray-400″ />
                    {partner.contactEmail}
                  </div>
                )}
                {partner.contactPhone && (
                  <div className="flex items-center gap-2″>
                    <Phone className="w-3.5 h-3.5 text-gray-400″ />
                    {partner.contactPhone}
                  </div>
                )}
                {partner.serviceArea && (
                  <div className="flex items-center gap-2″>
                    <MapPin className="w-3.5 h-3.5 text-gray-400″ />
                    {partner.serviceArea}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3″>Account Status</div>
              <div className="space-y-2″>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600″>Compliance</span>
                  <span className={`text-sm font-semibold ${complianceColor}`}>
                    {isCompliant ? <CheckCircle className="w-4 h-4 inline mr-1″ /> : <AlertTriangle className="w-4 h-4 inline mr-1" />}
                    {complianceStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600″>COI Verified</span>
                  <span className={`text-sm font-semibold ${partner.coiVerifiedAt ? "text-green-600" : "text-gray-400"}`}>
                    {partner.coiVerifiedAt ? `✓ ${formatDate(partner.coiVerifiedAt)}` : "Not verified"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600″>License Verified</span>
                  <span className={`text-sm font-semibold ${partner.licenseVerifiedAt ? "text-green-600" : "text-gray-400"}`}>
                    {partner.licenseVerifiedAt ? `✓ ${formatDate(partner.licenseVerifiedAt)}` : "Not verified"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600″>Member Since</span>
                  <span className="text-sm text-gray-700″>{formatDate(partner.approvedAt ?? partner.appliedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600″>Strikes</span>
                  <span className={`text-sm font-semibold ${(partner.strikeCount ?? 0) > 0 ? "text-red-600" : "text-green-600"}`}>
                    {partner.strikeCount ?? 0} / 3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4 mb-6″>
          {[
            {
              icon: <TrendingUp className="w-5 h-5 text-[#00B5B8]" />,
              label: "Inbound Leads",
              value: stats?.inboundOpportunities ?? 0,
              sub: `${stats?.convertedOpportunities ?? 0} converted (${conversionRate}%)`,
            },
            {
              icon: <TrendingUp className="w-5 h-5 text-purple-500″ />,
              label: "Outbound Referrals",
              value: stats?.outboundReferrals ?? 0,
              sub: "Partners referred to",
            },
            {
              icon: <DollarSign className="w-5 h-5 text-green-500″ />,
              label: "Total Earned",
              value: formatCurrency(totalEarned),
              sub: `${formatCurrency(pendingEarned)} pending`,
            },
            {
              icon: <Star className="w-5 h-5 text-yellow-500″ />,
              label: "Avg Rating",
              value: avgRating > 0 ? avgRating.toFixed(1) : "—",
              sub: `${reviews.length} review${reviews.length !== 1 ? "s" : ""}`,
            },
          ].map((kpi, i) => (
            <Card key={i} className="border-gray-100 shadow-sm">
              <CardContent className="pt-4 pb-4″>
                <div className="flex items-center gap-2 mb-1″>
                  {kpi.icon}
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{kpi.label}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900″>{kpi.value}</div>
                <div className="text-xs text-gray-400 mt-0.5″>{kpi.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Commission History */}
        <Card className="border-gray-100 shadow-sm mb-6″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <DollarSign className="w-4 h-4 text-green-500″ />
              Commission History
              <Badge variant="outline" className="ml-auto text-xs">
                {earnedCommissions.length} records
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {earnedCommissions.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4″>No commission records yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100″>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</th>
                      <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earnedCommissions.slice(0, 20).map((c: any) => (
                      <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50″>
                        <td className="py-2 text-gray-500″>{formatDate(c.createdAt)}</td>
                        <td className="py-2″>
                          <Badge variant="outline" className="text-xs capitalize">
                            {c.commissionType ?? "referral"}
                          </Badge>
                        </td>
                        <td className="py-2 text-gray-700 max-w-[200px] truncate">{c.description ?? "—"}</td>
                        <td className="py-2 text-right font-semibold text-green-700″>{formatCurrency(Number(c.amount ?? 0))}</td>
                        <td className="py-2 text-right">
                          {c.paid ? (
                            <span className="text-green-600 text-xs font-semibold">✓ Paid</span>
                          ) : (
                            <span className="text-yellow-600 text-xs font-semibold">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200″>
                      <td colSpan={3} className="py-2 text-sm font-semibold text-gray-700″>Total</td>
                      <td className="py-2 text-right font-bold text-green-700″>{formatCurrency(totalEarned)}</td>
                      <td className="py-2 text-right text-xs text-gray-400″>{formatCurrency(paidEarned)} paid</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="border-gray-100 shadow-sm mb-6″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <Star className="w-4 h-4 text-yellow-500″ />
              Homeowner Reviews
              <Badge variant="outline" className="ml-auto text-xs">
                {reviews.length} reviews
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4″>No reviews yet</p>
            ) : (
              <div className="space-y-4″>
                {/* Summary row */}
                <div className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-100″>
                  {[
                    { label: "Overall", key: "rating" },
                    { label: "Punctuality", key: "ratingPunctuality" },
                    { label: "Quality", key: "ratingQuality" },
                    { label: "Communication", key: "ratingCommunication" },
                  ].map(({ label, key }) => {
                    const vals = reviews.map((r: any) => Number(r[key] ?? 0)).filter(v => v > 0);
                    const avg = vals.length > 0 ? vals.reduce((a: number, b: number) => a + b, 0) / vals.length : 0;
                    return (
                      <div key={key} className="text-center">
                        <div className="text-xs text-gray-400 mb-1″>{label}</div>
                        <div className="text-xl font-bold text-gray-900″>{avg > 0 ? avg.toFixed(1) : "—"}</div>
                        <div className="flex justify-center mt-1″>
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= avg ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Review list */}
                <div className="space-y-3″>
                  {reviews.slice(0, 10).map((r: any) => (
                    <div key={r.id} className="bg-gray-50 rounded-lg p-3″>
                      <div className="flex items-center justify-between mb-1″>
                        <StarRating value={r.rating} />
                        <div className="flex items-center gap-2 text-xs text-gray-400″>
                          {r.serviceType && <Badge variant="outline" className="text-xs">{r.serviceType}</Badge>}
                          <span>{formatDate(r.createdAt)}</span>
                        </div>
                      </div>
                      {r.reviewText && (
                        <p className="text-sm text-gray-600 mt-1 italic">"{r.reviewText}"</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card className="border-gray-100 shadow-sm mb-6″>
          <CardHeader className="pb-3″>
            <CardTitle className="text-base flex items-center gap-2″>
              <Briefcase className="w-4 h-4 text-[#00B5B8]" />
              Recent Jobs
              <Badge variant="outline" className="ml-auto text-xs">
                {recentJobs.length} shown
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentJobs.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4″>No jobs logged yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100″>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</th>
                      <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.slice(0, 20).map((j: any) => (
                      <tr key={j.id} className="border-b border-gray-50 hover:bg-gray-50″>
                        <td className="py-2 text-gray-500″>{formatDate(j.createdAt)}</td>
                        <td className="py-2 text-gray-700″>{j.serviceType ?? "General"}</td>
                        <td className="py-2 text-gray-500 max-w-[200px] truncate">{j.serviceAddress}</td>
                        <td className="py-2 text-right">
                          <Badge
                            variant="outline"
                            className={
                              j.status === "analyzed" ? "border-green-300 text-green-700 bg-green-50″ :
                              j.status === "opportunities_sent" ? "border-blue-300 text-blue-700 bg-blue-50″ :
                              "border-gray-200 text-gray-500″
                            }
                          >
                            {j.status ?? "logged"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100″>
          <p>ProLnk Partner Network — Confidential Partner Performance Report</p>
          <p className="mt-1″>Generated {reportDate} · Partner #{partner.id} · {partner.businessName}</p>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default function PartnerReport() {
  const [, params] = useRoute("/admin/partners/:id/report");
  const rawId = params?.id ?? "";
  const isEmail = rawId.includes("@");

  if (isEmail) {
    return <WaitlistPartnerReport email={decodeURIComponent(rawId)} />;
  }

  return <ActivatedPartnerReport partnerId={rawId ? parseInt(rawId, 10) : 0} />;
}
