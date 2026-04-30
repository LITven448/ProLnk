import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  BarChart3, Eye, MousePointerClick, TrendingUp, Edit3, Save, ExternalLink,
  Calendar, DollarSign, Target, Megaphone, ArrowUpRight,
} from "lucide-react";

export default function AdvertiserDashboard() {
  const { data: campaign, isLoading, refetch } = trpc.featuredAdvertisers.getMyAdCampaign.useQuery();
  const updateCampaign = trpc.featuredAdvertisers.updateMyCampaign.useMutation({
    onSuccess: () => {
      toast.success("Campaign updated — your changes are now live.");
      setEditing(false);
      refetch();
    },
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bannerTitle: "",
    bannerSubtitle: "",
    bannerCtaText: "",
    bannerCtaUrl: "",
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center space-y-6 mt-12">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00B5B8]/10 flex items-center justify-center">
          <Megaphone className="w-8 h-8 text-[#00B5B8]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">No Active Campaign</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          You don't have an active advertising campaign yet. Apply to become a Featured Partner to get your business in front of thousands of homeowners.
        </p>
        <Button
          onClick={() => window.location.href = "/advertise"}
          className="bg-[#00B5B8] hover:bg-[#009a9d]"
        >
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Apply Now
        </Button>
      </div>
    );
  }

  const startEditing = () => {
    setForm({
      bannerTitle: campaign.bannerTitle ?? "",
      bannerSubtitle: campaign.bannerSubtitle ?? "",
      bannerCtaText: campaign.bannerCtaText ?? "Learn More",
      bannerCtaUrl: campaign.bannerCtaUrl ?? "",
    });
    setEditing(true);
  };

  const handleSave = () => {
    const updates: any = {};
    if (form.bannerTitle && form.bannerTitle !== campaign.bannerTitle) updates.bannerTitle = form.bannerTitle;
    if (form.bannerSubtitle && form.bannerSubtitle !== campaign.bannerSubtitle) updates.bannerSubtitle = form.bannerSubtitle;
    if (form.bannerCtaText && form.bannerCtaText !== campaign.bannerCtaText) updates.bannerCtaText = form.bannerCtaText;
    if (form.bannerCtaUrl && form.bannerCtaUrl !== campaign.bannerCtaUrl) updates.bannerCtaUrl = form.bannerCtaUrl;
    if (Object.keys(updates).length === 0) {
      setEditing(false);
      return;
    }
    updateCampaign.mutate(updates);
  };

  const statusColor: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    pending: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaign Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your Featured Partner advertising campaign</p>
        </div>
        <Badge className={statusColor[campaign.status] || "bg-gray-100 text-gray-700"}>
          {campaign.status?.charAt(0).toUpperCase() + campaign.status?.slice(1)}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{(campaign.impressions ?? 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Impressions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{(campaign.clicks ?? 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{campaign.ctr}%</p>
                <p className="text-xs text-gray-500">Click-Through Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">${campaign.monthlyFee ?? 0}/mo</p>
                <p className="text-xs text-gray-500">Plan Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Details + Banner Editor */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Campaign Details</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : "No start date"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Business</span>
              <span className="font-medium">{campaign.businessName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{campaign.category ?? "General"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Placements</span>
              <div className="flex gap-1">
                {campaign.showOnDashboard ? <Badge variant="outline" className="text-[10px]">Dashboard</Badge> : null}
                {campaign.showOnScanResults ? <Badge variant="outline" className="text-[10px]">Scan Results</Badge> : null}
                {campaign.showInEmails ? <Badge variant="outline" className="text-[10px]">Emails</Badge> : null}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Zip Codes</span>
              <span className="font-medium text-right max-w-[200px] truncate">
                {(() => {
                  try { return JSON.parse(campaign.zipCodes).join(", "); } catch { return "All"; }
                })()}
              </span>
            </div>
            {campaign.endDate && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Ends</span>
                <span className="font-medium">{new Date(campaign.endDate).toLocaleDateString()}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Banner Creative</CardTitle>
            {!editing ? (
              <Button variant="outline" size="sm" onClick={startEditing}>
                <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                <Button size="sm" onClick={handleSave} disabled={updateCampaign.isPending}
                  className="bg-[#00B5B8] hover:bg-[#009a9d]">
                  <Save className="w-3.5 h-3.5 mr-1" /> Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {editing ? (
              <>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Banner Title</label>
                  <Input value={form.bannerTitle} onChange={(e) => setForm({ ...form, bannerTitle: e.target.value })}
                    placeholder="Your headline" maxLength={100} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Subtitle</label>
                  <Input value={form.bannerSubtitle} onChange={(e) => setForm({ ...form, bannerSubtitle: e.target.value })}
                    placeholder="Short description" maxLength={255} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">CTA Button Text</label>
                  <Input value={form.bannerCtaText} onChange={(e) => setForm({ ...form, bannerCtaText: e.target.value })}
                    placeholder="Learn More" maxLength={50} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">CTA Link URL</label>
                  <Input value={form.bannerCtaUrl} onChange={(e) => setForm({ ...form, bannerCtaUrl: e.target.value })}
                    placeholder="https://yoursite.com" />
                </div>
              </>
            ) : (
              <>
                <div className="rounded-xl border border-[#00B5B8]/20 bg-gradient-to-r from-[#00B5B8]/5 to-white p-4">
                  <p className="font-semibold text-gray-900">
                    {campaign.bannerTitle ?? campaign.businessName}
                  </p>
                  {campaign.bannerSubtitle && (
                    <p className="text-sm text-gray-500 mt-1">{campaign.bannerSubtitle}</p>
                  )}
                  {campaign.bannerCtaUrl && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-[#00B5B8] font-semibold">
                      {campaign.bannerCtaText ?? "Learn More"}
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400">This is a preview of how your banner appears to homeowners.</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-gray-50">
              <Target className="w-6 h-6 mx-auto text-[#00B5B8] mb-2" />
              <p className="text-xl font-bold">
                {campaign.impressions > 0
                  ? `$${((campaign.monthlyFee ?? 0) / (campaign.impressions / 1000)).toFixed(2)}`
                  : "—"}
              </p>
              <p className="text-xs text-gray-500">Cost per 1,000 Impressions</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50">
              <MousePointerClick className="w-6 h-6 mx-auto text-[#00B5B8] mb-2" />
              <p className="text-xl font-bold">
                {campaign.clicks > 0
                  ? `$${((campaign.monthlyFee ?? 0) / campaign.clicks).toFixed(2)}`
                  : "—"}
              </p>
              <p className="text-xs text-gray-500">Cost per Click</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-50">
              <TrendingUp className="w-6 h-6 mx-auto text-[#00B5B8] mb-2" />
              <p className="text-xl font-bold">
                {campaign.ctr}%
              </p>
              <p className="text-xs text-gray-500">Conversion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
